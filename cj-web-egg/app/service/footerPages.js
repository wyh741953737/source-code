require('module-alias/register');
const Service = require('egg').Service;
const utils = require('@root/common/utils');

module.exports = class footerPagesService extends Service {

  constructor(app) {
    super(app);
  }

  // 商品总数实时统计
  async getProductTotal(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'GET',
      url: 'statistics/product/getProductTotal',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }

  // 获取用户注册总数
  async getUserTotal(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'GET',
      url: 'statistics/user/getUserTotal',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }

  // 获取访客数总数
  async getUniqueVisitorTotal(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'GET',
      url: 'statistics/visitor/getUniqueVisitorTotal',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }

  // 获取实时员工数量
  async getCjStaffTotal(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'GET',
      url: 'statistics/staff/getCjStaffTotal',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }

}
