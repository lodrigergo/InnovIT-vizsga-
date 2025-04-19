import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilePanelService {
  private profilePanelOpenSubject = new Subject<boolean>();
  profilePanelOpen$ = this.profilePanelOpenSubject.asObservable();

  openPanel(): void {
    this.profilePanelOpenSubject.next(true);
  }

  closePanel(): void {
    this.profilePanelOpenSubject.next(false);
  }
}
