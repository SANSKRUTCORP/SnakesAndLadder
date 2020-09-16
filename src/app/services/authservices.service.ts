import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})

export class AuthserviceService {
  loggedInUserId: any;
  loggedInEmail: any;
  LoggedInName: any;
  userToken: any;

  constructor(public router: Router, public afAuth: AngularFireAuth, private db: AngularFireDatabase, private http: HttpClient) {
    this.afAuth.user.subscribe(res => {
      if (!res){
        return null;
      }
      if (res.uid){
        // console.log('User state : ', this.isSignedIn)
        router.navigateByUrl('/rooms');
      }
      else{
        router.navigateByUrl('/home');
      }
    });
  }

  isUserSignedIn(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }


  SignOut(){
    this.isUserSignedIn().then(res => {
      console.log(res);
      if (res){

        this.afAuth.signOut();
        console.log('signed out!');
        sessionStorage.setItem('keyid', '');
        sessionStorage.setItem('tempid', '');
        // this.isUserSignedIn().then(res=>{
        //   console.log(res)
        // })
        // location.reload()
        this.router.navigateByUrl('/home');
      } else{
        console.log('not signed in!');
      }
    });

  }

  GoogleSignIn() {
    return this.afAuth.setPersistence('session').then(_ => {
      const provider = new firebase.auth.GoogleAuthProvider();
      // console.log('provider:',provider)
      return this.afAuth.signInWithPopup(provider)
                        .then((data) => {
                          this.loggedInUserId  = data.user.uid;
                          this.loggedInEmail = data.user.email;
                          this.LoggedInName = data.user.displayName;
                          sessionStorage.setItem('tempid', this.loggedInUserId);
                          this.getToken();
                        })
                        .catch(err => {
                            console.log(err);
                        });
    });

  }

  getToken(){
    this.afAuth.idToken.subscribe(res => {
      sessionStorage.setItem('keyid', res);
    });
  }

  getUser(){
    return this.afAuth.currentUser;
  }


}
