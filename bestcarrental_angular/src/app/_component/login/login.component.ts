import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../_service/login.service';
import { RegisterService } from '../../_service/register.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Az overlay csak akkor látszik, ha a login panel nyitva van -->
    <div
      *ngIf="loginPanelOpen"
      id="overlay"
      class="overlay show"
      (click)="closePanel()"
    ></div>

    <!-- A login panel a .open osztályt kapja, ha nyitva van -->
    <div id="login-panel" class="login-panel" [class.open]="loginPanelOpen">
      <div class="login-header">
        <h2>LOGIN</h2>
        <span id="close-login-panel" class="close-btn" (click)="closePanel()"
          >&times;</span
        >
      </div>
      <form>
        <div class="form-group">
          <label for="email"><i class="fa fa-envelope"></i> Email:</label>
          <input type="email" id="email" placeholder="Email" />
        </div>
        <div class="form-group">
          <label for="password"><i class="fa fa-key"></i> Password:</label>
          <input type="password" id="password" placeholder="Password" />
        </div>
        <a routerLink="/forgot-password" class="forgot-password"
          >Forgot Password?</a
        >
        <button type="submit" class="btn login-btn">Log In</button>
        <!-- A create account gomb, amely átvált a register panelre -->
        <button
          type="button"
          class="btn create-account-btn"
          (click)="openRegisterPanel()"
        >
          Create Account
        </button>
      </form>
    </div>
  `,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginPanelOpen = false;

  constructor(
    private loginService: LoginService,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.loginService.loginPanelOpen$.subscribe((isOpen) => {
      this.loginPanelOpen = isOpen;
    });
  }

  closePanel(): void {
    this.loginService.closePanel();
  }

  openRegisterPanel(): void {
    this.loginService.closePanel();
    this.registerService.openPanel();
  }
}
