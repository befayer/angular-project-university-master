import {ClientPipePipe} from './client-pipe.pipe';
import {DocumentTypePipe} from "./document-type-pipe.pipe";

describe('DocumentTypePipe', () => {
  it('create an instance', () => {
    const pipe = new DocumentTypePipe();
    expect(pipe).toBeTruthy();
  });
});
