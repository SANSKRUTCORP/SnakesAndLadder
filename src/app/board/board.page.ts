// import { trigger, state, style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Animation, AnimationController } from '@ionic/angular';
// import { ActivatedRoute } from '@angular/router';

import { BoardService } from './board.service';


@Component({

  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
  // animations: [
  //   trigger('myvisibility', [
  //     state('visible', style({opacity: 1})),
  //     state('invisible', style({opacity: 0})),
  //   ])
  // ]
})
export class BoardPage implements OnInit {
  roomT: any;
  // visibleState = 'visible';


constructor(public bService: BoardService, private route: ActivatedRoute
  // private animationCtrl: AnimationController
  ) {

  // const animation: Animation = this.animationCtrl.create()
  //   .addElement(document.querySelector('.players'))
  //   .duration(1000)
  //   .fromTo('opacity', '1', '0.5');
 }

 
// toggleVisible(){
//   this.visibleState=(this.visibleState=='visible') ? 'invisible' : 'visible';
// }

  ngOnInit() {
    this.roomT = this.route.snapshot.queryParamMap.get('room');
    this.bService.readPlayers(this.roomT);
    this.bService.loggedinUser();
    this.bService.liveDiceListen();
    this.bService.boardPositions();
    this.bService.memChance();
    this.bService.presentLoading();
  //   this.animationCtrl.create()
  // .addElement(document.querySelector('.players'))
  // .duration(1500)
  // .iterations(Infinity)
  // .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
  // .fromTo('opacity', '1', '0.2');
  }

  // callanime(){
  //   anime({
  //     targets
  //   })
  //   Calltoggle(){
  //     function Calltoggle(){
  //       var blur = document.getElementById('blur');
  //       blur.classList.toggle('active')
  //     }
  //   }

}
