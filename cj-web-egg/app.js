/**
 * egg.js 启动自定义
 * https://eggjs.org/zh-cn/basics/app-start.html
 */
require('module-alias/register'); // node 环境下识别路径别名

const { NODE_ENV } = require('@root/env');
const isProd = (NODE_ENV === 'production' || NODE_ENV === 'production-cn');
module.exports = class AppBootHook {

  constructor(app) {
    const { config } = app;
    app.locals = {
      ...app.locals,
      ...config.view.variable,
      EGG_ENV: config.env,
      EGG_ENV_DEV: config.env === 'local',
      IS_PROD: isProd
    };

    this.app = app;
  }

  didLoad() {
    // this.app.foo = 'bar'; // 擴展 application 的一種方式
  }
}
