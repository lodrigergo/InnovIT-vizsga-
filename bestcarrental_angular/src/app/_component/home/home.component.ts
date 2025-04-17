import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeService } from '../../_service/home.service';

interface CarSearchResult {
  pickup_date: string; // A backend stringként küldi a dátumokat
  model: string;
  car_id: number;
  brand: string;
  return_date: string; // A backend stringként küldi a dátumokat
  // ... egyéb autó adatok, ha vannak
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  activeInfo: string | null = null;
  private documentClickListener: (() => void) | null = null;

  searchResults: CarSearchResult[] = [];
  searchError: string = '';

  pickupDate: Date | null = null;
  dropoffDate: Date | null = null;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.documentClickListener = this.renderer.listen(
      'document',
      'click',
      (event: MouseEvent) => {
        if (this.activeInfo) {
          const clickedInside = this.el.nativeElement
            .querySelector('.info-box.active')
            ?.contains(event.target as Node);
          const clickedOnMoreInfo = (
            event.target as Element
          )?.classList?.contains('more-info');

          if (!clickedInside && !clickedOnMoreInfo) {
            this.activeInfo = null;
          }
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
  }

  showInfo(infoId: string): void {
    this.activeInfo = infoId;
  }

  searchCars(form: NgForm): void {
    if (form.valid && this.pickupDate && this.dropoffDate) {
      this.homeService.searchCars(this.pickupDate, this.dropoffDate).subscribe({
        next: (data) => {
          this.searchResults = data;
          this.searchError = '';
          console.log('Keresési eredmények:', this.searchResults);
        },
        error: (error) => {
          this.searchError = 'Hiba történt az autók keresése során.';
          console.error('Hiba a keresésben:', error);
          this.searchResults = [];
        },
      });
    } else {
      this.searchError = 'Kérlek, add meg a felvétel és a leadás dátumát.';
      this.searchResults = [];
    }
  }

  onPickupDateChange(event: any): void {
    this.pickupDate = new Date(event.target.value);
  }

  onDropoffDateChange(event: any): void {
    this.dropoffDate = new Date(event.target.value);
  }

  navigateToCarDetails(brand: string, model: string, carId: number): void {
    const carDetailsId = `${brand.toLowerCase().replace(/\s/g, '-')}-${model
      .toLowerCase()
      .replace(/\s/g, '-')}-${carId}`; // Példa: toyota-corolla-101
    this.router.navigate(['/cars', carDetailsId]);
  }
}
