import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Client} from "../../entities/Client";
import {DocumentType} from "../../entities/DocumentType";
import {DocumentService} from "../../services/document.service";
import * as moment from "moment/moment";

@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.css']
})
export class DocumentDialogComponent implements OnInit {
  form: FormGroup;
  actionBtn: string = "Добавить";
  submitClick: boolean = false;
  clients!: Client[];
  documentTypes!: DocumentType[];
  maxDate: any = moment();

  constructor(
    public dialogRef: MatDialogRef<DocumentDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private documentService: DocumentService) {
    this.form = this.fb.group({
      dateStart: [null, [Validators.required]],
      issueOrganization: [null, [Validators.required]],
      isActive: [null, [Validators.required]],
      documentTypeId: [null],
      clientId: [null]
    });
  }

  ngOnInit(): void {
    this.clients = this.data[0];
    this.documentTypes = this.data[1];
    if (this.data[2]) {
      this.actionBtn = "Изменить";
      this.form.controls["dateStart"].setValue(this.data[2].dateStart);
      this.form.controls["issueOrganization"].setValue(this.data[2].issueOrganization);
      this.form.controls["isActive"].setValue(this.data[2].isActive);
      this.form.controls["documentTypeId"].setValue(this.data[2].documentTypeId);
      this.form.controls["clientId"].setValue(this.data[2].clientId);
    }
  }

  onSubmit(): void {
    if (!this.data[2]) {
      this.addData();
    } else {
      this.updateData();
    }
  }

  addData() {
    this.documentService.createDocument(this.form.value).subscribe({
      next: () => {
        alert("Запись успешно добавлена!");
        this.submitClick = true;
        //this.form.reset();
        //this.dialogRef.close("save");
      },
      error: err => {
        alert("Ошибка добавления записи! " + err.message);
      }
    });
  }

  updateData() {
    this.documentService.updateDocument(this.data[2].id, this.form.value).subscribe(
      {
        next: () => {
          alert("Запись успешно обновлена!");
          this.submitClick = true;
          //this.form.reset();
          //this.dialogRef.close("update");
        },
        error: err => {
          alert("Ошибка обновления записи! " + err.message);
        }
      });
  }

  onClose() {
    this.dialogRef.close(this.submitClick);
  }
}
