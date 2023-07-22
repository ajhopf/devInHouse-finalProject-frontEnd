import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainExamesComponent } from './main-exames.component';

describe('MainExamesComponent', () => {
  let component: MainExamesComponent;
  let fixture: ComponentFixture<MainExamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainExamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainExamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
