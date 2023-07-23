import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDietasComponent } from './main-dietas.component';

describe('MainDietasComponent', () => {
  let component: MainDietasComponent;
  let fixture: ComponentFixture<MainDietasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDietasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDietasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
