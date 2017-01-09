/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PivotalService } from './pivotal.service';

describe('Service: Pivotal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PivotalService]
    });
  });

  it('should ...', inject([PivotalService], (service: PivotalService) => {
    expect(service).toBeTruthy();
  }));
});
