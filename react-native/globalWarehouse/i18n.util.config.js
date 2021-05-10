import router from './public/lang/router.json';

const envConfig = {
  local: {
    apiUrl: 'http://master.cjtranslationcenter.cj.com',
    applicationId: '1380343523546718208',
    pageUrl: 'http://localhost:8000',
  },
  master: {
    apiUrl: 'http://master.cjtranslationcenter.cj.com',
    applicationId: '1380343523546718208',
    pageUrl: 'http://master.sourcing.com',
  },
  release: {
    apiUrl: 'http://release.cjtranslationcenter.cj.com',
    applicationId: '1380343523546718208',
    pageUrl: 'http://release.sourcing.com',
  },
  prod: {
    apiUrl: 'https://translation.cjdropshipping.com',
    pageUrl: 'https://sourcing.com',
    applicationId: '1380343191525539840',
  },
};

export default ({ env }) => {
  const config = envConfig[env] || {};
  const { apiUrl, applicationId } = config;

  return {
    config,
    // 页面路由 { '/home': {} }
    router,
    // 默认路由，当找不到页面路径时
    defaultRouter: {
      path: '/common',
      push: {
        pageId: 'common',
      },
    },
    // 提取翻译
    extract: {
      // 需要提取的翻译入口
      inputs: ['src'],
      // 匹配翻译词
      i18nStartReg: 'i18n.t\\(',
      // 扩展上报词
      keyExtends: ['--plural'],
    },
    // 翻译上报
    push: {
      // 本地需要上报的翻译词路径
      localLangPath: 'public/lang/local',
      // 翻译中心上报翻译词api地址和applicationId
      serverConfig: {
        apiUrl: `${apiUrl}/cj-translation-api/v2/word/reportWord`,
        data: {
          applicationId,
        },
      },
      // 手动开启测试上报词
      // handle({ list }) {
      //   require('fs').writeFileSync('./testLang.json', JSON.stringify(list, null, 2));
      // },
    },
    // 翻译拉取
    pull: {
      // 输出的翻译词路径
      outLangPath: 'public/lang/pull',
      // 翻译中心拉取翻译词api地址和applicationId
      serverConfig: {
        apiUrl: `${apiUrl}/cj-translation-api/v2/word/findWorldAndUrlByApplicationId`,
        data: {
          applicationId,
        },
      },
    },
  };
};
