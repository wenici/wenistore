import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ProductsService } from '../../shared/services/products.service';
import { ShoppingCardService } from 'src/app/shared/services/shopping-card.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {
  
  isMyProduct: boolean = false;
  productIdRoute: string;
  product: Observable<Product>;
  deProd: string[] = [];
  userID: string;
  quantity: number = 0;
  userCollection: AngularFirestoreCollection<User>
  title = 'Weni Store - Détail de produit';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private shoppingCardService: ShoppingCardService,
    private titleService: Title
  ) {
    const routeParams = this.route.snapshot.paramMap;
    this.productIdRoute = String(routeParams.get('productId'));
    this.product = this.productService.getDetailProduct(this.productIdRoute);
  }

  ngOnInit(): void {
    this.product = this.productService.getDetailProduct(this.productIdRoute);
    this.titleService.setTitle(this.title);
  }

  // getIdprod(productId: string) {
  //   console.log(productId);
  // }

  onAddToShoppingCart(product: Product, userID: string): void {
    const productDetails = this.productService.getDetailProduct(this.productIdRoute);
    const qteProduct = (product.quantity += 1);
    product.isMyProduct = true;
    this.shoppingCardService.addToMyCart(product, userID, qteProduct)
  }

  onRemoveToShoppingCart(product: Product, userID: string): void {
    const qteProduct = (product.quantity -= 1);
    if (qteProduct == 0) {
      product.isMyProduct = false;
    } else product.isMyProduct = true;
    this.shoppingCardService.addToMyCart(product, userID, qteProduct)
  }


}
