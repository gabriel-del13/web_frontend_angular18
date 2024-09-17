import { Component } from '@angular/core';
import { LoginService } from '../../../services/users/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DarkModeToggleComponent } from '../../main/pages/header/dark-mode-toggle/dark-mode-toggle.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, DarkModeToggleComponent, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginCredentials = {
    email: '',
    password: '',
  };
  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }
  
  onLogin() {
    this.errorMessage = ''; // Limpiar mensaje de error anterior
    this.loginService.login(this.loginCredentials).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Error en el login', error);
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}

