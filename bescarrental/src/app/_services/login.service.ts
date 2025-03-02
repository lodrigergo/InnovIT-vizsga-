import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  // Csak a szükséges fejlécet küldjük:
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private loginUrl: string = 'http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/login';

  sendLogin(body: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, body, { headers: this.headers });
  }
}
