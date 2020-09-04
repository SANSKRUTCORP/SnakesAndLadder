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
  LoggedInName: any;

  constructor(public router:Router, public afAuth : AngularFireAuth) {
    this.afAuth.user.subscribe(function(res){
      if(!res){
        return null;
      }
      if(res.uid){
        this.isSignedIn = true
        console.log('User state : ', this.isSignedIn)
        router.navigateByUrl('/rooms')
      }
      else{
        this.isSignedIn = false
        router.navigateByUrl('/home')
      }
    })
  }

  isUserSignedIn(){
    return this.isSignedIn;
  }


  SignOut(){
    if(this.isSignedIn){
      this.isSignedIn = false
      this.afAuth.signOut()
      // console.log('signed out!')
      location.reload()
      this.router.navigateByUrl("/home")
    } else{
      console.log("not signed in!")
      console.log(this.isSignedIn)
    }
  }

  
  GoogleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    // console.log('provider:',provider)
    this.afAuth.signInWithPopup(provider)
        .then((data)=>{
          this.isSignedIn = true
          this.loggedInUserId  = data.user.uid
          this.loggedInEmail = data.user.email
          this.LoggedInName = data.user.displayName
          console.log('User state : ',this.isUserSignedIn())
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

  getToken() : any{
    if(this.isUserSignedIn()){
      this.afAuth.idToken.subscribe(res=>{
        console.log('idRes : ',res)
        return res
      })
    }
  }

  getUserName():any{
    return this.LoggedInName
  }


}
