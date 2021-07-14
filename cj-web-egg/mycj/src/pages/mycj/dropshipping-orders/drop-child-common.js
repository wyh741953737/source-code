export function dropChildCommonFactory(angular) {
  const app = angular.module('drop-child-common.module', ['service']);
  // var mark1 = 0;
  app.controller('drop-child-common.ctrl', ['$scope', 'dsp', '$stateParams', '$timeout',
    function ($scope, dsp, $stateParams, $timeout) {
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
      $scope.showUseCouponsIcon = false;
      $scope.isVip = localStorage.getItem('vip')
      var bs = new Base64();
      console.log($('.orders-list').width())
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
      let pathUrlStr = window.location.href;
      console.log(pathUrlStr)
      if (pathUrlStr.includes('drop-proce-zi')) {
        $scope.dropZiStu = 1;
      } else if (pathUrlStr.includes('drop-processed-zi')) {
        $scope.dropZiStu = 2;
      } else if (pathUrlStr.includes('drop-complet-zi')) {
        $scope.dropZiStu = 3;
      }
      console.log($scope.dropZiStu)
      $scope.navList = [
        {name:'Awaiting Payment',href:'#/dropshipping-orders'},
        {name:'Processing',href:'#/drop-proce'},
        {name:'Processed',href:'#/drop-processed'},
        {name:'Completed',href:'#/drop-complet'},
        {name:'Closed',href:'#/drop-close'},
      ]
      $scope.navList[$scope.dropZiStu].show = true;
      $scope.handlerResult = {
        fenkaifahuo: { name: '分开发货', key: '1' },
        tihuan: { name: '缺货商品替换', key: '2' },
        partRefund: { name: '缺货商品退款', key: '3' },
        allRefund: { name: '全部商品退款', key: '4' },
      }
     
      //给导航按钮添加点击事件 隐藏子订单
      $('.drop-orderstatus-nav').click(function () {
        $('.dropshippingStatus-nav').show();
        // 隐藏子订单页面
        $('.processing-subOrders').hide();
      })

      // 过滤trackingNumber  null和TRACKINGNUMBER
      $scope.filterTrackingNumberTitle = function(item){
        const { TRACKINGNUMBERHISTORY = '', TRACKINGNUMBER = '' } = item
        return TRACKINGNUMBERHISTORY.replace(','+TRACKINGNUMBER,'').replace('null,','')
      }
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
      // 导出订单
      $scope.exportOrder = function () {
        $scope.dcordFlag = true;
      }
      $scope.goActexportOrder = function () {
        layer.load(2);
        let upJson = {}
        upJson.id = muordId;
        let postUrl;
        if ($scope.storeName == 'Excel Imported') {
          upJson.shopId = 'Excel Imported'
          postUrl = 'app/client_erp/exportPaymentOrderList';
        } else {
          postUrl = 'app/client_erp/exportPaymentOrders'
        }
        dsp.postFun(postUrl, JSON.stringify(upJson), function (data) {
          layer.closeAll('loading');
          console.log(data);
          if (data.data.statusCode == 200) {
            $scope.dcordFlag = false;
            $scope.dcordCallbackFlag = true;
            $scope.excelHref = JSON.parse(data.data.result).href;
          } else {
            layer.msg('Export order error.')
          }
        })
      }
      //显示隐藏高级搜索
      $('.toggle-moresearch').click(function () {
        $('.more-search').toggle(300);
        console.log(22222222)
        $('#toggle-logo').toggleClass('.glyphicon glyphicon-triangle-top');
      });
      //给processing下的订单添加选中非选中

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


      //点击子订单的返回按钮 隐藏子订单
      $scope.goBack = ()=>{
        window.history.back();
      }
      $('.sub-orders').show();//显示子订单
      dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);

      var muordId = bs.decode($stateParams.muordid);
      var ziId;
      if($stateParams.ziid && $stateParams.ziid !== '*') {
        ziId = bs.decode($stateParams.ziid);
      }
      var seaOrdStu = $stateParams.stu || '';
      var routeType = (!$stateParams.type || $stateParams.type === '*')  ? '' : $stateParams.type ;
      console.log(routeType)
      if (routeType == 'disputed') {//纠纷订单过来的查询
        seaOrdStu = 5;
      }
      $scope.muordId = muordId;
      // alert($(this).siblings('.await-ord-num').html())
      // alert(ziId)
      console.log(muordId);
      $scope.pageNum = '1';
      $scope.pageSize = '50';

      $('#await-zsel').val('50');
      function getList() {
        $scope.awaitpayList = [];
        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
        var shopstore = $scope.storeName;
        var searchinpVal = $.trim($scope.orderNumber);
        // var searchinpVal = $.trim($('.ord-search-inp').val());
        var paramObj = {};//存储 需要拼接发送的参数
        paramObj.page = $scope.pageNum - 0;
        paramObj.limit = $scope.pageSize - 0;
        paramObj.id = muordId;
        paramObj.status = seaOrdStu;

        if (ziId && $stateParams.ziid !== '*') {
          $scope.orderNumber = ziId;
          // $('.ord-search-inp').val(ziId)
          paramObj.orderId = ziId;
        } else {
          paramObj.orderId = searchinpVal;
        }
        paramObj.shopId = shopstore;
        paramObj.sku = $stateParams.sku;
        paramObj.isDispute = +(localStorage.getItem('drop-proce-isDispute') || '')
        console.log(JSON.stringify(paramObj))
        dsp.postFun('app/order/getShipmentsOrder', JSON.stringify(paramObj), function (data) {
          console.log(data);
          $scope.shops = data.data.shops//店铺的数组
          $scope.shops.unshift({
            id: "Excel Imported",
            name: "Excel Imported"
          })
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
      $scope.showdelFun = function (ev, index, item) {
        if (item.types == '1') {
          $('.dcl-ord-tbody').eq(index).find('.hasdel-con').show();
        }
      }
      $scope.hidedelFun = function (ev, index) {
        $('.dcl-ord-tbody').eq(index).find('.hasdel-con').hide();
      }
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
      // $('#dcl-sel-store').change(function () {
      // 	$scope.pageNum = '1';
      // 	getList()
      // })
      $scope.storeChangeFun = function () {
        $scope.pageNum = '1';
        getList()
      }
      //用订单号搜索 orderNumber
      $scope.keypressFun = (Event)=>{
        if (Event.keyCode == 13) {
          $scope.ordNumSearchFun();
        }
      }
      //搜索订单号
      $scope.ordNumSearchFun = function () {
        $scope.pageNum = '1';
        getList()
      }
      //子订单选择框的查询事件
      $scope.pageChangeFun = function () {
        $scope.pageNum = '1';
        getList()
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
        var istrackFlag;
        if (item.TRACKINGNUMBER) {
          istrackFlag = 2;
        } else {
          istrackFlag = 1;
        }
        location.href = "#/order-detail/" + id + '/' + istrackFlag;
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
          if (mdLink && JSON.stringify(mdLink) != '[]') {
            mdLink[0].indexOf('http') == -1 ? mdLink[0] = 'http://' + mdLink[0] : mdLink[0]
            $scope.mdLink = mdLink[0];
            $scope.mdLinkTkFlag = true;
          } else {
            layer.msg('No shipping labels found.')
          }
          // if($scope.wlName=='CJPacket'){
          // 	if(mdLink&&JSON.stringify(mdLink)!='[]'){
          // 		mdLink[0].indexOf('http')==-1?mdLink[0] = 'http://' + mdLink[0]:mdLink[0]
          // 		$scope.mdLink = mdLink[0];
          // 		$scope.mdLinkTkFlag = true;
          // 	}else{
          // 		layer.msg('No shipping labels found.')
          // 	}
          // }else{
          // 	if(mdLink&&JSON.stringify(mdLink)!='[]'&&mdLink[0].indexOf('miandan')!=-1){
          // 		mdLink[0].indexOf('http')==-1?mdLink[0] = 'http://' + mdLink[0]:mdLink[0]
          // 		$scope.mdLink = mdLink[0];
          // 		$scope.mdLinkTkFlag = true;
          // 	}else{
          // 		layer.msg('No shipping labels found.')
          // 	}
          // }

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
        if(item.hasOwnProperty('supplierId')) {
          $scope.supplierId = item.supplierId
        }
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
        // $('.dispute-con').animate({
        // 	height:'541px'
        // },100);
      }
      var selVal = '';
      //纠纷原因
      $('.sel-jfres').change(function () {
        selVal = $(this).val();
        if (selVal == 'Products Short' || selVal == 'Defective Products' || selVal == 'Received Incorrect Products' || selVal == 'Order Not Received' || selVal == 'Order Returned') {
          $('.dispute-tip').show();
          // $('.dispute-con').animate({
          // 	height:'576px'
          // },100);
        } else {
          $('.dispute-tip').hide();
          // $('.dispute-con').animate({
          // 	height:'541px'
          // },100);
        }
      })
      //期望处理的结果
      var expectResult = '';
      $('.sel-wantway').change(function () {
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
        if($scope.supplierId) {
          upData.supplierId = $scope.supplierId;
        }
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
        let params1 = {};
        for(let key in upData){
          params1[key]=upData[key];
        }
        params1.cjOrderId=upData.id;
        params1.userName=bs.decode(localStorage.getItem('name'));
        dsp.postFun('app/dispute/openDispute', JSON.stringify(upData), function (data) {
          console.log(data)
          layer.closeAll('loading')
          if (data.data.result == true) {
            if(!$scope.supplierId) {
              dsp.postFun("orderUsa/disputeOrder/newDisputeOrder", params1, res => {})
            }
            $scope.disputeFlag = false;
            layer.msg('Open dispute successfully')
            //把该条订单设置成
            $scope.imgArr = [];
            $scope.videoArr = [];
            $('.sel-jfres').val('');
            $scope.disTextareaVal = '';
            $scope.awaitpayList[$scope.itemIndex].disputeId = '1';
            $('.dispute-tip').hide();
            // $('.dispute-con').animate({
            // 	height:'541px'
            // },100);
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
      $scope.imgArr = [];       // 读取本地地址----速度快
      $scope.imgOssArr = [];  // 需要传给后台的线上地址
      $scope.videoArr = [];   // 需要传给后台的视频id
      let loadList = {
        img: ['png', 'jpg', 'jpeg', 'gif', "PNG", "JPG", "JPEG", "GIF"],
        video: ['mp4', 'avi', 'wmv', 'mpg', 'mov', 'flv', "MP4", "AVI", "WMV", "MPG", "MOV", "FLV"]
      };
      // 上传图片
      $scope.upLoadImg4 = function (files) {
        // let file = files[0];
        // let fileName = file.name.substring(file.name.lastIndexOf('.') + 1);
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
        //   $scope.imgOssArr.splice(index, 1);
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

      $scope.$on("$destroy", function() {
        //离开当前页时,去除localStorage中的处理中纠纷的值
        localStorage.removeItem('drop-proce-isDispute') 
      })
    }]);

  return app;
}