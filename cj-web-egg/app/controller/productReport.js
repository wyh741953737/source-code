'use strict';

const BaseController = require('@root/app/core/baseController')

class ProductReportController extends BaseController {

  constructor(...args) {
    super(...args); // required
  }

  /**
   * 列表
   */
  async list() {
    const ctx = this.ctx;
    const test = {};

    const pageObj = {
      pageNum: +ctx.params.pageNum || 1,
      pageSize: +ctx.params.pageSize || 8
    }

    const host = `${ctx.protocol}://${ctx.host}` // http://127.0.0.1:7000  相当于当前页面的host

    test.params = ctx.params;
    test.detailUrl = '?fromUrl=' + encodeURIComponent(`${host}/productReport/list/${pageObj.pageNum}`)

    const [err, data_info] = await this.service.productReport.getList({ data: { ...pageObj, data: {} } })
    if (!err) {
      test.productReportList = data_info.data || []
    }

    const [err_topProduct, topProduct] = await this.service.productReport.topProductReport()
    if (!err_topProduct) {
      test.topProduct = topProduct || {}
    }

    this.createPageModule({
      route: '/productReport/list',
      totalNum: (data_info && data_info.total) || 0
    })

    await this._createNav()
    this.createRelatedLinks()

    this.PARAM = {
      ...this.PARAMS,
      ...test,
      changePageSize: false
    }

    await this.ctx.render('productReport/list.njk', this.PARAM);
  }

  /**
   * 详情
   */
  async detail() {
    const ctx = this.ctx;
    const test = {};
    const id = ctx.params.id;
    const fromUrl = decodeURIComponent(ctx.query.fromUrl || '/productReport/list')

    test.id = id;
    test.fromUrl = fromUrl

    const [err, data_info] = await this.service.productReport.getDetailById({ data: { id: encodeURIComponent(id) } })
    test.detail = !err ? data_info : {}

    await this._createNav()
    this.createRelatedLinks()

    this.PARAM = {
      ...this.PARAMS,
      ...test
    }

    await this.ctx.render('productReport/detail.njk', this.PARAM );
  }
}

module.exports = ProductReportController;