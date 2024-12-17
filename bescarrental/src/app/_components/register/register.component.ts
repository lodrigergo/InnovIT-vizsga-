import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Input() isVisible: boolean = false;
  @Output() backToLoginClick = new EventEmitter<void>();

  ngOnChanges() {
    console.log('RegisterComponent visibility changed:', this.isVisible);
  }
  
  closePanel() {
    this.isVisible = false;
    this.clearFields();
  }

  clearFields() {
    (document.getElementById('username') as HTMLInputElement).value = '';
    (document.getElementById('register-email') as HTMLInputElement).value = '';
    (document.getElementById('register-password') as HTMLInputElement).value = '';
    (document.getElementById('confirm-password') as HTMLInputElement).value = '';
  }

  navigateToLogin() {
    this.closePanel();
    this.backToLoginClick.emit();
    console.log('Navigating back to login panel');
  }

  preventDefault(event: Event) {
    event.preventDefault();
    console.log('Form submission prevented');
  }
  
}
