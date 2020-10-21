import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus, faClipboard, faClipboardCheck} from '@fortawesome/free-solid-svg-icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './App.css';
//import Helmet from 'react-helmet';

export class EventComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true, //if collapsed, just event title is displayed, details (description, date, img) are shown if collapsed false
      copied: false, //handles the icon change
      imgWidth: 1, //for resizing
      imgHeight: 1,
    };
    this.handleExpandCollapse = this.handleExpandCollapse.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.getImgDim = this.getImgDim.bind(this);

    this.slugifiedTitle = 'apeoplescalendar.org/calendar/events/' + this.props.stringToSlug(this.props.categoryEvent.title);
  };

  getImgDim(height, width) {
    this.setState({
      imgWidth: width,
      imgHeight: height
    });
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
    //image resizing logic:
    const image = this.props.categoryEvent.imgSrc;
    //const image = resolveAssetSource(imgSrc);
    const width = this.state.imgWidth;
    const height = this.state.imgHeight;
    //console.log('window height: ' + this.props.winDim.height);
    //console.log('window width: ' + this.props.winDim.width);
    //second, try resizing image to be around 28% of total view height
    var resizeHeight = this.props.winDim.height/2; //image will take up 50% of the window's height
    var ratio = resizeHeight/height; //the ratio by which image has shrunk
    var resizeWidth = width * ratio; //apply ratio to width
    //if the resized image becomes too wide (happens with short but wide images)
    if (resizeWidth > this.props.eventDisplayWidth - 40) {
      //console.log('image too damn big');
      //resize the image with respect to width, setting it equal to 80% of total view width
      resizeWidth = this.props.eventDisplayWidth - 40;
      ratio = resizeWidth/width; //new ratio of shrunkedness
      resizeHeight = height * ratio; //apply new ratio to height
      console.log('resized for width at ' + resizeWidth);
    } else {
      console.log('resized for height at ' + resizeHeight);
    };
    return (
        <div className='eventWrapper'>
          {/*<Helmet>
                <title>{this.props.categoryEvent.title}</title>
                <meta property="og:title" content={this.props.categoryEvent.title} />
                <meta property="og:description" content={this.props.categoryEvent.paragraphs[0]}/>
                <meta property="og:image" content={this.props.categoryEvent.imgSrc}>
                <meta property="og:url" content={this.slugifiedTitle}>
          </Helmet>*/}
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
            <div className='eventFull' ref={eventFull => this.eventFull = eventFull}>
              <p className='eventDate'>{this.props.categoryEvent.date}</p>
              <img
                className='eventImg'
                src={this.props.categoryEvent.imgSrc}
                alt={this.props.categoryEvent.title}
                style={{width: resizeWidth, height: resizeHeight}}
                ref={img => this.imgRef = img}
                onLoad={() => this.getImgDim(this.imgRef.naturalHeight, this.imgRef.naturalWidth)}
              />
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
