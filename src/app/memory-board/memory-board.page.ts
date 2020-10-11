import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {memoryCards} from './memory-board.model';
@Component({
  selector: 'app-memory-board',
  templateUrl: './memory-board.page.html',
  styleUrls: ['./memory-board.page.scss'],
})
export class MemoryBoardPage implements OnInit {
  timeLeft: number = 60;
  currentIndex: any;
  temporaryValue: any;
  // arr:any=[1,1,2,2,3,3,4,4,5,5,6,6]
  randomIndex: any;
  name: any;
  valueAss1: string;
  interval;
  click: any = 1;
  buttonValue: any;
  val: number;
  valueAss2: string;
  pairsum: number;
  pair1: number = 0;
  pair2: number = 14;

  // first argument is for back-image and second argument is for front-image
  cards: memoryCards[] = [ 
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse1.mm.bing.net/th?id=OIP.nzqcNBda6adpBXavP_8rawHaHa&pid=Api&P=0&w=300&h=300'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'), 
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'), 
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'), 
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'), 
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'), 
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'), 
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'), 
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'), 
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'), 
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),      
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
    new memoryCards('https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157',
                    'https://tse3.mm.bing.net/th?id=OIP.fPwNkLmKV_nFUe13_oz1iQHaE8&pid=Api&P=0&w=234&h=157'),
  ];
constructor( public loadingController: LoadingController){}


shuffle(array: any) {
  this.currentIndex = array.length, this.temporaryValue , this.randomIndex;
  // While there remain elements to shuffle...
  while (0 !== this.currentIndex) {

    // Pick a remaining element...
    this.randomIndex = Math.floor(Math.random() * this.currentIndex);
    this.currentIndex -= 1;

    // And swap it with the current element.
    this.temporaryValue = array[this.currentIndex];
    array[this.currentIndex] = array[this.randomIndex];
    array[this.randomIndex] = this.temporaryValue;
  }
  this.name = array;
  console.log(this.name);

}
// clickNumber(value){
//   if(this.click==2){
//   }
//}
// click 1 of the member
click_1(val: number,value1: string){
  console.log('Click chance 1 card clicked ' + val + ' . Its value is ' + value1);
  this.click = 2;
  this.valueAss1 = value1;

}

// click 2 of the member
click_2(val: number, value2: string){
  console.log( 'Click chance 2 card clicked ' + val + ' . Its value is ' + value2);
  this.click = 1;
  this.valueAss2 = value2;
  this.match();
}

// matching of cards
match(){
    if (this.valueAss1 === this.valueAss2){
      console.log('Cards are same');
      this.pair1 = this.pair1 + 1;
      console.log('Pairs ' + this.pair1);
      this.winner();
    }
    else{
      console.log('Cards are  different');
      console.log('Pairs ' + this.pair1);
    }
}
winner(){
  this.pairsum = this.pair1 + this.pair2;
  if ( this.pairsum === 15 || this.timeLeft === 0){
    if ( this.pair1 > this.pair2 ){
      console.log('Player 1 win the game');
    }
    if ( this.pair1 === this.pair2 ){
      console.log('Draw');
    }
    else{
      console.log('Player 2 win the game');
    }
  }
}




startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 1000);
  }
  pauseTimer() {
    clearInterval(this.interval);
  }

  async startLoading() {
    this.starterAudio();
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'your game will start in few seconds',
      duration: 3000
    });
    await loading.present();
  }
  starterAudio(){
    const audio = new Audio('../assets/memorystarter.mpeg'); // audio play when we start the game
    audio.play();
  }
  flipAudio(){
    const audio = new Audio('../assets/flip.mpeg'); // audio play on flip of card
    audio.play();
  }
  ngOnInit() {
    // this.startLoading()
    this.startTimer();
    this.shuffle(this.cards);
    }

}
