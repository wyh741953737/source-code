const BaseController = require('@root/app/core/baseController')

// 创建链接地址
function _createLink(item) {
  var url = 'javascript:void(0)';
  const obj = JSON.parse(item);
  if (obj.urlOrSku) {
    if (obj.skipType == '3' && obj.isSkuOut == '0') { //商品详情页
      url = `product-detail.html?id=${obj.pid}&from=all&fromType=all&productType=0`;
    } else if (obj.skipType == '2') { //指定页面
      url = obj.urlOrSku;
    }
  }
  return url;
}
//获取bannerid
function _getBannerId(item) {
  const bannerItem = JSON.parse(item);
  if (bannerItem.id) {
    return bannerItem.id
  }
  return "";
}


module.exports = class HomeController extends BaseController {
  constructor(...args) {
    super(...args); // required

    // 类目 icon
    this.icons = [
      'iconComputerOffice',
      'iconBagShoes',
      'iconJewelryWatches',
      'iconHealthBeautyHair',
      'iconWomensClothing',
      'iconSportsOutdoors',
      'iconbianzu2',
      'iconHomeImprovement',
      'iconbianzu3',
      'iconToysKidsBaby',
      'iconMensClothing',
      'iconConsumerElectronicsx',
      'iconPhonesAccessories',
    ];
  }

  async hello() {
    this.ctx.body = 'Hello world!';
  }

  async index() {

    const { i18next } = this.PARAMS
    
    const [
      [err_banner, data_banner],
      [err_faq, data_faq],
      [err_f1, data_f1],
      [err_f2, data_f2],
      [err_f3, data_f3],
      [err_f4, data_f4],
      [err_f5, data_f5],
      [err_f6l, data_f6l],
      [err_f6r, data_f6r],
      [err_f7l, data_f7l],
      [err_f7r, data_f7r],
      [err_f8, data_f8],
      [err_f9, data_f9],
      [err_plat, data_plat],
      [err_gw, data_gw],
      [err_asl, data_asl]
    ] = await this.getCache();
    await this._createNav()
    this.createRelatedLinks()

    const props = {
      icons: this.icons,
      categories: JSON.parse(this.PARAMS.categoryList || '[]'), //err_cate ? [] : data_cate,
      banners: err_banner ? [] : data_banner.map(_ => ({ ..._, jsonItem: JSON.stringify(_) })),
      evaluteBanners: [
        {
          url: 'https://www.facebook.com/pg/CjDropshipping/reviews/?ref=page_internal',
          image: 'evalution-img1.png',
          desc: 'Here are the customers\' comments from Facebook.'
        },
        {
          url: 'https://www.trustpilot.com/review/cjdropshipping.com',
          image: 'evalution-img2.png',
          desc: 'Here are the customers\' comments from Trustpilot.'
        },
        {
          url: 'https://apps.shopify.com/cucheng/reviews?page=1',
          image: 'evalution-img3.png',
          desc: 'Here are the customers\' comments from Shopify APP Store.'
        }
      ],
      faqs: err_faq ? [] : data_faq,
      // 直接取数据和取缓存不是一样的格式....
      floor1: err_f1 ? [] : data_f1,
      floor2: err_f2 ? [] : data_f2,
      floor3: err_f3 ? [] : data_f3,
      floor4: err_f4 ? [] : data_f4,
      floor5: err_f5 ? [] : data_f5,
      floor6_l: err_f6l ? [] : data_f6l,
      floor6_r: err_f6r ? [] : data_f6r,
      floor7_l: err_f7l ? [] : data_f7l,
      floor7_r: err_f7r ? [] : data_f7r,
      floor8: err_f8 ? [] : data_f8,
      floor9: err_f9 ? [] : data_f9,
      coopList: err_plat ? [] : data_plat,
      floor_gw: err_gw ? [] : data_gw,
      // 创建轮播图链接地址
      _createLink,
      _getBannerId,
      apiPrefix: this.app.apiPrefix,

      // i18
      productParams: {
        'Lists': i18next.t('product-card-lists'),
        'View Inventory': i18next.t('product-card-view-inventory'),
        'List': i18next.t('product-card-list'),
        'Add to Queue': i18next.t('product-card-add-to-queue'),
        'Source': i18next.t('product-card-source'),
        'View More': i18next.t('common-view-more')
      },
      isArtificial: this.isLocalLng(this.lng),
      activityShowList: err_asl && data_asl.bannerList ? [] : data_asl.bannerList.filter((_, i) => i <= 3),
      // halloween: true
    };


    this.PARAMS = {
      ...this.PARAMS,
      ...props
    }

    await this.ctx.render('home', this.PARAMS);
  }

  getCache() {
    const { getLng } = this
    return Promise.all([
      // this.service.home.getCategoryList(true, { sync: false, lng: getLng(this.lng) }),
      this.service.home.getBanner(true, { sync: false }),
      this.service.home.getCjdropshippingFAQ(true, { sync: false, lng: getLng(this.lng) }),
      this.service.home.getFloor_1(true, { sync: false, lng: getLng(this.lng) }),
      this.service.home.getFloor_2(true, { sync: false, lng: getLng(this.lng) }),
      this.service.home.getFloor_3(true, { sync: false, lng: getLng(this.lng) }),
      this.service.home.getFloor_4(true, { sync: false, lng: getLng(this.lng) }),
      this.service.home.getFloor_5(true, { sync: false, lng: getLng(this.lng) }),
      this.service.home.getFloor_6_l(true, { sync: false, lng: getLng(this.lng) }),
      this.service.home.getFloor_6_r(true, { sync: false, lng: getLng(this.lng) }),
      this.service.home.getFloor_7_l(true, { sync: false, lng: getLng(this.lng) }),
      this.service.home.getFloor_7_r(true, { sync: false, lng: getLng(this.lng) }),
      this.service.home.getFloor_8(true, { sync: false, lng: getLng(this.lng) }),
      this.service.home.getFloor_9(true, { sync: false, lng: getLng(this.lng) }),
      this.service.home.getPlatformList(true, { sync: false, lng: getLng(this.lng) }),
      this.service.home.getFloor_gw(true, { sync: false, lng: getLng(this.lng) }),
      this.service.home.getOutBannerListCache(true, { sync: false, lng: getLng(this.lng) }),
    ]);
  }


  // 测试首页抓取
  async indexTest() {
    await this.ctx.render('indexTest');
  }

}
