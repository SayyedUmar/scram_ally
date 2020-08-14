import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CriticalPage } from './critical.page';

describe('CriticalPage', () => {
  let component: CriticalPage;
  let fixture: ComponentFixture<CriticalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CriticalPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CriticalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
