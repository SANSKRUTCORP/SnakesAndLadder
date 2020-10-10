import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthserviceService } from 'src/app/services/authservices.service';
// import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss'],
})
export class JoinRoomComponent implements OnInit {
  roomNo: any;
  uid: any;
  constructor(private modalController: ModalController,
              // private utils: UtilsService,
              private router: Router,
              private db: AngularFireDatabase,
              private auth: AuthserviceService,
              private http: HttpClient) { }


  onClick(item){
    let resp;
    this.roomNo = item.value;
    this.uid = localStorage.getItem('tempid');
    const ref = this.db.database.ref('/rooms');
    ref.once('value').then(snapshot => {
      resp = snapshot.val();
      if (resp['room_' + this.roomNo]){

        this.auth.getUser().then(res => {
          this.http.post<any>('/apis/joinroom',
          // this.http.post<any>(this.utils.GetServerHost() + '/apis/joinroom',
          {
            enterid : this.roomNo,
            entername : res.displayName,
            uid : this.uid
          }).subscribe(response => {
            if (response){
              this.router.navigate(['/createroom'], {
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

}
