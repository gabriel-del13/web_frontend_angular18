import { Injectable } from '@angular/core';
import { LoginService } from './users/login.service';
import { RegisterService } from './users/register.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private loginService: LoginService,
    private registerService: RegisterService
  ) {}

  login(credentials: any): Observable<any> {
    return this.loginService.login(credentials);
  }

  register(userData: any): Observable<any> {
    return this.registerService.register(userData);
  }

  // Aquí puedes agregar más métodos relacionados con la autenticación
  // Por ejemplo, logout, verificar token, etc.
}