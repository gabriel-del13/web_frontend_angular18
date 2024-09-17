import { TestBed } from '@angular/core/testing';

import { ValideregisterService } from './valideregister.service';

describe('ValideregisterService', () => {
  let service: ValideregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValideregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
