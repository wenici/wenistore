import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Data } from './data.model';
import { SaveNumberService } from './saveNumber.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {

  public addUniteForm: FormGroup;
  
  unites: Data[];
  editState: boolean= false;
  intemToEdit: Data;

  constructor(
    public dbstore: AngularFirestore,
    public formBuilder: FormBuilder,
    public uniteService: SaveNumberService,
    public router: Router
  ) {
    this.addUniteForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      numero: ['', Validators.required],
      createdAt: Date.now() * 1000,
    });
  }

  ngOnInit() {
    this.uniteService.getUnites().subscribe((res) => {
      this.unites = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Data),
        };
      });
    });
  }

  get name(): AbstractControl | null {
    return this.addUniteForm.get('name');
  }

  get numero(): AbstractControl | null {
    return this.addUniteForm.get('numero');
  }

  get price(): AbstractControl | null {
    return this.addUniteForm.get('price');
  }

  onSubmit() {
    if(this.addUniteForm.valid) {
      const unite: Data = {
        name: this.addUniteForm.get('name')?.value,
        numero: this.addUniteForm.get('numero')?.value,
        price: this.addUniteForm.get('price')?.value,
        createdAt: new Date(),
      };
      try {
       this.uniteService.addUnite(unite);
       this.addUniteForm.reset();
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

  removeUnite(unite: Data) {
    this.uniteService.delete(unite);
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
      title: 'Enregistrement supprimé avec succès',
    });
  }

  editUnite(event, unite){
    this.editState = true;
    this.intemToEdit = unite;
  }

  updateUnite(unite: Data) : void {
    this.uniteService.update(unite);
  }

}
