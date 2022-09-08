import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/shared/services/database/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  
  users: User[];
  editSate: boolean = false;
  userToEdit: User;

  constructor(public userService: UserService, public dbstore: AngularFirestore) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as User),
        };
      });
    });
  }

  updateUser(user: User) {
    const userDoc = this.dbstore.doc(`users/${user.id}`);
    userDoc.update(user);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 800,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'Modification effectuée'
    });
    this.userService.removeUser(user);
  }

  editUser(event, user) {
    this.editSate = true;
    this.userToEdit = user;
  }

}
