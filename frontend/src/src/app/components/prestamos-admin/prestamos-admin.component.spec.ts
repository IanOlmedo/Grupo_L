import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosAdminComponent } from './prestamos-admin.component';

describe('PrestamosAdminComponent', () => {
  let component: PrestamosAdminComponent;
  let fixture: ComponentFixture<PrestamosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrestamosAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
