import { searchDatabaseByKeyword } from '../searchDatabaseByKeyword';
import { mockedEventLibrary } from '../../testMocks/mockEventLibrary';

describe('searchDatabaseByKeyword', () => {
  it('finds terms as expected', () => {
    const expectedResult = {
      dayHasEvents: true,
      searchEventsResult: {
        Revolution: [
          {
            description: 'January 1st Revolution testKeyword',
            title: 'January 1st Revolution blah',
          },
          {
            description: 'October 1st Revolution testKeyword',
            title: 'October 1st Revolution Event',
          },
        ],
        Rebellion: [
          {
            description: 'January 1st Rebellion testKeyword',
            title: 'January 1st Rebellion qwer',
            img: '../assets/howardZinnHeadshot.jpg',
          },
        ],
        Labor: [
          { description: 'asdf testKeyword', title: 'February 2nd Labor asdf' },
        ],
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
    expect(
      searchDatabaseByKeyword(mockedEventLibrary, 'should not return results'),
    ).toEqual(expectedResult);
  });
});
