import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { JoinRoomComponent } from './join-room/join-room.component';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {

  constructor(private modalController: ModalController) {

 }

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

  ngOnInit() {
  }
}
