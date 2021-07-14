
export function setCookie(c_name, value, expiredays, domain, protocol) {
  var exdate;
  if (expiredays) {
    exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    exdate = exdate.toGMTString()
  } else {
    exdate = 'Session'
  }
  if(!protocol) {
    document.cookie = c_name + "=" + value +
    (";expires=" + exdate) + (domain ? (';domain=' + domain || document.domain) : '');
  } else {
    document.cookie = c_name + "=" + value +
    (";expires=" + exdate) + (domain ? (';domain=' + domain || document.domain) : '') + '; samesite=none; secure;'
  }
}

export function getCookie(c_name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=")
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1
      let c_end = document.cookie.indexOf(";", c_start)
      if (c_end == -1) c_end = document.cookie.length
      return document.cookie.substring(c_start, c_end)
    }
  }
  return ""
}

export function delCookie(dsp) {
  return function(name) {
    // console.log("__root__domain",__root__domain)
    var exp = new Date();
    exp.setDate(exp.getDate() - 1);
    var cval = dsp.getCookie(name);
    if (cval != null) 
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + `;domain=${__root__domain}`;
    }
}
export function delAwcCookie(dsp) {
  return function() {
    var exp = new Date();
    exp.setDate(exp.getDate() - 1);
    document.cookie = "awc=123" + ";expires=" + exp.toGMTString();
  }
}

/**
 * 考虑编码及体量控制，自定义 cookie 解析
 * 适用格式 a=1;b=2;c=3
 */
export function cookieParser(cookie) {
  let r = null;
  if (!cookie) {
    return null;
  }
  if (!/\w+=\w+/.test(cookie)) {
    return null;
  }
  try {
    const tmp = decodeURIComponent(cookie);
    const arr = tmp.split(';');
    const obj = {};
    arr.forEach(_ => {
      const t = _.split('=');
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
export function cookieGenerator(cookie = {}) {
  const arr = Object.keys(cookie)
    .filter(k => cookie[k])
    .map(k => {
      const v = cookie[k];
      return `${k}=${v}`;
    });
  return arr.join(';');
}
