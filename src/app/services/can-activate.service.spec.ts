import { TestBed } from '@angular/core/testing';

import { CanActivateGuard } from './can-activate.service';

describe('CanActivateService', () => {
  let service: CanActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
