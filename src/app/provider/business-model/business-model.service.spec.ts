import { TestBed } from '@angular/core/testing';
import { BusinessModelService } from './business-model.service';

describe('BusinessModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessModelService = TestBed.get(BusinessModelService);
    expect(service).toBeTruthy();
  });
});
