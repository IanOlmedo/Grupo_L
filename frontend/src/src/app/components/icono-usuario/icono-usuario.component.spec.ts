import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconoUsuarioComponent } from './icono-usuario.component';

describe('IconoUsuarioComponent', () => {
  let component: IconoUsuarioComponent;
  let fixture: ComponentFixture<IconoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconoUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
