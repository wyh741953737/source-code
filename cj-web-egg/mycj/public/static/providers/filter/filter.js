/**
 * 自定义全局过滤器
 */

; (function () {
  var app = angular.module('custom-filter', []);

  /** 阿里雲圖片大小處理 */
  app.filter('IMG_SIZE', function () {
    return function (url, ...args) {
      if (typeof url !== 'string') return url;
      var json = {}, size = 200, str = `${url}?x-oss-process=image/resize,m_fill`;

      if (args.length === 1) json = { w: args[0] };
      else if (args.length === 2) json = { w: args[0], h: args[1] };
      else { json = { w: size, h: size } };
      for (var k in json) str += `,${k}_${json[k]}`;
      return str;
    }
  });

  /** 圖片切割 */
  app.filter('imgSeparator', function () {
    return function (url) {
      if (typeof url !== 'string') return url;
      try {
        return url.split(',')[0]
      } catch (e) {
        console.warn(e);
        return url;
      }
    }
  });

  /** 首字母大写 */
  app.filter('fWordUpcase', function () {
    return function (name) {
      if (name)
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
  });

  /** 国旗 */
  app.filter('nationalFlag', function () {
    return function (str) {
      if (!str) return '../../static/image/national-flag/US.png' // 默认美国

      return `../../static/image/national-flag/${str}.png`
    }
  });

  /** 
   * 汇率、币种符号、千分号
   * @args Array 'number:len' | 'symbol' | 'float:len' 只返回金额部分，只返回符号部分，保留数字长度
   * 如果只想要金额 | exchangeRate: 'number'
   * 如果只想要符号 | exchangeRate: 'symbol'
   * 如果想要小数金额不带符号 | exchangeRate: 'number:4' 默认2
   * 如果想要小数金额带符号 | exchangeRate: 'float:4' 默认2
   * @return 默认返回例: $1.44 (符号+两个长度小数)
   */
  app.filter('exchangeRate', function () {
    return function (price, arg0) {
      var rate = window.localStorage.getItem('rate_exchange-rate');
      var symbol = window.localStorage.getItem('rate_currency-symbol') || '$';
      var _price = _priceProcessor(price);
      var floatLen = 2;

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

      return symbol + _price;
    }
  });

  /** 價格加工 */
  app.filter('priceProcessor', function () {
    return function (item) {
      if (typeof item !== 'object') return '--';
      const price = _priceProcessor(item.price || item.sellPrice || item.SELLPRICE || item.sellprice);
      return price ? price : '--';
    }
  });
  app.filter('strorageFil', function () { //可以注入依赖
    return function (val) {
      let text = '';
      if (val == 0) {
        text = 'Yiwu Warehosue';
      } else if (val == 1) {
        text = 'Shenzhen Warehosue';
      } else if (val == 2) {
        text = 'Cal Warehosue';
      } else if (val == 3) {
        text = 'NJ Warehosue';
      }
      return text;
    }
  });

  function _priceProcessor(price) {
    return typeof price === 'string'
      ? price.replace(' -- ', '-').replace('--', '-')
      : price;
  }
}());