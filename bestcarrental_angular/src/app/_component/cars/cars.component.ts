import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../_service/login.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../_service/register.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.css'],
})
export class CarsComponent implements OnInit, OnDestroy {
  showLoginPanel = false;
  showRegisterPanel = false;
  isLoggedIn = false;
  userName: string | null = null;
  profileImageUrl: string | null = null;
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginErrorMessage: string = '';
  registerErrorMessage: string = '';
  showProfilePanel = false; // Flag a profil panel láthatóságához

  private isLoggedInSubscription: Subscription | undefined;
  private userNameSubscription: Subscription | undefined;
  private profileImageUrlSubscription: Subscription | undefined;

  constructor(
    private loginService: LoginService,
    private registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      personalId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loginService.checkLoginStatus();

    this.isLoggedInSubscription = this.loginService.isLoggedIn$.subscribe(
      (loggedIn) => (this.isLoggedIn = loggedIn)
    );
    this.userNameSubscription = this.loginService.userName$.subscribe(
      (userName) => (this.userName = userName)
    );
    this.profileImageUrlSubscription =
      this.loginService.profileImageUrl$.subscribe(
        (profileImageUrl) => (this.profileImageUrl = profileImageUrl)
      );
  }

  ngOnDestroy(): void {
    if (this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe();
    }
    if (this.userNameSubscription) {
      this.userNameSubscription.unsubscribe();
    }
    if (this.profileImageUrlSubscription) {
      this.profileImageUrlSubscription.unsubscribe();
    }
  }

  openLoginPanel() {
    this.showLoginPanel = true;
    this.showRegisterPanel = false;
    document.getElementById('overlay')!.style.display = 'block';
    this.loginErrorMessage = '';
  }

  closeLoginPanel() {
    this.showLoginPanel = false;
    document.getElementById('overlay')!.style.display = 'none';
    this.loginForm.reset();
  }

  openRegisterPanel() {
    this.showRegisterPanel = true;
    this.showLoginPanel = false;
    document.getElementById('overlay')!.style.display = 'block';
    this.registerErrorMessage = '';
  }

  closeRegisterPanel() {
    this.showRegisterPanel = false;
    document.getElementById('overlay')!.style.display = 'none';
    this.registerForm.reset();
  }

  openProfilePanel() {
    this.showProfilePanel = true;
    document.getElementById('overlay')!.style.display = 'block';
  }

  closeProfilePanel() {
    this.showProfilePanel = false;
    document.getElementById('overlay')!.style.display = 'none';
  }

  closeOverlay() {
    this.closeLoginPanel();
    this.closeRegisterPanel();
    this.closeProfilePanel();
  }

  submitLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginService.login({ email, password }).subscribe({
        next: (response) => {
          console.log('Sikeres bejelentkezés!', response);
          this.closeLoginPanel();
        },
        error: (error) => {
          console.error('Sikertelen bejelentkezés!', error);
          this.loginErrorMessage = 'Hibás email vagy jelszó!';
        },
      });
    }
  }

  submitRegister() {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Sikeres regisztráció!', response);
          this.closeRegisterPanel();
          this.openLoginPanel();
        },
        error: (error) => {
          console.error('Sikertelen regisztráció!', error);
          this.registerErrorMessage = 'A regisztráció sikertelen!';
        },
      });
    }
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.userName = null;
    this.profileImageUrl = null;
    this.router.navigate(['/']);
  }
}
