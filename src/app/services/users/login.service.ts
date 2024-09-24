import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private endpoint = 'users/login/';

  constructor(private apiService: ApiService) { }


  googleLogin(token: string): Observable<any> {
    return this.apiService.post(`${this.endpoint}/google`, { token });
  }
}