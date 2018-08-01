import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import ticker from 'rc-tween-one/lib/ticker';
import SvgDrawPlugin from 'rc-tween-one/lib/plugin/SvgDrawPlugin';
import { enquireScreen } from 'enquire-js';
import { currentScrollTop } from '../utils';

TweenOne.plugins.push(SvgDrawPlugin);

export default class Demo extends React.PureComponent {
  static propTypes = {
    image: PropTypes.string,
  };

  static defaultProps = {
    image: 'http://www.bubuol.com/assets/img/B265X290.png',
  };


  constructor(props) {
    super(props);
    this.state = {};
    this.interval = null;
    this.gather = true;
    this.intervalTime = 9000;
    this.width = 265;
    this.height = 290;
    this.tickerOut = null;
    this.scale = 1;
  }

  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this);
    this.tickerOut = ticker.timeout(this.createPointData, 1400);
  }

  componentWillUnmount() {
    this.remInterval();
  }

  onResize = () => {
    enquireScreen((bool) => {
      this.scale = bool ? 0.7 : 1;
      if (!this.tickerOut) {
        const children = this.resizeData(this.state.children);
        this.setState({ children }, () => {
          if (!this.gather) {
            this.updateTweenData();
          }
          ticker.clear(this.interval);
          this.interval = ticker.interval(this.updateTweenData, this.intervalTime);
        });
      }
    }, 'only screen and (max-width: 414px)');
  };

  onMouseEnter = () => {
    // !this.gather && this.updateTweenData();
    if (!this.gather) {
      this.updateTweenData();
    }
    this.remInterval();
  };

  onMouseLeave = () => {
    // this.gather && this.updateTweenData();
    if (this.gather) {
      this.updateTweenData();
    }
    this.interval = ticker.interval(this.updateTweenData, this.intervalTime);
  };

  setDataToDom(data, w, h) {
    this.pointArray = [];
    const number = Math.round(w / 11);
    for (let i = 0; i < w; i += number) {
      for (let j = 0; j < h; j += number) {
        if (data[((i + j * w) * 4) + 3] > 150) {
          this.pointArray.push({ x: i, y: j, r: Math.random() * 18 + 12 });
        }
      }
    }

    let children = [];
    this.pointArray.forEach((item, i) => {
      const b = Math.random() * 0.4 + 0.1;
      children.push(<TweenOne className="point-wrapper" key={i} style={{ left: item.x, top: item.y }}>
        <TweenOne
          className="point"
          style={{
            width: item.r,
            height: item.r,
            opacity: b,
            backgroundColor: `rgb(${Math.round(Math.random() * 95 + 160)},255,255)`,
          }}
          animation={{
            y: (Math.random() * 2 - 1) * 10 || 5,
            x: (Math.random() * 2 - 1) * 5 || 2.5,
            delay: Math.random() * 1000,
            repeat: -1,
            duration: 3000,
            yoyo: true,
            ease: 'easeInOutQuad',
          }}
        />
      </TweenOne>);
    });
    this.pointArray.push({ x: 75, y: 180, r: 40 });
    children.push(<TweenOne
      className="point-wrapper"
      key={children.length}
      style={{
        left: 75,
        top: 180,
      }}
    >
      <TweenOne
        className="point"
        style={{
          width: 40,
          height: 40,
          backgroundColor: `rgb(${Math.round(Math.random() * 95 + 160)},255,255)`,
          opacity: Math.random() * 0.5 + 0.2,
        }}
        animation={{
          y: (Math.random() * 2 - 1) * 10 || 5,
          x: (Math.random() * 2 - 1) * 5 || 2.5,
          delay: Math.random() * 1000,
          repeat: -1,
          duration: 3000,
          yoyo: true,
          ease: 'easeInOutQuad',
        }}
      />
    </TweenOne>);
    children = this.resizeData(children);
    this.setState({
      children,
      end: true,
    }, () => {
      this.onResize();
      this.interval = ticker.interval(this.updateTweenData, this.intervalTime);
    });
  }

  resizeData = children => children.map((item, i) => {
    const child = item.props.children;
    const childrenProps = {
      ...child.props,
      style: {
        ...child.props.style,
        width: this.pointArray[i].r * this.scale,
        height: this.pointArray[i].r * this.scale,
      },
    };
    const props = {
      key: i,
      style: { left: this.pointArray[i].x * this.scale, top: this.pointArray[i].y * this.scale },
    };
    return React.cloneElement(item, props, React.cloneElement(child, childrenProps));
  });

  remInterval = () => {
    ticker.clear(this.interval);
    this.interval = null;
  }

  createPointData = () => {
    this.tickerOut = null;
    const w = this.width;
    const h = this.height;
    const canvas = document.createElement('canvas');
    this.dom.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    canvas.width = w;
    canvas.height = h;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      this.imgData = ctx.getImageData(0, 0, w, h).data;
      this.setDataToDom(this.imgData, w, h);
      this.dom.removeChild(canvas);
    };
    img.crossOrigin = 'anonymous';
    img.src = this.props.image;
  };

  gatherData = () => {
    const children = this.state.children.map(item =>
      React.cloneElement(item, {
        animation: {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          delay: Math.random() * 500,
          duration: 800,
          ease: 'easeInOutQuint',
        },
      }));
    this.setState({ children });
  };

  disperseData = () => {
    const rect = document.getElementById('banner').getBoundingClientRect();// this.dom.getBoundingClientRect();
    const sideRect = document.getElementById('J-Side').getBoundingClientRect();
    const sideTop = sideRect.top + currentScrollTop();
    const children = this.state.children.map(item =>
      React.cloneElement(item, {
        animation: {
          x: Math.random() * document.body.clientWidth - sideRect.left - item.props.style.left,
          y: Math.random() * rect.height - sideTop - item.props.style.top,
          opacity: Math.random() * 0.4 + 0.1,
          scale: Math.random() * 2.4 + 0.1,
          duration: Math.random() * 500 + 500,
          ease: 'easeInOutQuint',
        },
      }));

    this.setState({
      children,
    });
  };

  updateTweenData = () => {
    this.dom = ReactDOM.findDOMNode(this);
    ((this.gather && this.disperseData) || this.gatherData)();
    this.gather = !this.gather;
  };

  render() {
    return (<TweenOneGroup
      enter={{ opacity: 0, type: 'from', duration: 800 }}
      leave={{ opacity: 0, duration: 800 }}
      className="logo-demo"
    >
      {!this.state.end ? (<div key="line">
        <svg
          className="right-side"
          viewBox="0,0,300,400"
        >
          <TweenOne
            d="m62.956522,264.774195l0,-147.887807c0,-25.497898 5.09958,-45.896214 20.398319,-61.194953c10.199159,-15.298739 30.597478,-25.497898 56.095374,-25.497898c20.398319,0 35.697057,5.09958 50.995796,20.398319c10.199159,10.199159 20.398319,25.497898 20.398319,45.896214c0,5.09958 -5.09958,15.298739 -10.199159,25.497898c0,5.09958 -10.199159,15.298739 -15.298739,20.398319c10.199159,5.09958 20.398319,10.199159 25.497898,20.398319s10.199159,20.398319 10.199159,35.697057c0,20.398316 -5.09958,35.697055 -20.398319,45.896214c-15.298739,15.298739 -35.697057,20.398319 -56.095374,20.398319l-40.796637,0l0,-30.597478l40.796637,0c10.199157,0 25.497896,0 30.597475,-10.199159c10.199159,-5.09958 15.298739,-15.298739 15.298739,-25.497896c0,-15.298739 -5.09958,-20.398319 -15.298739,-30.597478c-5.09958,-5.09958 -20.398319,-10.199159 -30.597475,-10.199159l-40.796637,0l0,-25.497898l30.597478,0c10.199159,0 25.497896,-5.09958 30.597475,-10.199159c10.199159,-5.09958 15.298739,-15.298739 15.298739,-25.497898s-5.09958,-20.398316 -15.298739,-25.497896c-5.09958,-10.199159 -15.298739,-10.199159 -25.497898,-10.199159c-15.298737,0 -25.497896,0 -35.697055,10.199159c-5.09958,10.199159 -10.199159,20.398316 -10.199159,40.796635l0,152.987386l-30.597478,0z"
            component="path"
            animation={[
              {
                opacity: 0, type: 'from', delay: 300, duration: 0,
              },
              {
                SVGDraw: 0, type: 'from', duration: 300, ease: 'easeInQuart',
              },
            ]}
          />
          <TweenOne
            component="circle"
            r="20"
            fill="#fff"
            cx="95"
            cy="200"
            animation={{
              delay: 1300,
              r: 0,
              opacity: 0,
              duration: 300,
              type: 'from',
              attr: 'attr',
              ease: 'easeOutQuart',
            }}
          />
        </svg>
      </div>) : (<div
        key="box"
        className="right-side blur"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        id="J-Side"
      >
        {this.state.children}
      </div>)}
    </TweenOneGroup>);
  }
}
