import { Component, OnInit } from '@angular/core';
// import { CreateroomService } from '../services/createroom.service'
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.page.html',
  styleUrls: ['./createroom.page.scss'],
})
export class CreateroomPage implements OnInit {

  roomToken = '4558541' //Hardcoded for now
  names = []
  leader = ''

  constructor( private db : AngularFireDatabase) {}
  

  listenPlayers(){

    var ref = this.db.database.ref('/rooms/room_'+this.roomToken+'/players')
    ref.on("value", (snapshot)=>{
      var user1 = snapshot.child('player_1/name').val();
      var user2 = snapshot.child('player_2/name').val();
      var user3 = snapshot.child('player_3/name').val();
      var user4 = snapshot.child('player_4/name').val();
      this.names = [user2, user3, user4]
      this.leader = user1
      console.log('live fetch :',this.names);
    })
  }
  

  ngOnInit() {
    this.listenPlayers();
  }




}