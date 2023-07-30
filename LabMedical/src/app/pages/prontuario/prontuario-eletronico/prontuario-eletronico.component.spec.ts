import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntuarioEletronicoComponent } from './prontuario-eletronico.component';

describe('ProntuarioEletronicoComponent', () => {
  let component: ProntuarioEletronicoComponent;
  let fixture: ComponentFixture<ProntuarioEletronicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProntuarioEletronicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProntuarioEletronicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
