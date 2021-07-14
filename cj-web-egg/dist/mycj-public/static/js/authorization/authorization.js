/**
 * 一个立即执行函数表达式(IIFE),
 * @param {} Angular
 * @param {} Base64
 * @param {} JSEncrypt
 */
//引入了JSEncrypt但是没有引用,函数需要优化
(function (angular, Base64, JSEncrypt) {
  //通过angular.module(name,[])来定义一个模块
  //name为模块名,[]为依赖列表
  var app = angular.module('app', ['service', 'commonHeaderLoginModl', 'commonFooterLoginModl', 'cjDotModule']);
  app.controller('loginCtrl', ['$scope', '$http', '$timeout', 'dsp', '$filter', '$rootScope', function ($scope, $http, $timeout, dsp, $filter, $rootScope) {
    if (dsp.isPhone(true, {page: 'login'})) return;
    $scope.showBlackTip = false;
    //---------------------------
    var b = new Base64();
    // 检测是否有tarket查询字符串
    $scope.target = dsp.getQueryString('target');
    if ($scope.target) {
      // $scope.targetEncode = $scope.target;
      $scope.target = b.decode($scope.target);
    }
    
    var saleman = dsp.getQueryString('ma');
    $scope.saleman = saleman;
    
    
    const UserName = b.decode(localStorage.getItem('UserName') || '') || "";
    const subAccountName = b.decode(localStorage.getItem('subAccountLoginName') || '') || '';
    const avatar = b.decode(localStorage.getItem('avatar') || '') || '';
    const loginToken = localStorage.getItem('token');
    const firstLetter = UserName.substring(0,1).toLocaleUpperCase();
    $scope.token = loginToken;
    console.log($scope.token,"^^^^^^^^");
    $scope.userName = subAccountName || UserName;
    $scope.passWord = b.decode(localStorage.getItem('password') || '') || "";
    $scope.agreeChecked = true;
    $scope.loginError = false;
    $scope.isLogin = !!loginToken;
    $scope.loginErrorMsg = '';
    $scope.firstLetter = firstLetter;
    $scope.avatar = avatar;
    
    $scope.errMsg = 'ok';
    $scope.focus = {};
    $scope.localParams = {};//登录跳转  localStorage本地存储所需参数
    
    /** 加密 */
    function encryptF(str) {
      var encrypt = new JSEncrypt();
      var public_key = `
          -----BEGIN PUBLIC KEY-----
          MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCisNIJMSV7SSjH1k7jNfHF+Ywk4rvYp15IS78B8yZg73pAKqGPZWad0MKpqeuNKyN0iYK1Bh+Btt6SEAClvov2td8DoPurgwx7cxyy0spohOVuaM9U6w8tsdLC4NjZwdKtFlGUuJ45df63LpPEQFRuLY+RKmn3K7AGPK/xJYG5CwIDAQAB
          -----END PUBLIC KEY-----
          `;
      encrypt.setPublicKey(public_key);
      return encrypt.encrypt(str);
    }
    // 登录函数
    $scope.login = function () {
      if (!$scope.userName) {
        $scope.Nousername = true;
        $scope.NoPassword = false;
      } else if (!$scope.passWord) {
        $scope.Nousername = false;
        $scope.NoPassword = true;
        $scope.loginError = false;
      } else if($scope.userName && $scope.passWord) {
        $scope.Nousername = false;
        $scope.NoPassword = false;
        if (!$scope.agreeChecked) {
          return layer.msg('You need to agree to CJdropshipping Authorization Agreement.', {time: 2000});
        }
        const params = {
          name: $scope.userName.trim(),
          passwd: encryptF($scope.passWord.trim()),
          chatType: "0", // 冗余登录的字段（因为后端改造是拿登录接口进行封装的）
          platform: 'pc', // 冗余登录的字段（因为后端改造是拿登录接口进行封装的）
          isLazada: '1', // 冗余登录的字段（因为后端改造是拿登录接口进行封装的）
          isEncryption: '1', // 冗余登录的字段（因为后端改造是拿登录接口进行封装的）
          
        };
        layer.load();
        dsp.postFun('app/account/payoneerLogin', params, function (data) {
          // console.log("555555555555555", data);
          const resp = data.data;
          // 登录成功
          if (resp.statusCode === '200') {
            layer.closeAll('loading');
            window.location.href = `https://vms.pactdata.com/pay/0da488fa-eb26-45d0-bad3-cec51ef8664b?accessToken=${resp.result.accessToken}`;
          } else if (resp.statusCode === '201') {
            layer.closeAll('loading');
            layer.msg("Incorrect username or password.");
          } else if (resp.statusCode === '506') {
            layer.closeAll('loading');
            layer.msg("Authorization Failed. The account has been blocked.");
          }else{
            layer.closeAll('loading');
            layer.msg("The server is busy now. Please try it later.");
          }
        });
      }
    };
    $scope.hasAccountToken=()=>{
      if (!$scope.agreeChecked) {
        return layer.msg('You need to agree to CJdropshipping Authorization Agreement.', {time: 2000});
      }
      dsp.postFun('app/account/payoneerLogin',{}, function (data) {
        // console.log("555555555555555", data);
        const resp = data.data;
        // 登录成功
        if (resp.statusCode === '200') {
          layer.closeAll('loading');
          window.location.href = `https://vms.pactdata.com/pay/0da488fa-eb26-45d0-bad3-cec51ef8664b?accessToken=${resp.result.accessToken}`;
        } else if (resp.statusCode === '201') {
          layer.closeAll('loading');
          layer.msg("Incorrect username or password.");
        } else if (resp.statusCode === '506') {
          layer.closeAll('loading');
          layer.msg("Authorization Failed. The account has been blocked.");
        }else{
          layer.closeAll('loading');
          layer.msg("The server is busy now. Please try it later.");
        }
      });
    };
    $rootScope.$on('account-blocked', function (d, data) {
      if (data) {
        $scope.showBlackTip = true;
      }
    });
    $scope.inputfocus = function () {
      // $scope.isHideInfo=true;
    };
    // 记住密码
    $scope.isCheck = function () {
      $scope.agreeChecked = !$scope.agreeChecked;
    };
    // 跳转登录
    $scope.goRegister = function (){
      // 设置注册的来源cookie
      // dsp.setCookie("utm_source","payonner");
      // dsp.setCookie("adsource","payonner");
      window.open(`register.html?isAuthPage=1`);
    };
    // 切换账号
    $scope.switchIsloginStatus = function (sign) {
      $scope.isLogin = sign;
      
    };
    // 切换回已有账号登录
    $scope.goHasAccountAuth = () =>{
      $scope.userName = subAccountName || UserName;
      $scope.passWord = b.decode(localStorage.getItem('password') || '') || "";
      $scope.loginError = false;
      $scope.isLogin = !!loginToken;
      $scope.loginErrorMsg = '';
      $scope.Nousername = false;
      $scope.NoPassword = false;
    };
    
    $scope.keyDown = function (Event) {
      if (Event.keyCode == 13) {
        $scope.login();
      }
    };
    $scope.goResetPass = (event) => {
      event.stopPropagation();
      window.location.href = 'forgotPassword.html';
    };
  }]).directive('repeatFinish', function () {
    return {
      link: function ($scope, element, attr) {
        if ($scope.userName) {
          $scope.isfocus1 = true;
          $scope.isfocus2 = true;
        }
      }
    }
  });
  
  
})(angular, Base64, JSEncrypt)
