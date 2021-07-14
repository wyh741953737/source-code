export function importIncompleteFactory(angular) {
  const app = angular.module('import-incomplete.module', ['service']);

  app.controller('import-incomplete.ctrl', ['$scope', 'dsp', function ($scope, dsp) {
    dsp.domainData().then((res) => {
      $scope.iscj = res.iscj;
      $scope.websiteName = $scope.iscj == '1' ? 'CJ':(res.websiteName || 'CJ');
    })
    const bs = new Base64();
    //给更多搜索添加点击显示隐藏的动画
    $('#ditect-searchmore').click(function () {
      $('#ditect-moresearch').toggle(300);
      $('#toggle-logo1').toggleClass('.glyphicon glyphicon-triangle-top');
      setTimeout(function () {
        console.log($('#ditect-moresearch').height())
        if ($('#toggle-logo1').hasClass('glyphicon-triangle-top')) {
          console.log('显示搜索')
          $('.direct-right').css({
            'min-height': $(window).height() * 1 + $('#ditect-moresearch').height() + 10 + 'px'
          });
        } else {
          console.log('隐藏搜索')
          $('.direct-right').css({
            'min-height': $(window).height() * 1 + 'px'
          });
        }
      }, 400)
    });
    $scope.dataFound = true;
    dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
    $scope.navList = [
      {name:'Process Required',href:"#/direct-orders"},
      {name:'Cart',href:"#/imp-cart"},
      {name:'Incomplete Orders',href:"#/imp-incomp",show:true},
      {name:'Canceled',href:"#/imp-cancel"},
      {name:'Search All',href:"#/search-all"},
      {name:'Store Orders',href:"#/AuthorizeOrder"},
    ]
    $('.direct-leftbara').click(function () {
      $('.direct-leftbara').css('background-image', '');
      $(this).css('background-image', 'linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
    })

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
    //鼠标移入移除 显示商品
    //点击事件
    $('.orders-table').on('click', '.order-detail', function (event) {
      if ($(event.target).hasClass('zcheckbox')) {
        return;
      }
      if ($(this).hasClass('order-click-active')) {
        $(this).next().hide();
        $(this).removeClass('order-click-active');
      } else {
        $(this).next().show();
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
    $scope.pageSize = '100';
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
      tjcs.data.status = '1';//请求的订单状态
      tjcs.data.page = $scope.pageNum - 0;//请求的第几页
      tjcs.data.limit = $scope.pageSize - 0;;//每页限制的订单条数
      tjcs.data.canhandler = 'n';
      tjcs.data.orderNumber = searchinpVal;
      tjcs.data.storeOrderDateBegin = yStoresTime;//店铺开始时间
      tjcs.data.storeOrderDateEnd = yStoreeTime;//店铺结束时间
      tjcs.data.storeProductName = yStoreName;//店铺商品名称
      tjcs.data.cjProductName = cjStoreName;//cj商品名称
      tjcs.data.buyerName = berName;//名字
      tjcs.data.orderType = ordType;//订单类型
      var cjsTime = $('#cj-stime').val();
      var cjeTime = $('#cj-etime').val();
      tjcs.data.cjOrderDateBegin = cjsTime;
      tjcs.data.cjOrderDateEnd = cjeTime;
      if (!$scope.storeName) {
        tjcs.data.storeNumber = '';
      } else {
        tjcs.data.storeNumber = $scope.storeName;
      }
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
    $("#cj-stime").val(aDate);   //关键语句

    
    $scope.countNumber = '';//Ò»¹²¶àÉÙÌõ¶©µ¥
    $scope.list = '';//¶©µ¥ºÍ²úÆ·
    $scope.productList = '';//²úÆ·µÄÁÐ±íÊý¾Ý
    $scope.storeAllMoney = '';//¶©µ¥µÄ×Ü½ð¶î

    $scope.flag = false;
    function getList () {
      $scope.ordersList = [];
      $scope.checkAll=false;
      dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0)
      var orData = {};
      tjFun(orData)
      orData.data = JSON.stringify(orData.data)
      console.log(orData.data)
      dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)
      function dclsFun(data) {
        //让全选按钮置为非选中状态
        var list1 = data.data.result;

        $scope.list = JSON.parse(list1);
        $scope.ordersList = $scope.list.ordersList;
        $scope.shops = $scope.list.shops; //店铺的数组
        delShopFun($scope.shops)
        var excelShop = {
          id: 'excel',
          name:'Excel',
          rNAME:'Excel'
        };
        $scope.shops.push(excelShop)
        $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
        if ($scope.pcountN > 0) {
          dsp.removeNodataPic($('.orders-list'))
          dsp.closeLoadPercent($('.orders-list'))
        } else {
          addNotSjFun()
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
    getList()
    $scope.$on('pagedata-fa', function (d, data) {
      console.log(data)
      $scope.pageNum = data.pageNum;
      $scope.pageSize = data.pageSize;
      getList(dsp, $scope);
    });
    function delShopFun(shopArr) {
      if (!shopArr) {
        return
      }
      /**店铺列表名字展示改成 店铺名+店铺类型+国家、增加国家全写参数、增加国家缩写参数 start */
      shopArr.forEach(e => {
        // 国家缩写转换全写。ThemeId:shopee;MarketplaceUrl:lazada
        e.countryfullName = replaceCountry(e.type == 'shopee' ? e.ThemeId : e.type == 'Lazada' ? e.MarketplaceUrl : '').fullName;
        // 店铺名+店铺类型+国家
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
    function getCheckData(){
      $scope.checkIds = [];
      $scope.checkList = $scope.ordersList.filter(item=>{
        if(item.check) {
          $scope.checkIds.push(item.order.ID)
          return item
        };
      })
    }
    //是否保持订单
    $scope.removeFlag = false;
    $scope.proceTcFlag = false;
    $scope.addProceFun = function () {
      getCheckData();
      let ids = [];
      $scope.noKeeped = $scope.checkList.filter(item => item.order.operateover!='y')
      $scope.keepedNum = $scope.checkList.length - $scope.noKeeped.length;
      $scope.noKeeped.forEach(item=>{
        ids.push(item.order.ID);
      })
      $scope.noKeepedId = ids.toString();
      if ($scope.checkList.length <= 0) return layer.msg('Please select order(s) first!');
      $scope.proceTcFlag = true;
    }
    let isKeepFlag = false;
    $scope.keepSureFun = function () {
      if (isKeepFlag) {
        return;
      }
      isKeepFlag = true;
      layer.load(2)
      $scope.keepFlag = false;
      let queryData = {
        orderNums:$scope.noKeepedId,
        type:$scope.unConnectType
      };
      dsp.postFun('order/order/regenerateOrder', JSON.stringify(queryData), function (data) {
        isKeepFlag = false;
        layer.closeAll('loading')
        if (data.status == 200) {
          var resArr = data.data.result;
          var resSucCount = 0, resErrorCount = 0, errorMessage;
          if (resArr && JSON.stringify(resArr) != '[]') {
            for (var i = 0, len = resArr.length; i < len; i++) {
              if (resArr[i].result) {
                resSucCount++;
              } else {
                resErrorCount++;
                errorMessage = resArr[i].message[0];
              }
            }

            if (resSucCount > 0 && resErrorCount < 1) {
              layer.msg('Reprocessed Successfully')
              resSucFreshFun()
            } else {
              if (resSucCount > 0) {
                resSucFreshFun()
                layer.msg(errorMessage, { time: 3000 })
              } else {
                errorMessage = resArr[0].message[0]
                layer.closeAll("loading")
                layer.msg(errorMessage, { time: 3000 })
              }
            }
          } else {
            layer.msg('Reprocess error')
            layer.closeAll("loading")
          }
        }
      }, function () {
        isKeepFlag = false;
        dsp.cjMesFun(1);
        layer.closeAll('loading')
      })
    }

    //删除订单的取消 确定
    $scope.removeQxFun = function () {
      $scope.removeFlag = false;
    }
    function resSucFreshFun() {
      $scope.pageNum = 1;
      getList()
    }
    let isSureFlag = false;
    $scope.removeSureFun = function () {
      if (isSureFlag) {
        return;
      }
      isSureFlag = true;
      layer.load(2)
      $scope.removeFlag = false;
      let queryData = {
        orderNums:$scope.checkIds.toString(),
        type:0
      };
      dsp.postFun('order/order/regenerateOrder', JSON.stringify(queryData), function (data) {
        isSureFlag = false;
        layer.closeAll('loading')
        if (data.status == 200) {
          var resArr = data.data.result;
          var resSucCount = 0, resErrorCount = 0, errorMessage;
          if (resArr && JSON.stringify(resArr) != '[]') {
            for (var i = 0, len = resArr.length; i < len; i++) {
              if (resArr[i].result) {
                resSucCount++;
              } else {
                resErrorCount++;
                errorMessage = resArr[i].message[0];
                // console.log(errorMessage)
              }
            }

            if (resSucCount > 0 && resErrorCount < 1) {
              layer.msg('Reprocessed Successfullys')
              resSucFreshFun()
            } else {
              if (resSucCount > 0) {
                resSucFreshFun()
                layer.msg(errorMessage, { time: 3000 })
              } else {
                errorMessage = resArr[0].message[0]
                layer.closeAll("loading")
                layer.msg(errorMessage, { time: 3000 })
              }
            }
          } else {
            layer.msg('Reprocess error')
            layer.closeAll("loading")
          }

        }
      }, function () {
        isSureFlag = false;
        layer.closeAll('loading')
        dsp.closeLoadPercent($('.orders-list'))
        dsp.cjMesFun(1);
      })
    }
    //重新拉取订单的倒计时
    var progressLineNum = 0;
    var progressStu = '1';

    function testFun() {
      if ((new Date().getTime() - localStorage.getItem('bianliangtime')) / 1000 < 5) {
        setTimeout(function () {
          testFun();
        }, 5000);
        return;
      }
      localStorage.setItem('bianliangtime', new Date().getTime());
      var queryData = localStorage.getItem('queryData')
      var link = location.href;
      console.log(link)
      // setTimeout(function () {
      dsp.postFun('app/order/getOperationOrderStatus', queryData, function (data) {
        console.log(data)
        progressLineNum = localStorage.getItem("progressLineNum") - 0;
        progressLineNum++;
        progressStu = data.data.result;
        switch (progressStu) {
          case '1':
            localStorage.setItem("progressLineNum", progressLineNum);
            if (progressLineNum > 32) {
              $('.progress-bar').css('width', 33 + '%');
              $('.progress-bar').text(33 + '%')
            } else {
              $('.progress-bar').css('width', progressLineNum + '%');
              $('.progress-bar').text(progressLineNum + '%')
            }
            break;
          case '2':
            if (progressLineNum < 33) {
              progressLineNum = 33;
            }
            localStorage.setItem("progressLineNum", progressLineNum);
            if (progressLineNum > 66) {
              $('.progress-bar').css('width', 66 + '%');
              $('.progress-bar').text(66 + '%')
            } else {
              $('.progress-bar').css('width', progressLineNum + '%');
              $('.progress-bar').text(progressLineNum + '%')
            }
            break;
          case '3':
            if (progressLineNum < 66) {
              progressLineNum = 66;
            }
            localStorage.setItem("progressLineNum", progressLineNum);
            if (progressLineNum > 99) {
              $('.progress-bar').css('width', 99 + '%');
              $('.progress-bar').text(99 + '%')
            } else {
              $('.progress-bar').css('width', progressLineNum + '%');
              $('.progress-bar').text(progressLineNum + '%')
            }
            break;
          case '0':
            $scope.isupdateFlag = false;
            localStorage.removeItem('updateTime')
            if (localStorage.getItem("zhixing0") == undefined) {
              localStorage.setItem('zhixing0', "0");
            } else {
              return;
            }
            $scope.pageNum = 1;
            getList()
            break;
        }
        if (progressStu != "0") {
          testFun();
        }
      }, function (data) {
        console.log(data)
      })
    }
    if (localStorage.getItem('updateTime')) {
      $scope.isupdateFlag = true;
      testFun();
    }
    //重新拉取订单
    $scope.cxlqordFun = function () {
      getCheckData()
      layer.load();
      let selectNum = $scope.checkList.length;//存储被选中的条数
      let ordersid = $scope.checkIds.toString();//存储订单的id
      if (selectNum <= 0) return layer.msg('Please select order(s) first!');
      layer.open({
        content: `<p>Are you sure to Update Orders?</p><p>It will take around few miuntes to make this happen.</p>
        <p>Order Quantity:  <span id='awa-dcl-num'></span></p>`,
        area: ['480px', '260px'],
        closeBtn: 0,
        title: "Update Orders",
        btn: ['Cancel', 'Confirm'],
        success: function (layero, index) {
          $(layero).find('#awa-dcl-num').html(selectNum);
        },
        yes: function (index, layero) {
          layer.closeAll("loading")
          layer.close(index);
        },
        btn2: function (index, layero) {
          let queryData = {
            orderNums: ordersid
          };
          dsp.postFun('order/order/regenerateOrderAll', JSON.stringify(queryData), function (data) {
            dsp.closeLoad();
            if (data.data.statusCode == "200") {
              let result = data.data.result;
              $scope.showUpdate=true;
              $scope.updataInfo = {
                succ:result.successCount,
                fail:result.unModifyCount
              }
            } else {
              $scope.isupdateFlag = false;
              layer.msg(data.data.message)
            }

          }, function (data) {
            console.log(data)
          })
        }
      });
    }

    $scope.modefyAddFun = function (item, index) {
      $scope.addModefyFlag = true;
      $scope.addItemId = item.ID;
      $scope.addItemIndex = index;
      $scope.address1 = item.SHIPPING_ADDRESS;
      $scope.address2 = item.shippingAddress2;
      $scope.addCity = item.CITY;
      $scope.addProvince = item.PROVINCE;
      $scope.addZip = item.ZIP;
      $scope.addPhone = item.PHONE;
      $scope.addName = item.CUSTOMER_NAME;
    }
    $scope.sureModeFun = function () {
      dsp.load()
      let addUpdata = {
        id: $scope.addItemId,
        shipping_address: $scope.address1,
        shipping_address2: $scope.address2,
        city: $scope.addCity,
        province: $scope.addProvince,
        zip: $scope.addZip,
        phone: $scope.addPhone,
        name: $scope.addName
      };
      dsp.postFun('app/order/updateFiled', JSON.stringify(addUpdata), function (data) {
        console.log(data)
        dsp.closeLoad();
        if (data.data.result > 0) {
          $scope.addModefyFlag = false;
          layer.msg('Modified Successfully')
          resSucFreshFun()
        } else {
          layer.msg('Modify failed')
        }
      }, function (data) {
        dsp.closeLoad();
        console.log(data)
      })
    }
    $scope.checkPhone = function (phone) {
      phone = phone.replace(/[^\d\+\-\(\)]/g, "");
      $scope.addPhone = phone;
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

    //按店铺搜索订单
    $scope.storeChangeFun = function () {
      $scope.pageNum = 1;
      getList()
    }

    //高级搜索部分的查询		
    $('#tj-search-btn').click(function () {
      $scope.pageNum = 1;
      getList()
    })

    //批量删除
    $scope.bulkCancelFun = function () {
      getCheckData();
      if ($scope.checkList.length <= 0) {
        dsp.closeLoadPercent($('.orders-list'))
        layer.msg('Please select order(s) first!')
        return;
      } else {
        $scope.bulkDelFlag = true;
      }
    }
    $scope.bulkDelFun = function () {
      $scope.bulkDelFlag = false;
    }
    $scope.bulkSureDelFun = function () {
      $scope.bulkDelFlag = false;
      // $scope.ordersList = [];
      // dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0)
      layer.load(2)
      let cancelData = {
        orderNums: $scope.checkIds.toString(),
        type: 1
      };
      dsp.postFun('app/order/deleteOrder', JSON.stringify(cancelData), function (data) {
        console.log(data)
        layer.closeAll("loading")
        if (data.data.result == true) {
          //让全选按钮置为非选中状态
          $scope.pageNum = 1;
          getList()
          layer.msg('Delete Success');
        } else {
          // dsp.closeLoadPercent($('.orders-list'))
          layer.msg('Delete Error');
        }
      }, function (data) {
        layer.closeAll("loading")
        // dsp.closeLoadPercent($('.orders-list'))
        console.log(data)
      })
    }
    //高级搜索里面的按订单类型搜索
    $('.type-sel').change(function () {
      $scope.pageNum = 1;
      getList()
    })
    //用订单号搜索 orderNumber  
    $('.ord-search-inp').keypress(function (Event) {
      if (Event.keyCode == 13) {
        $scope.ordnumSearch();
      }
    })
    $scope.ordnumSearch = function () {
      $scope.pageNum = 1;
      getList()
    }
    $scope.connectFun = function (item) {
      var spName = bs.encode(item.SHIPPING_NAME);
      window.open('#/products-connection/pending-connection/' + spName);
    }
    $scope.sourceFun = function (item, order) {
      console.log(item)
      var spName = bs.encode(item.SHIPPING_NAME);
      var storeId = order.STORE_NUMBER;
      window.open('#/add-sourcing/' + spName + '/' + storeId +  '//', '_blank')
    }
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
    function addNotSjFun() {
      dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'},true)
      $('.deal-orders').css('min-height', $('.cj-nodata-pic').height() + 50)
    }
    //cj开始日期搜索
    $("#cj-stime").click(function () {
      var cjendtime = $("#cj-stime").val();
      var interval = setInterval(function () {
        var endtime2 = $("#cj-stime").val();
        if (endtime2 != cjendtime) {
          $scope.ordersList = [];
          dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0)
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
          $scope.ordersList = [];
          dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0)
          clearInterval(interval);

          $scope.pageNum = 1;
          getList()
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
      layer.load(2);
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
    /* 全选操作 */
    $scope.checkAllFun = ()=>{
      $scope.ordersList.forEach(item=>item.check=$scope.checkAll);
    }
    /* 单选操作 */
    $scope.checkFun = (e)=>{
      getCheckData();
      $scope.checkAll = $scope.checkList.length==$scope.ordersList.length;
    }
    $scope.stopProp = (e)=>{
      e.stopPropagation();
    }
    $scope.keepUnconnectFun = ()=>{
      $scope.proceTcFlag=false;
      $scope.keepFlag=true;
      $scope.unConnectType=1;
    }
    $scope.removeUnconnectFun = ()=>{
      $scope.proceTcFlag=false;
      $scope.keepFlag=true;
      $scope.unConnectType=0;
    }
  }]);

  return app;
}
