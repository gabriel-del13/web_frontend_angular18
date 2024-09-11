import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { MainComponent } from './components/main/main.component';

import { ServicesComponent } from './components/services/services.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ContactComponent } from './components/main/pages/contact/contact.component';
import { AboutComponent } from './components/main/pages/about/about.component';
import { LocationComponent } from './components/main/pages/location/location.component';
import { HeaderComponent } from './components/main/pages/header/header.component';

export const routes: Routes = [
  { 
    path: '', 
    children: [
      { path:'', component: MainComponent},
      { path:'header', component: HeaderComponent},
      { path:'about-us', component: AboutComponent},
      { path:'location', component: LocationComponent},
      { path:'contact', component: ContactComponent},

    ]
  },
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