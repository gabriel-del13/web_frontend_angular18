import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/apps/products.service';
import { ProductInterface } from '../interface/products.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-products.component.html',
  styleUrl: './detail-products.component.css'
})
export class DetailProductsComponent {
  productId: number = 0; // Inicializamos con un valor por defecto
  product: ProductInterface | null = null; // Aquí almacenamos el producto

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
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
}

