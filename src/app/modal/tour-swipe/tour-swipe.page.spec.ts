import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TourSwipePage } from './tour-swipe.page';

describe('TourSwipePage', () => {
  let component: TourSwipePage;
  let fixture: ComponentFixture<TourSwipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TourSwipePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TourSwipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
