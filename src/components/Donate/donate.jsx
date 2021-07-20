import React from 'react';
import './volunteer.css';

export function Donate() {
  return (
    <div id="volunteerWrapper">
      <div id="volunteerContent">
        <header id="volunteerHeader">
          <p id="volunteerHeaderText">Donate</p>
        </header>
        <p className="volunteerText">A People's Calendar is continuously updated with figures and events that are currently missing from its library. Any support you can give helps make this project more comprehensive in scope and accurate in content.</p>
        <ul>
          <li>
            <p className="volunteerListText">
              Want to become a regular contributor?
              <a className="volunteerLink" target="_blank" rel="noopener noreferrer" href="https://www.patreon.com/apeoplescalendar?fan_landing=true">Become a Patreon member</a>
              {' '}
              at any amount and receive regular updates on the newest entries we have cataloged!
            </p>
          </li>
          <li>
            <p className="volunteerListText">
              Just want to make a one time donation? Right now, we have a
              <a className="volunteerLink" target="_blank" rel="noopener noreferrer" href="https://www.gofundme.com/f/get-a-people039s-calendar-on-the-app-store">GoFundMe</a>
              {' '}
              that is seeking to cover costs distribution of our app on Apple Devices.
            </p>
          </li>
          <li>
            <p className="volunteerListText">
              Want to help out, but can't spare the cash? You can help us research events by suggesting entries with this
              <a className="volunteerLink" target="_blank" rel="noopener noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLScWvVl15jwOMNyltSzl3elc_mEQzRqamlkKy0HpEvX3fYt_sA/viewform">Google Form</a>
              {' '}
              or
              <a className="volunteerLink" target="_blank" rel="noopener noreferrer" id="emailLink" href="mailto:apeoplescalendar@gmail.com">contact us</a>
              {' '}
              with any typos/inaccuracies you find in the calendar's entries.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
