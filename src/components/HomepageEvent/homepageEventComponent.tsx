import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../App/App.css';
import { stringToSlug } from '../../utils/stringToSlug';
import { DatabaseEvent } from '../../utils/types';

interface IHomepageEventProps {
  categoryEvent: DatabaseEvent;
  winDim: {
    width: number;
    height: number;
  };
}

export const HomepageEventComponent = ({ categoryEvent, winDim }: IHomepageEventProps) => {
  const [copied, setCopied] = React.useState<boolean>(false);
  const [eventDisplayWidth, setEventDisplayWidth] = React.useState<number>(1);
  const [imgDim, setImgDim] = React.useState<any>({ width: 1, height: 1 });
  let eventDisplayRef: any;
  let imgRef: any;

  const getImgDim = () => {
    console.log('getImgDim running...');
    console.log(imgRef);
    if (imgRef) {
      setImgDim({
        imgWidth: imgRef.naturalWidth,
        imgHeight: imgRef.naturalHeight,
      });
    }
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     copied: false, // handles the icon change
  //     eventDisplayWidth: 1,
  //     imgWidth: 2, // for resizing
  //     imgHeight: 2,
  //   };
  //   this.handleCopy = this.handleCopy.bind(this);
  //   this.getImgDim = this.getImgDim.bind(this);
  // }

  React.useEffect(() => {
    setEventDisplayWidth(eventDisplayRef?.clientWidth);
  }, [eventDisplayRef]);

  const handleCopy = () => {
    setCopied(true);
  };

  const slugifiedTitle = `apeoplescalendar.org/calendar/events/${stringToSlug(categoryEvent.title)}`;
  const paragraphList: string[] = categoryEvent.description.split('\n\n');
  // image resizing logic
  const { imgWidth, imgHeight } = imgDim;
  let resizeWidth = eventDisplayWidth * 0.75; // 75% of width of container
  let ratio = resizeWidth / imgWidth; // the ratio by which the image has changed
  let resizeHeight = imgHeight * ratio; // apply ratio to height
  if (resizeHeight > winDim.height / 2.5) {
    if (winDim.height > 875) {
      resizeHeight = 350;
    } else {
      resizeHeight = 250;
    }
    ratio = resizeHeight / imgHeight;
    resizeWidth = imgWidth * ratio;
    // console.log('using height resize');
  } else {
    // console.log('using width resize');
  }

  console.log('ratio');
  console.log(ratio);
  console.log('resizeHeight');
  console.log(resizeHeight);
  console.log('winDim');
  console.log(winDim);
  console.log('imgDim');
  console.log(imgDim);

  return (
    <div className="homepageEventWrapper">
      <div className="homepageEventHeaderWrapper">
        <header className="homepageHeaderWrapper">
          <p className="homepageEventHeader">{categoryEvent.title}</p>
        </header>
      </div>
      <div className="homepageEventFull" ref={(eventDisplay) => eventDisplayRef = eventDisplay}>
        <p className="homepageEventDate">{categoryEvent.date}</p>
        {imgWidth !== 1 && (
            <img
              className="eventImg"
              src={`${process.env.PUBLIC_URL}${categoryEvent.imgSrc}`}
              alt={categoryEvent.title}
              style={{ width: resizeWidth, height: resizeHeight }}
              ref={(img) => imgRef = img}
              onLoad={getImgDim}
            />
        )}
        {paragraphList.map((paragraph) => <p className="homepageEventDescription">{paragraph}</p>)}
        <div className="homepageSourcesWrapper">
          <a className="links source" href={categoryEvent.infoSrc} target="_blank" rel="noopener noreferrer">Source</a>
          {categoryEvent.infoSrc !== categoryEvent.link
            ? <a className="links more" href={categoryEvent.link} target="_blank" rel="noopener noreferrer">More Info</a>
            : <div className="emptyLink" />}
          <div className="links copyButton">
          <CopyToClipboard onCopy={handleCopy} text={slugifiedTitle}>
            <div>
              {!copied && (
                    <div className="copyWrapper">
                      <FontAwesomeIcon icon={faClipboard} />
                      <p className="copyText">Copy link</p>
                    </div>
                    )}
              {copied && (
                    <div className="copyWrapper">
                      <FontAwesomeIcon icon={faClipboardCheck} />
                      <p className="copyText">Link copied!</p>
                    </div>
                    )}
            </div>
          </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
}
