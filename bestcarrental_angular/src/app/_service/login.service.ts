import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginPanelOpenSubject = new BehaviorSubject<boolean>(false);
  // Observable, amelyre a komponensek feliratkozhatnak
  loginPanelOpen$ = this.loginPanelOpenSubject.asObservable();

  openPanel(): void {
    this.loginPanelOpenSubject.next(true);
  }

  closePanel(): void {
    this.loginPanelOpenSubject.next(false);
  }
}
