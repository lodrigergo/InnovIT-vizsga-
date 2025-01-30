import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../_services/login.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  @Input() showLoginPanel: boolean = false;

  errorMessage: string = '';

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  closeLoginPanel(): void {
    this.showLoginPanel = false;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginService.sendLogin(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Sikeres bejelentkezés:', response);
          this.closeLoginPanel();
        },
        error: (error) => {
          console.error('Bejelentkezési hiba:', error);
          this.errorMessage = 'Hibás e-mail vagy jelszó!';
        }
      });
    } else {
      this.errorMessage = 'Kérlek töltsd ki az összes mezőt helyesen!';
    }
  }
}
