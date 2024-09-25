import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/apps/products.service';
import { ProductInterface } from '../interface/products.interface';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../main/pages/header/header.component";
import { FooterComponent } from "../../main/pages/footer/footer.component";
import { FavoriteService } from '../../../services/apps/favorite.service';

@Component({
  selector: 'app-detail-products',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './detail-products.component.html',
  styleUrl: './detail-products.component.css'
})
export class DetailProductsComponent {
  productId: number = 0; // Inicializamos con un valor por defecto
  product: ProductInterface | null = null; // Aquí almacenamos el producto
  notification: { message: string, type: 'success' | 'error' } | null = null;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, 
    private favoriteService: FavoriteService,
  ) {}

  ngOnInit(): void {
    // Captura el ID desde la ruta
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    
    // Llama al servicio para obtener los detalles del producto
    this.loadProductDetails();
  }

  loadProductDetails(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (data: ProductInterface) => {
        this.product = data;
      },
      error: (err) => {
        console.error('Error loading product details:', err);
      }
    });
  }

  onAddToFavorites(event: Event, productId: number) {
    event.preventDefault();

    // Llamada al servicio para agregar a favoritos
    this.favoriteService.addToFavorites(productId).subscribe({
      next: () => {
        // Mostrar notificación de éxito
        this.showNotification('Producto agregado a favoritos', 'success');
      },
      error: () => {
        // Mostrar notificación de error
        this.showNotification('Error al agregar producto a favoritos', 'error');
      }
    });
  }



  showNotification(message: string, type: 'success' | 'error') {
    this.notification = { message, type };
    setTimeout(() => {
      this.notification = null;
    }, 3000); // La notificación desaparecerá después de 3 segundos
  }
}

