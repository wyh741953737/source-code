(function(angular, Base64) {
  var app = angular.module('app', ['service','cjDotModule']);
  app.controller('emailVerifiedCtrl', ['$scope', '$http', '$location', 'dsp', function($scope, $http, $location, dsp) {
    console.log('emailVerifiedCtrl');
    dsp.domainData().then((res) => {
      // 请求成功的结果
      $scope.iscj = res.iscj;
      if ($scope.iscj == '1') {
        //cj
        $scope.icon = '/favicon.ico';
      } else {
        //客户
        $scope.icon = res.logo1 || '/favicon.ico';
        $('link[rel$=icon]').replaceWith('');
        $('head').append($('<link rel="shortcut icon"/>').attr('href', $scope.icon));
      }
    });
    var em = dsp.getQueryString('em');
    var ek = dsp.getQueryString('ek');
    var token = dsp.getQueryString('token');
    
    var e = dsp.getQueryString('e') || '';
    var b = new Base64();
    $scope.emailID = b.decode(e);
    var data = {};
    data.data = JSON.stringify({ token: token });
    dsp.postFun('app/account/validateemail', JSON.stringify(data), function(data) {
      return true;
    }, function(data) {
      return false;
    });
    
  }]);
  app.controller('emailVerifyCtrl', ['$scope', '$http', '$location', 'dsp', '$interval', '$rootScope', function($scope, $http, $location, dsp, $interval, $rootScope) {
    console.log('emailVerifyCtrl');
    const base64 = new Base64();
    const UserName = base64.decode(localStorage.getItem('UserName') == undefined ? '' : localStorage.getItem('UserName'));
    const email = base64.decode(localStorage.getItem('email') == undefined ? '' : localStorage.getItem('email'));
    const id = base64.decode(localStorage.getItem('userId') == undefined ? '' : localStorage.getItem('userId'));
    const uid = dsp.getQueryString('uid');
    $scope.code = null;
    $scope.isGetCode = false;
    $scope.sendText = 'send';
    $scope.type = uid ? 0 : 1;
    $scope.target = dsp.getQueryString('target') ? base64.decode(dsp.getQueryString('target')) : 'home.html';
    $rootScope.url = 'home.html';
    
    // 从cj页面过来验证邮箱
    // if ($scope.type === 1) {
    //   getCodeFun();
    // }
    
    // 从cj激活邮件过来激活
    if ($scope.type === 0) {
      activateEmail();
    }
    
    // 激活邮箱
    function activateEmail() {
      layer.load(2);
      dsp.getFun(`cj/account/autoVerifyEmail?uid=${uid}`, ({ data }) => {
        layer.closeAll('loading');
        $scope.type = data.statusCode === '200' ? 2 : -1;
      }, err => console.log(err));
    }
    
    // 获取验证码
    function getCodeFun() {
      let data = {
        userName: UserName,
        email: email
      };
      layer.load(2);
      dsp.postFun('app/account/sendRegisterCodeMail', JSON.stringify(data), function(data) {
        layer.closeAll('loading');
        if (data.data.statusCode == 200) {
          $scope.isGetCode = true;
          $scope.num = 180;
          var timer = $interval(function() {
            $scope.num--;
            if ($scope.num == 0) {
              $interval.cancel(timer);
              $scope.isGetCode = false;
              $scope.sendText = 'Not received, resend';
            }
          }, 1000);
        } else if (data.data.statusCode == 1006) {
          layer.msg('An IP can only send five emails a day. Please try again tomorrow. ');
        } else {
          layer.msg('Verify mail delivery failed');
        }
        
      }, function(data) {
        layer.closeAll('loading');
        return false;
      });
    }
    
    $scope.getCode = () => {
      getCodeFun();
    };
    // 验证
    $scope.verify = function() {
      if (!$scope.code) {
        layer.msg('Please enter the verification code');
        return;
      }
      var data = {
        email: email,
        code: $scope.code,
        id: id
      };
      layer.load(2);
      dsp.postFun('app/account/verifyMail', JSON.stringify(data), function(data) {
        layer.closeAll('loading');
        if (data.data.statusCode == 200) {
          layer.msg('Verification Succeeded');
          $scope.type = 2;
          localStorage.setItem('emailVerifyStatus', '1'); // 1 邮箱已验证 3 邮箱未验证
          document.cookie = `emailVerifyStatus=1;domain=${__root__domain}`;
        } else {
          layer.msg('Incorrect verification code');
        }
      }, function(data) {
        layer.closeAll('loading');
      });
    };
    $scope.confirmFun = () => {
      location.href = $scope.target;
    };
  }]);
})(angular, Base64);
