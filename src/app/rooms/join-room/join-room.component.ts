import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss'],
})
export class JoinRoomComponent implements OnInit {

  constructor(private modalController:ModalController) { }

 

  ngOnInit() {}
  CloseModal()
  {
    this.modalController.dismiss();
    
  }

}
