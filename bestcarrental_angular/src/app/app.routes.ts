import { Routes } from '@angular/router';
import { HomeComponent } from './_component/home/home.component';
import { CarsComponent } from './_component/cars/cars.component';
import { RegisterComponent } from './_component/register/register.component';
import { ReservationComponent } from './_component/reservation/reservation.component';
import { NavbarComponent } from './_component/navbar/navbar.component';
import { ForgotPasswordComponent } from './_component/forgot-password/forgot-password.component';
import { AuthGuard } from './_guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cars', component: CarsComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];
