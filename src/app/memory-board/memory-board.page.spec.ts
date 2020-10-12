import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemoryBoardPage } from './memory-board.page';

describe('MemoryBoardPage', () => {
  let component: MemoryBoardPage;
  let fixture: ComponentFixture<MemoryBoardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryBoardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemoryBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
