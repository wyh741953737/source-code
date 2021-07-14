export function serviceProductShipmentFactory(angular) {
  const app = angular.module('service-product-shipment.module', []);

  app.controller('service-product-shipment.ctrl', ['$scope', '$rootScope', 'dsp','$timeout', function ($scope, $rootScope, dsp,$timeout) {
    var fwStu = localStorage.getItem('fwStu')
    //根据国家code 判断storeId
    const countryCodeModal = {
      CN: { nameEn: 'cn', name: 'China warehouse', key: 1 },
      US: {nameEn: 'us', name: 'US warehouse', key: 2 },
      TH: {nameEn: 'th', name: 'Thailand warehouse', key: 3 },
    }
    if (fwStu == 'downBatch') {
      $scope.downBatchFlag = true;
    } else if (fwStu == 'input') {
      $scope.inputMesFlag = true;
    }

    $scope.status = '1';            // 导航状态
    // $scope.trackingShow = false;    // 添加/修改运单
    // $scope.reasonsShow = false;     // 取消运单
    $scope.singOrderShow = false;   // 已签收订单
    $scope.RefusalShow = false;     // 拒签订单
    $scope.notificationShow = false; // 拒签通知
    $scope.RefusalId = '';          // 拒签id
    $scope.serveOrderList = [];
    $scope.serveMoneyList = [];
    $scope.orderNumList = [];
    $scope.productMoneyList = [];
    $scope.tracking = {};
    $scope.pageNum = '1';
    $scope.pageSize = '10';
    $scope.totalPageNum = 1;
    $scope.orderObj = {};            // 拒签数据
    $scope.warehouse = [];
    var serviceItem = {};            // 费用集合
    let vip = $rootScope.userInfo.vip;
    $scope.vipStuFlag = vip;
    dsp.setRightMinHeight();
    // $scope.notificationShow = true;
    // 运单列表数据
    function getServeOrder() {
      let data = {
        dbProductName: $scope.orderName,
        status: $scope.status,
        pageNo: $scope.pageNum,
        pageSize: $scope.pageSize
      }
      $scope.serveOrderList = [];
      $rootScope.$on('cj/server/getDbServeOrderList', (_, bool) => {
        $scope.loading = bool;
        if (bool) $scope.notDataFound = false;
      });
      dsp.postFun('cj/server/getDbServeOrderList', data, (res) => {
        $('.cj-load-wrap').css('min-height', 'auto')
        console.log(res)
        if(res.data.statusCode ==200){
          const result = res.data.result
          if (result.dPPointList.length > 0) {
            $scope.serveOrderList = result.dPPointList;
            console.log($scope.serveOrderList)
            $scope.totalPageNum = result.total;
            for (let item of $scope.serveOrderList) {
              item.show = false;
              item.createTime = new Date(parseInt(new Date(item.createTime).getTime())).toLocaleDateString().replace(/\//g, '-');
              item.deliveryTime = new Date(parseInt(new Date(item.deliveryTime).getTime())).toLocaleDateString().replace(/\//g, '-');
            }
            // pageFun();
            $scope.$broadcast('page-data', {
              pageNum: $scope.pageNum,
              totalNum: Math.ceil(result.total / $scope.pageSize),
              totalCounts:result.total,
              pageSize: $scope.pageSize,
              pagesizeList:['10']
            })
          } else {
            $scope.notDataFound = true;
            $('.cj-load-wrap').css('min-height', $('.cj-nodata-pic').height() + 110)
          }
        }
        
      });
    }
    getServeOrder();
    $scope.$on('pagedata-fa', function (d, data) {//分页切换数据监听
      const { pageNum } = data
      $scope.pageNum = pageNum
      getServeOrder()
    })
    // 导航切换
    $scope.navShow = function (txt) {
      $scope.pageNum = '1';
      $scope.pageSize = '10';
      $scope.status = txt;
      getServeOrder();
    };
    // 订单搜索
    $scope.orderSearch = () => {
      $scope.pageNum = '1'
      getServeOrder();
    };
    $scope.enterSearch = event => {
      if (event.keyCode == 13) {
        $scope.orderSearch();
      }
    };
    // 运单批次号下载
    $scope.batchDownload = (item) => {
      download('https://' + item.batchUrl);
    };
    $scope.downLoadBatchFun = function () {//指导里下载第一条批次号
      download('https://' + $scope.serveOrderList[0].batchUrl);
      $scope.downBatchFlag = false;
      console.log($scope.serveOrderList[0].trackingNumber)
      if ($scope.serveOrderList[0].trackingNumber) {//如果第一条已经生成追踪号 没必要指导填写运单信息
        localStorage.removeItem('fwStu')
      } else {
        localStorage.setItem('fwStu', 'input')
        $scope.inputMesFlag = true;
        console.log(itemTop, itemLeft)
        var itemTop = $("#input-yd0").offset().top;
        var itemLeft = $("#input-yd0").offset().left;
        console.log(itemTop, itemLeft)
        $('.sec-zhidao').css({
          top: itemTop - 11,
          left: itemLeft - 8
        })
      }


    }
    $scope.delFun = function (item) {//删除
      $scope.itemId = item.id;
      $scope.delOrdFlag = true;
    }
    $scope.sureDelFun = function () {
      dsp.postFun('cj/server/deleteDbServeOrderById', { 'id': $scope.itemId }, function (data) {
        if (data.data.statusCode == 200) {
          getServeOrder();
          $scope.delOrdFlag = false;
        }
      }, function (data) {
        console.log(data)
      })
    }

    function getWarehouseData() {
      layer.load(2);
      dsp.getWareList({
        productType:1,
        successCallback:function(data){
          layer.closeAll();
          $scope.warehouse = data;
          $timeout(function(){
            $scope.storagedoId = $scope.warehouse[0];
            $scope.storeId = $scope.warehouse[0]
            ? countryCodeModal[$scope.warehouse[0].countryCode] ? countryCodeModal[$scope.warehouse[0].countryCode].key : 1
            : 1
          },300)
        }
      });
    }

    // 添加订单和费用
    $scope.addTracking = (item) => {
      serviceItem = item;
      $scope.itemId = item.id;
      $scope.txspFlag = true;
      resetTracking();
      cost(item.dbProductId);
      if($scope.warehouse.length==0) getWarehouseData();
    };
    $scope.txspFun = () => {//指导里的打开弹框
      $scope.txspFlag = true;
      $scope.inputMesFlag = false;
      localStorage.removeItem('fwStu');
      resetTracking();
      cost($scope.serveOrderList[0].dbProductId);
      serviceItem['dbProductId'] = $scope.serveOrderList[0].dbProductId;
    };
    // 国家筛选
    $scope.stateChange = function () {
      console.log($scope.storagedoId)
      $scope.storeId = countryCodeModal[$scope.storagedoId.countryCode]
      ? countryCodeModal[$scope.storagedoId.countryCode].key : 1
      cost(serviceItem.dbProductId,$scope.storeId)
    };

    // 批次号
    $scope.quantityBlur = () => {
      if ($scope.trackingNumber && $scope.num) {
        let data = {
          trackingNumber: $scope.trackingNumber,
          num: $scope.num
        }
        $scope.quantityObj = {};
        $scope.downloadColor = false;
        $scope.downloadFlag = false;
        dsp.postFun('pojo/procurement/getServeProCodeImg', data, (res) => {
          if (res.status == '200') {
            $scope.quantityObj = res.data;
          }
        })
      }
    };
    // 单选框选中
    $scope.radioClick = (item, state) => {
      if (item.serverMoneyTypeId == 3 || item.serverMoneyTypeId == 2) {
        item.status = state;
      }
    };

    // 关闭填写信息
    $scope.cancelTracking = () => {
      confirmTrackingflag = true;
      layer.confirm('Confirm to cancel?', {
        title: false,
        closeBtn: 0,
        btnAlign: 'c',
        skin: 'goods-class',
        btn: ['Confirm', 'Cancel'] //按钮
      }, function (index) {//确定关闭填写框
        layer.close(index);
        $scope.txspFlag = false;
        $scope.$apply();
      }, function (index) {//取消
        layer.close(index);
        $scope.$apply();
      });
    };
    // 服务商品确定新增订单
    let confirmTrackingflag = true;
    $scope.confirmTracking = () => {
      console.log($scope.itemId)
      if (!$scope.itemId) {
        $scope.itemId = $scope.serveOrderList[0].id;
      }
      console.log($scope.itemId)
      if (!$scope.trackingName) {
        layer.msg('Shipping Label Name is required');
        return;
      }
      console.log($scope.storagedoId)
      if (!$scope.storagedoId.id) {
        layer.msg('Please select the warehouse for stocking service products.');
        return;
      }
      if (!$scope.trackingNumber) {
        layer.msg('Tracking number is required');
        return;
      }
      if (!$scope.num) {
        layer.msg('Quantity is required');
        return;
      }
      if (!$("#cj-stime").val()) {
        layer.msg('Date is required');
        return;
      }
      // 防重
      if (!confirmTrackingflag) return;
      confirmTrackingflag = false;
      let data = {
        id: $scope.itemId,
        orderName: $scope.trackingName,
        dbSku: serviceItem.dbSku,
        status: 1,
        storeId: $scope.storeId,
        storagedoId: $scope.storagedoId.id,
        trackingNumber: $scope.trackingNumber,
        num: $scope.num,
        deliveryTime: $("#cj-stime").val(),
        isDownload: 1,
        batchUrl: $scope.quantityObj.batchUrl,
        batchNumber: $scope.quantityObj.batchNumber,
        moneylist: []
      }
      for (let [i, item] of new Map($scope.serveMoneyList.map((item, i) => [i, item]))) {
        data.moneylist[i] = {
          serverMoneyId: item.serverMoneyId,
          status: item.status
        }
      }
      dsp.postFun('cj/server/updateServeOrder', data, (res) => {
        if (res.data.statusCode == '200') {
          $scope.txspFlag = false;
          confirmTrackingflag = true;
          $scope.shippingFeeHintShow = true;
          getShippingFeeHint(serviceItem.dbProductId, res.data.result);
        }
      }, { layer: true });
    };
    // 温馨提示费用
    function getShippingFeeHint(dbProductId, resultId) {
      $scope.shippingFeeHintMoneyList = {};
      console.log(dbProductId)
      if (!dbProductId) {
        dbProductId = $scope.serveOrderList[0].dbProductId;
      }
      console.log(dbProductId)
      let data = {
        dbProductId: dbProductId,
        storeId: $scope.storeId,
        dbServeOrderId: $scope.itemId
      }
      dsp.postFun('cj/server/getDbServeOrderMoney', data, (res) => {
        if (res.data.statusCode == '200') {
          $scope.shippingFeeHintMoneyList = res.data.result;
          for (let item of $scope.shippingFeeHintMoneyList.moneyList) {
            if (item.id == 7) {
              $scope.shippingFeeHintMoneyList.moneys = item.moneys;
            }
          }
        }
        console.log($scope.shippingFeeHintMoneyList);
      });
    };
    // 运单费用温馨提示
    $scope.cancelShippingFeeHint = () => {
      $scope.shippingFeeHintShow = false;
      layer.msg('Added successfully');
      getServeOrder();
    };
    // 费用数据
    function cost(dbProductId, storeType = 2) {
      let data = {
        dbProductId,
        storeType: parseInt(storeType)
      }
      $scope.serveMoneyList = [];
      dsp.postFun('cj/server/getDbServeMoneyList', data, (res) => {
        if (res.data.statusCode == '200') {
          const { moneyList,retentionList }  = res.data.result;
          $scope.serveMoneyList = moneyList
          for (let item of $scope.serveMoneyList) {
            item.status = '1';
            item.flag = false;
            if (item.serverMoneyTypeId == 3 || item.serverMoneyTypeId == 2) {
              item.flag = true;
            }
          }
        }
      });
    };
    // 重置
    function resetTracking() {
      $scope.storagedoId = $scope.warehouse[0]; // 默认美国
      $scope.storeId = $scope.warehouse[0]
      ? countryCodeModal[$scope.warehouse[0].countryCode] ? countryCodeModal[$scope.warehouse[0].countryCode].key : 1
      : 1;
      $scope.trackingName = '';        // 运单名称
      $scope.trackingNumber = '';      // 运单号
      $scope.num = '';                 // 数量
      $scope.quantityObj = {};         // 批次号数据
      $scope.downloadFlag = false;     // 下载状态
      $scope.downloadColor = false;    // 下载颜色
      $scope.serveMoneyList = [];      // 单选项
      $("#cj-stime").val('');          // 时间
    };
    // 显示变体
    $scope.variantList = [];
    $scope.trShow = (item, event, index) => {
      // event.stopPropagation();
      // if($scope.status==1)return
      // if (!item.show) {
      //   item.show = true;

      // } else {
      //   item.show = false;
      // }
      dsp.load()
      dsp.postFun('cj/server/getDbServeOrderStanMoney', { dbServeOrderId: item.id }, (res) => {
        console.log(res);
        dsp.closeLoad()
        if (res.data.statusCode == '200') {
          $scope.actionViewFlag = true;
          $scope.actionVariantList = res.data.result;
          for (let item of $scope.actionVariantList) {
            item.create_time.time = new Date(parseInt(new Date(item.create_time.time).getTime())).toLocaleDateString().replace(/\//g, '-');
          }
          console.log($scope.actionVariantList);
        }
      }, (err) => {
        dsp.closeLoad()
      })
    }
    // 查看拒签
    $scope.lookRefusal = (item, event) => {
      event.stopPropagation();
      $scope.RefusalId = item.id;
      $scope.RefusalShow = true;
      dsp.postFun('cj/server/getDbServeOrderList', { trackingNumber: item.trackingNumber }, (res) => {
        if(res.data.statusCode ==200){
          const data = res.data.result
          $scope.orderObj = data.dPPointList;
        }
      })
    };
    // 关闭拒签
    $scope.closeRefusal = () => {
      $scope.RefusalShow = false;
    };
    // 同意签收
    let RefusalehouseFlag = true;
    $scope.confrimRefusal = (orderObj) => {
      let ids = [];
      for (let item of orderObj) {
        ids.push(item.id)
      }
      let data = {
        ids: ids.join(','),
        status: 2
      }
      // 防重
      if (!RefusalehouseFlag) return
      RefusalehouseFlag = false;
      dsp.postFun('cj/server/updateServeOrderByIds', data, (res) => {
        if (res.data.statusCode == '200') {
          $scope.RefusalShow = false;
          RefusalehouseFlag = true;
          getServeOrder();
          layer.msg('Sign for successfully');
        }
      })
    };
    // 拒绝入库
    $scope.cancelRefusal = (orderObj) => {
      let ids = [];
      for (let item of orderObj) {
        ids.push(item.id)
      }
      let data = {
        ids: ids.join(','),
        status: 5
      }
      dsp.postFun('cj/server/updateServeOrderByIds', data, (res) => {
        if (res.data.statusCode == '200') {
          $scope.RefusalShow = false;
          $scope.notificationShow = true;
        }
      })
    };
    // 拒绝入库通知
    $scope.confirmNotificatio = () => {
      $scope.notificationShow = false;
      getServeOrder();
    };
    // 查看运单使用数量
    let warehouse = [
      { id: '201e67f6ba4644c0a36d63bf4989dd70', city: 'New Jersey Warehouse, East America' },
      { id: 'd3749885b80444baadf8a55277de1c09', city: 'Chino Warehouse, West America' },
      { id: '08898c4735bf43068d5d677c1d217ab0', city: 'Shenzhen Warehouse, China' },
      { id: 'bc228e33b02a4c03b46b186994eb6eb3', city: 'Yiwu Warehouse, China' },
      { id: 'f87a1c014e6c4bebbe13359467886e99', city: 'Thailand'},
      { id: '55cbb9d2-8dcc-469e-aea2-40890c26cf7c', city: 'Germany'},
      { id: 'e18668c0-0b6b-4d07-837e-fe2150d9d9c9', city: 'Indonesia'},

    ];
    $scope.lookOrderNum = (item) => {
      event.stopPropagation();
      $scope.singOrderShow = true;
      $scope.orderNumList = [];
      dsp.postFun('cj/server/getUseServeDetail', { dbServeOrderId: item.id }, (res) => {
        if (res.data.statusCode == '200') {
          $scope.orderNumList = res.data.result;
          for (let item of $scope.orderNumList) {
            item.createTime = new Date(parseInt(new Date(item.createTime).getTime())).toLocaleDateString().replace(/\//g, '-');
            for (let i of warehouse) {
              if (item.storagedoId == i.id) {
                item.storagedoId = i.city;
              }
            }
          }
        }
      });
    };
    // 关闭运单使用数量
    $scope.cancelOrderNum = () => {
      $scope.singOrderShow = false;
    };
    //分页
    function pageFun() {
      $(".page-index").jqPaginator({
        totalCounts: $scope.totalPageNum,
        pageSize: $scope.pageSize * 1,
        visiblePages: 5,
        currentPage: $scope.pageNum * 1,
        activeClass: 'current',
        prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
        next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
        page: '<a href="javascript:void(0);">{{page}}<\/a>',
        first: '<a class="prev" href="javascript:void(0);">&lt&lt;<\/a>',
        last: '<a class="prev" href="javascript:void(0);">&gt&gt;<\/a>',
        onPageChange: function (n, type) {
          if (type == 'init') return;
          $scope.pageNum = n.toString();
          getServeOrder();
        }
      });
    };
    // go 分页
    $scope.chanPageNum = function () {
      if (!isNaN($scope.pageNum * 1) && $scope.pageNum * 1 > 0 && $scope.pageNum * 1 <= Math.ceil($scope.totalPageNum / 10)) {
        getServeOrder();
      } else {
        $scope.pageNum = '1';
      }
    };
  }]);

  return app;
}
