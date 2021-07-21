interface Results {
    initTodayString: string;
    initDateInput: string;
}

export const getTodayStringAndInitDateInput = (): Results => {
  const now = new Date();
  let month = (now.getMonth() + 1).toString();
  let day = (now.getDate()).toString();
  const initTodayString = `${month}-${day}`;
  const year = now.getFullYear();
  if (month.toString().length === 1) {
    month = `0${month}`;
  }
  if (day.toString().length === 1) {
    day = `0${day}`;
  }
  // placeholder for date input:
  const initDateInput = `${year}-${month}-${day}`;
  // for the actual getting of data:
  return {
    initTodayString,
    initDateInput,
  };
};
