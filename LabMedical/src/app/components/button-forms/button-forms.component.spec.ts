import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFormsComponent } from './button-forms.component';

describe('ButtonFormsComponent', () => {
  let component: ButtonFormsComponent;
  let fixture: ComponentFixture<ButtonFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
