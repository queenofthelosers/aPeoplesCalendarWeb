/* eslint-disable */
export const validateDayString = (dayString: string): boolean => {
  // regex for non-zero padded MM-DD, e.g. 1-4, 12-5, 11-12, etc.
  // sorry
  const regChecker = new RegExp(
    /(^(1|3|5|7|8|10|12)-(([1-2]?[1-9])|10|20|3[0-1]))$|(^(4|6|9|11)-(([1-2]?[1-9])|10|20|30))$|(^2-([1-2]?[1-9]|10|20))$/,
    'i',
  );
  return regChecker.test(dayString);
};
