import { TestBed } from '@angular/core/testing';

import { ServicesCatalogService } from './services-catalog.service';

describe('ServicesCatalogService', () => {
  let service: ServicesCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
