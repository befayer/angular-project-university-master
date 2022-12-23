import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeDialogComponent } from './document-type-dialog.component';

describe('DialogComponent', () => {
  let component: DocumentTypeDialogComponent;
  let fixture: ComponentFixture<DocumentTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTypeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
