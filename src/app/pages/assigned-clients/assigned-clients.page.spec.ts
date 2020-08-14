import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AssignedClientsPage } from './assigned-clients.page';

describe('AssignedClientsPage', () => {
  let component: AssignedClientsPage;
  let fixture: ComponentFixture<AssignedClientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedClientsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignedClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
