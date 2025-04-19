import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { LoginService } from '../../_service/login.service';
import { ProfilePanelService } from '../../_service/profile-panel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-panel',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <div
      class="profile-panel-container"
      *ngIf="loginService.isLoggedIn$ | async"
    >
      <div id="profile-panel" class="profile-panel" [class.open]="isPanelOpen">
        <div class="profile-header">
          <ng-container
            *ngIf="loginService.profileImageUrl$ | async as profileImageUrl"
          >
            <img
              [src]="profileImageUrl"
              alt="Profile Icon"
              class="profile-image"
              id="profile-image"
            />
          </ng-container>
          <ng-container *ngIf="loginService.userName$ | async as userName">
            <h2>{{ userName }}</h2>
          </ng-container>
          <button
            id="close-profile-panel"
            class="close-btn"
            (click)="closePanel()"
          >
            &times;
          </button>
        </div>
        <div class="profile-image-selection">
          <h3>Válassz profilképet:</h3>
          <img
            src="pepega_almos.png"
            alt="Pepega 1"
            class="profile-option"
            data-image="pepega_almos.png"
            (click)="loginService.changeProfileImage('pepega_almos.png')"
          />
          <img
            src="pepega_fizet.gif"
            alt="Pepega 2"
            class="profile-option"
            data-image="pepega_fizet.gif"
            (click)="loginService.changeProfileImage('pepega_fizet.gif')"
          />
          <img
            src="pepega_fogyatek.png"
            alt="Pepega 3"
            class="profile-option"
            data-image="pepega_fogyatek.png"
            (click)="loginService.changeProfileImage('pepega_fogyatek.png')"
          />
          <img
            src="pepega_izgul.jpg"
            alt="Pepega 4"
            class="profile-option"
            data-image="pepega_izgul.jpg"
            (click)="loginService.changeProfileImage('pepega_izgul.jpg')"
          />
          <img
            src="pepega_ordibal.png"
            alt="Pepega 5"
            class="profile-option"
            data-image="pepega_ordibal.png"
            (click)="loginService.changeProfileImage('pepega_ordibal.png')"
          />
          <img
            src="pepega_szomoru.jpg"
            alt="Pepega 6"
            class="profile-option"
            data-image="pepega_szomoru.jpg"
            (click)="loginService.changeProfileImage('pepega_szomoru.jpg')"
          />
          <img
            src="pepega_vidam.jpg"
            alt="Pepega 7"
            class="profile-option"
            data-image="pepega_vidam.jpg"
            (click)="loginService.changeProfileImage('pepega_vidam.jpg')"
          />
          <img
            src="pepega_zenethallgat.png"
            alt="Pepega 8"
            class="profile-option"
            data-image="pepega_zenethallgat.png"
            (click)="loginService.changeProfileImage('pepega_zenethallgat.png')"
          />
        </div>
        <div class="profile-content">
          <h3>WELCOME</h3>
          <ul>
            <li>
              <a href="#home"><i class="fa fa-home"></i> Home</a>
            </li>
            <li>
              <a href="../cars/cars.component.html"
                ><i class="fa fa-car"></i> Cars</a
              >
            </li>
            <li>
              <a href="..//reservation/reservation.component.html"
                ><i class="fa fa-calendar"></i> Reservation</a
              >
            </li>
            <li *ngIf="loginService.isAdmin$ | async">
              <a routerLink="/admin"
                ><i class="fa fa-cog"></i> Admin Dashboard</a
              >
            </li>
          </ul>
          <hr />
          <button class="logout-btn" (click)="logout()">Log Out</button>
        </div>
      </div>
      <div
        id="profile-panel-overlay"
        class="profile-panel-overlay"
        [class.show]="isPanelOpen"
        (click)="closePanel()"
      ></div>
    </div>
    <div
      class="profile-panel-container"
      *ngIf="!(loginService.isLoggedIn$ | async)"
    ></div>
  `,
  styleUrls: ['./profile-panel.component.css'],
})
export class ProfilePanelComponent implements OnInit, OnDestroy {
  isPanelOpen = false;
  private panelSubscription?: Subscription;

  constructor(
    public loginService: LoginService,
    private profilePanelService: ProfilePanelService
  ) {}

  ngOnInit(): void {
    this.panelSubscription =
      this.profilePanelService.profilePanelOpen$.subscribe((isOpen) => {
        this.isPanelOpen = isOpen;
      });
    console.log('ProfilePanelComponent ngOnInit');
  }

  ngOnDestroy(): void {
    this.panelSubscription?.unsubscribe();
    console.log('ProfilePanelComponent ngOnDestroy');
  }

  closePanel(): void {
    this.profilePanelService.closePanel();
  }

  logout(): void {
    this.loginService.logout();
    this.profilePanelService.closePanel();
    console.log('Kijelentkezés');
  }
}
