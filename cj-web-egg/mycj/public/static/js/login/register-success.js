(function (angular, Base64, JSEncrypt) {
    const app = angular.module('app', ['service', 'cjDotModule']);
    app.controller('regsucessCtrl', ['$scope', '$http', '$interval', 'dsp', '$filter', function ($scope, $http, $interval, dsp, $filter) {
      const b = new Base64();
      $scope.name = b.decode(dsp.getQueryString('name') || '');
      $scope.email = b.decode(dsp.getQueryString('email') || '');
      $scope.emailID = b.decode(dsp.getQueryString('e') || '');
      $scope.fromPage = b.decode(dsp.getQueryString('fromPage') || '');
      $scope.countDownTime = 5;
      const password = b.decode(localStorage.getItem('pass') || '') || "";
      /* shopify授权处理 */
      const from = dsp.getQueryString("from");
      const shopId = dsp.getQueryString("shopId");
      
      const timer = $interval(function() {
        $scope.countDownTime--;
      }, 1000, 5);
      timer.then(function() {
        //时间走完以后页面跳转
        login($scope.name, password, shopId, from, $scope.fromPage);

        // window.location = 'home.html';
      });

      $scope.GoHome = () => {
        login($scope.name, password, shopId, from, $scope.fromPage);
      }

      // 登录
      function login(userName, passWord, shopId, from, fromPage) {
        dsp.login({
          name: userName,
          passwd: passWord,
          chatType: "0",
          platform: 'pc'
      }, function (data) {
          var data = data.data;
          var code = data.statusCode;
          if (code != 200) {
            localStorage.clear();
            if (code == 503 || code == 502) {
                // $scope.loginError = true;
                // $scope.loginErrorMsg = 'User name or password error.';
                layer.msg('User name or password error.')
            } else if (code == 520) {
                layer.msg('Sorry, There is something wrong with your profile, you can not login at the moment.');
            } else if (code == 518) {
                // $scope.loginError = true;
                // $scope.loginErrorMsg = 'Your email has not been verified. Please verify or log in with your username.';
                layer.msg('Your email has not been verified. Please verify or log in with your username.')
                // $timeout(function () {
                //     $scope.loginErrorMsg = '';
                // }, 2000);
            } else if (code == 519) {
                $scope.showBlackTip=true;
                $scope.loginError = false;
                $scope.NoPassword = false;
                // layer.msg('Unfortunately, Your account had been blocked, please contact CJ support or your agent.')
            } else {
                layer.msg('The server is busy now, please try again later.');
            }

            // 登录失败直接跳首页
            window.location = 'home.html';

          } else {  // 登录成功
              var result = JSON.parse(data.result);
              let odate =  $filter('date')(new Date(),'yyyyMMddhhmmss')-0;
              // 需要二次验证
              var b  = new Base64()
              result.passWord = b.encode(passWord)
              result.userName = b.encode(userName)
              const newRegister = true;
              dsp.loginProcess(result,from,shopId,$scope.shopId,$scope.remberPass,$scope.target,fromPage,odate,loginErrorProcess, newRegister);
          }
          
      })
      }
      function loginErrorProcess() {
        $scope.loginError = false;
      }
    }])
})(angular, Base64, JSEncrypt)
