import { validateDayString } from '../validateDayString';

describe('validateDayString', () => {
  it('validates strings as expected', () => {
    // dayString are passed via query param
    expect(validateDayString('1-2')).toBeTruthy();
    expect(validateDayString('11-22')).toBeTruthy();
    // weird numbers
    expect(validateDayString('03-22')).toBeFalsy();
    expect(validateDayString('10-02')).toBeFalsy();
    expect(validateDayString('1444444')).toBeFalsy();
    expect(validateDayString('155-55')).toBeFalsy();
    expect(validateDayString('88-88')).toBeFalsy();
    expect(validateDayString('99-9')).toBeFalsy();
    expect(validateDayString('5-40')).toBeFalsy();
    // letters
    expect(validateDayString('a-b')).toBeFalsy();
    expect(validateDayString('rr-="')).toBeFalsy();
    expect(validateDayString('asdf')).toBeFalsy();
    expect(validateDayString('vc')).toBeFalsy();
    // injection attacks
    expect(validateDayString('npm run start')).toBeFalsy();
    expect(validateDayString('rm -rf')).toBeFalsy();
    expect(validateDayString('<script>nonsense</script>')).toBeFalsy();
  });
});
