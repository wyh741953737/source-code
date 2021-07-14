export function orderDetailFactory(angular) {
  const app = angular.module('order-detail.module', []);

  app.controller('order-detail.ctrl', ['$scope', '$stateParams', '$timeout', 'dsp', '$filter',
    function ($scope, $stateParams, $timeout, dsp, $filter) {
      $scope.routeList = []
      $scope.showShip = false;
      $scope.handlerResult = {
        fenkaifahuo: { name: '分开发货', key: '1' },
        tihuan: { name: '缺货商品替换', key: '2' },
        partRefund: { name: '缺货商品退款', key: '3' },
        allRefund: { name: '全部商品退款', key: '4' },
      }
      //获取订单id
      $scope.orderId = $stateParams.id;
      var istrackFlag = $stateParams.istrackFlag;
      $scope.status = $stateParams.status;
      $scope.orderType = $stateParams.orderType;
      $scope.isVip = localStorage.getItem('vip')
      // 控制显示跳转提示
      $scope.showPrompt = false
      var getDetailUrl;
      let detailParam = {
        orderNumber: $scope.orderId
      }
      if ($scope.orderType == 'DIRECT') {
        getDetailUrl = 'app/buyOrder/getOrderView';
      } else {
        getDetailUrl = 'app/order/getOrderView'; //app/order/getOrderView
        detailParam.status=$scope.status||'';
      }
      // layer.load(2);
      const msgLoading = cjMessage.loading({ isFixed: true })
      dsp.postFun(getDetailUrl, detailParam, function (data) {
        msgLoading.hide();
        const { product, order } = data.data
        $scope.productList = product.map(item=>{
          item.showChild=false;
          return item;
        });//商品列表

        // 如果有订单使用
        if(order.find(v => v.couponOrderProductAmount)){
          $scope.showPrompt = true
        }
        $scope.ordList = order//订单列表
        if ($scope.orderType == 'DIRECT') {
          $scope.dateTime = $scope.ordList[0].pDate ? $scope.ordList[0].pDate : $scope.ordList[0].cDate
        } else {
          let dateTime = $scope.ordList[0].createDate.time ? $scope.ordList[0].createDate.time : $scope.ordList[0].paymentDate.time;
          $scope.dateTime = dateTime ? ($filter('date')(+dateTime, 'yyyy-MM-dd HH:mm:ss')) : ''
        }
        $scope.ordAmount = $scope.ordList[0].AMOUNT;//订单总金额
        $scope.ordCouponAmount = $scope.ordList[0].couponAmount;//订单折扣后总金额
        $scope.ordmoney = $scope.ordList[0].ORDER_AMOUNT;//订单金额
        $scope.ordCouponMoney = $scope.ordList[0].couponOrderAmount;// 订单折扣后金额
        $scope.ordWeight = parseFloat(((parseFloat($scope.ordList[0].ORDERWEIGHT)) / 1000).toFixed(3));//订单里所有产品的总重量
        $scope.wlmoney = $scope.ordList[0].POSTAGE;//订单物流费用
        $scope.customeName = $scope.ordList[0].CUSTOMER_NAME;//客户名称
        $scope.country = $scope.ordList[0].COUNTRY_CODE;//国家缩写
        $scope.provence = $scope.ordList[0].PROVINCE;//省份
        $scope.city = $scope.ordList[0].CITY;//城市
        $scope.zip = $scope.ordList[0].ZIP;//邮编
        $scope.phone = $scope.ordList[0].PHONE;//电话
        $scope.wlfs = $scope.ordList[0].LOGISTIC_NAME;//物流方式
        $scope.address1 = $scope.ordList[0].SHIPPING_ADDRESS//地址1
        $scope.address2 = $scope.ordList[0].shippingAddress2//地址2
        $scope.trackingNum = $scope.ordList[0].TRACKINGNUMBER;
        $scope.storeName = $scope.ordList[0].STORE_NAME;//店铺名
        $scope.storeId = $scope.ordList[0].ORDER_NUMBER;//店铺id
        $scope.taxidNumber = $scope.ordList[0].taxidExtend;//店铺id
        $scope.impStorageFlag = $scope.ordList[0].impStorageFlag;//库存订单或发货订单
        $scope.originalMoney = $scope.ordList[0].discountFromMoney; // 订单原价格
        $scope.storageEnName = $scope.ordList[0].storageEnName; // 库存订单仓库名
        $scope.orderStatus = $scope.ordList[0].STATUS //订单状态
        $scope.orderMonId = $scope.ordList[0].SHIPMENTS_ORDER_ID //订单id
        $scope.iossNumber = $scope.ordList[0].iossNumber // ioss号
        $scope.iossType = $scope.ordList[0].iossType // ioss 类型
        $scope.orderItem = $scope.ordList[0];

        // 如果接口没有返回iossType 这边给0进行隐藏
        if(!$scope.iossType){
          $scope.iossType = 0
        }
        if ($scope.trackingNum) zzDetailMesFun();
      }, function (data) {
        // layer.closeAll('loading');
        msgLoading.hide();
      })
      //查询下面的列表
      console.log(istrackFlag)
      $scope.isShowList = false;
      if (istrackFlag == 1) {
        $scope.isShowList = false;
      } else {
        $scope.isShowList = true;
      }
      function zzDetailMesFun() {
        const msgLoading = cjMessage.loading({ isFixed: true });
        dsp.postLogistics('SearchDingdan.json', { list: [$scope.trackingNum] }, data => {
          msgLoading.hide();
          // console.log(data)
          if (+data.data.statusCode === 200 && data.data.result) {
            const res = data.data.result[0]
            if (res) {
              $scope.routeList = res.route || [];
              $scope.shipStatus = res.status
            }
          }
        }, () => {
          msgLoading.hide();
        })
        // dsp.postFun('newlogistics/track/list', { 'trackNumber': $scope.trackingNum }, function (data) {
        //   console.log(data)
        //   msgLoading.hide();
        //   if (data.data.statusCode == 200) {
        //     if (data.data.result.list && JSON.stringify(data.data.result.list) != '[]') {
        //       var result = data.data.result.list[0];
        //       if (result && result.route) {
        //         $scope.routeList = JSON.parse(result.route);
        //       } else {
        //         dsp.addNodataPic($('.logisicsContent'), height, 10, 0)
        //       }
        //       $scope.shipStatus = result.status;
        //     } else {
        //       console.log('找不到数据')
        //     }
        //     console.log($scope.routeList)
        //   }
        // }, function (data) {
        //   msgLoading.hide();
        // })
      }
      $scope.listFun = function () {
        zzDetailMesFun();
        $scope.showShip = true;
      }
      $scope.goBack = () => {
        window.history.back();
      }
      function isArray(o){
         return Object.prototype.toString.call(o)== '[object Array]';
      }
      //查看 缺货 已退款/已换货信息
      $scope.showStockout = (item, type) => {
        // console.log(item)
        let params = { type }
        if(type === 'refund' ) {
          params = {
            ...params,
            refundTime: +item.refundTime.time,
            refundAmount: item.refundAmount
          }
        } else if (type === 'barter') {
          params = {...params, originalSku: item.originalSku }
        }
        $scope.$broadcast('stockout-notice', params);
      }
    }]);

  app.filter('shipStatusFil', function () {
    return function (type) {
      switch (type) {
        case 0:
          return 'Tracking information not updated';
        case 1:
          return 'No updates for a long time';
        case 2:
          return 'In Process';
        case 3:
          return 'Delay';
        case 4:
          return 'Unsigned for a long time';
        case 5:
          return 'Returned';
        case 6:
          return 'Delivered';
        case 7:
          return 'Undelivered';
        case 8:
          return 'Dispute';
        case 9:
          return 'Destroyed';
        case 10:
          return 'Abnormal';
        default:
          return 'Tracking information not updated';
      }
    }
  });
  app.filter('orderStatusFil', function () {
    return function (type) {
      switch (type) {
        case '3':
          return 'Awaiting Payment';
        case '5':
          return 'Refund';
        case '6':
          return 'Dispatch Pending';
        case '61':
          return 'Dispatch Pending'
        case '8':
          return 'Delete';
        case '11':
          return 'Payment is being processed.';
        case '12':
          return 'Dispatched';
        case '13':
          return 'Closed';
        default:
          return 'Pending';
      }
    }
  });

  return app;
}
