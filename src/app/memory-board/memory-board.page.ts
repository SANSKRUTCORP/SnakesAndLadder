
import { Component, OnInit, NgZone  } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import {memoryCards} from './memory-board.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { AuthserviceService } from '../services/authservices.service';
import { HttpClient } from '@angular/common/http';
import { JoinRoomComponent } from '../rooms/join-room/join-room.component';
import { MemoryWinComponent } from './memory-win/memory-win.component';

@Component({
  selector: 'app-memory-board',
  templateUrl: './memory-board.page.html',
  styleUrls: ['./memory-board.page.scss'],
})
export class MemoryBoardPage implements OnInit {
  timeLeft = 40;
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
  pair1 = 0;
  pair2 = 0;
  flipping = false;
  isflipped = false;
  i = 0;
  state = 'normal';
  names: any;
  flip1: number;
  loggedUser: string;
  roomToken: number;
  memberChance: any;
  flippingState: boolean;
  images: any;
  flip2: any;
  display: string;

  // first argument is for back-image and second argument is for front-image
  cards: memoryCards[] = [
    new memoryCards('this.images[0]',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
    new memoryCards('',
                    ''),
  ];
  constructor(public loadingController: LoadingController,
               private modalController: ModalController,
              public db: AngularFireDatabase,
              private zone: NgZone,
              private route: ActivatedRoute,
              private auth: AuthserviceService,
              private http: HttpClient,
              private storage: AngularFireStorage){}

              popup() {
                const modal = this.modalController
                  .create({
                    component: MemoryWinComponent,
                    cssClass: 'my-custom-modal-css',
                    showBackdrop: true,
                    backdropDismiss: false,
                    swipeToClose: true
                  })
                  .then(popElement => {
                    popElement.present(),
                      popElement.onDidDismiss().then(resp => {
                      });
                  });
              }
  // ngOnInit(): void {
  //   this.startTimer();
  //   throw new Error('Method not implemented.');
  // }
  ngOnInit(){
      this.startTimer();
      this.getImages(); 
  }

  // Create a reference to the file we want to download
  getImages(){
    for (let i = 1; i <= 15; i++){

      const starsRef = this.storage.ref(`/memes/${i}.png`);

      // Get the download URL
      starsRef.getDownloadURL().subscribe(url => {
        // Insert url into an <img> tag to "download"
        this.images[i - 1] = url;
        console.log(this.images[i - 1]);
      });
    }
  }



  shuffle(array: any) {
    // tslint:disable-next-line: no-unused-expression
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

  disable1(i){
    let disable = false;
    const obj = this.cards[i];
    obj.disable = !obj.disable;
    disable = obj.disable;
    console.log(disable);
  }
  disable2(i){
    let disable = false;
    const obj = this.cards[i];
    obj.disable = !obj.disable;
    disable = obj.disable;
    console.log(disable);
  }


  fliping1(i: any){
    let flipped = false;
    const obj = this.cards[i];
    obj.flipped = !obj.flipped;
    flipped = obj.flipped;
    console.log(flipped);
  }

  fliping2(i: any){
    let flipped = false;
    const obj = this.cards[i];
    obj.flipped = !obj.flipped;
    flipped = obj.flipped;
    console.log(flipped);
  }



  // click 1 of the member
  click_1(val1: number, value1: string){

    console.log('Click chance 1 card clicked ' + val1 + ' . Its value is ' + value1);
    // this.http.post<any>('', {memberchn: this.memberChance, divid: val, imgid: value1, flipSt: true}).subscribe(res => {
    //   console.log(res);
    // });,
    this.click = 2;
    this.valueAss1 = value1;
    this.flip1 = val1;
    this.fliping1(this.flip1);

    // const ref = this.db.database.ref('memory/rooms/room_' + this.roomToken);
    // ref.once('value', snapshot => {
    //   this.flippingState = snapshot.child('flipState').val();

    //   // if(this.flippingState){

    //   // }
    // });

  }

  // click 2 of the member
  click_2(val2: number, value2: string){
    console.log( 'Click chance 2 card clicked ' + val2 + ' . Its value is ' + value2);
    this.click = 1;
    // this.http.post<any>('', {memberchn: this.memberChance, divid: val, imgid: value2, flipSt: true}).subscribe(res => {
    //   console.log(res);
    // });
    // if (this.memberChance === 2){
    //   this.memberChance = 1;
    // } else {
    //   this.memberChance++;
    // }
    this.flip2 = val2;
    this.fliping2(this.flip2);
    this.valueAss2 = value2;
    this.match();
  }


  // matching of cards
  match(){
      if (this.valueAss1 === this.valueAss2){
        console.log('Cards are same');
        this.pair1 = this.pair1 + 1;
        console.log('Pairs ' + this.pair1);
        this.disable1(this.flip1);
        setTimeout(() => { this.disable2(this.flip2); }, 400);
        this.winner();
        this.matchAudio();
      }
      else{
        console.log('Cards are  different');
        console.log('Pairs ' + this.pair1);
        this.fliping1(this.flip1);
        setTimeout(() => { this.fliping2(this.flip2); }, 400);
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
  flipAudio(){
    const audio = new Audio('../assets/flipper.mpeg'); // audio play on flip of card
    audio.play();
  }
  matchAudio(){
    const audio = new Audio('../assets/matching'); // audio play on flip of card
    audio.play();
  }
  startTimer() {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        }
        else {
          this.timeLeft = 40;
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
    // tslint:disable-next-line: adjacent-overload-signatures
  }
