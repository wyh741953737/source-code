const path = require('path');
const fs = require('fs');

module.exports = function (appInfo) {

  const config = {
    // 配合 cookie
    keys: appInfo.name,

    // 静态服务器
    static: {
      prefix: '',
      dir: [
        path.join(appInfo.baseDir, 'dist/public'),      // egg 需要的静态文件目录
        path.join(appInfo.baseDir, 'dist/mycj-public'), // mycj 编译后静态文件目录
      ],
      // gzip: true, // 开启静态压缩
    },

    // 开启渲染模板
    view: {
      root: path.join(appInfo.baseDir, 'app/view'),
      defaultViewEngine: 'nunjucks',
      defaultExtension: '.njk',
      mapping: {
        '.njk': 'nunjucks',
      },
      variable: {
        // 模版变量
        PUBLIC: '/egg',
        PUBLIC_LIBS: '/egg/libs',
        PUBLIC_STYLE: '/egg/style',
        PUBLIC_SCRIPT: '/egg/script',
        PUBLIC_IMG: '/egg/image',
      }
    },

    // 中间件
    middleware: [
      'authorize',
      'routerFilter',
      'cookie',
      'language',
    ],

    // http 请求 [https://github.com/eggjs/egg/blob/master/docs/source/zh-cn/core/httpclient.md]
    // 请使用 Axios
    httpclient: {},

    // 过滤掉一些静态资源加载不到跳404的情况
    routerFilter: {
      ignore: ['/static', '/egg']
    },

    // 默认语言 - https://gtranslate.io/
    // 客户端接管，这个没啥用
    language: '/en/en',

    // 默认币种
    // 客户端接管，这个没啥用
    currency: {
      currency: 'USD',
      NAME: '美元',
      rate: 1, // 汇率(以美元为参考)
      symbol: '$',
    },

    // 站点配置
    siteFile: {
      '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'favicon.ico')),
    },

    // 服务端口,不可变动，线上服务指定端口
    cluster: {
      listen: {
        port: 7000,
      },
    },

    // language 中间件配置
    language: {
      onlyPath: [
        '/',
        '/home.html',
        '/blog/pathto',
      ],                  // 需服务端国际化的页面
    },

    // 代理，本地开发走这个配置，打包后都是走ng配置
    httpProxy: {
      '/app': {
        target: 'http://192.168.5.172:8085',
      },
      '/cj': {
        target: 'http://192.168.5.158:8080',
        changeOrigin: true,
        secure: false
      },
      '/browser/*': {
        target: 'http://192.168.5.197:12800',
        changeOrigin: true,
      },
      '/push': {
        // target: "http://192.168.5.66:8087",  // 李站云的服务
        // target: "http://192.168.5.197:5723",  // 测试服务
        target: "http://192.168.3.27:31180",  // 测试服务
        changeOrigin: true,
      }
    },

    security: {
      csrf: {
        headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
        ignore: ['/app', '/cj', '/browser'],
      },
    },
    // 不确定来源 所以放开跨域
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    },
    // 自定义日志
    customLogger: {
      notFoundLogger: {
        file: path.join(appInfo.root, 'logs/cj-web-egg/notFound.log'),
        contextFormatter(meta) {
          // console.log('meta+++++', meta.ctx.request.headers.referer)
          return `${meta.date} ${meta.ctx.request.ip} ${meta.ctx.method} ${decodeURI(meta.ctx.url)} ${meta.message} ${meta.ctx.url} ${meta.ctx.request.headers.referer}`;
        },
      }
    },
    // 前置代理
    proxy: true,

    // node服务监控
    // alinode: {
    //   // 从 `Node.js 性能平台` 获取对应的接入参数
    //   appid: '85824',
    //   secret: '2075d200c4a511aecd4214b16155ea6f98f2aec0',
    // },

  };

  return config;
};
