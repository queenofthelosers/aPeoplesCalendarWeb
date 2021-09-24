import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FullNavBar } from '../fullNavBar';

describe('NotFound', () => {
  it('renders text and social media icons', () => {
    const { queryByText, queryByTestId } = render(
      <Router>
        <FullNavBar windowWidth={1000} />
      </Router>,
    );
    expect(queryByText('aPC')).toBeTruthy();
    expect(queryByText('Volunteer')).toBeTruthy();
    expect(queryByText('Calendar')).toBeTruthy();
    expect(queryByText('About')).toBeTruthy();
    // renders social media icons
    expect(queryByTestId('twitterIcon')).toBeTruthy();
    expect(queryByTestId('redditIcon')).toBeTruthy();
    expect(queryByTestId('emailIcon')).toBeTruthy();
    expect(queryByTestId('mobileStoreIcon')).toBeTruthy();
  });
});
