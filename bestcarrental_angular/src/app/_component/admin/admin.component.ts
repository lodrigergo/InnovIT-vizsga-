import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  password?: string;
  personalId?: string;
}

interface Car {
  id: number;
  brand: string;
  model: string;
  licensePlate: string;
  year: number;
  fuelType: string;
  pricePerDay: number;
  transmission: string;
  doors: number;
  AC: boolean;
  seats: number;
  image: string;
}

interface Booking {
  id: number;
  userId: number;
  carId: number;
  pickupDate: string;
  returnDate: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy, AfterViewInit {
  users: User[] = [];
  cars: Car[] = [];
  bookings: Booking[] = [];
  admins: User[] = [];
  

  isEditCarModalVisible: boolean = false;
  selectedCar: Car | null = null;

  isEditUserModalVisible: boolean = false;
  selectedUser: User | null = null;

  isDeleteUserModalVisible: boolean = false;
  userToDeleteId: number | null = null;

  isDeleteCarModalVisible: boolean = false;
  carToDeleteId: number | null = null;

  isDeleteBookingModalVisible: boolean = false;
  bookingToDeleteId: number | null = null;

  isEditAdminModalVisible: boolean = false; // Admin szerkesztése modal láthatósága
  selectedAdmin: User | null = null; // Kiválasztott admin szerkesztéshez

  isDeleteAdminModalVisible: boolean = false; // Admin törlése modal láthatósága
  adminToDeleteId: number | null = null; // Törlendő admin ID

  private usersSubscription: Subscription | undefined;
  private carsSubscription: Subscription | undefined;
  private bookingsSubscription: Subscription | undefined;
  private adminsSubscription: Subscription | undefined;
  private updateAdminSubscription: Subscription | undefined;
  private deleteAdminSubscription: Subscription | undefined;

  @ViewChild('usersSection') usersSection!: ElementRef;
  @ViewChild('carsSection') carsSection!: ElementRef;
  @ViewChild('bookingsSection') bookingsSection!: ElementRef;
  @ViewChild('adminsSection') adminsSection!: ElementRef;

  constructor(private http: HttpClient, private el: ElementRef) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.handleNavigation();
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
    if (this.carsSubscription) {
      this.carsSubscription.unsubscribe();
    }
    if (this.bookingsSubscription) {
      this.bookingsSubscription.unsubscribe();
    }
    if (this.adminsSubscription) {
      this.adminsSubscription.unsubscribe();
    }
    if (this.updateAdminSubscription) {
      this.updateAdminSubscription.unsubscribe();
    }
    if (this.deleteAdminSubscription) {
      this.deleteAdminSubscription.unsubscribe();
    }
  }

  handleNavigation(): void {
    this.el.nativeElement
      .querySelectorAll('.nav-links a')
      .forEach((link: HTMLAnchorElement) => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          const targetId = link.getAttribute('href')?.substring(1);
          this.scrollToSection(targetId);
        });
      });
  }

  scrollToSection(targetId: string | undefined): void {
    if (targetId === 'users' && this.usersSection) {
      this.usersSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (targetId === 'cars' && this.carsSection) {
      this.carsSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (targetId === 'bookings' && this.bookingsSection) {
      this.bookingsSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (targetId === 'admins' && this.adminsSection) { 
      this.adminsSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  loadUsers() {
    this.usersSubscription = this.http
      .get<{ statusCode: number; users: User[]; message?: string }>(
        'http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/getAllUser'
      )
      .subscribe({
        next: (data) => {
          if (data.statusCode === 200) {
            this.users = data.users.filter(user => !user.isAdmin); 
          } else {
            alert('Hiba: ' + data.message);
          }
        },
        error: (error) => {
          console.error('Hiba a felhasználók lekérésekor:', error);
          alert('Hiba történt a felhasználók lekérésekor.');
        },
      });
  }

  loadAdmins() {
    this.adminsSubscription = this.http
      .get<{ statusCode: number; users: User[]; message?: string }>(
        'http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/getAllAdmin'
      )
      .subscribe({
        next: (data) => {
          if (data.statusCode === 200) {
            this.admins = data.users;
          } else {
            alert('Hiba: ' + data.message);
          }
        },
        error: (error) => {
          console.error('Hiba az adminisztrátorok lekérésekor:', error);
          alert('Hiba történt az adminisztrátorok lekérésekor.');
        },
      });
  }

  openEditAdminModal(admin: User) {
    console.log('Admin szerkesztése gomb megnyomva:', admin); // Ellenőrzés
    this.selectedAdmin = { ...admin };
    this.isEditAdminModalVisible = true;
  }

  closeEditAdminModal() {
    this.isEditAdminModalVisible = false;
    this.selectedAdmin = null;
  }

  updateAdmin() {
    if (this.selectedAdmin) {
      const updateUrl = `http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/updateUserById?id=${this.selectedAdmin.id}`;
      const payload = {
        id: this.selectedAdmin.id,
        name: this.selectedAdmin.name,
        email: this.selectedAdmin.email,
        password: this.selectedAdmin.password, 
        isAdmin: true 
      };

      this.updateAdminSubscription = this.http.put<{ status?: string; errorMessage?: string }>(updateUrl, payload)
        .subscribe({
          next: (data) => {
            if (data.status === 'success') {
              alert('Adminisztrátor frissítve!');
              this.loadAdmins();
              this.closeEditAdminModal();
            } else {
              alert('Hiba történt a frissítés során: ' + (data.errorMessage || data.status));
            }
          },
          error: (error) => {
            console.error('Hiba az adminisztrátor frissítésekor:', error);
            alert('Hiba történt az adminisztrátor frissítésekor.');
          }
        });
    }
  }

  openDeleteAdminModal(adminId: number) {
    console.log('Admin törlése gomb megnyomva:', adminId); 
    this.adminToDeleteId = adminId;
    this.isDeleteAdminModalVisible = true;
  }

  closeDeleteAdminModal() {
    this.isDeleteAdminModalVisible = false;
    this.adminToDeleteId = null;
  }

  confirmDeleteAdmin() {
    if (this.adminToDeleteId !== null) {
      this.deleteAdminRequest(this.adminToDeleteId);
    }
    this.closeDeleteAdminModal();
  }

  deleteAdminRequest(id: number) {
    const deleteUrl = `http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/deleteUserById?id=${id}`;
    this.deleteAdminSubscription = this.http.delete<{ result: string }>(deleteUrl)
      .subscribe({
        next: (data) => {
          if (data.result === 'success') {
            alert('Adminisztrátor törölve!');
            this.loadAdmins();
          } else {
            alert('Hiba történt a törlés során.');
          }
        },
        error: (error) => {
          console.error('Hiba az adminisztrátor törlésekor:', error);
          alert('Hiba történt az adminisztrátor törlésekor.');
        }
      });
  }

  openDeleteUserModal(userId: number) {
    this.userToDeleteId = userId;
    this.isDeleteUserModalVisible = true;
  }

  closeDeleteUserModal() {
    this.isDeleteUserModalVisible = false;
    this.userToDeleteId = null;
  }

  confirmDeleteUser() {
    if (this.userToDeleteId !== null) {
      this.deleteUserRequest(this.userToDeleteId);
    }
    this.closeDeleteUserModal();
  }

  deleteUserRequest(id: number) {
    this.http
      .delete<{ result: string }>(
        `http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/deleteUserById?id=${id}`
      )
      .subscribe({
        next: (data) => {
          if (data.result === 'success') {
            alert('Felhasználó törölve!');
            this.loadUsers();
          } else {
            alert('Hiba történt a törlés során.');
          }
        },
        error: (error) => {
          console.error('Hiba a felhasználó törlésekor:', error);
          alert('Hiba történt a felhasználó törlésekor.');
        },
      });
  }

  openEditUserModal(user: User) {
    this.selectedUser = { ...user };
    this.isEditUserModalVisible = true;
  }

  closeEditUserModal() {
    this.isEditUserModalVisible = false;
    this.selectedUser = null;
  }

  updateUser() {
    if (this.selectedUser) {
      console.log('Elküldendő felhasználói adatok:', {
        id: this.selectedUser.id,
        name: this.selectedUser.name,
        email: this.selectedUser.email,
        password: this.selectedUser.password,
        personalId: this.selectedUser.personalId,
      });
      this.http
        .put<{ status?: string; errorMessage?: string }>(
          `http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/updateUserById?id=${this.selectedUser.id}`,
          {
            id: this.selectedUser.id,
            name: this.selectedUser.name,
            email: this.selectedUser.email,
            password: this.selectedUser.password,
            personalId: this.selectedUser.personalId,
          }
        )
        .subscribe({
          next: (data) => {
            if (data.status === 'success') {
              alert('Felhasználó frissítve!');
              this.loadUsers();
              this.closeEditUserModal();
            } else {
              alert(
                'Hiba történt a frissítés során: ' +
                  (data.errorMessage || data.status)
              );
            }
          },
          error: (error) => {
            console.error('Frissítési hiba:', error);
            alert('Hiba történt a felhasználó frissítésekor.');
          },
        });
    }
  }
  

  loadCars() {
    this.carsSubscription = this.http
      .get<{ statusCode: number; cars: Car[]; message?: string }>(
        'http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/car/getAllCar'
      )
      .subscribe({
        next: (data) => {
          if (data.statusCode === 200) {
            this.cars = data.cars;
          } else {
            alert('Hiba: ' + data.message);
          }
        },
        error: (error) => {
          console.error('Hiba az autók lekérésekor:', error);
          alert('Hiba történt az autók lekérésekor.');
        },
      });
  }

  addCar() {
    const brandElement = document.getElementById(
      'car-brand'
    ) as HTMLInputElement;
    const brand = brandElement?.value || '';
    const modelElement = document.getElementById(
      'car-model'
    ) as HTMLInputElement;
    const model = modelElement?.value || '';
    const licensePlateElement = document.getElementById(
      'car-licensePlate'
    ) as HTMLInputElement;
    const licensePlate = licensePlateElement?.value || '';
    const yearInputElement = document.getElementById(
      'car-year'
    ) as HTMLInputElement;
    const yearStr = yearInputElement?.value || '';
    const year = /^\d{4}$/.test(yearStr) ? parseInt(yearStr, 10) : 0;
    const fuelTypeElement = document.getElementById(
      'car-fuelType'
    ) as HTMLInputElement;
    const fuelType = fuelTypeElement?.value || '';
    const pricePerDayInputElement = document.getElementById(
      'car-price'
    ) as HTMLInputElement;
    const pricePerDayStr = pricePerDayInputElement?.value || '';
    const pricePerDayFormatted = parseFloat(pricePerDayStr.replace(',', '.'));
    const pricePerDay = isNaN(pricePerDayFormatted) ? 0 : pricePerDayFormatted;
    const transmissionElement = document.getElementById(
      'car-transmission'
    ) as HTMLInputElement;
    const transmission = transmissionElement?.value || '';
    const doorsInputElement = document.getElementById(
      'car-doors'
    ) as HTMLInputElement;
    const doorsStr = doorsInputElement?.value || '';
    const doors = isNaN(parseInt(doorsStr, 10)) ? 0 : parseInt(doorsStr, 10);
    const acInputElement = document.getElementById(
      'car-ac'
    ) as HTMLInputElement;
    const ac = acInputElement?.checked || false;
    const seatsInputElement = document.getElementById(
      'car-seat'
    ) as HTMLInputElement;
    const seatsStr = seatsInputElement?.value || '';
    const seats = isNaN(parseInt(seatsStr, 10)) ? 0 : parseInt(seatsStr, 10);
    const imageElement = document.getElementById(
      'car-image'
    ) as HTMLInputElement;
    const image = imageElement?.value || '';

    const carData = {
      brand: brand,
      model: model,
      licensePlate: licensePlate,
      year: year,
      fuelType: fuelType,
      pricePerDay: pricePerDay,
      transmission: transmission,
      doors: doors,
      ac: ac,
      seats: seats,
      image: image,
    };

    console.log('Elküldendő carData:', carData); // Debugging célból

    this.http
      .post<{ status?: string; errorMessage?: string }>(
        'http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/car/addCar',
        carData
      )
      .subscribe({
        next: (data) => {
          if (data.status === 'success') {
            alert('Autó sikeresen hozzáadva!');
            this.loadCars();
            (
              document.getElementById('add-car-form') as HTMLFormElement
            ).reset();
          } else {
            alert('Hiba: ' + (data.errorMessage || data.status));
          }
        },
        error: (error) => {
          console.error('Hiba az autó hozzáadásakor:', error);
          alert('Hiba történt az autó hozzáadásakor.');
        },
      });
  }

  openDeleteCarModal(carId: number) {
    this.carToDeleteId = carId;
    this.isDeleteCarModalVisible = true;
  }

  closeDeleteCarModal() {
    this.isDeleteCarModalVisible = false;
    this.carToDeleteId = null;
  }

  confirmDeleteCar() {
    if (this.carToDeleteId !== null) {
      this.deleteCarRequest(this.carToDeleteId);
    }
    this.closeDeleteCarModal();
  }

  deleteCarRequest(id: number) {
    this.http
      .delete<{ result: string }>(
        `http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/car/deleteCarById?id=${id}`
      )
      .subscribe({
        next: (data) => {
          if (data.result === 'success') {
            alert('Autó törölve!');
            this.loadCars();
          } else {
            alert('Hiba történt a törlés során.');
          }
        },
        error: (error) => {
          console.error('Hiba az autó törlésekor:', error);
          alert('Hiba történt az autó törlésekor.');
        },
      });
  }

  openEditCarModal(car: Car) {
    this.selectedCar = { ...car };
    this.isEditCarModalVisible = true;
  }

  closeEditCarModal() {
    this.isEditCarModalVisible = false;
    this.selectedCar = null;
  }

  updateCar() {
    if (this.selectedCar) {
      const updatedCarData = {
        ...this.selectedCar,
        pricePerDay: parseFloat(
          String(this.selectedCar.pricePerDay).replace(',', '.')
        ),
      };

      this.http
        .put<{ status?: string; errorMessage?: string }>(
          `http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/car/updateCarById?id=${this.selectedCar.id}`,
          updatedCarData
        )
        .subscribe({
          next: (data) => {
            if (data.status === 'success') {
              alert('Autó frissítve!');
              this.loadCars();
              this.closeEditCarModal();
            } else {
              alert(
                'Hiba történt a frissítés során: ' +
                  (data.errorMessage || data.status)
              );
            }
          },
          error: (error) => {
            console.error('Frissítési hiba:', error);
            alert('Hiba történt az autó frissítésekor.');
          },
        });
    }
  }

  loadBookings() {
    this.bookingsSubscription = this.http
      .get<{ statusCode: number; Bookings: Booking[]; message?: string }>(
        'http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/BookingsController/getAllBookings'
      )
      .subscribe({
        next: (data) => {
          if (data.statusCode === 200) {
            this.bookings = data.Bookings;
          } else {
            alert('Hiba: ' + data.message);
          }
        },
        error: (error) => {
          console.error('Hiba a foglalások lekérésekor:', error);
          alert('Hiba történt a foglalások lekérésekor.');
        },
      });
  }

  openDeleteBookingModal(bookingId: number) {
    this.bookingToDeleteId = bookingId;
    this.isDeleteBookingModalVisible = true;
  }

  closeDeleteBookingModal() {
    this.isDeleteBookingModalVisible = false;
    this.bookingToDeleteId = null;
  }

  confirmDeleteBooking() {
    if (this.bookingToDeleteId !== null) {
      this.deleteBookingRequest(this.bookingToDeleteId);
    }
    this.closeDeleteBookingModal();
  }

  deleteBookingRequest(bookingId: number) {
    this.http
      .delete<{ result: string }>(
        `http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/BookingsController/deleteBookingById?id=${bookingId}`
      )
      .subscribe({
        next: (data) => {
          if (data.result === 'success') {
            alert('Foglalás törölve!');
            this.loadBookings();
          } else {
            alert('Hiba történt a törlés során.');
          }
        },
        error: (error) => {
          console.error('Hiba a foglalás törlésekor:', error);
          alert('Hiba történt a foglalás törlésekor.');
        },
      });
  }
}
