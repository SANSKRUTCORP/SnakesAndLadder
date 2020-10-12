import { TestBed } from '@angular/core/testing';

import { MemoryRoomsService } from './memory-rooms.service';

describe('MemoryRoomsService', () => {
  let service: MemoryRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoryRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
