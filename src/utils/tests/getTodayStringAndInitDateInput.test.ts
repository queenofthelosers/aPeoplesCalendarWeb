import { getTodayStringAndInitDateInput } from '../getTodayStringAndInitDateInput';

describe('getTodayStringAndInitDateInput', () => {
  let mockDate: any;
  let spy: any;
  beforeEach(() => {
    mockDate = new Date(1466424490000);
    spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  });
  afterEach(() => {
    spy.mockRestore();
  });
  it('returns as expected', () => {
    const { initTodayString, initDateInput } = getTodayStringAndInitDateInput();
    expect(initTodayString).toEqual('6-20');
    expect(initDateInput).toEqual('2016-06-20');
  });
});
