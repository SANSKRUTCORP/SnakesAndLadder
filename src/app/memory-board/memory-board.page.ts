
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
​
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
  counter1: number;
  counter2: number;
  flipping = false;
  isflipped = false;
  i = 0;
  state = 'normal';
  names = [];
  flip1: number;
  loggedUser: string;
  roomToken: any;
  memberChance: any;
  flippingState: boolean;
  flip2: any;
  display: string;
  divId1: any;
  divId2: any;
  counter: any;
  countSum: number;
  liveDivId: any;
  liveCount = [];
  // images = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];
  cards: memoryCards[] = [
    new memoryCards('../../assets/memes/1.png',
                    ''),
    new memoryCards('../../assets/memes/1.png',
                    ''),
    new memoryCards('../../assets/memes/2.png',
                    ''),
    new memoryCards('../../assets/memes/2.png',
                    ''),
    new memoryCards('../../assets/memes/3.png',
                    ''),
    new memoryCards('../../assets/memes/3.png',
                    ''),
    new memoryCards('../../assets/memes/4.png',
                    ''),
    new memoryCards('../../assets/memes/4.png',
                    ''),
    new memoryCards('../../assets/memes/5.png',
                    ''),
    new memoryCards('../../assets/memes/5.png',
                    ''),
    new memoryCards('../../assets/memes/6.png',
                    ''),
    new memoryCards('../../assets/memes/6.png',
                    ''),
    new memoryCards('../../assets/memes/7.png',
                    ''),
    new memoryCards('../../assets/memes/7.png',
                    ''),
    new memoryCards('../../assets/memes/8.png',
                    ''),
    new memoryCards('../../assets/memes/8.png',
                    ''),
    new memoryCards('../../assets/memes/9.png',
                    ''),
    new memoryCards('../../assets/memes/9.png',
                    ''),
    new memoryCards('../../assets/memes/10.png',
                    ''),
    new memoryCards('../../assets/memes/10.png',
                    ''),
    new memoryCards('../../assets/memes/11.png',
                    ''),
    new memoryCards('../../assets/memes/11.png',
                    ''),
    new memoryCards('../../assets/memes/12.png',
                    ''),
    new memoryCards('../../assets/memes/12.png',
                    ''),
    new memoryCards('../../assets/memes/13.png',
                    ''),
    new memoryCards('../../assets/memes/13.png',
                    ''),
    new memoryCards('../../assets/memes/14.png',
                    ''),
    new memoryCards('../../assets/memes/14.png',
                    ''),
    new memoryCards('../../assets/memes/15.png',
                    ''),
    new memoryCards('../../assets/memes/15.png',
    ''),
  ];
  click_two: any;
  click_one: any;
  img_two: any;
  img_one: any;
  clickState: boolean;
​
  constructor(public loadingController: LoadingController,
              private modalController: ModalController,
              public db: AngularFireDatabase,
              private zone: NgZone,
              private route: ActivatedRoute,
              private auth: AuthserviceService,
              private http: HttpClient,
              private storage: AngularFireStorage){
                this.roomToken = this.route.snapshot.queryParamMap.get('room');
                if(this.roomToken==null){
                  this.roomToken = 4999559;
                }
              }
​
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
​
  ngOnInit(){
    // this.getImages();
    this.memChance();
    // this.loggedinUser();
    this.readPlayers(this.roomToken);
    this.http.post<any>('/apis/cleartemp', {}).subscribe(resp => console.log(resp));
    this.startTimer();
      // this.setCardImages();
    this.liveFlipping();
    this.liveMatch();
  }
​
​
  setWinner(member, room){
    this.http.post<any>('/apis/setGameStats', {playerNo: member, roomid: room}).subscribe(resp => {
      console.log(resp);
    });
  }
​
  memChance(){
    this.db.database.ref('memory/rooms/room_' + this.roomToken).on('value', chance => {
      this.zone.run(() => {
        this.memberChance = chance.child('memberChance').val();
        this.click = chance.child('clickValue').val();
        console.log(this.memberChance+'hello to all');
        console.log(this.click);
      });
    });
  }
​
  updateMember(whichPlayer){
    this.http.post<any>(`/apis/mmry/updateMem/${this.roomToken}`,
      {memberChance : whichPlayer}).subscribe(resp => {
      console.log(resp);
    });
  }
​
  clickUpdate(click){
    this.http.post<any>(`/apis/mmry/updateClick/${this.roomToken}`,
      {clickValue: click}).subscribe(resp => {
      console.log(resp);
    });
  }
​
  // Create a reference to the file we want to download
  // getImages(){
  //   this.cards = [];
  //   const base = 'https://i.pinimg.com/originals/62/ea/00/62ea0046d9b332d23393a714b160fa58.jpg';
  //   if(this.cards.length===0){
  //     for (let i = 1; i <= 15; i++){
  //       const starsRef = this.storage.ref(`/memes/${i}.png`);
  //       // Get the download URL
  //       starsRef.getDownloadURL().subscribe(url => {
  //         console.log(url);
  //         // Insert url into an <img> tag to "download"
  //         // images[i - 1] = url;
  //         this.cards.push(new memoryCards(url, base));
  //         this.cards.push(new memoryCards(url, base));
  //       });
  //     }
  //   }
  // }
​
  readPlayers(roomTok){
    this.zone = new NgZone({});
    this.roomToken = roomTok;
    const ref = this.db.database.ref('memory/rooms/room_' + this.roomToken + '/players');
    ref.once('value', snapshot => {
      this.zone.run(() => {
        // this.lengthNames = Object.keys(snapshot.val()).length;
        for (let i = 1; i <= 2; i++){
          this.names.push(snapshot.child('player_' + i + '/name').val());
        }
      });
    });
  }
​
​
  loggedinUser(){
    this.auth.getUser().then(user => {
      this.loggedUser = user.displayName;
      console.log(user);
    });
  }
​
  shuffle(array: any) {
    // tslint:disable-next-line: no-unused-expression
    this.currentIndex = array.length, this.temporaryValue , this.randomIndex;
    // While there remain elements to shuffle...
    while (0 !== this.currentIndex) {
​
      // Pick a remaining element...
      this.randomIndex = Math.floor(Math.random() * this.currentIndex);
      this.currentIndex -= 1;
​
      // And swap it with the current element.
      this.temporaryValue = array[this.currentIndex];
      array[this.currentIndex] = array[this.randomIndex];
      array[this.randomIndex] = this.temporaryValue;
    }
    this.name = array;
    console.log(this.name);
​
  }
​
  disable(i){
    let disable = false;
    const obj = this.cards[i];
    obj.disable = !obj.disable;
    disable = obj.disable;
    console.log(disable);
  }
​
  fliping(i){
    let flipped = false;
    const obj = this.cards[i];
    obj.flipped = !obj.flipped;
    flipped = obj.flipped;
    console.log(flipped);
  }
​
​
  liveFlipping(){
    if(this.clickState === true) {
    const ref = this.db.database.ref('memory/rooms/room_' + this.roomToken + '/players');
    ref.on('value', snapshot => {
      this.liveDivId = snapshot.child(`player_${this.memberChance}/click${this.click}/div_id`).val();
      this.liveCount[0] = snapshot.child(`player_1/counter`).val();
      this.liveCount[1] = snapshot.child(`player_2/counter`).val();
      if (this.liveDivId){
        this.fliping(this.liveDivId);
        console.log('live div...', this.liveDivId);
      } else {
        console.log('nothing...');
      }
    });
  }
  }

  onClick(divId, backImage){
    this.valueAss1 = backImage;
    this.divId1 = divId;
    this.clickState = true;
    this.http.post<any>(`/apis/mmry/setvalues/${this.roomToken}`, { memberChance: this.memberChance,
                                                                    divid: divId,
                                                                    imgid: backImage,
                                                                    clickNum: this.click}).subscribe(res => {
                                                                      console.log(res);
                                                                    });


                                                                    ​
    const ref = this.db.database.ref('memory/rooms/room_' + this.roomToken + '/players');

    ref.once('value', snapshot => {
      this.counter = snapshot.child(`player_${this.memberChance}/counter`).val();
      // this.matchCards();
    });

    if (this.click === 2){
      this.click = 1;
      console.log('Click', this.click);
      this.clickUpdate(this.click);

      if (this.memberChance === 2){
        this.memberChance = 1;
        this.updateMember(this.memberChance);
      } else {
        this.memberChance++;
        this.updateMember(this.memberChance);
      }
    ​
    } else {
      this.click = 2;
      console.log('Click', this.click);
      this.clickUpdate(this.click);
    }


  }
​
​
  liveMatch(){
    let check:number;
    const ref = this.db.database.ref('memory/rooms/room_' + this.roomToken + '/players');
    this.db.database.ref(`memory/rooms/room_${this.roomToken}`).on('value', data => {
​    
      if (this.click === 2){
        ref.once('value', snapshot => {
          this.click_one = snapshot.child(`player_${this.memberChance}/click1/div_id`).val();
          this.click_two = snapshot.child(`player_${this.memberChance}/click2/div_id`).val();
          this.img_one = snapshot.child(`player_${this.memberChance}/click1/image_id`).val();
          this.img_two = snapshot.child(`player_${this.memberChance}/click2/image_id`).val();
          // debugger;
          if (this.img_one === this.img_two){
            console.log('Cards same', this.img_one, this.img_two);
            // this.counter ++;
            this.http.post<any>(`/apis/mmry/updateVals/${this.roomToken}`, {count: this.counter,
                                                                            memberChance: this.memberChance}).subscribe(resp => {
                                                                              console.log(resp);
                                                                            });
            this.disable(this.click_one);
            this.disable(this.click_two);
          } else {
            console.log('Cards different', this.img_one, this.img_two);
            this.fliping(this.click_one);
            this.fliping(this.click_two);
          }
        });
      } else{
        console.log('this is click 1');
      }
    });

  }
​
​
​

​
  checkWin(){
    const ref = this.db.database.ref('memory/rooms/room_' + this.roomToken + '/players');
    ref.once('value', data =>{
      this.counter1 = data.child(`player_1/counter`).val();
      this.counter2 = data.child(`player_2/counter`).val();
​
      this.countSum = this.counter1 + this.counter2;
​
      if ( this.countSum === 15 || this.timeLeft === 0){
        if ( this.counter1 > this.counter2 ){
          console.log('Player 1 win the game');
        }
        if ( this.counter1 === this.counter2 ){
          console.log('Draw');
        }
        else{
          console.log('Player 2 win the game');
        }
      }
    });
  }
​
​
​
  
​
​
​
​
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
​
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