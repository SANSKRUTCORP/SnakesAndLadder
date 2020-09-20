import { Injectable , EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { AngularFireDatabase } from '@angular/fire/database';





@Injectable({
  providedIn: 'root'
})
export class BoardService {

  name = [];

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }


  diceRoll(){
     return this.http.get('http://localhost:3000/board').pipe(map((resp: any) => resp.dice_value))
  }


  // sharingData:any={name:['A','B','C','D']}
  // saveData(str: string){
    // this.sharingData.name=str;
  // }
  // getData()
  // {
    // return this.sharingData.name;
  // }
  // c
}
