import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Product } from 'src/app/models/product.model';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    constructor(private angularFirestore: AngularFirestore) {}


    // Ajouter un produit dans la base de la base de données
    // addProduct(product: Product) {
    //   product.id = this.dbstore.createId();
    //   return this.dbstore.collection('products').add(product);
    // }

    // Obtenir tous les produits de la base de données
    // getAllProducts() {
    //   // return this.products;
    //   return this.dbstore.collection('products').snapshotChanges();
    // }

    // Supprimer un produit de la base de données
    // deleteProduct(product: Product) {
    //   this.dbstore.doc('/products/'+product.id).delete();
    // }

    // Mettre à jour un produit de la base de données
    // updateProduct(product: Product) {
    //   this.dbstore.doc('/products/'+product.id).update({
    //     name: product.name,
    //     price: product.price,
    //     price_solde: product.price_solde,
    //     description: product.description,
    //     fichetech: product.fichetech,
    //     createdAt: product.createdAt,
    //   })
    // }
    getProductsDoc(product: Product) {
      product.id = this.angularFirestore.createId();
      return this.angularFirestore
        .collection('products')
        .doc(product.id)
        .valueChanges();
    }

    getProductsList() {
      return this.angularFirestore
        .collection('products')
        .snapshotChanges();
    }

    createProduct(product: Product) {
      return new Promise<any>((resolve, reject) => {
        this.angularFirestore
          .collection('products')
          .add(product)
      });
    }

    deleteProduct(product: Product) {
      return this.angularFirestore
        .collection('products')
        .doc(product.id)
        .delete();
    }

    updateProduct(product: Product) {
      return this.angularFirestore.collection('products').doc(product.id).update({
        name: product.name,
        price: product.price,
        price_solde: product.price_solde,
        description: product.description,
        fichetech: product.fichetech,
        category: product.category,
        imageURL: product.imageURL,
        updatedAt: product.updatedAt,
      });
    }

}
