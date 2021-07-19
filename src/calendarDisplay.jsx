import React from 'react';
import './calendarDisplay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { EventComponent } from './eventComponent.jsx';

export class CalendarDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseCategory: {
        Revolution: false, Rebellion: false, Labor: false, Birthdays: false, Assassinations: false, Other: false,
      },
      eventDisplayWidth: 1,
    };

    this.handleExpandCollapse = this.handleExpandCollapse.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.resetExpandCollapse = this.resetExpandCollapse.bind(this);

    this.categoryList = ['Revolution', 'Rebellion', 'Labor', 'Birthdays', 'Assassinations', 'Other'];
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.setState({
      eventDisplayWidth: this.eventDisplayRef.clientWidth,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const width = this.eventDisplayRef.clientWidth;
    // console.log('handleResize running in calendarDisplay, shows eventDisplay width at: ' + width);
    this.setState({
      eventDisplayWidth: width,
    });
  }

  handleExpandCollapse(e, category) {
    const tempCollapseCategory = this.state.collapseCategory;
    tempCollapseCategory[category] = !tempCollapseCategory[category];
    this.setState({
      collapseCategory: tempCollapseCategory,
    });
  }

  resetExpandCollapse() {
    this.setState({
      collapseCategory: {
        Revolution: false, Rebellion: false, Labor: false, Birthdays: false, Assassinations: false, Other: false,
      },
    });
  }

  render() {
    // less verbosity:
    const { events } = this.props;
    return (
      <div id="eventDisplay" ref={(eventDisplay) => this.eventDisplayRef = eventDisplay}>
        {this.categoryList.map((eventCategory) => {
          // if the first event is blank (placeholder)
          if (!events[eventCategory][0].description) {
            return null;
          }
          // if event is non-empty, make a category "card"
          return (
            <div className="categoryEvents">
              <div className="headerWrapper" onClick={(e) => this.handleExpandCollapse(e, eventCategory)}>
                <div className="collapseButton" onClick={(e) => this.handleExpandCollapse(e, eventCategory)}>
                  {this.state.collapseCategory[eventCategory] && <FontAwesomeIcon icon={faPlus} onClick={(e) => this.handleExpandCollapse(e, eventCategory)} />}
                  {!this.state.collapseCategory[eventCategory] && <FontAwesomeIcon icon={faMinus} onClick={(e) => this.handleExpandCollapse(e, eventCategory)} />}
                </div>
                <div className="categoryHeaderWrapper">
                  <p className="categoryHeader">{eventCategory}</p>
                </div>
              </div>
              {!this.state.collapseCategory[eventCategory]
                  /* map each individual category event to an EventComponent */
                  && events[eventCategory].map((categoryEvent) => {
                    // split description on new lines so we can actually have separate p elements (new lines is how description was stored in data)
                    const paragraphs = categoryEvent.description.split('\n\n');
                    // return individual event as formatted jsx (map returns list of individual events per category)
                    return (
                      <EventComponent
                        categoryEvent={categoryEvent}
                        paragraphs={paragraphs}
                        stringToSlug={this.props.stringToSlug}
                        key={categoryEvent.title}
                        winDim={this.props.winDim}
                        eventDisplayWidth={this.state.eventDisplayWidth}
                        initCollapsed={this.props.initCollapsed}
                      />
                    );
                  })}
            </div>
          );
        })}
      </div>
    );
  }
}
