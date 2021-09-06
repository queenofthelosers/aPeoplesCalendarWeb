import { searchDatabaseByKeyword } from '../searchDatabaseByKeyword';
import { mockedEventLibrary } from './mockedConstants';

describe('searchDatabaseByKeyword', () => {
  it('finds terms as expected', () => {
    const expectedResult = {
      dayHasEvents: true,
      searchEventsResult: {
        Revolution: [
          { description: 'testKeyword', title: 'blah' },
          { description: 'testKeyword', title: '' },
        ],
        Rebellion: [{ description: 'testKeyword rebellion', title: '' }],
        Labor: [{ description: 'asdf testKeyword', title: '' }],
        Birthdays: [{ description: '' }],
        Assassinations: [{ description: '' }],
        Other: [{ description: '' }],
      },
    };
    expect(searchDatabaseByKeyword(mockedEventLibrary, 'testKeyword')).toEqual(
      expectedResult,
    );
  });
  it('returns as expected when no events found', () => {
    const expectedResult = {
      dayHasEvents: false,
      searchEventsResult: {
        Revolution: [{ description: '' }],
        Rebellion: [{ description: '' }],
        Labor: [{ description: '' }],
        Birthdays: [{ description: '' }],
        Assassinations: [{ description: '' }],
        Other: [{ description: '' }],
      },
    };
    expect(searchDatabaseByKeyword(mockedEventLibrary, 'should not return results')).toEqual(
      expectedResult,
    );
  });
});
