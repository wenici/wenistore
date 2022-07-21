import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/database/user.service';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
 userID: '';
 currentUserData?: Observable<User | undefined>;

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private dbauth: AngularFireAuth,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userID = this.route.snapshot.data['user'].uid;
    this.currentUserData = this.userService.getUser(this.userID);
  }

  logout = () => this.authService.logout();

  isAuthenticated = () => this.authService.isLoggedin();


}
