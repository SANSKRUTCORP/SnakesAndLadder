import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memory-win',
  templateUrl: './memory-win.component.html',
  styleUrls: ['./memory-win.component.scss'],
})
export class MemoryWinComponent implements OnInit {
  modalController: any;

  constructor() { }

  CloseModal()
  {
    this.modalController.dismiss();

  }

  ngOnInit() {}

}
