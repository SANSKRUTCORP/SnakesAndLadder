import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateroomPage } from './createroom.page';

describe('CreateroomPage', () => {
  let component: CreateroomPage;
  let fixture: ComponentFixture<CreateroomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateroomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
