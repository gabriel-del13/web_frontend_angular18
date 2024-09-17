import { Component, Input } from '@angular/core';
import { ProductInterface } from './../interface/products.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-desktop-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './desktop-product.component.html',
  styleUrl: './desktop-product.component.css'
})
export class DesktopProductComponent {

  @Input() products: ProductInterface[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;
}