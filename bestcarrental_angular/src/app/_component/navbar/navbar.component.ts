// src/app/_component/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../_service/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="navbar">
      <div class="container">
        <img
          src="logo for the website.webp"
          alt="Best Car Rental Logo"
          class="logo"
          id="logo"
        />
        <nav>
          <ul class="nav-links">
            <li><a href="#home" class="home-link" id="home-link">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="../cars/cars.component.html">Cars</a></li>
            <li>
              <a href="../reservation/reservation.component.html"
                >Reservations</a
              >
            </li>
          </ul>
        </nav>
        <!-- A login gomb megnyomásával meghívjuk a service openPanel() metódusát -->
        <button class="login-btn" (click)="openLoginPanel()">Login</button>
        <img
          src="profile icon.webp"
          alt="Profile Icon"
          id="profile-icon"
          style="display: none; width: 40px; height: 40px; border-radius: 30%; margin-right: 20px;"
        />
      </div>
    </header>
  `,
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private loginService: LoginService) {}

  openLoginPanel(): void {
    this.loginService.openPanel();
  }
}
