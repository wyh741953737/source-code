/**
 * 上传翻译词配置
 */
const { resolve } = require('path');

const env = process.argv.slice(2)[0];
const urlConfig = {
  test: {
    // apiPrefix: 'http://192.168.5.2:8084',
    apiPrefix: 'http://master.cjtranslationcenter.cj.com',
    pagePrefix: 'http://master.jobsbuyerh5.jobs2020frontend.cj.com',
    applicationId: '1317020150154801152',
  },
  release: {
    apiPrefix: 'http://release.cjtranslationcenter.cj.com',
    pagePrefix: 'http://release.jobsbuyerh5.jobs2020frontend.cj.com',
    applicationId: '1317020150154801152',
  },
  b1: {
    apiPrefix: 'https://translation.cjdropshipping.com',
    pagePrefix: 'https://business.wed2c.com',
    applicationId: '1317020150154801152',
  },
  b2: {
    apiPrefix: 'https://translation.cjdropshipping.com',
    pagePrefix: 'https://business.wed2c.com',
    applicationId: '1317020150154801152',
  },
  prod: {
    apiPrefix: 'https://translation.cjdropshipping.com',
    pagePrefix: 'https://business.wed2c.com',
    applicationId: '1317020150154801152',
  },
};

const { apiPrefix, applicationId } = urlConfig[env];

module.exports = {
  // 环境
  env,
  // 需要上报的翻译词文件入口
  rootPaths: [resolve('src')],
  // 英文语言文件入口
  langPath: resolve('src/locales/dev-locales'),
  // 翻译上报的默认值，参数请参考后端接口
  itemOptions: {
    link: '/common',
    oneBusinessId: 16,
    twoBusinessId: 25,
  },
  applicationId,
  // 页面路径前缀
  linkPrefix: '',
  // 上报接口路径
  apiPrefix: `${apiPrefix}/cj-translation-api/world/reportWorlds`,
  // 根据应用ID拉取所有词
  pullWorldsApi: `${apiPrefix}/cj-translation-api/world/findWorldAndUrlByApplicationId`,
  // 拉取词所放的地址
  pullLocation: resolve(`src/locales/locales/${env}`),
  // 页面配置，主要用来取二级ID，上报接口需要
  pathsConfig: {
    '/login': {
      twoBusinessId: 21,
    },
    '/login/pwd': {
      twoBusinessId: 21,
    },
    '/login/forget_pwd': {
      twoBusinessId: 21,
    },
    '/register': {
      twoBusinessId: 21,
    },
    '/register/create_pwd': {
      twoBusinessId: 21,
    },
    '/register/create_name': {
      twoBusinessId: 21,
    },
    '/register/base_info': {
      twoBusinessId: 21,
    },
    '/register/interest': {
      twoBusinessId: 21,
    },
    '/home/list': {
      twoBusinessId: 19,
    },
    '/search': {
      twoBusinessId: 19,
    },
    '/search/list': {
      twoBusinessId: 19,
    },
    '/product/new_list': {
      twoBusinessId: 19,
    },
    '/product/detail': {
      twoBusinessId: 19,
    },
    '/product/evaluate_list': {
      twoBusinessId: 19,
    },
    '/product/preview': {
      twoBusinessId: 19,
    },
    '/product/share_single': {
      twoBusinessId: 19,
    },
    '/product/share_batch': {
      twoBusinessId: 19,
    },
    '/blog/list': {
      twoBusinessId: 19,
    },
    '/blog/detail': {
      twoBusinessId: 19,
    },
    '/blog/share_blog': {
      twoBusinessId: 19,
    },
    '/my': {
      twoBusinessId: 21,
    },
    '/my/newGuidance': {
      twoBusinessId: 21,
    },
    '/my/cash': {
      twoBusinessId: 21,
    },
    '/my/cash-verify': {
      twoBusinessId: 21,
    },
    '/my/cash-success': {
      twoBusinessId: 21,
    },
    '/my/cash-record': {
      twoBusinessId: 21,
    },
    '/my/email/bind-first': {
      twoBusinessId: 21,
    },
    '/my/email/bind-new': {
      twoBusinessId: 21,
    },
    '/my/email/change-verify': {
      twoBusinessId: 21,
    },
    '/my/interest': {
      twoBusinessId: 21,
    },
    '/my/name': {
      twoBusinessId: 21,
    },
    '/my/third-party': {
      twoBusinessId: 21,
    },
    '/my/site': {
      twoBusinessId: 21,
    },
    '/order/list': {
      twoBusinessId: 21,
    },
    '/invite': {
      twoBusinessId: 20,
    },
    '/invite/list': {
      twoBusinessId: 20,
    },
    '/invite/share': {
      twoBusinessId: 20,
    },
    '/flyer/index1': {
      twoBusinessId: 20,
    },
    '/flyer/index2': {
      twoBusinessId: 20,
    },
    '/flyer/index3': {
      twoBusinessId: 20,
    },
    '/flyer/index4': {
      twoBusinessId: 20,
    },
    '/my/growth-points': {
      twoBusinessId: 21,
    },
    '/my/profit': {
      twoBusinessId: 21,
    },
    '/my/profit/specific': {
      twoBusinessId: 21,
    },
    '/my/upgrade': {
      twoBusinessId: 21,
    },
    '/share': {
      twoBusinessId: 25,
    },
    '/share/list': {
      twoBusinessId: 25,
    },
    '/sharePlatform/pricing': {
      twoBusinessId: 25,
    },
    '/sharePlatform/pricing/originalPriceRules': {
      twoBusinessId: 25,
    },
    '/sharePlatform/pricing/groupPriceRules': {
      twoBusinessId: 25,
    },
    '/sharePlatform/sharing': {
      twoBusinessId: 25,
    },
    '/my/account': {
      twoBusinessId: 21,
    },
  },
};
