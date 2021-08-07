import React from 'react';
import '../App/App.css';
import { NavLink } from 'react-router-dom';
import { Box, Paper } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { HomepageEventComponent } from '../HomepageEvent/homepageEventComponent';
import { categoryList } from '../../utils/categoryList';
import { getTodayStringAndInitDateInput } from '../../utils/getTodayStringAndInitDateInput';
/* eslint-disable-next-line */
import { DatabaseEvent } from '../../utils/types';
import howardHead from '../../assets/howardZinnHeadshot.jpg';

interface IHomepageProps {
  winDim: {
    width: number;
    height: number;
  };
  eventLibrary: any;
  loading: boolean;
}

export function HomepageComponent({
  winDim,
  eventLibrary,
  loading,
}: IHomepageProps) {
  let eventOfTheDay: DatabaseEvent = {
    category: '',
    description: '',
    date: '',
    title: '',
    imgSrc: '',
    link: '',
    infoSrc: '',
    otd: '',
    imgAlt: '',
    NSFW: false,
  };
  if (!loading) {
    // get event of the day
    const { initTodayString } = getTodayStringAndInitDateInput();
    // todaysEvents is an object of categories (Rebellion, Labor, etc.), where each prop is a list of events that happened otd
    const todaysEvents: any = eventLibrary[initTodayString];
    for (let i = 0; i < categoryList.length; i++) {
      const category = categoryList[i];
      for (let j = 0; j < todaysEvents[category].length; j++) {
        // console.log(todaysEvents[category][j].description.length);
        if (
          todaysEvents[category][j].description.length >=
          eventOfTheDay.description.length
        ) {
          eventOfTheDay = todaysEvents[category][j];
        }
      }
    }
  }

  return (
    <div id="homepageWrapper">
      <div id="homepageContent">
        <img
          src={howardHead}
          alt="a portrait of historian Howard Zinn"
          id="homepageImg"
          width={winDim.width / 3}
        />
        <div id="homepageText">
          <p id="homepageHeader">A People's Calendar</p>
          <div>
            <p id="homepageDescription">
              Inspired by Howard Zinn's work "A People's History of the United
              States", A People's Calendar (aPC) is a project that seeks to
              promote the worldwide history of working class movements and
              liberation struggles in the form of a searchable "On This Day"
              calendar.
            </p>
            <p id="homepageDescription">
              This history includes, but is not limited to, indigenous
              resistance against colonization, the black liberation struggle,
              unionization efforts, slave rebellions, the women's suffrage
              movement, and revolution.
            </p>
          </div>
          <NavLink to="/calendar" id="toTheCalendarOuterWrapper">
            <div id="toTheCalendarWrapper">
              <p id="toTheCalendar">To the Calendar</p>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </NavLink>
        </div>
        <Box id="eventOfTheDayWrapper">
          <Paper id="eventOTDTextWrapper" style={{ width: winDim.width * 0.75, borderRadius: 0 }}>
            <p id="eventOfTheDay">Event of the Day</p>
          </Paper>
          {loading ? (
            <Skeleton />
          ) : (
            <HomepageEventComponent
              categoryEvent={eventOfTheDay}
              winDim={winDim}
            />
          )}
        </Box>
      </div>
    </div>
  );
}
