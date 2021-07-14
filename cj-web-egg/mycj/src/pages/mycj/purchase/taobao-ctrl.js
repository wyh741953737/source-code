import { pageFun } from '../mycj-common';
import { NODE_ENV } from '@root_egg/env';
const awinTesMode = ['testnew', 'development', 'test'].includes(NODE_ENV) ? 1 : 0;
export default function ($scope, $rootScope, dsp, $stateParams,$state,$sce) {
  const base64 = $rootScope.base64;
  dsp.setRightMinHeight();
  $scope.searchStr = '';
  $scope.pageSize = '10';
  $scope.pageNum = '1';
  $scope.totalNum = 0;
  $scope.totalPageNum = 0;
  var defaultFlag = true;
  $scope.State = '';
  $scope.type = $stateParams.type;
  $scope.content = 'Are you sure to cancel the order??';
  console.log($scope.type);
  if ($scope.type == 'Pending') {
    $scope.State = '3';
    defaultFlag = false;
  } else if ($scope.type == 'Paid') {
    $scope.State = '10'
    defaultFlag = false;
  } else if ($scope.type == 'Competed') {
    $scope.State = '13'
    defaultFlag = false;
  } else if ($scope.type == 'Shipped') {
    $scope.State = '6'
    defaultFlag = false;
  } else if ($scope.type == 'Processing') {
    $scope.State = '111'
    defaultFlag = false;
  } else {
    $scope.State = ''
    defaultFlag = false;
  }
  console.log($scope.State)
  $scope.handlerResult = {
    fenkaifahuo: { name: '分开发货', key: '1' },
    tihuan: { name: '缺货商品替换', key: '2' },
    partRefund: { name: '缺货商品退款', key: '3' },
    allRefund: { name: '全部商品退款', key: '4' },
  }

  $rootScope.$on('app/externalPurchase/selectPayOrderList', (_, bool) => {
    $scope.loading = bool;
    if (bool) {
      $scope.notDataFound = false;
    }
  });

  function getList(dsp, $scope) {
    var sendJson = {};
    sendJson.page = $scope.pageNum;
    sendJson.pageNum = $scope.pageSize;
    sendJson.searchParam = $scope.searchStr;
    sendJson.status = $scope.State;
    //sendJson.impStorageFlag = '';

    // dsp.load();
    $scope.purchaseList = [];
    dsp.postFun('app/externalPurchase/selectPayOrderList', JSON.stringify(sendJson), function (data) {
      // dsp.closeLoad();
      console.log(data);
      if ($scope.brunchItem) {
        $scope.brunchItem.path = data.data.path;
      }
      var result = data.data.orderList || [];
      $scope.purchaseList = result
      $scope.totalNum = data.data.totalNum;
      $scope.totalPageNum = Math.ceil($scope.totalNum / $scope.pageSize);
      if ($scope.totalNum == 0 || $scope.purchaseList.length === 0 ) {
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
  
  $scope.$on('pagedata-fa', function (d, data) {
    $scope.pageNum = data.pageNum;
    $scope.pageSize = data.pageSize;
    getList(dsp, $scope)
  })
  
  //
  $scope.Statechange = function () {
    $scope.pageNum = '1';
    getList(dsp, $scope);
  }
  var href = window.location.href;
  if (href.indexOf('?') >= 0) {
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
  $scope.search = function () {
    $scope.searchFlag = true;
    $scope.pageNum = '1';
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
    $state.go('mycj-purchase', { id:item.id, orderType: 'taobao' });
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
    });
  }
  $scope.cancelOrder = function (item, index) {
    $scope.cancelOrderFlag = true;
    $scope.operateItem = item;
    $scope.operateItem.index = index;
  }
  // 获取弹窗组件关闭按钮
  $scope.$on('closePopUps', (e, data) => {
    $scope.cancelOrderFlag = data.showPopUps;
  })
  // 获取弹窗组件确定按钮
  $scope.$on('confirmPopUps', (e, d) => {
    goConfirmCancel();
  })

  function goConfirmCancel() {
    dsp.postFun('app/buyOrder/removeOrderUNPAY', JSON.stringify({ id: $scope.operateItem.id }), function (data) {
      console.log(data);
      if (data.data.code == 200) {
        layer.msg('Cancel order successfully');
        $scope.purchaseList.splice($scope.operateItem.index, 1);
        $scope.cancelOrderFlag = false;
        $scope.operateItem = null;
      } else {
        layer.msg('Cancel order failed');
      }
    });
  }

  //发票按钮事件
  $scope.invoiceFun = function (id, type) {
    console.log(id, type);
    dsp.isinvoiceDialog(id, type);
  }
  
  // 处理纠纷后的监听
  $scope.$on('disputeSuccess', (e, id) => {
    $scope.purchaseList = $scope.purchaseList.map(obj => ({
      ...obj,
      disputeId: obj.id === id ? '0' : obj.disputeId
    }));
  })
  
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
  let payItem;
  $scope.countryTipFun = (item)=>{
    payItem = item;
    const msgLoading = cjMessage.loading({ isFixed: true })
    dsp.postFun('app/dispute/getTipsListByType',{}, data =>{
      msgLoading.hide();
      let oresult = data.data.result?JSON.parse(data.data.result):'';
      if(oresult){
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
}
