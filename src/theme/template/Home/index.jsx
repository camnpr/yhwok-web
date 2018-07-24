import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import ScrollLink from 'rc-scroll-anim/lib/ScrollLink';
import { scrollTo } from '../utils';

import Banner from './Banner';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';


class Home extends React.PureComponent {
  static propTypes = {
    pageData: PropTypes.object,
    utils: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.tweenAnim = {
      y: 30, opacity: 0, type: 'from', ease: 'easeOutQuad',
    };
  }

  scrollToTop = () => {
    scrollTo(0);
  };

  render() {
    return (
      <DocumentTitle title="布布在线科技 - BUBUOL.Com">
        <div className="home-wrapper">
          <div className="nav-wrapper">
            <ScrollLink to="banner" showHeightActive={['100%', '30%']} toHash={false} />
            <ScrollLink to="page1" showHeightActive="30%" toHash={false} />
            <ScrollLink to="page2" showHeightActive={['30%', '70%']} toHash={false} />
            <ScrollLink to="page3" showHeightActive="70%" toHash={false} />
          </div>
          <Banner />
          <Page1
            pageData={this.props.pageData}
            utils={this.props.utils}
            tweenAnim={this.tweenAnim}
            onButtonClick={this.scrollToTop}
          />
          <Page2
            pageData={this.props.pageData}
            utils={this.props.utils}
            tweenAnim={this.tweenAnim}
            onButtonClick={this.scrollToTop}
          />
          <Page3 onButtonClick={this.scrollToTop} />
        </div>
      </DocumentTitle>
    );
  }
}

export default Home;
