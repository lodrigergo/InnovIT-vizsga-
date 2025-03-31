import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginPanelOpenSubject = new BehaviorSubject<boolean>(false);
  loginPanelOpen$ = this.loginPanelOpenSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.checkLoginStatus()
  );
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private profileImageUrlSubject = new BehaviorSubject<string | null>(
    this.getStoredProfileImageUrl() || 'profile icon.webp'
  );
  profileImageUrl$ = this.profileImageUrlSubject.asObservable();

  private authTokenKey = 'authToken';
  private profileImageUrlKey = 'profileImageUrl';
  private apiUrl =
    'http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/login';

  constructor(private http: HttpClient, private router: Router) {
    console.log('LoginService inicializálva');
    console.log('checkLoginStatus inicializáláskor:', this.checkLoginStatus());
    this.isLoggedInSubject.next(this.checkLoginStatus());
  }

  openPanel(): void {
    this.loginPanelOpenSubject.next(true);
  }

  closePanel(): void {
    this.loginPanelOpenSubject.next(false);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }

  loginSuccess(profileImageUrl: string, token: string): void {
    this.isLoggedInSubject.next(true);
    this.profileImageUrlSubject.next(profileImageUrl);
    localStorage.setItem(this.authTokenKey, token);
    localStorage.setItem(this.profileImageUrlKey, profileImageUrl);
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.profileImageUrlSubject.next('profile icon.webp');
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.profileImageUrlKey);
    this.router.navigate(['/login']);
  }

  changeProfileImage(imageUrl: string): void {
    this.profileImageUrlSubject.next(imageUrl);
    localStorage.setItem(this.profileImageUrlKey, imageUrl);
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  isAuthenticated(): boolean {
    console.log('isAuthenticated hívás:', this.isLoggedInSubject.value);
    return this.isLoggedInSubject.value;
  }

  private checkLoginStatus(): boolean {
    const hasToken = !!localStorage.getItem(this.authTokenKey);
    console.log('Token a localStorage-ban:', hasToken);
    return hasToken;
  }

  private getStoredProfileImageUrl(): string | null {
    return localStorage.getItem(this.profileImageUrlKey);
  }
}
