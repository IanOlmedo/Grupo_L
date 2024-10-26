import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPrestamoComponent } from './info-prestamo.component';

describe('InfoPrestamoComponent', () => {
  let component: InfoPrestamoComponent;
  let fixture: ComponentFixture<InfoPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoPrestamoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
