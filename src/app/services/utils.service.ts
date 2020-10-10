import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  GetServerHost(){
		if (window.location.hostname.indexOf("localhost")>-1){
			return "http://localhost:8080"
		}else{
			return ""
		}
	}

}
