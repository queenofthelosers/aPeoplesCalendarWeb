import React from 'react';
import logo from './logo.svg';

export function EventComponent(props) {
  return (
      <div className='eventWrapper'>
        <header className='eventHeaderWrapper'>
          <p className='eventHeader'>{props.categoryEvent.title}</p>
        </header>
        <p className='eventDate'>{props.categoryEvent.date}</p>
        <img className='eventImg' src={props.categoryEvent.imgSrc}/>
        {props.paragraphs.map(paragraph => <p className='eventDescription'>{paragraph}</p>)}
        <div className='sourcesWrapper'>
          <a className='source' href={props.categoryEvent.infoSrc} target='_blank'>Source</a>
          <a className='source' href={props.categoryEvent.link} target='_blank'>More Info</a>
        </div>
      </div>
  );
};
