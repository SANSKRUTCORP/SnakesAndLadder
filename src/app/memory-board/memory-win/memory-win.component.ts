import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-memory-win',
  templateUrl: './memory-win.component.html',
  styleUrls: ['./memory-win.component.scss'],
})
export class MemoryWinComponent implements OnInit {
 

  constructor(private modalController:ModalController) { }


  ngOnInit() {}

  
  CloseModal()
  {
    this.modalController.dismiss();

  }

}
