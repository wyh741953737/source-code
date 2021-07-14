export function importStoreFactory(angular) {
  const app = angular.module('import-store.module', ['service']);

  app.controller('import-store.ctrl', ['$scope', 'dsp','$timeout',
    function ($scope, dsp,$timeout) {
      var base64 = new Base64();
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
      $('.directorders-wrap').css({
        'min-height': $(window).height() * 1 + 'px'
      });
      $('.direct-right').css({
        'min-height': $(window).height() * 1 + 'px'
      });

      $scope.navList = [
        {name:'Process Required',href:"#/direct-orders"},
        {name:'Cart',href:"#/imp-cart"},
        {name:'Incomplete Orders',href:"#/imp-incomp"},
        {name:'Canceled',href:"#/imp-cancel"},
        {name:'Search All',href:"#/search-all"},
        {name:'Store Orders',href:"#/AuthorizeOrder",show:true},
      ]
      $('.direct-leftbara').click(function () {
        $('.direct-leftbara').css('background-image', '');
        $(this).css('background-image', 'linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
      });
      //默认参数
      $scope.pageNum = '1';
      $scope.pageSize = '30';
      $scope.searchInfo = '';
      var aDate = GetDateStr(-45);
      $("#cj-stime").val(aDate);

      //获取订单列表
      getCountry();
      getOrderList(true);
      function getOrderList(isfirst) {
        var sendData = {
          page: $scope.pageNum,
          limit: $scope.pageSize,
          orderNumber: $scope.searchInfo,
          cjOrderDateBegin: $('#cj-stime').val(),
          cjOrderDateEnd: $('#cj-etime').val(),
          storeNumber: $scope.storeName || '',
          country: $scope.countryName || ''
        }
        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
        dsp.postFun('order/oldOrder/getShopOrderList', JSON.stringify(sendData), function (data) {
          console.log(data.data);
          if (data.data.statusCode == '200') {
            var result = data.data.result;
            $scope.ordersList = result.ordersList;
            $scope.totalCount = result.countNumber;
            if(isfirst) {
              $scope.shops = result.shops;
              if (result.shops) {
                $scope.shops = result.shops;
              }
            }
            delShopFun($scope.shops)
            $scope.ordstatusNum = result.allOrderCount2;
            if ($scope.totalCount > 0) {
              dsp.removeNodataPic($('.orders-list'))
              dsp.closeLoadPercent($('.orders-list'))
            } else {
              addNotSjFun()
              // dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0)
              dsp.closeLoadPercent($('.orders-list'))
            }
            numFun();
            $scope.totalCounts = Math.ceil($scope.totalCount / $scope.pageSize);
            $scope.$broadcast('page-data', {
              pageNum: $scope.pageNum,
              totalNum: $scope.totalCounts,
              totalCounts: $scope.totalCount,
              pageSize: $scope.pageSize,
              pagesizeList: ['30','50','100','200','500']
            });
          } else if (data.data.statusCode == '401') {
            $scope.ordersList = [];
            $scope.totalCount = 0;
            addNotSjFun();
            dsp.closeLoadPercent($('.orders-list'))
          }
          dsp.closeLoadPercent($('.orders-list'));
        }, function () {
          // layer.closeAll("loading")

          dsp.closeLoadPercent($('.orders-list'))
          dsp.cjMesFun(1);
        })
      }
      $scope.$on('pagedata-fa', function (d, data) {
        console.log(data)
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getOrderList();
      });
      $scope.goActexportOrder = function () {
        let ids = selIdsFun();
        if(!ids){
          layer.msg('Please select orders.')
          return
        }
        var sendData = {
          page: $scope.pageNum,
          limit: $scope.pageSize,
          orderNumber: $scope.searchInfo,
          cjOrderDateBegin: $('#cj-stime').val(),
          cjOrderDateEnd: $('#cj-etime').val(),
          storeNumber: $scope.storeName || '',
          country: $scope.countryName || '',
          cjOrderNums : ids
        }
        layer.load(2);
        dsp.postFun('order/goods/exportStoreOrder', JSON.stringify(sendData), function (data) {
          console.log(data);
          layer.closeAll('loading');
          if (data.data.statusCode == 200) {
            $scope.dcordFlag = false;
            $scope.dcordCallbackFlag = true;
            $scope.excelHref = data.data.result;
          } else {
            layer.msg('Export order error.')
          }
        },function(){
          layer.closeAll('loading');
        })
      }
      function selIdsFun(){
        let ids = '';
        if(!$scope.ordersList || ($scope.ordersList&&$scope.ordersList.length<1))return '';
        for(let i = 0,len = $scope.ordersList.length;i<len;i++){
          if($scope.ordersList[i].checkFlag){
            ids += $scope.ordersList[i].ID + ','
          }
        }
        return ids;
      }
      $scope.checkItemFun = function(item,ev){
        // flag = !flag;
        ev.stopPropagation();
        $timeout(function(){
          let flag = item.checkFlag;
          console.log(flag)
          if(flag){
            for(let i = 0,len = $scope.ordersList.length;i<len;i++){
              console.log($scope.ordersList[i].checkFlag)
              if(!$scope.ordersList[i].checkFlag){
                $scope.checkAllFlag = false;
                break;
              }
              if(i == len-1){
                $scope.checkAllFlag = true;
              }
            }
          }else{
            $scope.checkAllFlag = false;
          }
        },10)
      }
      $scope.checkAllFun = function(){
        $scope.checkAllFlag = !$scope.checkAllFlag;
        if($scope.ordersList&&$scope.ordersList.length<1)return
        for(let i = 0,len = $scope.ordersList.length;i<len;i++){
          $scope.ordersList[i].checkFlag = $scope.checkAllFlag;
        }
      }
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
      //分页
      function importFun() {
        $(".pagination-demo1").jqPaginator({
          totalCounts: $scope.totalCount || 1,//设置分页的总条目数
          pageSize: $scope.pageSize * 1,//设置每一页的条目数
          visiblePages: 5,
          currentPage: $scope.pageNum - 0,
          activeClass: 'active',
          first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
          prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
          next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
          last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
          page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
          onPageChange: function (n, type) {
            console.log(n)
            console.log(type)
            if (type == 'init') {
              layer.closeAll("loading")
              dsp.closeLoadPercent($('.orders-list'))
              return;
            }
            $scope.pageNum = n + '';
            $scope.ordersList = [];
            getOrderList();
          }
        });
      }
      $scope.pagechange = function (pageSize) {
        $scope.pageNum = '1';
        $scope.ordersList = [];
        getOrderList();
      }
      $scope.pagenumchange = function () {
        var pagenum = Number($scope.pageNum);
        var totalpage = Math.ceil($scope.totalCount / $scope.pageSize);
        if (pagenum > totalpage) {
          layer.msg('Error page');
          $scope.pageNum = '1';
        } else {
          $scope.ordersList = [];
          getOrderList();
        }
      }
      $scope.ordnumSearch = function () {
        $scope.pageNum = '1';
        $scope.ordersList = [];
        getOrderList();
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
      $scope.storeChangeFun = function () {
        console.log($scope.storeName);
        $scope.pageNum = '1';
        $scope.ordersList = [];
        getOrderList();
      }
      $scope.counChangeFun = function () {
        $scope.pageNum = '1';
        $scope.ordersList = [];
        getOrderList();
      }

      function addNotSjFun() {
        dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'},true)
        $('.deal-orders').css('min-height', $('.cj-nodata-pic').height() + 50);
      }

      $scope.noOrdResonFlag = false;
        $scope.resResonFlag = false; //展示后台返回的没有订单原因的弹框
        $scope.isSelTimeFlag = true;
        $scope.noOrdResonFun = function() {
            $scope.noOrdResonFlag = true;
        }
        $scope.noOrdSureFun = function () {
          if ($scope.shopOrdNum == 'undefined' || $scope.shopOrdNum == '') {
            layer.msg('Please enter the order number in your shop.')
            return;
          }
          $scope.productYmBtn = false;
          layer.load(2);
          dsp.postFun('app/order/checkSyncOrder', {
            customerOrderId: $scope.shopOrdNum
          }, function (data) {
            console.log(data)
            // layer.closeAll("loading")
            $scope.noOrdResonFlag = false;
            if (data.data.result != '') {
              var cusOrdNum = $scope.shopOrdNum;
              if (data.data.result == '1') {
                if ($scope.shopOrdNum.indexOf('#') == -1) {
                  dsp.postFun('app/order/checkSyncOrder', {
                    customerOrderId: '#' + cusOrdNum
                  }, function (data) {
                    layer.closeAll("loading")
                    $scope.resResonFlag = true; //打开订单未拉取的原因
                    $('.no-ordres-reson').text(data.data.result)
                    if (data.data.result == '1') {
                      $scope.isSelTimeFlag = false;
                      if (data.data.data == '1') {
                        $scope.seaNowTime = "Sorry, we has not pulled this order from your store yet."
                      } else {
                        $scope.seaNowTime = data.data.date;
                      }
                    }
                  }, function (data) {
                    layer.closeAll("loading")
                    console.log(data)
                  })
                } else {
                  cusOrdNum = cusOrdNum.replace('#', '')
                  console.log(cusOrdNum)
                  dsp.postFun('app/order/checkSyncOrder', {
                    customerOrderId: cusOrdNum
                  }, function (data) {
                    layer.closeAll("loading")
                    $scope.resResonFlag = true; //打开订单未拉取的原因
                    $('.no-ordres-reson').text(data.data.result)
                    if (data.data.result == '1') {
                      $scope.isSelTimeFlag = false;
                      if (data.data.data == '1') {
                        $scope.seaNowTime = "Sorry, we has not pulled this order from your store yet."
                      } else {
                        $scope.seaNowTime = data.data.date;
                      }
                    }
                  }, function (data) {
                    layer.closeAll("loading")
                    console.log(data)
                  })
                }
              } else {
                layer.closeAll("loading")
                $scope.resResonFlag = true; //打开订单未拉取的原因
                $('.no-ordres-reson').text(data.data.result)
                if (data.data.result.indexOf('It looks that you had modified your store products recently') != -1) {
                  $scope.productYmBtn = true;
                }
                console.log(data.data)
              }
  
            } else {
              layer.closeAll("loading")
              layer.msg('The query fails.')
            }
          }, function (data) {
            layer.closeAll("loading")
            console.log(data)
          })
        }
        $scope.productLinkFun = function() {
            window.open('#/products-connection/connected')
        }
        $scope.noOrdQxFun = function() {
            $scope.noOrdResonFlag = false;
        }
        $scope.closeResReasonFun = function() {
            $scope.resResonFlag = false;
            $('.no-ordres-reson').text('');
        }
        $scope.syStu = 0;
        $scope.resOrdStu = 0;
        $scope.startSyFun = function() {

            localStorage.setItem('issy', 1)
            $scope.syStu = 1;
            console.log($scope.isSelTimeFlag)
            var syUpdata = {};
            syUpdata.type = 'start';
            if (!$scope.isSelTimeFlag) {
                if (!$('#seaord-stime').val() || !$('#seaord-etime').val()) {
                    layer.msg('Please select time')
                    localStorage.removeItem('issy')
                    return;
                }
                syUpdata.startDate = $('#seaord-stime').val();
                syUpdata.endDate = $('#seaord-etime').val();
            }
            dsp.postFun('order/oldOrder/getNewestOrder', JSON.stringify(syUpdata), function(data) {
                console.log(data)
                if (data.data.result == 'error') {
                    $scope.timeIsNValid = true;
                    layer.msg('Please enter the time as required')
                    return;
                } else {
                    $scope.timeIsNValid = false;
                    $scope.resOrdStu = data.data.result - 0;
                }
                $scope.syStuFlag = true; //显示订单状态的面板
                $scope.resResonFlag = false;
                console.log($scope.resOrdStu)
                if ($scope.resOrdStu != 5) {
                    var stuTimer = setInterval(function() {
                        getOrdSyFun()
                        console.log('567')
                        if ($scope.resOrdStu == 5) {
                            localStorage.removeItem('issy')
                            $scope.syStu = 2;
                            $('.reordstu-dlist').animate({
                                height: '360px'
                            }, 300);
                            clearInterval(stuTimer)
                        }
                    }, 5000)
                    console.log(stuTimer)
                } else {
                    $scope.syStu = 0;
                    localStorage.removeItem('issy')
                }
            }, function(data) {
                console.log(data)
            })
        }
        var issyFlag = localStorage.getItem('issy')
        console.log(issyFlag)
        if (issyFlag) {
            $scope.syStuFlag = true;
            localStorage.setItem('issy', 1)
            $scope.syStu = 1;
            // app/order
            dsp.postFun('order/oldOrder/getNewestOrder', {
                type: 'start'
            }, function(data) {
                console.log(data)
                if (data.data.result != 'error') {
                    $scope.resOrdStu = data.data.result - 0;
                }
                console.log($scope.resOrdStu)
                if ($scope.resOrdStu != 5) {
                    var stuTimer = setInterval(function() {
                        getOrdSyFun()
                            // console.log('567')
                        if ($scope.resOrdStu == 5) {
                            localStorage.removeItem('issy')
                            $scope.syStu = 2;
                            $('.reordstu-dlist').animate({
                                height: '360px'
                            }, 300);
                            clearInterval(stuTimer)
                        }
                    }, 5000)
                    console.log(stuTimer)
                } else {
                    $scope.syStu = 0;
                    localStorage.removeItem('issy')
                }
            }, function(data) {
                console.log(data)
            })
        }
        $scope.changesyFun = function() {
            if ($scope.syStuFlag) {
                $scope.syStuFlag = false;
            } else {
                $scope.syStuFlag = true;
            }
        }
        $scope.refershFun = function () {
          $scope.syStuFlag = false;
          $('.reordstu-dlist').animate({
            height: '275px'
          }, 300);
          $scope.syStu = 0;
          $scope.resOrdStu = 0;
          getOrderList()
        }
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
        function getOrdSyFun() {
            var syUpdata = {};
            syUpdata.type = 'continue';
            // if(!$scope.isSelTimeFlag){
            // 	syUpdata.startDate = $('#seaord-stime').val();
            // 	syUpdata.endDate = $('#seaord-etime').val();
            // }
            dsp.postFun('order/oldOrder/getNewestOrder', JSON.stringify(syUpdata), function(data) {
                // console.log(data)
                if (data.data.result != 'error') {
                    $scope.resOrdStu = data.data.result - 0;
                }
            }, function(data) {
                console.log(data)
            })
        }
        //精确按时间查找订单
        $scope.detailSeaOrdFun = function() {
          $scope.startSyFun();
      }
      // $scope.showdelFun = function (ev, index, item) {
      //     console.log(item);
      //     $('.dcl-ord-tbody').eq(index).find('.d-toggle-tr').show();//
      //     $('.dcl-ord-tbody').eq(index).find('.order-detail').css('background', '#f4f8fd');
      // }
      // $scope.hidedelFun = function (ev, index) {
      //     $('.dcl-ord-tbody').eq(index).find('.d-toggle-tr').hide();
      //     $('.dcl-ord-tbody').eq(index).find('.order-detail').css('background', '#fff');
      //     // console.log(index)
      // }

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
        $(this).show();
        $(this).prev().addClass('order-click-active');
        // if ($(this).prev().hasClass('order-click-active')) {
        // 	$(this).hide();
        // 	$(this).prev().removeClass('order-click-active');
        // } else {
        // 	$(this).show();
        // 	$(this).prev().addClass('order-click-active');
        // }
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

      //获取国家
      function getCountry() {
        dsp.postFun('app/order/getOrderCountry', null, function (data) {
          $scope.counList = data.data;
        }, function () { })
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

    }]);

  return app;
}