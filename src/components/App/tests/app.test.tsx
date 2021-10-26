import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from '../App';
import { mockedEventLibrary } from '../../../testMocks/mockEventLibrary';

let mockDateGetter: any;

jest.mock('../../../utils/getTodayStringAndInitDateInput', () => {
  mockDateGetter = jest.fn(() => {
    return { initTodayString: '1-1', initDateInput: '2020-01-01' };
  });

  return {
    __esModule: true,
    getTodayStringAndInitDateInput: mockDateGetter,
  };
});

describe('App', () => {
  let mockFetch: any;
  beforeEach(() => {
    mockFetch = jest.fn().mockResolvedValue(mockedEventLibrary);
    const responseObj = {
      json: mockFetch as unknown as Response,
    } as unknown as Response;
    global.fetch = jest.fn().mockImplementation(() => responseObj);
    // jest.spyOn(global, 'fetch').mockResolvedValue(responseObj);
  });
  it('renders, fetches', async () => {
    const { container } = render(<App />);
    expect(container).toBeDefined();
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
    expect(mockDateGetter).toHaveBeenCalledTimes(1);
  });
});
