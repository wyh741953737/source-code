
export function debounce(fn, delay = 400) {
  let t = null;
  return function (...args) {
    const _this = this;
    if (t !== null) clearTimeout(t);
    t = setTimeout(() => {
      t = null;
      fn.apply(_this, args);
    }, delay);
  }
}

export function throttle(fn, delay = 400) {
  let t = null;
  return function (...args) {
    const _this = this;
    if (t !== null) {
      return;
    }
    t = setTimeout(() => {
      t = null;
      fn.apply(_this, args);
    }, delay);
  }
}

/** base64 操作 */
export const base64 = {
  decode(str = '') {
    const _base64 = new Base64();
    let r = str;
    try {
      r = _base64.decode(str);
    } catch (e) {
      console.warn('[base64.decode 报错]', str, '\n', e.stack);
    } finally {
      return r;
    }
  },
  encode(str = '') {
    const _base64 = new Base64();
    let r = str;
    try {
      r = _base64.encode(str);
    } catch (e) {
      console.warn('[base64.encode 报错]', str, '\n', e.stack);
    } finally {
      return r;
    }
  }
};

/** localStorage 操作 */
export const store = {
  // decode ---- Base64.decode
  // parse  ---- JSON.parse
  get(key, options = { decode: false, parse: false }) {
    let r;
    if (Array.isArray(key)) {
      r = key.map(k => localStorage.getItem(k));
      if (options.decode) r = r.map(item => item ? base64.decode(item) : item);
      if (options.parse) r = r.map(item => JSON.parse(item));
    } else {
      r = localStorage.getItem(key);
      if (options.decode) r = r ? base64.decode(r) : r;
      if (options.parse) r = JSON.parse(r);
    }
    return r;
  },
  set(key, val) {
    let _val = val;
    if (
      Array.isArray(val) ||
      Object.prototype.toString.call(val) === "[object Object]"
    ) {
      _val = JSON.stringify(val);
    }
    localStorage.setItem(key, _val);
  }
};

export function floatLength(str = "", length) {
  let _val = str
  .toString()
  .replace(/[^\d+.]/, "") // 限制输入数字和 .
  .replace(/^\./, "") // 不允许 . 开头
  .replace(/\./, "#") // 暂存第一次出现的小数点
  .replace(/\./g, "") // 干掉所有小数点
  .replace("#", "."); // 还原第一个暂存的小数点
  
  const [str1 = "", str2 = ""] = _val.split(".");
  
  if (length && str2 && str2.length > length) {
    _val = `${str1}.${str2.substr(0, length)}`;
  }
  
  if (length === 0) {
    _val = str1;
  }
  
  return _val;
}
