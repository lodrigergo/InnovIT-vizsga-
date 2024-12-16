import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';



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

  onCreateAccountClick() {
    this.createAccountClick.emit();
  }
  

  ngOnChanges() {
    console.log('LoginComponent visibility changed:', this.isVisible);
  }

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
  
}
