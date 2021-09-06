import React from 'react';
import '../App/App.css';
import {
  NavLink,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SocialIcons } from '../SocialIcons/socialIconsComponent';
import { calculateHamburgerPosition } from '../../utils/calculateHamburgerPosition';

interface ISmallNavBarProps {
  windowWidth: number;
}

export const SmallNavBar = ({ windowWidth }: ISmallNavBarProps): JSX.Element => {
  const [hamburgerOpen, setHamburgerOpen] = React.useState(false);

  const hamburgerMenuPosition = calculateHamburgerPosition(windowWidth);

  const closeMenu = () => {
    setHamburgerOpen(false);
  };

  const handleHamburgerClick = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  return (
    <>
      {hamburgerOpen && (
        <div id="hamburgerOpen" style={{ top: hamburgerMenuPosition }}>
          <NavLink
            to="/about"
            id="hamburgerAbout"
            className="navText hamburgerText"
            onClick={handleHamburgerClick}
          >
            About
          </NavLink>
          <NavLink
            to="/volunteer"
            id="hamburgerVolunteer"
            className="navText hamburgerText"
            onClick={handleHamburgerClick}
          >
            Volunteer
          </NavLink>
          <NavLink
            to="/calendar"
            id="hamburgerCalendar"
            className="navText hamburgerText"
            onClick={handleHamburgerClick}
          >
            Calendar
          </NavLink>
          <a
            target="_blank"
            rel="noopener noreferrer"
            id="hamburgerContact"
            className="navText hamburgerText"
            href="mailto:apeoplescalendar@gmail.com"
            onClick={handleHamburgerClick}
          >
            Contact
          </a>
        </div>
      )}
      {windowWidth <= 780 && (
        <div id="smallNavBarContainer">
          <NavLink
            to="/"
            className="navBarNavLink"
            id="titleContainer"
            onClick={closeMenu}
          >
            <p id="fullNavTitle">aPC</p>
          </NavLink>
          <div>
            <FontAwesomeIcon
              icon={faBars}
              style={{
                position: 'absolute',
                top: '15px',
                left: windowWidth > 500 ? '95px' : '82px',
                cursor: 'pointer',
              }}
              onClick={handleHamburgerClick}
            />
          </div>
          <SocialIcons windowWidth={windowWidth} />
        </div>
      )}
    </>
  );
};
