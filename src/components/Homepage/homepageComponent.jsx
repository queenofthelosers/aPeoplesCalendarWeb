import React from 'react';
import '../App/App.css';
import {
  NavLink,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { eventLibrary } from '../../eventLibrary.js';
import { HomepageEventComponent } from '../HomepageEvent/homepageEventComponent.jsx';

export function HomepageComponent(props) {
  // get event of the day
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  // for the actual getting of data:
  const initTodayString = `${month}-${day}`;
  // todaysEvents is an object of categories (Rebellion, Labor, etc.), where each prop is a list of events that happened otd
  const todaysEvents = eventLibrary[initTodayString];
  const categoryList = ['Revolution', 'Rebellion', 'Labor', 'Birthdays', 'Assassinations', 'Other'];
  let eventOfTheDay = { description: '' };
  for (let i = 0; i < categoryList.length; i++) {
    const category = categoryList[i];
    for (let j = 0; j < todaysEvents[category].length; j++) {
      // console.log(todaysEvents[category][j].description.length);
      if (todaysEvents[category][j].description.length >= eventOfTheDay.description.length) {
        eventOfTheDay = todaysEvents[category][j];
      }
    }
  }

  return (
    <div id="homepageWrapper">
      <div id="homepageContent">
        <img
          src={require('../../assets/howardZinnHeadshot.jpg')}
          alt="a portrait of historian Howard Zinn"
          id="homepageImg"
        />
        <div id="homepageText">
          <p id="homepageHeader">A People's Calendar</p>
          <div>
            <p id="homepageDescription">Inspired by Howard Zinn's work "A People's History of the United States", A People's Calendar (aPC) is a project that seeks to promote the worldwide history of working class movements and liberation struggles in the form of a searchable "On This Day" calendar.</p>
            <p id="homepageDescription">This history includes, but is not limited to, indigenous resistance against colonization, the black liberation struggle, unionization efforts, slave rebellions, the women's suffrage movement, and revolution.</p>
          </div>
          <NavLink to="/calendar" id="toTheCalendarOuterWrapper">
            <div to="/calendar" id="toTheCalendarWrapper">
              <p id="toTheCalendar">To the Calendar</p>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </NavLink>
        </div>
        <div id="eventOfTheDayWrapper">
          <div id="eventOTDTextWrapper">
            <p id="eventOfTheDay">Event of the Day</p>
          </div>
          <HomepageEventComponent
            categoryEvent={eventOfTheDay}
            winDim={props.winDim}
          />
        </div>
      </div>
    </div>
  );
}
