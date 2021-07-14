'use strict';

const BaseController = require('@root/app/core/baseController')

class FooterPagesController extends BaseController {

  constructor(...args) {
    super(...args); // required
  }

  async contact() {
    await this._createNav() // 顶部导航菜单
    this.PARAMS = {
      ...this.PARAMS,
    }
    await this.ctx.render('footerPages/contact.njk', this.PARAMS);
  }

  async ourOffers() {
    await this._createNav() // 顶部导航菜单
    this.PARAMS = {
      ...this.PARAMS,
    }
    await this.ctx.render('footerPages/ourOffers.njk', this.PARAMS);
  }

  async about() {
    await this._createNav() // 顶部导航菜单
    const [err1, userTotal = 0] = await this.service.footerPages.getUserTotal()
    const [err2, uniqueVisitorTotal = 0] = await this.service.footerPages.getUniqueVisitorTotal()
    const [err3, cjStaffTotal = 0] = await this.service.footerPages.getCjStaffTotal()
    const countTotal = userTotal + uniqueVisitorTotal
    this.PARAMS = {
      countTotal: countTotal && parseFloat(countTotal).toLocaleString() || 0,
      cjStaffTotal: cjStaffTotal && parseFloat(cjStaffTotal).toLocaleString() || 0,
      ...this.PARAMS,
    }
    await this.ctx.render('footerPages/about.njk', this.PARAMS);
  }

  async overview() {
    await this._createNav() // 顶部导航菜单
    const [err1, productTotal = 0] = await this.service.footerPages.getProductTotal()
    this.PARAMS = {
      productTotal: productTotal && parseFloat(productTotal).toLocaleString() || 0,
      ...this.PARAMS,
    }
    await this.ctx.render('footerPages/overview.njk', this.PARAMS);
  }

  async sourcing() {
    await this._createNav() // 顶部导航菜单
    this.PARAMS = {
      ...this.PARAMS,
    }
    await this.ctx.render('footerPages/sourcing.njk', this.PARAMS);
  }
}

module.exports = FooterPagesController;
