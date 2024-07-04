import { TestBed } from '@angular/core/testing';

import { AuthGuardClientService } from './auth-guard-client.service';

describe('AuthGuardClientService', () => {
  let service: AuthGuardClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
