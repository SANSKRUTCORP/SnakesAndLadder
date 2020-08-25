import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { WinComponent } from './win/win.component';


@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  diceNumber =0;

  constructor(private http: HttpClient, private modalController: ModalController) { }

  counter = Array;
  // counter[0][1]=1;


  ngOnInit() {
    // this.counter[0][1]=1;
    // console.log(this.counter);
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

  diceRoll(){
    const randomNum = Math.floor(Math.random() * 6) + 1;
    this.diceNumber = randomNum;
    console.log(this.diceNumber);
    return randomNum;
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

 



