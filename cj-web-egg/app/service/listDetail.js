require('module-alias/register');
const Service = require('egg').Service;
const utils = require('@root/common/utils');

module.exports = class listDetailService extends Service {

  constructor(app) {
    super(app);
  }

  // 列表
  async getCjList(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const cjLoginToken = this.ctx.cookies.get('cjLoginToken', { signed: false })
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'elastic-api/product/v0.2/search',
      data: opt.data,
      headers: { ...headers, token: cjLoginToken || '' },
    })
    return err ? [err] : (data && data.data);
  }

  async getTrendSearch(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const cjLoginToken = this.ctx.cookies.get('cjLoginToken', { signed: false })
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'elastic-api/product/trendSearch',
      data: opt.data,
      headers: { ...headers, token: cjLoginToken || '' },
    })
    return err ? [err] : (data && data.data);
  }

  // 获取类目
  async getCateGoryList(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'get',
      url: 'app/product/categorylist?pid=',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }

}
