import { Component } from '@angular/core';

declare var toggle;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

Calltoggle()
{
  toggle();
}
 
}
