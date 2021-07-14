const router = require('./public/lang/router.json')

const testApiUrl = {
  apiUrl: 'http://master.cjtranslationcenter.cj.com',
  applicationId: '1382217376493428736',
}

const prodApiUrl = {
  apiUrl: 'https://translation.cjdropshipping.com',
  applicationId: '1382217376493428736',
}

const envConfig = {
  development: testApiUrl,
  test: testApiUrl,
  testnew: testApiUrl,
  production: prodApiUrl,
  "production-cn": prodApiUrl,
}

module.exports = ({ env }) => {
  const config = envConfig[env]
  const { apiUrl, applicationId } = config

  return {
    config,
    // 页面路由 { '/home': {} }
    router: router,
    // 打开自定义规则匹配文件及路由  router.json 中可以使用filesReg string[] 字段来匹配文件和页面id
    isFilesMatch: true,
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
      inputs: [
        'app',
        'public',
        'common',
        'mycj'
      ],
      // 匹配翻译词
      i18nStartReg: 'i18next.t\\(',
      // 扩展上报词 复数
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
        }
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
        }
      },
    }
  }
}