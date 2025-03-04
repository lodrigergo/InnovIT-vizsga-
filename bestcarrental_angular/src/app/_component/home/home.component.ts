import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ProfilePanelComponent } from '../profile-panel/profile-panel.component';
import { CarsComponent } from '../cars/cars.component';
import { ReservationComponent } from '../reservation/reservation.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [
    LoginComponent,
    RegisterComponent,
    ProfilePanelComponent,
    CarsComponent,
    ReservationComponent,
    NavbarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
