import { Component } from '@angular/core';
import { HeaderComponent } from "../pages/header/header.component";
import { carrouselComponent } from "../pages/carruousel/carrousel.component";
import { FooterComponent } from "../pages/footer/footer.component";
import { ProductsCatalogComponent } from './products-catalog/products-catalog.component';
import { ProductsCatalogTwoComponent } from "./products-catalog/products-catalog-two.component";
import { RouterLink } from '@angular/router';
import { ProductsCatalogTreeComponent } from './products-catalog/products-catalog-tree.component';

@Component({
  selector: 'app-main-products',
  standalone: true,
  imports: [HeaderComponent, carrouselComponent, FooterComponent, ProductsCatalogComponent, ProductsCatalogTwoComponent, ProductsCatalogTreeComponent, RouterLink],
  templateUrl: './main-products.component.html',
})
export class MainProductsComponent {

}
