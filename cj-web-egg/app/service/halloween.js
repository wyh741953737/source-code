require('module-alias/register');
const Service = require('egg').Service;
const utils = require('@root/common/utils');

module.exports = class HalloweenService extends Service {

  constructor(app) {
    super(app);
  }

  // 获取指定活动商品的列表
  async getActivityProList(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'cj/activity/getProductList',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }

}
