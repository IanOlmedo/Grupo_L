import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaLibrosComponent } from './alta-libros.component';

describe('AltaLibrosComponent', () => {
  let component: AltaLibrosComponent;
  let fixture: ComponentFixture<AltaLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AltaLibrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
