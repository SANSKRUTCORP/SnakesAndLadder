import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthserviceService } from '../services/authservices.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthserviceService, public router: Router) {}
  canActivate(): boolean {
    // let authUser = Object.keys(window.sessionStorage).filter(item => item.startsWith('firebase:authUser'))[0];
    // authUser = authUser.substr(18, authUser.length);
    const authUser = localStorage.getItem('tempid');
    // if (!authUser) {
    //   this.router.navigate(['home']);
    //   return false;
    // }
    return true;
  }
}
