import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';

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
    return (
        <div className='eventWrapper' onClick={(e) => this.handleExpandCollapse(e)}>
          <div className='collapseButton' onClick={(e) => this.handleExpandCollapse(e)}>
            {this.state.collapsed && <FontAwesomeIcon icon={faPlus}/>}
            {!this.state.collapsed && <FontAwesomeIcon icon={faMinus}/>}
          </div>
          <header className='eventHeaderWrapper'>
            <p className='eventHeader'>{this.props.categoryEvent.title}</p>
          </header>
          {!this.state.collapsed &&
            <div>
              <p className='eventDate'>{this.props.categoryEvent.date}</p>
              <img className='eventImg' src={this.props.categoryEvent.imgSrc}/>
              {this.props.paragraphs.map(paragraph => <p className='eventDescription'>{paragraph}</p>)}
                <div className='sourcesWrapper'>
                  <a className='source' href={this.props.categoryEvent.infoSrc} target='_blank'>Source</a>
                  <a className='source' href={this.props.categoryEvent.link} target='_blank'>More Info</a>
                  </div>
              </div>}
        </div>
    );
  };
};
