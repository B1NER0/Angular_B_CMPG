import { TestBed } from '@angular/core/testing';

import { APIMasterService } from './api-master.service';

describe('APIMasterService', () => {
  let service: APIMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
