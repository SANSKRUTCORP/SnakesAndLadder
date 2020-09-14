import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthserviceService } from '../services/authservices.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthserviceService, public router: Router) {}
  canActivate(): boolean {
    const token = sessionStorage.getItem('tempid');
    if (!token) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
