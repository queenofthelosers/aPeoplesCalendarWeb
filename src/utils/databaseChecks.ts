/* eslint-disable */

export async function databaseChecks(db: any): Promise<void> {
  const everyDayString = Object.keys(db);
  const oneEventDays: string[] = [];
  let emptyCount = 0;
  let totalEventsCount = 0;
  let singleEventCount = 0;
  let dayEventsCount;
  for (let i = 0; i < everyDayString.length; i++) {
    const day = db[everyDayString[i]];
    dayEventsCount = 0;
    // if day has no entries, increment count by one
    if (
      !day['Revolution'][0].description &&
      !day['Rebellion'][0].description &&
      !day['Labor'][0].description &&
      !day['Birthdays'][0].description &&
      !day['Assassinations'][0].description &&
      !day['Other'][0].description
    ) {
      emptyCount++;
    } else {
      if (day['Revolution'][0].description) {
        totalEventsCount += day['Revolution'].length;
        dayEventsCount += day['Revolution'].length;
      }
      if (day['Rebellion'][0].description) {
        totalEventsCount += day['Rebellion'].length;
        dayEventsCount += day['Rebellion'].length;
      }
      if (day['Labor'][0].description) {
        totalEventsCount += day['Labor'].length;
        dayEventsCount += day['Labor'].length;
      }
      if (day['Birthdays'][0].description) {
        totalEventsCount += day['Birthdays'].length;
        dayEventsCount += day['Birthdays'].length;
      }
      if (day['Assassinations'][0].description) {
        totalEventsCount += day['Assassinations'].length;
        dayEventsCount += day['Assassinations'].length;
      }
      if (day['Other'][0].description) {
        totalEventsCount += day['Other'].length;
        dayEventsCount += day['Other'].length;
      }
      if (dayEventsCount === 1) {
        singleEventCount++;
        oneEventDays.push(everyDayString[i]);
      }
    }
  }
  console.log('amount of events: ' + totalEventsCount);
  console.log('amount of single event days: ' + singleEventCount);
  console.log(oneEventDays);
};
