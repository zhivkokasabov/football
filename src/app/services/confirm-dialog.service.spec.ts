import { TestBed } from '@angular/core/testing';

import { ConfirmDialogService } from './confirm-modal.service';

describe('ConfirmModalService', () => {
  let service: ConfirmDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
