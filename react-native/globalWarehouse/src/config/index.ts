// 请求地址
const apiBase = {
  local: {
    sourcingApi: 'http://master.jobs2020.cj.com',
  },
  master: {
    sourcingApi: 'http://master.jobs2020.cj.com',
  },
  release: {
    sourcingApi: 'http://release.jobs2020.cj.com',
  },
  prod: {
    sourcingApi: 'https://sourcing.com',
  },
};

// 页面地址(用于web view跳转本站页面)
const pageBase = {
  local: {
    sourcingPage: 'http://localhost:8000',
  },
  master: {
    sourcingPage: 'http://master.jobs2020.cj.com',
  },
  release: {
    sourcingPage: 'http://release.jobs2020.cj.com',
  },
  prod: {
    sourcingPage: 'https://sourcing.com',
  },
};

// 全局环境
export const GLOBAL_ENV = 'local';

// 请求地址url
export const apiBaseUrl = apiBase[GLOBAL_ENV];

// 页面地址url
export const pageBaseUrl = pageBase[GLOBAL_ENV];
