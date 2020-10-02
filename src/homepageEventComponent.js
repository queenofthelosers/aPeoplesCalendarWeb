import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus, faClipboard, faClipboardCheck} from '@fortawesome/free-solid-svg-icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './App.css';

export function HomepageEventComponent(props) {
    var paragraphList = props.categoryEvent.description.split("\n\n");
    return (
        <div className='homepageEventWrapper'>
          <div className='homepageEventHeaderWrapper'>
            <header className='homepageHeaderWrapper'>
              <p className='homepageEventHeader'>{props.categoryEvent.title}</p>
            </header>
          </div>
          <div className='homepageEventFull'>
            <p className='homepageEventDate'>{props.categoryEvent.date}</p>
            <img className='homepageEventImg' src={props.categoryEvent.imgSrc} alt={props.categoryEvent.title}/>
            {paragraphList.map(paragraph => <p className='homepageEventDescription'>{paragraph}</p>)}
            <div className='homepageSourcesWrapper'>
              <a className='links source' href={props.categoryEvent.infoSrc} target='_blank' rel="noopener noreferrer">Source</a>
                {props.categoryEvent.infoSrc !== props.categoryEvent.link ?
                  <a className='links more' href={props.categoryEvent.link} target='_blank' rel="noopener noreferrer">More Info</a> :
                  <div className='emptyLink'></div>
                }
            </div>
          </div>
        </div>
  );
};
