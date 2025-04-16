import { Routes } from '@angular/router';
import { HomeComponent } from './_component/home/home.component';
import { CarsComponent } from './_component/cars/cars.component';
import { RegisterComponent } from './_component/register/register.component';
import { ReservationComponent } from './_component/reservation/reservation.component';
import { ForgotPasswordComponent } from './_component/forgot-password/forgot-password.component';
import { authGuard } from './_guard/auth.guard';
import { AdminComponent } from './_component/admin/admin.component';
import { LoginComponent } from './_component/login/login.component';
import { ProfilPanelComponent } from './_component/profil-panel/profil-panel.component';
import { NotFoundComponent } from './_component/not-found/not-found.component';
import { FooterComponent } from './_component/footer/footer.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reservation/:carId', component: ReservationComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'profile-panel', component: ProfilPanelComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
  { path: 'footer', component: FooterComponent },
];
