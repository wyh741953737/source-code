import { pageFunWithParams } from '../mycj-common';


export function walletFactory(angular) {
  // 充值中心
  const app = angular.module('mycj-wallet.module', ['service', 'utils']);

  app.controller('mycj-wallet.ctrl', ['$scope', '$rootScope', 'dsp', '$interval', '$timeout', 'utils',
    function ($scope, $rootScope, dsp, $interval, $timeout, utils) {
      const base64 = $rootScope.base64;
      const userInfo = $rootScope.userInfo;

      $scope.userId = userInfo.userId;
      $scope.loginName = userInfo.loginName;
      $scope.token = userInfo.token;

      $scope.withdrawFlag = true;
      $scope.withdrawListFlag = false;

      $scope.chargeFlag = true;
      $scope.billListFlag = false;
      $scope.billPageNum = '1';
      $scope.billPageSize = '5';
      $scope.billTotalPage;
      $scope.getBillList = function () {
        dsp.postFun('app/wallet/getCustomerWatercourse', JSON.stringify({
          page: $scope.billPageNum,
          limit: $scope.billPageSize,
          type: '1,2,4,6,7,8'
        }), function (data) {
          console.log(data);
          $scope.billTotalPage = data.data.count;
          $scope.billList = data.data.list;
          if ($scope.billTotalPage == 0) {
            dsp.addNodataPic($('.bill-item-wrap'), 400);
            return;
          }
          for (var i = 0; i < $scope.billList.length; i++) {
            if ($scope.billList[i].type == '2' || $scope.billList[i].type == '6' && $scope.billList[i].image) {
              $scope.billList[i].image = JSON.parse($scope.billList[i].image);
            }
          }
          dsp.removeNodataPic($('.bill-item-wrap'), 400);
          pageFunWithParams($('.bill-page'), $scope.billTotalPage, $scope.billPageSize, $scope.billPageNum, function (page) {
            $scope.billPageNum = page + '';
            dsp.postFun('app/wallet/getCustomerWatercourse', JSON.stringify({
              page: $scope.billPageNum,
              limit: $scope.billPageSize,
              type: '1,2,4,6,7,8'
            }), function (data) {
              $scope.billList = data.data.list;
              console.log($scope.billList);
              for (var i = 0; i < $scope.billList.length; i++) {
                if ($scope.billList[i].type == '2' || $scope.billList[i].type == '6' && $scope.billList[i].image) {
                  $scope.billList[i].image = JSON.parse($scope.billList[i].image);
                }
              }
              console.log($scope.billList);
            });
          })
        });
      }

      $scope.withdrawPageNum = '1';
      $scope.withdrawPageSize = '5';
      $scope.withdrawTotalPage;
      $scope.getWithdrawList = function () {
        dsp.postFun('app/wallet/getCustomerWatercourse', JSON.stringify({
          page: $scope.withdrawPageNum,
          limit: $scope.withdrawPageSize,
          type: '3'
        }), function (data) {
          console.log(data);
          $scope.withdrawTotalPage = data.data.count;
          $scope.withdrawList = data.data.list;
          if ($scope.withdrawTotalPage == 0) {
            dsp.addNodataPic($('.withdraw-item-wrap'), 400);
            return;
          }
          dsp.removeNodataPic($('.withdraw-item-wrap'), 400);
          pageFunWithParams($('.withdraw-page'), $scope.withdrawTotalPage, $scope.billPageSize, $scope.withdrawPageNum, function (page) {
            $scope.withdrawPageNum = page + '';
            dsp.postFun('app/wallet/getCustomerWatercourse', JSON.stringify({
              page: $scope.withdrawPageNum,
              limit: $scope.withdrawPageSize,
              type: '3'
            }), function (data) {
              $scope.withdrawList = data.data.list;
            });
          })
        });
      }

      $scope.showMes = function (mes, event) {
        var that = event.target;
        layer.tips(mes, that,
          {
            tips: [1, '#4A90E2'],
            time: 4000,
            area: ['auto', 'auto']//这个属性可以设置宽高  auto 表示自动
          }
        );
      }



      function getAccountInfo() {
        dsp.postFun('app/wallet/getWalletInfo', {}, function (data) {
          console.log(data);
          $scope.accountInfo = data.data.data;
        });
        dsp.getFun('app/wallet/accounts', function ({data}) {
          console.log(data);
          $scope.accountObj = data.data;
          $scope.withdrawEmail = $scope.accountObj ? $scope.accountObj.PayPal:'';
        });
      }
      getAccountInfo();
      

      $(".insert-pwd-btn").click(function () {
        $(".insert-pwd-box").show();
      });
      $(".radio-btn,.checkbox-btn").click(function () {
        var checked = $(this).attr("class").indexOf("checked");
        if (checked >= 0) {
          $(this).removeClass("checked");
        } else {
          $(this).addClass("checked");
        }
      });
      // <input onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')">
      // <input name=txt1 onchange="">
      //其它金额
      $("#btn_otherMoney").click(function () {
        var inpval = $(".w160").val() - 0;
        if (!inpval) {
          layer.msg('Please enter the correct amount.')
          return;
        }
        if (/\D/.test(inpval)) {
          layer.msg('Please enter a number.')
          return;
        }
        $(".amt-select-item").removeClass("selected");
        $(".type-item-cont-last").text("$" + $(".w160").val());
        // alert($("#input-money").val())
        $scope.ordmoney = $(".w160").val() - 0;
        $scope.$apply()
        // $('#uncollect-span').text("$"+$(".w160").val())//充值成功显示
      });
      //充值弹窗
      $scope.ordmoney = 8000;
      $(".amt-select-item").click(function () {
        $(".w160").val('');
        $(".amt-select-item").removeClass("selected");
        $(this).addClass("selected");
        $(".type-item-cont-last").text($(this).text());
        // $('#uncollect-span').text($(this).text())//充值成功显示
        $scope.ordmoney = $(this).text().replace('$', '') - 0;
        console.log($scope.ordmoney)
      });
      $scope.zzflag = false;
      $scope.toCharge = function () {
        $scope.zzflag = true;
        $('.wall-tc-wrap').height($(document).height());
        $('.wall-tc-wrap').width($(window).width());
        if ($('.select-bank').val() == 'USD') {
          $('#tc-a-money').text($scope.ordmoney); //充值金额
        } else if ($('.select-bank').val() == 'EUR') {
          getExchangeRate('EUR')
        }
        console.log($('.select-bank').val())
      }
      $scope.closetcFun = function () {
        $scope.zzflag = false;
      }


      // 20-02-11 阻止重复提交
      const confirmUrl = 'app/wallet/reCharge';
      $scope.confirmClicked = false;
      $rootScope.$on(confirmUrl, (_, bool) => {
        bool ? layer.load(2) : layer.closeAll('loading');
        $scope.confirmClicked = bool;
      });

      //充值弹窗的确定按钮
      $scope.confirmBtnFun = function () {
        // $scope.zzflag = false;
        if ($scope.imgArr.length == 0) {
          layer.msg('Please upload the transfer slip!');
          return;
        }
        dsp.postFun(confirmUrl, JSON.stringify({
          money: $('#tc-a-money').text(),
          image: $scope.imgArr.join(','),
          message: $scope.rechargeRemark ? $scope.rechargeRemark.replace(/\n/g, '_@').replace(/\r/g, '_@') : '',
          code: 1,
          paymentType: 'wire_transfer'
        }), function (data) {
          console.log(data);
          if (data.data.code == 200) {
            layer.msg('Submitted sucess, we are reviewing the transfer.');
            $scope.zzflag = false;
            $scope.rechargeRemark = '';
            $scope.imgArr = [];
            getAccountInfo();
          } else {
            // layer.msg('Submit failed');
            layer.msg(data.data.msg)
          }
        });
      }
      $scope.confirmWithdraw = function () {
        if (!$scope.withdrawMoney || isNaN($scope.withdrawMoney * 1) || $scope.withdrawMoney * 1 < 0) {
          layer.msg('Please enter a correct amount.');
          return;
        }
        if ($scope.withdrawMoney * 1 > $scope.accountInfo.balance) {
          layer.msg('Please enter a amount less than ' + $scope.accountInfo.balance + '.');
          return;
        }
        if (!$scope.withdrawEmail) {
          layer.msg('Please enter your PayPal account.');
          return;
        }
        if (!dsp.isEmail($scope.withdrawEmail)) {
          layer.msg('Please enter a correct PayPal account.');
          return;
        }
        if (!$scope.verify_code) {
          layer.msg('Please enter a verification code.');
          return;
        }
        layer.load(2);
        dsp.postFun('app/wallet/withdraw', JSON.stringify({
          money: $scope.withdrawMoney,
          email: $scope.withdrawEmail,
          verificationCode: $scope.verify_code,
          paymentType: $scope.payFlag,
        }), function (data) {
          layer.closeAll('loading');
          console.log(data);
          if (data.data.code == 200) {
            layer.msg('Submitted sucess');
            $scope.withdrawMoney = '';
            $scope.withdrawEmail = '';
            getAccountInfo();
            resetSendVerify();
          } else {
            layer.msg('Submit failed');
          }
        });
      }
      $scope.deleteOnePic = function (index) {
        $scope.imgArr.splice(index, 1);
      }
      //上传转账支付凭证的图片
      $scope.imgArr = [];
      $scope.isphoto = false; //判断如果不是图片的弹框
      $scope.isimgflag = false; //判断是否上传图片
      $scope.upLoadImg4 = function (files) {
        if (files.length == 0) return;
        // console.log(files);
        $scope.imgArrType = [];
        dsp.ossUploadFile(files, function (data) {
          console.log(data);
          if (data.code == 0) {
            layer.msg('Images Upload Failed');
            return;
          }
          if (data.code == 2) {
            layer.msg('Images Upload Incomplete');
          }
          $("#document2").val('');
          var obj = data.succssLinks;
          for (var i = 0; i < obj.length; i++) {
            var srcList = obj[i].split('.');
            var imgArrType = srcList[srcList.length - 1];
            if (imgArrType == 'png' || imgArrType == 'jpg' || imgArrType == 'jpeg' || imgArrType == 'gif' || imgArrType == 'pdf') {
              $scope.imgArr.push(obj[i].replace('https://', ''));
              console.log($scope.imgArr)
              $scope.isimgflag = true; //判断是否上传图片
            } else {
              // layer.msg('Incorrect File Extension')
              $scope.isphoto = true; //判断如果不是图片的弹框  显示
              $scope.isimgflag = false; //判断是否上传图片
              return;
            }
          }
          $scope.$apply();
          // console.log($scope.imgArr);
        })
      }
      $scope.isimgcloFun = function () {
        $scope.isphoto = false; //判断如果不是图片的弹框  关闭
      }
      //选择银行
      $('.select-bank').change(function () {
        if ($(this).val() == 'USD') {
          $('.bank-type-usd').show();
          $('.bank-type-eur').hide();
          // $('#tc-a-money').text($scope.ordmoney); //充值金额
          $('.money-unit-sel').val('USD');
          getExchangeRate('USD')
        } else {
          $('.bank-type-eur').show();
          $('.bank-type-usd').hide();
          // $('#tc-a-money').text($scope.ordmoney * 0.8773);
          $('.money-unit-sel').val('EUR');
          getExchangeRate('EUR')
        }
      })
      //选择币种的选框
      $('.money-unit-sel').change(function () {
        if ($(this).val() == 'USD') {
          $('.bank-type-usd').show();
          $('.bank-type-eur').hide();
          // $('#tc-a-money').text($scope.ordmoney);
          $('.select-bank').val('USD');
          getExchangeRate('USD')
        } else {
          $('.bank-type-eur').show();
          $('.bank-type-usd').hide();
          // $('#tc-a-money').text(($scope.ordmoney * 0.8773 ).toFixed(2));
          $('.select-bank').val('EUR');
          getExchangeRate('EUR')
        }
      })
      function getExchangeRate(currencyCode, fn) {
        dsp.postFun('cj/homePage/exchangeRate', {
          toCode: currencyCode
        }, function (res) {
          if (res.data.statusCode == '200') {
            fn && fn(res.data.result);
            console.log(res)
            $scope.exchangeRate = res.data.result;
            if (currencyCode == 'USD') {
              $('#tc-a-money').text($scope.ordmoney);
            } else if (currencyCode == 'EUR') {
              $('#tc-a-money').text(($scope.ordmoney * $scope.exchangeRate).toFixed(2));
            }
          } else {
            console.warn('获取汇率失败', res);
          }
        }, function (err) {
          console.warn(err);
        });
      }

      // -------------------------------------------------------------------- 18-10-19 backend[tyy]
      $scope.verify_code_timer1;
      $scope.verify_code = '';
      $scope.verify_code_txt = 'Send Verification Code';
      $scope.verify_code_disable = false;
      $scope.verifyCode = function (code) {
        if ($scope.verify_code_timer1) $timeout.cancel($scope.verify_code_timer1);

        $scope.verify_code_timer1 = $timeout(function () {
          if ($scope.verify_code_disable) return // 阻止多次提交[防抖动]

          if (!$scope.withdrawMoney || isNaN($scope.withdrawMoney * 1) || $scope.withdrawMoney * 1 < 0) {
            layer.msg('Please enter a correct amount.');
            return;
          }
          if ($scope.withdrawMoney * 1 > $scope.accountInfo.balance) {
            layer.msg('Please enter a amount less than ' + $scope.accountInfo.balance + '.');
            return;
          }
          sendVerifyInterlude()
          dsp.postFun('app/modelEmail/sendVerificationCode', JSON.stringify({
            money: $scope.withdrawMoney,
            verificationCode: code
          }), function (data) {
            console.log('返回验证码', JSON.stringify(data)) // {"code":"200"}
            if ('200' == data.data.code) layer.msg('Send sucess');
            else layer.msg('Send failed');
          });
        }, 300);
      }
      function sendVerifyInterlude(fn) {
        var i = 60;
        $scope.verify_code_timer2;
        $scope.verify_code_disable = true;
        $scope.verify_code_txt = 'Again After ' + i + ' Seconds';
        $scope.verify_code_timer2 = $interval(function () {
          if (1 === i) {
            $interval.cancel($scope.verify_code_timer2);
            $scope.verify_code_disable = false;
            $scope.verify_code_txt = 'Send Again';
            fn && fn();
          } else {
            i--
            $scope.verify_code_txt = 'Again After ' + i + ' Seconds';
          }
        }, 1000);
      }
      function resetSendVerify() {
        $interval.cancel($scope.verify_code_timer2);
        $scope.verify_code_disable = false;
        $scope.verify_code_txt = 'Send Verification Code';
        $scope.verify_code = '';
      }

      // 生成事件范围内的发票--------------------------------------------------------------------
      $scope.exportType = ''
      let pre = new Date();
      pre.setFullYear(pre.getFullYear() - 1);
      $('#invoiceDate1').val(utils.parseTime(pre, "yyyy-MM-dd hh:mm:ss"))
      $('#invoiceDate2').val(utils.parseTime(new Date(), "yyyy-MM-dd hh:mm:ss"))
      $scope.generateInvoice = () => {
        if (!$('#invoiceDate1').val() || !$('#invoiceDate2').val()) {
          layer.msg('Please select starting time and ending time.')
        } else {
          dsp.iswallInvoiceDialog(base64.encode($('#invoiceDate1').val()), base64.encode($('#invoiceDate2').val()), $scope.exportType)
        }
      }

      /*
      *
      * payoneer 支付
      * */
      $scope.isAuthorize = null; //  1 选择账户 2 未授权登录注册 3 已授权付款
      $scope.isShowPaynnerDia = false; // 是否打开弹窗
      $scope.isGetCode = false; // 是否再次获取验证码
      $scope.num = 60; // 获取验证码倒计时
      $scope.currencyType = null;// 账户类型  0 美元 1 欧元
      //
      $scope.payoneerRecharge = () => {
        $scope.isShowPaynnerDia = true;
        $scope.isAuthorize = 1;
        $scope.currencyType = null;
        $scope.payoneerEmail = '';
      };
      //返回
      $scope.payonnerBack = () => {
        $scope.isAuthorize = 1;
      }
      //选择账户
      $scope.selectAccount = (t) => {
        clearInterval(timer);
        $scope.num = 60;
        $scope.isGetCode = false;
        $scope.currencyType = t;
        isAuth()
      };

      //是否授权
      function isAuth() {
        let parms = {
          currencyType: $scope.currencyType
        }
        layer.load(2)
        dsp.postFun('cj/payoneer/isAuth', parms, (res) => {
          layer.closeAll('loading');
          if (res.data.statusCode == '200') {
            $scope.isShowPaynnerDia = true;
            $scope.isAuthorize = res.data.result.isAuth ? 3 : 2;
            $scope.payoneerEmail = res.data.result.email;
            $scope.rate = res.data.result.rate;
            $scope.payAmount = $scope.currencyType === 0 ? 'Pay US$' + ($scope.ordmoney * $scope.rate).toFixed(2) : 'Pay EUR€' + ($scope.ordmoney * $scope.rate).toFixed(2);
          }
        }, (err) => {
          layer.closeAll('loading');
        })
      }

      //
      $scope.signInOrRegister = (linkType) => {
        let parms = {
          currencyType: $scope.currencyType,
          linkType: linkType,
          redirectUrl: location.href
        };
        layer.load(2)
        dsp.postFun('cj/payoneer/getLink', parms, (res) => {
          layer.closeAll('loading');
          if (res.data.statusCode == '200') {
            location.href = res.data.result
          } else {
            layer.msg('The server is busy now, please try again later.')
          }
        }, (err) => {
          layer.closeAll('loading');
        })
      }
      //获取验证码
      let timer;
      $scope.getCode = () => {
        if ($scope.isGetCode) {
          return;
        }
        let parms = {
          currencyType: $scope.currencyType,
          money: ($scope.ordmoney * $scope.rate).toFixed(2),
        };
        layer.load(2)
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
          $scope.num = 60;
          $scope.isGetCode = false;
          layer.closeAll('loading');
        })
      }
      //解绑
      $scope.unbind = () => {
        let parms = {
          currencyType: $scope.currencyType,
        };
        layer.load(2)
        dsp.postFun('cj/payoneer/removeAuth', parms, (res) => {
          layer.closeAll('loading');
          if (res.data.statusCode == '200') {
            layer.msg('Unbound successfully');
            isAuth()
          }
        }, (err) => {
          layer.closeAll('loading');
        })
      }
      //支付
      $scope.payoneer_Pay = () => {
        if (!$scope.verificationCode) {
          layer.msg('Please enter verification code');
          return;
        }
        let parms = {
          money: $scope.ordmoney,
          code: 4,
          mailCode: $scope.verificationCode,
          paymentType: 'payoneer',
          payPrice: ($scope.ordmoney * $scope.rate).toFixed(2),
          currencyType: $scope.currencyType
        };
        layer.load(2)
        dsp.postFun('app/wallet/reCharge', JSON.stringify(parms), function (res) {
          layer.closeAll('loading');
          if (res.data.code==200) {
            getAccountInfo();
            $scope.isShowPaynnerDia = false;
            layer.msg('Submitted sucess, we are reviewing the transfer.');
          } else {
            layer.msg(res.data.msg);
          }
        }, function (err) {
          layer.closeAll('loading');
          console.log(err)
        })
      }
      // 更新账户信息
      $scope.updateAccount = () => {
        layer.load(2)
        dsp.getFun('cj/payoneer/updateAuth?currencyType=' + $scope.currencyType, (res) => {
          layer.closeAll('loading');
          if (res.data.statusCode == '200') {
            layer.msg('Update successfully')
          }
        }, (err) => {

        })
      }


      //体现
      $scope.payFlag = 'paypal'
      $scope.changePayTab = (t) => {
        $scope.payFlag = t;
        if($scope.accountObj){
          if(t=='payoneer'){
            $scope.withdrawEmail = $scope.accountObj.Payoneer;
          }else if(t=='PayPal'){
            $scope.withdrawEmail = $scope.accountObj.PayPal;
          }else if(t=='stripe'){
            $scope.withdrawEmail = $scope.accountObj.Stripe;
          }
        }
      }

    }]);

  return app;

}
