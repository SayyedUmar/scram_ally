import { TestBed } from '@angular/core/testing';
import { DiagnosticCheckService } from './diagnostic-check.service';

describe('DiagnosticCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiagnosticCheckService = TestBed.get(DiagnosticCheckService);
    expect(service).toBeTruthy();
  });
});
