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
  currentIndex:any;
  temporaryValue:any;
  // arr:any=[1,1,2,2,3,3,4,4,5,5,6,6]
  randomIndex:any;
  name:any;
  value_1:any;
  interval;
  buttonValue:any;
  // first argument is for back-image and second argument is for front-image
  cards:memoryCards[]=[
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

toggle(button) {
  this.buttonValue = button.id;
  console.log(this.buttonValue)
}

  
shuffle(array:any) {
  this.currentIndex = array.length, this.temporaryValue, this.randomIndex;
 
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
  this.name=array;
  console.log(this.name);

}

click_1(value1:any){
  console.log("hello " + value1);
}


startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
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
    // this.startTimer();
    
  }

}
