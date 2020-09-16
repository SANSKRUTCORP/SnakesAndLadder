import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomsPageRoutingModule } from './rooms-routing.module';

import { RoomsPage } from './rooms.page';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../services/auth.interceptor';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RoomsPageRoutingModule
  ],
  declarations: [RoomsPage],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptor,
      multi : true
    }
  ]
})
export class RoomsPageModule {}
