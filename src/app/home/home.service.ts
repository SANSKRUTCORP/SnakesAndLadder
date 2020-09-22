import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthserviceService } from '../services/authservices.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private db: AngularFireDatabase, private auth: AuthserviceService) { }

  getSignedIn(){
    this.auth.GoogleSignIn();
  }
}
