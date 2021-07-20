import { eventLibrary } from "../eventLibrary";
import { categoryList } from "./categoryList";
import { stringToSlug } from "./stringToSlug";

export const findEventByTitle = (title: string) => {
    // 1-1, 1-2, 1-3, etc.
    const everyDayString: string[] = Object.keys(eventLibrary);

    const searchEventsResult: any = {
      Revolution: [{ description: '' }],
      Rebellion: [{ description: '' }],
      Labor: [{ description: '' }],
      Birthdays: [{ description: '' }],
      Assassinations: [{ description: '' }],
      Other: [{ description: '' }],
    };

    // necessary iteration to get to individual day from eventLibrary:
    for (let i = 0; i < everyDayString.length; i++) {
      const day: any = eventLibrary[everyDayString[i]];
      // if day has no entries, increment count by one
      for (let j = 0; j < categoryList.length; j++) {
        for (let k = 0; k < day[categoryList[j]].length; k++) {
          // finally, we arrive at a specific event object - check to see if slugified title matches slug we are searching for
          const slugTitle = stringToSlug(day[categoryList[j]][k].title);
          if (slugTitle === title) {
            // if so, add it to the searchEventsResult object
            searchEventsResult[categoryList[j]][0] = day[categoryList[j]][k];
            // we can safely assume titles are unique, so if we find a match, we can assign the result to state and stop searching
            return {
              searchEventsResult,
              matched: true,
            };
          }
        };
      };
    };
    // if we didn't find anything
    return {
      searchEventsResult,
      matched: false,
    };
};