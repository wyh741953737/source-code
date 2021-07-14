(function () {
  var app = angular.module('testPay', ['service']);
  app.controller('testPayCtr', ['$scope', 'dsp', '$sce', '$http', function ($scope, dsp, $sce, $http) {
    /*
    * panner 支付
    * 用的ng click 时间触发，其他支付方式与此方式无关
    * */
    $scope.isAuthorize = false;
    $scope.isGetCode = false;
    $scope.num = 60;
    $scope.money = () => {
      let regStrs = [
        ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
        ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
        ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
        ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
      ];
      for (let i = 0; i < regStrs.length; i++) {
        let reg = new RegExp(regStrs[i][0]);
        $scope.ordmoney = $scope.ordmoney.replace(reg, regStrs[i][1]);
      }
    }
    //
    $scope.paynnerPay = () => {
      layer.load(2)
      let parms = {
        currencyType: 0
      }
      dsp.postFun('cj/payoneer/isAuth', parms, (res) => {
        layer.closeAll('loading');
        if (res.data.statusCode == '200') {
          $scope.isShowPaynnerDia = true;
          $scope.isAuthorize = res.data.result;
        }
      }, (err) => {
        layer.closeAll('loading');
      })
    };
    $scope.paynnerPay()
    //
    $scope.signInOrRegister = (linkType) => {
      layer.load(2)
      let parms = {
        currencyType: 0,
        linkType: linkType,
        redirectUrl: location.href
      };
      dsp.postFun('cj/payoneer/getLink', parms, (res) => {
        layer.closeAll('loading');
        if (res.data.statusCode == '200') {
          window.location.href = res.data.result
        }
      }, (err) => {
        layer.closeAll('loading');
      })
    }
    //获取验证码
    $scope.getCode = () => {
      layer.load(2)
      let timer;
      let parms = {
        currencyType: 0,
        money: $scope.ordmoney,
      };
      dsp.postFun('cj/payoneer/getMailCode', parms, (res) => {
        layer.closeAll('loading');
        if (res.data.statusCode == '200') {
          $scope.isGetCode = true;
          layer.msg('Verification code sent to email.')
          timer = setInterval(() => {
            $scope.num--;
            if ($scope.num == 0) {
              clearInterval(timer);
              $scope.num = 60;
              $scope.isGetCode = false;
            }
            $scope.$apply()
          }, 1000)
        }
      }, (err) => {
        clearInterval(timer);
        layer.closeAll('loading');
      })
    }
    //解绑
    $scope.unbind = () => {
      layer.load(2)
      let parms = {
        currencyType: 0,
      };
      dsp.postFun('cj/payoneer/removeAuth', parms, (res) => {
        layer.closeAll('loading');
        if (res.data.statusCode == '200') {
          layer.msg('Untied successfully');
          location.reload()
        }
      }, (err) => {
        layer.closeAll('loading');
      })
    }
    //支付
    $scope.paynnerPay = () => {
      layer.load(2)
      let parms = {
        currencyType: 0,
        money: $scope.ordmoney,
        mailCode: $scope.code
      };
      dsp.postFun('cj/payoneer/charge', parms, (res) => {
        layer.closeAll('loading');
        if (res.data.statusCode == '200') {
          layer.msg('payment successful')
        }
      }, (err) => {
        layer.closeAll('loading');
      })
    }
    //刷新用户信息
    $scope.refreshInformation = () => {
      layer.load(2)
      dsp.getFun('cj/payoneer/updateAuth?currencyType=0', (res) => {
        layer.closeAll('loading');
        if(res.data.statusCode == '200'){
            layer.msg('update completed')
        }
      }, (err) => {

      })
    }
  }])
})()