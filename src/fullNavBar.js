import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import {SocialIcon} from 'react-social-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAndroid, faApple} from '@fortawesome/free-brands-svg-icons';

export function FullNavBar() {
  return (
      <div id='fullNavBarContainer'>
        <div id='fullNavLeft'>
          <NavLink to='/' className='navBarNavLink' id='titleContainer'>
            <p id='fullNavTitle'>aPC</p>
          </NavLink>
          <NavLink to='/about' className='fullNavTextContainer navBarNavLink'>
            <p className='fullNavText'>About</p>
          </NavLink>
          <NavLink to='/donate' className='fullNavTextContainer navBarNavLink'>
            <p className='fullNavText'>Donate</p>
          </NavLink>
          <NavLink to='/volunteer' className='fullNavTextContainer navBarNavLink'>
            <p className='fullNavText'>Volunteer</p>
          </NavLink>
          <NavLink to='/' className='fullNavTextContainer navBarNavLink'>
            <p className='fullNavText'>Calendar</p>
          </NavLink>
        </div>
        <div id='fullNavRight'>
          <div className='fullNavSocialContainer'>
            <SocialIcon className='fullNavSocial' url='https://www.facebook.com/aPeoplesCalendar' target='_blank'/>
          </div>
          <div className='fullNavSocialContainer'>
            <SocialIcon className='fullNavSocial' url='https://www.twitter.com/aPeoplesCal' target='_blank'/>
          </div>
          <div className='fullNavSocialContainer'>
            <SocialIcon className='fullNavSocial' url='https://www.reddit.com/r/aPeoplesCalendar' target='_blank'/>
          </div>
          <div className='fullNavSocialContainer'>
            <a target='_blank' rel="noopener noreferrer" href='https://play.google.com/store/apps/details?id=com.aPeoplesCalendar.aPC&hl=en_US'>
              <div className='faNavIconContainer' id='androidContainer'>
                <FontAwesomeIcon className='fullNavSocial faNavIcon' icon={faAndroid} color="green" size='lg'/>
              </div>
            </a>
          </div>
          <div className='fullNavSocialContainer'>
            <a target='_blank' rel="noopener noreferrer" href='https://play.google.com/store/apps/details?id=com.aPeoplesCalendar.aPC&hl=en_US'>
              <div className='faNavIconContainer' id='appleContainer'>
                <FontAwesomeIcon className='fullNavSocial faNavIcon' icon={faApple} color='#ededed' size='lg'/>
              </div>
            </a>
          </div>
          <div className='fullNavSocialContainer'>
            <SocialIcon className='fullNavSocial' url='mailto:apeoplescalendar@gmail.com' target='_blank'/>
          </div>
        </div>
      </div>
  );
};
