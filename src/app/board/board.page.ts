import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  
  
  ;
  diceNumber: any;
  members: any;
  player: any;
  memberChance: any;
  pos_player1:number=0;
  pos_player2:number=0;
  pos_player3:number=0;
  pos_player4:number=0;
  token1_image:any;
  arr: number[][];
   
   count=100;

  
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

  

  
//   arr:any[][]=[ 
//   [100,99,98,97,96,95,94,93,92,91],
//   [81,82,83,84,85,86,87,88,89,90],
//   [80,79,78,77,76,75,74,73,72,71],
//   [61,62,63,64,65,66,67,68,69,70],
//   [60,59,58,57,56,55,54,53,52,51],
//   [41,42,43,44,45,46,47,48,49,50],
//   [40,39,38,37,36,35,34,33,32,31],
//   [21,22,23,24,25,26,27,28,29,30],
//   [20,19,18,17,16,15,14,13,12,11],
//   [1,2,3,4,5,6,7,8,9,10], 
// ];


 

    




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



Ladder(){
//ladder starting points are 6 , 19 ,25 ,48 ,31
  switch (this.pos_player1 ||this.pos_player2 ||this.pos_player3 ||this.pos_player4 ) {
    case 6:                //ladder start from 2nd position and ends at 34hth.
    this.pos_player1 =34;
    break;
  
    case 19:              //ladder start from 19th position and ends at 59th position.
    this.pos_player1 =59 ; 
    break;
  
    case 25:               //ladder start from 25th position and ends at 96th position
    this.pos_player1 =96 ; 
    break;
  
    case 48:               //ladder start from 48th position and ends at 75th position
    this.pos_player1 =75 ; 
    break;
  
    case 31:               //ladder start from 31th position and ends at 91th position
    this.pos_player1 =91 ; 
    break; 

  }
}

playerPosition(){  
  // this function changes player position according to the dicenumber .
  if(this.memberChance==1){
    this.pos_player1=this.pos_player1+this.diceNumber;
    this.Ladder()
    console.log("player 1 new position is"+" "+this.pos_player1)
  }
  if(this.memberChance==2){
    this.pos_player2=this.pos_player2+this.diceNumber;
    console.log("player 1 new position is"+" "+this.pos_player2)
  }
  if(this.memberChance==3){
    this.pos_player3=this.pos_player3+this.diceNumber;
    console.log("player 1 new position is"+" "+this.pos_player3)
  }
  if(this.memberChance==4){
    this.pos_player4=this.pos_player4+this.diceNumber;
    console.log("player 1 new position is"+" "+this.pos_player4)
  }
}

// m=1
// ladderPosition(){
//   for(this.m=1;this.m<5;this.m++){
//     if(this.player[this.m]==3){
//       this.player[this.m]==30
//       console.log("move to",this.player[this.m])
//     }
//   }
// }

// playerPosition(){
//   //for player1
//   if(this.memberChance==1){
//     if(this.diceNumber==1){
//       this.player1_pos = this.player1_pos+1;
//       console.log("player 1 new position is"+" "+this.player1_pos);
//     }
//     else if(this.diceNumber==2){
//       this.player1_pos =this.player1_pos+2;
//       console.log("player 1 new position is"+" "+this.player1_pos);

//     }
//     else if(this.diceNumber==3){
//       this.player1_pos =this.player1_pos+3;
//       console.log("player 1 new position is"+" "+this.player1_pos);

//     }
//     else if(this.diceNumber==4){
//       // console.log("postion before:"+this.player1_pos)
//       this.player1_pos =this.player1_pos+4;
//       console.log("player 1 new position is"+" "+this.player1_pos);
//     }
//     else if(this.diceNumber==5){
//       this.player1_pos =this.player1_pos+5;
//       console.log("player 1 new position is"+" "+this.player1_pos);

//     }
//     else if(this.diceNumber==6){
//       this.player1_pos =this.player1_pos+6;
//       console.log("player 1 new position is"+" "+this.player1_pos);

//     }
//   }
// }

//arrr=[
  //   [0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0],            
  //   [0,0,0,0,0,0,0,0,0,0],
  //   [[1,1,1,1],0,0,0,0,0,0,0,0,0,0]   /*these 1,1,1,1 indicates the TOKEN of four playes starting position
  //                                       and zero indicates no token at that position.*/
  // ]


}



