import { Injectable } from '@angular/core';
import { LoginService } from './users/login.service';
import { RegisterService } from './users/register.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private endpoint = 'users/login/';

  constructor(private apiService: ApiService) {
    this.checkToken();
  }

  private checkToken() {
    const token = localStorage.getItem('authToken');
    this.isLoggedInSubject.next(!!token);
  }

  login(credentials: { email: string, password: string }) {
    return this.apiService.post(this.endpoint, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('authToken', response.token);
        console.log('Token guardado:', response.token); // Agrega esta línea
        this.isLoggedInSubject.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
  }
}