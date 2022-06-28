import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userCollection: AngularFirestoreCollection<User>;

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
}
