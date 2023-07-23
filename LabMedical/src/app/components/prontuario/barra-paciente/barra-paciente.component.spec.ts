import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraPacienteComponent } from './barra-paciente.component';

describe('BarraPacienteComponent', () => {
  let component: BarraPacienteComponent;
  let fixture: ComponentFixture<BarraPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
