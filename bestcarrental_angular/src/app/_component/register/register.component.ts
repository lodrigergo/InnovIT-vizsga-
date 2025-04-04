// src/app/_component/register/register.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../_service/login.service';
import { RegisterService } from '../../_service/register.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div
      *ngIf="registerPanelOpen"
      id="overlay"
      class="overlay show"
      (click)="closePanel()"
    ></div>

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
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Username</label>
          <input
            type="text"
            id="name"
            placeholder="Username"
            formControlName="name"
          />
          <div
            *ngIf="
              registerForm.get('name')?.invalid &&
              (registerForm.get('name')?.dirty ||
                registerForm.get('name')?.touched)
            "
            class="error-message"
          >
            <div *ngIf="registerForm.get('name')?.errors?.['required']">
              Username is required.
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="register-email"
            placeholder="Email"
            formControlName="email"
          />
          <div
            *ngIf="
              registerForm.get('email')?.invalid &&
              (registerForm.get('email')?.dirty ||
                registerForm.get('email')?.touched)
            "
            class="error-message"
          >
            <div *ngIf="registerForm.get('email')?.errors?.['required']">
              Email is required.
            </div>
            <div *ngIf="registerForm.get('email')?.errors?.['email']">
              Please enter a valid email address.
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="register-password"
            placeholder="Password"
            formControlName="password"
          />
          <div
            *ngIf="
              registerForm.get('password')?.invalid &&
              (registerForm.get('password')?.dirty ||
                registerForm.get('password')?.touched)
            "
            class="error-message"
          >
            <div *ngIf="registerForm.get('password')?.errors?.['required']">
              Password is required.
            </div>
            <div *ngIf="registerForm.get('password')?.errors?.['minlength']">
              Password must be at least
              {{ registerForm.get('password')?.errors?.['minlength'].requiredLength }}
              characters long.
            </div>
            <div *ngIf="registerForm.get('password')?.errors?.['pattern']">
              Password must contain at least one uppercase letter, one lowercase
              letter, one number, and one special character.
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="personalId">Personal-ID:</label>
          <input
            type="text"
            id="personal-id"
            placeholder="Personal-ID"
            formControlName="personalId"
          />
          <div
            *ngIf="
              registerForm.get('personalId')?.invalid &&
              (registerForm.get('personalId')?.dirty ||
                registerForm.get('personalId')?.touched)
            "
            class="error-message"
          >
            <div *ngIf="registerForm.get('personalId')?.errors?.['required']">
              Personal-ID is required.
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="btn register-create-account-btn"
          [disabled]="registerForm.invalid"
        >
          Create Account
        </button>
        <button type="button" class="btn login-btn" (click)="backToLogin()">
          Back To Login
        </button>
        <div *ngIf="registrationError" class="error-message below-form">
          {{ registrationError }}
        </div>
      </form>
    </div>

    <div *ngIf="registrationSuccess" class="success-overlay show">
      <div class="popup">
        <div class="popup-header">
          <button class="popup-close-btn" (click)="closeSuccessMessage()">
            &times;
          </button>
        </div>
        <div class="popup-message">
          <p>Thank you for your registration! You can now log in.</p>
        </div>
        <div class="popup-actions">
          <button class="btn login-btn" (click)="goToLogin()">
            Go to Login
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerPanelOpen = false;
  registerForm: FormGroup;
  registrationSuccess = false;
  registrationError: string | null = null;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private registerService: RegisterService,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
      personalId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.registerService.registerPanelOpen$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isOpen) => {
        this.registerPanelOpen = isOpen;
      });

    this.registerService.registrationSuccess$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((success) => {
        this.registrationSuccess = success;
      });

    this.registerService.registrationError$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((error) => {
        this.registrationError = error;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  closePanel(): void {
    this.registerService.closePanel();
  }

  backToLogin(): void {
    this.registerService.closePanel();
    this.loginService.openPanel();
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Sikeres regisztráció:', response);
          // A service már kezeli a sikeres állapotot
        },
        error: (error) => {
          console.error('Hiba a regisztráció során:', error);
          // A service már kezeli a hibaállapotot és a hibaüzenetet
        },
      });
    } else {
      console.log('A form érvénytelen.');
      this.registerService.registrationFailed(
        'Please fill out all required fields correctly.'
      );
    }
  }

  closeSuccessMessage(): void {
    this.registerService.closeSuccessMessage();
    this.closePanel();
    this.loginService.openPanel();
  }

  goToLogin(): void {
    this.registerService.closeSuccessMessage();
    this.closePanel();
    this.loginService.openPanel();
  }
}
