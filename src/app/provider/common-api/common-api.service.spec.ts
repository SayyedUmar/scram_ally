import { TestBed } from '@angular/core/testing';
import { CommonAPIService } from './common-api.service';

describe('CommonAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonAPIService = TestBed.get(CommonAPIService);
    expect(service).toBeTruthy();
  });
});
