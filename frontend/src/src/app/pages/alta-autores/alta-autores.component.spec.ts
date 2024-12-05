import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaAutoresComponent } from './alta-autores.component';

describe('AltaAutoresComponent', () => {
  let component: AltaAutoresComponent;
  let fixture: ComponentFixture<AltaAutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AltaAutoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaAutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
