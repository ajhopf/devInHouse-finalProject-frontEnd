import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMedicacaoComponent } from './main-medicacao.component';

describe('MainMedicacaoComponent', () => {
  let component: MainMedicacaoComponent;
  let fixture: ComponentFixture<MainMedicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMedicacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMedicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
