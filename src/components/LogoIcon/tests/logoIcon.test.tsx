import React from 'react';
import { render } from '@testing-library/react';
import { IconComponent } from '../logoIcon';

describe('IconComponent', () => {
  it('renders home icon', () => {
    const { queryByTestId } = render(<IconComponent />);
    expect(queryByTestId('homeIcon')).toBeTruthy();
  });
});
