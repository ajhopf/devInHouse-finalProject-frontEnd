import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMedicacaoComponent } from './table-medicacao.component';

describe('TableMedicacaoComponent', () => {
  let component: TableMedicacaoComponent;
  let fixture: ComponentFixture<TableMedicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableMedicacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableMedicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
