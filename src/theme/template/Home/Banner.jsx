import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import SvgMorphPlugin from 'rc-tween-one/lib/plugin/SvgMorphPlugin';
import { Link } from 'react-router';
import { Icon } from 'antd';
import Demo from './Demo';

TweenOne.plugins.push(SvgMorphPlugin);

export default class Banner extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: 'banner',
  };

  render() {
    return (<ScrollElement id="banner" className={`${this.props.className}-wrapper`}>
      <svg className={`${this.props.className}-bg-center`} width="100%" viewBox="0 0 1200 800">
        <TweenOne
          component="circle"
          fill="rgba(161,174,245,.15)"
          r="130"
          cx="350"
          cy="350"
          animation={{
            y: 30, x: -10, repeat: -1, duration: 3000, yoyo: true,
          }}
        />
        <TweenOne
          component="circle"
          fill="rgba(120,172,254,.1)"
          r="80"
          cx="500"
          cy="420"
          animation={{
            y: -30, x: 10, repeat: -1, duration: 3000, yoyo: true,
          }}
        />
      </svg>
      <div className={this.props.className}>
        <div className={`${this.props.className}-demo`}>
          <Demo />
        </div>
        <QueueAnim
          type="bottom"
          className={`${this.props.className}-text`}
          delay={300}
        >
          <h1 key="h1">布布在线科技</h1>
          <h3 key="h3">专业建站，提供企业或个人所需的三端（PC、H5、APP）服务！</h3>
          <p key="p">
            解决客户网站需求、域名、服务器部署、性能调优、后期维护之闭环方案！<br />
            提供整站源码，可安装到自己的服务器，安全稳定！
          </p>
          <div key="button">
            <Link to="/language/basic" className={`${this.props.className}-text-button`}>
              了解更多
              <i />
            </Link>
            <a
              className={`${this.props.className}-text-button template`}
              href="/edit#t%3Dnav_0_0%2Ccontent_0_0%2Ccontent_2_0%2Ccontent_3_0%2Ccontent_4_0%2Cfooter_0_0"
              target="_blank"
            >
              快速搭建<i />
            </a>
          </div>
        </QueueAnim>
        <TweenOne
          animation={{ opacity: 0, type: 'from', delay: 400 }}
          className={`${this.props.className}-down-wrapper`}
        >
          <div key="down" className={`${this.props.className}-down`}>
            <TweenOne animation={{
              y: 5, yoyo: true, repeat: -1, duration: 900,
            }}
            >
              <Icon type="down-circle-o" />
            </TweenOne>
          </div>
          <div
            className={`${this.props.className}-mouse`}
            key="mouse"
          >
            <TweenOne
              className="mouse-bar"
              animation={{
                y: 5, yoyo: true, repeat: -1, duration: 900,
              }}
            />
          </div>
        </TweenOne>
      </div>
    </ScrollElement>);
  }
}

