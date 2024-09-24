import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresUserRComponent } from './pres-user-r.component';

describe('PresUserRComponent', () => {
  let component: PresUserRComponent;
  let fixture: ComponentFixture<PresUserRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresUserRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresUserRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
