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
    el: '#vue-swiper-tab',
    data: {
      isPrev: false,
      isNext: true,
      rowNum: 5,
      pageNum: parseInt(CJ_.getQueryVariable('tabPageCur')) || 1,
      totalPage: 0,
      wrapperStyles: {},
      slideStyles: {
        width: '100%'
      }
    },
    created: function created() {
      this.totalPage = Math.ceil(document.querySelectorAll('#vue-swiper-tab .swiper-slide').length / this.rowNum);
      this.slideStyles = _objectSpread2(_objectSpread2({}, this.slideStyles), {}, {
        width: 100 / this.rowNum + '%'
      });

      if (this.totalPage === 1) {
        this.isPrev = false;
        this.isNext = false;
      }

      if (this.pageNum > 1) {
        this.isPrev = true;
      }

      if (this.pageNum === this.totalPage) {
        this.isNext = false;
      }

      this.$nextTick(function () {
        var transform = this.$refs.swiperContainerDom.clientWidth * (this.pageNum - 1);
        this.wrapperStyles = {
          transform: "translate3d(-".concat(transform, "px, 0, 0)"),
          transition: 'none'
        };
      });
    },
    methods: {
      // tab翻页
      onPrev: function onPrev() {
        if (this.pageNum > 1) {
          this.isNext = true;
          this.pageNum -= 1;
          var transform = this.$refs.swiperContainerDom.clientWidth * (this.pageNum - 1);
          this.wrapperStyles = {
            transform: "translate3d(-".concat(transform, "px, 0, 0)")
          };
        }

        if (this.pageNum === 1) {
          this.isPrev = false;
          this.isNext = true;
        }
      },
      onNext: function onNext() {
        var totalPage = this.totalPage;

        if (this.pageNum < totalPage) {
          this.isPrev = true;
          this.pageNum += 1;
          var transform = this.$refs.swiperContainerDom.clientWidth * (this.pageNum - 1);
          this.wrapperStyles = {
            transform: "translate3d(-".concat(transform, "px, 0, 0)")
          };
        }

        if (this.pageNum === totalPage) {
          this.isPrev = true;
          this.isNext = false;
        }
      }
    }
  });

})));

//# sourceMappingURL=maps/swiper-tab.js.map
