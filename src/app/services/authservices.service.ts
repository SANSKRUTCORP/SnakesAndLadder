import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})

export class AuthserviceService {
  isSignedIn = false;
  loggedInUserId: any;
  loggedInEmail: any;

  constructor(public router:Router, public afAuth : AngularFireAuth) {
    this.afAuth.user.subscribe(function(res){
      if(res.uid){
        this.isSignedIn = true
        console.log(res.uid)
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
    var provider = new firebase.auth.GoogleAuthProvider();
    console.log('provider:',provider)
    this.afAuth.signInWithPopup(provider)
        .then((data)=>{
          this.isSignedIn = true
          this.loggedInUserId  = data.user.uid
          this.loggedInEmail = data.user.email
          console.log('signed in!')
          console.log(this.getToken())
          console.log(data)
          return true
        })
        .catch(function (err) {
            console.log(err)
        })      
  }

  getUserId(){
    return this.loggedInUserId
  }

  getUserEmail(){
    return this.loggedInEmail
  }

  getToken():any{
    this.afAuth.user.subscribe(res=>{
      return res.getIdToken()
    }) 
  }

}
