import React from 'react';
import { Row, Col } from 'antd';

function Footer() {
  return (
    <footer id="footer" className="dark">
      <div className="footer-wrap">
        <Row>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>产品</h2>
              <div>
                <a target="_blank " href="https://github.com/ant-design/ant-motion">
                  产品介绍
                </a>
              </div>
              <div>
                <a href="//blog.bubuol.com/">博客</a>
              </div>
              <div>
                <a href="http://ant-motion.gitee.io/" target="_blank ">
                  <span>服务条款</span>
                </a>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>文档</h2>
              <div>
                <a href="http://ant.design">无埋码监控</a>
                <span> - </span>
                用户画像
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="http://ux.ant.design">Bug Monitor</a>
                <span> - </span>
                时刻体检你的网页
              </div>
              <div>
                <a href="http://pro.ant.design">微信小程序</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="http://library.ant.design/">App开发</a>
                <span> - </span>
                Weex/RN
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://mobile.ant.design/index-cn">H5开发</a>
                <span> - </span>
                移动端(vue/react)
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/dvajs/dva">Saas系统开发</a>
                <span> - </span>
                各种后台系统
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/dvajs/dva-cli">管理后台开发</a>
                <span> - </span>
                大前端
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>公司</h2>
              <div>
                <a href="https://github.com/ant-design/ant-motion/issues">
                  关于我们
                </a>
              </div>
              <div>
                <a href="https://github.com/ant-design/ant-motion/issues">
                  加入我们
                </a>
              </div>
              <div>
                <a href="https://github.com/ant-design/ant-motion/issues">
                  申请代理
                </a>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>
                <img className="title-icon" src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg" alt="" />
                联系我们
              </h2>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="mailto:bubuol@126.com">邮箱：BUBUOL@126.com</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://eggjs.org/">QQ：1150870559</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://eggjs.org/">QQ、微信、微博（二维码）</a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="bottom-bar">
        Copyright © 2018-present BUBUOL · 布布在线科技 · <a href="http://www.miitbeian.gov.cn/" rel="noopener noreferrer" target="_blank">豫ICP备10013645号</a> · <span className="heart">❤</span>
      </div>
    </footer>
  );
}

export default Footer;
