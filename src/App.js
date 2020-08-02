import React from 'react';
import './App.css';
import {Main} from './main.js';
import {About} from './about.js';
import {Volunteer} from './volunteer.js';
import {Donate} from './donate.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
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

  render() {
    return (
      <Router>
        {this.state.windowWidth > 800 && <div id='navBar'>
          <NavLink to='/about' id='aboutLink' className='navText'>About</NavLink>
          <NavLink to='/donate' id='donateLink' className='navText'>Donate</NavLink>
          <NavLink to='/' className='navText' id='title'>A People's Calendar</NavLink>
          <NavLink to='/volunteer' id='volunteer' className='navText'>Volunteer</NavLink>
          <a target='_blank' rel="noopener noreferrer" id='contactLink' className='navText' href='mailto:apeoplescalendar@gmail.com'>Contact</a>
        </div>}
        {this.state.openHamburger && <div id='hamburgerOpen'>
            <NavLink to='/' className='navText hamburgerText' id='hamburgerHome' onClick={() => this.handleClick()}>Home</NavLink>
            <NavLink to='/about' id='hamburgerAbout' className='navText hamburgerText' onClick={() => this.handleClick()}>About</NavLink>
            <NavLink to='/donate' id='hamburgerDonate' className='navText hamburgerText' onClick={() => this.handleClick()}>Donate</NavLink>
            <NavLink to='/volunteer' id='hamburgerVolunteer' className='navText hamburgerText' onClick={() => this.handleClick()}>Volunteer</NavLink>
            <a target='_blank' rel="noopener noreferrer" id='hamburgerContact' className='navText hamburgerText' href='mailto:apeoplescalendar@gmail.com' onClick={() => this.handleClick()}>Contact</a>
          </div>
        }
        {this.state.windowWidth <= 800 && <div id='navBar'>
          <FontAwesomeIcon icon={faBars} style={{position: 'absolute', left: '25px'}} onClick={(e) => this.handleHamburger(e)}/>
          <NavLink to='/' className='navText' id='title'>A People's Calendar</NavLink>
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
          <Route path='/'>
            <Main/>
          </Route>
        </Switch>
      </Router>
    );
  };
};

export default App;
