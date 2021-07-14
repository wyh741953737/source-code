(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

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

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var dist = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
       module.exports = factory() ;
    })(commonjsGlobal, function () {

      var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};

      var check = function check(it) {
        return it && it.Math == Math && it;
      }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


      var global$n = // eslint-disable-next-line es/no-global-this -- safe
      check((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) == 'object' && globalThis) || check((typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
      check((typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self) || check(_typeof(commonjsGlobal$1) == 'object' && commonjsGlobal$1) || // eslint-disable-next-line no-new-func -- fallback
      function () {
        return this;
      }() || Function('return this')();

      var objectGetOwnPropertyDescriptor = {};

      var fails$h = function fails$h(exec) {
        try {
          return !!exec();
        } catch (error) {
          return true;
        }
      };

      var fails$g = fails$h; // Detect IE8's incomplete defineProperty implementation

      var descriptors = !fails$g(function () {
        // eslint-disable-next-line es/no-object-defineproperty -- required for testing
        return Object.defineProperty({}, 1, {
          get: function get() {
            return 7;
          }
        })[1] != 7;
      });
      var objectPropertyIsEnumerable = {};
      var $propertyIsEnumerable$1 = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

      var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

      var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable$1.call({
        1: 2
      }, 1); // `Object.prototype.propertyIsEnumerable` method implementation
      // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

      objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
        var descriptor = getOwnPropertyDescriptor$2(this, V);
        return !!descriptor && descriptor.enumerable;
      } : $propertyIsEnumerable$1;

      var createPropertyDescriptor$5 = function createPropertyDescriptor$5(bitmap, value) {
        return {
          enumerable: !(bitmap & 1),
          configurable: !(bitmap & 2),
          writable: !(bitmap & 4),
          value: value
        };
      };

      var toString$2 = {}.toString;

      var classofRaw$1 = function classofRaw$1(it) {
        return toString$2.call(it).slice(8, -1);
      };

      var fails$f = fails$h;
      var classof$7 = classofRaw$1;
      var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

      var indexedObject = fails$f(function () {
        // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
        // eslint-disable-next-line no-prototype-builtins -- safe
        return !Object('z').propertyIsEnumerable(0);
      }) ? function (it) {
        return classof$7(it) == 'String' ? split.call(it, '') : Object(it);
      } : Object; // `RequireObjectCoercible` abstract operation
      // https://tc39.es/ecma262/#sec-requireobjectcoercible

      var requireObjectCoercible$8 = function requireObjectCoercible$8(it) {
        if (it == undefined) throw TypeError("Can't call method on " + it);
        return it;
      }; // toObject with fallback for non-array-like ES3 strings


      var IndexedObject$2 = indexedObject;
      var requireObjectCoercible$7 = requireObjectCoercible$8;

      var toIndexedObject$b = function toIndexedObject$b(it) {
        return IndexedObject$2(requireObjectCoercible$7(it));
      };

      var isObject$d = function isObject$d(it) {
        return _typeof(it) === 'object' ? it !== null : typeof it === 'function';
      };

      var isObject$c = isObject$d; // `ToPrimitive` abstract operation
      // https://tc39.es/ecma262/#sec-toprimitive
      // instead of the ES6 spec version, we didn't implement @@toPrimitive case
      // and the second argument - flag - preferred type is a string

      var toPrimitive$4 = function toPrimitive$4(input, PREFERRED_STRING) {
        if (!isObject$c(input)) return input;
        var fn, val;
        if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$c(val = fn.call(input))) return val;
        if (typeof (fn = input.valueOf) == 'function' && !isObject$c(val = fn.call(input))) return val;
        if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$c(val = fn.call(input))) return val;
        throw TypeError("Can't convert object to primitive value");
      };

      var requireObjectCoercible$6 = requireObjectCoercible$8; // `ToObject` abstract operation
      // https://tc39.es/ecma262/#sec-toobject

      var toObject$9 = function toObject$9(argument) {
        return Object(requireObjectCoercible$6(argument));
      };

      var toObject$8 = toObject$9;
      var hasOwnProperty = {}.hasOwnProperty;

      var has$c = function hasOwn(it, key) {
        return hasOwnProperty.call(toObject$8(it), key);
      };

      var global$m = global$n;
      var isObject$b = isObject$d;
      var document$3 = global$m.document; // typeof document.createElement is 'object' in old IE

      var EXISTS = isObject$b(document$3) && isObject$b(document$3.createElement);

      var documentCreateElement$1 = function documentCreateElement$1(it) {
        return EXISTS ? document$3.createElement(it) : {};
      };

      var DESCRIPTORS$d = descriptors;
      var fails$e = fails$h;
      var createElement$1 = documentCreateElement$1; // Thank's IE8 for his funny defineProperty

      var ie8DomDefine = !DESCRIPTORS$d && !fails$e(function () {
        // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
        return Object.defineProperty(createElement$1('div'), 'a', {
          get: function get() {
            return 7;
          }
        }).a != 7;
      });
      var DESCRIPTORS$c = descriptors;
      var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
      var createPropertyDescriptor$4 = createPropertyDescriptor$5;
      var toIndexedObject$a = toIndexedObject$b;
      var toPrimitive$3 = toPrimitive$4;
      var has$b = has$c;
      var IE8_DOM_DEFINE$1 = ie8DomDefine; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

      var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
      // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

      objectGetOwnPropertyDescriptor.f = DESCRIPTORS$c ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
        O = toIndexedObject$a(O);
        P = toPrimitive$3(P, true);
        if (IE8_DOM_DEFINE$1) try {
          return $getOwnPropertyDescriptor$1(O, P);
        } catch (error) {
          /* empty */
        }
        if (has$b(O, P)) return createPropertyDescriptor$4(!propertyIsEnumerableModule$1.f.call(O, P), O[P]);
      };
      var objectDefineProperty = {};
      var isObject$a = isObject$d;

      var anObject$f = function anObject$f(it) {
        if (!isObject$a(it)) {
          throw TypeError(String(it) + ' is not an object');
        }

        return it;
      };

      var DESCRIPTORS$b = descriptors;
      var IE8_DOM_DEFINE = ie8DomDefine;
      var anObject$e = anObject$f;
      var toPrimitive$2 = toPrimitive$4; // eslint-disable-next-line es/no-object-defineproperty -- safe

      var $defineProperty$1 = Object.defineProperty; // `Object.defineProperty` method
      // https://tc39.es/ecma262/#sec-object.defineproperty

      objectDefineProperty.f = DESCRIPTORS$b ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
        anObject$e(O);
        P = toPrimitive$2(P, true);
        anObject$e(Attributes);
        if (IE8_DOM_DEFINE) try {
          return $defineProperty$1(O, P, Attributes);
        } catch (error) {
          /* empty */
        }
        if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
        if ('value' in Attributes) O[P] = Attributes.value;
        return O;
      };
      var DESCRIPTORS$a = descriptors;
      var definePropertyModule$6 = objectDefineProperty;
      var createPropertyDescriptor$3 = createPropertyDescriptor$5;
      var createNonEnumerableProperty$a = DESCRIPTORS$a ? function (object, key, value) {
        return definePropertyModule$6.f(object, key, createPropertyDescriptor$3(1, value));
      } : function (object, key, value) {
        object[key] = value;
        return object;
      };
      var redefine$8 = {
        exports: {}
      };
      var global$l = global$n;
      var createNonEnumerableProperty$9 = createNonEnumerableProperty$a;

      var setGlobal$3 = function setGlobal$3(key, value) {
        try {
          createNonEnumerableProperty$9(global$l, key, value);
        } catch (error) {
          global$l[key] = value;
        }

        return value;
      };

      var global$k = global$n;
      var setGlobal$2 = setGlobal$3;
      var SHARED = '__core-js_shared__';
      var store$3 = global$k[SHARED] || setGlobal$2(SHARED, {});
      var sharedStore = store$3;
      var store$2 = sharedStore;
      var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

      if (typeof store$2.inspectSource != 'function') {
        store$2.inspectSource = function (it) {
          return functionToString.call(it);
        };
      }

      var inspectSource$3 = store$2.inspectSource;
      var global$j = global$n;
      var inspectSource$2 = inspectSource$3;
      var WeakMap$1 = global$j.WeakMap;
      var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$2(WeakMap$1));
      var shared$5 = {
        exports: {}
      };
      var store$1 = sharedStore;
      (shared$5.exports = function (key, value) {
        return store$1[key] || (store$1[key] = value !== undefined ? value : {});
      })('versions', []).push({
        version: '3.12.1',
        mode: 'global',
        copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
      });
      var id = 0;
      var postfix = Math.random();

      var uid$3 = function uid$3(key) {
        return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
      };

      var shared$4 = shared$5.exports;
      var uid$2 = uid$3;
      var keys = shared$4('keys');

      var sharedKey$4 = function sharedKey$4(key) {
        return keys[key] || (keys[key] = uid$2(key));
      };

      var hiddenKeys$5 = {};
      var NATIVE_WEAK_MAP = nativeWeakMap;
      var global$i = global$n;
      var isObject$9 = isObject$d;
      var createNonEnumerableProperty$8 = createNonEnumerableProperty$a;
      var objectHas = has$c;
      var shared$3 = sharedStore;
      var sharedKey$3 = sharedKey$4;
      var hiddenKeys$4 = hiddenKeys$5;
      var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
      var WeakMap = global$i.WeakMap;
      var set$1, get, has$a;

      var enforce = function enforce(it) {
        return has$a(it) ? get(it) : set$1(it, {});
      };

      var getterFor = function getterFor(TYPE) {
        return function (it) {
          var state;

          if (!isObject$9(it) || (state = get(it)).type !== TYPE) {
            throw TypeError('Incompatible receiver, ' + TYPE + ' required');
          }

          return state;
        };
      };

      if (NATIVE_WEAK_MAP || shared$3.state) {
        var store = shared$3.state || (shared$3.state = new WeakMap());
        var wmget = store.get;
        var wmhas = store.has;
        var wmset = store.set;

        set$1 = function set$1(it, metadata) {
          if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
          metadata.facade = it;
          wmset.call(store, it, metadata);
          return metadata;
        };

        get = function get(it) {
          return wmget.call(store, it) || {};
        };

        has$a = function has$a(it) {
          return wmhas.call(store, it);
        };
      } else {
        var STATE = sharedKey$3('state');
        hiddenKeys$4[STATE] = true;

        set$1 = function set$1(it, metadata) {
          if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
          metadata.facade = it;
          createNonEnumerableProperty$8(it, STATE, metadata);
          return metadata;
        };

        get = function get(it) {
          return objectHas(it, STATE) ? it[STATE] : {};
        };

        has$a = function has$a(it) {
          return objectHas(it, STATE);
        };
      }

      var internalState = {
        set: set$1,
        get: get,
        has: has$a,
        enforce: enforce,
        getterFor: getterFor
      };
      var global$h = global$n;
      var createNonEnumerableProperty$7 = createNonEnumerableProperty$a;
      var has$9 = has$c;
      var setGlobal$1 = setGlobal$3;
      var inspectSource$1 = inspectSource$3;
      var InternalStateModule$4 = internalState;
      var getInternalState$4 = InternalStateModule$4.get;
      var enforceInternalState = InternalStateModule$4.enforce;
      var TEMPLATE = String(String).split('String');
      (redefine$8.exports = function (O, key, value, options) {
        var unsafe = options ? !!options.unsafe : false;
        var simple = options ? !!options.enumerable : false;
        var noTargetGet = options ? !!options.noTargetGet : false;
        var state;

        if (typeof value == 'function') {
          if (typeof key == 'string' && !has$9(value, 'name')) {
            createNonEnumerableProperty$7(value, 'name', key);
          }

          state = enforceInternalState(value);

          if (!state.source) {
            state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
          }
        }

        if (O === global$h) {
          if (simple) O[key] = value;else setGlobal$1(key, value);
          return;
        } else if (!unsafe) {
          delete O[key];
        } else if (!noTargetGet && O[key]) {
          simple = true;
        }

        if (simple) O[key] = value;else createNonEnumerableProperty$7(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
      })(Function.prototype, 'toString', function toString() {
        return typeof this == 'function' && getInternalState$4(this).source || inspectSource$1(this);
      });
      var global$g = global$n;
      var path$2 = global$g;
      var path$1 = path$2;
      var global$f = global$n;

      var aFunction$5 = function aFunction$5(variable) {
        return typeof variable == 'function' ? variable : undefined;
      };

      var getBuiltIn$6 = function getBuiltIn$6(namespace, method) {
        return arguments.length < 2 ? aFunction$5(path$1[namespace]) || aFunction$5(global$f[namespace]) : path$1[namespace] && path$1[namespace][method] || global$f[namespace] && global$f[namespace][method];
      };

      var objectGetOwnPropertyNames = {};
      var ceil = Math.ceil;
      var floor$1 = Math.floor; // `ToInteger` abstract operation
      // https://tc39.es/ecma262/#sec-tointeger

      var toInteger$5 = function toInteger$5(argument) {
        return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$1 : ceil)(argument);
      };

      var toInteger$4 = toInteger$5;
      var min$4 = Math.min; // `ToLength` abstract operation
      // https://tc39.es/ecma262/#sec-tolength

      var toLength$a = function toLength$a(argument) {
        return argument > 0 ? min$4(toInteger$4(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
      };

      var toInteger$3 = toInteger$5;
      var max$3 = Math.max;
      var min$3 = Math.min; // Helper for a popular repeating case of the spec:
      // Let integer be ? ToInteger(index).
      // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

      var toAbsoluteIndex$3 = function toAbsoluteIndex$3(index, length) {
        var integer = toInteger$3(index);
        return integer < 0 ? max$3(integer + length, 0) : min$3(integer, length);
      };

      var toIndexedObject$9 = toIndexedObject$b;
      var toLength$9 = toLength$a;
      var toAbsoluteIndex$2 = toAbsoluteIndex$3; // `Array.prototype.{ indexOf, includes }` methods implementation

      var createMethod$4 = function createMethod$4(IS_INCLUDES) {
        return function ($this, el, fromIndex) {
          var O = toIndexedObject$9($this);
          var length = toLength$9(O.length);
          var index = toAbsoluteIndex$2(fromIndex, length);
          var value; // Array#includes uses SameValueZero equality algorithm
          // eslint-disable-next-line no-self-compare -- NaN check

          if (IS_INCLUDES && el != el) while (length > index) {
            value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

            if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
          } else for (; length > index; index++) {
            if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
          }
          return !IS_INCLUDES && -1;
        };
      };

      var arrayIncludes = {
        // `Array.prototype.includes` method
        // https://tc39.es/ecma262/#sec-array.prototype.includes
        includes: createMethod$4(true),
        // `Array.prototype.indexOf` method
        // https://tc39.es/ecma262/#sec-array.prototype.indexof
        indexOf: createMethod$4(false)
      };
      var has$8 = has$c;
      var toIndexedObject$8 = toIndexedObject$b;
      var indexOf = arrayIncludes.indexOf;
      var hiddenKeys$3 = hiddenKeys$5;

      var objectKeysInternal = function objectKeysInternal(object, names) {
        var O = toIndexedObject$8(object);
        var i = 0;
        var result = [];
        var key;

        for (key in O) {
          !has$8(hiddenKeys$3, key) && has$8(O, key) && result.push(key);
        } // Don't enum bug & hidden keys


        while (names.length > i) {
          if (has$8(O, key = names[i++])) {
            ~indexOf(result, key) || result.push(key);
          }
        }

        return result;
      }; // IE8- don't enum bug keys


      var enumBugKeys$3 = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
      var internalObjectKeys$1 = objectKeysInternal;
      var enumBugKeys$2 = enumBugKeys$3;
      var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
      // https://tc39.es/ecma262/#sec-object.getownpropertynames
      // eslint-disable-next-line es/no-object-getownpropertynames -- safe

      objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
        return internalObjectKeys$1(O, hiddenKeys$2);
      };

      var objectGetOwnPropertySymbols = {}; // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe

      objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
      var getBuiltIn$5 = getBuiltIn$6;
      var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
      var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
      var anObject$d = anObject$f; // all object keys, includes non-enumerable and symbols

      var ownKeys$4 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
        var keys = getOwnPropertyNamesModule$1.f(anObject$d(it));
        var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
        return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
      };

      var has$7 = has$c;
      var ownKeys$3 = ownKeys$4;
      var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
      var definePropertyModule$5 = objectDefineProperty;

      var copyConstructorProperties$2 = function copyConstructorProperties$2(target, source) {
        var keys = ownKeys$3(source);
        var defineProperty = definePropertyModule$5.f;
        var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (!has$7(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
        }
      };

      var fails$d = fails$h;
      var replacement = /#|\.prototype\./;

      var isForced$2 = function isForced$2(feature, detection) {
        var value = data[normalize(feature)];
        return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails$d(detection) : !!detection;
      };

      var normalize = isForced$2.normalize = function (string) {
        return String(string).replace(replacement, '.').toLowerCase();
      };

      var data = isForced$2.data = {};
      var NATIVE = isForced$2.NATIVE = 'N';
      var POLYFILL = isForced$2.POLYFILL = 'P';
      var isForced_1 = isForced$2;
      var global$e = global$n;
      var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
      var createNonEnumerableProperty$6 = createNonEnumerableProperty$a;
      var redefine$7 = redefine$8.exports;
      var setGlobal = setGlobal$3;
      var copyConstructorProperties$1 = copyConstructorProperties$2;
      var isForced$1 = isForced_1;
      /*
        options.target      - name of the target object
        options.global      - target is the global object
        options.stat        - export as static methods of target
        options.proto       - export as prototype methods of target
        options.real        - real prototype method for the `pure` version
        options.forced      - export even if the native feature is available
        options.bind        - bind methods to the target, required for the `pure` version
        options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
        options.unsafe      - use the simple assignment of property instead of delete + defineProperty
        options.sham        - add a flag to not completely full polyfills
        options.enumerable  - export as enumerable property
        options.noTargetGet - prevent calling a getter on target
      */

      var _export = function _export(options, source) {
        var TARGET = options.target;
        var GLOBAL = options.global;
        var STATIC = options.stat;
        var FORCED, target, key, targetProperty, sourceProperty, descriptor;

        if (GLOBAL) {
          target = global$e;
        } else if (STATIC) {
          target = global$e[TARGET] || setGlobal(TARGET, {});
        } else {
          target = (global$e[TARGET] || {}).prototype;
        }

        if (target) for (key in source) {
          sourceProperty = source[key];

          if (options.noTargetGet) {
            descriptor = getOwnPropertyDescriptor$1(target, key);
            targetProperty = descriptor && descriptor.value;
          } else targetProperty = target[key];

          FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

          if (!FORCED && targetProperty !== undefined) {
            if (_typeof(sourceProperty) === _typeof(targetProperty)) continue;
            copyConstructorProperties$1(sourceProperty, targetProperty);
          } // add a flag to not completely full polyfills


          if (options.sham || targetProperty && targetProperty.sham) {
            createNonEnumerableProperty$6(sourceProperty, 'sham', true);
          } // extend global


          redefine$7(target, key, sourceProperty, options);
        }
      };

      var internalObjectKeys = objectKeysInternal;
      var enumBugKeys$1 = enumBugKeys$3; // `Object.keys` method
      // https://tc39.es/ecma262/#sec-object.keys
      // eslint-disable-next-line es/no-object-keys -- safe

      var objectKeys$3 = Object.keys || function keys(O) {
        return internalObjectKeys(O, enumBugKeys$1);
      };

      var $$p = _export;
      var toObject$7 = toObject$9;
      var nativeKeys = objectKeys$3;
      var fails$c = fails$h;
      var FAILS_ON_PRIMITIVES$1 = fails$c(function () {
        nativeKeys(1);
      }); // `Object.keys` method
      // https://tc39.es/ecma262/#sec-object.keys

      $$p({
        target: 'Object',
        stat: true,
        forced: FAILS_ON_PRIMITIVES$1
      }, {
        keys: function keys(it) {
          return nativeKeys(toObject$7(it));
        }
      });
      var getBuiltIn$4 = getBuiltIn$6;
      var engineUserAgent = getBuiltIn$4('navigator', 'userAgent') || '';
      var global$d = global$n;
      var userAgent$3 = engineUserAgent;
      var process$3 = global$d.process;
      var versions = process$3 && process$3.versions;
      var v8 = versions && versions.v8;
      var match, version;

      if (v8) {
        match = v8.split('.');
        version = match[0] < 4 ? 1 : match[0] + match[1];
      } else if (userAgent$3) {
        match = userAgent$3.match(/Edge\/(\d+)/);

        if (!match || match[1] >= 74) {
          match = userAgent$3.match(/Chrome\/(\d+)/);
          if (match) version = match[1];
        }
      }

      var engineV8Version = version && +version;
      /* eslint-disable es/no-symbol -- required for testing */

      var V8_VERSION$3 = engineV8Version;
      var fails$b = fails$h; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

      var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$b(function () {
        return !String(Symbol()) || // Chrome 38 Symbol has incorrect toString conversion
        // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
        !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
      });
      /* eslint-disable es/no-symbol -- required for testing */

      var NATIVE_SYMBOL$2 = nativeSymbol;
      var useSymbolAsUid = NATIVE_SYMBOL$2 && !Symbol.sham && _typeof(Symbol.iterator) == 'symbol';
      var classof$6 = classofRaw$1; // `IsArray` abstract operation
      // https://tc39.es/ecma262/#sec-isarray
      // eslint-disable-next-line es/no-array-isarray -- safe

      var isArray$5 = Array.isArray || function isArray(arg) {
        return classof$6(arg) == 'Array';
      };

      var DESCRIPTORS$9 = descriptors;
      var definePropertyModule$4 = objectDefineProperty;
      var anObject$c = anObject$f;
      var objectKeys$2 = objectKeys$3; // `Object.defineProperties` method
      // https://tc39.es/ecma262/#sec-object.defineproperties
      // eslint-disable-next-line es/no-object-defineproperties -- safe

      var objectDefineProperties = DESCRIPTORS$9 ? Object.defineProperties : function defineProperties(O, Properties) {
        anObject$c(O);
        var keys = objectKeys$2(Properties);
        var length = keys.length;
        var index = 0;
        var key;

        while (length > index) {
          definePropertyModule$4.f(O, key = keys[index++], Properties[key]);
        }

        return O;
      };
      var getBuiltIn$3 = getBuiltIn$6;
      var html$2 = getBuiltIn$3('document', 'documentElement');
      var anObject$b = anObject$f;
      var defineProperties$1 = objectDefineProperties;
      var enumBugKeys = enumBugKeys$3;
      var hiddenKeys$1 = hiddenKeys$5;
      var html$1 = html$2;
      var documentCreateElement = documentCreateElement$1;
      var sharedKey$2 = sharedKey$4;
      var GT = '>';
      var LT = '<';
      var PROTOTYPE$1 = 'prototype';
      var SCRIPT = 'script';
      var IE_PROTO$1 = sharedKey$2('IE_PROTO');

      var EmptyConstructor = function EmptyConstructor() {
        /* empty */
      };

      var scriptTag = function scriptTag(content) {
        return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
      }; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


      var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
        activeXDocument.write(scriptTag(''));
        activeXDocument.close();
        var temp = activeXDocument.parentWindow.Object;
        activeXDocument = null; // avoid memory leak

        return temp;
      }; // Create object with fake `null` prototype: use iframe Object with cleared prototype


      var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
        // Thrash, waste and sodomy: IE GC bug
        var iframe = documentCreateElement('iframe');
        var JS = 'java' + SCRIPT + ':';
        var iframeDocument;
        iframe.style.display = 'none';
        html$1.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

        iframe.src = String(JS);
        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(scriptTag('document.F=Object'));
        iframeDocument.close();
        return iframeDocument.F;
      }; // Check for document.domain and active x support
      // No need to use active x approach when document.domain is not set
      // see https://github.com/es-shims/es5-shim/issues/150
      // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
      // avoid IE GC bug


      var activeXDocument;

      var _NullProtoObject = function NullProtoObject() {
        try {
          /* global ActiveXObject -- old IE */
          activeXDocument = document.domain && new ActiveXObject('htmlfile');
        } catch (error) {
          /* ignore */
        }

        _NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
        var length = enumBugKeys.length;

        while (length--) {
          delete _NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
        }

        return _NullProtoObject();
      };

      hiddenKeys$1[IE_PROTO$1] = true; // `Object.create` method
      // https://tc39.es/ecma262/#sec-object.create

      var objectCreate = Object.create || function create(O, Properties) {
        var result;

        if (O !== null) {
          EmptyConstructor[PROTOTYPE$1] = anObject$b(O);
          result = new EmptyConstructor();
          EmptyConstructor[PROTOTYPE$1] = null; // add "__proto__" for Object.getPrototypeOf polyfill

          result[IE_PROTO$1] = O;
        } else result = _NullProtoObject();

        return Properties === undefined ? result : defineProperties$1(result, Properties);
      };

      var objectGetOwnPropertyNamesExternal = {};
      /* eslint-disable es/no-object-getownpropertynames -- safe */

      var toIndexedObject$7 = toIndexedObject$b;
      var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
      var toString$1 = {}.toString;
      var windowNames = (typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

      var getWindowNames = function getWindowNames(it) {
        try {
          return $getOwnPropertyNames$1(it);
        } catch (error) {
          return windowNames.slice();
        }
      }; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


      objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
        return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : $getOwnPropertyNames$1(toIndexedObject$7(it));
      };

      var global$c = global$n;
      var shared$2 = shared$5.exports;
      var has$6 = has$c;
      var uid$1 = uid$3;
      var NATIVE_SYMBOL$1 = nativeSymbol;
      var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
      var WellKnownSymbolsStore$1 = shared$2('wks');
      var Symbol$1 = global$c.Symbol;
      var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

      var wellKnownSymbol$m = function wellKnownSymbol$m(name) {
        if (!has$6(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
          if (NATIVE_SYMBOL$1 && has$6(Symbol$1, name)) {
            WellKnownSymbolsStore$1[name] = Symbol$1[name];
          } else {
            WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
          }
        }

        return WellKnownSymbolsStore$1[name];
      };

      var wellKnownSymbolWrapped = {};
      var wellKnownSymbol$l = wellKnownSymbol$m;
      wellKnownSymbolWrapped.f = wellKnownSymbol$l;
      var path = path$2;
      var has$5 = has$c;
      var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
      var defineProperty$3 = objectDefineProperty.f;

      var defineWellKnownSymbol$2 = function defineWellKnownSymbol$2(NAME) {
        var _Symbol = path.Symbol || (path.Symbol = {});

        if (!has$5(_Symbol, NAME)) defineProperty$3(_Symbol, NAME, {
          value: wrappedWellKnownSymbolModule$1.f(NAME)
        });
      };

      var defineProperty$2 = objectDefineProperty.f;
      var has$4 = has$c;
      var wellKnownSymbol$k = wellKnownSymbol$m;
      var TO_STRING_TAG$3 = wellKnownSymbol$k('toStringTag');

      var setToStringTag$4 = function setToStringTag$4(it, TAG, STATIC) {
        if (it && !has$4(it = STATIC ? it : it.prototype, TO_STRING_TAG$3)) {
          defineProperty$2(it, TO_STRING_TAG$3, {
            configurable: true,
            value: TAG
          });
        }
      };

      var aFunction$4 = function aFunction$4(it) {
        if (typeof it != 'function') {
          throw TypeError(String(it) + ' is not a function');
        }

        return it;
      };

      var aFunction$3 = aFunction$4; // optional / simple context binding

      var functionBindContext = function functionBindContext(fn, that, length) {
        aFunction$3(fn);
        if (that === undefined) return fn;

        switch (length) {
          case 0:
            return function () {
              return fn.call(that);
            };

          case 1:
            return function (a) {
              return fn.call(that, a);
            };

          case 2:
            return function (a, b) {
              return fn.call(that, a, b);
            };

          case 3:
            return function (a, b, c) {
              return fn.call(that, a, b, c);
            };
        }

        return function ()
        /* ...args */
        {
          return fn.apply(that, arguments);
        };
      };

      var isObject$8 = isObject$d;
      var isArray$4 = isArray$5;
      var wellKnownSymbol$j = wellKnownSymbol$m;
      var SPECIES$6 = wellKnownSymbol$j('species'); // `ArraySpeciesCreate` abstract operation
      // https://tc39.es/ecma262/#sec-arrayspeciescreate

      var arraySpeciesCreate$3 = function arraySpeciesCreate$3(originalArray, length) {
        var C;

        if (isArray$4(originalArray)) {
          C = originalArray.constructor; // cross-realm fallback

          if (typeof C == 'function' && (C === Array || isArray$4(C.prototype))) C = undefined;else if (isObject$8(C)) {
            C = C[SPECIES$6];
            if (C === null) C = undefined;
          }
        }

        return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
      };

      var bind$4 = functionBindContext;
      var IndexedObject$1 = indexedObject;
      var toObject$6 = toObject$9;
      var toLength$8 = toLength$a;
      var arraySpeciesCreate$2 = arraySpeciesCreate$3;
      var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation

      var createMethod$3 = function createMethod$3(TYPE) {
        var IS_MAP = TYPE == 1;
        var IS_FILTER = TYPE == 2;
        var IS_SOME = TYPE == 3;
        var IS_EVERY = TYPE == 4;
        var IS_FIND_INDEX = TYPE == 6;
        var IS_FILTER_OUT = TYPE == 7;
        var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
        return function ($this, callbackfn, that, specificCreate) {
          var O = toObject$6($this);
          var self = IndexedObject$1(O);
          var boundFunction = bind$4(callbackfn, that, 3);
          var length = toLength$8(self.length);
          var index = 0;
          var create = specificCreate || arraySpeciesCreate$2;
          var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
          var value, result;

          for (; length > index; index++) {
            if (NO_HOLES || index in self) {
              value = self[index];
              result = boundFunction(value, index, O);

              if (TYPE) {
                if (IS_MAP) target[index] = result; // map
                else if (result) switch (TYPE) {
                    case 3:
                      return true;
                    // some

                    case 5:
                      return value;
                    // find

                    case 6:
                      return index;
                    // findIndex

                    case 2:
                      push.call(target, value);
                    // filter
                  } else switch (TYPE) {
                    case 4:
                      return false;
                    // every

                    case 7:
                      push.call(target, value);
                    // filterOut
                  }
              }
            }
          }

          return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
        };
      };

      var arrayIteration = {
        // `Array.prototype.forEach` method
        // https://tc39.es/ecma262/#sec-array.prototype.foreach
        forEach: createMethod$3(0),
        // `Array.prototype.map` method
        // https://tc39.es/ecma262/#sec-array.prototype.map
        map: createMethod$3(1),
        // `Array.prototype.filter` method
        // https://tc39.es/ecma262/#sec-array.prototype.filter
        filter: createMethod$3(2),
        // `Array.prototype.some` method
        // https://tc39.es/ecma262/#sec-array.prototype.some
        some: createMethod$3(3),
        // `Array.prototype.every` method
        // https://tc39.es/ecma262/#sec-array.prototype.every
        every: createMethod$3(4),
        // `Array.prototype.find` method
        // https://tc39.es/ecma262/#sec-array.prototype.find
        find: createMethod$3(5),
        // `Array.prototype.findIndex` method
        // https://tc39.es/ecma262/#sec-array.prototype.findIndex
        findIndex: createMethod$3(6),
        // `Array.prototype.filterOut` method
        // https://github.com/tc39/proposal-array-filtering
        filterOut: createMethod$3(7)
      };
      var $$o = _export;
      var global$b = global$n;
      var getBuiltIn$2 = getBuiltIn$6;
      var DESCRIPTORS$8 = descriptors;
      var NATIVE_SYMBOL = nativeSymbol;
      var USE_SYMBOL_AS_UID = useSymbolAsUid;
      var fails$a = fails$h;
      var has$3 = has$c;
      var isArray$3 = isArray$5;
      var isObject$7 = isObject$d;
      var anObject$a = anObject$f;
      var toObject$5 = toObject$9;
      var toIndexedObject$6 = toIndexedObject$b;
      var toPrimitive$1 = toPrimitive$4;
      var createPropertyDescriptor$2 = createPropertyDescriptor$5;
      var nativeObjectCreate = objectCreate;
      var objectKeys$1 = objectKeys$3;
      var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
      var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
      var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
      var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
      var definePropertyModule$3 = objectDefineProperty;
      var propertyIsEnumerableModule = objectPropertyIsEnumerable;
      var createNonEnumerableProperty$5 = createNonEnumerableProperty$a;
      var redefine$6 = redefine$8.exports;
      var shared$1 = shared$5.exports;
      var sharedKey$1 = sharedKey$4;
      var hiddenKeys = hiddenKeys$5;
      var uid = uid$3;
      var wellKnownSymbol$i = wellKnownSymbol$m;
      var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
      var defineWellKnownSymbol$1 = defineWellKnownSymbol$2;
      var setToStringTag$3 = setToStringTag$4;
      var InternalStateModule$3 = internalState;
      var $forEach$1 = arrayIteration.forEach;
      var HIDDEN = sharedKey$1('hidden');
      var SYMBOL = 'Symbol';
      var PROTOTYPE = 'prototype';
      var TO_PRIMITIVE = wellKnownSymbol$i('toPrimitive');
      var setInternalState$3 = InternalStateModule$3.set;
      var getInternalState$3 = InternalStateModule$3.getterFor(SYMBOL);
      var ObjectPrototype$1 = Object[PROTOTYPE];
      var $Symbol = global$b.Symbol;
      var $stringify = getBuiltIn$2('JSON', 'stringify');
      var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
      var nativeDefineProperty = definePropertyModule$3.f;
      var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
      var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
      var AllSymbols = shared$1('symbols');
      var ObjectPrototypeSymbols = shared$1('op-symbols');
      var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
      var SymbolToStringRegistry = shared$1('symbol-to-string-registry');
      var WellKnownSymbolsStore = shared$1('wks');
      var QObject = global$b.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

      var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

      var setSymbolDescriptor = DESCRIPTORS$8 && fails$a(function () {
        return nativeObjectCreate(nativeDefineProperty({}, 'a', {
          get: function get() {
            return nativeDefineProperty(this, 'a', {
              value: 7
            }).a;
          }
        })).a != 7;
      }) ? function (O, P, Attributes) {
        var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$1, P);
        if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
        nativeDefineProperty(O, P, Attributes);

        if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
          nativeDefineProperty(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
        }
      } : nativeDefineProperty;

      var wrap$1 = function wrap$1(tag, description) {
        var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
        setInternalState$3(symbol, {
          type: SYMBOL,
          tag: tag,
          description: description
        });
        if (!DESCRIPTORS$8) symbol.description = description;
        return symbol;
      };

      var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
        return _typeof(it) == 'symbol';
      } : function (it) {
        return Object(it) instanceof $Symbol;
      };

      var $defineProperty = function defineProperty(O, P, Attributes) {
        if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
        anObject$a(O);
        var key = toPrimitive$1(P, true);
        anObject$a(Attributes);

        if (has$3(AllSymbols, key)) {
          if (!Attributes.enumerable) {
            if (!has$3(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$2(1, {}));
            O[HIDDEN][key] = true;
          } else {
            if (has$3(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
            Attributes = nativeObjectCreate(Attributes, {
              enumerable: createPropertyDescriptor$2(0, false)
            });
          }

          return setSymbolDescriptor(O, key, Attributes);
        }

        return nativeDefineProperty(O, key, Attributes);
      };

      var $defineProperties = function defineProperties(O, Properties) {
        anObject$a(O);
        var properties = toIndexedObject$6(Properties);
        var keys = objectKeys$1(properties).concat($getOwnPropertySymbols(properties));
        $forEach$1(keys, function (key) {
          if (!DESCRIPTORS$8 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
        });
        return O;
      };

      var $create = function create(O, Properties) {
        return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
      };

      var $propertyIsEnumerable = function propertyIsEnumerable(V) {
        var P = toPrimitive$1(V, true);
        var enumerable = nativePropertyIsEnumerable.call(this, P);
        if (this === ObjectPrototype$1 && has$3(AllSymbols, P) && !has$3(ObjectPrototypeSymbols, P)) return false;
        return enumerable || !has$3(this, P) || !has$3(AllSymbols, P) || has$3(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
      };

      var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
        var it = toIndexedObject$6(O);
        var key = toPrimitive$1(P, true);
        if (it === ObjectPrototype$1 && has$3(AllSymbols, key) && !has$3(ObjectPrototypeSymbols, key)) return;
        var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);

        if (descriptor && has$3(AllSymbols, key) && !(has$3(it, HIDDEN) && it[HIDDEN][key])) {
          descriptor.enumerable = true;
        }

        return descriptor;
      };

      var $getOwnPropertyNames = function getOwnPropertyNames(O) {
        var names = nativeGetOwnPropertyNames(toIndexedObject$6(O));
        var result = [];
        $forEach$1(names, function (key) {
          if (!has$3(AllSymbols, key) && !has$3(hiddenKeys, key)) result.push(key);
        });
        return result;
      };

      var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
        var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
        var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$6(O));
        var result = [];
        $forEach$1(names, function (key) {
          if (has$3(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$3(ObjectPrototype$1, key))) {
            result.push(AllSymbols[key]);
          }
        });
        return result;
      }; // `Symbol` constructor
      // https://tc39.es/ecma262/#sec-symbol-constructor


      if (!NATIVE_SYMBOL) {
        $Symbol = function _Symbol2() {
          if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
          var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
          var tag = uid(description);

          var setter = function setter(value) {
            if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value);
            if (has$3(this, HIDDEN) && has$3(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
            setSymbolDescriptor(this, tag, createPropertyDescriptor$2(1, value));
          };

          if (DESCRIPTORS$8 && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, {
            configurable: true,
            set: setter
          });
          return wrap$1(tag, description);
        };

        redefine$6($Symbol[PROTOTYPE], 'toString', function toString() {
          return getInternalState$3(this).tag;
        });
        redefine$6($Symbol, 'withoutSetter', function (description) {
          return wrap$1(uid(description), description);
        });
        propertyIsEnumerableModule.f = $propertyIsEnumerable;
        definePropertyModule$3.f = $defineProperty;
        getOwnPropertyDescriptorModule$1.f = $getOwnPropertyDescriptor;
        getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
        getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

        wrappedWellKnownSymbolModule.f = function (name) {
          return wrap$1(wellKnownSymbol$i(name), name);
        };

        if (DESCRIPTORS$8) {
          // https://github.com/tc39/proposal-Symbol-description
          nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
            configurable: true,
            get: function description() {
              return getInternalState$3(this).description;
            }
          });
          {
            redefine$6(ObjectPrototype$1, 'propertyIsEnumerable', $propertyIsEnumerable, {
              unsafe: true
            });
          }
        }
      }

      $$o({
        global: true,
        wrap: true,
        forced: !NATIVE_SYMBOL,
        sham: !NATIVE_SYMBOL
      }, {
        Symbol: $Symbol
      });
      $forEach$1(objectKeys$1(WellKnownSymbolsStore), function (name) {
        defineWellKnownSymbol$1(name);
      });
      $$o({
        target: SYMBOL,
        stat: true,
        forced: !NATIVE_SYMBOL
      }, {
        // `Symbol.for` method
        // https://tc39.es/ecma262/#sec-symbol.for
        'for': function _for(key) {
          var string = String(key);
          if (has$3(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
          var symbol = $Symbol(string);
          StringToSymbolRegistry[string] = symbol;
          SymbolToStringRegistry[symbol] = string;
          return symbol;
        },
        // `Symbol.keyFor` method
        // https://tc39.es/ecma262/#sec-symbol.keyfor
        keyFor: function keyFor(sym) {
          if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
          if (has$3(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
        },
        useSetter: function useSetter() {
          USE_SETTER = true;
        },
        useSimple: function useSimple() {
          USE_SETTER = false;
        }
      });
      $$o({
        target: 'Object',
        stat: true,
        forced: !NATIVE_SYMBOL,
        sham: !DESCRIPTORS$8
      }, {
        // `Object.create` method
        // https://tc39.es/ecma262/#sec-object.create
        create: $create,
        // `Object.defineProperty` method
        // https://tc39.es/ecma262/#sec-object.defineproperty
        defineProperty: $defineProperty,
        // `Object.defineProperties` method
        // https://tc39.es/ecma262/#sec-object.defineproperties
        defineProperties: $defineProperties,
        // `Object.getOwnPropertyDescriptor` method
        // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
        getOwnPropertyDescriptor: $getOwnPropertyDescriptor
      });
      $$o({
        target: 'Object',
        stat: true,
        forced: !NATIVE_SYMBOL
      }, {
        // `Object.getOwnPropertyNames` method
        // https://tc39.es/ecma262/#sec-object.getownpropertynames
        getOwnPropertyNames: $getOwnPropertyNames,
        // `Object.getOwnPropertySymbols` method
        // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
        getOwnPropertySymbols: $getOwnPropertySymbols
      }); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
      // https://bugs.chromium.org/p/v8/issues/detail?id=3443

      $$o({
        target: 'Object',
        stat: true,
        forced: fails$a(function () {
          getOwnPropertySymbolsModule.f(1);
        })
      }, {
        getOwnPropertySymbols: function getOwnPropertySymbols(it) {
          return getOwnPropertySymbolsModule.f(toObject$5(it));
        }
      }); // `JSON.stringify` method behavior with symbols
      // https://tc39.es/ecma262/#sec-json.stringify

      if ($stringify) {
        var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$a(function () {
          var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

          return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
          || $stringify({
            a: symbol
          }) != '{}' // V8 throws on boxed symbols
          || $stringify(Object(symbol)) != '{}';
        });
        $$o({
          target: 'JSON',
          stat: true,
          forced: FORCED_JSON_STRINGIFY
        }, {
          // eslint-disable-next-line no-unused-vars -- required for `.length`
          stringify: function stringify(it, replacer, space) {
            var args = [it];
            var index = 1;
            var $replacer;

            while (arguments.length > index) {
              args.push(arguments[index++]);
            }

            $replacer = replacer;
            if (!isObject$7(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

            if (!isArray$3(replacer)) replacer = function replacer(key, value) {
              if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
              if (!isSymbol(value)) return value;
            };
            args[1] = replacer;
            return $stringify.apply(null, args);
          }
        });
      } // `Symbol.prototype[@@toPrimitive]` method
      // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive


      if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
        createNonEnumerableProperty$5($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
      } // `Symbol.prototype[@@toStringTag]` property
      // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag


      setToStringTag$3($Symbol, SYMBOL);
      hiddenKeys[HIDDEN] = true;
      var $$n = _export;
      var fails$9 = fails$h;
      var toIndexedObject$5 = toIndexedObject$b;
      var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
      var DESCRIPTORS$7 = descriptors;
      var FAILS_ON_PRIMITIVES = fails$9(function () {
        nativeGetOwnPropertyDescriptor(1);
      });
      var FORCED$2 = !DESCRIPTORS$7 || FAILS_ON_PRIMITIVES; // `Object.getOwnPropertyDescriptor` method
      // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

      $$n({
        target: 'Object',
        stat: true,
        forced: FORCED$2,
        sham: !DESCRIPTORS$7
      }, {
        getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
          return nativeGetOwnPropertyDescriptor(toIndexedObject$5(it), key);
        }
      });
      var toPrimitive = toPrimitive$4;
      var definePropertyModule$2 = objectDefineProperty;
      var createPropertyDescriptor$1 = createPropertyDescriptor$5;

      var createProperty$5 = function createProperty$5(object, key, value) {
        var propertyKey = toPrimitive(key);
        if (propertyKey in object) definePropertyModule$2.f(object, propertyKey, createPropertyDescriptor$1(0, value));else object[propertyKey] = value;
      };

      var $$m = _export;
      var DESCRIPTORS$6 = descriptors;
      var ownKeys$2 = ownKeys$4;
      var toIndexedObject$4 = toIndexedObject$b;
      var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
      var createProperty$4 = createProperty$5; // `Object.getOwnPropertyDescriptors` method
      // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors

      $$m({
        target: 'Object',
        stat: true,
        sham: !DESCRIPTORS$6
      }, {
        getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
          var O = toIndexedObject$4(object);
          var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
          var keys = ownKeys$2(O);
          var result = {};
          var index = 0;
          var key, descriptor;

          while (keys.length > index) {
            descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
            if (descriptor !== undefined) createProperty$4(result, key, descriptor);
          }

          return result;
        }
      });
      var $$l = _export;
      var DESCRIPTORS$5 = descriptors;
      var defineProperties = objectDefineProperties; // `Object.defineProperties` method
      // https://tc39.es/ecma262/#sec-object.defineproperties

      $$l({
        target: 'Object',
        stat: true,
        forced: !DESCRIPTORS$5,
        sham: !DESCRIPTORS$5
      }, {
        defineProperties: defineProperties
      });
      var $$k = _export;
      var DESCRIPTORS$4 = descriptors;
      var objectDefinePropertyModile = objectDefineProperty; // `Object.defineProperty` method
      // https://tc39.es/ecma262/#sec-object.defineproperty

      $$k({
        target: 'Object',
        stat: true,
        forced: !DESCRIPTORS$4,
        sham: !DESCRIPTORS$4
      }, {
        defineProperty: objectDefinePropertyModile.f
      });
      var DESCRIPTORS$3 = descriptors;
      var defineProperty$1 = objectDefineProperty.f;
      var FunctionPrototype = Function.prototype;
      var FunctionPrototypeToString = FunctionPrototype.toString;
      var nameRE = /^\s*function ([^ (]*)/;
      var NAME = 'name'; // Function instances `.name` property
      // https://tc39.es/ecma262/#sec-function-instances-name

      if (DESCRIPTORS$3 && !(NAME in FunctionPrototype)) {
        defineProperty$1(FunctionPrototype, NAME, {
          configurable: true,
          get: function get() {
            try {
              return FunctionPrototypeToString.call(this).match(nameRE)[1];
            } catch (error) {
              return '';
            }
          }
        });
      }

      var $$j = _export;
      var DESCRIPTORS$2 = descriptors;
      var global$a = global$n;
      var has$2 = has$c;
      var isObject$6 = isObject$d;
      var defineProperty = objectDefineProperty.f;
      var copyConstructorProperties = copyConstructorProperties$2;
      var NativeSymbol = global$a.Symbol;

      if (DESCRIPTORS$2 && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) || // Safari 12 bug
      NativeSymbol().description !== undefined)) {
        var EmptyStringDescriptionStore = {}; // wrap Symbol constructor for correct work with undefined description

        var SymbolWrapper = function _Symbol3() {
          var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
          var result = this instanceof SymbolWrapper ? new NativeSymbol(description) // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
          : description === undefined ? NativeSymbol() : NativeSymbol(description);
          if (description === '') EmptyStringDescriptionStore[result] = true;
          return result;
        };

        copyConstructorProperties(SymbolWrapper, NativeSymbol);
        var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
        symbolPrototype.constructor = SymbolWrapper;
        var symbolToString = symbolPrototype.toString;

        var _native = String(NativeSymbol('test')) == 'Symbol(test)';

        var regexp = /^Symbol\((.*)\)[^)]+$/;
        defineProperty(symbolPrototype, 'description', {
          configurable: true,
          get: function description() {
            var symbol = isObject$6(this) ? this.valueOf() : this;
            var string = symbolToString.call(symbol);
            if (has$2(EmptyStringDescriptionStore, symbol)) return '';
            var desc = _native ? string.slice(7, -1) : string.replace(regexp, '$1');
            return desc === '' ? undefined : desc;
          }
        });
        $$j({
          global: true,
          forced: true
        }, {
          Symbol: SymbolWrapper
        });
      }

      var defineWellKnownSymbol = defineWellKnownSymbol$2; // `Symbol.iterator` well-known symbol
      // https://tc39.es/ecma262/#sec-symbol.iterator

      defineWellKnownSymbol('iterator');
      var wellKnownSymbol$h = wellKnownSymbol$m;
      var create$1 = objectCreate;
      var definePropertyModule$1 = objectDefineProperty;
      var UNSCOPABLES = wellKnownSymbol$h('unscopables');
      var ArrayPrototype$1 = Array.prototype; // Array.prototype[@@unscopables]
      // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

      if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
        definePropertyModule$1.f(ArrayPrototype$1, UNSCOPABLES, {
          configurable: true,
          value: create$1(null)
        });
      } // add a key to Array.prototype[@@unscopables]


      var addToUnscopables$3 = function addToUnscopables$3(key) {
        ArrayPrototype$1[UNSCOPABLES][key] = true;
      };

      var iterators = {};
      var fails$8 = fails$h;
      var correctPrototypeGetter = !fails$8(function () {
        function F() {
          /* empty */
        }

        F.prototype.constructor = null; // eslint-disable-next-line es/no-object-getprototypeof -- required for testing

        return Object.getPrototypeOf(new F()) !== F.prototype;
      });
      var has$1 = has$c;
      var toObject$4 = toObject$9;
      var sharedKey = sharedKey$4;
      var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
      var IE_PROTO = sharedKey('IE_PROTO');
      var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
      // https://tc39.es/ecma262/#sec-object.getprototypeof
      // eslint-disable-next-line es/no-object-getprototypeof -- safe

      var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
        O = toObject$4(O);
        if (has$1(O, IE_PROTO)) return O[IE_PROTO];

        if (typeof O.constructor == 'function' && O instanceof O.constructor) {
          return O.constructor.prototype;
        }

        return O instanceof Object ? ObjectPrototype : null;
      };
      var fails$7 = fails$h;
      var getPrototypeOf$1 = objectGetPrototypeOf;
      var createNonEnumerableProperty$4 = createNonEnumerableProperty$a;
      var has = has$c;
      var wellKnownSymbol$g = wellKnownSymbol$m;
      var ITERATOR$5 = wellKnownSymbol$g('iterator');
      var BUGGY_SAFARI_ITERATORS$1 = false;

      var returnThis$2 = function returnThis$2() {
        return this;
      }; // `%IteratorPrototype%` object
      // https://tc39.es/ecma262/#sec-%iteratorprototype%-object


      var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;
      /* eslint-disable es/no-array-prototype-keys -- safe */

      if ([].keys) {
        arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

        if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;else {
          PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
          if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
        }
      }

      var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$7(function () {
        var test = {}; // FF44- legacy iterators case

        return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
      });
      if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

      if (!has(IteratorPrototype$2, ITERATOR$5)) {
        createNonEnumerableProperty$4(IteratorPrototype$2, ITERATOR$5, returnThis$2);
      }

      var iteratorsCore = {
        IteratorPrototype: IteratorPrototype$2,
        BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
      };
      var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
      var create = objectCreate;
      var createPropertyDescriptor = createPropertyDescriptor$5;
      var setToStringTag$2 = setToStringTag$4;
      var Iterators$4 = iterators;

      var returnThis$1 = function returnThis$1() {
        return this;
      };

      var createIteratorConstructor$1 = function createIteratorConstructor$1(IteratorConstructor, NAME, next) {
        var TO_STRING_TAG = NAME + ' Iterator';
        IteratorConstructor.prototype = create(IteratorPrototype$1, {
          next: createPropertyDescriptor(1, next)
        });
        setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
        Iterators$4[TO_STRING_TAG] = returnThis$1;
        return IteratorConstructor;
      };

      var isObject$5 = isObject$d;

      var aPossiblePrototype$1 = function aPossiblePrototype$1(it) {
        if (!isObject$5(it) && it !== null) {
          throw TypeError("Can't set " + String(it) + ' as a prototype');
        }

        return it;
      };
      /* eslint-disable no-proto -- safe */


      var anObject$9 = anObject$f;
      var aPossiblePrototype = aPossiblePrototype$1; // `Object.setPrototypeOf` method
      // https://tc39.es/ecma262/#sec-object.setprototypeof
      // Works with __proto__ only. Old v8 can't work with null proto objects.
      // eslint-disable-next-line es/no-object-setprototypeof -- safe

      var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
        var CORRECT_SETTER = false;
        var test = {};
        var setter;

        try {
          // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
          setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
          setter.call(test, []);
          CORRECT_SETTER = test instanceof Array;
        } catch (error) {
          /* empty */
        }

        return function setPrototypeOf(O, proto) {
          anObject$9(O);
          aPossiblePrototype(proto);
          if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
          return O;
        };
      }() : undefined);
      var $$i = _export;
      var createIteratorConstructor = createIteratorConstructor$1;
      var getPrototypeOf = objectGetPrototypeOf;
      var setPrototypeOf$1 = objectSetPrototypeOf;
      var setToStringTag$1 = setToStringTag$4;
      var createNonEnumerableProperty$3 = createNonEnumerableProperty$a;
      var redefine$5 = redefine$8.exports;
      var wellKnownSymbol$f = wellKnownSymbol$m;
      var Iterators$3 = iterators;
      var IteratorsCore = iteratorsCore;
      var IteratorPrototype = IteratorsCore.IteratorPrototype;
      var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
      var ITERATOR$4 = wellKnownSymbol$f('iterator');
      var KEYS = 'keys';
      var VALUES = 'values';
      var ENTRIES = 'entries';

      var returnThis = function returnThis() {
        return this;
      };

      var defineIterator$2 = function defineIterator$2(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
        createIteratorConstructor(IteratorConstructor, NAME, next);

        var getIterationMethod = function getIterationMethod(KIND) {
          if (KIND === DEFAULT && defaultIterator) return defaultIterator;
          if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];

          switch (KIND) {
            case KEYS:
              return function keys() {
                return new IteratorConstructor(this, KIND);
              };

            case VALUES:
              return function values() {
                return new IteratorConstructor(this, KIND);
              };

            case ENTRIES:
              return function entries() {
                return new IteratorConstructor(this, KIND);
              };
          }

          return function () {
            return new IteratorConstructor(this);
          };
        };

        var TO_STRING_TAG = NAME + ' Iterator';
        var INCORRECT_VALUES_NAME = false;
        var IterablePrototype = Iterable.prototype;
        var nativeIterator = IterablePrototype[ITERATOR$4] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
        var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
        var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
        var CurrentIteratorPrototype, methods, KEY; // fix native

        if (anyNativeIterator) {
          CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));

          if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
            if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
              if (setPrototypeOf$1) {
                setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype);
              } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
                createNonEnumerableProperty$3(CurrentIteratorPrototype, ITERATOR$4, returnThis);
              }
            } // Set @@toStringTag to native iterators


            setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
          }
        } // fix Array#{values, @@iterator}.name in V8 / FF


        if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
          INCORRECT_VALUES_NAME = true;

          defaultIterator = function values() {
            return nativeIterator.call(this);
          };
        } // define iterator


        if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
          createNonEnumerableProperty$3(IterablePrototype, ITERATOR$4, defaultIterator);
        }

        Iterators$3[NAME] = defaultIterator; // export additional methods

        if (DEFAULT) {
          methods = {
            values: getIterationMethod(VALUES),
            keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
            entries: getIterationMethod(ENTRIES)
          };
          if (FORCED) for (KEY in methods) {
            if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
              redefine$5(IterablePrototype, KEY, methods[KEY]);
            }
          } else $$i({
            target: NAME,
            proto: true,
            forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
          }, methods);
        }

        return methods;
      };

      var toIndexedObject$3 = toIndexedObject$b;
      var addToUnscopables$2 = addToUnscopables$3;
      var Iterators$2 = iterators;
      var InternalStateModule$2 = internalState;
      var defineIterator$1 = defineIterator$2;
      var ARRAY_ITERATOR = 'Array Iterator';
      var setInternalState$2 = InternalStateModule$2.set;
      var getInternalState$2 = InternalStateModule$2.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
      // https://tc39.es/ecma262/#sec-array.prototype.entries
      // `Array.prototype.keys` method
      // https://tc39.es/ecma262/#sec-array.prototype.keys
      // `Array.prototype.values` method
      // https://tc39.es/ecma262/#sec-array.prototype.values
      // `Array.prototype[@@iterator]` method
      // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
      // `CreateArrayIterator` internal method
      // https://tc39.es/ecma262/#sec-createarrayiterator

      var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
        setInternalState$2(this, {
          type: ARRAY_ITERATOR,
          target: toIndexedObject$3(iterated),
          // target
          index: 0,
          // next index
          kind: kind // kind

        }); // `%ArrayIteratorPrototype%.next` method
        // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
      }, function () {
        var state = getInternalState$2(this);
        var target = state.target;
        var kind = state.kind;
        var index = state.index++;

        if (!target || index >= target.length) {
          state.target = undefined;
          return {
            value: undefined,
            done: true
          };
        }

        if (kind == 'keys') return {
          value: index,
          done: false
        };
        if (kind == 'values') return {
          value: target[index],
          done: false
        };
        return {
          value: [index, target[index]],
          done: false
        };
      }, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
      // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
      // https://tc39.es/ecma262/#sec-createmappedargumentsobject

      Iterators$2.Arguments = Iterators$2.Array; // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

      addToUnscopables$2('keys');
      addToUnscopables$2('values');
      addToUnscopables$2('entries'); // iterable DOM collections
      // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods

      var domIterables = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0
      };
      var global$9 = global$n;
      var DOMIterables$1 = domIterables;
      var ArrayIteratorMethods = es_array_iterator;
      var createNonEnumerableProperty$2 = createNonEnumerableProperty$a;
      var wellKnownSymbol$e = wellKnownSymbol$m;
      var ITERATOR$3 = wellKnownSymbol$e('iterator');
      var TO_STRING_TAG$2 = wellKnownSymbol$e('toStringTag');
      var ArrayValues = ArrayIteratorMethods.values;

      for (var COLLECTION_NAME$1 in DOMIterables$1) {
        var Collection$1 = global$9[COLLECTION_NAME$1];
        var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;

        if (CollectionPrototype$1) {
          // some Chrome versions have non-configurable methods on DOMTokenList
          if (CollectionPrototype$1[ITERATOR$3] !== ArrayValues) try {
            createNonEnumerableProperty$2(CollectionPrototype$1, ITERATOR$3, ArrayValues);
          } catch (error) {
            CollectionPrototype$1[ITERATOR$3] = ArrayValues;
          }

          if (!CollectionPrototype$1[TO_STRING_TAG$2]) {
            createNonEnumerableProperty$2(CollectionPrototype$1, TO_STRING_TAG$2, COLLECTION_NAME$1);
          }

          if (DOMIterables$1[COLLECTION_NAME$1]) for (var METHOD_NAME in ArrayIteratorMethods) {
            // some Chrome versions have non-configurable methods on DOMTokenList
            if (CollectionPrototype$1[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
              createNonEnumerableProperty$2(CollectionPrototype$1, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
            } catch (error) {
              CollectionPrototype$1[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
            }
          }
        }
      }

      var $$h = _export;
      var isArray$2 = isArray$5; // `Array.isArray` method
      // https://tc39.es/ecma262/#sec-array.isarray

      $$h({
        target: 'Array',
        stat: true
      }, {
        isArray: isArray$2
      });

      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }

      function _iterableToArrayLimit(arr, i) {
        var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

        if (_i == null) return;
        var _arr = [];
        var _n = true;
        var _d = false;

        var _s, _e;

        try {
          for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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

      function _arrayLikeToArray$1(arr, len) {
        if (len == null || len > arr.length) len = arr.length;

        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }

      function _unsupportedIterableToArray$1(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
      }

      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
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

      var runtime = {
        exports: {}
      };
      /**
       * Copyright (c) 2014-present, Facebook, Inc.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */

      (function (module) {
        var runtime = function (exports) {
          var Op = Object.prototype;
          var hasOwn = Op.hasOwnProperty;
          var undefined$1; // More compressible than void 0.

          var $Symbol = typeof Symbol === "function" ? Symbol : {};
          var iteratorSymbol = $Symbol.iterator || "@@iterator";
          var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
          var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

          function define(obj, key, value) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
            return obj[key];
          }

          try {
            // IE 8 has a broken Object.defineProperty that only works on DOM objects.
            define({}, "");
          } catch (err) {
            define = function define(obj, key, value) {
              return obj[key] = value;
            };
          }

          function wrap(innerFn, outerFn, self, tryLocsList) {
            // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
            var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
            var generator = Object.create(protoGenerator.prototype);
            var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
            // .throw, and .return methods.

            generator._invoke = makeInvokeMethod(innerFn, self, context);
            return generator;
          }

          exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
          // record like context.tryEntries[i].completion. This interface could
          // have been (and was previously) designed to take a closure to be
          // invoked without arguments, but in all the cases we care about we
          // already have an existing method we want to call, so there's no need
          // to create a new function object. We can even get away with assuming
          // the method takes exactly one argument, since that happens to be true
          // in every case, so we don't have to touch the arguments object. The
          // only additional allocation required is the completion record, which
          // has a stable shape and so hopefully should be cheap to allocate.

          function tryCatch(fn, obj, arg) {
            try {
              return {
                type: "normal",
                arg: fn.call(obj, arg)
              };
            } catch (err) {
              return {
                type: "throw",
                arg: err
              };
            }
          }

          var GenStateSuspendedStart = "suspendedStart";
          var GenStateSuspendedYield = "suspendedYield";
          var GenStateExecuting = "executing";
          var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
          // breaking out of the dispatch switch statement.

          var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
          // .constructor.prototype properties for functions that return Generator
          // objects. For full spec compliance, you may wish to configure your
          // minifier not to mangle the names of these two functions.

          function Generator() {}

          function GeneratorFunction() {}

          function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
          // don't natively support it.


          var IteratorPrototype = {};

          IteratorPrototype[iteratorSymbol] = function () {
            return this;
          };

          var getProto = Object.getPrototypeOf;
          var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

          if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
            // This environment has a native %IteratorPrototype%; use it instead
            // of the polyfill.
            IteratorPrototype = NativeIteratorPrototype;
          }

          var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
          GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
          GeneratorFunctionPrototype.constructor = GeneratorFunction;
          GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
          // Iterator interface in terms of a single ._invoke method.

          function defineIteratorMethods(prototype) {
            ["next", "throw", "return"].forEach(function (method) {
              define(prototype, method, function (arg) {
                return this._invoke(method, arg);
              });
            });
          }

          exports.isGeneratorFunction = function (genFun) {
            var ctor = typeof genFun === "function" && genFun.constructor;
            return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
            // do is to check its .name property.
            (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
          };

          exports.mark = function (genFun) {
            if (Object.setPrototypeOf) {
              Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
            } else {
              genFun.__proto__ = GeneratorFunctionPrototype;
              define(genFun, toStringTagSymbol, "GeneratorFunction");
            }

            genFun.prototype = Object.create(Gp);
            return genFun;
          }; // Within the body of any async function, `await x` is transformed to
          // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
          // `hasOwn.call(value, "__await")` to determine if the yielded value is
          // meant to be awaited.


          exports.awrap = function (arg) {
            return {
              __await: arg
            };
          };

          function AsyncIterator(generator, PromiseImpl) {
            function invoke(method, arg, resolve, reject) {
              var record = tryCatch(generator[method], generator, arg);

              if (record.type === "throw") {
                reject(record.arg);
              } else {
                var result = record.arg;
                var value = result.value;

                if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
                  return PromiseImpl.resolve(value.__await).then(function (value) {
                    invoke("next", value, resolve, reject);
                  }, function (err) {
                    invoke("throw", err, resolve, reject);
                  });
                }

                return PromiseImpl.resolve(value).then(function (unwrapped) {
                  // When a yielded Promise is resolved, its final value becomes
                  // the .value of the Promise<{value,done}> result for the
                  // current iteration.
                  result.value = unwrapped;
                  resolve(result);
                }, function (error) {
                  // If a rejected Promise was yielded, throw the rejection back
                  // into the async generator function so it can be handled there.
                  return invoke("throw", error, resolve, reject);
                });
              }
            }

            var previousPromise;

            function enqueue(method, arg) {
              function callInvokeWithMethodAndArg() {
                return new PromiseImpl(function (resolve, reject) {
                  invoke(method, arg, resolve, reject);
                });
              }

              return previousPromise = // If enqueue has been called before, then we want to wait until
              // all previous Promises have been resolved before calling invoke,
              // so that results are always delivered in the correct order. If
              // enqueue has not been called before, then it is important to
              // call invoke immediately, without waiting on a callback to fire,
              // so that the async generator function has the opportunity to do
              // any necessary setup in a predictable way. This predictability
              // is why the Promise constructor synchronously invokes its
              // executor callback, and why async functions synchronously
              // execute code before the first await. Since we implement simple
              // async functions in terms of async generators, it is especially
              // important to get this right, even though it requires care.
              previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
              // invocations of the iterator.
              callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            } // Define the unified helper method that is used to implement .next,
            // .throw, and .return (see defineIteratorMethods).


            this._invoke = enqueue;
          }

          defineIteratorMethods(AsyncIterator.prototype);

          AsyncIterator.prototype[asyncIteratorSymbol] = function () {
            return this;
          };

          exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
          // AsyncIterator objects; they just return a Promise for the value of
          // the final result produced by the iterator.

          exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
            if (PromiseImpl === void 0) PromiseImpl = Promise;
            var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
            return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
            : iter.next().then(function (result) {
              return result.done ? result.value : iter.next();
            });
          };

          function makeInvokeMethod(innerFn, self, context) {
            var state = GenStateSuspendedStart;
            return function invoke(method, arg) {
              if (state === GenStateExecuting) {
                throw new Error("Generator is already running");
              }

              if (state === GenStateCompleted) {
                if (method === "throw") {
                  throw arg;
                } // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


                return doneResult();
              }

              context.method = method;
              context.arg = arg;

              while (true) {
                var delegate = context.delegate;

                if (delegate) {
                  var delegateResult = maybeInvokeDelegate(delegate, context);

                  if (delegateResult) {
                    if (delegateResult === ContinueSentinel) continue;
                    return delegateResult;
                  }
                }

                if (context.method === "next") {
                  // Setting context._sent for legacy support of Babel's
                  // function.sent implementation.
                  context.sent = context._sent = context.arg;
                } else if (context.method === "throw") {
                  if (state === GenStateSuspendedStart) {
                    state = GenStateCompleted;
                    throw context.arg;
                  }

                  context.dispatchException(context.arg);
                } else if (context.method === "return") {
                  context.abrupt("return", context.arg);
                }

                state = GenStateExecuting;
                var record = tryCatch(innerFn, self, context);

                if (record.type === "normal") {
                  // If an exception is thrown from innerFn, we leave state ===
                  // GenStateExecuting and loop back for another invocation.
                  state = context.done ? GenStateCompleted : GenStateSuspendedYield;

                  if (record.arg === ContinueSentinel) {
                    continue;
                  }

                  return {
                    value: record.arg,
                    done: context.done
                  };
                } else if (record.type === "throw") {
                  state = GenStateCompleted; // Dispatch the exception by looping back around to the
                  // context.dispatchException(context.arg) call above.

                  context.method = "throw";
                  context.arg = record.arg;
                }
              }
            };
          } // Call delegate.iterator[context.method](context.arg) and handle the
          // result, either by returning a { value, done } result from the
          // delegate iterator, or by modifying context.method and context.arg,
          // setting context.delegate to null, and returning the ContinueSentinel.


          function maybeInvokeDelegate(delegate, context) {
            var method = delegate.iterator[context.method];

            if (method === undefined$1) {
              // A .throw or .return when the delegate iterator has no .throw
              // method always terminates the yield* loop.
              context.delegate = null;

              if (context.method === "throw") {
                // Note: ["return"] must be used for ES3 parsing compatibility.
                if (delegate.iterator["return"]) {
                  // If the delegate iterator has a return method, give it a
                  // chance to clean up.
                  context.method = "return";
                  context.arg = undefined$1;
                  maybeInvokeDelegate(delegate, context);

                  if (context.method === "throw") {
                    // If maybeInvokeDelegate(context) changed context.method from
                    // "return" to "throw", let that override the TypeError below.
                    return ContinueSentinel;
                  }
                }

                context.method = "throw";
                context.arg = new TypeError("The iterator does not provide a 'throw' method");
              }

              return ContinueSentinel;
            }

            var record = tryCatch(method, delegate.iterator, context.arg);

            if (record.type === "throw") {
              context.method = "throw";
              context.arg = record.arg;
              context.delegate = null;
              return ContinueSentinel;
            }

            var info = record.arg;

            if (!info) {
              context.method = "throw";
              context.arg = new TypeError("iterator result is not an object");
              context.delegate = null;
              return ContinueSentinel;
            }

            if (info.done) {
              // Assign the result of the finished delegate to the temporary
              // variable specified by delegate.resultName (see delegateYield).
              context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

              context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
              // exception, let the outer generator proceed normally. If
              // context.method was "next", forget context.arg since it has been
              // "consumed" by the delegate iterator. If context.method was
              // "return", allow the original .return call to continue in the
              // outer generator.

              if (context.method !== "return") {
                context.method = "next";
                context.arg = undefined$1;
              }
            } else {
              // Re-yield the result returned by the delegate method.
              return info;
            } // The delegate iterator is finished, so forget it and continue with
            // the outer generator.


            context.delegate = null;
            return ContinueSentinel;
          } // Define Generator.prototype.{next,throw,return} in terms of the
          // unified ._invoke helper method.


          defineIteratorMethods(Gp);
          define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
          // @@iterator function is called on it. Some browsers' implementations of the
          // iterator prototype chain incorrectly implement this, causing the Generator
          // object to not be returned from this call. This ensures that doesn't happen.
          // See https://github.com/facebook/regenerator/issues/274 for more details.

          Gp[iteratorSymbol] = function () {
            return this;
          };

          Gp.toString = function () {
            return "[object Generator]";
          };

          function pushTryEntry(locs) {
            var entry = {
              tryLoc: locs[0]
            };

            if (1 in locs) {
              entry.catchLoc = locs[1];
            }

            if (2 in locs) {
              entry.finallyLoc = locs[2];
              entry.afterLoc = locs[3];
            }

            this.tryEntries.push(entry);
          }

          function resetTryEntry(entry) {
            var record = entry.completion || {};
            record.type = "normal";
            delete record.arg;
            entry.completion = record;
          }

          function Context(tryLocsList) {
            // The root entry object (effectively a try statement without a catch
            // or a finally block) gives us a place to store values thrown from
            // locations where there is no enclosing try statement.
            this.tryEntries = [{
              tryLoc: "root"
            }];
            tryLocsList.forEach(pushTryEntry, this);
            this.reset(true);
          }

          exports.keys = function (object) {
            var keys = [];

            for (var key in object) {
              keys.push(key);
            }

            keys.reverse(); // Rather than returning an object with a next method, we keep
            // things simple and return the next function itself.

            return function next() {
              while (keys.length) {
                var key = keys.pop();

                if (key in object) {
                  next.value = key;
                  next.done = false;
                  return next;
                }
              } // To avoid creating an additional object, we just hang the .value
              // and .done properties off the next function object itself. This
              // also ensures that the minifier will not anonymize the function.


              next.done = true;
              return next;
            };
          };

          function values(iterable) {
            if (iterable) {
              var iteratorMethod = iterable[iteratorSymbol];

              if (iteratorMethod) {
                return iteratorMethod.call(iterable);
              }

              if (typeof iterable.next === "function") {
                return iterable;
              }

              if (!isNaN(iterable.length)) {
                var i = -1,
                    next = function next() {
                  while (++i < iterable.length) {
                    if (hasOwn.call(iterable, i)) {
                      next.value = iterable[i];
                      next.done = false;
                      return next;
                    }
                  }

                  next.value = undefined$1;
                  next.done = true;
                  return next;
                };

                return next.next = next;
              }
            } // Return an iterator with no values.


            return {
              next: doneResult
            };
          }

          exports.values = values;

          function doneResult() {
            return {
              value: undefined$1,
              done: true
            };
          }

          Context.prototype = {
            constructor: Context,
            reset: function reset(skipTempReset) {
              this.prev = 0;
              this.next = 0; // Resetting context._sent for legacy support of Babel's
              // function.sent implementation.

              this.sent = this._sent = undefined$1;
              this.done = false;
              this.delegate = null;
              this.method = "next";
              this.arg = undefined$1;
              this.tryEntries.forEach(resetTryEntry);

              if (!skipTempReset) {
                for (var name in this) {
                  // Not sure about the optimal order of these conditions:
                  if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                    this[name] = undefined$1;
                  }
                }
              }
            },
            stop: function stop() {
              this.done = true;
              var rootEntry = this.tryEntries[0];
              var rootRecord = rootEntry.completion;

              if (rootRecord.type === "throw") {
                throw rootRecord.arg;
              }

              return this.rval;
            },
            dispatchException: function dispatchException(exception) {
              if (this.done) {
                throw exception;
              }

              var context = this;

              function handle(loc, caught) {
                record.type = "throw";
                record.arg = exception;
                context.next = loc;

                if (caught) {
                  // If the dispatched exception was caught by a catch block,
                  // then let that catch block handle the exception normally.
                  context.method = "next";
                  context.arg = undefined$1;
                }

                return !!caught;
              }

              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                var record = entry.completion;

                if (entry.tryLoc === "root") {
                  // Exception thrown outside of any try block that could handle
                  // it, so set the completion value of the entire function to
                  // throw the exception.
                  return handle("end");
                }

                if (entry.tryLoc <= this.prev) {
                  var hasCatch = hasOwn.call(entry, "catchLoc");
                  var hasFinally = hasOwn.call(entry, "finallyLoc");

                  if (hasCatch && hasFinally) {
                    if (this.prev < entry.catchLoc) {
                      return handle(entry.catchLoc, true);
                    } else if (this.prev < entry.finallyLoc) {
                      return handle(entry.finallyLoc);
                    }
                  } else if (hasCatch) {
                    if (this.prev < entry.catchLoc) {
                      return handle(entry.catchLoc, true);
                    }
                  } else if (hasFinally) {
                    if (this.prev < entry.finallyLoc) {
                      return handle(entry.finallyLoc);
                    }
                  } else {
                    throw new Error("try statement without catch or finally");
                  }
                }
              }
            },
            abrupt: function abrupt(type, arg) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];

                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                  var finallyEntry = entry;
                  break;
                }
              }

              if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
                // Ignore the finally entry if control is not jumping to a
                // location outside the try/catch block.
                finallyEntry = null;
              }

              var record = finallyEntry ? finallyEntry.completion : {};
              record.type = type;
              record.arg = arg;

              if (finallyEntry) {
                this.method = "next";
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
              }

              return this.complete(record);
            },
            complete: function complete(record, afterLoc) {
              if (record.type === "throw") {
                throw record.arg;
              }

              if (record.type === "break" || record.type === "continue") {
                this.next = record.arg;
              } else if (record.type === "return") {
                this.rval = this.arg = record.arg;
                this.method = "return";
                this.next = "end";
              } else if (record.type === "normal" && afterLoc) {
                this.next = afterLoc;
              }

              return ContinueSentinel;
            },
            finish: function finish(finallyLoc) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];

                if (entry.finallyLoc === finallyLoc) {
                  this.complete(entry.completion, entry.afterLoc);
                  resetTryEntry(entry);
                  return ContinueSentinel;
                }
              }
            },
            "catch": function _catch(tryLoc) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];

                if (entry.tryLoc === tryLoc) {
                  var record = entry.completion;

                  if (record.type === "throw") {
                    var thrown = record.arg;
                    resetTryEntry(entry);
                  }

                  return thrown;
                }
              } // The context.catch method must only be called with a location
              // argument that corresponds to a known catch block.


              throw new Error("illegal catch attempt");
            },
            delegateYield: function delegateYield(iterable, resultName, nextLoc) {
              this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
              };

              if (this.method === "next") {
                // Deliberately forget the last sent value so that we don't
                // accidentally pass it on to the delegate.
                this.arg = undefined$1;
              }

              return ContinueSentinel;
            }
          }; // Regardless of whether this script is executing as a CommonJS module
          // or not, return the runtime object so that we can declare the variable
          // regeneratorRuntime in the outer scope, which allows this module to be
          // injected easily by `bin/regenerator --include-runtime script.js`.

          return exports;
        }( // If this script is executing as a CommonJS module, use module.exports
        // as the regeneratorRuntime namespace. Otherwise create a new empty
        // object. Either way, the resulting object will be used to initialize
        // the regeneratorRuntime variable at the top of this file.
        module.exports);

        try {
          regeneratorRuntime = runtime;
        } catch (accidentalStrictMode) {
          // This module should not be running in strict mode, so the above
          // assignment should always work unless something is misconfigured. Just
          // in case runtime.js accidentally runs in strict mode, we can escape
          // strict mode using a global Function call. This could conceivably fail
          // if a Content Security Policy forbids using Function, but in that case
          // the proper solution is to fix the accidental strict mode problem. If
          // you've misconfigured your bundler to force strict mode and applied a
          // CSP to forbid Function, and you're not willing to fix either of those
          // problems, please detail your unique predicament in a GitHub issue.
          Function("r", "regeneratorRuntime = r")(runtime);
        }
      })(runtime);

      var wellKnownSymbol$d = wellKnownSymbol$m;
      var TO_STRING_TAG$1 = wellKnownSymbol$d('toStringTag');
      var test = {};
      test[TO_STRING_TAG$1] = 'z';
      var toStringTagSupport = String(test) === '[object z]';
      var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
      var classofRaw = classofRaw$1;
      var wellKnownSymbol$c = wellKnownSymbol$m;
      var TO_STRING_TAG = wellKnownSymbol$c('toStringTag'); // ES3 wrong here

      var CORRECT_ARGUMENTS = classofRaw(function () {
        return arguments;
      }()) == 'Arguments'; // fallback for IE11 Script Access Denied error

      var tryGet = function tryGet(it, key) {
        try {
          return it[key];
        } catch (error) {
          /* empty */
        }
      }; // getting tag from ES6+ `Object.prototype.toString`


      var classof$5 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
        var O, tag, result;
        return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
        : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
        : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
        : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
      };
      var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
      var classof$4 = classof$5; // `Object.prototype.toString` method implementation
      // https://tc39.es/ecma262/#sec-object.prototype.tostring

      var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
        return '[object ' + classof$4(this) + ']';
      };
      var TO_STRING_TAG_SUPPORT = toStringTagSupport;
      var redefine$4 = redefine$8.exports;
      var toString = objectToString; // `Object.prototype.toString` method
      // https://tc39.es/ecma262/#sec-object.prototype.tostring

      if (!TO_STRING_TAG_SUPPORT) {
        redefine$4(Object.prototype, 'toString', toString, {
          unsafe: true
        });
      }

      var global$8 = global$n;
      var nativePromiseConstructor = global$8.Promise;
      var redefine$3 = redefine$8.exports;

      var redefineAll$1 = function redefineAll$1(target, src, options) {
        for (var key in src) {
          redefine$3(target, key, src[key], options);
        }

        return target;
      };

      var getBuiltIn$1 = getBuiltIn$6;
      var definePropertyModule = objectDefineProperty;
      var wellKnownSymbol$b = wellKnownSymbol$m;
      var DESCRIPTORS$1 = descriptors;
      var SPECIES$5 = wellKnownSymbol$b('species');

      var setSpecies$1 = function setSpecies$1(CONSTRUCTOR_NAME) {
        var Constructor = getBuiltIn$1(CONSTRUCTOR_NAME);
        var defineProperty = definePropertyModule.f;

        if (DESCRIPTORS$1 && Constructor && !Constructor[SPECIES$5]) {
          defineProperty(Constructor, SPECIES$5, {
            configurable: true,
            get: function get() {
              return this;
            }
          });
        }
      };

      var anInstance$1 = function anInstance$1(it, Constructor, name) {
        if (!(it instanceof Constructor)) {
          throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
        }

        return it;
      };

      var wellKnownSymbol$a = wellKnownSymbol$m;
      var Iterators$1 = iterators;
      var ITERATOR$2 = wellKnownSymbol$a('iterator');
      var ArrayPrototype = Array.prototype; // check on default Array iterator

      var isArrayIteratorMethod$2 = function isArrayIteratorMethod$2(it) {
        return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it);
      };

      var classof$3 = classof$5;
      var Iterators = iterators;
      var wellKnownSymbol$9 = wellKnownSymbol$m;
      var ITERATOR$1 = wellKnownSymbol$9('iterator');

      var getIteratorMethod$2 = function getIteratorMethod$2(it) {
        if (it != undefined) return it[ITERATOR$1] || it['@@iterator'] || Iterators[classof$3(it)];
      };

      var anObject$8 = anObject$f;

      var iteratorClose$2 = function iteratorClose$2(iterator) {
        var returnMethod = iterator['return'];

        if (returnMethod !== undefined) {
          return anObject$8(returnMethod.call(iterator)).value;
        }
      };

      var anObject$7 = anObject$f;
      var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
      var toLength$7 = toLength$a;
      var bind$3 = functionBindContext;
      var getIteratorMethod$1 = getIteratorMethod$2;
      var iteratorClose$1 = iteratorClose$2;

      var Result = function Result(stopped, result) {
        this.stopped = stopped;
        this.result = result;
      };

      var iterate$1 = function iterate$1(iterable, unboundFunction, options) {
        var that = options && options.that;
        var AS_ENTRIES = !!(options && options.AS_ENTRIES);
        var IS_ITERATOR = !!(options && options.IS_ITERATOR);
        var INTERRUPTED = !!(options && options.INTERRUPTED);
        var fn = bind$3(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
        var iterator, iterFn, index, length, result, next, step;

        var stop = function stop(condition) {
          if (iterator) iteratorClose$1(iterator);
          return new Result(true, condition);
        };

        var callFn = function callFn(value) {
          if (AS_ENTRIES) {
            anObject$7(value);
            return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
          }

          return INTERRUPTED ? fn(value, stop) : fn(value);
        };

        if (IS_ITERATOR) {
          iterator = iterable;
        } else {
          iterFn = getIteratorMethod$1(iterable);
          if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

          if (isArrayIteratorMethod$1(iterFn)) {
            for (index = 0, length = toLength$7(iterable.length); length > index; index++) {
              result = callFn(iterable[index]);
              if (result && result instanceof Result) return result;
            }

            return new Result(false);
          }

          iterator = iterFn.call(iterable);
        }

        next = iterator.next;

        while (!(step = next.call(iterator)).done) {
          try {
            result = callFn(step.value);
          } catch (error) {
            iteratorClose$1(iterator);
            throw error;
          }

          if (_typeof(result) == 'object' && result && result instanceof Result) return result;
        }

        return new Result(false);
      };

      var wellKnownSymbol$8 = wellKnownSymbol$m;
      var ITERATOR = wellKnownSymbol$8('iterator');
      var SAFE_CLOSING = false;

      try {
        var called = 0;
        var iteratorWithReturn = {
          next: function next() {
            return {
              done: !!called++
            };
          },
          'return': function _return() {
            SAFE_CLOSING = true;
          }
        };

        iteratorWithReturn[ITERATOR] = function () {
          return this;
        }; // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing


        Array.from(iteratorWithReturn, function () {
          throw 2;
        });
      } catch (error) {
        /* empty */
      }

      var checkCorrectnessOfIteration$2 = function checkCorrectnessOfIteration$2(exec, SKIP_CLOSING) {
        if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
        var ITERATION_SUPPORT = false;

        try {
          var object = {};

          object[ITERATOR] = function () {
            return {
              next: function next() {
                return {
                  done: ITERATION_SUPPORT = true
                };
              }
            };
          };

          exec(object);
        } catch (error) {
          /* empty */
        }

        return ITERATION_SUPPORT;
      };

      var anObject$6 = anObject$f;
      var aFunction$2 = aFunction$4;
      var wellKnownSymbol$7 = wellKnownSymbol$m;
      var SPECIES$4 = wellKnownSymbol$7('species'); // `SpeciesConstructor` abstract operation
      // https://tc39.es/ecma262/#sec-speciesconstructor

      var speciesConstructor$2 = function speciesConstructor$2(O, defaultConstructor) {
        var C = anObject$6(O).constructor;
        var S;
        return C === undefined || (S = anObject$6(C)[SPECIES$4]) == undefined ? defaultConstructor : aFunction$2(S);
      };

      var userAgent$2 = engineUserAgent;
      var engineIsIos = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent$2);
      var classof$2 = classofRaw$1;
      var global$7 = global$n;
      var engineIsNode = classof$2(global$7.process) == 'process';
      var global$6 = global$n;
      var fails$6 = fails$h;
      var bind$2 = functionBindContext;
      var html = html$2;
      var createElement = documentCreateElement$1;
      var IS_IOS$1 = engineIsIos;
      var IS_NODE$2 = engineIsNode;
      var location$1 = global$6.location;
      var set = global$6.setImmediate;
      var clear = global$6.clearImmediate;
      var process$2 = global$6.process;
      var MessageChannel = global$6.MessageChannel;
      var Dispatch = global$6.Dispatch;
      var counter = 0;
      var queue = {};
      var ONREADYSTATECHANGE = 'onreadystatechange';
      var defer, channel, port;

      var run = function run(id) {
        // eslint-disable-next-line no-prototype-builtins -- safe
        if (queue.hasOwnProperty(id)) {
          var fn = queue[id];
          delete queue[id];
          fn();
        }
      };

      var runner = function runner(id) {
        return function () {
          run(id);
        };
      };

      var listener = function listener(event) {
        run(event.data);
      };

      var post = function post(id) {
        // old engines have not location.origin
        global$6.postMessage(id + '', location$1.protocol + '//' + location$1.host);
      }; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


      if (!set || !clear) {
        set = function setImmediate(fn) {
          var args = [];
          var i = 1;

          while (arguments.length > i) {
            args.push(arguments[i++]);
          }

          queue[++counter] = function () {
            // eslint-disable-next-line no-new-func -- spec requirement
            (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
          };

          defer(counter);
          return counter;
        };

        clear = function clearImmediate(id) {
          delete queue[id];
        }; // Node.js 0.8-


        if (IS_NODE$2) {
          defer = function defer(id) {
            process$2.nextTick(runner(id));
          }; // Sphere (JS game engine) Dispatch API

        } else if (Dispatch && Dispatch.now) {
          defer = function defer(id) {
            Dispatch.now(runner(id));
          }; // Browsers with MessageChannel, includes WebWorkers
          // except iOS - https://github.com/zloirock/core-js/issues/624

        } else if (MessageChannel && !IS_IOS$1) {
          channel = new MessageChannel();
          port = channel.port2;
          channel.port1.onmessage = listener;
          defer = bind$2(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
          // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
        } else if (global$6.addEventListener && typeof postMessage == 'function' && !global$6.importScripts && location$1 && location$1.protocol !== 'file:' && !fails$6(post)) {
          defer = post;
          global$6.addEventListener('message', listener, false); // IE8-
        } else if (ONREADYSTATECHANGE in createElement('script')) {
          defer = function defer(id) {
            html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
              html.removeChild(this);
              run(id);
            };
          }; // Rest old browsers

        } else {
          defer = function defer(id) {
            setTimeout(runner(id), 0);
          };
        }
      }

      var task$1 = {
        set: set,
        clear: clear
      };
      var userAgent$1 = engineUserAgent;
      var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent$1);
      var global$5 = global$n;
      var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
      var macrotask = task$1.set;
      var IS_IOS = engineIsIos;
      var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
      var IS_NODE$1 = engineIsNode;
      var MutationObserver$1 = global$5.MutationObserver || global$5.WebKitMutationObserver;
      var document$2 = global$5.document;
      var process$1 = global$5.process;
      var Promise$1 = global$5.Promise; // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`

      var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$5, 'queueMicrotask');
      var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
      var flush, head, last, notify$1, toggle, node, promise, then; // modern engines have queueMicrotask method

      if (!queueMicrotask) {
        flush = function flush() {
          var parent, fn;
          if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();

          while (head) {
            fn = head.fn;
            head = head.next;

            try {
              fn();
            } catch (error) {
              if (head) notify$1();else last = undefined;
              throw error;
            }
          }

          last = undefined;
          if (parent) parent.enter();
        }; // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
        // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898


        if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver$1 && document$2) {
          toggle = true;
          node = document$2.createTextNode('');
          new MutationObserver$1(flush).observe(node, {
            characterData: true
          });

          notify$1 = function notify$1() {
            node.data = toggle = !toggle;
          }; // environments with maybe non-completely correct, but existent Promise

        } else if (Promise$1 && Promise$1.resolve) {
          // Promise.resolve without an argument throws an error in LG WebOS 2
          promise = Promise$1.resolve(undefined); // workaround of WebKit ~ iOS Safari 10.1 bug

          promise.constructor = Promise$1;
          then = promise.then;

          notify$1 = function notify$1() {
            then.call(promise, flush);
          }; // Node.js without promises

        } else if (IS_NODE$1) {
          notify$1 = function notify$1() {
            process$1.nextTick(flush);
          }; // for other environments - macrotask based on:
          // - setImmediate
          // - MessageChannel
          // - window.postMessag
          // - onreadystatechange
          // - setTimeout

        } else {
          notify$1 = function notify$1() {
            // strange IE + webpack dev server bug - use .call(global)
            macrotask.call(global$5, flush);
          };
        }
      }

      var microtask$1 = queueMicrotask || function (fn) {
        var task = {
          fn: fn,
          next: undefined
        };
        if (last) last.next = task;

        if (!head) {
          head = task;
          notify$1();
        }

        last = task;
      };

      var newPromiseCapability$2 = {};
      var aFunction$1 = aFunction$4;

      var PromiseCapability = function PromiseCapability(C) {
        var resolve, reject;
        this.promise = new C(function ($$resolve, $$reject) {
          if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
          resolve = $$resolve;
          reject = $$reject;
        });
        this.resolve = aFunction$1(resolve);
        this.reject = aFunction$1(reject);
      }; // 25.4.1.5 NewPromiseCapability(C)


      newPromiseCapability$2.f = function (C) {
        return new PromiseCapability(C);
      };

      var anObject$5 = anObject$f;
      var isObject$4 = isObject$d;
      var newPromiseCapability$1 = newPromiseCapability$2;

      var promiseResolve$1 = function promiseResolve$1(C, x) {
        anObject$5(C);
        if (isObject$4(x) && x.constructor === C) return x;
        var promiseCapability = newPromiseCapability$1.f(C);
        var resolve = promiseCapability.resolve;
        resolve(x);
        return promiseCapability.promise;
      };

      var global$4 = global$n;

      var hostReportErrors$1 = function hostReportErrors$1(a, b) {
        var console = global$4.console;

        if (console && console.error) {
          arguments.length === 1 ? console.error(a) : console.error(a, b);
        }
      };

      var perform$1 = function perform$1(exec) {
        try {
          return {
            error: false,
            value: exec()
          };
        } catch (error) {
          return {
            error: true,
            value: error
          };
        }
      };

      var engineIsBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object';
      var $$g = _export;
      var global$3 = global$n;
      var getBuiltIn = getBuiltIn$6;
      var NativePromise = nativePromiseConstructor;
      var redefine$2 = redefine$8.exports;
      var redefineAll = redefineAll$1;
      var setPrototypeOf = objectSetPrototypeOf;
      var setToStringTag = setToStringTag$4;
      var setSpecies = setSpecies$1;
      var isObject$3 = isObject$d;
      var aFunction = aFunction$4;
      var anInstance = anInstance$1;
      var inspectSource = inspectSource$3;
      var iterate = iterate$1;
      var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$2;
      var speciesConstructor$1 = speciesConstructor$2;
      var task = task$1.set;
      var microtask = microtask$1;
      var promiseResolve = promiseResolve$1;
      var hostReportErrors = hostReportErrors$1;
      var newPromiseCapabilityModule = newPromiseCapability$2;
      var perform = perform$1;
      var InternalStateModule$1 = internalState;
      var isForced = isForced_1;
      var wellKnownSymbol$6 = wellKnownSymbol$m;
      var IS_BROWSER = engineIsBrowser;
      var IS_NODE = engineIsNode;
      var V8_VERSION$2 = engineV8Version;
      var SPECIES$3 = wellKnownSymbol$6('species');
      var PROMISE = 'Promise';
      var getInternalState$1 = InternalStateModule$1.get;
      var setInternalState$1 = InternalStateModule$1.set;
      var getInternalPromiseState = InternalStateModule$1.getterFor(PROMISE);
      var NativePromisePrototype = NativePromise && NativePromise.prototype;
      var PromiseConstructor = NativePromise;
      var PromiseConstructorPrototype = NativePromisePrototype;
      var TypeError$1 = global$3.TypeError;
      var document$1 = global$3.document;
      var process = global$3.process;
      var newPromiseCapability = newPromiseCapabilityModule.f;
      var newGenericPromiseCapability = newPromiseCapability;
      var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$3.dispatchEvent);
      var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
      var UNHANDLED_REJECTION = 'unhandledrejection';
      var REJECTION_HANDLED = 'rejectionhandled';
      var PENDING = 0;
      var FULFILLED = 1;
      var REJECTED = 2;
      var HANDLED = 1;
      var UNHANDLED = 2;
      var SUBCLASSING = false;
      var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
      var FORCED$1 = isForced(PROMISE, function () {
        var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor); // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
        // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
        // We can't detect it synchronously, so just check versions

        if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION$2 === 66) return true; // We can't use @@species feature detection in V8 since it causes
        // deoptimization and performance degradation
        // https://github.com/zloirock/core-js/issues/679

        if (V8_VERSION$2 >= 51 && /native code/.test(PromiseConstructor)) return false; // Detect correctness of subclassing with @@species support

        var promise = new PromiseConstructor(function (resolve) {
          resolve(1);
        });

        var FakePromise = function FakePromise(exec) {
          exec(function () {
            /* empty */
          }, function () {
            /* empty */
          });
        };

        var constructor = promise.constructor = {};
        constructor[SPECIES$3] = FakePromise;
        SUBCLASSING = promise.then(function () {
          /* empty */
        }) instanceof FakePromise;
        if (!SUBCLASSING) return true; // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test

        return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
      });
      var INCORRECT_ITERATION$1 = FORCED$1 || !checkCorrectnessOfIteration$1(function (iterable) {
        PromiseConstructor.all(iterable)['catch'](function () {
          /* empty */
        });
      }); // helpers

      var isThenable = function isThenable(it) {
        var then;
        return isObject$3(it) && typeof (then = it.then) == 'function' ? then : false;
      };

      var notify = function notify(state, isReject) {
        if (state.notified) return;
        state.notified = true;
        var chain = state.reactions;
        microtask(function () {
          var value = state.value;
          var ok = state.state == FULFILLED;
          var index = 0; // variable length - can't use forEach

          while (chain.length > index) {
            var reaction = chain[index++];
            var handler = ok ? reaction.ok : reaction.fail;
            var resolve = reaction.resolve;
            var reject = reaction.reject;
            var domain = reaction.domain;
            var result, then, exited;

            try {
              if (handler) {
                if (!ok) {
                  if (state.rejection === UNHANDLED) onHandleUnhandled(state);
                  state.rejection = HANDLED;
                }

                if (handler === true) result = value;else {
                  if (domain) domain.enter();
                  result = handler(value); // can throw

                  if (domain) {
                    domain.exit();
                    exited = true;
                  }
                }

                if (result === reaction.promise) {
                  reject(TypeError$1('Promise-chain cycle'));
                } else if (then = isThenable(result)) {
                  then.call(result, resolve, reject);
                } else resolve(result);
              } else reject(value);
            } catch (error) {
              if (domain && !exited) domain.exit();
              reject(error);
            }
          }

          state.reactions = [];
          state.notified = false;
          if (isReject && !state.rejection) onUnhandled(state);
        });
      };

      var dispatchEvent = function dispatchEvent(name, promise, reason) {
        var event, handler;

        if (DISPATCH_EVENT) {
          event = document$1.createEvent('Event');
          event.promise = promise;
          event.reason = reason;
          event.initEvent(name, false, true);
          global$3.dispatchEvent(event);
        } else event = {
          promise: promise,
          reason: reason
        };

        if (!NATIVE_REJECTION_EVENT && (handler = global$3['on' + name])) handler(event);else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
      };

      var onUnhandled = function onUnhandled(state) {
        task.call(global$3, function () {
          var promise = state.facade;
          var value = state.value;
          var IS_UNHANDLED = isUnhandled(state);
          var result;

          if (IS_UNHANDLED) {
            result = perform(function () {
              if (IS_NODE) {
                process.emit('unhandledRejection', value, promise);
              } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
            }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

            state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
            if (result.error) throw result.value;
          }
        });
      };

      var isUnhandled = function isUnhandled(state) {
        return state.rejection !== HANDLED && !state.parent;
      };

      var onHandleUnhandled = function onHandleUnhandled(state) {
        task.call(global$3, function () {
          var promise = state.facade;

          if (IS_NODE) {
            process.emit('rejectionHandled', promise);
          } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
        });
      };

      var bind$1 = function bind$1(fn, state, unwrap) {
        return function (value) {
          fn(state, value, unwrap);
        };
      };

      var internalReject = function internalReject(state, value, unwrap) {
        if (state.done) return;
        state.done = true;
        if (unwrap) state = unwrap;
        state.value = value;
        state.state = REJECTED;
        notify(state, true);
      };

      var internalResolve = function internalResolve(state, value, unwrap) {
        if (state.done) return;
        state.done = true;
        if (unwrap) state = unwrap;

        try {
          if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
          var then = isThenable(value);

          if (then) {
            microtask(function () {
              var wrapper = {
                done: false
              };

              try {
                then.call(value, bind$1(internalResolve, wrapper, state), bind$1(internalReject, wrapper, state));
              } catch (error) {
                internalReject(wrapper, error, state);
              }
            });
          } else {
            state.value = value;
            state.state = FULFILLED;
            notify(state, false);
          }
        } catch (error) {
          internalReject({
            done: false
          }, error, state);
        }
      }; // constructor polyfill


      if (FORCED$1) {
        // 25.4.3.1 Promise(executor)
        PromiseConstructor = function Promise(executor) {
          anInstance(this, PromiseConstructor, PROMISE);
          aFunction(executor);
          Internal.call(this);
          var state = getInternalState$1(this);

          try {
            executor(bind$1(internalResolve, state), bind$1(internalReject, state));
          } catch (error) {
            internalReject(state, error);
          }
        };

        PromiseConstructorPrototype = PromiseConstructor.prototype; // eslint-disable-next-line no-unused-vars -- required for `.length`

        Internal = function Promise(executor) {
          setInternalState$1(this, {
            type: PROMISE,
            done: false,
            notified: false,
            parent: false,
            reactions: [],
            rejection: false,
            state: PENDING,
            value: undefined
          });
        };

        Internal.prototype = redefineAll(PromiseConstructorPrototype, {
          // `Promise.prototype.then` method
          // https://tc39.es/ecma262/#sec-promise.prototype.then
          then: function then(onFulfilled, onRejected) {
            var state = getInternalPromiseState(this);
            var reaction = newPromiseCapability(speciesConstructor$1(this, PromiseConstructor));
            reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
            reaction.fail = typeof onRejected == 'function' && onRejected;
            reaction.domain = IS_NODE ? process.domain : undefined;
            state.parent = true;
            state.reactions.push(reaction);
            if (state.state != PENDING) notify(state, false);
            return reaction.promise;
          },
          // `Promise.prototype.catch` method
          // https://tc39.es/ecma262/#sec-promise.prototype.catch
          'catch': function _catch(onRejected) {
            return this.then(undefined, onRejected);
          }
        });

        OwnPromiseCapability = function OwnPromiseCapability() {
          var promise = new Internal();
          var state = getInternalState$1(promise);
          this.promise = promise;
          this.resolve = bind$1(internalResolve, state);
          this.reject = bind$1(internalReject, state);
        };

        newPromiseCapabilityModule.f = newPromiseCapability = function newPromiseCapability(C) {
          return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
        };

        if (typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
          nativeThen = NativePromisePrototype.then;

          if (!SUBCLASSING) {
            // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
            redefine$2(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
              var that = this;
              return new PromiseConstructor(function (resolve, reject) {
                nativeThen.call(that, resolve, reject);
              }).then(onFulfilled, onRejected); // https://github.com/zloirock/core-js/issues/640
            }, {
              unsafe: true
            }); // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`

            redefine$2(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], {
              unsafe: true
            });
          } // make `.constructor === Promise` work for native promise-based APIs


          try {
            delete NativePromisePrototype.constructor;
          } catch (error) {
            /* empty */
          } // make `instanceof Promise` work for native promise-based APIs


          if (setPrototypeOf) {
            setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
          }
        }
      }

      $$g({
        global: true,
        wrap: true,
        forced: FORCED$1
      }, {
        Promise: PromiseConstructor
      });
      setToStringTag(PromiseConstructor, PROMISE, false);
      setSpecies(PROMISE);
      PromiseWrapper = getBuiltIn(PROMISE); // statics

      $$g({
        target: PROMISE,
        stat: true,
        forced: FORCED$1
      }, {
        // `Promise.reject` method
        // https://tc39.es/ecma262/#sec-promise.reject
        reject: function reject(r) {
          var capability = newPromiseCapability(this);
          capability.reject.call(undefined, r);
          return capability.promise;
        }
      });
      $$g({
        target: PROMISE,
        stat: true,
        forced: FORCED$1
      }, {
        // `Promise.resolve` method
        // https://tc39.es/ecma262/#sec-promise.resolve
        resolve: function resolve(x) {
          return promiseResolve(this, x);
        }
      });
      $$g({
        target: PROMISE,
        stat: true,
        forced: INCORRECT_ITERATION$1
      }, {
        // `Promise.all` method
        // https://tc39.es/ecma262/#sec-promise.all
        all: function all(iterable) {
          var C = this;
          var capability = newPromiseCapability(C);
          var resolve = capability.resolve;
          var reject = capability.reject;
          var result = perform(function () {
            var $promiseResolve = aFunction(C.resolve);
            var values = [];
            var counter = 0;
            var remaining = 1;
            iterate(iterable, function (promise) {
              var index = counter++;
              var alreadyCalled = false;
              values.push(undefined);
              remaining++;
              $promiseResolve.call(C, promise).then(function (value) {
                if (alreadyCalled) return;
                alreadyCalled = true;
                values[index] = value;
                --remaining || resolve(values);
              }, reject);
            });
            --remaining || resolve(values);
          });
          if (result.error) reject(result.value);
          return capability.promise;
        },
        // `Promise.race` method
        // https://tc39.es/ecma262/#sec-promise.race
        race: function race(iterable) {
          var C = this;
          var capability = newPromiseCapability(C);
          var reject = capability.reject;
          var result = perform(function () {
            var $promiseResolve = aFunction(C.resolve);
            iterate(iterable, function (promise) {
              $promiseResolve.call(C, promise).then(capability.resolve, reject);
            });
          });
          if (result.error) reject(result.value);
          return capability.promise;
        }
      });
      var $$f = _export; // `Date.now` method
      // https://tc39.es/ecma262/#sec-date.now

      $$f({
        target: 'Date',
        stat: true
      }, {
        now: function now() {
          return new Date().getTime();
        }
      });
      var redefine$1 = redefine$8.exports;
      var DatePrototype = Date.prototype;
      var INVALID_DATE = 'Invalid Date';
      var TO_STRING = 'toString';
      var nativeDateToString = DatePrototype[TO_STRING];
      var getTime = DatePrototype.getTime; // `Date.prototype.toString` method
      // https://tc39.es/ecma262/#sec-date.prototype.tostring

      if (new Date(NaN) + '' != INVALID_DATE) {
        redefine$1(DatePrototype, TO_STRING, function toString() {
          var value = getTime.call(this); // eslint-disable-next-line no-self-compare -- NaN check

          return value === value ? nativeDateToString.call(this) : INVALID_DATE;
        });
      }

      var fails$5 = fails$h;

      var arrayMethodIsStrict$3 = function arrayMethodIsStrict$3(METHOD_NAME, argument) {
        var method = [][METHOD_NAME];
        return !!method && fails$5(function () {
          // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
          method.call(null, argument || function () {
            throw 1;
          }, 1);
        });
      };
      /* eslint-disable es/no-array-prototype-indexof -- required for testing */


      var $$e = _export;
      var $indexOf = arrayIncludes.indexOf;
      var arrayMethodIsStrict$2 = arrayMethodIsStrict$3;
      var nativeIndexOf = [].indexOf;
      var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
      var STRICT_METHOD$2 = arrayMethodIsStrict$2('indexOf'); // `Array.prototype.indexOf` method
      // https://tc39.es/ecma262/#sec-array.prototype.indexof

      $$e({
        target: 'Array',
        proto: true,
        forced: NEGATIVE_ZERO || !STRICT_METHOD$2
      }, {
        indexOf: function indexOf(searchElement
        /* , fromIndex = 0 */
        ) {
          return NEGATIVE_ZERO // convert -0 to +0
          ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
        }
      });
      var fails$4 = fails$h;
      var wellKnownSymbol$5 = wellKnownSymbol$m;
      var V8_VERSION$1 = engineV8Version;
      var SPECIES$2 = wellKnownSymbol$5('species');

      var arrayMethodHasSpeciesSupport$4 = function arrayMethodHasSpeciesSupport$4(METHOD_NAME) {
        // We can't use this feature detection in V8 since it causes
        // deoptimization and serious performance degradation
        // https://github.com/zloirock/core-js/issues/677
        return V8_VERSION$1 >= 51 || !fails$4(function () {
          var array = [];
          var constructor = array.constructor = {};

          constructor[SPECIES$2] = function () {
            return {
              foo: 1
            };
          };

          return array[METHOD_NAME](Boolean).foo !== 1;
        });
      };

      var $$d = _export;
      var isObject$2 = isObject$d;
      var isArray$1 = isArray$5;
      var toAbsoluteIndex$1 = toAbsoluteIndex$3;
      var toLength$6 = toLength$a;
      var toIndexedObject$2 = toIndexedObject$b;
      var createProperty$3 = createProperty$5;
      var wellKnownSymbol$4 = wellKnownSymbol$m;
      var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$4;
      var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3('slice');
      var SPECIES$1 = wellKnownSymbol$4('species');
      var nativeSlice = [].slice;
      var max$2 = Math.max; // `Array.prototype.slice` method
      // https://tc39.es/ecma262/#sec-array.prototype.slice
      // fallback for not array-like ES3 strings and DOM objects

      $$d({
        target: 'Array',
        proto: true,
        forced: !HAS_SPECIES_SUPPORT$2
      }, {
        slice: function slice(start, end) {
          var O = toIndexedObject$2(this);
          var length = toLength$6(O.length);
          var k = toAbsoluteIndex$1(start, length);
          var fin = toAbsoluteIndex$1(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

          var Constructor, result, n;

          if (isArray$1(O)) {
            Constructor = O.constructor; // cross-realm fallback

            if (typeof Constructor == 'function' && (Constructor === Array || isArray$1(Constructor.prototype))) {
              Constructor = undefined;
            } else if (isObject$2(Constructor)) {
              Constructor = Constructor[SPECIES$1];
              if (Constructor === null) Constructor = undefined;
            }

            if (Constructor === Array || Constructor === undefined) {
              return nativeSlice.call(O, k, fin);
            }
          }

          result = new (Constructor === undefined ? Array : Constructor)(max$2(fin - k, 0));

          for (n = 0; k < fin; k++, n++) {
            if (k in O) createProperty$3(result, n, O[k]);
          }

          result.length = n;
          return result;
        }
      });
      var anObject$4 = anObject$f;
      var iteratorClose = iteratorClose$2; // call something on iterator step with safe closing on error

      var callWithSafeIterationClosing$1 = function callWithSafeIterationClosing$1(iterator, fn, value, ENTRIES) {
        try {
          return ENTRIES ? fn(anObject$4(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
        } catch (error) {
          iteratorClose(iterator);
          throw error;
        }
      };

      var bind = functionBindContext;
      var toObject$3 = toObject$9;
      var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
      var isArrayIteratorMethod = isArrayIteratorMethod$2;
      var toLength$5 = toLength$a;
      var createProperty$2 = createProperty$5;
      var getIteratorMethod = getIteratorMethod$2; // `Array.from` method implementation
      // https://tc39.es/ecma262/#sec-array.from

      var arrayFrom = function from(arrayLike
      /* , mapfn = undefined, thisArg = undefined */
      ) {
        var O = toObject$3(arrayLike);
        var C = typeof this == 'function' ? this : Array;
        var argumentsLength = arguments.length;
        var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
        var mapping = mapfn !== undefined;
        var iteratorMethod = getIteratorMethod(O);
        var index = 0;
        var length, result, step, iterator, next, value;
        if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2); // if the target is not iterable or it's an array with the default iterator - use a simple case

        if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
          iterator = iteratorMethod.call(O);
          next = iterator.next;
          result = new C();

          for (; !(step = next.call(iterator)).done; index++) {
            value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
            createProperty$2(result, index, value);
          }
        } else {
          length = toLength$5(O.length);
          result = new C(length);

          for (; length > index; index++) {
            value = mapping ? mapfn(O[index], index) : O[index];
            createProperty$2(result, index, value);
          }
        }

        result.length = index;
        return result;
      };

      var $$c = _export;
      var from = arrayFrom;
      var checkCorrectnessOfIteration = checkCorrectnessOfIteration$2;
      var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
        // eslint-disable-next-line es/no-array-from -- required for testing
        Array.from(iterable);
      }); // `Array.from` method
      // https://tc39.es/ecma262/#sec-array.from

      $$c({
        target: 'Array',
        stat: true,
        forced: INCORRECT_ITERATION
      }, {
        from: from
      });
      var toInteger$2 = toInteger$5;
      var requireObjectCoercible$5 = requireObjectCoercible$8; // `String.prototype.{ codePointAt, at }` methods implementation

      var createMethod$2 = function createMethod$2(CONVERT_TO_STRING) {
        return function ($this, pos) {
          var S = String(requireObjectCoercible$5($this));
          var position = toInteger$2(pos);
          var size = S.length;
          var first, second;
          if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
          first = S.charCodeAt(position);
          return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
        };
      };

      var stringMultibyte = {
        // `String.prototype.codePointAt` method
        // https://tc39.es/ecma262/#sec-string.prototype.codepointat
        codeAt: createMethod$2(false),
        // `String.prototype.at` method
        // https://github.com/mathiasbynens/String.prototype.at
        charAt: createMethod$2(true)
      };
      var charAt$1 = stringMultibyte.charAt;
      var InternalStateModule = internalState;
      var defineIterator = defineIterator$2;
      var STRING_ITERATOR = 'String Iterator';
      var setInternalState = InternalStateModule.set;
      var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
      // https://tc39.es/ecma262/#sec-string.prototype-@@iterator

      defineIterator(String, 'String', function (iterated) {
        setInternalState(this, {
          type: STRING_ITERATOR,
          string: String(iterated),
          index: 0
        }); // `%StringIteratorPrototype%.next` method
        // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
      }, function next() {
        var state = getInternalState(this);
        var string = state.string;
        var index = state.index;
        var point;
        if (index >= string.length) return {
          value: undefined,
          done: true
        };
        point = charAt$1(string, index);
        state.index += point.length;
        return {
          value: point,
          done: false
        };
      });
      var $$b = _export;
      var global$2 = global$n;
      var userAgent = engineUserAgent;
      var slice = [].slice;
      var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

      var wrap = function wrap(scheduler) {
        return function (handler, timeout
        /* , ...arguments */
        ) {
          var boundArgs = arguments.length > 2;
          var args = boundArgs ? slice.call(arguments, 2) : undefined;
          return scheduler(boundArgs ? function () {
            // eslint-disable-next-line no-new-func -- spec requirement
            (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
          } : handler, timeout);
        };
      }; // ie9- setTimeout & setInterval additional parameters fix
      // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers


      $$b({
        global: true,
        bind: true,
        forced: MSIE
      }, {
        // `setTimeout` method
        // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
        setTimeout: wrap(global$2.setTimeout),
        // `setInterval` method
        // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
        setInterval: wrap(global$2.setInterval)
      });
      var $$a = _export;
      var $includes = arrayIncludes.includes;
      var addToUnscopables$1 = addToUnscopables$3; // `Array.prototype.includes` method
      // https://tc39.es/ecma262/#sec-array.prototype.includes

      $$a({
        target: 'Array',
        proto: true
      }, {
        includes: function includes(el
        /* , fromIndex = 0 */
        ) {
          return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
        }
      }); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

      addToUnscopables$1('includes');
      var isObject$1 = isObject$d;
      var classof$1 = classofRaw$1;
      var wellKnownSymbol$3 = wellKnownSymbol$m;
      var MATCH$1 = wellKnownSymbol$3('match'); // `IsRegExp` abstract operation
      // https://tc39.es/ecma262/#sec-isregexp

      var isRegexp = function isRegexp(it) {
        var isRegExp;
        return isObject$1(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$1(it) == 'RegExp');
      };

      var isRegExp$1 = isRegexp;

      var notARegexp = function notARegexp(it) {
        if (isRegExp$1(it)) {
          throw TypeError("The method doesn't accept regular expressions");
        }

        return it;
      };

      var wellKnownSymbol$2 = wellKnownSymbol$m;
      var MATCH = wellKnownSymbol$2('match');

      var correctIsRegexpLogic = function correctIsRegexpLogic(METHOD_NAME) {
        var regexp = /./;

        try {
          '/./'[METHOD_NAME](regexp);
        } catch (error1) {
          try {
            regexp[MATCH] = false;
            return '/./'[METHOD_NAME](regexp);
          } catch (error2) {
            /* empty */
          }
        }

        return false;
      };

      var $$9 = _export;
      var notARegExp = notARegexp;
      var requireObjectCoercible$4 = requireObjectCoercible$8;
      var correctIsRegExpLogic = correctIsRegexpLogic; // `String.prototype.includes` method
      // https://tc39.es/ecma262/#sec-string.prototype.includes

      $$9({
        target: 'String',
        proto: true,
        forced: !correctIsRegExpLogic('includes')
      }, {
        includes: function includes(searchString
        /* , position = 0 */
        ) {
          return !!~String(requireObjectCoercible$4(this)).indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
        }
      });
      var DESCRIPTORS = descriptors;
      var objectKeys = objectKeys$3;
      var toIndexedObject$1 = toIndexedObject$b;
      var propertyIsEnumerable = objectPropertyIsEnumerable.f; // `Object.{ entries, values }` methods implementation

      var createMethod$1 = function createMethod$1(TO_ENTRIES) {
        return function (it) {
          var O = toIndexedObject$1(it);
          var keys = objectKeys(O);
          var length = keys.length;
          var i = 0;
          var result = [];
          var key;

          while (length > i) {
            key = keys[i++];

            if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
              result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
            }
          }

          return result;
        };
      };

      var objectToArray = {
        // `Object.entries` method
        // https://tc39.es/ecma262/#sec-object.entries
        entries: createMethod$1(true),
        // `Object.values` method
        // https://tc39.es/ecma262/#sec-object.values
        values: createMethod$1(false)
      };
      var $$8 = _export;
      var $values = objectToArray.values; // `Object.values` method
      // https://tc39.es/ecma262/#sec-object.values

      $$8({
        target: 'Object',
        stat: true
      }, {
        values: function values(O) {
          return $values(O);
        }
      });
      var anObject$3 = anObject$f; // `RegExp.prototype.flags` getter implementation
      // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

      var regexpFlags$1 = function regexpFlags$1() {
        var that = anObject$3(this);
        var result = '';
        if (that.global) result += 'g';
        if (that.ignoreCase) result += 'i';
        if (that.multiline) result += 'm';
        if (that.dotAll) result += 's';
        if (that.unicode) result += 'u';
        if (that.sticky) result += 'y';
        return result;
      };

      var regexpStickyHelpers = {};
      var fails$3 = fails$h; // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
      // so we use an intermediate function.

      function RE(s, f) {
        return RegExp(s, f);
      }

      regexpStickyHelpers.UNSUPPORTED_Y = fails$3(function () {
        // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
        var re = RE('a', 'y');
        re.lastIndex = 2;
        return re.exec('abcd') != null;
      });
      regexpStickyHelpers.BROKEN_CARET = fails$3(function () {
        // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
        var re = RE('^r', 'gy');
        re.lastIndex = 2;
        return re.exec('str') != null;
      });
      /* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

      /* eslint-disable regexp/no-useless-quantifier -- testing */

      var regexpFlags = regexpFlags$1;
      var stickyHelpers$1 = regexpStickyHelpers;
      var shared = shared$5.exports;
      var nativeExec = RegExp.prototype.exec;
      var nativeReplace = shared('native-string-replace', String.prototype.replace);
      var patchedExec = nativeExec;

      var UPDATES_LAST_INDEX_WRONG = function () {
        var re1 = /a/;
        var re2 = /b*/g;
        nativeExec.call(re1, 'a');
        nativeExec.call(re2, 'a');
        return re1.lastIndex !== 0 || re2.lastIndex !== 0;
      }();

      var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y || stickyHelpers$1.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

      var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
      var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

      if (PATCH) {
        patchedExec = function exec(str) {
          var re = this;
          var lastIndex, reCopy, match, i;
          var sticky = UNSUPPORTED_Y$1 && re.sticky;
          var flags = regexpFlags.call(re);
          var source = re.source;
          var charsAdded = 0;
          var strCopy = str;

          if (sticky) {
            flags = flags.replace('y', '');

            if (flags.indexOf('g') === -1) {
              flags += 'g';
            }

            strCopy = String(str).slice(re.lastIndex); // Support anchored sticky behavior.

            if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
              source = '(?: ' + source + ')';
              strCopy = ' ' + strCopy;
              charsAdded++;
            } // ^(? + rx + ) is needed, in combination with some str slicing, to
            // simulate the 'y' flag.


            reCopy = new RegExp('^(?:' + source + ')', flags);
          }

          if (NPCG_INCLUDED) {
            reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
          }

          if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
          match = nativeExec.call(sticky ? reCopy : re, strCopy);

          if (sticky) {
            if (match) {
              match.input = match.input.slice(charsAdded);
              match[0] = match[0].slice(charsAdded);
              match.index = re.lastIndex;
              re.lastIndex += match[0].length;
            } else re.lastIndex = 0;
          } else if (UPDATES_LAST_INDEX_WRONG && match) {
            re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
          }

          if (NPCG_INCLUDED && match && match.length > 1) {
            // Fix browsers whose `exec` methods don't consistently return `undefined`
            // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
            nativeReplace.call(match[0], reCopy, function () {
              for (i = 1; i < arguments.length - 2; i++) {
                if (arguments[i] === undefined) match[i] = undefined;
              }
            });
          }

          return match;
        };
      }

      var regexpExec$3 = patchedExec;
      var $$7 = _export;
      var exec = regexpExec$3; // `RegExp.prototype.exec` method
      // https://tc39.es/ecma262/#sec-regexp.prototype.exec

      $$7({
        target: 'RegExp',
        proto: true,
        forced: /./.exec !== exec
      }, {
        exec: exec
      }); // TODO: Remove from `core-js@4` since it's moved to entry points

      var redefine = redefine$8.exports;
      var regexpExec$2 = regexpExec$3;
      var fails$2 = fails$h;
      var wellKnownSymbol$1 = wellKnownSymbol$m;
      var createNonEnumerableProperty$1 = createNonEnumerableProperty$a;
      var SPECIES = wellKnownSymbol$1('species');
      var RegExpPrototype = RegExp.prototype;
      var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$2(function () {
        // #replace needs built-in support for named groups.
        // #match works fine because it just return the exec results, even if it has
        // a "grops" property.
        var re = /./;

        re.exec = function () {
          var result = [];
          result.groups = {
            a: '7'
          };
          return result;
        };

        return ''.replace(re, '$<a>') !== '7';
      }); // IE <= 11 replaces $0 with the whole match, as if it was $&
      // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0

      var REPLACE_KEEPS_$0 = function () {
        // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
        return 'a'.replace(/./, '$0') === '$0';
      }();

      var REPLACE = wellKnownSymbol$1('replace'); // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string

      var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
        if (/./[REPLACE]) {
          return /./[REPLACE]('a', '$0') === '';
        }

        return false;
      }(); // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
      // Weex JS has frozen built-in prototypes, so use try / catch wrapper


      var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$2(function () {
        // eslint-disable-next-line regexp/no-empty-group -- required for testing
        var re = /(?:)/;
        var originalExec = re.exec;

        re.exec = function () {
          return originalExec.apply(this, arguments);
        };

        var result = 'ab'.split(re);
        return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
      });

      var fixRegexpWellKnownSymbolLogic = function fixRegexpWellKnownSymbolLogic(KEY, length, exec, sham) {
        var SYMBOL = wellKnownSymbol$1(KEY);
        var DELEGATES_TO_SYMBOL = !fails$2(function () {
          // String methods call symbol-named RegEp methods
          var O = {};

          O[SYMBOL] = function () {
            return 7;
          };

          return ''[KEY](O) != 7;
        });
        var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$2(function () {
          // Symbol-named RegExp methods call .exec
          var execCalled = false;
          var re = /a/;

          if (KEY === 'split') {
            // We can't use real regex here since it causes deoptimization
            // and serious performance degradation in V8
            // https://github.com/zloirock/core-js/issues/306
            re = {}; // RegExp[@@split] doesn't call the regex's exec method, but first creates
            // a new one. We need to return the patched regex when creating the new one.

            re.constructor = {};

            re.constructor[SPECIES] = function () {
              return re;
            };

            re.flags = '';
            re[SYMBOL] = /./[SYMBOL];
          }

          re.exec = function () {
            execCalled = true;
            return null;
          };

          re[SYMBOL]('');
          return !execCalled;
        });

        if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
          var nativeRegExpMethod = /./[SYMBOL];
          var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
            var $exec = regexp.exec;

            if ($exec === regexpExec$2 || $exec === RegExpPrototype.exec) {
              if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                // The native String method already delegates to @@method (this
                // polyfilled function), leasing to infinite recursion.
                // We avoid it by directly calling the native @@method method.
                return {
                  done: true,
                  value: nativeRegExpMethod.call(regexp, str, arg2)
                };
              }

              return {
                done: true,
                value: nativeMethod.call(str, regexp, arg2)
              };
            }

            return {
              done: false
            };
          }, {
            REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
            REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
          });
          var stringMethod = methods[0];
          var regexMethod = methods[1];
          redefine(String.prototype, KEY, stringMethod);
          redefine(RegExpPrototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
          // 21.2.5.11 RegExp.prototype[@@split](string, limit)
          ? function (string, arg) {
            return regexMethod.call(string, this, arg);
          } // 21.2.5.6 RegExp.prototype[@@match](string)
          // 21.2.5.9 RegExp.prototype[@@search](string)
          : function (string) {
            return regexMethod.call(string, this);
          });
        }

        if (sham) createNonEnumerableProperty$1(RegExpPrototype[SYMBOL], 'sham', true);
      };

      var charAt = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
      // https://tc39.es/ecma262/#sec-advancestringindex

      var advanceStringIndex$3 = function advanceStringIndex$3(S, index, unicode) {
        return index + (unicode ? charAt(S, index).length : 1);
      };

      var classof = classofRaw$1;
      var regexpExec$1 = regexpExec$3; // `RegExpExec` abstract operation
      // https://tc39.es/ecma262/#sec-regexpexec

      var regexpExecAbstract = function regexpExecAbstract(R, S) {
        var exec = R.exec;

        if (typeof exec === 'function') {
          var result = exec.call(R, S);

          if (_typeof(result) !== 'object') {
            throw TypeError('RegExp exec method returned something other than an Object or null');
          }

          return result;
        }

        if (classof(R) !== 'RegExp') {
          throw TypeError('RegExp#exec called on incompatible receiver');
        }

        return regexpExec$1.call(R, S);
      };

      var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
      var isRegExp = isRegexp;
      var anObject$2 = anObject$f;
      var requireObjectCoercible$3 = requireObjectCoercible$8;
      var speciesConstructor = speciesConstructor$2;
      var advanceStringIndex$2 = advanceStringIndex$3;
      var toLength$4 = toLength$a;
      var callRegExpExec = regexpExecAbstract;
      var regexpExec = regexpExec$3;
      var stickyHelpers = regexpStickyHelpers;
      var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
      var arrayPush = [].push;
      var min$2 = Math.min;
      var MAX_UINT32 = 0xFFFFFFFF; // @@split logic

      fixRegExpWellKnownSymbolLogic$2('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
        var internalSplit;

        if ('abbc'.split(/(b)*/)[1] == 'c' || // eslint-disable-next-line regexp/no-empty-group -- required for testing
        'test'.split(/(?:)/, -1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
        '.'.split(/()()/).length > 1 || ''.split(/.?/).length) {
          // based on es5-shim implementation, need to rework it
          internalSplit = function internalSplit(separator, limit) {
            var string = String(requireObjectCoercible$3(this));
            var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
            if (lim === 0) return [];
            if (separator === undefined) return [string]; // If `separator` is not a regex, use native split

            if (!isRegExp(separator)) {
              return nativeSplit.call(string, separator, lim);
            }

            var output = [];
            var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
            var lastLastIndex = 0; // Make `global` and avoid `lastIndex` issues by working with a copy

            var separatorCopy = new RegExp(separator.source, flags + 'g');
            var match, lastIndex, lastLength;

            while (match = regexpExec.call(separatorCopy, string)) {
              lastIndex = separatorCopy.lastIndex;

              if (lastIndex > lastLastIndex) {
                output.push(string.slice(lastLastIndex, match.index));
                if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
                lastLength = match[0].length;
                lastLastIndex = lastIndex;
                if (output.length >= lim) break;
              }

              if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
            }

            if (lastLastIndex === string.length) {
              if (lastLength || !separatorCopy.test('')) output.push('');
            } else output.push(string.slice(lastLastIndex));

            return output.length > lim ? output.slice(0, lim) : output;
          }; // Chakra, V8

        } else if ('0'.split(undefined, 0).length) {
          internalSplit = function internalSplit(separator, limit) {
            return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
          };
        } else internalSplit = nativeSplit;

        return [// `String.prototype.split` method
        // https://tc39.es/ecma262/#sec-string.prototype.split
        function split(separator, limit) {
          var O = requireObjectCoercible$3(this);
          var splitter = separator == undefined ? undefined : separator[SPLIT];
          return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
        }, // `RegExp.prototype[@@split]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
        //
        // NOTE: This cannot be properly polyfilled in engines that don't support
        // the 'y' flag.
        function (regexp, limit) {
          var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
          if (res.done) return res.value;
          var rx = anObject$2(regexp);
          var S = String(this);
          var C = speciesConstructor(rx, RegExp);
          var unicodeMatching = rx.unicode;
          var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (UNSUPPORTED_Y ? 'g' : 'y'); // ^(? + rx + ) is needed, in combination with some S slicing, to
          // simulate the 'y' flag.

          var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
          var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
          if (lim === 0) return [];
          if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
          var p = 0;
          var q = 0;
          var A = [];

          while (q < S.length) {
            splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
            var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S);
            var e;

            if (z === null || (e = min$2(toLength$4(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p) {
              q = advanceStringIndex$2(S, q, unicodeMatching);
            } else {
              A.push(S.slice(p, q));
              if (A.length === lim) return A;

              for (var i = 1; i <= z.length - 1; i++) {
                A.push(z[i]);
                if (A.length === lim) return A;
              }

              q = p = e;
            }
          }

          A.push(S.slice(p));
          return A;
        }];
      }, UNSUPPORTED_Y); // a string of all valid unicode whitespaces

      var whitespaces$2 = "\t\n\x0B\f\r \xA0\u1680\u2000\u2001\u2002" + "\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
      var requireObjectCoercible$2 = requireObjectCoercible$8;
      var whitespaces$1 = whitespaces$2;
      var whitespace = '[' + whitespaces$1 + ']';
      var ltrim = RegExp('^' + whitespace + whitespace + '*');
      var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

      var createMethod = function createMethod(TYPE) {
        return function ($this) {
          var string = String(requireObjectCoercible$2($this));
          if (TYPE & 1) string = string.replace(ltrim, '');
          if (TYPE & 2) string = string.replace(rtrim, '');
          return string;
        };
      };

      var stringTrim = {
        // `String.prototype.{ trimLeft, trimStart }` methods
        // https://tc39.es/ecma262/#sec-string.prototype.trimstart
        start: createMethod(1),
        // `String.prototype.{ trimRight, trimEnd }` methods
        // https://tc39.es/ecma262/#sec-string.prototype.trimend
        end: createMethod(2),
        // `String.prototype.trim` method
        // https://tc39.es/ecma262/#sec-string.prototype.trim
        trim: createMethod(3)
      };
      var fails$1 = fails$h;
      var whitespaces = whitespaces$2;
      var non = "\u200B\x85\u180E"; // check that a method works with the correct list
      // of whitespaces and has a correct name

      var stringTrimForced = function stringTrimForced(METHOD_NAME) {
        return fails$1(function () {
          return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
        });
      };

      var $$6 = _export;
      var $trim = stringTrim.trim;
      var forcedStringTrimMethod = stringTrimForced; // `String.prototype.trim` method
      // https://tc39.es/ecma262/#sec-string.prototype.trim

      $$6({
        target: 'String',
        proto: true,
        forced: forcedStringTrimMethod('trim')
      }, {
        trim: function trim() {
          return $trim(this);
        }
      });
      var $$5 = _export;
      var IndexedObject = indexedObject;
      var toIndexedObject = toIndexedObject$b;
      var arrayMethodIsStrict$1 = arrayMethodIsStrict$3;
      var nativeJoin = [].join;
      var ES3_STRINGS = IndexedObject != Object;
      var STRICT_METHOD$1 = arrayMethodIsStrict$1('join', ','); // `Array.prototype.join` method
      // https://tc39.es/ecma262/#sec-array.prototype.join

      $$5({
        target: 'Array',
        proto: true,
        forced: ES3_STRINGS || !STRICT_METHOD$1
      }, {
        join: function join(separator) {
          return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
        }
      });
      var $$4 = _export;
      var $find = arrayIteration.find;
      var addToUnscopables = addToUnscopables$3;
      var FIND = 'find';
      var SKIPS_HOLES = true; // Shouldn't skip holes

      if (FIND in []) Array(1)[FIND](function () {
        SKIPS_HOLES = false;
      }); // `Array.prototype.find` method
      // https://tc39.es/ecma262/#sec-array.prototype.find

      $$4({
        target: 'Array',
        proto: true,
        forced: SKIPS_HOLES
      }, {
        find: function find(callbackfn
        /* , that = undefined */
        ) {
          return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        }
      }); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

      addToUnscopables(FIND);
      var $$3 = _export;
      var toAbsoluteIndex = toAbsoluteIndex$3;
      var toInteger$1 = toInteger$5;
      var toLength$3 = toLength$a;
      var toObject$2 = toObject$9;
      var arraySpeciesCreate$1 = arraySpeciesCreate$3;
      var createProperty$1 = createProperty$5;
      var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$4;
      var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$2('splice');
      var max$1 = Math.max;
      var min$1 = Math.min;
      var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
      var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
      // https://tc39.es/ecma262/#sec-array.prototype.splice
      // with adding support of @@species

      $$3({
        target: 'Array',
        proto: true,
        forced: !HAS_SPECIES_SUPPORT$1
      }, {
        splice: function splice(start, deleteCount
        /* , ...items */
        ) {
          var O = toObject$2(this);
          var len = toLength$3(O.length);
          var actualStart = toAbsoluteIndex(start, len);
          var argumentsLength = arguments.length;
          var insertCount, actualDeleteCount, A, k, from, to;

          if (argumentsLength === 0) {
            insertCount = actualDeleteCount = 0;
          } else if (argumentsLength === 1) {
            insertCount = 0;
            actualDeleteCount = len - actualStart;
          } else {
            insertCount = argumentsLength - 2;
            actualDeleteCount = min$1(max$1(toInteger$1(deleteCount), 0), len - actualStart);
          }

          if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
            throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
          }

          A = arraySpeciesCreate$1(O, actualDeleteCount);

          for (k = 0; k < actualDeleteCount; k++) {
            from = actualStart + k;
            if (from in O) createProperty$1(A, k, O[from]);
          }

          A.length = actualDeleteCount;

          if (insertCount < actualDeleteCount) {
            for (k = actualStart; k < len - actualDeleteCount; k++) {
              from = k + actualDeleteCount;
              to = k + insertCount;
              if (from in O) O[to] = O[from];else delete O[to];
            }

            for (k = len; k > len - actualDeleteCount + insertCount; k--) {
              delete O[k - 1];
            }
          } else if (insertCount > actualDeleteCount) {
            for (k = len - actualDeleteCount; k > actualStart; k--) {
              from = k + actualDeleteCount - 1;
              to = k + insertCount - 1;
              if (from in O) O[to] = O[from];else delete O[to];
            }
          }

          for (k = 0; k < insertCount; k++) {
            O[k + actualStart] = arguments[k + 2];
          }

          O.length = len - actualDeleteCount + insertCount;
          return A;
        }
      });
      var $forEach = arrayIteration.forEach;
      var arrayMethodIsStrict = arrayMethodIsStrict$3;
      var STRICT_METHOD = arrayMethodIsStrict('forEach'); // `Array.prototype.forEach` method implementation
      // https://tc39.es/ecma262/#sec-array.prototype.foreach

      var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn
      /* , thisArg */
      ) {
        return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined); // eslint-disable-next-line es/no-array-prototype-foreach -- safe
      } : [].forEach;
      var $$2 = _export;
      var forEach$1 = arrayForEach; // `Array.prototype.forEach` method
      // https://tc39.es/ecma262/#sec-array.prototype.foreach
      // eslint-disable-next-line es/no-array-prototype-foreach -- safe

      $$2({
        target: 'Array',
        proto: true,
        forced: [].forEach != forEach$1
      }, {
        forEach: forEach$1
      });
      var global$1 = global$n;
      var DOMIterables = domIterables;
      var forEach = arrayForEach;
      var createNonEnumerableProperty = createNonEnumerableProperty$a;

      for (var COLLECTION_NAME in DOMIterables) {
        var Collection = global$1[COLLECTION_NAME];
        var CollectionPrototype = Collection && Collection.prototype; // some Chrome versions have non-configurable methods on DOMTokenList

        if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
          createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
        } catch (error) {
          CollectionPrototype.forEach = forEach;
        }
      }

      var $$1 = _export;
      var $filter = arrayIteration.filter;
      var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$4;
      var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('filter'); // `Array.prototype.filter` method
      // https://tc39.es/ecma262/#sec-array.prototype.filter
      // with adding support of @@species

      $$1({
        target: 'Array',
        proto: true,
        forced: !HAS_SPECIES_SUPPORT
      }, {
        filter: function filter(callbackfn
        /* , thisArg */
        ) {
          return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        }
      });
      var $ = _export;
      var fails = fails$h;
      var isArray = isArray$5;
      var isObject = isObject$d;
      var toObject$1 = toObject$9;
      var toLength$2 = toLength$a;
      var createProperty = createProperty$5;
      var arraySpeciesCreate = arraySpeciesCreate$3;
      var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$4;
      var wellKnownSymbol = wellKnownSymbol$m;
      var V8_VERSION = engineV8Version;
      var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
      var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
      var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
      // deoptimization and serious performance degradation
      // https://github.com/zloirock/core-js/issues/679

      var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
        var array = [];
        array[IS_CONCAT_SPREADABLE] = false;
        return array.concat()[0] !== array;
      });
      var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

      var isConcatSpreadable = function isConcatSpreadable(O) {
        if (!isObject(O)) return false;
        var spreadable = O[IS_CONCAT_SPREADABLE];
        return spreadable !== undefined ? !!spreadable : isArray(O);
      };

      var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
      // https://tc39.es/ecma262/#sec-array.prototype.concat
      // with adding support of @@isConcatSpreadable and @@species

      $({
        target: 'Array',
        proto: true,
        forced: FORCED
      }, {
        // eslint-disable-next-line no-unused-vars -- required for `.length`
        concat: function concat(arg) {
          var O = toObject$1(this);
          var A = arraySpeciesCreate(O, 0);
          var n = 0;
          var i, k, length, len, E;

          for (i = -1, length = arguments.length; i < length; i++) {
            E = i === -1 ? O : arguments[i];

            if (isConcatSpreadable(E)) {
              len = toLength$2(E.length);
              if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

              for (k = 0; k < len; k++, n++) {
                if (k in E) createProperty(A, n, E[k]);
              }
            } else {
              if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
              createProperty(A, n++, E);
            }
          }

          A.length = n;
          return A;
        }
      });
      var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
      var anObject$1 = anObject$f;
      var toLength$1 = toLength$a;
      var requireObjectCoercible$1 = requireObjectCoercible$8;
      var advanceStringIndex$1 = advanceStringIndex$3;
      var regExpExec$1 = regexpExecAbstract; // @@match logic

      fixRegExpWellKnownSymbolLogic$1('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
        return [// `String.prototype.match` method
        // https://tc39.es/ecma262/#sec-string.prototype.match
        function match(regexp) {
          var O = requireObjectCoercible$1(this);
          var matcher = regexp == undefined ? undefined : regexp[MATCH];
          return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
        }, // `RegExp.prototype[@@match]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
        function (regexp) {
          var res = maybeCallNative(nativeMatch, regexp, this);
          if (res.done) return res.value;
          var rx = anObject$1(regexp);
          var S = String(this);
          if (!rx.global) return regExpExec$1(rx, S);
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
          var A = [];
          var n = 0;
          var result;

          while ((result = regExpExec$1(rx, S)) !== null) {
            var matchStr = String(result[0]);
            A[n] = matchStr;
            if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
            n++;
          }

          return n === 0 ? null : A;
        }];
      });
      var toObject = toObject$9;
      var floor = Math.floor;
      var replace = ''.replace;
      var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
      var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g; // https://tc39.es/ecma262/#sec-getsubstitution

      var getSubstitution$1 = function getSubstitution$1(matched, str, position, captures, namedCaptures, replacement) {
        var tailPos = position + matched.length;
        var m = captures.length;
        var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

        if (namedCaptures !== undefined) {
          namedCaptures = toObject(namedCaptures);
          symbols = SUBSTITUTION_SYMBOLS;
        }

        return replace.call(replacement, symbols, function (match, ch) {
          var capture;

          switch (ch.charAt(0)) {
            case '$':
              return '$';

            case '&':
              return matched;

            case '`':
              return str.slice(0, position);

            case "'":
              return str.slice(tailPos);

            case '<':
              capture = namedCaptures[ch.slice(1, -1)];
              break;

            default:
              // \d\d?
              var n = +ch;
              if (n === 0) return match;

              if (n > m) {
                var f = floor(n / 10);
                if (f === 0) return match;
                if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                return match;
              }

              capture = captures[n - 1];
          }

          return capture === undefined ? '' : capture;
        });
      };

      var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
      var anObject = anObject$f;
      var toLength = toLength$a;
      var toInteger = toInteger$5;
      var requireObjectCoercible = requireObjectCoercible$8;
      var advanceStringIndex = advanceStringIndex$3;
      var getSubstitution = getSubstitution$1;
      var regExpExec = regexpExecAbstract;
      var max = Math.max;
      var min = Math.min;

      var maybeToString = function maybeToString(it) {
        return it === undefined ? it : String(it);
      }; // @@replace logic


      fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
        var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
        var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
        var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
        return [// `String.prototype.replace` method
        // https://tc39.es/ecma262/#sec-string.prototype.replace
        function replace(searchValue, replaceValue) {
          var O = requireObjectCoercible(this);
          var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
          return replacer !== undefined ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
        }, // `RegExp.prototype[@@replace]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
        function (regexp, replaceValue) {
          if (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0 || typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1) {
            var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
            if (res.done) return res.value;
          }

          var rx = anObject(regexp);
          var S = String(this);
          var functionalReplace = typeof replaceValue === 'function';
          if (!functionalReplace) replaceValue = String(replaceValue);
          var global = rx.global;

          if (global) {
            var fullUnicode = rx.unicode;
            rx.lastIndex = 0;
          }

          var results = [];

          while (true) {
            var result = regExpExec(rx, S);
            if (result === null) break;
            results.push(result);
            if (!global) break;
            var matchStr = String(result[0]);
            if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          }

          var accumulatedResult = '';
          var nextSourcePosition = 0;

          for (var i = 0; i < results.length; i++) {
            result = results[i];
            var matched = String(result[0]);
            var position = max(min(toInteger(result.index), S.length), 0);
            var captures = []; // NOTE: This is equivalent to
            //   captures = result.slice(1).map(maybeToString)
            // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
            // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
            // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

            for (var j = 1; j < result.length; j++) {
              captures.push(maybeToString(result[j]));
            }

            var namedCaptures = result.groups;

            if (functionalReplace) {
              var replacerArgs = [matched].concat(captures, position, S);
              if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
              var replacement = String(replaceValue.apply(undefined, replacerArgs));
            } else {
              replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
            }

            if (position >= nextSourcePosition) {
              accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
              nextSourcePosition = position + matched.length;
            }
          }

          return accumulatedResult + S.slice(nextSourcePosition);
        }];
      });

      function ownKeys$1(object, enumerableOnly) {
        var keys = Object.keys(object);

        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);

          if (enumerableOnly) {
            symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
          }

          keys.push.apply(keys, symbols);
        }

        return keys;
      }

      function _objectSpread$1(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};

          if (i % 2) {
            ownKeys$1(Object(source), true).forEach(function (key) {
              _defineProperty(target, key, source[key]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
          } else {
            ownKeys$1(Object(source)).forEach(function (key) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
          }
        }

        return target;
      }

      var getDeviceInfo = function getDeviceInfo() {
        var getOs = function getOs() {
          var getMatchMap = function getMatchMap(u) {
            return {
              // 内核
              'Trident': u.indexOf('Trident') > -1 || u.indexOf('NET CLR') > -1,
              'Presto': u.indexOf('Presto') > -1,
              'WebKit': u.indexOf('AppleWebKit') > -1,
              'Gecko': u.indexOf('Gecko/') > -1,
              // 浏览器
              'Safari': u.indexOf('Safari') > -1,
              'Chrome': u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1,
              'IE': u.indexOf('MSIE') > -1 || u.indexOf('Trident') > -1,
              'Edge': u.indexOf('Edge') > -1,
              'Firefox': u.indexOf('Firefox') > -1 || u.indexOf('FxiOS') > -1,
              'Firefox Focus': u.indexOf('Focus') > -1,
              'Chromium': u.indexOf('Chromium') > -1,
              'Opera': u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1,
              'Vivaldi': u.indexOf('Vivaldi') > -1,
              'Yandex': u.indexOf('YaBrowser') > -1,
              'Arora': u.indexOf('Arora') > -1,
              'Lunascape': u.indexOf('Lunascape') > -1,
              'QupZilla': u.indexOf('QupZilla') > -1,
              'Coc Coc': u.indexOf('coc_coc_browser') > -1,
              'Kindle': u.indexOf('Kindle') > -1 || u.indexOf('Silk/') > -1,
              'Iceweasel': u.indexOf('Iceweasel') > -1,
              'Konqueror': u.indexOf('Konqueror') > -1,
              'Iceape': u.indexOf('Iceape') > -1,
              'SeaMonkey': u.indexOf('SeaMonkey') > -1,
              'Epiphany': u.indexOf('Epiphany') > -1,
              '360': u.indexOf('QihooBrowser') > -1 || u.indexOf('QHBrowser') > -1,
              '360EE': u.indexOf('360EE') > -1,
              '360SE': u.indexOf('360SE') > -1,
              'UC': u.indexOf('UC') > -1 || u.indexOf(' UBrowser') > -1,
              'QQBrowser': u.indexOf('QQBrowser') > -1,
              'QQ': u.indexOf('QQ/') > -1,
              'Baidu': u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1,
              'Maxthon': u.indexOf('Maxthon') > -1,
              'Sogou': u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1,
              'LBBROWSER': u.indexOf('LBBROWSER') > -1,
              '2345Explorer': u.indexOf('2345Explorer') > -1,
              'TheWorld': u.indexOf('TheWorld') > -1,
              'XiaoMi': u.indexOf('MiuiBrowser') > -1,
              'Quark': u.indexOf('Quark') > -1,
              'Qiyu': u.indexOf('Qiyu') > -1,
              'Wechat': u.indexOf('MicroMessenger') > -1,
              'WechatWork': u.indexOf('wxwork/') > -1,
              'Taobao': u.indexOf('AliApp(TB') > -1,
              'Alipay': u.indexOf('AliApp(AP') > -1,
              'Weibo': u.indexOf('Weibo') > -1,
              'Douban': u.indexOf('com.douban.frodo') > -1,
              'Suning': u.indexOf('SNEBUY-APP') > -1,
              'iQiYi': u.indexOf('IqiyiApp') > -1,
              // 系统或平台
              'Windows': u.indexOf('Windows') > -1,
              'Linux': u.indexOf('Linux') > -1 || u.indexOf('X11') > -1,
              'Mac OS': u.indexOf('Macintosh') > -1,
              'Android': u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
              'Ubuntu': u.indexOf('Ubuntu') > -1,
              'FreeBSD': u.indexOf('FreeBSD') > -1,
              'Debian': u.indexOf('Debian') > -1,
              'Windows Phone': u.indexOf('IEMobile') > -1 || u.indexOf('Windows Phone') > -1,
              'BlackBerry': u.indexOf('BlackBerry') > -1 || u.indexOf('RIM') > -1,
              'MeeGo': u.indexOf('MeeGo') > -1,
              'Symbian': u.indexOf('Symbian') > -1,
              'iOS': u.indexOf('like Mac OS X') > -1,
              'Chrome OS': u.indexOf('CrOS') > -1,
              'WebOS': u.indexOf('hpwOS') > -1,
              // 设备
              'Mobile': u.indexOf('Mobi') > -1 || u.indexOf('iPh') > -1 || u.indexOf('480') > -1,
              'Tablet': u.indexOf('Tablet') > -1 || u.indexOf('Nexus 7') > -1,
              'iPad': u.indexOf('iPad') > -1
            };
          };

          var match = getMatchMap(navigator.userAgent);
          var infoMap = {
            engine: ['WebKit', 'Trident', 'Gecko', 'Presto'],
            browser: ['Safari', 'Chrome', 'Edge', 'IE', 'Firefox', 'Firefox Focus', 'Chromium', 'Opera', 'Vivaldi', 'Yandex', 'Arora', 'Lunascape', 'QupZilla', 'Coc Coc', 'Kindle', 'Iceweasel', 'Konqueror', 'Iceape', 'SeaMonkey', 'Epiphany', '360', '360SE', '360EE', 'UC', 'QQBrowser', 'QQ', 'Baidu', 'Maxthon', 'Sogou', 'LBBROWSER', '2345Explorer', 'TheWorld', 'XiaoMi', 'Quark', 'Qiyu', 'Wechat',, 'WechatWork', 'Taobao', 'Alipay', 'Weibo', 'Douban', 'Suning', 'iQiYi'],
            os: ['Windows', 'Linux', 'Mac OS', 'Android', 'Ubuntu', 'FreeBSD', 'Debian', 'iOS', 'Windows Phone', 'BlackBerry', 'MeeGo', 'Symbian', 'Chrome OS', 'WebOS'],
            device: ['Mobile', 'Tablet', 'iPad']
          };
          var result = {};

          for (var s in infoMap) {
            for (var i = 0; i < infoMap[s].length; i++) {
              var value = infoMap[s][i];

              if (match[value]) {
                result[s] = value;
              }
            }
          }

          var userAgent = navigator.userAgent.toLowerCase();

          var getVersion = function getVersion(matchFn) {
            var match = matchFn();
            return function (processFn) {
              return match ? processFn(match) : '';
            };
          };

          var Version = {
            IE: function IE() {
              return getVersion(function () {
                return userAgent.match(/(msie\s|trident.*rv:)([\w.]+)/);
              })(function (res) {
                return res[2];
              });
            },
            Chrome: function Chrome() {
              return getVersion(function () {
                return userAgent.match(/chrome\/([\d.]+)/);
              })(function (res) {
                return res[1];
              });
            },
            Firefox: function Firefox() {
              return getVersion(function () {
                return userAgent.match(/firefox\/([\d.]+)/);
              })(function (res) {
                return res[1];
              });
            },
            Opera: function Opera() {
              return getVersion(function () {
                return userAgent.match(/opera\/([\d.]+)/);
              })(function (res) {
                return res[1];
              });
            },
            Safari: function Safari() {
              return getVersion(function () {
                return userAgent.match(/version\/([\d.]+)/);
              })(function (res) {
                return res[1];
              });
            },
            Edge: function Edge() {
              return getVersion(function () {
                return userAgent.match(/edge\/([\d.]+)/);
              })(function (res) {
                return res[1];
              });
            },
            QQBrowser: function QQBrowser() {
              return getVersion(function () {
                return userAgent.match(/qqbrowser\/([\d.]+)/);
              })(function (res) {
                return res[1];
              });
            }
          };
          result.version = Version[result.browser] ? Version[result.browser]() : '';
          return result;
        };

        var getOsVersion = function getOsVersion(os) {
          var u = navigator.userAgent;
          var osVersion = {
            'Windows': function Windows() {
              var v = u.replace(/^.*Windows NT ([\d.]+);.*$/, '$1');
              var oldWindowsVersionMap = {
                '6.4': '10',
                '6.3': '8.1',
                '6.2': '8',
                '6.1': '7',
                '6.0': 'Vista',
                '5.2': 'XP',
                '5.1': 'XP',
                '5.0': '2000'
              };
              return oldWindowsVersionMap[v] || v;
            },
            'Android': function Android() {
              return u.replace(/^.*Android ([\d.]+);.*$/, '$1');
            },
            'iOS': function iOS() {
              return u.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.');
            },
            'Debian': function Debian() {
              return u.replace(/^.*Debian\/([\d.]+).*$/, '$1');
            },
            'Windows Phone': function WindowsPhone() {
              return u.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2');
            },
            'Mac OS': function MacOS() {
              return u.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.');
            },
            'WebOS': function WebOS() {
              return u.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1');
            }
          };
          var version = '';

          if (osVersion[os]) {
            version = osVersion[os]();

            if (version == u) {
              version = '';
            }
          }

          return version;
        };

        var osInfo = getOs();
        return _objectSpread$1(_objectSpread$1({}, osInfo), {}, {
          osVersion: getOsVersion(osInfo.os)
        });
      };

      function _createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

        if (!it) {
          if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;

            var F = function F() {};

            return {
              s: F,
              n: function n() {
                if (i >= o.length) return {
                  done: true
                };
                return {
                  done: false,
                  value: o[i++]
                };
              },
              e: function e(_e) {
                throw _e;
              },
              f: F
            };
          }

          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        var normalCompletion = true,
            didErr = false,
            err;
        return {
          s: function s() {
            it = it.call(o);
          },
          n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
          },
          e: function e(_e2) {
            didErr = true;
            err = _e2;
          },
          f: function f() {
            try {
              if (!normalCompletion && it["return"] != null) it["return"]();
            } finally {
              if (didErr) throw err;
            }
          }
        };
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

        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }

      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);

        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);

          if (enumerableOnly) {
            symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
          }

          keys.push.apply(keys, symbols);
        }

        return keys;
      }

      function _objectSpread(target) {
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

      var JsTracking = function JsTracking(config) {
        config = _objectSpread({
          dataName: {
            pageLoad: 'data-tracking-page-load',
            elementClick: 'data-tracking-element-click',
            elementView: 'data-tracking-element-view'
          },
          processData: function processData(data) {
            return _objectSpread({}, data.attrData);
          },
          submitData: function submitData() {
            return Promise.resolve();
          },
          submitConditions: function submitConditions() {
            return true;
          },
          elementViewConditions: function elementViewConditions() {
            return true;
          },
          globalCommonListen: false,
          // 全局通用埋点监听事件
          storeKeyName: 'data-tracking'
        }, config);
        var firstDateTime = Date.now();

        var getBindElement = function getBindElement(element, attributeName) {
          var hasAttr = element === null || element === void 0 ? void 0 : element.hasAttribute(attributeName);

          if (hasAttr) {
            return element;
          }

          if (element.nodeName.toLowerCase() === 'body') {
            return null;
          }

          return getBindElement(element.parentElement, attributeName);
        };

        var getPathName = function getPathName() {
          var hashRouter = location.hash.indexOf('#/') === 0;
          var pathName = location.pathname;

          if (hashRouter) {
            pathName = location.hash.slice(1);
          }

          if (pathName !== '/' && pathName.slice(-1) === '/') {
            pathName = pathName.slice(0, -1);
          }

          return pathName;
        };

        var getElementIndex = function getElementIndex(element) {
          return Array.from(element.parentElement.children).indexOf(element);
        };

        var hasElementClientRect = function hasElementClientRect(element) {
          var elementHeight = element.getBoundingClientRect().height;
          var elementClientY = element.getBoundingClientRect().y;
          var innerHeight = window.innerHeight;
          return innerHeight - elementClientY > 0 && innerHeight - elementClientY - elementHeight <= innerHeight;
        };

        var getAttrData = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(element, attributeName) {
            var data;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    data = element.getAttribute(attributeName); // 处理异步加载元素属性数据

                    if (!(data === 'async')) {
                      _context.next = 5;
                      break;
                    }

                    _context.next = 4;
                    return new Promise(function (resolve) {
                      // 如果不支持MutationObserver方法，使用定时器模拟
                      if (typeof MutationObserver === 'undefined') {
                        var seconds = 0;
                        var timer = setInterval(function () {
                          var value = element.getAttribute(attributeName);
                          seconds += 1;

                          if (value !== 'async') {
                            resolve(value);
                            clearInterval(timer);
                            return;
                          } // 5秒还没载入数据，不等了
                          // 5秒还没载入数据，不等了


                          if (seconds >= 5) {
                            resolve('{}');
                            clearInterval(timer);
                          }
                        }, 1000);
                      } else {
                        var observer = new MutationObserver(function (mutationsList) {
                          var _iterator = _createForOfIteratorHelper(mutationsList),
                              _step;

                          try {
                            for (_iterator.s(); !(_step = _iterator.n()).done;) {
                              var mutation = _step.value;

                              if (mutation.type === 'attributes' && Object.values(config.dataName).includes(mutation.attributeName)) {
                                observer.disconnect();
                                resolve(element.getAttribute(attributeName));
                              }
                            }
                          } catch (err) {
                            _iterator.e(err);
                          } finally {
                            _iterator.f();
                          }
                        });
                        observer.observe(element, {
                          attributes: true
                        });
                      }
                    });

                  case 4:
                    data = _context.sent;

                  case 5:
                    return _context.abrupt("return", JSON.parse(data || '{}'));

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function getAttrData(_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }();

        var getGlobalData = function getGlobalData() {
          var getCookieData = function getCookieData() {
            if (!document.cookie) {
              return {};
            }

            var cookieList = document.cookie.split(';');
            var cookieJson = {};

            var _iterator2 = _createForOfIteratorHelper(cookieList),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var cookie = _step2.value;

                var _cookie$split = cookie.split('='),
                    _cookie$split2 = _slicedToArray(_cookie$split, 2),
                    name = _cookie$split2[0],
                    value = _cookie$split2[1];

                cookieJson[name.trim()] = value.trim();
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            return cookieJson;
          };

          var getPageData = function getPageData() {
            return {
              url: location.href,
              host: location.host,
              hostName: location.hostname,
              pathName: getPathName(),
              title: document.title,
              referrer: document.referrer,
              referrerHost: document.referrer.split('/')[2] || ''
            };
          };

          var getNavigator = function getNavigator() {
            var getLanguage = function getLanguage() {
              var language = navigator.browserLanguage || navigator.language;
              var arr = language.split('-');

              if (arr[1]) {
                arr[1] = arr[1].toUpperCase();
              }

              return arr.join('-');
            };

            return _objectSpread({
              language: getLanguage(),
              userAgent: navigator.userAgent,
              platform: navigator.platform,
              appName: navigator.appName,
              viewportWidth: window.innerWidth,
              viewportHeight: window.innerHeight,
              screenWidth: window.screen.width,
              screenHeight: window.screen.height
            }, getDeviceInfo());
          };

          return {
            page: getPageData(),
            cookie: getCookieData(),
            navigator: getNavigator()
          };
        };

        var saveLocalData = function saveLocalData(data) {
          localStorage.setItem(config.storeKeyName, JSON.stringify(data));
        };

        var getLocalData = function getLocalData() {
          return JSON.parse(localStorage.getItem(config.storeKeyName)) || [];
        };

        var emptyLocalData = function emptyLocalData() {
          localStorage.removeItem(config.storeKeyName);
        };

        var pushLocalData = function pushLocalData(data) {
          var dataList = getLocalData();
          dataList.push(data);
          saveLocalData(dataList);
          return dataList;
        };

        var postData = function postData() {
          var dataList = getLocalData();

          if (!dataList.length) {
            return;
          }

          config.submitData(dataList).then(function (success) {
            if (success !== false) {
              emptyLocalData();
            }
          });
        };

        var saveData = /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(attrData, eventType) {
            var option,
                data,
                _args2 = arguments;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    option = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
                    _context2.next = 3;
                    return config.processData(_objectSpread(_objectSpread({}, getGlobalData()), {}, {
                      attrData: attrData
                    }), _objectSpread({
                      eventType: eventType,
                      firstDateTime: firstDateTime,
                      eventDateTime: Date.now(),
                      pathName: getPathName()
                    }, option));

                  case 3:
                    data = _context2.sent;
                    return _context2.abrupt("return", pushLocalData(data));

                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function saveData(_x3, _x4) {
            return _ref2.apply(this, arguments);
          };
        }();

        var submitData = /*#__PURE__*/function () {
          var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(attrData, eventType) {
            var option,
                dataList,
                _args3 = arguments;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    option = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
                    _context3.next = 3;
                    return saveData(attrData, eventType, option);

                  case 3:
                    dataList = _context3.sent;

                    if (config.submitConditions(dataList)) {
                      _context3.next = 6;
                      break;
                    }

                    return _context3.abrupt("return");

                  case 6:
                    postData();

                  case 7:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          return function submitData(_x5, _x6) {
            return _ref3.apply(this, arguments);
          };
        }();

        var handlePageLoad = /*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var element, attrData;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    element = document.querySelector("[".concat(config.dataName.pageLoad, "]"));

                    if (element) {
                      _context4.next = 3;
                      break;
                    }

                    return _context4.abrupt("return");

                  case 3:
                    _context4.next = 5;
                    return getAttrData(element, config.dataName.pageLoad);

                  case 5:
                    attrData = _context4.sent;

                    if (element.hasAttribute(config.dataName.pageLoad)) {
                      _context4.next = 8;
                      break;
                    }

                    return _context4.abrupt("return");

                  case 8:
                    element.removeAttribute(config.dataName.pageLoad);
                    submitData(attrData, 'pageLoad', {
                      element: element,
                      dataIndex: 0
                    });

                  case 10:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));

          return function handlePageLoad() {
            return _ref4.apply(this, arguments);
          };
        }();

        var handleElementClick = function handleElementClick() {
          document.addEventListener('click', /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
              var element, attrData;
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      element = getBindElement(e.target, config.dataName.elementClick);

                      if (element) {
                        _context5.next = 3;
                        break;
                      }

                      return _context5.abrupt("return");

                    case 3:
                      _context5.next = 5;
                      return getAttrData(element, config.dataName.elementClick);

                    case 5:
                      attrData = _context5.sent;
                      submitData(attrData, 'elementClick', {
                        element: element,
                        dataIndex: getElementIndex(element)
                      });

                    case 7:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            }));

            return function (_x7) {
              return _ref5.apply(this, arguments);
            };
          }());
        };

        var handleElementView = function handleElementView() {
          var elementTimers = [];
          var timer = null;

          var handleElementMove = function handleElementMove() {
            var isAsync = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var elements = Array.from(document.querySelectorAll("[".concat(config.dataName.elementView, "]")));

            if (elements.length === 0) {
              return;
            }

            var _loop = function _loop() {
              var element = _elements[_i];

              if (!hasElementClientRect(element)) {
                return "continue";
              } // 截流


              if (elementTimers.find(function (item) {
                return item === element;
              })) {
                return "continue";
              }

              var elementIndex = elementTimers.push(element) - 1;

              var checkElement = /*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                  var attrData;
                  return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          elementTimers.splice(elementIndex, 1);

                          if (element.hasAttribute(config.dataName.elementView)) {
                            _context6.next = 3;
                            break;
                          }

                          return _context6.abrupt("return");

                        case 3:
                          if (!(hasElementClientRect(element) && config.elementViewConditions(element))) {
                            _context6.next = 11;
                            break;
                          }

                          _context6.next = 6;
                          return getAttrData(element, config.dataName.elementView);

                        case 6:
                          attrData = _context6.sent;

                          if (element.hasAttribute(config.dataName.elementView)) {
                            _context6.next = 9;
                            break;
                          }

                          return _context6.abrupt("return");

                        case 9:
                          element.removeAttribute(config.dataName.elementView);
                          submitData(attrData, 'elementView', {
                            element: element,
                            dataIndex: getElementIndex(element)
                          });

                        case 11:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }));

                return function checkElement() {
                  return _ref6.apply(this, arguments);
                };
              }();

              if (isAsync) {
                setTimeout(checkElement, 1200);
              } else {
                checkElement();
              }
            };

            for (var _i = 0, _elements = elements; _i < _elements.length; _i++) {
              var _ret = _loop();

              if (_ret === "continue") continue;
            }
          }; // m


          window.addEventListener('touchend', function () {
            setTimeout(handleElementMove, 100);
          }); // pc

          window.addEventListener('wheel', function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
              handleElementMove();
            }, 60);
          });
          return handleElementMove;
        }; // 全局通用埋点


        var addGlobalTrackingListen = function addGlobalTrackingListen() {
          var _config = config,
              globalCommonListen = _config.globalCommonListen;
          if (!globalCommonListen) return;
          document.body.addEventListener('click', function (e) {
            // console.log('global tracking element', e.path)
            var elemPath = [];
            e.path.forEach(function (elem) {
              // 这些不记录, 记录到body就行了
              if (!elem.nodeName) return;
              if (['html', '#document'].includes(elem.nodeName.toLowerCase())) return;
              elemPath.unshift(elem);
            });
            var domPath = [];
            elemPath.forEach(function (elem) {
              var queryText = elem.nodeName.toLowerCase(); // 数字id会在selector里面报错

              if (elem.id && !/^[0-9]*$/.test(elem.id)) {
                queryText = queryText + '#' + elem.id;
              } else if (elem.classList.length > 0) {
                queryText = queryText + '.' + elem.classList.value.split(' ').filter(function (_) {
                  return _;
                }).join('.');
              }

              if (domPath.length >= 2) {
                // body 不需要, 从第二个元素开始查是否有下标
                var currentPath = [].concat(domPath, [queryText]).join('>');
                var currentElems = document.querySelectorAll(currentPath);
                currentElems.forEach(function (e, index) {
                  if (elem === e && index > 0) {
                    queryText = "".concat(queryText, ":nth-of-type(").concat(index + 1, ")");
                  }
                });
              }

              domPath.push(queryText);
            }); // console.log('global tracking element', domPath.join('>'))

            var selectorPath = domPath.join('>');
            var lastElem = elemPath[elemPath.length - 1];
            var commonData = {
              path: selectorPath,
              text: lastElem.innerText || ''
            };
            submitData(commonData, 'elementClick', {
              e: e,
              dataIndex: 0
            });
          }); // onload

          submitData({}, 'pageLoad', {
            e: null,
            dataIndex: 0
          });
        };

        var init = function init() {
          var handleElementMove = function handleElementMove() {};

          var handlePageChange = function handlePageChange() {
            handlePageLoad();
            handleElementMove(false);
          };

          var handlePageComplete = function handlePageComplete() {
            handlePageLoad();
            handleElementClick(); // hashchange，需要重新检测页面加载和元素曝光

            handleElementMove = handleElementView();
            handleElementMove(false); // 添加监听全局通用点击事件

            addGlobalTrackingListen(); // 解决异步渲染页面无法获取数据信息

            setInterval(function () {
              handlePageChange();
            }, 1200);
          };

          if (document.readyState === 'complete') {
            handlePageComplete();
            return;
          }

          window.addEventListener('load', handlePageComplete);
        };

        init();
        return {
          submitData: postData,
          getDataList: getLocalData,
          pushData: saveData,
          emptyData: emptyLocalData
        };
      };

      return JsTracking;
    });
  });

  var RooterMapping = [
  	{
  		pageId: "NCJ072",
  		routes: [
  			"/login.html"
  		],
  		pageName: "登录页"
  	},
  	{
  		pageId: "NCJ100",
  		routes: [
  			"/register.html"
  		],
  		pageName: "注册页"
  	},
  	{
  		pageId: "NCJ101",
  		routes: [
  			"/forgotPassword.html"
  		],
  		pageName: "忘记密码页"
  	},
  	{
  		pageId: "NCJ001",
  		routes: [
  			"/home.html"
  		],
  		pageName: "首页"
  	},
  	{
  		pageId: "NCJ002",
  		routes: [
  			"/list-detail?otherListType=3"
  		],
  		pageName: "特价商品列表页-Super Deals"
  	},
  	{
  		pageId: "NCJ003",
  		routes: [
  			"/list-detail?otherListType=0"
  		],
  		pageName: "优选好货商品列表页-Trending Products"
  	},
  	{
  		pageId: "NCJ004",
  		routes: [
  			"/list-detail?otherListType=1"
  		],
  		pageName: "潮流新品商品列表页-New Products"
  	},
  	{
  		pageId: "NCJ005",
  		routes: [
  			"/list-detail?otherListType=2"
  		],
  		pageName: "商品视频商品列表页-Video Products"
  	},
  	{
  		pageId: "NCJ006",
  		routes: [
  			"/PrintonDemand.html"
  		],
  		pageName: "按需定制商品列表页-Print on Demand"
  	},
  	{
  		pageId: "NCJ009",
  		routes: [
  			"/global-warehouses"
  		],
  		pageName: "全球仓商品列表页-Global Warehouses View"
  	},
  	{
  		pageId: "NCJ102",
  		routes: [
  			"/list-detail?id"
  		],
  		pageName: "分类商品列表页"
  	},
  	{
  		pageId: "NCJ023",
  		routes: [
  			"/product-detail.html?id"
  		],
  		pageName: "商品详情页"
  	},
  	{
  		pageId: "NCJ047",
  		routes: [
  			"/printonDemand/home"
  		],
  		pageName: "POD页面主页"
  	},
  	{
  		pageId: "NCJ049",
  		routes: [
  			"/printonDemand/help#helpworks"
  		],
  		pageName: "POD宣传页"
  	},
  	{
  		pageId: "NCJ029",
  		routes: [
  			"/list-detail?search"
  		],
  		pageName: "搜索结果页"
  	},
  	{
  		pageId: "NCJ103",
  		routes: [
  			"/list-detail.html?searchImg=1"
  		],
  		pageName: "图片搜索结果页"
  	},
  	{
  		pageId: "NCJ050",
  		routes: [
  			"/recommendations"
  		],
  		pageName: "推荐活动页"
  	},
  	{
  		pageId: "NCJ012",
  		routes: [
  			"/help-center"
  		],
  		pageName: "Help Center页-Content"
  	},
  	{
  		pageId: "NCJ015",
  		routes: [
  			"/help-center?navType=faq"
  		],
  		pageName: "Help Center页-FAQ"
  	},
  	{
  		pageId: "NCJ014",
  		routes: [
  			"/article-details"
  		],
  		pageName: "文章详情页"
  	},
  	{
  		pageId: "NCJ016",
  		routes: [
  			"/help-center?navType=search&searchType=content&keyWord"
  		],
  		pageName: "搜索结果页-Content"
  	},
  	{
  		pageId: "NCJ018",
  		routes: [
  			"/help-center?navType=search&searchType=faq&keyWord"
  		],
  		pageName: "搜索结果页-FAQ"
  	},
  	{
  		pageId: "NCJ104",
  		routes: [
  			"/myCJ.html#/ticketList"
  		],
  		pageName: "票据管理页-Ticket List"
  	},
  	{
  		pageId: "NCJ105",
  		routes: [
  			"https://elites.cjdropshipping.com/cross?_t=1619504830843&token=4a74a51a7e21a0c2c0b9413397f84038"
  		],
  		pageName: "论坛页-ELITES"
  	},
  	{
  		pageId: "NCJ026",
  		routes: [
  			"/blog/list"
  		],
  		pageName: "博客页-Blog"
  	},
  	{
  		pageId: "NCJ028",
  		routes: [
  			"/blog/post"
  		],
  		pageName: "博客详情页"
  	},
  	{
  		pageId: "NCJ106",
  		routes: [
  			"/myCJ.html#/profile"
  		],
  		pageName: "账号信息页-Registration Info"
  	},
  	{
  		pageId: "NCJ024",
  		routes: [
  			"/myCJ.html#/profile"
  		],
  		pageName: "地址管理页-Address Management"
  	},
  	{
  		pageId: "NCJ107",
  		routes: [
  			"/myCJ.html#/profile"
  		],
  		pageName: "收货人管理页-Consignee Management"
  	},
  	{
  		pageId: "NCJ108",
  		routes: [
  			"/myCJ.html#/profile"
  		],
  		pageName: "订阅电子邮件页-Subscribed Email"
  	},
  	{
  		pageId: "NCJ109",
  		routes: [
  			"/myCJ.html#/profile"
  		],
  		pageName: "账号隐私页-Account Security"
  	},
  	{
  		pageId: "NCJ110",
  		routes: [
  			"/myCJ.html#/all-message/1"
  		],
  		pageName: "用户消息页-From CJ"
  	},
  	{
  		pageId: "NCJ111",
  		routes: [
  			"/myCJ.html#/all-message/2"
  		],
  		pageName: "用户消息页-ELITES"
  	},
  	{
  		pageId: "NCJ063",
  		routes: [
  			"/myCJ.html#/all-message/3"
  		],
  		pageName: "用户消息页-Recommendations"
  	},
  	{
  		pageId: "NCJ064",
  		routes: [
  			"/list-detail.html?id"
  		],
  		pageName: "用户消息-Recommend商品列表页"
  	},
  	{
  		pageId: "NCJ070",
  		routes: [
  			"/myCJ.html#/myCJWallet"
  		],
  		pageName: "钱包页-Wallet"
  	},
  	{
  		pageId: "NCJ112",
  		routes: [
  			"/calculation.html"
  		],
  		pageName: "工具-运费试算页-Shipping  Calculation"
  	},
  	{
  		pageId: "NCJ113",
  		routes: [
  			"https://cjpacket.com/"
  		],
  		pageName: "工具-物流跟踪页-Track orders"
  	},
  	{
  		pageId: "NCJ114",
  		routes: [
  			"/evalute.html"
  		],
  		pageName: "供应商评价页-Rating"
  	},
  	{
  		pageId: "NCJ115",
  		routes: [
  			"/myCJ.html#/accountManage"
  		],
  		pageName: "账号管理页-Account Management"
  	},
  	{
  		pageId: "NCJ116",
  		routes: [
  			"https://chat.cjdropshipping.cn/index.html#/newChat"
  		],
  		pageName: "客服聊天页"
  	},
  	{
  		pageId: "NCJ058",
  		routes: [
  			"/myCJ.html#/myCJAssociatedStore"
  		],
  		pageName: "MyCJ页-Dashboard"
  	},
  	{
  		pageId: "NCJ117",
  		routes: [
  			"/myCJ.html#/sourcing"
  		],
  		pageName: "搜品页-Sourcing"
  	},
  	{
  		pageId: "NCJ118",
  		routes: [
  			"/myCJ.html#/sourcing"
  		],
  		pageName: "搜品-发起搜品请求页"
  	},
  	{
  		pageId: "NCJ071",
  		routes: [
  			"/myCJ.html#/purchase-history"
  		],
  		pageName: "直发单列表页-Purchase List From CJ"
  	},
  	{
  		pageId: "NCJ119",
  		routes: [
  			"/myCJ.html#/purchase-Taobao"
  		],
  		pageName: "直发单列表页-Purchase List From 1688/taobao"
  	},
  	{
  		pageId: "NCJ020",
  		routes: [
  			"/myCJ.html#/goods"
  		],
  		pageName: "直发单-添加商品页-Purchase List -Add Purchase"
  	},
  	{
  		pageId: "NCJ120",
  		routes: [
  			"/myCJ.html#/cart"
  		],
  		pageName: "直发单-购物车页-Purchase List - Purchase cart"
  	},
  	{
  		pageId: "NCJ011",
  		routes: [
  			"/myCJ.html#/myCJ-purchase//zf/0/2"
  		],
  		pageName: "直发单-订单确认页-私有库存"
  	},
  	{
  		pageId: "NCJ121",
  		routes: [
  			"/myCJ.html#/myCJ-purchase//zf/0/1"
  		],
  		pageName: "直发单-订单确认页-直接购买"
  	},
  	{
  		pageId: "NCJ122",
  		routes: [
  			"/myCJ.html#/order-detail/SY2104271000196489/1/1/DIRECT"
  		],
  		pageName: "直发单-订单详情页"
  	},
  	{
  		pageId: "NCJ035",
  		routes: [
  			"/myCJ.html?route=payment#/payment/Q0oyMTA0MjcxMDAwMTY3Njky/MTA0Ljg3/MQ=="
  		],
  		pageName: "支付页（收银台）"
  	},
  	{
  		pageId: "NCJ123",
  		routes: [
  			"/myCJ.html#/video-history"
  		],
  		pageName: "识图订单-订单列表-My Photography orders"
  	},
  	{
  		pageId: "NCJ124",
  		routes: [
  			"/myCJ.html#/video-demand"
  		],
  		pageName: "识图订单-请求列表-My Photography requests"
  	},
  	{
  		pageId: "NCJ125",
  		routes: [
  			"/myCJ.html#/add-video-demand"
  		],
  		pageName: "识图订单-发布请求-My Photography requests"
  	},
  	{
  		pageId: "NCJ126",
  		routes: [
  			"/myCJ.html#/my-inventory"
  		],
  		pageName: "商品库存列表-My-inventory-Product inventory"
  	},
  	{
  		pageId: "NCJ127",
  		routes: [
  			"/myCJ.html#/package-inventory"
  		],
  		pageName: "关联包装列表-My-inventory-connected packaging inventory"
  	},
  	{
  		pageId: "NCJ062",
  		routes: [
  			"/myCJ.html#/myCJ-favorites"
  		],
  		pageName: "心愿单页-Wishilist"
  	},
  	{
  		pageId: "NCJ128",
  		routes: [
  			"/myCJ.html#/regular-packaging"
  		],
  		pageName: "自定义包装页-包装列表Custom Packaging-Pre-packaging"
  	},
  	{
  		pageId: "NCJ129",
  		routes: [
  			"/myCJ.html#/regular-packaging"
  		],
  		pageName: "自定义包装页-我的包装Custom Packaging-My-custom packaging"
  	},
  	{
  		pageId: "NCJ034",
  		routes: [
  			"/newmycj/dropshipping/untreatedOrder"
  		],
  		pageName: "待处理订单列表页-订单-Imported Order-orders"
  	},
  	{
  		pageId: "NCJ130",
  		routes: [
  			"/newmycj/dropshipping/untreatedOrder/Incomplete"
  		],
  		pageName: "待处理订单列表页-无效订单-Imported Order-Invalid orders"
  	},
  	{
  		pageId: "NCJ131",
  		routes: [
  			"/newmycj/dropshipping/untreatedOrder/recycle"
  		],
  		pageName: "待处理订单列表页-已删除订单-Imported Order-Trash"
  	},
  	{
  		pageId: "NCJ066",
  		routes: [
  			"/newmycj/dropshipping/untreatedOrder/CreateOrder"
  		],
  		pageName: "待处理订单列表页-查找商品创建订单All Procucts"
  	},
  	{
  		pageId: "NCJ031",
  		routes: [
  			"/newmycj/dropshipping/orderManage"
  		],
  		pageName: "代发单列表页-Dropshipping Order页"
  	},
  	{
  		pageId: "NCJ132",
  		routes: [
  			"/newmycj/dropshipping/orderManage/orderDetial?orderCode=SD210426100013509333"
  		],
  		pageName: "代发单订单详情页"
  	},
  	{
  		pageId: "NCJ053",
  		routes: [
  			"/myCJ.html#/after-sale//"
  		],
  		pageName: "纠纷订单列表页-待处理-Disputes-Awaiting response"
  	},
  	{
  		pageId: "NCJ054",
  		routes: [
  			"/myCJ.html#/after-sale/2/"
  		],
  		pageName: "纠纷订单列表页-已完成--Disputes-Completed"
  	},
  	{
  		pageId: "NCJ055",
  		routes: [
  			"/myCJ.html#/after-sale/3/"
  		],
  		pageName: "纠纷订单列表页-已关闭-Disputes-Closed"
  	},
  	{
  		pageId: "NCJ133",
  		routes: [
  			"/myCJ.html#/after-sale-return"
  		],
  		pageName: "纠纷订单列表页-退回中-Disputes-Return"
  	},
  	{
  		pageId: "NCJ134",
  		routes: [
  			"/myCJ.html#/problem-package/1"
  		],
  		pageName: "未交付订单列表页-Pending reshipment"
  	},
  	{
  		pageId: "NCJ135",
  		routes: [
  			"/myCJ.html#/problem-package/2"
  		],
  		pageName: "未交付订单列表页-Paid"
  	},
  	{
  		pageId: "NCJ136",
  		routes: [
  			"/myCJ.html#/problem-package/3"
  		],
  		pageName: "未交付订单列表页-Awaiting self pickup"
  	},
  	{
  		pageId: "NCJ137",
  		routes: [
  			"/myCJ.html#/problem-package/4"
  		],
  		pageName: "未交付订单列表页-Processed"
  	},
  	{
  		pageId: "NCJ138",
  		routes: [
  			"/myCJ.html#/problem-package/5"
  		],
  		pageName: "未交付订单列表页-Expired"
  	},
  	{
  		pageId: "NCJ139",
  		routes: [
  			"/newmycj/dropshipping/shoppingCart"
  		],
  		pageName: "代发单购物车页-Cart"
  	},
  	{
  		pageId: "NCJ032",
  		routes: [
  			"/newmycj/dropshipping/orderConfirmation"
  		],
  		pageName: "代发单-提交订单确认页"
  	},
  	{
  		pageId: "NCJ061",
  		routes: [
  			"/myCJ.html#/products-connection/connected"
  		],
  		pageName: "关联商品列表-Connection"
  	},
  	{
  		pageId: "NCJ059",
  		routes: [
  			"/myCJ.html#/products-connection/pending-connection"
  		],
  		pageName: "关联包装 - 选择包装-Connection-add conection"
  	},
  	{
  		pageId: "NCJ060",
  		routes: [
  			"/myCJ.html#/products-connection/history"
  		],
  		pageName: "已刊登商品列表-listed"
  	},
  	{
  		pageId: "NCJ140",
  		routes: [
  			"/myCJ.html#/products-connection/history/0"
  		],
  		pageName: "待刊登商品列表-lqueue"
  	},
  	{
  		pageId: "NCJ141",
  		routes: [
  			"/myCJ.html#/products-connection/history/1"
  		],
  		pageName: "刊登中商品列表-On listing"
  	},
  	{
  		pageId: "NCJ142",
  		routes: [
  			"/myCJ.html#/products-connection/history/2"
  		],
  		pageName: "刊登失败商品列表-listeing failed"
  	},
  	{
  		pageId: "NCJ037",
  		routes: [
  			"/myCJ.html#/products-connection/SKUlist"
  		],
  		pageName: "总商品列表页-Sku list"
  	},
  	{
  		pageId: "NCJ143",
  		routes: [
  			"/myCJ.html#/products-connection/service"
  		],
  		pageName: "服务商品列表页-Service product list"
  	},
  	{
  		pageId: "NCJ144",
  		routes: [
  			"/myCJ.html#/products-connection/goods"
  		],
  		pageName: "我的商品列表页-Products-mine"
  	},
  	{
  		pageId: "NCJ145",
  		routes: [
  			"/myCJ.html#/products-connection/goods"
  		],
  		pageName: "我的商品列表页-Products-reviewing"
  	},
  	{
  		pageId: "NCJ146",
  		routes: [
  			"/myCJ.html#/products-connection/goods"
  		],
  		pageName: "我的商品列表页-Products-rejected"
  	},
  	{
  		pageId: "NCJ147",
  		routes: [
  			"/myCJ.html#/products-connection/waybill"
  		],
  		pageName: "物流渠道页-Awaiting Delivery"
  	},
  	{
  		pageId: "NCJ148",
  		routes: [
  			"/myCJ.html#/products-connection/waybill"
  		],
  		pageName: "物流渠道页-Delivered"
  	},
  	{
  		pageId: "NCJ149",
  		routes: [
  			"/myCJ.html#/products-connection/waybill"
  		],
  		pageName: "物流渠道页-Completed"
  	},
  	{
  		pageId: "NCJ150",
  		routes: [
  			"/myCJ.html#/products-connection/waybill"
  		],
  		pageName: "物流渠道页-Rejected"
  	},
  	{
  		pageId: "NCJ151",
  		routes: [
  			"/myCJ.html#/pod/buyer-design"
  		],
  		pageName: "POD商品列表-买家设计Buyers design"
  	},
  	{
  		pageId: "NCJ152",
  		routes: [
  			"/myCJ.html#/pod/design-myself"
  		],
  		pageName: "POD商品列表-买家设计Design Myself"
  	},
  	{
  		pageId: "NCJ153",
  		routes: [
  			"/myCJ.html#/authorize/Shopify"
  		],
  		pageName: "授权页-Shopify"
  	},
  	{
  		pageId: "NCJ154",
  		routes: [
  			"/myCJ.html#/authorize/Ebay"
  		],
  		pageName: "授权页-Ebay"
  	},
  	{
  		pageId: "NCJ155",
  		routes: [
  			"/myCJ.html#/authorize/Woocommerce"
  		],
  		pageName: "授权页-Wocommerce"
  	},
  	{
  		pageId: "NCJ156",
  		routes: [
  			"/myCJ.html#/authorize/Shipstation"
  		],
  		pageName: "授权页-Shipstaion"
  	},
  	{
  		pageId: "NCJ157",
  		routes: [
  			"/myCJ.html#/authorize/API"
  		],
  		pageName: "授权页-API"
  	},
  	{
  		pageId: "NCJ158",
  		routes: [
  			"/myCJ.html#/authorize/Lazada"
  		],
  		pageName: "授权页-Lazada"
  	},
  	{
  		pageId: "NCJ159",
  		routes: [
  			"/myCJ.html#/authorize/Shopee"
  		],
  		pageName: "授权页-Shopee"
  	},
  	{
  		pageId: "NCJ160",
  		routes: [
  			"引导动画"
  		],
  		pageName: "智能引导-welcome页"
  	},
  	{
  		pageId: "NCJ161",
  		routes: [
  			"引导动画"
  		],
  		pageName: "智能引导-welcome页"
  	},
  	{
  		pageId: "NCJ074",
  		routes: [
  			"待开发"
  		],
  		pageName: "全球仓站点页"
  	},
  	{
  		pageId: "NCJ075",
  		routes: [
  			"待开发"
  		],
  		pageName: "全球仓站点热门类目商品页"
  	},
  	{
  		pageId: "NCJ076",
  		routes: [
  			"待开发"
  		],
  		pageName: "全球仓站内搜索页"
  	},
  	{
  		routes: [
  			null
  		],
  		pageName: ""
  	}
  ];

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

  var NODE_ENV = 'development';

  var testApiUrl = {
    apiUrl: 'http://master.cjburyingpointcenter.cj.com',
    applicationId: "1395630402659553280"
  };
  var prodApiUrl = {
    apiUrl: 'https://bpc.cjdropshipping.cn',
    applicationId: '1395630402659553280'
  };
  var envConfig = {
    development: prodApiUrl,
    test: testApiUrl,
    testnew: testApiUrl,
    production: prodApiUrl,
    "production-cn": prodApiUrl
  };
  var _envConfig$NODE_ENV = envConfig[NODE_ENV],
      apiUrl = _envConfig$NODE_ENV.apiUrl,
      applicationId = _envConfig$NODE_ENV.applicationId;
  var BASE_URL = apiUrl + '/api/burying-point-center';
  var SESSION_CVT_NAME = 'egg_conversation';
  var ACTIONTYPE = {
    pageLoad: 'Pageview',
    elementClick: 'ElementClick',
    elementView: 'ElementView'
  };
  /** page load time */

  var _pageLoadedTime = Date.now();
  /** click time */


  var _clickCount = 0;

  function getTragetHref(dom) {
    var _targetNode4;

    var i = 0;
    var targetNode = dom; // targetText = targetNode.innerText

    while (i <= 2 && !((_targetNode = targetNode) !== null && _targetNode !== void 0 && _targetNode.href)) {
      var _targetNode, _targetNode2, _targetNode3;

      if (!((_targetNode2 = targetNode) !== null && _targetNode2 !== void 0 && _targetNode2.parentNode)) break;
      targetNode = (_targetNode3 = targetNode) === null || _targetNode3 === void 0 ? void 0 : _targetNode3.parentNode;
      i++;
    }

    return ((_targetNode4 = targetNode) === null || _targetNode4 === void 0 ? void 0 : _targetNode4.href) || "";
  }

  try {
    /** refresh conversation id */
    var _refreshCSTId = function _refreshCSTId() {
      var lastTime = Date.now();

      var listenFun = function listenFun() {
        lastTime = Date.now();
      };

      document.addEventListener('mouseover', listenFun);
      var inter = setInterval(function () {
        if (Date.now() - lastTime > 5 * 60 * 1000) {
          clearInterval(inter);
          sessionStorage.removeItem(SESSION_CVT_NAME);
          document.removeEventListener('mouseover', listenFun);
        }
      }, 1000);
    }; //get conversation id


    /** get page id */
    var _getPageId = function _getPageId(pageUrl) {
      if (!pageUrl) return "";
      var mainPageUrl = "".concat(location.origin, "/");
      if (mainPageUrl === location.href || mainPageUrl === pageUrl) return "NCJ001";
      var router = RooterMapping.filter(function (route) {
        var hitRoute = route.routes.find(function (x) {
          return pageUrl.indexOf(x) !== -1;
        });

        if (hitRoute) {
          return route;
        }
      });
      return router.length ? router[router.length - 1].pageId : "";
    };

    var _getConversationId = function _getConversationId(_userToken) {
      return new Promise(function (res) {
        try {
          var conversationId = sessionStorage.getItem(SESSION_CVT_NAME) || "";

          if (!conversationId) {
            axios$1.get("".concat(BASE_URL, "/v1/application/event/conversation/id"), {
              headers: {
                "Authorization": _userToken ? _userToken : ""
              }
            }).then(function (result) {
              var data = result.data;

              if (data.success) {
                conversationId = data.data;
                sessionStorage.setItem(SESSION_CVT_NAME, data.data);
              }

              _refreshCSTId();

              res(conversationId);
            });
          } else {
            _refreshCSTId();

            res(conversationId);
          }
        } catch (error) {
          res("");
        }
      });
    };
    /** main fun */


    var global_tracking = dist({
      processData: function processData(data, _ref) {
        var eventType = _ref.eventType,
            element = _ref.element,
            arg = _objectWithoutProperties(_ref, ["eventType", "element"]);

        return new Promise(function (res) {
          var attrData = data.attrData;
          _clickCount++;
          var _userToken = data.cookie.token;

          var _currentPageId = _getPageId(data.page.url);

          var upTrackingData = {
            actionType: attrData.actionType || ACTIONTYPE[eventType],
            applicationVersion: "V2.43.74",
            clickCount: _clickCount,
            elementId: attrData.elementId || "",
            pageId: _currentPageId,
            timestamp: Date.now(),
            token: _userToken,
            list: attrData.list || []
          };

          if (attrData.elementId && attrData.elementId.indexOf('-') === -1) {
            upTrackingData.elementId = "".concat(_currentPageId, "-").concat(attrData.elementId);
          } //page view


          if (upTrackingData.actionType === "Pageview") {
            return _getConversationId(_userToken).then(function (_conversationId) {
              var pushArr = [{
                fieldValue: Date.now() - _pageLoadedTime,
                filedName: "eventDuration"
              }, {
                fieldValue: _getPageId(data.page.referrer),
                filedName: "referrer"
              }, {
                fieldValue: data.page.title,
                filedName: "title"
              }];
              upTrackingData.conversationId = _conversationId;
              upTrackingData.list = upTrackingData.list.concat(pushArr);
              res(upTrackingData);
            });
          } //page click


          if (upTrackingData.actionType === "ElementClick") {
            var targetDom = document.querySelector(attrData.path);
            var pushArr = [{
              fieldValue: attrData.text,
              //attrData.text,
              filedName: "elementContent"
            }, {
              fieldValue: getTragetHref(targetDom),
              filedName: "elementTargetUrl"
            }];
            upTrackingData.list = upTrackingData.list.concat(pushArr);
            return res(upTrackingData);
          } //page custom event


          res(upTrackingData);
        });
      },
      elementViewConditions: function elementViewConditions(element) {
        var innerHeight = window.innerHeight;
        var y = element.getBoundingClientRect().y;
        var height = element.getBoundingClientRect().height / 3 * 2;
        return innerHeight - y >= height;
      },
      submitConditions: function submitConditions(dataList) {
        return dataList.length >= 3;
      },
      submitData: function submitData(dataList) {
        return new Promise(function (res) {
          var params = {
            applicationId: applicationId,
            list: dataList
          };
          var flag = navigator.sendBeacon("".concat(BASE_URL, "/v1/application/event/data/up"), JSON.stringify(params));
          res(flag);
        });
      },
      globalCommonListen: true,
      storeKeyName: 'cckj/data-tracking'
    });
    window.$global_tracking = global_tracking;
  } catch (error) {
    window.$global_tracking = {
      pushData: function pushData(params) {
        return null;
      }
    };
  }

})));

//# sourceMappingURL=maps/tracking.js.map
