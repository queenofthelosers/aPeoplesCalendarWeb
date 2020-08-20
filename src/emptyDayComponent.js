import React from 'react';
import './App.css';

export function EmptyDay(props) {
  return (
    <div id='emptyPromptWrapper'>
      {!props.displaySearch &&
        <div id='emptyDayMessageWrapper'>
          <p className="emptyPrompt">Looks like we don't have any entries for this day yet.</p>
          <div id='emptyDayLinkWrapper'>
            <p className="emptyPrompt" id='emptyLinkWrapper'><a href='https://docs.google.com/forms/d/e/1FAIpQLScWvVl15jwOMNyltSzl3elc_mEQzRqamlkKy0HpEvX3fYt_sA/viewform' target="_blank" rel="noopener noreferrer" className='emptyPromptLink'>Want to make an event suggestion?</a></p>
          </div>
        </div>
      }
      {props.displaySearch &&
        <div id='emptyDayMessageWrapper'>
          <p className="emptyPrompt">Looks like we don't have any entries that matched your search query.</p>
          <div id='emptyDayLinkWrapper'>
            <p className="emptyPrompt" id='emptyLinkWrapper'><a href='https://docs.google.com/forms/d/e/1FAIpQLScWvVl15jwOMNyltSzl3elc_mEQzRqamlkKy0HpEvX3fYt_sA/viewform' target="_blank" rel="noopener noreferrer" className='emptyPromptLink'>Want to suggest an event or person that was missing?</a></p>
          </div>
        </div>
      }
    </div>
  )
}
