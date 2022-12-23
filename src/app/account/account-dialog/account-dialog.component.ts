import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Client} from "../../entities/Client";
import {DocumentType} from "../../entities/DocumentType";
import {DocumentService} from "../../services/document.service";
import * as moment from "moment/moment";
import {Bank} from "../../entities/Bank";
import {Currency} from "../../entities/Currency";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.css']
})
export class AccountDialogComponent implements OnInit {
  form: FormGroup;
  actionBtn: string = "Добавить";
  submitClick: boolean = false;
  banks!: Bank[];
  currencies!: Currency[];
  clients!: Client[];
  maxDate: any = moment();

  constructor(
    public dialogRef: MatDialogRef<AccountDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private accountService: AccountService) {
    this.form = this.fb.group({
      accountStatus: [null, [Validators.required]],
      balance: [null, [Validators.required]],
      bankId: [null],
      currencyId: [null],
      clientId: [null]
    });
  }

  ngOnInit(): void {
    this.banks = this.data[0];
    this.currencies = this.data[1];
    this.clients = this.data[2];
    if (this.data[3]) {
      this.actionBtn = "Изменить";
      this.form.controls["accountStatus"].setValue(this.data[3].accountStatus);
      this.form.controls["balance"].setValue(this.data[3].balance);
      this.form.controls["bankId"].setValue(this.data[3].bankId);
      this.form.controls["currencyId"].setValue(this.data[3].currencyId);
      this.form.controls["clientId"].setValue(this.data[3].clientId);
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
    this.accountService.createAccount(this.form.value).subscribe({
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
    this.accountService.updateAccount(this.data[3].id, this.form.value).subscribe(
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
