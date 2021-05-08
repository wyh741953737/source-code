import { defineConfig } from 'umi';
import px2rem from 'postcss-plugin-px2rem';

export default defineConfig({
  title: 'sourcing',
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  scripts: ['//at.alicdn.com/t/font_2293184_izyghfl028.js'],
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
});
