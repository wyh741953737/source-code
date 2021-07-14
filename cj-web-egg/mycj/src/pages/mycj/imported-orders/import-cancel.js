export function importCancelFactory(angular) {
  const app = angular.module('import-cancel.module', ['service']);

  app.controller('import-cancel.ctrl', ['$scope', 'dsp', function ($scope, dsp) {
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
    // var $navLis = $('.header-nav li');
    // $navLis.eq(1).css('border-bottom','2px solid #f88f29');
    var pageH = $(window).height() - 171;
    var docH = $(document).height();

    $('.directorders-wrap').css({
      'min-height': $(window).height() * 1 + 'px'
    });
    $('.direct-right').css({
      'min-height': $(window).height() * 1 + 'px'
    });
    $scope.dataFound = true;
    $scope.navList = [
      {name:'Process Required',href:"#/direct-orders"},
      {name:'Cart',href:"#/imp-cart"},
      {name:'Incomplete Orders',href:"#/imp-incomp"},
      {name:'Canceled',href:"#/imp-cancel",show:true},
      {name:'Search All',href:"#/search-all"},
      {name:'Store Orders',href:"#/AuthorizeOrder"},
    ]
    //$('.direct-leftbara').eq(0).css('background-image','linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
    $('.direct-leftbara').click(function () {
      $('.direct-leftbara').css('background-image', '');
      $(this).css('background-image', 'linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
    })

    var codeInlocal = localStorage.getItem('code');
    console.log(codeInlocal)
    if (codeInlocal) {
      var timer = setInterval(function () {
        var myDate = new Date();
        var tipHour = myDate.getHours();       //获取当前小时数(0-23)
        var tipMinute = myDate.getMinutes();     //获取当前分钟数(0-59)
        var tipSecond = myDate.getSeconds();     //获取当前秒数(0-59)
        $('#tiphour').text(tipHour + ':')
        $('#tipminute').text(tipMinute + ':')
        $('#tipsecond').text(tipSecond)
        codeInlocal = localStorage.getItem('code');
        $scope.tipsOrdStatues = localStorage.getItem('ordTips');
        if (codeInlocal == '200') {
          $('.refresh-btn').show();
          clearTimeout(timer)
          console.log(myDate)
          $scope.tipsOrdStatues = localStorage.getItem('ordTips');
          $('.titOrdTips').text($scope.tipsOrdStatues)
        }
        console.log($scope.tipsOrdStatues)
        console.log(codeInlocal)
      }, 1000)
    }
    $scope.pageNum = 1;
    $scope.pageSize = '50';
    function tjFun(tjcs) {
      var yStoresTime = $('#y-ord-sdate').val();
      var yStoreeTime = $('#y-ord-edate').val();
      var yStoreName = $.trim($('#y-pro-name').val());
      var cjStoreName = $.trim($('#cj-pro-name').val());
      var berName = $.trim($('.buyer-inp').val());
      var searchinpVal = $('.ord-search-inp').val();
      var ordType = '';
      if ($('.type-sel').val() == 'All') {
        ordType = '';
      } else if ($('.type-sel').val() == 'Shopify Imported') {
        ordType = '2';
      } else if ($('.type-sel').val() == 'Excel Imported') {
        ordType = '1';
      }
      tjcs.data = {};
      tjcs.data.status = '8';//请求的订单状态
      tjcs.data.page = $scope.pageNum - 0;
      tjcs.data.limit = $scope.pageSize - 0;
      tjcs.data.orderNumber = searchinpVal;
      tjcs.data.storeOrderDateBegin = yStoresTime;//店铺开始时间
      tjcs.data.storeOrderDateEnd = yStoreeTime;//店铺结束时间
      tjcs.data.storeProductName = yStoreName;//店铺商品名称
      tjcs.data.cjProductName = cjStoreName;//cj商品名称
      tjcs.data.buyerName = berName;//名字
      tjcs.data.orderType = ordType;//订单类型
      //设置时间段
      var cjsTime = $('#cj-stime').val();
      var cjeTime = $('#cj-etime').val();
      tjcs.data.cjOrderDateBegin = cjsTime;
      tjcs.data.cjOrderDateEnd = cjeTime;
      if (!$scope.storeName) {
        tjcs.data.storeNumber = '';
      } else {
        tjcs.data.storeNumber = $scope.storeName;
      }
      console.log($scope.storeName)
    }
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
    // $("#y-ord-sdate").val(aDate );   //关键语句
    // $("#y-ord-edate").val(enDate );   //关键语句
    $("#cj-stime").val(aDate);   //关键语句
    // $("#cj-etime").val(enDate );   //关键语句

    //获取订单列表
    var bs = new Base64();
   
    function getList() {
      $scope.ordersList = [];
      dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
      var orData = {};
      tjFun(orData)
      orData.data = JSON.stringify(orData.data)
      console.log(orData.data)
      dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)
      function dclsFun(data) {
        console.log(data.data)
        var list1 = data.data.result;
        // console.log(list);
        $scope.list = JSON.parse(list1);
        $scope.ordersList = $scope.list.ordersList;
  
        $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
        $scope.shops = $scope.list.shops;//店铺的数组
        delShopFun($scope.shops)
        var excelShop = {};
        excelShop.id = 'excel';
        excelShop.name = 'Excel';
        excelShop.rNAME = 'Excel';
        $scope.shops.push(excelShop)
        if ($scope.pcountN > 0) {
          $scope.countPage = Math.ceil($scope.pcountN / ($('#dcl-sel').val() - 0))
          console.log($scope.countPage)
          dsp.removeNodataPic($('.orders-list'))
          dsp.closeLoadPercent($('.orders-list'))
        } else {
          dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'},true)
          dsp.closeLoadPercent($('.orders-list'))
        }
        $scope.ordstatusNum = $scope.list.allOrderCount2;//各种状态订单的数量
        numFun();//调用给订单赋值的函数
        $scope.totalCounts = Math.ceil($scope.pcountN / $scope.pageSize);
        $scope.$broadcast('page-data', {
          pageNum: $scope.pageNum,
          totalNum: $scope.totalCounts,
          totalCounts: $scope.pcountN,
          pageSize: $scope.pageSize,
          pagesizeList: ['30','50','100']
        });
      }
      function dcleFun() {
        dsp.closeLoadPercent($('.orders-list'))
        dsp.cjMesFun(1);
      }
    }
    getList();
    $scope.$on('pagedata-fa', function (d, data) {
      console.log(data)
      $scope.pageNum = data.pageNum;
      $scope.pageSize = data.pageSize;
      getList();
    });
    function delShopFun(shopArr) {
      /**店铺列表名字展示改成 店铺名+店铺类型+国家、增加国家全写参数、增加国家缩写参数 start */
      if (!shopArr) {
        return
      }
      shopArr.forEach(e => {
        // 国家缩写转换全写。ThemeId是shopee的国家;MarketplaceUrl是lazada的国家
        e.countryfullName = replaceCountry(e.type == 'shopee' ? e.ThemeId : e.type == 'Lazada' ? e.MarketplaceUrl : '').fullName;
        // 店铺名+店铺类型+国家
        // e.rNAME = `${e.name} - ${e.type.replace(e.type[0], e.type[0].toUpperCase())} ${e.countryfullName?'-':''} ${e.countryfullName}`;
        if (e.type) {
          e.rNAME = `${e.name} - ${e.type.replace(e.type[0], e.type[0].toUpperCase())} ${e.countryfullName ? '-' : ''} ${e.countryfullName}`;
        } else {
          e.rNAME = e.name;
        }
        // 国家缩写code(大写)-物流模块传递国家需要
        let curLogisticCountry = (e.ThemeId || e.MarketplaceUrl) ? (e.type == 'shopee' ? e.ThemeId : e.type == 'Lazada' ? e.MarketplaceUrl : '') : '';
        if(curLogisticCountry){
          e.logisticsCountry = curLogisticCountry.toUpperCase();
        }else{
          e.logisticsCountry = '';
        }
        // e.logisticsCountry = (e.ThemeId || e.MarketplaceUrl) ? (e.type == 'shopee' ? e.ThemeId : e.type == 'Lazada' ? e.MarketplaceUrl : '').toUpperCase() : '';
        // 货币代码
        e.currencyCode = replaceCountry(e.type == 'shopee' ? e.ThemeId : e.type == 'Lazada' ? e.MarketplaceUrl : '').currencyCode;
      });
      $scope.shops = shopArr;
    }
    function replaceCountry(params) {
      let fullName = '';
      let currencyCode = '';
      if (/sg/i.test(params)) { fullName = 'Singapore', currencyCode = 'SGD' }
      else if (/my/i.test(params)) { fullName = 'Malaysia', currencyCode = 'MYR' }
      else if (/id/i.test(params)) { fullName = 'Indonesia', currencyCode = 'IDR' }
      else if (/th/i.test(params)) { fullName = 'Thailand', currencyCode = 'THB' }
      else if (/ph/i.test(params)) { fullName = 'Philippines', currencyCode = 'PHP' }
      else if (/vn/i.test(params)) { fullName = 'Vietnam', currencyCode = 'VND' }
      return { fullName, currencyCode };
    }
    //给订单状态赋值的函数
    function numFun() {
      $scope.impprocessNum = $scope.ordstatusNum.yi;
      $scope.cartNum = $scope.ordstatusNum.er;
      $scope.incompleteNum = $scope.ordstatusNum.san;
      $scope.cancelNum = $scope.ordstatusNum.si;
      $scope.refundNum = $scope.ordstatusNum.wu;
      $scope.allProNum = $scope.ordstatusNum.jiu;
    }

    //给取消订单添加选中非选中
    var qxIndex = 0;
    // var $qxLength = $('#cj-cancel-table .zchecked-all');
    // alert($qxLength.length)
    $('#cj-cancel-table').on('click', '.zcheckbox', function () {
      if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
        $(this).attr('src', 'static/image/direct-orders/multiple2.png');
        qxIndex++;
        if (qxIndex == $('#cj-cancel-table .zcheckbox').length) {
          // alert('quanbuxuanzhogn')
          $('#cj-cancel-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
        }
      } else {
        $(this).attr('src', 'static/image/direct-orders/multiple1.png');
        qxIndex--;
        if (qxIndex != $('#cj-cancel-table .zcheckbox').length) {
          $('#cj-cancel-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
        }

      }
    })
    //全选
    $('#cj-cancel-table').on('click', '.zchecked-all', function () {
      if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
        $(this).attr('src', 'static/image/direct-orders/multiple2.png');
        qxIndex = $('#cj-cancel-table .zcheckbox').length;
        $('#cj-cancel-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
      } else {
        $(this).attr('src', 'static/image/direct-orders/multiple1.png');
        qxIndex = 0;
        $('#cj-cancel-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
      }
    })

    //给更多搜索添加点击显示隐藏的动画
    $('#ditect-searchmore').click(function () {
      $('#ditect-moresearch').toggle(300);
      $('#toggle-logo1').toggleClass('.glyphicon glyphicon-triangle-top');
    });
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
    //按店铺搜索订单
    $scope.storeChangeFun = function () {
      $scope.pageNum = 1;
      getList();
    }
    //高级搜索部分的查询		
    $('#tj-search-btn').click(function () {
      $scope.pageNum = 1;
      getList();
    })

    //高级搜索里面的按订单类型搜索
    $('.type-sel').change(function () {
      $scope.pageNum = 1;
      getList();
    })
    //把取消里的订单添加到待处理订单去
    $scope.addToProcessFun = function () {

      var selectNum = 0;//存储被选中的条数
      var ordersid = '';//存储订单的id
      $('#cj-cancel-table .order-detail').each(function () {//点击提交的时候去循环查找选中的订单
        if ($(this).children('.order-time').children('.zcheckbox').attr('src') == 'static/image/direct-orders/multiple2.png') {
          selectNum++;
          ordersid += $(this).children('.ord-cai').children('.order-id').text() + ',';
        }
      })
      if (selectNum <= 0) {
        dsp.closeLoadPercent($('.orders-list'))
        layer.msg('Please select order(s) first!')
        return;
      }
      layer.open({
        content:
          "<h5>You are adding the incomplete orders to Process Required.</h5>" +
          // +	"<li><p>You will be able to select shipping, split over weight orders</p>"
          // +	"</li><li><p> and make payment.</p></li>"
          "<p>Order Quantity:  <span id='awa-dcl-num'></span></p>",
        area: ["480px", "240px"],
        closeBtn: 0,
        // shadeClose: true,
        title: "Reprocess",
        skin: "",
        btn: ["Cancel", "Confirm"],
        success: function (layero, index) {
          $(layero)
            .find("#awa-dcl-num")
            .html(selectNum);
        },
        yes: function (index, layero) {
          dsp.closeLoadPercent($(".orders-list"));
          layer.close(index);
        },
        btn2: function (index, layero) {
          $scope.ordersList = [];
          dsp.loadPercent($(".orders-list"), $(window).height() - 171, 47, 0);
          var queryData = {};
          queryData.orderNums = ordersid;
          queryData = JSON.stringify(queryData);
          console.log(queryData);
          // dsp.closeLoadPercent($('.orders-list'))
          dsp.postFun(
            "app/order/recoveryOrder",
            queryData,
            function (data) {
              console.log(data);
              if (data.status == 200 && data.data.result == true) {
                $(".zchecked-all").attr(
                  "src",
                  "static/image/direct-orders/multiple1.png"
                );

                $scope.pageNum = 1;
                getList();
              }
            }
          );
        }
      });
    }

    //导出选中订单弹窗
    $scope.showExport = function(){
      var selectNum = 0;//存储被选中的条数
      var ordersid = '';//存储订单的id
      $('#cj-cancel-table .order-detail').each(function () {//点击提交的时候去循环查找选中的订单
        if ($(this).children('.order-time').children('.zcheckbox').attr('src') == 'static/image/direct-orders/multiple2.png') {
          selectNum++;
          ordersid += $(this).children('.ord-cai').children('.order-id').text() + ',';
        }
      })
      if (selectNum <= 0) {
        dsp.closeLoadPercent($('.orders-list'))
        layer.msg('Please select order(s) first!')
        return;
      }
      $scope.dcordFlag = true
      $scope.exportOrderIds=ordersid
    }

    $scope.goActexportOrder = function(){
      dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
      $scope.dcordFlag = false
      dsp.postFun('order/order/exportCanceledOrders',{cjorderId:$scope.exportOrderIds} , function (data) {
        //console.log(data)
        dsp.removeNodataPic($('.orders-list'))
        dsp.closeLoadPercent($('.orders-list'))
        if(data.status==200){
          const timestamp=new Date().getTime()
          const blob = new Blob([data.data]);
          const downloadElement = document.createElement("a");
          const href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          downloadElement.download = timestamp+".xlsx"
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
        }
      },err=>{
        layer.msg("error")
      },{
        responseType:'blob'
      })
    }
    
    //删除选中订单
    $scope.addToDeleteFun = function () {

      var selectNum = 0;//存储被选中的条数
      $('#cj-cancel-table .order-detail').each(function () {//点击提交的时候去循环查找选中的订单
        if ($(this).children('.order-time').children('.zcheckbox').attr('src') == 'static/image/direct-orders/multiple2.png') {
          selectNum++;
        }
      })
      if (selectNum <= 0) {
        dsp.closeLoadPercent($('.orders-list'))
        layer.msg('Please select order(s) first!')
        return;
      }
      layer.open({
        content: "<h5>Are you sure to delete selected orders permanently?</h5><p>Order Quantity:  <span id='awa-dcl-num'></span></p>",
        area: ['480px', '240px'],
        closeBtn: 0,
        // shadeClose: true,
        title: "Delete Permanently",
        skin: "",
        btn: ['Cancel', 'Confirm'],
        success: function (layero, index) {
          $(layero).find('#awa-dcl-num').html(selectNum);
        },
        yes: function (index, layero) {
          layer.close(index);
          dsp.closeLoadPercent($('.orders-list'))
        },
        btn2: function (index, layero) {
          // 点击提交按钮重新发送请求
          var deleteData = {};
          var deleteId = '';
          $("#cj-cancel-table .zcheckbox").each(function (i) {

            if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
              deleteId += $(this).parent().siblings('.ord-cai').children('.order-id').text() + ',';
            }
          })
          $scope.ordersList = [];
          dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
          console.log(deleteId)

          deleteData.orderNums = deleteId;
          console.log(deleteData)
          console.log(JSON.stringify(deleteData))
          dsp.postFun('app/order/thoroughDeleteOrder', JSON.stringify(deleteData), function (data) {
            // alert('chenggong')
            console.log(data)
            console.log(data.data)
            if (data.data.result == true) {
              $scope.pageNum = 1;
              getList();
            } else {
              dsp.closeLoadPercent($('.orders-list'))
              dsp.cjMesFun(1);
              return;
            }
          }, function () {
            dsp.closeLoadPercent($('.orders-list'))
            dsp.cjMesFun(1);
          })

        }
      });
    }
    //删除所有订单
    $scope.inpDeleAllFun = function () {
      $scope.deleteAllFlag = true;
    }
    //确定删除所有
    $scope.sureDelAllFun = function () {
      dsp.postFun('app/order/emptyOrder', "{}", function (data) {
        console.log(data)
        $scope.deleteAllFlag = false;
        if (data.data.result) {
          layer.msg('Delete All Success')
          $scope.pageNum = 1;
          getList();
        } else {
          layer.msg('Delete All Failed')
        }
      }, function (data) {
        console.log(data)
      })
    }
    //用订单号搜索 orderNumber  
    $('.ord-search-inp').keypress(function (Event) {
      if (Event.keyCode == 13) {
        $scope.ordnumSearch();
      }
    })
    $scope.ordnumSearch = function () {
      $scope.pageNum = 1;
      getList();
    }
    //显示大图
    $('.orders-table').on('mouseenter', '.sp-smallimg', function () {
      $(this).siblings('.hide-bigimg').show();
    })
    $('.orders-table').on('mouseenter', '.hide-bigimg', function () {
      $(this).show();
    })
    $('.orders-table').on('mouseleave', '.sp-smallimg', function () {
      $(this).siblings('.hide-bigimg').hide();
    })
    $('.orders-table').on('mouseleave', '.hide-bigimg', function () {
      $(this).hide();
    })
    //全部展开隐藏
    $('.showsp-img').mouseenter(function () {
      if ($(this).attr('src') == 'static/image/public-img/up.png') {
        $(this).attr('src', 'static/image/public-img/up-hover.png');
      } else if ($(this).attr('src') == 'static/image/public-img/down.png') {
        $(this).attr('src', 'static/image/public-img/down-hover.png');
      }
    })
    $('.showsp-img').mouseleave(function () {
      if ($(this).attr('src') == 'static/image/public-img/up-hover.png') {
        $(this).attr('src', 'static/image/public-img/up.png');
      } else if ($(this).attr('src') == 'static/image/public-img/down-hover.png') {
        $(this).attr('src', 'static/image/public-img/down.png');
      }
    })

    $('.showsp-img').click(function () {
      if ($(this).attr('src') == 'static/image/public-img/up-hover.png') {
        $(this).attr('src', 'static/image/public-img/down-hover.png');
        $('.orders-table .d-toggle-tr').show();
        $('.orders-table .order-detail').addClass('order-click-active');
      } else if ($(this).attr('src') == 'static/image/public-img/down-hover.png') {
        $(this).attr('src', 'static/image/public-img/up-hover.png');
        $('.orders-table .d-toggle-tr').hide();
        $('.orders-table .order-detail').removeClass('order-click-active');
      }
    })
    //鼠标划过事件
    //点击事件
    $('.orders-table').on('click', '.order-detail', function (event) {
      if ($(event.target).hasClass('zcheckbox')) {
        return;
      }
      if ($(this).hasClass('order-click-active')) {
        $(this).next().hide();
        $(this).removeClass('order-click-active');
        //$('.orders-table .order-detail').removeClass('order-click-active');
      } else {
        // $('.orders-table .d-toggle-tr').hide();//隐藏所有的商品
        $(this).next().show();
        // $('.orders-table .order-detail').removeClass('order-click-active');
        $(this).addClass('order-click-active');
      }
    })
    $('.orders-table').on('click', '.d-toggle-tr', function (event) {
      $(this).show();
      $(this).prev().addClass('order-click-active');
    })
    // 订单
    $('.orders-table').on('mouseenter', '.order-detail>td', function () {
      if ($(this).hasClass('order-time')) {
        return
      }
      $(this).parent().next().show();
      $('.orders-table .order-detail').removeClass('order-detail-active');
      $(this).parent().addClass('order-detail-active');
    })
    $('.orders-table').on('mouseleave', '.order-detail', function () {
      if ($(this).hasClass('order-click-active')) {
        $(this).next().show();
      } else {
        $(this).next().hide();
      }
    })
    //商品
    $('.orders-table').on('mouseenter', '.d-toggle-tr', function () {
      $(this).show();
    })
    $('.orders-table').on('mouseleave', '.d-toggle-tr', function () {

      if ($(this).prev().hasClass('order-click-active')) {
        $(this).show();
      } else {
        $(this).hide();
      }
    })
    //table
    $('.orders-table').mouseleave(function () {
      $('.orders-table .order-detail').removeClass('order-detail-active');
    });
    //cj商品名字跳转到cj详情页
    $scope.cjdetailhref = function (orditem, spitem) {
      var id = spitem.cjProductId;
      window.open('product-detail.html?id=' + id)
    }
    //商品名字跳转客户后台
    $scope.hrefFun = function (orditem, spitem) {
      console.log(orditem.STORE_NAME)
      var storeName = orditem.STORE_NAME;
      console.log(spitem.product_id)
      var productId = spitem.product_id;
      if (storeName == "Excel Imported") {
        return;
      } else {
        window.open('https://' + storeName + '.myshopify.com/admin/products/' + productId)
      }
    }
    //cj开始日期搜索
    $("#cj-stime").click(function () {
      var cjendtime = $("#cj-stime").val();
      var interval = setInterval(function () {
        var endtime2 = $("#cj-stime").val();
        if (endtime2 != cjendtime) {
          clearInterval(interval);

          $scope.pageNum = 1;
          getList();
        }
      }, 100)
    })
    //cj结束日期搜索
    $("#cj-etime").click(function () {
      var cjendtime = $("#cj-etime").val();
      var interval = setInterval(function () {
        var endtime2 = $("#cj-etime").val();
        if (endtime2 != cjendtime) {
          $scope.ordersList = [];
          dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
          clearInterval(interval);

          $scope.pageNum = 1;
          getList();
        }
      }, 100)
    })
    //检查没有拉取到订单的原因
    $scope.noOrdResonFlag = false;
    $scope.resResonFlag = false;//展示后台返回的没有订单原因的弹框
    $scope.noOrdResonFun = function () {
      $scope.noOrdResonFlag = true;
    }
    $scope.noOrdSureFun = function () {
      if ($scope.shopOrdNum == 'undefined' || $scope.shopOrdNum == '') {
        layer.msg('Please enter the order number in your shop.')
        return;
      }
      layer.load(2)
      dsp.postFun('app/order/checkSyncOrder', {
        customerOrderId: $scope.shopOrdNum
      }, function (data) {
        console.log(data)
        layer.closeAll('loading');
        $scope.noOrdResonFlag = false;
        if (data.data.result != '') {
          $scope.resResonFlag = true;
          $('.no-ordres-reson').text(data.data.result)
        } else {
          layer.msg('The query fails.')
        }
      }, function (data) {
        layer.closeAll('loading');
        console.log(data)
      })
    }
    $scope.noOrdQxFun = function () {
      $scope.noOrdResonFlag = false;
    }
    $scope.closeResReasonFun = function () {
      $scope.resResonFlag = false;
      $('.no-ordres-reson').text('');
    }
  }]);

  return app; 
}
