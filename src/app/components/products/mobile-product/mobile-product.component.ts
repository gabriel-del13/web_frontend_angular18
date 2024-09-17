import { Component, Input } from '@angular/core';
import { ProductInterface } from './../interface/products.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-product.component.html',
  styleUrl: './mobile-product.component.css'
})
export class MobileProductComponent {
  
  @Input() products: ProductInterface[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;

}
