(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  /**
   * 分页组件 js
   */
  new Vue({
    el: '#vue-search-page',
    data: {
      pageData: {
        pageNum: 1,
        // 当前页
        pageSize: 60
      }
    },
    created: function created() {
      var query = CJ_.paramsToObject(window.location.search.substring(1));
      this.pageData = {
        pageNum: query.pageNum || 1,
        pageSize: query.pageSize || 60
      };
    },
    methods: {
      // 跳页
      changeFun: function changeFun(totalPage) {
        var pageNum = parseFloat(this.pageData.pageNum);

        if (pageNum > parseFloat(totalPage)) {
          this.pageData.pageNum = totalPage;
        }

        if (!pageNum) {
          this.pageData.pageNum = 1;
        }

        location.href = "".concat(location.pathname, "?").concat(CJ_.objectToParams(_objectSpread2(_objectSpread2({}, CJ_.paramsToObject(location.search)), this.pageData)));
      },
      onInput: function onInput(e) {
        var _e$target$value$match;

        this.pageData.pageNum = (_e$target$value$match = e.target.value.match(/^\d+$/g)) === null || _e$target$value$match === void 0 ? void 0 : _e$target$value$match[0];
      } // 分页size调整
      // changePageSize: function changePageSize() {
      //   const size = this.skipPageSize
      //   location.href = `${route}/1/${size}${location.search || ''}`
      // }

    }
  });

})));

//# sourceMappingURL=maps/search-page.js.map
