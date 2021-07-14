export function dropProcessedFactory(angular) {
  const app = angular.module('drop-processed.module', ['service']);

  app.controller('drop-processed.ctrl', ['$scope', 'dsp',
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
      //高级搜索
      $scope.showFilter = false;//显示隐藏filter
      $scope.filterObj = {
        storeProductName: '',
        cjProductName: '',
        buyerName: '',
        weight: '',
        sku: ''
      }
      var bs = new Base64();
      var base64  = new Base64();
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
      var aDate = GetDateStr(-45);
      var enDate = GetDateStr(0);
      // $("#y-ord-sdate").val(aDate );   //关键语句
      // $("#y-ord-edate").val(enDate );   //关键语句
      $("#cj-stime").val(aDate);//关键语句
      // $("#cj-etime").val(enDate );   //关键语句

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
        {name:'Awaiting Payment',href:'#/dropshipping-orders'},
        {name:'Processing',href:'#/drop-proce'},
        {name:'Processed',href:'#/drop-processed',show:true},
        {name:'Completed',href:'#/drop-complet'},
        {name:'Closed',href:'#/drop-close'},
      ]
     
      $('.left-nava').click(function () {
        $('.left-nava').css('background-image', '');
        $(this).css('background-image', 'linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
      })
      //导出订单的提示
      $('.export-orders').click(function () {
        layer.msg('This feature will work soon.')
      })
      
      $('.drop-orderstatus-nav').click(function () {
        $('.dropshippingStatus-nav').show();
        // 隐藏子订单页面
        $('.processing-subOrders').hide();
      })


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
              location.href = '#/drop-processed-zi/' + muordid + '/' + ziid;
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
        }, function () {
          layer.closeAll("loading")
          dsp.closeLoadPercent($('.orders-list'))
          dsp.cjMesFun(1);
        })
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

      //订单号搜索
      $('.ord-search-inp').keypress(function (Event) {
        if (Event.keyCode == 13) {
          $scope.searchOrdNumFun();
        }
      })
      function tjFun(cs) {
        var ordId = $.trim($('.ord-search-inp').val());
        console.log(ordId)
        var data = {};
        cs.data = {};
        cs.data.status = '5';
        cs.data.page = $scope.pageNum - 0;
        if (ordId.indexOf('CJ') >= 0) {
          cs.data.numid = ordId;
        } else {
          cs.data.orderId = ordId;
        }
        cs.data.limit = $scope.pageSize - 0;
        cs.data.dateBegin = $('#cj-stime').val();//cj开始时间
        cs.data.dateEnd = $('#cj-etime').val();//cj开始时间
        //高级搜索
        cs.data.storeOrderDateBegin = $('#filter-startdate').val();
        cs.data.storeOrderDateEnd = $('#filter-enddate').val();
        cs.data.storeProductName = $scope.filterObj.storeProductName;
        cs.data.cjProductName = $scope.filterObj.cjProductName;
        cs.data.buyerName = $scope.filterObj.buyerName;
        cs.data.weight = $scope.filterObj.weight;
        cs.data.sku = $scope.filterObj.sku;
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
      //点击子订单的返回按钮 隐藏子订单
      $('.back-mu-ord').click(function () {
        $('.sub-orders').hide();
        $('.dropshippingStatus-nav').show();
      })
      $scope.ziordFun = function (item) {
        // 隐藏二级界面
        // alert(3234)
        // $('.dropshippingStatus-nav').hide();
        var muordid = bs.encode(item.ID)
        location.href = '#/drop-processed-zi/' + muordid + '/*/*/' + $scope.filterObj.sku;

      }
      $scope.gotozifun = function (item, type) {
        var muordid = bs.encode(item.ID);
        type == 'disputed' ? localStorage.setItem('drop-proce-isDispute', 1) : localStorage.setItem('drop-proce-isDispute', 0); //将纠纷请求参数存入
        if (type == '12' || type == 'disputed') {
          location.href = '#/drop-processed-zi/' + muordid + '/*/' + type + '/' + $scope.filterObj.sku;
        } else if (type == '7') {
          location.href = '#/drop-complet-zi/' + muordid + '/*/' + type;
        } else if (type == '13') {
          location.href = '#/drop-close-zi/' + muordid + '/*/' + type;
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
          id: $scope.itemId,
          sku: $scope.filterObj.sku
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


      //高级搜索部分的查询
      $scope.advanceSearch = function () {
        $scope.pageNum = 1;
        getList()
      }

    }]);
            
  return app;
}