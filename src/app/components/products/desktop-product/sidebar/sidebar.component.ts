import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryInterface } from '../../interface/products.interface';
import { ProductService } from '../../../../services/apps/products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent{

}