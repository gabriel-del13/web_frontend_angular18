import { Component } from '@angular/core';
import { HeaderComponent } from "../pages/header/header.component";
import { carrouselComponent } from "../pages/carruousel/carrousel.component";
import { FooterComponent } from "../pages/footer/footer.component";
import { ProductsCatalogComponent } from './products-catalog/products-catalog.component';
import { ProductsCatalogTwoComponent } from "./products-catalog/products-catalog-two.component";

@Component({
  selector: 'app-main-products',
  standalone: true,
  imports: [HeaderComponent, carrouselComponent, FooterComponent, ProductsCatalogComponent, ProductsCatalogTwoComponent],
  templateUrl: './main-products.component.html',
})
export class MainProductsComponent {

}
