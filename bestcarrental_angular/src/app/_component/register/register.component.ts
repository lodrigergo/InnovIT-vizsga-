// src/app/_component/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../_service/login.service';
import { RegisterService } from '../../_service/register.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Az overlay csak akkor látszik, ha a register panel nyitva van -->
    <div
      *ngIf="registerPanelOpen"
      id="overlay"
      class="overlay show"
      (click)="closePanel()"
    ></div>

    <!-- A register panel a .open osztályt kapja, ha nyitva van -->
    <div
      id="register-panel"
      class="register-panel"
      [class.open]="registerPanelOpen"
    >
      <div class="register-header">
        <h2>Register</h2>
        <span id="close-register-panel" class="close-btn" (click)="closePanel()"
          >&times;</span
        >
      </div>
      <form>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" placeholder="Username" />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="register-email" placeholder="Email" />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="register-password"
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <label for="personal-id">Personal-ID:</label>
          <input type="text" id="personal-id" placeholder="Personal-ID" />
        </div>
        <a href="#" class="forgot-password">Forgot Password?</a>
        <button type="submit" class="btn register-create-account-btn" disabled>
          Create Account
        </button>
        <!-- "Back To Login" gomb: visszavezeti a felhasználót a login panelhez -->
        <button type="button" class="btn login-btn" (click)="backToLogin()">
          Back To Login
        </button>
      </form>
    </div>
  `,
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerPanelOpen = false;

  constructor(
    private registerService: RegisterService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.registerService.registerPanelOpen$.subscribe((isOpen) => {
      this.registerPanelOpen = isOpen;
    });
  }

  closePanel(): void {
    this.registerService.closePanel();
  }

  backToLogin(): void {
    this.registerService.closePanel();
    this.loginService.openPanel();
  }
}
