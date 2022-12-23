import {Pipe, PipeTransform} from '@angular/core';
import {Client} from "../../entities/Client";
import {Currency} from "../../entities/Currency";

@Pipe({
  name: 'accountCurrencyPipe'
})
export class AccountCurrencyPipePipe implements PipeTransform {

  transform(value: number, currencies: Currency[]): string | undefined {
    return currencies?.find(currency => currency.id == value)?.currencyName;
  }
}
