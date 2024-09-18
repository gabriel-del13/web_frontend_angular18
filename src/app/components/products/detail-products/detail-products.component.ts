import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/apps/products.service';
import { ProductInterface } from '../interface/products.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-products.component.html',
  styleUrl: './detail-products.component.css'
})
export class DetailProductsComponent {
  product: ProductInterface | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    // Convirtiend el id string a id número, ya que por defecto viene como string aunque se establezca como number en el product interface
    const id = +this.route.snapshot.paramMap.get('id')!; // "+" convierte a number

    if (id) {
      this.getProductById(id);
    }
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(
      product => {
        this.product = product;
        console.log(product);  // Para depurar
      },
      error => {
        console.error('Error al obtener el producto', error);
      }
    );
  }
}

