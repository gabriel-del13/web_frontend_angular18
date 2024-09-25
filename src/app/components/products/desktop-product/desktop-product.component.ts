import { Component, Input, Output, EventEmitter} from '@angular/core';
import { ProductInterface } from './../interface/products.interface';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { MainComponent } from "../../main/main.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FavoriteService } from '../../../services/apps/favorite.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-desktop-product',
  standalone: true,
  imports: [CommonModule, MainComponent, SidebarComponent, SearchBarComponent, RouterLink],
  templateUrl: './desktop-product.component.html',})
export class DesktopProductComponent {
  
  
  @Input() products: ProductInterface[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;
  @Input() currentPage = 1;
  @Input() itemsPerPage = 15;
  @Input() totalItems = 0;
  @Input() totalPages = 0;
  notification: { message: string, type: 'success' | 'error' } | null = null;



  @Output() categorySelected = new EventEmitter<{parentIds: number[], childIds: number[]}>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() addToFavorites = new EventEmitter<number>();

  constructor(
  ) {} 

  //Se utiliza para emitar el evento hacia el componente padre (una parent category o child category fue seleccionada)
  onCategorySelected(event: {parentIds: number[], childIds: number[]}) {
    this.categorySelected.emit(event);
  }


  onPageChange(page: number | string): void {
    if (typeof page === 'number') {
      this.pageChange.emit(page);
    }
  }

  getVisiblePages(): (number | string)[] {
    const visiblePages: (number | string)[] = [];
    if (this.totalPages <= 5) {
      for (let i = 1; i <= this.totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        visiblePages.push(1, 2, 3, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        visiblePages.push(1, '...', this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        visiblePages.push(1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages);
      }
    }
    return visiblePages;
  }

  onAddToFavorites(productId: number) {
    event?.preventDefault();
    this.addToFavorites.emit(productId);
    this.showNotification('Producto agregado a favoritos', 'success');

  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notification = { message, type };
    setTimeout(() => {
      this.notification = null;
    }, 3000); // La notificación desaparecerá después de 3 segundos
  }

    
}