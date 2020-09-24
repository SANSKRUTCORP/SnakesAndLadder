import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { WinComponent } from './win/win.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { AllComponent } from './all/all.component';
import { BoardService } from '../services/board.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthserviceService } from '../services/authservices.service';
// import { state, style, trigger } from '@angular/animation';

@Component({
  
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
  // animations: [
  //   trigger('divState', [
  //     state('normal', style({transform:'tanslateX(0px)'})),
  //     state('normal', style({transform:'tanslateX(100px)'})),
  //   ])
  // ]
})
export class BoardPage implements OnInit {
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
  lengthNames: any;
  loggedUser: any;
  // state='normal';

constructor(private http: HttpClient,
            public auth: AuthserviceService,
            private zone: NgZone,
            private route: ActivatedRoute,
            private modalController: ModalController,
            public db: AngularFireDatabase,
            private boardService: BoardService,
            public loadingController: LoadingController) {

              // this.myName = boardService.getData(); //the data of players we get from create room page
              this.roomToken = this.route.snapshot.queryParamMap.get('room');
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



  readPlayers(){
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

  ngOnInit() {
    this.readPlayers();
    this.loggedinUser();
    this.boardPositions();
    this.memChance();
    // this.presentLoading();
  }

  // onAnimate(){

  //   this.state=='normal'?this.state='highlight':this.state='normal';
  // }

  rollDiceChance(){
    /*on every click of dice this function gives one by one chance
    to all player to roll it*/
    this.boardService.diceRoll().subscribe(resp => {
      console.log('dice value', resp);
      this.diceNumber = resp;
      this.playerPosition();

    }, (error) => {
        console.log('Error on req : ', error);
        return null;
    });
  }


  playerPosition(){
    const ref = this.db.database.ref('rooms/room_' + this.roomToken + '/players');
    ref.once('value', snapshot => {

      this.zone.run(() => {
        const lenref = Object.keys(snapshot.val()).length;
        for (let i = 1; i <= lenref; i++){
          this.positions[i - 1] = snapshot.child('player_' + i + '/position').val();
        }
      });

    }).then(_ => {

      this.positions[this.memberChance - 1] = this.positions[this.memberChance - 1] + this.diceNumber;
        // this.win(this.positions[this.memberChance - 1]) }
      if (this.positions[this.memberChance - 1] === 100){
        this.positions[this.memberChance - 1] = 100;
        this.play = false;
        this.popup();
        console.log('YOU WIN and your position is' + ' ' + this.positions[this.memberChance - 1]);
        this.setWinner(this.memberChance, this.roomToken);
        this.removeRoom(this.roomToken);

      } else  if (this.positions[this.memberChance - 1] > 100){
        this.positions[this.memberChance - 1] = this.positions[this.memberChance - 1] - this.diceNumber;
        console.log(this.names[this.memberChance - 1] + ' ' + 'new position is' + ' ' + this.positions[this.memberChance - 1]);

      }  else{
        console.log(this.names[this.memberChance - 1] + ' ' + 'new position is' + ' ' + this.positions[this.memberChance - 1]);
        }
      this.boardvals(this.positions[this.memberChance - 1], this.memberChance);
    });

  }

  boardPositions(){
    const ref = this.db.database.ref('rooms/room_' + this.roomToken + '/players');
    ref.on('value', snapshot => {

      this.zone.run(() => {
        const lenref = Object.keys(snapshot.val()).length;
        for (let i = 1; i <= lenref; i++){
          this.posBoard[i - 1] = snapshot.child('player_' + i + '/position').val();
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


// here if you want only dice value which we get from backend then
//  replace this.rollDiceChance() from this.boardService.diceRoll().
  boardvals(currentPlayerPos, whichPlayer){
    this.http.post<any>(`http://localhost:3000/board/${this.roomToken}`,
    {memberChance : whichPlayer, position : currentPlayerPos})
    .subscribe(resp => {
      console.log(resp);
    });
  }

  setWinner(member, room){
    this.http.post<any>('http://localhost:3000/setGameStats', {playerNo: member, roomid: room}).subscribe(resp => {
      console.log(resp);
    });
  }

  removeRoom(room){
    this.http.post<any>('http://localhost:3000/roomDelete', {roomNo: room}).subscribe(resp => {
      console.log(resp);
    });
  }


  // it shows the loading when you start the game.
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

    loggedinUser(){
      this.auth.getUser().then(user => {
        this.loggedUser = user.displayName;
        console.log(user);
      });
    }

  //   Calltoggle(){
  //     function Calltoggle(){
  //       var blur = document.getElementById('blur');
  //       blur.classList.toggle('active')
  //     }
  //   }
}
