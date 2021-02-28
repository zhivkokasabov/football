import { TestBed } from '@angular/core/testing';

import { TournamentTypesResolver } from './tournament-types.resolver';

describe('TournamentTypesResolver', () => {
  let resolver: TournamentTypesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TournamentTypesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
