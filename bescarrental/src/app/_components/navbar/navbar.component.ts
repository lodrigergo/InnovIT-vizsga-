import { Component} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../register/register.component';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginComponent, CommonModule, RegisterComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  showLoginPanel = false; 

  // Login panel megnyitása
  openLoginPanel(): void {
    console.log('Login panel megnyitása...');
    this.showLoginPanel = true;
  }

  // Login panel bezárása (opcionális, ha kellene)
  closeLoginPanel(): void {
    console.log('Login panel bezárása...');
    this.showLoginPanel = false;
  }
}

