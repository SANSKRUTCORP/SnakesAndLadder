import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { IonicModule } from '@ionic/angular';

import { CreateroomPageRoutingModule } from './createroom-routing.module';

import { CreateroomPage } from './createroom.page';
import { TokenInterceptor } from '../services/auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    CreateroomPageRoutingModule, 
  ],
  declarations: [CreateroomPage],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptor,
      multi : true
    }
  ]
})
export class CreateroomPageModule {}
