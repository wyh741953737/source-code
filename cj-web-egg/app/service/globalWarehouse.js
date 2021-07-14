require('module-alias/register');
const Service = require('egg').Service;
const utils = require('@root/common/utils');

module.exports = class globalWarehouseService extends Service {

  constructor(app) {
    super(app);
  }

  // 列表
  async getCjList(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'app/web/getProductsFromUSAStorage',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }
  // banner
  async getBannerList(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'cj/globalWarehouseBanner/getBannerList',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }

}
