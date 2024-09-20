import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { ProductInterface } from '../../components/products/interface/products.interface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private ChildCategoryEndpoint = 'products/child_category/';
  private ParentCategoryEndpoint = 'products/parent_category/';


  constructor(private apiService: ApiService) { }

  // Método para obtener child categories con filtros y ordenado
  getChildCategories(filters: any = {}): Observable<any> {
    return this.apiService.get(this.ChildCategoryEndpoint, filters).pipe(
      map(response => response.results)  // Extrae solo el array de resultados
    );
  }

  // Método para obtener parent categories con filtros y ordenado
  getParentCategories(filters: any = {}): Observable<any> {
    return this.apiService.get(this.ParentCategoryEndpoint, filters).pipe(
      map(response => response.results)  // Extrae solo el array de resultados
    );
  }
}