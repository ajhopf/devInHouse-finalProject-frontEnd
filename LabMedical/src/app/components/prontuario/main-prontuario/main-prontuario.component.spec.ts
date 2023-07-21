import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProntuarioComponent } from './main-prontuario.component';

describe('MainProntuarioComponent', () => {
  let component: MainProntuarioComponent;
  let fixture: ComponentFixture<MainProntuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProntuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainProntuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
