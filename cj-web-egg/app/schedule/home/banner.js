/**
 * 首页 banner 数据
 * type = 'CJ' || 'SUPPLIER'; // CJ、供应商
 */
 const utils = require('../../../common/utils');

module.exports = {
  schedule: {
    interval: '2m', // 2分钟执行一次
    type: 'worker',
    immediate: true,
  },
  async task(ctx) {
    const home = ctx.service.home;
    const writeToCache = ctx.app.writeToCache;
    // CJ banner
    home.getBanner(false, { type: 'CJ' }).then(([err, data]) => {
      if (!err && !utils.isEmpty(data)) {
        writeToCache('home/banner_cj.json', { data });
      }
    });
    // 供应商 banner
    home.getBanner(false, { type: 'SUPPLIER' }).then(([err, data]) => {
      // console.log('供应商接口报错 -s-');
      // console.log(err);
      // console.log('供应商接口报错 -e-');
      if (!err && !utils.isEmpty(data)) {
        writeToCache('home/banner_supplier.json', { data });
      }
    });
  },
};
