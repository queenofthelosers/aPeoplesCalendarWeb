import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { EventComponent, IEventComponentProps } from '../eventComponent';
import { DatabaseEvent } from '../../../utils/types';

describe('EventComponent', () => {
  let props: IEventComponentProps;
  let mockedEvent: DatabaseEvent;
  beforeEach(() => {
    mockedEvent = {
      title: 'eventTitle',
      description: 'eventDescription',
      category: 'eventCategory',
      otd: 'on this day statement',
      date: 'eventDate',
      imgSrc: 'imgSrc',
      imgAltText: 'imgAltText',
      NSFW: false,
      link: 'link.com',
      infoSrc: 'infoSrc.com',
    };
    props = {
      winDim: {
        width: 1000,
        height: 1000,
      },
      initCollapsed: true,
      categoryEvent: mockedEvent,
      eventDisplayWidth: 500,
      paragraphs: ['asdf', 'qwer', 'zxcv'],
    };
    jest.clearAllMocks();
  });
  it('renders, collapses and expands', () => {
    const {
      queryByText,
      queryByAltText,
      queryByTestId,
    } = render(
      <Router>
        <EventComponent {...props} />
      </Router>,
    );
    expect(queryByText('eventTitle')).toBeTruthy();
    expect(queryByText('on this day statement')).toBeTruthy();
    expect(queryByAltText(`imgAltText`)).toBeTruthy();
    expect(queryByText('qwer')).toBeTruthy();
    expect(queryByText('asdf')).toBeTruthy();
    expect(queryByText('zxcv')).toBeTruthy();
    expect(queryByText('Source')).toBeTruthy();
    expect(queryByText('More Info')).toBeTruthy();
    const expandIcon = queryByTestId('expandCollapseIcon') as HTMLElement;
    expect(expandIcon).toBeTruthy();
    expandIcon.click();
    expect(queryByText('on this day statement')).toBeFalsy();
    const copyToClipboard = queryByTestId('copyToClipboard') as HTMLElement;
    expect(copyToClipboard).toBeTruthy();
    expect(queryByText('Copy link')).toBeTruthy();
    expect(queryByText('Link copied!')).toBeFalsy();
    copyToClipboard.click();
    expect(queryByText('Copy link')).toBeFalsy();
    expect(queryByText('Link copied!')).toBeTruthy();
    const collapseIcon = queryByTestId('expandCollapseIcon') as HTMLElement;
    expect(collapseIcon).toBeTruthy();
    collapseIcon.click();
    expect(queryByText('eventTitle')).toBeTruthy();
  });
  it('renders open', () => {
    const newProps = {
      ...props,
      initCollapsed: false,
      categoryEvent: {
        ...mockedEvent,
        link: 'infoSrc.com',
      },
    };
    const {
      queryByText,
      queryByAltText,
      queryByTestId,
    } = render(
      <Router>
        <EventComponent {...newProps} />
      </Router>,
    );
    expect(queryByText('eventTitle')).toBeTruthy();
    expect(queryByText('on this day statement')).toBeFalsy();
    expect(queryByAltText(`imgAltText`)).toBeTruthy();
    expect(queryByText('qwer')).toBeTruthy();
    expect(queryByText('asdf')).toBeTruthy();
    expect(queryByText('zxcv')).toBeTruthy();
    expect(queryByText('Source')).toBeTruthy();
    // missing second link
    expect(queryByText('More Info')).toBeFalsy();
    const collapseIcon = queryByTestId('expandCollapseIcon') as HTMLElement;
    expect(collapseIcon).toBeTruthy();
    collapseIcon.click();
    expect(queryByText('on this day statement')).toBeTruthy();
    const expandIcon = queryByTestId('expandCollapseIcon') as HTMLElement;
    expect(expandIcon).toBeTruthy();
    expandIcon.click();
    expect(queryByText('on this day statement')).toBeFalsy();
  });
});
