import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { LoginService } from '../../_services/login.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent { 
  @Input() isVisible: boolean = false;
  @Output() createAccountClick = new EventEmitter<void>();

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
      ],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  showPanel() {
    this.isVisible = true;
    this.loginForm.reset();
  }
  
  closePanel() {
    this.isVisible = false;
    this.loginForm.reset({
      email: '',
      password: ''
    });
  }

  handleBackToLogin() {
    this.showPanel();
    console.log('Login panel opened');
  }

  onCreateAccountClick() {
    this.createAccountClick.emit();
  }
  
  ngOnChanges() {
    console.log('LoginComponent visibility changed:', this.isVisible);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.loginService.login(email, password).pipe(
        catchError(error => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials and try again.');
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
          console.log('Login successful:', response);
          alert('Login successful!');
          this.closePanel();
        }
      });
    } else {
      console.log('Form is invalid');
      alert('Please fill in all required fields correctly.');
    }
  }
}
