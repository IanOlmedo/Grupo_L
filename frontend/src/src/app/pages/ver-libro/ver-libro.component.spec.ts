import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerLibroComponent } from './ver-libro.component';

describe('VerLibroComponent', () => {
  let component: VerLibroComponent;
  let fixture: ComponentFixture<VerLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerLibroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
