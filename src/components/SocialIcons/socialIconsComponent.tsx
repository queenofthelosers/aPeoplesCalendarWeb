import React from 'react';
// @ts-ignore: Unreachable code error
import { SocialIcon } from 'react-social-icons';
// @ts-ignore: Unreachable code error
import MobileStoreButton from 'react-mobile-store-button';
// import socialIcon from 'react-social-icons/dist/social-icon';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faAndroid, faApple} from '@fortawesome/free-brands-svg-icons';

interface ISocialIconsProps {
  windowWidth: number;
}

export function SocialIcons({ windowWidth }: ISocialIconsProps) {
  let socialIconSize = {
    height: 35,
    width: 35,
  };
  let fullNavMargin = {
    marginLeft: windowWidth < 410 ? '2px' : '6px',
    marginRight: windowWidth < 410 ? '2px' : '6px',
  };
  if (windowWidth > 850) {
    socialIconSize = { height: 44, width: 44 };
  } else if (windowWidth < 410) {
    fullNavMargin = { marginRight: '2px', marginLeft: '2px' };
  }
  return (
    <div id="socialWrapper">
      {/* <div className='fullNavSocialContainer' style={fullNavMargin}>
        <SocialIcon className='fullNavSocial' url='https://www.facebook.com/aPeoplesCalendar' style={socialIconSize} target='_blank'/>
      </div> */}
      <div className="fullNavSocialContainer" style={fullNavMargin}>
        <SocialIcon
          className="fullNavSocial"
          url="https://www.twitter.com/aPeoplesCal"
          style={socialIconSize}
          target="_blank"
        />
      </div>
      <div className="fullNavSocialContainer" style={fullNavMargin}>
        <SocialIcon
          className="fullNavSocial"
          url="https://www.reddit.com/r/aPeoplesCalendar"
          style={socialIconSize}
          target="_blank"
        />
      </div>
      {windowWidth > 780 && (
        <div className="fullNavSocialContainer" style={fullNavMargin}>
          <SocialIcon
            className="fullNavSocial"
            url="mailto:apeoplescalendar@gmail.com"
            style={socialIconSize}
            target="_blank"
          />
        </div>
      )}
      <div className="fullNavSocialContainer" style={fullNavMargin}>
        <MobileStoreButton
          store="android"
          url="https://play.google.com/store/apps/details?id=com.aPeoplesCalendar.aPC&hl=en_US"
          height={socialIconSize.height + 16}
          width={socialIconSize.width + 100}
          linkProps={{ title: 'Android Store Button' }}
          linkStyles={{ padding: '0px' }}
        />
      </div>

      {/* <div className='fullNavSocialContainer'>
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
      </div> */}
    </div>
  );
}
