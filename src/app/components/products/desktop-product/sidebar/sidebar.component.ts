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
  @Output() categorySelected = new EventEmitter<{parentId?: number, childId?: number}>();
  parentCategories: ParentCategoryInterface[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.loadParentCategories();
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

  toggleChildCategories(parentId: number): void {
    const parent = this.parentCategories.find(cat => cat.id === parentId);
    if (parent) {
      parent.showChildren = !parent.showChildren;
    }
  }

  toggleParentSelection(parent: ParentCategoryInterface, event: Event): void {
    event.stopPropagation();
    parent.isSelected = !parent.isSelected;
    parent.subcategories.forEach(child => child.isSelected = parent.isSelected);
    this.emitCategorySelection(parent.id);
  }

  toggleChildSelection(parent: ParentCategoryInterface, child: ChildCategoryInterface, event: Event): void {
    event.stopPropagation();
    child.isSelected = !child.isSelected;
    parent.isSelected = parent.subcategories.every(c => c.isSelected);
    this.emitCategorySelection(parent.id, child.id_childcategory);
  }

  private emitCategorySelection(parentId?: number, childId?: number): void {
    this.categorySelected.emit({ parentId, childId });
  }
}