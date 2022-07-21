import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ShoppingCardService } from 'src/app/shared/services/shopping-card.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {

  shopping: Cart[];
  quantity: number;

  constructor(
    private shopCartService: ShoppingCardService,
    public productService: ProductsService,
    private dbstore: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() { 
    this.shopCartService.getItems().subscribe((res) => {
      this.shopping = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Cart),
        };
      });
    });
  }

  goToDetailsProduct(productId?: string): void {
    this.router.navigate(['product-details', productId]);
    console.log(productId);
  }

  deleteProduct(shoppingID?: string) {
    this.dbstore.collection('shopping').doc(shoppingID).delete().then(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'Article supprimé de votre panier',
      });
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
    console.log(shoppingID);
  }

  inCrementProduct(productId?: string) {
    this.dbstore.collection('shooping').doc(`${productId}`).update({
    quantity: this.quantity+1
     });
    console.log(productId);
  }
  
}
