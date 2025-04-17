import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../_service/login.service';
import { RegisterService } from '../../_service/register.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <div
      *ngIf="loginPanelOpen"
      id="loginOverlay"
      class="login-overlay show"
      (click)="closePanel()"
    ></div>

    <div id="login-panel" class="login-panel" [class.open]="loginPanelOpen">
      <div class="login-header">
        <h2>LOGIN</h2>
        <span id="close-login-panel" class="close-btn" (click)="closePanel()"
          >&times;</span
        >
      </div>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email"><i class="fa fa-envelope"></i> Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            formControlName="email"
          />
          <div
            *ngIf="
              loginForm.get('email')?.invalid &&
              (loginForm.get('email')?.dirty || loginForm.get('email')?.touched)
            "
            class="error-message"
          >
            <div *ngIf="loginForm.get('email')?.errors?.['required']">
              Email cím megadása kötelező.
            </div>
            <div *ngIf="loginForm.get('email')?.errors?.['email']">
              Kérjük, érvényes email címet adjon meg.
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="password"><i class="fa fa-key"></i> Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            formControlName="password"
          />
          <div
            *ngIf="
              loginForm.get('password')?.invalid &&
              (loginForm.get('password')?.dirty ||
                loginForm.get('password')?.touched)
            "
            class="error-message"
          >
            <div *ngIf="loginForm.get('password')?.errors?.['required']">
              Jelszó megadása kötelező.
            </div>
          </div>
        </div>
        <a routerLink="/forgot-password" class="forgot-password"
          >Forgot Password?</a
        >
        <div *ngIf="loginError" class="error-message below-form">
          {{ loginError }}
        </div>
        <button
          type="submit"
          class="btn login-btn"
          [disabled]="loginForm.invalid"
        >
          Log In
        </button>
        <button
          type="button"
          class="btn create-account-btn"
          (click)="openRegisterPanel()"
        >
          Create Account
        </button>
      </form>
    </div>

    <div *ngIf="notificationMessage" class="notification-bar">
      {{ notificationMessage }}
    </div>
  `,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginPanelOpen = false;
  loginForm: FormGroup;
  loginSuccess = false;
  loggedInUsername: string = '';
  loginError: string = '';
  notificationMessage: string | null = null;
  private notificationTimeout: any;

  constructor(
    private loginService: LoginService,
    private registerService: RegisterService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

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

  onSubmit(): void {
    if (this.loginForm.valid) {
      const apiUrl =
        'http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/login';
      this.http.post(apiUrl, this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log('Sikeres bejelentkezés:', response);
          this.loginSuccess = true;
          this.loggedInUsername = response.result.name || 'User';
          const profileImageUrl =
            response.result.profileImageUrl || 'profile icon.webp';
          const token = response.result.jwt;
          this.loginService.loginSuccess(
            profileImageUrl,
            token,
            response.result.name
          );
          this.loginError = '';
          this.showNotification('Sikeres bejelentkezés!');
        },
        error: (error) => {
          console.error('Hiba a bejelentkezés során:', error);
          this.loginSuccess = false;
          let errorMessage =
            'Hiba történt a bejelentkezés során. Kérjük, próbálja újra.';
          if (error.status === 401) {
            errorMessage = 'Hibás email cím vagy jelszó.';
          } else if (error.status === 404) {
            errorMessage = 'A felhasználó nem található.';
          }
          this.loginError = errorMessage;
          this.showNotification(this.loginError);
        },
      });
    } else {
      console.log('A form érvénytelen.');
      this.loginError = 'Kérjük, töltse ki a mezőket megfelelően.';
      this.showNotification(this.loginError);
    }
  }

  closeSuccessPopup(): void {
    this.loginSuccess = false;
    this.closePanel();
  }

  showNotification(message: string): void {
    this.notificationMessage = message;
    clearTimeout(this.notificationTimeout);
    this.notificationTimeout = setTimeout(() => {
      this.notificationMessage = null;
    }, 3000);
  }
}
