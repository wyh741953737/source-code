'use strict';

const BaseController = require('@root/app/core/baseController')

class RecommendationsController extends BaseController {

  constructor(...args) {
    super(...args); // required
  }

  async home() {
    await this._createNav() // 顶部导航菜单
    // 上架
    const [err1, ongoingList = []] = await this.service.home.getWebHomeBannerInfo({
      data: {
        platformType: 1,
        activityLocation: 0,
      }
    })
    // 下架
    const [err2, pastList = []] = await this.service.home.getOutBannerList({
      data: {
        pageNum: 1,
        pageSize: 20,
        platformType: 1, //平台类型(1.web端平台,2.app端平台)
      }
    })
    this.PARAMS = {
      ongoingList: ongoingList || [],
      pastList: pastList.bannerList || [],
      ...this.PARAMS,
    }
    await this.ctx.render('recommendations/index.njk', this.PARAMS);
  }
}

module.exports = RecommendationsController;
