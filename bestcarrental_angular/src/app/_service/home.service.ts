import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CarSearchResult {
  pickup_date: string;
  model: string;
  car_id: number;
  brand: string;
  return_date: string;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl =
    'http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/BookingsController/searchCarsBetweenDates';

  constructor(private http: HttpClient) {}

  searchCars(
    pickupDate: Date,
    returnDate: Date
  ): Observable<CarSearchResult[]> {
    const params = new HttpParams()
      .set('pickupDate', this.formatDate(pickupDate))
      .set('returnDate', this.formatDate(returnDate));

    return this.http.get<CarSearchResult[]>(this.apiUrl, { params });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day} 00:00:00`;
  }
}
