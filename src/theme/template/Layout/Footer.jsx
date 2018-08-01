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
                <a target="_blank " href="/exhibition/">
                  产品介绍
                </a>
              </div>
              <div>
                <a href="//blog.bubuol.com/">博客</a>
              </div>
              <div>
                <a href="/about/provision" target="_blank ">
                  <span>服务条款</span>
                </a>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>文档</h2>
              <div>
                <a href="/products/monitor#no-code-monitoring">无埋码监控</a>
                <span> - </span>
                用户画像
              </div>
              <div>
                <a target="_blank" href="/products/monitor#manage-monitor">Bug Monitor</a>
                <span> - </span>
                时刻体检你的网页
              </div>
              <div>
                <a href="/products/app#wechat-program">微信小程序</a>
              </div>
              <div>
                <a target="_blank" href="/products/app#native">App开发</a>
                <span> - </span>
                Weex/RN
              </div>
              <div>
                <a target="_blank" href="/products/mobile#h5">H5开发</a>
                <span> - </span>
                移动端(vue/react)
              </div>
              <div>
                <a target="_blank" href="/products/bs#saas">Saas系统开发</a>
                <span> - </span>
                各种后台系统
              </div>
              <div>
                <a target="_blank" href="/products/bs#manage">管理后台开发</a>
                <span> - </span>
                大前端
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>公司</h2>
              <div>
                <a href="/about">
                  关于我们
                </a>
              </div>
              <div>
                <a href="/about/join">
                  加入我们
                </a>
              </div>
              <div>
                <a href="/about/agent">
                  申请代理
                </a>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>
                <img className="title-icon" src="//www.bubuol.com/assets/img/contact.svg" alt="联系我们" />
                联系我们
              </h2>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="mailto:bubuol@126.com">邮箱：BUBUOL@126.com</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=1150870559">QQ：1150870559</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="/about/contact">微信、微博（二维码）</a>
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
