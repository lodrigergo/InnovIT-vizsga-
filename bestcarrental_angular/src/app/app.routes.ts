import { Routes } from '@angular/router';
import { HomeComponent } from './_component/home/home.component';
import { CarsComponent } from './_component/cars/cars.component';
import { RegisterComponent } from './_component/register/register.component';
import { ReservationComponent } from './_component/reservation/reservation.component';
import { NavbarComponent } from './_component/navbar/navbar.component';
import { ForgotPasswordComponent } from './_component/forgot-password/forgot-password.component';
import { AuthGuard } from './_guard/auth.guard';
import { AdminComponent } from './_component/admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reservation/:carId', component: ReservationComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'admin', component: AdminComponent },
];
