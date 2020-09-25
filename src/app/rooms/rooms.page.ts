import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { JoinRoomComponent } from './join-room/join-room.component';
import { RoomsService } from './rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {
  roomID: any;

  constructor(private modalController: ModalController, public rmService: RoomsService, private router: Router) {}

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

  onClick(){
    this.rmService.getRoomToken().subscribe(res => {
      this.roomID = res.room_token;
      this.router.navigate(['/createroom'], {
        queryParams: {room : this.roomID}
      });

    });
  }


  ngOnInit() {
    // this.rmService.auth.getToken();
    // debugger;
    this.rmService.displayName();
    this.rmService.getStats();
  }
}
