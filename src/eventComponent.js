import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus, faClipboard, faClipboardCheck} from '@fortawesome/free-solid-svg-icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './App.css';

export class EventComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true, //if collapsed, just event title is displayed, details (description, date, img) are shown if collapsed false
      copied: false, //handles the icon change
    };
    this.handleExpandCollapse = this.handleExpandCollapse.bind(this);
    this.handleCopy = this.handleCopy.bind(this);

    this.slugifiedTitle = 'apeoplescalendar.org/calendar/events/' + this.props.stringToSlug(this.props.categoryEvent.title);
  };

  handleExpandCollapse(e) {
    if (this.state.collapsed) {
      //console.log(this.props.stringToSlug(this.props.categoryEvent.title));
    };
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  handleCopy() {
    this.setState({
      copied: true,
    });
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
                <CopyToClipboard className='links copyButton' onCopy={() => this.handleCopy()} text={this.slugifiedTitle}>
                  <div>
                    {!this.state.copied &&
                      <div className='copyWrapper'>
                        <FontAwesomeIcon icon={faClipboard}/>
                        <p className='copyText'>Copy link</p>
                      </div>
                    }
                    {this.state.copied &&
                      <div className='copyWrapper'>
                        <FontAwesomeIcon icon={faClipboardCheck}/>
                        <p className='copyText'>Link copied!</p>
                      </div>
                    }
                  </div>
                </CopyToClipboard>
              </div>
            </div>
          }
        </div>
    );
  };
};
