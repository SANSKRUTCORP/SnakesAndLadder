import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthserviceService } from '../services/authservices.service';
import { AllComponent } from './all/all.component';
import { WinComponent } from './win/win.component';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  diceNumber: any;
  members: any;
  memberChance = 1;
  arr: number[][];
  player: any;
  mySubscription: any;
  play = true;
  roomToken: any;
  names = [];
  positions = [];
  posBoard = [];
  winner: string;
  lengthNames: any;
  loggedUser: any;
  liveDice: any;

  constructor(private http: HttpClient,
              public auth: AuthserviceService,
              private zone: NgZone,
              public db: AngularFireDatabase,
              private modalController: ModalController,
              public loadingController: LoadingController) {

      // this.myName = boardService.getData(); //the data of players we get from create room page
      // this.roomToken = 1577862;

      this.arr = [];
      for (let el = 0; el < 10; el++) {
        this.arr[el] = [];
        for (let ele = 0; ele < 10; ele++){
            // this.arr[el][ele]=this.count
            // this.count--;
            if (el % 2 === 0){
              this.arr[el][ele] = 101 - (10 * el + ele + 1);
          } else{
              this.arr[el][ele] = (10 * (10 - el) + 1) + 10 * (10 - el - 1) - (101 - (10 * el + ele + 1));
          }
        }
      }
    }


  liveDiceListen(){
    this.db.database.ref('rooms/room_' + this.roomToken).on('value', snapshot => {
      this.zone.run(() => {
        this.liveDice = snapshot.child('dice').val();
      });
    });
  }


  loggedinUser(){
    this.auth.getUser().then(user => {
      this.loggedUser = user.displayName;
      console.log(user);
    });
  }


  boardvals(currentPlayerPos, whichPlayer, diceVal){
    this.http.post<any>(`/apis/board/${this.roomToken}`,
    {memberChance : whichPlayer, position : currentPlayerPos, dice: diceVal})
    .subscribe(resp => {
      console.log(resp);
    });
  }


  setWinner(member, room){
    this.http.post<any>('/apis/setGameStats', {playerNo: member, roomid: room}).subscribe(resp => {
      console.log(resp);
    });
  }


  removeRoom(room){
    this.http.post<any>('/apis/roomDelete', {roomNo: room}).subscribe(resp => {
      console.log(resp);
    });
  }

  boardPositions(){
    const ref = this.db.database.ref('rooms/room_' + this.roomToken + '/players');
    ref.on('value', snapshot => {

      this.zone.run(() => {
        const lenref = Object.keys(snapshot.val()).length;
        for (let i = 1; i <= lenref; i++){
          this.posBoard[i - 1] = snapshot.child('player_' + i + '/position').val();
          if (this.posBoard[i - 1] === 100){
            this.play = false;
            this.winner = this.names[i - 1];
            this.popup();
            console.log('popup');
            console.log(this.names[i - 1] + ' WINS and your position is' + ' ' + this.positions[i - 1]);
          }
        }
      });
    });
  }


  memChance(){
    this.db.database.ref('rooms/room_' + this.roomToken).on('value', chance => {
      this.zone.run(() => {
        this.memberChance = chance.child('memberChance').val();
      });
    });
  }


  playerPosition(){
    const ref = this.db.database.ref('rooms/room_' + this.roomToken + '/players');
    ref.once('value', snapshot => {

      this.zone.run(() => {
        const lenref = Object.keys(snapshot.val()).length;
        console.log(lenref, snapshot.val(), this.names.length);
        for (let i = 1; i <= this.names.length; i++){
          this.positions[i - 1] = snapshot.child('player_' + i + '/position').val();
        }
      });

    }).then(_ => {
      const mem = this.memberChance;
      console.log(this.positions, this.positions[mem - 1]);
      this.positions[mem - 1] = this.positions[mem - 1] + this.diceNumber.dice_value;

      if (this.positions[mem - 1] === 100){

          this.setWinner(this.memberChance, this.roomToken);
          // this.removeRoom(this.roomToken);

      } else if (this.positions[mem - 1] > 100){

        this.positions[mem - 1] = this.positions[mem - 1] - this.diceNumber.dice_value;
        console.log(this.names[mem - 1] + ' ' + 'new position is' + ' ' + this.positions[mem - 1]);

      }  else{

        console.log(this.names[mem - 1] + ' ' + 'new position is' + ' ' + this.positions[mem - 1]);
        }

      this.boardvals(this.positions[mem - 1], this.memberChance, this.diceNumber.dice_value);
    });

  }


  rollDiceChance(){
    /*on every click of dice this function gives one by one chance
    to all player to roll it*/
    this.http.get('/apis/board').subscribe(resp => {
      console.log('dice value', resp);
      this.diceNumber = resp;
      this.diceAudio();
      this.playerPosition();

    }, (error) => {
        console.log('Error on req : ', error);
        return null;
    });
  }


  readPlayers(roomTok){
    this.roomToken = roomTok;
    const ref = this.db.database.ref('rooms/room_' + this.roomToken + '/players');
    ref.once('value', snapshot => {
      this.zone.run(() => {
        this.lengthNames = Object.keys(snapshot.val()).length;
        for (let i = 1; i <= this.lengthNames; i++){
          this.names.push(snapshot.child('player_' + i + '/name').val());
        }
      });
    });
  }

  // sharingData:any={name:['A','B','C','D']}
  // saveData(str: string){
    // this.sharingData.name=str;
  // }
  // getData()
  // {
    // return this.sharingData.name;
  // }
  async presentLoading() {
    this.playAudio();
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'your game will start in few seconds',
      duration: 14000
    });
    await loading.present();

    console.log('Loading dismissed!');
  }

  playAudio(){
    const audio = new Audio('../assets/starter.mpeg'); // audio play when we start the game
    audio.play();
  }
  WinnerAudio(){
    const audio = new Audio('../assets/winner.mp3.wav'); // audio play after wining of player.
    audio.play();
  }
  diceAudio(){
    const audio = new Audio('../assets/dice.mp3.wav'); // audio play on dice roll
    audio.play();
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
    this.WinnerAudio();
  }


// remove this popup1() if we have only one winner.
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
    this.WinnerAudio();
  }

}
