import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/apps/products.service';
import { ProductInterface } from './interface/products.interface';
import { HeaderComponent } from "../main/pages/header/header.component";
import { FooterComponent } from "../main/pages/footer/footer.component";
import { Observable } from 'rxjs';
import { ScreenSizeService } from '../../services/apps/screen-size.service';
import { MobileProductComponent } from "./mobile-product/mobile-product.component";
import { DesktopProductComponent } from "./desktop-product/desktop-product.component";


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, MobileProductComponent, DesktopProductComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ProductInterface[] = [];
  loading = false;
  error: string | null = null;
  isMobile$: Observable<boolean>;

  constructor(
    private productService: ProductService,
    private screenSizeService: ScreenSizeService
  ) {
    this.isMobile$ = this.screenSizeService.isMobile$;
  }

  ngOnInit() {
    this.loadProducts({limit: 100, ordering: '-updated_at'});
  }

  loadProducts(filters?: any) {
    this.loading = true;
    this.productService.getProducts(filters).subscribe({
      next: (data) => {
        this.products = data.results;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
      }
    });
  }

  onCategoryChange(event: {parentCategory: number | null, category: number | null}) {
    const filters: any = {
      limit: 100,
      ordering: '-updated_at'
    };

    if (event.category) {
      filters.category = event.category;
    } else if (event.parentCategory) {
      filters.parent_category = event.parentCategory;
    }

    this.loadProducts(filters);
  }
}