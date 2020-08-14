import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DialNumberPage } from './dial-number.page';

describe('DialNumberPage', () => {
  let component: DialNumberPage;
  let fixture: ComponentFixture<DialNumberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialNumberPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DialNumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
