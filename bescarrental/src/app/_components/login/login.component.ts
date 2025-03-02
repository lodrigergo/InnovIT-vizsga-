import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../_services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Az Input property, mely alapján a panel megjelenése vezérelhető
  @Input() isOpen: boolean = false;
  // Output, amellyel jelezzük a szülőnek, ha a panel bezáródik
  @Output() closePanel = new EventEmitter<void>();

  // Űrlapadatok
  email: string = '';
  password: string = '';

  // Validációs hibák
  emailError: string = '';
  passwordError: string = '';

  // Fontos: a router most public, vagy használjunk publikus metódust a navigációhoz
  constructor(
    private loginService: LoginService,
    public router: Router  // Így a template-ben is elérhető lesz
  ) {}

  // Bezárja a panelt
  closePanelHandler(): void {
    this.closePanel.emit();
  }

  // Navigálás regisztrációs oldalra (az X gombnál vagy a "Create Account" gombnál)
  goToRegister(): void {
    this.closePanelHandler();
    this.router.navigate(['/register']);
  }

  // Bejelentkezés gomb kezelése
  onSubmit(): void {
    // Töröljük az előző hibákat
    this.emailError = '';
    this.passwordError = '';

    const email = this.email.trim();
    const password = this.password.trim();
    let valid = true;

    // Egyszerű validáció
    if (!email) {
      this.emailError = "Kérlek add meg az email címed!";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.emailError = "Érvénytelen email!";
      valid = false;
    }

    if (!password) {
      this.passwordError = "Kérlek add meg a jelszavad!";
      valid = false;
    } else if (password.length < 8 || password.length > 20) {
      this.passwordError = "A jelszónak 8-20 karakter hosszúnak kell lennie!";
      valid = false;
    } else if (!/^[A-Z]/.test(password)) {
      this.passwordError = "A jelszónak nagybetűvel kell kezdődnie!";
      valid = false;
    }

    if (!valid) {
      return;
    }

    // API hívás a LoginService segítségével
    this.loginService.sendLogin({ email, password })
      .subscribe({
        next: (data) => {
          if (data.status === "success") {
            localStorage.setItem("jwt", data.result.jwt);
            localStorage.setItem("username", data.result.name);
            alert("Üdvözöllek, " + data.result.name + "!");
            this.closePanelHandler();
            this.router.navigate(['/profile']);
          } else {
            this.passwordError = "Hibás email vagy jelszó!";
          }
        },
        error: (err) => {
          console.error("Hiba a bejelentkezés során:", err);
          this.passwordError = "Hálózati hiba történt!";
        }
      });
  }

  // Az overlay-re kattintva is bezárjuk a panelt
  onOverlayClick(): void {
    this.closePanelHandler();
  }
}
