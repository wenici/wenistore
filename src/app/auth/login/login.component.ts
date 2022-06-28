import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

import { User } from '../../models/user.model';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public afs: AngularFirestore, // Injecter le service Firestore
    public afAuth: AngularFireAuth, // Injecter le service d'authentification Firebase
    public router: Router, //
    public ngZone: NgZone
  ) {}

  ngOnInit(): void {
  }

}
