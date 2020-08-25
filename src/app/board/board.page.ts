import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AttachSession } from 'protractor/built/driverProviders';
import { ModalController } from '@ionic/angular';
import { WinComponent } from './win/win.component';


@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  modalController: any;
  // posPlayer: number;
  
  
  ;
  diceNumber: any;
  members: any;
  player: any;
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
  position:number;

  
  ngOnInit() {
    
  }
  
constructor(private http: HttpClient) {

   this.arr=[]
    for(let el = 0; el <10; el++) {
      this.arr[el]=[]
        for(let ele = 0; ele<10; ele++){
            this.arr[el][ele]=this.count
            this.count--;
        }   
    }
   
}

diceRoll(){                                                  
  //this function is to generate random numberin the dice
  const randomNum = Math.floor(Math.random() * 6) + 1;
  this.diceNumber = randomNum;
  console.log("%c dice value is"+" "+this.diceNumber, 'font-weight : bold');
  return randomNum;
  
}  

 i=1;
diceRollChance(){  
  /*on every click of dice this function gives one by one chance 
  to all player to roll it*/    
                                              
  var player: number;                                                                             
  for(player = this.i;player<=4;player++) {
     this.memberChance =  this.i; 
     console.log("player"+" "+this.memberChance+" "+"turn"); 
     this.diceRoll();
     this.playerPosition();
     
     break;  
  }
  if(this.i<5){
    this.i =this.i+1; 
  }
  else{
    this.i=1;   /*bcoz we apply the condition player<=4 so when 
                 dice roll fifth time then again i should initilise with 1*/
  } 
  // if(this.diceNumber==6){
  //   console.log("player"+" "+this.memberChance+" "+"you got one more chance.!ROLL THE DICE AGAIN!")
  //   this.diceRoll();
  // }
}

Ladder(m:number){
//ladder starting points are 6 , 19 ,25 ,48 ,31
   
  switch (m) {

    case 6:     
      this.v=6                                 //ladder start from 2nd position and ends at 34th.
      this.position=34;
      console.log(this.position);
      break;
      

    case 19: 
      this.v=19            //ladder start from 19th position and ends at 59th position.
      this.position =59 ; 
      console.log(this.position);
      break;
      
    case 25:    
      this.v=25           //ladder start from 25th position and ends at 96th position
      this.position =96 ; 
      console.log(this.position);
      break;
     
  
    case 48:
      this.v=48                //ladder start from 48th position and ends at 75th position
      this.position =75 ; 
      console.log(this.position);
      break;
     
  
    case 31:
      this.v=31                //ladder start from 31th position and ends at 91th position
      this.position =91 ; 
      console.log(this.position);
      break;

    default:
      console.log("no such value found");
  }
  return this.position
}
                                                                                              

playerPosition(){  
  // this function changes player position according to the dicenumber .
  if(this.memberChance==1){
    this.posPlayer1=this.posPlayer1+this.diceNumber;
    this.Ladder(this.posPlayer1)
      if(this.posPlayer1==this.v){
        this.posPlayer1=this.position
        console.log("player 1 new position is"+" "+this.posPlayer1);
      }
      else{
        console.log("player 1 new position is"+" "+this.posPlayer1);
      } 
  }

  if(this.memberChance==2){
    this.posPlayer2=this.posPlayer2+this.diceNumber;
    this.Ladder(this.posPlayer2)
      if(this.posPlayer2==this.v){
         this.posPlayer2=this.position
         console.log("player 2 new position is"+" "+this.posPlayer2);
        }
        else{
         console.log("player 2 new position is"+" "+this.posPlayer2);
        }
  }

  if(this.memberChance==3){
    this.posPlayer3=this.posPlayer3+this.diceNumber;
    this.Ladder(this.posPlayer3)
      if(this.posPlayer3==this.v){
        this.posPlayer3=this.position
        console.log("player 2 new position is"+" "+this.posPlayer3);
      }
      else{
        console.log("player 3 new position is"+" "+this.posPlayer3);
    }
  }

  if(this.memberChance==4){
    this.posPlayer4=this.posPlayer4+this.diceNumber;
    this.Ladder(this.posPlayer4)
      if(this.posPlayer4==this.v){
        this.posPlayer4=this.position
        console.log("player 2 new position is"+" "+this.posPlayer4);
      }
      else{
        console.log("player 4 new position is"+" "+this.posPlayer4);
      }
  }
}

 


 

  boardvals(){
    this.http.post<any>('http://localhost:3000/board', {dice_value: this.diceRoll(),
                                                        player_1_pos : '',
                                                        player_2_pos : '',
                                                        player_3_pos : '',
                                                        player_4_pos : ''})
    .subscribe(resp => {
      console.log(resp);
    });
  }

 
  
  
// }

//  export class Boardpage {

//   constructor(private modalController: ModalController) {
// // }
 openModal()
 {
   this.modalController.create({component:WinComponent}).then((winElement)=>{winElement.present()});
 }
}

 




