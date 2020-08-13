import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {

  constructor(private alertCtrl: AlertController ) {
 }


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


  ngOnInit() {
  }
}
