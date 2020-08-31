import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../../environments/environment';


import { IonicModule } from '@ionic/angular';

import { CreateroomPageRoutingModule } from './createroom-routing.module';

import { CreateroomPage } from './createroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateroomPageRoutingModule, 
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFireDatabaseModule
  ],
  declarations: [CreateroomPage]
})
export class CreateroomPageModule {}
