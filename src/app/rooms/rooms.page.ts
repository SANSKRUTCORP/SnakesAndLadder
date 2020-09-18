import { Component, NgZone, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { JoinRoomComponent } from './join-room/join-room.component';
import { AuthserviceService } from '../services/authservices.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {
  roomID: number;
  userName: string;
  uid: any;
  wins: number;
  gplay: number;

  constructor(private modalController: ModalController,
              public auth: AuthserviceService,
              private router: Router,
              public zone: NgZone,
              private db: AngularFireDatabase,
              private http: HttpClient) {}

  popup() {
    const modal = this.modalController
      .create({
        component: JoinRoomComponent,
        cssClass: 'my-custom-modal-css',
        showBackdrop: true,
        backdropDismiss: true,
        swipeToClose: true
      })
      .then(popElement => {
        popElement.present(),
          popElement.onDidDismiss().then(resp => {
          });
      });
  }

  signOut(){
    if (this.auth.isUserSignedIn()){
      console.log(this.auth.loggedInEmail);
      this.auth.SignOut();
    } else{
      console.log('Not signed in at rooms?!');
    }
  }

  onClick(){
    this.getRoomToken().subscribe(res => {
      this.roomID = res.room_token;
      // console.log(this.roomID);
      this.router.navigate(['/createroom'], {
        queryParams: {room : this.roomID}
      });

    });
  }

  displayName(){
    this.auth.isUserSignedIn().then(res => {
      if (res){
        this.auth.getUser().then(user => {
          this.userName = user.displayName;
          this.uid = sessionStorage.getItem('tempid');
          this.http.post<any>('http://localhost:3000/setUser', {uid : this.uid, name : this.userName}).subscribe(resp => {
            console.log(resp);
          });
        }).catch(err => {
          console.log(err);
        });
      }
    });
  }

  getStats(){
    this.zone = new NgZone({});
    this.uid = sessionStorage.getItem('tempid');
    this.db.database.ref('Users/' + this.uid).on('value', snapshot => {
      this.zone.run(() => {
        this.wins = snapshot.child('wins').val();
        this.gplay = snapshot.child('gameplay').val();
        console.log(this.wins, this.gplay);
      })
    });
  }



  getRoomToken(): any{
    return this.http.get<any>('http://localhost:3000/createroom');
  }


  ngOnInit() {
    this.auth.getToken();
    this.displayName();
    this.getStats();
  }
}
