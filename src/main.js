import React from 'react';
import './App.css';
import {eventLibrary} from './eventLibrary.js';
import {CalendarDisplay} from './calendarDisplay.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

//inital string to get events and date input displayed with today on first load
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

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateHeader: '',
      dateInput: dateInputInit,
      searchValue: '',
      displaySearch: false,
      events: eventLibrary[initTodayString], //events from selected day, initialized to today's date, sent to display in CalendarDisplay as prop
    };
    this.monthList = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    this.categoryList = ['Revolution', 'Rebellion', 'Labor', 'Birthdays', 'Assassinations', 'Other'];

    this.handleNewDate = this.handleNewDate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.trackSearch = this.trackSearch.bind(this);
  };

  componentWillMount() {
    //console.log('component will mount is running');
    //initialize date header with today's date month and day:
    var today = new Date();
    this.setState({
      dateHeader: this.monthList[today.getMonth()] + ' ' + today.getDate() + this.getDaySuffix(today.getDate())
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
    console.log(e.target.value);
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

    if (this.state.searchValue.length < 3) {
      alert('Search value must be three characters or longer!');
      return '';
    };

    var lowerSearchValue = this.state.searchValue.toLowerCase();
    //create a list of every day in a year (used as a key in eventLibrary)
    var everyDayString = Object.keys(eventLibrary);
    //iterate through each day
    for (var i = 0; i < everyDayString.length; i++) {
      var day = eventLibrary[everyDayString[i]];
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
        if (everyDayString[i] === "12-31") {
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

    console.log('handleSearch running');
    this.setState({
      displaySearch: true,
      events: searchEventsResult
    });
  };

  render() {
    return (
      <div id="App">
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
        <CalendarDisplay events={this.state.events}/>
      </div>
    );
  };
};
