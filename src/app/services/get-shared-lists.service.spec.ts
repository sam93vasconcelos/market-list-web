import { TestBed } from '@angular/core/testing';

import { GetSharedListsService } from './get-shared-lists.service';

describe('GetSharedListsService', () => {
  let service: GetSharedListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSharedListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
