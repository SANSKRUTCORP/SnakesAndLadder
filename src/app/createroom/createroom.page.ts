import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthserviceService } from '../services/authservices.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.page.html',
  styleUrls: ['./createroom.page.scss'],
})

export class CreateroomPage implements OnInit {

  roomToken: any;
  names = [];
  leader: string;

  constructor( private db: AngularFireDatabase, private auth: AuthserviceService, private route: ActivatedRoute, private router: Router) {}


  listenPlayers(){
    this.roomToken = this.route.snapshot.queryParamMap.get('room');
    const ref = this.db.database.ref('/rooms/room_' + this.roomToken + '/players');

    ref.on('value', (snapshot) => {
      // this.roomToken = this.getRoomToken()
      for(let i = 1; i <= 4; i++){
        const user = snapshot.child('player_' + i + '/name').val();
        if(i === 1){
          this.leader = user;
        }
        else{
          this.names[i - 1] = user;
        }
      }
      console.log('leader...', this.leader);
      console.log('live fetch :', this.names);
    });

  }

  onClick(){
    this.router.navigate(['/board'], {
      queryParams: {room : this.roomToken}
    });
  }


  ngOnInit() {
    this.listenPlayers();
    this.auth.isUserSignedIn().then(res => {
      if (res){
        console.log('Signed in! ...with ', res.uid);
      } else{
        console.log('Not signed in!');
      }
    });

  }
}
