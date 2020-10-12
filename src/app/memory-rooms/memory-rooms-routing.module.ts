import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemoryRoomsPage } from './memory-rooms.page';

const routes: Routes = [
  {
    path: '',
    component: MemoryRoomsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemoryRoomsPageRoutingModule {}
