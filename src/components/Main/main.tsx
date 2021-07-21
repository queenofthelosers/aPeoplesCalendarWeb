import React from 'react';
import {
  useParams,
  Route,
  Redirect,
} from 'react-router-dom';
import '../App/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { eventLibrary } from '../../eventLibrary';
import { CalendarDisplay } from '../CalendarDisplay/calendarDisplay';
import { EmptyDay } from '../EmptyDay/emptyDayComponent';
import { findEventByTitle } from '../../utils/findEventByTitle';
import { getTodayStringAndInitDateInput } from '../../utils/getTodayStringAndInitDateInput';
import { isDayNotEmpty } from '../../utils/isDayNotEmpty';
import { searchDatabaseByKeyword } from '../../utils/searchDatabaseByKeyword';
import { validateDayString } from '../../utils/validateDayString';

interface IMainProps {
  winDim: {
    width: number;
    height: number;
  };
}

export const Main = ({ winDim }: IMainProps): JSX.Element => {
  const [dateInput, setDateInput] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [displaySearch, setDisplaySearch] = React.useState(false);
  const [events, setEvents] = React.useState<any>();
  const [haveEvents, setHaveEvents] = React.useState(false);
  const [invalidInput, setInvalidInput] = React.useState(false);
  const [isSingleEvent, setIsSingleEvent] = React.useState(false);

  const params = useParams();

  const calendarRef: React.RefObject<any> = React.createRef();

  React.useEffect(() => {
    // if Main is being rendered via dynamic routing and has been passed a params value
    const { day, event_ } = params as any;
    if (day) {
      // validate date query (Checks for a non zero padded month and day. I know it's ugly, but it works):
      if (validateDayString(day)) {
        // if it's a valid date url, look up date
        const tempNewDate = { target: { value: `2000-${day}` } };
        handleNewDate(tempNewDate);
      } else {
        // redirect to /404 (<NotFound/>)
        // could probably do history.push(/404)
        setInvalidInput(true);
      }
    // } else if (this.props.params.hasOwnProperty('event_')) {
    } else if (event_) {
      // run search with slug on slugified event titles, should only return the one event as titles are unique
      setIsSingleEvent(true);
      searchEvents(event_);
    } else {
      initializeToday();
    }
  }, [params]);

  const searchEvents = (title: string) => {
    const { searchEventsResult, matched } = findEventByTitle(title);
    setDisplaySearch(true);
    setEvents(searchEventsResult);
    setHaveEvents(matched);
  };

  const initializeToday = () => {
    // the following code sets page to today's date and relevant events

    const { initTodayString, initDateInput } = getTodayStringAndInitDateInput();
    const dayHasEvents = isDayNotEmpty(eventLibrary[initTodayString]);

    setDateInput(initDateInput);
    setEvents(eventLibrary[initTodayString]);
    setDisplaySearch(false);
    setHaveEvents(dayHasEvents);
  };

  const handleNewDate = (e: any) => {
    // if the user did something weird and the given date is falsy, don't run anything
    if (!e.target.value) {
      return null;
    }
    // else, split the date string up into an array by dash character
    let newDateString = e.target.value.split('-');
    // remove any zero padding from day and month
    if (newDateString[1][0] === '0') {
      newDateString[1] = newDateString[1].slice(1);
    }
    if (newDateString[2][0] === '0') {
      newDateString[2] = newDateString[2].slice(1);
    }
    // create the lookup key to use with eventLibrary
    newDateString = [newDateString[1], newDateString[2]].join('-');

    const dayHasEvents = isDayNotEmpty(eventLibrary[newDateString]);
    setEvents(eventLibrary[newDateString]);
    setHaveEvents(dayHasEvents);
    setDateInput(e.target.value);
    setDisplaySearch(false);
    // reset all categories to be expanded when new date is given
    if (dayHasEvents && calendarRef.current) {
      calendarRef.current.resetExpandCollapse();
    }
  };

  const trackSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();

    if (searchValue.length === 0) {
      initializeToday();
      return;
    } if (searchValue.length < 3) {
      alert('Search value must be three characters or longer!');
      return;
    }

    const { searchEventsResult, dayHasEvents } = searchDatabaseByKeyword(searchValue);
    setDisplaySearch(true);
    setEvents(searchEventsResult);
    setHaveEvents(dayHasEvents);
    // reset all categories to be expanded on new search:
    if (dayHasEvents && calendarRef.current) {
      calendarRef.current.resetExpandCollapse();
    }
  };

  // redirects to 404 if invalid input was given for date (i.e., 030-29)
  return (
    <Route
      render={() => (!invalidInput ? (
        <div id="App">
          {/* <div id='appPromoWrapper'>
              <a id='appPromo' target='_blank' rel="noopener noreferrer" href='https://play.google.com/store/apps/details?id=com.aPeoplesCalendar.aPC&hl=en'>On Android? Get the app!</a>
            </div> */}
          {displaySearch && (
          <div id="onThisDayWrapper">
            <p id="onThisDay">Search Results</p>
          </div>
          )}
          <div id="settings" style={winDim.width < 501 ? { flexDirection: 'column' } : {}}>
            <div id="datePickerWrapper">
              <input id="datePicker" type="date" value={dateInput} onChange={handleNewDate} />
            </div>
            <form
              id="searchWrapper"
              onSubmit={handleSearch}
              style={winDim.width < 501 ? { marginTop: 20, marginLeft: -8 } : {}}
            >
              <input
                id="searchField"
                style={winDim.width < 501 ? { width: 125 } : {}}
                type="text"
                value={searchValue}
                onChange={trackSearch}
              />
              <button
                id="searchButton"
                type="submit"
              >
                <FontAwesomeIcon icon={faSearch} className="searchIcon" />
              </button>
            </form>
          </div>
          {!haveEvents
              && <EmptyDay displaySearch={displaySearch} />}
          {haveEvents && (
          <CalendarDisplay
            ref={calendarRef}
            events={events}
            winDim={winDim}
            initCollapsed={!isSingleEvent}
          />
          )}
        </div>
      )
        : (
          <Redirect to={{
            pathname: '/404',
          }}
          />
        ))}
    />
  );
};
