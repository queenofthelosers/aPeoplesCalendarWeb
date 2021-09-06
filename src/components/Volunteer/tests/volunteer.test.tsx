import React from 'react';
import { render } from '@testing-library/react';
import { Volunteer } from '../volunteer';

describe('Volunteer', () => {
  it('renders text', () => {
    const { queryByText } = render(<Volunteer />);
    expect(
      queryByText(
        'Whether you are a history buff, a developer with feature ideas, or are just someone',
        { exact: false },
      ),
    ).toBeTruthy();
    expect(
      queryByText(
        'Notice an important figure or event missing from the calendar?',
      ),
    ).toBeTruthy();
    expect(
      queryByText('Have a different way to help? Feel free to contact us via', {
        exact: false,
      }),
    ).toBeTruthy();
  });
});
