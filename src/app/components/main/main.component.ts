import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./pages/header/header.component";
import { FooterComponent } from "./pages/footer/footer.component";
import { HeroComponent } from './pages/header/hero/hero.component';
import { ServicesComponent } from "../services/services.component";
import { SectionproductsComponent } from "./pages/sections/sectionproducts/sectionproducts.component";
import { SectionservicesComponent } from "./pages/sections/sectionservices/sectionservices.component";
import { AboutComponent } from "./pages/sections/about/about.component";
import { LocationComponent } from "./pages/sections/location/location.component";
import { LogoGridComponent } from './pages/logo-grid/logo-grid.component';
import { GalleryComponent } from "./pages/sections/gallery/gallery.component";


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterModule, HeaderComponent, FooterComponent, HeroComponent,
    ServicesComponent, SectionproductsComponent, SectionservicesComponent,
    AboutComponent, LocationComponent, LogoGridComponent,
    GalleryComponent
],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  
}
