import {Pipe, PipeTransform} from '@angular/core';
import {Client} from "../../entities/Client";
import {Bank} from "../../entities/Bank";

@Pipe({
  name: 'accountBankPipe'
})
export class AccountBankPipePipe implements PipeTransform {

  transform(value: number, banks: Bank[]): string | undefined {
    return banks?.find(bank => bank.id == value)?.terbankName;
  }
}
