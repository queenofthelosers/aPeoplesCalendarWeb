import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HomepageComponent, IHomepageProps } from '../homepageComponent';
import { mockedEventLibrary } from '../../../testMocks/mockEventLibrary';

let mockDateGetter: any;

jest.mock('../../../utils/getTodayStringAndInitDateInput', () => {
  mockDateGetter = jest.fn(() => {
    return { initTodayString: '1-1' };
  });

  return {
    __esModule: true,
    getTodayStringAndInitDateInput: mockDateGetter,
  };
});

describe('HomepageComponent', () => {
  let props: IHomepageProps;
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
    const loadingProps = {
      ...props,
      loading: true,
      eventLibrary: undefined,
    };
    const { queryByText, queryByTestId } = render(
      <Router>
        <HomepageComponent {...loadingProps} />
      </Router>,
    );
    // still shows text while loading
    expect(
      queryByText(
        `Inspired by Howard Zinn's work "A People's History of the United States",`,
        { exact: false },
      ),
    ).toBeTruthy();
    expect(queryByText(`A People's Calendar`)).toBeTruthy();
    expect(queryByText(`To the Calendar`)).toBeTruthy();
    expect(queryByText(`Event of the Day`)).toBeTruthy();
    // loading skeleton
    expect(queryByTestId('homepageLoadingSkeleton')).toBeTruthy();
    // doesn't call date getter
    expect(mockDateGetter).toHaveBeenCalledTimes(0);
  });
  it('renders with data', () => {
    const { queryByText, queryByTestId } = render(
      <Router>
        <HomepageComponent {...props} />
      </Router>,
    );
    // shows text
    expect(
      queryByText(
        `Inspired by Howard Zinn's work "A People's History of the United States",`,
        { exact: false },
      ),
    ).toBeTruthy();
    expect(queryByText(`A People's Calendar`)).toBeTruthy();
    expect(queryByText(`To the Calendar`)).toBeTruthy();
    expect(queryByText(`Event of the Day`)).toBeTruthy();
    // doesn't show loading skeleton
    expect(queryByTestId('homepageLoadingSkeleton')).toBeFalsy();
    // calls date getter
    expect(mockDateGetter).toHaveBeenCalledTimes(1);
    // shows longest event from eventDatabase day
    expect(queryByText('qwer')).toBeTruthy();
    expect(queryByText('testKeyword rebellion')).toBeTruthy();
    // need to set up process.env mocking for img url
    // https://stackoverflow.com/questions/48033841/test-process-env-with-jest
    // expect(queryByTestId('homepageImage')).toBeTruthy();
    // click on copy link button
    expect(queryByText('Copy link')).toBeTruthy();
    expect(queryByText('Link copied!')).toBeFalsy();
    const copyButton = queryByTestId('clickableCopy') as HTMLElement;
    expect(copyButton).toBeTruthy();
    copyButton.click();
    // await waitFor(() => {
    expect(queryByText('Link copied!')).toBeTruthy();
    // });
    expect(queryByText('Copy link')).toBeFalsy();
  });
});
