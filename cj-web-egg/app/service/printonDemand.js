require('module-alias/register');
const Service = require('egg').Service;
const utils = require('@root/common/utils');

module.exports = class printonDemandHomeService extends Service {

  constructor(app) {
    super(app);
  }

  // 获取指定活动商品的列表
  async getActivityProList(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'cj/podProduct/getList',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }

  // 获取视频
  async getBottomHelpInfo(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'cj/bottomHelpInfo/select',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }

  // 获取Trending Products
  async getIndividuationProductList(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err1, data1] = await this.app.$ajax({
      method: 'post',
      url: 'cj/individuationProduct/getIndividuationCategoryInfo',
      data: {categoryID: ''},
      headers: { ...headers },
    })
    const [err2, category = []] = utils.statusCode200(data1)
    const listLength = category.length >= 12 ? 12 : category.length;
    const params = []
    for (let i = 0; i < listLength; i++) {
      params.push(category[i].ID)
    }
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'cj/podProduct/getIndividuationProductList',
      data: {
        'categoryIdList': params
      },
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }

}
