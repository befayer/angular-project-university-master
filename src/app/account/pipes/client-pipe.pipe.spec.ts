import {AccountClientPipePipe} from './client-pipe.pipe';

describe('accountClientPipe', () => {
  it('create an instance', () => {
    const pipe = new AccountClientPipePipe();
    expect(pipe).toBeTruthy();
  });
});
