import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private endpoint = 'services';

  constructor(private apiService: ApiService) { }

  getServices(): Observable<any> {
    return this.apiService.get(this.endpoint);
  }
}