import { TestBed } from '@angular/core/testing';

import { MemoryCreateroomService } from './memory-createroom.service';

describe('MemoryCreateroomService', () => {
  let service: MemoryCreateroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoryCreateroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
