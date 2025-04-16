import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private registerPanelOpenSubject = new BehaviorSubject<boolean>(false);
  registerPanelOpen$ = this.registerPanelOpenSubject.asObservable();

  private registrationSuccessSubject = new BehaviorSubject<boolean>(false);
  registrationSuccess$ = this.registrationSuccessSubject.asObservable();

  private registrationErrorSubject = new BehaviorSubject<string | null>(null);
  registrationError$ = this.registrationErrorSubject.asObservable();

  private apiUrl =
    'http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/registerUser';

  constructor(private http: HttpClient) {}

  openPanel(): void {
    this.registerPanelOpenSubject.next(true);
  }

  closePanel(): void {
    this.registerPanelOpenSubject.next(false);
    this.registrationSuccessSubject.next(false);
    this.registrationErrorSubject.next(null);
  }

  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, userData, { headers }).pipe(
      map((response: any) => {
        if (
          response &&
          response.statusCode === 200 &&
          response.status === 'success'
        ) {
          this.registrationSuccessful();
          return response;
        } else if (response && response.statusCode === 417) {
          this.registrationFailed(
            this.getErrorMessageFromStatus(response.status)
          );
          throw new Error(response.status);
        } else {
          this.registrationFailed('An unexpected error occurred.');
          throw new Error('Unexpected registration error');
        }
      })
    );
  }

  private getErrorMessageFromStatus(status: string): string {
    switch (status) {
      case 'InvalidEmail':
        return 'Please enter a valid email address.';
      case 'InvalidPassword':
        return 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
      case 'UserAlreadyExists':
        return 'Email address already exists.';
      case 'RegistrationFailed':
        return 'Registration failed. Please try again.';
      case 'DatabaseError':
        return 'A database error occurred. Please try again later.';
      default:
        return 'An error occurred during registration.';
    }
  }

  registrationSuccessful(): void {
    this.registrationSuccessSubject.next(true);
    this.registrationErrorSubject.next(null);
  }

  registrationFailed(errorMessage: string): void {
    this.registrationSuccessSubject.next(false);
    this.registrationErrorSubject.next(errorMessage);
  }

  closeSuccessMessage(): void {
    this.registrationSuccessSubject.next(false);
  }
}
