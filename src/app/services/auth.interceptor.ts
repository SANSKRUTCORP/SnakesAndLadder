import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthserviceService } from '../services/authservices.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth : AuthserviceService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    
    var token = this.auth.getToken();
    // var token = '123456qwerty';
    console.log('mytoken : ',token)


    if(token){
      request = request.clone({
        setHeaders: { 
          Authorization: `Bearer ${token}`
        }
      });
      console.log("header set")
      return next.handle(request);

    } else{
      return next.handle(request);
    }
  }
}