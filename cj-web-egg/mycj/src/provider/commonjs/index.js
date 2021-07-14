
/** url 匹配处理 */
export function getDomainByUrl(url = '') {
  if (!url) {
    console.error('Invalida url.', url)
    return url
  }
  if (url.startsWith('http')) {
    return url
  }
  var urlStart = url.split('/')[0];
  if (urlStart == 'pojo' || urlStart == 'app') {
    urlStart = 'app';
  }
  for (var k in window.httpsJson) {
    if (k == urlStart) {
      return window.httpsJson[k] + url;
    }
  }
}

/** 从数组中通过某个key找到对应的对象索引 */
export function findIndexByKey(arr, key, value) {
  var res;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][key] == value) {
      res = i;
      break;
    }
  }
  if (res >= 0) {
    return res;
  } else {
    return -1;
  }
}

/* 获取规格 */
export function getStandard(name, content) {
  const reg = RegExp(name + '=(\\d+)', 'gi');
  const result = reg.exec(content);
  return Array.isArray(result) ? parseInt(result[1])/10 : null;
}

/* 计算体积 */
export function getVolume(long, width, height, number) {
  long = parseFloat(long) || 0;
  width = parseFloat(width) || 0;
  height = parseFloat(height) || 0;
  number = parseInt(number) || 0;
  return long*width*height*number;
}

export function logisticSortByPrice(logsiticList) {
  if(!$.isArray(logsiticList)) {
    return [];
  }
  const tempLogsiticList = logsiticList.sort((prevObj,currentObj) => {
    let arrPrev, arrCurrent, prev, current;
    if($.type(prevObj.price) === 'string') {
      if(prevObj.price.indexOf('-') !== -1) {
        arrPrev = prevObj.price.split('-');
        prev = parseFloat(arrPrev[0]);
      } else {
        prev = parseFloat(prevObj.price);
      }
    }
    if($.type(currentObj.price) === 'string') {
      if(currentObj.price.indexOf('-') !== -1) {
        arrCurrent = currentObj.price.split('-');
        current = parseFloat(arrCurrent[0]);
      } else {
        current = parseFloat(currentObj.price);
      }
    }
    if($.type(prevObj.price) === 'number') {
      prev = prevObj.price
    }
    if($.type(currentObj.price) === 'number') {
      current = currentObj.price
    }
    return prev - current;
  })
  return tempLogsiticList;
}

function getCookie(c_name) {
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

/** 登录校验 */
export function isInLoginState({ base64, dsp }) {
  // 设置主域storage
  function fromCookieToStorage(name) {
    var value = getCookie(name) || '';
    var _name = name == 'cjLoginToken' ? 'token' : name;
    if (_name === 'token') {
      value = base64.encode(value || '');
    }
    //console.log('setStorage-noindex', _name, value);
    localStorage.setItem(_name, value);
  }
  function fromStorageToCookieGoog() {
    const language = localStorage.getItem('language');
    // googtrans 要设置子域才能生效
    //console.log('同步首页googTrans到其它页面', language);
    document.cookie = `googtrans=${`/${language.replace('|', '/')}`}; expires=Fri, 31 Dec 2030 23:59:59 GMT`
  }
  function likeSso() {
    // 获取token，拿不到token不在执行
    const _ = fromCookieToStorage;
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
    _('userId');_('loginName');_('UserName');_('firstName');_('avatar'); _('subAccountName');_('vip');_('lastLoginTime');_('email');_('loginTime');_('name');_('loginfromerp');_('erpoperateuser');
  }

  return function () {
    likeSso();

    var hasLogin;
    var nowTime = new Date().getTime();
    var token = dsp.getCookie('cjLoginToken');
    // var loginName = localStorage.getItem('loginName');
    // var firstName = localStorage.getItem('firstName');
    // var loginTime = localStorage.getItem('loginTime');
    // -- 通过cookie同步币种信息-域名切换
    var cjLoginToken = dsp.getCookie('cjLoginToken');
    var loginTime = dsp.getCookie('loginTime');
    var loginName = dsp.getCookie('loginName');
    // console.log("cjLoginToken",cjLoginToken)
    if (!loginName || !loginTime || !cjLoginToken) {
      hasLogin = false;
      // localStorage.clear();
      localStorage.removeItem('loginName');
      localStorage.removeItem('firstName');
      localStorage.removeItem('loginTime');
      localStorage.removeItem('token');
      localStorage.removeItem('utmSource');
      dsp.delCookie('cjLoginName');
      dsp.delCookie('cjLoginToken');
      dsp.delAwcCookie('awc');
      return hasLogin;
    }
    // 限制三天过期
    if (nowTime - loginTime > 259200000) {
      hasLogin = false;
      // localStorage.clear();
      localStorage.removeItem('loginName');
      localStorage.removeItem('firstName');
      localStorage.removeItem('loginTime');
      localStorage.removeItem('token');
      localStorage.removeItem('utmSource');
      dsp.delCookie('cjLoginName');
      dsp.delCookie('cjLoginToken');
      dsp.delAwcCookie('awc');
      return hasLogin;
    }

    dsp.setCookie('cjLoginName', base64.decode(loginName), 3, __root__domain);
    dsp.setCookie('cjLoginToken', token, 3, __root__domain);
    
    localStorage.setItem('loginTime', nowTime);
    hasLogin = true;
    // 结果： hasLogin = true,已登录   hasLogin = false，未登录
    return hasLogin;
  }
}

/** mycj设置右侧最小高度 */
export function setRightMinHeight() {
  if ($('.mycj-home-box').length > 0 && $('.mycj-right-bar').length > 0) {
    $('.mycj-home-box').css({
      'min-height': $(window).height() - 80 - 60 + 'px'
    });
    if ($('.top-taps').length > 0) {
      $('.mycj-right-bar').css({
        'min-height': $(window).height() - 80 - 60 - 20 - $('.top-taps').height() + 'px'
      });
    } else {
      $('.mycj-right-bar').css({
        'min-height': $(window).height() - 80 - 60 - 20 + 'px'
      });
    }
  }
}

/** 论坛跳转 */
export function getElitesUrl() {
  const t = Date.now();
  let url = 'https://elites.cjdropshipping.com/cross';//https://elites.cjdropshipping.com
  if (window.environment == 'test') {
    url = 'http://192.168.5.219:4000/cross';
  } else {
    url = 'https://elites.cjdropshipping.com/cross';
  }
  let token = localStorage.getItem('token');
  if (token) {
    try {
      url = `${url}?_t=${t}&token=${new Base64().decode(token)}`;
    } catch (err) {
      console.log('ElitesUrl token decode err', err)
    }
  }
  return url;
}

/** 供应商物流列表 */
export function getShipListSupplier(dsp) {
  return function (options, successCallback) {
    var sendData = options;
    dsp.postFun('supplier/logisticsCompany/getSupplierFreightByCountryCode', JSON.stringify(sendData), function (res) {
      if (res.data.code == 200) {
        successCallback(res.data.data);
      }
    })
  }
}


/** 物流列表new */
export function getShipListNew({ base64, dsp }) {
  // 把新的接口参数格式化成老的接口返回形式
  const formatList = (list) => {
    if (!Array.isArray(list)) {
      return []
    }
    return list.map(item => {
      return {
        id: item.optionId,
        nameCn: item.optionNameCn,
        nameEn: item.optionNameEn,
        remark: null,
      }
    })
  }
  // 改了新接口之后的逻辑
  const newApi = (options, successCallback) => {
    var sendData = {};
    sendData.platformList = options.platForms; // 平台（Array）
    sendData.startCountryCode = options.startCountryCode; // 发件国家简码（String）
    sendData.destCountryCode = options.countryCode; // 到件国家简码（String）
    // 重量
    sendData.weightList = [options.minWeight, options.maxWeight]
    // 是否供应商商品，0否，1是
    sendData.isSupplier = options.isSupplier
    // 客户 id
    const userId = localStorage.getItem('userId') || ''
    sendData.customerId = base64.decode(userId) || undefined
    // 供应商商品传 supplierSkuList 字段,
    // 该字段需要传一个列表
    const sku = options.sku
    if (sku) {
      const skuList = Array.isArray(sku) ? sku : [sku]
      if (options.isSupplier === 1) {
        sendData.supplierSkuList = skuList
      } else {
        sendData.skuList = skuList
      }
    }
    if (options.weightInterval) {
      // 重量区间转为最大重量和最小重量
      options.weightInterval = options.weightInterval + '';
      if (options.weightInterval.indexOf(' -- ') > -1) {
        var weightList = options.weightInterval.split(' -- ')
        sendData.weightList = [Number(weightList[0]), Number(weightList[1])]
      } else {
        // sendData.maxWeight = sendData.minWeight = Number(options.weightInterval);
        var weight = Number(options.weightInterval)
        sendData.weightList = [weight, weight]
      }
    }
    sendData.propertyList = options.propertys; // 属性（Array）

    dsp.postFun('cujiaLogisticsFreight/operation/getLogisticsMode', JSON.stringify(sendData), function (data) {
      console.log(data);
      const res = data.data
      if (res && Number(res.code) === 200) {
        const formattedData = formatList(res.data)
        successCallback(formattedData);
      }
    })
  }

  return function (options, successCallback) {
    // 如果有 isSupplier 参数, 那么就直接使用新的接口
    if (options.isSupplier !== undefined) {
      newApi(options, successCallback)
      return
    }
    var sendData = {};
    sendData.platForms = options.platForms; // 平台（Array）
    sendData.startCountryCode = options.startCountryCode; // 发件国家简码（String）
    sendData.countryCode = options.countryCode; // 到件国家简码（String）
    sendData.maxWeight = options.maxWeight; // 最大重量（Number）
    sendData.minWeight = options.minWeight; // 重量（Number）
    if (options.weightInterval) {
      // 重量区间转为最大重量和最小重量
      options.weightInterval = options.weightInterval + '';
      if (options.weightInterval.indexOf(' -- ') > -1) {
        sendData.maxWeight = Number(options.weightInterval.split(' -- ')[1]);
        sendData.minWeight = Number(options.weightInterval.split(' -- ')[0]);
      } else {
        sendData.maxWeight = sendData.minWeight = Number(options.weightInterval);
      }
    }
    sendData.propertys = options.propertys; // 属性（Array）
    // sendData.pid = options.pid; // 商品id（用于查折扣）
    // sendData.storeCountry = options.storeCountry // 店铺国家
    dsp.postFun('freight/logistics/getLogisticsInfo', JSON.stringify(sendData), function (data) {
      console.log(data);
      if (data.data.code == 200) {
        successCallback(data.data.data);
      }
      // successCallback(data.data);
    })
  }
}

/** 商品详情物流列表 */
export function getMulShipList(dsp) {
  return function (parmas, successCallback) {
    dsp.postFun('freight/logistics/getUnionLogisticsFreight', parmas, function (data) {
      if (data.data.code == 200) {
        successCallback(data.data.data);
      }
    })
  }
}

/** 根据物流获取价格 */
export function getMulShipCost(dsp) { 
  return function (parmas, successCallback) {
    dsp.postFun('freight/logistics/getLogisticsFreightForSku', parmas, function (data) {
      console.log(data);
      if (data.data.code == 200) {
        successCallback(data.data.data);
      }
    })
  }
}


/** 物流列表 */
export function getShipList(dsp) {
  return function (option) {
    var areaMap = {
      CHINA: 'CN',
      USA: 'US',
      China: 'CN',
    }
    var sendData = {};
    sendData.area = areaMap[option.area] || option.area; // 发货仓
    sendData.country = option.country; // 发往国家
    sendData.weight = option.weight; // 重量
    sendData.character = option.character; // 属性
    sendData.pid = option.pid; // 商品id（用于查折扣）
    sendData.shopType = option.shopType; // 店铺类型
    sendData.enName = option.enName; // 物流方式，如果不传会返回物流列表，如果传了会返回长度为1的物流列表（当前物流方式）
    sendData.shopId = option.shopId; //店铺id
    sendData.storeCountry = option.storeCountry; // 店铺国家
    sendData.productType = option.productType;
    sendData.sku = option.sku;
    sendData.supplierId = option.supplierId;
    sendData.channelValidSkip = option.channelValidSkip; //新增请求参数，解决店铺设置默认物流后查看目的地物流提示不支持

    var postUrl = 'app/order/getLogisticsDiscountPrice';
    // if (sendData.shopId) {
    //   postUrl = 'app/order/getLogisticsDiscountPriceNew';
    // } else {
    //   postUrl = 'app/order/getLogisticsDiscountPrice';
    // }
    // layer.load(2);
    dsp.postFun(postUrl, JSON.stringify(sendData), function (data) {
      // layer.closeAll('loading');
      option.successCallback(data.data);
    })
  }
}

const userId = localStorage.getItem('userId') ? atob(localStorage.getItem('userId')) : '';
// 根据pid获取库存信息
export function getAreaByPid(dsp) {
  return function (pid, cb) {
    dsp.postFun('storehousecj/areaInventory/getAreaInventoryInfo', {
      pid: pid,
      customerId: userId
    }, function (data) {
      if (data.data.code == 200) {
        cb(data.data.data);
      }
    })
  }
}

// 根据商品编号以及区域编号获取区域的所有变体库存信息
export function getVInvsByPidAndAreaId(dsp) {
  return function (options, successCallback) {
    dsp.postFun('storehousecj/areaInventory/getAreaInventoryInfoByPidAndAreaId', {
      pid: options.pid,
      areaId: options.areaId
    }, function (data) {
      if (data.data.code == 200) {
        var vInvsMap = {};
        var data = data.data.data;
        for (var i = 0; i < data.length; i++) {
          vInvsMap[data[i].entityId] = data[i].num;
        }
        successCallback(vInvsMap);
      }
    })
  }
}

// 根据发货区域国家码以及平台类型获取到货国家列表
export function getReceiveCountries(dsp) {
  return function (options,successCallback) {
    dsp.postFun('freight/logistics/getReceiverCountryInfo', {
      startCountryCodes: options.startCountryCodes,
      platForm: options.platForm
    }, function (data) {
      if (data.data.code == 200) {
        successCallback(data.data.data);
      }
    })
  }
}

// 获取供应商目的国家
export function getSupplierReceiveCountries(dsp) {
  return function (options,successCallback) {
    dsp.getFun(`supplier/logistics/getSupplierCountryBySku?sku=${options.sku}`, function (data) {
      if (data.data.code == 200) {
        successCallback(data.data.data);
      }
    })
  }
}


/** 获取 POD 类目 */
export function getPodCategory(dsp) {
  return function (scb) {
    if (sessionStorage.getItem('podCategoryList')) {
      let data = JSON.parse(sessionStorage.getItem('podCategoryList'));
      scb(data);
    } else {
      dsp.postFun('cj/individuationProduct/getIndividuationCategoryInfo', { categoryID: '' }, function (res) {
        if (res.data.statusCode == 200) {
          let arr = [];
          res.data.result.forEach(o => {
            arr.push({ id: o.ID, name: o.name, nameEn: o.NAME_EN })
          });
          scb(arr);
        } else {
          layer.msg('Get the category list error');
        }
      });
    }
  }
}

/** 获取商品类目 */
export function getCateList(dsp) {
  return function (scb) {
    if (sessionStorage.getItem('CategoryList')) {
      var data = JSON.parse(sessionStorage.getItem('CategoryList'));
      scb(data);
    } else {
      dsp.getFun('app/product/categorylist' + '?pid=', function (data) {
        var data = data.data;
        if (data.statusCode != 200) {
          layer.msg('Get the category list error');
        } else {
          scb(JSON.parse(data.result));
        }
      });
    }
  }
}

/**
 * 获取个性化域名
 *
 * 分销模式说明
 * "1"-没有域名，同cj展示
 * "2"-独占模式
 * "3"-单一模式
 * "4"-以前有域名，同cj展示
 */
export function domainData({ cjDomains, $http, $q }) {
  var postflag = 0; // 保证只掉一次接口

  return function () {
    var deferred = $q.defer();
    var promise = deferred.promise;
    var resData = {};
    var url;
    var data = {
      status: '11'
    };
    if (cjDomains.indexOf(window.location.hostname) !== -1) {
      resData.iscj = '1';
      deferred.resolve(resData);
    } else {
      //判读是否进入手机端
      var sUserAgent = navigator.userAgent;
      if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) {
        window.location.replace('fx_mobileAccess.html');
      }
      var isDomainData = sessionStorage.getItem('domainNameData') || null;
      if (!isDomainData) {
        if (!postflag) {
          postflag = 1;
          $http.post(window.httpsJson._affiliate3_190606 + 'fx/fenXiao/selectFenXiaoList', data).then(function (res) {
            if (res.data.statusCode == 200) {
              postflag = 0;
              resData = res.data.result;
              resData.domainName = document.domain;
              resData.iscj = '0';
              // resData.productid = resData.productid;
              resData.affModel = resData.isDuZhan || '1';
              // 书签
              // resData.productid = '91B281AF-BE63-4879-83AA-BE0124630481';
              // resData.affModel = '1';
              // 书签
              sessionStorage.setItem('domainNameData', JSON.stringify(res.data.result));
              deferred.resolve(resData);
            }
          });
        } else {
          var temTimer = setInterval(() => {
            var isDomainData = sessionStorage.getItem('domainNameData') || null;
            if (isDomainData) {
              resData = JSON.parse(sessionStorage.getItem('domainNameData'));
              resData.iscj = '0';
              resData.domainName = document.domain;
              // resData.productid = resData.productid;
              resData.affModel = resData.isDuZhan || '1';
              deferred.resolve(resData);
              clearInterval(temTimer)
            }
          }, 1000);
        }
      } else {
        resData = JSON.parse(sessionStorage.getItem('domainNameData'));
        resData.iscj = '0';
        resData.domainName = document.domain;
        // resData.productid = resData.productid;
        resData.affModel = resData.isDuZhan || '1';
        // 书签
        // resData.productid = '91B281AF-BE63-4879-83AA-BE0124630481';
        // resData.affModel = '1';
        // 书签
        deferred.resolve(resData);
      }
    }
    return promise;
  }
}


/**
 * @description
 * 获取并处理仓库列表，一个国家一个仓库只显示国家，一个国家多个仓库显示仓库+国家
 *
 * @param {object} option successCallback返回值
 */
export function getWareList(dsp){
  return function(option){
    const getWare = new Promise(function(resolve,reject){
      let parmas = {
        useStorageType:'1'
      };
      if(option.productType&&option.productType == 1){//服务商品
        parmas.placeServerProduct = 1;
      }
      if(option.productType&&option.productType == 2){//包装私有
        parmas.placePrivateProduct = 1;
      }
      dsp.postFun('storehouse/WarehousInfo/getStorehouseNew', parmas, ({ data }) => {
        data.code == 200 ? resolve(data.data.length>0?data.data:[]):reject([]);
      }, err => {
        reject([])
        console.log('getStorehouse==',err)
      });
    })
    const getArea = new Promise(function(resolve,reject){
      dsp.postFun('warehouseBuildWeb/management/getCountryByAreaId', {}, ({ data }) => {
        data.code == 200 ? resolve(data.data.length>0?data.data:[]):reject([]);
      }, err => {
        reject([])
        console.log('getCountryByAreaId==',err)
      });
    })
    Promise.all([getWare,getArea]).then(function(result){
      let warehouse = result[0],areaList = result[1];
      let areaIds= [],newIds=[];
      let areaObj ={};
      for(let i =0,len=areaList.length;i<len;i++){
        areaObj[+areaList[i].areaId] = areaList[i];
      }

      //首先找到是否有相同区域仓库
      warehouse.filter(item => {
        if(!item.storageNo2Name.includes('Zhi Fa')){
          ~areaIds.indexOf(item.areaId)?newIds.push(item.areaId):areaIds.push(item.areaId);
          item.name = `${item.storageNo2Name}`;
          return item;
        }
      });
      //从相同区域仓库筛选
      warehouse = warehouse.filter(_item=>!_item.storageNo2Name.includes('Zhi Fa')).map(item=>{
        if(areaObj[+item.areaId]){
          item.name = ~newIds.indexOf(item.areaId)?`${item.storageNo2Name} ${areaObj[+item.areaId].nameEn}`:`${areaObj[+item.areaId].nameEn}`;
          item.countryCode = areaObj[+item.areaId].countryCode
        }else{
          item.name = item.storageNo2Name;
        }
  
        return item;
      })
  
      layer.closeAll();
      option.successCallback(warehouse);
    })
  }
}

export function isVerifyEmail({ base64, dsp }) {
  return function() {
    const emailVerifyStatus = localStorage.getItem('emailVerifyStatus'); // 1 邮箱已验证 3 邮箱未验证
    emailVerifyStatus === '3' && (location.href = `verify_email.html?target=${base64.encode(location.href)}`)
    return emailVerifyStatus === '3'
  }
}

/**
 * 展示弹窗 
 * @param {string} text 提示字符串
 * @param {object} options 属性
 * @param {Function} afterCloseFun 关闭后做点什么
 */
export function reLoginToast(text, options, afterCloseFun){
  const _options = { ...options, id:'GLOBAL_TOAST' }
  layer.msg(text, _options, afterCloseFun) 
}

export const showToast = reLoginToast