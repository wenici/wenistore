import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private afs: AngularFirestore) { }

  ngOnInit(){
  }
  // add() {
  //   this.afs.collection('products').add({
  //     timestamp: new Date(),
  //   })
  // }
}
