import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameOptionPageRoutingModule } from './game-option-routing.module';

import { GameOptionPage } from './game-option.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameOptionPageRoutingModule
  ],
  declarations: [GameOptionPage]
})
export class GameOptionPageModule {}
