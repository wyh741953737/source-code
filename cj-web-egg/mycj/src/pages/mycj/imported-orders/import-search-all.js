export function importSearchAllFactory(angular) {
  const app = angular.module('import-search-all.module', ['service']);

  app.directive('repeatFinish', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, elem, attr) {
        //当前循环至最后一个  
        if (scope.$last === true) {
          $timeout(function () {
            //向父控制器传递事件消息  
            scope.$emit('repeatFinishCallback');
          }, 100);
        }
      }
    }
  });
  app.controller('import-search-all.ctrl', ['$scope', 'dsp', '$timeout',
    function ($scope, dsp, $timeout) {
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
      //客户第一次进入订单模块的界面
      $scope.isordFlag = false;
      // var $navLis = $('.header-nav li');
      $scope.$on('repeatFinishCallback', function () {
        pselwlFun();//检测是否选择了物流
        $('#z-dcl-ord #dcl-note').attr('disabled', 'true');
      });
      $('.directorders-wrap').css({
        'min-height': $(window).height() * 1 + 'px'
      });
      $('.direct-right').css({
        'min-height': $(window).height() * 1 + 'px'
      });

      //留言功能
      $scope.editnoteFlag = false;
      var changenoteid = '';
      var $noteObj = {};
      var $hidenoteObj = {};
      $scope.editNote = function (item, $event) {
        // $event.stopPropagation();
        $scope.editnoteFlag = true;
        changenoteid = item.ID;
        var textstr = '<textarea type="text" id="dcl-note"></textarea>'
        if ((item.NOTE_ATTRIBUTES == '' && $($event.target).parent().parent().find('#dcl-note').length == 0) || (item.NOTE_ATTRIBUTES == null && $($event.target).parent().parent().find('#dcl-note').length == 0)) {
          $($event.target).parent().parent().prepend(textstr);
        }
        $hidenoteObj = $($event.target).parent().siblings('.hide-note-p');//获取隐藏域的笔记内容
        $('.editmess-text').val($hidenoteObj.text());//给留言框赋当前值
        $noteObj = $($event.target).parent().siblings('#dcl-note');//获取当前的留言框
        // return false;
      }
      //留言的取消按钮
      $scope.cancelmessFun = function () {
        $scope.editnoteFlag = false;
        $('.editmess-text').val('');
        $noteObj.attr('disabled', 'true');
      }
      //确定留言功能
      $scope.entermessFun = function () {
        var noteText = $.trim($('.editmess-text').val());
        $hidenoteObj.text(noteText);//给隐藏域里笔记内容赋值
        var noteData = {};
        noteData.orderNum = changenoteid;
        noteData.note = noteText;
        dsp.postFun('app/order/upOrderNote', JSON.stringify(noteData), function (data) {
          $scope.editnoteFlag = false;//关闭留言弹窗
          $noteObj.removeAttr('disabled')
          $noteObj.val(noteText);//给修改的留言赋值
          $noteObj.attr('disabled', 'true');
        }, function (data) {
        })
      }
      $scope.modefyAddFun = function (item, index) {
        $scope.addModefyFlag = true;
        $scope.addItemId = item.ID;
        $scope.addItemIndex = index;
        $scope.address1 = item.SHIPPING_ADDRESS;
        $scope.address2 = item.shippingAddress2;
        $scope.addCity = item.CITY;
        $scope.addPhone = item.PHONE;
        $scope.addProvince = item.PROVINCE;
        $scope.addZip = item.ZIP;
      }
      $scope.sureModeFun = function () {
        console.log($scope.addItemIndex)
        var addUpdata = {};
        addUpdata.id = $scope.addItemId;
        addUpdata.shipping_address = $scope.address1;
        addUpdata.shipping_address2 = $scope.address2;
        addUpdata.city = $scope.addCity;
        addUpdata.phone = $scope.addPhone;
        addUpdata.province = $scope.addProvince;
        addUpdata.zip = $scope.addZip;
        layer.load(2);
        dsp.postFun('app/order/updateFiled', JSON.stringify(addUpdata), function (data) {
          console.log(data)
          if (data.data.result > 0) {
            $scope.addModefyFlag = false;
            layer.msg('Modify success')
            $scope.ordersList[$scope.addItemIndex].order.SHIPPING_ADDRESS = $scope.address1;
            $scope.ordersList[$scope.addItemIndex].order.shippingAddress2 = $scope.address2;
            $scope.ordersList[$scope.addItemIndex].order.CITY = $scope.addCity;
            $scope.ordersList[$scope.addItemIndex].order.PROVINCE = $scope.addProvince;
            $scope.ordersList[$scope.addItemIndex].order.ZIP = $scope.addZip;
          } else {
            layer.msg('Modify failed')
          }
          layer.closeAll();
        }, function (data) {
          layer.closeAll();
        })
      }

      $scope.pageNum = 1;
      $scope.pageSize = '50';
      $scope.countNumber = '';
      $scope.list = '';
      $scope.orderList = '';
      $scope.productList = '';
      $scope.flag = false;
      function getTypeNum(){
        var orData = {};
        orData.data = {};
        orData.data.status = '9';//请求的订单状态
        orData.data.page = $scope.pageNum - 0;
        orData.data.limit = 1;
        orData.data = JSON.stringify(orData.data)
        console.log(orData.data)
        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun)
        function dclsFun(data) {
          console.log(data.data)
          var list1 = data.data.result;
          list1 = JSON.parse(list1);
          $scope.ordstatusNum = list1.allOrderCount2;//各种状态订单的数量
          numFun();//调用给订单赋值的函数
        }
      }
      getTypeNum()
      function getList() {
        var seaBulkNum = $('.bulksearch-text').val();
        if (seaBulkNum.indexOf(',')) {
          seaBulkNum = seaBulkNum.replace(/,/g, '');
        }
        var searchIds = seaBulkNum.replace(/\n/g, ',');
        if (searchIds.charAt(searchIds.length - 1) != ',') {
          searchIds += ','
        }
        $scope.ordersList = [];
        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
        var orData = {};
        orData.data = {};
        orData.data.status = '9';//请求的订单状态
        orData.data.page = $scope.pageNum - 0;
        orData.data.limit = $scope.pageSize - 0;
        orData.data.orderNumber = searchIds;
        if (!$scope.storeName) {
          orData.data.storeNumber = '';
        } else {
          orData.data.storeNumber = $scope.storeName;
        }
        orData.data = JSON.stringify(orData.data)
        console.log(orData.data)
        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)
        function dclsFun(data) {
          //让待处理全选按钮置为非选中状态
          $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          console.log(data.data)
          var list1 = data.data.result;
          $scope.list = data.data.result;
          $scope.list = JSON.parse(list1);
          $scope.ordersList = $scope.list.ordersList;
          $scope.shops = $scope.list.shops; //店铺的数组
          console.log($scope.ordersList)
          delShopFun($scope.shops)
          var excelShop = {
            id: 'excel',
            name:'Excel',
            rNAME:'Excel'
          };
          $scope.shops.push(excelShop)
          $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
          if ($scope.pcountN > 0) {
            dsp.removeNodataPic($('.orders-list'));
            dsp.closeLoadPercent($('.orders-list'));
            $scope.isActiveBtn = true;
          } else {
            dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'},true);
            dsp.closeLoadPercent($('.orders-list'));
            $scope.isActiveBtn = false;
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
          layer.closeAll("loading")
          dsp.closeLoadPercent($('.orders-list'))
          dsp.cjMesFun(1);
        }
      }
      $scope.$on('pagedata-fa', function (d, data) {
        console.log(data)
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getList();
      });
      function delShopFun(shopArr) {
        if (!shopArr) {
          return
        }
        /**店铺列表名字展示改成 店铺名+店铺类型+国家、增加国家全写参数、增加国家缩写参数 start */
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
        if ($scope.impprocessNum == 0 && $scope.cartNum == 0 && $scope.incompleteNum == 0 && $scope.cancelNum == 0 && $scope.refundNum == 0) {
          $scope.dataFound = true;//隐藏没有数据的图片
          $scope.isordFlag = true;//显示关联搜索的内容
        } else {
          $scope.isordFlag = false;//隐藏关联搜索的内容
        }
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
      $scope.ordLogFun = function(id){
        location.href = '#/order-log/'+id
      }
      //批量修改物流 获取国家列表
      dsp.postFun('app/order/getOrderCountry', null, function (data) {
        $scope.counList = data.data;
      }, function (data) {
        console.log(data)
      })
      //获取物流方式
      dsp.postFun('app/erplogistics/getLogisticType', null, function (data) {
        $scope.bulkWlList = data.data;
      }, function (data) {
        console.log(data)
      })
      $scope.isChangeFlag = false;
      $scope.nologistCs = 'y';//是否无物流 查询没有物流的订单
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
        tjcs.data.status = '9';//请求的订单状态
        tjcs.data.page = 1;//请求的第几页   10*1-10Ò³Âë
        tjcs.data.limit = showList;//每页限制的订单条数
        // tjcs.data.orderNumber = searchinpVal;
        tjcs.data.storeOrderDateBegin = yStoresTime;
        tjcs.data.cjOrderDateBegin = cjsTime;
        tjcs.data.storeOrderDateEnd = yStoreeTime;
        tjcs.data.cjOrderDateEnd = cjeTime;
        tjcs.data.storeProductName = yStoreName;
        tjcs.data.cjProductName = cjStoreName;
        tjcs.data.buyerName = berName;
        tjcs.data.orderType = ordType;
        tjcs.data.storeNumber = $scope.storeName;
      }
      //下载面单
      $scope.loadPdfFun = function (item) {
        $scope.downLoadPdfFlag = true;
        $scope.itemId = item.ID;
        $scope.wlName = item.LOGISTIC_NAME;
      }
      $scope.sureDownLoadFun = function () {
        layer.load(2)
        $scope.downLoadPdfFlag = false;
        var upJson = {};
        let postUrl;
        console.log($scope.wlName)
        if ($scope.wlName == 'CJPacket') {
          upJson.platForm = 'CJ';
          upJson.orderId = $scope.itemId;
          postUrl = 'getCJPacketExpressSheet.json';
        } else {
          upJson.ids = $scope.itemId;
          upJson.loginName = "CJAPP";
          upJson.uspsType = "1";
          postUrl = 'getExpressSheet.json';
        }
        dsp.postFun2(postUrl, JSON.stringify(upJson), function (data) {
          console.log(data)
          layer.closeAll('loading')
          var mdLink = data.data;
          console.log(mdLink)
          if ($scope.wlName == 'CJPacket') {
            if (mdLink && JSON.stringify(mdLink) != '[]') {
              mdLink[0].indexOf('http') == -1 ? mdLink[0] = 'http://' + mdLink[0] : mdLink[0]
              $scope.mdLink = mdLink[0];
              $scope.mdLinkTkFlag = true;
            } else {
              layer.msg('No shipping labels found.')
            }
          } else {
            if (mdLink && JSON.stringify(mdLink) != '[]' && mdLink[0].indexOf('miandan') != -1) {
              mdLink[0].indexOf('http') == -1 ? mdLink[0] = 'http://' + mdLink[0] : mdLink[0]
              $scope.mdLink = mdLink[0];
              $scope.mdLinkTkFlag = true;
            } else {
              layer.msg('No shipping labels found.')
            }
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
        $scope.itemStatus = item.STATUS;
        $scope.itemMoney = item.AMOUNT;
        $scope.videoId = item.ID;
      }
      //点击已开启的纠纷跳到纠纷页
      $scope.afterLinkFun = function (item) {
        var jfId = item.ID;
        window.open('#/after-sale//' + jfId)
      }
      $scope.afterClosedFun = function (item) {
        var jfId = item.ID;
        window.open('#/after-sale/3/' + jfId)
      }
      $scope.closeJfFun = function () {
        $scope.disputeFlag = false;
        $scope.imgArr = [];
        $('.sel-jfres').val('');
        $scope.disTextareaVal = '';
        $('.dispute-tip').hide();
      }
      var selVal = '';
      //纠纷原因
      $('.sel-jfres').change(function () {
        console.log($(this).val())
        selVal = $(this).val();
        if (selVal == 'Products Short' || selVal == 'Defective Products' || selVal == 'Received Incorrect Products' || selVal == 'Order Not Received' || selVal == 'Order Returned') {
          $('.dispute-tip').show();
        } else {
          $('.dispute-tip').hide();
        }
      })
      //期望处理的结果
      var expectResult = '';
      $('.sel-wantway').change(function () {
        console.log($(this).val())
        expectResult = $(this).val();
      })
      $scope.sureJfFun = function () {
        var listArr = [];
        var listObj = {};//存储一条消息内容
        listObj.userName = '0';//客户
        listObj.image = $scope.imgArr;
        listObj.videoUrl = $scope.videoArr;
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
        upData.orderMoney = $scope.itemMoney;
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

      }
      function openJfFun1(upData) {
        dsp.postFun('app/dispute/openDispute', JSON.stringify(upData), function (data) {
          console.log(data)
          layer.closeAll('loading')
          if (data.data.result == true) {
            $scope.disputeFlag = false;
            layer.msg('Open dispute successfully')
            //把该条订单设置成
            $scope.imgArr = [];
            $scope.videoArr = [];
            $('.sel-jfres').val('');
            $scope.disTextareaVal = '';
            $scope.ordersList[$scope.itemIndex].disputeId = '1';
            $('.dispute-tip').hide();
          } else {
            layer.msg('Open dispute unsuccessfully')
          }
        }, errFun)
      }
      function errFun(data) {
        console.log(data)
        layer.closeAll("loading")
        dsp.closeLoadPercent($('.orders-list'))
        dsp.cjMesFun(1);
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
      $scope.imgArr = [];       // 读取本地地址----速度快
      $scope.imgOssArr = [];  // 需要传给后台的线上地址
      $scope.videoArr = [];   // 需要传给后台的视频id
      let loadList = {
        img: ['png', 'jpg', 'jpeg', 'gif', "PNG", "JPG", "JPEG", "GIF"],
        video: ['mp4', 'avi', 'wmv', 'mpg', 'mov', 'flv', "MP4", "AVI", "WMV", "MPG", "MOV", "FLV"]
      };
      // 上传图片
      $scope.upLoadImg4 = function (files) {
        console.log(files)
        let validFileArr = [];
        if (files) {
          let fileType, fileName;
          for (let i = 0, len = files.length; i < len; i++) {
            fileName = files[i].name;
            fileType = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase();
            console.log(fileName, fileType)
            if (loadList.img.indexOf(fileType) != -1) {
              validFileArr.push(files[i])
            }
          }
          console.log(validFileArr)
        }
        if (validFileArr.length < 1 && files.length > 0) {
          layer.msg('Images format error')
          return
        }
        console.log(validFileArr)
        // if (loadList.img.indexOf(fileName) == -1) {
        // 	layer.msg('Images format error');
        // 	return;
        // }
        if ($scope.imgArr.length >= 8) {
          layer.msg('Upload eight images at most');
          return;
        }
        dsp.ossUploadFile(validFileArr, function (data) {
          console.log(data)
          if (data.code == 0) {
            layer.msg('Images Upload Failed');
            return;
          }
          // 上传完整提示
          // if (data.code == 2) {
          //   layer.msg('Images Upload Incomplete');
          // }
          let result = data.succssLinks;
          if (result && result.length > 0) {
            for (let j = 0; j < result.length; j++) {
              let srcList = result[j].split('.');
              let fileName = srcList[srcList.length - 1].toLowerCase();
              if (fileName == 'png' || fileName == 'jpg' || fileName == 'jpeg' || fileName == 'gif') {
                $scope.imgArr.push(data.succssLinks[j]);
                // $scope.imgOssArr.push(data.succssLinks[0]);
              }
            }
          } else {
            layer.msg('Images Upload Failed');
          }

          if ($scope.imgArr && $scope.imgArr.length >= 8) {
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
        if ($scope.imgArr.length < 8) {
          $scope.hideUpImgFlag = false;
        }
      };

      // 上传视频
      $scope.UploadVideoList = [];
      $scope.videoId = [];
      $scope.upLoadImg5 = function (files) {
        let file = files[0];
        let fileName = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
        if (loadList.video.indexOf(fileName) == -1) {
          layer.msg('Video format error');
          return;
        }
        if ($scope.videoArr.length == 4) {
          layer.msg('Upload four video at most');
          return;
        }
        if (file.size / 1024 / 1024 > 20) {
          layer.msg('Video file size limited to 20M');
          return;
        }
        dsp.load(2);
        let uploader = cjUtils.createUploader({
          url: 'https://tools.cjdropshipping.com/tool/downLoad/token',
          type: 1,
          addFileSuccessFn: ({ uploadInfo }) => {
            console.log('视频添加成功 =>', uploadInfo)
          },
          onUploadProgress: ({ uploadInfo, totalSize, progress }) => {
            console.log('上传进度 uploadInfo =>', uploadInfo, 'toalSize =>', totalSize, 'progress =>', progress)
            let progressPercent = Math.ceil(progress * 100);
            console.log('进度 =>', progressPercent)
          },
          success: ({ uploadInfo }) => {
            console.log('上传成功 =>', uploadInfo);
            $scope.videoArr.push({ vid: uploadInfo.videoId });
            videoPlay({ vid: uploadInfo.videoId });
            if ($scope.videoArr && $scope.videoArr.length >= 4) {
              $scope.hideUpVideoFlag = true;
            }
            $('.upload_file').val('')
          },
          error: ({ uploadInfo, code, message }) => {
            layer.closeAll("loading");
            console.log("上传失败" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
          },
          onUploadEnd: ({ uploadInfo }) => {
            console.log("全部上传结束 =>", uploadInfo);
          }
        });
        /** 添加视频 **/
        uploader.addFile(file, null, null, null, '{"Vod":{}}');  //file就是视频文件
        /** 开始上传 **/
        uploader.startUpload();
      };
      // 删除上传的视频
      $scope.delVideo = (index) => {
        $scope.videoArr.splice(index, 1);
        //   $scope.videoOssArr.splice(index, 1);
        if ($scope.videoArr.length < 4) {
          $scope.hideUpVideoFlag = false;
        }
      };

      // 视频创建播放
      function videoPlay() {
        let len = $scope.videoArr.length;
        let id = 'J_prismPlayer' + len;
        let vid = $scope.videoArr[len - 1].vid;
        $timeout(() => {
          cjUtils.getVideoInfo({
            eleId: id,
            videoId: vid,
            configuration: {
              width: '300px',     //视频宽度
              height: '160px',     //视频高度
            },
            hasWater: false,
            callback: player => {
              player.on('ready', () => {
                layer.closeAll('loading')
              })
            }
          })

        }, 7000)
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
      $scope.navList = [
        {name:'Process Required',href:"#/direct-orders"},
        {name:'Cart',href:"#/imp-cart"},
        {name:'Incomplete Orders',href:"#/imp-incomp"},
        {name:'Canceled',href:"#/imp-cancel"},
        {name:'Search All',href:"#/search-all",show:true},
        {name:'Store Orders',href:"#/AuthorizeOrder"},
      ]

      $('.direct-leftbara').click(function () {
        $('.direct-leftbara').css('background-image', '');
        $(this).css('background-image', 'linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
      })
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
      //给被删除的订单添加弹框
      $scope.showdelFun = function (ev, index, item) {
        if (item.shopOrderStatus) {
          $('.dcl-ord-tbody').eq(index).find('.hasdel-con').show();
        }
      }
      $scope.hidedelFun = function (ev, index) {
        $('.dcl-ord-tbody').eq(index).find('.hasdel-con').hide();
        // console.log(index)
      }

      $scope.HasdeleteSureFun = function (index, item) {
        $scope.isdelhasFlag = true;
        $scope.hasIndex = index;
        $scope.hasItemId = item.ID;
      }
      $scope.suredHasFun = function () {
        layer.load(2)
        $scope.isdelhasFlag = false;
        var deleteData = {};
        deleteData.orderNums = $scope.hasItemId;
        deleteData.type = 2;
        console.log(JSON.stringify(deleteData))
        dsp.postFun('app/order/deleteOrder', JSON.stringify(deleteData), function (data) {
          console.log(data)
          layer.closeAll("loading")
          if (data.data.result == true) {
            $scope.ordersList.splice($scope.hasIndex, 1)
            layer.msg('Delete Success');
          } else {
            layer.closeAll("loading");
            layer.msg('Delete Error');
          }
        })
      }
      $scope.recoverFun = function (item, index) {
        console.log(item.ID, index)
        layer.load(2)
        dsp.postFun('app/order/correctionOfOrderStatus', {
          id: item.ID
        }, function (data) {
          console.log(data)
          layer.closeAll("loading")
          if (data.data.result > 0) {
            layer.msg('Recover Success')
            $scope.ordersList.splice(index, 1)
          } else {
            layer.msg('Recover Error')
          }
        }, function (data) {
          console.log(data)
          layer.closeAll("loading")
        })
      }
      //恢复订单
      $scope.keepOrdFun = function (index, item) {
        $scope.iskeephasFlag = true;
        $scope.hasIndex = index;
        $scope.hasItemId = item.ID;
      }
      $scope.surekeepHasFun = function () {
        layer.load(2)
        $scope.iskeephasFlag = false;
        var deleteData = {};
        deleteData.id = $scope.hasItemId;
        dsp.postFun('app/order/continueOrder', JSON.stringify(deleteData), function (data) {
          console.log(data)
          layer.closeAll("loading")
          if (data.data.result > 0) {
            $scope.ordersList[$scope.hasIndex].order.shopOrderStatus = '';
            layer.msg('Keep Success');
          } else {
            layer.closeAll("loading");
            layer.msg('Keep Error');
          }
        })
      }
      var ordRemark = '';//存储被拆分订单的属性
      var dclSecNum = 0;//存储待处理选中的订单数量
      //给待处理订单添加选中非选中状态

      $('#z-dcl-ord').on('click', '.zcheckbox', function (event) {
        // alert(111111)
        // console.log(event)
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
        } else if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
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
        var listNum = 0;
        // var isdelText = $('this').parent().parent().parent().siblings('.dcl-ord-tbody')
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          //$('#z-dcl-ord .zcheckbox').attr('src','static/image/direct-orders/multiple2.png');
          // dclSecNum = $('#z-dcl-ord .zcheckbox').length;
          $('#z-dcl-ord .zcheckbox').each(function () {//循环所有的订单
            console.log($(this).siblings('.isdel-instore').text())
            if (!$(this).siblings('.isdel-instore').text()) {
              $(this).attr('src', 'static/image/direct-orders/multiple2.png');
              listNum++;
            }
          })
          //$('#z-dcl-ord .zcheckbox').attr('src','static/image/direct-orders/multiple2.png');
          // dclSecNum = $('#z-dcl-ord .zcheckbox').length;
          dclSecNum = listNum;
        } else {

          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          $('#z-dcl-ord .zcheckbox').each(function () {//循环所有的订单
            console.log($(this).siblings('.isdel-instore').text())
            if (!$(this).siblings('.isdel-instore').text()) {
              $(this).attr('src', 'static/image/direct-orders/multiple1.png');
            }
          })
          dclSecNum = 0;
          // $('#z-dcl-ord .zcheckbox').attr('src','static/image/direct-orders/multiple1.png');
          // $('#z-dcl-ord .order-detail').each(function () {
          //    	if ($(this).attr('spbq')=='1') {
          //    		// alert($(this).children('.order-time').html())
          //    		$(this).children('.order-time').children('.zcheckbox').attr('src','static/image/direct-orders/multiple2.png');
          //    	}
          // })
          // dclSecNum = 0;
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
      //给DHL输入手机号
      var listIndex;//第几条订单
      $scope.inpPhoneFun = function (index, ev) {
        ev.stopPropagation();
        $(ev.target).hide();
        $(ev.target).siblings('.dhlsameclass').show();
        listIndex = index;
      }
      $scope.surePhoneFun = function (index, ev, item) {
        ev.stopPropagation();
        var evInpVal = '';
        console.log(evInpVal)
        evInpVal = $.trim($(ev.target).siblings('.inp-phoneNum').val());
        console.log(listIndex)
        if (evInpVal) {
          // $(ev.target).siblings('.phone-num').text(PHONE);
          // $scope.ordersList.order[listIndex].PHONE = evInpVal;
          dsp.postFun('app/order/updatePhone', {
            id: item.ID,
            phone: evInpVal
          }, function (data) {
            console.log(data)
            // console.log($scope.ordersList[listIndex])
            if (data.data.statusCode == "CODE_200") {
              $scope.ordersList[listIndex].order.PHONE = evInpVal;
            } else {
              layer.msg('Change the phone number to fail.')
            }
          }, function (data) {
            console.log(data)
          })
          $(ev.target).siblings('#lrPhoneBtn').show();
          $(ev.target).parent().find('.dhlsameclass').hide();
        } else {
          layer.msg('Please enter phone number')
        }
      }
      $scope.qxPhoneFun = function (ev) {
        ev.stopPropagation();
        $(ev.target).siblings('#lrPhoneBtn').show();
        $(ev.target).parent().find('.dhlsameclass').hide();
      }
      $('.input-dhlphone').on('keyup', function () {
        $(this).val($(this).val().replace(/[^\d\()-\s]/g, ''));
      });
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


      $scope.exportFun = function () {
        var selCount = 0;
        var exportIds = '';
        $("#z-dcl-ord .zcheckbox").each(function () {
          if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
            exportIds += $(this).parent().siblings('.order-num-td').children('.cus-ordtext').text() + ',';
            selCount++;
          }
        })
        console.log(exportIds)
        //if($scope.selCountNum<1){
        //	layer.msg('Please select order(s) first!')
        //	return;
        //}
        //$scope.bulkSeaFlag=true;
        if ($scope.isActiveBtn) {
          if (selCount < 1) {
            layer.msg('Please select order(s) first!')
            //return;
          } else {
            layer.load(2);
            var exportData = {};
            exportData.orderIds = exportIds;
            //console.log(exportData);
            dsp.postFun('app/order/exportCJByOrderId', JSON.stringify(exportData), function (data) {
              console.log(data)
              var href = data.data.href;
              console.log(href)
              layer.closeAll("loading")
              if (href.indexOf('https') >= 0) {
                $scope.dcflag = true;
                $scope.hrefsrc = href;
                console.log($scope.hrefsrc)
              } else {
                layer.msg('Export orders error')
              }
            }, function (data) {
              console.log(data)
              layer.closeAll("loading")
            });
          }

        } else {
          layer.msg('Please search Orders!');
          $scope.bulkSeaFlag = true;
        }
      }
      //关闭
      $scope.closeatc = function () {
        $scope.dcflag = false;
      }
      //按店铺搜索订单
      $scope.storeChangeFun = function () {
        $scope.pageNum = 1;
        getList()
      }

      //用订单号搜索 orderNumber
      $scope.bulkSeaFlag = true;
      $scope.showBulkSeaTk = function () {
        $scope.bulkSeaFlag = true;
      }
      $scope.closeBulkSeaTk = function () {
        $scope.bulkSeaFlag = false;
      }

      $('.bulksearch-text').bind('input propertychange', function () {
        var aa = 0;
        var textnunm = $('.bulksearch-text').val().split("\n");
        // $scope.searchArr = textnunm;
        console.log(textnunm)
        var textnunmLen = textnunm.length;
        console.log(textnunmLen)
        if (aa == textnunmLen) {
          console.log("aa");
        } else {
          aa = textnunmLen;
          $(".indexnum-ul>li").remove();
          $(".delete-ul>li").remove();
          for (var i = 0; i < aa; i++) {
            var li = '<li><span class="span-serial">' + (i + 1) + '</span></li>';
            var li2 = '<li><img class="remove-line-img" src="static/image/public-img/close-circle.png"></img></li>';
            $(".indexnum-ul").append(li);
            $(".delete-ul").append(li2);
          }
        }
      });
      $('.delete-ul').on('click', '.remove-line-img', function () {
        console.log($('.remove-line-img').index(this))
        var deleteIndex = $('.remove-line-img').index(this);
        var textnunm = $('.bulksearch-text').val().split("\n");
        console.log(textnunm)
        textnunm.splice(deleteIndex, 1)
        console.log(textnunm)
        var str = textnunm.join('\n')
        console.log(str)
        $('.bulksearch-text').val(str)

        var aa = 0;
        console.log(textnunm)
        var textnunmLen = textnunm.length;
        console.log(textnunmLen)
        if (aa == textnunmLen) {
          console.log("aa");
        } else {
          aa = textnunmLen;
          $(".indexnum-ul>li").remove();
          $(".delete-ul>li").remove();
          for (var i = 0; i < aa; i++) {
            var li = '<li><span class="span-serial">' + (i + 1) + '</span></li>';
            var li2 = '<li><img class="remove-line-img" src="static/image/public-img/close-circle.png"></img></li>';
            $(".indexnum-ul").append(li);
            $(".delete-ul").append(li2);
          }
        }
      })
      //清空按钮
      $scope.clearTextFun = function () {
        $('.bulksearch-text').val('')
        $(".indexnum-ul>li").remove();
        $(".delete-ul>li").remove();
      }

      $('.ord-search-inp').keypress(function (Event) {
        if (Event.keyCode == 13) {
          $scope.ordnumSearch();
        }
      })
      $scope.ordnumSearch = function () {
        if (!$('.bulksearch-text').val()) {
          layer.msg('Please enter your orders')
          return;
        }
        $scope.bulkSeaFlag = false;
        $scope.pageNum = 1;
        getList()
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
        $scope.pageNum = 1;
        getList()
      })
      //高级搜索里面的按订单类型搜索
      $('.type-sel').change(function () {
        $scope.pageNum = 1;
        getList()
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
            clearInterval(interval);

            $scope.pageNum = 1;
            getList()
          }
        }, 100)
      })
      //检查没有拉取到订单的原因
      $scope.noOrdResonFlag = false;
      $scope.resResonFlag = false;//展示后台返回的没有订单原因的弹框
      $scope.isSelTimeFlag = true;
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
            $scope.resResonFlag = true;//打开订单未拉取的原因
            $('.no-ordres-reson').text(data.data.result)
            if (data.data.result == '1') {
              $scope.isSelTimeFlag = false;
              $scope.seaNowTime = data.data.date;
            }
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