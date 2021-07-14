import JSEncrypt from 'jsencrypt';
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
export function login(options, callback) {
  let pass = encryptF(options.passwd)
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
  }).then(([err, res]) => {
    if (err) {
      console.warn(err);
      return;
    }
    callback(res);
  }); 
}

// userId, loginName, UserName, firstName, avatar, emailVerifyStatus, subAccountName, vip, lastLoginTime, email, loginTime
function setCookie(name, value) {
  console.log('set cookie');
  document.cookie = `${name}=${value}; expires=Fri, 31 Dec 2030 23:59:59 GMT; domain=${__root__domain}`
}

/** 登录完成后续操作 */
export function saveDataAfterLogin(data) {
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
  userInfo.subAccountName
  ? CJ_.store.set('subAccountName', CJ_.$base64.encode(userInfo.subAccountName || ''))
  : CJ_.store.remove('subAccountName');
  setCookie('subAccountName', CJ_.$base64.encode(userInfo.subAccountName || ''));
  userInfo.subAccountRole
  ? CJ_.store.set('subAccountRole', userInfo.subAccountRole || '')
  : CJ_.store.remove('subAccountRole');
  
  userInfo.vip
  ? CJ_.store.set('vip', userInfo.vip)
  : CJ_.store.set('vip', '0');
  setCookie('vip', userInfo.vip || 0);

  userInfo.lastAccess 
  &&  CJ_.store.set('lastLoginTime', CJ_.$base64.encode(userInfo.lastAccess.loginDate));
  
  userInfo.lastAccess && setCookie('lastLoginTime', CJ_.$base64.encode(userInfo.lastAccess.loginDate));

  CJ_.store.set('contactID', CJ_.$base64.encode(userInfo.contactID || ''));
  CJ_.store.set('country', CJ_.$base64.encode(userInfo.country || ''));

  userInfo.address
  ?  CJ_.store.set('address', CJ_.$base64.encode(userInfo.address))
  : CJ_.store.set('address', '');

  CJ_.store.set('email', CJ_.$base64.encode(userInfo.email || ''));
  setCookie('email', CJ_.$base64.encode(userInfo.email || ''));
  try { // 19-04-03 fixed login BUG.
    CJ_.store.set('phone', CJ_.$base64.encode(userInfo.phone));
    CJ_.store.set('storeLink', CJ_.$base64.encode(userInfo.storeLink));
  } catch (err) {
    console.warn(err)
  }

  CJ_.store.set('relateSalesman', CJ_.$base64.encode(userInfo.relateSalesman || ''));
  CJ_.store.set('salesmanId', CJ_.$base64.encode(userInfo.salesmanId || ''));
  CJ_.store.set('loginTime', new Date().getTime());
  setCookie('loginTime', new Date().getTime());

  const cookieObj = { expires: 3, domain: __root__domain }
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


