export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var after = window.location.href;
  if (after.indexOf('?') === -1) return null;
  after = window.location.search.substr(1) || window.location.hash.split("?")[1];
  if (after) {
    var r = after.match(reg);
    if (r != null) {
      try {
        return decodeURIComponent(r[2]);
      } catch (e) {
        console.log(e)
        return null;
      }
    } else {
      return null;
    }
  }
}

export function getFun({ $rootScope, $http, getDomainByUrl, token, base64, dsp }) {
  return function (url, successCallback, errorCallback, options = {
    // layer2: false,
    errorAlert: false,
    responseType: null,
  }) {
    // options.layer2 && layer.load(2);
    $rootScope.$emit(url, true);
    $http.get(getDomainByUrl(url), {
      responseType: options.responseType,
      headers: { 'token': token }
    }).then(function (data) {
      // options.layer2 && layer.closeAll('loading');
      $rootScope.$emit(url, false);
      
      let loginOutArr = ['Sorry, you are not logged in','Too much request,Please log in','Unfortunately, your account was blocked, please contact support!'];
      
      if (data.data && data.data['cj&result'] === false && ~loginOutArr.indexOf(data.data['message'])) {
        localStorage.setItem('登录报错链接', url);
        localStorage.setItem('登录报错信息', JSON.stringify(data));
        // 限制登录，跳转到登录页
        localStorage.removeItem('loginName');
        localStorage.removeItem('firstName');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('token');
        localStorage.removeItem('noEncodeToken');
        localStorage.removeItem('utmSource');
        dsp.delCookie('cjLoginName');
        dsp.delCookie('cjLoginToken');
        dsp.delAwcCookie('awc');
      }
      if (data.data && data.data['cj&result'] === false && data.data['message'] === 'Sorry, you are not logged in') {
        dsp.showToast(data.data.message, null, function(){
          location.href = "login.html" + '?target=' + base64.encode(location.href);
        })
      } else if (data.data && data.data['cj&result'] === false && data.data['message'] === 'Too much request,Please log in') {
        dsp.showToast(data.data.message, null, function(){
          location.href = "login.html" + '?target=' + base64.encode(location.href);
        })
      } else if (data.data && data.data['cj&result'] === false && data.data['message'] === 'Unfortunately, your account was blocked, please contact support!') {
        layer.closeAll('loading');
        if(!~location.href.indexOf('login.html')){
          dsp.showToast(data.data.message, null, function(){
            location.href = "login.html" + '?target=' + base64.encode(location.href);
          })
        }else{
          $rootScope.$broadcast('account-blocked',true)
        }
      } else if (data.data && data.data['result'] === false && data.data['message'] === 'Sorry, Unexpected error') {
        layer.closeAll('loading');
        dsp.cjMesFun(1);
        (new Image()).src=`/api/addRequestErrLog?errorInfo=${data.data['message']}&apiurl=${url}`;
      } else if (data.data && data.data['result'] === false && (data.data['message'] === 'Sorry, Your access was denied' || data.data['message'] === 'Sorry, Your access is down')) {
        // 拒绝访问
        layer.closeAll('loading');
        dsp.cjMesFun(1);
        (new Image()).src=`/api/addRequestErrLog?errorInfo=${data.data['message']}&apiurl=${url}`;
      } else {
        successCallback(data);
      }
    }, function (backdata) {
      $rootScope.$emit(url, false);
      layer.closeAll('loading');
      if (options.errorAlert) {
        dsp.cjMesFun(1); // 自动弹出报错
      }
      if (errorCallback instanceof Function) {
        errorCallback(backdata);
      } else {
        if (backdata.status != -1) {
          dsp.cjMesFun(1);
        }
      }

      // console.log('报错数据get:', backdata);
      (new Image()).src=`/api/addRequestErrLog?errorInfo=${backdata.data}&apiurl=${backdata.config.url}`;
    });
  }
}

export function postFun({ $rootScope, $http, getDomainByUrl, token, base64, dsp }) {
  return function (url, data, successCallback, errorCallback, options = {
    // layer2: false,
    errorAlert: false,
    code200: false,
    responseType: null,
    isElites: false
  }) {
    // options.layer2 && layer.load(2);
    $rootScope.$emit(url, true);
    $http.post(options.isElites ? window.httpsJson._elites_200812 + url : getDomainByUrl(url), data, {
      responseType: options.responseType,
      headers: Object.assign({ 'token': token }, options.headers)
    }).then(function (backdata) {
      // options.layer2 && layer.closeAll('loading');
      $rootScope.$emit(url, false);
      let loginOutArr = ['Sorry, you are not logged in','Too much request,Please log in','Unfortunately, your account was blocked, please contact support!'];
      
      if (backdata.data && backdata.data['cj&result'] === false && ~loginOutArr.indexOf(backdata.data['message'])) {
        localStorage.setItem('登录报错链接', url);
        localStorage.setItem('登录报错信息', JSON.stringify(backdata));
        // 限制登录，跳转到登录页
        localStorage.removeItem('loginName');
        localStorage.removeItem('firstName');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('token');
        localStorage.removeItem('noEncodeToken');
        localStorage.removeItem('utmSource');
        dsp.delCookie('cjLoginName');
        dsp.delCookie('cjLoginToken');
        dsp.delAwcCookie('awc');
      }
      if (backdata.data && backdata.data['cj&result'] === false && backdata.data['message'] === 'Sorry, you are not logged in') {
        dsp.showToast(backdata.data.message, null, function(){
          location.href = "login.html" + '?target=' + base64.encode(location.href);
        })
      } else if (backdata.data && backdata.data['cj&result'] === false && backdata.data['message'] === 'Too much request,Please log in') {
        dsp.showToast(backdata.data.message, null, function(){
          location.href = "login.html" + '?target=' + base64.encode(location.href);
        })
      } else if (backdata.data && backdata.data['cj&result'] === false && backdata.data['message'] === 'Unfortunately, your account was blocked, please contact support!') {
        layer.closeAll('loading');
        if(!~location.href.indexOf('login.html')){
          dsp.showToast(backdata.data.message, null, function(){
            location.href = "login.html" + '?target=' + base64.encode(location.href);
          })
        }else{
          $rootScope.$broadcast('account-blocked',true)
        }
      } else if (backdata.data && backdata.data['result'] === false && backdata.data['message'] === 'Sorry, Unexpected error') {
        // 未知错误，提示
        layer.closeAll('loading');
        dsp.cjMesFun(1);
        (new Image()).src=`/api/addRequestErrLog?errorInfo=${backdata.data['message']}&apiurl=${url}`;
      } else if (backdata.data && backdata.data['result'] === false && (backdata.data['message'] === 'Sorry, Your access was denied' || backdata.data['message'] === 'Sorry, Your access is down')) {
        // 拒绝访问
        layer.closeAll('loading');
        dsp.cjMesFun(1);
        (new Image()).src=`/api/addRequestErrLog?errorInfo=${backdata.data['message']}&apiurl=${url}`;
      } else {
        if (url.indexOf("woo") !== -1) { // 新版woomence接口返回数据是 code不是statuscode
          successCallback(backdata);
          return;
        }
        if (options.code200) {
          if (+backdata.data.statusCode !== 200) {
            console.warn(`报错URL: [${getDomainByUrl(url)}]`);
            dsp.cjMesFun(1); // 非正常数据自动弹出报错
          }
        }
        successCallback(backdata);
      }
    }, function (backdata) {
      console.log(`报错URL: [${getDomainByUrl(url)}]`);
      $rootScope.$emit(url, false);
      layer.closeAll('loading');
      if (options.errorAlert) {
        dsp.cjMesFun(1); // 自动弹出报错
      }
      if (errorCallback instanceof Function) {
        errorCallback(backdata);
      } else {
        if (backdata.status != -1) {
          dsp.cjMesFun(1);
        }
      }

      // console.log('报错数据:', backdata);
      (new Image()).src=`/api/addRequestErrLog?errorInfo=${backdata.data}&apiurl=${backdata.config.url}`;
    });
  }
}

// 大量请求接口，且接口返回过慢时取消掉当前未完成的请求，重新配置的post请求
export function postCancel({ $q, $rootScope, $http, getDomainByUrl, token, base64, dsp }) {
  return function (url, data, successCallback, errorCallback, deferred,options = {
    // layer2: false,
    errorAlert: false,
    code200: false,
    responseType: null,
    isElites: false
  }) {
    // options.layer2 && layer.load(2);
    $rootScope.$emit(url, true);
    $http.post(options.isElites ? window.httpsJson._elites_200812 + url : getDomainByUrl(url), data, {
      responseType: options.responseType,
      headers: Object.assign({ 'token': token }, options.headers),
      timeout: deferred.promise
    }).then(function (backdata) {
      // options.layer2 && layer.closeAll('loading');
      $rootScope.$emit(url, false);
      let loginOutArr = ['Sorry, you are not logged in','Too much request,Please log in','Unfortunately, your account was blocked, please contact support!'];
      
      if (backdata.data && backdata.data['cj&result'] === false && ~loginOutArr.indexOf(backdata.data['message'])) {
        localStorage.setItem('登录报错链接', url);
        localStorage.setItem('登录报错信息', JSON.stringify(backdata));
        // 限制登录，跳转到登录页
        localStorage.removeItem('loginName');
        localStorage.removeItem('firstName');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('token');
        localStorage.removeItem('noEncodeToken');
        localStorage.removeItem('utmSource');
        dsp.delCookie('cjLoginName');
        dsp.delCookie('cjLoginToken');
        dsp.delAwcCookie('awc');
      }
      if (backdata.data && backdata.data['cj&result'] === false && backdata.data['message'] === 'Sorry, you are not logged in') {
        dsp.showToast(backdata.data.message, null, function(){
          location.href = "login.html" + '?target=' + base64.encode(location.href);
        })
      } else if (backdata.data && backdata.data['cj&result'] === false && backdata.data['message'] === 'Too much request,Please log in') {
        dsp.showToast(backdata.data.message, null, function(){
          location.href = "login.html" + '?target=' + base64.encode(location.href);
        })
      } else if (backdata.data && backdata.data['cj&result'] === false && backdata.data['message'] === 'Unfortunately, your account was blocked, please contact support!') {
        layer.closeAll('loading');
        if(!~location.href.indexOf('login.html')){
          dsp.showToast(backdata.data.message, null, function(){
            location.href = "login.html" + '?target=' + base64.encode(location.href);
          })
        }else{
          $rootScope.$broadcast('account-blocked',true)
        }
      } else if (backdata.data && backdata.data['result'] === false && backdata.data['message'] === 'Sorry, Unexpected error') {
        // 未知错误，提示
        layer.closeAll('loading');
        dsp.cjMesFun(1);
        (new Image()).src=`/api/addRequestErrLog?errorInfo=${backdata.data['message']}&apiurl=${url}`;
      } else if (backdata.data && backdata.data['result'] === false && (backdata.data['message'] === 'Sorry, Your access was denied' || backdata.data['message'] === 'Sorry, Your access is down')) {
        // 拒绝访问
        layer.closeAll('loading');
        dsp.cjMesFun(1);
        (new Image()).src=`/api/addRequestErrLog?errorInfo=${backdata.data['message']}&apiurl=${url}`;
      } else {
        if (url.indexOf("woo") !== -1) { // 新版woomence接口返回数据是 code不是statuscode
          successCallback(backdata);
          return;
        }
        if (options.code200) {
          if (+backdata.data.statusCode !== 200) {
            console.warn(`报错URL: [${getDomainByUrl(url)}]`);
            dsp.cjMesFun(1); // 非正常数据自动弹出报错
          }
        }
        successCallback(backdata);
      }
    }, function (backdata) {
      console.log(`报错URL: [${getDomainByUrl(url)}]`);
      $rootScope.$emit(url, false);
      layer.closeAll('loading');
      if (options.errorAlert) {
        dsp.cjMesFun(1); // 自动弹出报错
      }
      if (errorCallback instanceof Function) {
        errorCallback(backdata);
      } else {
        if (backdata.status != -1) {
          dsp.cjMesFun(1);
        }
      }

      // console.log('报错数据:', backdata);
      (new Image()).src=`/api/addRequestErrLog?errorInfo=${backdata.data}&apiurl=${backdata.config.url}`;
    });
}
}


/** 物流 GET */
export function getFun2({ $http, dsp }) {
  return function (url, successCallback, errorCallback) {
    $http.get(window.httpsJson._logistics_190606 + url).then(function (data) {
      successCallback(data);
    }, function (backdata) {
      if ($('.cj-load-percent').length > 0) {
        $('.cj-load-percent').remove();
      }
      if (errorCallback) {
        errorCallback(backdata);
      } else {
        layer.closeAll('loading');
        dsp.cjMesFun(1);
      }
      // console.log('报错数据get:', backdata);
      (new Image()).src=`/api/addRequestErrLog?errorInfo=${backdata.data}&apiurl=${backdata.config.url}`;
    });
  }
}

/** 物流 POST */
export function postFun2({ $http, dsp }) {
  return function (url, data, successCallback, errorCallback) {
    $http.post(window.httpsJson._logistics_190606 + url, data).then(function (backdata) {
      successCallback(backdata);
    }, function (backdata) {
      if ($('.cj-load-percent').length > 0) {
        $('.cj-load-percent').remove();
      }
      if (errorCallback) {
        errorCallback(backdata);
      } else {
        layer.closeAll('loading');
        dsp.cjMesFun(1);
      }
      // console.log('报错数据post:', backdata);
      (new Image()).src=`/api/addRequestErrLog?errorInfo=${backdata.data}&apiurl=${backdata.config.url}`;
    });
  }
}

// 2019-7-9 xiaoy   -----    使用   调用前可使用 layer.load(2) 作为遮罩层
export function mypost({ $q, postFun }) {
  return function (url, params, errcb) {
    return $q((resolve, reject) => {
      postFun(url, params, function ({ data }) {
        layer.closeAll('loading')
        let { result, statusCode, message } = data;//不同的后端返回的数据字段不一样 视情况而定
        if (statusCode != 200) {
          reject(data)
          return layer.msg(message)
        }
        resolve(result)
      }, function (err) {
        if (errcb && errcb instanceof Function) return errcb(err)
        console.log('errHandle  --->  ', err)
        reject(err)
        layer.closeAll('loading')
        layer.msg('The server is busy now. Please try again later.')
      })
    })
  }
}
/** 埋点请求 POST */
export function maiDianPostFun({ $rootScope, $http, getDomainByUrl, token, dsp }) {
  return function (url, data, successCallback, errorCallback) {
    $rootScope.$emit(url, true);
    $http.post(getDomainByUrl(url), data, {
      responseType: null,
      headers: { 'token': token }
    }).then(function (backdata) {
      $rootScope.$emit(url, false);
    }, function (backdata) {
      $rootScope.$emit(url, false);
    });
  }
}
/** 2021-04-08 物流查询 采用cjpacket里的接口 */
export function postLogistics({ $http, dsp }) {
  return function (url, data, successCallback, errorCallback) {
    console.log(window.httpsJson)
    $http.post(window.httpsJson._cjpacket_210408 + url, data).then(function (backdata) {
      successCallback(backdata)
    }, function (backdata) {
      if ($('.cj-load-percent').length > 0) {
        $('.cj-load-percent').remove();
      }
      if (errorCallback) {
        errorCallback(backdata);
      } else {
        layer.closeAll('loading');
        dsp.cjMesFun(1);
      }
       // console.log('报错数据post:', backdata);
      (new Image()).src=`/api/addRequestErrLog?errorInfo=${backdata.data}&apiurl=${backdata.config.url}`;
    })
  }
}