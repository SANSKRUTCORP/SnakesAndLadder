import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AttachSession } from 'protractor/built/driverProviders';
import { ModalController } from '@ionic/angular';
import { WinComponent } from './win/win.component';
import { identifierModuleUrl } from '@angular/compiler';
import { AngularFireDatabase } from '@angular/fire/database';

import { AllComponent } from './all/all.component';
import { BoardService } from '../services/board.service';
import { LoadingController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {CreateroomPage} from '../createroom/createroom.page';
import {  Observable } from 'rxjs';
import {interval} from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
   n:number;
  value: any;
  playerss: any;
  myName: any;
  timeVar: any;
  interval: NodeJS.Timeout;
  timeLeft: number=10;
  // posPlayer: number;
  timeUp:string="time Up"
  diceNumber: any;
  members: any;
  memberChance: any;
  posPlayer1:number=0;
  posPlayer2:number=0;
  posPlayer3:number=0;
  posPlayer4:number=0;
  token1_image:any;
  arr: number[][];
  count=100;
  v:number;
  m:number;
  ladderposition:number;
  s:number;
  snakeposition:number;
  winPos:number;
  newPos:number;
  updatePos:number;
  public data: any;
  player: any;
  i=1
  mySubscription: any;
  play=true;
 
  

  
constructor(private http: HttpClient, 
            private modalController: ModalController,
             public db : AngularFireDatabase,
             private boardService:BoardService,
             public loadingController: LoadingController) {

              
  this.myName=boardService.getData(); //the data of players we get from create room page

   this.arr=[]
    for(let el = 0; el <10; el++) {
      this.arr[el]=[]
        for(let ele = 0; ele<10; ele++){
            // this.arr[el][ele]=this.count
            // this.count--;
            if(el%2==0){
              this.arr[el][ele] = 101 - (10*el+ele+1);
          } else{
              this.arr[el][ele] = (10*(10-el)+1)+10*(10-el-1) - (101 - (10*el+ele+1));
          }
        }   
    }
    

   
}


ngOnInit() {
  console.log(this.myName)
  this.playersChances();
  this.presentLoading()
  
}
//this is used to run the for loop of players
playersChances(){
  for(this.playerss=this.i;this.playerss<=4;this.playerss++) {
    this.memberChance =  this.i; 
    console.log(this.myName[this.i-1]+" "+"turn"); 
    
    break;  
 }
 if(this.i<4){
  this.i =this.i+1; 

 }
  else{
    this.i=1;   
  } 
}
rollDiceChance(){  
  /*on every click of dice this function gives one by one chance 
  to all player to roll it*/  
  this.boardService.diceRoll().subscribe(resp =>{
    console.log("dice value",resp);
    this.diceNumber=resp;
    this.playersChances();
    
},(error)=>{
    console.log("Error on req : ",error);
     return null;
});
 

}
//it shows the loading when you start the game.
async presentLoading() {
  this.playAudio()
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
  
    message: 'your game will start in few seconds',
    duration: 14000
  });
  await loading.present();

  console.log('Loading dismissed!');
}

playAudio(){
  let audio = new Audio('../assets/starter.mpeg'); //audio play when we start the game
  audio.play();
}
WinnerAudio(){
  let audio = new Audio('../assets/winner.mp3.wav'); //audio play after wining of player.
  audio.play();
}
diceAudio(){
  let audio = new Audio('../assets/dice.mp3.wav'); //audio play on dice roll
  audio.play();
}


playerPosition(position:number){ 
  // this function changes player position according to the dicenumber .
    position=position+this.diceNumber;
    // this.win(this.posPlayer1)
      if(position==100){
        position=100
        this.play=false;
        this.popup();
       console.log("YOU WIN and your position is"+" "+position);
      }
       if(position>100){
          position=position-this.diceNumber;
          console.log( this.myName[0]+" "+"new position is"+" "+position);
      }
      else{
        console.log( this.myName[0]+" "+"new position is"+" "+position);
      }
  }

 

 
popup() {
    const modal = this.modalController
   
    .create({
      component: WinComponent,
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
    this.WinnerAudio()
  }
  //remove this popup1() if we have only one winner.
  popup1() {
    const modal = this.modalController
    .create({
      component: AllComponent,
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
    this.WinnerAudio()
  }
//   Calltoggle(){
    
//     function Calltoggle(){
//       var blur = document.getElementById('blur');
//       blur.classList.toggle('active')
//     }
//   }
}

 




