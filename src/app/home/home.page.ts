import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservices.service';


declare var toggle;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  uid: any;
  constructor(public route: Router, public auth: AuthserviceService, private http: HttpClient ) { }

  Signin(){
    this.auth.GoogleSignIn();
  }

  Calltoggle()
  {
    toggle();
  }

  ngOnInit(): void {
    this.auth.isUserSignedIn().then(res => {
      if (res){
        console.log('Signed in! ...with ', res.uid);
      } else{
        console.log('not signed in!');
      }
    });
    // this.auth.getToken().subscribe(res=>console.log(res))
  }
}
