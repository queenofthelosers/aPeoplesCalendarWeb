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
          <p id='volunteerHeaderText'>404'd</p>
        </header>
        <p className='volunteerText centeredText'>Looks like the url you tried was wonky.</p>
        <p className='volunteerText centeredText' id='bottomP'>Try searching the calendar on the <NavLink className='volunteerLink' to='/'>homepage</NavLink>.</p>
      </div>
    </div>
  );
};
