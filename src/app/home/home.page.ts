import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservices.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public route: Router, private auth : AuthserviceService) { }

  ngOnInit(): void {
    this.SignIn()
  }
  SignIn(){
    let status
    status = this.auth.GoogleSignIn()
    if(status){
      this.route.navigateByUrl('/rooms')
    }
  }

 
}
