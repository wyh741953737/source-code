
  import {countryL} from './paydata';
  import { NODE_ENV } from '@root_egg/env';
  export function paymentFactory(angular) {
  const app = angular.module('payment.module', ['service']); 
  console.log(NODE_ENV,'==========---------------')
  const stripeKey = ['testnew', 'development', 'test'].includes(NODE_ENV) ? 'pk_test_w62tAPWquFpSQsGEP79Lhs25008FgbcW8j' : 'pk_live_J9V7M9fZ2SRQdJ51mBKCNhf7'//原来的key：pk_live_43E8v5OVJz6dCeDu82ZDL5Du
  const awinTesMode = ['testnew', 'development', 'test'].includes(NODE_ENV) ? 1 : 0;
  const NETERROR = 'The server is busy now, please try again later.';
  app.controller('payment.ctrl', ['$scope', '$stateParams', 'dsp',
    function ($scope, $stateParams, dsp) {
      $scope.nextAshFlag = true; // payoneer 的next按钮 置灰开关
      localStorage.removeItem('stripeObj')
      $scope.selectTermsFlag = false;
      let base64 = new Base64();
      console.log('stateParams__________', $stateParams)
      $scope.userId = base64.decode(localStorage.getItem('userId') == undefined ? '' : localStorage.getItem('userId'));
      $scope.ordnumber = $stateParams.ordn ? base64.decode($stateParams.ordn) : ''; //订单号
      $scope.ordmoney = $stateParams.ordm ? parseFloat((base64.decode($stateParams.ordm) - 0).toFixed(2)) : ''; //订单金额
      $scope.ordquantity = $stateParams.ordq ? base64.decode($stateParams.ordq) - 0 : ''; //订单数量展示使用
      $scope.payIndexType = '';//支付方式
      let videoId = $stateParams.videoId ? base64.decode($stateParams.videoId) : '';
      let proId = $stateParams.pid ? base64.decode($stateParams.pid) : ''; //产品id
      let ordType = $stateParams.ordType; //订单类型
      var fromPath, successPath, payoneerSuccessPath, failPath;
      const orderversion = localStorage.getItem('orderversion') ?? '2';
      const noNewOrderList = ['DIRECT', 'FormTb', 'fba', 'VIDEODTA', 'VIDEOHOT', 'dispute', 'problemPackage']
      console.log('ordType======' + ordType)
      let wechatPayCode = 45
      if (ordType == 'DIRECT') { //直发、代发、自定义包装订单
        $scope.payCode = 6;
        $scope.payeezyCode = 14;
        $scope.stripeCode = 5;
        $scope.payWalletCode = 8;
        $scope.payoneerCode = 25;
        $scope.payssionCode = 26;
        $scope.alipayCode = 41;
        $scope.payType = 'accountBuyPaypal';
        $scope.orderType = 'CJPAY';
        fromPath = '#/purchase-history';
        failPath = 'myCJ.html#/purchase-history'
        successPath = 'myCJ.html#/purchase-history';
        payoneerSuccessPath = '#/purchase-history';
        wechatPayCode = 46;
      } else if (ordType == 'FormTb') { //从淘宝进入
        $scope.payCode = 6;
        $scope.payeezyCode = 14;
        $scope.stripeCode = 5;
        $scope.payWalletCode = 8;
        $scope.payoneerCode = 25;
        $scope.payssionCode = 26;
        $scope.alipayCode = 41;
        $scope.payType = 'accountBuyPaypal';
        $scope.orderType = 'CJPAY';
        $scope.payflag = 'PTB';
        $scope.buy = 'FormTb';
        fromPath = '#/purchase-Taobao';
        failPath = 'myCJ.html#/purchase-Taobao'
        successPath = 'myCJ.html#/purchase-Taobao';
        payoneerSuccessPath = '#/purchase-Taobao';
      } else if (ordType == 'fba') {
        $scope.payCode = 6;
        $scope.payeezyCode = 14;
        $scope.stripeCode = 5;
        $scope.payWalletCode = 8;
        $scope.payoneerCode = 25;
        $scope.payssionCode = 26;
        $scope.alipayCode = 41;
        $scope.orderType = 'CJPAY';
        $scope.payType = 'accountBuyPaypal';
        fromPath = '#/myCJ-FBA';
        failPath = 'myCJ.html#/myCJ-FBA'
        successPath = 'myCJ.html#/myCJ-FBA';
        payoneerSuccessPath = '#/myCJ-FBA';
      } else if (ordType == 'VIDEODTA' || ordType == 'VIDEOHOT') { //video
        $scope.payCode = 11;
        $scope.payeezyCode = 15;
        $scope.stripeCode = 10;
        $scope.payWalletCode = 12;
        $scope.payoneerCode = 28;
        $scope.payssionCode = 29;
        $scope.alipayCode = 42;
        $scope.locProductId = proId;
        $scope.payType = 'videoBuyPaypal';
        fromPath = '#/video-history';
        failPath = ordType == 'VIDEODTA' ? ('product-detail.html?id=' + proId + '&videoId=' + videoId) : 'myCJ.html#/video-history'
        successPath = ordType == 'VIDEODTA' ? ('product-detail.html?id=' + proId + '&videoId=' + videoId) : 'myCJ.html#/video-history';
        payoneerSuccessPath = '#/video-history';
        wechatPayCode = 47;
      } else if (ordType == 'dispute') {// 纠纷
        $scope.payCode = 18;
        $scope.payeezyCode = 20;
        $scope.stripeCode = 17;
        $scope.payWalletCode = 19;
        $scope.payoneerCode = 31;
        $scope.payssionCode = 38;
        $scope.alipayCode = 43;
        $scope.payType = 'freightBuyPaypal';
        fromPath = '#/after-sale//';
        failPath = 'myCJ.html#/after-sale//';
        successPath = 'myCJ.html#/after-sale//';
        payoneerSuccessPath = '#/after-sale//';
        wechatPayCode = 48
      } else if (ordType == 'problemPackage') {
        $scope.payCode = 37;
        $scope.payeezyCode = 33;
        $scope.stripeCode = 36;
        $scope.payWalletCode = 32;
        $scope.payoneerCode = 34;
        $scope.payssionCode = 39;
        $scope.alipayCode = 44;
        $scope.payType = 'problemPackage';
        fromPath = '#/problem-package';
        failPath = 'myCJ.html#/problem-package/';
        successPath = 'myCJ.html#/problem-package/2';
        payoneerSuccessPath = '#/problem-package/2';
      } else {
        $scope.payCode = 3;
        $scope.stripeCode = 2;
        $scope.payWalletCode = 7;
        $scope.payeezyCode = 13;
        $scope.payoneerCode = 21;
        $scope.payssionCode = 22;
        $scope.alipayCode = 24;
        $scope.payType = 'paypal';
        $scope.dropshipOrder = true;
        fromPath = orderversion == '2'? 'newmycj/dropshipping/orderManage':'#/dropshipping-orders';
        failPath = orderversion == '2'? 'newmycj/dropshipping/orderManage':'myCJ.html#/dropshipping-orders';
        successPath = orderversion == '2'? 'newmycj/dropshipping/orderManage':'myCJ.html#/drop-proce';
        payoneerSuccessPath = orderversion == '2'? 'newmycj/dropshipping/orderManage':'#/dropshipping-orders';
        wechatPayCode = 45;
      }


      //支付方式列表 -- 判断页面是否是来自problemPackage, true：隐藏掉该支付方式 false: 正常显示
      $scope.payTypeList = [
        {img: 'static/image/public-img/paypal.png', type: 'paypal',name:'PayPal' },
        {img: 'static/image/public-img/wire.png', type: 'wire',name:'Wire Transfer', isHide: $scope.payType == 'problemPackage'},
        {text: 'Pay With Card', type: 'card',name:'Pay with Card' },
        {text: 'Pay with CJ Wallet', showMoney: true, type: 'credit',name:'Pay with CJ Wallet' },
        {img: 'static/image/public-img/paynner1.png', type: 'paynner',name:'Payoneer' },
        {img: 'static/image/public-img/payssion.png', type: 'payssion' ,name:'Payssion'},
        // {img: 'static/image/public-img/midtrans.png', type: 'midtrans',name:'Midtrans' },
        {img: 'static/image/public-img/western.png', type: 'western',name:'Western Union', isHide: $scope.payType == 'problemPackage'},
        /* {img: 'static/image/public-img/western.png', type: 'alipay',name:'Visa/Mastercard', } */
        // {type: 'newAlipay',name:'Alipay Transfer' },
        // {type: 'wechat',name:'Wechat Transfer' },
      ]
      if($scope.payType == 'problemPackage'){
        $scope.payTypeList.forEach(item=>{
          if(item.type=='wire'||item.type=='western') item.isHide = true;
        })
      }
      const orderFlag = sessionStorage.getItem('newpay') || 1;//1老业务  2新业务
      // const isAliPay = localStorage.getItem('isAliPay') == '1'
      const isWechatPay = localStorage.getItem('isWechatPay') == '1'
      // if(isAliPay) {
      //   $scope.payTypeList.push({type: 'newAlipay',name:'Alipay' })
      // }
      if(isWechatPay) {
        $scope.payTypeList.push({type: 'wechat',name:'Wechat Pay' })
      }


      $scope.$on("$destroy", function() {
        // 关闭页面时要做的事
        sessionStorage.removeItem('newpay')
      })
      //币种开关
      $scope.switchCheck = false // false:美元，true:欧元
      // 欧元支付提示弹窗
      $scope.eurPayReminderModal = {
        isShow: false
      }
      $scope.bankInfoData = {}
      function getBankInfoData() {
        layer.load(2)
        dsp.postFun('app/wallet/getBankInfo', {}, (res) => {
          layer.closeAll();
          const infoData = res.data
          const {westernUnion, wireTrans} = infoData.data
          $scope.bankInfoData = {
            westernUnion: {
              eur: westernUnion.EUR.split('%'),
              usd: westernUnion.USD.split('%'),
            },
            wireTrans: {
              eur: wireTrans.EUR.split('%'),
              usd: wireTrans.USD.split('%'),
            }
          }
        }, (err) => {
          layer.closeAll();
        });
      }
      getBankInfoData()
      //银行转账
      $scope.transferObj = {
        isShow: false, //是否显示
        unit: 'USD', //金额单位
        amount: '', //转账金额
        message: '', //转账信息
        isShowSucc: false, //成功提醒
        price: $scope.ordmoney,
        showPrice: $scope.ordmoney
      }
      //西联银行
      $scope.transferXLObj = {
        isShow: false, //是否显示
        unit: 'USD', //金额单位
        amount: '', //转账金额
        message: '', //转账信息
        isShowSucc: false, //成功提醒
        price: $scope.ordmoney,
        showPrice: $scope.ordmoney
      }
      //paypal支付
      $scope.paypalObj = {
        url: '',
        showError: false,
        errorMsg: ''
      }
      //pay with Card
      $scope.widthCardObj = {
        isGet: false
      }
      //余额支付 store Credit
      $scope.storeCreditObj = {
        isShow: false,
        balance: ''//当前余额
      }
      //payssion支付
      $scope.payssionObj = {
        isShow: false,
        country: {},
        showList: false,
        payMethod: '',
        search: '',
        methods: []
      }
      //alipay支付
      $scope.alipayObj = {
        isShow: false,
        id:'',
        token:''
      }
      // 支付宝支付
      $scope.newAlipayObj = {
        isShow: false, //是否显示
        unit: 'USD', //金额单位
        amount: '', //转账金额
        message: '', //转账信息
        isShowSucc: false, //成功提醒
        showAmount: $scope.ordmoney,
        payCode: wechatPayCode,
      }
      // 微信支付
      $scope.wechatObj = {
        isShow: false, //是否显示
        unit: 'USD', //金额单位
        amount: '', //转账金额
        message: '', //转账信息
        isShowSucc: false, //成功提醒
        showAmount: $scope.ordmoney,
        payCode: wechatPayCode
      }
      $scope.overTime = false // 微信支付超时状态
      $scope.payStatus = 0 // 微信订单支付状态 1:支付中 2:支付失败 3:支付成功
      $scope.acceptList = ['visa.jpg','master.png','amo.png','JCB.png','discover.png','wire.png','stripe.png','paypal.png','paynner1.png','payssion.png','western.png'];
      let midtransAppendJS=()=> {
        let osrc = '';
        if (window.environment == 'test' || window.environment == 'development') {
          osrc = 'https://app.sandbox.midtrans.com/snap/snap.js'
        } else {
          osrc = 'https://app.midtrans.com/snap/snap.js'
        }
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = osrc;
        document.getElementsByTagName('head')[0].appendChild(script);
      }
      midtransAppendJS();
      //获取余额
      let getYeMoney=()=> {
        dsp.postFun('app/wallet/getBalance', '{}', function (data) {
          $scope.storeCreditObj.balance = data.data.balance;
        }, function (data) {
        })
      }
      getYeMoney();

      //返回事件
      $scope.goBack = () => {
        const cancelUrl = !noNewOrderList.includes(ordType) ? fromPath : `myCJ.html${fromPath}`
        location.href = cancelUrl;
        sessionStorage.removeItem('newpay');
      }

      //paypal不可支付订单的确定按钮
      $scope.linkFun = function () {
        const cancelUrl = !noNewOrderList.includes(ordType) ? fromPath : `myCJ.html${fromPath}`
        location.href =  cancelUrl;
      };

      // 跳回首页的确定按钮
      $scope.backPageFun = function () {
        location.href =  location.origin;
      };
     
      // 是否可使用PayPal支付
      (function (){
        const parmas = {
          'shipId': $scope.ordnumber
        }
        layer.load(2)
        dsp.postFun('cj/fbaOrder/getHomeType', parmas, ({data}) =>{
          layer.closeAll('loading')
          if (data.statusCode === '200'){
            $scope.isNoPayPal = data.result === '0' || data.result === '2'; // 是否可PayPal支付
          }
        }, err => {
          console.log(err);
        })
      }())

      //请求paypel的支付链接
      let paypalFun=()=> {
        const orderversion = localStorage.getItem('orderversion') ?? '2';
        const returnUrl =  successPath
        const cancelUrl = orderversion === '2' ? fromPath : `myCJ.html${fromPath}`
        let payData = {
          orderNum: $scope.ordnumber,
          price: $scope.ordmoney,
          type: $scope.payType + ',payeezy',
          otype: ordType == 'fba' ? '2' : '',
          locProductId: $scope.locProductId,
          payflag: $scope.payflag,
          orderFlag,
          returnUrl: `${location.origin}/${returnUrl}`,
          cancelUrl: `${location.origin}/${cancelUrl}`
        };
        $scope.paypalObj.url = '';
        layer.load(2);
        dsp.postFun('app/pay/getPayUrl', JSON.stringify(payData), (data) => {
          layer.closeAll("loading");
          let olist = data.data;
          olist.filter(item => {
            if (item.type == $scope.payType) {
              $scope.paypalObj.url = item.href;
            }
          })
          if ($scope.paypalObj.url.indexOf('https') < 0) {
            $scope.paypalObj.showError = true;
            $scope.paypalObj.errorMsg = 'Oops, There is something wrong with this order, payment failed. Please contact your agent.'
          }
        }, () => {
          layer.closeAll("loading")
        })
      }

      // 添加Stripe.js
      let payCardAppendJS = () => {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://js.stripe.com/v3/';
        document.getElementsByTagName('head')[0].appendChild(script);
      }
      payCardAppendJS();
      /* 银行转账,线下支付，上传账单
       * type：1-普通转账；2-西联银行转账
       */
      $scope.transferConfirmFun = (type) => {
        let payData = {
          unit: type == 1 ? $scope.transferObj.unit : $scope.transferXLObj.unit,
          tprice: type == 1 ? $scope.transferObj.amount : $scope.transferXLObj.amount,
          message: type == 1 ? $scope.transferObj.message : $scope.transferXLObj.message,
          price: type == 1 ? $scope.transferObj.price : $scope.transferXLObj.price,
          orderNum: $scope.ordnumber,
          showPrice: type == 1 ? $scope.transferObj.showPrice : $scope.transferXLObj.showPrice,
          orderNum: $scope.ordnumber,
          code: $scope.payCode,
          type: $scope.payType,
          img: $scope.imgArr + '',
          buy: $scope.buy,
          otype: (ordType == 'fba') ? '2' : '',
          orderType: $scope.orderType ? $scope.orderType : '',
          orderFlag,
          awc: dsp.getCookie("awc") || ''
        };
        if (payData.tprice < 0 || !payData.tprice || payData.tprice < payData.showPrice) {
          layer.msg('The amount entered is less than the order amount.');
          return;
        }
        // if (payData.tprice < 0 || !payData.tprice) {
        //   layer.msg('The amount entered is less than the order amount.');
        //   return;
        // }
        // if ($scope.switchCheck) { // 欧元支付的时候，输入金额要在幅度值±2欧元
        //   if (payData.tprice - payData.showPrice > 2 || payData.tprice - payData.showPrice < -2) {
        //     layer.msg('Please enter the valid amount!');
        //     return;
        //   }
        // } else if (payData.tprice < payData.showPrice) {
        //   layer.msg('The amount entered is less than the order amount.');
        //   return;
        // }
        //判断是否有上传图片
        if ($scope.isimgflag == false) {
          layer.msg('Please upload transfer slip!')
          return;
        }
        $scope.transferObj.isShow = false; //隐藏当前转账凭证弹框
        $scope.transferXLObj.isShow = false; //隐藏当前转账凭证弹框

        if(type == 1) payData.paymentMethod = 0 // wire transfer
        if(type == 2) payData.paymentMethod = 1 // western union

        layer.load(2)
        dsp.postFun('app/pay/pay', JSON.stringify(payData), function (data) {
          layer.closeAll('loading');
          if (data.data.result == true) {
            awinJS();
            imgHttpFun();
            layer.msg('Payment Succeed')
            $scope.imgArr = [];
            type == 1 ? $scope.transferObj.isShowSucc = true : $scope.transferXLObj.isShowSucc = true;
          } else {
            layer.msg('Payment Failure')
            const cancelUrl = !noNewOrderList.includes(ordType) ? fromPath : `myCJ.html${fromPath}`
            location.href =  cancelUrl;
          }
        }, function (data) {
          layer.closeAll('loading');
        })
      }

      /* 币种切换
       * type:1-普通转账；2-西联银行转账
       */
      $scope.transferUnitChange = (type) => {
        let ounit = type == 1 ? $scope.transferObj.unit : $scope.transferXLObj.unit;
        let amount = $scope.ordmoney;
        if (ounit != 'USD') {
          layer.load(2);
          dsp.postFun('cj/homePage/exchangeRate', {
            toCode: type == 1 ? $scope.transferObj.unit : $scope.transferXLObj.unit
          }, (res) => {
            if (res.data.statusCode == '200') {
              layer.closeAll();
              $scope.exchangeRate = res.data.result;
              amount = ($scope.ordmoney * $scope.exchangeRate).toFixed(2);
              type == 1 ? $scope.transferObj.price = amount : $scope.transferXLObj.price = amount;
            } else {
              console.warn('获取汇率失败', res);
            }
          }, (err) => {
            layer.closeAll();
            console.log("get error")
          });
        } else {
          type == 1 ? $scope.transferObj.price = amount : $scope.transferXLObj.price = amount;
        }
      }
      //转账的取消按钮
      $scope.transferSuccNoFun = () => {
        $scope.transferObj.isShowSucc = false;
        $scope.transferXLObj.isShowSucc = false;
        const cancelUrl = !noNewOrderList.includes(ordType) ? fromPath : `myCJ.html${fromPath}`
        location.href =  cancelUrl;
      }
      //转账成功后的去充值按钮
      $scope.transferChargeFun = () => {
        location.href = "#/myCJWallet";
      }

      //上传转账支付凭证的图片
      $scope.isphoto = false; //判断如果不是图片的弹框
      $scope.isimgflag = false; //判断是否上传图片
      $scope.upLoadImg4 = function (files) {
        $scope.imgArrType = [];
        var data = new FormData();
        for (var i = 0; i < files.length; i++) {
          data.append('file', files[i]);
        }
        layer.load(2)

        function con(n) {
          layer.closeAll("loading")
          var obj = JSON.parse(n.data.result)
          for (let i = 0; i < obj.length; i++) {
            var srcList = obj[i].split('.');
            $scope.imgArrType.push(srcList[srcList.length - 1]);
            for (let k = 0; k < $scope.imgArrType.length; k++) {
              if ($scope.imgArrType[k] == 'png' || $scope.imgArrType[k] == 'jpg' || $scope.imgArrType[k] == 'jpeg' || $scope.imgArrType[k] == 'gif' || $scope.imgArrType[k] == 'pdf') {
                $scope.imgArr = obj;
                $scope.headimg = 'https://' + obj[0];
                $scope.isimgflag = true; //判断是否上传图片
              } else {
                $scope.isphoto = true; //判断如果不是图片的弹框  显示
                $scope.isimgflag = false; //判断是否上传图片
                return;
              }
            }
          }
        }

        function err(n) {
          console.log(n)
          layer.closeAll("loading")
        }
        dsp.upLoadImgPost('app/ajax/upload', data, con, err)
      }

      function imgHttpFun(){
        let awcText = dsp.getCookie('awc')
        let utmSource = localStorage.getItem('utmSource');
        if(awcText && utmSource == 'awin'){//有awin的awc值 并且登录平台来源是awin
          let orderCountMoney = $scope.ordmoney.toFixed(2)
          let BasketImage = new Image(1,1);
          BasketImage.src = `https://www.awin1.com/sread.img?tt=ns&tv=2&merchant=21578&amount=${orderCountMoney}&ch=aw&parts=DEFAULT:${orderCountMoney}&cr=USD&ref=${$scope.ordnumber}&tesmode=${awinTesMode}`;
        }
      }
      //是否用余额支付
      $scope.agreePayFun = function () {
        $scope.storeCreditObj.isShow = false;
        var payData = {
          orderNum: $scope.ordnumber,
          price: $scope.ordmoney,
          code: $scope.payWalletCode,
          type: $scope.payType,
          buy: $scope.buy,
          otype: ordType == 'fba' ? '2' : '',
          orderFlag,
          awc: dsp.getCookie("awc") || ''
        };
        if ($scope.storeCreditObj.balance < $scope.ordmoney) {
          layer.msg('Lack of balance.');
          return;
        }
        layer.load(2);
        dsp.postFun('app/pay/pay', JSON.stringify(payData), function (data) {
          layer.closeAll('loading');
          if (data.data.result == true) {
            imgHttpFun()
            // location.href = successPath;
            awinJS(successPath);
            layer.msg('Payment Succeed');
          } else {
            layer.msg('Payment Failure');
            const cancelUrl = !noNewOrderList.includes(ordType) ? fromPath : `myCJ.html${fromPath}`
            location.href =  cancelUrl;
            console.log("支付失败")
          }
        }, function (data) {
          layer.closeAll('loading');
        })
      };

      /*
       * payoneer 支付
       * */

      $scope.isAuthorize = null; //  1 选择账户 2 未授权登录注册 3 已授权付款
      $scope.isShowPaynnerDia = false; // 是否打开弹窗
      $scope.isGetCode = false; // 是否再次获取验证码
      $scope.num = 60; // 获取验证码倒计时
      $scope.currencyType = null; // 账户类型  0 美元 1 欧元

      //是否授权
      let isAuth=()=> {
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
      //派安盈支付
      $scope.payoneerPay = () => {
        $scope.isShowPaynnerDia = true;
        $scope.isAuthorize = 1;
        $scope.currencyType = null;
        $scope.payoneerEmail = '';
      };

      // 派安盈支付-新 --用户正常点击流程
      // 获取欧元汇率
      function getEurRate() {
        layer.load(2)
        dsp.postFun('cj/homePage/exchangeRate', { toCode: 'EUR' }, res => {
          layer.closeAll();
          const { data: { result } } = res;
          if (!result) return;
          $scope.payoneerEurRate = result*1;
        })
      }
      // 预先获取欧元汇率
      getEurRate();
      $scope.payoneerData = {
        authUrl: '',
        usdPayMoney: $scope.ordmoney,
        eurPayMoney: '',
      };
      // 点击授权
      $scope.authClick = () => {
        // 接下来用户就要去授权了，在这之前保存当前地址作为中间页跳转回来地址
        localStorage.setItem(`_p_${$scope.ordnumber}`, JSON.stringify({ href: location.href, isAuth: true }))
        // 跳转授权地址
        location.href = $scope.payoneerData.authUrl;
      }
      $scope.payoneerPayNew = () => {
        // 是否须授权   postFun没有返回值，用不了 async 啊啊
        layer.load(2);
        dsp.postFun('app/payoneer/authorize', {}, res => {
          layer.closeAll('loading')
          // authFlag 为false需要授权
          const _data = (res.data || {}).data || {};
          const { authFlag, balanceList = [] } = _data
          console.log('authFlag', authFlag);
          if (!authFlag) {
            $scope.payoneerOrder = false;   // 已授权
            /* 没有授权，获取授权地址，显示授权引导 */
            const _params = { returnId: `${$scope.ordnumber}`,  redirectUrl: `${location.origin}/payoneer-auth.html`  }  // returnId 传给后台，回调时传过来   redirectUrl 前端重定向页面

            dsp.postFun('app/payoneer/authorizeLink', _params, _res => {
              const _data = (_res.data || {}).data || {};
              const { authorizeUrl } = _data
              if (!authorizeUrl) {
                layer.msg(NETERROR)
              }
              // 不写else更准确一些
              if(authorizeUrl) {
                // 显示授权引导
                $scope.payoneerData.authUrl = authorizeUrl;
                $scope.isShowNewPaynnerDia = true;    // 基础弹窗
                $scope.payoneerAuth = true;           // 授权引导
              }
            }, err => {
              console.log('err', err)
              layer.msg(NETERROR)
            })
          } else {
            /* 授权成功，显示已授权 */
            $scope.isShowNewPaynnerDia = true;    // 基础弹窗
            $scope.payoneerOrder = true;   // 已授权
            // 判断钱包余额是否够用- 这里在判断一下汇率有没拿到，没拿到不让用欧元支付
            let _rate = {
              0: 1,
              1: $scope.payoneerEurRate || 0,
            }
            // 判断当前payoneer可支付的币种是否存在===balanceList是null或空数组
            if(!balanceList || balanceList.length === 0) {
              $scope.nextAshFlag = true; // 置灰next按钮
              // layer.msg('You need to activate your Payoneer USD or EUR account to process the transaction.')
            } else {
              balanceList.forEach(v => {
                // 转换成美元进行比较
                v.afterRateMoney = _rate[v.currencyType] ? v.balanceAmount / _rate[v.currencyType] : 0;
                v.disabled = v.afterRateMoney < $scope.ordmoney;
              })
            }
            // 数据绑定
            console.log('payoneerData', $scope.payoneerAuthData);
            $scope.payoneerAuthData = _data;
          }
        }, err => {
          layer.msg(NETERROR);
        })
      }
      // 切换授权账号
      $scope.switchPayoneerAuth = () => {
        /* 没有授权，获取授权地址，显示授权引导 */
        const _params = { returnId: `${$scope.ordnumber}`,  redirectUrl: `${location.origin}/payoneer-auth.html` }  // returnId 传给后台，回调时传过来   redirectUrl 前端重定向页面
        layer.load(2);
        dsp.postFun('app/payoneer/authorizeLink', _params, _res => {
          const _data = (_res.data || {}).data || {};
          const { authorizeUrl } = _data
          if (!authorizeUrl) {
            layer.msg(NETERROR)
          } else {
            $scope.payoneerData.authUrl = authorizeUrl;
            $scope.authClick()
          }
          layer.closeAll('loading')
        }, err => {
          console.log('err', err)
          layer.msg(NETERROR)
        })
      }
      // 选择支付账户-单选
      $scope.payoneerBalanceClick = (item) => {
        // 检查是否获取到欧元汇率，获取不到不给选。 item  => currencyType- 0/美元  1/欧元
        if(!$scope.payoneerEurRate && item.currencyType === 1) {
          getEurRate();
          return;
        }
        ($scope.payoneerAuthData.balanceList || []).forEach(v => v.selected = false)
        item.selected = true;
        $scope.nextAshFlag = false; // 选择币种后取消置灰
        if (item.selected) {
          // 设置付款货币类型
          $scope.payoneerPayCurrency = item.currency;
          $scope.payoneerPayBalance = item;
        }
        console.log('item', $scope.payoneerPayBalance)
      }
      // 订单确认
      $scope.payoneerConfirmClick = () => {
        // 当next按钮置灰，则不进行后面的代码
        if ($scope.nextAshFlag) {
          return
        }
        if (!$scope.payoneerPayCurrency) {
          layer.msg('Please select the currency first.');
          return
        }
        // 单位欧元，转换货币
        if($scope.payoneerPayBalance.currencyType === 1) {
          // 确认订单前，在检查一遍汇率
          if (!$scope.payoneerEurRate) {
            //layer.msg('未获取到欧元汇率');
            return;
          }
          $scope.payoneerData.eurPayMoney = parseFloat($scope.ordmoney*$scope.payoneerEurRate).toFixed(2);
        }
        $scope.payoneerOrder = false;   // 已授权
        $scope.payoneerConfirm = true;  // 确认支付
      }
      // 订单取消
      $scope.payoneerOrderCancel = () => {
        $scope.isShowNewPaynnerDia = false;    // 基础弹窗
        $scope.payoneerAuth = false;    // 授权
        $scope.payoneerOrder = false;   // 已授权
        $scope.payoneerConfirm = false;  // 确认支付
        $scope.payoneerPayCurrency = '';	// 置空已选钱包
      }
      // 确认支付
      $scope.payoneerConfirmPayClick = () => {
        if ($scope.payoneerPaying) {
          return;
        }
        // 要付款了
        const params = {
          orderNum: $scope.ordnumber,           // 订单号
          price: $scope.ordmoney,               // 原金额
          code: $scope.payoneerCode,            // 订单来源标识 直发/代发
          buy: $scope.buy,                      // from taobao
          //mailCode: $scope.verificationCode,    // ...
          currencyType: $scope.payoneerPayBalance.currencyType,   // 货币类型
          payPrice: ($scope.payoneerPayBalance.currencyType === 0 ? $scope.ordmoney : $scope.payoneerData.eurPayMoney),    // 实际金额
          otype: (ordType == 'fba') ? '2' : '', // 订单类型                           // ...
          balanceId: $scope.payoneerPayBalance.balanceId,   // 钱包id 余额
          redirectUrl: `${location.origin}/payoneer-auth.html`,  //前端重定向页面
          type:$scope.payType,
          orderFlag,
          awc: dsp.getCookie("awc") || ''
        }
        layer.load(2);
        $scope.payoneerPaying = true;
        dsp.postFun('app/pay/pay', params, res => {
          const _successUrl = orderversion === '2' ? payoneerSuccessPath : `/myCJ.html${payoneerSuccessPath}`
          const { data, data: { result, message, payUrl, returnId } = {} } = res;
          console.log('_res', JSON.stringify(data))
          if (result) {
            layer.msg('Payment Successful!');
            imgHttpFun()//正常模式下 付款成功直接调用回调
            awinJS(_successUrl);
            // 先都返回待支付页
            // setTimeout(() => { location.href = '/myCJ.html#/dropshipping-orders'; }, 2)
            // setTimeout(() => { location.href = _successUrl }, 2)
          } else if (payUrl) {
            // 挑战模式认证前，存储returnid,没有returnid即便授权也回不来了。
            //{payUrl: "https://auth.sandbox.payoneer.com/#?t=03fb9b90ac064f828124f85d9f94c891", returnId: "03fb9b90ac064f828124f85d9f94c891", result: false}
            console.log(returnId)
            if(!returnId) {
              layer.msg(NETERROR);
              $scope.payoneerPaying = false;
              layer.closeAll('loading')
              return
            }
            // imgHttpFun()  掉支付的时候会走这里 未支付成功  需要到支付成功页面去拿
            // localStorage.setItem(`_p_${returnId}`, JSON.stringify({ href: location.href, isPay: true, successHref: `/myCJ.html${payoneerSuccessPath}` }))
            //存储AWIN需要的参数
            localStorage.setItem(`_awin_${returnId}`, JSON.stringify({awinAmount:$scope.ordmoney,awinRef:$scope.ordnumber}))
            localStorage.setItem(`_p_${returnId}`, JSON.stringify({ href: location.href, isPay: true, successHref: _successUrl }))
            // 挑战模式，继续认证
            location.href = payUrl;
          } else {
            layer.msg(message || NETERROR)
          }
          $scope.payoneerPaying = false;
          layer.closeAll('loading')
        }, err => {
          $scope.payoneerPaying = false;
          layer.msg(NETERROR)
        })
      }
      // 取消支付-返回上一步
      $scope.payoneerPayCancel = () => {
        $scope.isShowNewPaynnerDia = true;    // 基础弹窗
        $scope.payoneerAuth = false;    // 授权
        $scope.payoneerOrder = true;   // 已授权
        $scope.payoneerConfirm = false;  // 确认支付
      }
      // 关闭弹窗
      $scope.closeShowNewPaynnerDia = () => {
        $scope.isShowNewPaynnerDia = false;
        $scope.isShowNewPaynnerDia = false;    // 基础弹窗
        $scope.payoneerAuth = false;    // 授权
        $scope.payoneerOrder = true;   // 已授权
        $scope.payoneerConfirm = false;  // 确认支付
        $scope.payoneerPayCurrency = '';	// 置空已选钱包
      }
      // 授权回调回来逻辑
      function fromAuthRedirect() {
        // 每次进入页面都检查
        console.log('检查授权回调');
        const isAuthR = localStorage.getItem(`_r_auth_${$scope.ordnumber}`) === 'true';
        if (isAuthR) {
          $scope.payIndexType = 'paynner';
          // 重走一遍验证流程
          $scope.payoneerPayNew();
          // 置空缓存，只走一次。之后页面刷新用户手动操作
          localStorage.removeItem(`_p_${$scope.ordnumber}`)
          localStorage.removeItem(`_r_auth_${$scope.ordnumber}`)
        }
      }
      fromAuthRedirect();
      // 派安盈支付-新 结束
      //选择账户
      $scope.selectAccount = (t) => {
        clearInterval(timer);
        $scope.num = 60;
        $scope.isGetCode = false;
        $scope.currencyType = t;
        isAuth()
      };
      //返回
      $scope.payonnerBack = () => {
        $scope.isAuthorize = 1;
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
      //派安盈解绑
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
      //派安盈支付
      $scope.payoneer_Pay = () => {
        if (!$scope.verificationCode) {
          layer.msg('Please enter verification code');
          return;
        }
        let parms = {};
        parms.orderNum = $scope.ordnumber;
        parms.price = $scope.ordmoney;
        parms.code = $scope.payoneerCode;
        parms.type = $scope.payType;
        parms.buy = $scope.buy;
        parms.mailCode = $scope.verificationCode;
        parms.currencyType = $scope.currencyType;
        parms.payPrice = ($scope.ordmoney * $scope.rate).toFixed(2);
        parms.otype = (ordType == 'fba') ? '2' : '';
        parms.otype = (ordType == 'fba') ? '2' : '';
        parms.awc= dsp.getCookie("awc") || '';
        layer.load(2)
        dsp.postFun('app/pay/pay', JSON.stringify(parms), function (res) {
          layer.closeAll('loading');
          if (res.data.result) {
            location.href = successPath;
            layer.msg('Payment Succeed');
          } else {
            if (res.data.message) {
              layer.msg(res.data.message);
            } else {
              layer.msg('Payment Failure');
              const cancelUrl = !noNewOrderList.includes(ordType) ? fromPath : `myCJ.html${fromPath}`
              location.href = cancelUrl;
            }
          }
        }, function (err) {
          layer.closeAll('loading');
          console.log(err)
        })
      };

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

      // payssion 支付方式

      let payssionCountry = countryL;
      let countryList = [];
      for (let key in payssionCountry) {
        let obj = {
          val: key.toLowerCase(),
          name: payssionCountry[key]
        }
        countryList.push(obj);
      }
      let payssionShowFun=()=> {
        let olanguage = navigator.language.indexOf('-') > 0 ? (navigator.language.split('-')[1]).toLowerCase() : '';
        layer.load(2)
        dsp.getFun('app/pay/payssionMethod', (res) => {
          if (res.data) {
            let payObj = res.data;
            let payObjKeys = Object.keys(payObj);
            layer.closeAll();
            $scope.payssionCountryList = countryList.filter(item => {
              if (payObjKeys.indexOf(item.val) >= 0) {
                let payList = (payObj[item.val].popular).split('|');
                item.methods = payList;
                item.isShow = true;
                return item;
              }
            })
            if (olanguage) {//根据当前的浏览器语言默认选择
              $scope.payssionCountryList.filter(item => {
                if (item.val == olanguage) {
                  $scope.payssionObj.country = item;
                  $scope.payssionObj.methods = item.methods;
                }
              })
            }
          } else {
            layer.msg('Hello, payment cannot be made due to the Payssion fail to obtain country information, please choose another payment method.')
          }
        }, (err) => {
          layer.msg('Hello, payment cannot be made due to the Payssion fail to obtain country information, please choose another payment method.')
        })
      }

      /* payssion选择支付国家 */
      $scope.payssionCountryFun = item => {
        $scope.payssionObj.country = item;
        $scope.payssionObj.methods = item.methods;
        $scope.payssionObj.payMethod = '';
        $scope.payssionObj.showList = false;
      }

      /* payssion选择支付方式 */
      $scope.payssionMethodFun = item => {
        $scope.payssionObj.showList = false;
        $scope.payssionObj.payMethod = item;
      }

      /* payssion搜索国家 */
      $scope.payssionSearchFun = () => {
        $scope.payssionCountryList.map(item => {
          item.isShow = true;
          if (item.name.indexOf($scope.payssionObj.search) == -1) {
            item.isShow = false
          }
        })
      }
      /* payssion确认支付 */
      $scope.payssionConfirm = () => {
        if (!$scope.payssionObj.payMethod) {
          return layer.msg('Please select a payment method.')
        }
        const retUrl = orderversion === '2' ? 'newmycj/dropshipping/orderManage' : 'myCJ.html#/drop-proce'
        layer.load(2);
        dsp.postFun('app/pay/payssionUrl', {
          orderNum: $scope.ordnumber,
          price: $scope.ordmoney,
          code: $scope.payssionCode,
          pm_id: $scope.payssionObj.payMethod,
          type: $scope.payType == 'paypal' ? '' : $scope.payType,
          returnUrl: `${location.origin}/${retUrl}`, // 重定向页面地址
          orderFlag
        }, (res) => {
          layer.closeAll();
          if (res.data.href) {
            imgHttpFun()//正常模式下 付款成功直接调用回调
            awinJS(res.data.href);
            // location.href = res.data.href;
          } else {
            layer.msg(res.data.message)
          }
        })
      }
      let midtransFun=()=> {
        const retUrl = orderversion === '2' ? 'newmycj/dropshipping/orderManage' : 'myCJ.html#/drop-proce'
        layer.load(2);
        dsp.postFun('app/payMidTrans/generateUrl', {
          orderNum: $scope.ordnumber,
          price: $scope.ordmoney,
          code: $scope.payssionCode,
          type: $scope.payType == 'paypal' ? '' : $scope.payType,
          returnUrl: `${location.origin}/${retUrl}`, // 重定向页面地址
          orderFlag
        }, (res) => {
          layer.closeAll();
          console.log(res.data)
          if (res.data.result=='true') {
            imgHttpFun()
            awinJS(res.data.redirect);
            // location.href = res.data.redirect;
          } else {
            layer.msg(res.data.message)
          }
        }, err => {
          console.log(err)
        })
      }
      //alipay支付
      let checkout = window.checkoutAli || null
      
      let alipayReady=()=>{
        if(!checkout){
          checkout = new AlipayConnectCheckout({
            clientId:$scope.alipayObj.id,
            intentPaymentAmount:{ //意向支付金额，用于获取可用的支付方式
              value: ($scope.ordmoney*100).toFixed(0),
              currency:"USD"
            },
            locale: "en_US", //语言类型, 用于SDK 语言的渲染
          })
          window.checkoutAli = checkout
        }
        
        checkout.getPaymentOptionsAndMethods().then(function(result) {
          // result 为返回的支付方式列表信息
          var paymentMethodsContainer = document.getElementById('paymentMethodsContainer')
          // 若返回的支付方式列表为空，可以将页面的渠道列表置灰，表示暂时不可用
          if (!result.length) {
            paymentMethodsList.addAttribute('class', 'disabled')
            return
          }
          // 渲染渠道列表
          var methods = []
          result.forEach(function (item) {
            methods.push('<li category="' + item.category + '">')
            methods.push('<div class="item"></div>')
            methods.push('<div id="' + item.category.toLowerCase() + '"></div>')
            methods.push('</li>')
          })
          paymentMethodsContainer.innerHTML = methods.join('');
          creatCard('CARD')
        }).catch(function (err) {
          console.log('Try again')
        })
      }
      var creatCard =  (category)=> {
        var element = '#' + category.toLowerCase()
        checkout.create('widget', {
          element: element,
          channelName: category,
          styles: {
            color: '#000000',
            borderRadius: '2px',
            fontFamily: '',
          },
          onHeightChange: function (res) {
            console.log(res.height, 'height index')
          },
          onReady: function () {
            // 商户可以在这里做收银台 ready 后的处理
          },
          onError: function (res) {
            // 商户可以在这里获取错误异常，并打印出来
          }
        })
      }
      $scope.checkoutRequest= () =>{
        checkout.confirmPay({
          clientPaymentToken: $scope.alipayObj.token,
          channelName: 'CARD',
        }).catch(res => {
          switch (res.errorCode) {
            case 'FORM_VALID_FAILED':
              // 这里处理表单校验失败
              break
            case 'TIME_OUT':
              // 这里处理网络超时
              break
          }
        })
      }
      let getAlipayToken=()=>{
        layer.load(2)
        dsp.postFun('app/pay/alipayToken', {
          orderNum: $scope.ordnumber,
          price: $scope.ordmoney,
          code: $scope.alipayCode,
          type: $scope.payType == 'paypal' ? '' : $scope.payType
        }, ({data}) => {
          layer.closeAll();
          if(!!data.result){
            // resolve('')
            // layer.msg(data.message)
            $scope.alipayErrObj = {
              showFlag: true,
              errText: data.message
            }
          }else{
            $scope.alipayObj.id=data.clientId;
            $scope.alipayObj.token=data.clientPaymentToken;
            alipayReady();
          }
        },err=>{
          layer.msg(err.message)
          layer.closeAll();
        })
      }

      let getCNYRate = () => {
        dsp.postFun('cj/homePage/exchangeRate', { toCode: 'CNY' }, res => {
          const { data: { result } } = res;
          if (!result) {
            $scope.CNYRateFail = true
            return
          };
          $scope.CNYRate = result;
          $scope.CNYRateFail = false
          $scope.showCNYmoney = Math.ceil($scope.ordmoney * result * 100) / 100
        })
      }

      // 获取stripe支付pk和sessionId 跳转到stripe支付页面
      let getStripePk = () => {
        const successUrl =  successPath
        let linkSuccessUrl;
        if (ordType == 'problemPackage') {
          linkSuccessUrl = `${location.origin}/${successUrl}//${$scope.ordnumber}`
        }
        if (ordType !== 'problemPackage' ) {
          linkSuccessUrl = `${location.origin}/${successUrl}/${$scope.ordnumber}`
        }
        if (successPath == 'newmycj/dropshipping/orderManage') {
          linkSuccessUrl = `${location.origin}/${successUrl}?orderCode=${$scope.ordnumber}`
        }
        layer.load(2)
        dsp.postFun('app/pay/stripePayment', {
          orderNum: $scope.ordnumber,
          price: $scope.ordmoney,
          code: $scope.stripeCode,
          type: $scope.payType,
          orderFlag,
          successUrl: linkSuccessUrl || `${location.origin}/${successUrl}`,
          cancelUrl: location.href,
        }, ({data}) => {
          layer.closeAll();
          if(!data.result) {
            if(data?.message == 'The order does not belong to you and cannot be paid.') {
              $scope.tokeFailFlag = true
              return
            }
            layer.msg(data?.message || 'Failed to obtain payment information from the seller. Please try again later.')
            // window.location.reload();
          } else {
            $scope.stripeObj = {
              orderId: data.orderId,
              stripePk: data.stripePk,
              sessionId: data.sessionId,
              stripeCode: $scope.stripeCode,
              payId: data.payId,
              showOrdId: $scope.ordnumber,
              paymentType: 'Stripe',
            }
            localStorage.setItem('stripeObj', base64.encode(JSON.stringify($scope.stripeObj)));
            let stripe = Stripe(data.stripePk);
            stripe.redirectToCheckout({ sessionId: data.sessionId });
          }
        },err=>{
          layer.msg(err.message)
          layer.closeAll();
        })
      }

      // 获取checkout支付的跳转链接
      let getCheckoutLink = () => {
        const successUrl =  successPath
        layer.load(2)
        dsp.postFun('app/pay/getCheckoutPayUrl', {
          orderNum: $scope.ordnumber,
          price: $scope.ordmoney,
          code: $scope.stripeCode,
          type: $scope.payType,
          otype: ordType == 'fba' ? '2' : '',
          orderFlag,
          successUrl: `${location.origin}/${successUrl}`,
          failureUrl: `${location.origin}/${failPath}`,
          cancelUrl: location.href,
        }, ({data}) => {
          layer.closeAll();
          if(data.code == 200) {
            $scope.checkoutObj = {
              orderId: data.data.orderId,
              showOrdId: $scope.ordnumber,
              stripeCode: $scope.stripeCode,
              payId: data.data.payId,
              paymentType: 'Checkout',
            }
            localStorage.setItem('checkoutObj', base64.encode(JSON.stringify($scope.checkoutObj)));
            window.location.href = data.data.href
          } else {
            layer.msg(data?.message || 'Oops, There is something wrong with this order, payment failed. Please contact your agent.')
          }
        },err=>{
          layer.msg(err.message)
          layer.closeAll();
        })
      }

      // 判断当前客户是否是欧洲客户
      function isEuoUser() {
        layer.load(2);
        dsp.postFun('payment/isEurope', {}, function ({data}) {
          layer.closeAll('loading');
          console.log(data)
          if(data&&data.code == 200) {
            // isEurope true为欧洲
           if(data?.data?.isEurope) {
            getCheckoutLink()
            return
           }
           getStripePk()
          } else {
            layer.msg(data?.message)
          }
        }, function (data) {
          layer.closeAll('loading');
        })
      }

      getCNYRate()

      // 退出登录
      function logoutHandle() {
        const token = base64.decode(localStorage.getItem('token') == undefined ? "" : localStorage.getItem('token'));
        dsp.postFun('app/platform/quitLogin', { "token": token }, function (n) {
          localStorage.removeItem('token');
          localStorage.removeItem('noEncodeToken');
          localStorage.removeItem('utmSource');
          // 退出登录清除cookie中的email
          console.log('退出在这儿，src/components/mycj-header/mycj-header.js');
          localStorage.removeItem('emailVerifyStatus');
          document.cookie = `emailVerifyStatus=0; domain=${__root__domain}`;
          localStorage.getItem('loginfromerp') && localStorage.removeItem('loginfromerp');
          dsp.delCookie('cjLoginName');
          dsp.delCookie('cjLoginToken');
          dsp.delAwcCookie('awc');
          location.href = "login.html"; // 去首页
        })
      } 
      /* 选择支付方式
       * 0：转账，1:paypal；2：余额；4：派安盈；5：payssion；6：midrans；7：西联银行; 8: 支付宝； 9：微信
       */
      $scope.choosePayFun = (item, index) => {
        dsp.postFun('app/pay/checkUserStatus',{},({data})=>{
          if(data.code ==200){
            console.log('选择支付');
            $scope.payIndexType = item.type;
            if (item.type == 'paypal' && (!$scope.paypalObj.url || $scope.paypalObj.url.indexOf('https') < 0)) {
              paypalFun();
            }else if (item.type == 'card' && !$scope.widthCardObj.isGet) {
              // getStripePk();
            }else if(item.type=='alipay'){
              if($scope.alipayObj.token){
                alipayReady();
              }else{
                getAlipayToken();
              }
            } else if (item.type=='newAlipay') {
              getCNYRate()
              // getQrCode()
            } else if (item.type=='wechat') {
              getCNYRate()
              // getQrCode()
            }
          }else{
            layer.msg(data.msg || '')
            logoutHandle();
          }
        });
        
      }

      // let getQrCode = () => {
      //   dsp.postFun('app/pay/getQrCode', {}, function ({data}) {
      //     if (data.code == 200) {
      //       $scope.newAlipayObj.qrCode = data.data.alipayQrCode
      //       $scope.wechatObj.qrCode = data.data.wechatQrCode
      //     }
      //   })
      // }

      $scope.getCNYRate = () => {
        getCNYRate()
      }
      //获取url参数
      function queryUrlParams(href){
        if(href && href.indexOf('?') != -1){
          let hrefParamsObj = {};
          let queryStr = href.substr(1) //substr()方法返回从参数值开始到结束的字符串；
          let queryStrs = queryStr.split('&')
          for (let i = 0; i < queryStrs.length; i++) {
            hrefParamsObj[queryStrs[i].split('=')[0]] = queryStrs[i].split('=')[1]
          }
          return hrefParamsObj
        }
        return false
      }
      /* 支付按钮
       * 0：转账，1:paypal；2：余额；4：派安盈；5：payssion；6：midrans；7：西联银行
       */
      $scope.payFun = () => {
        if ($scope.payIndexType && !$scope.selectTermsFlag) {
          return layer.msg('For your interests, please read and agree the User Agreement, Privacy Policy and Refund, Resend and Returns Policy.')
        }
        if ($scope.payIndexType == 'wire') {
          $scope.transferObj.isShow = true;
        } else if ($scope.payIndexType == 'paypal') {
          //未获取到paypal支付链接重新获取
          if ($scope.paypalObj.url && $scope.paypalObj.url.indexOf('https') >= 0) {
            let resHrefParams = queryUrlParams($scope.paypalObj.url)
            if(resHrefParams && resHrefParams.token){
              localStorage.setItem(`_paypal_${resHrefParams.token}`,JSON.stringify({awinAmount:$scope.ordmoney,awinRef:$scope.ordnumber}))
            }
            location.href = $scope.paypalObj.url;
          } else {
            paypalFun();
          }
        } else if ($scope.payIndexType == 'credit') {
          $scope.storeCreditObj.isShow = true;
        } else if ($scope.payIndexType == 'card') {
          isEuoUser()
        } else if ($scope.payIndexType == 'paynner') {
          // 派安盈支付
          $scope.payoneerPayNew()
          //$scope.payoneerPay()
        } else if ($scope.payIndexType == 'payssion') {
          $scope.payssionObj.isShow = true;
          $scope.payssionObj.showList = false;
          $scope.payssionObj.search = '';
          if (Object.keys($scope.payssionObj.country).length == 0) {
            payssionShowFun();
          }
        } else if ($scope.payIndexType == 'midtrans') {
          midtransFun();
        } else if ($scope.payIndexType == 'western') {
          $scope.transferXLObj.isShow = true;//西联银行支付
        } else if($scope.payIndexType=='alipay'){
          if($scope.alipayObj.token){
            alipayReady();
          }else{
            getAlipayToken();
          }
          $scope.alipayObj.isShow=true;
        } else if($scope.payIndexType == 'newAlipay'){
          $scope.deTime = { m: 15, s: 0 }
          $scope.newAlipayObj.isShow = true
          $scope.modalConfirmPay()
        } else if($scope.payIndexType == 'wechat'){
          $scope.deTime = { m: 15, s: 0 }
          $scope.wechatObj.isShow = true
          $scope.modalConfirmPay()
        } else if (!$scope.payIndexType) {
          layer.msg('Please choose a payment method first.')
        }
      }

      $scope.cancelPay = () => {
        $scope.newAlipayObj.isShow = false
        $scope.wechatObj.isShow = false
        document.getElementById('qrCode').innerHTML = ''
        $scope.timers && clearInterval($scope.timers)
        $scope.timeoutTimer && clearTimeout($scope.timeoutTimer)
        $scope.deTime = { m: 0, s: 0 }
      }

      $scope.cancelSuccessPay = () => {
        $scope.newAlipayObj.isShowSucc = false
        $scope.wechatObj.isShowSucc = false
      }

      $scope.jumpToOther = () => {
        location.href = successPath
      }

      $scope.deletePic = (event) => {
        event.stopPropagation()
        event.preventDefault()
        document.getElementById('document3').value = ''
        $scope.headimg = ""
        $scope.imgArr = []
      }

      $scope.deTime = { m: 15, s: 0 }

      $scope.loopPaySuccess = () => {
        if(($scope.deTime.m + $scope.deTime.s) == 0) {
          return
        }
        $scope.timeoutTimer && clearTimeout($scope.timeoutTimer)
        $scope.timeoutTimer = setTimeout(() => {
          dsp.postFun('app/pay/getPayResult',{ orderId: $scope.orderId, awc: dsp.getCookie("awc") || '', price:  $scope.ordmoney,
          orderNum: $scope.ordnumber },function ({data}) {
            if(data.data.status == 1) {
              $scope.loopPaySuccess()
            } else if(data.data.status == 2) {
              layer.msg(data.data.returnMsg)
            } else if(data.data.status == 3) {
              layer.msg('Payment Succeed')
              $scope.payStatus = data.data.status
              $scope.timers && clearInterval($scope.timers)
              awinJS();
              imgHttpFun();//微信支付成功
              setTimeout(() => {
                $scope.jumpToOther()
              },5000)
            }
          })
        }, 3000)
      }

      $scope.refreshQrcode = () => {
        $scope.deTime = { m: 15, s: 0 }
        $scope.loopPaySuccess()
        $scope.runTime()
      }

      $scope.runTime = () => {
        $scope.timers = setInterval(()=>{
          if($scope.deTime.s == 0 && $scope.deTime.m >= 1) {
            $scope.deTime.s = 59
            $scope.deTime.m -= 1
          } else if(($scope.deTime.s + $scope.deTime.m) == 0) {
            clearInterval($scope.timers)
          } else {
            $scope.deTime.s -= 1
          }
          $scope.$apply()
        }, 1000)
      }
      
      /**支付宝，微信支付 */
      $scope.modalConfirmPay = () => {
        let payData = {
          price: $scope.payIndexType == 'newAlipay' ? $scope.newAlipayObj.showAmount : $scope.wechatObj.showAmount,
          orderNum: $scope.ordnumber,
          code: $scope.payIndexType == 'newAlipay' ? $scope.newAlipayObj.payCode : $scope.wechatObj.payCode,
          type: $scope.payType,
          otype: (ordType == 'fba') ? '2' : '',
          orderType: $scope.orderType ? $scope.orderType : '',
          payPrice: $scope.showCNYmoney,
          // payPrice: 0.01,
          tradeType: 1, // 为native
          currencyType: 0,
          orderFlag
        };

        if($scope.payIndexType == 'newAlipay') payData.paymentMethod = 2 // 支付宝
        if($scope.payIndexType == 'wechat') payData.paymentMethod = 3 // 微信
        layer.load(2)
        dsp.postFun('app/pay/pay', JSON.stringify(payData), function (data) {
          layer.closeAll('loading');
          if(!!data.data.payUrl && !!data.data.orderId) {
            $scope.orderId = data.data.orderId
            $scope.qrcode = new window.QRCode('qrCode', {
              text: data.data.payUrl,
              width: 254,
              height: 254,
              colorDark : '#000000',
              colorLight : '#ffffff',
              correctLevel : QRCode.CorrectLevel.H
            }); 
            $scope.loopPaySuccess()
            $scope.runTime()
          } else {
            layer.msg('Sorry, you cannot pay with WeChat. Please use other payment methods.  ')
          }
        }, function (data) {
          layer.closeAll('loading');
        })
      }
      // Switch 开关,type:1-普通转账；2-西联银行转账
      $scope.switchClick = ($event, type) => {
        const elm = $event.currentTarget
        let amount = $scope.ordmoney;
        if (elm.children[0].checked) {
          elm.children[0].checked = false;
          elm.classList.remove("is-checked")
          $scope.switchCheck = false;
          type == 1 ? $scope.transferObj.showPrice = amount : $scope.transferXLObj.showPrice = amount;
          type == 1 ? $scope.transferObj.unit = 'USD' : $scope.transferXLObj.unit = 'USD';
        } else {
          layer.load(2)
          dsp.postFun('cj/homePage/exchangeRate', {
            toCode: 'EUR'
          }, (res) => {
            if (res.data.statusCode == '200') {
              layer.closeAll();
              elm.children[0].checked = true;
              elm.classList.add("is-checked")
              $scope.switchCheck = true;
              $scope.eurPayReminderModal.isShow = true;
              $scope.exchangeRate = res.data.result;
              amount = ($scope.ordmoney * $scope.exchangeRate).toFixed(2);
              type == 1 ? $scope.transferObj.showPrice = amount : $scope.transferXLObj.showPrice = amount;
              type == 1 ? $scope.transferObj.unit = 'EUR' : $scope.transferXLObj.unit = 'EUR';
            } else {
              console.warn('获取汇率失败', res);
            }
          }, (err) => {
            layer.closeAll();
            console.log("get error")
          });
        }
      }

      //awin转换标签
      function awinJS (successPageLink) {
        let awcText = dsp.getCookie('awc')
        let utmSource = localStorage.getItem('utmSource');
        if(awcText && utmSource == 'awin'){//有awin的awc值 并且登录平台来源是awin
          let content = '<script >'+
             ' var AWIN = {};' + 
             '  AWIN.Tracking = {};' +
             ' AWIN.Tracking.Sale = {};' +
             ' AWIN.Tracking.Sale.amount =' + $scope.ordmoney + ';' +
             ' AWIN.Tracking.Sale.orderRef ="' + $scope.ordnumber+ '";' +
             ' AWIN.Tracking.Sale.parts  ="' + "DEFAULT:" + $scope.ordmoney+ '";' +
             'AWIN.Tracking.Sale.currency = "USD";'+
             ' AWIN.Tracking.Sale.test = "' + awinTesMode + '";'+
             'AWIN.Tracking.Sale.channel = "aw";'+
              // ' AWIN.Tracking.Sale.click ="' + awcText + '";'+
             +'<\/script>'
          $('body').append(content);
          // $.getScript("https://www.dwin1.com/21578.js",function(res,status){
          //   console.log("加载完毕",res,status,'================');
          // })
          let osrc = 'https://www.dwin1.com/21578.js';
          let script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = osrc;
          document.getElementsByTagName('body')[0].appendChild(script);
          script.addEventListener('load', (e) => {
            if(successPageLink){
              setTimeout(function(){
                location.href = successPageLink;
              },1000)
            }
          })
        }else{
          if(successPageLink){
            location.href = successPageLink;
          }
        }
      }

      $scope.selectTermsFun = () => {
        $scope.selectTermsFlag = !$scope.selectTermsFlag
      }
   

    }]);

  return app;
}
