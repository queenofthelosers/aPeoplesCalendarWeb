import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../about';

describe('About', () => {
  it('renders text', () => {
    const { queryByText } = render(<About />);
    expect(
      queryByText(
        `A People's Calendar (aPC) is a project that seeks to promote the`,
        { exact: false },
      ),
    ).toBeTruthy();
    expect(
      queryByText(
        `The inspiration to make the calendar came from historian Howard Zinn's`,
        { exact: false },
      ),
    ).toBeTruthy();
    expect(
      queryByText('While not comprehensive, it is our hope', {
        exact: false,
      }),
    ).toBeTruthy();
  });
});
