import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemoryCardPageRoutingModule } from './memory-card-routing.module';

import { MemoryCardPage } from './memory-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemoryCardPageRoutingModule
  ],
  declarations: [MemoryCardPage]
})
export class MemoryCardPageModule {}
