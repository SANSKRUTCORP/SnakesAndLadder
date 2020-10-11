import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemoryCreateroomPage } from './memory-createroom.page';

describe('MemoryCreateroomPage', () => {
  let component: MemoryCreateroomPage;
  let fixture: ComponentFixture<MemoryCreateroomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryCreateroomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemoryCreateroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
