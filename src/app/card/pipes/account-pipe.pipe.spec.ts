import {AccountPipePipe} from './account-pipe.pipe';

describe('accountPipe', () => {
  it('create an instance', () => {
    const pipe = new AccountPipePipe();
    expect(pipe).toBeTruthy();
  });
});
