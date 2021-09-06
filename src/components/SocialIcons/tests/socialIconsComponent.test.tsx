import React from 'react';
import { render } from '@testing-library/react';
import { SocialIcons } from '../socialIconsComponent';

describe('SocialIconsComponent', () => {
  it('renders icons big screen', () => {
    const { queryByTestId } = render(<SocialIcons windowWidth={1000} />);
    expect(queryByTestId('twitterIcon')).toBeTruthy();
    expect(queryByTestId('redditIcon')).toBeTruthy();
    expect(queryByTestId('emailIcon')).toBeTruthy();
    expect(queryByTestId('mobileStoreIcon')).toBeTruthy();
  });
  it('renders icons small screen', () => {
    const { queryByTestId } = render(<SocialIcons windowWidth={350} />);
    expect(queryByTestId('twitterIcon')).toBeTruthy();
    expect(queryByTestId('redditIcon')).toBeTruthy();
    expect(queryByTestId('emailIcon')).toBeFalsy();
    expect(queryByTestId('mobileStoreIcon')).toBeTruthy();
  });
});
