import React from 'react';
import './volunteer.css';
import {
  NavLink,
} from "react-router-dom";

export function NotFound() {
  return (
    <div id='volunteerWrapper'>
      <div id='volunteerContent'>
        <header id='volunteerHeader'>
          <p id='volunteerHeaderText'>404'd!</p>
        </header>
        <p className='volunteerText centeredText'>Sorry, looks like the url you tried didn't work for us.</p>
        <p className='volunteerText centeredText' id='bottomP'><NavLink className='volunteerLink' to='/'>Try searching the calendar on the homepage</NavLink>.</p>
      </div>
    </div>
  );
};
