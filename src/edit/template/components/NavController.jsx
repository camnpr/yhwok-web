import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal, message, Tooltip } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';
import saveJsZip from './saveJsZip';

const confirm = Modal.confirm;
const $ = window.$;

class NavController extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    urlHash: PropTypes.string,
    urlData: PropTypes.object,
    isMobile: PropTypes.bool,
    typeSwitch: PropTypes.func,
  };

  static defaultProps = {
    className: 'edit-nav',
    typeSwitch: () => {
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      helpOpen: false,
    };
  }

  onCopy = () => {
    message.success('拷贝成功，现在可以去分享你定制的页面了！');
  }

  onTypeSwitch = (isMobile) => {
    if (isMobile !== this.props.isMobile) {
      this.props.typeSwitch(isMobile);
    }
  }

  removeUrlData = (name, hash) => {
    const url = decodeURIComponent(location.hash || hash).replace('#', '');
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    return url.replace(reg, '');
  }

  resetData = () => {
    const otherUrl = this.removeUrlData('c', this.props.urlHash);
    location.reload();
    location.hash = `#${encodeURIComponent(otherUrl)}`;
  }

  openLook = () => {
    Modal.warning({
      title: '注意事项, 请仔细阅读',
      content: (<ul>
        <li>
          1. 在编辑时是数值注意旁边的单位，如 "px", "vh", "%"; "px" 为像素点, "vh" 屏幕高度的百分比;
        </li>
        <li>
          2. 多行参数顺序为 "左上 右上 左下 右下"
        </li>
        <li>
          3. 本站不提供图片上传功能，请自行解决图片上传的问题;
        </li>
        <li>
          4. 内容编辑区块请不要用(')单引号作为内容； 如需使用，请用(\');
        </li>
        <li>
          5. mobile 样式与 web 样式编辑是分开的，如编辑了请切换到 mobile 再编辑;
        </li>
      </ul>),
      width: 550,
    });
  };

  shorten = (url, cb) => {
    // 调用 dwz.cn 服务, 使用中转服务器发请求
    const apiUrl = '//motion.applinzi.com/';
    const encodedUrl = encodeURIComponent(url);

    const reqUrl = `${apiUrl}?url=${encodedUrl}`;

    $.ajax({
      url: reqUrl,
      success: (data) => {
        if (data.tinyurl && cb) {
          cb(data.tinyurl);
        } else {
          message.error('生成链接失败,请稍候~');
        }
      },
    });
  }

  makePageURL = (url, title) => {
    this.shorten(url, (shortenUrl) => {
      confirm({
        title,
        content: shortenUrl,
        iconClassName: 'exclamation-circle purple',
        okText: <CopyToClipboard text={shortenUrl} onCopy={this.onCopy}>
          <span className="copy">拷贝</span>
        </CopyToClipboard>,
      });
    });
  }

  makePageURLPreview = () => {
    const url = location.port ?
      `${location.protocol}//${location.hostname}:8113/${this.props.urlHash}`
      : `${location.origin}/templates/${this.props.urlHash}`;
    this.makePageURL(url, '已生成当前预览地址的短链接，赶快去共享你的首页吧~');
    if (!location.port && window.ga) {
      window.ga('send', 'event', 'preview', 'click', 'preview');
    }
    window.open(url);
  }
  makePageURLEdit = () => {
    const url = `${location.origin}${location.pathname}${this.props.urlHash}`;
    window.location.hash = this.props.urlHash;
    if (!location.port && window.ga) {
      window.ga('send', 'event', 'edit', 'click', 'edit');
    }
    this.makePageURL(url, <p>已生成当前编辑的URL, 以方便你下次直接访问：</p>);
  }

  saveCode = () => {
    if (!location.port && window.ga) {
      window.ga('send', 'event', 'button', 'click', 'download');
    }
    saveJsZip(this.props.urlData);
  }
  openHelp = () => {
    this.setState({
      helpOpen: !this.state.helpOpen,
    });
  };

  render() {
    return (
      <div className={this.props.className}>
        <div
          className={`${this.props.className}-bar`}
        >
          <ul className="type-switch">
            <Tooltip title="desktop">
              <li
                onClick={() => {
                  this.onTypeSwitch(false);
                }}
                className={!this.props.isMobile ? 'active' : ''}
              >
                <Icon type="desktop" />
              </li>
            </Tooltip>
            <Tooltip title="mobile">
              <li
                onClick={() => {
                  this.onTypeSwitch(true);
                }}
                className={this.props.isMobile ? 'active' : ''}
              >
                <Icon type="mobile" />
              </li>
            </Tooltip>
          </ul>
          <ul>
            <li>
              <a onClick={this.openLook} className={`${this.props.className}-remark`}>
                <Icon type="exclamation-circle-o" />
                注意事项
              </a>
            </li>
            <li><a href="https://motion.ant.design/">返回主站</a></li>
            <li>
              <a href="https://github.com/ant-motion/ant-motion-dva-cli-example" target="_blank">
                dva-cli 例子
              </a>
            </li>
            <li>
              <a onClick={this.openHelp}>查看教程</a>
              <Modal
                visible={this.state.helpOpen}
                title={<h2>视频教程</h2>}
                width="800"
                onCancel={this.openHelp}
                footer={null}
              >
                <video
                  src="https://os.alipayobjects.com/rmsportal/GOsdyUIGZrNPSntOoRpe.mp4"
                  width="100%"
                  controls
                  autoPlay
                  loop
                />
              </Modal>

            </li>
            <li>
              <Button type="primary" onClick={this.resetData}>
                重置参数
              </Button>
            </li>
            <li>
              <Button type="primary" onClick={this.makePageURLEdit}>
                保存当前编辑
              </Button>
            </li>
            <li><Button type="primary" onClick={this.makePageURLPreview}>生成预览链接</Button></li>
            <li><Button type="primary" onClick={this.saveCode}>生成代码</Button></li>
          </ul>
        </div>
      </div>
    );
  }
}
export default NavController;
