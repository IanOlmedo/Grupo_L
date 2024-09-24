import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresAdminComponent } from './pres-admin.component';

describe('PresAdminComponent', () => {
  let component: PresAdminComponent;
  let fixture: ComponentFixture<PresAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
