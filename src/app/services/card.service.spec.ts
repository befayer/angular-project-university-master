import { TestBed } from '@angular/core/testing';

import {DocumentService} from "./document.service";
import {CardService} from "./card.service";

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
