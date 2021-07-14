require('@src/provider/commonjs/patch-error').patchError(); // 报错补丁
import { BUILD_TIMESTAMP } from '@root_egg/env.js'
import { delCookie,delAwcCookie, getCookie, setCookie, cookieParser, cookieGenerator } from '@src/provider/commonjs/cookie';
import { href2json, isPhone, skipToMobile, urlSearch2json } from '@src/provider/commonjs/skip-mobile';
import { cacuAmount, cacuDiscount, cacuProduct } from '@src/provider/commonjs/calculate';
import { getFun, getFun2, getQueryString, mypost, postFun, postFun2,maiDianPostFun, postLogistics, postCancel } from '@src/provider/commonjs/http';
import { encryptF, login, saveDataAfterLogin , loginProcess } from '@src/provider/commonjs/login';
import { ossUploadFile, upLoadImgPost } from '@src/provider/commonjs/upload-file';
import { isinvoiceDialog, iswallInvoiceDialog } from '@src/provider/commonjs/invoice';
import { addNodataPic, addNodataPicNewStyle, beforeSearchPic, afterSearchPic, beforeSearchPicVIP, afterSearchPicVIP, closeLoadPercent, load as loading_load, loadPercent } from '@src/provider/commonjs/loading';
import {
  domainData,
  findIndexByKey,
  getAreaByPid,
  getCateList,
  getDomainByUrl,
  getElitesUrl,
  getPodCategory,
  getReceiveCountries,
  getSupplierReceiveCountries,
  getShipList,
  getShipListNew,
  getStandard,
  getVolume,
  logisticSortByPrice,
  getMulShipList,
  getMulShipCost,
  getVInvsByPidAndAreaId,
  getWareList,
  isInLoginState,
  setRightMinHeight,
  isVerifyEmail,
  getShipListSupplier,
  showToast
} from '@src/provider/commonjs/index';
import guidList from '@root_egg/common/intelGuid.js';
import i18next from 'i18next'
import utils from "@root_egg/common/utils.js";
const { languages } = require('@root_egg/common/config')
 
const serviceModule = angular.module('service', []);

serviceModule.service('dsp', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {
  // 读取url查询字符串
  var dsp = this;
  var base64 = new Base64();
  let lng = getCookie('lng') || 'en'
  var referrer = document.referrer;
  if(referrer && referrer.indexOf('shopmaster.com') !== -1){
    sessionStorage.setItem('fxReferrer',document.referrer);
  }
  
  if(!languages.includes(lng)) lng = 'en'
  let trans = require(`../../../../../public/lang/pull/${lng}/common.json`)
  i18next.init({
    lng,
    debug: false,
    resources: {
      [lng]: {
        translation: trans,
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
      value = base64.encode(value || '');
    }
    localStorage.setItem(_name, value);
  }
  function fromStorageToCookieGoog() {
    const language = localStorage.getItem('language');
    // googtrans 要设置子域才能生效
    //console.log('同步首页googTrans到其它页面', language);
    document.cookie = `googtrans=${`/${language.replace('|', '/')}`}; expires=Fri, 31 Dec 2030 23:59:59 GMT`
  }
  function likeSso() {
    console.log('common.js: sso');
    const _ = fromCookieToStorage;
    // 获取token，拿不到token不在执行
    // lng
    _('lng');
    _('language');
    fromStorageToCookieGoog();
    // 邮箱验证同步不论有没有token
    _('emailVerifyStatus');
    //_('googtrans');
    const token = getCookie('cjLoginToken') || '';
    if (!token) {
      return;
    }
    // 先从cookie取，在存到localStorage里
    // token
    _('cjLoginToken');
    // userId, loginName, UserName, firstName, avatar, emailVerifyStatus, subAccountName, vip, lastLoginTime, email, loginTime
    _('userId');_('loginName');_('UserName');_('firstName');_('avatar'); _('subAccountName');_('vip');_('lastLoginTime');_('email');_('loginTime');_('name');_('loginfromerp');
  }

  likeSso();

  var token;
  if (typeof (Storage) == "undefined") {
    console.log("提醒：您的浏览器不支持Web Storage");
    window.location = 'error02.html';
  } else {
    try {
      token = base64.decode(localStorage.getItem('token') == undefined ? "" : localStorage.getItem('token'));
    } catch (err) {
      console.log("提醒：您的浏览器不支持Web Storage");
      window.location = 'error02.html';
    }
  }
  // get请求
  this.getFun = getFun({$rootScope, $http, getDomainByUrl, token, base64, dsp });

  // post请求
  this.postFun = postFun({ $rootScope, $http, getDomainByUrl, token, base64, dsp });
  // cancelPost
  this.postCancel = postCancel({  $q, $rootScope, $http, getDomainByUrl, token, base64, dsp });

  // 埋点post请求
  this.maiDianPostFun = maiDianPostFun({ $rootScope, $http, getDomainByUrl, token, base64, dsp });

  //2019-7-9 xiaoy   -----    使用   调用前可使用 layer.load(2) 作为遮罩层
  this.mypost = mypost({ $q, postFun: this.postFun });

  // 物流 GET
  this.getFun2 = getFun2({ $http, dsp });

  // 物流 POST
  this.postFun2 = postFun2({ $http, dsp });
  

  // 只存在单个layer弹窗提示
  this.showToast = showToast

  // 上传图片post（特殊请求头）
  // 特殊情况用
  this.upLoadImgPost = upLoadImgPost({ dsp, $http, getDomainByUrl, token });

  // 从数组中通过某个key找到对应的对象索引
  this.findIndexByKey = findIndexByKey;

  // 添加聊天
  this.addChatWindow = function () {
    var script = document.createElement('script');
    script.src = window.httpsJson._chat_190606 + `javascripts/newChat.js?v=${BUILD_TIMESTAMP}`;
    document.body.append(script);
  }

  // 添加聊天
  this.addSupplerChatWindow = function () {
    var script = document.createElement('script');
    script.src = window.httpsJson._chat_190606 + `javascripts/supplierNewChat.js`;
    document.body.append(script);
  }
  //添加智能引导
  this.addGuidWindow = function () {
    var script = document.createElement('script');
    script.src = window.httpsJson._chat_190606 + `javascripts/intelGuid.js`;
    document.body.append(script);
  }

  // 操作cookie
  this.setCookie = setCookie;
  this.getCookie = getCookie;
  this.delCookie = delCookie(dsp);
  this.delAwcCookie = delAwcCookie(dsp);
  this.cookieParser = cookieParser;
  this.cookieGenerator = cookieGenerator;

  // 判断是否登录
  this.isInLoginState = isInLoginState({ base64, dsp });

  // 加载动画 // 已弃用
  this.load = loading_load;

  // 关闭加载动画 // 已弃用
  this.closeLoad = () => layer.closeAll('loading');

  // 加载动画new
  this.loadPercent = loadPercent;

  // 关闭加载动画new
  this.closeLoadPercent = closeLoadPercent;

  // no data found(列表无数据展示用)
  this.addNodataPic = addNodataPic;
  this.addNodataPicNewStyle = addNodataPicNewStyle;
  this.beforeSearchPic = beforeSearchPic;
  this.afterSearchPic = afterSearchPic;
  this.beforeSearchPicVIP = beforeSearchPicVIP;
  this.afterSearchPicVIP = afterSearchPicVIP;

  // 取消 no data found
  this.removeNodataPic = function ($dom) {
    $dom.find('.cj-nodata-pic').remove();
    $dom.css('min-height', 'auto');
  }

  // 是否弹窗去设置发票抬头
  this.isinvoiceDialog = isinvoiceDialog(this.postFun);

  // wall-invoice
  this.iswallInvoiceDialog = iswallInvoiceDialog(this.postFun);

  const skipURLParams = {
    reservedDomains: [
      'cjdropshipping.com', // cj 域名
      'app.cjdropshipping.com', // cj 域名
      'localhost', // test 域名
    ],
    toURL: window.httpsJson._phone_190606, // mobile site URL.
  };

  // 判断是否手机端
  this.skipToMobile = skipToMobile(skipURLParams);
  
  this.isPhone = isPhone({ skipToMobile: this.skipToMobile, skipURLParams })

  this.urlSearch2json = urlSearch2json;

  this.href2json = href2json;

  // oss上传文件
  this.ossUploadFile = ossUploadFile({ postFun: this.postFun, dsp });

  // 数组去重
  this.uniqueArray = arr => Array.from(new Set(arr));

  // mycj设置右侧最小高度
  this.setRightMinHeight = setRightMinHeight;

  //获取个性化域名
  // 分销模式说明
  // "1"-没有域名，同cj展示
  // "2"-独占模式
  // "3"-单一模式
  // "4"-以前有域名，同cj展示
  var cjDomains = ['app.cjdropshipping.com', 'cjdropshipping.com', 'localhost', '192.168.5.197', 'app.test.com']; // cj域名组
  this.domainData = domainData({ cjDomains, $http, $q });

  // 计算折扣价
  this.cacuDiscount = cacuDiscount;

  // 计算总数
  this.cacuAmount = cacuAmount;

  // 计算乘积
  this.cacuProduct = cacuProduct;

  // 隐藏发票的用户
  this.noInvoiceArr = ['CJ30723','CJ78856','CJ60501','CJ64796','CJ74213','CJ86419','CJ101072','CJ101082','CJ24576','CJ39620']

  this.getQueryString = getQueryString;

  // 登录加密
  this.encryptF = encryptF;

  this.login = login(dsp);
  this.loginProcess = loginProcess(dsp);

  this.saveDataAfterLogin = saveDataAfterLogin({ base64, dsp });

  //获取商品类目
  this.getCateList = getCateList(dsp);

  this.getAreaByPid = getAreaByPid(dsp);

  this.getVInvsByPidAndAreaId = getVInvsByPidAndAreaId(dsp);

  this.getReceiveCountries = getReceiveCountries(dsp);

  this.getSupplierReceiveCountries = getSupplierReceiveCountries(dsp);

  //获取pod类目
  this.getPodCategory = getPodCategory(dsp);

  //论坛跳转
  this.getElitesUrl = getElitesUrl;

  this.isEmail = (val) => {
    var emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (emailReg.test(val)) {
      return true;
    } else {
      return false;
    }
  }
 
  //url链接校验
  this.isUrl = (val) => {
    var urlReg = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
    if (urlReg.test(val)) {
      return true;
    } else {
      return false;
    }
  }

  // 公用提示
  this.cjMesFun = function (code) {
    if (code == 1) { // 服务器异常
      // layer.msg('The server is busy now, please try again later.');
      dsp.showToast('The server is busy now. Please try again later.')
    }
  }

  this.getSupplierAppUrl = ()=>{
    let environment = window.environment;
    if (/test/.test(environment)) {
      return 'http://192.168.5.239/zh/register';
    } else if (/production##$/.test(environment)) {
      return 'https://suppliers.cjdropshipping.cn/zh/register';
    } else if (/production-cn##$/.test(environment)) {
      return 'https://suppliers.cjdropshipping.cn/zh/register';
    }
  }

  // 获取供应商物流列表 
  this.getShipListSupplier = getShipListSupplier(dsp)
  
  // 物流列表
  this.getShipListNew = getShipListNew({ base64, dsp });

  // 商品详情获取物流列表
  this.getMulShipList = getMulShipList(dsp);

  this.getMulShipCost = getMulShipCost(dsp);

  // 获取商品长宽高
  this.getStandard = getStandard;

  // 计算商品体积
  this.getVolume = getVolume;

  // 物流列表
  this.getShipList = getShipList(dsp);

  this.logisticSortByPrice = logisticSortByPrice;
  
  // oss上传文件地址
  this.signatureURL = getDomainByUrl('app/oss/policy');
  //获取仓库列表并处理
  this.getWareList = getWareList(dsp);
  
  // 新用户是否验证邮箱处理
  this.isVerifyEmail = isVerifyEmail({ base64, dsp });

  this.getGuidList = guidList

  this.i18next = i18next

  this.targetLng = lng

  this.getTransWarehouse = (cb) => {
    utils.getTransWarehouse(lng).then(([err, res]) => {
      if (!err) {
        let result = (res || {}).result || [];
        let cnName, gmName, idName;
        result.forEach(v => {
          if (v.en === "China Warehouse") cnName = v.value;
          if (v.en === "Germany Warehouse") gmName = v.value;
          if (v.en === "Indonesia Warehouse") idName = v.value;
        });
        cb(cnName, gmName, idName)
      }
    });
  }
  var test = {};

  this.getDomainByUrl = getDomainByUrl
  dsp.getScroll = function() {
    var test = document.getElementById('router-outlet-wrap');
    return test;
    // var parentScrollTop = 0;
    // document.getElementById('router-outlet-wrap').onscroll = (e) => {
    //   // console.log('55555555==============', e.target.scrollTop)
    //   parentScrollTop = e.target.scrollTop;
    //   // console.log('99999999999999999999===', dsp.parentScrollTop)
    // }
    // return parentScrollTop;
  }

  /** 获取cjpacket 物流信息 */
  this.postLogistics = postLogistics({ $http, dsp });
}]);
