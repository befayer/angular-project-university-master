import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Client} from "../../entities/Client";
import {DocumentType} from "../../entities/DocumentType";
import {DocumentService} from "../../services/document.service";
import * as moment from "moment/moment";
import {Account} from "../../entities/Account";
import {CardService} from "../../services/card.service";

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent implements OnInit {
  form: FormGroup;
  actionBtn: string = "Добавить";
  submitClick: boolean = false;
  accounts!: Account[];
  maxDate: any = moment();

  constructor(
    public dialogRef: MatDialogRef<CardDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private cardService: CardService) {
    this.form = this.fb.group({
      accountId: [null],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      cvc: [null, [Validators.required]],
      balance: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.accounts = this.data[0];
    if (this.data[1]) {
      this.actionBtn = "Изменить";
      this.form.controls["accountId"].setValue(this.data[1].accountId);
      this.form.controls["dateStart"].setValue(this.data[1].dateStart);
      this.form.controls["dateEnd"].setValue(this.data[1].dateEnd);
      this.form.controls["cvc"].setValue(this.data[1].cvc);
      this.form.controls["balance"].setValue(this.data[1].balance);
      this.form.controls["status"].setValue(this.data[1].status);
    }
  }

  onSubmit(): void {
    if (!this.data[1]) {
      this.addData();
    } else {
      this.updateData();
    }
  }

  addData() {
    this.cardService.createCard(this.form.value).subscribe({
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
    this.cardService.updateCard(this.data[1].id, this.form.value).subscribe(
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
