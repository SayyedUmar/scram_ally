import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SeriousPage } from './serious.page';

describe('SeriousPage', () => {
  let component: SeriousPage;
  let fixture: ComponentFixture<SeriousPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeriousPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeriousPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
