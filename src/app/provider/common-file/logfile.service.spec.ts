import { TestBed } from '@angular/core/testing';
import { LogfileService } from './logfile.service';

describe('LogfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogfileService = TestBed.get(LogfileService);
    expect(service).toBeTruthy();
  });
});
