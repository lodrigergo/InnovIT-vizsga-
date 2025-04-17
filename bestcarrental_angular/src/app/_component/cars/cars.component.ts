import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LoginService } from '../../_service/login.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RegisterService } from '../../_service/register.service';
import { Subscription } from 'rxjs';
import { CarsService } from '../../_service/cars.service';

interface Car {
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
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userName: string | null = null;
  profileImageUrl: string | null = null;
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginErrorMessage: string = '';
  registerErrorMessage: string = '';
  isLoginLoading = false; // Új állapotjelző a betöltéshez
  showProfilePanel = false;
  private isLoggedInSubscription: Subscription | undefined;
  private userNameSubscription: Subscription | undefined;
  private profileImageUrlSubscription: Subscription | undefined;
  allCars: Car[] = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
      year: 2021,
      fuel: 'Petrol',
      persons: 5,
      price: 61,
      image: 'Toyota Corolla 1.8 sedan. hybridjpg.png',
      details: {
        doors: 4,
        fuelType: 'Petrol',
        transmission: 'A',
        airConditioning: true,
        seats: 5,
      },
    },
    {
      id: 2,
      brand: 'Toyota',
      model: 'Rav4',
      year: 2021,
      fuel: 'Hybrid',
      persons: 5,
      price: 70,
      image: 'toyota rav4 ujabb.jpeg',
      details: {
        doors: 4,
        fuelType: 'Hybrid',
        transmission: 'A',
        airConditioning: true,
        seats: 5,
      },
    },
    {
      id: 3,
      brand: 'Fiat',
      model: '500',
      year: 2022,
      fuel: 'Petrol',
      persons: 4,
      price: 45,
      image: 'Fiat 500 JKL-654 2022 Benzin.jpeg',
      details: {
        doors: 2,
        fuelType: 'Petrol',
        transmission: 'Manual',
        airConditioning: true,
        seats: 4,
      },
    },
    {
      id: 4,
      brand: 'Volkswagen',
      model: 'Golf',
      year: 2018,
      fuel: 'Diesel',
      persons: 5,
      price: 55,
      image: 'VOlkswagen golf 2018.jpg',
      details: {
        doors: 4,
        fuelType: 'Diesel',
        transmission: 'Manual',
        airConditioning: true,
        seats: 5,
      },
    },
    {
      id: 5,
      brand: 'Volkswagen',
      model: 'Passat',
      year: 2018,
      fuel: 'Diesel',
      persons: 5,
      price: 60,
      image: 'Volkswagen-passat-2018.webp',
      details: {
        doors: 4,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        airConditioning: true,
        seats: 5,
      },
    },
    {
      id: 6,
      brand: 'Volvo',
      model: 'V60',
      year: 2019,
      fuel: 'Diesel',
      persons: 5,
      price: 65,
      image: 'Volvo V60 2019.jpeg',
      details: {
        doors: 5,
        fuelType: 'Diesel',
        transmission: 'Manual',
        airConditioning: true,
        seats: 5,
      },
    },
    {
      id: 7,
      brand: 'Volvo',
      model: 'XC90',
      year: 2020,
      fuel: 'Hybrid',
      persons: 7,
      price: 85,
      image: 'Volvo XC90 2019.jpeg',
      details: {
        doors: 5,
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        airConditioning: true,
        seats: 7,
      },
    },
    {
      id: 8,
      brand: 'Honda',
      model: 'Civic',
      year: 2020,
      fuel: 'Petrol',
      persons: 5,
      price: 50,
      image: 'Honda Civic 2020.jpeg',
      details: {
        doors: 4,
        fuelType: 'Petrol',
        transmission: 'Manual',
        airConditioning: true,
        seats: 5,
      },
    },
    {
      id: 9,
      brand: 'Honda',
      model: 'Accord',
      year: 2020,
      fuel: 'Petrol',
      persons: 5,
      price: 70,
      image: 'honda_accord_2020_uj.jpg',
      details: {
        doors: 4,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        airConditioning: true,
        seats: 5,
      },
    },
  ];
  filteredCars: Car[] = [];
  activeFilters: { [key: string]: string[] } = {
    brand: [],
    persons: [],
    price: [],
    year: [],
    fuel: [],
  };
  selectedCarId: number | null = null;

  constructor(
    public loginService: LoginService,
    public registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router,
    private carsService: CarsService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      personalId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loginService.checkLoginStatus();
    this.isLoggedInSubscription = this.loginService.isLoggedIn$.subscribe(
      (loggedIn) => (this.isLoggedIn = loggedIn)
    );
    this.userNameSubscription = this.loginService.userName$.subscribe(
      (userName) => (this.userName = userName)
    );
    this.profileImageUrlSubscription =
      this.loginService.profileImageUrl$.subscribe(
        (profileImageUrl) => (this.profileImageUrl = profileImageUrl)
      );
    this.filteredCars = [...this.allCars];
    this.carsService.setAvailableCars(this.allCars);
    console.log('Available cars set in CarsComponent:', this.allCars);
  }

  ngOnDestroy(): void {
    if (this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe();
    }
    if (this.userNameSubscription) {
      this.userNameSubscription.unsubscribe();
    }
    if (this.profileImageUrlSubscription) {
      this.profileImageUrlSubscription.unsubscribe();
    }
  }

  openLoginPanel() {
    this.loginService.openPanel();
    this.loginErrorMessage = '';
    this.loginForm.reset();
  }

  closeLoginPanel() {
    this.loginService.closePanel();
  }

  openRegisterPanel() {
    this.loginService.closePanel();
    this.registerService.openPanel();
    this.registerErrorMessage = '';
    this.registerForm.reset();
  }

  closeRegisterPanel() {
    this.registerService.closePanel();
  }

  openProfilePanel() {
    this.showProfilePanel = true;
  }

  closeProfilePanel() {
    this.showProfilePanel = false;
  }

  closeOverlay() {
    this.loginService.closePanel();
    this.registerService.closePanel();
    this.closeProfilePanel();
  }

  submitLogin() {
    if (this.loginForm.valid) {
      this.isLoginLoading = true; // Betöltés jelző beállítása
      this.loginErrorMessage = ''; // Hibaüzenet törlése
      const { email, password } = this.loginForm.value;
      this.loginService.login({ email, password }).subscribe({
        next: (response) => {
          console.log('Login successful response:', response);
          this.isLoginLoading = false; // Betöltés jelző kikapcsolása
          this.closeLoginPanel();
          // Itt lehetne pl. egy sikeres bejelentkezés üzenet megjelenítése
        },
        error: (error) => {
          console.error('Login error:', error);
          this.isLoginLoading = false; // Betöltés jelző kikapcsolása
          if (error && error.error && error.error.message) {
            this.loginErrorMessage = error.error.message; // Szerveroldali hibaüzenet megjelenítése, ha van
          } else if (error && error.status) {
            this.loginErrorMessage = `Hiba a bejelentkezés során. Státusz: ${error.status}`;
          } else {
            this.loginErrorMessage =
              'Ismeretlen hiba történt a bejelentkezés során.';
          }
        },
      });
    } else {
      this.loginErrorMessage = 'Kérjük, töltse ki az összes mezőt érvényesen!';
    }
  }

  submitRegister() {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.closeRegisterPanel();
          this.openLoginPanel();
          // Itt lehetne egy sikeres regisztráció üzenet megjelenítése
        },
        error: (error) => {
          console.error('Registration error:', error);
          if (error && error.error && error.error.message) {
            this.registerErrorMessage = error.error.message;
          } else if (error && error.status) {
            this.registerErrorMessage = `Hiba a regisztráció során. Státusz: ${error.status}`;
          } else {
            this.registerErrorMessage =
              'Ismeretlen hiba történt a regisztráció során.';
          }
        },
      });
    } else {
      this.registerErrorMessage =
        'Kérjük, töltse ki az összes mezőt érvényesen!';
    }
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.userName = null;
    this.profileImageUrl = null;
    this.router.navigate(['/']);
  }

  updateFilter(filterType: string, filterValue: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.activeFilters[filterType] = [
        ...this.activeFilters[filterType],
        filterValue,
      ];
    } else {
      this.activeFilters[filterType] = this.activeFilters[filterType].filter(
        (value) => value !== filterValue
      );
    }
    this.filterCars();
  }

  filterCars() {
    this.filteredCars = this.allCars.filter((car) => {
      let matchesAllFilters = true;
      for (const filterType in this.activeFilters) {
        if (this.activeFilters[filterType].length > 0) {
          let matchesCurrentFilter = false;
          for (const filterValue of this.activeFilters[filterType]) {
            if (filterType === 'price') {
              const [minStr, maxStr] = filterValue.split('€-');
              const min = parseInt(minStr, 10);
              const max = parseInt(maxStr, 10);
              if (car.price >= min && car.price <= max) {
                matchesCurrentFilter = true;
                break;
              }
            } else if (
              car[filterType as keyof Car]?.toString().toLowerCase() ===
              filterValue.toLowerCase()
            ) {
              matchesCurrentFilter = true;
              break;
            } else if (
              filterType === 'persons' &&
              car.details.seats.toString() === filterValue
            ) {
              matchesCurrentFilter = true;
              break;
            }
          }
          if (!matchesCurrentFilter) {
            matchesAllFilters = false;
            break;
          }
        }
      }
      return matchesAllFilters;
    });
  }

  resetFilters() {
    this.activeFilters = {
      brand: [],
      persons: [],
      price: [],
      year: [],
      fuel: [],
    };
    const checkboxes = document.querySelectorAll(
      'aside.sidebar input[type="checkbox"]'
    ) as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    this.filterCars();
  }

  toggleDetails(carId: number) {
    if (this.selectedCarId === carId) {
      this.selectedCarId = null;
    } else {
      this.selectedCarId = carId;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const clickedInsideCarCard = targetElement.closest('.car-card');
    const clickedOnDetailsButton =
      targetElement.classList.contains('details-btn');
    if (!clickedInsideCarCard && !clickedOnDetailsButton) {
      this.selectedCarId = null;
    }
  }

  arrangeCars(sortBy: string) {
    if (sortBy === 'price') {
      this.filteredCars.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      this.filteredCars.sort((a, b) => b.price - a.price);
    }
  }

  onArrangementChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.arrangeCars(selectedValue);
  }

  onReservationClick(car: Car): void {
    this.carsService.setSelectedCar(car);
    this.router.navigate(['/reservation']);
  }
}
