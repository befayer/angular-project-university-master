import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Bank} from "../../entities/Bank";
import * as moment from "moment";
import {BankService} from "../../services/bank.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './bank-dialog.component.html',
  styleUrls: ['./bank-dialog.component.css']
})
export class BankDialogComponent implements OnInit {
  form: FormGroup;
  actionBtn: string = "Добавить";
  submitClick: boolean = false;
  maxDate: any = moment().subtract(10, 'years');

  constructor(
    public dialogRef: MatDialogRef<BankDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: Bank,
    private bankService: BankService) {
    this.form = this.fb.group({
      terbankName: [null, [Validators.required]],
      bik: [null, [Validators.required]],
      city: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.editData) {
      this.actionBtn = "Изменить";
      this.form.controls["terbankName"].setValue(this.editData.terbankName);
      this.form.controls["bik"].setValue(this.editData.bik);
      this.form.controls["city"].setValue(this.editData.city);
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
    this.bankService.createBank(this.form.value).subscribe({
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
    this.bankService.updateBank(this.editData.id, this.form.value).subscribe(
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
