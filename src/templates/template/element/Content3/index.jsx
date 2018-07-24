import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import '../../../static/content.less';
import './index.less';

class Content extends React.Component {
  static defaultProps = {
    className: 'content1',
  };

  render() {
    const props = { ...this.props };
    const dataSource = props.dataSource;
    const isMobile = props.isMobile;
    const names = props.id.split('_');
    const name = `${names[0]}${names[1]}`;
    delete props.dataSource;
    delete props.isMobile;
    const animType = {
      queue: isMobile ? 'bottom' : 'left',
      one: isMobile ? {
        y: '+=30', opacity: 0, type: 'from', ease: 'easeOutQuad',
      }
        : {
          x: '+=30', opacity: 0, type: 'from', ease: 'easeOutQuad',
        },
    };
    return (
      <div
        {...props}
        className={`content-template-wrapper content-half-wrapper ${props.className}-wrapper`}
      >
        <OverPack
          className={`content-template ${props.className}`}
          location={props.id}
        >
          <TweenOne
            key="img"
            animation={animType.one}
            className={`${props.className}-img`}
            id={`${props.id}-imgWrapper`}
            resetStyle
          >
            <span id={`${props.id}-img`}>
              <img src={dataSource[`${name}_img`].children} width="100%" />
            </span>
          </TweenOne>
          <QueueAnim
            type={animType.queue}
            className={`${props.className}-text`}
            key="text"
            leaveReverse
            ease={['easeOutCubic', 'easeInCubic']}
            id={`${props.id}-textWrapper`}
          >
            <h1 key="h1" id={`${props.id}-title`}>
              {dataSource[`${name}_title`].children}
            </h1>
            <p key="p" id={`${props.id}-content`}>
              {dataSource[`${name}_content`].children}
            </p>
          </QueueAnim>
        </OverPack>
      </div>
    );
  }
}


export default Content;
