/**
 * Created by jljsj on 16/8/18.
 */
const location = window.location;
const protocol = location.protocol;
const isLocalMode = location.port;
const port = isLocalMode ? ':8112' : '';
const mainPath = isLocalMode ? '' : '/edit';
const href = `${protocol}//${location.hostname}${port}${mainPath}`;

export default [
  { name: '首页', href: '/', key: 'home' },
  { name: '案例分享', href: '/exhibition/', key: 'exhibition' },
  { name: '产品介绍', href: '/products/tween-one', key: 'products' },
  { name: '服务支持', href: '/api/tween-one', key: 'api' },
  { name: '关于我们', href: '/about/basic', key: 'about' },  
  // {
  //   name: '动效模板',
  //   href: `${href}/#t%3Dnav_0_0%2Ccontent_0_0%2Ccontent_2_0%2Ccontent_3_0%2Ccontent_4_0%2Cfooter_0_0`,
  //   key: 'cases',
  //   open: true,
  // },
];
