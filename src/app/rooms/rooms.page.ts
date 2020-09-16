import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { JoinRoomComponent } from './join-room/join-room.component';
import { AuthserviceService } from '../services/authservices.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {
  roomID: number;
  userName: string;
  uid: any;
  constructor(private modalController: ModalController,
              public auth: AuthserviceService,
              private router: Router,
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
        }).catch(err => {
          console.log(err);
        });
      }
    });
  }


  getRoomToken(): any{
    return this.http.get<any>('http://localhost:3000/createroom');
  }


  ngOnInit() {
    this.auth.getToken();
    this.displayName();
  }
}
