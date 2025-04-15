import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../_service/login.service';
import { Subscription } from 'rxjs';
import { CarsService } from '../../_service/cars.service';

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  fuel: string;
  persons: number;
  price: number;
  image: string;
  details: {
    doors: number;
    fuelType: string;
    transmission: string;
    airConditioning: boolean;
    seats: number;
  };
}
@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent implements OnInit, OnDestroy {
  isLoginPanelOpen = false;
  isRegisterPanelOpen = false;
  isProfilePanelOpen = false;
  isOverlayActive = false;
  isLoggedIn = false;
  availableCars: Car[] = [];
  hasAvailableCars: boolean = false;
  selectedCar: Car | null = null;
  selectedCarId: number | null = null;
  carImage = 'car_image_placeholder.jpg';
  currentStep = 1;
  isLoading = false;
  isConfirmationPopupVisible = false;
  confirmationMessage = '';
  isReservationConfirmedStepActive: boolean = false;
  isReservationSentStepCompleted: boolean = false;
  isReservationCompleted: boolean = false;
  loginEmail = '';
  loginPassword = '';
  emailError = '';
  passwordError = '';

  registerUsername = '';
  registerEmail = '';
  registerPassword = '';
  registerPersonalId = '';
  usernameError = '';
  registerEmailError = '';
  registerPasswordError = '';
  registerPersonalIdError = '';

  username: string | null = null;
  profileImageSource: string | null = 'profile icon.webp';

  private loginStatusSubscription: Subscription | undefined;
  private profileImageSubscription: Subscription | undefined;
  private usernameSubscription: Subscription | undefined;
  private availableCarsSubscription: Subscription | undefined;
  private selectedCarSubscription: Subscription | undefined;

  constructor(
    public loginService: LoginService,
    private carsService: CarsService
  ) {}

  ngOnInit(): void {
    console.log('ReservationComponent ngOnInit() called');
    this.loginStatusSubscription = this.loginService.isLoggedIn$.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
      }
    );

    this.profileImageSubscription =
      this.loginService.profileImageUrl$.subscribe((imageUrl) => {
        this.profileImageSource = imageUrl;
      });

    this.usernameSubscription = this.loginService.userName$.subscribe(
      (userName) => {
        this.username = userName;
      }
    );

    this.availableCarsSubscription = this.carsService.availableCars$.subscribe(
      (cars) => {
        this.availableCars = cars;
        this.hasAvailableCars = this.availableCars.length > 0;
        this.isLoading = false;
        console.log(
          'Available cars received in ReservationComponent:',
          this.availableCars
        );
        this.loadSavedReservationData(); // Betöltjük a foglalás adatait
      }
    );

    this.selectedCarSubscription = this.carsService.selectedCar$.subscribe(
      (car) => {
        this.selectedCar = car;
        if (this.selectedCar) {
          this.carImage = this.selectedCar.image || 'car_image_placeholder.jpg';
          localStorage.setItem('selectedCarId', this.selectedCar.id.toString());
        } else {
          localStorage.removeItem('selectedCarId');
        }
      }
    );

    this.isLoading = true;
  }

  ngOnDestroy(): void {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
    if (this.profileImageSubscription) {
      this.profileImageSubscription.unsubscribe();
    }
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
    if (this.availableCarsSubscription) {
      this.availableCarsSubscription.unsubscribe();
    }
    if (this.selectedCarSubscription) {
      this.selectedCarSubscription.unsubscribe();
    }
  }

  loadSavedReservationData(): void {
    const reservationConfirmed = localStorage.getItem('reservationConfirmed');
    const reservedCarDetails = localStorage.getItem('reservedCarDetails');

    this.isConfirmationPopupVisible = !!(
      reservationConfirmed && reservedCarDetails
    );
    this.isOverlayActive = this.isConfirmationPopupVisible;

    if (reservationConfirmed && reservedCarDetails) {
      const car = JSON.parse(reservedCarDetails) as Car;
      this.confirmationMessage = `Korábbi foglalása: ${car.brand} ${car.model}.`;
      this.selectedCar = car;
      this.carImage = car.image || 'car_image_placeholder.jpg';
      this.isReservationConfirmedStepActive = true; // Ha van mentett foglalás, az első lépés aktív
      this.isReservationSentStepCompleted = true; // És a második is befejezett
      this.currentStep = 2;
    } else {
      this.loadSavedSelectedCarId();
      this.isReservationConfirmedStepActive = false; // Alapértelmezésben inaktív
      this.isReservationSentStepCompleted = false; // Alapértelmezésben nem befejezett
      this.currentStep = 1;
    }
  }

  loadSavedSelectedCarId(): void {
    const savedCarId = localStorage.getItem('selectedCarId');
    if (savedCarId && this.availableCars.length > 0) {
      this.selectedCarId = parseInt(savedCarId, 10);
      this.selectedCar =
        this.availableCars.find((car) => car.id === this.selectedCarId) || null;
      if (this.selectedCar) {
        this.carImage = this.selectedCar.image || 'car_image_placeholder.jpg';
        this.carsService.setSelectedCar(this.selectedCar);
      }
    }
  }

  openLoginPanel(): void {
    this.isLoginPanelOpen = true;
    this.isOverlayActive = true;
  }

  openRegisterPanel(): void {
    this.isLoginPanelOpen = false;
    this.isRegisterPanelOpen = true;
    this.isOverlayActive = true;
  }

  openProfilePanel(): void {
    this.isProfilePanelOpen = true;
    this.isOverlayActive = true;
  }

  closeAllPanels(): void {
    this.isLoginPanelOpen = false;
    this.isRegisterPanelOpen = false;
    this.isProfilePanelOpen = false;
    this.isOverlayActive = false;
  }

  async login(event: Event): Promise<void> {
    event.preventDefault();
    this.closeAllPanels();
  }

  logout(): void {
    this.loginService.logout();
    this.closeAllPanels();
    this.clearReservationData();
    this.carsService.clearSelectedCar();
  }

  async register(event: Event): Promise<void> {
    event.preventDefault();
    this.closeAllPanels();
    this.openLoginPanel();
  }

  onProfileImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.username) {
          this.loginService.changeProfileImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  validateEmail(email: string): string | null {
    if (!email) {
      return 'Kérlek add meg az email címed!';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Érvénytelen email!';
    }
    return null;
  }

  validatePassword(password: string): string | null {
    if (!password) {
      return 'Kérlek add meg a jelszavad!';
    } else if (password.length < 8 || password.length > 20) {
      return 'A jelszónak 8-20 karakter hosszúnak kell lennie!';
    } else if (!/^[A-Z]/.test(password)) {
      return 'A jelszónak nagybetűvel kell kezdődnie!';
    }
    return null;
  }

  validateUsername(username: string): string | null {
    if (!username) {
      return 'Kérlek add meg a felhasználóneved!';
    }
    return null;
  }

  validatePersonalId(personalId: string): string | null {
    if (!personalId) {
      return 'Kérlek add meg a személyi azonosítódat!';
    }
    return null;
  }

  isRegistrationFormValid(): boolean {
    return !(
      !this.registerUsername ||
      !this.registerEmail ||
      !this.registerPassword ||
      !this.registerPersonalId ||
      this.validateEmail(this.registerEmail) !== null ||
      this.validatePassword(this.registerPassword) !== null ||
      this.validateUsername(this.registerUsername) !== null ||
      this.validatePersonalId(this.registerPersonalId) !== null
    );
  }

  goToNextStep(): void {
    if (this.isLoggedIn && this.selectedCar) {
      this.currentStep++;
    } else if (!this.isLoggedIn) {
      alert('Kérlek jelentkezz be a folytatáshoz!');
    } else {
      alert('Kérlek válassz egy autót a foglaláshoz a Cars oldalon!');
    }
  }

  confirmReservation(): void {
    if (this.isLoggedIn && this.selectedCar) {
      this.isConfirmationPopupVisible = true;
      this.isOverlayActive = true;
      this.confirmationMessage = `Köszönjük a ${this.selectedCar.brand} ${this.selectedCar.model} foglalását!`;

      // Mentés a localStorage-ba
      localStorage.setItem('reservationConfirmed', 'true');
      localStorage.setItem(
        'reservedCarDetails',
        JSON.stringify(this.selectedCar)
      );

      this.isReservationConfirmedStepActive = true; // A "Lefoglalom" gombra kattintás után az első lépés aktívvá válik
      this.isReservationSentStepCompleted = false; // A második még nem befejezett
    } else if (!this.isLoggedIn) {
      alert('Kérlek jelentkezz be a foglalás véglegesítéséhez!');
    } else {
      alert('Nincs kiválasztott autó a foglaláshoz!');
    }
  }

  closeConfirmationPopup(): void {
    this.isConfirmationPopupVisible = false;
    this.isOverlayActive = false;
    this.isReservationSentStepCompleted = true; // A felugró ablak bezárásakor a második lépés befejezetté válik
    this.currentStep = 2;
    this.confirmationMessage = '';
    this.clearSelectedCarData();
  }

  deleteReservation(): void {
    this.clearReservationData();
    this.clearSelectedCarData();
    this.selectedCar = null;
    this.carImage = 'car_image_placeholder.jpg';
    this.currentStep = 1;
    this.isConfirmationPopupVisible = false;
    this.isOverlayActive = false;
    this.confirmationMessage = '';
    this.isReservationConfirmedStepActive = false; // Törléskor visszaállítjuk az alapértelmezett állapotot
    this.isReservationSentStepCompleted = false;
    alert('A foglalás törölve.');
  }

  clearSelectedCarData(): void {
    localStorage.removeItem('selectedCarId');
    this.carsService.clearSelectedCar();
  }

  clearReservationData(): void {
    localStorage.removeItem('reservationConfirmed');
    localStorage.removeItem('reservedCarDetails');
    this.clearSelectedCarData();
  }
}
