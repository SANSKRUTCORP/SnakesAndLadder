import { Component, OnInit } from '@angular/core';
import{ModalController} from '@ionic/angular';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.scss'],
})
export class WinComponent implements OnInit {

  constructor(private modalController:ModalController, public bService: BoardService) { }

  ngOnInit() {
  }
  CloseModal()
  {
    this.modalController.dismiss();
    
  }
}
