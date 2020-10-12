import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemoryCreateroomPage } from './memory-createroom.page';

const routes: Routes = [
  {
    path: '',
    component: MemoryCreateroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemoryCreateroomPageRoutingModule {}
