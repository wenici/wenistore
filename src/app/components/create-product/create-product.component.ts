import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

import { Observable } from 'rxjs';
import { map,finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProductsService } from 'src/app/shared/services/products.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  // categoriesCollection: AngularFirestoreCollection<Categories>;
  // categories: Observable<Categories[]>;
  // snapshot: any;

  // productsCollection: AngularFirestoreCollection<Product>;
  // products: Observable<Product[]>;
  // productDoc: AngularFirestoreDocument<Product>;

  // constructor(
  //   private dbstore: AngularFirestore,
  //   public productService: ProductsService,
  // ) { }

  // ngOnInit(): void {
  //   this.categoriesCollection = this.dbstore.collection('categories');
  //   this.categories = this.categoriesCollection.valueChanges();
  //   this.snapshot = this.categoriesCollection.snapshotChanges()
  //       .pipe(
  //         map(actions => actions.map(a => a.payload.doc.data()))
  //     )

  //   this.productsCollection = this.dbstore.collection('products');
  //   this.products = this.productsCollection.snapshotChanges().pipe(
  //       map(actions => actions.map(a => {
  //           const data = a.payload.doc.data() as Product;
  //           data.id = a.payload.doc.id;
  //           return data;
  //       }))
  //   );
  // }

  @Input() file: File;
  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  public productForm: FormGroup;

  constructor(
    private storage: AngularFireStorage,
    public productService: ProductsService,
    public dbstore: AngularFirestore,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      price_solde: ['', Validators.required],
      description: ['', Validators.required],
      fichetech: ['', Validators.required],
      category: ['', Validators.required],
      imageURL: ['',Validators.required],
      createdAt: new Date(),
    })
  }


  ngOnInit(): void {
    // this.startUpload();
  }

  // startUpload() {
  //   // The storage path
  //   const path = `test/${Date.now()}_${this.file.name}`;

  //   // Reference to storage bucket
  //   const ref = this.storage.ref(path);

  //   // The main task
  //   this.task = this.storage.upload(path, this.file);

  //   // Progress monitoring
  //   this.percentage = this.task.percentageChanges();

  //   this.snapshot   = this.task.snapshotChanges().pipe(
  //     tap(console.log),
  //     // The file's download URL
  //     finalize( async() =>  {
  //       this.downloadURL = await ref.getDownloadURL().toPromise();

  //       this.dbstore.collection('products').add( { downloadURL: this.downloadURL, path });
  //     }),
  //   );
  // }

  onSubmit() {
    this.productService.createProduct(this.productForm.value);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'Produit enregistré avec succès'
    })
   };



}
