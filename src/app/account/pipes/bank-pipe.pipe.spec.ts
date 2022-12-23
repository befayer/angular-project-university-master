import {AccountBankPipePipe} from "./bank-pipe.pipe";

describe('accountBankPipe', () => {
  it('create an instance', () => {
    const pipe = new AccountBankPipePipe();
    expect(pipe).toBeTruthy();
  });
});
