import $cookie from 'js-cookie';
import utils from '@common/utils';
import { languages } from '@common/config';
import jwt_decode from 'jwt-decode';
import { loginByAuth } from './googleLogin'
import { BUILD_TIMESTAMP } from '@root/env.js'

const { $base64, getDomainByUrlKey, ajax, statusCode200 } = utils;

/** 防抖 */
export function debounce(fn, delay = 400) {
  let t = null;
  return function (...args) {
    const _this = this;
    if (t !== null) clearTimeout(t);
    t = setTimeout(() => {
      t = null;
      fn.apply(_this, args);
    }, delay);
  }
}

/** 节流 */
export function throttle(fn, delay = 400) {
  let t = null;
  return function (...args) {
    const _this = this;
    if (t !== null) {
      return;
    }
    t = setTimeout(() => {
      t = null;
      fn.apply(_this, args);
    }, delay);
  }
}

/** localStorage 操作 */
function _JSONparse(jsonStr) {
  let r = jsonStr;
  try {
    r = JSON.parse(jsonStr);
  } finally {
    return r;
  }
}
export const store = {
  // decode ---- Base64.decode
  // parse  ---- JSON.parse
  /** 支持数组，支持 $base64.decode，支持 JSON.parse */
  get(key, options) {
    let r;
    const opt = Object.assign({ decode: false, parse: true }, options);
    if (Array.isArray(key)) {
      r = key.map(k => localStorage.getItem(k));
      if (opt.decode) r = r.map(item => item ? $base64.decode(item) : item);
      if (opt.parse) r = r.map(item => _JSONparse(item));
    } else {
      r = localStorage.getItem(key);
      if (opt.decode) r = r ? $base64.decode(r) : r;
      if (opt.parse) r = _JSONparse(r);
    }
    return r;
  },
  /** 对象、数组将自动 JSON.stringify */
  set(key, val) {
    let _val = val;
    if (
      Array.isArray(val) ||
      Object.prototype.toString.call(val) === "[object Object]"
    ) {
      _val = JSON.stringify(val);
    }
    localStorage.setItem(key, _val);
  },
  /** 支持数组 */
  remove(key) {
    if (Array.isArray(key)) {
      key.forEach(function (k) {
        localStorage.removeItem(k);
      });
    } else {
      localStorage.removeItem(key);
    }
  },
};

/** 判断登陆 */
export function checkLogin() {
  const nowTime = new Date().getTime();
  const token = store.get('token',{ parse: false});
  const loginName = store.get('loginName');
  // const firstName = store.get('firstName');
  const loginTime = store.get('loginTime');
  const removeLogin = () => {
    store.remove(['loginName', 'firstName', 'loginTime', 'token', 'cjLoginName', 'cjLoginToken']);
  };

  if (!loginName || !token || !loginTime) {
    removeLogin();
    return false;
  }
  // 限制三天过期 - 毫秒 * 小时 * 天 * 天数
  if (nowTime - loginTime > 1000 * 3600 * 24 * 3) {
    removeLogin();
    return false;
  }
 
  const cookieObj = { expires: 3, domain: getTopDomain() }

  
  $cookie.set('cjLoginName', $base64.decode(loginName), cookieObj);
  $cookie.set('cjLoginToken', $base64.decode(token), cookieObj);

  store.set('loginTime', nowTime);
  return true;
}

/** 获取用户信息 */
export function getUserInfo() {
  let userInfo = {
    userId: store.get('userId', { decode: true }),
    status: store.get('status') || undefined,
    vip: store.get('vip') || undefined,
    token: store.get('token'),
  };

  if (userInfo.userId) {
    const [
      name,
      loginName,
      salesmanId,
      relateSalesman,
      firstName,
      lastName,
      avatar,
      subAccountName,
    ] = store.get([
      'name',
      'loginName',
      'salesmanId',
      'relateSalesman',
      'firstName',
      'lastName',
      'avatar',
      'subAccountName'
    ], { decode: true });
    const [vip] = store.get(['vip']);
    userInfo = {
      ...userInfo,
      name,
      loginName,
      salesmanId,
      relateSalesman,
      firstName,
      lastName,
      avatar,
      subAccountName,
      vip,
    };
  }

  return userInfo;
}

/** 验证URL，跳转到登录页 */
export function authLoginUrl() {
  const [ev, url = ''] = arguments;
  let _url = ev;
  if (ev instanceof Event) {
    // a 标签情况
    ev.preventDefault();
    _url = url;
  }
  if (!_url) {
    return '';
  }
  if (checkLogin()) {
    return _url;
  } else {
    return `/login.html?target=${$base64.encode(_url)}`;
  }
}

/** 获取顶级域名 */
export function getTopDomain(host = location.hostname) {
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

/** 论坛跳转 */
export function getElitesUrl() {
  const t = Date.now();
  let url = window.NODE_ENV == 'test' ? 'http://192.168.5.219:4000/cross' : 'https://elites.cjdropshipping.com/cross'; // https://elites.cjdropshipping.com
  if (localStorage.getItem('token')) {
    let token = CJ_.store.get('token', { decode: true })
    try {
      url = `${url}?_t=${t}&token=${token}`;
    } catch (err) {
      console.log('ElitesUrl token decode err', err)
    }
  }
  return url;
}

/**  添加聊天 */
export function addChatBody() {
  let script = document.createElement('script');
  script.src = getDomainByUrlKey('_chat_190606') + `javascripts/newChat.js?v=${BUILD_TIMESTAMP}`;
  document.body.append(script);
}

/**  获取url参数 */
export function getQueryVariable(variable){
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return undefined;
}

/**  获取url参数（带=的参数也可取到） */
export function getQueryParam(variable){
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const idx = vars[i].indexOf('=')
    if(vars[i].substr(0,idx) == variable) {
      return vars[i].substr(idx + 1)
    }
  }
  return undefined;
}

// 添加智能引导
export function addGuidWindow() {
  let script = document.createElement('script');
  script.src = getDomainByUrlKey('_chat_190606') + 'javascripts/intelGuid.js';
  document.body.append(script);
}

// 获取cookie
export function getCookie(c_name) {
  if (document.cookie.length > 0)     {
    let c_start = document.cookie.indexOf(c_name + "=")
    let c_end;        
    if (c_start != -1){ 
      c_start = c_start + c_name.length + 1 
      c_end = document.cookie.indexOf(";", c_start) 
      if (c_end == -1)   
        c_end = document.cookie.length   
        return unescape(document.cookie.substring(c_start, c_end))   
      } 
    } 
  return ''
}

export function createWarehouseStockCache() {
  for(let i = 0; i < languages.length; i ++) {
    let lng = languages[i];
    utils.getTransWarehouse(lng).then(([err, res]) => {
      if (!err) {
        let result = (res || {}).result || [];
        sessionStorage.setItem(`warehouse_lng_${lng}`, JSON.stringify(result));
      }
    })
  }
}

// 获取缓存设置库存翻译
export function transWarehouseStock(target = []) {
  const lng = getCookie('lng');
  const raw = sessionStorage.getItem(`warehouse_lng_${lng}`);
  if (!raw) {
    return target;
  }
  let cache = JSON.parse(raw);
  if (!Array.isArray(cache)) {
    return target;
  }
  // 扁平化
  let map = cache.reduce((obj, cur) => {
    let en = cur.en;
    if (!obj[en]) {
      obj[en] = cur['value']
    }
    return obj;
  }, {})
  // 写入翻译值
  target.forEach(v => {
    v.areaVal = map[v.areaEn] || v.areaEn
  })
  return target;
}

// 获取类目
export function getCateGoryList(callback) {
  if (localStorage.getItem('CategoryList')) {
    var data = JSON.parse(localStorage.getItem('CategoryList'));
    callback(data)
  } else {
    ajax.get('app/product/categorylist?pid=', {
      headers:{
        language: localStorage.getItem('lng') || 'en'
      }
    }).then(function([err,res]) {
      if(err) return []
      const [e, d] = statusCode200(res);
      localStorage.setItem('CategoryList', JSON.stringify(d));
      if(e) {
        callback([])
        return
      }
      callback(d)
    }) 
  }
}

export function getClientReat(client) {
  const { top, bottom, left, right, height, width } = client.getBoundingClientRect()
  return {
      top,
      bottom,
      left,
      right,
      height: height || bottom - top,
      width:    width || right - left
  }
}

//谷歌一键登录
export function getGoogleLogin() {
  if(typeof(google) === 'undefined') return 
  const handleCredentialResponse = (response) => {
    // console.log(response.credential)
    const googleParam = jwt_decode(response.credential);
    const familyName = googleParam.family_name; //姓
    const givenName = googleParam.given_name; //名
    const name = googleParam.name; //姓名
    const email = googleParam.email; //邮箱
    const id = googleParam.sub; //id
    const params = { givenName, familyName, id, name, email };
    console.log("addGoogleLoginEventListener -> params", params);
    localStorage.setItem('regGoogleInfo', JSON.stringify(params)); //将google新用户注册所需信息存入
    loginByAuth('google', params);
  }

  const nativeCallback = (obj) => {
    console.log("native_callback!")
  }
  //测试id
  // const client_id =
  // "812622916919-k75gcjkkqs04s57s5ks2f16q74qui6b2.apps.googleusercontent.com"
  const client_id =
    "708607489636-7ihggmvci7r9b6npeo3j9v4mnb2g23fp.apps.googleusercontent.com"

  google.accounts.id.initialize({
    client_id,
    callback: handleCredentialResponse,
    auto_select: false,
    context: "use",
    native_callback: nativeCallback,
    prompt_parent_id: "put-google-one-tap-here-plz",
  })
  google.accounts.id.prompt((notification) => {
    console.log("notification is: ", notification.getMomentType())
    if (notification.isDisplayMoment()) {
      console.log("IS DISPLAY MOMENT")
    }
    if (notification.isNotDisplayed()) {
      console.warn(
        "one-tap did not show because:",
        notification.getNotDisplayedReason()
      )
    }
    if (notification.isSkippedMoment()) {
      console.warn(
        "one-tap skipped because:",
        notification.getSkippedReason()
      )
    }
    if (notification.isDismissedMoment()) {
      console.warn(
        "one-tap dismissed because:",
        notification.getDismissedReason()
      )
      if (notification.getDismissedReason() !== "credential_returned") {
      }
    }
    let timer
    timer = setTimeout(()=>{
      clearTimeout(timer)
      google.accounts.id.cancel()
    },10000)
  })
}

