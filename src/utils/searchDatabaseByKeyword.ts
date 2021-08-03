import { categoryList } from './categoryList';
import { isDayNotEmpty } from './isDayNotEmpty';
// eslint-disable-next-line
import { DatabaseEvent } from './types';

export const searchDatabaseByKeyword = (eventLibrary: any, keyword: string) => {
  // iterate over each day, each day's category, each day's category's list of events,
  // see if this.state.searchValue is in the event's description
  // if it is, add that event to the "artificial" day that is created from search results (held as searchEventsResult)
  // this "day" is then passed to calendarDisplay, retaining all the functionality of a calendar day's events
  const searchEventsResult: any = {
    Revolution: [{ description: '' }],
    Rebellion: [{ description: '' }],
    Labor: [{ description: '' }],
    Birthdays: [{ description: '' }],
    Assassinations: [{ description: '' }],
    Other: [{ description: '' }],
  };

  const everyDayString: string[] = Object.keys(eventLibrary);

  const lowerSearchValue = keyword.toLowerCase();
  // iterate through each day
  for (let i = 0; i < everyDayString.length; i++) {
    const day: any = eventLibrary[everyDayString[i]];
    // if day has no entries, increment count by one
    for (let j = 0; j < categoryList.length; j++) {
      for (let k = 0; k < day[categoryList[j]].length; k++) {
        // finally, we arrive at a specific event object - check to see if searchText in event's description prop
        const lowerDescription =
          day[categoryList[j]][k].description.toLowerCase();
        if (lowerDescription.includes(lowerSearchValue)) {
          // if the search term is included, add the event to the results class variable
          // searchEventsResult.push(day[categoryList[j]][k]);
          // if the list of events under the given category is just a placeholder (i.e., description: ''), then overwrite it; else, append to end of list
          if (!searchEventsResult[categoryList[j]][0].description) {
            searchEventsResult[categoryList[j]][0] = day[categoryList[j]][k];
          } else {
            searchEventsResult[categoryList[j]].push(day[categoryList[j]][k]);
          }
        }
      }
      // if iteration is on last day, sort each category events by title, alphabetically
      if (everyDayString[i] === '12-31') {
        searchEventsResult[categoryList[j]].sort(
          (a: DatabaseEvent, b: DatabaseEvent) => {
            if (a.title > b.title) {
              return 1;
            }
            return -1;
          },
        );
      }
    }
  }
  return {
    searchEventsResult,
    dayHasEvents: isDayNotEmpty(searchEventsResult),
  };
};
