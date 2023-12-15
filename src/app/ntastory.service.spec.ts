import { TestBed } from '@angular/core/testing';

import { NTAStoryService } from './ntastory.service';

describe('NTAStoryService', () => {
  let service: NTAStoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NTAStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
