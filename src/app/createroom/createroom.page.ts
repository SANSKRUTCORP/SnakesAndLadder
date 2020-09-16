import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthserviceService } from '../services/authservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BoardService } from '../services/board.service';
// import { Router } from '@angular/router';
import { stat } from 'fs';

@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.page.html',
 
     

  // styleUrls: ['./createroom.page.scss'],
})

export class CreateroomPage implements OnInit {

  roomToken:any; //Hardcoded for now
  names = ["one","two","three","four"];//hardecoded for now
  leader = '';

  constructor( private db : AngularFireDatabase, 
               private http : HttpClient , 
               private boardService: BoardService,
               public auth: AuthserviceService,
               private router: Router ,
               private route:ActivatedRoute) {

    // this.boardService = boardService;
    // this.router = router;
   
  }

  ngOnInit() {
    // this.listenPlayers(); 
  
  }

  send(str: any){
    // console.log(str);
    this.boardService.saveData(str);
    this.router.navigate(['/board']);
  }
  listenPlayers(){
    this.roomToken = this.route.snapshot.queryParamMap.get('room');
    const ref = this.db.database.ref('/rooms/room_' + this.roomToken + '/players');

    ref.on('value', (snapshot) => {
      // this.roomToken = this.getRoomToken()
      for (let i = 1; i <= 4; i++){
        const user = snapshot.child('player_' + i + '/name').val();
        if (i === 1){
          this.leader = user;
        }
        else{
          this.names[i - 2] = user;
        }
      }
      console.log('live fetch :',this.names);
    })
  }
  
  
  getRoomToken() : any{
    this.http.get<any>('http://localhost:3000/createroom').subscribe((res)=>{
      console.log("response is : ",res['room_token']);
      return res['room_token']
    },(error)=>{
      console.log("Error on req : ",error);
      return null;
    })
  }

  onClick(){
    this.http.post<any>('http://localhost:3000/setState', {roomid: this.roomToken}).subscribe(resp => {
      console.log(resp);
    });
  }

  // checkButton(){
  //   let loggedUser: any;
  //   this.truth = false;
  //   this.db.database.ref('rooms/room_' + this.roomToken + '/players').once('value', snapshot => {
  //     this.leader = snapshot.child('player_1/name').val();
  //     this.auth.getUser().then(res => {
  //       loggedUser = res.displayName;
  //       console.log(loggedUser);
  //       if (loggedUser === this.leader){
  //         this.truth = true;
  //         console.log(this.truth, loggedUser, this.leader);
  //       }
  //     });
  //   });
  // }



  // ngOnInit() {
  //   this.listenPlayers();
  //   this.checkButton();
  //   this.db.database.ref('rooms/room_' + this.roomToken).on('value', snapshot => {
  //     this.state = snapshot.child('tempState').val();
  //     if(this.state){
  //       this.router.navigate(['/board'], {
  //         queryParams: {room : this.roomToken}
  //       });
  //     }
  //   });
  //   console.log(this.truth);
  // }
}
