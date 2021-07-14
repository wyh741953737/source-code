export function importAllFactory(angular) {
  const app = angular.module('import-all.module', ['service']);

  app.controller('import-all.ctrl', ['$scope', 'dsp',
    function ($scope, dsp) {
      $scope.dataFound = true;
      //客户第一次进入订单模块的界面
      $scope.isordFlag = false;
      dsp.load();
      var pageH = $(window).height() - 171;
      var docH = $(document).height();
      $('.directorders-wrap').css({
        'min-height': $(window).height() * 1 + 'px'
      });
      $('.direct-right').css({
        'min-height': $(window).height() * 1 + 'px'
      });

      var bs = new Base64();
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
      // $("#cj-etime").val('Now');   //关键语句

      var orData = {};
      orData.data = {};
      orData.data.status = '1';//请求的订单状态
      orData.data.page = 1;//请求的第几页   10*1-10Ò³Âë
      orData.data.limit = 100;//每页限制的订单条数
      //获取时间参数
      var yStoresTime = $('#y-ord-sdate').val();
      var yStoreeTime = $('#y-ord-edate').val();
      var cjsTime = $('#cj-stime').val();
      var cjeTime = $('#cj-etime').val();
      orData.data.storeOrderDateBegin = yStoresTime;//店铺开始时间
      orData.data.storeOrderDateEnd = yStoreeTime;//店铺结束时间
      orData.data.cjOrderDateBegin = cjsTime;//cj开始时间
      orData.data.cjOrderDateEnd = cjeTime;//cj结束时间
      $scope.pageLimit = orData.data.limit;
      orData.data = JSON.stringify(orData.data);
      $scope.flag = false;
      //给待提交订单里的下拉框赋值
      $('#dcl-sel').val('100');
      //给导航栏的待处理订单添加样式
      $('.allimport-nav').click(function () {
        $('.direct-orders-ctrltatus-nav').css({
          backgroundColor: 'rgb(84, 86, 98)',
          color: '#fff'
        })
        // $(this).css({
        // 	backgroundColor: '#fff',
        // 	color: '#3f3f3f'
        // })
      })
      var orderId = '';
      var ddorderid = '';//一个订单的id
      $scope.pcountN = 0;//存储待提交订单的总条数 process required
      console.log(JSON.stringify(orData))
      dsp.postFun('app/order/getAllOrder', JSON.stringify(orData), dclsFun)
      function dclsFun(data) {
        console.log(data.data)
        var list1 = data.data.result;
        $scope.list = JSON.parse(list1);
        console.log($scope.list)
        $scope.shops = $scope.list.shops;//店铺的数组

        $scope.ordersList = $scope.list.ordersList;
        console.log($scope.ordersList)
        $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
        console.log($scope.list.allOrderCount2)
        $scope.ordstatusNum = $scope.list.allOrderCount2;//各种状态订单的数量

        if ($scope.pcountN > 0) {
          $scope.dataFound = true;
          layer.closeAll("loading")

        } else {
          $scope.dataFound = false;
          layer.closeAll("loading")
        }

        importFun();//分页函数
        numFun();//调用给订单赋值的函数
      }
      //给订单状态赋值的函数
      function numFun() {
        $scope.impprocessNum = $scope.ordstatusNum.yi;
        $scope.cartNum = $scope.ordstatusNum.er;
        $scope.incompleteNum = $scope.ordstatusNum.san;
        $scope.cancelNum = $scope.ordstatusNum.si;
        $scope.refundNum = $scope.ordstatusNum.wu;
        $scope.allProNum = $scope.ordstatusNum.jiu;
        if ($scope.impprocessNum == 0 && $scope.cartNum == 0 && $scope.incompleteNum == 0 && $scope.cancelNum == 0 && $scope.refundNum == 0) {
          $scope.dataFound = true;//隐藏没有数据的图片
          $scope.isordFlag = true;//显示关联搜索的内容
        } else {
          $scope.isordFlag = false;//隐藏关联搜索的内容
        }
      }
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
            clearTimeout(timer)
            console.log(myDate)
            $scope.tipsOrdStatues = localStorage.getItem('ordTips');
            $('.titOrdTips').text($scope.tipsOrdStatues)
          }
          // console.log($scope.tipsOrdStatues)
          // console.log(codeInlocal)
        }, 1000)
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


      $scope.ischeckFlag = true;
      //是否选中
      $scope.ischekFun = function (ev) {
        $(ev.target).prop('checked', 'true');
        $scope.ischeckFlag = !$scope.ischeckFlag;
        console.log($scope.ischeckFlag)
        if ($scope.ischeckFlag) {
          $scope.ischeckFlag = true;
          $scope.nologistCs = 'y';
          $scope.counChangeFun();
        } else {
          $scope.ischeckFlag = false;
          $scope.nologistCs = '';
          $scope.counChangeFun();
        }
      }
      //修改物流
      $scope.bulkChangeWlFun = function () {
        if ($scope.logisName) {
          dsp.load();
          var ids = '';
          $('#z-dcl-ord .zcheckbox').each(function () {
            ids += $(this).siblings('.dclord-sys-time').text() + ',';
          })
          console.log($scope.logisName)
          console.log(ids);
          var xgwlData = {};
          xgwlData.logisic = $scope.logisName;
          xgwlData.orderNums = ids;
          console.log(JSON.stringify(xgwlData))
          dsp.postFun('app/order/upOrderLogisics', JSON.stringify(xgwlData), function (data) {
            console.log(data)
            if (data.data.result == true) {
              // alert(123)
              var upwlData = {};
              tjFun(upwlData);
              upwlData.data.logisticName = $scope.nologistCs;
              upwlData.data.country = $scope.countryName;
              upwlData.data = JSON.stringify(upwlData.data);
              dsp.postFun('app/order/getAllOrder', JSON.stringify(upwlData), function (data) {
                console.log(data)
                var list1 = JSON.parse(data.data.result);
                console.log(list1)
                $scope.ordersList = list1.ordersList;
                console.log($scope.ordersList)
                $scope.pcountN = list1.countNumber;//获取总订单的条数
                if ($scope.pcountN > 0) {
                  $scope.dataFound = true;
                  layer.closeAll("loading")
                } else {
                  $scope.dataFound = false;
                  layer.closeAll("loading")
                }
                importFun();//分页函数
              })
            } else {
              layer.closeAll("loading")
              layer.msg('Modify the logistics failure')
            }
          }, function (data) {
            console.log(data)
          })
        }
      }
      //高级搜索的物流查询
      $scope.gjChangeWlFun = function () {
        if ($scope.gjlogisName) {
          $scope.nologistCs = $scope.gjlogisName;
          // $scope.ischeckFlag = true;
          dsp.load();
          var upwlData = {};
          tjFun(upwlData);
          upwlData.data.logisticName = $scope.nologistCs;
          upwlData.data.country = $scope.countryName;
          upwlData.data = JSON.stringify(upwlData.data);
          console.log(upwlData)
          dsp.postFun('app/order/getAllOrder', JSON.stringify(upwlData), function (data) {
            console.log(data)
            var list1 = JSON.parse(data.data.result);
            console.log(list1)
            $scope.ordersList = list1.ordersList;
            console.log($scope.ordersList)
            $scope.pcountN = list1.countNumber;//获取总订单的条数
            console.log($scope.pcountN)
            if ($scope.pcountN > 0) {
              $scope.dataFound = true;
              layer.closeAll("loading")
            } else {
              $scope.dataFound = false;
              layer.closeAll("loading")
            }
            importFun();//分页函数
          })
        } else {
          $scope.nologistCs = 'y';
          // $scope.ischeckFlag = false;
        }
      }
      function tjFun(tjcs) {
        var showList = $('#dcl-sel').val() - 0;
        var yStoresTime = $('#y-ord-sdate').val();
        var yStoreeTime = $('#y-ord-edate').val();
        var cjsTime = $('#cj-stime').val();
        var cjeTime = $('#cj-etime').val();
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
        tjcs.data.status = '1';//请求的订单状态
        tjcs.data.page = 1;//请求的第几页   10*1-10Ò³Âë
        tjcs.data.limit = showList;//每页限制的订单条数
        tjcs.data.orderNumber = searchinpVal;
        tjcs.data.storeOrderDateBegin = yStoresTime;
        tjcs.data.cjOrderDateBegin = cjsTime;
        tjcs.data.storeOrderDateEnd = yStoreeTime;
        tjcs.data.cjOrderDateEnd = cjeTime;
        tjcs.data.storeProductName = yStoreName;
        tjcs.data.cjProductName = cjStoreName;
        tjcs.data.buyerName = berName;
        tjcs.data.orderType = ordType;
      }
      //鼠标移入移除 显示商品
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
      //点击事件
      $('.orders-table').on('click', '.order-detail', function (event) {
        // console.log(event)
        if ($(event.target).hasClass('zcheckbox') || $(event.target).hasClass('dcl-ord-selwl')) {
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
        if ($(this).prev().hasClass('order-click-active')) {
          $(this).hide();
          $(this).prev().removeClass('order-click-active');
        } else {
          $(this).show();
          $(this).prev().addClass('order-click-active');
        }
      })
      // 订单
      $('.orders-table').on('mouseenter', '.order-detail', function () {
        $(this).next().show();
        $('.orders-table .order-detail').removeClass('order-detail-active');
        $(this).addClass('order-detail-active');
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
      $scope.navList = [
        {name:'Process Required',href:"#/direct-orders"},
        {name:'Cart',href:"#/imp-cart"},
        {name:'Incomplete Orders',href:"#/imp-incomp"},
        {name:'Canceled',href:"#/imp-cancel",show:true},
        {name:'Search All',href:"#/search-all"},
        {name:'Store Orders',href:"#/AuthorizeOrder"},
      ]
      // 左侧的导航添加滚动事件
      $(document).scroll(function () {
        if ($(document).scrollTop() >= 80) {
          $('.left-nav').css({
            position: 'fixed',
            top: '80px'
          });
        }
        else {
          $('.left-list').css({
            position: 'relative',
            top: '0'
          });
        }
      })


      //给更多搜索添加点击显示隐藏的动画
      $('#ditect-searchmore').click(function () {
        $('#ditect-moresearch').stop().toggle(300);
        $('#toggle-logo1').toggleClass('.glyphicon glyphicon-triangle-top');
      });

      //给待处理订单添加选中非选中状态
      $('#z-dcl-ord').on('click', '.zcheckbox', function (event) {
        event.stopPropagation();
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          // alert(1)
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          dclSecNum++;
          // alert(dclSecNum)
          var ordersid = $(this).parent().siblings('.ord-cai').children('.order-id').text();
          // var remark = $(this).parent().parent().attr("remark");
          ordRemark = $(this).parent().parent().attr("remark");
          // alert($(this).parent().parent().attr("equal"))//获取相同的订单的属性
          var equalNum = $(this).parent().parent().attr("equal");
          // alert(equalNum)
          // alert($('#z-dcl-ord .order-detail').length)
          if (equalNum !== undefined) {//被拆分过
            // alert('找到了')
            $('#z-dcl-ord .order-detail').each(function () {//循环所有的订单
              if ($(this).attr('equal') == equalNum) {
                $(this).children('.order-time').children('.zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
              }
            })
          }
          if (dclSecNum == $('#z-dcl-ord .zcheckbox').length) {
            $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
          }
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          var equalNum1 = $(this).parent().parent().attr("equal");
          if (equalNum1 !== undefined) {//被拆分过
            $('#z-dcl-ord .order-detail').each(function () {//循环所有的订单
              if ($(this).attr('equal') == equalNum1) {
                // alert($(this).children('.order-time').html());
                $(this).children('.order-time').children('.zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
              }
            })
          }
          dclSecNum--;
          if (dclSecNum != $('#z-dcl-ord .zcheckbox').length) {
            $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          }
        }
      })
      //给待处理订单添加全选事件
      $('#z-dcl-ord').on('click', '.zchecked-all', function () {
        // var bcfordnum = 0;//存储被拆分的个数
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          $('#z-dcl-ord .zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
          dclSecNum = $('#z-dcl-ord .zcheckbox').length;
        } else {

          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          $('#z-dcl-ord .zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
          $('#z-dcl-ord .order-detail').each(function () {
            if ($(this).attr('spbq') == '1') {
              // alert($(this).children('.order-time').html())
              $(this).children('.order-time').children('.zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
            }
          })
          dclSecNum = 0;
        }
      })
      // 生成一个随机函数给拆分的订单赋值
      $scope.numFun1 = function () {
        var str = '';
        for (var i = 0; i < 5; i++) {
          str += Math.floor(Math.random() * 10);
        }
        return str;
      }

      //给excel-orders按钮点击事件 显示下拉
      $('.excel-orders').mouseenter(function () {
        $('#svc-xl').show();
      })
      $('.excel-orders').mouseleave(function () {
        $('#svc-xl').hide();
      })
      $('.svc-li1').click(function (e) {
        e.stopPropagation();
        $('.dcl-tc-wrap').show();
        $('#svc-xl').hide();
      })
      //选择上传 粘贴弹框的取消按钮
      $('.can-dtw-tc').click(function () {
        $('.dcl-tc-wrap').hide();
        $('#svc-xl').hide();
      })
      //点击copy按钮 显示copy弹窗
      $('.dtwt-r').click(function () {
        $('.copy-row-ul li').remove();//清空复制粘贴里面所有的数据
        $('.dcl-tc-wrap').hide();
        $('.copy-wrap').show();
        $('.copy-row-ul').eq(1).attr('isfir', '1');
      })


      //excel订单按钮的下拉样式
      $('#svc-xl li').hover(function () {
        $('#svc-xl li').css({
          backgroundColor: '#fff',
          color: '#f88f29'
        })
        $(this).css({
          backgroundColor: '#f88f29',
          color: '#fff'
        })
      })

      //粘贴的取消按钮
      $('#copy-cancel-btn').click(function () {
        $('.copy-wrap').hide();
        $('.copy-row-ul li').remove();
        $('.add-text-btn').attr('src', 'static/image/public-img/add.png');
      })
      //粘贴的文本框
      $scope.isadd = false;
      var $currentObj = {};
      //增加文本的图片按钮
      $scope.addTextCon = function ($event) {
        var excelTit = $($event.currentTarget).parent().parent().siblings('.c-head-tit').text();
        // alert(excelTit);
        $('#excel-tit').text(excelTit)
        $currentObj = $($event.currentTarget).parent().parent();
        if ($currentObj.attr('isfir') == 1) {
          $('#add-textarea').val('');//清空文本框
          $scope.isadd = true;
          $('.add-text-btn').attr('src', 'static/image/public-img/add.png')
          $($event.currentTarget).attr('src', 'static/image/public-img/add-active.png')
          $currentObj = $($event.currentTarget).parent().parent();
          // console.log($currentObj)
          $currentObj.children('.hide-add-data').remove();
          $currentObj.children('.copy-row-li').remove();
        } else if ($('.copy-row-ul').eq(1).children('.copy-row-li').length <= 0) {
          layer.msg('Please enter order number first.')
          return;
        } else if ($('.copy-row-ul').eq(1).children('.copy-row-li').length > 0) {
          $('#add-textarea').val('');//清空文本框
          $scope.isadd = true;
          $('.add-text-btn').attr('src', 'static/image/public-img/add.png')
          $($event.currentTarget).attr('src', 'static/image/public-img/add-active.png')
          $currentObj = $($event.currentTarget).parent().parent();
          // console.log($currentObj)
          $currentObj.children('.hide-add-data').remove();
          $currentObj.children('.copy-row-li').remove();
        }
      }

      //鼠标移入切换图片
      $('.dtwt-l').mouseenter(function (event) {
        $(this).children('img').attr('src', 'static/image/public-img/excel-aimg.png')
      });
      $('.dtwt-l').mouseleave(function (event) {
        $(this).children('img').attr('src', 'static/image/public-img/excel-img.png')
      });
      $('.dtwt-r').mouseenter(function (event) {
        $(this).children('img').attr('src', 'static/image/public-img/copy-aimg.png')
      });
      $('.dtwt-r').mouseleave(function (event) {
        $(this).children('img').attr('src', 'static/image/public-img/copy-img.png')
      });
      //分页
      function importFun() {
        if ($scope.pcountN == 0) {
          layer.closeAll("loading")
          // alert(555)
          return;
        }
        dsp.load();
        $(".pagination-demo1").jqPaginator({
          totalCounts: $scope.pcountN,//设置分页的总条目数
          pageSize: $('#dcl-sel').val() - 0,//设置每一页的条目数
          visiblePages: 5,
          currentPage: 1,
          activeClass: 'active',
          first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
          prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
          next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
          last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
          page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
          onPageChange: function (n, type) {
            console.log(n)
            // alert($scope.pcountN)
            console.log(type)
            if (type == 'init') {
              layer.closeAll("loading")
              return;
            }
            // alert(777)
            console.log(n + '-----------------------')
            dsp.load();
            //让待处理全选按钮置为非选中状态
            $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
            var showList = $('#dcl-sel').val() - 0;
            var yStoresTime = $('#y-ord-sdate').val();
            var yStoreeTime = $('#y-ord-edate').val();
            var cjsTime = $('#cj-stime').val();
            var cjeTime = $('#cj-etime').val();
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
            var orData = {};
            orData.userId = bs.decode(localStorage.getItem('userId'));
            // console.log(orData.userId)
            orData.token = bs.decode(localStorage.getItem('token'));

            orData.data = {};
            orData.data.status = '1';//请求的订单状态
            orData.data.page = n;//请求的第几页   10*1-10Ò³Âë
            orData.data.limit = showList;//每页限制的订单条数
            orData.data.orderNumber = searchinpVal;
            orData.data.storeOrderDateBegin = yStoresTime;
            orData.data.cjOrderDateBegin = cjsTime;
            orData.data.storeOrderDateEnd = yStoreeTime;
            orData.data.cjOrderDateEnd = cjeTime;
            orData.data.storeProductName = yStoreName;
            orData.data.cjProductName = cjStoreName;
            orData.data.canhandler = 'y';
            orData.data.buyerName = berName;
            orData.data.orderType = ordType;
            orData.data = JSON.stringify(orData.data)
            // console.log(orData.data)
            // console.log(JSON.stringify(orData))
            console.log(666666666666666666666)
            dsp.postFun('app/order/getAllOrder', JSON.stringify(orData), function (data) {

              // console.log(data.data)

              var list1 = data.data.result;
              $scope.list = JSON.parse(list1);
              console.log($scope.list)
              $scope.ordersList = $scope.list.ordersList;
              console.log($scope.ordersList)
              $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
              if ($scope.pcountN > 0) {
                $scope.dataFound = true;
                layer.closeAll("loading")
              } else {
                $scope.dataFound = false;
                layer.closeAll("loading")
              }


            })
          }
        });
      }

      //分页选择框的查询事件
      $('#dcl-sel').change(function () {
        //让待处理全选按钮置为非选中状态
        $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
        var showList = $(this).val() - 0;
        if ($scope.pcountN < 1) {
          return;
        }
        dsp.load();
        $(".pagination-demo1").jqPaginator({
          totalCounts: $scope.pcountN,//设置分页的总条目数
          pageSize: showList,//设置每一页的条目数
          visiblePages: 5,//显示多少页
          currentPage: 1,
          activeClass: 'active',
          first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
          prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
          next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
          last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
          page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
          onPageChange: function (n) {
            var yStoresTime = $('#y-ord-sdate').val();
            var yStoreeTime = $('#y-ord-edate').val();
            var cjsTime = $('#cj-stime').val();
            var cjeTime = $('#cj-etime').val();
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
            var orData = {};
            orData.userId = bs.decode(localStorage.getItem('userId'));
            // console.log(orData.userId)
            orData.token = bs.decode(localStorage.getItem('token'));

            orData.data = {};
            orData.data.status = '1';//请求的订单状态
            orData.data.page = n;//请求的第几页   10*1-10Ò³Âë
            orData.data.limit = showList;//每页限制的订单条数
            orData.data.orderNumber = searchinpVal;
            orData.data.storeOrderDateBegin = yStoresTime;//店铺开始时间
            orData.data.cjOrderDateBegin = cjsTime;//cj开始时间
            orData.data.storeOrderDateEnd = yStoreeTime;//店铺结束时间
            orData.data.cjOrderDateEnd = cjeTime;//cj结束时间
            orData.data.storeProductName = yStoreName;//店铺商品名称
            orData.data.cjProductName = cjStoreName;//cj商品名称
            // orData.data.canhandler = 'y';
            orData.data.buyerName = berName;//名字
            orData.data.orderType = ordType;//订单类型
            orData.data = JSON.stringify(orData.data)
            // console.log(orData.data)
            console.log(JSON.stringify(orData))

            dsp.postFun('app/order/getAllOrder', JSON.stringify(orData), dclsFun)
            function dclsFun(data) {

              console.log(data.data)
              var list1 = data.data.result;
              // console.log(list);
              $scope.list = data.data.result;
              $scope.list = JSON.parse(list1);
              $scope.ordersList = $scope.list.ordersList;
              console.log($scope.ordersList)
              //获取总订单的条数
              $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
              if ($scope.pcountN > 0) {
                $scope.dataFound = true;
                layer.closeAll("loading")
              } else {
                $scope.dataFound = false;
                layer.closeAll("loading")
              }

            }
          }
        });


      })
      //按店铺搜索订单
      $scope.storeChangeFun = function () {
        // alert($(this).val());
        $scope.ordersList = [];
        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);

        var orData = {};
        tjFun(orData)
        orData.data = JSON.stringify(orData.data);
        dsp.postFun('app/order/getAllOrder', JSON.stringify(orData), function (data) {
          //让待处理全选按钮置为非选中状态
          $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          console.log(data.data)
          var list1 = data.data.result;
          // console.log(list);
          $scope.list = data.data.result;
          $scope.list = JSON.parse(list1);
          $scope.ordersList = $scope.list.ordersList;
          console.log($scope.ordersList)

          $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
          if ($scope.pcountN > 0) {
            $scope.dataFound = true;
            layer.closeAll("loading")
          } else {
            $scope.dataFound = false;
            layer.closeAll("loading")
          }
          importFun();//分页函数
        })
      }
      //按条件分页 下
      $('.ip-jump-btn2').click(function () {
        dsp.load();
        var selectVal = 1;//复选框的值
        selectVal = $('.ip-select-num2').val() - 0;
        // alert(selectVal);
        // var inpVal = 0;//存储输入框的值
        var inpVal = $('.inp-num-go2').val() - 0;//输入框 需要跳到第几页
        // alert(inpVal)
        if (inpVal == '') {
          layer.closeAll("loading")
          layer.msg('The value of the input box cannot be empty!');
          return;
        }
        var countN = Math.ceil($scope.pcountN / selectVal);
        // alert(countN)
        if (inpVal > countN) {
          layer.closeAll("loading")
          layer.msg('Please input number less than page amount.');
          return;
        }
        //让全选按钮置为非选中状态
        $('.zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
        $(".pagination-demo1").jqPaginator({
          totalCounts: $scope.pcountN,//设置分页的总条目数
          pageSize: selectVal,//设置每一页的条目数
          visiblePages: 5,//显示多少页
          currentPage: inpVal,
          activeClass: 'active',
          first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
          prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
          next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
          last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
          page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
          onPageChange: function (n) {
            var yStoresTime = $('#y-ord-sdate').val();
            var yStoreeTime = $('#y-ord-edate').val();
            var cjsTime = $('#cj-stime').val();
            var cjeTime = $('#cj-etime').val();
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
            var orData = {};
            orData.userId = bs.decode(localStorage.getItem('userId'));
            orData.token = bs.decode(localStorage.getItem('token'));

            orData.data = {};
            orData.data.status = '1';//请求的订单状态
            orData.data.page = n;//请求的第几页   10*1-10Ò³Âë
            orData.data.limit = selectVal;//每页限制的订单条数
            orData.data.orderNumber = searchinpVal;
            orData.data.storeOrderDateBegin = yStoresTime;//店铺开始时间
            orData.data.cjOrderDateBegin = cjsTime;//cj开始时间
            orData.data.storeOrderDateEnd = yStoreeTime;//店铺结束时间
            orData.data.cjOrderDateEnd = cjeTime;//cj结束时间
            orData.data.storeProductName = yStoreName;//店铺商品名称
            orData.data.cjProductName = cjStoreName;//cj商品名称
            // orData.data.canhandler = 'y';
            orData.data.buyerName = berName;//名字
            orData.data.orderType = ordType;//订单类型
            orData.data = JSON.stringify(orData.data);

            console.log(JSON.stringify(orData))
            dsp.postFun('app/order/getAllOrder', JSON.stringify(orData), function (data) {
              // alert('chenggong')
              // $scope.dataFound = true;
              console.log(data.data)
              var list1 = data.data.result;
              // console.log(list);
              $scope.list = data.data.result;
              $scope.list = JSON.parse(list1);
              $scope.ordersList = $scope.list.ordersList;
              console.log($scope.ordersList)
              $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
              if ($scope.pcountN > 0) {
                $scope.dataFound = true;
                layer.closeAll("loading")
              } else {
                $scope.dataFound = false;
                layer.closeAll("loading")
              }

            })
          }
        });
      })
      //用订单号搜索 orderNumber
      $('.ord-search-inp').keypress(function (Event) {
        if (Event.keyCode == 13) {
          $scope.ordnumSearch();
        }
      })
      $scope.ordnumSearch = function () {
        var searchinpVal = $.trim($('.ord-search-inp').val());
        dsp.load();
        var showList = $('#dcl-sel').val() - 0;

        var orData = {};
        orData.data = {};
        orData.data.status = '1';//请求的订单状态
        orData.data.page = 1;//请求的第几页   10*1-10Ò³Âë
        orData.data.limit = showList;//每页限制的订单条数
        orData.data.orderNumber = searchinpVal;
        orData.data.cjOrderDateBegin = $('#cj-stime').val();//cj开始时间
        orData.data.cjOrderDateEnd = $('#cj-etime').val();//cj结束时间
        orData.data = JSON.stringify(orData.data)
        console.log(orData.data)
        console.log(JSON.stringify(orData))
        // alert(inpVal)
        dsp.postFun('app/order/getAllOrder', JSON.stringify(orData), dclsFun)
        function dclsFun(data) {
          //让待处理全选按钮置为非选中状态
          $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          console.log(data.data)
          var list1 = data.data.result;//ËùÓÐÊý¾Ý
          // console.log(list);
          $scope.list = data.data.result;
          $scope.list = JSON.parse(list1);
          $scope.ordersList = $scope.list.ordersList;
          console.log($scope.ordersList)
          // $scope.orderList = $scope.list.orderList;//订单列表
          // $scope.productList = $scope.list.productList;//产品列表
          $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
          if ($scope.pcountN > 0) {
            $scope.dataFound = true;
            layer.closeAll("loading")
          } else {
            $scope.dataFound = false;
            layer.closeAll("loading")
          }
          importFun();
        }
      }
      function pselwlFun() {
        $('.dcl-ord .order-detail').each(function () {
          if ($(this).children('.dcl-ord-wltd').children('.dcl-ord-selwl').val() == 'Please select') {
            $(this).children('.dcl-ord-wltd').children('.dcl-ord-selwl').css('border', '1px solid #f88f29');
          } else {
            $(this).children('.dcl-ord-wltd').children('.dcl-ord-selwl').css('border', '1px solid #ececec');
          }
        })
      }

      //给左侧的导航添加滚动事件
      $(document).scroll(function () {
        if ($(document).scrollTop() >= 0) {
          $('.left-nav').css({
            position: 'fixed',
            top: '80px'
          });
          if ($(document).scrollTop() >= 52) {
            $('.back-wrap').css({
              top: '80px'
            })
          } else {
            $('.back-wrap').css({
              top: '130px'
            })
          }
        }
        else {
          $('.left-nav').css({
            position: 'relative',
            top: '80px'
          });
        }
      })

      //高级搜索部分的查询		
      $('#tj-search-btn').click(function () {
        dsp.load();
        var showList = $('#dcl-sel').val() - 0;
        var yStoresTime = $('#y-ord-sdate').val();
        var yStoreeTime = $('#y-ord-edate').val();
        // var cjsTime = $('#cj-stime').val();
        // var cjeTime = $('#cj-etime').val();
        var yStoreName = $.trim($('#y-pro-name').val());
        var cjStoreName = $.trim($('#cj-pro-name').val());
        var berName = $.trim($('.buyer-inp').val());
        var storeName = $('#dcl-sel-store').val();
        // alert(yStoresTime+'--'+yStoreeTime+'==='+cjsTime+'///'+cjeTime)
        var ordType = '';
        if ($('.type-sel').val() == 'All') {
          ordType = '';
        } else if ($('.type-sel').val() == 'Shopify Imported') {
          ordType = '2';
        } else if ($('.type-sel').val() == 'Excel Imported') {
          ordType = '1';
        }
        var orData = {};
        orData.data = {};
        orData.data.status = '1';//请求的订单状态
        orData.data.page = 1;//请求的第几页   10*1-10Ò³Âë
        orData.data.limit = showList;//每页限制的订单条数
        // orData.data.cjOrderDateBegin = cjsTime;
        // orData.data.cjOrderDateEnd = cjeTime;
        orData.data.storeOrderDateBegin = yStoresTime;
        orData.data.storeOrderDateEnd = yStoreeTime;
        orData.data.storeProductName = yStoreName;
        orData.data.cjProductName = cjStoreName;
        // orData.data.canhandler = 'y';
        orData.data.buyerName = berName;
        orData.data.orderType = ordType;
        //关联上表格中的按店铺搜索
        if (storeName == 'Stores All') {
          orData.data.storeNumber = '';
        } else {
          orData.data.storeNumber = storeName;
        }
        orData.data = JSON.stringify(orData.data)
        console.log(orData.data)
        console.log(JSON.stringify(orData))
        dsp.postFun('app/order/getAllOrder', JSON.stringify(orData), dclsFun)
        function dclsFun(data) {
          //让待处理全选按钮置为非选中状态
          $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          console.log(data.data)
          var list1 = data.data.result;
          $scope.list = JSON.parse(list1);
          $scope.ordersList = $scope.list.ordersList;
          console.log($scope.ordersList)
          $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
          // alert($scope.pcountN)
          if ($scope.pcountN > 0) {
            $scope.dataFound = true;
            layer.closeAll("loading")
          } else {
            $scope.dataFound = false;
            layer.closeAll("loading")
            return;
          }
          importFun();//分页函数

        }
      })
      //高级搜索里面的按订单类型搜索
      $('.type-sel').change(function () {
        dsp.load();
        var showList = $('#dcl-sel').val() - 0;
        var ordType = '';
        if ($('.type-sel').val() == 'All') {
          ordType = '';
        } else if ($('.type-sel').val() == 'Shopify Imported') {
          ordType = '2';
        } else if ($('.type-sel').val() == 'Excel Imported') {
          ordType = '1';
        }
        var orData = {};
        orData.userId = bs.decode(localStorage.getItem('userId'));
        orData.token = bs.decode(localStorage.getItem('token'));

        orData.data = {};
        orData.data.status = '1';//请求的订单状态
        orData.data.page = 1;//请求的第几页   10*1-10Ò³Âë
        orData.data.limit = showList;//每页限制的订单条数
        orData.data.orderType = ordType;
        //获取时间参数
        var yStoresTime = $('#y-ord-sdate').val();
        var yStoreeTime = $('#y-ord-edate').val();
        var cjsTime = $('#cj-stime').val();
        var cjeTime = $('#cj-etime').val();
        // orData.data.storeOrderDateBegin = yStoresTime;//店铺开始时间
        orData.data.cjOrderDateBegin = cjsTime;//cj开始时间
        // orData.data.storeOrderDateEnd = yStoreeTime;//店铺结束时间
        orData.data.cjOrderDateEnd = cjeTime;//cj结束时间
        orData.data = JSON.stringify(orData.data)
        console.log(orData.data)
        console.log(JSON.stringify(orData))
        dsp.postFun('app/order/getAllOrder', JSON.stringify(orData), dclsFun)
        function dclsFun(data) {
          //让待处理全选按钮置为非选中状态
          $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          console.log(data.data)
          var list1 = data.data.result;
          $scope.list = data.data.result;
          $scope.list = JSON.parse(list1);
          // console.log($scope.list)
          // console.log($scope.list.productList);
          $scope.ordersList = $scope.list.ordersList;
          console.log($scope.ordersList)
          $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
          // alert($scope.pcountN)
          if ($scope.pcountN > 0) {
            $scope.dataFound = true;
            layer.closeAll("loading")
          } else {
            $scope.dataFound = false;
            layer.closeAll("loading")
            // $scope.orderList = '';
            return;
          }
          importFun();//分页函数
        }
      })
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
            // alert(endtime2+'!='+cjendtime)
            dsp.load();
            clearInterval(interval);

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

            var orData = {};
            orData.userId = bs.decode(localStorage.getItem('userId'));
            // console.log(orData.userId)
            orData.token = bs.decode(localStorage.getItem('token'));

            orData.data = {};
            orData.data.status = '1';//请求的订单状态
            orData.data.page = 1;//请求的第几页   10*1-10Ò³Âë
            orData.data.limit = $('#dcl-sel').val() - 0;//每页限制的订单条数
            // alert(orData.data.limit)
            orData.data.orderNumber = searchinpVal;
            orData.data.storeOrderDateBegin = yStoresTime;//店铺开始时间
            orData.data.storeOrderDateEnd = yStoreeTime;//店铺结束时间
            orData.data.storeProductName = yStoreName;//店铺商品名称
            orData.data.cjProductName = cjStoreName;//cj商品名称
            orData.data.buyerName = berName;//名字
            orData.data.orderType = ordType;//订单类型
            //获取时间参数
            var cjsTime = $('#cj-stime').val();
            var cjeTime = $('#cj-etime').val();
            orData.data.cjOrderDateBegin = cjsTime;//cj开始时间
            orData.data.cjOrderDateEnd = cjeTime;//cj结束时间
            orData.data = JSON.stringify(orData.data)
            dsp.postFun('app/order/getAllOrder', JSON.stringify(orData), dclsFun)
            function dclsFun(data) {
              //让待处理全选按钮置为非选中状态
              $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
              console.log(data.data)
              var list1 = data.data.result;
              $scope.list = data.data.result;
              $scope.list = JSON.parse(list1);

              $scope.ordersList = $scope.list.ordersList;
              console.log($scope.ordersList)
              $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
              // console.log($scope.list.allOrderCount2)
              // $scope.ordstatusNum = $scope.list.allOrderCount2;//各种状态订单的数量
              if ($scope.pcountN > 0) {
                $scope.dataFound = true;
                layer.closeAll("loading")

              } else {
                $scope.dataFound = false;
                layer.closeAll("loading")
              }
              importFun();//分页函数
            }
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
            dsp.load();
            clearInterval(interval);

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

            var orData = {};
            orData.userId = bs.decode(localStorage.getItem('userId'));
            // console.log(orData.userId)
            orData.token = bs.decode(localStorage.getItem('token'));

            orData.data = {};
            orData.data.status = '1';//请求的订单状态
            orData.data.page = 1;//请求的第几页   10*1-10Ò³Âë
            orData.data.limit = $('#dcl-sel').val() - 0;//每页限制的订单条数
            // alert(orData.data.limit)
            orData.data.orderNumber = searchinpVal;
            orData.data.storeOrderDateBegin = yStoresTime;//店铺开始时间
            orData.data.storeOrderDateEnd = yStoreeTime;//店铺结束时间
            orData.data.storeProductName = yStoreName;//店铺商品名称
            orData.data.cjProductName = cjStoreName;//cj商品名称
            orData.data.buyerName = berName;//名字
            orData.data.orderType = ordType;//订单类型
            //获取时间参数
            var cjsTime = $('#cj-stime').val();
            var cjeTime = $('#cj-etime').val();
            orData.data.cjOrderDateBegin = cjsTime;//cj开始时间
            orData.data.cjOrderDateEnd = cjeTime;//cj结束时间
            orData.data = JSON.stringify(orData.data)
            dsp.postFun('app/order/getAllOrder', JSON.stringify(orData), dclsFun)
            function dclsFun(data) {
              //让待处理全选按钮置为非选中状态
              $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
              console.log(data.data)
              var list1 = data.data.result;
              $scope.list = data.data.result;
              $scope.list = JSON.parse(list1);

              $scope.ordersList = $scope.list.ordersList;
              console.log($scope.ordersList)
              $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
              if ($scope.pcountN > 0) {
                $scope.dataFound = true;
                layer.closeAll("loading")

              } else {
                $scope.dataFound = false;
                layer.closeAll("loading")
              }
              importFun();//分页函数
            }
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
        dsp.load();
        dsp.postFun('app/order/checkSyncOrder', {
          customerOrderId: $scope.shopOrdNum
        }, function (data) {
          console.log(data)
          layer.closeAll("loading")
          $scope.noOrdResonFlag = false;
          if (data.data.result != '') {
            $scope.resResonFlag = true;
            $('.no-ordres-reson').text(data.data.result)
          } else {
            layer.msg('The query fails.')
          }
        }, function (data) {
          layer.closeAll("loading")
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