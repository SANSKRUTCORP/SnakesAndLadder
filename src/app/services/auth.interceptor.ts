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
  id: any;
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.id = sessionStorage.getItem('keyid');
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.id}`
      }
    });
    return next.handle(request);
  }
}
