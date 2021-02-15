import { TestBed } from '@angular/core/testing';

import { RequestsInProgressInterceptor } from './requests-in-progress.interceptor';

describe('RequestsInProgressInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestsInProgressInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestsInProgressInterceptor = TestBed.inject(RequestsInProgressInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
