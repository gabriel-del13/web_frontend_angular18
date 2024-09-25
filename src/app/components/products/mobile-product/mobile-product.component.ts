import { Component, Input, Output, EventEmitter, inject, input } from '@angular/core';
import { ChildCategoryInterface, ParentCategoryInterface, ProductInterface } from './../interface/products.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../../services/apps/categories.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mobile-product',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './mobile-product.component.html',
})
export class MobileProductComponent {

  parentCategories: ParentCategoryInterface[] = [];
  selectedParentIds: number[] = [];
  selectedChildIds: number[] = [];
  DropdownisOpen = false;
  openSubmenu: { [key: string]: boolean } = {};
  searchTerm: string = '';


  constructor(private categoriesService: CategoriesService) {}


  @Input() products: ProductInterface[] = [];
  @Input() currentFilters: any;
  @Input() loading = false;
  @Input() error: string | null = null;
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  notification: { message: string, type: 'success' | 'error' } | null = null;


  @Output() categorySelected = new EventEmitter<{parentIds: number[], childIds: number[]}>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() search = new EventEmitter<string>();
  @Output() addToFavorites = new EventEmitter<number>();

  
  ngOnInit(): void {
    this.loadParentCategories();
  }
  onSearch() {
    if (event) {
      event.preventDefault();  // Evita el comportamiento por defecto solo si el evento existe
  }
  this.search.emit(this.searchTerm)
  }


  // Función para alternar el estado del dropdown
  toggleDropdown() {
    this.DropdownisOpen = !this.DropdownisOpen;
  }
  // Función para alternar los submenús
  toggleSubmenu(category: string) {
    this.openSubmenu[category] = !this.openSubmenu[category];
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }



  loadParentCategories(): void {
    this.categoriesService.getParentCategories().subscribe(categories => {
      this.parentCategories = categories.map((category: ParentCategoryInterface) => ({
        ...category,
        showChildren: false,
        isSelected: false,
        subcategories: category.subcategories.map(child => ({ ...child, isSelected: false }))
      }));
    });
  }

  toggleParentSelection(parent: ParentCategoryInterface, event: Event): void {
    event.stopPropagation();
    
    parent.isSelected = !parent.isSelected;
    parent.subcategories.forEach(child => child.isSelected = parent.isSelected);

    this.updateSelectedIds();
    this.emitCategorySelection();
  }

  toggleChildSelection(parent: ParentCategoryInterface, child: ChildCategoryInterface, event: Event): void {
    event.stopPropagation();
    
    child.isSelected = !child.isSelected;
    parent.isSelected = parent.subcategories.every(c => c.isSelected);

    this.updateSelectedIds();
    this.emitCategorySelection();
  }

  toggleChildrenVisibility(parent: ParentCategoryInterface): void {
    parent.showChildren = !parent.showChildren;
  }

  private updateSelectedIds(): void {
    this.selectedParentIds = this.parentCategories
      .filter(parent => parent.isSelected)
      .map(parent => parent.id);

    this.selectedChildIds = this.parentCategories
      .flatMap(parent => parent.subcategories)
      .filter(child => child.isSelected)
      .map(child => child.id);
  }

  private emitCategorySelection(): void {
    this.categorySelected.emit({
      parentIds: this.selectedParentIds,
      childIds: this.selectedChildIds
    });
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

