import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.page.html',
  styleUrls: ['./createroom.page.scss'],
})
export class CreateroomPage implements OnInit {

  roomToken:number; //Hardcoded for now
  names = [];
  leader = '';

  constructor( private db : AngularFireDatabase, private http : HttpClient ) {}
  

  listenPlayers(){
    var ref = this.db.database.ref('/rooms/room_'+this.roomToken+'/players')
    ref.on("value", (snapshot)=>{
      this.roomToken = this.getRoomToken()
      console.log("this is...",this.names)
      for(var i=1;i<=4;i++){
        var user = snapshot.child('player_'+i+'/name').val();
        if(i==1){
          this.leader=user;
        }
        else{
          this.names[i-1] = user;
        }
      }
      console.log('live fetch :',this.names);
    })
  }
  
  getRoomToken() : any{
    this.http.get<any>('http://localhost:3000/createroom').subscribe((res)=>{
      console.log("response is : ",res.room_token);
      return res.room_token
    },(error)=>{
      console.log("Error on req : ",error);
      return 0;
    })
  }


  ngOnInit() {
    // this.listenPlayers();
    this.getRoomToken();
  }
}