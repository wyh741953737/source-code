export function utilsFactory(module) {
  const bs = new Base64();

  module.service('utils', [function () {
    /**
     * 图片大小处理[oss服务器自带]
     * @param {String} url 图片链接
     * 文档链接 [https://help.aliyun.com/document_detail/44688.html]
     */
    // 固定宽高
    this.IMG_SIZE = (url, param = {}) => {
      var str = `${url}?x-oss-process=image/resize,m_pad`; // https://cc-west-usa.oss-us-west-1.aliyuncs.com/15330528/2076770670210.jpg?x-oss-process=image/resize,w_200,h_200
      for (var k in param) str += `,${k}_${param[k]}`;
      return str;
    };

    this.base64 = {
      decode: str => {
        try {
          return bs.decode(str);
        } catch (e) {
          console.warn('base64 decode error -> ', e.stack, '\n', e);
          return '';
        }
      },
      encode: str => {
        try {
          return bs.encode(str);
        } catch (e) {
          console.warn('base64 edcode error -> ', e.stack, '\n', e);
          return '';
        }
      }
    };

    /** https前缀 */
    this.httpsPrefix = function (url = '') {
      let _url = url;

      try {
        _url = (url.indexOf('http') === 0 ? url : 'https://' + url).replace(/$http(s?)/, 'https');
      } catch (e) { console.warn(e.stack); }

      return _url
    };

    /**
     * 安全的JSONparse
     */
    this.JSONparse = jsonStr => {
      var json = null;
      try {
        json = JSON.parse(jsonStr);
      } catch (e) {
        console.warn('JSONparse error ->\n', e.stack, '\n--------\n', jsonStr)
      }
      return json;
    }

    /**
     * localStorage 读写，支持 JSONparse 解析, base64 解码
     */
    this.storage = {
      get: (key, options) => {
        /* {
          decode: base64 解码
          parse: json 解析
        } */
        var item = localStorage.getItem(key);
        var res = null;
        if (item) {
          if (options) {
            if (options.parse) {
              res = this.JSONparse(item);
            } else if (options.decode) {
              res = this.base64.decode(item);
            }
          } else {
            res = item;
          }
        }
        return res;
      },
      set: (key, val) => {
        var _val;

        try {
          _val = typeof val === 'object' ? JSON.stringify(val) : val;
        } catch (e) {
          _val = val;
        }
        window.localStorage.setItem(key, _val);
      }
    };

    /** 获取用户基本信息 */
    this.getLocalInfo = function (key) {
      return this.storage.get(key, { decode: true });
    };

    /** 防抖函数 */
    this.debounce = function (fn, delay = 500) {
      var timer = null;

      return function () {
        var _this = this, args = arguments;

        // timer === null && fn instanceof Function && fn.apply(_this, args); // 第一次执行，如果只按了一次，那么会触发两次，有优化空间
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
          fn instanceof Function && fn.apply(_this, args);
          timer = null; // 重置状态
        }, delay);
      }
    };

    /** 去重 */
    this.uniqueArr = function (arr = [], field) {
      var json = {};

      return arr.filter(item => {
        if (json[item[field]]) {
          return false;
        } else {
          json[item[field]] = 1;
          return true;
        }
      });
    };

    /** 在数组中查找 */
    // 没啥用 ES6 自带
    this.findIndexOfArr = function ({ arr = [], json = {}, field = '' }) {
      var idx = -1;

      for (var x = 0, l = arr.length; x < l; x++) {
        if (arr[x][field] === json[field]) {
          idx = x;
          break;
        }
      }
      return idx;
    };

    /** 强制刷新，利用 $timeout */
    this.forceRefresh = function ({ $scope, $timeout, keys = [] }) {
      if (!$scope) return console.error('$scope', '类型错误\n', $scope);
      if (!$timeout) return console.error('$timeout', '类型错误\n', $timeout);

      let tmpArr = [];

      keys.forEach(key => {
        tmpArr.push($scope[key]);
        if (typeof $scope[key] === 'string' || typeof $scope[key] === 'number') {
          $scope[key] = ''; // 数字和字符串直接置空
        } else if (Array.isArray($scope[key])) {
          $scope[key] = [];
        } else if (toString.call($scope[key]) === '[object Object]') {
          $scope[key] = {};
        }
      });

      $timeout(function () {
        keys.forEach((key, idx) => {
          if (tmpArr[idx]) {
            $scope[key] = tmpArr[idx];
          }
        });
      });
    };

    /*时间转换*/
    this.parseTime = (date, fmt = 'yyyy-MM-dd') => {
      if (!date) { return }
      const o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
  }]);
}