import { defineConfig } from 'umi';
import px2rem from 'postcss-plugin-px2rem';

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  title: 'sourcing',
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  // scripts: ['//at.alicdn.com/t/font_2552839_3cqyw05u7qu.js'],
  scripts: [{ src: '/cjmsg/cjmsg.js', defer: true }], // 这个cjmsg来自public的静态文件
  extraPostCSSPlugins: [
    px2rem({
      rootValue: 16,
      propBlackList: [
        'border',
        'border-top',
        'border-left',
        'border-right',
        'border-bottom',
        'border-radius',
      ],
      selectorBlackList: ['t_npx'],
      exclude: /(node_module)/,
    }),
  ],
  proxy: {
    // 若使此代理生效，请执行 yarn web:proxy 启动，否则请求走的都是request中的baseUrl
    // '/cj': {
    //   target: 'http://app1.test.com',
    //   changeOrigin: true,
    // },
    // '/warehouseBuildWeb': {
    //   target: 'http://cujia-storehouse-build-web.cj-1.com',
    //   changeOrigin: true,
    // },
    '/product-api': {
      target: 'http://192.168.5.184:8079',
      changeOrigin: true,
    },
    '/original-service': {
      target: 'http://192.168.5.239:8089',
      changeOrigin: true,
    },
    '/original-service-new': {
      target: 'http://192.168.5.239:8089',
      changeOrigin: true,
    },
    '/cjEvaluation': {
      target: 'http://192.168.5.239:8089',
      changeOrigin: true,
    },
  },
});
