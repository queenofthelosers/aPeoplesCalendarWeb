import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import './App.css';

export class EventComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.handleExpandCollapse = this.handleExpandCollapse.bind(this);
  };

  handleExpandCollapse(e) {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    //if you want to include plus/minus icons, put this below first opening div tag:
    /*<div className='collapseButton' onClick={(e) => this.handleExpandCollapse(e)}>
      {this.state.collapsed && <FontAwesomeIcon icon={faPlus}/>}
      {!this.state.collapsed && <FontAwesomeIcon icon={faMinus}/>}
    </div>
    */
    return (
        <div className='eventWrapper'>
          <div className='eventHeaderWrapper' onClick={(e) => this.handleExpandCollapse(e)}>
          <div className='eventButton' >
            {this.state.collapsed && <FontAwesomeIcon icon={faPlus}/>}
            {!this.state.collapsed && <FontAwesomeIcon icon={faMinus}/>}
          </div>
          <header className={this.state.collapsed ? '' : 'expandedEventHeader'}>
            <p className='eventHeader'>{this.props.categoryEvent.title}</p>
          </header>
          </div>
          {!this.state.collapsed &&
            <div className='eventFull'>
              <p className='eventDate'>{this.props.categoryEvent.date}</p>
              <img className='eventImg' src={this.props.categoryEvent.imgSrc}/>
              {this.props.paragraphs.map(paragraph => <p className='eventDescription'>{paragraph}</p>)}
                <div className='sourcesWrapper'>
                  <a className='links source' href={this.props.categoryEvent.infoSrc} target='_blank'>Source</a>
                  <a className='links more' href={this.props.categoryEvent.link} target='_blank'>More Info</a>
                  </div>
              </div>}
        </div>
    );
  };
};
