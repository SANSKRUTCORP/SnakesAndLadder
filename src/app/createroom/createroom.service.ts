import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from '../services/authservices.service';
// import { UtilsService } from 'src/app/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class CreateroomService {
  leader: any;
  names = [];
  truth: boolean;
  state: any;
  roomToken: any;

  constructor(private db: AngularFireDatabase,
              // private utils: UtilsService,
              private http: HttpClient,
              public auth: AuthserviceService,
              public zone: NgZone,
              private router: Router) { }

  listenPlayers(roomtok){
    this.roomToken = roomtok;
    this.zone = new NgZone({});
    const ref = this.db.database.ref('/rooms/room_' + this.roomToken + '/players');

    ref.on('value', (snapshot) => {
      // this.roomToken = this.getRoomToken()
      this.zone.run(() => {
        for (let i = 1; i <= 4; i++){
          const user = snapshot.child('player_' + i + '/name').val();
          if (i === 1){
            this.leader = user;
          }
          else{
            this.names[i - 2] = user;
          }
        }
        console.log('leader...', this.leader);
        console.log('live fetch :', this.names);
      });
    });

  }

  onClick(){
    this.http.post<any>('/apis/setState', {roomid: this.roomToken}).subscribe(resp => {
    // this.http.post<any>(this.utils.GetServerHost() + '/apis/setState', {roomid: this.roomToken}).subscribe(resp => {
      console.log(resp);
    });
  }

  checkButton(){
    let loggedUser: any;
    this.truth = false;
    this.db.database.ref('rooms/room_' + this.roomToken + '/players').once('value', snapshot => {
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
    this.db.database.ref('rooms/room_' + this.roomToken).on('value', snapshot => {
      this.state = snapshot.child('tempState').val();
      if (this.state){
        this.router.navigate(['/board'], {
          queryParams: {room : this.roomToken}
        });
      }
    });
  }

}
