import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { MainComponent } from './components/main/main.component';

import { ServicesComponent } from './components/services/services.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { DetailProductsComponent } from './components/products/detail-products/detail-products.component';
import { MainProductsComponent } from './components/main/main-products/main-products.component';
import { SidebarComponent } from './components/products/desktop-product/sidebar/sidebar.component';
import { DesktopProductComponent } from './components/products/desktop-product/desktop-product.component';


export const routes: Routes = [
  { 
    path: '', 
    children: [
      { path:'', component: MainComponent},
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
    
  { 
    path: 'products', 
    children: [
      { path: '', component: MainProductsComponent },
      { path: 'items', component: ProductsComponent},
      { path: 'items/:id', component: DetailProductsComponent },
      /*
      { path: 'category/:id', component: ProductsCategoryComponent }
       */
    ]
  },
  { path: 'services', component: ServicesComponent },
  { path: 'favorites', component: FavoritesComponent },


  { path: '**', redirectTo: '' },
   
];