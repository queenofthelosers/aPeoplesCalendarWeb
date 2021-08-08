import React from 'react';
import {
  useParams,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import '../App/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Skeleton from '@material-ui/lab/Skeleton';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
  eventLibrary: any;
  loading: boolean;
}

export const Main = ({
  winDim,
  eventLibrary,
  loading,
}: IMainProps): JSX.Element => {
  const [dateInput, setDateInput] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [displaySearch, setDisplaySearch] = React.useState(false);
  const [events, setEvents] = React.useState<any>();
  const [haveEvents, setHaveEvents] = React.useState(false);
  const [invalidInput, setInvalidInput] = React.useState(false);
  const [isSingleEvent, setIsSingleEvent] = React.useState(false);
  const params = useParams();
  const history = useHistory();

  const calendarRef: React.RefObject<any> = React.createRef();

  React.useEffect(() => {
    if (loading) {
      return;
    }
    const { day, event_ } = params as any;
    if (event_) {
      setIsSingleEvent(true);
      searchEvents(event_);
      return;
    }
    if (day) {
      if (validateDayString(day)) {
        const splitDateString = day.split('-');
        // add any necessary zero padding to day and month
        const year = new Date().getFullYear();
        let month = splitDateString[0];
        let queryDay = splitDateString[1];
        if (month.length === 1) {
          month = `0${month}`;
        }
        if (queryDay.length === 1) {
          queryDay = `0${queryDay}`;
        }
        const formattedDayString = `${year}-${month}-${queryDay}`;
        const tempNewDate = { target: { value: formattedDayString } };
        setDateInput(formattedDayString);
        handleNewDate(tempNewDate);
        return;
      }
      // redirect to /404 (<NotFound/>)
      history.push('/404');
      setInvalidInput(true);
      // return;
    }
    const queryParams = new URLSearchParams(window.location.search);
    const searchTerm = queryParams.get('query');
    if (searchTerm) {
      setSearchValue(searchTerm);
      searchDatabaseByTerm(searchTerm);
      return;
    }
    initializeToday();
  }, [loading]);

  const searchEvents = (title: string) => {
    const { searchEventsResult, matched } = findEventByTitle(
      eventLibrary,
      title,
    );
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
    history.push(`/calendar/day/${initTodayString}`);
  };

  const handleNewDate = (e: any): void => {
    // if the user did something weird and the given date is falsy, don't run anything
    if (!e.target.value) {
      return;
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
    setSearchValue('');
    history.push(`/calendar/day/${newDateString}`);
    // reset all categories to be expanded when new date is given
    if (dayHasEvents && calendarRef.current) {
      calendarRef.current.resetExpandCollapse();
    }
  };

  const trackSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e?: any) => {
    e?.preventDefault();
    searchDatabaseByTerm(searchValue);
    const queryParams = new URLSearchParams(window.location.search);
    const oldSearchTerm = queryParams.get('query');
    if (oldSearchTerm !== searchValue) {
      history.push(`/calendar/search?query=${searchValue}`);
    }
  };

  const searchDatabaseByTerm = (searchTerm: string) => {
    if (searchTerm.length === 0) {
      initializeToday();
      return;
    }
    if (searchTerm.length < 3) {
      // eslint-disable-next-line
      alert('Search value must be three characters or longer!');
      return;
    }

    setDateInput('');

    const { searchEventsResult, dayHasEvents } = searchDatabaseByKeyword(
      eventLibrary,
      searchTerm,
    );
    setDisplaySearch(true);
    setEvents(searchEventsResult);
    setHaveEvents(dayHasEvents);
    // reset all categories to be expanded on new search:
    if (dayHasEvents && calendarRef.current) {
      calendarRef.current.resetExpandCollapse();
    }
  };

  // redirects to 404 if invalid input was given for date (i.e., 030-29)
  if (invalidInput) {
    return (
      <Route>
        <Redirect
          to={{
            pathname: '/404',
          }}
        />
      </Route>
    );
  }

  if (loading) {
    return <Skeleton />;
  }

  return (
    <Route
      render={() => (
        <div id="App">
          {displaySearch && (
            <div id="onThisDayWrapper">
              <p id="onThisDay">Search Results</p>
            </div>
          )}
          <div
            id="settings"
            style={winDim.width < 501 ? { flexDirection: 'column' } : {}}
          >
            <div id="datePickerWrapper">
              <input
                id="datePicker"
                type="date"
                value={dateInput}
                onChange={handleNewDate}
              />
            </div>
            <form
              id="searchWrapper"
              onSubmit={handleSearch}
              style={
                winDim.width < 501 ? { marginTop: 20, marginLeft: -8 } : {}
              }
            >
              <input
                id="searchField"
                style={winDim.width < 501 ? { width: 125 } : {}}
                type="text"
                value={searchValue}
                placeholder="Search..."
                onChange={trackSearch}
              />
              <button id="searchButton" type="submit">
                <FontAwesomeIcon icon={faSearch} className="searchIcon" />
              </button>
            </form>
          </div>
          {!haveEvents && <EmptyDay displaySearch={displaySearch} />}
          {haveEvents && (
            <CalendarDisplay
              ref={calendarRef}
              events={events}
              winDim={winDim}
              initCollapsed={!isSingleEvent}
            />
          )}
        </div>
      )}
    />
  );
};
