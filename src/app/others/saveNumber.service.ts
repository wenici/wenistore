import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Data } from './data.model';
@Injectable({
  providedIn: 'root'
})
export class SaveNumberService {

 uniteCollection: AngularFirestoreCollection<Data>;
 uniteDoc: AngularFirestoreDocument<Data>

constructor(private dbstore: AngularFirestore) {
  this.uniteCollection = this.dbstore.collection('unites', (ref) => 
        ref.orderBy('name', 'desc')
  );
}

  addUnite = (unite: Data) => this.uniteCollection.add(unite);

  getUnites() {
    return this.dbstore.collection('unites').snapshotChanges();
  }

  delete (unite: Data) {
    this.uniteDoc = this.dbstore.doc(`unites/${unite.id}`);
    this.uniteDoc.delete();
  }

  update(unite: Data) {
    this.uniteDoc = this.dbstore.doc(`unites/${unite.id}`);
    this.uniteDoc.update(unite);
  }
}
