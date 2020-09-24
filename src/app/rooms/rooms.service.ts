import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservices.service';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  uid: string;
  wins: any;
  gplay: any;
  userName: string;
  email: string;
  roomID: any;

  constructor(public auth: AuthserviceService,
              private router: Router,
              public zone: NgZone,
              public db: AngularFireDatabase,
              public http: HttpClient) { }


  signOut(){
    if (this.auth.isUserSignedIn()){
      console.log(this.auth.loggedInEmail);
      this.auth.SignOut();
    } else{
      console.log('Not signed in at rooms?!');
    }
  }

  onClick(){
    this.getRoomToken().subscribe(res => {
      this.roomID = res.room_token;
      this.router.navigate(['/createroom'], {
        queryParams: {room : this.roomID}
      });

    });
  }

  displayName(){
    this.auth.isUserSignedIn().then(res => {
      if (res){
        this.auth.getUser().then(user => {
          this.userName = user.displayName;
          this.email = user.email;
          this.uid = sessionStorage.getItem('tempid');
          // debugger;
          this.http.post<any>('/apis/setUser',
          {uid : this.uid, name : this.userName, email: this.email}).subscribe(resp => {
            console.log(resp);
          });
        }).catch(err => {
          console.log(err);
        });
      }
    });
  }


  getStats(){
    this.zone = new NgZone({});
    this.uid = sessionStorage.getItem('tempid');
    this.db.database.ref('Users/' + this.uid).on('value', snapshot => {
      this.zone.run(() => {
        this.wins = snapshot.child('wins').val();
        this.gplay = snapshot.child('gameplay').val();
        console.log(this.wins, this.gplay);
      });
    });
  }



  getRoomToken(): any{
    return this.http.get<any>('/apis/createroom');
  }

}
