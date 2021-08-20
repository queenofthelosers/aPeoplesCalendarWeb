import { validateDayString } from '../validateDayString';

describe('validateDayString', () => {
  it('validates strings as expected', () => {
    expect(validateDayString('1-2')).toBeTruthy();
  });
});
