import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentData
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/models/product.model';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;

  constructor(private dbstore: AngularFirestore, private router: Router) {
    this.userCollection = this.dbstore.collection('users');
  }

  newUser(user: User): Promise<void> {
    const defautCentreInteret = {
      categoryName: 'Vêtements',
      categoryCouleur: '#ff91f9',
    };
    const userDoc = this.userCollection.doc(user.id);
    userDoc.collection('centre_interets').add(defautCentreInteret);
    return userDoc.set(user);
  }

  getUser = (userID?: string) => this.userCollection.doc(userID).valueChanges();

  getAllUsers() {
    return this.dbstore.collection('users').snapshotChanges();
  }
  // Produit du panier initial de l'utilisateur
  getInitialShoppingCart(userid: string): Observable<DocumentData[]> {
    const userDoc = this.userCollection.doc(userid);
    return userDoc.collection('shopping').valueChanges();
  }

  // Tous les produits ajouté au panier de l'utilisateur courrement connnecté
  async getShoppingCartProducts(userid: string): Promise<Product[]> {
    const userDoc = this.dbstore.firestore.collection('users').doc(userid);
    const shopping = await userDoc.collection('shopping').get();
    return shopping.docs.map((doc) => {
      const data = doc.data() as Product;
      const id = doc.id;
      return { id, ...data };
    });
  }

  // ajouter un produit au panier
  setTocart(userID: string, product: Product): Promise<void> {
    const userDoc = this.userCollection.doc(userID);
    return userDoc.collection('shopping').doc(product.id).set(product);
  }

  // supprimer un utilisateur du panier
  removeUser(user: User): Promise<void> {
    return this.dbstore.collection('shopping').doc(user.id).delete();
  }

}
