import { TestBed } from '@angular/core/testing';
import { CommonBObjectService } from './common-bobject.service';

describe('CommonBObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonBObjectService = TestBed.get(CommonBObjectService);
    expect(service).toBeTruthy();
  });
});
