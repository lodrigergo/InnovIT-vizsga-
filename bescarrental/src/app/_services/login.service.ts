import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  corsHeader: any = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200/'
  });

  loginUrl: string = 'http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/login';

  sendLogin(body: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, body, { headers: this.corsHeader });
  }
}
