(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('i18next')) :
  typeof define === 'function' && define.amd ? define(['exports', 'i18next'], factory) :
  (global = global || self, factory(global.index = {}, global.i18next));
}(this, (function (exports, i18next) { 'use strict';

  i18next = i18next && Object.prototype.hasOwnProperty.call(i18next, 'default') ? i18next['default'] : i18next;

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var cjMessage = {
    loading: function loading() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$popupContainerDo = _ref.popupContainerDom,
          popupContainerDom = _ref$popupContainerDo === void 0 ? null : _ref$popupContainerDo,
          _ref$isFixed = _ref.isFixed,
          isFixed = _ref$isFixed === void 0 ? false : _ref$isFixed;

      var loading = new cjLoading({
        popupContainerDom: popupContainerDom,
        isFixed: isFixed
      }); // debugger

      loading.show();
      return {
        hide: function hide() {
          loading.close();
          loading.destory();
        }
      };
    }
  };
  var cjLoading = function cjLoading(_ref2) {
    var _ref2$popupContainerD = _ref2.popupContainerDom,
        popupContainerDom = _ref2$popupContainerD === void 0 ? null : _ref2$popupContainerD,
        _ref2$isFixed = _ref2.isFixed,
        isFixed = _ref2$isFixed === void 0 ? false : _ref2$isFixed,
        _ref2$config = _ref2.config,
        config = _ref2$config === void 0 ? {} : _ref2$config;
    var _config$width = config.width,
        width = _config$width === void 0 ? 64 : _config$width,
        _config$height = config.height,
        height = _config$height === void 0 ? 64 : _config$height,
        _config$zIndex = config.zIndex,
        zIndex = _config$zIndex === void 0 ? 999999 : _config$zIndex;
    this.popupContainerDom = popupContainerDom;
    this.isFixed = isFixed;
    this.loading = document.createElement("div");
    this.lot = lottie.loadAnimation({
      container: this.loading,
      setSpeed: 0.1,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/egg/image/cj_lottie.json"
    }); // loading元素样式

    this.loading.style.width = "".concat(width, "px");
    this.loading.style.height = "".concat(height, "px");
    this.loading.style.zIndex = zIndex;
    this.loading.style.margin = "auto";
    this.loading.style.position = "absolute";
    this.loading.style.top = "0";
    this.loading.style.left = "0";
    this.loading.style.bottom = "0";
    this.loading.style.right = "0"; // 蒙层元素样式

    this.wrapper = document.createElement("div");
    this.wrapper.style.top = "0";
    this.wrapper.style.left = "0";
    this.wrapper.style.bottom = "0";
    this.wrapper.style.right = "0";
    this.wrapper.style.display = "none";
    this.wrapper.style.zIndex = zIndex + 1;

    if (isFixed) {
      this.wrapper.style.position = "fixed";
      this.wrapper.appendChild(this.loading);
      document.body.appendChild(this.wrapper);
    } else if (popupContainerDom) {
      this.wrapper.style.position = "absolute";
      popupContainerDom.style.position = "relative";
      this.wrapper.appendChild(this.loading);
      popupContainerDom.appendChild(this.wrapper);
    } else {
      this.loading.style.display = "none";
      this.loading.style.position = "relative";
      document.body.appendChild(this.loading);
    }
  };

  cjLoading.prototype.show = function () {
    if (this.isFixed || this.popupContainerDom) {
      this.wrapper.style.display = "block";
    } else {
      this.loading.style.display = "block";
    }
  };

  cjLoading.prototype.close = function () {
    if (this.isFixed || this.popupContainerDom) {
      this.wrapper.style.display = "none";
    } else {
      this.loading.style.display = "none";
    }
  };

  cjLoading.prototype.destory = function () {
    this.lot && this.lot.destroy();
    this.loading && this.loading.remove();
    this.wrapper && this.wrapper.remove();
  };

  //
  var script = {
    name: 'load-bounce',
    props: ["loading", "isbg"],
    mounted() {
      const dom = this.$refs.loadingRef;
      this.msgLoaing = cjMessage.loading({ popupContainerDom: dom });
    },
    destroyed() {
      this.msgLoaing.hide();
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function (context) {
        style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  function createInjector(context) {
    return function (id, style) {
      return addStyle(id, style);
    };
  }

  var HEAD;
  var styles = {};

  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media) style.element.setAttribute('media', css.media);

        if (HEAD === undefined) {
          HEAD = document.head || document.getElementsByTagName('head')[0];
        }

        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  }

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "vue-load-bounce", class: { bg: _vm.isbg } },
      [
        _vm._t("default"),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.loading,
                expression: "loading"
              }
            ],
            staticClass: "vue-bounce-box"
          },
          [_c("div", { ref: "loadingRef", staticClass: "loading-ball" })]
        )
      ],
      2
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-273e7ff6_0", { source: "@keyframes sk-bounce {\n0%,\n  to {\n    transform: scale(0);\n}\n50% {\n    transform: scale(1);\n}\n}\n.vue-load-bounce {\n  height: 100%;\n  position: relative;\n}\n.vue-load-bounce.bg {\n  position: relative;\n}\n.vue-load-bounce.bg::after {\n  background-color: #fff;\n  content: '';\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n}\n.vue-bounce-box {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 64px;\n  height: 64px;\n  transform: translate(-50%, -50%);\n  z-index: 1;\n}\n.vue-bounce-box .loading-ball {\n  width: 64px;\n  height: 64px;\n}\n", map: {"version":3,"sources":["load-bounce.vue","D:\\project\\cj\\cj-web-egg\\public\\egg\\script\\vue\\load-bounce.vue"],"names":[],"mappings":"AAAA;AACE;;IAEE,mBAAmB;AACrB;AACA;IACE,mBAAmB;AACrB;AACF;AACA;EACE,YAAY;EACZ,kBAAkB;AACpB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,sBAAsB;EACtB,WAAW;EACX,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,OAAO;EACP,MAAM;AACR;AACA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;ECCX,WAAA;EACA,YAAA;EACA,gCAAA;EACA,UAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;AACA","file":"load-bounce.vue","sourcesContent":["@keyframes sk-bounce {\n  0%,\n  to {\n    transform: scale(0);\n  }\n  50% {\n    transform: scale(1);\n  }\n}\n.vue-load-bounce {\n  height: 100%;\n  position: relative;\n}\n.vue-load-bounce.bg {\n  position: relative;\n}\n.vue-load-bounce.bg::after {\n  background-color: #fff;\n  content: '';\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n}\n.vue-bounce-box {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 64px;\n  height: 64px;\n  transform: translate(-50%, -50%);\n  z-index: 1;\n}\n.vue-bounce-box .loading-ball {\n  width: 64px;\n  height: 64px;\n}\n","\r\n<template>\r\n  <div class=\"vue-load-bounce\" :class=\"{bg:isbg}\">\r\n    <slot />\r\n\r\n    <div class=\"vue-bounce-box\" v-show=\"loading\">\r\n      <div class=\"loading-ball\" ref=\"loadingRef\"></div>\r\n      <!-- <span class=\"vue-bounce-item1\"></span>\r\n      <span class=\"vue-bounce-item2\"></span> -->\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport { cjMessage } from '../cjTool/cjMessage';\r\nexport default {\r\n  name: 'load-bounce',\r\n  props: [\"loading\", \"isbg\"],\r\n  mounted() {\r\n    const dom = this.$refs.loadingRef;\r\n    this.msgLoaing = cjMessage.loading({ popupContainerDom: dom })\r\n  },\r\n  destroyed() {\r\n    this.msgLoaing.hide()\r\n  }\r\n};\r\n</script>\r\n\r\n<style lang=\"less\">\r\n@keyframes sk-bounce {\r\n  0%,\r\n  to {\r\n    transform: scale(0);\r\n  }\r\n  50% {\r\n    transform: scale(1);\r\n  }\r\n}\r\n.vue-load-bounce {\r\n  height: 100%;\r\n  position: relative;\r\n  &.bg {\r\n    position: relative;\r\n    &::after {\r\n      background-color: #fff;\r\n      content: '';\r\n      position: absolute;\r\n      width: 100%;\r\n      height: 100%;\r\n      left: 0;\r\n      top: 0;\r\n    }\r\n  }\r\n}\r\n.vue-bounce-box {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  width: 64px;\r\n  height: 64px;\r\n  transform: translate(-50%, -50%);\r\n  z-index: 1;\r\n  .loading-ball {\r\n    width: 64px;\r\n    height: 64px;\r\n  }\r\n}\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
  }

  var bind = function bind(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);

      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      return fn.apply(thisArg, args);
    };
  };

  /*global toString:true*/
  // utils is a library of generic helper functions non-specific to axios


  var toString = Object.prototype.toString;
  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Array, otherwise false
   */

  function isArray(val) {
    return toString.call(val) === '[object Array]';
  }
  /**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */


  function isUndefined(val) {
    return typeof val === 'undefined';
  }
  /**
   * Determine if a value is a Buffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Buffer, otherwise false
   */


  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
  }
  /**
   * Determine if a value is an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */


  function isArrayBuffer(val) {
    return toString.call(val) === '[object ArrayBuffer]';
  }
  /**
   * Determine if a value is a FormData
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */


  function isFormData(val) {
    return typeof FormData !== 'undefined' && val instanceof FormData;
  }
  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */


  function isArrayBufferView(val) {
    var result;

    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && val.buffer instanceof ArrayBuffer;
    }

    return result;
  }
  /**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */


  function isString(val) {
    return typeof val === 'string';
  }
  /**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */


  function isNumber(val) {
    return typeof val === 'number';
  }
  /**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */


  function isObject(val) {
    return val !== null && _typeof(val) === 'object';
  }
  /**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */


  function isDate(val) {
    return toString.call(val) === '[object Date]';
  }
  /**
   * Determine if a value is a File
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */


  function isFile(val) {
    return toString.call(val) === '[object File]';
  }
  /**
   * Determine if a value is a Blob
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Blob, otherwise false
   */


  function isBlob(val) {
    return toString.call(val) === '[object Blob]';
  }
  /**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */


  function isFunction(val) {
    return toString.call(val) === '[object Function]';
  }
  /**
   * Determine if a value is a Stream
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Stream, otherwise false
   */


  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }
  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */


  function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
  }
  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */


  function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
  }
  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   */


  function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
      return false;
    }

    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }
  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */


  function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    } // Force an array if not already something iterable


    if (_typeof(obj) !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */


  function merge()
  /* obj1, obj2, obj3, ... */
  {
    var result = {};

    function assignValue(val, key) {
      if (_typeof(result[key]) === 'object' && _typeof(val) === 'object') {
        result[key] = merge(result[key], val);
      } else {
        result[key] = val;
      }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }

    return result;
  }
  /**
   * Function equal to merge with the difference being that no reference
   * to original objects is kept.
   *
   * @see merge
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */


  function deepMerge()
  /* obj1, obj2, obj3, ... */
  {
    var result = {};

    function assignValue(val, key) {
      if (_typeof(result[key]) === 'object' && _typeof(val) === 'object') {
        result[key] = deepMerge(result[key], val);
      } else if (_typeof(val) === 'object') {
        result[key] = deepMerge({}, val);
      } else {
        result[key] = val;
      }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }

    return result;
  }
  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   * @return {Object} The resulting value of object a
   */


  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === 'function') {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }

  var utils = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    deepMerge: deepMerge,
    extend: extend,
    trim: trim
  };

  function encode(val) {
    return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
  }
  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */


  var buildURL = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }

    var serializedParams;

    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];
      utils.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === 'undefined') {
          return;
        }

        if (utils.isArray(val)) {
          key = key + '[]';
        } else {
          val = [val];
        }

        utils.forEach(val, function parseValue(v) {
          if (utils.isDate(v)) {
            v = v.toISOString();
          } else if (utils.isObject(v)) {
            v = JSON.stringify(v);
          }

          parts.push(encode(key) + '=' + encode(v));
        });
      });
      serializedParams = parts.join('&');
    }

    if (serializedParams) {
      var hashmarkIndex = url.indexOf('#');

      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }

      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
  };

  function InterceptorManager() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */


  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected
    });
    return this.handlers.length - 1;
  };
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   */


  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   */


  InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };

  var InterceptorManager_1 = InterceptorManager;

  /**
   * Transform the data for a request or a response
   *
   * @param {Object|String} data The data to be transformed
   * @param {Array} headers The headers for the request or response
   * @param {Array|Function} fns A single function or Array of functions
   * @returns {*} The resulting transformed data
   */


  var transformData = function transformData(data, headers, fns) {
    /*eslint no-param-reassign:0*/
    utils.forEach(fns, function transform(fn) {
      data = fn(data, headers);
    });
    return data;
  };

  var isCancel = function isCancel(value) {
    return !!(value && value.__CANCEL__);
  };

  var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
    utils.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };

  /**
   * Update an Error with the specified config, error code, and response.
   *
   * @param {Error} error The error to update.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The error.
   */

  var enhanceError = function enhanceError(error, config, code, request, response) {
    error.config = config;

    if (code) {
      error.code = code;
    }

    error.request = request;
    error.response = response;
    error.isAxiosError = true;

    error.toJSON = function () {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: this.config,
        code: this.code
      };
    };

    return error;
  };

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The created error.
   */


  var createError = function createError(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError(error, config, code, request, response);
  };

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   */


  var settle = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;

    if (!validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
    }
  };

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */

  var isAbsoluteURL = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  };

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   * @returns {string} The combined URL
   */

  var combineURLs = function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
  };

  /**
   * Creates a new URL by combining the baseURL with the requestedURL,
   * only when the requestedURL is not already an absolute URL.
   * If the requestURL is absolute, this function returns the requestedURL untouched.
   *
   * @param {string} baseURL The base URL
   * @param {string} requestedURL Absolute or relative URL to combine
   * @returns {string} The combined full path
   */


  var buildFullPath = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }

    return requestedURL;
  };

  // c.f. https://nodejs.org/api/http.html#http_message_headers


  var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} headers Headers needing to be parsed
   * @returns {Object} Headers parsed into an object
   */

  var parseHeaders = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;

    if (!headers) {
      return parsed;
    }

    utils.forEach(headers.split('\n'), function parser(line) {
      i = line.indexOf(':');
      key = utils.trim(line.substr(0, i)).toLowerCase();
      val = utils.trim(line.substr(i + 1));

      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }

        if (key === 'set-cookie') {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      }
    });
    return parsed;
  };

  var isURLSameOrigin = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;
    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */

    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);
    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */

    return function isURLSameOrigin(requestURL) {
      var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }() : // Non standard browser envs (web workers, react-native) lack needed support.
  function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  }();

  var cookies = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
  function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },
      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return match ? decodeURIComponent(match[3]) : null;
      },
      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  }() : // Non standard browser env (web workers, react-native) lack needed support.
  function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() {
        return null;
      },
      remove: function remove() {}
    };
  }();

  var xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;

      if (utils.isFormData(requestData)) {
        delete requestHeaders['Content-Type']; // Let the browser set it
      }

      var request = new XMLHttpRequest(); // HTTP basic authentication

      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password || '';
        requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
      }

      var fullPath = buildFullPath(config.baseURL, config.url);
      request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

      request.timeout = config.timeout; // Listen for ready state

      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        } // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request


        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        } // Prepare the response


        var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
        var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
        var response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config: config,
          request: request
        };
        settle(resolve, reject, response); // Clean up request

        request = null;
      }; // Handle browser request cancellation (as opposed to a manual cancellation)


      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }

        reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

        request = null;
      }; // Handle low level network errors


      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(createError('Network Error', config, null, request)); // Clean up request

        request = null;
      }; // Handle timeout


      request.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';

        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }

        reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request)); // Clean up request

        request = null;
      }; // Add xsrf header
      // This is only done if running in a standard browser environment.
      // Specifically not if we're in a web worker, or react-native.


      if (utils.isStandardBrowserEnv()) {
        var cookies$1 = cookies; // Add xsrf header

        var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies$1.read(config.xsrfCookieName) : undefined;

        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      } // Add headers to the request


      if ('setRequestHeader' in request) {
        utils.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
            // Remove Content-Type if data is undefined
            delete requestHeaders[key];
          } else {
            // Otherwise add header to the request
            request.setRequestHeader(key, val);
          }
        });
      } // Add withCredentials to request if needed


      if (!utils.isUndefined(config.withCredentials)) {
        request.withCredentials = !!config.withCredentials;
      } // Add responseType to request if needed


      if (config.responseType) {
        try {
          request.responseType = config.responseType;
        } catch (e) {
          // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
          // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
          if (config.responseType !== 'json') {
            throw e;
          }
        }
      } // Handle progress if needed


      if (typeof config.onDownloadProgress === 'function') {
        request.addEventListener('progress', config.onDownloadProgress);
      } // Not all browsers support upload events


      if (typeof config.onUploadProgress === 'function' && request.upload) {
        request.upload.addEventListener('progress', config.onUploadProgress);
      }

      if (config.cancelToken) {
        // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!request) {
            return;
          }

          request.abort();
          reject(cancel); // Clean up request

          request = null;
        });
      }

      if (requestData === undefined) {
        requestData = null;
      } // Send the request


      request.send(requestData);
    });
  };

  var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
      headers['Content-Type'] = value;
    }
  }

  function getDefaultAdapter() {
    var adapter;

    if (typeof XMLHttpRequest !== 'undefined') {
      // For browsers use XHR adapter
      adapter = xhr;
    } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
      // For node use HTTP adapter
      adapter = xhr;
    }

    return adapter;
  }

  var defaults = {
    adapter: getDefaultAdapter(),
    transformRequest: [function transformRequest(data, headers) {
      normalizeHeaderName(headers, 'Accept');
      normalizeHeaderName(headers, 'Content-Type');

      if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
        return data;
      }

      if (utils.isArrayBufferView(data)) {
        return data.buffer;
      }

      if (utils.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
        return data.toString();
      }

      if (utils.isObject(data)) {
        setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
        return JSON.stringify(data);
      }

      return data;
    }],
    transformResponse: [function transformResponse(data) {
      /*eslint no-param-reassign:0*/
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) {
          /* Ignore */
        }
      }

      return data;
    }],

    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };
  defaults.headers = {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  };
  utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
  });
  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
  });
  var defaults_1 = defaults;

  /**
   * Throws a `Cancel` if cancellation has been requested.
   */


  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
  }
  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   * @returns {Promise} The Promise to be fulfilled
   */


  var dispatchRequest = function dispatchRequest(config) {
    throwIfCancellationRequested(config); // Ensure headers exist

    config.headers = config.headers || {}; // Transform request data

    config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers

    config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
    utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
      delete config.headers[method];
    });
    var adapter = config.adapter || defaults_1.adapter;
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config); // Transform response data

      response.data = transformData(response.data, response.headers, config.transformResponse);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config); // Transform response data

        if (reason && reason.response) {
          reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
        }
      }

      return Promise.reject(reason);
    });
  };

  /**
   * Config-specific merge-function which creates a new config-object
   * by merging two configuration objects together.
   *
   * @param {Object} config1
   * @param {Object} config2
   * @returns {Object} New object resulting from merging config2 to config1
   */


  var mergeConfig = function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    var config = {};
    var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
    var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
    var defaultToConfig2Keys = ['baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath'];
    utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
      if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      }
    });
    utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
      if (utils.isObject(config2[prop])) {
        config[prop] = utils.deepMerge(config1[prop], config2[prop]);
      } else if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      } else if (utils.isObject(config1[prop])) {
        config[prop] = utils.deepMerge(config1[prop]);
      } else if (typeof config1[prop] !== 'undefined') {
        config[prop] = config1[prop];
      }
    });
    utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
      if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      } else if (typeof config1[prop] !== 'undefined') {
        config[prop] = config1[prop];
      }
    });
    var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys);
    var otherKeys = Object.keys(config2).filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });
    utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
      if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      } else if (typeof config1[prop] !== 'undefined') {
        config[prop] = config1[prop];
      }
    });
    return config;
  };

  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   */


  function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager_1(),
      response: new InterceptorManager_1()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */


  Axios.prototype.request = function request(config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof config === 'string') {
      config = arguments[1] || {};
      config.url = arguments[0];
    } else {
      config = config || {};
    }

    config = mergeConfig(this.defaults, config); // Set config.method

    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = 'get';
    } // Hook up interceptors middleware


    var chain = [dispatchRequest, undefined];
    var promise = Promise.resolve(config);
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  };

  Axios.prototype.getUri = function getUri(config) {
    config = mergeConfig(this.defaults, config);
    return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
  }; // Provide aliases for supported request methods


  utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function (url, config) {
      return this.request(utils.merge(config || {}, {
        method: method,
        url: url
      }));
    };
  });
  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function (url, data, config) {
      return this.request(utils.merge(config || {}, {
        method: method,
        url: url,
        data: data
      }));
    };
  });
  var Axios_1 = Axios;

  /**
   * A `Cancel` is an object that is thrown when an operation is canceled.
   *
   * @class
   * @param {string=} message The message.
   */

  function Cancel(message) {
    this.message = message;
  }

  Cancel.prototype.toString = function toString() {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
  };

  Cancel.prototype.__CANCEL__ = true;
  var Cancel_1 = Cancel;

  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @class
   * @param {Function} executor The executor function.
   */


  function CancelToken(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    var token = this;
    executor(function cancel(message) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new Cancel_1(message);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `Cancel` if cancellation has been requested.
   */


  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */


  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token: token,
      cancel: cancel
    };
  };

  var CancelToken_1 = CancelToken;

  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  var args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   * @returns {Function}
   */

  var spread = function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   * @return {Axios} A new instance of Axios
   */


  function createInstance(defaultConfig) {
    var context = new Axios_1(defaultConfig);
    var instance = bind(Axios_1.prototype.request, context); // Copy axios.prototype to instance

    utils.extend(instance, Axios_1.prototype, context); // Copy context to instance

    utils.extend(instance, context);
    return instance;
  } // Create the default instance to be exported


  var axios = createInstance(defaults_1); // Expose Axios class to allow class inheritance

  axios.Axios = Axios_1; // Factory for creating new instances

  axios.create = function create(instanceConfig) {
    return createInstance(mergeConfig(axios.defaults, instanceConfig));
  }; // Expose Cancel & CancelToken


  axios.Cancel = Cancel_1;
  axios.CancelToken = CancelToken_1;
  axios.isCancel = isCancel; // Expose all/spread

  axios.all = function all(promises) {
    return Promise.all(promises);
  };

  axios.spread = spread;
  var axios_1 = axios; // Allow use of default import syntax in TypeScript

  var _default = axios;
  axios_1["default"] = _default;

  var axios$1 = axios_1;

  /**
   *  base64.ts
   *
   *  Licensed under the BSD 3-Clause License.
   *    http://opensource.org/licenses/BSD-3-Clause
   *
   *  References:
   *    http://en.wikipedia.org/wiki/Base64
   *
   * @author Dan Kogai (https://github.com/dankogai)
   */
  var version = '3.6.0';
  /**
   * @deprecated use lowercase `version`.
   */

  var VERSION = version;

  var _hasatob = typeof atob === 'function';

  var _hasbtoa = typeof btoa === 'function';

  var _hasBuffer = typeof Buffer === 'function';

  var _TD = typeof TextDecoder === 'function' ? new TextDecoder() : undefined;

  var _TE = typeof TextEncoder === 'function' ? new TextEncoder() : undefined;

  var b64ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  var b64chs = _toConsumableArray(b64ch);

  var b64tab = function (a) {
    var tab = {};
    a.forEach(function (c, i) {
      return tab[c] = i;
    });
    return tab;
  }(b64chs);

  var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;

  var _fromCC = String.fromCharCode.bind(String);

  var _U8Afrom = typeof Uint8Array.from === 'function' ? Uint8Array.from.bind(Uint8Array) : function (it) {
    var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
      return x;
    };
    return new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
  };

  var _mkUriSafe = function _mkUriSafe(src) {
    return src.replace(/[+\/]/g, function (m0) {
      return m0 == '+' ? '-' : '_';
    }).replace(/=+$/m, '');
  };

  var _tidyB64 = function _tidyB64(s) {
    return s.replace(/[^A-Za-z0-9\+\/]/g, '');
  };
  /**
   * polyfill version of `btoa`
   */


  var btoaPolyfill = function btoaPolyfill(bin) {
    // console.log('polyfilled');
    var u32,
        c0,
        c1,
        c2,
        asc = '';
    var pad = bin.length % 3;

    for (var i = 0; i < bin.length;) {
      if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255) throw new TypeError('invalid character found');
      u32 = c0 << 16 | c1 << 8 | c2;
      asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
    }

    return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
  };
  /**
   * does what `window.btoa` of web browsers do.
   * @param {String} bin binary string
   * @returns {string} Base64-encoded string
   */


  var _btoa = _hasbtoa ? function (bin) {
    return btoa(bin);
  } : _hasBuffer ? function (bin) {
    return Buffer.from(bin, 'binary').toString('base64');
  } : btoaPolyfill;

  var _fromUint8Array = _hasBuffer ? function (u8a) {
    return Buffer.from(u8a).toString('base64');
  } : function (u8a) {
    // cf. https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string/12713326#12713326
    var maxargs = 0x1000;
    var strs = [];

    for (var i = 0, l = u8a.length; i < l; i += maxargs) {
      strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
    }

    return _btoa(strs.join(''));
  };
  /**
   * converts a Uint8Array to a Base64 string.
   * @param {boolean} [urlsafe] URL-and-filename-safe a la RFC4648 §5
   * @returns {string} Base64 string
   */


  var fromUint8Array = function fromUint8Array(u8a) {
    var urlsafe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
  }; // This trick is found broken https://github.com/dankogai/js-base64/issues/130
  // const utob = (src: string) => unescape(encodeURIComponent(src));
  // reverting good old fationed regexp


  var cb_utob = function cb_utob(c) {
    if (c.length < 2) {
      var cc = c.charCodeAt(0);
      return cc < 0x80 ? c : cc < 0x800 ? _fromCC(0xc0 | cc >>> 6) + _fromCC(0x80 | cc & 0x3f) : _fromCC(0xe0 | cc >>> 12 & 0x0f) + _fromCC(0x80 | cc >>> 6 & 0x3f) + _fromCC(0x80 | cc & 0x3f);
    } else {
      var cc = 0x10000 + (c.charCodeAt(0) - 0xD800) * 0x400 + (c.charCodeAt(1) - 0xDC00);
      return _fromCC(0xf0 | cc >>> 18 & 0x07) + _fromCC(0x80 | cc >>> 12 & 0x3f) + _fromCC(0x80 | cc >>> 6 & 0x3f) + _fromCC(0x80 | cc & 0x3f);
    }
  };

  var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
  /**
   * @deprecated should have been internal use only.
   * @param {string} src UTF-8 string
   * @returns {string} UTF-16 string
   */

  var utob = function utob(u) {
    return u.replace(re_utob, cb_utob);
  }; //


  var _encode = _hasBuffer ? function (s) {
    return Buffer.from(s, 'utf8').toString('base64');
  } : _TE ? function (s) {
    return _fromUint8Array(_TE.encode(s));
  } : function (s) {
    return _btoa(utob(s));
  };
  /**
   * converts a UTF-8-encoded string to a Base64 string.
   * @param {boolean} [urlsafe] if `true` make the result URL-safe
   * @returns {string} Base64 string
   */


  var encode$1 = function encode(src) {
    var urlsafe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
  };
  /**
   * converts a UTF-8-encoded string to URL-safe Base64 RFC4648 §5.
   * @returns {string} Base64 string
   */


  var encodeURI = function encodeURI(src) {
    return encode$1(src, true);
  }; // This trick is found broken https://github.com/dankogai/js-base64/issues/130
  // const btou = (src: string) => decodeURIComponent(escape(src));
  // reverting good old fationed regexp


  var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;

  var cb_btou = function cb_btou(cccc) {
    switch (cccc.length) {
      case 4:
        var cp = (0x07 & cccc.charCodeAt(0)) << 18 | (0x3f & cccc.charCodeAt(1)) << 12 | (0x3f & cccc.charCodeAt(2)) << 6 | 0x3f & cccc.charCodeAt(3),
            offset = cp - 0x10000;
        return _fromCC((offset >>> 10) + 0xD800) + _fromCC((offset & 0x3FF) + 0xDC00);

      case 3:
        return _fromCC((0x0f & cccc.charCodeAt(0)) << 12 | (0x3f & cccc.charCodeAt(1)) << 6 | 0x3f & cccc.charCodeAt(2));

      default:
        return _fromCC((0x1f & cccc.charCodeAt(0)) << 6 | 0x3f & cccc.charCodeAt(1));
    }
  };
  /**
   * @deprecated should have been internal use only.
   * @param {string} src UTF-16 string
   * @returns {string} UTF-8 string
   */


  var btou = function btou(b) {
    return b.replace(re_btou, cb_btou);
  };
  /**
   * polyfill version of `atob`
   */


  var atobPolyfill = function atobPolyfill(asc) {
    // console.log('polyfilled');
    asc = asc.replace(/\s+/g, '');
    if (!b64re.test(asc)) throw new TypeError('malformed base64.');
    asc += '=='.slice(2 - (asc.length & 3));
    var u24,
        bin = '',
        r1,
        r2;

    for (var i = 0; i < asc.length;) {
      u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
      bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
    }

    return bin;
  };
  /**
   * does what `window.atob` of web browsers do.
   * @param {String} asc Base64-encoded string
   * @returns {string} binary string
   */


  var _atob = _hasatob ? function (asc) {
    return atob(_tidyB64(asc));
  } : _hasBuffer ? function (asc) {
    return Buffer.from(asc, 'base64').toString('binary');
  } : atobPolyfill; //


  var _toUint8Array = _hasBuffer ? function (a) {
    return _U8Afrom(Buffer.from(a, 'base64'));
  } : function (a) {
    return _U8Afrom(_atob(a), function (c) {
      return c.charCodeAt(0);
    });
  };
  /**
   * converts a Base64 string to a Uint8Array.
   */


  var toUint8Array = function toUint8Array(a) {
    return _toUint8Array(_unURI(a));
  }; //


  var _decode = _hasBuffer ? function (a) {
    return Buffer.from(a, 'base64').toString('utf8');
  } : _TD ? function (a) {
    return _TD.decode(_toUint8Array(a));
  } : function (a) {
    return btou(_atob(a));
  };

  var _unURI = function _unURI(a) {
    return _tidyB64(a.replace(/[-_]/g, function (m0) {
      return m0 == '-' ? '+' : '/';
    }));
  };
  /**
   * converts a Base64 string to a UTF-8 string.
   * @param {String} src Base64 string.  Both normal and URL-safe are supported
   * @returns {string} UTF-8 string
   */


  var decode = function decode(src) {
    return _decode(_unURI(src));
  };
  /**
   * check if a value is a valid Base64 string
   * @param {String} src a value to check
    */


  var isValid = function isValid(src) {
    if (typeof src !== 'string') return false;
    var s = src.replace(/\s+/g, '').replace(/=+$/, '');
    return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
  }; //


  var _noEnum = function _noEnum(v) {
    return {
      value: v,
      enumerable: false,
      writable: true,
      configurable: true
    };
  };
  /**
   * extend String.prototype with relevant methods
   */


  var extendString = function extendString() {
    var _add = function _add(name, body) {
      return Object.defineProperty(String.prototype, name, _noEnum(body));
    };

    _add('fromBase64', function () {
      return decode(this);
    });

    _add('toBase64', function (urlsafe) {
      return encode$1(this, urlsafe);
    });

    _add('toBase64URI', function () {
      return encode$1(this, true);
    });

    _add('toBase64URL', function () {
      return encode$1(this, true);
    });

    _add('toUint8Array', function () {
      return toUint8Array(this);
    });
  };
  /**
   * extend Uint8Array.prototype with relevant methods
   */


  var extendUint8Array = function extendUint8Array() {
    var _add = function _add(name, body) {
      return Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
    };

    _add('toBase64', function (urlsafe) {
      return fromUint8Array(this, urlsafe);
    });

    _add('toBase64URI', function () {
      return fromUint8Array(this, true);
    });

    _add('toBase64URL', function () {
      return fromUint8Array(this, true);
    });
  };
  /**
   * extend Builtin prototypes with relevant methods
   */


  var extendBuiltins = function extendBuiltins() {
    extendString();
    extendUint8Array();
  };

  var gBase64 = {
    version: version,
    VERSION: VERSION,
    atob: _atob,
    atobPolyfill: atobPolyfill,
    btoa: _btoa,
    btoaPolyfill: btoaPolyfill,
    fromBase64: decode,
    toBase64: encode$1,
    encode: encode$1,
    encodeURI: encodeURI,
    encodeURL: encodeURI,
    utob: utob,
    btou: btou,
    decode: decode,
    isValid: isValid,
    fromUint8Array: fromUint8Array,
    toUint8Array: toUint8Array,
    extendString: extendString,
    extendUint8Array: extendUint8Array,
    extendBuiltins: extendBuiltins
  }; // makecjs:CUT //

  var base64 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    version: version,
    VERSION: VERSION,
    atob: _atob,
    atobPolyfill: atobPolyfill,
    btoa: _btoa,
    btoaPolyfill: btoaPolyfill,
    fromBase64: decode,
    toBase64: encode$1,
    utob: utob,
    encode: encode$1,
    encodeURI: encodeURI,
    encodeURL: encodeURI,
    btou: btou,
    decode: decode,
    isValid: isValid,
    fromUint8Array: fromUint8Array,
    toUint8Array: toUint8Array,
    extendString: extendString,
    extendUint8Array: extendUint8Array,
    extendBuiltins: extendBuiltins,
    Base64: gBase64
  });

  var NODE_ENV = 'development';
  var TIMESTAMP = '1626181466833';
  var BUILD_TIMESTAMP = '1626181466833';
  var env = {
    NODE_ENV: NODE_ENV,
    TIMESTAMP: TIMESTAMP,
    BUILD_TIMESTAMP: BUILD_TIMESTAMP
  };

  /**
   * cj-web 服务端、客户端通用配置
   */

  var NODE_ENV$1 = env.NODE_ENV;
  var environment = NODE_ENV$1;

  {
    // 开发环境，可以随便折腾 ^_^
    environment = 'test';
  }

  var apiConfig = {
    // 开发
    development: {
      "app": "https://app.cjdropshipping.cn/",
      "erp": "https://app.cjdropshipping.cn/",
      "cj": "https://newapp.cjdropshipping.cn/",
      "storage": "https://app.cjdropshipping.cn/",
      "tool": "https://app.cjdropshipping.cn/",
      "order": "https://app.cjdropshipping.cn/",
      "caigou": "https://app.cjdropshipping.cn/",
      "source": "https://app.cjdropshipping.cn/",
      "freight": "https://app.cjdropshipping.cn/",
      "cujiaLogisticsFreight": "https://app.cjdropshipping.cn/",
      "lazada": "https://app.cjdropshipping.cn/",
      "shopee": "https://app.cjdropshipping.cn/",
      "woo": "https://app.cjdropshipping.cn/",
      "ebay": "https://app.cjdropshipping.cn/",
      "authorize": "https://app.cjdropshipping.cn/",
      "newlogistics": "https://app.cjdropshipping.cn/",
      "_logistics_190606": "https://app.cjdropshipping.cn/",
      "_affiliate3_190606": "https://app.cjdropshipping.cn/",
      "listed_products": "https://app.cjdropshipping.cn/",
      "orderUsa": "https://app.cjdropshipping.cn/",
      "_chat_190606": "https://chat.cjdropshipping.cn/",
      "_phone_190606": "http://m.cjdropshipping.com/",
      "log_recod": "http://jhmjjx.cn:4000/",
      "storehouse": "https://app.cjdropshipping.cn/",
      "warehouseBuildWeb": "https://app.cjdropshipping.cn/",
      "storehousecj": "https://app.cjdropshipping.cn/",
      "media": "https://app.cjdropshipping.cn/",
      "erpSupplierSourceProduct": "https://app.cjdropshipping.cn/",
      "supplierPlanInfo": "https://app.cjdropshipping.cn/",
      "cjSupplier": "https://app.cjdropshipping.cn/",
      "message": "https://chat.cjdropshipping.cn/",
      "cjEvaluation": "https://app.cjdropshipping.cn/",
      "product": "https://app.cjdropshipping.cn/",
      "cujialog": "https://app.cjdropshipping.cn/",
      "supplier": "https://app.cjdropshipping.cn/",
      "comment": "https://app.cjdropshipping.cn/",
      "platform-shop": "https://app.cjdropshipping.cn/",
      "_elites_200812": "https://app.cjdropshipping.cn/",
      "collection": "https://app.cjdropshipping.cn/",
      "platform-product": "https://app.cjdropshipping.cn/",
      "messageCenterCj": "https://app.cjdropshipping.cn/",
      "product-api": "https://app.cjdropshipping.cn/",
      "elastic-api": "https://app.cjdropshipping.cn/",
      "freightService": "https://app.cjdropshipping.cn/",
      "push": "https://app.cjdropshipping.cn/",
      "operation": "https://app.cjdropshipping.cn/",
      "operationCenterApi": "https://app.cjdropshipping.cn/",
      "statistics": "https://app.cjdropshipping.cn/",
      "order-center": "https://app.cjdropshipping.cn/",
      "_cjpacket_210408": "https://logistics.cjdropshipping.com/",
      "early-warning-web": "http://master.backend-home-center.cj.com/",
      "product-integration-api": "https://app.cjdropshipping.cn/",
      "cj-logistics-rule": "https://app.cjdropshipping.cn/",
      "payment": "https://pay.cjdropshipping.com/" // 支付判断欧洲服务
      ,
      "wallet": "https://pay.cjdropshipping.com/" // 钱包
      // , "cujia-message": "https://message-center-api.cjdropshipping.com/" // 线上
      ,
      "cujia-message": "https://app.cjdropshipping.cn/" // 线上
      ,
      "messageCenterWeb": "https://app.cjdropshipping.cn/"
    },
    //测试
    test: {
      "app": "http://app.test.com/" //http://app.test.com
      ,
      "erp": "http://erp1.test.com/",
      "freightService": "http://192.168.5.149:8000/",
      "cujiaLogisticsFreight": "http://192.168.5.197:8058/",
      "storage": "http://app.test.com/",
      "tool": "http://tools.test.com/",
      "caigou": "http://caigou.test.com/",
      "order": "http://order.test.com/",
      "cj": "http://app1.test.com/" //app1.test.com
      ,
      "source": "http://sourcing.test.com/",
      "freight": "http://192.168.5.37:8001/",
      "authorize": "http://192.168.5.197:7610/",
      "ebay": "http://192.168.5.239:5901/" // 原
      ,
      "lazada": "http://192.168.5.239:8026/",
      "shopee": "http://192.168.5.212:8025/",
      "woo": "http://192.168.5.239:9903/" // 原
      ,
      "newlogistics": "http://logistics2.test.com/",
      "_logistics_190606": "http://dsp-logist.test.com/" //http://logistics.test.com/
      ,
      "_chat_190606": "http://chat.test.com/",
      "listed_products": "http://publish.test.com/",
      "_affiliate3_190606": "https://affiliate3.cjdropshipping.com/" //http://affiliate3.test.com/
      ,
      "_phone_190606": "http://m.test.com/",
      "storehousecj": "http://192.168.5.197:8002/",
      "warehouseBuildWeb": "http://192.168.5.197:8001/",
      "storehouse": "http://192.168.5.197:8009/",
      "warehouse": "http://192.168.5.197:8001/",
      "media": "http://192.168.5.197:8045/",
      "erpSupplierSourceProduct": "http://192.168.5.239:8077/",
      "supplierPlanInfo": "http://192.168.5.239:8092/",
      "cjSupplier": "http://192.168.5.239:8077/",
      "message": "http://chat.test.com/",
      "cjEvaluation": "http://cj-supplier-erp.cj-1.com/",
      "product": "http://192.168.5.197:7612/",
      "cujialog": "http://192.168.5.197:8831/",
      "supplier": "http://192.168.5.239:8092/",
      "comment": "http://192.168.5.197:7612/",
      "platform-shop": "http://192.168.5.197:7610/" // , "platform-shop": "http://192.168.5.103:3000/"
      ,
      "platform-product": "http://192.168.5.197:7612/",
      "_elites_200812": "http://192.168.5.37:8081/",
      "collection": "http://collection.test.com/",
      "messageCenterCj": "http://master.backend-cujia-message-center.cj.com/",
      "cujia-message": "http://master.backendcujiamessagecenter.cj.com/" // 测试服
      ,
      "product-api": "http://release.cjproductcenter.cj.com/",
      "elastic-api": "http://product-center.cj.com/",
      "push": "http://app.test.com/",
      "operation": "http://192.168.5.197:8058/cujiaLogisticsFreight/",
      "operationCenterApi": 'http://master.backend-cj-operation-center.cj.com/',
      "statistics": "http://192.168.5.197:8025/",
      "product-integration-api": "http://product-center.cj.com/",
      "order-center": 'http://master.backend-cj-order.cj.com/',
      "_cjpacket_210408": "https://logistics.cjdropshipping.com/",
      "early-warning-web": "http://master.backend-home-center.cj.com/",
      "cj-logistics-rule": "http://master.logistic.cj.com/",
      "payment": "https://payment.cjdropshipping.cn/" // 支付
      ,
      "wallet": "https://payment.cjdropshipping.cn/" // 钱包
      ,
      'messageCenterWeb': "http://master.backend-cujia-message-center.cj.com/"
    },
    testnew: {
      "app": "http://dsp-server.cj-1.com/",
      "erp": "http://cucheng-erp-web.cj-1.com/",
      "storage": "http://cucheng-storage-web.cj-1.com/",
      "freightService": "http://192.168.5.149:8000/",
      "cujiaLogisticsFreight": "http://192.168.5.197:8058/",
      "tool": "http://cucheng-tool-web.cj-1.com/",
      "caigou": "http://cucheng-procurement-web.cj-1.com/",
      "order": "http://cucheng-order-web.cj-1.com/",
      "cj": "http://cucheng-app-web.cj-1.com/" //app1.test.com
      ,
      "source": "http://cucheng-source-web.cj-1.com/",
      "freight": "http://transit-logistics.cj-1.com/",
      "authorize": "http://cujia-platform-web-authorize.cj-1.com/",
      "ebay": "http://eaby.cj-1.com/",
      "lazada": "http://lazada.cj-1.com/",
      "shopee": "http://shopee.cj-1.com/",
      "woo": "http://woocommerce.cj-1.com/",
      "newlogistics": "http://cucheng-logistics-web.cj-1.com/",
      "_logistics_190606": "http://dsp-logist.test.com/" //http://logistics.test.com/
      ,
      "_chat_190606": "http://chat.test.com/",
      "listed_products": "http://listed-products.cj-1.com/",
      "_affiliate3_190606": "https://affiliate3.cjdropshipping.com/" //http://affiliate3.test.com/
      ,
      "_phone_190606": "http://m-web.cj-1.com/",
      "storehousecj": "http://cujia-storehouse-cj-web.cj-1.com/",
      "warehouseBuildWeb": "http://cujia-storehouse-build-web.cj-1.com/",
      "storehouse": "http://cujia-storehouse-web.cj-1.com/",
      "warehouse": "http://cujia-storehouse-build-web.cj-1.com/",
      "media": "http://cujia-order-media-web.cj-1.com/",
      "erpSupplierSourceProduct": "http://cj-supplier-erp.cj-1.com/",
      "supplierPlanInfo": "http://cj-supplier-web.cj-1.com/",
      "cjSupplier": "http://cj-supplier-erp.cj-1.com/",
      "cjEvaluation": "http://cj-supplier-erp.cj-1.com/",
      "product": "http://cujia-platform-web-product.cj-1.com/",
      "cujialog": "http://192.168.5.197:8831/",
      "supplier": "http://192.168.5.239:8092/",
      "comment": "http://192.168.5.197:7612/",
      "platform-shop": "http://192.168.5.197:7610/",
      "_elites_200812": "http://192.168.5.37:8081/",
      "platform-product": "http://192.168.5.197:7612/",
      "collection": "http://collection.test.com/",
      "messageCenterCj": "http://master.backend-cujia-message-center.cj.com/",
      "product-api": "http://release.cjproductcenter.cj.com/",
      "elastic-api": "http://192.168.3.27:31451/",
      "operation": "http://192.168.5.197:8058/cujiaLogisticsFreight/",
      "operationCenterApi": 'http://master.backend-cj-operation-center.cj.com/',
      "statistics": "http://192.168.5.197:8025/",
      "product-integration-api": "http://product-center.cj.com/",
      "order-center": 'http://master.backend-cj-order.cj.com/',
      "_cjpacket_210408": "https://logistics.cjdropshipping.com/",
      "early-warning-web": "http://master.backend-home-center.cj.com/",
      "cujia-message": "http://master.backendcujiamessagecenter.cj.com/",
      "cj-logistics-rule": "http://master.logistic.cj.com/",
      "payment": "https://payment.cjdropshipping.cn/" // 支付
      ,
      "wallet": "https://payment.cjdropshipping.cn/" // 钱包
      ,
      'messageCenterWeb': "http://master.backend-cujia-message-center.cj.com/"
    },

    /** 线上环境 */
    production: {
      "app": "https://app.cjdropshipping.com/" // https://app.cjdropshipping.com/
      ,
      "erp": "https://erp1.cjdropshipping.com/",
      "cj": "https://app1.cjdropshipping.com/",
      "storage": "https://storage.cjdropshipping.com/",
      "tool": "https://tools.cjdropshipping.com/",
      "order": "https://order.cjdropshipping.com/",
      "caigou": "https://caigou.cjdropshipping.com/",
      "source": "https://sourcing.cjdropshipping.com/",
      "freight": "https://freight.cjdropshipping.com/",
      "cujiaLogisticsFreight": "https://app.cjdropshipping.com/",
      "authorize": "/",
      "lazada": "https://lazada.cjdropshipping.com/",
      "shopee": "https://shopee.cjdropshipping.com/",
      "woo": "https://woocommerce.cjdropshipping.com/",
      "ebay": "https://ebay.cjdropshipping.com/",
      "newlogistics": "https://logistics2.cjdropshipping.com/",
      "_logistics_190606": "https://erp.cjdropshipping.com/",
      "_chat_190606": "https://chat.cjdropshipping.com/",
      "listed_products": "https://publish.cjdropshipping.com/",
      "_affiliate3_190606": "https://affiliate3.cjdropshipping.com/",
      "_phone_190606": "http://m.cjdropshipping.com/",
      "log_recod": "http://jhmjjx.cn:4000/",
      "warehouse": "http://192.168.5.197:8001/",
      "orderUsa": "/",
      "storehouse": "/",
      "warehouseBuildWeb": "https://app.cjdropshipping.com/",
      "storehousecj": "/",
      "media": "/",
      "erpSupplierSourceProduct": "/",
      "supplierPlanInfo": "/",
      "cjSupplier": "/",
      "message": "https://chat.cjdropshipping.com/",
      "cjEvaluation": "/",
      "product": "/",
      "cujialog": "/",
      "supplier": "/",
      "comment": "/",
      "platform-shop": "/",
      "_elites_200812": "/",
      "collection": "/",
      "platform-product": "/",
      "messageCenterCj": "/",
      "product-api": "/",
      "elastic-api": "https://app.cjdropshipping.com/",
      "freightService": "/",
      "push": "/",
      "operation": "/",
      "operationCenterApi": '/',
      "statistics": "https://app.cjdropshipping.com/",
      "order-center": '/',
      "_cjpacket_210408": "https://logistics.cjdropshipping.com/",
      "product-integration-api": "/",
      "early-warning-web": "/",
      "cj-logistics-rule": "/",
      "payment": "https://pay.cjdropshipping.com/" // 支付
      ,
      "wallet": "https://pay.cjdropshipping.com/" // 钱包
      // , "cujia-message": "https://message-center-api.cjdropshipping.com/" // 线上
      ,
      "cujia-message": "/" // 线上
      ,
      'messageCenterWeb': "/"
    },

    /** 线上环境-国内代理 */
    "production-cn": {
      "app": "https://app.cjdropshipping.cn/",
      "erp": "/",
      "cj": "https://newapp.cjdropshipping.cn/",
      "storage": "/",
      "tool": "/",
      "order": "/",
      "caigou": "/",
      "source": "/",
      "freight": "/",
      "cujiaLogisticsFreight": "/",
      "lazada": "/",
      "shopee": "/",
      "woo": "/",
      "ebay": "/",
      "authorize": "/",
      "newlogistics": "/",
      "_logistics_190606": "/",
      "_affiliate3_190606": "/",
      "listed_products": "/",
      "orderUsa": "/",
      "_chat_190606": "https://chat.cjdropshipping.cn/",
      "_phone_190606": "http://m.cjdropshipping.com/",
      "log_recod": "http://jhmjjx.cn:4000/",
      "storehouse": "/",
      "warehouseBuildWeb": "https://app.cjdropshipping.cn/",
      "storehousecj": "/",
      "media": "/",
      "erpSupplierSourceProduct": "/",
      "supplierPlanInfo": "/",
      "cjSupplier": "/",
      "message": "https://chat.cjdropshipping.cn/",
      "cjEvaluation": "/",
      "product": "/",
      "cujialog": "/",
      "supplier": "/",
      "comment": "/",
      "platform-shop": "/",
      "_elites_200812": "/",
      "collection": "/",
      "platform-product": "/",
      "messageCenterCj": "/",
      "product-api": "/",
      "elastic-api": "https://app.cjdropshipping.cn/",
      "freightService": "/",
      "push": "/",
      "operation": "/",
      "operationCenterApi": '/',
      "statistics": "https://app.cjdropshipping.cn/",
      "order-center": '/',
      "_cjpacket_210408": "https://logistics.cjdropshipping.com/",
      "product-integration-api": "/",
      "cj-logistics-rule": "/",
      "early-warning-web": "/",
      "payment": "https://pay.cjdropshipping.com/" // 支付判断欧洲服务
      ,
      "wallet": "https://pay.cjdropshipping.com/" // 钱包
      // , "cujia-message": "https://message-center-api.cjdropshipping.com/" // 线上
      ,
      "cujia-message": "/" // 线上
      ,
      'messageCenterWeb': "/"
    },
    // 线上node服务端 api服务配置
    "production-node": {
      "app": "http://app-server.cj.com/" // https://app.cjdropshipping.com/
      ,
      "cj": "http://cucheng-app-web.cj.com/",
      "elastic-api": "http://cj-elastic-search-rest-api.cj.com/",
      "warehouseBuildWeb": "http://cujia-storehouse-build-web.cj.com/",
      "product-api": "http://cj-product-center-rest-api.cj.usa/",
      "statistics": "http://cj-about.cj.usa/"
    }
  };
  apiConfig.development = apiConfig[environment];
  var config = {
    api: apiConfig,
    // 默认币种
    currency: {
      symbol: "$",
      currency: "USD",
      NAME: "美元",
      rate: "1"
    },
    // 人工翻译的语种
    languages: ['zh', 'en', 'de', 'fr', 'id', 'th']
  };

  var require$$0 = getCjsExportFromNamespace(base64);

  /**
   * cj-web 服务端、客户端通用 utils
   */

  var Base64 = require$$0.Base64;
  var NODE_ENV$2 = env.NODE_ENV; // const environment = this === window ? 'browser' : 'node';

  var isServer = typeof window === 'undefined';
  var isNodeProd = isServer && ( NODE_ENV$2 === 'production') ? true : false;

  function resDataProcess(data) {
    var _data = data;

    try {
      if (typeof data.result === 'string') {
        _data.result = JSON.parse(data.result);
      }
    } catch (e) {}

    return _data;
  }
  /** axios 实例 */


  function axiosEnhance(axios) {
    /**
     * url    接口地址
     * opts   body 体、或请求监听
     * listen 请求监听
     */
    return function _axiosFn(url, opts, listen) {
      if (!url) return;

      if (opts instanceof Function) {
        // 可变参处理
        _axiosFn(url, undefined, opts);

        return;
      }

      var cb = listen instanceof Function ? listen : function () {};
      return new Promise(function (resolve) {
        cb(true);
        var data = opts ? {
          data: opts
        } : undefined;

        var thenFn = function thenFn(res) {
          cb(false);
          resolve(res);
        };

        axios(url, data).then(thenFn);
      });
    };
  }
  /** 处理 statusCode: "200" */


  function statusCode200(data) {
    var errormsg = 'api request error!';

    if (!data) {
      return [errormsg];
    }

    if (data.success) {
      return [null, data.data];
    }

    return +data.statusCode === 200 ? [null, data.result] : [data.message || errormsg];
  }

  var Axios$1 = /*#__PURE__*/function () {
    function Axios(options) {
      _classCallCheck(this, Axios);

      // constructor 中 return 对象类型可以修改 new 实例
      // 可以实现方法的私有化
      // return 原始值类型不可以修改 new 实例
      return this.create(options);
    }

    _createClass(Axios, [{
      key: "create",
      value: function create() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var instance = axios$1.create(_objectSpread2({}, options));
        this.interceptorsReq(instance);
        this.interceptorsRes(instance);
        return instance;
      } // 请求之前干点儿啥

    }, {
      key: "interceptorsReq",
      value: function interceptorsReq(instance) {
        instance.interceptors.request.use(function (config) {
          var opt = {
            url: isNodeProd ? getDomainByUrlSsr(config.url) : getDomainByUrl(config.url)
          }; // console.log('请求前参数', config)

          return _objectSpread2(_objectSpread2({}, config), opt);
        }, function (error) {
          // console.log("接口请求error:",error)
          if (!isServer) {
            new Image().src = "/api/addRequestErrLog?errorInfo=".concat(error, "&apiurl=").concat(error.config.url);
          }

          return [error];
        });
      } // 请求之后干点儿啥

    }, {
      key: "interceptorsRes",
      value: function interceptorsRes(instance) {
        instance.interceptors.response.use(function (response) {
          // console.log("接口响应error:",response);
          return [null, resDataProcess(response.data)];
        }, function (error) {
          // console.log("接口响应error:",error.config.url)
          if (!isServer) {
            new Image().src = "/api/addRequestErrLog?errorInfo=".concat(error, "&apiurl=").concat(error.config.url);
          }

          return [error];
        });
      }
    }]);

    return Axios;
  }();
  var ajax = axios$1.create({
    //withCredentials: true,
    headers: {
      Accept: 'application/json;charset=utf-8',
      token: typeof window == 'undefined' ? '' : Base64.decode(localStorage.getItem('token') || '')
    }
  });
  ajax.interceptors.request.use(function (config) {
    config.params && (config.params['_'] = +new Date());
    config.url && (config.url = isNodeProd ? getDomainByUrlSsr(config.url) : getDomainByUrl(config.url));
    return config;
  }, function (error) {
    if (!isServer) {
      new Image().src = "/api/addRequestErrLog?errorInfo=".concat(error, "&apiurl=").concat(error.config.url);
    }

    return Promise.reject(error);
  });
  ajax.interceptors.response.use(function (response) {
    if (response.status === 200) {
      var data = response.data; // 处理可能为null的data, 避免结构时出错

      if (data.data === null) data.data = {};
      return [null, resDataProcess(data)];
    }

    return response;
  }, function (error) {
    // Do something with response error
    if (!isServer) {
      new Image().src = "/api/addRequestErrLog?errorInfo=".concat(error, "&apiurl=").concat(error.config.url);
    }

    return [error];
  });
  /** url 匹配处理 */

  function getDomainByUrl() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (!url) {
      return url;
    }

    if (url.startsWith('http')) {
      return url;
    }

    var urlStart = url.split('/')[0];

    if (urlStart == 'pojo' || urlStart == 'app') {
      urlStart = 'app';
    }

    for (var k in config.api[NODE_ENV$2]) {
      if (k == urlStart) {
        return config.api[NODE_ENV$2][k] + url;
      }
    }
  }
  /** url 匹配处理 ssr端使用 */


  function getDomainByUrlSsr() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (!url) {
      return url;
    }

    if (url.startsWith('http')) {
      return url;
    }

    var urlStart = url.split('/')[0];

    if (urlStart == 'pojo' || urlStart == 'app') {
      urlStart = 'app';
    }

    for (var k in config.api['production-node']) {
      if (k == urlStart) {
        return config.api['production-node'][k] + url;
      }
    }
  }
  /** 安全的 JSONparse */


  function JSONparse(jsonStr) {
    var res = [];

    try {
      res[0] = null;
      res[1] = JSON.parse(jsonStr);
    } catch (e) {
      res[0] = e;
    } finally {
      return res;
    }
  }
  /** base64 操作 */


  var $base64 = _objectSpread2(_objectSpread2({}, Base64), {}, {
    decode: function decode() {
      var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var r = str;

      try {
        r = Base64.decode(str);
      } catch (e) {
        console.warn('[base64.decode 报错]', str, '\n', e.stack);
      } finally {
        return r;
      }
    },
    encode: function encode() {
      var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var r = str;

      try {
        r = Base64.encode(str);
      } catch (e) {
        console.warn('[base64.encode 报错]', str, '\n', e.stack);
      } finally {
        return r;
      }
    }
  });
  /**
   * 考虑编码及体量控制，自定义 cookie 解析
   * 适用格式 a=1;b=2;c=3
   */


  function cookieParser(cookie) {
    var r = null;

    if (!cookie) {
      return null;
    }

    if (!/\w+=\w+/.test(cookie)) {
      return null;
    }

    try {
      var tmp = decodeURIComponent(cookie);
      var arr = tmp.split(';');
      var obj = {};
      arr.forEach(function (_) {
        var t = _.split('=');

        obj[t[0]] = t[1];
      });
      r = obj;
    } finally {
      return r;
    }
  }
  /**
   * joson 拼装成 cookie 字符串
   * @param {JSON} cookie 
   */


  function cookieGenerator() {
    var cookie = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var arr = Object.keys(cookie).filter(function (k) {
      return cookie[k];
    }).map(function (k) {
      var v = cookie[k];
      return "".concat(k, "=").concat(v);
    });
    return arr.join(';');
  }

  function getDomainByUrlKey() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return config.api[NODE_ENV$2][url] || '';
  }
  /**
   * 获取客户端ip
   * @param {request} req 请求头
   */


  function getClientIP(ctx) {
    return ctx.request.ip;
  }

  function getClientInfoByIp(_x) {
    return _getClientInfoByIp.apply(this, arguments);
  }

  function _getClientInfoByIp() {
    _getClientInfoByIp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ip) {
      var res, _ref, data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.race([axios$1.get("https://api.ip.sb/geoip/".concat(ip)), new Promise(function (resolve, reject) {
                setTimeout(function () {
                  console.log('获取ip超时');
                  resolve({});
                }, 2000);
              })])["catch"](function (err) {});

            case 2:
              res = _context.sent;
              _ref = res || {}, data = _ref.data;
              return _context.abrupt("return", data || {});

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _getClientInfoByIp.apply(this, arguments);
  }

  function getLngByCountry(country) {
    return {
      // 中国
      'China': 'zh',
      // 美国
      'United States': 'en',
      // 法国
      'France': 'fr',
      // 德国
      'Germany': 'de',
      // 印尼
      'Indonesia': 'id',
      // 泰国
      'Thailand': 'th'
    }[country];
  }

  function getTransWarehouse(lng) {
    return ajax({
      method: 'post',
      url: 'cj/homePage/getWareHouseWorldsByLanguage',
      headers: {
        language: lng
      }
    });
  }

  function transWarehouse(target) {
    var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var map = arr.reduce(function (obj, cur) {
      var en = cur.en;

      if (!obj[en]) {
        obj[en] = cur['value'];
      }

      return obj;
    }, {});
    target.forEach(function (v) {
      v.areaVal = map[v.areaEn] || v.areaEn;
    });
    return target;
  }

  function getTopDomain() {
    var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : location.hostname;
    var ip_pattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/; // 匹配ip

    if (ip_pattern.test(host)) {
      return host;
    }

    var tmp = host.split('.');
    var domain = '';

    if (tmp.length > 1) {
      var last = tmp.length - 1;
      domain = "".concat(tmp[last - 1], ".").concat(tmp[last]);
    } else {
      domain = host;
    }

    return domain === 'localhost' ? domain : ".".concat(domain);
  }
  /** 去重 */


  function uniqueArr() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var field = arguments.length > 1 ? arguments[1] : undefined;
    var json = {};
    return arr.filter(function (item) {
      if (json[item[field]]) {
        return false;
      } else {
        json[item[field]] = 1;
        return true;
      }
    });
  } // 将对象转化为URL参数


  function objectToParams(paramObj) {
    var sdata = [];

    for (var attr in paramObj) {
      sdata.push("".concat(attr, "=").concat(encodeURIComponent(paramObj[attr])));
    }

    return sdata.join('&');
  }

  function paramsToObject(paramObj) {
    var searchParams;

    if (!paramObj) {
      return {};
    }

    if (paramObj.includes('?')) {
      searchParams = paramObj.split('?')[1].split('&');
    } else {
      searchParams = paramObj.split('?')[0].split('&');
    }

    var result = {};
    searchParams.forEach(function (item) {
      var pair = item.split("=");
      result[pair[0]] = decodeURIComponent(pair[1]);
    });
    return result;
  }
  /**
   * 判断变量是否为无效的空值
   * @param {any} param 
   * @returns {boolean}
   */


  function isEmpty(param) {
    if (param === 0) {
      return false;
    }

    if (param) {
      if (_typeof(param) === 'object') {
        return JSON.stringify(param) === '[]' || JSON.stringify(param) === '{}';
      }

      return false;
    }

    return true;
  }
  /**
   * 当前浏览器是否支持webp格式, node默认返回false
   * @returns boolean
   */


  function isSupportWebp() {
    if (typeof window === 'undefined') return false;

    try {
      return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
    } catch (err) {
      return false;
    }
  }
  var utils$1 = {
    $base64: $base64,
    Axios: Axios$1,
    axiosEnhance: axiosEnhance,
    ajax: ajax,
    getDomainByUrl: getDomainByUrl,
    JSONparse: JSONparse,
    statusCode200: statusCode200,
    cookieParser: cookieParser,
    cookieGenerator: cookieGenerator,
    getDomainByUrlKey: getDomainByUrlKey,
    getClientIP: getClientIP,
    getClientInfoByIp: getClientInfoByIp,
    getLngByCountry: getLngByCountry,
    NODE_ENV: NODE_ENV$2,
    getTransWarehouse: getTransWarehouse,
    transWarehouse: transWarehouse,
    getTopDomain: getTopDomain,
    uniqueArr: uniqueArr,
    objectToParams: objectToParams,
    paramsToObject: paramsToObject,
    isEmpty: isEmpty,
    isSupportWebp: isSupportWebp
  };
  var utils_4 = utils$1.ajax;

  var filter = createCommonjsModule(function (module, exports) {
    // category 类目链接处理
    exports.CATEGORY_LINK = function (cate, arr) {
      var cateName = arr.map(function (item) {
        return {
          id: item.id,
          name: item.nameEn
        };
      });
      cateName = utils$1.$base64.encode(JSON.stringify(cateName));
      var currentCate = arr[arr.length - 1]; // 当前类

      return "list-detail?id=".concat(currentCate.id, "&name=").concat(cateName, "&from=all&fromType=all");
    }; // 价格处理


    exports.GET_PRICE = function (prod) {
      if (_typeof(prod) !== 'object') {
        return '--';
      }

      var handle = function handle(price) {
        return typeof price === 'string' ? price.replace(' -- ', '-') : price;
      };

      var price = handle(prod.price || prod.sellPrice || prod.SELLPRICE || prod.sellprice);
      return price ? price : '--';
    }; // 折扣价处理


    exports.NOW_PRICE = function (price) {
      var priceNew = typeof price === 'string' ? price.replace(' -- ', '-').replace('--', '-') : price;
      return priceNew ? priceNew : '--';
    }; // 首字母大写


    exports.INIT_UPPERCASE = function (str) {
      if (!str) {
        return str;
      }

      return str.substr(0, 1).toUpperCase() + str.substr(1);
    }; // 阿里云图片大小处理


    exports.IMG_SIZE = function (url) {
      // url, w, h
      if (typeof url !== 'string' || url.indexOf('aliyuncs.com') === -1) return url;
      var webpT = 'image/format,webp,';
      var json = {},
          size = 200,
          str = "".concat(url, "?x-oss-process=").concat(utils$1.isSupportWebp() ? webpT : '', "image/resize,m_fill");
      if ((arguments.length <= 1 ? 0 : arguments.length - 1) === 1) json = {
        w: arguments.length <= 1 ? undefined : arguments[1]
      };else if ((arguments.length <= 1 ? 0 : arguments.length - 1) === 2) json = {
        w: arguments.length <= 1 ? undefined : arguments[1],
        h: arguments.length <= 2 ? undefined : arguments[2]
      };else {
        json = {
          w: size,
          h: size
        };
      }

      for (var k in json) {
        str += ",".concat(k, "_").concat(json[k]);
      }

      return exports.HTTPS_PREFIX(str);
    }; // 圖片切割


    exports.IMG_SPLIT = function (url) {
      // 'url1,url2,url3'
      if (typeof url !== 'string') return url;

      try {
        return url.split(',')[0];
      } catch (e) {
        console.warn(e);
        return url;
      }
    };
    /**
     * 汇率转换
     * 用法同之前的 angular.js ^_^
     */


    exports.EXCHANGE_RATE = function (price, arg0, isUnit) {
      if (typeof window === 'undefined') {
        // 服务端(可以通过cookie实现，比较繁琐，暂时不管)
        return "$".concat(price);
      } // 处理垃圾后台的脏数据


      var priceProcessor = function priceProcessor(price) {
        return typeof price === 'string' ? price.replace(' -- ', '-') : price;
      };

      var tmp = CJ_.$cookie.get('currency');
      var currency = tmp ? CJ_.cookieParser(tmp) : CJ_.config.currency;
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
      var unit = '';

      if (/(number|float)(:\d)?/.test(arg0)) {
        var arr = arg0.split(':');

        if (/\d/.test(arr[arr.length - 1])) {
          floatLen = arr[arr.length - 1];
        }
      }

      if (!rate || !price) return price;

      try {
        if (/-/.test(_price)) {
          var arr1 = _price.split('-').map(function (p) {
            return (p * rate).toFixed(floatLen);
          });

          _price = arr1.join('-');
        } else {
          _price = (_price * rate).toFixed(floatLen); // 保留两位小数点
        }

        if (isUnit) {
          var len = (parseInt(_price) + '').length;

          if (len >= 7 && len < 9) {
            _price = parseFloat((_price / 1000000).toString().match(/^\d+(?:\.\d{0,1})?/)) + '';
            unit = 'M';
          } else if (len >= 9) {
            _price = parseFloat((_price / 1000000000).toString().match(/^\d+(?:\.\d{0,1})?/)) + '';
            unit = 'B';
          }
        } // ---- 19-10-19 加入千分号 ----


        _price = _price.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // -----------------------------
      } catch (e) {
        console.warn('汇率转换报错\n', e, '\n', price);
        return '--';
      }

      if (/NaN/.test(_price)) {
        console.warn('NaN 价格 ->', price);
      } // return `${symbol}${/NaN/.test(_price) ? '--' : _price}`;


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
    }; // https 前缀


    exports.HTTPS_PREFIX = function (url) {
      var str = url;

      try {
        if (!str.startsWith('https')) {
          var suffix = str.replace(/^http:\/\//, '');
          str = "https://".concat(suffix);
        }
      } finally {
        return str;
      }
    }; // 时间戳转日期格式


    exports.dateFormat = function (time) {
      var d = new Date(time);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
      var hour = d.getHours();
      var minutes = d.getMinutes();
      var seconds = d.getSeconds();
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    }; // hot类别链接处理


    exports.HOTCATEGORY_LINK = function (cateCur, cateArr) {
      var arr = [];

      function isArray(arr) {
        return arr && arr instanceof Array;
      }

      cateArr.forEach(function (o, i) {
        if (o.nameEn == cateCur.name) {
          arr.push({
            id: o.id,
            name: o.nameEn
          });
        } else {
          if (isArray(o.children)) {
            o.children.forEach(function (k, j) {
              if (k.nameEn == cateCur.name) {
                arr.push({
                  id: o.id,
                  name: o.nameEn
                }, {
                  id: k.id,
                  name: k.nameEn
                });
              } else {
                if (isArray(k.children)) {
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
      var cName = utils$1.$base64.encode(JSON.stringify(arr));
      return "list-detail?id=".concat(cateCur.id, "&name=").concat(cName, "&from=all&fromType=all");
    }; // 商品详情链接处理


    exports.GOODSDETAIL_LINK = function (item) {
      var url = '';

      if (item) {
        var id = item && item.productId;
        url = item.flag == '1' ? '/product-detail.html?id=' + id + '&from=all&fromType=&productType=' + (item.productType || 0) : '/reptail-detail.html?id=' + id;
      }

      return url;
    }; // 搜索关键字类目链接


    exports.SEARCHKEYWORD_LINK = function (item, queryObj, idx) {
      var url = '';
      var name = queryObj.name ? JSON.parse(utils$1.$base64.decode(queryObj.name)).slice(0, idx + 1) : [{
        id: '',
        nameEn: 'All Categories'
      }];

      if (item) {
        url = "/list-detail?".concat(utils$1.objectToParams(_objectSpread2(_objectSpread2({}, queryObj), {}, {
          id: item.id || '',
          name: utils$1.$base64.encode(JSON.stringify(name))
        })));
      }

      return url;
    }; // 搜索关键字类目下拉链接


    exports.SEARCHKEYWORD_SUB_LINK = function (item, queryObj, idx) {
      var url = '';
      var name = queryObj.name ? JSON.parse(utils$1.$base64.decode(queryObj.name)) : [{
        id: '',
        nameEn: 'All Categories'
      }];

      if (!name[0].id) {
        // 判断id是undefined，将All Categories替换为一级目录
        name = [{
          id: item.id,
          nameEn: item.nameEn || item.name
        }];
      } else {
        name.push({
          id: item.id,
          nameEn: item.nameEn || item.name
        });
      }

      if (item) {
        url = "/list-detail?".concat(utils$1.objectToParams(_objectSpread2(_objectSpread2({}, queryObj), {}, {
          id: item.id || '',
          name: utils$1.$base64.encode(JSON.stringify(name))
        })));
      }

      return url;
    }; // 搜索sort链接


    exports.SEARCHSORT_LINK = function (item, queryObj) {
      var url = '';
      url = "/list-detail?".concat(utils$1.objectToParams(_objectSpread2(_objectSpread2({}, queryObj), item)));
      return url;
    }; // 标题高亮


    exports.KEYWORDS_COLOR_FUL = function (str, keys) {
      if (keys && Array.isArray(keys)) {
        var newstr = str.replace('<', '&lt;').replace('>', '&gt;');

        for (var i = 0; i < keys.length; i++) {
          var reg = new RegExp("(" + keys[i] + ")", "gi");
          newstr = newstr && newstr.replace(reg, "<span style='color:#FF7700;'>$1</span>");
        }

        return newstr;
      }

      return str;
    }; // 提取文字


    exports.SIMPLE_TEXT = function (html) {
      var re1 = new RegExp("<.+?>", "g"); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容

      var msg = html && html.replace(re1, ''); //执行替换成空字符

      return msg;
    }; // 创建链接地址


    exports._createLink = function (item) {
      // var url = 'javascript:void(0);reture false;';
      var url = 'href=javascript:void(0);';
      var obj = item;

      if (obj.urlOrSku) {
        // skipType跳转类型(1.不跳转,2.网页跳转3.商品详情跳转)
        if (obj.skipType == '3') {
          //商品详情页
          url = "/product-detail.html?id=".concat(obj.pid, "&from=all&fromType=all&productType=0");
        } else if (obj.skipType == '2') {
          url = obj.urlOrSku;
        } else if (obj.skipType == '1') {
          return "href=javascript:void(0);";
        }

        return "href=".concat(url, " target=\"_blank");
      }

      return url;
    };
  });
  var filter_1 = filter.CATEGORY_LINK;
  var filter_2 = filter.GET_PRICE;
  var filter_3 = filter.NOW_PRICE;
  var filter_4 = filter.INIT_UPPERCASE;
  var filter_5 = filter.IMG_SIZE;
  var filter_6 = filter.IMG_SPLIT;
  var filter_7 = filter.EXCHANGE_RATE;
  var filter_8 = filter.HTTPS_PREFIX;
  var filter_9 = filter.dateFormat;
  var filter_10 = filter.HOTCATEGORY_LINK;
  var filter_11 = filter.GOODSDETAIL_LINK;
  var filter_12 = filter.SEARCHKEYWORD_LINK;
  var filter_13 = filter.SEARCHKEYWORD_SUB_LINK;
  var filter_14 = filter.SEARCHSORT_LINK;
  var filter_15 = filter.KEYWORDS_COLOR_FUL;
  var filter_16 = filter.SIMPLE_TEXT;
  var filter_17 = filter._createLink;

  new Vue({
    el: '#vue-right-side-admin',
    data: {
      logined: CJ_isLogin,
      loading: false,
      userInfo: CJ_userInfo,
      dropInfo: [],
      userLevel: CJ_userInfo.vip === 1 ? 'VIP' : CJ_userInfo.moneyLevel ? "LV".concat(CJ_userInfo.moneyLevel) : '' //`LV${CJ_userInfo.moneyLevel}`

    },
    components: {
      loadBounce: __vue_component__
    },
    created: function created() {
      // 未登录时候 CJ Admin LOGO
      this.adminIcon = 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/15460992/209159487000.png';

      if (this.logined) {
        this.getDropInfo();
      }
    },
    mounted: function mounted() {
      var _this = this;

      window.addEventListener('currency-rate/updated', function () {
        return _this.$forceUpdate();
      });
    },
    methods: {
      // 获取一些销售金额、钱包、订单信息之类的(接口返回一部分用户信息)
      getDropInfo: function getDropInfo() {
        var _this2 = this;

        var listen = function listen(loading) {
          return _this2.loading = loading;
        };

        CJ_.$axios.post('cj/homePage/chaXunYongHuXinXi', {}, listen).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              err = _ref2[0],
              data = _ref2[1];

          if (err) {
            console.warn(err);
            return;
          }

          var _CJ_$statusCode = CJ_.statusCode200(data),
              _CJ_$statusCode2 = _slicedToArray(_CJ_$statusCode, 2),
              err2 = _CJ_$statusCode2[0],
              data2 = _CJ_$statusCode2[1];

          if (err2) {
            console.warn(err2);
            return;
          }

          _this2.setDropInfo(data2);
        });
      },
      setDropInfo: function setDropInfo(info) {
        var arr = [];

        if (info) {
          arr.push({
            title: i18next.t('home-sales-amount'),
            value: info.salesAmount,
            currency: true
          });
          arr.push({
            title: i18next.t('common-wallet'),
            value: info.wallet,
            currency: true,
            href: 'myCJ.html#/myCJWallet?track=12'
          });
          arr.push({
            title: i18next.t('home-awaiting-payment'),
            value: info.forPaymentSum,
            href: '/newmycj/dropshipping/orderManage?active=2'
          });
          arr.push({
            title: i18next.t('home-pending'),
            value: info.toBeProcessedSum,
            href: '/newmycj/dropshipping/orderManage?active=3'
          });
          arr.push({
            title: i18next.t('home-processing'),
            value: info.waitForDeliverySum,
            href: '/newmycj/dropshipping/orderManage?active=4'
          });
          arr.push({
            title: i18next.t('home-dispatched'),
            value: info.shippedSum,
            href: '/newmycj/dropshipping/orderManage?active=5'
          });
          arr.push({
            title: i18next.t('home-completed'),
            value: info.completedSum,
            href: '/newmycj/dropshipping/orderManage?active=6'
          });
          arr.push({
            title: i18next.t('home-closed'),
            value: info.overSum,
            href: '/newmycj/dropshipping/orderManage?active=7'
          });
          this.userLevel = info.vip === 1 ? 'VIP' : info.moneyLevel ? "LV".concat(info.moneyLevel) : '';
          this.userInfo.avatar = info.img === 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/ba627238-87d7-41a9-86f1-960b4cc07ebf.png' ? '' : info.img;
          this.userInfo.name = info.name || '';
          this.userInfo.vip = info.vip || 0;
          var ev = {
            detail: {
              img: info.img
            }
          }; // 用户头像更新 -- 防止shopfiy登陆过来的拿不到头像

          window.dispatchEvent(new CustomEvent('userInfoUpdateEv', ev));
        }

        this.dropInfo = arr;
      },
      isShow: function isShow(value) {
        var v = filter_7(value, undefined, true);

        if (v.includes('M') || v.includes('B')) {
          return true;
        }
      }
    }
  });

  /**
   * 首页 You may want to know
   * @author zhoumiao
   * @since 2020/9/1
   */
  new Vue({
    el: '#vue-right-knowledge',
    data: {},
    methods: {
      // 获取一些销售金额、钱包、订单信息之类的(接口返回一部分用户信息)
      contentClick: function contentClick(id) {
        CJ_.$axios.post('pojo/promotionContent/addClickCount', {
          'id': id
        }).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              err = _ref2[0],
              data = _ref2[1];

          if (err) {
            console.log(err);
          }
        });
      }
    }
  });

  /**
   * 楼层请求
   */

  var statusCode200$1 = utils$1.statusCode200;
  var floors = {
    floor_1: {
      U: 'cj/superDeal/product/getTop5UnsoldProduct',
      P: {},
      title: 'Super Deal'
    },
    floor_2: {
      U: 'cj/homePage/selectNewProductList',
      P: {
        timeFlag: 'Dropshipping',
        pageSize: 6
      },
      title: 'Trending Products'
    },
    floor_3: {
      U: 'cj/homePage/selectNewProductList',
      P: {
        timeFlag: 'month',
        pageSize: 6
      },
      title: 'New Products'
    },
    floor_4: {
      U: 'cj/homePage/getHotCategory',
      P: {
        count: 4,
        productsCount: 1
      },
      title: 'Hot Selling Categories',
      map: function map(arr) {
        var _arr = Array.isArray(arr) ? arr : []; // [{ name: '', img: '', param: '' }]


        return _arr.map(function (item, idx) {
          var img = '';

          if (Array.isArray(item.products) && item.products[0]) {
            img = item.products[0].bigImg;
          }

          return {
            name: item.categoryNameVal,
            img: img,
            param: "category".concat(idx + 1),
            id: item.categoryId
          };
        });
      }
    },
    floor_5: {
      U: 'cj/homePage/selectNewProductList',
      P: {
        timeFlag: 'listed',
        pageSize: 6
      },
      title: 'Listable Products'
    },
    floor_6: {
      left: {
        U: 'cj/homePage/selectNewProductList',
        P: {
          timeFlag: 'USAStorage',
          pageSize: 4
        },
        title: 'US Warehouse'
      },
      right: {
        U: 'cj/homePage/selectNewProductList',
        P: {
          timeFlag: 'th',
          pageSize: 4
        },
        title: 'Thailand Warehouse'
      }
    },
    floor_7: {
      left: {
        U: 'cj/homePage/selectNewProductList',
        P: {
          timeFlag: 'video',
          pageSize: 6
        },
        title: 'Videos'
      },
      right: {
        U: 'cj/homePage/selectNewProductList',
        P: {
          timeFlag: 'source',
          pageSize: 4
        },
        title: 'Sourcing'
      }
    },
    floor_8: {
      U: 'cj/homePage/selectNewProductList',
      P: {
        timeFlag: 'POD',
        pageSize: 6
      },
      title: 'Print on Demand'
    },
    floor_9: {
      U: 'product-api/cjProductInfo/home/recommend/queryPage',
      P: {
        page: 1,
        size: 24,
        language: 'en'
      },
      title: 'Recommended Products'
    },
    floor_global_warehouse: function floor_global_warehouse() {
      //USAStorage : 美仓, th : 泰国仓, CNStorage : 中国仓, DEStorage : 德国仓, IDStorage : 印尼仓, AUStorage : 澳大利亚仓, FRStorage : 法国仓, GBStorage: 英国仓 
      // title需要和sessionStorage-warehouse_lng_里的en对应，用于六国翻译
      var pageSize = 3;
      return [{
        U: 'cj/homePage/selectNewProductList',
        P: {
          timeFlag: 'USAStorage',
          pageSize: pageSize
        },
        h: "us",
        title: 'US Warehouse'
      }, {
        U: 'cj/homePage/selectNewProductList',
        P: {
          timeFlag: 'DEStorage',
          pageSize: pageSize
        },
        h: "de",
        title: 'Germany Warehouse'
      }, {
        U: 'cj/homePage/selectNewProductList',
        P: {
          timeFlag: 'CNStorage',
          pageSize: pageSize
        },
        // title: 'China Warehouses',
        h: "cz",
        title: 'Czechia Warehouse'
      }, {
        U: 'cj/homePage/selectNewProductList',
        P: {
          timeFlag: 'th',
          pageSize: pageSize
        },
        h: "th",
        title: 'Thailand Warehouse'
      }, {
        U: 'cj/homePage/selectNewProductList',
        P: {
          timeFlag: 'IDStorage',
          pageSize: pageSize
        },
        // title: 'Indonesia Warehouse',
        h: "my",
        title: 'Malaysia Warehouse'
      }, {
        U: 'cj/homePage/selectNewProductList',
        P: {
          timeFlag: 'AUStorage',
          pageSize: pageSize
        },
        h: "au",
        title: 'Australia Warehouse'
      }, {
        U: 'cj/homePage/selectNewProductList',
        P: {
          timeFlag: 'FRStorage',
          pageSize: pageSize
        },
        h: "fr",
        title: 'France Warehouse'
      }, {
        U: 'cj/homePage/selectNewProductList',
        P: {
          timeFlag: 'GBStorage',
          pageSize: pageSize
        },
        h: "gb",
        title: 'Britain Warehouse'
      }];
    }
  };

  function Floor(opt) {
    var $axios = opt.$axios,
        $ajax = opt.$ajax,
        _opt$writeToLog = opt.writeToLog,
        writeToLog = _opt$writeToLog === void 0 ? function () {} : _opt$writeToLog; // params-其它请求参数，主要用于配置headers

    this.getData = function (floor) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve) {
        var tmp = floor;

        if (tmp) {
          /* $axios.post(tmp.U, tmp.P).then(([err, data]) => {
            err ? resolve([err]) : resolve(statusCode200(data));
          }); */
          $ajax({
            method: 'post',
            url: tmp.U,
            data: tmp.P,
            headers: {
              language: params.lng || ''
            }
          }).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                err = _ref2[0],
                data = _ref2[1];

            err ? resolve([err]) : resolve(statusCode200$1(data));
          });
        } else {
          var log = "".concat(floor, " \u6CA1\u627E\u5230");
          resolve([log]);
          writeToLog('common-home.js.log', log);
        }
      });
    };
  }
  Floor.floors = floors;
  var home = {
    Floor: Floor
  };
  var home_1 = home.Floor;

  var js_cookie = createCommonjsModule(function (module, exports) {

    (function (factory) {
      var registeredInModuleLoader;

      {
        module.exports = factory();
        registeredInModuleLoader = true;
      }

      if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();

        api.noConflict = function () {
          window.Cookies = OldCookies;
          return api;
        };
      }
    })(function () {
      function extend() {
        var i = 0;
        var result = {};

        for (; i < arguments.length; i++) {
          var attributes = arguments[i];

          for (var key in attributes) {
            result[key] = attributes[key];
          }
        }

        return result;
      }

      function decode(s) {
        return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
      }

      function init(converter) {
        function api() {}

        function set(key, value, attributes) {
          if (typeof document === 'undefined') {
            return;
          }

          attributes = extend({
            path: '/'
          }, api.defaults, attributes);

          if (typeof attributes.expires === 'number') {
            attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
          } // We're using "expires" because "max-age" is not supported by IE


          attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

          try {
            var result = JSON.stringify(value);

            if (/^[\{\[]/.test(result)) {
              value = result;
            }
          } catch (e) {}

          value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
          key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
          var stringifiedAttributes = '';

          for (var attributeName in attributes) {
            if (!attributes[attributeName]) {
              continue;
            }

            stringifiedAttributes += '; ' + attributeName;

            if (attributes[attributeName] === true) {
              continue;
            } // Considers RFC 6265 section 5.2:
            // ...
            // 3.  If the remaining unparsed-attributes contains a %x3B (";")
            //     character:
            // Consume the characters of the unparsed-attributes up to,
            // not including, the first %x3B (";") character.
            // ...


            stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
          }

          return document.cookie = key + '=' + value + stringifiedAttributes;
        }

        function get(key, json) {
          if (typeof document === 'undefined') {
            return;
          }

          var jar = {}; // To prevent the for loop in the first place assign an empty array
          // in case there are no cookies at all.

          var cookies = document.cookie ? document.cookie.split('; ') : [];
          var i = 0;

          for (; i < cookies.length; i++) {
            var parts = cookies[i].split('=');
            var cookie = parts.slice(1).join('=');

            if (!json && cookie.charAt(0) === '"') {
              cookie = cookie.slice(1, -1);
            }

            try {
              var name = decode(parts[0]);
              cookie = (converter.read || converter)(cookie, name) || decode(cookie);

              if (json) {
                try {
                  cookie = JSON.parse(cookie);
                } catch (e) {}
              }

              jar[name] = cookie;

              if (key === name) {
                break;
              }
            } catch (e) {}
          }

          return key ? jar[key] : jar;
        }

        api.set = set;

        api.get = function (key) {
          return get(key, false
          /* read as raw */
          );
        };

        api.getJSON = function (key) {
          return get(key, true
          /* read as json */
          );
        };

        api.remove = function (key, attributes) {
          set(key, '', extend(attributes, {
            expires: -1
          }));
        };

        api.defaults = {};
        api.withConverter = init;
        return api;
      }

      return init(function () {});
    });
  });

  function e(e) {
    this.message = e;
  }

  e.prototype = new Error(), e.prototype.name = "InvalidCharacterError";

  var r = "undefined" != typeof window && window.atob && window.atob.bind(window) || function (r) {
    var t = String(r).replace(/=+$/, "");
    if (t.length % 4 == 1) throw new e("'atob' failed: The string to be decoded is not correctly encoded.");

    for (var n, o, a = 0, i = 0, c = ""; o = t.charAt(i++); ~o && (n = a % 4 ? 64 * n + o : o, a++ % 4) ? c += String.fromCharCode(255 & n >> (-2 * a & 6)) : 0) {
      o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);
    }

    return c;
  };

  function n(e) {
    this.message = e;
  }

  n.prototype = new Error(), n.prototype.name = "InvalidTokenError";

  var jsencrypt = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
       factory(exports) ;
    })(commonjsGlobal, function (exports) {

      var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";

      function int2char(n) {
        return BI_RM.charAt(n);
      } //#region BIT_OPERATIONS
      // (public) this & a


      function op_and(x, y) {
        return x & y;
      } // (public) this | a


      function op_or(x, y) {
        return x | y;
      } // (public) this ^ a


      function op_xor(x, y) {
        return x ^ y;
      } // (public) this & ~a


      function op_andnot(x, y) {
        return x & ~y;
      } // return index of lowest 1-bit in x, x < 2^31


      function lbit(x) {
        if (x == 0) {
          return -1;
        }

        var r = 0;

        if ((x & 0xffff) == 0) {
          x >>= 16;
          r += 16;
        }

        if ((x & 0xff) == 0) {
          x >>= 8;
          r += 8;
        }

        if ((x & 0xf) == 0) {
          x >>= 4;
          r += 4;
        }

        if ((x & 3) == 0) {
          x >>= 2;
          r += 2;
        }

        if ((x & 1) == 0) {
          ++r;
        }

        return r;
      } // return number of 1 bits in x


      function cbit(x) {
        var r = 0;

        while (x != 0) {
          x &= x - 1;
          ++r;
        }

        return r;
      } //#endregion BIT_OPERATIONS


      var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var b64pad = "=";

      function hex2b64(h) {
        var i;
        var c;
        var ret = "";

        for (i = 0; i + 3 <= h.length; i += 3) {
          c = parseInt(h.substring(i, i + 3), 16);
          ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
        }

        if (i + 1 == h.length) {
          c = parseInt(h.substring(i, i + 1), 16);
          ret += b64map.charAt(c << 2);
        } else if (i + 2 == h.length) {
          c = parseInt(h.substring(i, i + 2), 16);
          ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
        }

        while ((ret.length & 3) > 0) {
          ret += b64pad;
        }

        return ret;
      } // convert a base64 string to hex


      function b64tohex(s) {
        var ret = "";
        var i;
        var k = 0; // b64 state, 0-3

        var slop = 0;

        for (i = 0; i < s.length; ++i) {
          if (s.charAt(i) == b64pad) {
            break;
          }

          var v = b64map.indexOf(s.charAt(i));

          if (v < 0) {
            continue;
          }

          if (k == 0) {
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 1;
          } else if (k == 1) {
            ret += int2char(slop << 2 | v >> 4);
            slop = v & 0xf;
            k = 2;
          } else if (k == 2) {
            ret += int2char(slop);
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 3;
          } else {
            ret += int2char(slop << 2 | v >> 4);
            ret += int2char(v & 0xf);
            k = 0;
          }
        }

        if (k == 1) {
          ret += int2char(slop << 2);
        }

        return ret;
      }
      /*! *****************************************************************************
      Copyright (c) Microsoft Corporation. All rights reserved.
      Licensed under the Apache License, Version 2.0 (the "License"); you may not use
      this file except in compliance with the License. You may obtain a copy of the
      License at http://www.apache.org/licenses/LICENSE-2.0
      
      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
      KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
      WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
      MERCHANTABLITY OR NON-INFRINGEMENT.
      
      See the Apache Version 2.0 License for specific language governing permissions
      and limitations under the License.
      ***************************************************************************** */

      /* global Reflect, Promise */


      var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics(d, b);
      };

      function __extends(d, b) {
        _extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      } // Hex JavaScript decoder
      // Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
      // Permission to use, copy, modify, and/or distribute this software for any
      // purpose with or without fee is hereby granted, provided that the above
      // copyright notice and this permission notice appear in all copies.
      //
      // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
      // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
      // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
      // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
      // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
      // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
      // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

      /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */


      var decoder;
      var Hex = {
        decode: function decode(a) {
          var i;

          if (decoder === undefined) {
            var hex = "0123456789ABCDEF";
            var ignore = " \f\n\r\t\xA0\u2028\u2029";
            decoder = {};

            for (i = 0; i < 16; ++i) {
              decoder[hex.charAt(i)] = i;
            }

            hex = hex.toLowerCase();

            for (i = 10; i < 16; ++i) {
              decoder[hex.charAt(i)] = i;
            }

            for (i = 0; i < ignore.length; ++i) {
              decoder[ignore.charAt(i)] = -1;
            }
          }

          var out = [];
          var bits = 0;
          var char_count = 0;

          for (i = 0; i < a.length; ++i) {
            var c = a.charAt(i);

            if (c == "=") {
              break;
            }

            c = decoder[c];

            if (c == -1) {
              continue;
            }

            if (c === undefined) {
              throw new Error("Illegal character at offset " + i);
            }

            bits |= c;

            if (++char_count >= 2) {
              out[out.length] = bits;
              bits = 0;
              char_count = 0;
            } else {
              bits <<= 4;
            }
          }

          if (char_count) {
            throw new Error("Hex encoding incomplete: 4 bits missing");
          }

          return out;
        }
      }; // Base64 JavaScript decoder
      // Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
      // Permission to use, copy, modify, and/or distribute this software for any
      // purpose with or without fee is hereby granted, provided that the above
      // copyright notice and this permission notice appear in all copies.
      //
      // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
      // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
      // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
      // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
      // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
      // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
      // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

      /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */

      var decoder$1;
      var Base64 = {
        decode: function decode(a) {
          var i;

          if (decoder$1 === undefined) {
            var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var ignore = "= \f\n\r\t\xA0\u2028\u2029";
            decoder$1 = Object.create(null);

            for (i = 0; i < 64; ++i) {
              decoder$1[b64.charAt(i)] = i;
            }

            for (i = 0; i < ignore.length; ++i) {
              decoder$1[ignore.charAt(i)] = -1;
            }
          }

          var out = [];
          var bits = 0;
          var char_count = 0;

          for (i = 0; i < a.length; ++i) {
            var c = a.charAt(i);

            if (c == "=") {
              break;
            }

            c = decoder$1[c];

            if (c == -1) {
              continue;
            }

            if (c === undefined) {
              throw new Error("Illegal character at offset " + i);
            }

            bits |= c;

            if (++char_count >= 4) {
              out[out.length] = bits >> 16;
              out[out.length] = bits >> 8 & 0xFF;
              out[out.length] = bits & 0xFF;
              bits = 0;
              char_count = 0;
            } else {
              bits <<= 6;
            }
          }

          switch (char_count) {
            case 1:
              throw new Error("Base64 encoding incomplete: at least 2 bits missing");

            case 2:
              out[out.length] = bits >> 10;
              break;

            case 3:
              out[out.length] = bits >> 16;
              out[out.length] = bits >> 8 & 0xFF;
              break;
          }

          return out;
        },
        re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
        unarmor: function unarmor(a) {
          var m = Base64.re.exec(a);

          if (m) {
            if (m[1]) {
              a = m[1];
            } else if (m[2]) {
              a = m[2];
            } else {
              throw new Error("RegExp out of sync");
            }
          }

          return Base64.decode(a);
        }
      }; // Big integer base-10 printing library
      // Copyright (c) 2014 Lapo Luchini <lapo@lapo.it>
      // Permission to use, copy, modify, and/or distribute this software for any
      // purpose with or without fee is hereby granted, provided that the above
      // copyright notice and this permission notice appear in all copies.
      //
      // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
      // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
      // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
      // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
      // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
      // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
      // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

      /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */

      var max = 10000000000000; // biggest integer that can still fit 2^53 when multiplied by 256

      var Int10 =
      /** @class */
      function () {
        function Int10(value) {
          this.buf = [+value || 0];
        }

        Int10.prototype.mulAdd = function (m, c) {
          // assert(m <= 256)
          var b = this.buf;
          var l = b.length;
          var i;
          var t;

          for (i = 0; i < l; ++i) {
            t = b[i] * m + c;

            if (t < max) {
              c = 0;
            } else {
              c = 0 | t / max;
              t -= c * max;
            }

            b[i] = t;
          }

          if (c > 0) {
            b[i] = c;
          }
        };

        Int10.prototype.sub = function (c) {
          // assert(m <= 256)
          var b = this.buf;
          var l = b.length;
          var i;
          var t;

          for (i = 0; i < l; ++i) {
            t = b[i] - c;

            if (t < 0) {
              t += max;
              c = 1;
            } else {
              c = 0;
            }

            b[i] = t;
          }

          while (b[b.length - 1] === 0) {
            b.pop();
          }
        };

        Int10.prototype.toString = function (base) {
          if ((base || 10) != 10) {
            throw new Error("only base 10 is supported");
          }

          var b = this.buf;
          var s = b[b.length - 1].toString();

          for (var i = b.length - 2; i >= 0; --i) {
            s += (max + b[i]).toString().substring(1);
          }

          return s;
        };

        Int10.prototype.valueOf = function () {
          var b = this.buf;
          var v = 0;

          for (var i = b.length - 1; i >= 0; --i) {
            v = v * max + b[i];
          }

          return v;
        };

        Int10.prototype.simplify = function () {
          var b = this.buf;
          return b.length == 1 ? b[0] : this;
        };

        return Int10;
      }(); // ASN.1 JavaScript decoder


      var ellipsis = "\u2026";
      var reTimeS = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
      var reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

      function stringCut(str, len) {
        if (str.length > len) {
          str = str.substring(0, len) + ellipsis;
        }

        return str;
      }

      var Stream =
      /** @class */
      function () {
        function Stream(enc, pos) {
          this.hexDigits = "0123456789ABCDEF";

          if (enc instanceof Stream) {
            this.enc = enc.enc;
            this.pos = enc.pos;
          } else {
            // enc should be an array or a binary string
            this.enc = enc;
            this.pos = pos;
          }
        }

        Stream.prototype.get = function (pos) {
          if (pos === undefined) {
            pos = this.pos++;
          }

          if (pos >= this.enc.length) {
            throw new Error("Requesting byte offset " + pos + " on a stream of length " + this.enc.length);
          }

          return "string" === typeof this.enc ? this.enc.charCodeAt(pos) : this.enc[pos];
        };

        Stream.prototype.hexByte = function (b) {
          return this.hexDigits.charAt(b >> 4 & 0xF) + this.hexDigits.charAt(b & 0xF);
        };

        Stream.prototype.hexDump = function (start, end, raw) {
          var s = "";

          for (var i = start; i < end; ++i) {
            s += this.hexByte(this.get(i));

            if (raw !== true) {
              switch (i & 0xF) {
                case 0x7:
                  s += "  ";
                  break;

                case 0xF:
                  s += "\n";
                  break;

                default:
                  s += " ";
              }
            }
          }

          return s;
        };

        Stream.prototype.isASCII = function (start, end) {
          for (var i = start; i < end; ++i) {
            var c = this.get(i);

            if (c < 32 || c > 176) {
              return false;
            }
          }

          return true;
        };

        Stream.prototype.parseStringISO = function (start, end) {
          var s = "";

          for (var i = start; i < end; ++i) {
            s += String.fromCharCode(this.get(i));
          }

          return s;
        };

        Stream.prototype.parseStringUTF = function (start, end) {
          var s = "";

          for (var i = start; i < end;) {
            var c = this.get(i++);

            if (c < 128) {
              s += String.fromCharCode(c);
            } else if (c > 191 && c < 224) {
              s += String.fromCharCode((c & 0x1F) << 6 | this.get(i++) & 0x3F);
            } else {
              s += String.fromCharCode((c & 0x0F) << 12 | (this.get(i++) & 0x3F) << 6 | this.get(i++) & 0x3F);
            }
          }

          return s;
        };

        Stream.prototype.parseStringBMP = function (start, end) {
          var str = "";
          var hi;
          var lo;

          for (var i = start; i < end;) {
            hi = this.get(i++);
            lo = this.get(i++);
            str += String.fromCharCode(hi << 8 | lo);
          }

          return str;
        };

        Stream.prototype.parseTime = function (start, end, shortYear) {
          var s = this.parseStringISO(start, end);
          var m = (shortYear ? reTimeS : reTimeL).exec(s);

          if (!m) {
            return "Unrecognized time: " + s;
          }

          if (shortYear) {
            // to avoid querying the timer, use the fixed range [1970, 2069]
            // it will conform with ITU X.400 [-10, +40] sliding window until 2030
            m[1] = +m[1];
            m[1] += +m[1] < 70 ? 2000 : 1900;
          }

          s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];

          if (m[5]) {
            s += ":" + m[5];

            if (m[6]) {
              s += ":" + m[6];

              if (m[7]) {
                s += "." + m[7];
              }
            }
          }

          if (m[8]) {
            s += " UTC";

            if (m[8] != "Z") {
              s += m[8];

              if (m[9]) {
                s += ":" + m[9];
              }
            }
          }

          return s;
        };

        Stream.prototype.parseInteger = function (start, end) {
          var v = this.get(start);
          var neg = v > 127;
          var pad = neg ? 255 : 0;
          var len;
          var s = ""; // skip unuseful bits (not allowed in DER)

          while (v == pad && ++start < end) {
            v = this.get(start);
          }

          len = end - start;

          if (len === 0) {
            return neg ? -1 : 0;
          } // show bit length of huge integers


          if (len > 4) {
            s = v;
            len <<= 3;

            while (((+s ^ pad) & 0x80) == 0) {
              s = +s << 1;
              --len;
            }

            s = "(" + len + " bit)\n";
          } // decode the integer


          if (neg) {
            v = v - 256;
          }

          var n = new Int10(v);

          for (var i = start + 1; i < end; ++i) {
            n.mulAdd(256, this.get(i));
          }

          return s + n.toString();
        };

        Stream.prototype.parseBitString = function (start, end, maxLength) {
          var unusedBit = this.get(start);
          var lenBit = (end - start - 1 << 3) - unusedBit;
          var intro = "(" + lenBit + " bit)\n";
          var s = "";

          for (var i = start + 1; i < end; ++i) {
            var b = this.get(i);
            var skip = i == end - 1 ? unusedBit : 0;

            for (var j = 7; j >= skip; --j) {
              s += b >> j & 1 ? "1" : "0";
            }

            if (s.length > maxLength) {
              return intro + stringCut(s, maxLength);
            }
          }

          return intro + s;
        };

        Stream.prototype.parseOctetString = function (start, end, maxLength) {
          if (this.isASCII(start, end)) {
            return stringCut(this.parseStringISO(start, end), maxLength);
          }

          var len = end - start;
          var s = "(" + len + " byte)\n";
          maxLength /= 2; // we work in bytes

          if (len > maxLength) {
            end = start + maxLength;
          }

          for (var i = start; i < end; ++i) {
            s += this.hexByte(this.get(i));
          }

          if (len > maxLength) {
            s += ellipsis;
          }

          return s;
        };

        Stream.prototype.parseOID = function (start, end, maxLength) {
          var s = "";
          var n = new Int10();
          var bits = 0;

          for (var i = start; i < end; ++i) {
            var v = this.get(i);
            n.mulAdd(128, v & 0x7F);
            bits += 7;

            if (!(v & 0x80)) {
              // finished
              if (s === "") {
                n = n.simplify();

                if (n instanceof Int10) {
                  n.sub(80);
                  s = "2." + n.toString();
                } else {
                  var m = n < 80 ? n < 40 ? 0 : 1 : 2;
                  s = m + "." + (n - m * 40);
                }
              } else {
                s += "." + n.toString();
              }

              if (s.length > maxLength) {
                return stringCut(s, maxLength);
              }

              n = new Int10();
              bits = 0;
            }
          }

          if (bits > 0) {
            s += ".incomplete";
          }

          return s;
        };

        return Stream;
      }();

      var ASN1 =
      /** @class */
      function () {
        function ASN1(stream, header, length, tag, sub) {
          if (!(tag instanceof ASN1Tag)) {
            throw new Error("Invalid tag value.");
          }

          this.stream = stream;
          this.header = header;
          this.length = length;
          this.tag = tag;
          this.sub = sub;
        }

        ASN1.prototype.typeName = function () {
          switch (this.tag.tagClass) {
            case 0:
              // universal
              switch (this.tag.tagNumber) {
                case 0x00:
                  return "EOC";

                case 0x01:
                  return "BOOLEAN";

                case 0x02:
                  return "INTEGER";

                case 0x03:
                  return "BIT_STRING";

                case 0x04:
                  return "OCTET_STRING";

                case 0x05:
                  return "NULL";

                case 0x06:
                  return "OBJECT_IDENTIFIER";

                case 0x07:
                  return "ObjectDescriptor";

                case 0x08:
                  return "EXTERNAL";

                case 0x09:
                  return "REAL";

                case 0x0A:
                  return "ENUMERATED";

                case 0x0B:
                  return "EMBEDDED_PDV";

                case 0x0C:
                  return "UTF8String";

                case 0x10:
                  return "SEQUENCE";

                case 0x11:
                  return "SET";

                case 0x12:
                  return "NumericString";

                case 0x13:
                  return "PrintableString";
                // ASCII subset

                case 0x14:
                  return "TeletexString";
                // aka T61String

                case 0x15:
                  return "VideotexString";

                case 0x16:
                  return "IA5String";
                // ASCII

                case 0x17:
                  return "UTCTime";

                case 0x18:
                  return "GeneralizedTime";

                case 0x19:
                  return "GraphicString";

                case 0x1A:
                  return "VisibleString";
                // ASCII subset

                case 0x1B:
                  return "GeneralString";

                case 0x1C:
                  return "UniversalString";

                case 0x1E:
                  return "BMPString";
              }

              return "Universal_" + this.tag.tagNumber.toString();

            case 1:
              return "Application_" + this.tag.tagNumber.toString();

            case 2:
              return "[" + this.tag.tagNumber.toString() + "]";
            // Context

            case 3:
              return "Private_" + this.tag.tagNumber.toString();
          }
        };

        ASN1.prototype.content = function (maxLength) {
          if (this.tag === undefined) {
            return null;
          }

          if (maxLength === undefined) {
            maxLength = Infinity;
          }

          var content = this.posContent();
          var len = Math.abs(this.length);

          if (!this.tag.isUniversal()) {
            if (this.sub !== null) {
              return "(" + this.sub.length + " elem)";
            }

            return this.stream.parseOctetString(content, content + len, maxLength);
          }

          switch (this.tag.tagNumber) {
            case 0x01:
              // BOOLEAN
              return this.stream.get(content) === 0 ? "false" : "true";

            case 0x02:
              // INTEGER
              return this.stream.parseInteger(content, content + len);

            case 0x03:
              // BIT_STRING
              return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(content, content + len, maxLength);

            case 0x04:
              // OCTET_STRING
              return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(content, content + len, maxLength);
            // case 0x05: // NULL

            case 0x06:
              // OBJECT_IDENTIFIER
              return this.stream.parseOID(content, content + len, maxLength);
            // case 0x07: // ObjectDescriptor
            // case 0x08: // EXTERNAL
            // case 0x09: // REAL
            // case 0x0A: // ENUMERATED
            // case 0x0B: // EMBEDDED_PDV

            case 0x10: // SEQUENCE

            case 0x11:
              // SET
              if (this.sub !== null) {
                return "(" + this.sub.length + " elem)";
              } else {
                return "(no elem)";
              }

            case 0x0C:
              // UTF8String
              return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);

            case 0x12: // NumericString

            case 0x13: // PrintableString

            case 0x14: // TeletexString

            case 0x15: // VideotexString

            case 0x16: // IA5String
            // case 0x19: // GraphicString

            case 0x1A:
              // VisibleString
              // case 0x1B: // GeneralString
              // case 0x1C: // UniversalString
              return stringCut(this.stream.parseStringISO(content, content + len), maxLength);

            case 0x1E:
              // BMPString
              return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);

            case 0x17: // UTCTime

            case 0x18:
              // GeneralizedTime
              return this.stream.parseTime(content, content + len, this.tag.tagNumber == 0x17);
          }

          return null;
        };

        ASN1.prototype.toString = function () {
          return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]";
        };

        ASN1.prototype.toPrettyString = function (indent) {
          if (indent === undefined) {
            indent = "";
          }

          var s = indent + this.typeName() + " @" + this.stream.pos;

          if (this.length >= 0) {
            s += "+";
          }

          s += this.length;

          if (this.tag.tagConstructed) {
            s += " (constructed)";
          } else if (this.tag.isUniversal() && (this.tag.tagNumber == 0x03 || this.tag.tagNumber == 0x04) && this.sub !== null) {
            s += " (encapsulates)";
          }

          s += "\n";

          if (this.sub !== null) {
            indent += "  ";

            for (var i = 0, max = this.sub.length; i < max; ++i) {
              s += this.sub[i].toPrettyString(indent);
            }
          }

          return s;
        };

        ASN1.prototype.posStart = function () {
          return this.stream.pos;
        };

        ASN1.prototype.posContent = function () {
          return this.stream.pos + this.header;
        };

        ASN1.prototype.posEnd = function () {
          return this.stream.pos + this.header + Math.abs(this.length);
        };

        ASN1.prototype.toHexString = function () {
          return this.stream.hexDump(this.posStart(), this.posEnd(), true);
        };

        ASN1.decodeLength = function (stream) {
          var buf = stream.get();
          var len = buf & 0x7F;

          if (len == buf) {
            return len;
          } // no reason to use Int10, as it would be a huge buffer anyways


          if (len > 6) {
            throw new Error("Length over 48 bits not supported at position " + (stream.pos - 1));
          }

          if (len === 0) {
            return null;
          } // undefined


          buf = 0;

          for (var i = 0; i < len; ++i) {
            buf = buf * 256 + stream.get();
          }

          return buf;
        };
        /**
         * Retrieve the hexadecimal value (as a string) of the current ASN.1 element
         * @returns {string}
         * @public
         */


        ASN1.prototype.getHexStringValue = function () {
          var hexString = this.toHexString();
          var offset = this.header * 2;
          var length = this.length * 2;
          return hexString.substr(offset, length);
        };

        ASN1.decode = function (str) {
          var stream;

          if (!(str instanceof Stream)) {
            stream = new Stream(str, 0);
          } else {
            stream = str;
          }

          var streamStart = new Stream(stream);
          var tag = new ASN1Tag(stream);
          var len = ASN1.decodeLength(stream);
          var start = stream.pos;
          var header = start - streamStart.pos;
          var sub = null;

          var getSub = function getSub() {
            var ret = [];

            if (len !== null) {
              // definite length
              var end = start + len;

              while (stream.pos < end) {
                ret[ret.length] = ASN1.decode(stream);
              }

              if (stream.pos != end) {
                throw new Error("Content size is not correct for container starting at offset " + start);
              }
            } else {
              // undefined length
              try {
                for (;;) {
                  var s = ASN1.decode(stream);

                  if (s.tag.isEOC()) {
                    break;
                  }

                  ret[ret.length] = s;
                }

                len = start - stream.pos; // undefined lengths are represented as negative values
              } catch (e) {
                throw new Error("Exception while decoding undefined length content: " + e);
              }
            }

            return ret;
          };

          if (tag.tagConstructed) {
            // must have valid content
            sub = getSub();
          } else if (tag.isUniversal() && (tag.tagNumber == 0x03 || tag.tagNumber == 0x04)) {
            // sometimes BitString and OctetString are used to encapsulate ASN.1
            try {
              if (tag.tagNumber == 0x03) {
                if (stream.get() != 0) {
                  throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                }
              }

              sub = getSub();

              for (var i = 0; i < sub.length; ++i) {
                if (sub[i].tag.isEOC()) {
                  throw new Error("EOC is not supposed to be actual content.");
                }
              }
            } catch (e) {
              // but silently ignore when they don't
              sub = null;
            }
          }

          if (sub === null) {
            if (len === null) {
              throw new Error("We can't skip over an invalid tag with undefined length at offset " + start);
            }

            stream.pos = start + Math.abs(len);
          }

          return new ASN1(streamStart, header, len, tag, sub);
        };

        return ASN1;
      }();

      var ASN1Tag =
      /** @class */
      function () {
        function ASN1Tag(stream) {
          var buf = stream.get();
          this.tagClass = buf >> 6;
          this.tagConstructed = (buf & 0x20) !== 0;
          this.tagNumber = buf & 0x1F;

          if (this.tagNumber == 0x1F) {
            // long tag
            var n = new Int10();

            do {
              buf = stream.get();
              n.mulAdd(128, buf & 0x7F);
            } while (buf & 0x80);

            this.tagNumber = n.simplify();
          }
        }

        ASN1Tag.prototype.isUniversal = function () {
          return this.tagClass === 0x00;
        };

        ASN1Tag.prototype.isEOC = function () {
          return this.tagClass === 0x00 && this.tagNumber === 0x00;
        };

        return ASN1Tag;
      }(); // Copyright (c) 2005  Tom Wu
      // Bits per digit


      var dbits; // JavaScript engine analysis

      var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
      var lplim = (1 << 26) / lowprimes[lowprimes.length - 1]; //#endregion
      // (public) Constructor

      var BigInteger =
      /** @class */
      function () {
        function BigInteger(a, b, c) {
          if (a != null) {
            if ("number" == typeof a) {
              this.fromNumber(a, b, c);
            } else if (b == null && "string" != typeof a) {
              this.fromString(a, 256);
            } else {
              this.fromString(a, b);
            }
          }
        } //#region PUBLIC
        // BigInteger.prototype.toString = bnToString;
        // (public) return string representation in given radix


        BigInteger.prototype.toString = function (b) {
          if (this.s < 0) {
            return "-" + this.negate().toString(b);
          }

          var k;

          if (b == 16) {
            k = 4;
          } else if (b == 8) {
            k = 3;
          } else if (b == 2) {
            k = 1;
          } else if (b == 32) {
            k = 5;
          } else if (b == 4) {
            k = 2;
          } else {
            return this.toRadix(b);
          }

          var km = (1 << k) - 1;
          var d;
          var m = false;
          var r = "";
          var i = this.t;
          var p = this.DB - i * this.DB % k;

          if (i-- > 0) {
            if (p < this.DB && (d = this[i] >> p) > 0) {
              m = true;
              r = int2char(d);
            }

            while (i >= 0) {
              if (p < k) {
                d = (this[i] & (1 << p) - 1) << k - p;
                d |= this[--i] >> (p += this.DB - k);
              } else {
                d = this[i] >> (p -= k) & km;

                if (p <= 0) {
                  p += this.DB;
                  --i;
                }
              }

              if (d > 0) {
                m = true;
              }

              if (m) {
                r += int2char(d);
              }
            }
          }

          return m ? r : "0";
        }; // BigInteger.prototype.negate = bnNegate;
        // (public) -this


        BigInteger.prototype.negate = function () {
          var r = nbi();
          BigInteger.ZERO.subTo(this, r);
          return r;
        }; // BigInteger.prototype.abs = bnAbs;
        // (public) |this|


        BigInteger.prototype.abs = function () {
          return this.s < 0 ? this.negate() : this;
        }; // BigInteger.prototype.compareTo = bnCompareTo;
        // (public) return + if this > a, - if this < a, 0 if equal


        BigInteger.prototype.compareTo = function (a) {
          var r = this.s - a.s;

          if (r != 0) {
            return r;
          }

          var i = this.t;
          r = i - a.t;

          if (r != 0) {
            return this.s < 0 ? -r : r;
          }

          while (--i >= 0) {
            if ((r = this[i] - a[i]) != 0) {
              return r;
            }
          }

          return 0;
        }; // BigInteger.prototype.bitLength = bnBitLength;
        // (public) return the number of bits in "this"


        BigInteger.prototype.bitLength = function () {
          if (this.t <= 0) {
            return 0;
          }

          return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
        }; // BigInteger.prototype.mod = bnMod;
        // (public) this mod a


        BigInteger.prototype.mod = function (a) {
          var r = nbi();
          this.abs().divRemTo(a, null, r);

          if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
            a.subTo(r, r);
          }

          return r;
        }; // BigInteger.prototype.modPowInt = bnModPowInt;
        // (public) this^e % m, 0 <= e < 2^32


        BigInteger.prototype.modPowInt = function (e, m) {
          var z;

          if (e < 256 || m.isEven()) {
            z = new Classic(m);
          } else {
            z = new Montgomery(m);
          }

          return this.exp(e, z);
        }; // BigInteger.prototype.clone = bnClone;
        // (public)


        BigInteger.prototype.clone = function () {
          var r = nbi();
          this.copyTo(r);
          return r;
        }; // BigInteger.prototype.intValue = bnIntValue;
        // (public) return value as integer


        BigInteger.prototype.intValue = function () {
          if (this.s < 0) {
            if (this.t == 1) {
              return this[0] - this.DV;
            } else if (this.t == 0) {
              return -1;
            }
          } else if (this.t == 1) {
            return this[0];
          } else if (this.t == 0) {
            return 0;
          } // assumes 16 < DB < 32


          return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
        }; // BigInteger.prototype.byteValue = bnByteValue;
        // (public) return value as byte


        BigInteger.prototype.byteValue = function () {
          return this.t == 0 ? this.s : this[0] << 24 >> 24;
        }; // BigInteger.prototype.shortValue = bnShortValue;
        // (public) return value as short (assumes DB>=16)


        BigInteger.prototype.shortValue = function () {
          return this.t == 0 ? this.s : this[0] << 16 >> 16;
        }; // BigInteger.prototype.signum = bnSigNum;
        // (public) 0 if this == 0, 1 if this > 0


        BigInteger.prototype.signum = function () {
          if (this.s < 0) {
            return -1;
          } else if (this.t <= 0 || this.t == 1 && this[0] <= 0) {
            return 0;
          } else {
            return 1;
          }
        }; // BigInteger.prototype.toByteArray = bnToByteArray;
        // (public) convert to bigendian byte array


        BigInteger.prototype.toByteArray = function () {
          var i = this.t;
          var r = [];
          r[0] = this.s;
          var p = this.DB - i * this.DB % 8;
          var d;
          var k = 0;

          if (i-- > 0) {
            if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) {
              r[k++] = d | this.s << this.DB - p;
            }

            while (i >= 0) {
              if (p < 8) {
                d = (this[i] & (1 << p) - 1) << 8 - p;
                d |= this[--i] >> (p += this.DB - 8);
              } else {
                d = this[i] >> (p -= 8) & 0xff;

                if (p <= 0) {
                  p += this.DB;
                  --i;
                }
              }

              if ((d & 0x80) != 0) {
                d |= -256;
              }

              if (k == 0 && (this.s & 0x80) != (d & 0x80)) {
                ++k;
              }

              if (k > 0 || d != this.s) {
                r[k++] = d;
              }
            }
          }

          return r;
        }; // BigInteger.prototype.equals = bnEquals;


        BigInteger.prototype.equals = function (a) {
          return this.compareTo(a) == 0;
        }; // BigInteger.prototype.min = bnMin;


        BigInteger.prototype.min = function (a) {
          return this.compareTo(a) < 0 ? this : a;
        }; // BigInteger.prototype.max = bnMax;


        BigInteger.prototype.max = function (a) {
          return this.compareTo(a) > 0 ? this : a;
        }; // BigInteger.prototype.and = bnAnd;


        BigInteger.prototype.and = function (a) {
          var r = nbi();
          this.bitwiseTo(a, op_and, r);
          return r;
        }; // BigInteger.prototype.or = bnOr;


        BigInteger.prototype.or = function (a) {
          var r = nbi();
          this.bitwiseTo(a, op_or, r);
          return r;
        }; // BigInteger.prototype.xor = bnXor;


        BigInteger.prototype.xor = function (a) {
          var r = nbi();
          this.bitwiseTo(a, op_xor, r);
          return r;
        }; // BigInteger.prototype.andNot = bnAndNot;


        BigInteger.prototype.andNot = function (a) {
          var r = nbi();
          this.bitwiseTo(a, op_andnot, r);
          return r;
        }; // BigInteger.prototype.not = bnNot;
        // (public) ~this


        BigInteger.prototype.not = function () {
          var r = nbi();

          for (var i = 0; i < this.t; ++i) {
            r[i] = this.DM & ~this[i];
          }

          r.t = this.t;
          r.s = ~this.s;
          return r;
        }; // BigInteger.prototype.shiftLeft = bnShiftLeft;
        // (public) this << n


        BigInteger.prototype.shiftLeft = function (n) {
          var r = nbi();

          if (n < 0) {
            this.rShiftTo(-n, r);
          } else {
            this.lShiftTo(n, r);
          }

          return r;
        }; // BigInteger.prototype.shiftRight = bnShiftRight;
        // (public) this >> n


        BigInteger.prototype.shiftRight = function (n) {
          var r = nbi();

          if (n < 0) {
            this.lShiftTo(-n, r);
          } else {
            this.rShiftTo(n, r);
          }

          return r;
        }; // BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
        // (public) returns index of lowest 1-bit (or -1 if none)


        BigInteger.prototype.getLowestSetBit = function () {
          for (var i = 0; i < this.t; ++i) {
            if (this[i] != 0) {
              return i * this.DB + lbit(this[i]);
            }
          }

          if (this.s < 0) {
            return this.t * this.DB;
          }

          return -1;
        }; // BigInteger.prototype.bitCount = bnBitCount;
        // (public) return number of set bits


        BigInteger.prototype.bitCount = function () {
          var r = 0;
          var x = this.s & this.DM;

          for (var i = 0; i < this.t; ++i) {
            r += cbit(this[i] ^ x);
          }

          return r;
        }; // BigInteger.prototype.testBit = bnTestBit;
        // (public) true iff nth bit is set


        BigInteger.prototype.testBit = function (n) {
          var j = Math.floor(n / this.DB);

          if (j >= this.t) {
            return this.s != 0;
          }

          return (this[j] & 1 << n % this.DB) != 0;
        }; // BigInteger.prototype.setBit = bnSetBit;
        // (public) this | (1<<n)


        BigInteger.prototype.setBit = function (n) {
          return this.changeBit(n, op_or);
        }; // BigInteger.prototype.clearBit = bnClearBit;
        // (public) this & ~(1<<n)


        BigInteger.prototype.clearBit = function (n) {
          return this.changeBit(n, op_andnot);
        }; // BigInteger.prototype.flipBit = bnFlipBit;
        // (public) this ^ (1<<n)


        BigInteger.prototype.flipBit = function (n) {
          return this.changeBit(n, op_xor);
        }; // BigInteger.prototype.add = bnAdd;
        // (public) this + a


        BigInteger.prototype.add = function (a) {
          var r = nbi();
          this.addTo(a, r);
          return r;
        }; // BigInteger.prototype.subtract = bnSubtract;
        // (public) this - a


        BigInteger.prototype.subtract = function (a) {
          var r = nbi();
          this.subTo(a, r);
          return r;
        }; // BigInteger.prototype.multiply = bnMultiply;
        // (public) this * a


        BigInteger.prototype.multiply = function (a) {
          var r = nbi();
          this.multiplyTo(a, r);
          return r;
        }; // BigInteger.prototype.divide = bnDivide;
        // (public) this / a


        BigInteger.prototype.divide = function (a) {
          var r = nbi();
          this.divRemTo(a, r, null);
          return r;
        }; // BigInteger.prototype.remainder = bnRemainder;
        // (public) this % a


        BigInteger.prototype.remainder = function (a) {
          var r = nbi();
          this.divRemTo(a, null, r);
          return r;
        }; // BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
        // (public) [this/a,this%a]


        BigInteger.prototype.divideAndRemainder = function (a) {
          var q = nbi();
          var r = nbi();
          this.divRemTo(a, q, r);
          return [q, r];
        }; // BigInteger.prototype.modPow = bnModPow;
        // (public) this^e % m (HAC 14.85)


        BigInteger.prototype.modPow = function (e, m) {
          var i = e.bitLength();
          var k;
          var r = nbv(1);
          var z;

          if (i <= 0) {
            return r;
          } else if (i < 18) {
            k = 1;
          } else if (i < 48) {
            k = 3;
          } else if (i < 144) {
            k = 4;
          } else if (i < 768) {
            k = 5;
          } else {
            k = 6;
          }

          if (i < 8) {
            z = new Classic(m);
          } else if (m.isEven()) {
            z = new Barrett(m);
          } else {
            z = new Montgomery(m);
          } // precomputation


          var g = [];
          var n = 3;
          var k1 = k - 1;
          var km = (1 << k) - 1;
          g[1] = z.convert(this);

          if (k > 1) {
            var g2 = nbi();
            z.sqrTo(g[1], g2);

            while (n <= km) {
              g[n] = nbi();
              z.mulTo(g2, g[n - 2], g[n]);
              n += 2;
            }
          }

          var j = e.t - 1;
          var w;
          var is1 = true;
          var r2 = nbi();
          var t;
          i = nbits(e[j]) - 1;

          while (j >= 0) {
            if (i >= k1) {
              w = e[j] >> i - k1 & km;
            } else {
              w = (e[j] & (1 << i + 1) - 1) << k1 - i;

              if (j > 0) {
                w |= e[j - 1] >> this.DB + i - k1;
              }
            }

            n = k;

            while ((w & 1) == 0) {
              w >>= 1;
              --n;
            }

            if ((i -= n) < 0) {
              i += this.DB;
              --j;
            }

            if (is1) {
              // ret == 1, don't bother squaring or multiplying it
              g[w].copyTo(r);
              is1 = false;
            } else {
              while (n > 1) {
                z.sqrTo(r, r2);
                z.sqrTo(r2, r);
                n -= 2;
              }

              if (n > 0) {
                z.sqrTo(r, r2);
              } else {
                t = r;
                r = r2;
                r2 = t;
              }

              z.mulTo(r2, g[w], r);
            }

            while (j >= 0 && (e[j] & 1 << i) == 0) {
              z.sqrTo(r, r2);
              t = r;
              r = r2;
              r2 = t;

              if (--i < 0) {
                i = this.DB - 1;
                --j;
              }
            }
          }

          return z.revert(r);
        }; // BigInteger.prototype.modInverse = bnModInverse;
        // (public) 1/this % m (HAC 14.61)


        BigInteger.prototype.modInverse = function (m) {
          var ac = m.isEven();

          if (this.isEven() && ac || m.signum() == 0) {
            return BigInteger.ZERO;
          }

          var u = m.clone();
          var v = this.clone();
          var a = nbv(1);
          var b = nbv(0);
          var c = nbv(0);
          var d = nbv(1);

          while (u.signum() != 0) {
            while (u.isEven()) {
              u.rShiftTo(1, u);

              if (ac) {
                if (!a.isEven() || !b.isEven()) {
                  a.addTo(this, a);
                  b.subTo(m, b);
                }

                a.rShiftTo(1, a);
              } else if (!b.isEven()) {
                b.subTo(m, b);
              }

              b.rShiftTo(1, b);
            }

            while (v.isEven()) {
              v.rShiftTo(1, v);

              if (ac) {
                if (!c.isEven() || !d.isEven()) {
                  c.addTo(this, c);
                  d.subTo(m, d);
                }

                c.rShiftTo(1, c);
              } else if (!d.isEven()) {
                d.subTo(m, d);
              }

              d.rShiftTo(1, d);
            }

            if (u.compareTo(v) >= 0) {
              u.subTo(v, u);

              if (ac) {
                a.subTo(c, a);
              }

              b.subTo(d, b);
            } else {
              v.subTo(u, v);

              if (ac) {
                c.subTo(a, c);
              }

              d.subTo(b, d);
            }
          }

          if (v.compareTo(BigInteger.ONE) != 0) {
            return BigInteger.ZERO;
          }

          if (d.compareTo(m) >= 0) {
            return d.subtract(m);
          }

          if (d.signum() < 0) {
            d.addTo(m, d);
          } else {
            return d;
          }

          if (d.signum() < 0) {
            return d.add(m);
          } else {
            return d;
          }
        }; // BigInteger.prototype.pow = bnPow;
        // (public) this^e


        BigInteger.prototype.pow = function (e) {
          return this.exp(e, new NullExp());
        }; // BigInteger.prototype.gcd = bnGCD;
        // (public) gcd(this,a) (HAC 14.54)


        BigInteger.prototype.gcd = function (a) {
          var x = this.s < 0 ? this.negate() : this.clone();
          var y = a.s < 0 ? a.negate() : a.clone();

          if (x.compareTo(y) < 0) {
            var t = x;
            x = y;
            y = t;
          }

          var i = x.getLowestSetBit();
          var g = y.getLowestSetBit();

          if (g < 0) {
            return x;
          }

          if (i < g) {
            g = i;
          }

          if (g > 0) {
            x.rShiftTo(g, x);
            y.rShiftTo(g, y);
          }

          while (x.signum() > 0) {
            if ((i = x.getLowestSetBit()) > 0) {
              x.rShiftTo(i, x);
            }

            if ((i = y.getLowestSetBit()) > 0) {
              y.rShiftTo(i, y);
            }

            if (x.compareTo(y) >= 0) {
              x.subTo(y, x);
              x.rShiftTo(1, x);
            } else {
              y.subTo(x, y);
              y.rShiftTo(1, y);
            }
          }

          if (g > 0) {
            y.lShiftTo(g, y);
          }

          return y;
        }; // BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
        // (public) test primality with certainty >= 1-.5^t


        BigInteger.prototype.isProbablePrime = function (t) {
          var i;
          var x = this.abs();

          if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
            for (i = 0; i < lowprimes.length; ++i) {
              if (x[0] == lowprimes[i]) {
                return true;
              }
            }

            return false;
          }

          if (x.isEven()) {
            return false;
          }

          i = 1;

          while (i < lowprimes.length) {
            var m = lowprimes[i];
            var j = i + 1;

            while (j < lowprimes.length && m < lplim) {
              m *= lowprimes[j++];
            }

            m = x.modInt(m);

            while (i < j) {
              if (m % lowprimes[i++] == 0) {
                return false;
              }
            }
          }

          return x.millerRabin(t);
        }; //#endregion PUBLIC
        //#region PROTECTED
        // BigInteger.prototype.copyTo = bnpCopyTo;
        // (protected) copy this to r


        BigInteger.prototype.copyTo = function (r) {
          for (var i = this.t - 1; i >= 0; --i) {
            r[i] = this[i];
          }

          r.t = this.t;
          r.s = this.s;
        }; // BigInteger.prototype.fromInt = bnpFromInt;
        // (protected) set from integer value x, -DV <= x < DV


        BigInteger.prototype.fromInt = function (x) {
          this.t = 1;
          this.s = x < 0 ? -1 : 0;

          if (x > 0) {
            this[0] = x;
          } else if (x < -1) {
            this[0] = x + this.DV;
          } else {
            this.t = 0;
          }
        }; // BigInteger.prototype.fromString = bnpFromString;
        // (protected) set from string and radix


        BigInteger.prototype.fromString = function (s, b) {
          var k;

          if (b == 16) {
            k = 4;
          } else if (b == 8) {
            k = 3;
          } else if (b == 256) {
            k = 8;
            /* byte array */
          } else if (b == 2) {
            k = 1;
          } else if (b == 32) {
            k = 5;
          } else if (b == 4) {
            k = 2;
          } else {
            this.fromRadix(s, b);
            return;
          }

          this.t = 0;
          this.s = 0;
          var i = s.length;
          var mi = false;
          var sh = 0;

          while (--i >= 0) {
            var x = k == 8 ? +s[i] & 0xff : intAt(s, i);

            if (x < 0) {
              if (s.charAt(i) == "-") {
                mi = true;
              }

              continue;
            }

            mi = false;

            if (sh == 0) {
              this[this.t++] = x;
            } else if (sh + k > this.DB) {
              this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
              this[this.t++] = x >> this.DB - sh;
            } else {
              this[this.t - 1] |= x << sh;
            }

            sh += k;

            if (sh >= this.DB) {
              sh -= this.DB;
            }
          }

          if (k == 8 && (+s[0] & 0x80) != 0) {
            this.s = -1;

            if (sh > 0) {
              this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
            }
          }

          this.clamp();

          if (mi) {
            BigInteger.ZERO.subTo(this, this);
          }
        }; // BigInteger.prototype.clamp = bnpClamp;
        // (protected) clamp off excess high words


        BigInteger.prototype.clamp = function () {
          var c = this.s & this.DM;

          while (this.t > 0 && this[this.t - 1] == c) {
            --this.t;
          }
        }; // BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
        // (protected) r = this << n*DB


        BigInteger.prototype.dlShiftTo = function (n, r) {
          var i;

          for (i = this.t - 1; i >= 0; --i) {
            r[i + n] = this[i];
          }

          for (i = n - 1; i >= 0; --i) {
            r[i] = 0;
          }

          r.t = this.t + n;
          r.s = this.s;
        }; // BigInteger.prototype.drShiftTo = bnpDRShiftTo;
        // (protected) r = this >> n*DB


        BigInteger.prototype.drShiftTo = function (n, r) {
          for (var i = n; i < this.t; ++i) {
            r[i - n] = this[i];
          }

          r.t = Math.max(this.t - n, 0);
          r.s = this.s;
        }; // BigInteger.prototype.lShiftTo = bnpLShiftTo;
        // (protected) r = this << n


        BigInteger.prototype.lShiftTo = function (n, r) {
          var bs = n % this.DB;
          var cbs = this.DB - bs;
          var bm = (1 << cbs) - 1;
          var ds = Math.floor(n / this.DB);
          var c = this.s << bs & this.DM;

          for (var i = this.t - 1; i >= 0; --i) {
            r[i + ds + 1] = this[i] >> cbs | c;
            c = (this[i] & bm) << bs;
          }

          for (var i = ds - 1; i >= 0; --i) {
            r[i] = 0;
          }

          r[ds] = c;
          r.t = this.t + ds + 1;
          r.s = this.s;
          r.clamp();
        }; // BigInteger.prototype.rShiftTo = bnpRShiftTo;
        // (protected) r = this >> n


        BigInteger.prototype.rShiftTo = function (n, r) {
          r.s = this.s;
          var ds = Math.floor(n / this.DB);

          if (ds >= this.t) {
            r.t = 0;
            return;
          }

          var bs = n % this.DB;
          var cbs = this.DB - bs;
          var bm = (1 << bs) - 1;
          r[0] = this[ds] >> bs;

          for (var i = ds + 1; i < this.t; ++i) {
            r[i - ds - 1] |= (this[i] & bm) << cbs;
            r[i - ds] = this[i] >> bs;
          }

          if (bs > 0) {
            r[this.t - ds - 1] |= (this.s & bm) << cbs;
          }

          r.t = this.t - ds;
          r.clamp();
        }; // BigInteger.prototype.subTo = bnpSubTo;
        // (protected) r = this - a


        BigInteger.prototype.subTo = function (a, r) {
          var i = 0;
          var c = 0;
          var m = Math.min(a.t, this.t);

          while (i < m) {
            c += this[i] - a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
          }

          if (a.t < this.t) {
            c -= a.s;

            while (i < this.t) {
              c += this[i];
              r[i++] = c & this.DM;
              c >>= this.DB;
            }

            c += this.s;
          } else {
            c += this.s;

            while (i < a.t) {
              c -= a[i];
              r[i++] = c & this.DM;
              c >>= this.DB;
            }

            c -= a.s;
          }

          r.s = c < 0 ? -1 : 0;

          if (c < -1) {
            r[i++] = this.DV + c;
          } else if (c > 0) {
            r[i++] = c;
          }

          r.t = i;
          r.clamp();
        }; // BigInteger.prototype.multiplyTo = bnpMultiplyTo;
        // (protected) r = this * a, r != this,a (HAC 14.12)
        // "this" should be the larger one if appropriate.


        BigInteger.prototype.multiplyTo = function (a, r) {
          var x = this.abs();
          var y = a.abs();
          var i = x.t;
          r.t = i + y.t;

          while (--i >= 0) {
            r[i] = 0;
          }

          for (i = 0; i < y.t; ++i) {
            r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
          }

          r.s = 0;
          r.clamp();

          if (this.s != a.s) {
            BigInteger.ZERO.subTo(r, r);
          }
        }; // BigInteger.prototype.squareTo = bnpSquareTo;
        // (protected) r = this^2, r != this (HAC 14.16)


        BigInteger.prototype.squareTo = function (r) {
          var x = this.abs();
          var i = r.t = 2 * x.t;

          while (--i >= 0) {
            r[i] = 0;
          }

          for (i = 0; i < x.t - 1; ++i) {
            var c = x.am(i, x[i], r, 2 * i, 0, 1);

            if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
              r[i + x.t] -= x.DV;
              r[i + x.t + 1] = 1;
            }
          }

          if (r.t > 0) {
            r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
          }

          r.s = 0;
          r.clamp();
        }; // BigInteger.prototype.divRemTo = bnpDivRemTo;
        // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
        // r != q, this != m.  q or r may be null.


        BigInteger.prototype.divRemTo = function (m, q, r) {
          var pm = m.abs();

          if (pm.t <= 0) {
            return;
          }

          var pt = this.abs();

          if (pt.t < pm.t) {
            if (q != null) {
              q.fromInt(0);
            }

            if (r != null) {
              this.copyTo(r);
            }

            return;
          }

          if (r == null) {
            r = nbi();
          }

          var y = nbi();
          var ts = this.s;
          var ms = m.s;
          var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus

          if (nsh > 0) {
            pm.lShiftTo(nsh, y);
            pt.lShiftTo(nsh, r);
          } else {
            pm.copyTo(y);
            pt.copyTo(r);
          }

          var ys = y.t;
          var y0 = y[ys - 1];

          if (y0 == 0) {
            return;
          }

          var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
          var d1 = this.FV / yt;
          var d2 = (1 << this.F1) / yt;
          var e = 1 << this.F2;
          var i = r.t;
          var j = i - ys;
          var t = q == null ? nbi() : q;
          y.dlShiftTo(j, t);

          if (r.compareTo(t) >= 0) {
            r[r.t++] = 1;
            r.subTo(t, r);
          }

          BigInteger.ONE.dlShiftTo(ys, t);
          t.subTo(y, y); // "negative" y so we can replace sub with am later

          while (y.t < ys) {
            y[y.t++] = 0;
          }

          while (--j >= 0) {
            // Estimate quotient digit
            var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);

            if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
              // Try it out
              y.dlShiftTo(j, t);
              r.subTo(t, r);

              while (r[i] < --qd) {
                r.subTo(t, r);
              }
            }
          }

          if (q != null) {
            r.drShiftTo(ys, q);

            if (ts != ms) {
              BigInteger.ZERO.subTo(q, q);
            }
          }

          r.t = ys;
          r.clamp();

          if (nsh > 0) {
            r.rShiftTo(nsh, r);
          } // Denormalize remainder


          if (ts < 0) {
            BigInteger.ZERO.subTo(r, r);
          }
        }; // BigInteger.prototype.invDigit = bnpInvDigit;
        // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
        // justification:
        //         xy == 1 (mod m)
        //         xy =  1+km
        //   xy(2-xy) = (1+km)(1-km)
        // x[y(2-xy)] = 1-k^2m^2
        // x[y(2-xy)] == 1 (mod m^2)
        // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
        // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
        // JS multiply "overflows" differently from C/C++, so care is needed here.


        BigInteger.prototype.invDigit = function () {
          if (this.t < 1) {
            return 0;
          }

          var x = this[0];

          if ((x & 1) == 0) {
            return 0;
          }

          var y = x & 3; // y == 1/x mod 2^2

          y = y * (2 - (x & 0xf) * y) & 0xf; // y == 1/x mod 2^4

          y = y * (2 - (x & 0xff) * y) & 0xff; // y == 1/x mod 2^8

          y = y * (2 - ((x & 0xffff) * y & 0xffff)) & 0xffff; // y == 1/x mod 2^16
          // last step - calculate inverse mod DV directly;
          // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints

          y = y * (2 - x * y % this.DV) % this.DV; // y == 1/x mod 2^dbits
          // we really want the negative inverse, and -DV < y < DV

          return y > 0 ? this.DV - y : -y;
        }; // BigInteger.prototype.isEven = bnpIsEven;
        // (protected) true iff this is even


        BigInteger.prototype.isEven = function () {
          return (this.t > 0 ? this[0] & 1 : this.s) == 0;
        }; // BigInteger.prototype.exp = bnpExp;
        // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)


        BigInteger.prototype.exp = function (e, z) {
          if (e > 0xffffffff || e < 1) {
            return BigInteger.ONE;
          }

          var r = nbi();
          var r2 = nbi();
          var g = z.convert(this);
          var i = nbits(e) - 1;
          g.copyTo(r);

          while (--i >= 0) {
            z.sqrTo(r, r2);

            if ((e & 1 << i) > 0) {
              z.mulTo(r2, g, r);
            } else {
              var t = r;
              r = r2;
              r2 = t;
            }
          }

          return z.revert(r);
        }; // BigInteger.prototype.chunkSize = bnpChunkSize;
        // (protected) return x s.t. r^x < DV


        BigInteger.prototype.chunkSize = function (r) {
          return Math.floor(Math.LN2 * this.DB / Math.log(r));
        }; // BigInteger.prototype.toRadix = bnpToRadix;
        // (protected) convert to radix string


        BigInteger.prototype.toRadix = function (b) {
          if (b == null) {
            b = 10;
          }

          if (this.signum() == 0 || b < 2 || b > 36) {
            return "0";
          }

          var cs = this.chunkSize(b);
          var a = Math.pow(b, cs);
          var d = nbv(a);
          var y = nbi();
          var z = nbi();
          var r = "";
          this.divRemTo(d, y, z);

          while (y.signum() > 0) {
            r = (a + z.intValue()).toString(b).substr(1) + r;
            y.divRemTo(d, y, z);
          }

          return z.intValue().toString(b) + r;
        }; // BigInteger.prototype.fromRadix = bnpFromRadix;
        // (protected) convert from radix string


        BigInteger.prototype.fromRadix = function (s, b) {
          this.fromInt(0);

          if (b == null) {
            b = 10;
          }

          var cs = this.chunkSize(b);
          var d = Math.pow(b, cs);
          var mi = false;
          var j = 0;
          var w = 0;

          for (var i = 0; i < s.length; ++i) {
            var x = intAt(s, i);

            if (x < 0) {
              if (s.charAt(i) == "-" && this.signum() == 0) {
                mi = true;
              }

              continue;
            }

            w = b * w + x;

            if (++j >= cs) {
              this.dMultiply(d);
              this.dAddOffset(w, 0);
              j = 0;
              w = 0;
            }
          }

          if (j > 0) {
            this.dMultiply(Math.pow(b, j));
            this.dAddOffset(w, 0);
          }

          if (mi) {
            BigInteger.ZERO.subTo(this, this);
          }
        }; // BigInteger.prototype.fromNumber = bnpFromNumber;
        // (protected) alternate constructor


        BigInteger.prototype.fromNumber = function (a, b, c) {
          if ("number" == typeof b) {
            // new BigInteger(int,int,RNG)
            if (a < 2) {
              this.fromInt(1);
            } else {
              this.fromNumber(a, c);

              if (!this.testBit(a - 1)) {
                // force MSB set
                this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
              }

              if (this.isEven()) {
                this.dAddOffset(1, 0);
              } // force odd


              while (!this.isProbablePrime(b)) {
                this.dAddOffset(2, 0);

                if (this.bitLength() > a) {
                  this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
                }
              }
            }
          } else {
            // new BigInteger(int,RNG)
            var x = [];
            var t = a & 7;
            x.length = (a >> 3) + 1;
            b.nextBytes(x);

            if (t > 0) {
              x[0] &= (1 << t) - 1;
            } else {
              x[0] = 0;
            }

            this.fromString(x, 256);
          }
        }; // BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
        // (protected) r = this op a (bitwise)


        BigInteger.prototype.bitwiseTo = function (a, op, r) {
          var i;
          var f;
          var m = Math.min(a.t, this.t);

          for (i = 0; i < m; ++i) {
            r[i] = op(this[i], a[i]);
          }

          if (a.t < this.t) {
            f = a.s & this.DM;

            for (i = m; i < this.t; ++i) {
              r[i] = op(this[i], f);
            }

            r.t = this.t;
          } else {
            f = this.s & this.DM;

            for (i = m; i < a.t; ++i) {
              r[i] = op(f, a[i]);
            }

            r.t = a.t;
          }

          r.s = op(this.s, a.s);
          r.clamp();
        }; // BigInteger.prototype.changeBit = bnpChangeBit;
        // (protected) this op (1<<n)


        BigInteger.prototype.changeBit = function (n, op) {
          var r = BigInteger.ONE.shiftLeft(n);
          this.bitwiseTo(r, op, r);
          return r;
        }; // BigInteger.prototype.addTo = bnpAddTo;
        // (protected) r = this + a


        BigInteger.prototype.addTo = function (a, r) {
          var i = 0;
          var c = 0;
          var m = Math.min(a.t, this.t);

          while (i < m) {
            c += this[i] + a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
          }

          if (a.t < this.t) {
            c += a.s;

            while (i < this.t) {
              c += this[i];
              r[i++] = c & this.DM;
              c >>= this.DB;
            }

            c += this.s;
          } else {
            c += this.s;

            while (i < a.t) {
              c += a[i];
              r[i++] = c & this.DM;
              c >>= this.DB;
            }

            c += a.s;
          }

          r.s = c < 0 ? -1 : 0;

          if (c > 0) {
            r[i++] = c;
          } else if (c < -1) {
            r[i++] = this.DV + c;
          }

          r.t = i;
          r.clamp();
        }; // BigInteger.prototype.dMultiply = bnpDMultiply;
        // (protected) this *= n, this >= 0, 1 < n < DV


        BigInteger.prototype.dMultiply = function (n) {
          this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
          ++this.t;
          this.clamp();
        }; // BigInteger.prototype.dAddOffset = bnpDAddOffset;
        // (protected) this += n << w words, this >= 0


        BigInteger.prototype.dAddOffset = function (n, w) {
          if (n == 0) {
            return;
          }

          while (this.t <= w) {
            this[this.t++] = 0;
          }

          this[w] += n;

          while (this[w] >= this.DV) {
            this[w] -= this.DV;

            if (++w >= this.t) {
              this[this.t++] = 0;
            }

            ++this[w];
          }
        }; // BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
        // (protected) r = lower n words of "this * a", a.t <= n
        // "this" should be the larger one if appropriate.


        BigInteger.prototype.multiplyLowerTo = function (a, n, r) {
          var i = Math.min(this.t + a.t, n);
          r.s = 0; // assumes a,this >= 0

          r.t = i;

          while (i > 0) {
            r[--i] = 0;
          }

          for (var j = r.t - this.t; i < j; ++i) {
            r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
          }

          for (var j = Math.min(a.t, n); i < j; ++i) {
            this.am(0, a[i], r, i, 0, n - i);
          }

          r.clamp();
        }; // BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
        // (protected) r = "this * a" without lower n words, n > 0
        // "this" should be the larger one if appropriate.


        BigInteger.prototype.multiplyUpperTo = function (a, n, r) {
          --n;
          var i = r.t = this.t + a.t - n;
          r.s = 0; // assumes a,this >= 0

          while (--i >= 0) {
            r[i] = 0;
          }

          for (i = Math.max(n - this.t, 0); i < a.t; ++i) {
            r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
          }

          r.clamp();
          r.drShiftTo(1, r);
        }; // BigInteger.prototype.modInt = bnpModInt;
        // (protected) this % n, n < 2^26


        BigInteger.prototype.modInt = function (n) {
          if (n <= 0) {
            return 0;
          }

          var d = this.DV % n;
          var r = this.s < 0 ? n - 1 : 0;

          if (this.t > 0) {
            if (d == 0) {
              r = this[0] % n;
            } else {
              for (var i = this.t - 1; i >= 0; --i) {
                r = (d * r + this[i]) % n;
              }
            }
          }

          return r;
        }; // BigInteger.prototype.millerRabin = bnpMillerRabin;
        // (protected) true if probably prime (HAC 4.24, Miller-Rabin)


        BigInteger.prototype.millerRabin = function (t) {
          var n1 = this.subtract(BigInteger.ONE);
          var k = n1.getLowestSetBit();

          if (k <= 0) {
            return false;
          }

          var r = n1.shiftRight(k);
          t = t + 1 >> 1;

          if (t > lowprimes.length) {
            t = lowprimes.length;
          }

          var a = nbi();

          for (var i = 0; i < t; ++i) {
            // Pick bases at random, instead of starting at 2
            a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
            var y = a.modPow(r, this);

            if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
              var j = 1;

              while (j++ < k && y.compareTo(n1) != 0) {
                y = y.modPowInt(2, this);

                if (y.compareTo(BigInteger.ONE) == 0) {
                  return false;
                }
              }

              if (y.compareTo(n1) != 0) {
                return false;
              }
            }
          }

          return true;
        }; // BigInteger.prototype.square = bnSquare;
        // (public) this^2


        BigInteger.prototype.square = function () {
          var r = nbi();
          this.squareTo(r);
          return r;
        }; //#region ASYNC
        // Public API method


        BigInteger.prototype.gcda = function (a, callback) {
          var x = this.s < 0 ? this.negate() : this.clone();
          var y = a.s < 0 ? a.negate() : a.clone();

          if (x.compareTo(y) < 0) {
            var t = x;
            x = y;
            y = t;
          }

          var i = x.getLowestSetBit();
          var g = y.getLowestSetBit();

          if (g < 0) {
            callback(x);
            return;
          }

          if (i < g) {
            g = i;
          }

          if (g > 0) {
            x.rShiftTo(g, x);
            y.rShiftTo(g, y);
          } // Workhorse of the algorithm, gets called 200 - 800 times per 512 bit keygen.


          var gcda1 = function gcda1() {
            if ((i = x.getLowestSetBit()) > 0) {
              x.rShiftTo(i, x);
            }

            if ((i = y.getLowestSetBit()) > 0) {
              y.rShiftTo(i, y);
            }

            if (x.compareTo(y) >= 0) {
              x.subTo(y, x);
              x.rShiftTo(1, x);
            } else {
              y.subTo(x, y);
              y.rShiftTo(1, y);
            }

            if (!(x.signum() > 0)) {
              if (g > 0) {
                y.lShiftTo(g, y);
              }

              setTimeout(function () {
                callback(y);
              }, 0); // escape
            } else {
              setTimeout(gcda1, 0);
            }
          };

          setTimeout(gcda1, 10);
        }; // (protected) alternate constructor


        BigInteger.prototype.fromNumberAsync = function (a, b, c, callback) {
          if ("number" == typeof b) {
            if (a < 2) {
              this.fromInt(1);
            } else {
              this.fromNumber(a, c);

              if (!this.testBit(a - 1)) {
                this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
              }

              if (this.isEven()) {
                this.dAddOffset(1, 0);
              }

              var bnp_1 = this;

              var bnpfn1_1 = function bnpfn1_1() {
                bnp_1.dAddOffset(2, 0);

                if (bnp_1.bitLength() > a) {
                  bnp_1.subTo(BigInteger.ONE.shiftLeft(a - 1), bnp_1);
                }

                if (bnp_1.isProbablePrime(b)) {
                  setTimeout(function () {
                    callback();
                  }, 0); // escape
                } else {
                  setTimeout(bnpfn1_1, 0);
                }
              };

              setTimeout(bnpfn1_1, 0);
            }
          } else {
            var x = [];
            var t = a & 7;
            x.length = (a >> 3) + 1;
            b.nextBytes(x);

            if (t > 0) {
              x[0] &= (1 << t) - 1;
            } else {
              x[0] = 0;
            }

            this.fromString(x, 256);
          }
        };

        return BigInteger;
      }(); //#region REDUCERS
      //#region NullExp


      var NullExp =
      /** @class */
      function () {
        function NullExp() {} // NullExp.prototype.convert = nNop;


        NullExp.prototype.convert = function (x) {
          return x;
        }; // NullExp.prototype.revert = nNop;


        NullExp.prototype.revert = function (x) {
          return x;
        }; // NullExp.prototype.mulTo = nMulTo;


        NullExp.prototype.mulTo = function (x, y, r) {
          x.multiplyTo(y, r);
        }; // NullExp.prototype.sqrTo = nSqrTo;


        NullExp.prototype.sqrTo = function (x, r) {
          x.squareTo(r);
        };

        return NullExp;
      }(); // Modular reduction using "classic" algorithm


      var Classic =
      /** @class */
      function () {
        function Classic(m) {
          this.m = m;
        } // Classic.prototype.convert = cConvert;


        Classic.prototype.convert = function (x) {
          if (x.s < 0 || x.compareTo(this.m) >= 0) {
            return x.mod(this.m);
          } else {
            return x;
          }
        }; // Classic.prototype.revert = cRevert;


        Classic.prototype.revert = function (x) {
          return x;
        }; // Classic.prototype.reduce = cReduce;


        Classic.prototype.reduce = function (x) {
          x.divRemTo(this.m, null, x);
        }; // Classic.prototype.mulTo = cMulTo;


        Classic.prototype.mulTo = function (x, y, r) {
          x.multiplyTo(y, r);
          this.reduce(r);
        }; // Classic.prototype.sqrTo = cSqrTo;


        Classic.prototype.sqrTo = function (x, r) {
          x.squareTo(r);
          this.reduce(r);
        };

        return Classic;
      }(); //#endregion
      //#region Montgomery
      // Montgomery reduction


      var Montgomery =
      /** @class */
      function () {
        function Montgomery(m) {
          this.m = m;
          this.mp = m.invDigit();
          this.mpl = this.mp & 0x7fff;
          this.mph = this.mp >> 15;
          this.um = (1 << m.DB - 15) - 1;
          this.mt2 = 2 * m.t;
        } // Montgomery.prototype.convert = montConvert;
        // xR mod m


        Montgomery.prototype.convert = function (x) {
          var r = nbi();
          x.abs().dlShiftTo(this.m.t, r);
          r.divRemTo(this.m, null, r);

          if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
            this.m.subTo(r, r);
          }

          return r;
        }; // Montgomery.prototype.revert = montRevert;
        // x/R mod m


        Montgomery.prototype.revert = function (x) {
          var r = nbi();
          x.copyTo(r);
          this.reduce(r);
          return r;
        }; // Montgomery.prototype.reduce = montReduce;
        // x = x/R mod m (HAC 14.32)


        Montgomery.prototype.reduce = function (x) {
          while (x.t <= this.mt2) {
            // pad x so am has enough room later
            x[x.t++] = 0;
          }

          for (var i = 0; i < this.m.t; ++i) {
            // faster way of calculating u0 = x[i]*mp mod DV
            var j = x[i] & 0x7fff;
            var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM; // use am to combine the multiply-shift-add into one call

            j = i + this.m.t;
            x[j] += this.m.am(0, u0, x, i, 0, this.m.t); // propagate carry

            while (x[j] >= x.DV) {
              x[j] -= x.DV;
              x[++j]++;
            }
          }

          x.clamp();
          x.drShiftTo(this.m.t, x);

          if (x.compareTo(this.m) >= 0) {
            x.subTo(this.m, x);
          }
        }; // Montgomery.prototype.mulTo = montMulTo;
        // r = "xy/R mod m"; x,y != r


        Montgomery.prototype.mulTo = function (x, y, r) {
          x.multiplyTo(y, r);
          this.reduce(r);
        }; // Montgomery.prototype.sqrTo = montSqrTo;
        // r = "x^2/R mod m"; x != r


        Montgomery.prototype.sqrTo = function (x, r) {
          x.squareTo(r);
          this.reduce(r);
        };

        return Montgomery;
      }(); //#endregion Montgomery
      //#region Barrett
      // Barrett modular reduction


      var Barrett =
      /** @class */
      function () {
        function Barrett(m) {
          this.m = m; // setup Barrett

          this.r2 = nbi();
          this.q3 = nbi();
          BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
          this.mu = this.r2.divide(m);
        } // Barrett.prototype.convert = barrettConvert;


        Barrett.prototype.convert = function (x) {
          if (x.s < 0 || x.t > 2 * this.m.t) {
            return x.mod(this.m);
          } else if (x.compareTo(this.m) < 0) {
            return x;
          } else {
            var r = nbi();
            x.copyTo(r);
            this.reduce(r);
            return r;
          }
        }; // Barrett.prototype.revert = barrettRevert;


        Barrett.prototype.revert = function (x) {
          return x;
        }; // Barrett.prototype.reduce = barrettReduce;
        // x = x mod m (HAC 14.42)


        Barrett.prototype.reduce = function (x) {
          x.drShiftTo(this.m.t - 1, this.r2);

          if (x.t > this.m.t + 1) {
            x.t = this.m.t + 1;
            x.clamp();
          }

          this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
          this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);

          while (x.compareTo(this.r2) < 0) {
            x.dAddOffset(1, this.m.t + 1);
          }

          x.subTo(this.r2, x);

          while (x.compareTo(this.m) >= 0) {
            x.subTo(this.m, x);
          }
        }; // Barrett.prototype.mulTo = barrettMulTo;
        // r = x*y mod m; x,y != r


        Barrett.prototype.mulTo = function (x, y, r) {
          x.multiplyTo(y, r);
          this.reduce(r);
        }; // Barrett.prototype.sqrTo = barrettSqrTo;
        // r = x^2 mod m; x != r


        Barrett.prototype.sqrTo = function (x, r) {
          x.squareTo(r);
          this.reduce(r);
        };

        return Barrett;
      }(); //#endregion
      //#endregion REDUCERS
      // return new, unset BigInteger


      function nbi() {
        return new BigInteger(null);
      }

      function parseBigInt(str, r) {
        return new BigInteger(str, r);
      } // am: Compute w_j += (x*this_i), propagate carries,
      // c is initial carry, returns final carry.
      // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
      // We need to select the fastest one that works in this environment.
      // am1: use a single mult and divide to get the high bits,
      // max digit bits should be 26 because
      // max internal value = 2*dvalue^2-2*dvalue (< 2^53)


      function am1(i, x, w, j, c, n) {
        while (--n >= 0) {
          var v = x * this[i++] + w[j] + c;
          c = Math.floor(v / 0x4000000);
          w[j++] = v & 0x3ffffff;
        }

        return c;
      } // am2 avoids a big mult-and-extract completely.
      // Max digit bits should be <= 30 because we do bitwise ops
      // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)


      function am2(i, x, w, j, c, n) {
        var xl = x & 0x7fff;
        var xh = x >> 15;

        while (--n >= 0) {
          var l = this[i] & 0x7fff;
          var h = this[i++] >> 15;
          var m = xh * l + h * xl;
          l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
          c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
          w[j++] = l & 0x3fffffff;
        }

        return c;
      } // Alternately, set max digit bits to 28 since some
      // browsers slow down when dealing with 32-bit numbers.


      function am3(i, x, w, j, c, n) {
        var xl = x & 0x3fff;
        var xh = x >> 14;

        while (--n >= 0) {
          var l = this[i] & 0x3fff;
          var h = this[i++] >> 14;
          var m = xh * l + h * xl;
          l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
          c = (l >> 28) + (m >> 14) + xh * h;
          w[j++] = l & 0xfffffff;
        }

        return c;
      }

      if ( navigator.appName == "Microsoft Internet Explorer") {
        BigInteger.prototype.am = am2;
        dbits = 30;
      } else if ( navigator.appName != "Netscape") {
        BigInteger.prototype.am = am1;
        dbits = 26;
      } else {
        // Mozilla/Netscape seems to prefer am3
        BigInteger.prototype.am = am3;
        dbits = 28;
      }

      BigInteger.prototype.DB = dbits;
      BigInteger.prototype.DM = (1 << dbits) - 1;
      BigInteger.prototype.DV = 1 << dbits;
      var BI_FP = 52;
      BigInteger.prototype.FV = Math.pow(2, BI_FP);
      BigInteger.prototype.F1 = BI_FP - dbits;
      BigInteger.prototype.F2 = 2 * dbits - BI_FP; // Digit conversions

      var BI_RC = [];
      var rr;
      var vv;
      rr = "0".charCodeAt(0);

      for (vv = 0; vv <= 9; ++vv) {
        BI_RC[rr++] = vv;
      }

      rr = "a".charCodeAt(0);

      for (vv = 10; vv < 36; ++vv) {
        BI_RC[rr++] = vv;
      }

      rr = "A".charCodeAt(0);

      for (vv = 10; vv < 36; ++vv) {
        BI_RC[rr++] = vv;
      }

      function intAt(s, i) {
        var c = BI_RC[s.charCodeAt(i)];
        return c == null ? -1 : c;
      } // return bigint initialized to value


      function nbv(i) {
        var r = nbi();
        r.fromInt(i);
        return r;
      } // returns bit length of the integer x


      function nbits(x) {
        var r = 1;
        var t;

        if ((t = x >>> 16) != 0) {
          x = t;
          r += 16;
        }

        if ((t = x >> 8) != 0) {
          x = t;
          r += 8;
        }

        if ((t = x >> 4) != 0) {
          x = t;
          r += 4;
        }

        if ((t = x >> 2) != 0) {
          x = t;
          r += 2;
        }

        if ((t = x >> 1) != 0) {
          x = t;
          r += 1;
        }

        return r;
      } // "constants"


      BigInteger.ZERO = nbv(0);
      BigInteger.ONE = nbv(1); // prng4.js - uses Arcfour as a PRNG

      var Arcfour =
      /** @class */
      function () {
        function Arcfour() {
          this.i = 0;
          this.j = 0;
          this.S = [];
        } // Arcfour.prototype.init = ARC4init;
        // Initialize arcfour context from key, an array of ints, each from [0..255]


        Arcfour.prototype.init = function (key) {
          var i;
          var j;
          var t;

          for (i = 0; i < 256; ++i) {
            this.S[i] = i;
          }

          j = 0;

          for (i = 0; i < 256; ++i) {
            j = j + this.S[i] + key[i % key.length] & 255;
            t = this.S[i];
            this.S[i] = this.S[j];
            this.S[j] = t;
          }

          this.i = 0;
          this.j = 0;
        }; // Arcfour.prototype.next = ARC4next;


        Arcfour.prototype.next = function () {
          var t;
          this.i = this.i + 1 & 255;
          this.j = this.j + this.S[this.i] & 255;
          t = this.S[this.i];
          this.S[this.i] = this.S[this.j];
          this.S[this.j] = t;
          return this.S[t + this.S[this.i] & 255];
        };

        return Arcfour;
      }(); // Plug in your RNG constructor here


      function prng_newstate() {
        return new Arcfour();
      } // Pool size must be a multiple of 4 and greater than 32.
      // An array of bytes the size of the pool will be passed to init()


      var rng_psize = 256; // Random number generator - requires a PRNG backend, e.g. prng4.js

      var rng_state;
      var rng_pool = null;
      var rng_pptr; // Initialize the pool with junk if needed.

      if (rng_pool == null) {
        rng_pool = [];
        rng_pptr = 0;
        var t = void 0;

        if (window.crypto && window.crypto.getRandomValues) {
          // Extract entropy (2048 bits) from RNG if available
          var z = new Uint32Array(256);
          window.crypto.getRandomValues(z);

          for (t = 0; t < z.length; ++t) {
            rng_pool[rng_pptr++] = z[t] & 255;
          }
        } // Use mouse events for entropy, if we do not have enough entropy by the time
        // we need it, entropy will be generated by Math.random.


        var onMouseMoveListener_1 = function onMouseMoveListener_1(ev) {
          this.count = this.count || 0;

          if (this.count >= 256 || rng_pptr >= rng_psize) {
            if (window.removeEventListener) {
              window.removeEventListener("mousemove", onMouseMoveListener_1, false);
            } else if (window.detachEvent) {
              window.detachEvent("onmousemove", onMouseMoveListener_1);
            }

            return;
          }

          try {
            var mouseCoordinates = ev.x + ev.y;
            rng_pool[rng_pptr++] = mouseCoordinates & 255;
            this.count += 1;
          } catch (e) {// Sometimes Firefox will deny permission to access event properties for some reason. Ignore.
          }
        };

        if (window.addEventListener) {
          window.addEventListener("mousemove", onMouseMoveListener_1, false);
        } else if (window.attachEvent) {
          window.attachEvent("onmousemove", onMouseMoveListener_1);
        }
      }

      function rng_get_byte() {
        if (rng_state == null) {
          rng_state = prng_newstate(); // At this point, we may not have collected enough entropy.  If not, fall back to Math.random

          while (rng_pptr < rng_psize) {
            var random = Math.floor(65536 * Math.random());
            rng_pool[rng_pptr++] = random & 255;
          }

          rng_state.init(rng_pool);

          for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
            rng_pool[rng_pptr] = 0;
          }

          rng_pptr = 0;
        } // TODO: allow reseeding after first request


        return rng_state.next();
      }

      var SecureRandom =
      /** @class */
      function () {
        function SecureRandom() {}

        SecureRandom.prototype.nextBytes = function (ba) {
          for (var i = 0; i < ba.length; ++i) {
            ba[i] = rng_get_byte();
          }
        };

        return SecureRandom;
      }(); // Depends on jsbn.js and rng.js
      // function linebrk(s,n) {
      //   var ret = "";
      //   var i = 0;
      //   while(i + n < s.length) {
      //     ret += s.substring(i,i+n) + "\n";
      //     i += n;
      //   }
      //   return ret + s.substring(i,s.length);
      // }
      // function byte2Hex(b) {
      //   if(b < 0x10)
      //     return "0" + b.toString(16);
      //   else
      //     return b.toString(16);
      // }


      function pkcs1pad1(s, n) {
        if (n < s.length + 22) {
          console.error("Message too long for RSA");
          return null;
        }

        var len = n - s.length - 6;
        var filler = "";

        for (var f = 0; f < len; f += 2) {
          filler += "ff";
        }

        var m = "0001" + filler + "00" + s;
        return parseBigInt(m, 16);
      } // PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint


      function pkcs1pad2(s, n) {
        if (n < s.length + 11) {
          // TODO: fix for utf-8
          console.error("Message too long for RSA");
          return null;
        }

        var ba = [];
        var i = s.length - 1;

        while (i >= 0 && n > 0) {
          var c = s.charCodeAt(i--);

          if (c < 128) {
            // encode using utf-8
            ba[--n] = c;
          } else if (c > 127 && c < 2048) {
            ba[--n] = c & 63 | 128;
            ba[--n] = c >> 6 | 192;
          } else {
            ba[--n] = c & 63 | 128;
            ba[--n] = c >> 6 & 63 | 128;
            ba[--n] = c >> 12 | 224;
          }
        }

        ba[--n] = 0;
        var rng = new SecureRandom();
        var x = [];

        while (n > 2) {
          // random non-zero pad
          x[0] = 0;

          while (x[0] == 0) {
            rng.nextBytes(x);
          }

          ba[--n] = x[0];
        }

        ba[--n] = 2;
        ba[--n] = 0;
        return new BigInteger(ba);
      } // "empty" RSA key constructor


      var RSAKey =
      /** @class */
      function () {
        function RSAKey() {
          this.n = null;
          this.e = 0;
          this.d = null;
          this.p = null;
          this.q = null;
          this.dmp1 = null;
          this.dmq1 = null;
          this.coeff = null;
        } //#region PROTECTED
        // protected
        // RSAKey.prototype.doPublic = RSADoPublic;
        // Perform raw public operation on "x": return x^e (mod n)


        RSAKey.prototype.doPublic = function (x) {
          return x.modPowInt(this.e, this.n);
        }; // RSAKey.prototype.doPrivate = RSADoPrivate;
        // Perform raw private operation on "x": return x^d (mod n)


        RSAKey.prototype.doPrivate = function (x) {
          if (this.p == null || this.q == null) {
            return x.modPow(this.d, this.n);
          } // TODO: re-calculate any missing CRT params


          var xp = x.mod(this.p).modPow(this.dmp1, this.p);
          var xq = x.mod(this.q).modPow(this.dmq1, this.q);

          while (xp.compareTo(xq) < 0) {
            xp = xp.add(this.p);
          }

          return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
        }; //#endregion PROTECTED
        //#region PUBLIC
        // RSAKey.prototype.setPublic = RSASetPublic;
        // Set the public key fields N and e from hex strings


        RSAKey.prototype.setPublic = function (N, E) {
          if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
          } else {
            console.error("Invalid RSA public key");
          }
        }; // RSAKey.prototype.encrypt = RSAEncrypt;
        // Return the PKCS#1 RSA encryption of "text" as an even-length hex string


        RSAKey.prototype.encrypt = function (text) {
          var m = pkcs1pad2(text, this.n.bitLength() + 7 >> 3);

          if (m == null) {
            return null;
          }

          var c = this.doPublic(m);

          if (c == null) {
            return null;
          }

          var h = c.toString(16);

          if ((h.length & 1) == 0) {
            return h;
          } else {
            return "0" + h;
          }
        }; // RSAKey.prototype.setPrivate = RSASetPrivate;
        // Set the private key fields N, e, and d from hex strings


        RSAKey.prototype.setPrivate = function (N, E, D) {
          if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
            this.d = parseBigInt(D, 16);
          } else {
            console.error("Invalid RSA private key");
          }
        }; // RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
        // Set the private key fields N, e, d and CRT params from hex strings


        RSAKey.prototype.setPrivateEx = function (N, E, D, P, Q, DP, DQ, C) {
          if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
            this.d = parseBigInt(D, 16);
            this.p = parseBigInt(P, 16);
            this.q = parseBigInt(Q, 16);
            this.dmp1 = parseBigInt(DP, 16);
            this.dmq1 = parseBigInt(DQ, 16);
            this.coeff = parseBigInt(C, 16);
          } else {
            console.error("Invalid RSA private key");
          }
        }; // RSAKey.prototype.generate = RSAGenerate;
        // Generate a new random private key B bits long, using public expt E


        RSAKey.prototype.generate = function (B, E) {
          var rng = new SecureRandom();
          var qs = B >> 1;
          this.e = parseInt(E, 16);
          var ee = new BigInteger(E, 16);

          for (;;) {
            for (;;) {
              this.p = new BigInteger(B - qs, 1, rng);

              if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
                break;
              }
            }

            for (;;) {
              this.q = new BigInteger(qs, 1, rng);

              if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
                break;
              }
            }

            if (this.p.compareTo(this.q) <= 0) {
              var t = this.p;
              this.p = this.q;
              this.q = t;
            }

            var p1 = this.p.subtract(BigInteger.ONE);
            var q1 = this.q.subtract(BigInteger.ONE);
            var phi = p1.multiply(q1);

            if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
              this.n = this.p.multiply(this.q);
              this.d = ee.modInverse(phi);
              this.dmp1 = this.d.mod(p1);
              this.dmq1 = this.d.mod(q1);
              this.coeff = this.q.modInverse(this.p);
              break;
            }
          }
        }; // RSAKey.prototype.decrypt = RSADecrypt;
        // Return the PKCS#1 RSA decryption of "ctext".
        // "ctext" is an even-length hex string and the output is a plain string.


        RSAKey.prototype.decrypt = function (ctext) {
          var c = parseBigInt(ctext, 16);
          var m = this.doPrivate(c);

          if (m == null) {
            return null;
          }

          return pkcs1unpad2(m, this.n.bitLength() + 7 >> 3);
        }; // Generate a new random private key B bits long, using public expt E


        RSAKey.prototype.generateAsync = function (B, E, callback) {
          var rng = new SecureRandom();
          var qs = B >> 1;
          this.e = parseInt(E, 16);
          var ee = new BigInteger(E, 16);
          var rsa = this; // These functions have non-descript names because they were originally for(;;) loops.
          // I don't know about cryptography to give them better names than loop1-4.

          var loop1 = function loop1() {
            var loop4 = function loop4() {
              if (rsa.p.compareTo(rsa.q) <= 0) {
                var t = rsa.p;
                rsa.p = rsa.q;
                rsa.q = t;
              }

              var p1 = rsa.p.subtract(BigInteger.ONE);
              var q1 = rsa.q.subtract(BigInteger.ONE);
              var phi = p1.multiply(q1);

              if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
                rsa.n = rsa.p.multiply(rsa.q);
                rsa.d = ee.modInverse(phi);
                rsa.dmp1 = rsa.d.mod(p1);
                rsa.dmq1 = rsa.d.mod(q1);
                rsa.coeff = rsa.q.modInverse(rsa.p);
                setTimeout(function () {
                  callback();
                }, 0); // escape
              } else {
                setTimeout(loop1, 0);
              }
            };

            var loop3 = function loop3() {
              rsa.q = nbi();
              rsa.q.fromNumberAsync(qs, 1, rng, function () {
                rsa.q.subtract(BigInteger.ONE).gcda(ee, function (r) {
                  if (r.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                    setTimeout(loop4, 0);
                  } else {
                    setTimeout(loop3, 0);
                  }
                });
              });
            };

            var loop2 = function loop2() {
              rsa.p = nbi();
              rsa.p.fromNumberAsync(B - qs, 1, rng, function () {
                rsa.p.subtract(BigInteger.ONE).gcda(ee, function (r) {
                  if (r.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
                    setTimeout(loop3, 0);
                  } else {
                    setTimeout(loop2, 0);
                  }
                });
              });
            };

            setTimeout(loop2, 0);
          };

          setTimeout(loop1, 0);
        };

        RSAKey.prototype.sign = function (text, digestMethod, digestName) {
          var header = getDigestHeader(digestName);
          var digest = header + digestMethod(text).toString();
          var m = pkcs1pad1(digest, this.n.bitLength() / 4);

          if (m == null) {
            return null;
          }

          var c = this.doPrivate(m);

          if (c == null) {
            return null;
          }

          var h = c.toString(16);

          if ((h.length & 1) == 0) {
            return h;
          } else {
            return "0" + h;
          }
        };

        RSAKey.prototype.verify = function (text, signature, digestMethod) {
          var c = parseBigInt(signature, 16);
          var m = this.doPublic(c);

          if (m == null) {
            return null;
          }

          var unpadded = m.toString(16).replace(/^1f+00/, "");
          var digest = removeDigestHeader(unpadded);
          return digest == digestMethod(text).toString();
        };

        return RSAKey;
      }(); // Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext


      function pkcs1unpad2(d, n) {
        var b = d.toByteArray();
        var i = 0;

        while (i < b.length && b[i] == 0) {
          ++i;
        }

        if (b.length - i != n - 1 || b[i] != 2) {
          return null;
        }

        ++i;

        while (b[i] != 0) {
          if (++i >= b.length) {
            return null;
          }
        }

        var ret = "";

        while (++i < b.length) {
          var c = b[i] & 255;

          if (c < 128) {
            // utf-8 decode
            ret += String.fromCharCode(c);
          } else if (c > 191 && c < 224) {
            ret += String.fromCharCode((c & 31) << 6 | b[i + 1] & 63);
            ++i;
          } else {
            ret += String.fromCharCode((c & 15) << 12 | (b[i + 1] & 63) << 6 | b[i + 2] & 63);
            i += 2;
          }
        }

        return ret;
      } // https://tools.ietf.org/html/rfc3447#page-43


      var DIGEST_HEADERS = {
        md2: "3020300c06082a864886f70d020205000410",
        md5: "3020300c06082a864886f70d020505000410",
        sha1: "3021300906052b0e03021a05000414",
        sha224: "302d300d06096086480165030402040500041c",
        sha256: "3031300d060960864801650304020105000420",
        sha384: "3041300d060960864801650304020205000430",
        sha512: "3051300d060960864801650304020305000440",
        ripemd160: "3021300906052b2403020105000414"
      };

      function getDigestHeader(name) {
        return DIGEST_HEADERS[name] || "";
      }

      function removeDigestHeader(str) {
        for (var name_1 in DIGEST_HEADERS) {
          if (DIGEST_HEADERS.hasOwnProperty(name_1)) {
            var header = DIGEST_HEADERS[name_1];
            var len = header.length;

            if (str.substr(0, len) == header) {
              return str.substr(len);
            }
          }
        }

        return str;
      } // Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
      // function RSAEncryptB64(text) {
      //  var h = this.encrypt(text);
      //  if(h) return hex2b64(h); else return null;
      // }
      // public
      // RSAKey.prototype.encrypt_b64 = RSAEncryptB64;

      /*!
      Copyright (c) 2011, Yahoo! Inc. All rights reserved.
      Code licensed under the BSD License:
      http://developer.yahoo.com/yui/license.html
      version: 2.9.0
      */


      var YAHOO = {};
      YAHOO.lang = {
        /**
         * Utility to set up the prototype, constructor and superclass properties to
         * support an inheritance strategy that can chain constructors and methods.
         * Static members will not be inherited.
         *
         * @method extend
         * @static
         * @param {Function} subc   the object to modify
         * @param {Function} superc the object to inherit
         * @param {Object} overrides  additional properties/methods to add to the
         *                              subclass prototype.  These will override the
         *                              matching items obtained from the superclass
         *                              if present.
         */
        extend: function extend(subc, superc, overrides) {
          if (!superc || !subc) {
            throw new Error("YAHOO.lang.extend failed, please check that " + "all dependencies are included.");
          }

          var F = function F() {};

          F.prototype = superc.prototype;
          subc.prototype = new F();
          subc.prototype.constructor = subc;
          subc.superclass = superc.prototype;

          if (superc.prototype.constructor == Object.prototype.constructor) {
            superc.prototype.constructor = superc;
          }

          if (overrides) {
            var i;

            for (i in overrides) {
              subc.prototype[i] = overrides[i];
            }
            /*
             * IE will not enumerate native functions in a derived object even if the
             * function was overridden.  This is a workaround for specific functions
             * we care about on the Object prototype.
             * @property _IEEnumFix
             * @param {Function} r  the object to receive the augmentation
             * @param {Function} s  the object that supplies the properties to augment
             * @static
             * @private
             */


            var _IEEnumFix = function _IEEnumFix() {},
                ADD = ["toString", "valueOf"];

            try {
              if (/MSIE/.test(navigator.userAgent)) {
                _IEEnumFix = function _IEEnumFix(r, s) {
                  for (i = 0; i < ADD.length; i = i + 1) {
                    var fname = ADD[i],
                        f = s[fname];

                    if (typeof f === 'function' && f != Object.prototype[fname]) {
                      r[fname] = f;
                    }
                  }
                };
              }
            } catch (ex) {}

            _IEEnumFix(subc.prototype, overrides);
          }
        }
      };
      /* asn1-1.0.13.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
       */

      /**
       * @fileOverview
       * @name asn1-1.0.js
       * @author Kenji Urushima kenji.urushima@gmail.com
       * @version asn1 1.0.13 (2017-Jun-02)
       * @since jsrsasign 2.1
       * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
       */

      /**
       * kjur's class library name space
       * <p>
       * This name space provides following name spaces:
       * <ul>
       * <li>{@link KJUR.asn1} - ASN.1 primitive hexadecimal encoder</li>
       * <li>{@link KJUR.asn1.x509} - ASN.1 structure for X.509 certificate and CRL</li>
       * <li>{@link KJUR.crypto} - Java Cryptographic Extension(JCE) style MessageDigest/Signature
       * class and utilities</li>
       * </ul>
       * </p>
       * NOTE: Please ignore method summary and document of this namespace. This caused by a bug of jsdoc2.
       * @name KJUR
       * @namespace kjur's class library name space
       */

      var KJUR = {};
      /**
       * kjur's ASN.1 class library name space
       * <p>
       * This is ITU-T X.690 ASN.1 DER encoder class library and
       * class structure and methods is very similar to
       * org.bouncycastle.asn1 package of
       * well known BouncyCaslte Cryptography Library.
       * <h4>PROVIDING ASN.1 PRIMITIVES</h4>
       * Here are ASN.1 DER primitive classes.
       * <ul>
       * <li>0x01 {@link KJUR.asn1.DERBoolean}</li>
       * <li>0x02 {@link KJUR.asn1.DERInteger}</li>
       * <li>0x03 {@link KJUR.asn1.DERBitString}</li>
       * <li>0x04 {@link KJUR.asn1.DEROctetString}</li>
       * <li>0x05 {@link KJUR.asn1.DERNull}</li>
       * <li>0x06 {@link KJUR.asn1.DERObjectIdentifier}</li>
       * <li>0x0a {@link KJUR.asn1.DEREnumerated}</li>
       * <li>0x0c {@link KJUR.asn1.DERUTF8String}</li>
       * <li>0x12 {@link KJUR.asn1.DERNumericString}</li>
       * <li>0x13 {@link KJUR.asn1.DERPrintableString}</li>
       * <li>0x14 {@link KJUR.asn1.DERTeletexString}</li>
       * <li>0x16 {@link KJUR.asn1.DERIA5String}</li>
       * <li>0x17 {@link KJUR.asn1.DERUTCTime}</li>
       * <li>0x18 {@link KJUR.asn1.DERGeneralizedTime}</li>
       * <li>0x30 {@link KJUR.asn1.DERSequence}</li>
       * <li>0x31 {@link KJUR.asn1.DERSet}</li>
       * </ul>
       * <h4>OTHER ASN.1 CLASSES</h4>
       * <ul>
       * <li>{@link KJUR.asn1.ASN1Object}</li>
       * <li>{@link KJUR.asn1.DERAbstractString}</li>
       * <li>{@link KJUR.asn1.DERAbstractTime}</li>
       * <li>{@link KJUR.asn1.DERAbstractStructured}</li>
       * <li>{@link KJUR.asn1.DERTaggedObject}</li>
       * </ul>
       * <h4>SUB NAME SPACES</h4>
       * <ul>
       * <li>{@link KJUR.asn1.cades} - CAdES long term signature format</li>
       * <li>{@link KJUR.asn1.cms} - Cryptographic Message Syntax</li>
       * <li>{@link KJUR.asn1.csr} - Certificate Signing Request (CSR/PKCS#10)</li>
       * <li>{@link KJUR.asn1.tsp} - RFC 3161 Timestamping Protocol Format</li>
       * <li>{@link KJUR.asn1.x509} - RFC 5280 X.509 certificate and CRL</li>
       * </ul>
       * </p>
       * NOTE: Please ignore method summary and document of this namespace.
       * This caused by a bug of jsdoc2.
       * @name KJUR.asn1
       * @namespace
       */

      if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) KJUR.asn1 = {};
      /**
       * ASN1 utilities class
       * @name KJUR.asn1.ASN1Util
       * @class ASN1 utilities class
       * @since asn1 1.0.2
       */

      KJUR.asn1.ASN1Util = new function () {
        this.integerToByteHex = function (i) {
          var h = i.toString(16);
          if (h.length % 2 == 1) h = '0' + h;
          return h;
        };

        this.bigIntToMinTwosComplementsHex = function (bigIntegerValue) {
          var h = bigIntegerValue.toString(16);

          if (h.substr(0, 1) != '-') {
            if (h.length % 2 == 1) {
              h = '0' + h;
            } else {
              if (!h.match(/^[0-7]/)) {
                h = '00' + h;
              }
            }
          } else {
            var hPos = h.substr(1);
            var xorLen = hPos.length;

            if (xorLen % 2 == 1) {
              xorLen += 1;
            } else {
              if (!h.match(/^[0-7]/)) {
                xorLen += 2;
              }
            }

            var hMask = '';

            for (var i = 0; i < xorLen; i++) {
              hMask += 'f';
            }

            var biMask = new BigInteger(hMask, 16);
            var biNeg = biMask.xor(bigIntegerValue).add(BigInteger.ONE);
            h = biNeg.toString(16).replace(/^-/, '');
          }

          return h;
        };
        /**
         * get PEM string from hexadecimal data and header string
         * @name getPEMStringFromHex
         * @memberOf KJUR.asn1.ASN1Util
         * @function
         * @param {String} dataHex hexadecimal string of PEM body
         * @param {String} pemHeader PEM header string (ex. 'RSA PRIVATE KEY')
         * @return {String} PEM formatted string of input data
         * @description
         * This method converts a hexadecimal string to a PEM string with
         * a specified header. Its line break will be CRLF("\r\n").
         * @example
         * var pem  = KJUR.asn1.ASN1Util.getPEMStringFromHex('616161', 'RSA PRIVATE KEY');
         * // value of pem will be:
         * -----BEGIN PRIVATE KEY-----
         * YWFh
         * -----END PRIVATE KEY-----
         */


        this.getPEMStringFromHex = function (dataHex, pemHeader) {
          return hextopem(dataHex, pemHeader);
        };
        /**
         * generate ASN1Object specifed by JSON parameters
         * @name newObject
         * @memberOf KJUR.asn1.ASN1Util
         * @function
         * @param {Array} param JSON parameter to generate ASN1Object
         * @return {KJUR.asn1.ASN1Object} generated object
         * @since asn1 1.0.3
         * @description
         * generate any ASN1Object specified by JSON param
         * including ASN.1 primitive or structured.
         * Generally 'param' can be described as follows:
         * <blockquote>
         * {TYPE-OF-ASNOBJ: ASN1OBJ-PARAMETER}
         * </blockquote>
         * 'TYPE-OF-ASN1OBJ' can be one of following symbols:
         * <ul>
         * <li>'bool' - DERBoolean</li>
         * <li>'int' - DERInteger</li>
         * <li>'bitstr' - DERBitString</li>
         * <li>'octstr' - DEROctetString</li>
         * <li>'null' - DERNull</li>
         * <li>'oid' - DERObjectIdentifier</li>
         * <li>'enum' - DEREnumerated</li>
         * <li>'utf8str' - DERUTF8String</li>
         * <li>'numstr' - DERNumericString</li>
         * <li>'prnstr' - DERPrintableString</li>
         * <li>'telstr' - DERTeletexString</li>
         * <li>'ia5str' - DERIA5String</li>
         * <li>'utctime' - DERUTCTime</li>
         * <li>'gentime' - DERGeneralizedTime</li>
         * <li>'seq' - DERSequence</li>
         * <li>'set' - DERSet</li>
         * <li>'tag' - DERTaggedObject</li>
         * </ul>
         * @example
         * newObject({'prnstr': 'aaa'});
         * newObject({'seq': [{'int': 3}, {'prnstr': 'aaa'}]})
         * // ASN.1 Tagged Object
         * newObject({'tag': {'tag': 'a1',
         *                    'explicit': true,
         *                    'obj': {'seq': [{'int': 3}, {'prnstr': 'aaa'}]}}});
         * // more simple representation of ASN.1 Tagged Object
         * newObject({'tag': ['a1',
         *                    true,
         *                    {'seq': [
         *                      {'int': 3},
         *                      {'prnstr': 'aaa'}]}
         *                   ]});
         */


        this.newObject = function (param) {
          var _KJUR = KJUR,
              _KJUR_asn1 = _KJUR.asn1,
              _DERBoolean = _KJUR_asn1.DERBoolean,
              _DERInteger = _KJUR_asn1.DERInteger,
              _DERBitString = _KJUR_asn1.DERBitString,
              _DEROctetString = _KJUR_asn1.DEROctetString,
              _DERNull = _KJUR_asn1.DERNull,
              _DERObjectIdentifier = _KJUR_asn1.DERObjectIdentifier,
              _DEREnumerated = _KJUR_asn1.DEREnumerated,
              _DERUTF8String = _KJUR_asn1.DERUTF8String,
              _DERNumericString = _KJUR_asn1.DERNumericString,
              _DERPrintableString = _KJUR_asn1.DERPrintableString,
              _DERTeletexString = _KJUR_asn1.DERTeletexString,
              _DERIA5String = _KJUR_asn1.DERIA5String,
              _DERUTCTime = _KJUR_asn1.DERUTCTime,
              _DERGeneralizedTime = _KJUR_asn1.DERGeneralizedTime,
              _DERSequence = _KJUR_asn1.DERSequence,
              _DERSet = _KJUR_asn1.DERSet,
              _DERTaggedObject = _KJUR_asn1.DERTaggedObject,
              _newObject = _KJUR_asn1.ASN1Util.newObject;
          var keys = Object.keys(param);
          if (keys.length != 1) throw "key of param shall be only one.";
          var key = keys[0];
          if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + key + ":") == -1) throw "undefined key: " + key;
          if (key == "bool") return new _DERBoolean(param[key]);
          if (key == "int") return new _DERInteger(param[key]);
          if (key == "bitstr") return new _DERBitString(param[key]);
          if (key == "octstr") return new _DEROctetString(param[key]);
          if (key == "null") return new _DERNull(param[key]);
          if (key == "oid") return new _DERObjectIdentifier(param[key]);
          if (key == "enum") return new _DEREnumerated(param[key]);
          if (key == "utf8str") return new _DERUTF8String(param[key]);
          if (key == "numstr") return new _DERNumericString(param[key]);
          if (key == "prnstr") return new _DERPrintableString(param[key]);
          if (key == "telstr") return new _DERTeletexString(param[key]);
          if (key == "ia5str") return new _DERIA5String(param[key]);
          if (key == "utctime") return new _DERUTCTime(param[key]);
          if (key == "gentime") return new _DERGeneralizedTime(param[key]);

          if (key == "seq") {
            var paramList = param[key];
            var a = [];

            for (var i = 0; i < paramList.length; i++) {
              var asn1Obj = _newObject(paramList[i]);

              a.push(asn1Obj);
            }

            return new _DERSequence({
              'array': a
            });
          }

          if (key == "set") {
            var paramList = param[key];
            var a = [];

            for (var i = 0; i < paramList.length; i++) {
              var asn1Obj = _newObject(paramList[i]);

              a.push(asn1Obj);
            }

            return new _DERSet({
              'array': a
            });
          }

          if (key == "tag") {
            var tagParam = param[key];

            if (Object.prototype.toString.call(tagParam) === '[object Array]' && tagParam.length == 3) {
              var obj = _newObject(tagParam[2]);

              return new _DERTaggedObject({
                tag: tagParam[0],
                explicit: tagParam[1],
                obj: obj
              });
            } else {
              var newParam = {};
              if (tagParam.explicit !== undefined) newParam.explicit = tagParam.explicit;
              if (tagParam.tag !== undefined) newParam.tag = tagParam.tag;
              if (tagParam.obj === undefined) throw "obj shall be specified for 'tag'.";
              newParam.obj = _newObject(tagParam.obj);
              return new _DERTaggedObject(newParam);
            }
          }
        };
        /**
         * get encoded hexadecimal string of ASN1Object specifed by JSON parameters
         * @name jsonToASN1HEX
         * @memberOf KJUR.asn1.ASN1Util
         * @function
         * @param {Array} param JSON parameter to generate ASN1Object
         * @return hexadecimal string of ASN1Object
         * @since asn1 1.0.4
         * @description
         * As for ASN.1 object representation of JSON object,
         * please see {@link newObject}.
         * @example
         * jsonToASN1HEX({'prnstr': 'aaa'});
         */


        this.jsonToASN1HEX = function (param) {
          var asn1Obj = this.newObject(param);
          return asn1Obj.getEncodedHex();
        };
      }();
      /**
       * get dot noted oid number string from hexadecimal value of OID
       * @name oidHexToInt
       * @memberOf KJUR.asn1.ASN1Util
       * @function
       * @param {String} hex hexadecimal value of object identifier
       * @return {String} dot noted string of object identifier
       * @since jsrsasign 4.8.3 asn1 1.0.7
       * @description
       * This static method converts from hexadecimal string representation of
       * ASN.1 value of object identifier to oid number string.
       * @example
       * KJUR.asn1.ASN1Util.oidHexToInt('550406') &rarr; "2.5.4.6"
       */

      KJUR.asn1.ASN1Util.oidHexToInt = function (hex) {
        var s = "";
        var i01 = parseInt(hex.substr(0, 2), 16);
        var i0 = Math.floor(i01 / 40);
        var i1 = i01 % 40;
        var s = i0 + "." + i1;
        var binbuf = "";

        for (var i = 2; i < hex.length; i += 2) {
          var value = parseInt(hex.substr(i, 2), 16);
          var bin = ("00000000" + value.toString(2)).slice(-8);
          binbuf = binbuf + bin.substr(1, 7);

          if (bin.substr(0, 1) == "0") {
            var bi = new BigInteger(binbuf, 2);
            s = s + "." + bi.toString(10);
            binbuf = "";
          }
        }

        return s;
      };
      /**
       * get hexadecimal value of object identifier from dot noted oid value
       * @name oidIntToHex
       * @memberOf KJUR.asn1.ASN1Util
       * @function
       * @param {String} oidString dot noted string of object identifier
       * @return {String} hexadecimal value of object identifier
       * @since jsrsasign 4.8.3 asn1 1.0.7
       * @description
       * This static method converts from object identifier value string.
       * to hexadecimal string representation of it.
       * @example
       * KJUR.asn1.ASN1Util.oidIntToHex("2.5.4.6") &rarr; "550406"
       */


      KJUR.asn1.ASN1Util.oidIntToHex = function (oidString) {
        var itox = function itox(i) {
          var h = i.toString(16);
          if (h.length == 1) h = '0' + h;
          return h;
        };

        var roidtox = function roidtox(roid) {
          var h = '';
          var bi = new BigInteger(roid, 10);
          var b = bi.toString(2);
          var padLen = 7 - b.length % 7;
          if (padLen == 7) padLen = 0;
          var bPad = '';

          for (var i = 0; i < padLen; i++) {
            bPad += '0';
          }

          b = bPad + b;

          for (var i = 0; i < b.length - 1; i += 7) {
            var b8 = b.substr(i, 7);
            if (i != b.length - 7) b8 = '1' + b8;
            h += itox(parseInt(b8, 2));
          }

          return h;
        };

        if (!oidString.match(/^[0-9.]+$/)) {
          throw "malformed oid string: " + oidString;
        }

        var h = '';
        var a = oidString.split('.');
        var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
        h += itox(i0);
        a.splice(0, 2);

        for (var i = 0; i < a.length; i++) {
          h += roidtox(a[i]);
        }

        return h;
      }; // ********************************************************************
      //  Abstract ASN.1 Classes
      // ********************************************************************
      // ********************************************************************

      /**
       * base class for ASN.1 DER encoder object
       * @name KJUR.asn1.ASN1Object
       * @class base class for ASN.1 DER encoder object
       * @property {Boolean} isModified flag whether internal data was changed
       * @property {String} hTLV hexadecimal string of ASN.1 TLV
       * @property {String} hT hexadecimal string of ASN.1 TLV tag(T)
       * @property {String} hL hexadecimal string of ASN.1 TLV length(L)
       * @property {String} hV hexadecimal string of ASN.1 TLV value(V)
       * @description
       */


      KJUR.asn1.ASN1Object = function () {
        var hV = '';
        /**
         * get hexadecimal ASN.1 TLV length(L) bytes from TLV value(V)
         * @name getLengthHexFromValue
         * @memberOf KJUR.asn1.ASN1Object#
         * @function
         * @return {String} hexadecimal string of ASN.1 TLV length(L)
         */

        this.getLengthHexFromValue = function () {
          if (typeof this.hV == "undefined" || this.hV == null) {
            throw "this.hV is null or undefined.";
          }

          if (this.hV.length % 2 == 1) {
            throw "value hex must be even length: n=" + hV.length + ",v=" + this.hV;
          }

          var n = this.hV.length / 2;
          var hN = n.toString(16);

          if (hN.length % 2 == 1) {
            hN = "0" + hN;
          }

          if (n < 128) {
            return hN;
          } else {
            var hNlen = hN.length / 2;

            if (hNlen > 15) {
              throw "ASN.1 length too long to represent by 8x: n = " + n.toString(16);
            }

            var head = 128 + hNlen;
            return head.toString(16) + hN;
          }
        };
        /**
         * get hexadecimal string of ASN.1 TLV bytes
         * @name getEncodedHex
         * @memberOf KJUR.asn1.ASN1Object#
         * @function
         * @return {String} hexadecimal string of ASN.1 TLV
         */


        this.getEncodedHex = function () {
          if (this.hTLV == null || this.isModified) {
            this.hV = this.getFreshValueHex();
            this.hL = this.getLengthHexFromValue();
            this.hTLV = this.hT + this.hL + this.hV;
            this.isModified = false; //alert("first time: " + this.hTLV);
          }

          return this.hTLV;
        };
        /**
         * get hexadecimal string of ASN.1 TLV value(V) bytes
         * @name getValueHex
         * @memberOf KJUR.asn1.ASN1Object#
         * @function
         * @return {String} hexadecimal string of ASN.1 TLV value(V) bytes
         */


        this.getValueHex = function () {
          this.getEncodedHex();
          return this.hV;
        };

        this.getFreshValueHex = function () {
          return '';
        };
      }; // == BEGIN DERAbstractString ================================================

      /**
       * base class for ASN.1 DER string classes
       * @name KJUR.asn1.DERAbstractString
       * @class base class for ASN.1 DER string classes
       * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
       * @property {String} s internal string of value
       * @extends KJUR.asn1.ASN1Object
       * @description
       * <br/>
       * As for argument 'params' for constructor, you can specify one of
       * following properties:
       * <ul>
       * <li>str - specify initial ASN.1 value(V) by a string</li>
       * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
       * </ul>
       * NOTE: 'params' can be omitted.
       */


      KJUR.asn1.DERAbstractString = function (params) {
        KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
        /**
         * get string value of this string object
         * @name getString
         * @memberOf KJUR.asn1.DERAbstractString#
         * @function
         * @return {String} string value of this string object
         */

        this.getString = function () {
          return this.s;
        };
        /**
         * set value by a string
         * @name setString
         * @memberOf KJUR.asn1.DERAbstractString#
         * @function
         * @param {String} newS value by a string to set
         */


        this.setString = function (newS) {
          this.hTLV = null;
          this.isModified = true;
          this.s = newS;
          this.hV = stohex(this.s);
        };
        /**
         * set value by a hexadecimal string
         * @name setStringHex
         * @memberOf KJUR.asn1.DERAbstractString#
         * @function
         * @param {String} newHexString value by a hexadecimal string to set
         */


        this.setStringHex = function (newHexString) {
          this.hTLV = null;
          this.isModified = true;
          this.s = null;
          this.hV = newHexString;
        };

        this.getFreshValueHex = function () {
          return this.hV;
        };

        if (typeof params != "undefined") {
          if (typeof params == "string") {
            this.setString(params);
          } else if (typeof params['str'] != "undefined") {
            this.setString(params['str']);
          } else if (typeof params['hex'] != "undefined") {
            this.setStringHex(params['hex']);
          }
        }
      };

      YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object); // == END   DERAbstractString ================================================
      // == BEGIN DERAbstractTime ==================================================

      /**
       * base class for ASN.1 DER Generalized/UTCTime class
       * @name KJUR.asn1.DERAbstractTime
       * @class base class for ASN.1 DER Generalized/UTCTime class
       * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
       * @extends KJUR.asn1.ASN1Object
       * @description
       * @see KJUR.asn1.ASN1Object - superclass
       */

      KJUR.asn1.DERAbstractTime = function (params) {
        KJUR.asn1.DERAbstractTime.superclass.constructor.call(this); // --- PRIVATE METHODS --------------------

        this.localDateToUTC = function (d) {
          utc = d.getTime() + d.getTimezoneOffset() * 60000;
          var utcDate = new Date(utc);
          return utcDate;
        };
        /*
         * format date string by Data object
         * @name formatDate
         * @memberOf KJUR.asn1.AbstractTime;
         * @param {Date} dateObject
         * @param {string} type 'utc' or 'gen'
         * @param {boolean} withMillis flag for with millisections or not
         * @description
         * 'withMillis' flag is supported from asn1 1.0.6.
         */


        this.formatDate = function (dateObject, type, withMillis) {
          var pad = this.zeroPadding;
          var d = this.localDateToUTC(dateObject);
          var year = String(d.getFullYear());
          if (type == 'utc') year = year.substr(2, 2);
          var month = pad(String(d.getMonth() + 1), 2);
          var day = pad(String(d.getDate()), 2);
          var hour = pad(String(d.getHours()), 2);
          var min = pad(String(d.getMinutes()), 2);
          var sec = pad(String(d.getSeconds()), 2);
          var s = year + month + day + hour + min + sec;

          if (withMillis === true) {
            var millis = d.getMilliseconds();

            if (millis != 0) {
              var sMillis = pad(String(millis), 3);
              sMillis = sMillis.replace(/[0]+$/, "");
              s = s + "." + sMillis;
            }
          }

          return s + "Z";
        };

        this.zeroPadding = function (s, len) {
          if (s.length >= len) return s;
          return new Array(len - s.length + 1).join('0') + s;
        }; // --- PUBLIC METHODS --------------------

        /**
         * get string value of this string object
         * @name getString
         * @memberOf KJUR.asn1.DERAbstractTime#
         * @function
         * @return {String} string value of this time object
         */


        this.getString = function () {
          return this.s;
        };
        /**
         * set value by a string
         * @name setString
         * @memberOf KJUR.asn1.DERAbstractTime#
         * @function
         * @param {String} newS value by a string to set such like "130430235959Z"
         */


        this.setString = function (newS) {
          this.hTLV = null;
          this.isModified = true;
          this.s = newS;
          this.hV = stohex(newS);
        };
        /**
         * set value by a Date object
         * @name setByDateValue
         * @memberOf KJUR.asn1.DERAbstractTime#
         * @function
         * @param {Integer} year year of date (ex. 2013)
         * @param {Integer} month month of date between 1 and 12 (ex. 12)
         * @param {Integer} day day of month
         * @param {Integer} hour hours of date
         * @param {Integer} min minutes of date
         * @param {Integer} sec seconds of date
         */


        this.setByDateValue = function (year, month, day, hour, min, sec) {
          var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));
          this.setByDate(dateObject);
        };

        this.getFreshValueHex = function () {
          return this.hV;
        };
      };

      YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object); // == END   DERAbstractTime ==================================================
      // == BEGIN DERAbstractStructured ============================================

      /**
       * base class for ASN.1 DER structured class
       * @name KJUR.asn1.DERAbstractStructured
       * @class base class for ASN.1 DER structured class
       * @property {Array} asn1Array internal array of ASN1Object
       * @extends KJUR.asn1.ASN1Object
       * @description
       * @see KJUR.asn1.ASN1Object - superclass
       */

      KJUR.asn1.DERAbstractStructured = function (params) {
        KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
        /**
         * set value by array of ASN1Object
         * @name setByASN1ObjectArray
         * @memberOf KJUR.asn1.DERAbstractStructured#
         * @function
         * @param {array} asn1ObjectArray array of ASN1Object to set
         */

        this.setByASN1ObjectArray = function (asn1ObjectArray) {
          this.hTLV = null;
          this.isModified = true;
          this.asn1Array = asn1ObjectArray;
        };
        /**
         * append an ASN1Object to internal array
         * @name appendASN1Object
         * @memberOf KJUR.asn1.DERAbstractStructured#
         * @function
         * @param {ASN1Object} asn1Object to add
         */


        this.appendASN1Object = function (asn1Object) {
          this.hTLV = null;
          this.isModified = true;
          this.asn1Array.push(asn1Object);
        };

        this.asn1Array = new Array();

        if (typeof params != "undefined") {
          if (typeof params['array'] != "undefined") {
            this.asn1Array = params['array'];
          }
        }
      };

      YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object); // ********************************************************************
      //  ASN.1 Object Classes
      // ********************************************************************
      // ********************************************************************

      /**
       * class for ASN.1 DER Boolean
       * @name KJUR.asn1.DERBoolean
       * @class class for ASN.1 DER Boolean
       * @extends KJUR.asn1.ASN1Object
       * @description
       * @see KJUR.asn1.ASN1Object - superclass
       */

      KJUR.asn1.DERBoolean = function () {
        KJUR.asn1.DERBoolean.superclass.constructor.call(this);
        this.hT = "01";
        this.hTLV = "0101ff";
      };

      YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object); // ********************************************************************

      /**
       * class for ASN.1 DER Integer
       * @name KJUR.asn1.DERInteger
       * @class class for ASN.1 DER Integer
       * @extends KJUR.asn1.ASN1Object
       * @description
       * <br/>
       * As for argument 'params' for constructor, you can specify one of
       * following properties:
       * <ul>
       * <li>int - specify initial ASN.1 value(V) by integer value</li>
       * <li>bigint - specify initial ASN.1 value(V) by BigInteger object</li>
       * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
       * </ul>
       * NOTE: 'params' can be omitted.
       */

      KJUR.asn1.DERInteger = function (params) {
        KJUR.asn1.DERInteger.superclass.constructor.call(this);
        this.hT = "02";
        /**
         * set value by Tom Wu's BigInteger object
         * @name setByBigInteger
         * @memberOf KJUR.asn1.DERInteger#
         * @function
         * @param {BigInteger} bigIntegerValue to set
         */

        this.setByBigInteger = function (bigIntegerValue) {
          this.hTLV = null;
          this.isModified = true;
          this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
        };
        /**
         * set value by integer value
         * @name setByInteger
         * @memberOf KJUR.asn1.DERInteger
         * @function
         * @param {Integer} integer value to set
         */


        this.setByInteger = function (intValue) {
          var bi = new BigInteger(String(intValue), 10);
          this.setByBigInteger(bi);
        };
        /**
         * set value by integer value
         * @name setValueHex
         * @memberOf KJUR.asn1.DERInteger#
         * @function
         * @param {String} hexadecimal string of integer value
         * @description
         * <br/>
         * NOTE: Value shall be represented by minimum octet length of
         * two's complement representation.
         * @example
         * new KJUR.asn1.DERInteger(123);
         * new KJUR.asn1.DERInteger({'int': 123});
         * new KJUR.asn1.DERInteger({'hex': '1fad'});
         */


        this.setValueHex = function (newHexString) {
          this.hV = newHexString;
        };

        this.getFreshValueHex = function () {
          return this.hV;
        };

        if (typeof params != "undefined") {
          if (typeof params['bigint'] != "undefined") {
            this.setByBigInteger(params['bigint']);
          } else if (typeof params['int'] != "undefined") {
            this.setByInteger(params['int']);
          } else if (typeof params == "number") {
            this.setByInteger(params);
          } else if (typeof params['hex'] != "undefined") {
            this.setValueHex(params['hex']);
          }
        }
      };

      YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object); // ********************************************************************

      /**
       * class for ASN.1 DER encoded BitString primitive
       * @name KJUR.asn1.DERBitString
       * @class class for ASN.1 DER encoded BitString primitive
       * @extends KJUR.asn1.ASN1Object
       * @description
       * <br/>
       * As for argument 'params' for constructor, you can specify one of
       * following properties:
       * <ul>
       * <li>bin - specify binary string (ex. '10111')</li>
       * <li>array - specify array of boolean (ex. [true,false,true,true])</li>
       * <li>hex - specify hexadecimal string of ASN.1 value(V) including unused bits</li>
       * <li>obj - specify {@link KJUR.asn1.ASN1Util.newObject}
       * argument for "BitString encapsulates" structure.</li>
       * </ul>
       * NOTE1: 'params' can be omitted.<br/>
       * NOTE2: 'obj' parameter have been supported since
       * asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).<br/>
       * @example
       * // default constructor
       * o = new KJUR.asn1.DERBitString();
       * // initialize with binary string
       * o = new KJUR.asn1.DERBitString({bin: "1011"});
       * // initialize with boolean array
       * o = new KJUR.asn1.DERBitString({array: [true,false,true,true]});
       * // initialize with hexadecimal string (04 is unused bits)
       * o = new KJUR.asn1.DEROctetString({hex: "04bac0"});
       * // initialize with ASN1Util.newObject argument for encapsulated
       * o = new KJUR.asn1.DERBitString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});
       * // above generates a ASN.1 data like this:
       * // BIT STRING, encapsulates {
       * //   SEQUENCE {
       * //     INTEGER 3
       * //     PrintableString 'aaa'
       * //     }
       * //   }
       */

      KJUR.asn1.DERBitString = function (params) {
        if (params !== undefined && typeof params.obj !== "undefined") {
          var o = KJUR.asn1.ASN1Util.newObject(params.obj);
          params.hex = "00" + o.getEncodedHex();
        }

        KJUR.asn1.DERBitString.superclass.constructor.call(this);
        this.hT = "03";
        /**
         * set ASN.1 value(V) by a hexadecimal string including unused bits
         * @name setHexValueIncludingUnusedBits
         * @memberOf KJUR.asn1.DERBitString#
         * @function
         * @param {String} newHexStringIncludingUnusedBits
         */

        this.setHexValueIncludingUnusedBits = function (newHexStringIncludingUnusedBits) {
          this.hTLV = null;
          this.isModified = true;
          this.hV = newHexStringIncludingUnusedBits;
        };
        /**
         * set ASN.1 value(V) by unused bit and hexadecimal string of value
         * @name setUnusedBitsAndHexValue
         * @memberOf KJUR.asn1.DERBitString#
         * @function
         * @param {Integer} unusedBits
         * @param {String} hValue
         */


        this.setUnusedBitsAndHexValue = function (unusedBits, hValue) {
          if (unusedBits < 0 || 7 < unusedBits) {
            throw "unused bits shall be from 0 to 7: u = " + unusedBits;
          }

          var hUnusedBits = "0" + unusedBits;
          this.hTLV = null;
          this.isModified = true;
          this.hV = hUnusedBits + hValue;
        };
        /**
         * set ASN.1 DER BitString by binary string<br/>
         * @name setByBinaryString
         * @memberOf KJUR.asn1.DERBitString#
         * @function
         * @param {String} binaryString binary value string (i.e. '10111')
         * @description
         * Its unused bits will be calculated automatically by length of
         * 'binaryValue'. <br/>
         * NOTE: Trailing zeros '0' will be ignored.
         * @example
         * o = new KJUR.asn1.DERBitString();
         * o.setByBooleanArray("01011");
         */


        this.setByBinaryString = function (binaryString) {
          binaryString = binaryString.replace(/0+$/, '');
          var unusedBits = 8 - binaryString.length % 8;
          if (unusedBits == 8) unusedBits = 0;

          for (var i = 0; i <= unusedBits; i++) {
            binaryString += '0';
          }

          var h = '';

          for (var i = 0; i < binaryString.length - 1; i += 8) {
            var b = binaryString.substr(i, 8);
            var x = parseInt(b, 2).toString(16);
            if (x.length == 1) x = '0' + x;
            h += x;
          }

          this.hTLV = null;
          this.isModified = true;
          this.hV = '0' + unusedBits + h;
        };
        /**
         * set ASN.1 TLV value(V) by an array of boolean<br/>
         * @name setByBooleanArray
         * @memberOf KJUR.asn1.DERBitString#
         * @function
         * @param {array} booleanArray array of boolean (ex. [true, false, true])
         * @description
         * NOTE: Trailing falses will be ignored in the ASN.1 DER Object.
         * @example
         * o = new KJUR.asn1.DERBitString();
         * o.setByBooleanArray([false, true, false, true, true]);
         */


        this.setByBooleanArray = function (booleanArray) {
          var s = '';

          for (var i = 0; i < booleanArray.length; i++) {
            if (booleanArray[i] == true) {
              s += '1';
            } else {
              s += '0';
            }
          }

          this.setByBinaryString(s);
        };
        /**
         * generate an array of falses with specified length<br/>
         * @name newFalseArray
         * @memberOf KJUR.asn1.DERBitString
         * @function
         * @param {Integer} nLength length of array to generate
         * @return {array} array of boolean falses
         * @description
         * This static method may be useful to initialize boolean array.
         * @example
         * o = new KJUR.asn1.DERBitString();
         * o.newFalseArray(3) &rarr; [false, false, false]
         */


        this.newFalseArray = function (nLength) {
          var a = new Array(nLength);

          for (var i = 0; i < nLength; i++) {
            a[i] = false;
          }

          return a;
        };

        this.getFreshValueHex = function () {
          return this.hV;
        };

        if (typeof params != "undefined") {
          if (typeof params == "string" && params.toLowerCase().match(/^[0-9a-f]+$/)) {
            this.setHexValueIncludingUnusedBits(params);
          } else if (typeof params['hex'] != "undefined") {
            this.setHexValueIncludingUnusedBits(params['hex']);
          } else if (typeof params['bin'] != "undefined") {
            this.setByBinaryString(params['bin']);
          } else if (typeof params['array'] != "undefined") {
            this.setByBooleanArray(params['array']);
          }
        }
      };

      YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object); // ********************************************************************

      /**
       * class for ASN.1 DER OctetString<br/>
       * @name KJUR.asn1.DEROctetString
       * @class class for ASN.1 DER OctetString
       * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
       * @extends KJUR.asn1.DERAbstractString
       * @description
       * This class provides ASN.1 OctetString simple type.<br/>
       * Supported "params" attributes are:
       * <ul>
       * <li>str - to set a string as a value</li>
       * <li>hex - to set a hexadecimal string as a value</li>
       * <li>obj - to set a encapsulated ASN.1 value by JSON object
       * which is defined in {@link KJUR.asn1.ASN1Util.newObject}</li>
       * </ul>
       * NOTE: A parameter 'obj' have been supported
       * for "OCTET STRING, encapsulates" structure.
       * since asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).
       * @see KJUR.asn1.DERAbstractString - superclass
       * @example
       * // default constructor
       * o = new KJUR.asn1.DEROctetString();
       * // initialize with string
       * o = new KJUR.asn1.DEROctetString({str: "aaa"});
       * // initialize with hexadecimal string
       * o = new KJUR.asn1.DEROctetString({hex: "616161"});
       * // initialize with ASN1Util.newObject argument
       * o = new KJUR.asn1.DEROctetString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});
       * // above generates a ASN.1 data like this:
       * // OCTET STRING, encapsulates {
       * //   SEQUENCE {
       * //     INTEGER 3
       * //     PrintableString 'aaa'
       * //     }
       * //   }
       */

      KJUR.asn1.DEROctetString = function (params) {
        if (params !== undefined && typeof params.obj !== "undefined") {
          var o = KJUR.asn1.ASN1Util.newObject(params.obj);
          params.hex = o.getEncodedHex();
        }

        KJUR.asn1.DEROctetString.superclass.constructor.call(this, params);
        this.hT = "04";
      };

      YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString); // ********************************************************************

      /**
       * class for ASN.1 DER Null
       * @name KJUR.asn1.DERNull
       * @class class for ASN.1 DER Null
       * @extends KJUR.asn1.ASN1Object
       * @description
       * @see KJUR.asn1.ASN1Object - superclass
       */

      KJUR.asn1.DERNull = function () {
        KJUR.asn1.DERNull.superclass.constructor.call(this);
        this.hT = "05";
        this.hTLV = "0500";
      };

      YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object); // ********************************************************************

      /**
       * class for ASN.1 DER ObjectIdentifier
       * @name KJUR.asn1.DERObjectIdentifier
       * @class class for ASN.1 DER ObjectIdentifier
       * @param {Array} params associative array of parameters (ex. {'oid': '2.5.4.5'})
       * @extends KJUR.asn1.ASN1Object
       * @description
       * <br/>
       * As for argument 'params' for constructor, you can specify one of
       * following properties:
       * <ul>
       * <li>oid - specify initial ASN.1 value(V) by a oid string (ex. 2.5.4.13)</li>
       * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
       * </ul>
       * NOTE: 'params' can be omitted.
       */

      KJUR.asn1.DERObjectIdentifier = function (params) {
        var itox = function itox(i) {
          var h = i.toString(16);
          if (h.length == 1) h = '0' + h;
          return h;
        };

        var roidtox = function roidtox(roid) {
          var h = '';
          var bi = new BigInteger(roid, 10);
          var b = bi.toString(2);
          var padLen = 7 - b.length % 7;
          if (padLen == 7) padLen = 0;
          var bPad = '';

          for (var i = 0; i < padLen; i++) {
            bPad += '0';
          }

          b = bPad + b;

          for (var i = 0; i < b.length - 1; i += 7) {
            var b8 = b.substr(i, 7);
            if (i != b.length - 7) b8 = '1' + b8;
            h += itox(parseInt(b8, 2));
          }

          return h;
        };

        KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
        this.hT = "06";
        /**
         * set value by a hexadecimal string
         * @name setValueHex
         * @memberOf KJUR.asn1.DERObjectIdentifier#
         * @function
         * @param {String} newHexString hexadecimal value of OID bytes
         */

        this.setValueHex = function (newHexString) {
          this.hTLV = null;
          this.isModified = true;
          this.s = null;
          this.hV = newHexString;
        };
        /**
         * set value by a OID string<br/>
         * @name setValueOidString
         * @memberOf KJUR.asn1.DERObjectIdentifier#
         * @function
         * @param {String} oidString OID string (ex. 2.5.4.13)
         * @example
         * o = new KJUR.asn1.DERObjectIdentifier();
         * o.setValueOidString("2.5.4.13");
         */


        this.setValueOidString = function (oidString) {
          if (!oidString.match(/^[0-9.]+$/)) {
            throw "malformed oid string: " + oidString;
          }

          var h = '';
          var a = oidString.split('.');
          var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
          h += itox(i0);
          a.splice(0, 2);

          for (var i = 0; i < a.length; i++) {
            h += roidtox(a[i]);
          }

          this.hTLV = null;
          this.isModified = true;
          this.s = null;
          this.hV = h;
        };
        /**
         * set value by a OID name
         * @name setValueName
         * @memberOf KJUR.asn1.DERObjectIdentifier#
         * @function
         * @param {String} oidName OID name (ex. 'serverAuth')
         * @since 1.0.1
         * @description
         * OID name shall be defined in 'KJUR.asn1.x509.OID.name2oidList'.
         * Otherwise raise error.
         * @example
         * o = new KJUR.asn1.DERObjectIdentifier();
         * o.setValueName("serverAuth");
         */


        this.setValueName = function (oidName) {
          var oid = KJUR.asn1.x509.OID.name2oid(oidName);

          if (oid !== '') {
            this.setValueOidString(oid);
          } else {
            throw "DERObjectIdentifier oidName undefined: " + oidName;
          }
        };

        this.getFreshValueHex = function () {
          return this.hV;
        };

        if (params !== undefined) {
          if (typeof params === "string") {
            if (params.match(/^[0-2].[0-9.]+$/)) {
              this.setValueOidString(params);
            } else {
              this.setValueName(params);
            }
          } else if (params.oid !== undefined) {
            this.setValueOidString(params.oid);
          } else if (params.hex !== undefined) {
            this.setValueHex(params.hex);
          } else if (params.name !== undefined) {
            this.setValueName(params.name);
          }
        }
      };

      YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object); // ********************************************************************

      /**
       * class for ASN.1 DER Enumerated
       * @name KJUR.asn1.DEREnumerated
       * @class class for ASN.1 DER Enumerated
       * @extends KJUR.asn1.ASN1Object
       * @description
       * <br/>
       * As for argument 'params' for constructor, you can specify one of
       * following properties:
       * <ul>
       * <li>int - specify initial ASN.1 value(V) by integer value</li>
       * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
       * </ul>
       * NOTE: 'params' can be omitted.
       * @example
       * new KJUR.asn1.DEREnumerated(123);
       * new KJUR.asn1.DEREnumerated({int: 123});
       * new KJUR.asn1.DEREnumerated({hex: '1fad'});
       */

      KJUR.asn1.DEREnumerated = function (params) {
        KJUR.asn1.DEREnumerated.superclass.constructor.call(this);
        this.hT = "0a";
        /**
         * set value by Tom Wu's BigInteger object
         * @name setByBigInteger
         * @memberOf KJUR.asn1.DEREnumerated#
         * @function
         * @param {BigInteger} bigIntegerValue to set
         */

        this.setByBigInteger = function (bigIntegerValue) {
          this.hTLV = null;
          this.isModified = true;
          this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
        };
        /**
         * set value by integer value
         * @name setByInteger
         * @memberOf KJUR.asn1.DEREnumerated#
         * @function
         * @param {Integer} integer value to set
         */


        this.setByInteger = function (intValue) {
          var bi = new BigInteger(String(intValue), 10);
          this.setByBigInteger(bi);
        };
        /**
         * set value by integer value
         * @name setValueHex
         * @memberOf KJUR.asn1.DEREnumerated#
         * @function
         * @param {String} hexadecimal string of integer value
         * @description
         * <br/>
         * NOTE: Value shall be represented by minimum octet length of
         * two's complement representation.
         */


        this.setValueHex = function (newHexString) {
          this.hV = newHexString;
        };

        this.getFreshValueHex = function () {
          return this.hV;
        };

        if (typeof params != "undefined") {
          if (typeof params['int'] != "undefined") {
            this.setByInteger(params['int']);
          } else if (typeof params == "number") {
            this.setByInteger(params);
          } else if (typeof params['hex'] != "undefined") {
            this.setValueHex(params['hex']);
          }
        }
      };

      YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object); // ********************************************************************

      /**
       * class for ASN.1 DER UTF8String
       * @name KJUR.asn1.DERUTF8String
       * @class class for ASN.1 DER UTF8String
       * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
       * @extends KJUR.asn1.DERAbstractString
       * @description
       * @see KJUR.asn1.DERAbstractString - superclass
       */

      KJUR.asn1.DERUTF8String = function (params) {
        KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params);
        this.hT = "0c";
      };

      YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString); // ********************************************************************

      /**
       * class for ASN.1 DER NumericString
       * @name KJUR.asn1.DERNumericString
       * @class class for ASN.1 DER NumericString
       * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
       * @extends KJUR.asn1.DERAbstractString
       * @description
       * @see KJUR.asn1.DERAbstractString - superclass
       */

      KJUR.asn1.DERNumericString = function (params) {
        KJUR.asn1.DERNumericString.superclass.constructor.call(this, params);
        this.hT = "12";
      };

      YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString); // ********************************************************************

      /**
       * class for ASN.1 DER PrintableString
       * @name KJUR.asn1.DERPrintableString
       * @class class for ASN.1 DER PrintableString
       * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
       * @extends KJUR.asn1.DERAbstractString
       * @description
       * @see KJUR.asn1.DERAbstractString - superclass
       */

      KJUR.asn1.DERPrintableString = function (params) {
        KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params);
        this.hT = "13";
      };

      YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString); // ********************************************************************

      /**
       * class for ASN.1 DER TeletexString
       * @name KJUR.asn1.DERTeletexString
       * @class class for ASN.1 DER TeletexString
       * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
       * @extends KJUR.asn1.DERAbstractString
       * @description
       * @see KJUR.asn1.DERAbstractString - superclass
       */

      KJUR.asn1.DERTeletexString = function (params) {
        KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params);
        this.hT = "14";
      };

      YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString); // ********************************************************************

      /**
       * class for ASN.1 DER IA5String
       * @name KJUR.asn1.DERIA5String
       * @class class for ASN.1 DER IA5String
       * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
       * @extends KJUR.asn1.DERAbstractString
       * @description
       * @see KJUR.asn1.DERAbstractString - superclass
       */

      KJUR.asn1.DERIA5String = function (params) {
        KJUR.asn1.DERIA5String.superclass.constructor.call(this, params);
        this.hT = "16";
      };

      YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString); // ********************************************************************

      /**
       * class for ASN.1 DER UTCTime
       * @name KJUR.asn1.DERUTCTime
       * @class class for ASN.1 DER UTCTime
       * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
       * @extends KJUR.asn1.DERAbstractTime
       * @description
       * <br/>
       * As for argument 'params' for constructor, you can specify one of
       * following properties:
       * <ul>
       * <li>str - specify initial ASN.1 value(V) by a string (ex.'130430235959Z')</li>
       * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
       * <li>date - specify Date object.</li>
       * </ul>
       * NOTE: 'params' can be omitted.
       * <h4>EXAMPLES</h4>
       * @example
       * d1 = new KJUR.asn1.DERUTCTime();
       * d1.setString('130430125959Z');
       *
       * d2 = new KJUR.asn1.DERUTCTime({'str': '130430125959Z'});
       * d3 = new KJUR.asn1.DERUTCTime({'date': new Date(Date.UTC(2015, 0, 31, 0, 0, 0, 0))});
       * d4 = new KJUR.asn1.DERUTCTime('130430125959Z');
       */

      KJUR.asn1.DERUTCTime = function (params) {
        KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params);
        this.hT = "17";
        /**
         * set value by a Date object<br/>
         * @name setByDate
         * @memberOf KJUR.asn1.DERUTCTime#
         * @function
         * @param {Date} dateObject Date object to set ASN.1 value(V)
         * @example
         * o = new KJUR.asn1.DERUTCTime();
         * o.setByDate(new Date("2016/12/31"));
         */

        this.setByDate = function (dateObject) {
          this.hTLV = null;
          this.isModified = true;
          this.date = dateObject;
          this.s = this.formatDate(this.date, 'utc');
          this.hV = stohex(this.s);
        };

        this.getFreshValueHex = function () {
          if (typeof this.date == "undefined" && typeof this.s == "undefined") {
            this.date = new Date();
            this.s = this.formatDate(this.date, 'utc');
            this.hV = stohex(this.s);
          }

          return this.hV;
        };

        if (params !== undefined) {
          if (params.str !== undefined) {
            this.setString(params.str);
          } else if (typeof params == "string" && params.match(/^[0-9]{12}Z$/)) {
            this.setString(params);
          } else if (params.hex !== undefined) {
            this.setStringHex(params.hex);
          } else if (params.date !== undefined) {
            this.setByDate(params.date);
          }
        }
      };

      YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime); // ********************************************************************

      /**
       * class for ASN.1 DER GeneralizedTime
       * @name KJUR.asn1.DERGeneralizedTime
       * @class class for ASN.1 DER GeneralizedTime
       * @param {Array} params associative array of parameters (ex. {'str': '20130430235959Z'})
       * @property {Boolean} withMillis flag to show milliseconds or not
       * @extends KJUR.asn1.DERAbstractTime
       * @description
       * <br/>
       * As for argument 'params' for constructor, you can specify one of
       * following properties:
       * <ul>
       * <li>str - specify initial ASN.1 value(V) by a string (ex.'20130430235959Z')</li>
       * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
       * <li>date - specify Date object.</li>
       * <li>millis - specify flag to show milliseconds (from 1.0.6)</li>
       * </ul>
       * NOTE1: 'params' can be omitted.
       * NOTE2: 'withMillis' property is supported from asn1 1.0.6.
       */

      KJUR.asn1.DERGeneralizedTime = function (params) {
        KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params);
        this.hT = "18";
        this.withMillis = false;
        /**
         * set value by a Date object
         * @name setByDate
         * @memberOf KJUR.asn1.DERGeneralizedTime#
         * @function
         * @param {Date} dateObject Date object to set ASN.1 value(V)
         * @example
         * When you specify UTC time, use 'Date.UTC' method like this:<br/>
         * o1 = new DERUTCTime();
         * o1.setByDate(date);
         *
         * date = new Date(Date.UTC(2015, 0, 31, 23, 59, 59, 0)); #2015JAN31 23:59:59
         */

        this.setByDate = function (dateObject) {
          this.hTLV = null;
          this.isModified = true;
          this.date = dateObject;
          this.s = this.formatDate(this.date, 'gen', this.withMillis);
          this.hV = stohex(this.s);
        };

        this.getFreshValueHex = function () {
          if (this.date === undefined && this.s === undefined) {
            this.date = new Date();
            this.s = this.formatDate(this.date, 'gen', this.withMillis);
            this.hV = stohex(this.s);
          }

          return this.hV;
        };

        if (params !== undefined) {
          if (params.str !== undefined) {
            this.setString(params.str);
          } else if (typeof params == "string" && params.match(/^[0-9]{14}Z$/)) {
            this.setString(params);
          } else if (params.hex !== undefined) {
            this.setStringHex(params.hex);
          } else if (params.date !== undefined) {
            this.setByDate(params.date);
          }

          if (params.millis === true) {
            this.withMillis = true;
          }
        }
      };

      YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime); // ********************************************************************

      /**
       * class for ASN.1 DER Sequence
       * @name KJUR.asn1.DERSequence
       * @class class for ASN.1 DER Sequence
       * @extends KJUR.asn1.DERAbstractStructured
       * @description
       * <br/>
       * As for argument 'params' for constructor, you can specify one of
       * following properties:
       * <ul>
       * <li>array - specify array of ASN1Object to set elements of content</li>
       * </ul>
       * NOTE: 'params' can be omitted.
       */

      KJUR.asn1.DERSequence = function (params) {
        KJUR.asn1.DERSequence.superclass.constructor.call(this, params);
        this.hT = "30";

        this.getFreshValueHex = function () {
          var h = '';

          for (var i = 0; i < this.asn1Array.length; i++) {
            var asn1Obj = this.asn1Array[i];
            h += asn1Obj.getEncodedHex();
          }

          this.hV = h;
          return this.hV;
        };
      };

      YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured); // ********************************************************************

      /**
       * class for ASN.1 DER Set
       * @name KJUR.asn1.DERSet
       * @class class for ASN.1 DER Set
       * @extends KJUR.asn1.DERAbstractStructured
       * @description
       * <br/>
       * As for argument 'params' for constructor, you can specify one of
       * following properties:
       * <ul>
       * <li>array - specify array of ASN1Object to set elements of content</li>
       * <li>sortflag - flag for sort (default: true). ASN.1 BER is not sorted in 'SET OF'.</li>
       * </ul>
       * NOTE1: 'params' can be omitted.<br/>
       * NOTE2: sortflag is supported since 1.0.5.
       */

      KJUR.asn1.DERSet = function (params) {
        KJUR.asn1.DERSet.superclass.constructor.call(this, params);
        this.hT = "31";
        this.sortFlag = true; // item shall be sorted only in ASN.1 DER

        this.getFreshValueHex = function () {
          var a = new Array();

          for (var i = 0; i < this.asn1Array.length; i++) {
            var asn1Obj = this.asn1Array[i];
            a.push(asn1Obj.getEncodedHex());
          }

          if (this.sortFlag == true) a.sort();
          this.hV = a.join('');
          return this.hV;
        };

        if (typeof params != "undefined") {
          if (typeof params.sortflag != "undefined" && params.sortflag == false) this.sortFlag = false;
        }
      };

      YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured); // ********************************************************************

      /**
       * class for ASN.1 DER TaggedObject
       * @name KJUR.asn1.DERTaggedObject
       * @class class for ASN.1 DER TaggedObject
       * @extends KJUR.asn1.ASN1Object
       * @description
       * <br/>
       * Parameter 'tagNoNex' is ASN.1 tag(T) value for this object.
       * For example, if you find '[1]' tag in a ASN.1 dump,
       * 'tagNoHex' will be 'a1'.
       * <br/>
       * As for optional argument 'params' for constructor, you can specify *ANY* of
       * following properties:
       * <ul>
       * <li>explicit - specify true if this is explicit tag otherwise false
       *     (default is 'true').</li>
       * <li>tag - specify tag (default is 'a0' which means [0])</li>
       * <li>obj - specify ASN1Object which is tagged</li>
       * </ul>
       * @example
       * d1 = new KJUR.asn1.DERUTF8String({'str':'a'});
       * d2 = new KJUR.asn1.DERTaggedObject({'obj': d1});
       * hex = d2.getEncodedHex();
       */

      KJUR.asn1.DERTaggedObject = function (params) {
        KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
        this.hT = "a0";
        this.hV = '';
        this.isExplicit = true;
        this.asn1Object = null;
        /**
         * set value by an ASN1Object
         * @name setString
         * @memberOf KJUR.asn1.DERTaggedObject#
         * @function
         * @param {Boolean} isExplicitFlag flag for explicit/implicit tag
         * @param {Integer} tagNoHex hexadecimal string of ASN.1 tag
         * @param {ASN1Object} asn1Object ASN.1 to encapsulate
         */

        this.setASN1Object = function (isExplicitFlag, tagNoHex, asn1Object) {
          this.hT = tagNoHex;
          this.isExplicit = isExplicitFlag;
          this.asn1Object = asn1Object;

          if (this.isExplicit) {
            this.hV = this.asn1Object.getEncodedHex();
            this.hTLV = null;
            this.isModified = true;
          } else {
            this.hV = null;
            this.hTLV = asn1Object.getEncodedHex();
            this.hTLV = this.hTLV.replace(/^../, tagNoHex);
            this.isModified = false;
          }
        };

        this.getFreshValueHex = function () {
          return this.hV;
        };

        if (typeof params != "undefined") {
          if (typeof params['tag'] != "undefined") {
            this.hT = params['tag'];
          }

          if (typeof params['explicit'] != "undefined") {
            this.isExplicit = params['explicit'];
          }

          if (typeof params['obj'] != "undefined") {
            this.asn1Object = params['obj'];
            this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
          }
        }
      };

      YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
      /**
       * Create a new JSEncryptRSAKey that extends Tom Wu's RSA key object.
       * This object is just a decorator for parsing the key parameter
       * @param {string|Object} key - The key in string format, or an object containing
       * the parameters needed to build a RSAKey object.
       * @constructor
       */

      var JSEncryptRSAKey =
      /** @class */
      function (_super) {
        __extends(JSEncryptRSAKey, _super);

        function JSEncryptRSAKey(key) {
          var _this = _super.call(this) || this; // Call the super constructor.
          //  RSAKey.call(this);
          // If a key key was provided.


          if (key) {
            // If this is a string...
            if (typeof key === "string") {
              _this.parseKey(key);
            } else if (JSEncryptRSAKey.hasPrivateKeyProperty(key) || JSEncryptRSAKey.hasPublicKeyProperty(key)) {
              // Set the values for the key.
              _this.parsePropertiesFrom(key);
            }
          }

          return _this;
        }
        /**
         * Method to parse a pem encoded string containing both a public or private key.
         * The method will translate the pem encoded string in a der encoded string and
         * will parse private key and public key parameters. This method accepts public key
         * in the rsaencryption pkcs #1 format (oid: 1.2.840.113549.1.1.1).
         *
         * @todo Check how many rsa formats use the same format of pkcs #1.
         *
         * The format is defined as:
         * PublicKeyInfo ::= SEQUENCE {
         *   algorithm       AlgorithmIdentifier,
         *   PublicKey       BIT STRING
         * }
         * Where AlgorithmIdentifier is:
         * AlgorithmIdentifier ::= SEQUENCE {
         *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
         *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
         * }
         * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
         * RSAPublicKey ::= SEQUENCE {
         *   modulus           INTEGER,  -- n
         *   publicExponent    INTEGER   -- e
         * }
         * it's possible to examine the structure of the keys obtained from openssl using
         * an asn.1 dumper as the one used here to parse the components: http://lapo.it/asn1js/
         * @argument {string} pem the pem encoded string, can include the BEGIN/END header/footer
         * @private
         */


        JSEncryptRSAKey.prototype.parseKey = function (pem) {
          try {
            var modulus = 0;
            var public_exponent = 0;
            var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
            var der = reHex.test(pem) ? Hex.decode(pem) : Base64.unarmor(pem);
            var asn1 = ASN1.decode(der); // Fixes a bug with OpenSSL 1.0+ private keys

            if (asn1.sub.length === 3) {
              asn1 = asn1.sub[2].sub[0];
            }

            if (asn1.sub.length === 9) {
              // Parse the private key.
              modulus = asn1.sub[1].getHexStringValue(); // bigint

              this.n = parseBigInt(modulus, 16);
              public_exponent = asn1.sub[2].getHexStringValue(); // int

              this.e = parseInt(public_exponent, 16);
              var private_exponent = asn1.sub[3].getHexStringValue(); // bigint

              this.d = parseBigInt(private_exponent, 16);
              var prime1 = asn1.sub[4].getHexStringValue(); // bigint

              this.p = parseBigInt(prime1, 16);
              var prime2 = asn1.sub[5].getHexStringValue(); // bigint

              this.q = parseBigInt(prime2, 16);
              var exponent1 = asn1.sub[6].getHexStringValue(); // bigint

              this.dmp1 = parseBigInt(exponent1, 16);
              var exponent2 = asn1.sub[7].getHexStringValue(); // bigint

              this.dmq1 = parseBigInt(exponent2, 16);
              var coefficient = asn1.sub[8].getHexStringValue(); // bigint

              this.coeff = parseBigInt(coefficient, 16);
            } else if (asn1.sub.length === 2) {
              // Parse the public key.
              var bit_string = asn1.sub[1];
              var sequence = bit_string.sub[0];
              modulus = sequence.sub[0].getHexStringValue();
              this.n = parseBigInt(modulus, 16);
              public_exponent = sequence.sub[1].getHexStringValue();
              this.e = parseInt(public_exponent, 16);
            } else {
              return false;
            }

            return true;
          } catch (ex) {
            return false;
          }
        };
        /**
         * Translate rsa parameters in a hex encoded string representing the rsa key.
         *
         * The translation follow the ASN.1 notation :
         * RSAPrivateKey ::= SEQUENCE {
         *   version           Version,
         *   modulus           INTEGER,  -- n
         *   publicExponent    INTEGER,  -- e
         *   privateExponent   INTEGER,  -- d
         *   prime1            INTEGER,  -- p
         *   prime2            INTEGER,  -- q
         *   exponent1         INTEGER,  -- d mod (p1)
         *   exponent2         INTEGER,  -- d mod (q-1)
         *   coefficient       INTEGER,  -- (inverse of q) mod p
         * }
         * @returns {string}  DER Encoded String representing the rsa private key
         * @private
         */


        JSEncryptRSAKey.prototype.getPrivateBaseKey = function () {
          var options = {
            array: [new KJUR.asn1.DERInteger({
              "int": 0
            }), new KJUR.asn1.DERInteger({
              bigint: this.n
            }), new KJUR.asn1.DERInteger({
              "int": this.e
            }), new KJUR.asn1.DERInteger({
              bigint: this.d
            }), new KJUR.asn1.DERInteger({
              bigint: this.p
            }), new KJUR.asn1.DERInteger({
              bigint: this.q
            }), new KJUR.asn1.DERInteger({
              bigint: this.dmp1
            }), new KJUR.asn1.DERInteger({
              bigint: this.dmq1
            }), new KJUR.asn1.DERInteger({
              bigint: this.coeff
            })]
          };
          var seq = new KJUR.asn1.DERSequence(options);
          return seq.getEncodedHex();
        };
        /**
         * base64 (pem) encoded version of the DER encoded representation
         * @returns {string} pem encoded representation without header and footer
         * @public
         */


        JSEncryptRSAKey.prototype.getPrivateBaseKeyB64 = function () {
          return hex2b64(this.getPrivateBaseKey());
        };
        /**
         * Translate rsa parameters in a hex encoded string representing the rsa public key.
         * The representation follow the ASN.1 notation :
         * PublicKeyInfo ::= SEQUENCE {
         *   algorithm       AlgorithmIdentifier,
         *   PublicKey       BIT STRING
         * }
         * Where AlgorithmIdentifier is:
         * AlgorithmIdentifier ::= SEQUENCE {
         *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
         *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
         * }
         * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
         * RSAPublicKey ::= SEQUENCE {
         *   modulus           INTEGER,  -- n
         *   publicExponent    INTEGER   -- e
         * }
         * @returns {string} DER Encoded String representing the rsa public key
         * @private
         */


        JSEncryptRSAKey.prototype.getPublicBaseKey = function () {
          var first_sequence = new KJUR.asn1.DERSequence({
            array: [new KJUR.asn1.DERObjectIdentifier({
              oid: "1.2.840.113549.1.1.1"
            }), new KJUR.asn1.DERNull()]
          });
          var second_sequence = new KJUR.asn1.DERSequence({
            array: [new KJUR.asn1.DERInteger({
              bigint: this.n
            }), new KJUR.asn1.DERInteger({
              "int": this.e
            })]
          });
          var bit_string = new KJUR.asn1.DERBitString({
            hex: "00" + second_sequence.getEncodedHex()
          });
          var seq = new KJUR.asn1.DERSequence({
            array: [first_sequence, bit_string]
          });
          return seq.getEncodedHex();
        };
        /**
         * base64 (pem) encoded version of the DER encoded representation
         * @returns {string} pem encoded representation without header and footer
         * @public
         */


        JSEncryptRSAKey.prototype.getPublicBaseKeyB64 = function () {
          return hex2b64(this.getPublicBaseKey());
        };
        /**
         * wrap the string in block of width chars. The default value for rsa keys is 64
         * characters.
         * @param {string} str the pem encoded string without header and footer
         * @param {Number} [width=64] - the length the string has to be wrapped at
         * @returns {string}
         * @private
         */


        JSEncryptRSAKey.wordwrap = function (str, width) {
          width = width || 64;

          if (!str) {
            return str;
          }

          var regex = "(.{1," + width + "})( +|$\n?)|(.{1," + width + "})";
          return str.match(RegExp(regex, "g")).join("\n");
        };
        /**
         * Retrieve the pem encoded private key
         * @returns {string} the pem encoded private key with header/footer
         * @public
         */


        JSEncryptRSAKey.prototype.getPrivateKey = function () {
          var key = "-----BEGIN RSA PRIVATE KEY-----\n";
          key += JSEncryptRSAKey.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
          key += "-----END RSA PRIVATE KEY-----";
          return key;
        };
        /**
         * Retrieve the pem encoded public key
         * @returns {string} the pem encoded public key with header/footer
         * @public
         */


        JSEncryptRSAKey.prototype.getPublicKey = function () {
          var key = "-----BEGIN PUBLIC KEY-----\n";
          key += JSEncryptRSAKey.wordwrap(this.getPublicBaseKeyB64()) + "\n";
          key += "-----END PUBLIC KEY-----";
          return key;
        };
        /**
         * Check if the object contains the necessary parameters to populate the rsa modulus
         * and public exponent parameters.
         * @param {Object} [obj={}] - An object that may contain the two public key
         * parameters
         * @returns {boolean} true if the object contains both the modulus and the public exponent
         * properties (n and e)
         * @todo check for types of n and e. N should be a parseable bigInt object, E should
         * be a parseable integer number
         * @private
         */


        JSEncryptRSAKey.hasPublicKeyProperty = function (obj) {
          obj = obj || {};
          return obj.hasOwnProperty("n") && obj.hasOwnProperty("e");
        };
        /**
         * Check if the object contains ALL the parameters of an RSA key.
         * @param {Object} [obj={}] - An object that may contain nine rsa key
         * parameters
         * @returns {boolean} true if the object contains all the parameters needed
         * @todo check for types of the parameters all the parameters but the public exponent
         * should be parseable bigint objects, the public exponent should be a parseable integer number
         * @private
         */


        JSEncryptRSAKey.hasPrivateKeyProperty = function (obj) {
          obj = obj || {};
          return obj.hasOwnProperty("n") && obj.hasOwnProperty("e") && obj.hasOwnProperty("d") && obj.hasOwnProperty("p") && obj.hasOwnProperty("q") && obj.hasOwnProperty("dmp1") && obj.hasOwnProperty("dmq1") && obj.hasOwnProperty("coeff");
        };
        /**
         * Parse the properties of obj in the current rsa object. Obj should AT LEAST
         * include the modulus and public exponent (n, e) parameters.
         * @param {Object} obj - the object containing rsa parameters
         * @private
         */


        JSEncryptRSAKey.prototype.parsePropertiesFrom = function (obj) {
          this.n = obj.n;
          this.e = obj.e;

          if (obj.hasOwnProperty("d")) {
            this.d = obj.d;
            this.p = obj.p;
            this.q = obj.q;
            this.dmp1 = obj.dmp1;
            this.dmq1 = obj.dmq1;
            this.coeff = obj.coeff;
          }
        };

        return JSEncryptRSAKey;
      }(RSAKey);
      /**
       *
       * @param {Object} [options = {}] - An object to customize JSEncrypt behaviour
       * possible parameters are:
       * - default_key_size        {number}  default: 1024 the key size in bit
       * - default_public_exponent {string}  default: '010001' the hexadecimal representation of the public exponent
       * - log                     {boolean} default: false whether log warn/error or not
       * @constructor
       */


      var JSEncrypt =
      /** @class */
      function () {
        function JSEncrypt(options) {
          options = options || {};
          this.default_key_size = parseInt(options.default_key_size, 10) || 1024;
          this.default_public_exponent = options.default_public_exponent || "010001"; // 65537 default openssl public exponent for rsa key type

          this.log = options.log || false; // The private and public key.

          this.key = null;
        }
        /**
         * Method to set the rsa key parameter (one method is enough to set both the public
         * and the private key, since the private key contains the public key paramenters)
         * Log a warning if logs are enabled
         * @param {Object|string} key the pem encoded string or an object (with or without header/footer)
         * @public
         */


        JSEncrypt.prototype.setKey = function (key) {
          if (this.log && this.key) {
            console.warn("A key was already set, overriding existing.");
          }

          this.key = new JSEncryptRSAKey(key);
        };
        /**
         * Proxy method for setKey, for api compatibility
         * @see setKey
         * @public
         */


        JSEncrypt.prototype.setPrivateKey = function (privkey) {
          // Create the key.
          this.setKey(privkey);
        };
        /**
         * Proxy method for setKey, for api compatibility
         * @see setKey
         * @public
         */


        JSEncrypt.prototype.setPublicKey = function (pubkey) {
          // Sets the public key.
          this.setKey(pubkey);
        };
        /**
         * Proxy method for RSAKey object's decrypt, decrypt the string using the private
         * components of the rsa key object. Note that if the object was not set will be created
         * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
         * @param {string} str base64 encoded crypted string to decrypt
         * @return {string} the decrypted string
         * @public
         */


        JSEncrypt.prototype.decrypt = function (str) {
          // Return the decrypted string.
          try {
            return this.getKey().decrypt(b64tohex(str));
          } catch (ex) {
            return false;
          }
        };
        /**
         * Proxy method for RSAKey object's encrypt, encrypt the string using the public
         * components of the rsa key object. Note that if the object was not set will be created
         * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
         * @param {string} str the string to encrypt
         * @return {string} the encrypted string encoded in base64
         * @public
         */


        JSEncrypt.prototype.encrypt = function (str) {
          // Return the encrypted string.
          try {
            return hex2b64(this.getKey().encrypt(str));
          } catch (ex) {
            return false;
          }
        };
        /**
         * Proxy method for RSAKey object's sign.
         * @param {string} str the string to sign
         * @param {function} digestMethod hash method
         * @param {string} digestName the name of the hash algorithm
         * @return {string} the signature encoded in base64
         * @public
         */


        JSEncrypt.prototype.sign = function (str, digestMethod, digestName) {
          // return the RSA signature of 'str' in 'hex' format.
          try {
            return hex2b64(this.getKey().sign(str, digestMethod, digestName));
          } catch (ex) {
            return false;
          }
        };
        /**
         * Proxy method for RSAKey object's verify.
         * @param {string} str the string to verify
         * @param {string} signature the signature encoded in base64 to compare the string to
         * @param {function} digestMethod hash method
         * @return {boolean} whether the data and signature match
         * @public
         */


        JSEncrypt.prototype.verify = function (str, signature, digestMethod) {
          // Return the decrypted 'digest' of the signature.
          try {
            return this.getKey().verify(str, b64tohex(signature), digestMethod);
          } catch (ex) {
            return false;
          }
        };
        /**
         * Getter for the current JSEncryptRSAKey object. If it doesn't exists a new object
         * will be created and returned
         * @param {callback} [cb] the callback to be called if we want the key to be generated
         * in an async fashion
         * @returns {JSEncryptRSAKey} the JSEncryptRSAKey object
         * @public
         */


        JSEncrypt.prototype.getKey = function (cb) {
          // Only create new if it does not exist.
          if (!this.key) {
            // Get a new private key.
            this.key = new JSEncryptRSAKey();

            if (cb && {}.toString.call(cb) === "[object Function]") {
              this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
              return;
            } // Generate the key.


            this.key.generate(this.default_key_size, this.default_public_exponent);
          }

          return this.key;
        };
        /**
         * Returns the pem encoded representation of the private key
         * If the key doesn't exists a new key will be created
         * @returns {string} pem encoded representation of the private key WITH header and footer
         * @public
         */


        JSEncrypt.prototype.getPrivateKey = function () {
          // Return the private representation of this key.
          return this.getKey().getPrivateKey();
        };
        /**
         * Returns the pem encoded representation of the private key
         * If the key doesn't exists a new key will be created
         * @returns {string} pem encoded representation of the private key WITHOUT header and footer
         * @public
         */


        JSEncrypt.prototype.getPrivateKeyB64 = function () {
          // Return the private representation of this key.
          return this.getKey().getPrivateBaseKeyB64();
        };
        /**
         * Returns the pem encoded representation of the public key
         * If the key doesn't exists a new key will be created
         * @returns {string} pem encoded representation of the public key WITH header and footer
         * @public
         */


        JSEncrypt.prototype.getPublicKey = function () {
          // Return the private representation of this key.
          return this.getKey().getPublicKey();
        };
        /**
         * Returns the pem encoded representation of the public key
         * If the key doesn't exists a new key will be created
         * @returns {string} pem encoded representation of the public key WITHOUT header and footer
         * @public
         */


        JSEncrypt.prototype.getPublicKeyB64 = function () {
          // Return the private representation of this key.
          return this.getKey().getPublicBaseKeyB64();
        };

        JSEncrypt.version = "3.0.0-rc.1";
        return JSEncrypt;
      }();

      window.JSEncrypt = JSEncrypt;
      exports.JSEncrypt = JSEncrypt;
      exports["default"] = JSEncrypt;
      Object.defineProperty(exports, '__esModule', {
        value: true
      });
    });
  });
  var JSEncrypt = unwrapExports(jsencrypt);

  /** 加密 */

  function encryptF(str) {
    var encrypt = new JSEncrypt();
    var public_key = "\n-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCisNIJMSV7SSjH1k7jNfHF+Ywk4rvYp15IS78B8yZg73pAKqGPZWad0MKpqeuNKyN0iYK1Bh+Btt6SEAClvov2td8DoPurgwx7cxyy0spohOVuaM9U6w8tsdLC4NjZwdKtFlGUuJ45df63LpPEQFRuLY+RKmn3K7AGPK/xJYG5CwIDAQAB\n-----END PUBLIC KEY-----\n";
    encrypt.setPublicKey(public_key);
    return encrypt.encrypt(str);
  }
  /** 登录 */

  function login(options, callback) {
    var pass = encryptF(options.passwd);
    CJ_.$axios.post('app/platform/login', {
      name: options.name,
      passwd: pass,
      chatType: options.chatType,
      platform: options.platform,
      isEncryption: '1',
      isLazada: '1',
      isTOCJ: options.isTOCJ ? options.isTOCJ : '',
      thirdEmail: options.thirdEmail,
      facebookId: options.facebookId,
      googleId: options.googleId
    }).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          err = _ref2[0],
          res = _ref2[1];

      if (err) {
        console.warn(err);
        return;
      }

      callback(res);
    });
  } // userId, loginName, UserName, firstName, avatar, emailVerifyStatus, subAccountName, vip, lastLoginTime, email, loginTime

  function setCookie(name, value) {
    console.log('set cookie');
    document.cookie = "".concat(name, "=").concat(value, "; expires=Fri, 31 Dec 2030 23:59:59 GMT; domain=").concat(__root__domain);
  }
  /** 登录完成后续操作 */


  function saveDataAfterLogin(data) {
    var userInfo = data;
    CJ_.store.set('userId', CJ_.$base64.encode(userInfo.id || userInfo.userId || ''));
    setCookie('userId', CJ_.$base64.encode(userInfo.id || userInfo.userId || ''));
    CJ_.store.set('loginName', CJ_.$base64.encode(userInfo.loginName || ''));
    setCookie('loginName', CJ_.$base64.encode(userInfo.loginName || ''));
    CJ_.store.set('UserName', CJ_.$base64.encode(userInfo.loginName || ''));
    setCookie('UserName', CJ_.$base64.encode(userInfo.loginName || ''));
    CJ_.store.set('token', CJ_.$base64.encode(userInfo.token || ''));
    CJ_.store.set('noEncodeToken', userInfo.token || '');
    CJ_.store.set('name', CJ_.$base64.encode(userInfo.name || ''));
    CJ_.store.set('firstName', CJ_.$base64.encode(userInfo.firstName || ''));
    setCookie('name', CJ_.$base64.encode(userInfo.name || ''));
    setCookie('firstName', CJ_.$base64.encode(userInfo.firstName || ''));
    CJ_.store.set('lastName', CJ_.$base64.encode(userInfo.lastName || ''));
    CJ_.store.set('avatar', CJ_.$base64.encode(userInfo.img || ''));
    setCookie('avatar', CJ_.$base64.encode(userInfo.img || ''));
    CJ_.store.set('emailVerifyStatus', userInfo.status || ''); // 1 邮箱已验证 3 邮箱未验证

    setCookie('emailVerifyStatus', userInfo.status || '');
    userInfo.subAccountName ? CJ_.store.set('subAccountName', CJ_.$base64.encode(userInfo.subAccountName || '')) : CJ_.store.remove('subAccountName');
    setCookie('subAccountName', CJ_.$base64.encode(userInfo.subAccountName || ''));
    userInfo.subAccountRole ? CJ_.store.set('subAccountRole', userInfo.subAccountRole || '') : CJ_.store.remove('subAccountRole');
    userInfo.vip ? CJ_.store.set('vip', userInfo.vip) : CJ_.store.set('vip', '0');
    setCookie('vip', userInfo.vip || 0);
    userInfo.lastAccess && CJ_.store.set('lastLoginTime', CJ_.$base64.encode(userInfo.lastAccess.loginDate));
    userInfo.lastAccess && setCookie('lastLoginTime', CJ_.$base64.encode(userInfo.lastAccess.loginDate));
    CJ_.store.set('contactID', CJ_.$base64.encode(userInfo.contactID || ''));
    CJ_.store.set('country', CJ_.$base64.encode(userInfo.country || ''));
    userInfo.address ? CJ_.store.set('address', CJ_.$base64.encode(userInfo.address)) : CJ_.store.set('address', '');
    CJ_.store.set('email', CJ_.$base64.encode(userInfo.email || ''));
    setCookie('email', CJ_.$base64.encode(userInfo.email || ''));

    try {
      // 19-04-03 fixed login BUG.
      CJ_.store.set('phone', CJ_.$base64.encode(userInfo.phone));
      CJ_.store.set('storeLink', CJ_.$base64.encode(userInfo.storeLink));
    } catch (err) {
      console.warn(err);
    }

    CJ_.store.set('relateSalesman', CJ_.$base64.encode(userInfo.relateSalesman || ''));
    CJ_.store.set('salesmanId', CJ_.$base64.encode(userInfo.salesmanId || ''));
    CJ_.store.set('loginTime', new Date().getTime());
    setCookie('loginTime', new Date().getTime());
    var cookieObj = {
      expires: 3,
      domain: __root__domain
    };
    CJ_.$cookie.set('cjLoginName', userInfo.loginName, cookieObj);
    CJ_.$cookie.set('cjLoginToken', userInfo.token, cookieObj);
    var isFirstLogin = userInfo.isFirstLogin;

    if (isFirstLogin == null) {
      isFirstLogin = '0';
    }

    CJ_.store.set('isFirstLogin', isFirstLogin);
    var isEmpower = userInfo.isEmpower;

    if (isEmpower == null || isEmpower == undefined || isEmpower == '') {
      CJ_.store.set('isEmpower', '0');
      CJ_.store.set('closeFlag', '');
    } else if (isEmpower == '1') {
      CJ_.store.set('isEmpower', '2');
      CJ_.store.set('closeFlag', '');
    } else if (isEmpower == '0') {
      CJ_.store.set('isEmpower', '0');
      CJ_.store.set('closeFlag', '');
    }
  }

  var $post = utils$1.axiosEnhance(new utils$1.Axios({
    method: "POST"
  }));

  var $base64$1 = utils$1.$base64,
      getDomainByUrlKey$1 = utils$1.getDomainByUrlKey;
  /** localStorage 操作 */

  function _JSONparse(jsonStr) {
    var r = jsonStr;

    try {
      r = JSON.parse(jsonStr);
    } finally {
      return r;
    }
  }

  var store = {
    // decode ---- Base64.decode
    // parse  ---- JSON.parse

    /** 支持数组，支持 $base64.decode，支持 JSON.parse */
    get: function get(key, options) {
      var r;
      var opt = Object.assign({
        decode: false,
        parse: true
      }, options);

      if (Array.isArray(key)) {
        r = key.map(function (k) {
          return localStorage.getItem(k);
        });
        if (opt.decode) r = r.map(function (item) {
          return item ? $base64$1.decode(item) : item;
        });
        if (opt.parse) r = r.map(function (item) {
          return _JSONparse(item);
        });
      } else {
        r = localStorage.getItem(key);
        if (opt.decode) r = r ? $base64$1.decode(r) : r;
        if (opt.parse) r = _JSONparse(r);
      }

      return r;
    },

    /** 对象、数组将自动 JSON.stringify */
    set: function set(key, val) {
      var _val = val;

      if (Array.isArray(val) || Object.prototype.toString.call(val) === "[object Object]") {
        _val = JSON.stringify(val);
      }

      localStorage.setItem(key, _val);
    },

    /** 支持数组 */
    remove: function remove(key) {
      if (Array.isArray(key)) {
        key.forEach(function (k) {
          localStorage.removeItem(k);
        });
      } else {
        localStorage.removeItem(key);
      }
    }
  };
  /** 判断登陆 */

  function checkLogin() {
    var nowTime = new Date().getTime();
    var token = store.get('token', {
      parse: false
    });
    var loginName = store.get('loginName'); // const firstName = store.get('firstName');

    var loginTime = store.get('loginTime');

    var removeLogin = function removeLogin() {
      store.remove(['loginName', 'firstName', 'loginTime', 'token', 'cjLoginName', 'cjLoginToken']);
    };

    if (!loginName || !token || !loginTime) {
      removeLogin();
      return false;
    } // 限制三天过期 - 毫秒 * 小时 * 天 * 天数


    if (nowTime - loginTime > 1000 * 3600 * 24 * 3) {
      removeLogin();
      return false;
    }

    var cookieObj = {
      expires: 3,
      domain: getTopDomain$1()
    };
    js_cookie.set('cjLoginName', $base64$1.decode(loginName), cookieObj);
    js_cookie.set('cjLoginToken', $base64$1.decode(token), cookieObj);
    store.set('loginTime', nowTime);
    return true;
  }
  /** 获取顶级域名 */

  function getTopDomain$1() {
    var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : location.hostname;
    var ip_pattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/; // 匹配ip

    if (ip_pattern.test(host)) {
      return host;
    }

    var tmp = host.split('.');
    var domain = '';

    if (tmp.length > 1) {
      var last = tmp.length - 1;
      domain = "".concat(tmp[last - 1], ".").concat(tmp[last]);
    } else {
      domain = host;
    }

    return domain === 'localhost' ? domain : ".".concat(domain);
  }
  /**  添加聊天 */

  function addChatBody() {
    var script = document.createElement('script');
    script.src = getDomainByUrlKey$1('_chat_190606') + "javascripts/newChat.js?v=".concat(BUILD_TIMESTAMP);
    document.body.append(script);
  }

  function addGuidWindow() {
    var script = document.createElement('script');
    script.src = getDomainByUrlKey$1('_chat_190606') + 'javascripts/intelGuid.js';
    document.body.append(script);
  } // 获取cookie

  function getCookie(c_name) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + "=");
      var c_end;

      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }

    return '';
  }

  function transWarehouseStock() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var lng = getCookie('lng');
    var raw = sessionStorage.getItem("warehouse_lng_".concat(lng));

    if (!raw) {
      return target;
    }

    var cache = JSON.parse(raw);

    if (!Array.isArray(cache)) {
      return target;
    } // 扁平化


    var map = cache.reduce(function (obj, cur) {
      var en = cur.en;

      if (!obj[en]) {
        obj[en] = cur['value'];
      }

      return obj;
    }, {}); // 写入翻译值

    target.forEach(function (v) {
      v.areaVal = map[v.areaEn] || v.areaEn;
    });
    return target;
  } // 获取类目

  var $base64$2 = utils$1.$base64;
  var productCard = {
    filters: filter,
    methods: {
      $clickcollect: function $clickcollect(prod) {
        if (CJ_isLogin) {
          CJ_.$axios.post('cj/homePage/shouCangShnagPin', {
            productId: prod.id
          }).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                err = _ref2[0],
                data = _ref2[1];

            err || (prod.isCollect = prod.isCollect == 1 ? 0 : 1);
          });
        } else {
          location.href = CJ_.authLoginUrl('home.html');
        }
      },

      /*商品点击去详情*/
      goTodetail: function goTodetail(item, $event) {
        $event.preventDefault();
        var params = {
          ID: item.productId,
          BIGIMG: item.bigImg,
          NAME: '',
          SKU: '',
          type: 'clickSource'
        }; // 数据埋点

        CJ_.$axios.post('cj/homePage/shangPinMaiDian', params, false).then(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              err = _ref4[0],
              res = _ref4[1];

          if (err) {
            console.warn(err);
            return;
          }

          var _CJ_$statusCode = CJ_.statusCode200(res),
              _CJ_$statusCode2 = _slicedToArray(_CJ_$statusCode, 2),
              e = _CJ_$statusCode2[0],
              d = _CJ_$statusCode2[1];

          if (e) {
            console.warn(e);
            return;
          }
        });
        var id = item.id || item.productId || item.productid;
        var categoryIdArr = item.categoryId;
        window.cjSetInterfereProdId && window.cjSetInterfereProdId(categoryIdArr);

        if (item.flag == '1') {
          window.open('/product-detail.html?id=' + id + '&from=all&fromType=&productType=' + (item.productType || 0));
        } else {
          window.open('/reptail-detail.html?id=' + id);
        }
      },
      // list 按钮 -- from&fromType后续要加
      goToList: function goToList(item, type, $event) {
        $event.stopPropagation();
        var id = item.id || item.productId || item.productid;
        var categoryIdArr = item.categoryId;
        window.cjSetInterfereProdId && window.cjSetInterfereProdId(categoryIdArr);
        var push_id = item.push_id || '';

        if (CJ_isLogin) {
          if (type == 'source') {
            window.open('/reptail-detail.html?id=' + id + '&source=1');
          } else {
            window.open('/product-detail.html?id=' + id + '&push_id=' + push_id + '&from=&fromType=&list=1');
          }
        } else {
          if (type == 'source') {
            location.href = '/login.html?target=' + $base64$2.encode('reptail-detail.html?id=' + id + '&source=1');
          } else if (type == 'list') {
            location.href = '/login.html?target=' + $base64$2.encode('product-detail.html?id=' + id + '&from=&fromType=&list=1');
          }
        }
      }
    },
    mounted: function mounted() {
      var _this = this;

      window.addEventListener('currency-rate/updated', function () {
        return _this.$forceUpdate();
      });
    }
  };
  var tutorialMenu = {
    data: {
      queryObj: CJ_.paramsToObject(location.search),
      menuOpenGroup: {
        openIdx: undefined
      },
      lastDom: null
    },
    created: function created() {
      var _this$queryObj = this.queryObj,
          menuOpenIdx = _this$queryObj.menuOpenIdx,
          menuActiveIdx = _this$queryObj.menuActiveIdx,
          scrollToNum = _this$queryObj.scrollToNum;

      if (scrollToNum) {
        window.scrollTo({
          top: scrollToNum
        });
      }

      this.menuOpenGroup = {
        openIdx: menuOpenIdx,
        activeIdx: menuActiveIdx
      };
    },
    methods: {
      toggleShow: function toggleShow($event) {
        var e = $event.currentTarget;
        var nextElementSibling = e.nextElementSibling,
            parentNode = e.parentNode;
        var i = e.getAttribute("i");

        if (this.lastDom && this.lastDom.nextElementSibling) {
          // 将最后一次点击的菜单收起
          this.lastDom.nextElementSibling.style.height = '0px';
          this.lastDom.parentNode.classList.remove("sub-menu-open");
        } else if (document.querySelector('.sub-menu-height-auto')) {
          // 将带sub-menu-height-auto收起
          var dom = document.querySelector('.sub-menu-height-auto');
          dom.querySelector(".sub-menu").style.height = dom.querySelector(".sub-menu").scrollHeight + 'px';
          setTimeout(function () {
            dom.querySelector(".sub-menu").style.height = '0px';
          }, 10);
          dom.classList.remove("sub-menu-height-auto");
        }

        if (this.menuOpenGroup.openIdx === i) {
          // 收起 
          nextElementSibling.style.height = nextElementSibling.scrollHeight + 'px';
          parentNode.classList.remove("sub-menu-open");
          parentNode.classList.remove("sub-menu-height-auto");
          this.menuOpenGroup.openIdx = undefined;
          setTimeout(function () {
            nextElementSibling.style.height = '0px';
          }, 10);
          return;
        }

        if (nextElementSibling) {
          // 展开
          parentNode.classList.add("sub-menu-open");
          nextElementSibling.style.height = nextElementSibling.scrollHeight + 'px';
        }

        this.menuOpenGroup.openIdx = i;
        this.lastDom = e; // 记录最后一次点击的菜单dom
      }
    }
  };

  //


  var script$1 = {
    name: "product-card",
    props: {
      title: {
        type: String,
        default: ""
      },
      prod: {
        type: Object,
        default: {}
      },
      imgSize: {
        type: Array,
        default: () => [179, 190]
      },
      tracking: {
        type: String,
        default: '{"clickId": "", "collectionId":"", "addToQueueId": ""}'
      },
      staticText: {
        type: Object,
        default: () => ({
          'Lists': i18next.t('product-card-lists'),
          'List': i18next.t('product-card-list'),
          'View Inventory': i18next.t('product-card-view-inventory'),
          'Add to Queue': i18next.t('product-card-add-to-queue'),
          'Added to Queue': i18next.t('product-card-added-to-queue'),
          'Free Shipping':i18next.t('product-card-free-shipping'),
        })
      }
    },
    mixins: [productCard],
    data() {
      return {
        product: this.prod,
        cardTitle: this.title,
        defaultImg:'/egg/image/img_default.jpg'
      };
    },
    mounted() {
      const observer = new IntersectionObserver((changes)=>{
        // changes是观测对象合集（即使是一个观测对象也会形成数组的形式）
          changes.forEach(({target, isIntersecting})=>{
            // target是节点dom isIntersecting是否有交叉（有交叉就是一部分在可视区一部分不在可视区）
            // 第一次进入如果有交叉证明进入可视区这时候就可以解除
            if(isIntersecting){
              // 关闭观察器
              observer.disconnect();
              // 停止观察
              observer.unobserve(target);
            }
            if(isIntersecting && this.prod.bigImg){
              // 判断是否数据img存在，如果不存在继续使用默认图片
              this.defaultImg = filter_5(this.prod.bigImg, this.imgSize[0], this.imgSize[1]);
            }
          });
      });
      // 观测根据数据ref生成的dom节点
      observer.observe(this.$refs.lazyImg);

      /** 绑定埋点 */
      const trackProps = JSON.parse(this.tracking);    if (trackProps.exposureId) {
        const domWrap = this.$refs.cardWrap;
        let viewData = {
          elementId: trackProps.exposureId,
          actionType: "product_exposure",
          list: [
            {
              fieldValue: this.product.productId || this.product.productid,
              filedName: "productId"
            }
          ]
        };
        domWrap.setAttribute('data-tracking-element-view', JSON.stringify(viewData));
      }
      if (trackProps.clickResult) {
        let domWrap = this.$refs.cardWrap;
        let positionNum = 0;
        while((domWrap = domWrap.previousSibling) != null) positionNum++;

        let clickResultData = {
          elementId: trackProps.clickResult,
          actionType: "SearchResult_Click",
          list: [
            {
              fieldValue: this.product.productId || this.product.productid,
              filedName: "productId"
            },
            {
              fieldValue: trackProps.searchKey,
              filedName: "searchWords"
            },
            {
              fieldValue: trackProps.productNum,
              filedName: "resultNumber"
            },
            {
              fieldValue: `${positionNum === 0 ? 1 : Math.ceil(positionNum/6)}, ${positionNum%6 + 1}`,
              filedName: "positionNumber"
            }
          ]
        };
        this.$refs.cardWrap.setAttribute('data-tracking-element-click', JSON.stringify(clickResultData));
      }
      if (trackProps.clickId) {
        let clickData = {
          elementId: trackProps.clickId,
          actionType: "product_click",
          list: [
            {
              fieldValue: this.product.productId || this.product.productid,
              filedName: "productId"
            }
          ]
        };
        this.$refs.prodImg.setAttribute('data-tracking-element-click', JSON.stringify(clickData));
        this.$refs.prodTitle.setAttribute('data-tracking-element-click', JSON.stringify(clickData));
      }
      if (trackProps.collectionId) {
        let collectData = {
          elementId: trackProps.collectionId,
          actionType: "product_collection",
          list: [
            {
              fieldValue: this.product.productId || this.product.productid,
              filedName: "productId"
            },
            {
              fieldValue: this.product.isCollect,
              filedName: "collectionState"
            }
          ]
        };
        this.$refs.cardCollect.setAttribute('data-tracking-element-click', JSON.stringify(collectData));
      }
      if (trackProps.addToQueueId) {
        let queueData = {
          elementId: trackProps.addToQueueId,
          actionType: "product_add_to_queue",
          list: [
            {
              fieldValue: this.product.productId || this.product.productid,
              filedName: "productId"
            },
            {
              fieldValue: this.product.islist ? 1 : 0,
              filedName: "queueState"
            }
          ]
        };
        this.$refs.cardAddQueue.setAttribute('data-tracking-element-click', JSON.stringify(queueData));
      }
    },
    methods: {
      $enterInventory (prod) {
        const _this = this;
        this.product.showInventory = true;
        _this.$forceUpdate();
        if (!Array.isArray(this.product.inventories)) {
          CJ_.$axios
            .post("storehousecj/areaInventory/getAreaInventoryInfo", {
              pid: this.product.id
            })
            .then(([err, res]) => {
              if (err) {
                console.warn(err);
              } else {
                // 翻译文案
                res.data = transWarehouseStock(res.data);
                if (res.data.length == 1 && res.data[0].countryCode == 'CN' && res.data[0].num == 0) {
                  CJ_.$axios
                    .post("cj/locProduct/huoQuShangPinXiangQing", {
                      id: this.product.id
                    })
                    .then(([err2, res2]) => {
                      if (err) {
                        console.warn(err);
                      } else {
                        res.data[0].num = 10000 * res2.result.stanProducts.length;
                        this.product.inventories = res.data;
                      }
                    });
                }else {
                  this.product.inventories = res.data;
                }
                _this.$forceUpdate();
              }
            });
        }
      },
      $leaveInventory(prod) {
        this.product.showInventory = false;
        this.$forceUpdate();
      },
      $enterFreeShip(prod) {
        this.product.showFreeShip = true;
        this.$forceUpdate();
      },
      $leaveFreeShip(prod) {
        this.product.showFreeShip = false;
        this.$forceUpdate();
      },
      // 添加到刊登
      addToQueueRun(prod, e) {
        // 已在队列中提示
        if(this.product.islist) return layer.msg(i18next.t('product-card-please-check-the-product-in-queue.-it-has-been-added-to-queue.'))

        if(!CJ_isLogin){
          location.href = '/login.html';
          return;
        }

        let oid = this.product.id || this.product.productId || this.product.productid;
        CJ_.$axios
          .post("cj/listedproduct/add", [oid])
          .then(([err, res]) => {
            if (err) {
              console.warn(err);
              return;
            }
            const [e, d] = CJ_.statusCode200(res);
            if (e) {
              console.warn(e);
              return;
            }
            if(d > 0) {
              this.product = { ...this.product, islist: true };
              const ev = { detail: {queueNumAdd: d } };
              window.dispatchEvent(new CustomEvent('queueNumUpdate', ev));
            }else {
              this.$my_message.info(i18next.t('product-card-added-to-queue-successfully.'));
            } 
          });
      },
    },
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { ref: "cardWrap", staticClass: "card-wrap" }, [
      _c(
        "div",
        {
          staticClass: "inner-box",
          class: _vm.product.islist && "product-card-add"
        },
        [
          _c(
            "span",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.product.islist,
                  expression: "product.islist"
                }
              ],
              staticClass: "add-icon"
            },
            [
              _c("span", { staticClass: "iconfont iconduihao" }),
              _vm._v(" "),
              _c("span", { staticClass: "add-icon-bg" })
            ]
          ),
          _vm._v(" "),
          _c(
            "a",
            {
              directives: [
                {
                  name: "cjstat",
                  rawName: "v-cjstat",
                  value: {
                    pageCode: "home",
                    keys: [
                      {
                        key: "productId",
                        value: "" + (_vm.product.id || _vm.product.productId)
                      }
                    ],
                    eventType: 1,
                    buttonName: "ProductCard",
                    buttonType: "1"
                  },
                  expression:
                    '{"pageCode":"home", "keys":[{"key":"productId","value":`${product.id || product.productId}`}], "eventType": 1, "buttonName": "ProductCard","buttonType": "1"}'
                },
                { name: "cjdot", rawName: "v-cjdot" }
              ],
              ref: "prodImg",
              staticClass: "detail-anchor",
              attrs: {
                cjdotshow:
                  '{"pageCode":"home", "eventType": 0, "buttonName": "ProductCard", "keys":[{"key":"productId","value":"' +
                  (_vm.product.id || _vm.product.productId) +
                  '"}], "cardName":"' +
                  _vm.cardTitle +
                  '"}',
                href:
                  _vm.product.flag == 1
                    ? "/product-detail.html?id=" +
                      (_vm.product.id ||
                        _vm.product.productId ||
                        _vm.product.productid) +
                      "&from=all&fromType=&productType=" +
                      (_vm.product.productType || 0)
                    : "reptail-detail.html?id=" +
                      (_vm.product.id ||
                        _vm.product.productId ||
                        _vm.product.productid)
              },
              on: {
                click: function($event) {
                  return _vm.goTodetail(_vm.prod, $event)
                }
              }
            },
            [
              _c("img", {
                ref: "lazyImg",
                attrs: {
                  src: _vm.defaultImg,
                  onerror: "javascript:this.src='/egg/image/img_default.jpg'"
                }
              }),
              _vm._v(" "),
              _vm.product.isHaveVideo == "HAVE_VIDEO"
                ? _c("i", {
                    staticClass: "iconfont iconshipinda isVideo",
                    style: { fontSize: _vm.imgSize[0] == 270 ? "45px" : "30px" }
                  })
                : _vm._e()
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "move-box" }, [
            _c(
              "a",
              {
                directives: [
                  {
                    name: "cjstat",
                    rawName: "v-cjstat",
                    value: {
                      pageCode: "home",
                      keys: [
                        {
                          key: "productId",
                          value: "" + (_vm.product.id || _vm.product.productId)
                        }
                      ],
                      eventType: 1,
                      buttonName: "ProductName",
                      buttonType: "1"
                    },
                    expression:
                      '{"pageCode":"home","keys":[{"key":"productId","value":`${product.id || product.productId}`}], "eventType": 1, "buttonName": "ProductName","buttonType": "1"}'
                  }
                ],
                ref: "prodTitle",
                staticClass: "desc detail-anchor",
                attrs: {
                  href:
                    _vm.product.flag == 1
                      ? "/product-detail.html?id=" +
                        (_vm.product.id ||
                          _vm.product.productId ||
                          _vm.product.productid) +
                        "&from=all&fromType=&productType=" +
                        (_vm.product.productType || 0)
                      : "reptail-detail.html?id=" +
                        (_vm.product.id ||
                          _vm.product.productId ||
                          _vm.product.productid)
                },
                on: {
                  click: function($event) {
                    return _vm.goTodetail(_vm.prod, $event)
                  }
                }
              },
              [
                _vm._v(
                  "\n          " +
                    _vm._s(_vm._f("INIT_UPPERCASE")(_vm.product.nameVal)) +
                    "\n        "
                )
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "list-collect" }, [
              _c("span", { staticClass: "list" }, [
                _vm.product.isAut != 1
                  ? _c("div", { staticStyle: { display: "inline-block" } }, [
                      _c("span", [
                        _vm.product.num > 1
                          ? _c("span", [
                              _vm._v(_vm._s(_vm.staticText["Lists"]) + ":")
                            ])
                          : _c("span", [
                              _vm._v(_vm._s(_vm.staticText["List"]) + ":")
                            ])
                      ]),
                      _vm._v(" "),
                      _c("span", [_vm._v(_vm._s(_vm.product.num))])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.product.addMarkStatus == 1 && _vm.product.productType == "5"
                  ? _c(
                      "div",
                      {
                        staticClass: "freeShip",
                        on: {
                          mouseenter: function($event) {
                            return _vm.$enterFreeShip(_vm.prod)
                          },
                          mouseleave: function($event) {
                            return _vm.$leaveFreeShip(_vm.prod)
                          }
                        }
                      },
                      [
                        _vm.product.showFreeShip
                          ? _c("div", { staticClass: "shipModel" }, [
                              _c("div", { staticClass: "long-text" }, [
                                _vm._v(_vm._s(_vm.staticText["Free Shipping"]))
                              ])
                            ])
                          : _vm._e()
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.product.isPersonalized == "1"
                  ? _c("i", { staticClass: "personalise" })
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "cjstat",
                      rawName: "v-cjstat",
                      value: {
                        pageCode: "home",
                        keys: [
                          {
                            key: "productId",
                            value: "" + (_vm.product.id || _vm.product.productId)
                          },
                          {
                            key: "collectType",
                            value: "" + _vm.product.isCollect
                          }
                        ],
                        eventType: 1,
                        buttonName: "collection",
                        buttonType: "1"
                      },
                      expression:
                        '{"pageCode":"home", "keys":[{"key":"productId","value":`${product.id || product.productId}`},{"key":"collectType","value": `${product.isCollect}`}], "eventType": 1, "buttonName": "collection","buttonType": "1"}'
                    }
                  ],
                  key: _vm.product.isCollect,
                  ref: "cardCollect",
                  staticClass: "collect",
                  class: { active: _vm.product.isCollect == 1 },
                  on: {
                    click: function($event) {
                      return _vm.$clickcollect(_vm.prod)
                    }
                  }
                },
                [
                  _vm.product.isCollect == 1
                    ? _c("span", {
                        staticClass: "iconfont icontianjiashoucangzhihou solid"
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.product.isCollect == 0
                    ? _c("span", {
                        staticClass: "iconfont icontianjiashoucang hollow"
                      })
                    : _vm._e()
                ]
              )
            ]),
            _vm._v(" "),
            _vm.product.nowPrice
              ? _c("div", { staticClass: "price notranslate" }, [
                  _c("span", { staticClass: "theme-price" }, [
                    _vm._v(_vm._s(_vm._f("EXCHANGE_RATE")(_vm.product.nowPrice)))
                  ]),
                  _vm._v(" "),
                  _c("del", { staticClass: "origin-price" }, [
                    _vm._v(
                      _vm._s(
                        _vm._f("EXCHANGE_RATE")(_vm._f("GET_PRICE")(_vm.prod))
                      )
                    )
                  ])
                ])
              : _c("div", { staticClass: "price notranslate" }, [
                  _vm._v(
                    _vm._s(_vm._f("EXCHANGE_RATE")(_vm._f("GET_PRICE")(_vm.prod)))
                  )
                ]),
            _vm._v(" "),
            _c("div", { staticClass: "btns" }, [
              _c(
                "div",
                {
                  staticClass: "btn-item view-inventory",
                  on: {
                    mouseenter: function($event) {
                      return _vm.$enterInventory(_vm.prod)
                    },
                    mouseleave: function($event) {
                      return _vm.$leaveInventory(_vm.prod)
                    }
                  }
                },
                [
                  _c("span", [_vm._v(_vm._s(_vm.staticText["View Inventory"]))]),
                  _vm._v(" "),
                  _vm.product.showInventory &&
                  _vm.product.inventories &&
                  _vm.product.inventories.length > 0
                    ? _c(
                        "div",
                        { staticClass: "inventory" },
                        [
                          _c("span", { staticClass: "arrow" }),
                          _vm._v(" "),
                          _vm.product.inventories &&
                          _vm.product.inventories.length <= 0
                            ? _c("span", [_vm._v("loading...")])
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._l(_vm.product.inventories, function(inven) {
                            return _c(
                              "div",
                              {
                                key: inven.areaEn,
                                staticClass: "d-flex justify-content-between"
                              },
                              [
                                _c("span", { staticClass: "name" }, [
                                  _vm._v(_vm._s(inven.areaVal))
                                ]),
                                _vm._v(" "),
                                _c("span", { staticClass: "num" }, [
                                  _vm._v(_vm._s(inven.num))
                                ])
                              ]
                            )
                          })
                        ],
                        2
                      )
                    : _vm._e()
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "cjstat",
                      rawName: "v-cjstat",
                      value: {
                        pageCode: "home",
                        keys: [
                          {
                            key: "productId",
                            value: "" + (_vm.product.id || _vm.product.productId)
                          }
                        ],
                        eventType: 1,
                        buttonName: "List",
                        buttonType: "1"
                      },
                      expression:
                        '{"pageCode":"home", "keys":[{"key":"productId","value":`${product.id || product.productId}`}], "eventType": 1, "buttonName": "List","buttonType": "1"}'
                    }
                  ],
                  staticClass: "btn-item list",
                  on: {
                    click: function($event) {
                      return _vm.goToList(_vm.prod, "list", $event)
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.staticText["List"]))]
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                directives: [
                  {
                    name: "cjstat",
                    rawName: "v-cjstat",
                    value: {
                      pageCode: "home",
                      keys: [
                        {
                          key: "productId",
                          value: "" + (_vm.product.id || _vm.product.productId)
                        }
                      ],
                      eventType: 1,
                      buttonName: "Add to Queue",
                      buttonType: "1"
                    },
                    expression:
                      '{"pageCode":"home", "keys":[{"key":"productId","value":`${product.id || product.productId}`}], "eventType": 1, "buttonName": "Add to Queue","buttonType": "1"}'
                  }
                ],
                staticClass: "add-queue"
              },
              [
                _c(
                  "div",
                  {
                    ref: "cardAddQueue",
                    staticClass: "btn-add",
                    on: {
                      click: function($event) {
                        return _vm.addToQueueRun(_vm.prod, $event)
                      }
                    }
                  },
                  [
                    _c(
                      "i",
                      {
                        staticClass: "iconfont",
                        staticStyle: { "font-size": "12px" }
                      },
                      [_vm._v(_vm._s(_vm.product.islist ? "" : ""))]
                    ),
                    _vm._v(
                      " " +
                        _vm._s(
                          _vm.product.islist
                            ? _vm.staticText["Added to Queue"]
                            : _vm.staticText["Add to Queue"]
                        )
                    )
                  ]
                )
              ]
            )
          ])
        ]
      )
    ])
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = "data-v-ea8d9c4a";
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      undefined,
      undefined,
      undefined
    );

  //

  var script$2 = {
    name: 'product-source',
    props: {
      prod: {
        type: Object,
        default: {}
      },
      imgSize: {
        type: Array,
        default: () => [179, 190]
      },
      staticText: {
        type: Object,
        default: () => ({
          'Source': i18next.t('product-card-source')
        })
      }
    },
    mixins: [productCard],
    data() {
      return {};
    },
  };

  /* script */
  const __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "card-wrap source" }, [
      _c("div", { staticClass: "inner-box" }, [
        _c(
          "a",
          {
            directives: [
              {
                name: "cjstat",
                rawName: "v-cjstat",
                value: {
                  pageCode: "home",
                  keys: [
                    {
                      key: "productId",
                      value:
                        "" +
                        (_vm.prod.id || _vm.prod.productId || _vm.prod.productid)
                    }
                  ],
                  eventType: 1,
                  buttonName: "Sourcing",
                  buttonType: "1"
                },
                expression:
                  '{"pageCode":"home", "keys":[{"key":"productId","value":`${prod.id || prod.productId || prod.productid}`}], "eventType": 1, "buttonName": "Sourcing","buttonType": "1"}'
              },
              { name: "cjdot", rawName: "v-cjdot" }
            ],
            staticClass: "detail-anchor",
            attrs: {
              cjdotshow:
                '{"pageCode":"home", "eventType": 0, "buttonName": "Sourcing", "keys":[{"key":"productId","value":"' +
                (_vm.prod.id || _vm.prod.productId || _vm.prod.productid) +
                '"}], "cardName":"Sourcing"}',
              href:
                _vm.prod.flag == 1
                  ? "product-detail.html?id=" +
                    (_vm.prod.id || _vm.prod.productId || _vm.prod.productid) +
                    "&from=all&fromType=&productType=" +
                    (_vm.prod.productType || 0)
                  : "reptail-detail.html?id=" +
                    (_vm.prod.id || _vm.prod.productId || _vm.prod.productid)
            },
            on: {
              click: function($event) {
                return _vm.goTodetail(_vm.prod, $event)
              }
            }
          },
          [
            _c("img", {
              attrs: {
                src: _vm._f("IMG_SIZE")(
                  _vm.prod.bigImg,
                  _vm.imgSize[0],
                  _vm.imgSize[1]
                ),
                onerror: "javascript:this.src='/egg/image/img_default.jpg'"
              }
            }),
            _vm._v(" "),
            _vm.prod.isHaveVideo == "HAVE_VIDEO"
              ? _c("i", {
                  staticClass: "iconfont iconshipinda isVideo",
                  style: { fontSize: _vm.imgSize[0] == 270 ? "45px" : "30px" }
                })
              : _vm._e()
          ]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "move-box" }, [
          _c(
            "a",
            {
              directives: [
                {
                  name: "cjstat",
                  rawName: "v-cjstat",
                  value: {
                    pageCode: "home",
                    keys: [
                      {
                        key: "productId",
                        value:
                          "" +
                          (_vm.prod.id ||
                            _vm.prod.productId ||
                            _vm.prod.productid)
                      }
                    ],
                    eventType: 1,
                    buttonName: "Sourcing",
                    buttonType: "1"
                  },
                  expression:
                    '{"pageCode":"home", "keys":[{"key":"productId","value":`${prod.id || prod.productId || prod.productid}`}], "eventType": 1, "buttonName": "Sourcing","buttonType": "1"}'
                },
                { name: "cjdot", rawName: "v-cjdot" }
              ],
              staticClass: "desc detail-anchor",
              attrs: {
                cjdotshow:
                  '{"pageCode":"home", "eventType": 0, "buttonName": "Sourcing", "keys":[{"key":"productId","value":"' +
                  (_vm.prod.id || _vm.prod.productId || _vm.prod.productid) +
                  '"}], "cardName":"Sourcing"}',
                href:
                  _vm.prod.flag == 1
                    ? "product-detail.html?id=" +
                      (_vm.prod.id || _vm.prod.productId || _vm.prod.productid) +
                      "&from=all&fromType=&productType=" +
                      (_vm.prod.productType || 0)
                    : "reptail-detail.html?id=" +
                      (_vm.prod.id || _vm.prod.productId || _vm.prod.productid)
              },
              on: {
                click: function($event) {
                  return _vm.goTodetail(_vm.prod, $event)
                }
              }
            },
            [
              _vm._v(
                "\n        " +
                  _vm._s(_vm._f("INIT_UPPERCASE")(_vm.prod.nameVal)) +
                  "\n      "
              )
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "list-collect" }, [
            _c("span", { staticClass: "list" }),
            _vm._v(" "),
            _c(
              "div",
              {
                directives: [
                  {
                    name: "cjstat",
                    rawName: "v-cjstat",
                    value: {
                      pageCode: "home",
                      keys: [
                        {
                          key: "productId",
                          value:
                            "" +
                            (_vm.prod.id ||
                              _vm.prod.productId ||
                              _vm.prod.productid)
                        },
                        { key: "collectType", value: "" + _vm.prod.isCollect }
                      ],
                      eventType: 1,
                      buttonName: "collection",
                      buttonType: "1"
                    },
                    expression:
                      '{"pageCode":"home", "keys":[{"key":"productId","value":`${prod.id || prod.productId || prod.productid}`},{"key":"collectType","value": `${prod.isCollect}`}], "eventType": 1, "buttonName": "collection","buttonType": "1"}'
                  }
                ],
                staticClass: "collect",
                class: { active: _vm.prod.isCollect == 1 },
                on: {
                  click: function($event) {
                    return _vm.$clickcollect(_vm.prod)
                  }
                }
              },
              [
                _vm.prod.isCollect == 1
                  ? _c("span", {
                      staticClass: "iconfont icontianjiashoucangzhihou solid"
                    })
                  : _vm._e(),
                _vm._v(" "),
                _vm.prod.isCollect == 0
                  ? _c("span", {
                      staticClass: "iconfont icontianjiashoucang hollow"
                    })
                  : _vm._e()
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "price" }, [
            _vm._v(_vm._s(_vm._f("EXCHANGE_RATE")(_vm._f("GET_PRICE")(_vm.prod))))
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "btns" }, [
            _c(
              "div",
              {
                directives: [
                  {
                    name: "cjstat",
                    rawName: "v-cjstat",
                    value: {
                      pageCode: "home",
                      keys: [
                        {
                          key: "productId",
                          value:
                            "" +
                            (_vm.prod.id ||
                              _vm.prod.productId ||
                              _vm.prod.productid)
                        }
                      ],
                      eventType: 1,
                      buttonName: "Source",
                      buttonType: "1"
                    },
                    expression:
                      '{"pageCode":"home", "keys":[{"key":"productId","value":`${prod.id || prod.productId || prod.productid}`}], "eventType": 1, "buttonName": "Source","buttonType": "1"}'
                  }
                ],
                staticClass: "btn-item list",
                on: {
                  click: function($event) {
                    return _vm.goToList(_vm.prod, "source", $event)
                  }
                }
              },
              [_vm._v(_vm._s(_vm.staticText["Source"]))]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "add-queue" })
        ])
      ])
    ])
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    const __vue_inject_styles__$2 = undefined;
    /* scoped */
    const __vue_scope_id__$2 = "data-v-6246bd30";
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      undefined,
      undefined,
      undefined
    );

  var cjSetInterfereProdId = function cjSetInterfereProdId() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var clear = arguments.length > 1 ? arguments[1] : undefined;

    if (clear) {
      // 清空类目id
      localStorage.removeItem('categoryIdArr');
      return;
    }

    if (!id) return;
    var categoryIdArr = localStorage.getItem('categoryIdArr') && JSON.parse(localStorage.getItem('categoryIdArr')) || [];
    var categoryId = id; // 判断缓存中是否已经存在类目id

    var findIndex = categoryIdArr.findIndex(function (val) {
      return val.categoryId == categoryId;
    });

    if (findIndex != -1) {
      // 已经缓存这个id,直接加1
      categoryIdArr[findIndex].num += 1;
    } else {
      categoryIdArr = categoryIdArr.map(function (_, index) {
        var num = _.num;

        if (categoryIdArr.length >= 4) {
          // 缓存的id大于4个才-1
          num -= 1;
        }

        if (index >= 3 && num <= 0) {
          // 如果是第4个及以上，次数为0，直接过滤
          return false;
        }

        return {
          categoryId: _.categoryId,
          num: num < 0 ? 0 : num
        };
      }).filter(function (_) {
        return !!_;
      });

      if (categoryIdArr.length < 4) {
        // 小于3个直接添加一个
        categoryIdArr.push({
          categoryId: categoryId,
          num: 1
        });
      }
    }

    categoryIdArr.sort(function (a, b) {
      return b.num - a.num;
    });
    localStorage.setItem('categoryIdArr', JSON.stringify(categoryIdArr));
  }; // 获取干预类目id

  var getInterfereProdId = function getInterfereProdId() {
    var data = localStorage.getItem('categoryIdArr') && JSON.parse(localStorage.getItem('categoryIdArr')).map(function (_) {
      return _.categoryId;
    }) || undefined;
    return data;
  }; // 设置版本号

  var setInterfereProdVersion = function setInterfereProdVersion(version, clear) {
    if (clear) {
      // 清空类目id
      localStorage.removeItem('interfereProdVersion');
      return;
    } // localStorage.setItem('interfereProdVersionTime', new Date().getTime()) // 设置版本号的时候，设置当前时间戳


    localStorage.setItem('interfereProdVersion', version);
  }; // 获取版本号

  var getInterfereProdVersion = function getInterfereProdVersion() {
    // 刷新页面或重新加载就清空版本号
    var interfereProdVersion = undefined;
    return function (version) {
      // const nowTime = new Date().getTime();
      // const interfereProdVersionTime = localStorage.getItem('interfereProdVersionTime') || nowTime;
      // if (nowTime - interfereProdVersionTime > 1000 * 3600 * 24 * 2) {
      //   // 如果当前时间>存储时间的2天，清除版本号和类目id
      //   setInterfereProdVersion('', true)
      //   cjSetInterfereProdId('', true)
      // }
      if (version) {
        interfereProdVersion = String(version);

        if (localStorage.getItem('interfereProdVersion') && localStorage.getItem('interfereProdVersion') != interfereProdVersion) {
          // 如果版本号和缓存的版本号不同，说明版本号更新了，就清空类目
          cjSetInterfereProdId('', true);
        }

        setInterfereProdVersion(interfereProdVersion);
      }

      return interfereProdVersion;
    };
  }; // 是否要临时id

  var isTempUserId = function isTempUserId() {
    // 直接export anync函数会报regeneratorRuntime is not defined，先通过这种方式导出anync函数
    var fun = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var tempUserId, _yield$ajax$post, _yield$ajax$post2, error, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (checkLogin()) {
                  _context.next = 14;
                  break;
                }

                // 没有登录且获取临时id
                tempUserId = localStorage.getItem('tempUserId');

                if (tempUserId) {
                  _context.next = 13;
                  break;
                }

                _context.next = 5;
                return utils_4.post('elastic-api/recommend/search/getTempUserId');

              case 5:
                _yield$ajax$post = _context.sent;
                _yield$ajax$post2 = _slicedToArray(_yield$ajax$post, 2);
                error = _yield$ajax$post2[0];
                data = _yield$ajax$post2[1];

                if (!data.success) {
                  _context.next = 12;
                  break;
                }

                localStorage.setItem('tempUserId', data.data);
                return _context.abrupt("return", data.data);

              case 12:
                return _context.abrupt("return", undefined);

              case 13:
                return _context.abrupt("return", tempUserId);

              case 14:
                return _context.abrupt("return", undefined);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function fun() {
        return _ref.apply(this, arguments);
      };
    }();

    return fun;
  }; // 获取临时id

  window.cjMessage = cjMessage;
  window.cjLoading = cjLoading;
  window.cjSetInterfereProdId = cjSetInterfereProdId;
  window.getInterfereProdId = getInterfereProdId;
  window.setInterfereProdVersion = setInterfereProdVersion;
  window.getInterfereProdVersion = getInterfereProdVersion;
  window.isTempUserId = isTempUserId;

  var floors$1 = home_1.floors;
  var floor = new home_1({
    $axios: CJ_.$axios,
    $ajax: CJ_.$ajax
  });
  var mixin = {
    components: {
      productCard: __vue_component__$1,
      productSource: __vue_component__$2
    },
    created: function created() {
      var _this = this;

      floor.getData(this.params, {
        lng: getCookie('lng') || 'en'
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            err = _ref2[0],
            list = _ref2[1];

        err || (_this.list = list);
      });
    }
  }; // 楼层 1

  new Vue({
    el: '#vue-floor-1',
    mixins: [mixin],
    beforeCreate: function beforeCreate() {
      this.params = floors$1.floor_1;
    },
    data: {
      list: [],
      imgSize: [179, 190]
    }
  }); // 楼层 2

  new Vue({
    el: '#vue-floor-2',
    mixins: [mixin],
    beforeCreate: function beforeCreate() {
      this.params = floors$1.floor_2;
    },
    data: {
      list: [],
      imgSize: [179, 190]
    }
  }); // 楼层 3

  new Vue({
    el: '#vue-floor-3',
    mixins: [mixin],
    beforeCreate: function beforeCreate() {
      this.params = floors$1.floor_3;
    },
    data: {
      list: [],
      imgSize: [179, 190]
    }
  });
  new Vue({
    el: '#vue-floor-njk-4',
    beforeCreate: function beforeCreate() {
      this.params = floors$1.floor_4;
    },
    data: {
      list: [],
      imgSize: [179, 190]
    },
    mounted: function mounted() {
      var floor = document.getElementById("vue-floor-njk-4");
      var images = floor.getElementsByTagName("img");
      console.log("##############", images);

      var _loop = function _loop(i) {
        var observer = new IntersectionObserver(function (changes) {
          // changes是观测对象合集（即使是一个观测对象也会形成数组的形式）
          changes.forEach(function (_ref3) {
            var target = _ref3.target,
                isIntersecting = _ref3.isIntersecting;

            // target是节点dom isIntersecting是否有交叉（有交叉就是一部分在可视区一部分不在可视区）
            // 第一次进入如果有交叉证明进入可视区这时候就可以解除
            if (isIntersecting) {
              // 关闭观察器
              observer.disconnect(); // 停止观察

              observer.unobserve(target);
            }

            if (isIntersecting && target.getAttribute("data-url")) {
              // 判断是否数据img存在，如果不存在继续使用默认图片
              target.src = target.getAttribute("data-url");
            }
          });
        }); // 观测根据数据ref生成的dom节点

        observer.observe(images[i]);
      };

      for (var i = 0; i < images.length; i++) {
        _loop(i);
      }
    }
  }); // 楼层 5
  // new Vue({
  //   el: '#vue-floor-5',
  //   mixins: [mixin],
  //   beforeCreate() {
  //     this.params = floors.floor_5;
  //   },
  //   data: {
  //     list: [],
  //     imgSize: [179, 190],
  //   },
  // });
  // 楼层 6
  // new Vue({
  //   el: '#vue-floor-6-left',
  //   mixins: [mixin],
  //   beforeCreate() {
  //     this.params = floors.floor_6.left;
  //   },
  //   data: {
  //     list: [],
  //     imgSize: [270, 290],
  //   },
  // });
  // new Vue({
  //   el: '#vue-floor-6-right',
  //   mixins: [mixin],
  //   beforeCreate() {
  //     this.params = floors.floor_6.right;
  //   },
  //   data: {
  //     list: [],
  //     imgSize: [270, 290],
  //   },
  // });
  // 楼层 7

  new Vue({
    el: '#vue-floor-7-left',
    mixins: [mixin],
    beforeCreate: function beforeCreate() {
      this.params = floors$1.floor_7.left;
    },
    data: {
      list: [],
      imgSize: [270, 290]
    }
  }); // new Vue({
  //   el: '#vue-floor-7-right',
  //   mixins: [mixin],
  //   beforeCreate() {
  //     this.params = floors.floor_7.right;
  //   },
  //   data: {
  //     list: [],
  //     imgSize: [270, 290],
  //   },
  // });
  // 楼层 8

  new Vue({
    el: '#vue-floor-8',
    mixins: [mixin],
    beforeCreate: function beforeCreate() {
      this.params = floors$1.floor_8;
    },
    data: {
      list: [],
      imgSize: [179, 190]
    }
  }); // 选品活动展示模块

  new Vue({
    el: '#vue-floor-njk-8',
    mounted: function mounted() {
      var floor = document.getElementById("vue-floor-njk-8");

      if (!floor) {
        return;
      }

      var images = floor.getElementsByTagName("img");

      var _loop2 = function _loop2(i) {
        var observer = new IntersectionObserver(function (changes) {
          // changes是观测对象合集（即使是一个观测对象也会形成数组的形式）
          changes.forEach(function (_ref4) {
            var target = _ref4.target,
                isIntersecting = _ref4.isIntersecting;

            // target是节点dom isIntersecting是否有交叉（有交叉就是一部分在可视区一部分不在可视区）
            // 第一次进入如果有交叉证明进入可视区这时候就可以解除
            if (isIntersecting) {
              // 关闭观察器
              observer.disconnect(); // 停止观察

              observer.unobserve(target);
            }

            if (isIntersecting && target.getAttribute("data-url")) {
              // 判断是否数据img存在，如果不存在继续使用默认图片
              target.src = target.getAttribute("data-url");
            }
          });
        }); // 观测根据数据ref生成的dom节点

        observer.observe(images[i]);
      };

      for (var i = 0; i < images.length; i++) {
        _loop2(i);
      }
    }
  }); // 楼层 9

  new Vue({
    el: '#vue-floor-9',
    components: {
      productCard: __vue_component__$1,
      productSource: __vue_component__$2,
      loadBounce: __vue_component__
    },
    data: {
      loading: false,
      disable: false,
      clickNum: 0,
      totalPages: 0,
      params: {
        page: null,
        size: 24,
        language: getCookie('lng') || 'en',
        requestSource: '0' // 请求来源  0 : web端 1 : M站/App

      },
      tempUserId: undefined,
      list: [],
      imgSize: [179, 190],
      getVersion: getInterfereProdVersion()
    },
    created: function created() {
      var _this2 = this;

      var getTempUserIdFun = isTempUserId();
      getTempUserIdFun().then(function (tempUserId) {
        _this2.tempUserId = tempUserId;

        _this2.loadMore();
      });
    },
    methods: {
      viewMore: function viewMore() {
        this.clickNum += 1;
        this.params.page += 1;

        if (this.clickNum >= this.totalPages) {
          return;
        } else {
          if (this.params.page > this.totalPages) {
            this.params.page = 1;
          }
        }

        this.loadMore();
      },
      loadMore: function loadMore() {
        var _this3 = this;

        var listen = function listen(loading) {
          return _this3.loading = loading;
        };

        var interfereProdVersion = this.getVersion();
        CJ_.$axios.post('elastic-api/recommend/search/home/queryPage', _objectSpread2(_objectSpread2({}, this.params), {}, {
          versionNum: interfereProdVersion,
          // 版本号
          categoryIdList: getInterfereProdId(),
          // 干预的类目的id集合
          tempUserId: this.tempUserId // 如果没有登录，使用临时id

        }), listen).then(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              err = _ref6[0],
              res = _ref6[1];

          if (err) {
            console.warn(err);
            return;
          }

          var _CJ_$statusCode = CJ_.statusCode200(res),
              _CJ_$statusCode2 = _slicedToArray(_CJ_$statusCode, 2),
              e = _CJ_$statusCode2[0],
              d = _CJ_$statusCode2[1];

          if (res.success) {
            if (Array.isArray(res.data.content)) {
              var tempList = res.data.content.map(function (i) {
                return _objectSpread2(_objectSpread2({}, i), {}, {
                  id: i.productId
                });
              });
              var versionNum = res.data.content[0] && res.data.content[0].versionNum || '';

              if (interfereProdVersion == undefined) {
                // 没有版本号的时候，设置
                _this3.getVersion(versionNum);
              }

              _this3.list = _this3.list.concat(tempList);
              _this3.totalPages = parseInt(res.data.totalPages);
              _this3.params.page = parseInt(res.data.pageNumber);
            }
          }
        });
      }
    } // watch: {
    //   'params.page': function () {
    //   },
    // },

  });
  new Vue({
    el: '#vue-floor-global-warehouse',
    components: {
      productCard: __vue_component__$1,
      productSource: __vue_component__$2
    },
    data: {
      list: [],
      imgSize: [270, 290],
      tabCur: 0,
      isPrev: true,
      isNext: true,
      rowNum: 2,
      pageNum: 0,
      wrapperStyles: {},
      warehouseList: [],
      swiperContainerWidth: 0,
      totalPage: 0,
      throttleBool: true
    },
    beforeCreate: function beforeCreate() {
      this.params = floors$1.floor_global_warehouse();
    },
    created: function created() {
      var _this4 = this;

      var promiseAll = [];
      var list = [];

      for (var index = 0; index < this.params.length; index++) {
        promiseAll.push(floor.getData(this.params[index], {
          lng: getCookie('lng') || 'en'
        }));
      }

      Promise.all(promiseAll).then(function (values) {

        var host = location.host;
        var hostArr = host.split('.');
        var lastHostName = hostArr[hostArr.length - 1];

        for (var i = 0; i < values.length; i++) {
          var _values$i = _slicedToArray(values[i], 2),
              err_list = _values$i[0],
              _values$i$ = _values$i[1],
              data = _values$i$ === void 0 ? [] : _values$i$;

          err_list || list.push({
            areaEn: _this4.params[i].title,
            list: data,
            link:  "http://".concat(_this4.params[i].h, ".test.com")
          });
        }

        _this4.warehouseList = transWarehouseStock(list);

        if (_this4.warehouseList.length <= _this4.rowNum) {
          _this4.isPrev = false;
          _this4.isNext = false;
        } else {
          _this4.isNext = true;
        }

        _this4.$nextTick(function () {
          // 无缝轮播，头部添加最后两个，尾部添加前面两个
          this.totalPage = Math.ceil(document.querySelectorAll('#vue-floor-global-warehouse .swiper-slide').length / 2);
          this.swiperContainerWidth = this.$refs.swiperContainerDom.clientWidth;
          var swiperWrapper = document.querySelector("#vue-floor-global-warehouse .swiper-wrapper");
          var slideAll = document.querySelectorAll('#vue-floor-global-warehouse .swiper-slide');
          var first_slide1 = slideAll[slideAll.length - 2].cloneNode(true);
          var first_slide2 = slideAll[slideAll.length - 1].cloneNode(true);
          var lase_slide3 = slideAll[0].cloneNode(true);
          var lase_slide4 = slideAll[1].cloneNode(true);
          swiperWrapper.addEventListener('transitionend', this.translate3dEnd, false);
          swiperWrapper.insertBefore(first_slide1, slideAll[0]);
          swiperWrapper.insertBefore(first_slide2, slideAll[0]);
          swiperWrapper.appendChild(lase_slide3);
          swiperWrapper.appendChild(lase_slide4);
          this.wrapperStyles = {
            transform: "translate3d(-".concat(this.swiperContainerWidth, "px, 0, 0)")
          };
        });
      });
    },
    methods: {
      // tab翻页
      onPrev: function onPrev() {
        if (this.throttleBool) {
          this.throttleBool = false;
          this.pageNum -= 1;

          if (this.pageNum >= -1) {
            this.isNext = true;
            var transform = this.swiperContainerWidth * (this.pageNum + 1);
            this.wrapperStyles = {
              transition: 'all 300ms ease 0s',
              transform: "translate3d(-".concat(transform, "px, 0, 0)")
            };
          }
        }
      },
      onNext: function onNext() {
        if (this.throttleBool) {
          this.throttleBool = false;
          this.pageNum += 1;

          if (this.pageNum <= this.totalPage) {
            this.isPrev = true;
            var transform = this.swiperContainerWidth * (this.pageNum + 1);
            this.wrapperStyles = {
              transition: 'all 300ms ease 0s',
              transform: "translate3d(-".concat(transform, "px, 0, 0)")
            };
          }
        }
      },
      translate3dEnd: function translate3dEnd() {
        // 动画结束回调
        if (this.pageNum === -1) {
          this.pageNum = this.totalPage - 1;
          var transform = this.swiperContainerWidth * this.totalPage;
          this.wrapperStyles = {
            transform: "translate3d(-".concat(transform, "px, 0, 0)")
          };
        } else if (this.pageNum === this.totalPage) {
          this.pageNum = 0;
          this.wrapperStyles = {
            transform: "translate3d(-".concat(this.swiperContainerWidth, "px, 0, 0)")
          };
        }

        this.throttleBool = true;
      }
    }
  });

  // 楼层联动指示

  new Vue({
    el: '#vue-floor-indicate',
    data: {
      visible: false,
      indicates: [{
        act: false,
        icon: 'iconshouyecuxiao1',
        title: i18next.t('home-cj-super-deals'),
        floor: 1
      }, {
        act: false,
        icon: 'iconshouyeremenchanpin1',
        title: i18next.t('home-trending-products'),
        floor: 2
      }, {
        act: false,
        icon: 'iconshouyexinpin1',
        title: i18next.t('home-new-products'),
        floor: 3
      }, {
        act: false,
        icon: 'iconshouyerexiao1',
        title: i18next.t('home-hot-selling-categories'),
        floor: 4
      }, // { act: false, icon: 'iconshouyeshangjiashangpin1', title: i18next.t('home-listable-products'), floor: 5 },
      // { act: false, icon: 'iconshouyecangku1', title: i18next.t('home-us-warehouse-&-thai-warehouse'), floor: 6 },
      {
        act: false,
        icon: 'iconshouyecangku1',
        title: i18next.t('home-global-warehouses'),
        floor: 'global-warehouse'
      }, {
        act: false,
        icon: 'iconicon-test2',
        title: i18next.t('home-video-products'),
        floor: 7
      }, {
        act: false,
        icon: 'iconshouyebianjishangpin1',
        title: i18next.t('common-print-on-demand'),
        floor: 8
      }, {
        act: false,
        icon: 'iconshouyetuijianshangpin1',
        title: i18next.t('home-recommended-products'),
        floor: 9
      }, {
        act: false,
        icon: 'iconshouyewuliu1',
        title: i18next.t('home-cjdropshipping'),
        floor: 10
      }, {
        act: false,
        icon: 'iconshouyehezuohuoban',
        title: i18next.t('home-partnership'),
        floor: 11
      }, {
        act: false,
        icon: 'iconshouyeappxiazai',
        title: i18next.t('home-cj-app'),
        floor: 12
      }, {
        act: false,
        icon: 'iconshouyepinglun1',
        title: i18next.t('home-reviews'),
        floor: 13
      }, {
        act: false,
        icon: 'iconbianzu5',
        cls: 'back-top'
      }]
    },
    created: function created() {
      window.addEventListener('page-scroll', function (ev) {
        this.scrollHandle(ev.detail);
      }.bind(this));
      this.HEADER_HEIGHT = 78; // 写死头部高度 - 万圣节修改

      this.BANNER_HEIGHT = 550; // 写死 banner 高度
    },
    methods: {
      clickIndicate: function clickIndicate(item, idx) {
        var top;

        if (item.cls === 'back-top') {
          top = 0;
        } else {
          top = $(".floor-".concat(item.floor)).offset().top - this.HEADER_HEIGHT - parseInt($(".floor-".concat(item.floor)).css('marginTop')); //  万圣节修改
        } // if (idx == 9 || idx == 10 || idx == 11) {
        //   animation(false)()
        // }


        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      },
      scrollHandle: function scrollHandle(_ref) {
        var scrollTop = _ref.scrollTop;
        var OFFSET = 20; // 偏移量

        if (scrollTop > this.HEADER_HEIGHT + this.BANNER_HEIGHT + OFFSET) {
          this.visible = true;
          var arr = [];

          for (var x = 0; x < this.indicates.length - 1; x++) {
            var el = $(".floor-".concat(this.indicates[x].floor));

            if (el.length) {
              var top = el.offset().top - this.HEADER_HEIGHT - parseInt(el.css('marginTop')) - 10; // 偏移头部高度

              var tmp = [top, top + el.outerHeight()];
              arr.push(tmp);
            }
          }

          var idx = arr.findIndex(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                top = _ref3[0],
                bottom = _ref3[1];

            return scrollTop > top && scrollTop < bottom;
          });
          this.indicates = this.indicates.map(function (_, i) {
            _.act = idx === i;
            return _;
          });
        } else {
          this.visible = false;
        }
      }
    }
  });

  // import './product-card'; // 商品卡片处理，服务端渲染才会起作用
  // 底部二维码

  new Vue({
    el: '#vue-qr-code',
    data: {
      logined: CJ_isLogin
    },
    created: function created() {
      // erp tocj
      var _that = this;

      var username = CJ_.getQueryVariable('username');
      var tempassword = CJ_.getQueryVariable('tempassword');
      var operateuser = CJ_.getQueryParam('operateuser'); // 拿到的是经过base64加密的字符串

      if (username && tempassword) {
        login({
          name: decodeURIComponent(username),
          passwd: decodeURIComponent(tempassword),
          chatType: "0",
          platform: 'pc',
          isTOCJ: 'true'
        }, function (data) {
          if (data.statusCode != 200) {
            _that.$my_message.info(data.message);
          } else {
            // 保存登录信息
            CJ_.store.set('loginfromerp', '1'); // 标记从erp过来的模拟登录

            CJ_.store.set('erpoperateuser', operateuser); // 记录从erp过来的操作用户

            var cookieObj = {
              expires: 3,
              domain: __root__domain
            };
            CJ_.$cookie.set('loginfromerp', '1', cookieObj);
            CJ_.$cookie.set('erpoperateuser', operateuser, cookieObj);
            saveDataAfterLogin(data.result);
            location.href = 'home.html';
          }
        });
      } else {
        // 如果不是erp过来的登录，加载聊天
        !CJ_.store.get('loginfromerp') && addChatBody();
        !CJ_.store.get('loginfromerp') && addGuidWindow();
      } // 存储分销分享的token


      var affiliate_token = CJ_.getQueryParam("token");
      affiliate_token && CJ_.$cookie.set('invite-token', affiliate_token); // 其他应用通过token登陆cj

      var accessToken = CJ_.getQueryVariable('accessToken');

      if (accessToken) {
        accessToken = CJ_.$base64.decode(accessToken);
        var redirectUrl = decodeURI(CJ_.getQueryVariable('redirectUrl') ? CJ_.getQueryVariable('redirectUrl') : '') || '';
        var params = {
          headers: {
            token: accessToken
          },
          method: 'POST',
          url: 'app/platform/getAccountInfo',
          opts: {}
        };
        CJ_.$axios.httpNew(params).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              err = _ref2[0],
              res = _ref2[1];

          if (err) {
            console.warn(err);
            return;
          }

          if (res.statusCode && res.statusCode == 200) {
            saveDataAfterLogin(res.result);
            var goUrl = redirectUrl || 'home.html';
            location.href = goUrl;
          }
        });
      }
    },
    methods: {
      subscribe: function subscribe() {
        console.log(arguments);
        window.postMessage({
          flag: "openSubscribe"
        }, "*");
      }
    }
  }); // 授权

  new Vue({
    el: '#vue-auth-callback',
    data: {
      authFailLayer: false,
      authFailMes: ''
    },
    mounted: function mounted() {
      var _this = this;

      // ebay授权
      var ebaytype = CJ_.getQueryVariable('type');
      var statename = CJ_.getQueryVariable('state');
      var eabyCode = CJ_.getQueryVariable('code');

      if (ebaytype == 'ebay' && eabyCode) {
        var ebayParams = {
          ebaytype: ebaytype,
          statename: statename,
          eabyCode: eabyCode
        }; // 分销域名通过app授权店铺需要

        if (location.host == 'app.cjdropshipping.com' || location.host == 'cjdropshipping.com') {
          CJ_.$axios.post('cj/account/getYm', {
            name: statename,
            type: "ebay"
          }).then(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                err = _ref4[0],
                res = _ref4[1];

            if (err) {
              console.warn(err);
              return;
            }

            if (res.statusCode == 200 && res.isTz) {
              location.href = 'http://' + data.data.domainName + '/home.html' + window.location.search;
            } else {
              _this.ebayAuth(ebayParams);
            }
          });
        } else {
          this.ebayAuth(ebayParams);
        }
      } // 已经通过cjapp授权，后面通过shopify登录-自动登录


      var shopToken = CJ_.getQueryVariable('shopToken');

      if (statename == 'cjdropshipping') {
        CJ_.$axios.post('app/account/automaticLogin', {
          shopToken: shopToken
        }).then(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              err = _ref6[0],
              res = _ref6[1];

          if (err) {
            console.warn(err);
            return;
          }

          if (res.statusCode == 200) {
            // 保存登录信息
            saveDataAfterLogin(res.result);
            CJ_.store.set('isFirstLogin', '1');
            CJ_.store.set('isEmpower', '2');
            location.href = 'home.html';
          }
        });
      }
    },
    methods: {
      // ebay授权
      ebayAuth: function ebayAuth(ebayParams) {
        var _this2 = this;

        CJ_.$axios.post('ebay/accredit', {
          type: ebayParams.ebaytype,
          name: ebayParams.statename,
          ebayCode: ebayParams.eabyCode
        }).then(function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2),
              err = _ref8[0],
              res = _ref8[1];

          if (err) {
            console.warn(err);
            return;
          }

          if (res.statusCode == 200) {
            _this2.$my_message.info('Authorization  Successfully');
          } else {
            _this2.authFailLayer = true;
            _this2.authFailMes = 'Authorization Failed'; //res.message || 'Authorization Failed';
          }
        });
      },
      reAuthorize: function reAuthorize(shoptype) {
        if (shoptype == 'ebay') {
          location.href = 'myCJ.html#/authorize/Ebay';
        }
      }
    }
  });

  function isView(el) {
    // console.log(el,"555555555555")
    var viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var top = el.getBoundingClientRect() && el.getBoundingClientRect().top; // console.log('top', top)

    return top <= viewPortHeight - 50;
  }

  var animation = function animation() {
    // 图片dom集合
    var itemOne = document.getElementById("img-one");
    var itemTwo = document.getElementById("img-two");
    var itemThree = document.getElementById("img-three");
    var itemFour = document.getElementById("img-four");
    var itemFive = document.getElementById("img-five");
    var itemSix = document.getElementById("img-six");
    var itemSeven = document.getElementById("img-seven");
    var itemEight = document.getElementById("img-eight");
    var itemNine = document.getElementById("img-nine");
    var swiperWrap = document.getElementById("swiper-evalute"); // 文字dom集合

    var itemTextOne = document.getElementById("textOne");
    var itemTextTwo = document.getElementById("textTwo");
    var itemTextThree = document.getElementById("textThree");
    var itemTextFour = document.getElementById("textFour");
    var itemTextFive = document.getElementById("textFive");
    var itemTextSix = document.getElementById("textSix");
    var itemTextSeven = document.getElementById("textSeven");
    var title = document.getElementById("title"); // 图片集合

    var viewSwiperWrap = isView(swiperWrap);
    var viewOne = isView(itemOne);
    var viewTwo = isView(itemTwo);
    var viewThree = isView(itemThree);
    var viewFour = isView(itemFour);
    var viewFive = isView(itemFive);
    var viewSix = isView(itemSix);
    var viewSeven = isView(itemSeven);
    var viewEight = isView(itemEight);
    var viewNine = isView(itemNine);

    if (viewOne) {
      itemOne.classList.add("img-animation");
    }

    if (viewTwo) {
      itemTwo.classList.add("img-animation");
    }

    if (viewThree) {
      itemThree.classList.add("img-animation");
    }

    if (viewFour) {
      itemFour.classList.add("img-animation");
    }

    if (viewFive) {
      itemFive.classList.add("img-left-top-animation");
    }

    if (viewSix) {
      itemSix.classList.add("center-animation");
    }

    if (viewSeven) {
      itemSeven.classList.add("img-right-bottom-animations");
    }

    if (viewEight) {
      itemEight.classList.add("left-code-show");
    }

    if (viewNine) {
      itemNine.classList.add("link-button-show");
    }

    if (viewSwiperWrap) {
      swiperWrap.classList.add("img-right-bottom-animation");
    } // 文字集合


    var viewTitle = isView(title);
    var viewTextOne = isView(itemTextOne);
    var viewTextTwo = isView(itemTextTwo);
    var viewTextThree = isView(itemTextThree);
    var viewTextFour = isView(itemTextFour);
    var viewTextFive = isView(itemTextFive);
    var viewTextSix = isView(itemTextSix);

    if (viewTextOne) {
      itemTextOne.classList.add("homepage-head-up");
      itemTextSeven.classList.add("head-detail-center-move");
    }

    if (viewTextTwo) {
      itemTextTwo.classList.add("left-enter");
    }

    if (viewTextThree) {
      itemTextThree.classList.add("center-text-up");
    }

    if (viewTextFour) {
      itemTextFour.classList.add("right-enter");
    }

    if (viewTextFive) {
      itemTextFive.classList.add("cooperation-detail-move");
    }

    if (viewTextSix) {
      itemTextSix.classList.add("left-title-move");
    }

    if (viewTextSix) {
      itemTextSix.classList.add("left-title-move");
    }

    if (viewTitle) {
      title.classList.add("left-title-move");
    }
  };
  new Vue({
    el: '#vue-companylogo',
    data: {
      // trankNum:"5555",
      coopList: [],
      hrefData: location.origin
    },
    created: function created() {},
    mounted: function mounted() {
      document.addEventListener("scroll", animation);
    },
    destroyed: function destroyed() {
      document.removeEventListener("scroll", animation);
    },
    methods: {
      clicknow: function clicknow() {
        var item = document.getElementById("tranNum");
        var value = item.value;
        window.open("https://cjpacket.com/?trackingNumber=".concat(value));
      },
      appclick: function appclick() {
        window.open("https://apps.apple.com/cn/app/cjdropshipping/id1458056352");
      },
      googleclick: function googleclick() {
        window.open("https://play.google.com/store/apps/details?id=com.cjdropshipping.app");
      },
      trycountlink: function trycountlink() {
        window.open("https://app.cjdropshipping.com/calculation.html");
      },
      cooperationlink: function cooperationlink(type) {
        if (type == 1) {
          location.href = "".concat(location.origin, "/partnership/home");
        } else if (type == 2) {
          location.href = 'https://affiliate.cjdropshipping.com';
        } // location.href = 'https://affiliate.cjdropshipping.com/#/home';

      },
      sortFun: function sortFun(arr) {
        return arr.sort(function (a, b) {
          return a.recommendPosition - b.recommendPosition;
        });
      } // getTrankNum(e){
      //   const item = document.getElementById("tranNum")
      //   const value = item.value
      //   console.log(value,e.target.value)
      // }

    }
  }); //三级目录

  new Vue({
    el: '#vue-banner-wrap',
    beforeCreate: function beforeCreate() {},
    data: {}
  }); //底部链接

  new Vue({
    el: '#vue-get-more',
    beforeCreate: function beforeCreate() {},
    data: {}
  });

  try {
    var flowId = CJ_.getQueryVariable('flowId');
    var flowIdLocalstorage = localStorage.getItem('flowId');

    if (flowId || flowIdLocalstorage) {
      localStorage.setItem('flowId', flowId || flowIdLocalstorage);
      var params = {
        flowId: flowId || flowIdLocalstorage
      };
      CJ_.$axios.post('app/account/addClickCount', params).then(function (_ref9) {
        var _ref10 = _slicedToArray(_ref9, 2),
            err = _ref10[0],
            res = _ref10[1];
      });
    }
  } catch (err) {
    console.log('输入flowId报错');
  }

  function getCookie$1(c_name) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + "=");

      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        var c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) c_end = document.cookie.length;
        return document.cookie.substring(c_start, c_end);
      }
    }

    return "";
  }

  function delCookie(name) {
    // console.log("__root__domain",__root__domain)
    var exp = new Date();
    exp.setDate(exp.getDate() - 1);
    var cval = getCookie$1(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";domain=".concat(__root__domain);
  }

  function setAwcCookie() {
    var urlLinkStr = location.search;
    console.log(urlLinkStr);

    if (urlLinkStr && urlLinkStr.indexOf('?') != -1) {
      var queryAwcObj = {};
      var queryStr = urlLinkStr.substr(1); //substr()方法返回从参数值开始到结束的字符串；

      var queryStrs = queryStr.split('&');

      for (var i = 0; i < queryStrs.length; i++) {
        queryAwcObj[queryStrs[i].split('=')[0]] = queryStrs[i].split('=')[1];
      }

      if (queryAwcObj.awc) {
        var exp = new Date();
        exp.setTime(exp.getTime() + 365 * 24 * 60 * 60 * 1000);
        document.cookie = "awc" + "=" + escape(queryAwcObj.awc) + ";expires=" + exp.toGMTString();
        document.cookie = "utm_source=awin;expires=" + exp.toGMTString();

        if (queryAwcObj.awinaffid) {
          document.cookie = "awinaffid=" + escape(queryAwcObj.awinaffid) + ";expires=" + exp.toGMTString();
        }

        var invite = getCookie$1("invite-token");

        if (invite) {
          delCookie("invite-token");
        }
      }
    }
  }

  var loginName = localStorage.getItem("loginName");

  if (!loginName) {
    setAwcCookie();
  } // const halloween = document.getElementById('halloween');
  !function loginedHandle() {
    if (!CJ_isLogin) {
      return;
    }
  }();

  exports.animation = animation;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=maps/home.js.map
