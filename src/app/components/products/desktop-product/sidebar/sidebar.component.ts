import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
export class SidebarComponent implements OnInit {
  @Input() currentFilters: any;

  @Output() categorySelected = new EventEmitter<{parentIds: number[], childIds: number[]}>();

  parentCategories: ParentCategoryInterface[] = [];
  selectedParentIds: number[] = [];
  selectedChildIds: number[] = [];

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
}