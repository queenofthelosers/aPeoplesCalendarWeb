import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Main } from '../Main/main';
import { About } from '../About/about';
import { Volunteer } from '../Volunteer/volunteer';
// import {Donate} from './donate.js';
import { NotFound } from '../NotFound/notFound';
import { FullNavBar } from '../FullNavBar/fullNavBar';
import { SocialIcons } from '../SocialIcons/socialIconsComponent';
import { HomepageComponent } from '../Homepage/homepageComponent';
import { IconComponent } from '../LogoIcon/logoIcon';
import { calculateHamburgerPosition } from '../../utils/calculateHamburgerPosition';
import headerImg from '../../assets/Protests-85-skinniest.jpg';

const App = (): JSX.Element => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
  const [hamburgerOpen, setHamburgerOpen] = React.useState(false);

  const scrollRef: React.RefObject<any> = React.createRef();
  const hamburgerMenuPosition = calculateHamburgerPosition(windowWidth);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    executeScroll();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // const handleHomeHamburgerClick = () => {
  //   resetDay();
  //   handleHamburgerClick();
  // }

  const closeMenu = () => {
    setHamburgerOpen(false);
  };

  const handleResize = () => {
    setWindowWidth(window.innerHeight);
    setWindowHeight(window.innerHeight);
    // if window was made wide, auto close hamburger menu
    if (window.innerWidth > 780 && hamburgerOpen) {
      setHamburgerOpen(false);
    }
  };

  const handleHamburgerClick = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const executeScroll = () => {
    scrollRef.current.scrollIntoView();
  };

  return (
    <Router>
      <img
        src={headerImg}
        alt="A police officer maces a peaceful protester at a black lives matter protest in Ohio"
        id="bannerImg"
      />
      <div ref={scrollRef}>
        {windowWidth > 780 && <FullNavBar windowWidth={windowWidth} />}
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
            {/* <NavLink
              to='/donate'
              id='hamburgerDonate'
              className='navText hamburgerText'
              onClick={handleHamburgerClick}>
                Donate
            </NavLink> */}
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
                style={
                  windowWidth > 500
                    ? { position: 'absolute', top: '15px', left: '95px' }
                    : { position: 'absolute', top: '15px', left: '82px' }
                }
                onClick={handleHamburgerClick}
              />
            </div>
            <SocialIcons windowWidth={windowWidth} />
          </div>
        )}
      </div>
      <Switch>
        <Route path="/calendar/day/:day">
          <Main winDim={{ width: windowWidth, height: windowHeight }} />
        </Route>
        <Route path="/calendar/events/:event_">
          <Main winDim={{ width: windowWidth, height: windowHeight }} />
        </Route>
        <Route exact path="/calendar">
          <Main winDim={{ width: windowWidth, height: windowHeight }} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        {/* <Route path='/donate'>
          <Donate/>
        </Route> */}
        <Route path="/volunteer">
          <Volunteer />
        </Route>
        <Route path="/icon">
          <IconComponent />
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Route exact path="/">
          <HomepageComponent
            winDim={{ width: windowWidth, height: windowHeight }}
          />
        </Route>
        <Route>
          <Redirect
            to={{
              pathname: '/404',
            }}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
