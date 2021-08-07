import React from 'react';
import './calendarDisplay.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { EventComponent } from '../EventComponent/eventComponent';
import { categoryList } from '../../utils/categoryList';

const StyledAccordionSummary = withStyles({
  content: {
    flexGrow: 0,
  },
})(AccordionSummary);

const StyledAccordionDetails = withStyles({
  root: {
    flexDirection: 'column',
    padding: 0,
  },
})(AccordionDetails);

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
  const [eventDisplayWidth, setEventDisplayWidth] = React.useState<number>(1);
  const eventDisplayRef = React.useRef<any>();

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    setEventDisplayWidth(eventDisplayRef.current.clientWidth);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [eventDisplayRef]);

  const handleResize = () => {
    setEventDisplayWidth(eventDisplayRef.current.clientWidth);
  };

  return (
    <div
      id="eventDisplay"
      ref={eventDisplayRef}
    >
      {categoryList.map((eventCategory) => {
        // if the first event is blank (placeholder)
        if (!events[eventCategory][0].description) {
          return null;
        }
        // extract all this into a card component
        return (
          <Paper key={eventCategory} style={{ marginBottom: 20 }}>
            <Accordion className="categoryEvents" defaultExpanded={true}>
              <StyledAccordionSummary
                className="headerWrapper"
                style={{ backgroundColor: '#333333', color: 'white' }}
                expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
              >
                <div className="categoryHeaderWrapper">
                  <p className="categoryHeader">{eventCategory}</p>
                </div>
              </StyledAccordionSummary>
              {/* map each individual category event to an EventComponent */}
              <StyledAccordionDetails>
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
              </StyledAccordionDetails>
            </Accordion>
          </Paper>
        );
      })}
    </div>
  );
};
