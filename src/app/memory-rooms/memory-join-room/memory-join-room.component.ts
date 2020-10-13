import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthserviceService } from 'src/app/services/authservices.service';

@Component({
  selector: 'app-memory-join-room',
  templateUrl: './memory-join-room.component.html',
  styleUrls: ['./memory-join-room.component.scss'],
})
export class MemoryJoinRoomComponent implements OnInit {

  roomNo: any;
  uid: any;
  constructor(private modalController: ModalController,
              private router: Router,
              private db: AngularFireDatabase,
              private auth: AuthserviceService,
              private http: HttpClient) { }


  onClick(item){
    let resp;
    this.roomNo = item.value;
    this.uid = localStorage.getItem('tempid');
    const ref = this.db.database.ref('memory/rooms');
    ref.once('value').then(snapshot => {
      resp = snapshot.val();
      if (resp['room_' + this.roomNo]){

        this.auth.getUser().then(res => {
          this.http.post<any>('/apis/mmry/joinroom',
          // this.http.post<any>(this.utils.GetServerHost() + '/apis/joinroom',
          {
            enterid : this.roomNo,
            entername : res.displayName,
            uid : this.uid
          }).subscribe(response => {
            if (response){
              this.router.navigate(['/memory-createroom'], {
                queryParams: {room : this.roomNo}
              });
            } else {
              alert('Max players in Room!');
            }
          });
        });
      }
      else{
        alert('Room Number does not exists! Try again...');
      }
    });

  }
  ngOnInit() {}
  CloseModal()
  {
    this.modalController.dismiss();

  }

  Audio(){
    const audio = new Audio('../assets/button-click.mpeg'); // audio play on flip of card
    audio.play();
  }
  
}
