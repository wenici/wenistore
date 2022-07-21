import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    productCollection: AngularFirestoreCollection<Product>;
    
    constructor(private dbstore: AngularFirestore) {
      this.productCollection = this.dbstore.collection('products', (ref) => 
        ref.orderBy('name', 'desc')
      );
    }

    addProduct = (product: Product) => this.productCollection.add(product);

    getProducts() {
      return this.dbstore.collection('products').snapshotChanges();
    }

    getDetailProduct(productId: string): Observable<Product | undefined> {
      return this.productCollection.doc(productId).valueChanges();
    }

}
