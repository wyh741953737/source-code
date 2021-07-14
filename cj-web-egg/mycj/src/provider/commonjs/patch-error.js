/**
 * 一些报错补丁
 * 
 * 如果要用原来的 JSON.parse 将挂载到 window.JSONparse
 */

export function patchError() {
  // 19-10-30 -------- 全局报错处理 --------
  var _recordLog = function (data) {
    return;
    // 日志上报 [生产环境]
    if (document.domain === 'app.cjdropshipping.com' || document.domain === 'cjdropshipping.com') {
      /* 19-11-20 remove
      $.ajax({
        method: 'post',
        url: `${window.httpsJson.log_recod}api/setLog`,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        // { type, title, content, access_url, params, add_time = Date.now() }
        data: this.JSON.stringify(data)
      }); */
    }
  }
  var preWindowErr = [];
  window.onerror = function () {
    if (
      arguments[0] === preWindowErr[0] &&
      arguments[1] === preWindowErr[1] &&
      arguments[2] === preWindowErr[2]
    ) {
      return; // 拦截相同报错
    }

    _recordLog({
      type: 'window.onerror',
      content: Array.prototype.join.call(arguments, ('\n')),
      access_url: location.href,
    });
    preWindowErr = arguments;
  };

  window.JSONparse = JSON.parse;
  const _JSONparse = JSON.parse;
  JSON.parse = function () { // 安全的JSON.parse
    var json = { error: true }; // 如果解析有错，JSON.parse 包含 error 字段
    try {
      json = _JSONparse.apply(this, arguments);
    } catch (e) {
      console.groupCollapsed('JSONparse error');
      console.log(e.stack);
      console.log(arguments);
      console.groupEnd();
      _recordLog({
        type: 'JSON.parse',
        title: e.stack,
        content: arguments[0],
        access_url: location.href,
      });
    }
    return json;
  };
  // 19-10-30 -------- 全局报错处理 --------  
}