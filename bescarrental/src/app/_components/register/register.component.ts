import { Component, Input } from '@angular/core';
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

  ngOnChanges() {
    console.log('RegisterComponent visibility changed:', this.isVisible);
  }
  
  closePanel() {
    this.isVisible = false;
    console.log('Register panel closed');
  }
}
