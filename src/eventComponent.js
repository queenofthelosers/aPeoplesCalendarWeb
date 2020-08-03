import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus, faShareAlt} from '@fortawesome/free-solid-svg-icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './App.css';

export class EventComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.handleExpandCollapse = this.handleExpandCollapse.bind(this);
    this.slugifiedTitle = 'apeoplescalendar.org/events/' + this.props.stringToSlug(this.props.categoryEvent.title);
  };

  handleExpandCollapse(e) {
    if (this.state.collapsed) {
      console.log(this.props.stringToSlug(this.props.categoryEvent.title));
    };
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  copyAlert() {
    alert('Link copied!');
  };

  render() {
    return (
        <div className='eventWrapper'>
          <div className='eventHeaderWrapper' onClick={(e) => this.handleExpandCollapse(e)}>
          <div className='eventButton' >
            {this.state.collapsed && <FontAwesomeIcon icon={faPlus}/>}
            {!this.state.collapsed && <FontAwesomeIcon icon={faMinus}/>}
          </div>
          <header className={this.state.collapsed ? 'headerEvent' : 'headerEvent expandedEventHeader'}>
            <p className='eventHeader'>{this.props.categoryEvent.title}</p>
          </header>
          </div>
          {!this.state.collapsed &&
            <div className='eventFull'>
              <p className='eventDate'>{this.props.categoryEvent.date}</p>
              <img className='eventImg' src={this.props.categoryEvent.imgSrc} alt={this.props.categoryEvent.title}/>
              {this.props.paragraphs.map(paragraph => <p className='eventDescription'>{paragraph}</p>)}
                <div className='sourcesWrapper'>
                  <a className='links source' href={this.props.categoryEvent.infoSrc} target='_blank' rel="noopener noreferrer">Source</a>
                  {this.props.categoryEvent.infoSrc !== this.props.categoryEvent.link ?
                    <a className='links more' href={this.props.categoryEvent.link} target='_blank' rel="noopener noreferrer">More Info</a> :
                    <div className='emptyLink'></div>
                  }
                  <CopyToClipboard className='links copyButton' onCopy={() => this.copyAlert()} text={this.slugifiedTitle}>
                    <div>
                      <FontAwesomeIcon icon={faShareAlt}/>
                    </div>
                  </CopyToClipboard>
                </div>
              </div>}
        </div>
    );
  };
};
