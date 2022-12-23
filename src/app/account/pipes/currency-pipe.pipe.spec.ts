import {AccountClientPipePipe} from './client-pipe.pipe';
import {AccountCurrencyPipePipe} from "./currency-pipe.pipe";

describe('accountCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new AccountCurrencyPipePipe();
    expect(pipe).toBeTruthy();
  });
});
