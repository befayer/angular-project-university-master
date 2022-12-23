import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as moment from "moment";
import {DocumentTypeService} from "../../services/document-type.service";
import {DocumentType} from "../../entities/DocumentType";
import {CurrencyService} from "../../services/currency.service";
import {Currency} from "../../entities/Currency";

@Component({
  selector: 'app-dialog',
  templateUrl: './currency-dialog.component.html',
  styleUrls: ['./currency-dialog.component.css']
})
export class CurrencyDialogComponent implements OnInit {
  form: FormGroup;
  actionBtn: string = "Добавить";
  submitClick: boolean = false;
  maxDate: any = moment().subtract(10, 'years');

  constructor(
    public dialogRef: MatDialogRef<CurrencyDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: Currency,
    private currencyService: CurrencyService) {
    this.form = this.fb.group({
      currencyName: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.editData) {
      this.actionBtn = "Изменить";
      this.form.controls["currencyName"].setValue(this.editData.currencyName);
    }
  }

  onSubmit(): void {
    if (!this.editData) {
      this.addData();
    } else {
      this.updateData();
    }
  }

  addData() {
    this.currencyService.createCurrency(this.form.value).subscribe({
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
    this.currencyService.updateCurrency(this.editData.id, this.form.value).subscribe(
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
