import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private registerPanelOpenSubject = new BehaviorSubject<boolean>(false);
  registerPanelOpen$ = this.registerPanelOpenSubject.asObservable();

  openPanel(): void {
    this.registerPanelOpenSubject.next(true);
  }

  closePanel(): void {
    this.registerPanelOpenSubject.next(false);
  }
}
