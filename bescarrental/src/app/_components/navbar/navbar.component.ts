import { Component, ViewChild  } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { RegisterComponent } from '../register/register.component';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginComponent, CommonModule, RegisterComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @ViewChild(LoginComponent) loginComponent!: LoginComponent;
  @ViewChild(RegisterComponent) registerComponent!: RegisterComponent;

  isNavbarOpen: boolean = false; 

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
    console.log('Navbar toggled:', this.isNavbarOpen);
  }
  
  constructor(private cdr: ChangeDetectorRef) {}

  onLoginClick() {
    if (this.loginComponent) {
      this.closeAllPanels();
      this.loginComponent.isVisible = true;
      this.cdr.detectChanges();
    }
  }

  onCreateAccountClick() {
    console.log('Create Account clicked');
    if (this.registerComponent) {
      this.closeAllPanels();
      this.registerComponent.isVisible = true;
      console.log('Register panel visibility:', this.registerComponent.isVisible);
      this.cdr.detectChanges();
    }
  }

  closeAllPanels() {
    if (this.loginComponent) this.loginComponent.isVisible = false;
    if (this.registerComponent) this.registerComponent.isVisible = false;
    this.cdr.detectChanges();
  }
}

