import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginPanelOpenSubject = new BehaviorSubject<boolean>(false);
  loginPanelOpen$ = this.loginPanelOpenSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private profileImageUrlSubject = new BehaviorSubject<string | null>(
    'profile icon.webp'
  );
  profileImageUrl$ = this.profileImageUrlSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSubject.asObservable();

  private authTokenKey = 'authToken';
  private profileImageUrlKey = 'profileImageUrl';
  private userNameKey = 'userName';
  private apiUrl =
    'http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/login';

  constructor(private http: HttpClient, private router: Router) {
    console.log('LoginService inicializálva');
    this.initializeFromLocalStorage().subscribe(() => {
      this.isLoggedInSubject.next(this.checkLoginStatus());
      console.log(
        'Initial profileImageUrl:',
        this.profileImageUrlSubject.value
      );
      console.log('Initial userName:', this.userNameSubject.value);
    });
  }

  private initializeFromLocalStorage(): Observable<void> {
    return from(Promise.resolve()).pipe(
      tap(() => {
        const storedToken = localStorage.getItem(this.authTokenKey);
        const storedImageUrl = localStorage.getItem(this.profileImageUrlKey);
        const storedUserName = localStorage.getItem(this.userNameKey);

        if (storedToken) {
          this.isLoggedInSubject.next(true);
        }
        if (storedImageUrl) {
          this.profileImageUrlSubject.next(storedImageUrl);
        }
        if (storedUserName) {
          this.userNameSubject.next(storedUserName);
        }
        console.log(
          'initializeFromLocalStorage - profileImageUrl:',
          storedImageUrl
        );
        console.log('initializeFromLocalStorage - userName:', storedUserName);
      }),
      map(() => {})
    );
  }

  openPanel(): void {
    this.loginPanelOpenSubject.next(true);
  }

  closePanel(): void {
    this.loginPanelOpenSubject.next(false);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      map((response: any) => {
        if (
          response &&
          response.status === 'success' &&
          response.userName &&
          response.profileImageUrl
        ) {
          this.loginSuccess(
            response.profileImageUrl,
            response.token,
            response.userName
          );
          return response;
        }
        return response;
      })
    );
  }

  loginSuccess(profileImageUrl: string, token: string, userName: string): void {
    this.isLoggedInSubject.next(true);
    this.profileImageUrlSubject.next(profileImageUrl);
    this.userNameSubject.next(userName);
    localStorage.setItem(this.authTokenKey, token);
    localStorage.setItem(this.profileImageUrlKey, profileImageUrl);
    localStorage.setItem(this.userNameKey, userName);
    console.log('loginSuccess - profileImageUrl saved:', profileImageUrl);
    console.log('loginSuccess - userName saved:', userName);
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.profileImageUrlSubject.next('profile icon.webp');
    this.userNameSubject.next(null);
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.profileImageUrlKey);
    localStorage.removeItem(this.userNameKey);
    this.router.navigate(['/login']);
  }

  changeProfileImage(imageUrl: string): void {
    this.profileImageUrlSubject.next(imageUrl);
    localStorage.setItem(this.profileImageUrlKey, imageUrl);
    console.log('changeProfileImage called, imageUrl saved:', imageUrl);
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  public checkLoginStatus(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  private getStoredProfileImageUrl(): string | null {
    return localStorage.getItem(this.profileImageUrlKey);
  }

  private getStoredUserName(): string | null {
    return localStorage.getItem(this.userNameKey);
  }
}
