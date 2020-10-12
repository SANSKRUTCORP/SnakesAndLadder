import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MemoryJoinRoomComponent } from './memory-join-room/memory-join-room.component';

@Component({
  selector: 'app-memory-rooms',
  templateUrl: './memory-rooms.page.html',
  styleUrls: ['./memory-rooms.page.scss'],
})
export class MemoryRoomsPage implements OnInit {

  constructor(private modalController: ModalController) { }

  popup() {
    const modal = this.modalController
      .create({
        component: MemoryJoinRoomComponent,
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
