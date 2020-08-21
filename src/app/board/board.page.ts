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
  nums: any;
  members: any;
  player: any;
  memberChance: any;
  ngOnInit() {
    
  }
  
  

  constructor(private http: HttpClient) { }
  
  arr:number[][]=[ 
  [100,99,98,97,96,95,94,93,92,91],
  [81,82,83,84,85,86,87,88,89,90],
  [80,79,78,77,76,75,74,73,72,71],
  [61,62,63,64,65,66,67,68,69,70],
  [60,59,58,57,56,55,54,53,52,51],
  [41,42,43,44,45,46,47,48,49,50],
  [40,39,38,37,36,35,34,33,32,31],
  [21,22,23,24,25,26,27,28,29,30],
  [20,19,18,17,16,15,14,13,12,11],
  [1,2,3,4,5,6,7,8,9,10],
  
];

arrr=[
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],            
  [0,0,0,0,0,0,0,0,0,0],
  [[1,1,1,1],0,0,0,0,0,0,0,0,0,0]   /*these 1,1,1,1 indicates the TOKEN of four playes starting position
                                      and zero indicates no token at that position.*/
]
 i=1;
diceRollChance() {  
  /*on every click of dice this function gives one by one chance 
  to all player to roll it*/                                                
  var player: number;                                                                             
  for(player = this.i;player<=4;player++) { 
     this.memberChance =  this.i; 
     console.log("this chance is of member",this.memberChance); 
     this.diceRoll();
     break;  
  }   
  if(this.i<5){
    this.i =this.i+1; 
  }
  else{
    this.i=1;   /*bcoz we apply the condition player<=4 so when 
                 dice roll fifth time then again i should initilise with 1*/
  } 
}

   diceRoll(){                                                  
     //this function is to generate random numberin the dice
     const randomNum = Math.floor(Math.random() * 6) + 1;
     this.diceNumber = randomNum;
     console.log(" dice value is",this.diceNumber);
     return randomNum;
   }
   
}



