import {Pipe, PipeTransform} from '@angular/core';
import {Client} from "../../entities/Client";
import {Account} from "../../entities/Account";

@Pipe({
  name: 'accountPipe'
})
export class AccountPipePipe implements PipeTransform {

  transform(value: number, accounts: Account[]): number | undefined {
    return accounts?.find(account => account.id == value)?.id;
  }
}
