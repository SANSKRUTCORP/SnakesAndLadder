import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemoryCardPage } from './memory-card.page';

const routes: Routes = [
  {
    path: '',
    component: MemoryCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemoryCardPageRoutingModule {}
