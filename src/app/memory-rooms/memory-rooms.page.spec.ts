import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemoryRoomsPage } from './memory-rooms.page';

describe('MemoryRoomsPage', () => {
  let component: MemoryRoomsPage;
  let fixture: ComponentFixture<MemoryRoomsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryRoomsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemoryRoomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
