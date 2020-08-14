import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BoardPageRoutingModule } from './board-routing.module';

import { BoardPage } from './board.page';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    HttpClientModule,
    BoardPageRoutingModule
  ],
  declarations: [BoardPage]
})
export class BoardPageModule {}
