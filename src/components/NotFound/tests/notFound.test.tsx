import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { NotFound } from '../notFound';

describe('NotFound', () => {
  it('renders text and button', () => {
    const { queryByTestId, queryByText } = render(
      <Router>
        <NotFound />
      </Router>,
    );
    expect(queryByTestId('searchTheCalendarButton')).toBeTruthy();
    expect(
      queryByText("Sorry, looks like the url you tried didn't work for us."),
    ).toBeTruthy();
    expect(queryByText('Try searching the calendar')).toBeTruthy();
  });
});
