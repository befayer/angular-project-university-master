import { TestBed } from '@angular/core/testing';

import {Currency} from "../entities/Currency";
import {CurrencyService} from "./currency.service";

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
