import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    
  @Input() isVisible: boolean = false;

  showPanel() {
    this.isVisible = true;
    console.log('Panel visible:', this.isVisible);
  }
  
  closePanel() {
    this.isVisible = false;
    console.log('Panel visible:', this.isVisible);
  }
  

  ngOnChanges() {
    console.log('LoginComponent visibility changed:', this.isVisible);
  }
}
