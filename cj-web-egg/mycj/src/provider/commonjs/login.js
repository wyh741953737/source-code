/** 加密 */
export function encryptF(str) {
  var encrypt = new JSEncrypt();
  var public_key = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCisNIJMSV7SSjH1k7jNfHF+Ywk4rvYp15IS78B8yZg73pAKqGPZWad0MKpqeuNKyN0iYK1Bh+Btt6SEAClvov2td8DoPurgwx7cxyy0spohOVuaM9U6w8tsdLC4NjZwdKtFlGUuJ45df63LpPEQFRuLY+RKmn3K7AGPK/xJYG5CwIDAQAB
-----END PUBLIC KEY-----
`;
  encrypt.setPublicKey(public_key);
  return encrypt.encrypt(str);
}

/** 登录 */
export function login(dsp) {
  return function (options, callback) {

    let pass = encryptF(options.passwd)
    const params = {
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
    }
    dsp.postFun('app/platform/login', params, function (data) {
      callback(data);
    });
  }
}

// userId, loginName, UserName, firstName, avatar, emailVerifyStatus, subAccountName, vip, lastLoginTime, email, loginTime
// function setCookie(name, value) {
//   console.log('set cookie');
//   document.cookie = `${name}=${value}; expires=Fri, 31 Dec 2030 23:59:59 GMT; domain=${__root__domain}; samesite=none; secure;`
// }

/** 登录完成后续操作 */
export function saveDataAfterLogin({ base64, dsp }) {
  return function (data) {
    var userInfo = angular.fromJson(data);
    
    localStorage.setItem('isAliPay',userInfo.isAliPay)
    localStorage.setItem('isWechatPay',userInfo.isWechatPay)

    //联盟awin平台
    if(userInfo.utmSource){
      console.log("utmSource: " + userInfo.utmSource)
      // let utm_source = JSON.parse(userInfo.utmSource)
      let utm_source = userInfo.utmSource;
      if(utm_source.source){
        console.log("utmSource",utm_source.source)
        localStorage.setItem('utmSource', utm_source.source)
        console.log("awc", utm_source.awc)
        console.log("createDate", userInfo.createDate)
        let exp = new Date( userInfo.createDate);//设置awc 过期时间
        exp.setTime(exp.getTime() + 365*24*60*60*1000);
        document.cookie = "awc" + "="+ escape(utm_source.awc) + ";expires=" + exp.toGMTString();
      }
     
    }else{//如果不是清除存储值
      localStorage.removeItem('utmSource')
      dsp.delAwcCookie('awc');
    }
    

    localStorage.setItem('userId', base64.encode(userInfo.id || userInfo.userId || ''));
    dsp.setCookie('userId', base64.encode(userInfo.id || userInfo.userId || ''), 3, __root__domain);
    localStorage.setItem('loginName', base64.encode(userInfo.loginName || ''));
    dsp.setCookie('loginName', base64.encode(userInfo.loginName || ''), 3, __root__domain);

    localStorage.setItem('UserName', base64.encode(userInfo.loginName || ''));
    dsp.setCookie('UserName', base64.encode(userInfo.loginName || ''), 3, __root__domain);
    localStorage.setItem('token', base64.encode(userInfo.token || ''));
    localStorage.setItem('noEncodeToken', userInfo.token || '');
    localStorage.setItem('name', base64.encode(userInfo.name || ''));
    localStorage.setItem('firstName', base64.encode(userInfo.firstName || ''));
    dsp.setCookie('name', base64.encode(userInfo.name || ''), 3, __root__domain);
    dsp.setCookie('firstName', base64.encode(userInfo.firstName || ''), 3, __root__domain);
    localStorage.setItem('lastName', base64.encode(userInfo.lastName || ''));
    localStorage.setItem('avatar', base64.encode(userInfo.img || ''));
    dsp.setCookie('avatar', base64.encode(userInfo.img || ''), 3, __root__domain);
    localStorage.setItem('emailVerifyStatus', userInfo.status || ''); // 1 邮箱已验证 3 邮箱未验证
    dsp.setCookie('emailVerifyStatus', userInfo.status || '', 3, __root__domain);

    userInfo.subAccountName
    ? localStorage.setItem('subAccountName', base64.encode(userInfo.subAccountName || ''))
    : localStorage.removeItem('subAccountName')
    dsp.setCookie('subAccountName', base64.encode(userInfo.subAccountName || ''), 3, __root__domain);
    userInfo.subAccountRole
    ? localStorage.setItem('subAccountRole', userInfo.subAccountRole || '')
    : localStorage.removeItem('subAccountRole')
    
    if (userInfo.vip) {
      localStorage.setItem('vip', userInfo.vip);
    } else {
      localStorage.setItem('vip', '0');
    }
    dsp.setCookie('vip', userInfo.vip || 0, 3, __root__domain);

    if (userInfo.lastAccess) {
      localStorage.setItem('lastLoginTime', base64.encode(userInfo.lastAccess.loginDate));
      dsp.setCookie('lastLoginTime', base64.encode(userInfo.lastAccess.loginDate), 3, __root__domain);
    }

    localStorage.setItem('contactID', base64.encode(userInfo.contactID || ''));
    localStorage.setItem('country', base64.encode(userInfo.country || ''));
    if (userInfo.address) {
      localStorage.setItem('address', base64.encode(userInfo.address));
    } else {
      localStorage.setItem('address', '');
    }
    localStorage.setItem('email', base64.encode(userInfo.email || ''));
    dsp.setCookie('email', base64.encode(userInfo.email || ''), 3, __root__domain);
    try { // 19-04-03 fixed login BUG.
      localStorage.setItem('phone', base64.encode(userInfo.phone));
      localStorage.setItem('storeLink', base64.encode(userInfo.storeLink));
    } catch (err) {
      console.warn(err)
    }
    localStorage.setItem('relateSalesman', base64.encode(userInfo.relateSalesman || ''));
    localStorage.setItem('salesmanId', base64.encode(userInfo.salesmanId || ''));
    localStorage.setItem('loginTime', new Date().getTime());
    dsp.setCookie('loginTime', new Date().getTime(), 3, __root__domain);

    
    dsp.setCookie('cjLoginName', userInfo.loginName, 3, __root__domain);
    dsp.setCookie('cjLoginToken', userInfo.token, 3, __root__domain);
    var isFirstLogin = userInfo.isFirstLogin;

    if (isFirstLogin == null) {
      isFirstLogin = '0';
    }
    localStorage.setItem('isFirstLogin', isFirstLogin);
    var isEmpower = userInfo.isEmpower;
    if (isEmpower == null || isEmpower == undefined || isEmpower == '') {
      localStorage.setItem('isEmpower', '0');
      localStorage.setItem('closeFlag', '');
    } else if (isEmpower == '1') {
      localStorage.setItem('isEmpower', '2');
      localStorage.setItem('closeFlag', '');
    } else if (isEmpower == '0') {
      localStorage.setItem('isEmpower', '0');
      localStorage.setItem('closeFlag', '');
    }
  }
}
function skipWebFn(result, dsp){
  if (result.target && result.target != 'null') {
    location.href = result.target;
    return;
  }
  let fromPage = result.fromPage
  if (fromPage.indexOf('list-detail.html') != -1 || fromPage.indexOf('reptail-detail.html') != -1 || fromPage.indexOf('product-detail.html') != -1) {
    location.href = fromPage;
    return;
  }
  if(result.isShopifyAuth) {
    location.href = 'welcome.html?from=authorize&result=1'
  } else {
    location.href = 'home.html';
  }

}

function getMenuPower(result,dsp) {
  var b = new Base64();
  dsp.postFun('app/subAccount/getAllMenu', {}, ({ data: { result: allMenu, statusCode } }) => {
    if (statusCode === '200') {
      let allArr = []
      allMenu.forEach(_ => {
        if (_.href !== '#') allArr.push(_.href)
      })
      dsp.postFun('app/subAccount/getUserMenus', {}, ({ data: { result: menu, statusCode } }) => {
        if (statusCode === '200') {
          let arr = []
          menu.forEach(_ => {
            if (_.href !== '#') arr.push(_.href)
          })
          localStorage.setItem('AllPowerMenu', b.encode(JSON.stringify(allArr)));
          localStorage.setItem('PowerMenu', b.encode(JSON.stringify(arr)));
          skipWebFn(result, dsp)
        }
      }, _ => _, { headers: { token: result.token } })
    }
  }, _ => _, { headers: { token: result.token } })
}
function loginCallback(result,tempLoginCallback,dsp) {
  if(tempLoginCallback){
    tempLoginCallback()
  }
  dsp.saveDataAfterLogin(result);
  if (result.remberPass && (result.remberPass === 'true' || result.remberPass === true)) {
    localStorage.setItem('password', result.passWord);
    localStorage.setItem('isRememberPassword', '1');
  } else {
    localStorage.removeItem('password');
    localStorage.setItem('isRememberPassword', '0');
  }
  console.log('login success');
  if (result.subAccountName && result.subAccountName != 'null' && result.subAccountName !== 'undefined') { //子账号需要获取菜单权限
    getMenuPower(result,dsp)
    localStorage.setItem('subAccountLoginName', result.userName)
    dsp.setCookie('subName', result.subAccountName, 3,
        window.environment == 'test'
            ? 'test.com'
            : window.environment === 'production-cn' ? 'cjdropshipping.cn' : 'cjdropshipping.com')
  } else {
    localStorage.removeItem('AllPowerMenu');
    localStorage.removeItem('PowerMenu');
    localStorage.removeItem('subAccountLoginName')
    dsp.delCookie('subName');
    skipWebFn(result, dsp)
  }
}


export function loginProcess(dsp) {
  return function(result,fromTemp,shopIdTemp,shopId,tempRemberPass,tempTarget,tempFromPage,odata,loginErrorProcess,newRegister) {
    result.remberPass = tempRemberPass
    result.target = tempTarget
    result.fromPage = tempFromPage
    const params = {
      email: result.email,
      shopId: shopIdTemp
    }
    // if(result.target && result.target.indexOf('list-detail.html') != -1 && result.target.indexOf('fromType=CommentList') != -1) {
    //   const pushId = String(result.target).split('&')[0].split('?')[1].split('=')[1];
    //   dsp.postFun('push/center/hasPushRecord', { pushId }, function(res) {
    //     const { code, success } = res.data;
    //     if(code == 200) {
    //       if(success) {
    //         result.target = tempTarget;
    //       } else {
    //         result.target = 'home.html'
    //       }
    //     } else {
    //       result.target = 'home.html'
    //     }
    //   }, _ => _, { headers: { token: result.token } })
    // }
    if(fromTemp === 'shopifyNeedAuth') { // 从shopfiy过来登录的同时
      const shopName = dsp.getQueryString("shopName");
      dsp.postFun("platform-shop/authorize/saveAccount", params, function(res) {
        if(res.data.code === 200) {
          const token = result.token;
          try {
            dsp.postFun(
                "app/shop/upShopIndividuationNum",
                { ID: shopIdTemp },function() {}, function() {}, {
                  headers:  {token}
                })
            dsp.postFun(
                "platform-product/product/pullShopProduct",
                { ID: shopIdTemp }, function() {}, function() {})
          } catch (error) {
            console.log(error)
          }
          result.isShopifyAuth = true;
          loginCallback(result,false,dsp)
        } else {
          if(shopName) {
            location.href = `welcome.html?from=authorize&result=0&shopName=${shopName}`
          } else {
            location.href = "welcome.html?from=authorize&result=0"
          }
        }
      })
    } else {
      let updatePassword = result.updatePassword?(result.updatePassword.replace(/[^\d]/g,'')-0):'';
      if(updatePassword&&odata>updatePassword){
        // $('.layui-layer').width('660px'); //这里修改成你想要的宽度
        if(newRegister) {
          loginCallback(result,loginErrorProcess,dsp)
        } else {
          layer.confirm('For security reason, we recommend you change the password per 90 days.', {
            title: 'Security Alert',
            // skin: 'login-skin',
            btn: ['Skip','Change Now'] //按钮
          }, function(ca){
            layer.close(ca)
            loginCallback(result,loginErrorProcess,dsp)
          }, function(index){
            location.href = 'forgotPassword.html';
          });
        }
      }else{
        loginCallback(result,loginErrorProcess,dsp)
      }
    }
  }

}

