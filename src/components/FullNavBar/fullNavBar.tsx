import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faAndroid, faApple} from '@fortawesome/free-brands-svg-icons';
import { SocialIcons } from '../SocialIcons/socialIconsComponent.jsx';

interface IFullNavBarProps {
  windowWidth: number;
}

export function FullNavBar({ windowWidth }: IFullNavBarProps) {
  return (
    <div id="fullNavBarContainer">
      <div id="fullNavLeft">
        <NavLink to="/" className="navBarNavLink" id="titleContainer">
          <p id="fullNavTitle">aPC</p>
        </NavLink>
        <NavLink to="/about" className="fullNavTextContainer navBarNavLink">
          <p className="fullNavText">About</p>
        </NavLink>
        {/* <NavLink to='/donate' className='fullNavTextContainer navBarNavLink'>
            <p className='fullNavText'>Donate</p>
          </NavLink> */}
        <NavLink to="/volunteer" className="fullNavTextContainer navBarNavLink">
          <p className="fullNavText">Volunteer</p>
        </NavLink>
        <NavLink to="/calendar" className="fullNavTextContainer navBarNavLink">
          <p className="fullNavText">Calendar</p>
        </NavLink>
      </div>
      <div id="fullNavRight">
        <SocialIcons windowWidth={windowWidth} />
      </div>
    </div>
  );
}
