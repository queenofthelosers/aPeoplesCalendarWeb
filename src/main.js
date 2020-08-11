import React from 'react';
import {
  useParams,
  Route,
  Redirect,
 } from "react-router-dom";
import './App.css';
import {eventLibrary} from './eventLibrary.js';
import {CalendarDisplay} from './calendarDisplay.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

export function Main(props) {
  return (
    <Main1
      resetDay={props.resetDay}
      params={useParams()}
    />
  );
};

//export class Main extends React.Component
class Main1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateHeader: '', //string, used as date header on homepage
      dateInput: '', //string in the format YYYY-MM-DD, used to have forward-facing tracked date input
      searchValue: '', //updated onChange from search field, used to generate text search queries
      displaySearch: false, //changes header from dateHeader to 'Search Results'
      events: '', //events from selected day, initialized to today's date, sent to display in CalendarDisplay as prop
      invalidInput: false, //if invalid input (from url params, i.e., day/94-3039), then redirect to <NotFound/>, else, return main calendar view
    };
    this.monthList = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    this.categoryList = ['Revolution', 'Rebellion', 'Labor', 'Birthdays', 'Assassinations', 'Other'];
    this.everyDayString = Object.keys(eventLibrary); //1-1, 1-2, 1-3, etc.

    this.handleNewDate = this.handleNewDate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.trackSearch = this.trackSearch.bind(this);
    this.initalizeToday = this.initializeToday.bind(this);
    this.calendarRef = React.createRef();
  };

  componentWillMount() {
    //if Main1 is being rendered via dynamic routing and has been passed a params value
    if (this.props.params.hasOwnProperty('day')) {
      //validate date query (Checks for a non zero padded month and day. I know it's ugly, but it works):
      var regChecker = new RegExp(/(^(1|3|5|7|8|10|12)-(([1-2]?[1-9])|10|20|3[0-1]))$|(^(4|6|9|11)-(([1-2]?[1-9])|10|20|30))$|(^2-([1-2]?[1-9]|10|20))$/, 'i');
      if (regChecker.test(this.props.params['day'])) {
        //if it's a valid date url, look up date
        var tempNewDate = {target: {value: '2000-'+ this.props.params['day']}}
        this.handleNewDate(tempNewDate);
      } else {
        this.setState({
          invalidInput: true, //causes this component to redirect to /404 (<NotFound/>)
        });
      };
    } else if (this.props.params.hasOwnProperty('event_')) {
      //run search with slug on slugified event titles, should only return the one event as titles are unique
      this.searchBySlug(this.props.params['event_']);
    } else {
      this.initializeToday();
    };
  };

  componentDidMount() {
    this.props.resetDay(this.initializeToday.bind(this));
  };

  stringToSlug(str) {
    //https://gist.github.com/codeguy/6684588
    str = str.replace(/^\s+|\s+$/g, ''); //trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    };

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
  };

  searchBySlug(slug) {
    var searchEventsResult = {
      'Revolution': [{description: ''}],
      'Rebellion': [{description: ''}],
      'Labor': [{description: ''}],
      'Birthdays': [{description: ''}],
      'Assassinations': [{description: ''}],
      'Other': [{description: ''}],
    };

    //necessary iteration to get to individual day from eventLibrary:
    for (var i = 0; i < this.everyDayString.length; i++) {
      var day = eventLibrary[this.everyDayString[i]];
      //if day has no entries, increment count by one
      for (var j = 0; j < this.categoryList.length; j++) {
        for (var k = 0; k < day[this.categoryList[j]].length; k++) {
          //finally, we arrive at a specific event object - check to see if slugified title matches slug we are searching for
          var slugTitle = this.stringToSlug(day[this.categoryList[j]][k].title);
          if (slugTitle === slug) {
            //if so, add it to the searchEventsResult object
            searchEventsResult[this.categoryList[j]][0] = day[this.categoryList[j]][k];
            //we can safely assume titles are unique, so if we find a match, we can assign the result to state and stop searching
            this.setState({
              displaySearch: true,
              events: searchEventsResult
            });
            return '';
          };
        };
      };
    };
    //if we make it this far, then the url search term passed didn't find anything - show empty search result
    this.setState({
      displaySearch: true,
      events: searchEventsResult
    });
  };

  initializeToday() {
    //the following code sets page to today's date and relevant events

    //inital string to get events and date input displayed with today
    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    //for the actual getting of data:
    var initTodayString = month + '-' + day;
    var year = now.getFullYear();
    if (month.toString().length === 1) {
      month = '0' + month;
    };
    if (day.toString().length === 1) {
      day = '0' + day;
    };
    //placeholder for date input:
    var dateInputInit = year + '-' + month + '-' + day;
    //initialize date header with today's date month and day:
    var dateHeader = this.monthList[now.getMonth()] + ' ' + now.getDate() + this.getDaySuffix(now.getDate());
    this.setState({
      dateInput: dateInputInit,
      dateHeader: dateHeader,
      events: eventLibrary[initTodayString],
      displaySearch: false,
    });
  };

  handleNewDate(e) {
    //e.target.value is data from date input
    //if the user did something weird and the given date is falsy, don't run anything
    if (!e.target.value) {
      return null;
    };
    //else, split the date string up into an array by dash character
    var newDateString = e.target.value.split('-');
    //remove any zero padding from day and month
    if (newDateString[1][0] === '0') {
      newDateString[1] = newDateString[1].slice(1);
    };
    if (newDateString[2][0] === '0') {
      newDateString[2] = newDateString[2].slice(1);
    };
    //create the month and day date header with suffix
    var dateHeader = this.monthList[parseInt(newDateString[1]) - 1] + ' ' + newDateString[2] + this.getDaySuffix(newDateString[2]);
    //create the lookup key to use with eventLibrary
    newDateString = [newDateString[1], newDateString[2]].join('-');
    this.setState({
      events: eventLibrary[newDateString],
      dateHeader: dateHeader,
      dateInput: e.target.value,
      displaySearch: false,
    });
    //reset all categories to be expanded when new date is given
    //on initial apeoplescalendar.org/day/date query, this.calendarRef.current=null, this try catch fixes this issue and doesn't interfere with the usual function 
    try {
      this.calendarRef.current.resetExpandCollapse()
    } catch (error) {
      return '';
    };
  };

  getDaySuffix(num) {
    var array = ("" + num).split("").reverse(); // E.g. 123 = array("3","2","1")
    if (array[1] !== "1") { // Number is in the teens
      switch (array[0]) {
        case "1": return "st";
        case "2": return "nd";
        case "3": return "rd";
        default: break;
      }
    }
    return "th";
  };

  trackSearch(e) {
    this.setState({
      searchValue: e.target.value
    });
  };

  handleSearch(e) {
    //iterate over each day, each day's category, each day's category's list of events, see if this.state.searchValue is in the event's description
    //if it is, add that event to the "artificial" day that is created from search results (held as searchEventsResult)
    //this "day" is then passed to calendarDisplay, retaining all the functionality of a calendar day's events

    e.preventDefault()

    var searchEventsResult = {
      'Revolution': [{description: ''}],
      'Rebellion': [{description: ''}],
      'Labor': [{description: ''}],
      'Birthdays': [{description: ''}],
      'Assassinations': [{description: ''}],
      'Other': [{description: ''}],
    };

    if (this.state.searchValue.length === 0) {
      this.initializeToday();
      return '';
    } else if (this.state.searchValue.length < 3) {
      alert('Search value must be three characters or longer!');
      return '';
    };

    var lowerSearchValue = this.state.searchValue.toLowerCase();
    //iterate through each day
    for (var i = 0; i < this.everyDayString.length; i++) {
      var day = eventLibrary[this.everyDayString[i]];
      //if day has no entries, increment count by one
      for (var j = 0; j < this.categoryList.length; j++) {
        for (var k = 0; k < day[this.categoryList[j]].length; k++) {
          //finally, we arrive at a specific event object - check to see if searchText in event's description prop
          var lowerDescription = day[this.categoryList[j]][k].description.toLowerCase();
          if (lowerDescription.includes(lowerSearchValue)) {
            //if the search term is included, add the event to the results class variable
            //searchEventsResult.push(day[this.categoryList[j]][k]);
            //if the list of events under the given category is just a placeholder (i.e., description: ''), then overwrite it; else, append to end of list
            if (!searchEventsResult[this.categoryList[j]][0].description) {
              searchEventsResult[this.categoryList[j]][0] = day[this.categoryList[j]][k];
            } else {
              searchEventsResult[this.categoryList[j]].push(day[this.categoryList[j]][k]);
            };
          };
        };
        //if iteration is on last day, sort each category events by title, alphabetically
        if (this.everyDayString[i] === "12-31") {
          searchEventsResult[this.categoryList[j]].sort(function(a, b) {
            if (a.title > b.title) {
              return 1;
            } else {
              return -1;
            };
          });
        };
      };
    };
    //reset all categories to be expanded on new search:
    this.calendarRef.current.resetExpandCollapse();

    this.setState({
      displaySearch: true,
      events: searchEventsResult
    });
  };

  render() {
    //redirects to 404 if invalid input was given for date (i.e., 030-29)
    return (
      <Route
        render = {() =>
          !this.state.invalidInput ?
            <div id="App">
              <div id='appPromoWrapper'>
                <a id='appPromo' target='_blank' rel="noopener noreferrer" href='https://play.google.com/store/apps/details?id=com.aPeoplesCalendar.aPC&hl=en'>On Android? Get the app!</a>
              </div>
              <div id='settings'>
                <div id='datePickerWrapper'>
                  <input id='datePicker' type='date' value={this.state.dateInput} onChange={this.handleNewDate}/>
                </div>
                <form id='searchWrapper' onSubmit={this.handleSearch}>
                  <input id='searchField' type="text" value={this.state.searchValue} onChange={this.trackSearch}/>
                  <button id='searchButton' type="submit"><FontAwesomeIcon icon={faSearch} className='searchIcon' size="m"/></button>
                </form>
              </div>
              <div id="onThisDayWrapper">
                <p id='onThisDay'>{this.state.displaySearch ? 'Search Results' : this.state.dateHeader}</p>
              </div>
              <CalendarDisplay ref={this.calendarRef} events={this.state.events} stringToSlug={this.stringToSlug}/>
            </div>
            :
            <Redirect to={{
              pathname: "/404",
            }}/>
        }
      />
    );
  };
};
