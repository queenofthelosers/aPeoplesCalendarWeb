import { calculateHamburgerPosition } from '../calculateHamburgerPosition';

describe('calculateHamburgerPosition', () => {
  it('returns as expected', () => {
    const firstResult = calculateHamburgerPosition(200);
    expect(firstResult).toEqual(63);
    const secondResult = calculateHamburgerPosition(900);
    expect(secondResult).toEqual(163);
  });
});
