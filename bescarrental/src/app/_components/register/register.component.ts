import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Panel láthatósága
  isOpen: boolean = false;

  // Űrlapadatok
  username: string = '';
  email: string = '';
  password: string = '';
  personalId: string = '';

  // Hibák
  usernameError: string = '';
  registerEmailError: string = '';
  registerPasswordError: string = '';
  personalIdError: string = '';

  // Touched állapotok
  touched = {
    username: false,
    registerEmail: false,
    registerPassword: false,
    personalId: false
  };

  // A submit gomb engedélyezése
  isValid: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  openPanel(): void {
    this.isOpen = true;
  }

  closePanel(): void {
    this.isOpen = false;
  }

  onBlur(field: keyof typeof this.touched): void {
    this.touched[field] = true;
    this.validateRegistration();
  }

  onInput(): void {
    this.validateRegistration();
  }

  validateRegistration(): boolean {
    let valid = true;

    // Username validáció
    if (this.touched.username) {
      if (!this.username.trim()) {
        this.usernameError = "Felhasználónév megadása kötelező!";
        valid = false;
      } else {
        this.usernameError = "";
      }
    } else if (!this.username.trim()) {
      valid = false;
    }

    // Email validáció
    if (this.touched.registerEmail) {
      if (!this.email.trim()) {
        this.registerEmailError = "Email megadása kötelező!";
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim())) {
        this.registerEmailError = "Érvénytelen email!";
        valid = false;
      } else {
        this.registerEmailError = "";
      }
    } else if (!this.email.trim()) {
      valid = false;
    }

    // Password validáció
    if (this.touched.registerPassword) {
      if (!this.password.trim()) {
        this.registerPasswordError = "Jelszó megadása kötelező!";
        valid = false;
      } else {
        this.registerPasswordError = "";
      }
    } else if (!this.password.trim()) {
      valid = false;
    }

    // Personal-ID validáció: számokból álljon, utolsó karakter betű
    if (this.touched.personalId) {
      if (!/^\d+[a-zA-Z]$/.test(this.personalId.trim())) {
        this.personalIdError = "Personal-ID számokból álljon, az utolsó karakter betű legyen!";
        valid = false;
      } else {
        this.personalIdError = "";
      }
    } else if (!/^\d+[a-zA-Z]$/.test(this.personalId.trim())) {
      valid = false;
    }

    this.isValid = valid;
    return valid;
  }

  onSubmit(): void {
    if (!this.validateRegistration()) {
      return;
    }

    const url = "http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/registerUser";
    const body = {
      name: this.username.trim(),
      email: this.email.trim(),
      password: this.password.trim(),
      personalId: this.personalId.trim()
    };

    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    this.http.post(url, body, { headers })
      .subscribe({
        next: (data: any) => {
          alert("Sikeres regisztráció! Most már bejelentkezhetsz.");
          this.closePanel();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error("Hiba a regisztráció során:", error);
          alert("Hiba történt a regisztráció során: Létezik már ilyen email cimmel regisztrált felhasználó!");
        }
      });
  }

  switchToLogin(): void {
    this.closePanel();
    this.router.navigate(['/login']);
  }
}
