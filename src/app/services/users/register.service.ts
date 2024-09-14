import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private endpoint = 'users/register/';

  constructor(private apiService: ApiService) { }

  register(userData: any): Observable<any> {
    return this.apiService.post(this.endpoint, userData);
  }
}