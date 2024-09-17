import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValideRegisterService {
  private apiUrl = 'http://127.0.0.1:8000/api/users/validatereg/';

  constructor(private http: HttpClient) { }

  getConstraints(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}