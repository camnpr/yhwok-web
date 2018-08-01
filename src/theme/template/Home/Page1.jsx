import React from 'react';
import PropTypes from 'prop-types';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Link } from 'react-router';
//import CoderDemo from './CodeDemo';

export default class Page1 extends React.PureComponent {
  static propTypes = {
    pageData: PropTypes.object,
    utils: PropTypes.object,
    tweenAnim: PropTypes.object,
    onButtonClick: PropTypes.func,
  };

  static defaultProps = {
    pageData: {},
    utils: {},
    tweenAnim: {},
    onButtonClick: () => {
    },
  };

  render() {
    return (
      <div className="home-page-wrapper page1">
        <OverPack
          playScale={0.6}
          className="page vh"
          id="page1"
        >
          <QueueAnim className="page-text" key="text" type="bottom" leaveReverse delay={100}>
            <h1 key="h1">我们能做什么</h1>
            <p key="p">
              致力于帮助中小企业打造网络营销利器，实现网上盈利！<br />
              我们深刻挖掘中小型企业的生意模式，需求，为客户打造专属的网络快速赚钱利器，而不仅是产品的功能。
            </p>
          </QueueAnim>
          {/* <TweenOne
            className="code-wrapper"
            animation={{ ...this.props.tweenAnim, delay: 200 }}
            key="code"
          >
            <CoderDemo className="code" pageData={this.props.pageData} utils={this.props.utils} />
          </TweenOne> */}
          <QueueAnim className="page-text" key="text2" type="bottom" leaveReverse delay={100}>
            <h1 key="h1">网站建设</h1>
            <p key="p1">
              为企业打造最基础的电子商务之门 。
            </p>
            <h1 key="h2">APP开发</h1>
            <p key="p2">
              助力企业抢滩移动端入口。
            </p>
            <h1 key="h3">H5定制</h1>
            <p key="p3">
              打通品牌和产品的社会化媒体互动渠道。
            </p>
            <h1 key="h4">微信定制</h1>
            <p key="p4">
              为企业量身定制精准化营销与服务平台 。
            </p>            
          </QueueAnim>
          <TweenOne
            key="a"
            className="home-button"
            animation={{ ...this.props.tweenAnim, delay: 300 }}
          >
            <Link to="/components/tween-one" onClick={this.props.onButtonClick}>了解更多</Link>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}
