import React from 'react';
import './App.css';
import {Main} from './main.js';
import {About} from './about.js';
import {Volunteer} from './volunteer.js';
import {Donate} from './donate.js';
import {NotFound} from './notFound.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      openHamburger: false,
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleHamburger = this.handleHamburger.bind(this);
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  };

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  };

  handleHomeHamburgerClick() {
    this.resetDay();
    this.handleClick();
  };

  handleClick() {
    this.setState({
      openHamburger: !this.state.openHamburger
    });
  };

  handleResize(e) {
    this.setState({
      windowWidth: window.innerWidth
    });
  };

  handleHamburger(e) {
    this.setState({
      openHamburger: !this.state.openHamburger
    });
  };

  //this is a necessary evil right now. resetDay() does nothing until <Main/> is rendered, when it is defined as the initializeToday function from <Main1/>
  //This code is executed when the title (or "Home" link from hamburger menu) is clicked, causing <Main1/> reset with today's date
  //I have tried to move the today-initializing code up to this parent component, but the <Main/> <Main1/> situation prevents it from working
  //when <App/> state updates, the props sent to <Main/> update, but the ones to <Main1/> do not. Instead, we get to have this placeholder function:
  resetDay() {
    //re-written as initializedToday in main.js
    return '';
  };

  render() {
    return (
      <Router>
        {this.state.windowWidth > 800 && <div id='navBar'>
          <NavLink className='navTextWrapper' to='/about'>
            <p id='aboutLink' className='navText'>About</p>
          </NavLink>
          <NavLink className='navTextWrapper' to='/donate'>
            <NavLink to='/donate' id='donateLink' className='navText'>Donate</NavLink>
          </NavLink>
          <NavLink className='navTextWrapper' id='navTitleWrapper' to='/'>
            <NavLink to='/' className='navText' id='title' onClick={() => this.resetDay()}>A People's Calendar</NavLink>
          </NavLink>
          <NavLink className='navTextWrapper' to='/volunteer'>
            <NavLink to='/volunteer' id='volunteer' className='navText'>Volunteer</NavLink>
          </NavLink>
          <a target='_blank' rel="noopener noreferrer" href='mailto:apeoplescalendar@gmail.com' className='navTextWrapper'>
            <a target='_blank' rel="noopener noreferrer" id='contactLink' className='navText' href='mailto:apeoplescalendar@gmail.com'>Contact</a>
          </a>
        </div>}
        {this.state.openHamburger && <div id='hamburgerOpen'>
            <NavLink to='/' className='navText hamburgerText' id='hamburgerHome' onClick={() => this.handleHomeHamburgerClick()}>Home</NavLink>
            <NavLink to='/about' id='hamburgerAbout' className='navText hamburgerText' onClick={() => this.handleClick()}>About</NavLink>
            <NavLink to='/donate' id='hamburgerDonate' className='navText hamburgerText' onClick={() => this.handleClick()}>Donate</NavLink>
            <NavLink to='/volunteer' id='hamburgerVolunteer' className='navText hamburgerText' onClick={() => this.handleClick()}>Volunteer</NavLink>
            <a target='_blank' rel="noopener noreferrer" id='hamburgerContact' className='navText hamburgerText' href='mailto:apeoplescalendar@gmail.com' onClick={() => this.handleClick()}>Contact</a>
          </div>
        }
        {this.state.windowWidth <= 800 && <div id='navBar'>
          <FontAwesomeIcon icon={faBars} style={{position: 'absolute', left: '25px'}} onClick={(e) => this.handleHamburger(e)}/>
          <NavLink to='/' className='navText' id='title' onClick={() => this.resetDay()}>A People's Calendar</NavLink>
        </div>}
        <Switch>
          <Route path='/about'>
            <About/>
          </Route>
          <Route path='/donate'>
            <Donate/>
          </Route>
          <Route path='/volunteer'>
            <Volunteer/>
          </Route>
          <Route path='/day/:day'>
            <Main
              resetDay={resetDay => this.resetDay = resetDay}
            />
          </Route>
          <Route path='/events/:event_'>
            <Main
              resetDay={resetDay => this.resetDay = resetDay}
            />
          </Route>
          <Route path='/404'>
            <NotFound/>
          </Route>
          <Route exact path='/'>
            <Main
              resetDay={resetDay => this.resetDay = resetDay}
            />
          </Route>
          <Route>
            <Redirect
              to={{
                pathname: "/404",
              }}
            />

          </Route>
        </Switch>
      </Router>
    );
  };
};

export default App;
