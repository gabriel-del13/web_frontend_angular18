import { Component, Input } from '@angular/core';
import { ProductInterface } from './../interface/products.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobile-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mobile-product.component.html',
})
export class MobileProductComponent {
  
  @Input() products: ProductInterface[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;

}
