import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/users/auth/auth.component';
import { DarkModeService } from './services/search/dark-mode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductsComponent, MainComponent, AuthComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend_angular18';
  constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.darkModeService.initializeDarkMode();
  }
}