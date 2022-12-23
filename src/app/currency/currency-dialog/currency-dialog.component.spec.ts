import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDialogComponent } from './currency-dialog.component';

describe('DialogComponent', () => {
  let component: CurrencyDialogComponent;
  let fixture: ComponentFixture<CurrencyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
