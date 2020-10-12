import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from '../services/authservices.service';

@Injectable({
  providedIn: 'root'
})
export class MemoryCreateroomService {
  roomToken: any;
  leader: any;
  player2: any;
  truth: boolean;
  state: any;

  constructor(private db: AngularFireDatabase,
              private http: HttpClient,
              public auth: AuthserviceService,
              public zone: NgZone,
              private router: Router) { }



  listenPlayers(roomtok){
    this.roomToken = roomtok;
    this.zone = new NgZone({});
    const ref = this.db.database.ref('memory/rooms/room_' + this.roomToken + '/players');

    ref.on('value', (snapshot) => {
      // this.roomToken = this.getRoomToken()
      this.zone.run(() => {
        for (let i = 1; i <= 2; i++){
          const user = snapshot.child('player_' + i + '/name').val();
          if (i === 1){
            this.leader = user;
          }
          else{
            this.player2 = user;
          }
        }
      });
    });

  }

  onClick(){
    this.http.post<any>('/apis/mmry/setState', {roomid: this.roomToken}).subscribe(resp => {
      console.log(resp);
    });
  }

  checkButton(){
    let loggedUser: any;
    this.truth = false;
    this.db.database.ref('memory/rooms/room_' + this.roomToken + '/players').once('value', snapshot => {
      this.leader = snapshot.child('player_1/name').val();
      this.auth.getUser().then(res => {
        loggedUser = res.displayName;
        console.log(loggedUser);
        if (loggedUser === this.leader){
          this.truth = true;
          console.log(this.truth, loggedUser, this.leader);
        }
      });
    });
  }

  navigator(){
    this.db.database.ref('memory/rooms/room_' + this.roomToken).on('value', snapshot => {
      this.state = snapshot.child('tempState').val();
      if (this.state){
        this.router.navigate(['/memory-board'], {
          queryParams: {room : this.roomToken}
        });
      }
    });
  }


}
