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
        eventDisplayWidth: 1,
        imgWidth: 1, //for resizing
        imgHeight: 1,
      };
      this.handleCopy = this.handleCopy.bind(this);
      this.getImgDim = this.getImgDim.bind(this);
    };

    componentDidMount() {
      window.addEventListener("resize", this.handleResize);
      this.setState({
        eventDisplayWidth: this.eventDisplayRef.clientWidth
      });
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

    getImgDim(height, width) {
      this.setState({
        imgWidth: width,
        imgHeight: height
      });
    };

    render() {
      var slugifiedTitle = 'apeoplescalendar.org/calendar/events/' + this.stringToSlug(this.props.categoryEvent.title);
      var paragraphList = this.props.categoryEvent.description.split("\n\n");
      //image resizing logic
      const width = this.state.imgWidth;
      const height = this.state.imgHeight;
      var resizeWidth = this.state.eventDisplayWidth * .75; //90% of width of container
      var ratio = resizeWidth/width; //the ratio by which the image has changed
      var resizeHeight = height * ratio //apply ratio to height
      if (resizeHeight > this.props.winDim.height/2.5) {
        if (this.props.winDim.height > 875) {
          resizeHeight = 350;
        } else {
          resizeHeight = 250;
        };
        ratio = resizeHeight/height;
        resizeWidth = width * ratio;
        //console.log('using height resize');
      } else {
        //console.log('using width resize');
      };
      return (
        <div className='homepageEventWrapper'>
          <div className='homepageEventHeaderWrapper'>
            <header className='homepageHeaderWrapper'>
              <p className='homepageEventHeader'>{this.props.categoryEvent.title}</p>
            </header>
          </div>
          <div className='homepageEventFull' ref={eventDisplay => this.eventDisplayRef = eventDisplay}>
            <p className='homepageEventDate'>{this.props.categoryEvent.date}</p>
            <img
              className='homepageEventImg'
              src={this.props.categoryEvent.imgSrc}
              alt={this.props.categoryEvent.title}
              ref={img => this.imgRef = img}
              onLoad={() => this.getImgDim(this.imgRef.naturalHeight, this.imgRef.naturalWidth)}
              style={{width: resizeWidth, height: resizeHeight}}
            />
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
