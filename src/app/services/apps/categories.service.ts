import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { ProductInterface } from '../../components/products/interface/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private ChildCategoryEndpoint = 'products/child_category/';
  private ParentCategoryEndpoint = 'products/parent_category/';


  constructor(private apiService: ApiService) { }

  // Método para obtener child categories con filtros y ordenado
  getChildCategories(filters: any = {}): Observable<any> {
    return this.apiService.get(this.ChildCategoryEndpoint, filters);
  }

  // Método para obtener parent categories con filtros y ordenado
  getParentCategories(filters: any = {}): Observable<any> {
    return this.apiService.get(this.ParentCategoryEndpoint, filters);
  }
}