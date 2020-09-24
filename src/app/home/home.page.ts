import { Component } from '@angular/core';
import { HomeService } from './home.service';


declare var toggle;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  uid: any;
  constructor(public hService: HomeService) { }

  Signin(){
    this.hService.getSignedIn();
  }

  Calltoggle()
  {
    toggle();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {}
}
