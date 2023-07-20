import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainExerciciosComponent } from './main-exercicios.component';

describe('MainExerciciosComponent', () => {
  let component: MainExerciciosComponent;
  let fixture: ComponentFixture<MainExerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainExerciciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainExerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
