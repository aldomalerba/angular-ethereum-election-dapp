import { TestBed } from '@angular/core/testing';

import { Web3GuardService } from './web3-guard.service';

describe('Web3ProviderService', () => {
  let service: Web3GuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Web3GuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
