import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemoryBoardPage } from './memory-board.page';

const routes: Routes = [
  {
    path: '',
    component: MemoryBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemoryBoardPageRoutingModule {}
