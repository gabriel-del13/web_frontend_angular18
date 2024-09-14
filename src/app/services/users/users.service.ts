import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint = 'users';

  constructor(private apiService: ApiService) { }

  getUsers(): Observable<any> {
    return this.apiService.get(this.endpoint);
  }

  getUser(id: number): Observable<any> {
    return this.apiService.get(`${this.endpoint}/${id}`);
  }

  createUser(userData: any): Observable<any> {
    return this.apiService.post(this.endpoint, userData);
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.apiService.put(`${this.endpoint}/${id}`, userData);
  }

  deleteUser(id: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }
}