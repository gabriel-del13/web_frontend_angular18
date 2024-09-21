import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ParentCategoryInterface, ChildCategoryInterface } from '../../interface/products.interface';
import { CategoriesService } from '../../../../services/apps/categories.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit{
  // Output en un decorado que permite que un componente hijo envie datos a un componente padre, cada vez que se selecciona una categoria
  // el evento se dispara y el componente padre puede actuar sobre ello
  @Output() categorySelected = new EventEmitter<{parentId?: number, childId?: number}>();

  parentCategories: ParentCategoryInterface[] = [];
  childCategories: ChildCategoryInterface[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.loadParentCategories();
  }

  // Función para cargar las Parent Categories
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

  // Deseleccionar Filtrado por Categoria
  removeCategorySelection(parentId: number): void {
    this.categorySelected.emit({ parentId: undefined, childId: undefined });
  }
  


  // Función para manejar la selección de una Parent Category
  toggleParentSelection(parent: ParentCategoryInterface, event: Event): void {
    event.stopPropagation();
    
    // Cambia el estado de selección de la categoría principal
    parent.isSelected = !parent.isSelected;
  
    // Cambia el estado de selección de las subcategorías (si aplica)
    parent.subcategories.forEach(child => child.isSelected = parent.isSelected);
  
    // Emite el evento con el ID de la categoría
    if (parent.isSelected) {
      this.emitCategorySelection(parent.id);  // Seleccionar categoría
    } else {
      this.removeCategorySelection(parent.id);  // Deseleccionar categoría
    }
  }
  
  // Función para manejar la selección de una Child Category
  toggleChildSelection(parent: ParentCategoryInterface, child?: ChildCategoryInterface, event?: Event): void {
    // Detener la propagación del evento si se hace clic en el checkbox
    if (event) {
      event.stopPropagation();
    }
  
    // Si se ha pasado una subcategoría (cuando el checkbox es clicado)
    if (child) {
      // Cambia el estado de selección de la subcategoría
      child.isSelected = !child.isSelected;
  
      // Actualiza el estado de la categoría principal dependiendo de las subcategorías seleccionadas
      parent.isSelected = parent.subcategories.every(c => c.isSelected);
  
      // Emitir evento de selección para la subcategoría
      this.emitCategorySelection(parent.id, child.id);
    } else {
      // Alternar visibilidad (mostrar/ocultar) de las subcategorías
      parent.showChildren = !parent.showChildren;
    }
  }

  // Función para emitir el evento de selección de categoría
  private emitCategorySelection(parentId?: number, childId?: number): void {
    this.categorySelected.emit({ parentId, childId });
  }
  
}