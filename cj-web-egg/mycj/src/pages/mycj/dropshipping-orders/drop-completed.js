export function dropCompletedFactory(angular) {
  const app = angular.module('drop-completed.app', ['service']);

  app.controller('drop-completed.ctrl', ['$scope', 'dsp',
    function ($scope, dsp) {
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
      var bs = new Base64();
      var base64  = new Base64();
      var userId = localStorage.getItem('userId') ? bs.decode(localStorage.getItem('userId')) : '';
      // 获取个人信息
      const token = localStorage.getItem('token') ? bs.decode(localStorage.getItem('token')) : "";
      var customerCjNum = localStorage.getItem('customerCjNum') || '';
      const noInvoiceArr = dsp.noInvoiceArr;
      function getUserInfo() {
        const params = {
          data: JSON.stringify({ userId, token })
        }
        dsp.postFun('app/info/userinfo', params, ({data})=> {
          const result = JSON.parse(data.result)[0]
          const cjNum = result.num;
          localStorage.setItem('customerCjNum',cjNum)
          $scope.isHideInvoiceFlag = noInvoiceArr.includes(cjNum)
        }, function (data) {
          console.log(data)
        })
      }
      if(!customerCjNum){
        getUserInfo()
      }else{
        $scope.isHideInvoiceFlag = noInvoiceArr.includes(customerCjNum)
      }
      dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
      //设置默认时间
      function GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;//获取当前月份的日期 
        var d = dd.getDate();
        if (m < 10) {
          m = '0' + m
        }
        if (d < 10) {
          d = '0' + d
        }
        return y + "-" + m + "-" + d;
      }
      var aDate = GetDateStr(-45);
      var enDate = GetDateStr(0);
      $("#cj-stime").val(aDate);   //关键语句
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
        {name:'Completed',href:'#/drop-complet',show:true},
        {name:'Closed',href:'#/drop-close'},
      ]
      
      $('.left-nava').click(function () {
        $('.left-nava').css('background-image', '');
        $(this).css('background-image', 'linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
      })

      //给导航按钮添加点击事件 隐藏子订单
      $('.drop-orderstatus-nav').click(function () {
        $('.dropshippingStatus-nav').show();
        // 隐藏子订单页面
        $('.processing-subOrders').hide();
      })

      //显示隐藏高级搜索
      $('.toggle-moresearch').click(function () {
        $('.more-search').toggle(300);
        console.log(22222222)
        $('#toggle-logo').toggleClass('.glyphicon glyphicon-triangle-top');
      });
      //给processing下的订单添加选中非选中
      var proceIndex = 0;
      $('#proce-table').on('click', '.zcheckbox', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          proceIndex++;
          if (proceIndex == $('#proce-table .zcheckbox').length) {
            // alert('quanbuxuanzhogn')
            $('#proce-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
          }
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          proceIndex--;
          if (proceIndex != $('#proce-table .zcheckbox').length) {
            $('#proce-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          }

        }
      })
      //全选
      $('#proce-table').on('click', '.zchecked-all', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          proceIndex = $('#proce-table .zcheckbox').length;
          $('#proce-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          proceIndex = 0;
          $('#proce-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
        }
      })

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

      $scope.pageNum = 1;
      $scope.pageSize = '50';
      $scope.cjdropawaitpList = '';//存储所有的订单
      $scope.erpordTnum = '';//存储订单的条数
      //给订单状态赋值的函数
      function numFun() {
        $scope.awaitNum = $scope.ordstatusNum.yi;
        $scope.dropprocessNum = $scope.ordstatusNum.er;
        $scope.dropprocessedNum = $scope.ordstatusNum.san;
        $scope.completeNum = $scope.ordstatusNum.si;
        $scope.closedNum = $scope.ordstatusNum.wu;
        // $scope.dispatchNum = $scope.ordstatusNum.liu;
      }
      function getList () {
        $scope.cjdropawaitpList = [];
        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
        var ordId = $.trim($('.ord-search-inp').val());
        var dapData = {};
        tjFun(dapData);
        var notMuOrdNumFlag = false;
        if (ordId.indexOf('CJ') >= 0) {
          dapData.data.numid = ordId;
          notMuOrdNumFlag = false;
        } else {
          if (ordId) {
            dapData.data.orderId = ordId;
            notMuOrdNumFlag = true;
          }
        }
        dapData.data = JSON.stringify(dapData.data);
        console.log(JSON.stringify(dapData))
        dsp.postFun('app/order/queryShipmentsOrder', JSON.stringify(dapData), function (data) {
          layer.closeAll("loading")
          console.log(data.data)
          var cjdropawaitp = JSON.parse(data.data.result)
          $scope.erpordTnum = cjdropawaitp.countNumber;
          $scope.cjdropawaitpList = cjdropawaitp.orderList;//获取所有的订单
          if (notMuOrdNumFlag) {
            if ($scope.erpordTnum > 0) {
              var muordid = $scope.cjdropawaitpList[0].ID;
              var ziid = ordId;
              muordid = bs.encode(muordid);
              ziid = bs.encode(ziid);
              location.href = '#/drop-complet-zi/' + muordid + '/' + ziid;
            }
          }
          console.log($scope.cjdropawaitpList)
          if ($scope.erpordTnum > 0) {
            dsp.removeNodataPic($('.orders-list'))
            dsp.closeLoadPercent($('.orders-list'))
          } else {
            dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'})
            dsp.closeLoadPercent($('.orders-list'))
          }
          $scope.ordstatusNum = cjdropawaitp.allOrderCount2;//各种状态订单的数量
          numFun();//调用给订单赋值的函数
          $scope.totalCounts = Math.ceil($scope.erpordTnum / $scope.pageSize);
          $scope.$broadcast('page-data', {
            pageNum: $scope.pageNum,
            totalNum: $scope.totalCounts,
            totalCounts: $scope.erpordTnum,
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
      //订单号搜索
      $('.ord-search-inp').keypress(function (Event) {
        if (Event.keyCode == 13) {
          $scope.searchOrdNumFun();
        }
      })
      function tjFun(cs) {
        var ordId = $.trim($('.ord-search-inp').val());
        var data = {};
        cs.data = {};
        cs.data.status = '6';
        cs.data.page = $scope.pageNum - 0;
        if (ordId.indexOf('CJ') >= 0) {
          cs.data.numid = ordId;
        } else {
          cs.data.orderId = ordId;
        }
        cs.data.limit = $scope.pageSize - 0;
        cs.data.dateBegin = $('#cj-stime').val();//cj开始时间
        cs.data.dateEnd = $('#cj-etime').val();//cj开始时间
        // console.log('=====================')
      }
      //按订单号搜索
      $scope.searchOrdNumFun = function () {
        $scope.pageNum = 1;
        getList()
      }
      //cj开始日期搜索
      $("#cj-stime").click(function () {
        var cjendtime = $("#cj-stime").val();
        var interval = setInterval(function () {
          var endtime2 = $("#cj-stime").val();
          if (endtime2 != cjendtime) {
            // alert(endtime2+'!='+cjendtime)
            $scope.cjdropawaitpList = [];
            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
            clearInterval(interval);
            $scope.pageNum = 1;
            getList()
          }
        }, 100)
      })
      //cj结束日期搜索
      $("#cj-etime").click(function () {
        var cjendtime = $("#cj-etime").val();
        var interval = setInterval(function () {
          var endtime2 = $("#cj-etime").val();
          if (endtime2 != cjendtime) {
            // alert(endtime2+'!='+cjendtime)
            $scope.cjdropawaitpList = [];
            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
            clearInterval(interval);
            $scope.pageNum = 1;
            getList()
          }
        }, 100)
      })

      //显示隐藏子订单
      // $('#proce-table').on('click','.viewSub-orders',function () {
      // 	// 隐藏二级界面
      // 	$('.dropshippingStatus-nav').hide();
      // 	//显示对应的子订单
      // 	$('.processing-subOrders').show();
      // })
      //点击子订单的返回按钮 隐藏子订单
      $('.back-mu-ord').click(function () {
        $('.sub-orders').hide();
        $('.dropshippingStatus-nav').show();
      })
      var aa = {};//存储 需要拼接发送的参数

      $scope.ziordFun = function (item) {
        // 隐藏二级界面
        // alert(3234)
        // $('.dropshippingStatus-nav').hide();
        var muordid = bs.encode(item.ID)
        location.href = '#/drop-complet-zi/' + muordid;

      }
      $scope.gotozifun = function (item, type) {
        var muordid = bs.encode(item.ID);
        type == 'disputed' ? localStorage.setItem('drop-proce-isDispute', 1) : localStorage.setItem('drop-proce-isDispute', 0); //将纠纷请求参数存入
        if (type == '12') {
          location.href = '#/drop-processed-zi/' + muordid + '//' + type;
        } else if (type == '7' || type == 'disputed') {
          location.href = '#/drop-complet-zi/' + muordid + '//' + type;
        } else if (type == '13') {
          location.href = '#/drop-close-zi/' + muordid + '//' + type;
        }

      }
      //导出订单
      $scope.dcordFlag = false;
      $scope.dcordCallbackFlag = false;//返回链接弹框
      $scope.exportOrdFun = function (item) {
        $scope.dcordFlag = true;
        $scope.itemId = item.ID;
      }
      $scope.exportSureFun = function () {
        layer.load(2);
        dsp.postFun('app/order/exportCJOrderM', {
          id: $scope.itemId
        }, function (data) {
          layer.closeAll("loading")
          $scope.dcordFlag = false;
          console.log(data)
          if (data.data.href.indexOf('http') >= 0) {
            $scope.dcordCallbackFlag = true;
            $scope.excelHref = data.data.href;
          } else {
            layer.msg('Export order error.')
            $scope.dcordCallbackFlag = false;
          }
        }, errFun)
      }
      $scope.exportQxFun = function () {
        $scope.dcordFlag = false;
      }
      //关闭返回的链接弹框
      $scope.closeLinkFun = function () {
        $scope.dcordCallbackFlag = false;
      }
      function errFun(data) {
        console.log(data)
        layer.closeAll("loading")
        dsp.closeLoadPercent($('.orders-list'))
        dsp.cjMesFun(1);
      }
      //发票按钮事件
      $scope.invoiceFun = function (id) {
        console.log(id);
        dsp.isinvoiceDialog(id, '');
      }
    }]);

  return app;
}