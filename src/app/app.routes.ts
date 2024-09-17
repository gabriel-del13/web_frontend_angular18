import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { MainComponent } from './components/main/main.component';

import { ServicesComponent } from './components/services/services.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HeaderComponent } from './components/main/pages/header/header.component'; 
import { FooterComponent } from './components/main/pages/footer/footer.component';
import { HeroComponent } from './components/main/pages/header/hero/hero.component';
import { LocationComponent } from './components/main/pages/sections/location/location.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';

export const routes: Routes = [
  { 
    path: '', 
    children: [
      { path:'', component: MainComponent},
      { path:'header', component: HeaderComponent},
      { path:'hero', component: HeroComponent},



    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
    
  
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

  {
    path: 'footer',
    children: [
      {path:'', component: FooterComponent},
      { path:'location', component: LocationComponent},
    ]
  },

  { path: '**', redirectTo: '' },
   
];