import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authroleGuard } from './authrole.guard';

describe('authroleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authroleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
