// 第三方登录，暂不支持线下测试（谷歌或facebook白名单需要https开头）
var b = new Base64();
// 检测是否有tarket查询字符串
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

var target = getQueryString('target');
if (target) {
  // $scope.targetEncode = $scope.target;
  target = b.decode(target);
}
console.log(target);
var fromUrlArr = document.referrer.split('/');
console.log(fromUrlArr)
var fromPage = fromUrlArr[fromUrlArr.length - 1];

//-------------

function signin(type) {
  hello.init({
    'facebook': '355380624814110',//355380624814110   299755470694235
    'google': '126980844117-a8sr7tog7alfdabbkg47j2pq2mhflogc.apps.googleusercontent.com',
  }, {
    redirect_uri: 'login.html',
    scope: {
      basic: 'public_profile,email',
    }
  })
  var pro = hello(type);
  var parms;
  var api;
  if (type == 'facebook') {
    parms = {
      //basic: 'public_profile,email',

    };
    api = '/me';
  } else {
    parms = {response_type: "token id_token", scope: "openid email"};
    api = '/me';
  }
  pro.login(parms).then((res) => {
    console.log(res)
    pro.api(api).then((response) => {
      console.log(response)
      if (type == 'facebook') {
        if (!response.name || !response.email || !response.first_name || !response.id || !response.last_name) {
          layer.msg('Facebook login verification failed');
          return;
        }
        $.ajax({
          type: "POST",
          contentType: "application/json",
          url: "https://app.cjdropshipping.com/app/account/facebookLogin",
          data: JSON.stringify(response),
          dataType: "json",
          success: function (data) {
            if (data.statusCode == '200') {
              var userInfo = JSON.parse(data.result);
              console.log(userInfo);
              localStorage.setItem('userId', b.encode(userInfo.id));
              localStorage.setItem('loginName', b.encode(userInfo.loginName));
              localStorage.setItem('token', b.encode(userInfo.token));
              localStorage.setItem('noEncodeToken', userInfo.token);
              localStorage.setItem('name', b.encode(userInfo.name));
              localStorage.setItem('firstName', b.encode(userInfo.firstName));
              localStorage.setItem('lastName', b.encode(userInfo.lastName));
              localStorage.setItem('status', userInfo.status);
              localStorage.setItem('avatar', b.encode(userInfo.avatar || ''));
              if (userInfo.lastAccess) {
                localStorage.setItem('lastLoginTime', b.encode(userInfo.lastAccess.loginDate));
              }
              localStorage.setItem('contactID', b.encode(userInfo.contactID));
              localStorage.setItem('country', b.encode(userInfo.country));
              localStorage.setItem('address', b.encode(userInfo.address));
              localStorage.setItem('email', b.encode(userInfo.email));
              localStorage.setItem('phone', b.encode(userInfo.phone));
              localStorage.setItem('storeLink', b.encode(userInfo.storeLink));
              localStorage.setItem('relateSalesman', b.encode(userInfo.relateSalesman));
              localStorage.setItem('salesmanId', b.encode(userInfo.salesmanId));
              localStorage.setItem('loginTime', new Date().getTime());
              console.log(userInfo);
              if (target) {
                location.href = target;
                return;
              }
              if (fromPage.indexOf('list-detail.html') != -1 || fromPage.indexOf('reptail-detail.html') != -1 || fromPage.indexOf('product-detail.html') != -1) {
                location.href = fromPage;
                return;
              }
              location.href = 'home.html';
            } else if (data.statusCode == '810') {
              layer.msg('The email address has been registered before. Please use your  account\'s username and password to log in.')
            }
          }
        });
      } else if (type == 'google') {
        if (!response.id || !response.name || !response.given_name || !response.family_name || !response.picture || !response.email) {
          layer.msg('Google login verification failed');
          return;
        }
        var datas = {
          "id": response.id,
          "name": response.name,
          "givenName": response.given_name,
          "familyName": response.family_name,
          "imageURL": response.picture,
          "email": response.email
        }
        $.ajax({
          type: "POST",
          contentType: "application/json",
          url: "https://app.cjdropshipping.com/app/account/googleLogin",
          data: JSON.stringify(datas),
          dataType: "json",
          success: function (data) {
            if (data.statusCode == '200') {
              var userInfo = JSON.parse(data.result);
              console.log(userInfo);
              localStorage.setItem('userId', b.encode(userInfo.id));
              localStorage.setItem('loginName', b.encode(userInfo.loginName));
              localStorage.setItem('token', b.encode(userInfo.token));
              localStorage.setItem('noEncodeToken', userInfo.token);
              localStorage.setItem('name', b.encode(userInfo.name));
              localStorage.setItem('firstName', b.encode(userInfo.firstName));
              localStorage.setItem('lastName', b.encode(userInfo.lastName));
              localStorage.setItem('status', userInfo.status);
              localStorage.setItem('avatar', b.encode(userInfo.avatar || ''));
              if (userInfo.lastAccess) {
                localStorage.setItem('lastLoginTime', b.encode(userInfo.lastAccess.loginDate));
              }
              localStorage.setItem('contactID', b.encode(userInfo.contactID));
              localStorage.setItem('country', b.encode(userInfo.country));
              localStorage.setItem('address', b.encode(userInfo.address));
              localStorage.setItem('email', b.encode(userInfo.email));
              localStorage.setItem('phone', b.encode(userInfo.phone));
              localStorage.setItem('storeLink', b.encode(userInfo.storeLink));
              localStorage.setItem('relateSalesman', b.encode(userInfo.relateSalesman));
              localStorage.setItem('salesmanId', b.encode(userInfo.salesmanId));
              localStorage.setItem('loginTime', new Date().getTime());
              console.log(userInfo);
              if (target) {
                location.href = target;
                return;
              }
              if (fromPage.indexOf('list-detail.html') != -1 || fromPage.indexOf('reptail-detail.html') != -1 || fromPage.indexOf('product-detail.html') != -1) {
                location.href = fromPage;
                return;
              }
              location.href = 'home.html';
            } else if (data.statusCode == '810') {
              layer.msg('The email address has been registered before. Please use your  account\'s username and password to log in.')
            }
          }
        });
      }
    })
  }, (e) => {
    console.log(e)
  })
}