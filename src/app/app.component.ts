import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/users/auth/auth.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductsComponent, MainComponent, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend_angular18';
}
