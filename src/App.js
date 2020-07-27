import React from 'react';
import logo from './logo.svg';
import './App.css';
import {eventLibrary} from './eventLibrary.js';

/*{this.props.events['Revolution'][0].description.length > 0 && <View style={[styles.eventCategory, ]}>
    <TouchableOpacity
      onPress={() => this.handleExpandCollapse('Revolution')}
      style={{borderBottomWidth: 1, backgroundColor: this.colorScheme['Revolution']}}
    >
      <StyledText text='Revolution' style={[styles.eventCategoryHeader]}/>
    </TouchableOpacity>
    {this.state.expandList['Revolution'] && this.props.events['Revolution'].map((event) =>
      <TouchableOpacity
        onPress={() => this.setSpecificEvent(event)}
        key={event.title}
        style={styles.specificEventButton}
      >
        <StyledText text={event.title} style={styles.eventCategoryText}/>
      </TouchableOpacity>
    )}
  </View>}*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayString: (new Date().getMonth() + 1 + '-' + new Date().getDate()),
      dateHeader: '',
      searchValue: '',
      displaySearch: false,
    };
    //this.dayString = (new Date().getMonth() + 1 + '-' + new Date().getDate());
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
    //change the dayString in state, which will update displayed events
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
      dayString: newDateString,
      dateHeader: dateHeader,
      displaySearch: false,
    });
  };

  getDaySuffix(num) {
    var array = ("" + num).split("").reverse(); // E.g. 123 = array("3","2","1")
    if (array[1] != "1") { // Number is in the teens
      switch (array[0]) {
        case "1": return "st";
        case "2": return "nd";
        case "3": return "rd";
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

  handleSearch() {
    console.log('handleSearch running');
    this.setState({
      displaySearch: true,
    });
  };

  render() {
    return (
      <div id="App">
        <div id='navBar'>
          <div className='navButtons' id='navLeft'>
            <p className='navText'>About</p>
            <p className='navText'>Donate</p>
          </div>
          <p id='title'>A People's Calendar</p>
          <div className='navButtons' id='navRight'>
            <p className='navText'>Volunteer</p>
            <p className='navText'>Contact</p>
          </div>
        </div>
        <div id="onThisDayWrapper">
          <p id='onThisDay'>{this.state.displaySearch ? 'Search Results' : this.state.dateHeader}</p>
        </div>
        <div id='settings'>
          <input type='date' onChange={this.handleNewDate}/>
            <input type="text" value={this.state.searchValue} placeholder='Search the calendar!' onChange={this.trackSearch}/>
            <button type="button" onClick={() => this.handleSearch()}><p>Search</p></button>
        </div>
        <div id='eventDisplay'>
          {this.categoryList.map(eventCategory => {
            /*if the description of the first event in this category is non-empty (i.e., category for the day is not blank)*/
            if (eventLibrary[this.state.dayString][eventCategory][0].description) {
              /*then, map category events into JSX*/
              var categoryEvents = eventLibrary[this.state.dayString][eventCategory].map(categoryEvent => {
                //split description on new lines so we can actually have formatting
                var paragraphs = categoryEvent.description.split('\n\n');
                //JSX format for each event
                return (
                  <div className='eventWrapper'>
                    <header className='eventHeaderWrapper'>
                      <p className='eventHeader'>{categoryEvent.title}</p>
                    </header>
                    <p className='eventDate'>{categoryEvent.date}</p>
                    <img className='eventImg' src={categoryEvent.imgSrc}/>
                    {paragraphs.map(paragraph => <p className='eventDescription'>{paragraph}</p>)}
                    <div className='sourcesWrapper'>
                      <a className='source' href={categoryEvent.infoSrc} target='_blank'>Source</a>
                      <a className='source' href={categoryEvent.link} target='_blank'>More Info</a>
                    </div>
                  </div>
                  )
                })
              //return the formatted jsx event, with event category name above the mapped events. One of these is created for every event category
              return (
                <div className='categoryEvents'>
                  <header className='categoryHeaderWrapper'>
                    <p className='categoryHeader'>{eventCategory}</p>
                  </header>
                  {categoryEvents}
                </div>
                );
            }
          })}
        </div>
      </div>
    );
  };
};

export default App;
