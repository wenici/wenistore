import { UserService } from './../../shared/services/database/user.service';
import { PasswordValidationService } from './../../shared/services/password-validation.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  isValidForm = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dbstore: AngularFirestore,
    private pswValid: PasswordValidationService,
  ) {}

  registerForm = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: this.pswValid.passwordMatchValidator( 'password', 'confirmPassword'),
    }
  )

  get firstName(): AbstractControl | null {
    return this.registerForm.get('firstName');
  }

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.registerForm.get('confirmPassword');
  }

  openGmailAuto = () => window.open('https://mail.google.com/', '_bank');


  ngOnInit(): void {}

  async onSubmit() {
    if (this.registerForm.valid) {
      this.isValidForm = true;
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      try {
        const authResult = await this.authService.createNewUser(email, password);
        const user: User = {
          id: authResult.user?.uid,
          nom: this.registerForm.get('fisrtName')?.value,
          email: this.registerForm.get('email')?.value,
          createdAd: new Date(),
          // role: 'client',
          // photoURL: ''
        };
        await this.userService.newUser(user);
        await authResult.user?.sendEmailVerification();
        // Success message with sweetAlert 2
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Account successfully registered'
        })
        this.openGmailAuto();
      } catch (error) {
        // Message error with sweetAlert 2
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'error',
          title: 'Make sure you fill in the different fields correctly.'
        })
      }
    }
  }

}
