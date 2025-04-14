import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  fuel: string;
  persons: number;
  price: number;
  image: string;
  details: {
    doors: number;
    fuelType: string;
    transmission: string;
    airConditioning: boolean;
    seats: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private selectedCarSource = new BehaviorSubject<Car | null>(null);
  selectedCar$: Observable<Car | null> = this.selectedCarSource.asObservable();

  private availableCarsSource = new BehaviorSubject<Car[]>([]);
  availableCars$: Observable<Car[]> = this.availableCarsSource.asObservable();

  private staticCars: Car[] = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
      year: 2021,
      fuel: 'Petrol',
      persons: 5,
      price: 61,
      image: 'Toyota Corolla 1.8 sedan. hybridjpg.png',
      details: {
        doors: 4,
        fuelType: 'Petrol',
        transmission: 'A',
        airConditioning: true,
        seats: 5,
      },
    },
    {
      id: 2,
      brand: 'Toyota',
      model: 'Rav4',
      year: 2021,
      fuel: 'Hybrid',
      persons: 5,
      price: 70,
      image: 'toyota rav4 ujabb.jpeg',
      details: {
        doors: 4,
        fuelType: 'Hybrid',
        transmission: 'A',
        airConditioning: true,
        seats: 5,
      },
    },
    {
      id: 3,
      brand: 'Fiat',
      model: '500',
      year: 2022,
      fuel: 'Petrol',
      persons: 4,
      price: 45,
      image: 'Fiat 500 JKL-654 2022 Benzin.jpeg',
      details: {
        doors: 2,
        fuelType: 'Petrol',
        transmission: 'Manual',
        airConditioning: true,
        seats: 4,
      },
    },
    {
      id: 4,
      brand: 'Volkswagen',
      model: 'Golf',
      year: 2018,
      fuel: 'Diesel',
      persons: 5,
      price: 55,
      image: 'VOlkswagen golf 2018.jpg',
      details: {
        doors: 4,
        fuelType: 'Diesel',
        transmission: 'Manual',
        airConditioning: true,
        seats: 5,
      },
    },
    {
      id: 5,
      brand: 'Volkswagen',
      model: 'Passat',
      year: 2018,
      fuel: 'Diesel',
      persons: 5,
      price: 60,
      image: 'Volkswagen-passat-2018.webp',
      details: {
        doors: 4,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        airConditioning: true,
        seats: 5,
      },
    },
    {
      id: 6,
      brand: 'Volvo',
      model: 'V60',
      year: 2019,
      fuel: 'Diesel',
      persons: 5,
      price: 65,
      image: 'Volvo V60 2019.jpeg',
      details: {
        doors: 5,
        fuelType: 'Diesel',
        transmission: 'Manual',
        airConditioning: true,
        seats: 5,
      },
    },
    {
      id: 7,
      brand: 'Volvo',
      model: 'XC90',
      year: 2020,
      fuel: 'Hybrid',
      persons: 7,
      price: 85,
      image: 'Volvo XC90 2019.jpeg',
      details: {
        doors: 5,
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        airConditioning: true,
        seats: 7,
      },
    },
    {
      id: 8,
      brand: 'Honda',
      model: 'Civic',
      year: 2020,
      fuel: 'Petrol',
      persons: 5,
      price: 50,
      image: 'Honda Civic 2020.jpeg',
      details: {
        doors: 4,
        fuelType: 'Petrol',
        transmission: 'Manual',
        airConditioning: true,
        seats: 5,
      },
    },
    {
      id: 9,
      brand: 'Honda',
      model: 'Accord',
      year: 2020,
      fuel: 'Petrol',
      persons: 5,
      price: 70,
      image: 'honda_accord_2020_uj.jpg',
      details: {
        doors: 4,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        airConditioning: true,
        seats: 5,
      },
    },
  ];

  constructor() {
    this.availableCarsSource.next(this.staticCars);
  }

  setSelectedCar(car: Car): void {
    this.selectedCarSource.next(car);
  }

  getSelectedCar(): Car | null {
    return this.selectedCarSource.getValue();
  }

  clearSelectedCar(): void {
    this.selectedCarSource.next(null);
  }

  setAvailableCars(cars: Car[]): void {
    this.availableCarsSource.next(cars);
  }

  getAvailableCars(): Car[] {
    return this.availableCarsSource.getValue();
  }
}
