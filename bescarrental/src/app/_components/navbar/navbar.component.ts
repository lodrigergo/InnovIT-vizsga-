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

}

