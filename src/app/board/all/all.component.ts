import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnInit {

  constructor(private modalController:ModalController) { }

  ngOnInit() {}
  CloseModal()
   {
     this.modalController.dismiss();
   }
}

