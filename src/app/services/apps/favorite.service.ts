import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { FavoritesResponse } from '../../components/favorites/favorites.component';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private endpoint = 'favorites/';


  constructor(private apiService: ApiService) { }

  getFavorites(): Observable<FavoritesResponse> {
    return this.apiService.get(this.endpoint);  // Aquí no necesitas pasar parámetros adicionales

  }

  addToFavorites(productId: number): Observable<any> {
    return this.apiService.post(this.endpoint, { product: productId });
  }

  removeFromFavorites(favoriteId: number): Observable<any> {
    return this.apiService.post(`${this.endpoint}${favoriteId}/remove_from_favorites/`, {});
  }
}