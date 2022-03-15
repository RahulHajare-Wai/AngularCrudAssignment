import { AgeCountPipe } from './age-count.pipe';

describe('AgeCountPipe', () => {
  it('create an instance', () => {
    const pipe = new AgeCountPipe();
    expect(pipe).toBeTruthy();
  });
});
