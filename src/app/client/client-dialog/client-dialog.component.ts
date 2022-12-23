import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as moment from "moment";
import {Client} from "../../entities/Client";
import {ClientService} from "../../services/client.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.css']
})
export class ClientDialogComponent implements OnInit {
  form: FormGroup;
  actionBtn: string = "Добавить";
  submitClick: boolean = false;
  maxDate: any = moment().subtract(10, 'years');

  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: Client,
    private clientService: ClientService) {
    this.form = this.fb.group({
      firstName: [null, [Validators.required]],
      secondName: [null, [Validators.required]],
      patronymic: [null, [Validators.required]],
      birthday: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.editData) {
      this.actionBtn = "Изменить";
      this.form.controls["firstName"].setValue(this.editData.firstName);
      this.form.controls["secondName"].setValue(this.editData.secondName);
      this.form.controls["patronymic"].setValue(this.editData.patronymic);
      this.form.controls["birthday"].setValue(this.editData.birthday);
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
    this.clientService.createClient(this.form.value).subscribe({
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
    this.clientService.updateClient(this.editData.id, this.form.value).subscribe(
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
