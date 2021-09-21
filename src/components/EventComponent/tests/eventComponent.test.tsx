import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { EventComponent, IEventComponentProps } from '../eventComponent';
import { DatabaseEvent } from '../../../utils/types';

// let mockDateGetter: any;

// jest.mock('../../../utils/getTodayStringAndInitDateInput', () => {
//   mockDateGetter = jest.fn(() => {
//     return { initTodayString: '1-1' };
//   });

//   return {
//     __esModule: true,
//     getTodayStringAndInitDateInput: mockDateGetter,
//   };
// });

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
      initCollapsed: false,
      categoryEvent: mockedEvent,
      eventDisplayWidth: 500,
      paragraphs: ['asdf', 'qwer', 'zxcv'],
    };
    jest.clearAllMocks();
  });
  it('renders', () => {
    // const loadingProps: IEventComponentProps = {
    //   ...props,
    // };
    const { queryByText } = render(
      <Router>
        <EventComponent {...props} />
      </Router>,
    );
    // still shows text while loading
    expect(queryByText('on this day statement')).toBeTruthy();
    expect(queryByText(`A People's Calendar`)).toBeTruthy();
  });
});
