import { findEventByTitle } from '../findEventByTitle';
import { mockedEventLibrary } from '../../testMocks/mockEventLibrary';

describe('findEventByTitle', () => {
  it('returns when found', () => {
    const expectedResult = {
      matched: true,
      searchEventsResult: {
        Revolution: [{ description: '' }],
        Rebellion: [{ description: '' }],
        Labor: [{ description: '' }],
        Birthdays: [
          { title: 'February 2nd Birthdays testTitle', description: '' },
        ],
        Assassinations: [{ description: '' }],
        Other: [{ description: '' }],
      },
    };
    expect(
      findEventByTitle(mockedEventLibrary, 'february-2nd-birthdays-testtitle'),
    ).toEqual(expectedResult);
  });
  it('returns when no events found', () => {
    const expectedResult = {
      matched: false,
      searchEventsResult: {
        Revolution: [{ description: '' }],
        Rebellion: [{ description: '' }],
        Labor: [{ description: '' }],
        Birthdays: [{ description: '' }],
        Assassinations: [{ description: '' }],
        Other: [{ description: '' }],
      },
    };
    expect(findEventByTitle(mockedEventLibrary, 'shouldNotFindTitle')).toEqual(
      expectedResult,
    );
  });
});
