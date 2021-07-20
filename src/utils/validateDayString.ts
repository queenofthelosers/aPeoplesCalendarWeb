export const validateDayString = (dayString: string): boolean => {
    const regChecker = new RegExp(/(^(1|3|5|7|8|10|12)-(([1-2]?[1-9])|10|20|3[0-1]))$|(^(4|6|9|11)-(([1-2]?[1-9])|10|20|30))$|(^2-([1-2]?[1-9]|10|20))$/, 'i');
    return regChecker.test(dayString);
};
