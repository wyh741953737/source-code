/**
 * 对 window 对象的一些扩展
 */
import $cookie from 'js-cookie';
import { defUserinfo, defIsLogin } from './define';
import config from '@common/config';
import utils from '@common/utils';
import { NODE_ENV } from '@root/env';
import {
  store,
  checkLogin,
  getUserInfo,
  authLoginUrl,
  debounce,
  throttle,
  getTopDomain,
  getElitesUrl,
  getQueryVariable,
  getCookie,
  getCateGoryList,
  getQueryParam
} from './utils';
import './vue.enhance';
import './events';

const {
  $base64,
  Axios,
  ajax,
  statusCode200,
  axiosEnhance,
  cookieParser,
  cookieGenerator,
  objectToParams,
  paramsToObject,
} = utils;

  // 写入全局顶级域名
  window.__root__domain = getTopDomain();
  // 客户端初始化i18
  var lng = getCookie('lng') || 'en'
  i18next.init({
    lng,
    debug: false,
    resources: {
      [lng]: {
        translation: eval('(' + window.LNG + ')')
      },
    },
    keySeparator: '__keySeparator__',
    nsSeparator: '__nsSeparator__'
  })
  // 设置主域storage
  function fromCookieToStorage(name) {
    var value = getCookie(name) || '';
    var _name = name == 'cjLoginToken' ? 'token' : name;
    if (_name === 'token') {
      value = $base64.encode(value || '');
    }
    // console.log('setStorage', _name, value);
    localStorage.setItem(_name, value);
  }
  function fromStorageToCookie(name="language") {
    const language = localStorage.getItem(name);
    // 获取不到language，其它页面尚未访问，不进行同步
    if (!language) return;
    var raw_lng = language.split('|')[1];
    var _lng = /zh-CN/.test(raw_lng) ? 'zh' : raw_lng;
    // 只设置子域，主域本来就有.  不能设置子域，从其它页返回来会存在同值两cookie，不应设置子域
    // console.log('同步其它页面语言到首页', _lng, language);
    document.cookie = `lng=${_lng}; path=/; expires=Fri, 31 Dec 2030 23:59:59 GMT; domain=${__root__domain}`
  }
  function fromStorageToCookieGoog() {
    const language = localStorage.getItem('language');
    // googtrans 要设置子域才能生效
    // console.log('同步其它页面googTrans到首页', language);
    document.cookie = `googtrans=${`/${language.replace('|', '/')}`}; path=/; expires=Fri, 31 Dec 2030 23:59:59 GMT`
  }
  function likeSso() {
    // 先从cookie取，在存到localStorage里
    const _ = fromCookieToStorage;
    // lng
    _('lng');           // 可能是假的
    _('language');      // lng桥梁
    // 六国语言之外语言googtrans同样要同步
    fromStorageToCookieGoog()
    // 其它页面语言同步到首页
    fromStorageToCookie()     // lng校正
    // 邮箱验证同步不论有没有token
    _('emailVerifyStatus');
    // 获取token，拿不到token不在执行
    const token = getCookie('cjLoginToken') || '';
    if (!token) {
      localStorage.removeItem('token');
      return;
    }
    // token
    _('cjLoginToken');
    // userId, loginName, UserName, firstName, avatar, emailVerifyStatus, subAccountName, vip, lastLoginTime, email, loginTime
    _('userId');_('loginName');_('UserName');_('firstName');_('avatar'); _('subAccountName');_('vip');_('lastLoginTime');_('email');_('loginTime');_('name');
  }
  likeSso();


const headers = { token: store.get('token', { decode: true }) || '', 'language': getCookie('lng') || 'en' };
const $axios = axiosEnhance(new Axios({ headers }));
$axios.post = axiosEnhance(new Axios({ headers, method: 'POST' }));

const $ajax = ajax;

// 可配置头及请求方式
$axios.httpNew = (params) => {
  const paramsObj = {};
  params.headers && (paramsObj.headers = params.headers);
  params.method && (paramsObj.method = params.method);
  const httpFun = axiosEnhance(new Axios(paramsObj));
  const opts = params.opts || {};
  const listen = params.listen || null;
  return httpFun(params.url, opts, listen);
}

/** 用闭包传入 window 有利于 uglify 压缩 */
!function (window) {
  window.NODE_ENV = NODE_ENV;

  // CJ_ 挂载了所有扩展
  // $ 开头的均为第三方库
  window.CJ_ = {
    $axios,
    $ajax,
    $base64,
    $cookie,
    config,
    store,
    getUserInfo,           // 最好不要用，推荐用 CJ_userInfo 属性
    checkLogin,            // 最好不要用，推荐使用 CJ_isLogin 属性
    authLoginUrl,          // 有些 URL 只能登陆后才能访问
    statusCode200,         // 处理 statusCode === "200" 的这种接口，返回 [null, data.result]
    debounce,
    throttle,
    getTopDomain,
    getElitesUrl,
    cookieParser,
    cookieGenerator,
    getQueryVariable,
    getCateGoryList,
    objectToParams,
    paramsToObject,
    getQueryParam
  };

  defUserinfo(window);     // CJ_userInfo 属性
  defIsLogin(window);      // CJ_isLogin 属性
}(window);
