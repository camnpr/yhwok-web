import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';
import DemoLayout, { Item } from './DemoLayout';

class ComponentDoc extends React.PureComponent {
  componentDidMount() {
    const props = this.props;
    const { location } = props;
    this.hash = location.hash;
    if (window.addEventListener) {
      window.addEventListener('scroll', this.onScroll);
    } else {
      window.attachEvent('onscroll', this.onScroll);
    }
  }

  componentWillUnmount() {
    if (window.addEventListener) {
      window.removeEventListener('scroll', this.onScroll);
    } else {
      window.detachEvent('onscroll', this.onScroll);
    }
  }

  onScroll = () => {
    const tops = this.demoIds.map((item) => {
      const dom = document.getElementById(item);
      let top = dom.getBoundingClientRect().top;
      if (top < 0) {
        top = -top;
      }
      return top;
    });
    const t = Math.min.apply(null, tops);
    const id = this.demoIds[tops.indexOf(t)];
    const link = `#${id}`;
    if (this.hash !== link) {
      /* eslint-disable no-restricted-globals */
      history.pushState(null, window.title, `#${id}`);
      /* eslint-enable no-restricted-globals */
      // cWindow.location.hash = `#${id}`;
      this.hash = link;
    }
  };

  render() {
    const props = this.props;
    const { pageData } = props;
    const demosToChild = Object.keys(pageData.demo).map(key => pageData.demo[key])
      .filter(item => !item.meta.hidden)
      .sort((a, b) => a.meta.order - b.meta.order)
      .map((item, i) => {
        const content = props.utils.toReactComponent(['div'].concat(item.content));
        const comp = item.preview;
        return (<Item
          vertical={item.meta.vertical}
          title={item.meta.title}
          content={content}
          code={props.utils.toReactComponent(item.highlightedCode)}
          styleCode={item.highlightedStyle ?
            props.utils.toReactComponent(item.highlightedStyle) : null
          }
          mouseEnter={item.meta.mouseEnter}
          cStyle={item.style || null}
          key={i}
          id={item.meta.id}
        >
          {comp(React, ReactDOM)}
        </Item>);
      });
    const { meta, description } = pageData.index;
    const {
      title, subtitle, chinese, english,
    } = meta;
    this.demoIds = demosToChild.map(item => item.props.id);
    return (<DocumentTitle title={`${subtitle || chinese || ''} ${title || english} - 布布在线科技`}>
      <article className="markdown">
        <h1>{title || english}
          <i>{subtitle || chinese}</i>
          <iframe
            key="github-btn"
            src={`https://ghbtns.com/github-btn.html?user=react-component&repo=${
            this.props.params.contentName}&type=star&count=true`}
            frameBorder="0"
            scrolling="0"
            width="98px"
            height="20px"
          />
        </h1>
        {description ? props.utils.toReactComponent(description) : null}
        <DemoLayout vertical={meta.vertical}>
          {demosToChild}
        </DemoLayout>
      </article>
    </DocumentTitle>);
  }
}

ComponentDoc.propTypes = {
  params: PropTypes.any,
};

ComponentDoc.defaultProps = {};
export default ComponentDoc;
