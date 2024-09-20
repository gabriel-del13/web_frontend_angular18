import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef, HostListener, NgZone  } from '@angular/core';
import { ChildCategoryInterface, ProductInterface } from '../../../products/interface/products.interface';
import { ProductService } from '../../../../services/apps/products.service';
import { CategoriesService } from '../../../../services/apps/categories.service';


@Component({
  selector: 'app-products-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-catalog.component.html',
})
export class ProductsCatalogComponent implements AfterViewInit {

  @ViewChild('catalogContainer') catalogContainer!: ElementRef;
  @ViewChild('scrollThumb') scrollThumb!: ElementRef;

  products: ProductInterface[] = [];
  categories: ChildCategoryInterface[] = [];
  loading = false;
  error: string | null = null;

  private isDragging = false;
  private startX: number = 0;
  private scrollLeft: number = 0;

  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private ngZone: NgZone) {}

  ngOnInit() {
    // Filtrar por ID de Parent Category, limitarlo a 3 y ordenar de mas nuevo a mas viejo
    this.loadProducts( {parent_category: '1', limit: 7, ordering: '-updated_at'} );
  }

  loadProducts(filters?:any) {
    this.loading = true;
    this.productService.getProducts(filters).subscribe({
      next: (data) => {
        // El array de productos se encuentra dentro de la clave {results}. Por eso se debe acceder a data.results en lugar de simplemente data.
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

  ngAfterViewInit() {
    this.updateScrollThumb();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateScrollThumb();
  }

  private updateScrollThumb() {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        const container = this.catalogContainer.nativeElement;
        const thumb = this.scrollThumb.nativeElement;
        const scrollPercentage = (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100;
        const thumbWidth = (container.clientWidth / container.scrollWidth) * 100;
        thumb.style.width = `${thumbWidth}%`;
        thumb.style.transform = `translateX(${scrollPercentage}%)`;
      });
    });
  }

  onThumbMouseDown(e: MouseEvent) {
    e.preventDefault();
    this.isDragging = true;
    this.startX = e.clientX - this.scrollThumb.nativeElement.offsetLeft;
    this.scrollLeft = this.catalogContainer.nativeElement.scrollLeft;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    e.preventDefault();
    const x = e.clientX - this.catalogContainer.nativeElement.offsetLeft;
    const walk = (x - this.startX) * (this.catalogContainer.nativeElement.scrollWidth / this.catalogContainer.nativeElement.clientWidth);
    this.catalogContainer.nativeElement.scrollLeft = this.scrollLeft + walk;
    this.updateScrollThumb();
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  @HostListener('scroll', ['$event.target'])
  onScroll(target: HTMLElement) {
    if (target === this.catalogContainer.nativeElement) {
      this.updateScrollThumb();
    }
  }
}