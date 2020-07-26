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

    };
    this.initTodayString = (new Date().getMonth() + 1 + '-' + new Date().getDate());
    this.categoryList = ['Revolution', 'Rebellion', 'Labor', 'Birthdays', 'Assassinations', 'Other'];

    this.createEventElements = this.createEventElements.bind(this);
  };

  createEventElements() {
    var events = [];
    for (var i = 0; i < this.categoryList.length; i++) {
        var eventCategory = this.categoryList[i];
        //if event category for this day is not empty
        if (eventLibrary[this.initTodayString][eventCategory][0].description) {
          for (var j = 0; j < eventLibrary[this.initTodayString][eventCategory].length; j++) {
            events.push([]);
          };
          events.push([<li>{eventLibrary[this.initTodayString][eventCategory][0].title}</li>]);
        };
    };
    return events;
  };

  render() {
    return (
      <div className="App">
        <header id="onThisDayWrapper">
          <p id='onThisDay'>On This Day</p>
        </header>
        <div id='eventDisplay'>
          {this.categoryList.map(eventCategory => {
            /*if the description of the first event in this category is non-empty (i.e., category for the day is not blank)*/
            if (eventLibrary[this.initTodayString][eventCategory][0].description) {
              /*then, map category events into JSX*/
              var categoryEvents = eventLibrary[this.initTodayString][eventCategory].map(categoryEvent => {
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
