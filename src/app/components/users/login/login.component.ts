import { Component } from '@angular/core';
import { LoginService } from '../../../services/users/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginCredentials = {
    email: '',
    password: '',
  };
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }
  
  // Ejemplo de login
  onLogin() {
    this.loginService.login(this.loginCredentials).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        // manejar el éxito del login, como guardar el token
        localStorage.setItem('authToken', response.token);
        // Redirigir a la página de inicio
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Error en el login', error);
        // manejar los errores de login
      }
    });
  }
  
}

