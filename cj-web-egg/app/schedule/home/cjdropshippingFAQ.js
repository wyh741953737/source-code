/**
 * 获取 banner 右侧 You may want to know:
 */

const { languages } = require('../../../common/config');
const utils = require('../../../common/utils');

module.exports = {
  schedule: {
    interval: '2m', // 2分钟执行一次
    type: 'worker',
    immediate: true,
  },
  async task(ctx) {
    /* const [err, data] = await ctx.service.home.getCjdropshippingFAQ(false);
    err || ctx.app.writeToCache('home/cjdropshippingFAQ.json', { data }); */
    // 国际化类目信息，先以简单方式实现缓存
    for (let i = 0; i < languages.length; i ++) {
      let _ = languages[i];
      const [err, data] = await ctx.service.home.getCjdropshippingFAQ(false, {
        headers: {
          language: _,
        }
      }); // false 远程拉取数据
      if (!err && !utils.isEmpty(data)) {
        await ctx.app.writeToCache(`home/cjdropshippingFAQ_${_}.json`, { data });
      }
    }
  },
};
