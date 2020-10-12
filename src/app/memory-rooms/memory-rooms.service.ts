import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthserviceService } from '../services/authservices.service';

@Injectable({
  providedIn: 'root'
})
export class MemoryRoomsService {
  userName: string;
  email: string;
  uid: string;
  wins: any;
  gplay: any;

  constructor(public auth: AuthserviceService,
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


  displayName(){
    this.auth.isUserSignedIn().then(res => {
      if (res){
        this.auth.getUser().then(user => {
          this.userName = user.displayName;
          this.email = user.email;
          this.uid = localStorage.getItem('tempid');
          // debugger;
          this.http.post<any>('/apis/mmry/setUser',
          // this.http.post<any>(this.utils.GetServerHost()+'/apis/setUser',
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
    this.uid = localStorage.getItem('tempid');
    this.db.database.ref('memory/Users/' + this.uid).on('value', snapshot => {
      this.zone.run(() => {
        this.wins = snapshot.child('wins').val();
        this.gplay = snapshot.child('gameplay').val();
        console.log(this.wins, this.gplay);
      });
    });
  }



  getRoomToken(): any{
    return this.http.get<any>('/apis/mmry/createroom');
  }
  
}
