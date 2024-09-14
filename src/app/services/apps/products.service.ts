import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private endpoint = 'products/items/';

  constructor(private apiService: ApiService) { }

  getProducts(filters?: any): Observable<any> {
    const params: {[key: string]: string} = {};
    if (filters) {
      if (filters.status) params['status'] = filters.status;
      if (filters.category) params['category'] = filters.category;
      if (filters.ordering) params['ordering'] = filters.ordering;
    }
    return this.apiService.get(this.endpoint, params);
  }

  getCategories(): Observable<any> {
    return this.apiService.get(`${this.endpoint}/category/`);
  }
}