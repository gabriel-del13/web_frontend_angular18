import { Component } from '@angular/core';
import { FavoriteService } from '../../services/apps/favorite.service';
import { CommonModule } from '@angular/common';


export interface Favorite {
  id: number;
  product: number; // O puedes usar un modelo de producto si lo tienes
  name_product: string;
  price: string;
  available_quantity: number;
  images: { image: string }[];
  status: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface FavoritesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Favorite[];
}

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  favorites: Favorite[] = [];
  loading: boolean = false
  error: string | null = null;
  

  constructor(private favoritesService: FavoriteService) { }

  ngOnInit() {
    this.loadFavorites();
  }


  loadFavorites() {
    this.loading = true; // Iniciar la carga
    this.favoritesService.getFavorites().subscribe({
      next: (data) => {
        console.log('Favoritos cargados:', data); // Mensaje de depuración
        this.favorites = data.results; // Acceder al arreglo de resultados
        if (this.favorites.length === 0) {
          this.error = 'No tienes productos en tus favoritos.';
        }
        this.loading = false; // Terminar la carga
      },
      error: (err) => {
        console.error('Error loading favorites:', err);
        this.error = 'Error al cargar los favoritos. Inténtalo nuevamente.';
        this.loading = false; // Terminar la carga
      }
    });
  }

  removeFromFavorites(favoriteId: number) {
    this.favoritesService.removeFromFavorites(favoriteId).subscribe(
      () => this.loadFavorites()
    );
  }
}

