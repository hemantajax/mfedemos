import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  user = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    console.log('Register submitted:', this.user);
    // Add your registration logic here
  }
}

