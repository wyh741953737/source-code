import mocks from './proxyToMockServer';

const mocksToServer = () => {
  return mocks.reduce((a, b) => {
    return {
      ...a,
      [b]: { target: 'http://192.168.5.222/mock/201', changeOrigin: true },
    };
  }, {});
};
// 配置代理
export default {
  ...mocksToServer(),
  '/app': {
    target: 'http://erp.test.com',
    changeOrigin: true,
  },
  '/payOrder': {
    target: 'http://erp.test.com',
    changeOrigin: true,
  },
  '/cujiaLogisticsAdmin': {
    target: 'http://192.168.5.197:8057',
    changeOrigin: true,
  },
  '/storehouse-sign-web': {
    target: 'http://master.storehouse-sign-web.cj.com',
    // target: 'https://wms.cjdropshipping.cn',
    // target: 'http://warehousenew.test.com/',
    // target: 'http://192.168.4.238:8095', // 邰烽校
    // target: 'http://192.168.4.231:8095', // 余坦藏
    // target: 'http://192.168.4.46:8095',
    // target: 'http://192.168.5.18:8095', // 陈相有
    changeOrigin: true,
  },
  '/storehouse': {
    target: 'http://master.storehouseweb.cj.com', // 测试环境
    // target: 'https://wms.cjdropshipping.cn',
    // target: 'http://warehousenew.test.com/',
    // target: 'http://192.168.4.166:8082', // 张以堂
    // target: 'http://192.168.4.231:8082/', // 余坦藏
    // target: 'http://192.168.4.176:8082', // 林海军
    // target: 'http://192.168.4.216:8082/ ', // 邰烽校
    // target: 'http://192.168.5.141:8082', // 陈相有
    // target: 'http://192.168.4.190:8082', // 高绪洋
    // target: 'http://192.168.5.49:8082', // 峰校
    changeOrigin: true,
  },
};
