/* eslint-disable */
/* eslint no-return-assign: "warn" */
/* eslint react/no-unused-prop-types: "warn" */
// above linter disabling is temporary, until problem function moved to parent

import React from 'react';
import './calendarDisplay.css';
import { EventComponent } from '../EventComponent/eventComponent';
import { categoryList } from '../../utils/categoryList';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const StyledAccordionSummary = withStyles({
  content: {
    flexGrow: 0,
    margin: "auto",
    marginTop: 12,
    marginBottom: 12,
    "&$expanded": {
     flexGrow: 0,
     margin: "auto",
    },
    "&:last-child": {
     marginRight: "auto"
    }
  },
})(AccordionSummary);

interface ICalendarDisplayProps {
  events: any;
  initCollapsed: boolean;
  winDim: {
    width: number;
    height: number;
  };
  ref: any;
}

export const CalendarDisplay = ({
  events,
  initCollapsed,
  winDim,
}: ICalendarDisplayProps) => {
  const [collapseCategory, setCollapseCategory] = React.useState<any>({});
  const [eventDisplayWidth, setEventDisplayWidth] = React.useState<number>(1);
  let eventDisplayRef: any;

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    setEventDisplayWidth(eventDisplayRef?.clientWidth);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [eventDisplayRef]);

  const handleResize = () => {
    const width = eventDisplayRef?.clientWidth ?? 1;
    // console.log('handleResize running in calendarDisplay, shows eventDisplay width at: ' + width);
    setEventDisplayWidth(width);
  };

  const handleExpandCollapse = (_: any, category: string) => {
    const tempCollapseCategory: any = { ...collapseCategory };
    tempCollapseCategory[category] = !tempCollapseCategory[category];
    setCollapseCategory(tempCollapseCategory);
  };
  // move this function one level higher
  /* eslint-disable-next-line */
  const resetExpandCollapse = () => {
    setCollapseCategory({});
  };

  return (
    <div
      id="eventDisplay"
      ref={(eventDisplay) => (eventDisplayRef = eventDisplay)}
    >
      {categoryList.map((eventCategory) => {
        // if the first event is blank (placeholder)
        if (!events[eventCategory][0].description) {
          return null;
        }
        // extract all this into a card component
        return (
          <Accordion key={eventCategory} className="categoryEvents">
            <StyledAccordionSummary
              className="headerWrapper"
              style={{ backgroundColor: '#333333', color: 'white' }}
              expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
              // onClick={(e) => handleExpandCollapse(e, eventCategory)}
            >
              {/* <div
                className="collapseButton"
                onClick={(e) => handleExpandCollapse(e, eventCategory)}
              >
                {collapseCategory?.[eventCategory] && (
                  <FontAwesomeIcon
                    icon={faPlus}
                    onClick={(e) => handleExpandCollapse(e, eventCategory)}
                  />
                )}
                {!collapseCategory?.[eventCategory] && (
                  <FontAwesomeIcon
                    icon={faMinus}
                    onClick={(e) => handleExpandCollapse(e, eventCategory)}
                  />
                )}
              </div> */}
              <div className="categoryHeaderWrapper">
                <p className="categoryHeader">{eventCategory}</p>
              </div>
            </StyledAccordionSummary>
            {/* {!collapseCategory?.[eventCategory] && */}
              {/* /* map each individual category event to an EventComponent  */}
            <AccordionDetails>
              {events[eventCategory].map((categoryEvent: any) => {
                // split description on new lines so we can actually have separate p elements (new lines is how description was stored in data)
                const paragraphs = categoryEvent.description.split('\n\n');
                // return individual event as formatted jsx (map returns list of individual events per category)
                return (
                  <EventComponent
                    categoryEvent={categoryEvent}
                    paragraphs={paragraphs}
                    key={categoryEvent.title}
                    winDim={winDim}
                    eventDisplayWidth={eventDisplayWidth}
                    initCollapsed={initCollapsed}
                  />
                );
              })}
              </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};
