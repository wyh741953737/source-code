import { defineConfig } from 'umi';
import proxy from './src/proxy';
import Routes from './src/routes';
import path from 'path';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  ignoreMomentLocale: true,
  locale: {
    default: 'zh-CN',
    antd: true,
  },
  base: '/',
  hash: true,
  dva: {
    immer: true,
    hmr: true,
  },
  theme: {
    '@primary-color': '#FFB900',
  },
  favicon: '/favicon.ico',
  dynamicImport: {
    // 按需加载的loading
    loading: '@/components/Loading',
  },
  proxy,
  mock: {
    exclude: [],
  },
  title: '仓库中心',

  routes: Routes,

  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'login', // 唯一 id
          entry:
            process.env.UMI_ENV === 'production'
              ? '//rms.cjdropshipping.cn/'
              : '//master.authoritycenter.web.cj.com/', // html entry
        },
        {
          name: 'componentCenter', // 唯一 id
          entry: '//master.componentcenter.web.cj.com', // 这里的microPath取自下边config.json的componentMicroDomain
        },
      ],
    },
  },
  chainWebpack(config) {
    config.module
      .rule('file-loader')
      .test(/.mp3$/)
      .use('../loader/file-loader')
      .loader('file-loader');
  },
  // // 配置别名
  alias: {
    '~': '@/..',
  },
});
