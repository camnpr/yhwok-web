---
order: 5
title: 随鼠标摆动
---

跟随鼠标左右摆动。

````jsx
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
const BgElement = Element.BgElement;
class Demo extends React.Component {
  render() {
    return (
      <BannerAnim prefixCls="banner-user">
        <Element key="aaa"
          prefixCls="banner-user-elem"
          followParallax={{
            delay: 1000,
            data: [
              { id: 'bg', value: 20, bgPosition: '50%', type: ['backgroundPositionX'] },
              { id: 'title', value: 50, type: 'x' },
              { id: 'content', value: -30, type: 'x' },
            ],
          }}
        >
          <BgElement
            key="bg"
            className="bg"
            style={{
              background: '#364D79',
            }}
            id="bg"
          />
          <TweenOne className="banner-user-title" 
            animation={{ y: 30, opacity: 0, type: 'from' }}
            id="title"
          >
            布布在线科技 Banner
          </TweenOne>
          <TweenOne className="banner-user-text" 
            animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
            id="content"
          >
            The Fast Way Use Animation In React
          </TweenOne>
        </Element>
        <Element key="bbb"
          prefixCls="banner-user-elem"
        >
          <BgElement
            key="bg"
            className="bg"
            style={{
              background: '#64CBCC',
            }}
          />
          <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
            布布在线科技 Banner
          </TweenOne>
          <TweenOne className="banner-user-text" 
            animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
          >
            The Fast Way Use Animation In React
          </TweenOne>
        </Element>
      </BannerAnim>
    );
  }
}
ReactDOM.render(
  <Demo />
, mountNode);
````
