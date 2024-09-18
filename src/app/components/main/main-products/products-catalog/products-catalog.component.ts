import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef, HostListener, NgZone  } from '@angular/core';
import { ProductInterface } from '../../../products/interface/products.interface';
import { ProductService } from '../../../../services/apps/products.service';

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
  loading = false;
  error: string | null = null;

  private isDragging = false;
  private startX: number = 0;
  private scrollLeft: number = 0;

  constructor(
    private productService: ProductService,
    private ngZone: NgZone) {}

  ngOnInit() {
    this.loadProducts( {category: '3'} );
  }

  loadProducts(filters?:any) {
    this.loading = true;
    this.productService.getProducts(filters).subscribe({
      next: (data) => {
        console.log('Filtered products:', data); // Verifica los datos aquí

        this.products = data;
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
    this.addTouchEvents();
  }

  private addTouchEvents() {
    const container = this.catalogContainer.nativeElement;
    let startX: number;
    let scrollLeft: number;

    container.addEventListener('touchstart', (e: TouchEvent) => {
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchmove', (e: TouchEvent) => {
      if (!startX) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
      this.updateScrollThumb();
    });

    container.addEventListener('touchend', () => {
      startX = 0;
    });
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
    this.isDragging = true;
    this.startX = e.pageX - this.scrollThumb.nativeElement.offsetLeft;
    this.scrollLeft = this.catalogContainer.nativeElement.scrollLeft;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    e.preventDefault();
    const x = e.pageX - this.catalogContainer.nativeElement.offsetLeft;
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
