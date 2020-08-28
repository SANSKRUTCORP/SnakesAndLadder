import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservices.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public router: Router, public auth: AuthserviceService) { }

  canActivate() : boolean{
    if(this.auth.isUserSignedIn()){
      return true
    }
    else{
      this.router.navigateByUrl("/home")
      return false
    }
  }

}
