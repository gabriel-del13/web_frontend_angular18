import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { MainComponent } from './components/main/main.component';

import { ServicesComponent } from './components/services/services.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  /*
  { 
    path: 'users', 
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },*/
  { 
    path: 'products', 
    children: [
      { path: '', component: ProductsComponent },
      /*
      { path: 'items/:id', component: ProductsItemComponent },
      { path: 'category/:id', component: ProductsCategoryComponent }
       */
    ]
  },
  
  { path: 'services', component: ServicesComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '**', redirectTo: '' }
   
];