// src/add.test.ts
import add from 'components/add';

describe('add tests', () => {
  it('should return 3', () => {
    expect(add(1, 2)).toBe(3);
  });
});
