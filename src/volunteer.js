import React from 'react';
import logo from './logo.svg';
import './volunteer.css';

export function Volunteer() {
  return (
    <div id='volunteerWrapper'>
      <div id='volunteerContent'>
        <header id='volunteerHeader'>
          <p id='headerText'>Volunteer</p>
        </header>
        <p className='volunteerText'>Whether you are an expert in African labor history, a developer with feature ideas, or are just someone who can proofread calendar events, we welcome your efforts and suggestions towards helping make our calendar more comprehensive and easier to use.</p>
        <ul>
          <li>
            <p className='volunteerListText'>Are you a history buff who noticed an important figure or event missing from the calendar? <a className='volunteerLink' target='_blank' rel="noopener noreferrer" href='https://docs.google.com/forms/d/e/1FAIpQLScWvVl15jwOMNyltSzl3elc_mEQzRqamlkKy0HpEvX3fYt_sA/viewform'>Make an event suggestion!</a></p>
          </li>
          <li>
            <p className='volunteerListText'>Are you a developer who has a feature idea? <a className='volunteerLink' target='_blank' rel="noopener noreferrer" href='https://github.com/huntzinger92/aPeoplesCalendarWeb'>Our code is open-source</a>.</p>
          </li>
          <li>
            <p className='volunteerListText'>Have a different way to help? Feel free to contact us at <a className='volunteerLink' target='_blank' rel="noopener noreferrer" id='emailLink' href='mailto:apeoplescalendar@gmail.com'>apeoplescalendar@gmail.com</a>.
          </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
