import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosUserComponent } from './prestamos-user.component';

describe('PrestamosUserComponent', () => {
  let component: PrestamosUserComponent;
  let fixture: ComponentFixture<PrestamosUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrestamosUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
