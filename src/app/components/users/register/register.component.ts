import { Component } from '@angular/core';
import { RegisterService } from '../../../services/users/register.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerData = {
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    password: '',
    password_confirmation: ''
  };
  errorMessage = '';
  successMessage = '';

  constructor(private registerService: RegisterService) {}

  onRegister() {
    this.errorMessage = '';
    this.successMessage = '';
    
    if (this.registerData.password !== this.registerData.password_confirmation) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.registerService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.successMessage = 'Registration successful! You can now log in.';
        // Reset the form
        this.registerData = {
          email: '',
          first_name: '',
          last_name: '',
          phone_number: '',
          password: '',
          password_confirmation: ''
        };
      },
      error: (error) => {
        console.error('Registration error', error);
        if (error.error && typeof error.error === 'object') {
          // Handle structured error responses
          const errorMessages = Object.entries(error.error)
            .map(([key, value]) => `${key}: ${value}`)
            .join('; ');
          this.errorMessage = `Registration failed: ${errorMessages}`;
        } else {
          this.errorMessage = 'Registration failed. Please try again later.';
        }
      }
    });
  }
}
