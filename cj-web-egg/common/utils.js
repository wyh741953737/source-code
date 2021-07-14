/**
 * cj-web 服务端、客户端通用 utils
 */

const axios = require('axios');
const { Base64 } = require('js-base64');
const config = require('./config');
const { NODE_ENV } = require('../env');
// const environment = this === window ? 'browser' : 'node';
const isServer = typeof window === 'undefined';
const isNodeProd = (isServer && (NODE_ENV === 'production-cn' || NODE_ENV === 'production')) ? true : false;

function resDataProcess(data) {
  let _data = data;
  try {
    if (typeof data.result === 'string') {
      _data.result = JSON.parse(data.result);
    }
  } catch (e) { }
  return _data;
}

/** axios 实例 */
function axiosEnhance(axios) {
  /**
   * url    接口地址
   * opts   body 体、或请求监听
   * listen 请求监听
   */
  return function _axiosFn(url, opts, listen) {
    if (!url) return;
    if (opts instanceof Function) {
      // 可变参处理
      _axiosFn(url, undefined, opts);
      return;
    }
    const cb = listen instanceof Function ? listen : () => { };
    return new Promise(resolve => {
      cb(true);
      const data = opts ? { data: opts } : undefined;
      const thenFn = res => { cb(false); resolve(res); };
      axios(url, data).then(thenFn);
    });
  }
}

/** 处理 statusCode: "200" */
function statusCode200(data) {
  const errormsg = 'api request error!';
  if(!data){
    return [errormsg];
  }
  if (data.success) {
    return [null, data.data];
  }
  return +data.statusCode === 200 ? [null, data.result] : [data.message || errormsg];
}

class Axios {
  constructor(options) {
    // constructor 中 return 对象类型可以修改 new 实例
    // 可以实现方法的私有化
    // return 原始值类型不可以修改 new 实例
    return this.create(options);
  }

  create(options = {}) {
    const instance = axios.create({
      ...options,
      // 全局添加语言标识
      /* headers: {
        //language: 'zh',
        ...(options.headers || {}),
      }, */
    });

    this.interceptorsReq(instance);
    this.interceptorsRes(instance);

    return instance;
  }

  // 请求之前干点儿啥
  interceptorsReq(instance) {
    instance.interceptors.request.use(config => {
      const opt = {
        url: isNodeProd ? getDomainByUrlSsr(config.url) : getDomainByUrl(config.url),
      };
      // console.log('请求前参数', config)
      return { ...config, ...opt };
    },error => {
      // console.log("接口请求error:",error)
      if (!isServer){
        (new Image()).src=`/api/addRequestErrLog?errorInfo=${error}&apiurl=${error.config.url}`;
      }
      return [error];
    });
  }

  // 请求之后干点儿啥
  interceptorsRes(instance) {
    instance.interceptors.response.use(
      response => {
        // console.log("接口响应error:",response);
        return [null, resDataProcess(response.data)]
      },
      error => {
        // console.log("接口响应error:",error.config.url)
        if (!isServer){
          (new Image()).src=`/api/addRequestErrLog?errorInfo=${error}&apiurl=${error.config.url}`;
        }
        return [error];
      });
  }
};

const ajax = axios.create({
  //withCredentials: true,
  headers: {
    Accept: 'application/json;charset=utf-8',
    token: typeof window == 'undefined' ? '' : Base64.decode(localStorage.getItem('token') || '')
  },
})

ajax.interceptors.request.use(function (config) {
  config.params && (config.params['_'] = +new Date());
  config.url && (config.url = isNodeProd ? getDomainByUrlSsr(config.url) : getDomainByUrl(config.url));
  return config;
}, function (error) {
  if (!isServer){
    (new Image()).src=`/api/addRequestErrLog?errorInfo=${error}&apiurl=${error.config.url}`;
  }
  return Promise.reject(error);
});

ajax.interceptors.response.use(response => {
  if (response.status === 200) {
    const { data } = response;
    // 处理可能为null的data, 避免结构时出错
    if(data.data === null) data.data = {}

    return [null, resDataProcess(data)];
  }
  return response;
}, function (error) {
  // Do something with response error
  if (!isServer){
    (new Image()).src=`/api/addRequestErrLog?errorInfo=${error}&apiurl=${error.config.url}`;
  }
  return [error];
})

/** url 匹配处理 */
function getDomainByUrl(url = '') {
  if (!url) {
    return url;
  }
  if (url.startsWith('http')) {
    return url;
  }
  var urlStart = url.split('/')[0];
  if (urlStart == 'pojo' || urlStart == 'app') {
    urlStart = 'app';
  }
  for (var k in config.api[NODE_ENV]) {
    if (k == urlStart) {
      return config.api[NODE_ENV][k] + url;
    }
  }
}

/** url 匹配处理 ssr端使用 */
function getDomainByUrlSsr(url = '') {
  if (!url) {
    return url;
  }
  if (url.startsWith('http')) {
    return url;
  }
  var urlStart = url.split('/')[0];
  if (urlStart == 'pojo' || urlStart == 'app') {
    urlStart = 'app';
  }
  for (var k in config.api['production-node']) {
    if (k == urlStart) {
      return config.api['production-node'][k] + url;
    }
  }
}

/** 安全的 JSONparse */
function JSONparse(jsonStr) {
  const res = [];
  try {
    res[0] = null;
    res[1] = JSON.parse(jsonStr);
  } catch (e) {
    res[0] = e;
  } finally {
    return res;
  }
}

/** base64 操作 */
const $base64 = {
  ...Base64,
  decode(str = '') {
    let r = str;
    try {
      r = Base64.decode(str);
    } catch (e) {
      console.warn('[base64.decode 报错]', str, '\n', e.stack);
    } finally {
      return r;
    }
  },
  encode(str = '') {
    let r = str;
    try {
      r = Base64.encode(str);
    } catch (e) {
      console.warn('[base64.encode 报错]', str, '\n', e.stack);
    } finally {
      return r;
    }
  }
};

/**
 * 考虑编码及体量控制，自定义 cookie 解析
 * 适用格式 a=1;b=2;c=3
 */
function cookieParser(cookie) {
  let r = null;
  if (!cookie) {
    return null;
  }
  if (!/\w+=\w+/.test(cookie)) {
    return null;
  }
  try {
    const tmp = decodeURIComponent(cookie);
    const arr = tmp.split(';');
    const obj = {};
    arr.forEach(_ => {
      const t = _.split('=');
      obj[t[0]] = t[1];
    });
    r = obj;
  } finally {
    return r;
  }
}
/**
 * joson 拼装成 cookie 字符串
 * @param {JSON} cookie 
 */
function cookieGenerator(cookie = {}) {
  const arr = Object.keys(cookie)
    .filter(k => cookie[k])
    .map(k => {
      const v = cookie[k];
      return `${k}=${v}`;
    });
  return arr.join(';');
}

function getDomainByUrlKey(url = '') {
  return config.api[NODE_ENV][url] || '';
}

/**
 * 获取客户端ip
 * @param {request} req 请求头
 */

function getClientIP(ctx) {
  return ctx.request.ip
};

async function getClientInfoByIp(ip) {
  const res = await Promise.race([
    axios.get(`https://api.ip.sb/geoip/${ip}`),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('获取ip超时');
        resolve({})
      }, 2000)
    })
  ]).catch(err => {});
  const { data } = res || {};
  return data || {}
}

function getLngByCountry(country) {
  return {
    // 中国
    'China': 'zh',
    // 美国
    'United States': 'en',
    // 法国
    'France': 'fr',
    // 德国
    'Germany': 'de',
    // 印尼
    'Indonesia': 'id',
    // 泰国
    'Thailand': 'th'
  }[country]
}

function getTransWarehouse(lng) {
  return ajax({
    method: 'post',
    url: 'cj/homePage/getWareHouseWorldsByLanguage',
    headers: {
      language: lng
    }
  })
}

function transWarehouse(target, arr = []) {
  let map = arr.reduce((obj, cur) => {
    let en = cur.en;
    if (!obj[en]) {
      obj[en] = cur['value']
    }
    return obj;
  }, {})
  target.forEach(v => {
    v.areaVal = map[v.areaEn] || v.areaEn;
  })
  return target;
}

function getTopDomain(host = location.hostname) {
  const ip_pattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/; // 匹配ip
  if (ip_pattern.test(host)){
    return host;
  }
  
  const tmp = host.split('.');
  let domain = '';
  if (tmp.length > 1) {
    const last = tmp.length - 1;
    domain = `${tmp[last - 1]}.${tmp[last]}`;
  } else {
    domain = host;
  }
  return domain === 'localhost' ? domain : `.${domain}`;
}

 /** 去重 */
function uniqueArr(arr = [], field) {
  var json = {};

  return arr.filter(item => {
    if (json[item[field]]) {
      return false;
    } else {
      json[item[field]] = 1;
      return true;
    }
  });
}

// 将对象转化为URL参数
function objectToParams(paramObj) {
  const sdata = [];
  for (let attr in paramObj) {
    sdata.push(`${attr}=${encodeURIComponent(paramObj[attr])}`);
  }
  return sdata.join('&');
};
// 将URL参数转化为对象
function paramsToObject(paramObj) {
  let searchParams;
  if (!paramObj) {
    return {}
  }
  if(paramObj.includes('?')) {
    searchParams = paramObj.split('?')[1].split('&')
  } else {
    searchParams = paramObj.split('?')[0].split('&')
  }
  let result = {}
  searchParams.forEach(item => {
    let pair = item.split("=");
    result[pair[0]] = decodeURIComponent(pair[1])
  })
  return result;
}

/**
 * 判断变量是否为无效的空值
 * @param {any} param 
 * @returns {boolean}
 */
function isEmpty(param) {
  if (param === 0){
    return false;
  }

  if (param) {
    if (typeof param === 'object') {
      return JSON.stringify(param) === '[]' || JSON.stringify(param) === '{}';
    }
    return false;
  }

  return true;
}

/**
 * 当前浏览器是否支持webp格式, node默认返回false
 * @returns boolean
 */
function isSupportWebp () {
  if(typeof window === 'undefined') return false
  try {
      return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
  } catch (err) {
      return false;
  }
};

module.exports = {
  $base64,
  Axios,
  axiosEnhance,
  ajax,
  getDomainByUrl,
  JSONparse,
  statusCode200,
  cookieParser,
  cookieGenerator,
  getDomainByUrlKey,
  getClientIP,
  getClientInfoByIp,
  getLngByCountry,
  NODE_ENV,
  getTransWarehouse,
  transWarehouse,
  getTopDomain,
  uniqueArr,
  objectToParams,
  paramsToObject,
  isEmpty,
  isSupportWebp
};
