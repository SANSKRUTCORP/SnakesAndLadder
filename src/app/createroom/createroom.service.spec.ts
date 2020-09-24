import { TestBed } from '@angular/core/testing';

import { CreateroomService } from './createroom.service';

describe('CreateroomService', () => {
  let service: CreateroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
