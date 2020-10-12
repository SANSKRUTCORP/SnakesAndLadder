import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameOptionPage } from './game-option.page';

const routes: Routes = [
  {
    path: '',
    component: GameOptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameOptionPageRoutingModule {}
