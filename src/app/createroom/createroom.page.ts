import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateroomService } from './createroom.service';

@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.page.html',
  styleUrls: ['./createroom.page.scss'],
})

export class CreateroomPage implements OnInit {
  roomT: string;

  constructor(public crService: CreateroomService, private route: ActivatedRoute) {}
  // send(str: any){
  //   // console.log(str);
  //   this.boardService.saveData(str);
  //   // this.router.navigate(['/board']);
  // }
ngOnInit() {
  this.roomT = this.route.snapshot.queryParamMap.get('room');
  this.crService.listenPlayers(this.roomT);
  this.crService.checkButton();
  this.crService.navigator();
  }
}
