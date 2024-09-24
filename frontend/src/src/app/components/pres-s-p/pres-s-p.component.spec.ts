import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresSPComponent } from './pres-s-p.component';

describe('PresSPComponent', () => {
  let component: PresSPComponent;
  let fixture: ComponentFixture<PresSPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresSPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresSPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
