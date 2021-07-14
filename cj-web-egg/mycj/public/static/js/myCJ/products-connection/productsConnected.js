(function (angular) {

  var app = angular.module('productsConnected-app', []);

  var winHeight = $(window).height() * 1;
  // console.log(winHeight);
  var rightBarHeight = winHeight - 191;
  var rightBarHeight2 = winHeight - 225;
  var conPicHeight = winHeight - 427;
  var skuPicHeight = winHeight - 339;
  var connectionPicHeight = 520;
  // 服务---商品
  app.controller('productsServiceGoods', ['$scope', 'dsp', '$timeout', '$q', function ($scope, dsp, $timeout, $q) {
    function mypost (url, params) {//2019-7-4封装post方法
      return $q((resolve, reject) => {
        dsp.postFun(url, JSON.stringify(params), function ({data}) {
          layer.closeAll('loading');
          const {result, statusCode, message} = data;
          if (statusCode != 200) {
            reject(data)
            return myMsg(message)
          }
            resolve(result)
        }, function(err) {
          console.log('errHandle  --->  ', err)
          reject(err)
          layer.closeAll('loading');
          // layer.msg('服务器错误')
        })
      })
    }
    $scope.status = '2';              // 0 提交审核 1 审核中  2  审核通过
    $scope.goodsShow = false;         // 申请服务商品
    $scope.trackingShow = false;      // 添加/修改运单
    $scope.shippingFeeShow = false;   // 费用详情
    $scope.shippingFeeHintShow = false; // 费用详情温馨提示
    $scope.goodsList = [];
    $scope.productList = [];
    $scope.serveMoneyList = [];
    $scope.productMoneyList = [];
    $scope.shippingFeeHintMoneyList = {};
    $scope.storagedoId = [];
    $scope.storeId = 2;
    $scope.pageNum = '1';
    $scope.pageSize = '10';
    $scope.totalPageNum = 1;
    $scope.goodsName = '';
    $scope.serveGoodsName = ''; 
    $scope.trackingName = '';        // 运单名称
    $scope.trackingNumber = '';      // 运单号
    $scope.num = '';                 // 数量
    $scope.quantityObj = {};         // 批次号数据
    $scope.downloadFlag = false;     // 下载状态
    $scope.downloadColor = false;    // 下载颜色
    $scope.selClass = false;
    $scope.warehouse = [
      { id: '201e67f6ba4644c0a36d63bf4989dd70', city: 'New Jersey Warehouse, East America' },
      { id: 'd3749885b80444baadf8a55277de1c09', city: 'Chino Warehouse, West America' },
      { id: '08898c4735bf43068d5d677c1d217ab0', city: 'Shenzhen Warehouse, China' },
      { id: 'bc228e33b02a4c03b46b186994eb6eb3', city: 'Yiwu Warehouse, China'},
      { id: 'f87a1c014e6c4bebbe13359467886e99', city: 'Thailand'}
    ];
    var serviceItem = {};            // 费用集合
    let vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
    $scope.vipStuFlag = vip;
    if (vip == '1') {//vipFlag
      $('.header-nav').addClass('vipFlag');
      $('.goods-spzd-wrap').addClass('vip');
      $('.mycj-right-wrap').css('background', '#F0EDE7').addClass('vip');
      $('.spzd-wrap').addClass('vip');
      $('.shipping-wrap').addClass('vip');
    } else {
      $('.header-nav').removeClass('vipFlag');
      $('.goods-spzd-wrap').removeClass('vip');
      $('.mycj-right-wrap').css('background', '#f2f3f5').removeClass('vip');
      $('.spzd-wrap').removeClass('vip');
      $('.shipping-wrap').removeClass('vip');
    }
    $('.header-nav li').eq(2).addClass('active');
    $scope.afterGetLeftNav = function (e) {
      $scope.selClass = true;
      if (vip == '1') {
        $('.mycj-left-bar').addClass('vipFlag');
      } else {
        $('.mycj-left-bar').removeClass('vipFlag');
      }
      $('.mycj-left-bar li').eq(2).addClass('active');
      $('.mycj-left-bar li').eq(2).find('.menu-item').eq(0).addClass('menu-item-active');
    }
    dsp.setRightMinHeight();
    // 服务商品数据
    function getGoods() {
      $scope.goodsList = [];
      dsp.loadPercent($('.goods-table'), $(window).height() - 171, 44, 0);
      let data = {
        dbProductName: $scope.goodsName,
        pageNo: $scope.pageNum,
        pageSize: $scope.pageSize,
        statuses: $scope.status
      }
      dsp.postFun('cj/server/getServeProductList', data, (res) => {
        dsp.removeNodataPic($('.goods-table'))
        dsp.closeLoadPercent($('.goods-table'))
        $('.cj-load-wrap').css('min-height','auto')
        if (res.data.dPPointList.length > 0) {
          $scope.goodsList = res.data.dPPointList;
          $scope.totalPageNum = res.data.total;
          if($scope.totalPageNum>0&&$scope.status!='2'){
            for(let i = 0,len = $scope.goodsList.length;i<len;i++){
              try {
                $scope.goodsList[i].customerImage = JSON.parse($scope.goodsList[i].customerImage);
              } catch (error) {
                console.log(error)
              }
            }
            console.log($scope.goodsList)
          }
          pageFun();
        }else{
          dsp.addNodataPic($('.goods-table'), $(window).height() - 171, 44, 0)
          $('.cj-load-wrap').css('min-height', $('.cj-nodata-pic').height() + 110)
        }
      })
    };
    getGoods();
    // 导航切换
    $scope.navShow = (status) => {
      $scope.status = status;
      console.log($scope.status)
      getGoods();
    };
    // 搜索服务商品列表
    $scope.searchGoodsList = () => {
      getGoods();
    };
    //查看图片
    $scope.showImgsFun = function(imgs){
      $scope.itemImgsArr = imgs;
      $scope.imgsFlag = true;
    }
    // 查看费用详情
    $scope.lookFeeDeteils= (item) => {
      layer.load(2);
      mypost('cj/server/getDbServeProductMoney', {dbProductId: item.dbProductId}).then(res => {
        $scope.shippingFeeShow = true;
        console.log('查看费用详情', res)
        $scope.productMoneyList = res;
        for(let i = 0,len = res.retMoney.length;i < len;i++){
          if(res.retMoney[i].store_id == 3){
            $scope.isHavTaiGuoFlag = true;
            break
          }else{
            $scope.isHavTaiGuoFlag = false;
          }
        }
      })
    };
    // 关闭费用详情
    $scope.cancelFeeDeteils = () => {
      $scope.shippingFeeShow = false;
    };
    // 申请服务商品
    $scope.productShow = () => {
      $scope.goodsShow = true;
    };
    // 关闭服务商品
    $scope.closeGoods = () => {
      $scope.goodsShow = false;
      $scope.serveGoodsName = '';
      $scope.productList = [];
    };
    // 搜索申请服务商品
    $scope.searchGoods = () => {
      if (!$scope.serveGoodsName) {
        layer.msg('Product Title is required')
        return
      }
      dsp.load()
      mypost('cj/server/getDbProductList', {name: $scope.serveGoodsName}).then(res => {
        console.log('searchGoods', res)
        $scope.productList = res.filter(({NAMEEN}) => NAMEEN.split(' ').every(str => str.length < 30));//过滤英文名 单词字符数 大于30的 记录 修复页面显示不正常
      })
    };
    //2019-7-4  悬浮 隐藏 bug修复
    // $scope.isAddress = true;
    $scope.wareData = [
      {
        id: '1',
        name: 'YiWu, China',
        company: 'Yiwu Cujia Trade Co., Ltd',
        consignee: 'Tommy',
        contact: '15000616778',
        address: 'F2, BUILDING 8, NO.89, SIYUAN ROAD, NIANSANLI STREET, YIWU, JINHUA, ZHEJIANG PROVINCE 322000 CHINA'
      },
      {
        id: '2',
        name: 'ShenZhen, China',
        company: 'Yiwu Cujia Trade Co., Ltd',
        consignee: 'Zhou Guanglin',
        contact: '13597883401',
        address: '#403, F4, Building D2, Lilang Industrial Zone, Buji Town, Longgang District, Shenzhen City, Guangdong Province, 518112, China'
      },
      {
        id: '3',
        name: 'NJ, USA',
        company: 'CJ Trade Corp',
        consignee: 'Luren',
        contact: '9095862127',
        address: 'Suite 313, 20 Haypress Road, Cranbury, NJ 08512 USA'
      },
      {
        id: '4',
        name: 'CA, USA',
        company: 'CJ Trade Corp',
        consignee: 'Grace',
        contact: '9097385135',
        address: '13955 Central Ave., Chino, CA 91710, USA'
      },
      {
        id: '5',
        name: 'Thailand',
        company: 'Cu Jia Trade',
        consignee: 'Linda',
        contact: '+66910387985',
        address: 'No. 33/30 Laddawan Village, Soi Si Dan 14, Srinakarin Road, Bang Kaew Subdistrict, Bang Phli Samut Prakan'
      }
    ]
    $scope.currWare = $scope.wareData[0];
    $scope.chanWare = function (item) {
      $scope.currWare = item;
    }
    let timer = null;
    $scope.myMouseenter = function () {
      $timeout.cancel(timer);
      $scope.isAddress = true;
    }
    $scope.myMouseleave = function () {
      timer=$timeout(() => {
        $scope.isAddress = false;
      }, 300)
    }
    // 添加服务商品
    $scope.addGoods = function (item) {
      let data = {
        dbProductId: item.id,
        dbProductName: item.name,
        dbProductNameen: item.NAMEEN,
        dbImage: item.bigimg,
        dbSku: item.sku
      }
      dsp.postFun('cj/server/addServeProduct', data, (res) => {
        if (res.data.statusCode == '200') {
          $scope.goodsShow = false;
          $scope.serveGoodsName = '';
          layer.msg('Added Successfully');
          getGoods();
        }
      })
    };
    // 取消服务
    $scope.cancelGoods = (item) => {
      layer.confirm('Confirm to cancel?', {
        title: false,
        closeBtn: 0,
        btnAlign: 'c',
        skin: 'goods-class',
        btn: ['Confirm', 'Cancel'] //按钮
      }, function (index) {
        layer.close(index);
        dsp.postFun('cj/server/cancelServeProduct', { id: item.id }, (res) => {
          if (res.data.statusCode == '200') {
            layer.msg('Cancelled successfully');
            getGoods();
          }
        });
      }, function (index) {
        layer.close(index);
      });
    };
    // 添加订单和费用
    $scope.addTracking = (item) => {
      serviceItem = item;
      $scope.trackingShow = true;
      resetTracking();
      cost(item.dbProductId);
    };
    $scope.addTrackingLink = function(item){
      console.log(item)
      let outJson = {
        dbProductNameen: item.dbProductNameen
      }
      dsp.load()
      dsp.postFun('pojo/procurement/getServeProCodeImg',outJson,function(res) {
        console.log(res)
        if(res.status=='200'&&res.data.batchUrl){
          let upJson = {
            dbProductId: item.dbProductId,
            dbProductName: item.dbProductName,
            dbProductNameen: item.dbProductNameen,
            dbServeProductId: item.id,
            dbSku: item.dbSku,
            dbImages: item.dbImage,
            batchUrl: res.data.batchUrl,
            batchNumber: res.data.batchNumber,
            status: 1
          }
          dsp.postFun('cj/server/insertServeOrder',upJson,function(data){
            console.log(data)
            if(data.data.statusCode == 200){
              localStorage.setItem('fwStu','downBatch')
              location.href = 'myCJ.html#/products-connection/waybill';
            }else{
              layer.msg(data.message)
            }
            dsp.closeLoad()
          },function(data){
            console.log(data)
            dsp.closeLoad()
          })
        }else{
          layer.msg('Batch Number Generate Failed')
          dsp.closeLoad()
        }
      },function(data){
        console.log(data)
        dsp.closeLoad()
      })
    }
    // 国家筛选
    $scope.stateChange = function () {
      // 2 美国  1 中国
      if ($scope.storagedoId.id == '08898c4735bf43068d5d677c1d217ab0' || $scope.storagedoId.id == 'bc228e33b02a4c03b46b186994eb6eb3') {
        $scope.storeId = 1;
        cost(serviceItem.dbProductId, $scope.storeId);
      }  else if($scope.storagedoId.id == 'd3749885b80444baadf8a55277de1c09'||$scope.storagedoId.id == '201e67f6ba4644c0a36d63bf4989dd70'){
        $scope.storeId = 2;
        cost(serviceItem.dbProductId, $scope.storeId);
      } else if($scope.storagedoId.id == 'f87a1c014e6c4bebbe13359467886e99'){
        $scope.storeId = 3;
        cost(serviceItem.dbProductId, $scope.storeId);
      }
    };
    // 批次号
    $scope.quantityBlur = () => {
      if ($scope.trackingNumber && $scope.num) {
        let data = {
          trackingNumber: $scope.trackingNumber,
          num:  $scope.num
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
    // 服务商品批次号下载
    $scope.batchDownload = () => {
      $scope.downloadFlag = true;
      $scope.downloadColor = false;
      if (!$scope.quantityObj.batchUrl) return;
      download('https://'+ $scope.quantityObj.batchUrl);
    };
    // 关闭订单
    $scope.cancelTracking = () => {
      layer.confirm('Confirm to cancel?', {
        title: false,
        closeBtn: 0,
        btnAlign: 'c',
        skin: 'goods-class',
        btn: ['Confirm', 'Cancel'] //按钮
      }, function (index) {
        layer.close(index);
        $scope.trackingShow = false;
        $scope.$apply();
      }, function (index) {
        layer.close(index);
        $scope.downloadFlag = false;
        $scope.downloadColor = false;
        $scope.$apply();
      });
    };
    // 服务商品确定新增订单
    let confirmTrackingflag = true;
    $scope.confirmTracking = () => {
      if (!$scope.trackingName) {
        layer.msg('Shipping Label Name is required');
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
      // 必须先下载批次号
      if (!$scope.downloadFlag) {
        $scope.downloadColor = true;
        layer.msg('Please download the batch number first and then you can submit and move on to the next step', {
          area: '450px',
          time: 5000
        });
        return;
      }
      // 防重
      if (!confirmTrackingflag) return;
      confirmTrackingflag = false;
      let data = {
        orderName: $scope.trackingName,
        dbServeProductId: serviceItem.id,
        dbProductId: serviceItem.dbProductId,
        dbProductName: serviceItem.dbProductName,
        dbProductNameen: serviceItem.dbProductNameen,
        dbImages: serviceItem.dbImage,
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
      dsp.postFun('cj/server/insertServeOrder', data, (res) => {
        if (res.data.statusCode == '200') {
          $scope.trackingShow = false;
          confirmTrackingflag = true;
          $scope.shippingFeeHintShow = true;
          getShippingFeeHint(serviceItem.dbProductId, res.data.result);
        }
      });
    };
    // 温馨提示费用
    function getShippingFeeHint (dbProductId, resultId) {
      $scope.shippingFeeHintMoneyList = {};
      let data = {
        dbProductId: dbProductId,
        storeId: $scope.storeId,
        dbServeOrderId: resultId
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
      getGoods();
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
          $scope.serveMoneyList = res.data.result;
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
      $scope.storeId = 2;
      $scope.trackingName = '';        // 运单名称
      $scope.trackingNumber = '';      // 运单号
      $scope.num = '';                 // 数量
      $scope.quantityObj = {};         // 批次号数据
      $scope.downloadFlag = false;     // 下载状态
      $scope.downloadColor = false;    // 下载颜色
      $scope.serveMoneyList = [];      // 单选项
      $("#cj-stime").val('');          // 时间
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
          getGoods();
        }
      });
    };
    // go 分页
    $scope.chanPageNum = function () {
      if (!isNaN($scope.pageNum * 1) && $scope.pageNum * 1 > 0 && $scope.pageNum * 1 <= Math.ceil($scope.totalPageNum / 10)) {
        getGoods();
      } else {
        $scope.pageNum = '1';
      }
    };
    var addOneFlag = true;
    $scope.cancelApplyFun = function(){
      $scope.goodsShow = false;
      addOneFlag = true;
    }
    $scope.confirmApplyFun = function(){
      console.log($scope.applyNoteMes)
      let data = {
        customerMessage: $scope.applyNoteMes,
        customerImage: $scope.imgOssArr
      }
      data.customerImage = JSON.stringify(data.customerImage)
      console.log(data)
      if(!$scope.applyNoteMes){
        layer.msg('Please leave messages to CJ.')
        return
      }
      if(!addOneFlag)return
      addOneFlag = false;
      dsp.postFun('cj/server/addServeProduct',data,function(data){
        addOneFlag = true;
        if (data.data.statusCode == '200') {
          $scope.goodsShow = false;
          $scope.imgArr=[];
          $scope.imgOssArr = [];
          $scope.applyNoteMes = '';
          layer.msg('Added Successfully');
          getGoods();
        }
      },function(data){
        console.log(data)
        addOneFlag = true;
      },{layer:true})
    }
    // 上传图片
    //点击上传的图片显示大图
    $scope.viewBigImg = function (item) {
      $scope.viewImgFlag = true;
      $scope.bigImgSrc = item;
      console.log(item)
    }
    $scope.closePreImg = function () {
      $scope.viewImgFlag = false;
    }
    $scope.imgArr=[];       // 读取本地地址----速度快
    $scope.imgOssArr = [];  // 需要传给后台的线上地址
    let loadList = {
      img: ['png', 'jpg', 'jpeg', 'gif', "PNG", "JPG", "JPEG", "GIF"]
    };
    $scope.upLoadImg4 = function (files) {
      let file = files[0];
      let fileName = file.name.substring(file.name.lastIndexOf('.') + 1);
      if (loadList.img.indexOf(fileName) == -1) {
        layer.msg('Images format error');
        return;
      }
      if ($scope.imgArr.length >= 8) {
        layer.msg('Upload eight images at most');
        return;
      }
      dsp.ossUploadFile(files, function (data) {
        console.log(data)
        if (data.code == 0) {
          layer.msg('Images Upload Failed');
          return;
        }
        let result = data.succssLinks;
        for(let j = 0;j < result.length;j++){
          let srcList = result[j].split('.');
          let fileName = srcList[srcList.length-1].toLowerCase();
          if(fileName=='png' || fileName=='jpg' || fileName=='jpeg' || fileName=='gif'){
            $scope.imgArr.push(URL.createObjectURL(files[j]));
            $scope.imgOssArr.push(data.succssLinks[j]);
          }
        }
        if($scope.imgArr&&$scope.imgArr.length>=8){
          $scope.hideUpImgFlag = true;
        }
        $('.upload_file').val('')
        $scope.$apply();
      })
    };
    // 删除上传的图片
    $scope.delImg = (index, event) => {
      event.stopPropagation();
      $scope.imgArr.splice(index, 1);
      $scope.imgOssArr.splice(index, 1);
      if($scope.imgArr.length<8){
        $scope.hideUpImgFlag = false;
      }
    };
  }]);
  // 服务---运单
  app.directive('repeatFinish',function($timeout){  
    return {  
        restrict: 'A',  
        link: function(scope,elem,attr){  
            //当前循环至最后一个  
            if (scope.$last === true) {  
                $timeout(function () {  
                    //向父控制器传递事件消息  
                    scope.$emit('repeatFinishCallback');
                    var itemTop = $("#down-batch0").offset().top;
                    var itemLeft = $("#down-batch0").offset().left;
                    var itemTop1 = $("#input-yd0").offset().top;
                    var itemLeft1 = $("#input-yd0").offset().left;
                    console.log(itemTop,itemLeft,itemTop1,itemLeft1)
                    if(localStorage.getItem('fwStu')=='downBatch'){
                      $('.fir-zhidao').css({
                        top: itemTop-5,
                        left: itemLeft-6
                      })
                    }else{
                      $('.sec-zhidao').css({
                        top: itemTop1-11,
                        left: itemLeft1-8
                      })
                    }
                },100);  
            }  
        }  
    }                         
  }); 
  app.controller('productsServiceWaybill', ['$scope', 'dsp', function ($scope, dsp) {
    var fwStu = localStorage.getItem('fwStu')
    if(fwStu=='downBatch'){
      $scope.downBatchFlag = true;
    }else if(fwStu=='input'){
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
    $scope.warehouse = [
      { id: '201e67f6ba4644c0a36d63bf4989dd70', city: 'New Jersey Warehouse, East America' },
      { id: 'd3749885b80444baadf8a55277de1c09', city: 'Chino Warehouse, West America' },
      { id: '08898c4735bf43068d5d677c1d217ab0', city: 'Shenzhen Warehouse, China' },
      { id: 'bc228e33b02a4c03b46b186994eb6eb3', city: 'Yiwu Warehouse, China'},
      { id: 'f87a1c014e6c4bebbe13359467886e99', city: 'Thailand'}
    ];
    var serviceItem = {};            // 费用集合
    let vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
    $scope.vipStuFlag = vip;
    if (vip == '1') {//vipFlag
      $('.header-nav').addClass('vipFlag');
      $('.waybill-spzd-wrap').addClass('vip');
      $('.goods-class').addClass('vip');
      $('.spzd-wrap').addClass('vip');
      $('.mycj-right-wrap').css('background', '#F0EDE7').addClass('vip');
    } else {
      $('.header-nav').removeClass('vipFlag');
      $('.mycj-right-wrap').css('background', '#f2f3f5').removeClass('vip');
      $('.waybill-spzd-wrap').removeClass('vip');
      $('.goods-class').removeClass('vip');
      $('.spzd-wrap').removeClass('vip');
    }
    $('.header-nav li').eq(2).addClass('active');
    $scope.afterGetLeftNav = function (e) {
      if (vip == '1') {
        $('.mycj-left-bar').addClass('vipFlag');
      } else {
        $('.mycj-left-bar').removeClass('vipFlag');
      }
      $('.mycj-left-bar li').eq(2).addClass('active');
      $('.mycj-left-bar li').eq(2).find('.menu-item').eq(1).addClass('menu-item-active');
    }
    dsp.setRightMinHeight();
    // $scope.notificationShow = true;
    // 运单列表数据
    function getServeOrder() {
      dsp.loadPercent($('.service-table'), $(window).height() - 171, 44, 0);
      let data = {
        dbProductName: $scope.orderName,
        status: $scope.status,
        pageNo: $scope.pageNum,
        pageSize: $scope.pageSize
      }
      $scope.serveOrderList = [];
      dsp.postFun('cj/server/getDbServeOrderList', data, (res) => {
        dsp.removeNodataPic($('.service-table'))
        dsp.closeLoadPercent($('.service-table'))
        $('.cj-load-wrap').css('min-height','auto')
        if (res.data.dPPointList.length > 0) {
          $scope.serveOrderList = res.data.dPPointList;
          $scope.totalPageNum = res.data.total;
          for (let item of $scope.serveOrderList) {
            item.show = false;
            item.createTime = new Date(parseInt(new Date(item.createTime).getTime())).toLocaleDateString().replace(/\//g, '-');
            item.deliveryTime = new Date(parseInt(new Date(item.deliveryTime).getTime())).toLocaleDateString().replace(/\//g, '-');
          }
          pageFun();
        }else{
          dsp.addNodataPic($('.service-table'), $(window).height() - 171, 44, 0)
          $('.cj-load-wrap').css('min-height', $('.cj-nodata-pic').height() + 110)
        }
      });
    }
    getServeOrder();
    // 导航切换
    $scope.navShow = function (txt) {
      $scope.status = txt;
      getServeOrder();
    };
    // 订单搜索
    $scope.orderSearch = () => {
      getServeOrder();
    };
    // 运单批次号下载
    $scope.batchDownload = (item) => {
      download('https://'+ item.batchUrl);
    };
    $scope.downLoadBatchFun = function () {//指导里下载第一条批次号
      download('https://'+ $scope.serveOrderList[0].batchUrl);
      $scope.downBatchFlag = false;
      console.log($scope.serveOrderList[0].trackingNumber)
      if ($scope.serveOrderList[0].trackingNumber) {//如果第一条已经生成追踪号 没必要指导填写运单信息
        localStorage.removeItem('fwStu')
      } else {
        localStorage.setItem('fwStu','input')
        $scope.inputMesFlag = true;
        console.log(itemTop,itemLeft)
        var itemTop = $("#input-yd0").offset().top;
        var itemLeft = $("#input-yd0").offset().left;
        console.log(itemTop,itemLeft)
        $('.sec-zhidao').css({
          top: itemTop-11,
          left: itemLeft-8
        })
      }
      
      
    }
    $scope.delFun = function(item){//删除
      $scope.itemId = item.id;
      $scope.delOrdFlag = true;
    }
    $scope.sureDelFun = function(){
      dsp.postFun('cj/server/deleteDbServeOrderById',{'id':$scope.itemId},function (data) {
        if(data.data.statusCode==200){
          getServeOrder();
          $scope.delOrdFlag = false;
        }
      },function(data){
        console.log(data)
      })
    }


    
    // 添加订单和费用
    $scope.addTracking = (item) => {
      serviceItem = item;
      console.log(item)
      $scope.itemId = item.id;
      $scope.txspFlag = true;
      resetTracking();
      cost(item.dbProductId);
      console.log($scope.itemId)
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
      // 2 美国  1 中国
      if ($scope.storagedoId.id == '08898c4735bf43068d5d677c1d217ab0' || $scope.storagedoId.id == 'bc228e33b02a4c03b46b186994eb6eb3') {
        $scope.storeId = 1;
        cost(serviceItem.dbProductId, $scope.storeId);
      } else if($scope.storagedoId.id == 'd3749885b80444baadf8a55277de1c09'||$scope.storagedoId.id == '201e67f6ba4644c0a36d63bf4989dd70'){
        $scope.storeId = 2;
        cost(serviceItem.dbProductId, $scope.storeId);
      } else if($scope.storagedoId.id == 'f87a1c014e6c4bebbe13359467886e99'){
        $scope.storeId = 3;
        cost(serviceItem.dbProductId, $scope.storeId);
      }
    };
    // 批次号
    $scope.quantityBlur = () => {
      if ($scope.trackingNumber && $scope.num) {
        let data = {
          trackingNumber: $scope.trackingNumber,
          num:  $scope.num
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
      if(!$scope.itemId){
        $scope.itemId = $scope.serveOrderList[0].id;
      }
      console.log($scope.itemId)
      if (!$scope.trackingName) {
        layer.msg('Shipping Label Name is required');
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
      },{layer:true});
    };
    // 温馨提示费用
    function getShippingFeeHint (dbProductId, resultId) {
      $scope.shippingFeeHintMoneyList = {};
      console.log(dbProductId)
      if(!dbProductId){
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
          $scope.serveMoneyList = res.data.result;
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
      $scope.storeId = 2;
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
      dsp.postFun('cj/server/getDbServeOrderStanMoney', {dbServeOrderId: item.id}, (res) => {
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
      dsp.postFun('cj/server/getDbServeOrderList', {trackingNumber: item.trackingNumber}, (res) => {
        $scope.orderObj = res.data.dPPointList;
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
      { id: 'bc228e33b02a4c03b46b186994eb6eb3', city: 'Yiwu Warehouse, China'}
    ];
    $scope.lookOrderNum = (item) => {
      event.stopPropagation();
      $scope.singOrderShow = true;
      $scope.orderNumList = [];
      dsp.postFun('cj/server/getUseServeDetail', {dbServeOrderId: item.id}, (res) => {
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
  app.controller('productsConnectedCtrl', ['$rootScope', '$scope', '$http', '$window', '$location', '$timeout', '$routeParams', 'dsp', function ($rootScope, $scope, $http, $window, $location, $timeout, $routeParams, dsp) {
    dsp.domainData().then((res) => {
      // 请求成功的结果
      console.log(res)
      $scope.iscj = res.iscj;
      $scope.affModel = res.affModel;
      if ($scope.iscj == '1') {
        //cj
        $scope.websiteName = 'CJ';
      } else {
        //客户
        $scope.websiteName = res.websiteName || 'CJ';
      }
    })
    var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
    if (vip == '1') {//vipFlag
      $('.header-nav').addClass('vipFlag');
      $('.mycj-right-wrap').css('background', '#F0EDE7').addClass('vip');
    } else {
      $('.header-nav').removeClass('vipFlag');
      $('.mycj-right-wrap').css('background', '#f2f3f5').removeClass('vip');
    }
    $('.header-nav li').eq(2).addClass('active');
    $scope.afterGetLeftNav = function () {
      if (vip == '1') {
        $('.mycj-left-bar').addClass('vipFlag');
      } else {
        $('.mycj-left-bar').removeClass('vipFlag');
      }
      $('.mycj-left-bar li').eq(0).addClass('active');
    }
    dsp.setRightMinHeight();
    console.log("productsConnectedCtrl")
    var base64 = new Base64();
    var userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
    console.log(userId)
    var seachCs = $routeParams.seachCs || '';
    console.log(seachCs)
    dsp.postFun('app/shop/getshop', {"data": "{'userId':'" + userId + "'}"}, getshop);

    function getshop(n) {
      var obj = JSON.parse(n.data.result);
      // console.log('下拉', obj.shoplist)
      $scope.shopselectlist = obj.shoplist;
      $scope.shopselectlist.forEach(e => {
        e.rNAME = `${e.NAME} - ${e.TYPE} ${replaceName((e.ThemeId || e.MarketplaceUrl))}`; //ThemeId是shopee的国家;MarketplaceUrl是lazada的国家
      });
      function replaceName(params) {
        let rName = '';
        if (/sg/i.test(params)) {rName = ' - Singapore'}
        if (/my/i.test(params)) {rName = ' - Malaysia'}
        if (/id/i.test(params)) {rName = ' - Indonesia'}
        if (/th/i.test(params)) {rName = ' - Thailand'}
        if (/ph/i.test(params)) {rName = ' - Philippines'}
        if (/vn/i.test(params)) {rName = ' - Vietnam'}
        return rName;
      }
      console.log('下拉', $scope.shopselectlist);
      $scope.selectshopinfo = '';
      getConnectedList();
    }

    //var closeFlag = localStorage.getItem('closeFlag');
    var isEmpower = localStorage.getItem('isEmpower');
    if (isEmpower == null || isEmpower == '' || isEmpower == undefined) {
    } else {
      if (isEmpower == '1') {
        var a = $('.right-btns>a:first-child');
        var left = getElementLeft(a[0]) - 18;
        var top = getElementTop(a[0]) - 8;
        console.log(left, top);
        $('.online-wrap').css({
          "top": top + 'px',
          "left": left + 'px'
        });
        $('.zzc').show();
      }
    }
    $('.know').click(function () {
      localStorage.setItem('closeFlag', '1');
      location.href = '#/myCJAssociatedStore';
    });
    $scope.jump = function () {
      localStorage.setItem('closeFlag', '');
      location.href = '#/direct-orders';
    }

    function getElementLeft(element) {
      var actualLeft = element.offsetLeft;
      var current = element.offsetParent;

      while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }

      return actualLeft;
    }

    function getElementTop(element) {
      var actualTop = element.offsetTop;
      var current = element.offsetParent;

      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }

      return actualTop;
    }

    $scope.conpagesize = '10';
    $scope.conpagenum = '1';
    $scope.conshopid = '';
    $scope.consearchinfo = '';
    $scope.conTotalNum = '';
    $scope.conTotalPage = '';
    // $scope.conlist = [];
    if (seachCs) {
      $scope.consearchinfo = seachCs;
      console.log($scope.consearchinfo)
    }

    // layer.load(2);
    function getConnectedList() {
      // dsp.load();
      var jsonObj = {};
      jsonObj.pageSize = $scope.conpagesize;
      jsonObj.pageNum = $scope.conpagenum;
      jsonObj.shopId = $scope.selectshopinfo ? $scope.selectshopinfo.ID : '';
      jsonObj.userId = userId;
      jsonObj.serachName = $scope.consearchinfo.replace(/'/g, "''");
      $scope.conlist = [];
      $scope.showFlag = [];
      dsp.loadPercent($('.cj-load-wrap'), conPicHeight);
      dsp.postFun('app/connection/conList', {"data": JSON.stringify(jsonObj)}, jiechuguanlian);
    }

    function settleData(obj) {
      var pList = obj.conList;
      var remarkArr = obj.remark || [];
      console.log(pList);
      for (var i = 0; i < pList.length; i++) {
        pList[i].discountPrice = dsp.cacuDiscount(pList[i].SELLPRICE, pList[i].SELLDISCOUNT);
        pList[i].decountry = null;
        pList[i].deltPrice = 0;
        pList[i].discountPriceShip = 0;
        if (pList[i].deltPrice) {
          pList[i].discountPriceShip = dsp.cacuDiscount(pList[i].deltPrice, pList[i].FREIGHTDISCOUNT);
          pList[i].AMOUNTPRICE = dsp.cacuAmount(pList[i].discountPrice, pList[i].discountPriceShip);
        } else {
          pList[i].discountPriceShip = '';
          pList[i].AMOUNTPRICE = pList[i].discountPrice;
        }
        for (var j = 0; j < remarkArr.length; j++) {
          if (pList[i].LOGISTICS == remarkArr[j].nameen) {
            console.log(remarkArr[j].remark);
            pList[i].wuliuRemark = remarkArr[j].remark;
            break;
          }
        }
        // 物流试算组件用
        pList[i].shipinfo = {
          weight: pList[i].packweight,
          enName: pList[i].LOGISTICS,
          pid: pList[i].PID,
          shopType:pList[i].shopType,
          shipDiscount: pList[i].FREIGHTDISCOUNT,
          index1: i
        }
      }
      $scope.conlist = pList;
      console.log($scope.conlist);
      $scope.conTotalPage = Math.ceil(($scope.conTotalNum * 1) / ($scope.conpagesize * 1));
    }

    // 物流试算组件返回值接收
    $scope.$on('saveShipPrice', function (d, data) {
      console.log(data)
      if (data.index2 >= 0 && data.index1 >= 0) {
        $scope.conlist[data.index1].varientList[data.index2].AMOUNTPRICE = dsp.cacuAmount($scope.conlist[data.index1].varientList[data.index2].discountPrice, data.shipDiscountPrice || 0);
      } else {
        $scope.conlist[data.index1].AMOUNTPRICE = dsp.cacuAmount($scope.conlist[data.index1].discountPrice, data.shipDiscountPrice || 0);
      }
      $scope.$apply();
    })

    function jiechuguanlian(n) {
      // layer.closeAll("loading")
      // dsp.closeLoad();
      dsp.closeLoadPercent($('.cj-load-wrap'));
      console.log(n.data);
      var obj = JSON.parse(n.data.result);
      console.log(obj);
      $scope.connectedlist = obj;
      // console.log("关联", obj, $scope.connectedlist.total,$scope.conpagesize)
      // $scope.conlist = obj.conList;
      $scope.conTotalNum = obj.total;
      if ($scope.conTotalNum == 0) {
        $scope.conTotalPage = 0;
        $scope.conlist = [];
        dsp.addNodataPic($('.cj-load-wrap'), conPicHeight);
        return;
      }
      dsp.removeNodataPic($('.cj-load-wrap'));
      settleData(obj);
      pageFun($("#page5"), $scope.conTotalNum * 1, $scope.conpagesize * 1, $scope.conpagenum * 1, function (p, type) {
        if (type == 'init') {
          return;
        }
        $scope.conpagenum=p;
        var jsonObj = {};
        jsonObj.pageSize = $scope.conpagesize;
        jsonObj.pageNum = p;
        jsonObj.shopId = $scope.selectshopinfo ? $scope.selectshopinfo.ID : '';
        jsonObj.userId = userId;
        jsonObj.serachName = $scope.consearchinfo;
        // dsp.load();
        $scope.conlist = [];
        dsp.loadPercent($('.cj-load-wrap'), conPicHeight);
        dsp.postFun('app/connection/conList', {"data": JSON.stringify(jsonObj)}, function (n) {
          // layer.closeAll("loading")
          // dsp.closeLoad();
          dsp.closeLoadPercent($('.cj-load-wrap'));
          var obj2 = JSON.parse(n.data.result);
          settleData(obj2);
        });
      });
    }

    //搜索
    $scope.searchshop = function () {
      $scope.conpagenum = '1';
      getConnectedList();
    }
    $scope.enterSearch = function (event) {
      if (event.keyCode == "13") {
        $scope.searchshop();
      }
    }
    //每页数据条数改变的时候
    $scope.conpagechange = function (pagesize) {
      console.log(pagesize)
      $scope.conpagesize = pagesize;
      $scope.conpagenum = '1';
      getConnectedList();
    }

    //输入页码数跳转
    $scope.conpagenumchange = function () {
      $scope.conpagenum = $scope.conpagenum * 1;
      if ($scope.conpagenum > $scope.conTotalPage || $scope.conpagenum < 1) return;
      console.log($scope.conpagenum)
      getConnectedList();
    }
    //店铺选择
    $scope.searchshopconnect = function (n) {
      if (n == null) {
        n = '';
      }
      console.log(n)
      $scope.conshopid = n;
      $scope.selectshopinfo = n;
      getConnectedList();

    }

    $scope.showVarient = function (item, index) {
      $scope.Management = [];
      layer.load(2);
      dsp.postFun('app/connection/conListdateill', {
        "data": JSON.stringify({
          accpid: item.ACCPID,
          shopId: item.shopId
        })
      }, function (data) {
        // layer.closeAll("loading")
        dsp.closeLoad();
        var data = data.data;
        if (data.statusCode != '200') {
          console.log(data);
          return false;
        }
        var varientList = JSON.parse(data.result).conList;
        console.log('variantList kkk',varientList)
        for (var i = 0; i < varientList.length; i++) {
          varientList[i].discountPrice = dsp.cacuDiscount(varientList[i].SELLPRICE, varientList[i].SELLDISCOUNT);
          varientList[i].decountry = null;
          varientList[i].deltPrice = 0;
          varientList[i].discountPriceShip = 0;
          varientList[i].ischeck = false;
          if (varientList[i].deltPrice) {
            varientList[i].discountPriceShip = dsp.cacuDiscount(varientList[i].deltPrice, varientList[i].FREIGHTDISCOUNT);
            varientList[i].AMOUNTPRICE = dsp.cacuAmount(varientList[i].discountPrice, varientList[i].discountPriceShip);
          } else {
            varientList[i].discountPriceShip = '';
            varientList[i].AMOUNTPRICE = varientList[i].discountPrice;
          }
          // 物流试算组件用
          varientList[i].shipinfo = {
            weight: varientList[i].PACKWEIGHT,
            enName: varientList[i].LOGISTICS,
            pid: varientList[i].PID,
            shopType:item.shopType,
            shipDiscount: varientList[i].FREIGHTDISCOUNT,
            index1: index,
            index2:i
          }
        }
        console.log(varientList);
        $scope.conlist[index].varientList = varientList;
        $('.media').eq(index).find('.asj-pro-box').hide();
        $('.media').eq(index).css({'padding-bottom': '25px', 'background': '#f8f8f8'});
        console.log($scope.conlist)
        $scope.showFlag = $scope.conlist.filter(function (item) {
          if(item.varientList && item.varientList.length > 0){
            return true;
          }
        })
        console.log($scope.showFlag)
      })
    };
    $scope.Management = []
    $scope.cheched = function (itemV, idx) {
      console.log(itemV)
      //itemV.ischeck = !itemV.ischeck;
      if (itemV.ischeck == false) {
        if ($scope.Management.length > 0) {
          $scope.Management.some(function (o, i) {
            if (itemV.shopName == o.shopName) {
              itemV.ischeck = true;
              $scope.Management.push({vid: itemV.ACCVID, shopName: itemV.shopName, sku: itemV.vsku})
              return true;
            } else {
              layer.msg('Please select the item under the same store');
              itemV.ischeck = false;
              return true;
            }
          })
        } else {
          $scope.Management.push({vid: itemV.ACCVID, shopName: itemV.shopName, sku: itemV.vsku})
          itemV.ischeck = true;
        }
      } else {
        itemV.ischeck = false;
        $scope.Management.forEach(function (o, i) {
          if (o.vid == itemV.ACCVID) {
            $scope.Management.splice(i, 1)
          }
        })
      }
      console.log($scope.Management)
    };
    $scope.fulfil = '1';
    $scope.Levels = '1';
    $scope.management = function () {
      if ($scope.Management.length == 0) {
        layer.msg('Please select the item in the store');
        return;
      }
      $scope.isCJManagement = true;
      $scope.YCJManagement = function () {
        var ShopName = $scope.Management[0].shopName;
        var arr = [];
        $scope.Management.forEach(function (o, i) {
          arr.push({vid: o.vid, sku: o.sku})
        })
        var url;
        var parms;
        if ($scope.fulfil == '1') {
          parms = {
            "fulfillmentservice": $scope.fulfil == '1' ? 'cjdropshipping' : null,
            "inventoryManagement": $scope.Levels == '1' ? 'cjdropshipping' : null,
            "shopName": ShopName,
            "skus": JSON.stringify(arr)
          };
          url = 'app/fulfillment/addProductToFulfillment';
        }else {
          parms = {
            //"fulfillmentservice":"cjdropshipping",
            //"inventoryManagement": $scope.Levels == '1' ? 'cjdropshipping':null,
            "shopName": ShopName,
            "skus": JSON.stringify(arr)
          };
          url = 'app/fulfillment/initFulfillmentService';
        }
        layer.load(2);
        dsp.postFun(url, parms, function (res) {
          layer.closeAll('loading');
          if (res.data.statusCode == 200) {
            $scope.isCJManagement = false;
            getConnectedList()
            $scope.Management = [];
            layer.msg(res.data.result);
          } else {
            layer.msg('The server is busy now, please try again later.')
          }
        }, function (err) {
          layer.msg('Service exception')
        })
      }
    }


    $scope.hideVarient = function (item, index) {
      $scope.Management = [];
      $scope.conlist[index].varientList = undefined;
      $('.media').eq(index).find('.asj-pro-box').show();
      $('.media').eq(index).css({'padding-bottom': '0', 'background': '#fff'});
      console.log($scope.conlist)
      $scope.showFlag = $scope.conlist.filter(function (item) {
        if(item.varientList && item.varientList.length > 0){
          return true;
        }
      })
      console.log($scope.showFlag)
    }

    $scope.disconnect = function (item, index1, index2) {
      console.log(item);
      
      // return alert($rootScope.soldOutCount)
      var disconnectUrl, sendStr;
      if (index2 >= 0) {
        disconnectUrl = 'app/connection/relieveCondetaill';
        sendStr = {"data": "{'id':'" + item.id + "','shopVid':'" + item.ACCVID + "','shopId':'" + item.shopId + "'}"};
      } else {
        disconnectUrl = 'app/connection/relieveCon';
        sendStr = {"data": "{'pid':'" + item.ID + "','shopproductId':'" + item.ACCPID + "','shopId':'" + item.shopId + "'}"};
      }
      layer.open({
        title: null,
        type: 1,
        area: ['480px', '200px'],
        skin: '',
        closeBtn: 0,
        content: '<p>Are you sure to disconnect them?</p>',
        btn: ['Cancel', 'Confirm'],
        yes: function (index, layero) {
          layer.close(index);
        },
        btn2: function (index, layero) {
          layer.load(2)
          dsp.postFun(disconnectUrl, sendStr, function (data) {
            // layer.closeAll("loading")
            dsp.closeLoad();
            var data = data.data;
            console.log(data);
            if (data.statusCode != '200') {
              layer.msg('Disconnect the products failed. ');
              return false;
            }
            var disconnectLayer = index;
            layer.msg('Disconnected Successfully!');
            $timeout(function () {
              layer.close(index);
              layer.close(disconnectLayer);
              if (index2 >= 0) {
                $scope.conlist[index1].varientList.splice(index2, 1);
                if ($scope.conlist[index1].varientList.length == 0) {
                  $scope.conlist.splice(index1, 1);
                }
              } else {
                getConnectedList(); // 刷新数据
                if (item.SALESTATUS == '5') {
                  $rootScope.soldOutCount -= 1; // 导航栏角标数量
                }
              }
            }, 1000);
          });
          return false;
        }
      });
    }
    /*包装相关操作*/
    //批量关联
    $scope.batchAssociation = function (item) {
      console.log(item);
      let itemData = {
        type: "0",
        pid: item.ID,
        shopId:item.shopId,
        NAMEEN: item.NAMEEN, //商品名称
        SKU: item.SKU,  // sku
        prices: item.prices, //价格
        packweight: item.packweight, //重量
      };
      location.href = '#/relevant-packaging/' + base64.encode(JSON.stringify(itemData)) + '/0';
    };
    //关联包装
    $scope.associatedPackaging = function (item) {
      console.log(item)
      let arr = item.STANDARD ? item.STANDARD.split(',') : [], long = null, width = null, height = null;
      arr.forEach((o, i) => {
        if (o.indexOf('long') !== -1) {
          long = o.substr(o.indexOf('=') + 1, o.length)
        }else if (o.indexOf('width') !== -1) {
          width = o.substr(o.indexOf('=') + 1, o.length)
        }else if (o.indexOf('height') !== -1) {
          height = o.substr(o.indexOf('=') + 1, o.length)
        }
      });
      let itemData = {
        type: "1",
        VID: item.VID,
        shopId:item.shopId,
        NAMEEN: item.NAMEEN, //商品名称
        SKU: item.SKU,  // sku
        prices: item.prices, //价格
        packweight: item.PACKWEIGHT, //重量
        long: long, //长
        width: width, //宽
        height: height, //高
      };
      location.href = '#/relevant-packaging/' + base64.encode(JSON.stringify(itemData)) + '/0';
    }
    //查看包装
    $scope.viewPackaging = function (item) {
      console.log(item)
      location.href = '#/package-inventory/'+item.packVid+'/0'
    }
    //解除绑定
    $scope.unBind = function (item) {
      console.log(item)
      layer.open({
        type: 1,
        content: '<p>Are you sure to remove the binding?</p>',
        area: ['480px', '200px'],
        closeBtn: 0,
        shadeClose: true,
        title: null,
        skin: "",
        btn: ['No', 'Yes'],
        success: function (layero, index) {
        },
        yes: function (index, layero) {
          layer.close(index);
        },
        btn2: function (index, layero) {
          var parms = {
            type:'0',
            pid:item.ID || '',
            vid:item.VID || '',
            shopId:item.shopId
          };
          layer.load(2);
          dsp.postFun('cj/PackProduct/delCorrelation', parms, (res) => {
            layer.closeAll('loading');
            if(res.data.statusCode == '200'){
              layer.msg('Binding removed')
              layer.close(index);
              getConnectedList();
            }else {
              layer.msg('Binding removal failed')
            }
          }, (err) => {
            layer.close(index);
            console.log(err)
          })
          return false;
        }
      });
    };
  }]);
  let liststatus='';
  app.controller('historyCtrl', ['$scope', '$http', '$window', '$location', '$timeout', '$routeParams', 'dsp', function ($scope, $http, $window, $location, $timeout, $routeParams, dsp) {
    // console.log('historyCtrl')
    dsp.domainData().then((res) => {
      $scope.iscj = res.iscj;
      if ($scope.iscj == '1') {
        //cj
        $scope.websiteName = 'CJ';
      } else {
        //客户
        $scope.websiteName = res.websiteName || 'CJ';
      }
    })
    var base64 = new Base64();
    var userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
    var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
    if (vip == '1') {//vipFlag
      $('.header-nav').addClass('vipFlag');
      $('.mycj-right-wrap').css('background', '#F0EDE7').addClass('vip');
      angular.element('.content').addClass('vip');
    } else {
      $('.header-nav').removeClass('vipFlag');
      $('.mycj-right-wrap').css('background', '#f2f3f5').removeClass('vip');
      angular.element('.content').removeClass('vip');
    }
    $('.header-nav li').eq(2).addClass('active');
    $scope.afterGetLeftNav = function () {
      if (vip == '1') {
        $('.mycj-left-bar').addClass('vipFlag');
      } else {
        $('.mycj-left-bar').removeClass('vipFlag');
      }
      $('.mycj-left-bar li').eq(0).addClass('active');
    }
    dsp.setRightMinHeight();
    $scope.listedList = [];
    $scope.listedsearch = '';
    $scope.listedpagesize = '10';
    $scope.listedpagenum = '1';
    $scope.listedTotalNum = '';
    $scope.listedTotalPage = '';
    $scope.listedsearch = '';
    $scope.shopId = '';
    $scope.listCheckLen = 0;
    $scope.getListedUrl = 'app/rebate/getAssignAndVisibility';

    // 刊登列表状态
    $scope.status = $routeParams.status ? $routeParams.status : '-1';
    console.log($scope.status) //0--待刊登，1--刊登中，2--刊登失败

    var listDataObj = {
      "-1": {
        "url": "pojo/product/getListedCj"
      },
      "0": {
        "url": "cj/listedproduct/list"
      },
      "1": {
        "url": "cj/listedproduct/list"
      },
      "2": {
        "url": "cj/listedproduct/list"
      }
    }
    // 编辑刊登
    $scope.editList = function (item,index) {
      editIndex = index;
      $scope.$broadcast('showeditframe', {
        from: '2',
        pid: item.ID
      });
    }
    $scope.$on('editListSuccess', function (d, data) {
      $scope.getListedPost();
    });
    // 全选
    $scope.checkOne = function () {
      $scope.banListItems = $scope.listedList.filter(function (e) {
        return e.check;
      })
      $scope.listCheckLen = $scope.banListItems.length;
      if ($scope.banListItems.length == $scope.listedList.length) {
        $scope.check_All = true;
      } else {
        $scope.check_All = false;
      }
    }
    $scope.checkAll = function (val) {
      if(val=='all'){
        $scope.check_All=!$scope.check_All;
        $scope.listCheckLen = $scope.check_All?$scope.listedTotalNum:0
      }
      $scope.listedList.forEach(function (e) {
        e.check = $scope.check_All;
      })
      if($scope.check_All){
        $scope.banListItems = $scope.listedList;
      }else{
        $scope.banListItems = [];
      }
      $scope.listCheckLen = $scope.check_All?$scope.listedTotalNum:0
      
      console.log($scope.listedList)
    }
    $scope.banListItems = [];
    //
    $scope.banchList = function () {
      if ($scope.banListItems.length == 0) {
        layer.msg('Please select at least one product!');
        return;
      }
      console.log($scope.banListItems);
      $scope.confirmDelLayer = true;
    }
    $scope.goActBanList = function () {
      for (var i = 0; i < $scope.banListItems.length; i++) {
        if (!$scope.banListItems[i].SHOPNAME || $scope.banListItems[i].ACCPRICE == '0.0') {
          layer.msg('Products information short, please optimize products detail and try again.')
          return;
        }
      }
      var banchListIds = [];
      $scope.listedList.forEach(function (e) {
        e.check ? banchListIds.push(e.ID) : '';
      })
      console.log(banchListIds)
      dsp.postFun('cj/listedproduct/submit', banchListIds, function (data) {
        if (data.data.statusCode == 200) {
          layer.msg('Submit Successfully');
          $scope.confirmBanListFlag = 0;
          $scope.getListedPost();
        } else {
          layer.msg('Submit Failed');
        }
      })
    }

    
    function settleData(result) {
      var list = result.products;
      var remarkArr = result.remark || [];
      for (var i = 0; i < list.length; i++) {
        list[i].BIGIMG = list[i].BIGIMG.replace('https://', '').replace('http://', '');
        list[i].BIGIMG = 'https://' + list[i].BIGIMG;
        list[i].INVENTORCOUNTRY = list[i].INVENTORCOUNTRY
          ? JSON.parse(list[i].INVENTORCOUNTRY)
          : {China: 0, US: 0};
        list[i].decountry = null;
        list[i].deltPrice = 0;
        if (list[i].deltPrice) {
          list[i].AMOUNTPRICE = dsp.cacuAmount(list[i].SELLPRICE, list[i].deltPrice);
        } else {
          list[i].AMOUNTPRICE = list[i].SELLPRICE;
        }
        for (var j = 0; j < remarkArr.length; j++) {
          if (list[i].LOGISTICS && list[i].LOGISTICS == remarkArr[j].nameen) {
            list[i].wuliuRemark = remarkArr[j].remark;
            break;
          }
        }
        // 物流试算组件用
        list[i].shipinfo = {
          weight: list[i].PACKWEIGHT,
          enName: list[i].LOGISTICS,
          shopType:list[i].SHOPTYPE,
          pid: list[i].PID,
          // shipDiscount: list[i].discountShopRate,
          index1: i
        }
      }
      $scope.listedList = list;
      console.log($scope.listedList);
    }

    // 物流试算组件返回值接收
    $scope.$on('saveShipPrice', function (d, data) {
      $scope.listedList[data.index1].AMOUNTPRICE = dsp.cacuAmount($scope.listedList[data.index1].SELLPRICE, data.shipDiscountPrice || 0);
      $scope.$apply();
    })
    
    //开启刊登任务之后轮询执行每一条刊登,status为1时
    $scope.listIndex = 0;
    $scope.progressLength=0;
    $scope.listCountdownObj = {
      isShow:false,
      time:30
    }
    let timer =null;
    function startListFun(){
      dsp.postFun('listed_products/listedLocproduct/do',{
        id:$scope.listedList[$scope.listIndex].ID
      }, function (data) {
        layer.closeAll('loading');
        let ocode = data.data.statusCode;
        if (ocode == 801||ocode == 804) {
          $scope.listedList[$scope.listIndex].status=2;
        }else{
          $scope.listedList[$scope.listIndex].status=3;
        }
        console.log('$scope.listIndex==='+$scope.listIndex);
        $scope.progressLength=(Number($scope.listIndex-0+1)/Number($scope.listedList.length)*100).toFixed(0);
        if($scope.listIndex==$scope.listedList.length-1&&$scope.listedList.length==100){//
          $scope.listCountdownObj.isShow = true;
          function countDownFun(){
            if($scope.listCountdownObj.time>0){
              $scope.listCountdownObj.time-=1;
              timer = setTimeout(countDownFun,1000);
              if($scope.listCountdownObj.time<29){
                $scope.$apply();
              }
            }else{
              clearTimeout(timer);
              $scope.getListedPost();
            }
          }
          countDownFun();
        }
        if(($scope.listIndex<$scope.listedList.length-1) && liststatus==1){
          $scope.listIndex += 1;
          startListFun();
        }
      })
    }
    function getShopList(){
      layer.load(2);
      //获取店铺列表
      dsp.postFun('app/shop/getshop',{
        data:JSON.stringify({userId:userId})
      }, (res)=>{
        layer.closeAll();
        var obj = JSON.parse(res.data.result);
        $scope.shopList = obj.shoplist;
      })
    }
    function resetListing(){//重置listing数据
      clearTimeout(timer);
      $scope.listIndex=0;
      $scope.listCountdownObj = {
        isShow:false,
        time:30
      }
      $scope.progressLength=0;//百分比进度条重置为0
    }
    $scope.getListedPost = function () {
      var getListedList = {};
      resetListing();
      getListedList.pageNum = $scope.listedpagenum + '';
      getListedList.pageSize = ($scope.status==1?100:$scope.listedpagesize) + '';
      getListedList.shopId = $scope.shopId;
      getListedList.inputStr = $scope.listedsearch;
      getListedList.status = $scope.status;
      $scope.listedList = [];
      dsp.loadPercent($('.cj-load-wrap'), skuPicHeight);
      dsp.postFun(listDataObj[$scope.status].url, JSON.stringify(getListedList), function (data) {
        dsp.closeLoadPercent($('.cj-load-wrap'));
        var data = data.data;
        if (data.statusCode != 200) {
          $scope.listedList = [];
          dsp.addNodataPic($('.cj-load-wrap'), skuPicHeight);
          console.log(data);
          return false;
        }
        var result = JSON.parse(data.result);
        if (result.totle == 0) {
          $scope.listedList = [];
          dsp.addNodataPic($('.cj-load-wrap'), skuPicHeight);
          $scope.listedTotalNum = 0;
          $scope.listedTotalPage = 0;
          $scope.hasListedData = false;
          $scope.noListedData = true;
          console.log(data);
          return false;
        }
        
        $scope.listedTotalNum = result.totle;
        $scope.listedTotalPage = Math.ceil(($scope.listedTotalNum * 1) / ($scope.listedpagesize * 1));
        $scope.hasListedData = true;
        $scope.noListedData = false;
        settleData(result);
        
        dsp.removeNodataPic($('.cj-load-wrap'));
        if($scope.status=='1'&&$scope.listedList.length>0){
          liststatus = 1;//当前在轮询刊登列表
          $scope.listedList = $scope.listedList.map(item=>{
            item.status=1;
            return item;
          })
          startListFun();
        }else{
          liststatus=2;//当前不在轮询刊登列表
        }
        if($scope.status=='-1'||$scope.status=='2'){//在listed与list Fail列表时请求店铺接口
          getShopList();
        }
        $scope.$broadcast('page-data', {
          pageNum:$scope.listedpagenum * 1,
          totalNum:$scope.listedTotalPage,
          totalCounts:$scope.listedTotalNum * 1,
          pageSize:$scope.listedpagesize,
          pagesizeList:['10','20','50']
        });
      });
    }
    $scope.getListedPost();
    $scope.$on('pagedata-fa',function(d,data){//分页切换数据监听
      $scope.listedpagenum = data.pageNum;
      $scope.listedpagesize = data.pageSize;
      $scope.getListedPost();
    })
    $scope.enterSearch = function (event) {
      if (event.keyCode == 13) {
        $scope.getListedPost();
      }
    }

    var deleteItem = {};
    $scope.listeddelet = function (item, index) {
      deleteItem = item;
      deleteItem.index = index;
      $scope.confirmDelLayer = true;
      $scope.confirmDelLayer = 1;
      $scope.banListItems.push(item);
    }
    $scope.doDelete = function () {//在listed的tab使用
      if (deleteItem.SHOPTYPE == "Woocommerce") {
        layer.load(2);
        // dsp.load();
        dsp.getFun('app/woocommerce/wooDeleteProduct?id=' + deleteItem.ID, function (data) {
          layer.closeAll('loading');
          if (data.data.statusCode == 200) {
            $scope.listedList.splice(deleteItem.index, 1);
            $scope.confirmDelLayer = 0;
          } else {
            layer.msg('Delete failed');
          }
        })
      } else if (deleteItem.SHOPTYPE == "Lazada") {
        layer.load(2);
        // dsp.load();
        dsp.postFun('lazada/product/deleteProductById', {
          'shopId': deleteItem.SHOPID, 'accPid': deleteItem.ACCPID
        }, function (data) {
          // console.log(data);
          layer.closeAll('loading');
          var data = data.data;
          if (data.statusCode != 200) {
            layer.msg('Delete failed');
            return false;
          }
          layer.msg('Delete successfully', {
            time: 1000
          });
            $scope.getListedPost(); // 刷新列表
          $scope.confirmDelLayer = 0;
        });
      } else if (deleteItem.SHOPTYPE == "shopee") {
        layer.load(2);
        // dsp.load();
        dsp.postFun('shopee/product/deleteProductById', {
          'shopId': deleteItem.SHOPID, 'accPid': deleteItem.ACCPID
        }, function (data) {
          // console.log(data);
          layer.closeAll('loading');
          var data = data.data;
          if (data.statusCode != 200) {
            layer.msg('Delete failed');
            return false;
          }
          layer.msg('Delete successfully', {
            time: 1000
          });
          $scope.getListedPost(); // 刷新列表
          $scope.confirmDelLayer = 0;
        });
      } else if (deleteItem.SHOPTYPE == "ebay") {
        layer.load(2);
        // dsp.load();
        dsp.getFun('app/ebay/item/' + deleteItem.ID, function (data) {
          layer.closeAll('loading');
          if (data.data.statusCode == 200) {
            $scope.listedList.splice(deleteItem.index, 1);
            $scope.confirmDelLayer = 0;

            layer.msg('Delete successfully', {
              time: 1000
            });
          } else {
            layer.msg('Delete failed');
          }
        })
      }else {
        layer.load(2);
        // dsp.load();
        dsp.getFun('pojo/product/cancelListed?id=' + deleteItem.ID, function (data) {
          // console.log(data);
          layer.closeAll('loading');
          var data = data.data;
          if (data.statusCode != 200) {
            layer.msg('Delete failed');
            return false;
          }
          layer.msg('Delete successfully', { time: 1000 });
          $scope.getListedPost(); // 刷新列表
          $scope.confirmDelLayer = false;
        });
        return false;
      }
    }
    //刪除列表
    $scope.doDelete2 = function () {
      layer.load(2);
      let oarr = $scope.banListItems.map(item=>{
        return item.ID
      });
      dsp.postFun('cj/listedproduct/delete',oarr, function (data) {
        layer.closeAll('loading');
        if (data.data.statusCode == 200) {
          //循环删除item
          $scope.getListedPost();
          $scope.confirmDelLayer = false;
        } else {
          layer.msg('Delete failed');
        }
      })
    }

    $scope.categoryType = 'select' || 'input';

    //获取选择的id数组
    function getSelectFun(){
      $scope.banListItems = $scope.listedList.filter(function(e) {
        return e.check;
      })
      if ($scope.banListItems.length == 0) {
        throw layer.msg('Please select at least one product!');
      }
      let oarr = $scope.banListItems.map(item=>{
        return item.ID
      });
      $scope.queueParams.ids=oarr;
    }
    $scope.startList = (val) => {//开始提交刊登
      if($scope.listedList.length==0) return false;
      if(val=='all'){
        $scope.check_All=true;
        $scope.listedList = $scope.listedList.map(item=> {
          item.check=true;
          return item;
        })
      }else{
        getSelectFun();
      }
      layer.load(2);
      //获取店铺列表
      dsp.postFun('app/shop/getshop',{
        data:JSON.stringify({userId:userId})
      }, (res)=>{
        layer.closeAll();
        var obj = JSON.parse(res.data.result);
        if(obj.shoplist){
          //目前只支持shopify的店铺
          $scope.shopList = (obj.shoplist).filter(item=>{
            if(item.TYPE=='shopify') return item;
          });
          if($scope.shopList.length>0){
            $scope.showStartListDialog = true;
          }else{
            layer.open({
              area: ['480px', '200px'],
              title: '',
              closeBtn: 0,
              btn: ['Confirm'],
              shadeClose: true,
              skin: '',
              content: '<p style="margin-top:45px">The listing feature is only available to Shopify stores now.</p>',
              yes: function (index, layero) {
                  layer.close(index);
              }
            });
          }
        }else{
          layer.msg('Failed to get your stores');
        }
      })
    }
    //提交刊登请求数据
    $scope.queueParams = {
      logistics:'',
      taxable:'0',
      tax:false
    };
    //全部提交到刊登队列
    $scope.submitAllFun =()=>{
      dsp.postFun('cj/listedproduct/submitAll', $scope.queueParams, (res)=>{
        layer.closeAll();
        location.href='myCJ.html#/products-connection/history/1';
      });
    }

    //提交到刊登队列
    $scope.listConfirmFun = ()=>{
      if($scope.categoryType=='select'){
        $scope.queueParams.productType = $scope.categoryItem.product_type;
      }
      $scope.queueParams.shopId = $scope.shopItem.ID;
      $scope.queueParams.shopName = $scope.shopItem.NAME;
      $scope.queueParams.logistics = $scope.shippingItem.enName;
      $scope.queueParams.taxable=$scope.queueParams.tax?'1':'0';
      console.log($scope.queueParams)
      if(!$scope.queueParams.shopId){
        return layer.msg('Please select Store');
      }else if(!$scope.queueParams.productType){
        return layer.msg('Please select Category')
      }else if(!$scope.queueParams.logistics){
        return layer.msg('Please select Shipping')
      }
      layer.load(2);
      if($scope.check_All){//全部选择
        $scope.submitAllFun();
      }else{
        dsp.postFun('cj/listedproduct/submit', $scope.queueParams, (res)=>{
          layer.closeAll();
          location.href='myCJ.html#/products-connection/history/1';
        });
      }
    }
    function getShippingFun(){//获取物流列表
      dsp.postFun2('getNewModeByShopType.json',{shopeType:$scope.shopItem.TYPE}, function (data) {
        $scope.shippingList = data.data;
        console.log(data)
      })
    }

    //修改店铺获取相应的标题和物流
    $scope.changeListFun = ()=>{
      console.log($scope.shopItem)
      //获取商品
      layer.load(2);
      dsp.getFun(`pojo/product/ShopifyProductType?shopId=${$scope.shopItem.ID}`, function (data) {
        layer.closeAll();
        $scope.categoryList = JSON.parse(data.data.result) || [];
        $scope.categoryList = $scope.categoryList.map(item => {
          item.name = item.product_type; // 统一店铺名称 name 字段，方便模版取值
          return item;
        });
      })
      getShippingFun();
    }
    $scope.listPriceObj = {//编辑金额参数
      flag:'2',//0:固定价格；1:+；2：*
      price:'',
      lastPrice:'',
      fixedPrice:''
    }
    $scope.confirmPriceFun=()=>{
      let param = {
        ids:$scope.queueParams.ids
      }
      if($scope.priceCheck){
        param.flag = '0';
        param.price = $scope.listPriceObj.fixedPrice;
      }else{
        param.flag = $scope.listPriceObj.flag;
        param.price = $scope.listPriceObj.price;
      }
      $scope.check_All=false;
      console.log(param)
      dsp.postFun('cj/listedproduct/updatePrice', param, (res)=>{
        $scope.getListedPost();
        $scope.showEditPriceDialog=false;
      });
    }
    function onlyprice(){
      $scope.listPriceObj.price = $scope.listPriceObj.price.replace(/[^\d.]/g,""); 
	    //必须保证第一个为数字而不是. 
      $scope.listPriceObj.price = $scope.listPriceObj.price.replace(/^\./g,""); 
      //保证只有出现一个.而没有多个. 
      $scope.listPriceObj.price = $scope.listPriceObj.price.replace(/\.{2,}/g,"."); 
      //保证.只出现一次，而不能出现两次以上 
      $scope.listPriceObj.price = $scope.listPriceObj.price.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
      $scope.listPriceObj.price = $scope.listPriceObj.price.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    }
    $scope.changeFiexdPriceFun=()=>{
      $scope.listPriceObj.fixedPrice = $scope.listPriceObj.fixedPrice.replace(/[^\d.]/g,""); 
	    //必须保证第一个为数字而不是. 
      $scope.listPriceObj.fixedPrice = $scope.listPriceObj.fixedPrice.replace(/^\./g,""); 
      //保证只有出现一个.而没有多个. 
      $scope.listPriceObj.fixedPrice = $scope.listPriceObj.fixedPrice.replace(/\.{2,}/g,"."); 
      //保证.只出现一次，而不能出现两次以上 
      $scope.listPriceObj.fixedPrice = $scope.listPriceObj.fixedPrice.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
      $scope.listPriceObj.fixedPrice = $scope.listPriceObj.fixedPrice.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    }
    $scope.changePriceFun = ()=>{
      onlyprice($scope.listPriceObj.price);
      if($scope.listPriceObj.flag=='1'){
        $scope.listPriceObj.lastPrice=($scope.listPriceObj.price-0)+10
      }else{
        $scope.listPriceObj.lastPrice=($scope.listPriceObj.price-0)*10
      }
    }
    $scope.listNowFun = (item)=>{
      window.open(`product-detail.html?id=${item.PID}&from=all&fromType=all&list=1`);
    }
    $scope.editPriceFun=()=>{
      getSelectFun();
      $scope.showEditPriceDialog=true;
    }
    $scope.closeCountdownFun = ()=>{
      clearTimeout(timer);
      $scope.listCountdownObj.isShow=false;
    }
  }])

  app.controller('productsSkulistCtrl', ['$scope', '$http', '$window', '$location', '$timeout', '$routeParams', 'dsp', function ($scope, $http, $window, $location, $timeout, $routeParams, dsp) {

    $scope.getListUrl = 'app/rebate/getAssignAndVisibility';
    var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
    if (vip == '1') {//vipFlag
      $('.header-nav').addClass('vipFlag');
      $('.mycj-right-wrap').css('background', '#F0EDE7').addClass('vip');
    } else {
      $('.header-nav').removeClass('vipFlag');
      $('.mycj-right-wrap').css('background', '#f2f3f5').removeClass('vip');
    }
    $('.header-nav li').eq(2).addClass('active');
    $scope.afterGetLeftNav = function () {
      if (vip == '1') {
        $('.mycj-left-bar').addClass('vipFlag');
      } else {
        $('.mycj-left-bar').removeClass('vipFlag');
      }
      $('.mycj-left-bar li').eq(1).addClass('active');
    }
    dsp.setRightMinHeight();
    console.log('productsSkulistCtrl')
    var base64 = new Base64();
    var userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
    // layer.load(2,{shade: [0.3, '#393D49']});
    console.log(userId)
    $scope.skusearch = '';
    $scope.skupagesize = '10';
    $scope.skupagenum = '1';
    $scope.skuTotalNum = '';
    $scope.skuTotalPage = '';
    $scope.skusearch = '';
    $scope.listType = '1';

    // $scope.getListUrl = 'app/rebate/getAssignAndVisibility';

    function getListData(pageNum, pageSize) {
      var sendData;
      sendData = {
        pageNum: pageNum,
        pageSize: pageSize,
        type: $scope.listType,
        search: $scope.skusearch.replace(/'/g, "''")
      }
      return JSON.stringify(sendData);
    }

    function settleData(obj) {
      var productList = obj.list;
      var remarkArr = obj.remark || [];
      for (var i = 0; i < productList.length; i++) {
        productList[i].down = false;
        productList[i].BIGIMG = productList[i].BIGIMG.replace('https://', '').replace('http://', '');
        productList[i].discountPrice = dsp.cacuDiscount(productList[i].SELLPRICE, productList[i].discountPriceRate);
        productList[i].decountry = null;
        productList[i].deltPrice = 0;
        productList[i].discountPriceShip = 0;
        if (productList[i].deltPrice) {
          productList[i].discountPriceShip = dsp.cacuDiscount(productList[i].deltPrice, productList[i].discountShopRate);
          productList[i].AMOUNTPRICE = dsp.cacuAmount(productList[i].discountPrice, productList[i].discountPriceShip);
        } else {
          productList[i].discountPriceShip = '';
          productList[i].AMOUNTPRICE = productList[i].discountPrice;
        }
        for (var j = 0; j < remarkArr.length; j++) {
          if (productList[i].shopMethod && productList[i].shopMethod == remarkArr[j].nameen) {
            productList[i].wuliuRemark = remarkArr[j].remark;
            break;
          }
        }
        // 物流试算组件用
        productList[i].shipinfo = {
          weight: productList[i].packweight,
          enName: productList[i].shopMethod,
          pid: productList[i].PID,
          shopType:productList[i].shopType,
          shipDiscount: productList[i].discountShopRate,
          index1: i
        }
      }
      $scope.skulist = productList;
    }
    // 物流试算组件返回值接收
    $scope.$on('saveShipPrice', function (d, data) {
      if (data.index2 >= 0 && data.index1 >= 0) {
        $scope.skulist[data.index1].vList[data.index2].AMOUNTPRICE = dsp.cacuAmount($scope.skulist[data.index1].vList[data.index2].discountPrice, data.shipDiscountPrice || 0);
      } else {
        $scope.skulist[data.index1].AMOUNTPRICE = dsp.cacuAmount($scope.skulist[data.index1].discountPrice, data.shipDiscountPrice || 0);
      }
      $scope.$apply();
    })

    // $scope.skulist = [];
    function getSkuList() {
      // dsp.load();
      $scope.skulist = [];
      dsp.loadPercent($('.cj-load-wrap'), skuPicHeight);
      dsp.postFun($scope.getListUrl, getListData($scope.skupagenum, $scope.skupagesize), function SKUget(data) {
        console.log(data);
        // layer.closeAll("loading")
        dsp.closeLoadPercent($('.cj-load-wrap'));
        var obj = data.data;
        console.log("SKU", obj);
        $scope.skuall = obj;
        // $scope.skulist = obj.productList;
        if (obj.count == 0) {
          $scope.skuTotalNum = 0;
          $scope.skuTotalPage = 0;
          $scope.skulist = [];
          dsp.addNodataPic($('.cj-load-wrap'), skuPicHeight);
          return;
        }
        dsp.removeNodataPic($('.cj-load-wrap'));
        $scope.skuTotalNum = obj.count;
        $scope.skuTotalPage = Math.ceil(($scope.skuTotalNum * 1) / ($scope.skupagesize * 1));
        settleData(obj);
        pageFun($("#page6"), $scope.skuall.count, $scope.skupagesize * 1, $scope.skupagenum - 0, function (n, type) {
          // layer.load(2,{shade: [0.8, '#393D49']});
          if (type == 'init') return;
          $scope.skupagenum = n + '';
          // dsp.load();
          $scope.skulist = [];
          dsp.loadPercent($('.cj-load-wrap'), skuPicHeight);
          dsp.postFun($scope.getListUrl, getListData($scope.skupagenum, $scope.skupagesize), function (name) {
            // layer.closeAll("loading")
            dsp.closeLoadPercent($('.cj-load-wrap'));
            // var obj = JSON.parse(name.data.result);
            var obj = name.data;
            settleData(obj);
          });
        })
      });
    }

    getSkuList();


    // 获取变体列表
    $scope.showVList = function (item, index1) {
      // dsp.load();
      layer.load(2);
      dsp.postFun('app/rebate/getAssignAndVisibilitydetaill', JSON.stringify({productId: item.productId}), function (data) {
        layer.closeAll("loading")
        console.log(data.data.list);
        item.down = true;
        var vList = data.data.list;
        for (var i = 0; i < vList.length; i++) {
          vList[i].discountPrice = dsp.cacuDiscount(vList[i].SELLPRICE, vList[i].discountPriceRate);
          vList[i].decountry = null;
          vList[i].deltPrice = 0;
          vList[i].discountPriceShip = 0;
          if (vList[i].deltPrice) {
            vList[i].discountPriceShip = dsp.cacuDiscount(vList[i].deltPrice, vList[i].discountShopRate);
            vList[i].AMOUNTPRICE = dsp.cacuAmount(vList[i].discountPrice, vList[i].discountPriceShip);
          } else {
            vList[i].discountPriceShip = '';
            vList[i].AMOUNTPRICE = vList[i].discountPrice;
          }
          // 物流试算组件用
          vList[i].shipinfo = {
            weight: vList[i].PACKWEIGHT,
            enName: vList[i].shopMethod,
            pid: vList[i].PID,
            shipDiscount: vList[i].discountShopRate,
            index1: index1,
            index2: i
          }
        }

        $scope.skulist[index1].vList = vList;
      });
    }
    $scope.hideVList = function (item, index1) {
      item.down = false;
      $scope.skulist[index1].vList = [];
    }
    //skudelet
    $scope.skudelet = function (item, index1, index2) {
      layer.open({
        type: 1,
        content: '<p>Are you sure to delete it?</p>',
        area: ['480px', '200px'],
        closeBtn: 0,
        shadeClose: true,
        title: null,
        skin: "",
        btn: ['No', 'Yes'],
        success: function (layero, index) {
        },
        yes: function (index, layero) {
          layer.close(index);
        },
        btn2: function (index, layero) {
          // deleteCondetaill
          var opeList;
          var deleteUrl;
          if (index2 >= 0) {
            deleteUrl = 'app/connection/deleteCondetaill';
            opeList = JSON.parse(JSON.stringify($scope.skulist[index1].vList));
          } else {
            deleteUrl = 'app/connection/deleteCon';
            opeList = JSON.parse(JSON.stringify($scope.skulist));
          }
          // dsp.load();
          layer.load(2);
          dsp.postFun(deleteUrl, {"data": "{'id':'" + (item.productId || item.ID) + "'}"}, function (data) {
            layer.closeAll("loading")
            var data = data.data;
            console.log(data);
            if (data.statusCode != 200) {
              layer.msg('Delete failed');
              return false;
            }
            layer.msg('Delete successfully', {time: 1000});
            if (index2 >= 0) {
              opeList.splice(index2, 1);
              $scope.skulist[index1].vList = JSON.parse(JSON.stringify(opeList));
            } else {
              getSkuList(); // 刷新数据
              // $scope.skulist = JSON.parse(JSON.stringify(opeList));
            }
            layer.close(index);
          });
          return false;
        }
      });
    }
    // 打开Skualias弹窗
    $scope.skualiasList = {}
    $scope.addSkuList = (item, index2, index1) => {
      console.log('11111111111111111111');
      $scope.skuName = '';
      $scope.skuItemFlag = false;
      $scope.skualias = true;
      $scope.skuItemHint = true;
      $scope.skualiasList.stanId = item.stanId;
      $scope.skualiasList.index2 = index2;
      $scope.skualiasList.index1 = index1;
      $scope.skuliasIndex = [index1, index2]
      if (!item.skuAlisa) {
        $scope.skualiasList.skuAlisa = [];
      } else {
        $scope.skualiasList.skuAlisa = JSON.parse(JSON.stringify(item.skuAlisa.split(',')));
      }
    };
    // 关闭Skualias弹窗
    $scope.closeSkualias = () => {
      $scope.skualias = false;
    };
    // 添加SkuName
    $scope.addSplit = () => {
      if ($scope.skualiasList.skuAlisa && $scope.skualiasList.skuAlisa.length === 3) {
        layer.msg('The quantity that can be added is limited to 3.');
        return
      }
      $scope.skuItemFlag = true;
      $scope.skuItemHint = false;
    };
    // 删除Skualias
    $scope.delSkualias = (item) => {
      layer.open({
        type: 1,
        content: ' <p>Are you sure to delete it?</p>',
        area: ['480px', '200px'],
        closeBtn: 0,
        shadeClose: true,
        title: null,
        skin: "",
        btn: ['No', 'Yes'],
        success: function (layero, index) {
        },
        yes: function (index, layero) {
          layer.close(index);
        },
        btn2: function (index, layero) {
          layer.close(index);
          let data = {
            vid: $scope.skualiasList.stanId,
            bieMing: item
          }
          dsp.postFun('pojo/product/shanChuBieMing', data, (res) => {
            if (res.data.statusCode === '200') {
              $scope.skualiasList.skuAlisa.splice($scope.skualiasList.skuAlisa.indexOf(item), 1);
              $scope.skulist[$scope.skualiasList.index1].vList[$scope.skualiasList.index2].skuAlisa = $scope.skualiasList.skuAlisa.join(',');
            } else {
              layer.msg('Deletion failed');
            }
          })
          // return false;
        }
      });
    };
    // 取消添加Skualias
    $scope.cancelSku = () => {
      $scope.skuItemFlag = false;
      $scope.skuItemHint = true;
      $scope.skuName = '';
    };
    // 确定添加Skualias
    $scope.confirmSku = () => {
      if (!$scope.skuName) {
        layer.msg('Your SKU is required')
        return
      }
      if (strLength($scope.skuName) > 60) {
        layer.msg('The characters of your SKU is limited to 60 letters.');
        return
      }
      let data = {
        vid: $scope.skualiasList.stanId,
        bieMing: [$scope.skuName]
      }
      dsp.postFun('pojo/product/cjKeHuZengJiaBieMingBianTi', data, (res) => {
        if (res.data.statusCode === '200') {
          $scope.skualiasList.skuAlisa.push($scope.skuName);
          $scope.skulist[$scope.skuliasIndex[0]].vList[$scope.skuliasIndex[1]].skuAlisa = $scope.skualiasList.skuAlisa.join(',');
        } else {
          layer.msg('Addition failed');
        }
        $scope.cancelSku();
      })
    };
    function strLength(str) {
      return str.replace(/[\u0391-\uFFE5]/g,"aa").length;
    };
    // 只展示私有商品
    $scope.showPrivatePro = function (flag) {
      if (flag) {
        $scope.listType = '0';
      } else {
        $scope.listType = '1';
      }
      getSkuList();
    }
    //搜索查询
    $scope.searchsku = function () {
      $scope.skupagenum = '1';
      getSkuList();
    }
    $scope.enterSearch = function (event) {
      if (event.keyCode == 13) {
        $scope.searchsku();
      }
    }
    //每页条数改变
    $scope.skupagesizechange = function (n) {
      $scope.skupagenum = '1';
      $scope.skupagesize = n;
      console.log($scope.skupagesize)
      getSkuList();
    }
    //输入页码跳转
    $scope.skupagenumchange = function () {
      if (($scope.skupagenum * 1) < 1 || ($scope.skupagenum * 1) > ($scope.skuTotalPage * 1)) {
        return;
      } else {
        getSkuList();
      }
    }

    //分页相关
    //每页数据条数改变的时候
    $scope.pagechange = function (pagesize) {
      console.log(pagesize)
      $scope.skupagesize = pagesize;
      $scope.skupagenum = '1';
      getSkuList();
    }
    $scope.openSkuFun = function () {
      $scope.addskuFlag = true;
    }
    $('.sea-inp').keypress(function (ev) {
      if (ev.keyCode == '13') {
        $scope.seaSpFun();
      }
    })
    $scope.seaSpFun = function () {
      if (!$scope.seaSpInpVal) {
        layer.msg('Please enter a sku')
        return;
      }
      layer.load(2)
      var filterObj = {};
      filterObj.filter = {};
      filterObj.filter.inputStr = $scope.seaSpInpVal;
      dsp.postFun('pojo/product/getProductByAccount', JSON.stringify(filterObj), function (data) {
        console.log(data)
        layer.closeAll("loading");
        if (data.data.statusCode == 200) {
          $scope.pList = JSON.parse(data.data.result)
          console.log($scope.pList)
          dsp.postFun('pojo/product/quJianshiSuan', {
            "countryCode": $scope.pList[0].ORIGIN==6?"TH":"US",
            "packWeight": "1.0",
            "propertyKey": $scope.pList[0].propertyKey,
            "productId": $scope.pList[0].id,
          }, function (data) {
            console.log(data)
            $scope.logSet = data.data.logSet;
            console.log($scope.logSet)
          }, function (data) {
            console.log(data)
          })
        } else {
          layer.msg('Search error')
        }
      }, function (data) {
        console.log(data)
        layer.closeAll("loading");
      })
    }
    $scope.closeBzFun = function () {
      $scope.addskuFlag = false;
    }
    $scope.sureAddFun = function () {
      if (!$scope.pList) {
        layer.msg('Please search sku first');
        return
      }
      if (!$scope.addWlVal) {
        layer.msg('Please select logistics');
        return
      }
      layer.load(2)
      var addData = {};
      addData.data = {};
      addData.data.productId = $scope.pList[0].id;
      addData.data.shopMethod = $scope.addWlVal;
      addData.data = JSON.stringify(addData.data);
      dsp.postFun('app/locProduct/assign', addData, function (data) {
        console.log(data)
        layer.closeAll('loading')
        if (data.data.statusCode == '200') {
          var parms = {
              type: '0',
              pid: $scope.pList[0].id,
              userid: $scope.userId
          }
          dsp.postFun('erp/publish/Calculation', parms, function() {})
          $scope.addskuFlag = false;
          $scope.logSet = [];
          $scope.pList = [];
        } else {
          layer.msg('Add failed');
        }
      }, function (data) {
        console.log(data)
        layer.closeAll('loading')
      })
    }

    /*包装相关操作*/
    //批量关联
    $scope.batchAssociation = function (item) {
      console.log(item);
      let itemData = {
        type: "0",
        pid: item.productId,
        NAMEEN: item.NAMEEN, //商品名称
        SKU: item.SKU,  // sku
        prices: item.SELLPRICE, //价格
        packweight: item.WEIGHT, //重量
      };
      location.href = '#/relevant-packaging/' + base64.encode(JSON.stringify(itemData)) + '/1';
    };
    //关联包装
    $scope.associatedPackaging = function (item) {
      console.log(item)
      let arr = item.STANDARD ? item.STANDARD.split(',') : [], long = null, width = null, height = null;
      arr.forEach((o, i) => {
        if (o.indexOf('long') !== -1) {
          long = o.substr(o.indexOf('=') + 1, o.length)
        }else if (o.indexOf('width') !== -1) {
          width = o.substr(o.indexOf('=') + 1, o.length)
        }else if (o.indexOf('height') !== -1) {
          height = o.substr(o.indexOf('=') + 1, o.length)
        }
      });
      let itemData = {
        type: "1",
        VID: item.stanId,
        NAMEEN: item.NAMEEN, //商品名称
        SKU: item.SKU,  // sku
        prices: item.SELLPRICE, //价格
        packweight: item.PACKWEIGHT, //重量
        long: long, //长
        width: width, //宽
        height: height, //高
      };
      location.href = '#/relevant-packaging/' + base64.encode(JSON.stringify(itemData)) + '/1';
    }
    //查看包装
    $scope.viewPackaging = function (item) {
      console.log(item)
      location.href = '#/package-inventory/'+item.packVid+'/1'
    }
    //解除绑定
    $scope.unBind = function (item) {
      console.log(item)
      layer.open({
        type: 1,
        content: '<p>Are you sure to remove the binding?</p>',
        area: ['480px', '200px'],
        closeBtn: 0,
        shadeClose: true,
        title: null,
        skin: "",
        btn: ['No', 'Yes'],
        success: function (layero, index) {
        },
        yes: function (index, layero) {
          layer.close(index);
        },
        btn2: function (index, layero) {
          var parms = {
            type:'1',
            pid:item.productId || '',
            vid:item.stanId || '',
          };
          layer.load(2);
          dsp.postFun('cj/PackProduct/delCorrelation', parms, (res) => {
            layer.closeAll('loading');
            if(res.data.statusCode == '200'){
              layer.msg('Binding removed')
              layer.close(index);
              getSkuList();
            }else {
              layer.msg('Binding removal failed')
            }
          }, (err) => {
            layer.close(index);
            console.log(err)
          })
          return false;
        }
      });
    };
  }])

  app.controller('productsServiceCtrl', ['$scope', '$http', '$window', '$location', '$timeout', '$routeParams', 'dsp', function ($scope, $http, $window, $location, $timeout, $routeParams, dsp) {
    $scope.getListUrl = 'pojo/product/getServiceProcuctCj';
    var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
    if (vip == '1') {//vipFlag
      $('.header-nav').addClass('vipFlag');
      $('.mycj-right-wrap').css('background', '#F0EDE7').addClass('vip');
    } else {
      $('.header-nav').removeClass('vipFlag');
      $('.mycj-right-wrap').css('background', '#f2f3f5').removeClass('vip');
    }
    $('.header-nav li').eq(2).addClass('active');
    $scope.afterGetLeftNav = function () {
      if (vip == '1') {
        $('.mycj-left-bar').addClass('vipFlag');
      } else {
        $('.mycj-left-bar').removeClass('vipFlag');
      }
      $('.mycj-left-bar li').eq(2).addClass('active');
    }
    dsp.setRightMinHeight();
    console.log('productsServiceCtrl')
    var base64 = new Base64();
    var userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
    // layer.load(2,{shade: [0.3, '#393D49']});
    console.log(userId)
    $scope.skusearch = '';
    $scope.skupagesize = '10';
    $scope.skupagenum = '1';
    $scope.skuTotalNum = '';
    $scope.skuTotalPage = '';
    $scope.skusearch = '';
    $scope.listType = '1';

    // $scope.getListUrl = 'app/rebate/getAssignAndVisibility';

    function getListData(pageNum, pageSize) {
      var sendData;
      sendData = {
        pageNum: pageNum,
        pageSize: pageSize,
        inputStr: $scope.skusearch.replace(/'/g, "''")
      }
      return JSON.stringify(sendData);
    }

    function settleData(obj) {
      var pList = obj.list;
      var remarkArr = obj.remark || [];
      for (var i = 0; i < pList.length; i++) {
        pList[i].down = false;
        pList[i].BIGIMG = pList[i].BIGIMG.replace('https://', '').replace('http://', '');
        pList[i].INVENTORCOUNTRY = JSON.parse(pList[i].INVENTORCOUNTRY);
        for (var k = 0; k < pList[i].stanProdcuts.length; k++) {
          pList[i].stanProdcuts[k].serviceFee = (pList[i].stanProdcuts[k].CNTOUSACHARGE * 1 + pList[i].stanProdcuts[k].PROCESSCHARGE * 1 + pList[i].stanProdcuts[k].UNLOADCHARGE * 1).toFixed(2);
          // 物流试算组件用
          pList[i].stanProdcuts[k].shipinfo = {
            weight: pList[i].stanProdcuts[k].PACKWEIGHT,
            enName: pList[i].stanProdcuts[k].shopMethod,
            pid: pList[i].stanProdcuts[k].PID,
            shipDiscount: pList[i].stanProdcuts[k].discountShopRate,
            index1: i,
            index2: k
          }
        }
        pList[i].AMOUNTPRICE = pList[i].serviceFee || 0;
        for (var j = 0; j < remarkArr.length; j++) {
          if (pList[i].shopMethod && pList[i].shopMethod == remarkArr[j].nameen) {
            pList[i].wuliuRemark = remarkArr[j].remark;
            break;
          }
        }
        // 物流试算组件用
        pList[i].shipinfo = {
          weight: pList[i].packweight,
          enName: pList[i].shopMethod,
          pid: pList[i].PID,
          shipDiscount: pList[i].discountShopRate,
          index1: i
        }
      }
      $scope.skulist = pList;
    }

    // 物流试算组件返回值接收
    $scope.$on('saveShipPrice', function (d, data) {
      if (data.index2 >= 0 && data.index1 >= 0) {
        $scope.skulist[data.index1].stanProdcuts[data.index2].AMOUNTPRICE = dsp.cacuAmount($scope.skulist[data.index1].stanProdcuts[data.index2].serviceFee, data.shipDiscountPrice || 0);
      } else {
        $scope.skulist[data.index1].AMOUNTPRICE = dsp.cacuAmount($scope.skulist[data.index1].serviceFee, data.shipDiscountPrice || 0);
      }
      $scope.$apply();
    })

    // $scope.skulist = [];
    function getSkuList() {
      // dsp.load();
      $scope.skulist = [];
      dsp.loadPercent($('.cj-load-wrap'), skuPicHeight);
      dsp.postFun($scope.getListUrl, getListData($scope.skupagenum, $scope.skupagesize), function SKUget(data) {
        console.log(data);
        // layer.closeAll("loading")
        dsp.closeLoadPercent($('.cj-load-wrap'));
        var obj = data.data;
        var result = JSON.parse(obj.result);
        console.log("service", result);
        if ($scope.productType) {
          obj.result = JSON.parse(obj.result);
          var temnum = obj.result.totle;
          obj = obj.result;
          obj.count = temnum;
        }
        if (result.totle == 0) {
          $scope.skuTotalNum = 0;
          $scope.skuTotalPage = 0;
          $scope.skulist = [];
          dsp.addNodataPic($('.cj-load-wrap'), skuPicHeight);
          return;
        }
        dsp.removeNodataPic($('.cj-load-wrap'));
        $scope.skuTotalNum = result.totle;
        $scope.skuTotalPage = Math.ceil(($scope.skuTotalNum * 1) / ($scope.skupagesize * 1));
        settleData(result);
        pageFun($("#page6"), result.totle, $scope.skupagesize * 1, $scope.skupagenum - 0, function (n, type) {
          // layer.load(2,{shade: [0.8, '#393D49']});
          if (type == 'init') return;
          $scope.skupagenum = n + '';
          // dsp.load();
          $scope.skulist = [];
          dsp.loadPercent($('.cj-load-wrap'), skuPicHeight);
          dsp.postFun($scope.getListUrl, getListData($scope.skupagenum, $scope.skupagesize), function (name) {
            // layer.closeAll("loading")
            dsp.closeLoadPercent($('.cj-load-wrap'));
            // var obj = JSON.parse(name.data.result);
            var obj = JSON.parse(name.data.result);
            settleData(obj);
          });
        })
      });
    }

    getSkuList();


    // 获取变体列表
    $scope.showVList = function (item, index1) {
      item.down = true;
    }
    $scope.hideVList = function (item, index1) {
      item.down = false;
      $scope.skulist[index1].vList = [];
    }
    // 只展示私有商品
    $scope.showPrivatePro = function (flag) {
      if (flag) {
        $scope.listType = '0';
      } else {
        $scope.listType = '1';
      }
      getSkuList();
    }
    //搜索查询
    $scope.searchsku = function () {
      $scope.skupagenum = '1';
      getSkuList();
    }
    $scope.enterSearch = function (event) {
      if (event.keyCode == 13) {
        $scope.searchsku();
      }
    }
    //每页条数改变
    $scope.skupagesizechange = function (n) {
      $scope.skupagenum = '1';
      $scope.skupagesize = n;
      console.log($scope.skupagesize)
      getSkuList();
    }
    //输入页码跳转
    $scope.skupagenumchange = function () {
      if (($scope.skupagenum * 1) < 1 || ($scope.skupagenum * 1) > ($scope.skuTotalPage * 1)) {
        return;
      } else {
        getSkuList();
      }
    }

    //分页相关
    //每页数据条数改变的时候
    $scope.pagechange = function (pagesize) {
      console.log(pagesize)
      $scope.skupagesize = pagesize;
      $scope.skupagenum = '1';
      getSkuList();
    }
  }])

  app.controller('productsConnectionCtrl', ['$scope', '$http', '$window', '$location', '$timeout', '$routeParams', 'dsp', function ($scope, $http, $window, $location, $timeout, $routeParams, dsp) {
    $scope.isAutoCone = true;
    var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
    if (vip == '1') {//vipFlag
      $('.header-nav').addClass('vipFlag');
      $('.mycj-right-wrap').css('background', '#F0EDE7');
    } else {
      $('.header-nav').removeClass('vipFlag');
      $('.mycj-right-wrap').css('background', '#f2f3f5');
    }
    $('.header-nav li').eq(2).addClass('active');
    $scope.afterGetLeftNav = function () {
      if (vip == '1') {
        $('.mycj-left-bar').addClass('vipFlag');
      } else {
        $('.mycj-left-bar').removeClass('vipFlag');
      }
      $('.mycj-left-bar li').eq(0).addClass('active');
    }
    dsp.setRightMinHeight();
    $('#product-connection').css('height', $(document).height() + 'px');
    var base64 = new Base64();
    $scope.userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
    var searFromOrder;
    if ($routeParams.searchstr) {
      searFromOrder = base64.decode($routeParams.searchstr);
    } else {
      searFromOrder = '';
    }
    console.log('canshu1', $routeParams.searchstr);
    console.log('canshu2', $routeParams.mcInfo);
    $scope.getWayData = {};
    $scope.getDetailData = {};
    if ($routeParams.mcInfo) {
      $scope.manualConnectInfo = JSON.parse(base64.decode($routeParams.mcInfo));
      console.log($scope.manualConnectInfo);
      $scope.connect2 = function (item) {
        $scope.arr = [];
        $scope.getWayData.weight = $scope.manualConnectInfo.packWeight;
        $scope.getWayData.lcharacter = $scope.manualConnectInfo.propertyKey;
        $scope.getDetailData.productId = $scope.manualConnectInfo.storePid;
        $scope.getDetailData.pid = $scope.manualConnectInfo.pId;
        $scope.getDetailData.shopId = $scope.manualConnectInfo.shopId;
        getTanData(dsp, $scope);
      }
      $scope.connect2();
    }

    // 将上面导航栏存入变量
    var shopId, pid;
    // 将上面导航栏存入变量
    $scope.tanchuang = false;
    $scope.orange = null;
    $scope.orange2 = null;
    $scope.first = false;
    $scope.last = false;
    $scope.matchitem = null;
    $scope.firstitem = null;
    $scope.lastitem = null;
    //信息查询输入框
    $scope.searchinfoarr = [];
    $scope.searchinfostr = '';
    $scope.souresearchinfo = '';
    $scope.arr = [];
    $scope.sourceitem = null;
    $scope.sourcetanchuang = false;
    $scope.yunfeicountrystr = '';
    $scope.selectshopstr = '';
    $scope.searchinfoshop = searFromOrder || '';
    $scope.classarr = ['yellow-bg', 'green-bg', 'pink-bg', 'blue-bg'];
    $scope.shop = [];

    //初始化数据
    function getListLeft() {
      goGetShopPro(dsp, $scope);
    }

    $scope.getListLeft = function () {
      getListLeft();
    }
    dsp.addNodataPic($('.cj-load-wrap-right'), connectionPicHeight);
    //下拉框选项
    dsp.postFun('app/shop/getshop', {"data": "{'userId':'" + $scope.userId + "'}"}, getshop);
    $scope.hasshopdata = false;

    function getshop(n) {
      var obj = JSON.parse(n.data.result);
      console.log('下拉', obj.shoplist)
      $scope.shopselectlist = obj.shoplist;
      $scope.selectshopinfo = '';
      // $scope.selectshopinfo = $scope.shopselectlist[0];
      getListLeft();
    }

    //刷新信息
    // checkIsEbayInsynn(dsp, $scope);
    // $scope.renovation = function () {
    //   goActSyncShopPro(dsp, $scope);
    // }
    $scope.$on('syncstoresuccess',function () {
      $scope.getListLeft();
    })


    $scope.ifMatch = true;
    //下拉获取店铺信息之后进行商品筛选
    $scope.selectshopstr = '';
    $scope.searchshopcommodity = function (n) {
      $scope.matchitem = null;
      $scope.shopitemindex = -1;
      if (n == null) {
        n = '';
      }
      getListLeft();
      $scope.selectshopstr = n;
      console.log(n)
      $scope.storeinfo = n;
      $scope.$broadcast('currStoreId', $scope.storeinfo);
    }

    //搜索店铺
    $scope.searchshop = function () {
      $scope.matchitem = null;
      $scope.shopitemindex = -1;
      console.log($scope.searchinfoshop, $scope.selectshopstr)
      getListLeft();
    }
    $scope.enterSearchLeft = function (event) {
      if (event.keyCode == 13) {
        $scope.searchshop();
      }
    }
    $scope.seaConResFun = function () {
      var seachCs = $scope.searchinfoshop;
      location.href = "#/products-connection/connected/" + seachCs
    }
    //获取搜索信息
    $scope.searchinfo = function (item, index, index2) {
      $scope.shop[index].cla[index2].flag = true;
      if ($scope.searchinfostr.indexOf(item.classname) == -1) {
        if ($scope.searchinfostr.substr($scope.searchinfostr.length - 1, 1) == ' ') {
          // alert('空格')
        } else {
          $scope.searchinfostr = $scope.searchinfostr + ' ';
        }
        $scope.searchinfostr += item.classname;
        $scope.searchinfostr = $scope.searchinfostr.trim() + ' ';
      }
      console.log($scope.searchinfostr)
    }
    $scope.searchinfo2 = function (item, index, index2) {
      console.log(item, index, index2)
      $scope.shop[index].tagsarr[index2].flag = true;
      if ($scope.searchinfostr.indexOf(item.tagname) == -1) {
        if ($scope.searchinfostr.substr($scope.searchinfostr.length - 1, 1) == ' ') {
          // alert('空格')
        } else {
          $scope.searchinfostr = $scope.searchinfostr + ' ';
        }
        $scope.searchinfostr += item.tagname;
        $scope.searchinfostr = $scope.searchinfostr.trim() + ' ';
      }
      console.log($scope.searchinfostr)
    }
    //删除搜索信息
    $scope.deletesearchinfo = function (item, $event, index, index2) {
      $event.stopPropagation();//禁止事件冒泡
      console.log(item, index, index2)
      console.log(item)
      $scope.shop[index].cla[index2].flag = false;
      var str = $scope.searchinfostr;
      $scope.searchinfostr = str.replace(item.classname, '')

    }
    $scope.deletesearchinfo2 = function (item, $event, index, index2) {
      $event.stopPropagation();//禁止事件冒泡
      console.log(item, index, index2)
      console.log(item)
      $scope.shop[index].tagsarr[index2].flag = false;
      var str = $scope.searchinfostr;
      $scope.searchinfostr = str.replace(item.tagname, '')
    }

    // 初始化右侧数据
    function getListRight() {
      // dsp.load();
      var str;
      if ($scope.searchByPart) {
        str = $scope.searchinfostr.replace(/'/g, "''").replace(/ /g, ',');
      } else {
        str = $scope.searchinfostr.replace(/'/g, "''");
      }
      var jsonObj = {};
      jsonObj.pageSize = '5';
      jsonObj.pageNum = '1';
      // jsonObj.shopId = $scope.selectshopstr;
      jsonObj.userId = $scope.userId;
      jsonObj.search = str;
      $scope.shop2 = [];
      dsp.loadPercent($('.cj-load-wrap-right'), connectionPicHeight);
      dsp.postFun('app/connection/CJList', {"data": JSON.stringify(jsonObj)}, function (name) {
        dsp.closeLoadPercent($('.cj-load-wrap-right'));
        // dsp.closeLoad();
        var obj = JSON.parse(name.data.result);
        if (obj.totalProperty == 0) {
          $scope.shop2 = [];
          dsp.addNodataPic($('.cj-load-wrap-right'), connectionPicHeight);
          $scope.cjProTotalNum = 0;
          $scope.hasCjProData = false;
          return false;
        }
        dsp.removeNodataPic($('.cj-load-wrap-right'));
        console.log(obj)
        $scope.hasCjProData = true;
        $scope.shop2 = obj.root;
        $scope.cjProTotalNum = obj.totalProperty;
        pageFun($("#page2"), obj.totalProperty, 5, 1, function (n, type) {
          if (type == 'init') return;
          // layer.load(2);
          // dsp.load();
          $scope.pagenum2 = n;
          var str;
          if ($scope.searchByPart) {
            str = $scope.searchinfostr.replace(/'/g, "''").replace(/ /g, ',');
          } else {
            str = $scope.searchinfostr.replace(/'/g, "''");
          }
          var jsonObj = {};
          jsonObj.pageSize = '5';
          jsonObj.pageNum = n + '';
          // jsonObj.shopId = $scope.selectshopstr;
          jsonObj.userId = $scope.userId;
          jsonObj.search = str;
          $scope.shop2 = [];
          dsp.loadPercent($('.cj-load-wrap-right'), connectionPicHeight);
          dsp.postFun('app/connection/CJList', {"data": JSON.stringify(jsonObj)}, function (name) {
            // layer.closeAll("loading")
            // dsp.closeLoad();
            dsp.closeLoadPercent($('.cj-load-wrap-right'));
            var obj = JSON.parse(name.data.result);
            console.log(obj)
            $scope.shop2 = obj.root;
          });
        })
      });
    }

    //搜索
    $scope.hasCjProData = false;
    $scope.search = function () {
      // layer.load(2);
      $scope.searchByPart = false;
      getListRight();
      $scope.matchResult = true;
      $scope.ifMatch = false;
    }
    $scope.enterSearchRight = function (event) {
      if (event.keyCode == 13) {
        $scope.search();
      }
    }
    $scope.cancle = function (index) {
      // $scope.shop[index].flag=false;
      $scope.shop[index].win = false;
      // $scope.matchitem = null;
    }
    //match3
    $scope.likeImgArr = []
    $scope.match3 = function (index, item) {
      if (item.flag == false) {
        $scope.matchitem = item;
        $scope.shopitemindex = index;
        console.log($scope.matchitem)
        for (var i = 0; i < $scope.shop.length; i++) {
          $scope.shop[i].flag = false
        }
        $scope.shop[index].flag = true;
      } else {
        $scope.shop[index].flag = false;
        $scope.matchitem = null;
        $scope.shopitemindex = -1;
      }
    }

    //match6
    $scope.match6 = function (item, index) {
      console.log(item,index)
      if (item.flag == false) {
        $scope.matchitem = item;
        $scope.shopitemindex = index;
        console.log($scope.matchitem)
        for (var i = 0; i < $scope.shop.length; i++) {
          $scope.shop[i].flag = false
        }
        // $scope.shop[index].flag = true;
      } else {
        // $scope.shop[index].flag = false;
        $scope.matchitem = null;
        $scope.shopitemindex = -1;
      }
      console.log(index,item)
      let image ;
      console.log(item.image)
      if(item.image.includes('?')){
          image = item.image.substring(0, item.image.indexOf("?"));
          console.log(image)
      }else{
          image = item.image
      }
      console.log(image)
        // alert('13123')
        layer.load()
        const formData = new FormData();
        formData.append('imgUrl', image);
        dsp.postFun(
          'app/picture/searchProduct',
          formData,
          res => {
            console.log(res)
            if (res.data.statusCode == 200) {
              layer.closeAll('loading');
              const resData = JSON.parse(res.data.result);
              if (resData.totalProperty == 0) {
                $scope.shop2 = [];
                dsp.addNodataPic($('.cj-load-wrap-right'), connectionPicHeight);
                $scope.cjProTotalNum = 0;
                $scope.hasCjProData = false;
                return false;
              }
              dsp.removeNodataPic($('.cj-load-wrap-right'));
              $scope.hasCjProData = true;
              $scope.shop2 = []
              $scope.matchResult = true;
              $scope.shop2 = resData.root;
              $scope.cjProTotalNum = resData.totalProperty;
              pageFun($("#page2"), resData.totalProperty, 5, 1, function (n, type) {
                if (type == 'init') return;
                // layer.load(2);
                // dsp.load();
                $scope.pagenum2 = n;
                var str;
                if ($scope.searchByPart) {
                  str = $scope.searchinfostr.replace(/'/g, "''").replace(/ /g, ',');
                } else {
                  str = $scope.searchinfostr.replace(/'/g, "''");
                }
                var jsonObj = {};
                jsonObj.pageSize = '5';
                jsonObj.pageNum = n + '';
                // jsonObj.shopId = $scope.selectshopstr;
                jsonObj.userId = $scope.userId;
                jsonObj.search = str;
                $scope.shop2 = [];
                dsp.loadPercent($('.cj-load-wrap-right'), connectionPicHeight);
                dsp.postFun('app/connection/CJList', {"data": JSON.stringify(jsonObj)}, function (name) {
                  // layer.closeAll("loading")
                  // dsp.closeLoad();
                  dsp.closeLoadPercent($('.cj-load-wrap-right'));
                  var obj = JSON.parse(name.data.result);
                  console.log(obj)
                  $scope.shop2 = obj.root;
                });
              })
            }else {
              $scope.shop2 = []
              layer.closeAll('loading');
              dsp.addNodataPic($('.cj-load-wrap-right'), connectionPicHeight);
              $scope.hasCjProData = false;
              return layer.msg('Get the product data error');
            }
          },
          err => console.error(error),
          {
            headers: {
              'Content-Type': undefined
            },
            // layer2: true
          }
        );
    }

    //match2
    $scope.match2 = function (index, item) {
      $scope.matchitem = item;
      $scope.shopitemindex = index;
      console.log($scope.matchitem)
      console.log(index)
      for (var i = 0; i < $scope.shop.length; i++) {
        $scope.shop[i].win = false
      }
      $scope.shop[index].win = true;
      for (var i = 0; i < $scope.shop.length; i++) {
        $scope.shop[i].flag = false
      }
      $scope.shop[index].flag = true;
    }
    //match
    $scope.match = function (val, index) {
      $('#product-connection').attr('display', 'block');
      $scope.matchitem = val;
      $scope.shopitemindex = index;
      console.log($scope.matchitem)
      shopId = val.pid;
      $scope.matchResult = true;
      $scope.ifMatch = false;
      var str = $scope.searchinfostr.replace(/'/g, "''").replace(/ /g, ',');
      $scope.searchByPart = true;
      getListRight();
    }

    $scope.closetanchuang = function () {
      $('body').css('overflow', 'auto');
      $scope.arr = [];
      $scope.first = false;
      $scope.last = false;
      for (var i = 0; i < $scope.shopList.length; i++) {
        $scope.shopList[i].flag = false;
      }
      for (var i = 0; i < $scope.CJList.length; i++) {
        $scope.CJList[i].flag = false;
      }
      $scope.tanchuang = false;
      $scope.matchcjitem = null;
    }
    // 关联店铺


    //connect
    $scope.connect = function (item) {
      $scope.matchcjitem = item;
      pid = item.ID;
      // $scope.arr=[];
      // console.log($scope.matchitem)
      if (!$scope.matchitem) {
        layer.msg('Please pin your product first！');
        return;
      }
      if ($scope.matchitem.shopType != 'shopify' && $scope.matchitem.shopTyp !='Woocommerce'  && !item.customeDesign && item.customMessage) {
        layer.msg('Unfortunately, The POD products are only available to be connected to Shopify currently.', {
          time: 6000
        });
        return;
      }
      $scope.arr = [];
      $scope.getWayData.weight = item.packweight;
      $scope.getWayData.lcharacter = item.PROPERTYKEY;
      $scope.getWayData.shopType = $scope.matchitem.shopType;
      $scope.getDetailData.productId = $scope.matchitem.pid;
      $scope.getDetailData.pid = pid;
      $scope.getDetailData.shopId = $scope.matchitem.shopId;
      getTanData(dsp, $scope);
      //
      $scope.isLevels = true;
      $scope.Service = '1';
      $scope.Levels = '1';
      $scope.ShopName = $scope.matchitem.shopName;
    }

    //获取物流方式
    $scope.getwuliuway = function (wuliuway) {
      console.log(wuliuway)
      $scope.wuliuway = wuliuway;
      $scope.remark = wuliuway.remark;
    }
    //关联商品的第一次点击
    $scope.firstclick = function (val, num, item) {
      tanShopProClick(val, num, item, $scope);
    }
    //关联商品的第二次点击
    $scope.lastclick = function (val, num, item) {
      tanCjProClick(val, num, item, $scope);
    }
    //取消关联
    $scope.Unlink = function (index) {
      $scope.arr.splice(index, 1);
      $scope.shopList[index].flag = false;
      $scope.CJList[index].flag = false;
      var item1 = $scope.shopList.splice(index, 1);
      var item2 = $scope.CJList.splice(index, 1);
      $scope.shopList.push(item1[0]);
      $scope.CJList.push(item2[0]);
    }
    //点击提交
    $scope.goon = function () {
      $scope.connectStatus = '0';
      goActConnect(dsp, $scope);
    }
  }]);

  app.controller('sourcingconnectionCtrl', ['$scope', '$http', '$window', '$location', '$timeout', '$routeParams', 'dsp', function ($scope, $http, $window, $location, $timeout, $routeParams, dsp) {
    var curPath = $location.path();
    var postUrlLeft;
    if (curPath.indexOf('/products-connection/sourcing-connection') != -1) {
      $scope.connectType = 0;
      postUrlLeft = 'app/connection/sourcecjlist';
    }
    if (curPath.indexOf('/products-connection/service-connection') != -1) {
      $scope.connectType = 1;
      postUrlLeft = 'pojo/product/getServiceProcuctCj';
    }
    if ($routeParams.searchstr) {
      $scope.searchinfosource = $routeParams.searchstr;
    } else {
      $scope.searchinfosource = '';
    }
    $scope.isSourceCon = true;
    var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
    if (vip == '1') {//vipFlag
      $('.header-nav').addClass('vipFlag');
      $('.mycj-right-wrap').css('background', '#F0EDE7');
    } else {
      $('.header-nav').removeClass('vipFlag');
      $('.mycj-right-wrap').css('background', '#f2f3f5');
    }
    $('.header-nav li').eq(2).addClass('active');
    $scope.afterGetLeftNav = function () {
      if (vip == '1') {
        $('.mycj-left-bar').addClass('vipFlag');
      } else {
        $('.mycj-left-bar').removeClass('vipFlag');
      }
      $('.mycj-left-bar li').eq(0).addClass('active');
    }
    dsp.setRightMinHeight();
    $('#sourcing-connection').css('height', $(document).height() + 'px');
    var base64 = new Base64();
    $scope.userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));

    console.log('sourcingconnectionCtrl', $scope.userId)
    // 将上面导航栏存入变量
    var topTabs = $('.top-taps li');
    var shopId, pid;
    // 将上面导航栏存入变量
    $scope.tanchuang = false;
    //
    $scope.orange = null;
    $scope.orange2 = null;
    $scope.first = false;
    $scope.last = false;
    // {storePid: "987644657700", shopId: "7CE4F25E-C441-411B-AA38-310D75EA23ED", pId: "10F8F114-77C4-4B5C-B9A1-0918B379583D", packWeight: "530.0 -- 6030.0", propertyKey: "COMMON"}
    var routeParam = null
    try {
      routeParam = JSON.parse(base64.decode($routeParams.scInfo)); // 选中店铺商品
    } catch (err) {
      console.log(err)
    }

    // $scope.matchitem = routeParam;
    $scope.firstitem = null;
    $scope.lastitem = null;
    //信息查询输入框
    $scope.searchinfoarr = [];
    $scope.searchinfostr = '';
    $scope.souresearchinfo = '';
    $scope.arr = [];
    $scope.sourceitem = null;
    $scope.sourcetanchuang = false;
    $scope.yunfeicountrystr = '';
    $scope.selectshopstr = '';
    $scope.searchinfoshop = '';
    $scope.sourcepagenum = '1';
    var topTabs = $('.top-taps li');

    function runm(x, y) {
      return Math.floor(Math.random() * (y - x + 1) + x)
    }

    // 执行关联窗口自动弹出
    var manualConnectInfo
    if ($routeParams.scInfo) {
      manualConnectInfo = JSON.parse(base64.decode($routeParams.scInfo));
      console.log(manualConnectInfo);
      $scope.searchinfosource = manualConnectInfo.cjProSku;
      $scope.searchinfoshop = manualConnectInfo.storeProductName;
      // return
      // $scope.arr = [];
      // $scope.getWayData.weight = $scope.manualConnectInfo.packWeight;
      // $scope.getWayData.lcharacter = $scope.manualConnectInfo.propertyKey;
      // $scope.getDetailData.productId = $scope.manualConnectInfo.storePid;
      // $scope.getDetailData.pid = $scope.manualConnectInfo.pId;
      // $scope.getDetailData.shopId = $scope.manualConnectInfo.shopId;
      // getTanData(dsp, $scope);
    }

    $scope.classarr = ['yellow-bg', 'green-bg', 'pink-bg', 'blue-bg'];
    //搜品管理数据初始化
    // $scope.noData = false;
    $scope.hasSourceData = false;
    // $scope.reqFlag = 1;

    function getSendData() {
      var jsonObj = {};
      if ($scope.connectType) {
        jsonObj.pageNum = $scope.sourcepagenum;
        jsonObj.pageSize = '5';
        jsonObj.inputStr = $scope.searchinfosource;
      } else {
        jsonObj.data = {};
        jsonObj.data.pageSize = '5';
        jsonObj.data.pageNum = $scope.sourcepagenum;
        jsonObj.data.userId = $scope.userId;
        jsonObj.data.inputStr = $scope.searchinfosource;
        jsonObj.data = JSON.stringify(jsonObj.data);
      }
      return JSON.stringify(jsonObj);
    }

    function settleLeftData(obj) {
      var pList = obj.sourcelist || obj.list;
      for (var i = 0; i < pList.length; i++) {
        var str = pList[i].NAMEEN;
        var arr = str.split(' ');
        var arr2 = pList[i].CATEGORY.split(' / ')
        var cla = [];
        var tagsarr = [];
        // obj.list[i].arr = arr;
        for (var j = 0; j < arr.length; j++) {
          var ob = {};
          ob.classname = arr[j];
          var num = j % 4;
          ob.classindex = num;
          ob.flag = false;
          cla.push(ob)
        }
        for (var j = 0; j < arr2.length; j++) {
          var ob = {};
          ob.tagname = arr2[j];
          var num = j % 4;
          ob.tagindex = num;
          ob.flag = false;
          tagsarr.push(ob)
        }
        pList[i].cla = cla;
        pList[i].tagsarr = tagsarr;
        pList[i].flag = false;
        if ($scope.connectType == 1) {
          for (var k = 0; k < pList[i].stanProdcuts.length; k++) {
            pList[i].stanProdcuts[k].serviceFee = (pList[i].stanProdcuts[k].CNTOUSACHARGE * 1 + pList[i].stanProdcuts[k].PROCESSCHARGE * 1 + pList[i].stanProdcuts[k].UNLOADCHARGE * 1).toFixed(2);
          }
        }
      }
      if (manualConnectInfo && pList.length == 1) {
        pList[0].flag = true;
        $scope.sourceitem = pList[0];
      }
      console.log(pList)
      $scope.sourcelist = pList;
    }

    function getSourceList() {
      $scope.sourcelist = [];
      dsp.loadPercent($('.cj-load-wrap-right'), connectionPicHeight);
      dsp.postFun(postUrlLeft, getSendData(), function (name) {
        // layer.closeAll("loading")
        // dsp.closeLoad();
        dsp.closeLoadPercent($('.cj-load-wrap-right'));
        console.log(name.data);
        // if (name.data.result == '') {
        //   $scope.sourceProTotalpage = 0;
        //   $scope.sourcelist = [];
        //   // $scope.reqFlag == 1
        //   if (!$scope.searchinfosource) {
        //     $scope.noData = true;
        //   }
        //   $scope.hasSourceData = false;
        //   return;
        // }
        var obj = JSON.parse(name.data.result)
        $scope.sourceProTotalpage = obj.total;  // || obj.totle
        if ($scope.sourceProTotalpage == 0) {
          // $scope.sourceProTotalpage = 0;
          $scope.sourcelist = [];
          // if ($scope.reqFlag == 1) {
          //   $scope.noData = true;
          // }
          if (!$scope.searchinfosource) {
            $scope.noData = true;
          }
          dsp.addNodataPic($('.cj-load-wrap-right'), connectionPicHeight);
          $scope.hasSourceData = false;
          return;
        }
        dsp.removeNodataPic($('.cj-load-wrap-right'));
        $scope.noData = false;
        $scope.hasSourceData = true;
        console.log('sourcec', obj)
        settleLeftData(obj);
        pageFun($("#page3"), $scope.sourceProTotalpage, 5, 1, function (n, type) {
          if (type == 'init') return;
          // dsp.load();
          $scope.sourceitem = null;
          $scope.sourcepagenum = n;
          // $scope.reqFlag = 0;
          $scope.sourcelist = [];
          dsp.loadPercent($('.cj-load-wrap-right'), connectionPicHeight);
          dsp.postFun(postUrlLeft, getSendData(), function (name) {
            // layer.closeAll('loading');
            // dsp.closeLoad();
            dsp.closeLoadPercent($('.cj-load-wrap-right'));
            var obj = JSON.parse(name.data.result)
            console.log('sourcec', obj)
            settleLeftData(obj);
          });
        })
      });
    }

    getSourceList();
    $scope.searchsource = function () {
      // $scope.reqFlag = 0;
      $scope.sourcepagenum = '1';
      getSourceList();
    }
    $scope.enterSearchSource = function (event) {
      if (event.keyCode == 13) {
        $scope.searchsource();
      }
    }

    //刷新信息
    // checkIsEbayInsynn(dsp, $scope);
    // $scope.renovation = function () {
    //   goActSyncShopPro(dsp, $scope);
    // }
    $scope.$on('syncstoresuccess', function () {
      $scope.getRightList();
    })

    //下拉框选项
    dsp.postFun('app/shop/getshop', {"data": "{'userId':'" + $scope.userId + "'}"}, getshop);

    function getRightList() {
      goGetShopPro(dsp, $scope);
    }

    $scope.getRightList = function () {
      getRightList();
    }

    function getshop(n) {
      var obj = JSON.parse(n.data.result);
      console.log('下拉', obj.shoplist)
      $scope.shopselectlist = obj.shoplist;
      // $scope.selectshopinfo = $scope.shopselectlist[0];
      $scope.selectshopinfo = '';
      getRightList();
      // $scope.searchshopcommodity($scope.selectshopinfo);
    }

    $scope.ifMatch = true;
    //搜品搜索信息
    $scope.a = function () {
      console.log($scope.souresearchinfo, $scope.searchinfostr)
    }
    //下拉获取店铺信息之后进行商品筛选
    $scope.selectshopstr = '';
    $scope.conshopid = ''
    $scope.searchshopcommodity = function (n) {
      if (n == null) {
        n = '';
      }
      // dsp.load();
      getRightList();
      $scope.conshopid = n;
      console.log(n)
      $scope.storeinfo = n;
      $scope.$broadcast('currStoreId', $scope.storeinfo);
    }

    //搜品店铺搜索信息获取
    $scope.shopsearch = function () {
      getRightList();
    }
    $scope.enterSearchShop = function (event) {
      if (event.keyCode == 13) {
        $scope.shopsearch();
      }
    }

    //获取搜索信息
    $scope.searchinfo = function (item, index, index2) {
      console.log(item, index, index2)
      $scope.sourcelist[index].cla[index2].flag = true;
      if ($scope.searchinfoshop.indexOf(item.classname) == -1) {
        var arr = $scope.searchinfoshop.split(' ');
        $scope.searchinfoshop = arr.join(' ');
        $scope.searchinfoshop += ' ' + item.classname.trim() + ' ';
      }
      console.log($scope.searchinfoshop)
    }
    $scope.searchinfo2 = function (item, index, index2) {

      console.log(item, index, index2)
      var arr = $scope.searchinfoshop.split(' ');
      $scope.searchinfoshop = arr.join(' ');
      $scope.sourcelist[index].tagsarr[index2].flag = true;
      if ($scope.searchinfoshop.indexOf(item.tagname) == -1) {
        $scope.searchinfoshop += ' ' + item.tagname.trim() + ' ';
      }
    }
    // 删除搜索信息
    $scope.deletesearchinfo = function (item, $event, index, index2) {

      $event.stopPropagation();//禁止事件冒泡
      console.log(item, index, index2)
      console.log(item)
      $scope.sourcelist[index].cla[index2].flag = false;
      var str = $scope.searchinfoshop;
      $scope.searchinfoshop = str.replace(item.classname, '')

    }
    $scope.deletesearchinfo2 = function (item, $event, index, index2) {

      $event.stopPropagation();//禁止事件冒泡
      console.log(item, index, index2)
      console.log(item)
      $scope.sourcelist[index].tagsarr[index2].flag = false;
      var str = $scope.searchinfoshop;
      $scope.searchinfoshop = str.replace(item.tagname, '')
    }
    $scope.cancle = function (index) {
      // $scope.shop[index].flag=false;
      $scope.sourcelist[index].win = false;
      // $scope.matchitem = null;
    }
    //sourcematch
    $scope.sourcematch3 = function (index, item) {
      if (item.flag == false) {
        $scope.sourceitem = item;
        console.log($scope.sourceitem)
        for (var i = 0; i < $scope.sourcelist.length; i++) {
          $scope.sourcelist[i].flag = false
        }
        $scope.sourcelist[index].flag = true;
      } else {
        $scope.sourcelist[index].flag = false;
        $scope.sourceitem = null;
      }
    }
    $scope.sourcematch2 = function (item, index) {
      $scope.sourceitem = item;
      $scope.shopitemindex = index;
      console.log($scope.sourceitem)
      console.log(index)
      for (var i = 0; i < $scope.sourcelist.length; i++) {
        $scope.sourcelist[i].win = false
      }
      $scope.sourcelist[index].win = true;
      for (var i = 0; i < $scope.sourcelist.length; i++) {
        $scope.sourcelist[i].flag = false
      }
      $scope.sourcelist[index].flag = true;
    }
    $scope.sourcematch = function (val, index) {
      // if (val.flag==false) {
      //   $scope.sourcematch3(index,val);
      // }
      $scope.sourceitem = val;
      console.log($scope.sourceitem)
      // $scope.searchinfoshop=val.NAMEEN;
      $scope.searchByPart = true;
      getRightList();
    }

    $scope.getWayData = {};
    $scope.getDetailData = {};

    $scope.sourceconnect = function (val, shopitemindex) {
      $scope.shopitemindex = shopitemindex;
      $scope.matchitem = val;
      console.log($scope.matchitem)
      $scope.ShopName = $scope.matchitem.shopName;
      if (!$scope.sourceitem) {
        layer.msg('Please pin your product first！');
        return;
      }
      $scope.arr = [];
      $scope.getWayData.weight = $scope.sourceitem.PACKWEIGHT;
      $scope.getWayData.lcharacter = $scope.sourceitem.PROPERTYKEY;
      $scope.getDetailData.productId = $scope.matchitem.pid;
      $scope.getDetailData.pid = $scope.sourceitem.ID;
      $scope.getDetailData.shopId = $scope.matchitem.shopId;
      getTanData(dsp, $scope);
      //
      $scope.isLevels = true;
      $scope.Service = '1';
      $scope.Levels = '1';
    }
    //closesourcetanchuang
    $scope.closesourcetanchuang = function () {
      $('body').css('overflow', 'auto');
      $scope.arr = [];
      $scope.first = false;
      $scope.last = false;
      for (var i = 0; i < $scope.shopList.length; i++) {
        $scope.shopList[i].flag = false;
      }
      for (var i = 0; i < $scope.CJList.length; i++) {
        $scope.CJList[i].flag = false;
      }
      $scope.tanchuang = false;
      $scope.matchcjitem = null;
      $scope.matchitem = null;
      $scope.shopitemindex = -1;
    }
    //获取物流方式
    $scope.getwuliuway = function (wuliuway) {
      console.log(wuliuway)
      $scope.wuliuway = wuliuway;
      $scope.remark = wuliuway.remark;
    }
    //关联商品的第一次点击
    $scope.firstclick = function (val, num, item) {
      tanShopProClick(val, num, item, $scope);
    }
    //关联商品的第二次点击
    $scope.lastclick = function (val, num, item) {
      tanCjProClick(val, num, item, $scope);
    }
    //取消关联
    $scope.Unlink = function (index) {
      $scope.arr.splice(index, 1);
      $scope.shopList[index].flag = false;
      $scope.CJList[index].flag = false;
      var item1 = $scope.shopList.splice(index, 1);
      var item2 = $scope.CJList.splice(index, 1);
      $scope.shopList.push(item1[0]);
      $scope.CJList.push(item2[0]);
    }
    //点击提交
    $scope.sourcegoon = function () {
      $scope.connectStatus = '1';
      goActConnect(dsp, $scope);
    }
    //match2
    // $scope.match2=function (index) {
    //     console.log(index)
    //     for (var i =0;i<$scope.shop.length;i++){
    //         $scope.shop[i].flag=false
    //     }
    //     $scope.shop[index].flag=true;
    // }

  }])

  // 处理店铺商品列表数据
  function settleConData(obj, $scope) {
    for (var i = 0; i < obj.list.length; i++) {
      var str = obj.list[i].title;
      var arr = str.split(' ');
      var arr2;
      if (obj.list[i].tags) {
        arr2 = obj.list[i].tags.split(',');
      } else {
        arr2 = [];
      }
      var cla = [];
      var tagsarr = [];
      // obj.list[i].arr = arr;
      for (var j = 0; j < arr.length; j++) {
        var ob = {};
        ob.classname = arr[j];
        var num = j % 4;
        ob.classindex = num;
        ob.flag = false;
        cla.push(ob)
      }
      for (var j = 0; j < arr2.length; j++) {
        var ob = {};
        ob.tagname = arr2[j];
        var num = j % 4;
        ob.tagindex = num;
        ob.flag = false;
        tagsarr.push(ob)
      }
      obj.list[i].cla = cla;
      obj.list[i].tagsarr = tagsarr;
      obj.list[i].flag = false;
      // obj.list[i].win=false;
    }
    console.log(obj)
    $scope.shop = obj.list;
  }

  // 获取店铺商品列表
  function goGetShopPro(dsp, $scope) {
    // dsp.load();
    var jsonObj = {};
    jsonObj.pageSize = '5';
    jsonObj.pageNum = '1';
    jsonObj.shopId = $scope.selectshopinfo ? $scope.selectshopinfo.ID : '';
    jsonObj.userId = $scope.userId;
    // var str;
    if ($scope.searchByPart) {
      jsonObj.search = $scope.searchinfoshop.replace(/ /g, ',');
      $scope.searchByPart = false;
    } else {
      jsonObj.search = $scope.searchinfoshop;
    }
    // jsonObj.search = $scope.searchinfoshop;
    $scope.shop = [];
    dsp.loadPercent($('.cj-load-wrap-left'), connectionPicHeight);
    dsp.postFun('app/connection/shopList', {"data": JSON.stringify(jsonObj)}, function (name) {
      // dsp.closeLoad();
      $scope.shop = [];
      dsp.closeLoadPercent($('.cj-load-wrap-left'));
      console.log(name);
      var obj = JSON.parse(name.data.result);
      console.log(obj);
      // layer.closeAll("loading")
      if (obj.length == 0) {
        $scope.storeProTotalNum = 0;
        $scope.shop = [];
        dsp.addNodataPic($('.cj-load-wrap-left'), connectionPicHeight);
        $scope.hasshopdata = false;
        return false;
      }
      $scope.allshop = obj;
      if (obj.total == 0) {
        $scope.storeProTotalNum = 0;
        $scope.shop = [];
        dsp.addNodataPic($('.cj-load-wrap-left'), connectionPicHeight);
        $scope.hasshopdata = false;
        return false;
      }
      dsp.removeNodataPic($('.cj-load-wrap-left'));
      $scope.hasshopdata = true;
      console.log($scope.hasshopdata);
      $scope.storeProTotalNum = obj.total;
      settleConData(obj, $scope);
      pageFun($('#page1'), obj.total, 5, 1, function (n, type) {
        if (type == 'init') return;
        // layer.load(2);
        $scope.pagenum = n
        $scope.matchitem = null;
        $scope.shopitemindex = -1;
        var jsonObj = {};
        jsonObj.pageSize = '5';
        jsonObj.pageNum = n + '';
        jsonObj.shopId = $scope.selectshopinfo ? $scope.selectshopinfo.ID : '';
        jsonObj.userId = $scope.userId;
        jsonObj.search = $scope.searchinfoshop;
        $scope.shop = [];
        dsp.loadPercent($('.cj-load-wrap-left'), connectionPicHeight);
        dsp.postFun('app/connection/shopList', {"data": JSON.stringify(jsonObj)}, function (name) {
          dsp.closeLoadPercent($('.cj-load-wrap-left'));
          var obj = JSON.parse(name.data.result);
          // dsp.closeLoad();
          if (obj.length == 0) {
            $scope.storeProTotalNum = 0;
            $scope.shop = [];
            $scope.hasshopdata = false;
            return false;
          }
          $scope.allshop = obj;
          if (obj.total == 0) {
            $scope.storeProTotalNum = 0;
            $scope.shop = [];
            $scope.hasshopdata = false;
            return false;
          }
          settleConData(obj, $scope);
        })
      })
    });
  }

  // 获取关联商品变体详情
  function getTanData(dsp, $scope) {
    dsp.postFun('app/connection/detaill', {"data": JSON.stringify($scope.getDetailData)}, function (name) {
      // layer.closeAll("loading")
      dsp.closeLoad();
      var obj = JSON.parse(name.data.result)
      console.log(obj.shopList, obj.CJList)
      for (var i = 0; i < obj.shopList.length; i++) {
        obj.shopList[i].flag = false;
      }
      for (var i = 0; i < obj.CJList.length; i++) {
        obj.CJList[i].flag = false;
      }
      $scope.shopCJ = obj;
      $scope.shopList = obj.shopList;
      $scope.CJList = obj.CJList
      console.log($scope.shopList, $scope.CJList)
      $scope.tanchuang = true;
      $('#product-connection').height($(document).height());
      $('body').css('overflow', 'hidden');
    });
    //获取物流方式
    dsp.postFun2('getWayBy.json', JSON.stringify($scope.getWayData), function (n) {
      console.log('物流', n)
      $scope.wuliulist = n.data;
    })
  }

  // 关联商品 点击店铺商品
  function tanShopProClick(val, num, item, $scope) {
    console.log(item)
    val.stopPropagation();
    if ($scope.shopList.indexOf(item) < $scope.arr.length) {
      return false
    }
    if (item.flag == false) {
      if ($scope.first == false) {
        $scope.firstitem = item;
        item.flag = true
        $scope.orange = num;
        var item = $scope.shopList.splice(num, 1);
        $scope.shopList.splice($scope.arr.length, 0, item[0]);
        $scope.first = true;
      } else if ($scope.first == true) {
        return false;
      }
      if ($scope.last == true && $scope.first == true) {
        $scope.last = false;
        $scope.first = false;
        var obj = new Object();
        obj.first = $scope.firstitem
        obj.last = $scope.lastitem
        $scope.arr.push(obj)
        $scope.orange = null;
        $scope.orange2 = null;
      }
    } else {
      if ($scope.first == true && num >= ($scope.arr.length - 1)) {
        item.flag = false
        $scope.first = false
      }
      return false
    }
  }

  // 关联商品 点击cj商品
  function tanCjProClick(val, num, item, $scope) {
    val.stopPropagation();
    if ($scope.CJList.indexOf(item) < $scope.arr.length) {
      return false
    }
    if (item.flag == false) {
      if ($scope.last == false) {
        item.flag = true;
        $scope.lastitem = item;
        $scope.orange2 = num;
        var item = $scope.CJList.splice(num, 1);
        $scope.CJList.splice($scope.arr.length, 0, item[0]);
        $scope.last = true;
      } else if ($scope.last == true) {
        return false;
      }
      if ($scope.last == true && $scope.first == true) {
        $scope.last = false;
        $scope.first = false;
        var obj = new Object();
        obj.first = $scope.firstitem
        obj.last = $scope.lastitem
        $scope.arr.push(obj)
        $scope.orange = null;
        $scope.orange2 = null;
      }
    } else {
      if ($scope.last == true && num >= ($scope.arr.length - 1)) {
        item.flag = false
        $scope.last = false
      }
      return false;
    }
  }

  // 执行关联函数
  function goActConnect(dsp, $scope) {
    console.log($scope.arr);
    console.log($scope.Service)
    console.log($scope.Levels)
    console.log($scope.shopList)//店铺数据
    //console.log(skus.join(','))
    if ($scope.arr.length == 0) {
      layer.msg('Please select the products to be connected.');
      return;
    }
    console.log($scope.wuliuway);
    if ($scope.wuliuway == undefined) {
      layer.msg('Please select the shipping method.');
      return;
    }
    var a = $scope.arr;
    var arr = [];
    console.log($scope.arr)
    var jsonObj = {};
    for (var i = 0; i < $scope.arr.length; i++) {
      var img = a[i].first.image;
      if (img == '') {
        img = $scope.matchitem.image
      }
      console.log($scope.matchitem);
      console.log(img, $scope.matchitem.image)

      jsonObj.shopId = $scope.matchitem.shopId;
      jsonObj.accPid = a[i].first.product_id;
      jsonObj.accVid = a[i].first.vid;
      jsonObj.accSku = '';
      jsonObj.accPSku = '';
      jsonObj.accNameEn = $scope.matchitem.title;
      jsonObj.accHref = '';
      jsonObj.accPrice = '';
      jsonObj.Unit = '';
      jsonObj.Pid = a[i].last.PID;
      jsonObj.Vid = a[i].last.ID;
      jsonObj.PSku = ($scope.matchcjitem || $scope.sourceitem) ? ($scope.matchcjitem || $scope.sourceitem).SKU : '';
      jsonObj.Sku = a[i].last.SKU;
      jsonObj.NameEn = a[i].last.NAMEEN;
      jsonObj.sellPrice = '';
      jsonObj.costPrice = a[i].last.COSTPRICE + '';
      jsonObj.userId = $scope.userId;
      jsonObj.userName = '';
      jsonObj.logistics = $scope.wuliuway.enName;
      jsonObj.accimgurl = img;
      jsonObj.accstandard = a[i].first.title;
      jsonObj.imgurl = a[i].last.IMG;
      jsonObj.standard = a[i].last.VARIANTKEY;
      jsonObj.packWeight = a[i].last.PACKWEIGHT + '';
      jsonObj.originStatus = $scope.connectStatus;

      // console.log(str);
      arr.push(JSON.stringify(jsonObj));
      // arr.push(str);
    }
    var str2 = arr.join(",")

    var str3 = '{"data": [' + str2 + ']}'
    console.log($scope.arr.length)
    console.log($scope.shopList.length)
    layer.load(2);
    dsp.postFun('app/connection/con', {"data": "[" + str2 + "]"}, function (n) {
      console.log(n);
      layer.closeAll('loading');
      var data = n.data;
      if (data.statusCode == '200') {
        $scope.sourcetanchuang = false;
        $scope.matchcjitem = null;
        $('body').css('overflow', 'auto');
        if ($scope.arr.length == $scope.shopList.length) {
          $scope.shop.splice($scope.shopitemindex, 1);
        }
        layer.msg("Connected Sccessfully");
        $scope.tanchuang = false;
        if ($scope.Service == '1') {
          var ShuArr = [];
          $scope.shopList.forEach(function (o, i) {
            if (o.flag && o.sku) {
              ShuArr.push({sku: o.sku, vid: o.vid})
            }
          });
          if (ShuArr.length == 0) {
            $scope.tanchuang = false;
            return;
          }

          if ($scope.matchitem.shopType == 'shopify') {
            var parms = {
              "fulfillmentservice": "cjdropshipping",
              "inventoryManagement": $scope.Levels == '1' ? 'cjdropshipping' : null,
              "shopName": $scope.ShopName,
              "skus": JSON.stringify(ShuArr)
            };
            layer.load(2);
            dsp.postFun('app/fulfillment/addProductToFulfillment', parms, function (res) {
              layer.closeAll('loading');
              if (res.data.statusCode == 200) {
                //layer.msg(res.data.result);
                $scope.tanchuang = false;
              }
            })
          }
        } else {
          $scope.tanchuang = false;
        }
      } else if (data.statusCode == 808) {
        layer.msg("System is busy, please try it again in 10 - 20 seconds.");
      } else {
        layer.msg("Connect failed");
      }
    });
  }
  //分页
  function pageFun(node, totalnum, pagesize, currentnum, change) {
    // console.log(node,totalnum,pagesize,currentnum,change)
    node.jqPaginator({
      totalCounts: totalnum || 1,
      pageSize: pagesize,
      visiblePages: 5,
      currentPage: currentnum,
      activeClass: 'current',
      first: '<a class="prev" href="javascript:void(0);">&lt;&lt;<\/a>',
      prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
      next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
      last: '<a class="prev" href="javascript:void(0);">&gt;&gt;<\/a>',
      page: '<a href="javascript:void(0);">{{page}}<\/a><\/li>',
      onPageChange: change
    });
  }

})(angular)
