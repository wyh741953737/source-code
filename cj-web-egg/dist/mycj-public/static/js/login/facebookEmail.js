/**
 * 一个立即执行函数表达式(IIFE),
 * @param {} Angular
 * @param {} Base64
 * @param {} JSEncrypt
 */
//引入了JSEncrypt但是没有引用,函数需要优化
(function(angular, Base64, JSEncrypt) {
  //通过angular.module(name,[])来定义一个模块
  //name为模块名,[]为依赖列表
  var app = angular.module("app", [
    "service",
    "commonHeaderLoginModl",
    "commonFooterLoginModl",
    "cjDotModule",
    'ngSanitize'
  ]);
  app
    .controller("facebookEmailCtrl", [
      "$scope",
      "$http",
      "$timeout",
      "$interval",
      "$sce",
      "dsp",
      "$filter",
      "$rootScope",
      function(
        $scope,
        $http,
        $timeout,
        $interval,
        $sce,
        dsp,
        $filter,
        $rootScope
      ) {
        $scope.facebookEmail = ""; //邮箱
        $scope.verificationCode = ""; //验证码
        $scope.emailErrorFlag = false; //邮箱错误提示显示开关
        $scope.emailErrorMsg = ""; //邮箱错误提示文案
        $scope.verificationErrorFlag = false; //验证码错误提示显示开关
        $scope.verificationErrorMsg = ""; //验证码错误提示文案
        $scope.countdownFlag = false; //倒计时显示开关
        $scope.countdownText = "(180)"; //倒计时显示文案
        $scope.countdown = 180; //倒计时时间
        $scope.copyRight = new Date().getFullYear();
        var b = new Base64();
        $scope.facebookParam = JSON.parse(b.decode(localStorage.getItem('facebookParam') || '')) || {}; //获取facebook用户信息

        //验证码输入验证 允许输入数字
        $scope.codeKeyUp = function(e) {
          let val = e.target.value;
          $scope.verificationCode = val.replace(/\D/g, "");
        };

        // 焦点选中的时候去除错误提示
        $scope.inputfocus = function(str) {
          if (str === "email") {
            $scope.emailErrorFlag = false;
          }
          if (str === "code") {
            $scope.verificationErrorFlag = false;
          }
        };

        // 失去焦点的时候显示错误提示
        $scope.inputBlur = function(str) {
          if (str === "email") {
            verifyEmail($scope.facebookEmail)
          }
          if (str === "code") {
            verifyCode($scope.verificationCode)
          }
        };

        //校验邮箱显示错误提示
        function verifyEmail (facebookEmail) {
          if (!facebookEmail) {
            $scope.emailErrorFlag = true;
            $scope.emailErrorMsg = "Please enter the email address.";
          }
          if (facebookEmail && !dsp.isEmail(facebookEmail)) {
            $scope.emailErrorFlag = true;
            $scope.emailErrorMsg = "Invalid email format. Please try again.";
          }
        }

         //校验验证码显示错误提示
         function verifyCode (verificationCode) {
          if (!verificationCode) {
            $scope.verificationErrorFlag = true;
            $scope.verificationErrorMsg = "Please enter the verification code.";
          }
        }

        //成功跳转 参数 须整理
        function successfn(res) {//登录成功后的操作 (沿用 之前的SignInWith.js 代码)
          let userInfo = JSON.parse(res);
          console.log(userInfo);
          dsp.saveDataAfterLogin(userInfo);
          var b = new Base64();
          // 检测是否有tarket查询字符串
          function getQueryString(name) {
              var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
              var r = window.location.search.substr(1).match(reg);
              if (r != null) return decodeURI(r[2]);
              return null;
          }

          var target = getQueryString('target');
          if (target) target = b.decode(target);
          console.log(target);
          var fromUrlArr = document.referrer.split('/');
          console.log(fromUrlArr)
          var fromPage = fromUrlArr[fromUrlArr.length - 1];
          const keysArr = ['id', 'loginName', 'token', 'name', 'firstName', 'lastName', 'status', 'avatar', 'contactID', 'country', 'address', 'email', 'phone', 'storeLink', 'relateSalesman', 'salesmanId'];
          if (keysArr.some(key => userInfo[key] === undefined)) {// 缺少参数提示
              console.log('err  --->   缺少后台回传参数    undefined 引起 编码报错')
          }
          localStorage.setItem('userId', b.encode(userInfo.id));
          localStorage.setItem('loginName', b.encode(userInfo.loginName));
          localStorage.setItem('token', b.encode(userInfo.token));
          localStorage.setItem('noEncodeToken', userInfo.token);
          localStorage.setItem('name', b.encode(userInfo.name));
          localStorage.setItem('firstName', b.encode(userInfo.firstName));
          localStorage.setItem('lastName', b.encode(userInfo.lastName));
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
          console.log('成功登录  即将跳转 主页');
          if (target) {
              location.href = target;
              return;
          }
          if (fromPage.indexOf('list-detail.html') != -1 || fromPage.indexOf('reptail-detail.html') != -1 || fromPage.indexOf('product-detail.html') != -1) {
              location.href = fromPage;
              return;
          }
          localStorage.removeItem('facebookParam') //跳转到主页之前可以清除掉facebook用户信息
          location.href = 'home.html';
        }

        // 验证邮箱和验证码是否正确
        function verification() {
          layer.load();
          const { id, first_name, last_name, name } = $scope.facebookParam;
          let params = {
            id: id, //facebookid
            email: $scope.facebookEmail.trim(), //邮箱
            name: name,
            first_name: first_name,
            last_name: last_name,
            mailCode: $scope.verificationCode.trim(), //邮箱验证码
          };
          var b = new Base64();
          let url = "app/account/facebookLogin";
          dsp.postFun(url, params, function({ data }) {
            let { result, statusCode, message } = data;
            //4004:验证码不能为null 4002:验证码已失效，请重新发送 4003:验证码错误，请重试 811:邮箱已存在
            layer.closeAll();
            if (+statusCode === 200) {
               // 成功注册 则跳转到注册页面 填写新账号和密码
              //  location.href = 'home.html'
              //  localStorage.setItem("regLoginShow", true); //新用户 注册弹窗开关
              //  localStorage.setItem("facebookParam", b.encode(JSON.stringify(params || ''))); //facebook用户存入localstorage
              //改成跳转到主页
              successfn(result)
            }
            if (+statusCode === 4002 || +statusCode === 4003) {
              $scope.verificationErrorFlag = true;
              $scope.verificationErrorMsg = message;
              return;
            }
            if (+statusCode === 811) {
              // $scope.emailErrorFlag = true;
              // $scope.emailErrorMsg = message;
              // return;
              layer.msg(message);
              localStorage.setItem('thirdLoginTempData',JSON.stringify({
                lockThirdPartyEmail: true,
                userName: params.email,
                thirdLoginParams: {
                  thirdEmail: params.email, // 第三方登录返回的邮箱
                  facebookId: '', // 第三方登录的facebookId
                  googleId: params.id, // 第三方登录的googleId
                }
              }))
              setTimeout(() => {
                location.href = 'login.html';
              }, 2000)
            }
            //其余情况
            console.log("errMsg----->", message);
          });
        }
        // 获取验证码
        let getVerificationCode = function() {
          verifyEmail($scope.facebookEmail)
          if (!$scope.facebookEmail || ($scope.facebookEmail && !dsp.isEmail($scope.facebookEmail))) return
          $scope.countdown = 180;
          getCountown();
          let params = {
            email: $scope.facebookEmail.trim(), // 邮箱
            phoneId: $scope.facebookParam && $scope.facebookParam.id, // facebookid
          };
          let url = "app/account/facebookSendMail";
          dsp.postFun(url, params, function({ data }) {
            let { result, statusCode, message } = data;
            //4001：验证码已发送5次，请在24小时后重试 405：邮件发送失败 811:邮箱已存在
            if (+statusCode === 200) {
              return layer.msg(message);
            }
            if (+statusCode === 4001) {
              $scope.verificationErrorFlag = true;
              $scope.verificationErrorMsg = message;
              return;
            }
            if (+statusCode === 811) {
              // $scope.emailErrorFlag = true;
              // $scope.emailErrorMsg = message;
              // return;
              layer.msg(message);
              localStorage.setItem('thirdLoginTempData',JSON.stringify({
                lockThirdPartyEmail: true,
                userName: params.email,
                thirdLoginParams: {
                  thirdEmail: params.email, // 第三方登录返回的邮箱
                  facebookId: '', // 第三方登录的facebookId
                  googleId: params.id, // 第三方登录的googleId
                }
              }))
              setTimeout(() => {
                location.href = 'login.html';
              }, 2000)
            }
            if (+statusCode === 405) {
              return layer.msg(message);
            }
            //其余情况
            console.log("errMsg----->", message);
          });
        };

        //倒计时
        function getCountown() {
          let timer;
          $scope.countdownFlag = true; //倒计时显示开关
          timer = $interval(() => {
            if ($scope.countdown <= 0) {
              $scope.countdownFlag = false;
              $scope.countdown = 180;
              $interval.cancel(timer);
            }
            $scope.countdownText = "(" + $scope.countdown + ")";
            $scope.countdown--;
          }, 1000);
        }

        $scope.getVerificationCode = throttle(getVerificationCode, 1000);

        function throttle(fn, wait) {
          let lastTime = Date.now();
          return function() {
            let currentTime = Date.now();
            if (currentTime - lastTime > wait) {
              lastTime = currentTime;
              fn.apply(this, arguments);
            }
          };
        }

        // 提交邮箱
        $scope.submit = function() {
          verifyEmail($scope.facebookEmail)
          verifyCode($scope.verificationCode)
          //验证码长度校验
          // if ($scope.verificationCode && $scope.verificationCode.length < 8) {
          //   $scope.verificationErrorFlag = true;
          //   $scope.verificationErrorMsg = "验证码长度为8";
          // }
          //满足所有条件才能提交
          if (
            $scope.facebookEmail &&
            dsp.isEmail($scope.facebookEmail) &&
            $scope.verificationCode
          ) {
            verification();
          }
        };
      },
    ])
    .directive("repeatFinish", function() {
      return {
        link: function($scope, element, attr) {
          if ($scope.userName) {
            $scope.isfocus1 = true;
            $scope.isfocus2 = true;
          }
        },
      };
    });
})(angular, Base64, JSEncrypt);
