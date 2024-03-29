import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopModule } from './top/top.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './layouts/header/header.component';

import { UpdateProductComponent } from './components/update-product/update-product.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NoFoundPageComponent } from './no-found-page/no-found-page.component';

import { defineLordIconElement } from 'lord-icon-element';
import lottie from 'lottie-web';
import { AuthService } from './shared/services/auth/auth.service';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './layouts/material.module';
import { ShopComponent } from './components/shop/shop.component';
import { DeliveryComponent } from './components/shop/checkout/delivery/delivery.component';
import { PaymentComponent } from './components/shop/checkout/payment/payment.component';
import { CheckoutComponent } from './components/shop/checkout/checkout.component';
import { OrdersComponent } from './components/shop/orders/orders.component';
import { UserProfilImgComponent } from './auth/user-profil-img/user-profil-img.component';

@NgModule({
  declarations: [		
    AppComponent,
    HeaderComponent,
    UpdateProductComponent,
    DetailsProductComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    NoFoundPageComponent,
    ShopComponent,
    DeliveryComponent,
    PaymentComponent,
    CheckoutComponent,
    OrdersComponent,
    UserProfilImgComponent,
   ],
   entryComponents: [
    LoginComponent
  ],
  imports: [
    TopModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    MaterialModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [ Title, { provide: LOCALE_ID, useValue: 'fr', }, AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor() {
    defineLordIconElement(lottie.loadAnimation);
  }
}
