import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDialogComponent } from './bank-dialog.component';

describe('DialogComponent', () => {
  let component: BankDialogComponent;
  let fixture: ComponentFixture<BankDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
