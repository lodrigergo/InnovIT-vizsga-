import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../_service/login.service';
import { ProfilePanelService } from '../../_service/profile-panel.service';
import { Router, RouterModule } from '@angular/router';
import { ProfilePanelComponent } from '../profile-panel/profile-panel.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ProfilePanelComponent, RouterModule],
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
            <li>
              <a
                routerLink="/"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                >Home</a
              >
            </li>

            <li><a routerLink="/home" routerLinkActive="">About</a></li>

            <li><a routerLink="/cars" routerLinkActive="">Cars</a></li>
            <li>
              <a [routerLink]="['/reservation']">Reservations</a>
            </li>
            <li *ngIf="loginService.isAdmin$ | async">
              <a routerLink="/admin" routerLinkActive="active"
                ><i class="fa fa-cog"></i> Admin</a
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
          class="profileIconInHomePage"
          style="width: 40px; height: 40px; border-radius: 30%; margin-right: 20px; cursor: pointer; transition: transform 0.3s ease;"
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
    public profilePanelService: ProfilePanelService,
    private router: Router
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
