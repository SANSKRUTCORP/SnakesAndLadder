import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})

export class AuthserviceService {
  isSignedIn = false;

  constructor(public router:Router, private afAuth : AngularFireAuth) {
    this.afAuth.user.subscribe(function(res){
      if(res.uid){
        this.isSignedIn = true
        console.log(res.uid)
        this.router.navigateByUrl("/rooms")
      }
      else{
        this.isSignedIn = false
      }
    })
  }


  SignOut(){
    if(this.isUserSignedIn()){
      this.isSignedIn = false
      this.afAuth.signOut()
      console.log('signed out!')
      location.reload()
      this.router.navigateByUrl("/home")
    }
  }

  isUserSignedIn(){
    return this.isSignedIn
  }

  GoogleSignIn() {
    let provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider)
        .then(function (data) {
          this.isSignedIn = true
          console.log('signed in!')
          console.log(data)
          return true
        })
        .catch(function (err) {
            console.log(err)
        })
  
      
  }

}
