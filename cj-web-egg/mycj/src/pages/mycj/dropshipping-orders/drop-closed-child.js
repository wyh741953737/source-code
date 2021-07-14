export function dropCloseChildFactory(angular) {
  const app = angular.module('drop-closezi-app', ['service']);
  // var mark1 = 0;
  app.controller('drop-closed-child.ctrl', ['$scope', 'dsp', '$stateParams',
    function ($scope, dsp, $stateParams) {
      dsp.domainData().then((res) => {
        // 请求成功的结果
        console.log(res)
        $scope.iscj = res.iscj;
        if ($scope.iscj == '1') {
          //cj
          $scope.websiteName = 'CJ';
        } else {
          //客户
          $scope.websiteName = res.websiteName || 'CJ';
        }
      })
      $scope.dataFound = true;
      $scope.zdataFound = true;
      // 控制优惠券icon显示
      $scope.showUseCouponsIcon = false;
      $scope.isVip = localStorage.getItem('vip')

      var bs = new Base64();
      $('.orders-table').on('mouseenter', '.order-detail', function () {
        // $(this).next().show();
        $('.orders-table .order-detail').removeClass('order-detail-active');
        $(this).addClass('order-detail-active');
      })
      $('.orders-table').on('mouseleave', '.order-detail', function () {
        $(this).next().hide();
      })
      $('.orders-table').mouseleave(function () {
        $('.orders-table .order-detail').removeClass('order-detail-active');
      });

      $scope.navList = [
        {name:'Awaiting Payment',href:'#/dropshipping-orders'},
        {name:'Processing',href:'#/drop-proce'},
        {name:'Processed',href:'#/drop-processed'},
        {name:'Completed',href:'#/drop-complet'},
        {name:'Closed',href:'#/drop-close',show:true},
      ]
     
      var zproIndex = 0;
      $('#zproce-tab').on('click', '.zcheckbox', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          zproIndex++;
          if (zproIndex == $('#zproce-tab .zcheckbox').length) {
            // alert('quanbuxuanzhogn')
            $('#zproce-tab .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
          }
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          zproIndex--;
          if (zproIndex != $('#zproce-tab .zcheckbox').length) {
            $('#zproce-tab .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          }

        }
      })
      //全选
      $('#zproce-tab').on('click', '.zchecked-all', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          zproIndex = $('#zproce-tab .zcheckbox').length;
          $('#zproce-tab .zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          zproIndex = 0;
          $('#zproce-tab .zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
        }
      })
      // var pageH = $(window).height()-80;
      // var docH = $(document).height();
      $('.d-direct-right').css({
        'min-height': $(window).height() * 1 - 15 + 'px'
      });
      $scope.queryLogsFun = function(id){
        let paramsObj = {
          "orderCode": id
        }
        dsp.load(2);
        dsp.postFun('cj/orderOperationLog/queryLogList',paramsObj,function(data){
          dsp.closeLoad();
          let resObj = data.data;
          if(resObj.statusCode == 200){
            $scope.logData = resObj.result;
            $scope.ordLogFlag = true;
          }
        },function(data){
          dsp.closeLoad();
        })
      }
      $scope.ordLogFun = function(item){
        location.href = '#/order-log/'+item.ID
      }
      //点击子订单的返回按钮 隐藏子订单
      $scope.goBack = ()=>{
        window.history.back();
      }
      $('.sub-orders').show();//显示子订单
      dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
      var aa = {};//存储 需要拼接发送的参数

      //获取该条母订单的id
      // alert($stateParams.muordid)
      console.log(bs.decode($stateParams.muordid))
      // return;
      var muordId = bs.decode($stateParams.muordid);
      var ziId ;
      if($stateParams.ziid && $stateParams.ziid !== '*') {
        ziId = $stateParams.ziid;
      }
      var seaOrdStu = $stateParams.type;
      if(ziId){
        $('.ord-search-inp').val(ziId)
      }
      $scope.orderType = '13';
      $scope.muordId = muordId;
      $scope.pageNum = 1;
      $scope.pageSize = '50';
      function getList() {
        $scope.awaitpayList = [];
        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
        var shopstore = $('#dcl-sel-store').val();
        var searchinpVal = $.trim($('.ord-search-inp').val());
        let parames = {};
        parames.page = $scope.pageNum - 0;
        parames.limit = $scope.pageSize - 0;
        parames.id = $scope.muordId;
        parames.shopId = shopstore;
        parames.orderId = searchinpVal;
        parames.status = $scope.orderType;
        console.log(JSON.stringify(parames))
        dsp.postFun('app/order/getShipmentsOrder', JSON.stringify(parames), dclsFun, errFun)
        function dclsFun(data) {
          layer.closeAll("loading")
          console.log(data);
          $scope.zcountNum = data.data.productsCount;
          $scope.awaitpayList = data.data.productsList;

          // 子订单中是否有使用优惠券
          const hasUseCoupons = $scope.awaitpayList.find(v => v.couponOrderProductAmount)
          if(hasUseCoupons){
            $scope.showUseCouponsIcon = true
          }

          if ($scope.zcountNum > 0) {
            dsp.removeNodataPic($('.orders-list'))
            dsp.closeLoadPercent($('.orders-list'))
          } else {
            dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'})
            dsp.closeLoadPercent($('.orders-list'))
          }
          $scope.ordstatusNum = data.data.allOrderCount2;//各种状态订单的数量
          numFun();//调用给订单赋值的函数
          $scope.totalCounts = Math.ceil($scope.zcountNum / $scope.pageSize);
          $scope.$broadcast('page-data', {
            pageNum: $scope.pageNum,
            totalNum: $scope.totalCounts,
            totalCounts: $scope.zcountNum,
            pageSize: $scope.pageSize,
            pagesizeList: ['30','50','100']
          });
        }
      }
      getList()
      $scope.$on('pagedata-fa', function (d, data) {
        console.log(data)
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getList();
      });
      //给订单状态赋值的函数
      function numFun() {
        $scope.awaitNum = $scope.ordstatusNum.yi;
        $scope.dropprocessNum = $scope.ordstatusNum.er;
        $scope.dropprocessedNum = $scope.ordstatusNum.san;
        $scope.completeNum = $scope.ordstatusNum.si;
        $scope.closedNum = $scope.ordstatusNum.wu;
        // $scope.dispatchNum = $scope.ordstatusNum.liu;
      }
      //按店铺搜索订单
      $('#dcl-sel-store').change(function () {
        $scope.pageNum = 1;
        getList()
      })
      //用订单号搜索 orderNumber
      $('.ord-search-inp').keypress(function (Event) {
        if (Event.keyCode == 13) {
          $scope.ordNumSearchFun();
        }
      })
      //搜索订单号
      $scope.ordNumSearchFun = function () {
        $scope.pageNum = 1;
        getList()
      }
      //跳转到erp
      $scope.erpLinkFun = function () {
        var muordstu = 2;
        window.open('https://erp.cjdropshipping.com/manage.html#/erp-czi-ord//' + muordstu)
        //window.open('http://localhost:8080/erp_web/webapp/manage.html#/erp-czi-ord//'+muordstu);
      }
      function errFun(data) {
        console.log(data)
        layer.closeAll("loading")
        dsp.closeLoadPercent($('.orders-list'))
        dsp.cjMesFun(1);
      }
      //子订单的详情
      // $('.orders-list').on('click','.zi-order-num',function () {
      // 	location.href="#/order-detail";
      // })
      $scope.hrefLinkFun = function (item) {
        var id = item.ID;
        var istrackFlag = 2;
        location.href = "#/order-detail/" + id + '/' + istrackFlag;
      }
      $scope.ordLogFun = function(item){
        location.href = '#/order-log/'+item.ID
      }
      //下载面单
      $scope.loadPdfFun = function (item) {
        $scope.downLoadPdfFlag = true;
        $scope.itemId = item.ID;
      }
      $scope.sureDownLoadFun = function () {
        layer.load(2)
        $scope.downLoadPdfFlag = false;
        var upJson = {};
        upJson.ids = $scope.itemId;
        upJson.loginName = "CJAPP";
        upJson.uspsType = "1"
        dsp.postFun2('getExpressSheet.json', JSON.stringify(upJson), function (data) {
          console.log(data)
          layer.closeAll('loading')
          var mdLink = data.data;
          console.log(mdLink)
          if (mdLink && JSON.stringify(mdLink) != '[]') {
            mdLink[0].indexOf('http') == -1 ? mdLink[0] = 'http://' + mdLink[0] : mdLink[0]
            $scope.mdLink = mdLink[0];
            $scope.mdLinkTkFlag = true;
          } else {
            layer.msg('No shipping labels found.')
          }
        }, function (data) {
          console.log(data)
          layer.closeAll('loading')
        })
      }

      //开启纠纷弹框
      $scope.openJfFun = function (item, index) {
        console.log(item)
        $scope.itemIndex = index;
        $scope.disputeFlag = true;
        $scope.itemId = item.ID;
        $scope.itemCustomeId = item.ORDER_NUMBER;
        $scope.itemMoney = item.AMOUNT;
      }
      //点击已开启的纠纷跳到纠纷页
      $scope.afterLinkFun = function (item) {
        var jfId = item.ID;
        window.open('#/after-sale//' + jfId)
      }
      $scope.closeJfFun = function () {
        $scope.disputeFlag = false;
        $scope.imgArr = [];
        $('.sel-jfres').val('');
        $scope.disTextareaVal = '';
        $('.dispute-tip').hide();
        $('.dispute-con').animate({
          height: '541px'
        }, 100);
      }
      var selVal = '';
      //纠纷原因
      $('.sel-jfres').change(function () {
        console.log($(this).val())
        selVal = $(this).val();
        if (selVal == 'Products Short' || selVal == 'Defective Products' || selVal == 'Received Incorrect Products' || selVal == 'Order Not Received' || selVal == 'Order Returned') {
          $('.dispute-tip').show();
          $('.dispute-con').animate({
            height: '576px'
          }, 100);
        } else {
          $('.dispute-tip').hide();
          $('.dispute-con').animate({
            height: '541px'
          }, 100);
        }
      })
      //期望处理的结果
      var expectResult = '';
      $('.sel-wantway').change(function () {
        console.log($(this).val())
        expectResult = $(this).val();
      })
      // console.log(timestampToTime(new Date()))
      $scope.sureJfFun = function () {
        // console.log($scope.disTextareaVal)
        // console.log($scope.disputeInpVal)
        // console.log(selVal)
        // console.log($scope.imgArr.length)
        var listArr = [];
        var listObj = {};//存储一条消息内容
        listObj.userName = '0';//客户
        listObj.image = $scope.imgArr;
        if ($scope.disTextareaVal) {
          listObj.remark = $scope.disTextareaVal;
        } else {
          layer.msg('Please write your message')
          return;
        }
        listObj.date = timestampToTime(new Date())
        listArr.push(listObj);
        console.log(listObj)
        console.log(listArr)
        listArr = JSON.stringify(listArr)
        var upData = {};
        upData.id = $scope.itemId;
        upData.orderNumber = $scope.itemCustomeId;
        upData.message = listArr;
        upData.orderNumber = $scope.itemCustomeId;
        if (expectResult == 'Refund') {
          upData.expectResult = 1;
        } else if (expectResult == 'Resend') {
          upData.expectResult = 2;
        } else {
          layer.msg('Please select expected operation')
          return;
        }
        if (selVal == '') {
          layer.msg('Please select the type of dispute.')
          return;
        } else {
          if ($scope.itemStatus != '6' && $scope.itemStatus != '10' && selVal == 'Unfilled Orders Cancellation') {
            layer.msg('Sorry, this order has been processed already.')
            return;
          }
          upData.type = selVal;
          if (selVal == 'Products Short' || selVal == 'Defective Products' || selVal == 'Received Incorrect Products' || selVal == 'Order Not Received') {
            if ($scope.imgArr.length < 1) {
              layer.msg('The screenshoot of buyer complains (email address included) and images of parcel are required for this kinds of dispute.')
              return;
            } else {
              layer.load(2);
              openJfFun1(upData)
            }
          } else {
            layer.load(2);
            openJfFun1(upData)
          }
        }
        // else if(selVal=='Other'){
        // 	console.log($scope.disputeInpVal)
        // 	if ($scope.disputeInpVal) {
        // 		upData.type = $scope.disputeInpVal;
        // 		openJfFun1(upData)
        // 	} else {
        // 		layer.msg('请填写纠纷类型')
        // 		return;
        // 	}
        // } 

      }
      function openJfFun1(upData) {
        dsp.postFun('app/dispute/openDispute', JSON.stringify(upData), function (data) {
          console.log(data)
          layer.closeAll('loading')
          if (data.data.result == true) {
            $scope.disputeFlag = false;
            layer.msg('Open dispute successfully');
            //把该条订单设置成
            $scope.imgArr = [];
            $('.sel-jfres').val('');
            $scope.disTextareaVal = '';
            $scope.awaitpayList[$scope.itemIndex].disputeId = '1';
            $('.dispute-tip').hide();
            $('.dispute-con').animate({
              height: '541px'
            }, 100);
          } else {
            layer.msg('Open dispute unsuccessfully')
          }
        }, errFun)
      }

      //点击上传的图片显示大图
      $scope.viewBigImg = function (item) {
        $scope.viewImgFlag = true;
        $scope.bigImgSrc = item;
        console.log(item)
      }
      $scope.closePreImg = function () {
        $scope.viewImgFlag = false;
      }
      $scope.imgArr = [];
      $scope.upLoadImg4 = function (files) {
        dsp.ossUploadFile($('#document-img')[0].files, function (data) {
          console.log(data)
          if (data.code == 0) {
            layer.msg('Images Upload Failed');
            return;
          }
          if (data.code == 2) {
            layer.msg('Images Upload Incomplete');
          }
          var result = data.succssLinks;
          console.log(result)
          var filArr = [];
          for (var j = 0; j < result.length; j++) {
            var srcList = result[j].split('.');
            var fileName = srcList[srcList.length - 1].toLowerCase();
            console.log(fileName)
            if (fileName == 'png' || fileName == 'jpg' || fileName == 'jpeg' || fileName == 'gif') {
              $scope.imgArr.push(result[j]);
            }
          }
          // $scope.imgArr = filArr;
          console.log($scope.imgArr)
          $scope.$apply();
        })
      }
      function timestampToTime(date) {
        var Y, M, D, h, m, s
        Y = date.getFullYear() + '-';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y + M + D + h + m + s;
      }
    }]);

  return app;
}