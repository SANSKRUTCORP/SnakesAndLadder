import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../../environments/environment';


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
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFireDatabaseModule
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
