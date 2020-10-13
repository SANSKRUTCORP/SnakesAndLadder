import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MemoryJoinRoomComponent } from './memory-join-room/memory-join-room.component';
import { MemoryRoomsService } from './memory-rooms.service';

@Component({
  selector: 'app-memory-rooms',
  templateUrl: './memory-rooms.page.html',
  styleUrls: ['./memory-rooms.page.scss'],
})
export class MemoryRoomsPage implements OnInit {
  roomID: any;

  constructor(private modalController: ModalController, public rmService: MemoryRoomsService, private router: Router) {}

  ngOnInit() {
    // this.rmService.auth.getToken();
    // debugger;
    this.rmService.displayName();
    this.rmService.getStats();
  }


  onClick(){
    this.rmService.getRoomToken().subscribe(res => {
      this.roomID = res.room_token;
      this.router.navigate(['/memory-createroom'], {
        queryParams: {room : this.roomID}
      });

    });
  }
 
  Audio(){
    const audio = new Audio('../assets/button-click.mpeg'); // audio play on flip of card
    audio.play();
  }

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

}
