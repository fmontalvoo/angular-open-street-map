import { TestBed } from '@angular/core/testing';

import { AngularOpenStreetMapService } from './angular-open-street-map.service';

describe('AngularOpenStreetMapService', () => {
  let service: AngularOpenStreetMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularOpenStreetMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
