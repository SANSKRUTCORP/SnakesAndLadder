import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemoryCreateroomPageRoutingModule } from './memory-createroom-routing.module';

import { MemoryCreateroomPage } from './memory-createroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemoryCreateroomPageRoutingModule
  ],
  declarations: [MemoryCreateroomPage]
})
export class MemoryCreateroomPageModule {}
