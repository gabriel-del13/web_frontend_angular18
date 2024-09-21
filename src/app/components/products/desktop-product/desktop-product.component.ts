import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductInterface } from './../interface/products.interface';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { MainComponent } from "../../main/main.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ProductService } from '../../../services/apps/products.service';


@Component({
  selector: 'app-desktop-product',
  standalone: true,
  imports: [CommonModule, MainComponent, SidebarComponent],
  templateUrl: './desktop-product.component.html',})
export class DesktopProductComponent {
  
  @Input() products: ProductInterface[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;
  @Output() categorySelected = new EventEmitter<{parentId?: number, childId?: number}>();

  constructor() {} 

  onCategorySelected(event: {parentId?: number, childId?: number}) {
    this.categorySelected.emit(event);
  }
}