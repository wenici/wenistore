import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoFoundPageComponent } from './no-found-page/no-found-page.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { ShoppingCardComponent } from './components/shopping-card/shopping-card.component';
import { ProductsComponent } from './components/products/products.component';
import { OthersComponent } from './others/others.component';

import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'acceuil',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'product-details/:productId',
    component: DetailsProductComponent,
  },
  {
    path: 'update/:id',
    component: UpdateProductComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'shopping-card',
    component: ShoppingCardComponent,
  },
  {
    path: 'others',
    component: OthersComponent,
  },
  { 
    path: 'acceuil',
    loadChildren: () => import('./top/top.module').then(m => m.TopModule)
  },
  {
    path: '**',
    component: NoFoundPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
