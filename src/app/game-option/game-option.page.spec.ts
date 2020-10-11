import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GameOptionPage } from './game-option.page';

describe('GameOptionPage', () => {
  let component: GameOptionPage;
  let fixture: ComponentFixture<GameOptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameOptionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GameOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
