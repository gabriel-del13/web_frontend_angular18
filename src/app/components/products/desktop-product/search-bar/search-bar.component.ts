import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  @Output() order = new EventEmitter<string>();

  searchTerm: string = '';
  orderingFields = [
    { value: 'name_product', label: 'Nombre del Producto' },
    { value: 'updated_at', label: 'Fecha de Actualización' },
    { value: 'price', label: 'Precio' },
    { value: 'available_quantity', label: 'Cantidad Disponible' }
  ];
  selectedOrder: string = '';

  onSearch(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.search.emit(this.searchTerm);
  }

  onOrderChange() {
    this.order.emit(this.selectedOrder);
  }
}
