import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemoryCardPage } from './memory-card.page';

describe('MemoryCardPage', () => {
  let component: MemoryCardPage;
  let fixture: ComponentFixture<MemoryCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemoryCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
