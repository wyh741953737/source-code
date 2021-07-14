export function awaitPaymentChildFactory(angular) {
  const app = angular.module('await-payment-child.module', ['service']);
  // var mark1 = 0;
  app.controller('await-payment-child.ctrl', ['$scope', 'dsp', '$stateParams',
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


      dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);

      console.log($('.orders-list').width())
      console.log($('.orders-list'))
      // debugger;
      var bs = new Base64();
      //给左侧的导航添加滚动事件
      $(document).scroll(function () {
        if ($(document).scrollTop() >= 0) {
          $('.left-nav').css({
            position: 'fixed',
            top: '80px'
          });
        }
        else {
          $('.left-nav').css({
            position: 'relative',
            top: '80px'
          });
        }
      })


      //鼠标划过事件
      // $('.orders-table').on('click','.order-detail',function () {
      // 	$('.orders-table .order-detail').removeClass('order-click-active');
      // 	$(this).addClass('order-click-active');
      // })
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
        {name:'Awaiting Payment',href:'#/dropshipping-orders',show:true},
        {name:'Processing',href:'#/drop-proce'},
        {name:'Processed',href:'#/drop-processed'},
        {name:'Completed',href:'#/drop-complet'},
        {name:'Closed',href:'#/drop-close'},
      ]
     
      // 给处理订单的按钮添加鼠标移入移出
      $('.deal-style').hover(function () {
        $(this).css('background-color', 'rgb(249, 148, 41)');
        $(this).css('color', '#fff');
      }, function () {
        $(this).css('background-color', '');
        $(this).css('color', '#f99429');
      })
      // 给导出订单的按钮添加鼠标移入移出
      $('.export-orders').hover(function () {
        $(this).css('background-color', 'rgb(11, 98, 130)');
      }, function () {
        $(this).css('background-color', 'rgb(11, 78, 103)');
      })
      //显示隐藏高级搜索
      $('.toggle-moresearch').click(function () {
        $('.more-search').toggle(300);
        $('#toggle-logo').toggleClass('.glyphicon glyphicon-triangle-top');
      });

      var zawitIndex = 0;
      $('#zawait-tab').on('click', '.zcheckbox', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          zawitIndex++;
          if (zawitIndex == $('#zawait-tab .zcheckbox').length) {
            // alert('quanbuxuanzhogn')
            $('#zawait-tab .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
          }
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          zawitIndex--;
          if (zawitIndex != $('#zawait-tab .zcheckbox').length) {
            $('#zawait-tab .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          }

        }
      })
      //全选
      $('#zawait-tab').on('click', '.zchecked-all', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          zawitIndex = $('#zawait-tab .zcheckbox').length;
          $('#zawait-tab .zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          zawitIndex = 0;
          $('#zawait-tab .zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
        }
      })

      //获取等待付款的子订单的数据
      $('.sub-orders').show();//显示子订单
      //获取该条母订单的id
      var muordId = bs.decode($stateParams.muordid);
      var ziId;
      if($stateParams.ziid) {
        ziId = bs.decode($stateParams.ziid);
        $('.ord-search-inp').val(ziId)
      }
      $scope.muordId = muordId;
      $scope.pageNum = 1;
      $scope.pageSize = '50';
      function getList(){
        $scope.awaitpayList = [];
        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
        $('#zawait-tab .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
        let parames = {};
        parames.page = $scope.pageNum - 0;
        parames.limit = $scope.pageSize - 0;
        parames.id = muordId;
        parames.orderId = $('.ord-search-inp').val();
        dsp.postFun('app/order/getShipmentsOrder', JSON.stringify(parames), function (data) {
          console.log(data);
          $scope.shops = data.data.shops;//店铺的数组
          $scope.zcountNum = data.data.productsCount;
          if ($scope.zcountNum > 0) {
            dsp.removeNodataPic($('.orders-list'))
            dsp.closeLoadPercent($('.orders-list'))
          } else {
            dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'})
            dsp.closeLoadPercent($('.orders-list'))
          }
          console.log($scope.zcountNum)
          $scope.awaitpayList = data.data.productsList;
          console.log($scope.awaitpayList)

          // 子订单中是否有使用优惠券
          const hasUseCoupons = $scope.awaitpayList.find(v => v.couponOrderProductAmount)
          if(hasUseCoupons){
            $scope.showUseCouponsIcon = true
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
        }, errFun)
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

      //删除子订单
      var delIds;
      $scope.isDelOrdFun = function (item) {
        var delCount = 0;
        let hasOrderNum = 0;
        delIds = '';
        $('#zawait-tab .order-detail').each(function () {
          hasOrderNum++ 
          if ($(this).children('.order-time').children('.zcheckbox').attr('src') == 'static/image/direct-orders/multiple2.png') {
            delCount++;
            delIds += $(this).children('.order-time').children('.dord-date-time').text() + ',';
          }
        })
        
        if (delCount <= 0) return layer.msg('Please select order(s) first!')
        if(hasOrderNum == 1) return layer.msg('Opps! You cannot delete the sub order as it is the only one.');

        $scope.deleteFlag = true;
      }
      $scope.deleteSureFun = function () {
        $scope.deleteFlag = false;
        $scope.awaitpayList = [];
        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
        var deleUpdata = {};
        deleUpdata.shipId = $scope.muordId;
        deleUpdata.ids = delIds;
        dsp.postFun('app/order/cleanOrder', JSON.stringify(deleUpdata), function (data) {
          console.log(data)
          if (data.data.result) {
            layer.msg('Delete Success')
          } else {
            layer.msg('Opps! You cannot delete the sub order as it is the only one.')
          }
          $scope.pageNum = 1;
          getList()
        }, function (data) {
          console.log(data)
        })
      }

      $('.d-direct-right').css({
        'min-height': $(window).height() * 1 - 15 + 'px'
      });

      $scope.hrefLinkFun = function (item) {
        var id = item.ID;
        var istrackFlag = 1;
        location.href = "#/order-detail/" + id + '/' + istrackFlag;
      }
      function errFun(data) {
        console.log(data)
        layer.closeAll("loading")
        dsp.closeLoadPercent($('.orders-list'))
        dsp.cjMesFun(1);
      }


    }]);

  return app;
}