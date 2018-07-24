import React from 'react';
import PropTypes from 'prop-types';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';

import { Link } from 'react-router';

export default class Page3 extends React.PureComponent {
  static propTypes = {
    onButtonClick: PropTypes.func,
  };

  static defaultProps = {
    onButtonClick: () => {
    },
  };

  render() {
    return (
      <div className="home-page-wrapper page3">
        <OverPack
          className="page"
          playScale={0.3}
          id="page3"
        >
          <QueueAnim
            key="text"
            className="page-text white-text"
            type="bottom"
            leaveReverse
          >
            <h1 key="h1">资讯中心</h1>
            <p key="p">
              技艺是无价之宝，知识是智慧的明灯，没有比知识更好的朋友。
            </p>
            <div
              key="a"
              className="home-button"
            >
              <Link to="/api/tween-one" onClick={this.props.onButtonClick}>快速上手</Link>
            </div>
          </QueueAnim>
        </OverPack>
      </div>
    );
  }
}
