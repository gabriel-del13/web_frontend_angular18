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
  
  searchTerm: string = '';

  onSearch() {
    if (event) {
      event.preventDefault();  // Evita el comportamiento por defecto solo si el evento existe
  }
  this.search.emit(this.searchTerm)
  }
}
