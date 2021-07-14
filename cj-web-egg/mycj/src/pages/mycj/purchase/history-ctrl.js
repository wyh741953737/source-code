import { pageFun } from '../mycj-common';
import { NODE_ENV } from '@root_egg/env';
const awinTesMode = ['testnew', 'development', 'test'].includes(NODE_ENV) ? 1 : 0;
export default function ($scope, $rootScope, dsp, $sce, $stateParams) {
  const base64 = $rootScope.base64;
  dsp.setRightMinHeight();
  $scope.className = function (name) {
    if (name) {
      if (name == 'USAStorage') {
        return 'Chino, USA';
      } else {
        return name + ', China';
      }
    } else {
      return '';
    }

  }
  $scope.searchStr = '';
  $scope.pageSize = '10';
  $scope.pageNum = '1';
  $scope.totalNum = 0;
  $scope.totalPageNum = 0;
  var defaultFlag = true;
  $scope.handlerResult = {
    fenkaifahuo: { name: '分开发货', key: '1' },
    tihuan: { name: '缺货商品替换', key: '2' },
    partRefund: { name: '缺货商品退款', key: '3' },
    allRefund: { name: '全部商品退款', key: '4' },
  }
  // 复制sku
  // $scope.showCopy = (item) => {
  //   const id = item.id || item.ID;
  //   if(String(id) && String(id).startsWith('ZF')) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  // }
  $scope.handleCopy = (sku) => {
    if(sku) {
      const input = document.getElementById('copySku');
      input.setAttribute('value', sku);
      input.select();
      document.execCommand('copy');
      layer.msg('Copied Successfully');
      // $scope.showCopy = false;
    }
  }

  $rootScope.$on('app/buyOrder/selectPayOrderList', (_, bool) => {
    $scope.loading = bool;
    if (bool) {
      $scope.notDataFound = false;
    }
  });
  $scope.ordLogFun = function(id){
    const tempWindow = window.open('_blank');
    tempWindow.location = '#/order-log/'+id
  }
  $scope.queryLogsFun = function(id){
    let paramsObj = {
      "orderCode": id
    }
        const msgLoading = cjMessage.loading({ isFixed: true });
    dsp.postFun('cj/orderOperationLog/queryLogList',paramsObj,function(data){
      // dsp.closeLoad();
      msgLoading.hide();
      let resObj = data.data;
      if(resObj.statusCode == 200){
        $scope.logData = resObj.result;
        $scope.ordLogFlag = true;
      }
    },function(data){
      // dsp.closeLoad();
      msgLoading.hide();
    })
  }
  // $scope.purchaseList = [];
  function getList(dsp, $scope) {
    var sendJson = {};
    sendJson.page = $scope.pageNum;
    sendJson.pageNum = $scope.pageSize;
    sendJson.searchParam = $scope.searchStr;
    // dsp.load();
    $scope.purchaseList = [];
    dsp.postFun('app/buyOrder/selectPayOrderList', JSON.stringify(sendJson), function (data) {
      // dsp.closeLoad();
      console.log(data);
      if ($scope.brunchItem) {
        $scope.brunchItem.path = data.data.path;
      }
      var result = data.data.orderList || [];
      $scope.purchaseList = result
      $scope.totalNum = data.data.totalNum;
      $scope.totalPageNum = Math.ceil($scope.totalNum / $scope.pageSize);
      if ($scope.totalNum == 0 || $scope.purchaseList.length === 0) {
        $scope.purchaseList = [];
        if (defaultFlag) {
          $scope.noData = true;
          defaultFlag = false;
        } else {
          $scope.noData = false;
          $scope.notDataFound = true;
        }
        return;
      }
      defaultFlag = false;
 
      $scope.$broadcast('page-data', {
        pageNum: $scope.pageNum,
        totalNum: $scope.totalPageNum,
        totalCounts: $scope.totalNum,
        pageSize: $scope.pageSize
      });
    });
  }

  $scope.showPoint = (item) => {
    const type = item.id ? item.id.slice(0,2) : '';
    let trackingNumber = item.trackingNumber;
    if(type === 'SY') {
      trackingNumber = 'Private Inventory';
    } if(type === 'ZF' && !trackingNumber) {
      trackingNumber = '--';
    }
    return trackingNumber;
  }

   //获取url中的参数方法
   function getUrlParamByKey (href, key) {
    if(!href) return ''
    var vars = href.split("&");
    for (var i = 0;i < vars.length; i++) {
      var pair = vars[i].split("=");
      if(pair[0] == key) { return pair[1]; }
    }
  }
  $scope.$on('pagedata-fa', function (d, data) {
    $scope.pageNum = data.pageNum;
    $scope.pageSize = data.pageSize;
    getList(dsp, $scope)
  })
  function initIsCheckout() {
    // 判断当前是否存在ckosessionid
    $scope.ckoSessionId = base64.decode(localStorage.getItem('ckoSessionId') || '') && JSON.parse(base64.decode(localStorage.getItem('ckoSessionId') || ''))
    if($scope.ckoSessionId) {
      getList(dsp, $scope)
      getCheckoutTrade()
      return 
    }
    var href = window.location.href;
    if (href.indexOf('?') >= 0) {
      const regexp = /\?[\w\W]*\#/
      $scope.sessionId = getUrlParamByKey(href.match(regexp) && href.match(regexp)[0].slice(1,-1),'cko-payment-id') || getUrlParamByKey(href.match(regexp) && href.match(regexp)[0].slice(1,-1),'cko-session-id')
      if($scope.sessionId) {
        localStorage.setItem('ckoSessionId', base64.encode(JSON.stringify($scope.sessionId)));
        // 后端接口返回状态较慢，延迟一秒再刷新当前页面
        let timer = setTimeout(() => {
          clearTimeout(timer)
          window.location.href = window.location.origin + '/myCJ.html#/purchase-history'
        }, 200)
        getList(dsp, $scope)
        return
      }
      var hrefArr = href.split('?');
      console.log(hrefArr)
      var paydataArr = hrefArr[1].split('&')
      var lengthPay = paydataArr.length;
      console.log(paydataArr)
      console.log(lengthPay)
      if (lengthPay == 3) {
        var paymentArr = paydataArr[0].split('=');
        var tokenArr = paydataArr[1].split('=');
        var payidArr = paydataArr[2].split('=');
  
        var payCS = {};
        payCS.paymentId = paymentArr[1];
        payCS.token = tokenArr[1];
        payCS.payerID = payidArr[1];
        payCS.code = 4;
        payCS.awc = dsp.getCookie("awc") || '';
  
        console.log(payCS)
        console.log(JSON.stringify(payCS))
        var isToken = localStorage.getItem('payToken');
        console.log(isToken)
        if (isToken == tokenArr[1]) {
          getList(dsp, $scope);
          return;
        } else {
          dsp.postFun('app/pay/pay', JSON.stringify(payCS), function (data) {
            console.log(data)
            if (data.data.result !== true) {
              layer.msg('Payment Failed')
              getList(dsp, $scope);
            } else {
              layer.msg('Payment Succeed')
              localStorage.setItem('payToken', tokenArr[1])
              getList(dsp, $scope);
  
              //awin 发送支付成功fall-back
              let awinLocalParams = null;
              try {
                awinLocalParams = JSON.parse(localStorage.getItem(`_paypal_${payCS.token}`))
                console.log(awinLocalParams)
              } catch(err) { console.log('解析错误'); }
              if(awinLocalParams){
                function awinJS () {
                  let content = '<script >'+
                      ' var AWIN = {};' + 
                      '  AWIN.Tracking = {};' +
                      ' AWIN.Tracking.Sale = {};' +
                      ' AWIN.Tracking.Sale.amount =' + awinLocalParams.awinAmount + ';' +
                      ' AWIN.Tracking.Sale.orderRef ="' + awinLocalParams.awinRef+ '";' +
                      ' AWIN.Tracking.Sale.parts  ="' + "DEFAULT:" + awinLocalParams.awinAmount+ '";' +
                      'AWIN.Tracking.Sale.currency = "USD";'+
                      ' AWIN.Tracking.Sale.test = "' + awinTesMode + '";'+
                      'AWIN.Tracking.Sale.channel = "aw";'+
                      +'<\/script>'
                    $('body').append(content);
                    let osrc = 'https://www.dwin1.com/21578.js';
                    let script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = osrc;
                    document.getElementsByTagName('body')[0].appendChild(script);
                }
  
                function imgHttpFun(){
                  let orderCountMoney = awinLocalParams.awinAmount.toFixed(2)
                  let BasketImage = new Image(1,1);
                  BasketImage.src = `https://www.awin1.com/sread.img?tt=ns&tv=2&merchant=21578&amount=${orderCountMoney}&ch=aw&parts=DEFAULT:${orderCountMoney}&cr=USD&ref=${awinLocalParams.awinRef}&tesmode=${awinTesMode}`;
                  localStorage.removeItem(`_paypal_${payCS.token}`)
                }
                let awcText = dsp.getCookie('awc')
                let utmSource = localStorage.getItem('utmSource');
                if(awcText && utmSource == 'awin'){//有awin的awc值 并且登录平台来源是awin
                  awinJS()
                  imgHttpFun()
                }
              }
            }
          }, function (data) {
            console.log(data)
          })
        }
      }
      if (lengthPay < 3) {
        layer.msg('Payment Failed')
        getList(dsp, $scope);
      }
    } else {
      getList(dsp, $scope);
    }
  }
  
  initIsCheckout()
  $scope.search = function () {
    $scope.pageNum = '1';
    $scope.searchFlag = true;
    getList(dsp, $scope);
  }
  $scope.enterSearch = function (e) {
    $scope.searchFlag = true;
    $scope.pageNum = '1';
    if (e.keyCode == 13) {
      getList(dsp, $scope);
    }
  }

  $scope.payMoney = function () {
    let item = payItem;
    console.log(item);
    location.href = 'myCJ.html?route=payment#/payment/' + base64.encode(item.id) + '/' + base64.encode(item.orderMoney + '') + '/' + base64.encode('1') + '/DIRECT';
  }
  $scope.confirmReceive = function (item, index) {
    $scope.confirmReceiveFlag = true;
    $scope.operateItem = item;
    $scope.operateItem.index = index;
  }
  $scope.goConfirmRexeive = function () {
    dsp.postFun('app/buyOrder/updateOrderDone', JSON.stringify({ id: $scope.operateItem.id }), function (data) {
      console.log(data);
      layer.msg('Confirm received successfully');
      $scope.purchaseList[$scope.operateItem.index].status = 7;
      $scope.confirmReceiveFlag = false;
      $scope.operateItem = null;
      // if (data.data.code == 200) {
      //     layer.msg('Confirm successfully');
      //     $scope.purchaseList[$scope.operateItem.index].status = 7;
      // } else {
      //     layer.msg('Confirm failed');
      // }
    });
  }
  $scope.cancelOrder = function (item, index) {
    $scope.cancelOrderFlag = true;
    $scope.operateItem = item;
    $scope.operateItem.index = index;
  }
  $scope.goConfirmCancel = function () {
    const msgLoading = cjMessage.loading({ isFixed: true });
    dsp.postFun('app/buyOrder/removeOrderUNPAY', JSON.stringify({ id: $scope.operateItem.id }), function (data) {
      console.log(data);
      msgLoading.hide();
      if (data.data.code == 200) {
        layer.msg('Cancel order successfully');
        $scope.purchaseList.splice($scope.operateItem.index, 1);
        $scope.cancelOrderFlag = false;
        $scope.operateItem = null;
      } else {
        layer.msg('Cancel order failed');
      }
    }, function() {
      msgLoading.hide();
    });
  }

  //发票按钮事件
  $scope.invoiceFun = function (id, type) {
    console.log(id, type);
    dsp.isinvoiceDialog(id, type);
  }

   // 查看详情（拒绝原因）
   $scope.handleViewDetail = item =>{
    const msgLoading = cjMessage.loading({ isFixed: true })
    dsp.postFun('order/payRefuseOrder/getPayOrderRefuse', {payOrderId:item.id}, ({data}) =>{
      msgLoading.hide()
      if (data.statusCode === '200'){
        $scope.isRefuseFlag = true
        $scope.refusReason = data.result.refuseReason
      }
    }, err =>{
      msgLoading.hide()
      console.log(err);
    })
  
  }
  
  // 处理纠纷后的监听
  $scope.$on('disputeSuccess', (e, id) => {
    $scope.purchaseList = $scope.purchaseList.map(obj => ({
      ...obj,
      disputeId: obj.id === id ? '1' : obj.disputeId
    }));
    console.log($scope.purchaseList);
  })
  let payItem;
  $scope.countryTipFun = (item)=>{
    // 是否验证邮件处理
    if (dsp.isVerifyEmail()) return
    payItem = item;
    const msgLoading = cjMessage.loading({ isFixed: true })
    dsp.postFun('app/dispute/getTipsListByType',{}, data =>{
      msgLoading.hide();
      let oresult = data.data.result?JSON.parse(data.data.result):'';
      if(oresult){
        console.log($sce)
        $scope.holidayTips = {
          title:oresult.title,
          content:$sce.trustAsHtml(oresult.content)
        }
        $scope.showCountryTip=true;
      }else{
        $scope.payMoney();
      }
      
    },err=>{
      msgLoading.hide();
    })
  }

  //查看 缺货 已退款/已换货信息
  $scope.showStockout = (item, type) => {
    console.log(item)
    let params = { type } 
    if(type === 'refund' ) {
      params = {
        ...params,
        refundTime: +item.refundTime,
        refundAmount: item.refundAmount
      }
    } else if (type === 'barter') {
      params = {...params, originalSku: item.originalSku }
    }
    $scope.$broadcast('stockout-notice', params);
  }

  // stripe和checkuot交易状态查询
  function stripeTradeQuery(parmas) {
    layer.load(2)
    dsp.postFun('app/pay/stripeTradeQuery', parmas, ({data}) => {
      layer.closeAll('loading')
      if(data.code == 200) {
        $scope.stripeStatus = +data.data
        if(parmas && parmas.paymentType === 'Stripe') {
          /** 1待支付 2支付中 3支付成功 4支付失败 5支付异常 6支付取消 */
          switch(+data.data) {
            case 1:  
              layer.msg('Awaiting payment confirmation. Please refresh and check it later.');
              break;
            case 2: 
              layer.msg('Awaiting payment confirmation. Please refresh and check it later.');
              break
            case 3: 
              layer.msg('Payment Successful.');
              break;
            case 4: 
              layer.msg('Payment via Stripe failed. Please try again.');
              break;
            case 5: 
              layer.msg('Payment via Stripe failed. Please try again.');
              break;
            case 6: 
              layer.msg('Payment via Stripe failed. Please try again.');
              break;
            default:  ''
          }
        }
        if(parmas && parmas.paymentType === 'Checkout') {
          /** 1待支付 2支付中 3支付成功 4支付失败 5支付异常 6支付取消 */
					switch(+data.data) {
						case 1:  
							layer.msg('Awaiting Payment.');
							break;
						case 2: 
							layer.msg('Awaiting payment confirmation. Please refresh and check it later.');
							break;
						case 3: 
							layer.msg('Payment Successful.');
							break;
						case 4: 
							layer.msg('Payment via CheckOut failed. Please try again.');
							break;
						case 5: 
							layer.msg('Payment via CheckOut failed. Please try again.');
							break;
						case 6: 
							layer.msg('Payment Cancelled.');
							break;
						default: break;
          }
          // window.location.href = window.location.origin + '/myCJ.html#/purchase-history'
          getList(dsp, $scope);
        }
      } else {
        return layer.msg(data.msg)
      }
    }, err => {
      console.log(err);
    })
  }

 

  // stripe交易状态查询
  function getStripeTrade() {
    const stripeObj = base64.decode(localStorage.getItem('stripeObj') || '') && JSON.parse(base64.decode(localStorage.getItem('stripeObj') || ''));
    localStorage.removeItem('stripeObj')
    if(!(stripeObj && stripeObj.orderId)) {
      return
    }
    const ordid = $stateParams.ordid;
    if(ordid !== stripeObj.showOrdId) {
      return
    }
    const parmas = {
      'orderId': stripeObj && stripeObj.orderId,
      'code': stripeObj && stripeObj.stripeCode,
      'payId': stripeObj && stripeObj.payId,
      'paymentType': stripeObj && stripeObj.paymentType,
    }
    stripeTradeQuery(parmas)
  }
  getStripeTrade()

  // checkout交易状态查询
  function getCheckoutTrade() {
    const checkoutObj = base64.decode(localStorage.getItem('checkoutObj') || '') && JSON.parse(base64.decode(localStorage.getItem('checkoutObj') || ''));
    localStorage.removeItem('checkoutObj')
    localStorage.removeItem('ckoSessionId')
    if(!(checkoutObj && checkoutObj.paymentType === 'Checkout')) {
      return
    }
    const parmas = {
      'orderId': checkoutObj && checkoutObj.orderId,
      'code': checkoutObj && checkoutObj.stripeCode,
      'paymentType': checkoutObj && checkoutObj.paymentType,
      'payId': checkoutObj && checkoutObj.payId,
      'sessionId': $scope.ckoSessionId
    }
    stripeTradeQuery(parmas)
  }
  
}
