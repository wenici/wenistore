import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProductsService } from 'src/app/shared/services/products.service';
import {
  AngularFireStorage,
} from '@angular/fire/compat/storage';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { url } from 'inspector';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {

  isValidForm = false;
  imagesUrl: string[] = [];
  quantity: number = 0;
  isMyProduct: boolean = false;
  isInvalid: boolean = true;

  public addProductForm: FormGroup;

  constructor(
    private storage: AngularFireStorage,
    public productService: ProductsService,
    public dbstore: AngularFirestore,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      price_solde: ['', Validators.required],
      description: ['', Validators.required],
      fichetech: ['', Validators.required],
      category: ['', Validators.required],
      createdAt: new Date(),
    });
  }

  resetForm(product: Product): void {
    
  }

  ngOnInit(): void {}

  get name(): AbstractControl | null {
    return this.addProductForm.get('name');
  }

  get price(): AbstractControl | null {
    return this.addProductForm.get('price');
  }

  get price_solde(): AbstractControl | null {
    return this.addProductForm.get('price_solde');
  }

  get description(): AbstractControl | null {
    return this.addProductForm.get('description');
  }

  get fichetech(): AbstractControl | null {
    return this.addProductForm.get('fichetech');
  }

  get category(): AbstractControl | null {
    return this.addProductForm.get('category');
  }

  onSubmit() {
    if(this.addProductForm.valid) {
      const product: Product = {
        name: this.addProductForm.get('name')?.value,
        price: this.addProductForm.get('price')?.value,
        price_solde: this.addProductForm.get('price_solde')?.value,
        description: this.addProductForm.get('description')?.value,
        fichetech: this.addProductForm.get('fichetech')?.value,
        category: this.addProductForm.get('category')?.value,
        imageURL: this.imagesUrl,
        quantity: this.quantity,
        isMyProduct: true,
        createdAt: new Date(),
      };
      try {
       this.productService.addProduct(product);
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
        title: 'Produit enregistré avec succès',
      });
      } catch (error) {
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
          icon: 'error',
          title: 'Erreur d\'enregistrement',
        });
      }
    }

  }

  async selectFiles(event: any): Promise<void> {
    if (event.target.files) {
      for (let i = 0; i < File.length; i++) {
        const file = event.target.files[i];
        const filePath = `mes_images/${Date.now()}_${file.name}`;
        const task = this.storage.upload(filePath, file);
        const uploadTaskSnapshot = await task;
        const url = await uploadTaskSnapshot.ref.getDownloadURL();
        this.imagesUrl.push(url);
        this.imagesUrl.length >= 0
          ? (this.isInvalid = false)
          : (this.isInvalid = true);
      }
    }
  }
}
