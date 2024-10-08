import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/apps/products.service';
import { ProductInterface } from './interface/products.interface';
import { HeaderComponent } from "../main/pages/header/header.component";
import { FooterComponent } from "../main/pages/footer/footer.component";
import { debounceTime, distinctUntilChanged, Subject, Observable } from 'rxjs';
import { ScreenSizeService } from '../../services/apps/screen-size.service';
import { MobileProductComponent } from "./mobile-product/mobile-product.component";
import { DesktopProductComponent } from "./desktop-product/desktop-product.component";
import { SearchBarComponent } from "./desktop-product/search-bar/search-bar.component";
import { FavoriteService } from '../../services/apps/favorite.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, MobileProductComponent, DesktopProductComponent, SearchBarComponent, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ProductInterface[] = [];
  loading = false;
  error: string | null = null;
  searchTerms = new Subject<string>();
  isMobile$: Observable<boolean>;

  // Pagination variables
  currentPage = 1;
  itemsPerPage = 15; // Adjust as needed
  totalItems = 0;
  totalPages = 0;
  
  // Filter state
  currentFilters: any = {
      limit: this.itemsPerPage,
      offset: 0,
      ordering: '-updated_at'
  };
  

  constructor(
    private productService: ProductService,
    private screenSizeService: ScreenSizeService,
    private favoriteService: FavoriteService,
  ) {
    this.isMobile$ = this.screenSizeService.isMobile$;
  }

  ngOnInit() {
    this.setupSearch();
    this.loadLastPage();
    this.loadProducts();
  }

  setupSearch() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.currentFilters.search = term;
      this.currentFilters.offset = 0;
      this.currentPage = 1;
      this.loadProducts();
    });
  }

  onSearch(term: string) {
    this.searchTerms.next(term);
  }

  onOrder(orderBy: string) {
    this.loadProducts(this.currentFilters.search, orderBy);
  }

  loadProducts(searchTerm?: string, orderBy?: string) {
    this.loading = true;
    this.currentFilters = {
      ...this.currentFilters,
      ordering: orderBy
    };
    this.productService.getProducts(this.currentFilters).subscribe({
      next: (data) => {
        this.products = data.results;
        this.totalItems = data.count;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.loading = false;
        this.saveCurrentPage();
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
      }
    });
  }

  onCategorySelected(event: {parentIds: number[], childIds: number[]}) {
    if (event.childIds && event.childIds.length > 0) {
      this.currentFilters.child_category = event.childIds;
      delete this.currentFilters.parent_category;
    } else if (event.parentIds && event.parentIds.length > 0) {
      this.currentFilters.parent_category = event.parentIds;
      delete this.currentFilters.child_category;
    } else {
      delete this.currentFilters.child_category;
      delete this.currentFilters.parent_category;
    }
    
    this.currentPage = 1;
    this.currentFilters.offset = 0;
    this.loadProducts();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.currentFilters.offset = (page - 1) * this.itemsPerPage;
    this.loadProducts();
  }

  resetFilters() {
    this.currentFilters = {
      limit: this.itemsPerPage,
      offset: 0,
      ordering: '-updated_at'
    };
    this.currentPage = 1;
    this.loadProducts();
  }

  addToFavorites(productId: number) {
    this.favoriteService.addToFavorites(productId).subscribe({
      next: (response) => {
        console.log('Producto agregado a favoritos', response);
        // Aquí puedes añadir lógica adicional, como mostrar un mensaje de éxito
      },
      error: (error) => {
        console.error('Error al agregar a favoritos', error);
        // Aquí puedes manejar el error, como mostrar un mensaje al usuario
      }
    });
  }

  private loadLastPage() {
    const lastPage = localStorage.getItem('lastProductsPage');
    if (lastPage) {
      this.currentPage = parseInt(lastPage, 10);
      this.currentFilters.offset = (this.currentPage - 1) * this.itemsPerPage;
    }
  }

  private saveCurrentPage() {
    localStorage.setItem('lastProductsPage', this.currentPage.toString());
  }

}