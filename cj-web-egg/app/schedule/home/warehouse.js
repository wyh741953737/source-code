/**
 * 仓库列表数据拉取
 */

const { languages } = require('../../../common/config');
const utils = require('../../../common/utils');

module.exports = {
  schedule: {
    interval: '10m', // 10分钟执行一次
    type: 'worker', // 随机一个 worker(进程) 执行任务
    immediate: true, // 启动项目并 ready 后立即执行一次
  },
  async task(ctx) {
    // 仓库信息
    /* const [err, data] = await ctx.service.home.getWarehouseList(false); // false 远程拉取数据
    if (!err) {
      ctx.app.writeToCache('home/warehouse.json', { data: data.data });
    } */

    // 国际化仓库信息，先以简单方式实现缓存
    for (let i = 0; i < languages.length; i ++) {
      let _ = languages[i];
      const [err, data] = await ctx.service.home.getWarehouseList(false, {
        lng: _
      }); // false 远程拉取数据
      if (!err && !utils.isEmpty(data)) {
        await ctx.app.writeToCache(`home/warehouse_${_}.json`, { data });
      }
    }
  },
};