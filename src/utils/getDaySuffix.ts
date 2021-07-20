export const getDaySuffix = (num: string): string => {
    const array = (`${num}`).split('').reverse(); // E.g. 123 = array("3","2","1")
    if (array[1] !== '1') { // Number is in the teens
      switch (array[0]) {
        case '1': return 'st';
        case '2': return 'nd';
        case '3': return 'rd';
        default: break;
      }
    }
    return 'th';
};
