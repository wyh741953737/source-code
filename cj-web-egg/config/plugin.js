
const { NODE_ENV } = require('../env');

module.exports = {
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  httpProxy: {
    enable: NODE_ENV === 'development',
    package: 'egg-http-proxy',
  },
  // 设置跨域白名单
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // alinode: {
  //   enable: NODE_ENV === 'production-cn',
  //   package: 'egg-alinode',
  // }
}
