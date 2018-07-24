import React from 'react';
import PropTypes from 'prop-types';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';

import { Link } from 'react-router';

export default class Page2 extends React.PureComponent {
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
    const exhibition = this.props.pageData.exhibition.demo;
    const demoToChildren = Object.keys(exhibition)
      .map(key => exhibition[key])
      .sort((a, b) => b.meta.order - a.meta.order)
      .filter((key, i) => i < 6)
      .map((item) => {
        const img = item.meta.image;
        const link = item.meta.filename.replace(/(\/index)|(.md)/g, '');
        const title = item.meta.chinese || item.meta.english;
        const content = this.props.utils.toReactComponent(item.description);
        return (<li key={link}>
          <Link to={link} onClick={this.props.onButtonClick}>
            <div className="home-anim-demo-img"><img src={img} width="100%" /></div>
            <h2>{title}</h2>
            <div className="home-anim-demo-text">{content}</div>
          </Link>
        </li>);
      });

    return (
      <div className="home-page-wrapper page2">
        <OverPack
          className="page"
          playScale={0.6}
          id="page2"
        >
          <QueueAnim
            className="page-text"
            key="text"
            type="bottom"
            leaveReverse
            delay={[0, 100]}
          >
            <h1 key="h1">案例展示</h1>
            <p key="p1">
              为上千家企业提供优质的网站建设与营销服务！
              我们了解大中小型企业的生意模式，需求，我们倡导让客户感知产品的应用体验价值，而不仅是产品的功能。 。
            </p>
          </QueueAnim>
          <TweenOne
            animation={{ delay: 200, ...this.props.tweenAnim }}
            key="img"
            className="home-anim-demo"
          >
            <ul>
              {demoToChildren}
            </ul>
          </TweenOne>
          <TweenOne
            key="a"
            animation={{ delay: 300, ...this.props.tweenAnim }}
            className="home-button"
          >
            <Link to="/exhibition/" onClick={this.props.onButtonClick}>更多案例</Link>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}
