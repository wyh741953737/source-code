(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.index = {}));
}(this, (function (exports) { 'use strict';

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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
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

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
  }

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

  var EventTracking = function EventTracking(cg) {
    var config = _objectSpread2({
      dataName: {
        // ，埋点属性名
        elementClick: 'cj-data-tracking-element-click',
        elementView: 'cj-data-tracking-element-view'
      },
      maxNum: 5,
      // 数据累计多少条上报一次
      postUrl: '',
      // 埋点接口地址
      processData: function processData(attrData) {
        // 处理埋点数据结构
        return attrData;
      },
      submitConditions: function submitConditions() {
        return true;
      },
      // 所有埋点提交条件
      viewConditions: function viewConditions() {
        return true;
      },
      // 曝光埋点提交条件
      clickConditions: function clickConditions() {
        return true;
      },
      // 点击埋点提交条件
      submitData: function submitData(attrData, type) {
        // 埋点事件
        var dataList = config.processData(attrData, type);

        if (!config.submitConditions(dataList, config.maxNum)) {
          return;
        }

        if (type === config.dataName.elementView) {
          if (!config.viewConditions(dataList, config.maxNum)) {
            return;
          } else {
            // 如果是曝光，清空缓存数据
            removeLocalData();
          }
        } else if (type === config.dataName.elementClick) {
          if (!config.clickConditions(dataList, config.maxNum)) {
            return;
          }
        }

        mdPostFun(dataList);
      }
    }, cg);

    var saveLocalData = function saveLocalData(data) {
      localStorage.setItem('cj-data-tracking', JSON.stringify(data));
    };

    var getLocalData = function getLocalData() {
      return JSON.parse(localStorage.getItem('cj-data-tracking')) || [];
    };

    var removeLocalData = function removeLocalData() {
      localStorage.removeItem('cj-data-tracking');
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, index) {
        // 这段逻辑，是每一个被观察的组件进入视窗时都会触发的
        if (entry.isIntersecting) {
          var dataList = getLocalData(); // 把进入视口的组件数据添加进待上报的数据对象中

          if (entry.target.attributes[config.dataName.elementView]) {
            var data = entry.target.attributes[config.dataName.elementView].value;
            data = JSON.parse(data);
            dataList.push(data); // 停止观察进入视口的组件
            // observer.unobserve(entry.target)

            saveLocalData(dataList);
            config.submitData(dataList, config.dataName.elementView);
          }
        }
      });
    }, {
      root: null,
      // 默认根节点是视口
      rootMargin: '0px',
      threshold: 0.7 // 全部进入视口才被观察  这个阈值介于0和1之间

    });
    setTimeout(function () {
      document.querySelectorAll("[".concat(config.dataName.elementView, "]")).forEach(function (item) {
        observer.observe(item); // 观察每一个进入视口的区域
      });
      document.querySelectorAll("[".concat(config.dataName.elementClick, "]")).forEach(function (item) {
        item.onclick = function (e) {
          var data = e.currentTarget.attributes[config.dataName.elementClick].value;
          data = JSON.parse(data);
          config.submitData(data, config.dataName.elementClick);
        };
      });
    }, 100); // 如果页面刷新后存在上一次没有提报表的埋点，直接上传缓存中的埋点

    dotFromLocalStorage();

    function dotFromLocalStorage() {
      var data = getLocalData();

      if (data.length > 0) {
        var dataList = config.processData(data, config.dataName.elementView);
        mdPostFun(dataList);
      }

      removeLocalData();
    }
    /**
     * 发送数据到后台
     * @param {发送数据到后台} parames 
     */


    function mdPostFun(data) {
      var url = utils$1.getDomainByUrl(config.postUrl);
      axios$1.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
      axios$1.defaults.headers['Accept'] = 'application/json;charset=UTF-8';
      axios$1.defaults.headers['token'] = typeof window == 'undefined' ? '' : utils$1.$base64.decode(localStorage.getItem('token') || '');
      axios$1.post(url, data);
    }

    return {
      mdPostFun: mdPostFun,
      removeLocalData: removeLocalData,
      dataName: config.dataName
    };
  }; // window.EventTracking = EventTracking

  exports.EventTracking = EventTracking;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=maps/eventTracking.js.map
