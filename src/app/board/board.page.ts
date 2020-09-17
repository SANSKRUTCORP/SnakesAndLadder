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
    this.playerPosition();
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



Ladder(m:number){
//ladder starting points are  17 ,22 ,24 , 39, 54, 60 
   
  switch (m) {
    case 12:                                  //ladder start from 17th position and ends at 56th.
      this.v=12 
      this.ladderposition = 50                        
      console.log(this.ladderposition);
      break;

    case 17:                                  //ladder start from 17th position and ends at 56th.
      this.v=17 
      this.ladderposition = 56                        
      console.log(this.ladderposition);
      break;
      

    case 22:                                  //ladder start from 22nd position and ends at 58th position.
      this.v=22             
      this.ladderposition = 58 ; 
      console.log(this.ladderposition);
      break;
      
    case 27:                                 //ladder start from 24th position and ends at 55th position
      this.v=27           
      this.ladderposition = 55 ; 
      console.log(this.ladderposition);
      break;
     
  
    case 41:                                //ladder start from 39th position and ends at 58th position
      this.v= 41          
      this.ladderposition = 79 ; 
      console.log(this.ladderposition);
      break;
     
  
    case 54:                                //ladder start from 54th position and ends at 83th position
      this.v= 54                
      this.ladderposition = 88 ; 
      console.log(this.ladderposition);
      break;

   

    default:
      console.log("no such value found");
  }
  return this.ladderposition
}


snake(s:number){
  switch (s) {

    case 23:                                        //snake start from 23rd position and ends at 11th.
      this.n=23 
      this.snakeposition =11                          
      console.log(this.snakeposition);
      break;
      

    case 37:                                        //snake start from 37th position and ends at 18th position.
      this.n=22                                      
      this.snakeposition = 18 ; 
      console.log(this.snakeposition);
      break;
      
    case 44:                                        //snake start from 44th position and ends at 26th position
      this.n=44                                      
      this.snakeposition = 26 ; 
      console.log(this.snakeposition);
      break;
     
  
    case 75:                                        //snake start from 75th position and ends at 42th position
      this.n= 75                                  
      this.snakeposition = 42 ; 
      console.log(this.snakeposition);
      break;
     
  
    case 94:                                       //snake start from 94th position and ends at 71th position
      this.n= 94                                  
      this.snakeposition = 71 ; 
      console.log(this.snakeposition);
      break;

    case 96:                                       //snake start from 96th position and ends at 49th position
      this.n= 96                                  
      this.snakeposition = 49 ; 
      console.log(this.snakeposition);
      break;

    default:
      console.log("no such value found");
  }
  return this.snakeposition
}
                                                   
playerChance(playerNumber: any){

}

playerPosition(){  
  // this function changes player position according to the dicenumber .
  if(this.memberChance==1){
    this.posPlayer1=this.posPlayer1+this.diceNumber; 
    // this.win(this.posPlayer1);
    this.Ladder(this.posPlayer1)
      if(this.posPlayer1==this.v){
        this.posPlayer1=this.ladderposition;
        console.log(this.myName[0]+" "+ "new position is"+" "+this.posPlayer1);
      }
      if(this.posPlayer1>=100){
        this.posPlayer1=100
        this.play=false;
        this.popup();
       console.log("YOU WIN and your position is"+" "+this.posPlayer1);
      }
      else{
        console.log( this.myName[0]+" "+"new position is"+" "+this.posPlayer1);
      } 
  }

  if(this.memberChance==2){
    this.posPlayer2=this.posPlayer2+this.diceNumber;
    // this.win(this.posPlayer2)
    this.Ladder(this.posPlayer2)
      if(this.posPlayer2==this.v){
         this.posPlayer2=this.ladderposition
         console.log(this.myName[1]+" "+ "new position is"+" "+this.posPlayer2);
        }
        if(this.posPlayer2>=100){
          this.posPlayer2=100
          this.play=false;
          this.popup();
         console.log("YOU WIN and your position is"+" "+this.posPlayer2);
         
        }
      else{
         console.log(this.myName[1]+" "+"new position is"+" "+this.posPlayer2);
        }
  }

  if(this.memberChance==3){
    this.posPlayer3=this.posPlayer3+this.diceNumber;
    // this.win(this.posPlayer3)
    this.Ladder(this.posPlayer3)
      if(this.posPlayer3==this.v){
        this.posPlayer3=this.ladderposition
        console.log(this.myName[2]+" "+" new position is"+" "+this.posPlayer3);
      }
      if(this.posPlayer3>=100){
        this.posPlayer3=100
        this.play=false;
        this.popup();
       console.log("YOU WIN and your position is"+" "+this.posPlayer3);
       
      }
      else{
        console.log(this.myName[2]+" "+"new position is"+" "+this.posPlayer3);
    }
  }

  if(this.memberChance==4){
    this.posPlayer4=this.posPlayer4+this.diceNumber;
  //  this.win(this.posPlayer1);
    this.Ladder(this.posPlayer4)
      if(this.posPlayer4==this.v){
        this.posPlayer4=this.ladderposition
        console.log(this.myName[3]+" "+" new position is"+" "+this.posPlayer4);
      }
      if(this.posPlayer4>=100){
        this.posPlayer4=100
        this.play=false;
        this.popup();
       console.log("YOU WIN and your position is"+" "+this.posPlayer4);
       
      }
      else{
        console.log(this.myName[3]+" "+"new position is"+" "+this.posPlayer4);
      }
  }
}

  


 

// here if you want only dice value which we get from backend then
//  replace this.rollDiceChance() from this.boardService.diceRoll().
  boardvals(){
    this.http.post<any>('http://localhost:3000/board', {dice_value   : this.rollDiceChance(),
                                                        player_1_pos : this.posPlayer1,
                                                        player_2_pos : this.posPlayer2,
                                                        player_3_pos : this.posPlayer3,
                                                        player_4_pos : this.posPlayer4})
    .subscribe(resp => {
      console.log(resp);
    });
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

 




