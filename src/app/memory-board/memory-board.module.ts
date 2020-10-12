import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemoryBoardPageRoutingModule } from './memory-board-routing.module';

import { MemoryBoardPage } from './memory-board.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemoryBoardPageRoutingModule
  ],
  declarations: [MemoryBoardPage]
})
export class MemoryBoardPageModule {}
