import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AboutComponent } from '../about/about.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  // Itt importáljuk a többi komponenst, melyek a home oldal részei
  imports: [NavbarComponent, LoginComponent, RegisterComponent, AboutComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Alapértelmezetten a login panel rejtve van
  showLoginPanel: boolean = false;

  // Ezt a metódust hívja meg a Navbar komponens, amikor a Login gombra kattintanak
  openLoginPanel(): void {
    this.showLoginPanel = true;
  }

  // Ezt a metódust hívja meg a Login komponens, amikor bezárni kell a panelt
  closeLoginPanel(): void {
    this.showLoginPanel = false;
  }
}
