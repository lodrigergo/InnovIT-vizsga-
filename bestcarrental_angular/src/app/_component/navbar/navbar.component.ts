import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../_service/login.service';
import { ProfilePanelService } from '../../_service/profile-panel.service';
import { ProfilePanelComponent } from '../profile-panel/profile-panel.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ProfilePanelComponent],
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
        <button
          *ngIf="!(loginService.isLoggedIn$ | async)"
          class="login-btn"
          (click)="openLoginPanel()"
        >
          Login
        </button>
        <img
          *ngIf="loginService.isLoggedIn$ | async"
          [src]="loginService.profileImageUrl$ | async"
          alt="Profile Icon"
          id="profile-icon"
          style="width: 40px; height: 40px; border-radius: 30%; margin-right: 20px; cursor: pointer;"
          (click)="openProfilePanel()"
        />
      </div>
    </header>
    <app-profile-panel></app-profile-panel>
    <div
      *ngIf="profilePanelService.profilePanelOpen$ | async"
      class="overlay show"
      (click)="closeProfilePanel()"
    ></div>
  `,
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    public loginService: LoginService,
    public profilePanelService: ProfilePanelService
  ) {}

  openLoginPanel(): void {
    this.loginService.openPanel();
  }

  openProfilePanel(): void {
    this.profilePanelService.openPanel();
  }

  closeProfilePanel(): void {
    this.profilePanelService.closePanel();
  }

  logout(): void {
    this.loginService.logout();
  }
}
