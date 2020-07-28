import React from 'react';
import logo from './logo.svg';
import './calendarDisplay.css';
import {EventComponent} from './eventComponent.js';

export class CalendarDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.categoryList = ['Revolution', 'Rebellion', 'Labor', 'Birthdays', 'Assassinations', 'Other'];
  };
  //functions go here

  render() {
    return (
      <div id='eventDisplay'>
        {this.categoryList.map(eventCategory => {
          /*if the description of the first event in this category is non-empty (i.e., category for the day is not blank)*/
          if (this.props.events[eventCategory][0].description) {
            /*then, map each individual category event to EventComponent*/
            var categoryEvents = this.props.events[eventCategory].map(categoryEvent => {
              //split description on new lines so we can actually have separate p elements
              var paragraphs = categoryEvent.description.split('\n\n');
              //return individual element (becomes list of individual events per category)
              return (
                <EventComponent
                  categoryEvent={categoryEvent}
                  paragraphs={paragraphs}
                />
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
    );
  };
};
