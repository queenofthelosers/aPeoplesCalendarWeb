/* eslint no-return-assign: "off" */
import React from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboard,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../App/App.css';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { stringToSlug } from '../../utils/stringToSlug';
// eslint-disable-next-line
import { DatabaseEvent } from '../../utils/types';

const StyledAccordionSummary = withStyles({
  content: {
    flexGrow: 0,
  },
  expanded: {
    marginBottom: -28,
  },
})(AccordionSummary);

// to-do:
// create generic event "card" component
// loading condition for image (can see on deep linking)
// link preview on social media with react-helmet?

interface IEventComponentProps {
  initCollapsed: boolean;
  categoryEvent: DatabaseEvent;
  eventDisplayWidth: number;
  winDim: {
    height: number;
    width: number;
  };
  paragraphs: string[];
}

export const EventComponent = ({
  initCollapsed,
  categoryEvent,
  eventDisplayWidth,
  winDim,
  paragraphs,
}: IEventComponentProps) => {
  const [expanded, setExpanded] = React.useState<boolean>(!initCollapsed);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [imgDim, setImgDim] = React.useState<any>({ width: 2, height: 2 });
  const slugifiedTitle = `apeoplescalendar.org/calendar/events/${stringToSlug(
    categoryEvent.title,
  )}`;
  let imgRef: any;

  const getImgDim = () => {
    if (imgRef) {
      setImgDim({
        imgWidth: imgRef.naturalWidth,
        imgHeight: imgRef.naturalHeight,
      });
    }
  };

  const handleExpandCollapse = () => {
    setExpanded(!expanded);
  };

  const handleCopy = () => {
    setCopied(true);
  };
  const { imgWidth, imgHeight } = imgDim;
  // image resizing logic:
  // move to util file?
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
  }

  return (
    <div className="eventWrapper">
      {/* <Helmet>
              <title>{this.props.categoryEvent.title}</title>
              <meta property="og:title" content={this.props.categoryEvent.title} />
              <meta property="og:description" content={this.props.categoryEvent.paragraphs[0]}/>
              <meta property="og:image" content={this.props.categoryEvent.imgSrc}>
              <meta property="og:url" content={this.slugifiedTitle}>
        </Helmet> */}
      <Accordion expanded={expanded} onChange={handleExpandCollapse}>
        <StyledAccordionSummary>
          <Box
            style={{ display: 'flex', flexDirection: 'column', padding: 10 }}
          >
            <Typography
              style={{
                fontSize: '1.28em',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {categoryEvent.title}
            </Typography>
            {imgWidth !== 1 && (
              <img
                className="eventImg"
                src={`${process.env.PUBLIC_URL}${categoryEvent.imgSrc}`}
                alt={categoryEvent.imgAlt}
                style={{ width: resizeWidth, height: resizeHeight }}
                ref={(img) => (imgRef = img)}
                onLoad={getImgDim}
              />
            )}
            {!expanded && (
              <>
                <Typography
                  style={{
                    paddingLeft: 26,
                    paddingRight: 26,
                    marginTop: 10,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {categoryEvent.date}
                </Typography>
                <Typography>{categoryEvent.otd}</Typography>
                <MoreHorizIcon
                  style={{ margin: 'auto', marginTop: 5 }}
                  onClick={handleExpandCollapse}
                />
              </>
            )}
          </Box>
        </StyledAccordionSummary>
        <AccordionDetails
          style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}
        >
          <div className="eventFull" style={{ paddingTop: 0 }}>
            <div onClick={handleExpandCollapse} style={{ cursor: 'pointer' }}>
              <Typography
                style={{
                  paddingLeft: 26,
                  paddingRight: 26,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {categoryEvent.date}
              </Typography>
              {paragraphs.map((paragraph) => (
                <Typography
                  style={{ marginTop: 10, paddingLeft: 26, paddingRight: 26 }}
                >
                  {paragraph}
                </Typography>
              ))}
            </div>
            <div className="sourcesWrapper">
              <a
                className="links source"
                href={categoryEvent.infoSrc}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source
              </a>
              {categoryEvent.infoSrc !== categoryEvent.link ? (
                <a
                  className="links more"
                  href={categoryEvent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More Info
                </a>
              ) : (
                <div className="emptyLink" />
              )}
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
