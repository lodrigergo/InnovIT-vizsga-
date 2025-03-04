import { Routes } from '@angular/router';
import { HomeComponent } from './_component/home/home.component';
import { CarsComponent } from './_component/cars/cars.component';
import { LoginComponent } from './_component/login/login.component';
import { RegisterComponent } from './_component/register/register.component';
import { ReservationComponent } from './_component/reservation/reservation.component';
import { NavbarComponent } from './_component/navbar/navbar.component';
import { ForgotPasswordComponent } from './_component/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];
