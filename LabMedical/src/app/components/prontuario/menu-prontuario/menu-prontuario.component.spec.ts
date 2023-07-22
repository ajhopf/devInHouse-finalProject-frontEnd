import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProntuarioComponent } from './menu-prontuario.component';

describe('MenuProntuarioComponent', () => {
  let component: MenuProntuarioComponent;
  let fixture: ComponentFixture<MenuProntuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuProntuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuProntuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
