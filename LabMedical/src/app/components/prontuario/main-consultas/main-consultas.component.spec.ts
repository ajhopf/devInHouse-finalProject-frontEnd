import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainConsultasComponent } from './main-consultas.component';

describe('MainConsultasComponent', () => {
  let component: MainConsultasComponent;
  let fixture: ComponentFixture<MainConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainConsultasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
