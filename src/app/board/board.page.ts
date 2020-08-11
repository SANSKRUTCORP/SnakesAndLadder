import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  diceNumber: number=0;

  constructor(private http : HttpClient) { }

  counter = Array;

  ngOnInit() {
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
    let randomNum = Math.floor(Math.random() * 6) + 1;
    this.diceNumber = randomNum;
    console.log(this.diceNumber);
    return randomNum;
  }

}
