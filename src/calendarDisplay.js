import React from 'react';
import logo from './logo.svg';
import './calendarDisplay.css';
import {EventComponent} from './eventComponent.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';

export class CalendarDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseCategory: {'Revolution': false, 'Rebellion': false, 'Labor': false, 'Birthdays': false, 'Assassinations': false, 'Other': false}
    };

    this.handleExpandCollapse = this.handleExpandCollapse.bind(this);

    this.categoryList = ['Revolution', 'Rebellion', 'Labor', 'Birthdays', 'Assassinations', 'Other'];
  };

  handleExpandCollapse(e, category) {
    var tempCollapseCategory = this.state.collapseCategory;
    tempCollapseCategory[category] = !tempCollapseCategory[category];
    this.setState({
      collapseCategory: tempCollapseCategory
    });
  };

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
                <div className='headerWrapper' onClick={(e) => this.handleExpandCollapse(e, eventCategory)}>
                  <div className='collapseButton' onClick={(e) => this.handleExpandCollapse(e, eventCategory)}>
                    {this.state.collapseCategory[eventCategory] && <FontAwesomeIcon icon={faPlus}/>}
                    {!this.state.collapseCategory[eventCategory] && <FontAwesomeIcon icon={faMinus}/>}
                  </div>
                  <div className='categoryHeaderWrapper'>
                    <p className='categoryHeader'>{eventCategory}</p>
                  </div>
                </div>
                {!this.state.collapseCategory[eventCategory] ? categoryEvents : null}
              </div>
              );
          }
        })}
      </div>
    );
  };
};
