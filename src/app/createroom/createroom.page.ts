import { Component, OnInit } from '@angular/core';
import { CreateroomService } from './createroom.service';

@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.page.html',
  styleUrls: ['./createroom.page.scss'],
})

export class CreateroomPage implements OnInit {

  constructor(public crService: CreateroomService) {}
  // send(str: any){
  //   // console.log(str);
  //   this.boardService.saveData(str);
  //   // this.router.navigate(['/board']);
  // }
ngOnInit() {
    this.crService.listenPlayers();
    this.crService.checkButton();
    this.crService.navigator();
  }
}
