import { Component, NgZone, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/database/user.service';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';
import * as firebase from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import { AngularFirestore } from '@angular/fire/compat/firestore';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  

  userID = '';
  currentUserData?: User | undefined;
  userData: User | null;
  constructor( private authService: AuthService ) { }

  ngOnInit() {}
  logout = () => this.authService.logout();

  isAuthenticated = () => this.authService.isLoggedin();
}