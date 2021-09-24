import React from 'react';
import { render } from '@testing-library/react';
import { EmptyDay } from '../emptyDayComponent';

describe('EmptyDay', () => {
  it('renders text when not search', () => {
    const { queryByText } = render(<EmptyDay displaySearch={false} />);
    expect(
      queryByText("Looks like we don't have any entries for this day yet."),
    ).toBeTruthy();
    expect(queryByText('Make an event suggestion')).toBeTruthy();
  });
  it('renders text when search', () => {
    const { queryByText } = render(<EmptyDay displaySearch={true} />);
    expect(
      queryByText("Looks like we don't have any entries that matched your search query."),
    ).toBeTruthy();
    expect(queryByText('Suggest a missing person or event')).toBeTruthy();
  });
});
