import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMedicacaoComponent } from './form-medicacao.component';

describe('FormMedicacaoComponent', () => {
  let component: FormMedicacaoComponent;
  let fixture: ComponentFixture<FormMedicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMedicacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMedicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
