require('module-alias/register');
const Service = require('egg').Service;
const utils = require('@root/common/utils');

module.exports = class productReportService extends Service {

  constructor(app) {
    super(app);
  }

  // 列表
  async getList(opt = {}) {
    const { headers = {}, data = {} } = opt;
    const [err, res] = await this.app.$ajax('cj/productReportPoint/getAllProductReport', {
      method: 'POST',
      headers: { ...headers },
      data
    })

    return err ? [err] : utils.statusCode200(res);
  }

  // 置顶商品报告
  async topProductReport(opt = {}) {
    const { headers = {}, data = {} } = opt;
    const [err, res] = await this.app.$ajax('cj/productReportPoint/getTop', {
      method: 'POST',
      headers: { ...headers },
      data
    })

    return err ? [err] : utils.statusCode200(res);
  }

  // 详情
  async getDetailById(opt = {}) {
    const { headers = {}, data = {} } = opt
    const [err, res] = await this.app.$ajax('cj/productReportPoint/getProductReportById', {
      method: 'POST',
      headers: { ...headers },
      data
    })
    return err ? [err] : utils.statusCode200(res)
  }

}
