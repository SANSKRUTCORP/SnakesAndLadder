import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';

// import { state, style, trigger } from '@angular/animation';
import { BoardService } from './board.service';

@Component({
  
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
  // animations: [
  //   trigger('divState', [
  //     state('normal', style({transform:'tanslateX(0px)'})),
  //     state('normal', style({transform:'tanslateX(100px)'})),
  //   ])
  // ]
})
export class BoardPage implements OnInit {
  roomT: any;

constructor(public bService: BoardService, private route: ActivatedRoute) { }



  ngOnInit() {
    this.roomT = this.route.snapshot.queryParamMap.get('room');
    this.bService.readPlayers(this.roomT);
    this.bService.loggedinUser();
    this.bService.liveDiceListen();
    this.bService.boardPositions();
    this.bService.memChance();
    this.bService.presentLoading();
  }

  //   Calltoggle(){
  //     function Calltoggle(){
  //       var blur = document.getElementById('blur');
  //       blur.classList.toggle('active')
  //     }
  //   }

}
