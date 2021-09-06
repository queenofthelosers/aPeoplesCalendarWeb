import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { SmallNavBar } from '../smallNavBar';

describe('SmallNavBar', () => {
  it('renders, opens on click', () => {
    const { queryByTestId, queryByText } = render(
      <Router>
        <SmallNavBar windowWidth={750} />
      </Router>,
    );
    expect(queryByTestId('hamburgerIcon')).toBeTruthy();
    expect(queryByTestId('hamburgerMenu')).toBeFalsy();
    const hamburgerIcon = queryByTestId('hamburgerIcon') as HTMLElement;
    act(() => {
      fireEvent(
        hamburgerIcon,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(queryByTestId('hamburgerMenu')).toBeTruthy();
    expect(queryByText('About')).toBeTruthy();
    const about = queryByText('About') as HTMLElement;
    act(() => {
      about.click();
    });
    expect(queryByTestId('hamburgerMenu')).toBeFalsy();
  });
  it('closes on home icon click', () => {
    const { queryByTestId, queryByText } = render(
      <Router>
        <SmallNavBar windowWidth={750} />
      </Router>,
    );
    expect(queryByTestId('hamburgerIcon')).toBeTruthy();
    expect(queryByTestId('hamburgerMenu')).toBeFalsy();
    const hamburgerIcon = queryByTestId('hamburgerIcon') as HTMLElement;
    act(() => {
      fireEvent(
        hamburgerIcon,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(queryByTestId('hamburgerMenu')).toBeTruthy();
    expect(queryByText('About')).toBeTruthy();
    const homeIcon = queryByText('aPC') as HTMLElement;
    act(() => {
      homeIcon.click();
    });
    expect(queryByTestId('hamburgerMenu')).toBeFalsy();
  });
});
