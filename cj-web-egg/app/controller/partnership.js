'use strict';
const BaseController = require('@root/app/core/baseController')

// 商品列表备份
class PartnershipController extends BaseController {

    constructor(...args) {
        super(...args); // required
    }

    /**
     * 活动页面
     */
    async home() {
      const { i18next } = this.PARAMS;
      //cj logo图片
      const logolist = ['cj3.svg','cj2.svg','cj4.svg','cj1.svg'];
      // 顶部导航菜单
      await this._createNav()
      // 商品列表
      let err_list, recommend_list = [];
      [err_list, recommend_list = []] = await this.service.partnership.getRecommendPlatformList({
        data: {}
      })
      // 获取所有平台列表
      let platform_err_list, platform_list = [];
      [platform_err_list, platform_list = []] = await this.service.partnership.getAllTypePlatformList({
        data: {}
      })
      if (Array.isArray(platform_list)) {
          platform_list = platform_list.map(item=>{
          if(item.list.length>4){
            item.showMore=true;
          }
          return item;
        })
      }

      const platformList = platform_list;
      const recommendList = recommend_list;
      this.PARAM = {
        ...this.PARAMS,
        recommendList,
        platformList,
        logolist
      }
      await this.ctx.render('partnership/home.njk', this.PARAM);
  }
}

module.exports = PartnershipController;