import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apiService: ApiService) { }

  getProducts(): Observable<any> {
    return this.apiService.get('products/items/');
  }

  getCategories(): Observable<any> {
    return this.apiService.get('products/category/');
  }

  /*
  createProduct(product: any): Observable<any> {
    return this.apiService.post('products', product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.apiService.put(`products/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.apiService.delete(`products/${id}`);
  }
  */
}