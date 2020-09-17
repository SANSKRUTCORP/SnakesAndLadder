import { Injectable , EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';    
import { AngularFireDatabase } from '@angular/fire/database';





@Injectable({
  providedIn: 'root'
})
export class BoardService {
  
 
    name:string;

   

 
  constructor(private http:HttpClient,private db : AngularFireDatabase) { }
//http request to get dice number value from backend
  diceRoll(){
     return this.http.get('http://localhost:3000/board').pipe(map((resp: any) => resp.dice_value))
  }
  sharingData:any={name:" "}
  saveData(str: string){
    this.sharingData.name=str; 
  }
  getData()
  {
    return this.sharingData.name;
  }
  // checkForSnakeLadder(required_pos){
  //   var ref = this.db.database.ref('/SnakesAndLadders')
  //   ref.once('value', (snapshot)=>{
  //       var myvals = snapshot.val();
  //       if(required_pos in myvals){
  //           this.updatePos = myvals[required_pos]
  //           console.log("new pos : ",required_pos)
  //       } else{
  //           console.log('Not found')
  //       }
  //   })
  //   return this.updatePos;
  // }
  
 

}


