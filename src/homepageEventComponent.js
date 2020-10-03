import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClipboard, faClipboardCheck} from '@fortawesome/free-solid-svg-icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './App.css';

export class HomepageEventComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        copied: false, //handles the icon change
      };
      this.handleCopy = this.handleCopy.bind(this);
    };

    stringToSlug(str) {
      //credit to https://gist.github.com/codeguy/6684588
      str = str.replace(/^\s+|\s+$/g, ''); //trim
      str = str.toLowerCase();

      // remove accents, swap ñ for n, etc
      var from = "àáäâèéëêìíïîòóöôōùúüûñç·/_,:;";
      var to   = "aaaaeeeeiiiiooooouuuunc------";
      for (var i=0, l=from.length ; i<l ; i++) {
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      };

      str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
          .replace(/\s+/g, '-') // collapse whitespace and replace by -
          .replace(/-+/g, '-'); // collapse dashes

      return str;
    };

    handleCopy() {
      this.setState({
        copied: true,
      });
    };

    render() {
      var slugifiedTitle = 'apeoplescalendar.org/calendar/events/' + this.stringToSlug(this.props.categoryEvent.title);
      var paragraphList = this.props.categoryEvent.description.split("\n\n");
      return (
        <div className='homepageEventWrapper'>
          <div className='homepageEventHeaderWrapper'>
            <header className='homepageHeaderWrapper'>
              <p className='homepageEventHeader'>{this.props.categoryEvent.title}</p>
            </header>
          </div>
          <div className='homepageEventFull'>
            <p className='homepageEventDate'>{this.props.categoryEvent.date}</p>
            <img className='homepageEventImg' src={this.props.categoryEvent.imgSrc} alt={this.props.categoryEvent.title}/>
            {paragraphList.map(paragraph => <p className='homepageEventDescription'>{paragraph}</p>)}
            <div className='homepageSourcesWrapper'>
              <a className='links source' href={this.props.categoryEvent.infoSrc} target='_blank' rel="noopener noreferrer">Source</a>
                {this.props.categoryEvent.infoSrc !== this.props.categoryEvent.link ?
                  <a className='links more' href={this.props.categoryEvent.link} target='_blank' rel="noopener noreferrer">More Info</a> :
                  <div className='emptyLink'></div>
                }
                <CopyToClipboard className='links copyButton' onCopy={() => this.handleCopy()} text={slugifiedTitle}>
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
        </div>
    );
  };
};
