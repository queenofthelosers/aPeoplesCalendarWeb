// eslint-disable-next-line
import { DayOfEvents } from './types';

export const isDayNotEmpty = (day: DayOfEvents): boolean => {
  return (
    !!day.Revolution[0].description ||
    !!day.Rebellion[0].description ||
    !!day.Birthdays[0].description ||
    !!day.Labor[0].description ||
    !!day.Assassinations[0].description ||
    !!day.Other[0].description
  );
};
