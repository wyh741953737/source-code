require('module-alias/register');
const Service = require('egg').Service;
const utils = require('@root/common/utils');

module.exports = class PartnershipService extends Service {

  constructor(app) {
    super(app);
  }

  // 查询主页分类平台列表
  async getRecommendPlatformList(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'cj/partner/getRecommendPlatformList',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }
  // 查询主页分类平台列表-cj端
  async getAllTypePlatformList(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'cj/partner/getAllTypePlatformList',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }
  // 查询指定类型平台列表-cj端
  async getPlatformList(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'cj/partner/getPlatformList',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }


}
