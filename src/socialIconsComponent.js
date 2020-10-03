import React from 'react';
import {SocialIcon} from 'react-social-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAndroid, faApple} from '@fortawesome/free-brands-svg-icons';
//import MobileStoreButton from 'react-mobile-store-button';

export function SocialIcons(props) {
  var socialIconSize;
  if (props.windowWidth > 850) {
    socialIconSize = {height: 44, width: 44};
  } else if (props.windowWidth > 725) {
    socialIconSize = {height: 35, width: 35};
  } else {
    socialIconSize = {height: 35, width: 35};
  };
  return (
    <div id='socialWrapper'>
      <div className='fullNavSocialContainer'>
        <SocialIcon className='fullNavSocial' url='https://www.facebook.com/aPeoplesCalendar' style={socialIconSize} target='_blank'/>
      </div>
      <div className='fullNavSocialContainer'>
        <SocialIcon className='fullNavSocial' url='https://www.twitter.com/aPeoplesCal' style={socialIconSize} target='_blank'/>
      </div>
      <div className='fullNavSocialContainer'>
        <SocialIcon className='fullNavSocial' url='https://www.reddit.com/r/aPeoplesCalendar' style={socialIconSize} target='_blank'/>
      </div>
      {props.windowWidth > 780 &&
        <div className='fullNavSocialContainer'>
          <SocialIcon className='fullNavSocial' url='mailto:apeoplescalendar@gmail.com' style={socialIconSize} target='_blank'/>
        </div>
      }
      {/*get it on google play! image, problem is that it is difficult to size
        <MobileStoreButton
          store="android"
          url={androidUrl}
        />*/
      }
      {/*for when you get ios app:
      <MobileStoreButton
        store="android"
        url={'https://play.google.com/store/apps/details?id=com.aPeoplesCalendar.aPC&hl=en_US'}
        linkProps={{ title: 'Android Store Button' }}
      />
      */}
      <div className='fullNavSocialContainer'>
        <a target='_blank' rel="noopener noreferrer" href='https://play.google.com/store/apps/details?id=com.aPeoplesCalendar.aPC&hl=en_US'>
          <div className='faNavIconContainer' id='androidContainer'>
            <FontAwesomeIcon className='fullNavSocial faNavIcon' icon={faAndroid} color="green" size='lg'/>
          </div>
        </a>
      </div>
      <div className='fullNavSocialContainer'>
        <a target='_blank' rel="noopener noreferrer" href='https://www.gofundme.com/f/get-a-people039s-calendar-on-the-app-store'>
          <div className='faNavIconContainer' id='appleContainer'>
            <FontAwesomeIcon className='fullNavSocial faNavIcon' icon={faApple} color='#ededed' size='lg'/>
          </div>
        </a>
      </div>
    </div>
  );
};
