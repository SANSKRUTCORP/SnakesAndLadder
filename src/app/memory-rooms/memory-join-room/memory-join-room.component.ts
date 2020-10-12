import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-memory-join-room',
  templateUrl: './memory-join-room.component.html',
  styleUrls: ['./memory-join-room.component.scss'],
})
export class MemoryJoinRoomComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  CloseModal()
  {
    this.modalController.dismiss();

  }
}
