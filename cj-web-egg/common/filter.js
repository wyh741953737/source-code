const utils = require('./utils');

// category 类目链接处理
exports.CATEGORY_LINK = (cate, arr) => {
  let cateName = arr.map(item => ({ id: item.id, name: item.nameEn }));
  cateName = utils.$base64.encode(JSON.stringify(cateName));

  const currentCate = arr[arr.length - 1]; // 当前类

  return `list-detail?id=${currentCate.id}&name=${cateName}&from=all&fromType=all`;
};

// 价格处理
exports.GET_PRICE = prod => {
  if (typeof prod !== 'object') {
    return '--';
  }
  const handle = price => {
    return typeof price === 'string'
      ? price.replace(' -- ', '-')
      : price;
  }
  const price = handle(prod.price || prod.sellPrice || prod.SELLPRICE || prod.sellprice);
  return price ? price : '--';
};

// 折扣价处理
exports.NOW_PRICE = price => {
  const priceNew = typeof price === 'string' ? price.replace(' -- ', '-').replace('--', '-') : price;
  return priceNew ? priceNew : '--';
}


// 首字母大写
exports.INIT_UPPERCASE = str => {
  if (!str) {
    return str;
  }
  return str.substr(0, 1).toUpperCase() + str.substr(1);
}

// 阿里云图片大小处理
exports.IMG_SIZE = (url, ...args) => { // url, w, h
  if (typeof url !== 'string' || url.indexOf('aliyuncs.com') === -1) return url;
  const webpT = 'image/format,webp,'
  var json = {}, size = 200, str = `${url}?x-oss-process=${utils.isSupportWebp() ? webpT : ''}image/resize,m_fill`;

  if (args.length === 1) json = { w: args[0] };
  else if (args.length === 2) json = { w: args[0], h: args[1] };
  else { json = { w: size, h: size } };
  for (var k in json) str += `,${k}_${json[k]}`;
  return exports.HTTPS_PREFIX(str);
};

// 圖片切割
exports.IMG_SPLIT = url => { // 'url1,url2,url3'
  if (typeof url !== 'string') return url;
  try {
    return url.split(',')[0];
  } catch (e) {
    console.warn(e);
    return url;
  }
}

/**
 * 汇率转换
 * 用法同之前的 angular.js ^_^
 */
exports.EXCHANGE_RATE = (price, arg0, isUnit) => {
  if (typeof window === 'undefined') {
    // 服务端(可以通过cookie实现，比较繁琐，暂时不管)
    return `$${price}`;
  }

  // 处理垃圾后台的脏数据
  const priceProcessor = price => typeof price === 'string'
    ? price.replace(' -- ', '-')
    : price;

  const tmp = CJ_.$cookie.get('currency');
  const currency = tmp ? CJ_.cookieParser(tmp) : CJ_.config.currency;

  /** 
   * 汇率、币种符号、千分号
   * @args Array 'number:len' | 'symbol' | 'float:len' 只返回金额部分，只返回符号部分，保留数字长度
   * 如果只想要金额 | exchangeRate: 'number'
   * 如果只想要符号 | exchangeRate: 'symbol'
   * 如果想要小数金额不带符号 | exchangeRate: 'number:4' 默认2
   * 如果想要小数金额带符号 | exchangeRate: 'float:4' 默认2
   * @return 默认返回例: $1.44 (符号+两个长度小数)
   */
  var rate = currency.rate;
  var symbol = currency.symbol;
  var _price = priceProcessor(price);
  var floatLen = 2;
  var unit = ''

  if (/(number|float)(:\d)?/.test(arg0)) {
    const arr = arg0.split(':');
    if (/\d/.test(arr[arr.length - 1])) {
      floatLen = arr[arr.length - 1];
    }
  }

  if (!rate || !price) return price;

  try {
    if (/-/.test(_price)) {
      var arr1 = _price.split('-').map(p => (p * rate).toFixed(floatLen));
      _price = arr1.join('-');
    } else {
      _price = (_price * rate).toFixed(floatLen); // 保留两位小数点
    }
    if (isUnit) {
      const len = (parseInt(_price) + '').length
      if (len >= 7 && len < 9) {
        _price = parseFloat((_price / 1000000).toString().match(/^\d+(?:\.\d{0,1})?/)) + ''
        unit = 'M'
      } else if (len >= 9) {
        _price = parseFloat((_price / 1000000000).toString().match(/^\d+(?:\.\d{0,1})?/)) + ''
        unit = 'B'
      }
    }
    // ---- 19-10-19 加入千分号 ----
    _price = _price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // -----------------------------
  } catch (e) {
    console.warn('汇率转换报错\n', e, '\n', price);
    return '--';
  }

  if (/NaN/.test(_price)) {
    console.warn('NaN 价格 ->', price);
  }

  // return `${symbol}${/NaN/.test(_price) ? '--' : _price}`;

  if (/NaN/.test(_price)) {
    return '--';
  }
  if (arg0 === 'symbol') {
    return symbol;
  }
  if (/number(:\d)?/.test(arg0)) {
    return _price;
  }

  return symbol + _price + unit;
};

// https 前缀
exports.HTTPS_PREFIX = url => {
  let str = url;
  try {
    if (!str.startsWith('https')) {
      const suffix = str.replace(/^http:\/\//, '');
      str = `https://${suffix}`;
    }
  } finally {
    return str;
  }
};

// 时间戳转日期格式
exports.dateFormat =  time => {
  const d = new Date(time);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
  const hour = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
};

// hot类别链接处理
exports.HOTCATEGORY_LINK = (cateCur, cateArr) => {
  let arr = [];

  function isArray(arr) {
    return arr && arr instanceof Array
  }
  cateArr.forEach(function (o, i) {
    if (o.nameEn == cateCur.name) {
      arr.push({
        id: o.id,
        name: o.nameEn
      });
    }else{
      if(isArray(o.children)) {
        o.children.forEach(function (k, j) {
          if (k.nameEn == cateCur.name) {
            arr.push({
              id: o.id,
              name: o.nameEn
            }, {
              id: k.id,
              name: k.nameEn
            });
          }else{
            if(isArray(k.children)) {
              k.children.forEach(function (a, b) {
                if (a.nameEn == cateCur.name) {
                  arr.push({
                    id: o.id,
                    name: o.nameEn
                  }, {
                    id: k.id,
                    name: k.nameEn
                  }, {
                    id: a.id,
                    name: a.nameEn
                  });
                }
              });
            }
          } 
        });
      }
    }
  });

  const cName = utils.$base64.encode(JSON.stringify(arr));
  return `list-detail?id=${cateCur.id}&name=${cName}&from=all&fromType=all`;
};

// 商品详情链接处理
exports.GOODSDETAIL_LINK = (item) => {
  let url = '';
  if(item){
    let id = item && item.productId;
    url = item.flag == '1' 
      ? '/product-detail.html?id=' + id + '&from=all&fromType=&productType=' + (item.productType || 0)
      : '/reptail-detail.html?id=' + id;
  }
  
  return url;
}

// 搜索关键字类目链接
exports.SEARCHKEYWORD_LINK = (item, queryObj, idx) => {
  let url = '';
  let name = queryObj.name ? JSON.parse(utils.$base64.decode(queryObj.name)).slice(0, idx + 1) : [{
    id: '',
    nameEn: 'All Categories',
  }]
  if(item){
    url = `/list-detail?${utils.objectToParams({
      ...queryObj,
      id: item.id || '',
      name: utils.$base64.encode(JSON.stringify(name)),
    })}`
  }
  
  return url;
}

// 搜索关键字类目下拉链接
exports.SEARCHKEYWORD_SUB_LINK = (item, queryObj, idx) => {
  let url = '';
  let name = queryObj.name ? JSON.parse(utils.$base64.decode(queryObj.name)) : [{
    id: '',
    nameEn: 'All Categories',
  }]
  if(!name[0].id) { // 判断id是undefined，将All Categories替换为一级目录
    name = [{
      id: item.id,
      nameEn: item.nameEn || item.name
    }]
  } else {
    name.push({
      id: item.id,
      nameEn: item.nameEn || item.name
    })
  }
  if(item){
    url = `/list-detail?${utils.objectToParams({
      ...queryObj,
      id: item.id || '',
      name: utils.$base64.encode(JSON.stringify(name)),
    })}`
  }
  
  return url;
}

// 搜索sort链接
exports.SEARCHSORT_LINK = (item, queryObj) => {
  let url = '';
  url = `/list-detail?${utils.objectToParams({
    ...queryObj,
    ...item
  })}`
  
  return url;
}

// 标题高亮
exports.KEYWORDS_COLOR_FUL = (str, keys) => {
  if (keys && Array.isArray(keys)) {
    let newstr = str.replace('<', '&lt;').replace('>', '&gt;')
    for (let i = 0; i < keys.length; i++) {
      const reg = new RegExp("(" + keys[i] + ")", "gi");
      newstr = newstr && newstr.replace(reg, "<span style='color:#FF7700;'>$1</span>");
    }
    return newstr;
  }
  return str
}

// 提取文字
exports.SIMPLE_TEXT = (html) => {
  var re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
  var msg = html && html.replace(re1,'');//执行替换成空字符
  return msg;
}

// 创建链接地址
exports._createLink = (item) => {
  // var url = 'javascript:void(0);reture false;';
  var url = 'href=javascript:void(0);';
  const obj = item;
  if (obj.urlOrSku) {
    // skipType跳转类型(1.不跳转,2.网页跳转3.商品详情跳转)
    if (obj.skipType == '3') { //商品详情页
      url = `/product-detail.html?id=${obj.pid}&from=all&fromType=all&productType=0`;
    } else if (obj.skipType == '2') {
      url = obj.urlOrSku;
    } else if (obj.skipType == '1') {
      return `href=javascript:void(0);`;
    }
    return `href=${url} target="_blank`;
  }
  return url;
}