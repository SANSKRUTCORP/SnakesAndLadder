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

<<<<<<< HEAD
 }
=======
 async showMessage() {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    message: 'Enter Room Joining Code',
    inputs: [
      {
        type: 'password',
        placeholder: 'code',
      },
    ],
    buttons: [
      {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
        }
      }
    ]
  });

  await alert.present();
}

message() {
  console.log('ffdv');
}
>>>>>>> ebb076f458297ecd860c3368277c02295f24c6c2

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
