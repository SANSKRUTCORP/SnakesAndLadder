import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservices.service';
import { HttpClient } from '@angular/common/http';

declare var toggle;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public route: Router, public auth : AuthserviceService, private http : HttpClient ) { }

  ngOnInit(): void {}

  Signin(){
    this.auth.GoogleSignIn();
  }


Calltoggle()
{
  toggle();
}
 
}
