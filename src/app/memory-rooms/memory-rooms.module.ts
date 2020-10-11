import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemoryRoomsPageRoutingModule } from './memory-rooms-routing.module';

import { MemoryRoomsPage } from './memory-rooms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemoryRoomsPageRoutingModule
  ],
  declarations: [MemoryRoomsPage]
})
export class MemoryRoomsPageModule {}
