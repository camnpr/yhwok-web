import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import DocumentTitle from 'react-document-title';

export default class Details extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    pageData: PropTypes.object,
  };

  static defaultProps = {
    className: 'exhibition-details',
  };

  constructor(props) {
    super(props);
    this.state = {
      replay: false,
    };
  }

  shouldComponentUpdate() {
    return this.state.replay;
  }

  onClick = () => {
    this.setState({
      replay: true,
    }, () => {
      this.setState({
        replay: false,
      });
    });
  };

  render() {
    const props = this.props;
    // const { pageData, className } = props;
    const pageData = this.props.pageData;
    const className = this.props.className;
    const {
      meta, content, description,
      style, preview, highlightedCode, highlightedStyle,
    } = pageData;
    const {
      title, subtitle, chinese, english,
    } = meta;
    return (<DocumentTitle title={`${subtitle || chinese || ''} ${title || english} - 布布在线科技`}>
      <div className="page-wrapper">
        <TweenOne animation={{ y: 30, opacity: 0, type: 'from' }} className="page">
          <article className={`markdown ${className}`}>
            <div className={`${className}-demo`}>
              {!this.state.replay && preview(React, ReactDOM)}
            </div>
            <div className="replay-button">
              <i onClick={this.onClick} />
            </div>
            <h1>
              {title || english}
              {(!subtitle && !chinese) ? null : (<i>{subtitle || chinese}</i>)}
            </h1>
            {props.utils.toReactComponent(description)}
            {!!content.length && props.utils.toReactComponent(['section'].concat(content))}
            {!!style && <style dangerouslySetInnerHTML={{ __html: style }} />}
          </article>
        </TweenOne>
      </div>
    </DocumentTitle>);
  }
}
