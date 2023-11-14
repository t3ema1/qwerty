import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { humanResGuard } from './human-res.guard';

describe('humanResGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => humanResGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
