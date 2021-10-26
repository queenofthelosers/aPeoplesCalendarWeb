import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Main } from '../Main/main';
import { About } from '../About/about';
import { Volunteer } from '../Volunteer/volunteer';
import { NotFound } from '../NotFound/notFound';
import { FullNavBar } from '../FullNavBar/fullNavBar';
import { HomepageComponent } from '../Homepage/homepageComponent';
import { IconComponent } from '../LogoIcon/logoIcon';
import { SmallNavBar } from '../SmallNavBar/smallNavBar';
import headerImg from '../../assets/Protests-85-skinniest.jpg';
// import { databaseChecks } from '../../utils/databaseChecks';

const App = (): JSX.Element => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
  const [eventLibrary, setEventLibrary] = React.useState();
  const [loadingEvents, setLoadingEvents] = React.useState(true);

  React.useEffect(() => {
    fetchEventLibrary();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchEventLibrary = async () => {
    try {
      const response = await fetch(
        `${process.env.PUBLIC_URL}/eventLibrary.json`,
      );
      const fetchedEvents = await response.json();
      setEventLibrary(fetchedEvents);
      setLoadingEvents(false);
    } catch (e: any) {
      alert(
        `Sorry, it looks like we had trouble fetching events: ${e.message}`,
      );
      setLoadingEvents(false);
    }
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  return (
    <Router>
      <img
        src={headerImg}
        alt="A police officer maces a peaceful protester at a black lives matter protest in Ohio"
        id="bannerImg"
      />
      <div>
        {windowWidth > 780 && <FullNavBar windowWidth={windowWidth} />}
        {windowWidth <= 780 && <SmallNavBar windowWidth={windowWidth} />}
      </div>
      <Switch>
        <Route path="/calendar/day/:day">
          <Main
            winDim={{ width: windowWidth, height: windowHeight }}
            eventLibrary={eventLibrary}
            loading={loadingEvents}
          />
        </Route>
        <Route path="/calendar/search">
          <Main
            winDim={{ width: windowWidth, height: windowHeight }}
            eventLibrary={eventLibrary}
            loading={loadingEvents}
          />
        </Route>
        <Route path="/calendar/events/:event_">
          <Main
            winDim={{ width: windowWidth, height: windowHeight }}
            eventLibrary={eventLibrary}
            loading={loadingEvents}
          />
        </Route>
        <Route path="/calendar">
          <Main
            winDim={{ width: windowWidth, height: windowHeight }}
            eventLibrary={eventLibrary}
            loading={loadingEvents}
          />
        </Route>
        <Route path="/about">
          <About />
        </Route>
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
            eventLibrary={eventLibrary}
            loading={loadingEvents}
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
