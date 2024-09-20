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
      // Filtrado por Parent Category
      if (filters.parent_category) params['parent_category'] = filters.parent_category;
      // Filtrado por Child Category
      if (filters.child_category) params['child_category'] = filters.child_category;
      if (filters.limit) params['limit'] = filters.limit.toString(); // Agregar el límite de productos
      if (filters.ordering) params['ordering'] = filters.ordering;  // Ordenación
    }
    return this.apiService.get(`${this.endpoint}items/`, params);
  }

  getProductById(id: number): Observable<ProductInterface> {
    return this.apiService.get(`${this.endpoint}items/${id}/`);
  }

}