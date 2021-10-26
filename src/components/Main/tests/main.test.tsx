import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Router from "react-router-dom";
import { Main, IMainProps } from '../main';
import { mockedEventLibrary } from '../../../testMocks/mockEventLibrary';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

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

// still need to test input changes

describe('Main', () => {
  let props: IMainProps;
  beforeEach(() => {
    props = {
      winDim: {
        width: 1000,
        height: 1000,
      },
      loading: false,
      eventLibrary: mockedEventLibrary,
    };
    jest.clearAllMocks();
  });
  it('renders when loading', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ day: '', event_: '' });
    const loadingProps = {
      ...props,
      loading: true,
      eventLibrary: undefined,
    };
    const { queryByTestId } = render(
      <Router.BrowserRouter>
        <Main {...loadingProps} />
      </Router.BrowserRouter>,
    );
    // loading skeleton
    expect(queryByTestId('calendarLoadingDivs')).toBeTruthy();
    // inputs not present
    expect(queryByTestId('datePickerWrapper')).toBeFalsy();
    expect(queryByTestId('searchWrapper')).toBeFalsy();
  });
  it('with no params, redirects to "today"', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ day: '', event_: '' });
    const { queryByText, queryByTestId } = render(
      <Router.BrowserRouter>
        <Main {...props} />
      </Router.BrowserRouter>,
    );
    // loading skeleton absent
    expect(queryByTestId('calendarLoadingDivs')).toBeFalsy();
    // inputs present
    expect(queryByTestId('datePickerWrapper')).toBeTruthy();
    expect(queryByTestId('searchWrapper')).toBeTruthy();
    // event components rendered
    expect(queryByText('Revolution')).toBeTruthy();
    expect(queryByText('Rebellion')).toBeTruthy();
    expect(queryByText('January 1st Revolution blah')).toBeTruthy();
    expect(queryByText('January 1st Revolution testKeyword')).toBeTruthy();
    expect(queryByText('January 1st Rebellion asdf')).toBeTruthy();
    expect(queryByText('January 1st Rebellion unusedKeyword')).toBeTruthy();
    expect(queryByText('January 1st Rebellion qwer')).toBeTruthy();
    expect(queryByText('January 1st Rebellion testKeyword')).toBeTruthy();
    // today fetcher
    expect(mockDateGetter).toHaveBeenCalledTimes(1);
  });
  it('with no params, redirects to "today"', () => {
    const { queryByText, queryByTestId } = render(
      <Router.BrowserRouter>
        <Main {...props} />
      </Router.BrowserRouter>,
    );
    // loading skeleton absent
    expect(queryByTestId('calendarLoadingDivs')).toBeFalsy();
    // inputs present
    expect(queryByTestId('datePickerWrapper')).toBeTruthy();
    expect(queryByTestId('searchWrapper')).toBeTruthy();
    // event components rendered
    expect(queryByText('Revolution')).toBeTruthy();
    expect(queryByText('Rebellion')).toBeTruthy();
    expect(queryByText('January 1st Revolution blah')).toBeTruthy();
    expect(queryByText('January 1st Revolution testKeyword')).toBeTruthy();
    expect(queryByText('January 1st Rebellion asdf')).toBeTruthy();
    expect(queryByText('January 1st Rebellion unusedKeyword')).toBeTruthy();
    expect(queryByText('January 1st Rebellion qwer')).toBeTruthy();
    expect(queryByText('January 1st Rebellion testKeyword')).toBeTruthy();
    // today fetcher
    expect(mockDateGetter).toHaveBeenCalledTimes(1);
  });
  it('with invalid day param, 404s', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ day: '1234-1' });
    const { queryByTestId } = render(
      <Router.BrowserRouter>
        <Main {...props} />
      </Router.BrowserRouter>,
    );
    // loading skeleton absent
    expect(queryByTestId('calendarLoadingDivs')).toBeFalsy();
    // inputs absent
    expect(queryByTestId('datePickerWrapper')).toBeFalsy();
    expect(queryByTestId('searchWrapper')).toBeFalsy();
    // today fetcher
    expect(mockDateGetter).toHaveBeenCalledTimes(1);
  });
  it('with day param, looks up events', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ day: '1-1' });
    const { queryByText, queryByTestId } = render(
      <Router.BrowserRouter>
        <Main {...props} />
      </Router.BrowserRouter>,
    );
    // loading skeleton absent
    expect(queryByTestId('calendarLoadingDivs')).toBeFalsy();
    // inputs present
    expect(queryByTestId('datePickerWrapper')).toBeTruthy();
    expect(queryByTestId('searchWrapper')).toBeTruthy();
    // event components rendered
    expect(queryByText('Revolution')).toBeTruthy();
    expect(queryByText('Rebellion')).toBeTruthy();
    expect(queryByText('January 1st Revolution blah')).toBeTruthy();
    expect(queryByText('January 1st Revolution testKeyword')).toBeTruthy();
    expect(queryByText('January 1st Rebellion asdf')).toBeTruthy();
    expect(queryByText('January 1st Rebellion unusedKeyword')).toBeTruthy();
    expect(queryByText('January 1st Rebellion qwer')).toBeTruthy();
    expect(queryByText('January 1st Rebellion testKeyword')).toBeTruthy();
    // today fetcher
    expect(mockDateGetter).toHaveBeenCalledTimes(0);
  });
  it('with event title, looks up events', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ event_: 'february-2nd-other' });
    const { queryByText, queryByTestId } = render(
      <Router.BrowserRouter>
        <Main {...props} />
      </Router.BrowserRouter>,
    );
    // loading skeleton absent
    expect(queryByTestId('calendarLoadingDivs')).toBeFalsy();
    // inputs present
    expect(queryByTestId('datePickerWrapper')).toBeTruthy();
    expect(queryByTestId('searchWrapper')).toBeTruthy();
    expect(queryByText('Search Results')).toBeTruthy();
    // event components rendered
    await waitFor(() => {
      expect(queryByText('Other')).toBeTruthy();
    });
    expect(queryByText('Rebellion')).toBeFalsy();
    expect(queryByText('February 2nd Other')).toBeTruthy();
    expect(queryByText('ope')).toBeTruthy();
    // today fetcher
    expect(mockDateGetter).toHaveBeenCalledTimes(0);
  });
  it('with search param, looks up events', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ day: '', event_: '' });
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(() => 'ope');
    const { queryByText, queryByTestId } = render(
      <Router.BrowserRouter>
        <Main {...props} />
      </Router.BrowserRouter>,
    );
    // loading skeleton absent
    expect(queryByTestId('calendarLoadingDivs')).toBeFalsy();
    // inputs present
    expect(queryByTestId('datePickerWrapper')).toBeTruthy();
    expect(queryByTestId('searchWrapper')).toBeTruthy();
    expect(queryByText('Search Results')).toBeTruthy();
    // event components rendered
    await waitFor(() => {
      expect(queryByText('Other')).toBeTruthy();
    });
    expect(queryByText('Rebellion')).toBeFalsy();
    expect(queryByText('February 2nd Other')).toBeTruthy();
    expect(queryByText('ope')).toBeTruthy();
    // today fetcher
    expect(mockDateGetter).toHaveBeenCalledTimes(0);
  });
});
