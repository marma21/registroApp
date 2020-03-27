import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CargaModalPage } from './carga-modal.page';

describe('CargaModalPage', () => {
  let component: CargaModalPage;
  let fixture: ComponentFixture<CargaModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CargaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
