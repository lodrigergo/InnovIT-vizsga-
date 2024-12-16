import { Component, ViewChild  } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginComponent, CommonModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild(LoginComponent) loginComponent!: LoginComponent;

  constructor(private cdr: ChangeDetectorRef) {}

  onLoginClick() {
    console.log('Login button clicked');
    if (this.loginComponent) {
      this.loginComponent.isVisible = true;
      this.cdr.detectChanges();
      console.log('LoginComponent isVisible:', this.loginComponent.isVisible);
    }
  }
}

