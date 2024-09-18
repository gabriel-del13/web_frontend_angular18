import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { ProductInterface } from '../../components/products/interface/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private endpoint = 'products/';

  constructor(private apiService: ApiService) { }

  getProducts(filters?: any): Observable<any> {
    const params: {[key: string]: string} = {};
    if (filters) {
      if (filters.status) params['status'] = filters.status;
      if (filters.category) params['parent_category'] = filters.category;
      if (filters.ordering) params['ordering'] = filters.ordering;
    }
    return this.apiService.get(`${this.endpoint}items/`, params);
  }

  getProductById(id: number): Observable<ProductInterface> {
    return this.apiService.get(`${this.endpoint}items/${id}/`);
  }

  getCategories(filters?: any): Observable<any> {
    const params: {[key: string]: string} = {};
    if (filters) {
      if (filters.name_category) params['name_category'] = filters.name_category;
      if (filters.parent_category) params['parent_category'] = filters.parent_category;
    }
    return this.apiService.get(`${this.endpoint}category/`, params);
  }
}