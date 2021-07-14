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

  new Vue({
    el: '#vue-search-filter',
    data: {
      isMore: false,
      // more按钮开关状态
      isShowMore: false,
      // 是否显示more按钮
      minNum: CJ_.getQueryVariable('startSellPrice') || '',
      maxNum: CJ_.getQueryVariable('endSellPrice') || '',
      checkedShipping: CJ_.getQueryVariable('addMarkStatus') === '1' ? true : false,
      queryObj: CJ_.paramsToObject(location.search) || {}
    },
    created: function created() {
      this.$nextTick(function () {
        var _document$querySelect;

        if (((_document$querySelect = document.querySelector('.keyword-box')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.clientHeight) > 60) {
          this.isShowMore = true;
        }
      });

      if (this.queryObj.id) {
        this.isMore = true;
      }
    },
    methods: {
      showMore: function showMore() {
        this.isMore = !this.isMore;
      },
      // 价格范围
      onInputMin: function onInputMin(e) {
        var _e$target$value$repla;

        this.minNum = e.target.value === '0' ? '0' : (_e$target$value$repla = e.target.value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^[0]*/, '').replace(/^\./, '0.').match(/^0\.([1-9]|\d[1-9])$|^[0-9]\d{0,8}\.\d{0,2}|^[1-9]\d{0,7}/g)) === null || _e$target$value$repla === void 0 ? void 0 : _e$target$value$repla[0];
      },
      onInputMax: function onInputMax(e) {
        var _e$target$value$repla2;

        this.maxNum = e.target.value === '0' ? '0' : (_e$target$value$repla2 = e.target.value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^[0]*/, '').replace(/^\./, '0.').match(/^0\.([1-9]|\d[1-9])$|^[0-9]\d{0,8}\.\d{0,2}|^[1-9]\d{0,7}/g)) === null || _e$target$value$repla2 === void 0 ? void 0 : _e$target$value$repla2[0];
      },
      clickPriceConfirm: function clickPriceConfirm() {
        if (parseFloat(this.minNum) > parseFloat(this.maxNum)) {
          layer.msg('Please enter the correct price format');
          return;
        }

        var abnormal = [null, undefined];

        if (abnormal.includes(this.minNum)) {
          this.minNum = '';
        }

        if (abnormal.includes(this.maxNum)) {
          this.maxNum = '';
        }

        location.href = "".concat(location.pathname, "?").concat(CJ_.objectToParams(_objectSpread2(_objectSpread2({}, CJ_.paramsToObject(location.search)), {}, {
          pageNum: 1,
          startSellPrice: this.minNum && parseFloat(this.minNum),
          endSellPrice: this.maxNum && parseFloat(this.maxNum)
        })));
      },
      // 包邮过滤
      onCheckboxShip: function onCheckboxShip() {
        // addMarkStatus 0-不包邮 1-包邮
        location.href = "".concat(location.pathname, "?").concat(CJ_.objectToParams(_objectSpread2(_objectSpread2({}, CJ_.paramsToObject(location.search)), {}, {
          pageNum: 1,
          addMarkStatus: this.checkedShipping ? 1 : ''
        })));
      }
    }
  });

})));

//# sourceMappingURL=maps/search-filter.js.map
