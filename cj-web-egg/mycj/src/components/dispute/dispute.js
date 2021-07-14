import template from './dispute.html';
import styles from './dispute.less';
import addImg from './plus.png';

export function disputeBtnFactory(module) {
  module.component('disputeBtn', {
    template,
    controller: ['$rootScope', '$scope', '$location', 'dsp', '$element', 'utils', '$sce', '$timeout', function($rootScope, $scope, $location, dsp, $element, utils, $sce, $timeout) {
      $element.addClass([styles.disputeComponent, 'dispute-component-box']);
      this.$onInit = function() {
        disputeBtnCtrl.call(this, $scope, dsp, utils, $sce, $timeout);
      };
    }],
    bindings: {
      params: '=',
      type: '=' /* 订单类型 1 直发 2 代发  3 视频 4 供应商  string类型*/
    }
  });
}

function disputeBtnCtrl($scope, dsp, utils, $sce, $timeout) {
  const base64 = new Base64();
  const disputeArr = ['Products Short', 'Defective Products', 'Received Incorrect Products', 'Order Not Received', 'Order Returned'];
  let pathUrlStr = window.location.href;
  if (pathUrlStr.includes('drop-proce-zi')) {
    $scope.dropZiStu = 1;
  } else if (pathUrlStr.includes('drop-processed-zi')) {
    $scope.dropZiStu = 2;
  } else if (pathUrlStr.includes('drop-complet-zi')) {
    $scope.dropZiStu = 3;
  }
  $scope.itemData = this.params;
  console.log(this.params,"&&&&&&&&&&&&");
  if($scope.itemData.hasOwnProperty('supplierId')) {
    $scope.supplierId = $scope.itemData.supplierId;
  }
  if ($scope.itemData && $scope.itemData.id && $scope.itemData.id.includes('SY')) {
    $scope.isSYOrder = true
  }
  $scope.type = this.type;
  console.log(this.type, typeof(this.type), 'this.type~~~~~~~~~~~~~~~~~~~~~~~')
  $scope.isShowModal = false;
  $scope.addImg = addImg;
  $scope.ordLogFun = function(item){
    location.href = '#/order-log/'+item.ID
  }
  
  // 跳转纠纷完成
  $scope.goDisputeComplete=()=>{
    // var jfId = item.ID;
    // window.open('#/after-sale//' + jfId);
    window.open('#/after-sale/2/');
  };
  
  // 开启纠纷
  $scope.handleOpenDispute = () => {
    console.log($scope.itemData);
    if ($scope.itemData.disputeId === '2') {
      layer.msg('The dispute has been opened. Please check in the Disputes');
      return
    }
    // if ($scope.itemData.supplierCount > 1) {
    //   layer.msg("Sorry, the order can only be processed by our staff. Please contact Bruce, here's his contact. (Skype: 1071295441@qq.com Whatsapp:+8617079032366 Wechat: +8613757123649）");
    //   return
    // }
    $scope.isShowTips = false;
    $scope.imgArr = [];
    $scope.videoArr = [];
    $scope.disputeType = '';
    $scope.disputeExpected = '';
    $scope.disputeInfo = '';
    // 控制显示跳转提示
    $scope.showPrompt = false
    // 所有折扣总和
    $scope.allCouponAmount = 0;
    // 是否是vip
    $scope.isVip = localStorage.getItem('vip')
    let params;
    switch ($scope.type) {
      case '1':
        params = {
          id: $scope.itemData.id,
          orderSource: '1'  // 1 直发 2 代发 3 视频订单
        };
        getLogisticsOrOrderInfo(params);
        $scope.hideUpVideoFlag = true;
        break;
      case '2':
        params = {
          id: $scope.itemData.ID,
          orderSource: '2'  // 1 直发 2 代发 3 视频订单
        };
        getLogisticsOrOrderInfo(params);
        break;
      case '3': //search all 过来的
        params = {
          id: $scope.itemData.ID,
          orderSource: '2'  // 1 直发 2 代发 3 视频订单
        };
        getLogisticsOrOrderInfo(params);
        break
    }
  };

  // 退款途径
  $scope.refundType = '1' // 默认退款到钱包
  $scope.refundTypeList = {
    "1":'Back in balance',
    "2":'Return to the original way'
  }
  
  // 开启纠纷获取订单消息和物流数据
  function getLogisticsOrOrderInfo(params) {
    layer.load(2);
    dsp.postFun('app/dispute/getDisputeInfoById', params, ({ data }) => {
      layer.closeAll('loading');
      if (data.code === '200') {
        $scope.isShowModal = true;
        $scope.products = data.products || [];
        // 计算折扣总和
        for(let product of $scope.products){
          if(product.couponPrice) {
            $scope.showPrompt = true
          }
          if(!product.couponPrice) {
            continue
          }
          $scope.allCouponAmount += product.couponPrice * product.quantity
        }

        $scope.orderInfo = data.addredds;
        $scope.trackInfo = data.trackInfo;
        $scope.trackingData = data.trackInfo && data.trackInfo.route ? JSON.parse(data.trackInfo.route) : [];
        const lastOnlineTime = data.trackInfo ? data.trackInfo.lastOnlineTime && data.trackInfo.lastOnlineTime.time : null;
        const nowTime = new Date().getTime();
        $scope.disabledTrackingInfoFrozen = lastOnlineTime ? (nowTime - lastOnlineTime) < (86400000 * 5) : null;
        $scope.orderStatus = $sce.trustAsHtml(setOrderStatus(data.addredds, data.trackInfo));
        if(data.groupPayFlag){
          $scope.refundTypeList = {
            "1":'Back in balance',
          }
        } else {
          $scope.refundTypeList = {
            "1":'Back in balance',
            "2":'Return to the original way'
          }
        }
      }
    });
  }
  
  // 判断定义订单状态
  function setOrderStatus(orderInfo, trackInfo) {
    if (trackInfo && trackInfo.status === 6) {
      return `<span style="color: #71B603;">Delivered</span>`;
    } else if (trackInfo && trackInfo.router && JSON.parse(trackInfo.route).length >= 2) {
      return `<span style="color: #1178FD;">In Transi</span>`;
    } else if (trackInfo && trackInfo.router && JSON.parse(trackInfo.route).length === 1) {
      return `<span style="color: #EEA700;">Dispatched</span>`;
    } else {
      return `<span style="color: #FF7700;">Paid</span>`;
    }
  }
  
  // 选择纠纷类型
  $scope.handleDisputeChange = () => {
    $scope.isShowTips = disputeArr.includes($scope.disputeType);
  };
  
  // 添加上传图片
  $scope.handleAddImg = () => {
    document.getElementById('dispute-upload').click();
  };
  
  let loadList = {
    img: ['png', 'jpg', 'jpeg', 'gif', "PNG", "JPG", "JPEG", "GIF"],
    video: ['mp4', 'avi', 'wmv', 'mpg', 'mov', 'flv', "MP4", "AVI", "WMV", "MPG", "MOV", "FLV"]
  };

  // 上传图片

  $scope.upLoadImg4 = function (files) {
    let validFileArr = [];
    if (files) {
      if(($scope.imgArr.length + files.length) > 8) {
        layer.msg('Upload eight images at most');
        return;
      }
      let fileType, fileName;
      for (let i = 0, len = files.length; i < len; i++) {
        fileName = files[i].name;
        fileType = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase();
        console.log(fileName, fileType)
        if (loadList.img.indexOf(fileType) != -1) {
          validFileArr.push(files[i])
        }
      }
    }
    if (validFileArr.length < 1 && files.length > 0) {
      layer.msg('Images format error')
      return
    }
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
      let result = data.succssLinks;
      if (result && result.length > 0) {
        for (let j = 0; j < result.length; j++) {
          let srcList = result[j].split('.');
          let fileName = srcList[srcList.length - 1].toLowerCase();
          if (fileName == 'png' || fileName == 'jpg' || fileName == 'jpeg' || fileName == 'gif') {
            $scope.imgArr.push(data.succssLinks[j]);
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

  $scope.hideModal = () => {
    $scope.isShowModal = false
    $scope.videoArr = [];
    $scope.imgArr = [];
    $scope.hideUpImgFlag = false;
    $scope.hideUpVideoFlag = false;
  }
  
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
          width: '118px',     //视频宽度
          height: '118px',     //视频高度
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

  // 查看纠纷
  $scope.handleViewDispute = itemData => {
    window.open(`#/after-sale//${itemData.id}`);
  };
  
  // 查看图片
  $scope.viewBigImg = link => {
    window.open(link);
  };
  
  // 确认提交纠纷
  $scope.handleConfirm = () => {
    if (!$scope.disputeType) {
      layer.msg("Please select the type of dispute.");
      return;
    }
    if ($scope.disputeType === "Unfilled Orders Cancellation") {
      layer.msg("Sorry, this order has been processed already.");
      return;
    }
    if (!$scope.disputeExpected) {
      layer.msg("Please select expected result");
      return;
    }
    if (!$scope.disputeInfo) {
      layer.msg("Please input remark");
      return;
    }
    
    if (disputeArr.includes($scope.disputeType)) {
      if (($scope.imgArr.length === 0)) {
        layer.msg('The screenshoot of buyer complains (email address included) and images of parcel are required for this kinds of dispute.');
        return;
      }
      disputeConfirmRequest();
    } else {
      disputeConfirmRequest();
    }
    
  };

  $scope.afterLinkFun = function (item) {
    var jfId = item.ID;
    window.open('#/after-sale//' + jfId)
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
  
  function disputeConfirmRequest() {
    let params, id,  params1 = {}; 
    switch($scope.type) {
      case '1': 
        params = {
                  disputeType: '1',
                  id: $scope.itemData.id,
                  orderNumber: $scope.itemData.orderNumber,
                  orderMoney: $scope.itemData.orderMoney,
                  expectResult: $scope.disputeExpected,
                  type: $scope.disputeType,
                  orderSource: '1',
                  message: JSON.stringify([{
                    userName: '0',
                    image: $scope.imgArr,
                    remark: $scope.disputeInfo,
                    date: utils.parseTime(new Date(), 'yyyy-MM-dd hh:mm:ss')
                  }])
                };
        for(let key in params){
          params1[key]=params[key];
        }
        params1.cjOrderId=$scope.itemData.id;
        params1.userName=base64.decode(localStorage.getItem('name'));
        id = $scope.itemData.id;
        break;
      case '2':
        params = {
                  disputeType: '2',
                  id: $scope.itemData.ID,
                  orderNumber: $scope.itemData.ORDER_NUMBER,
                  orderMoney: $scope.itemData.AMOUNT - $scope.allCouponAmount,
                  expectResult: $scope.disputeExpected,
                  type: $scope.disputeType,
                  orderSource: '2',
                  message: JSON.stringify([{
                    userName: '0',
                    image: $scope.imgArr,
                    videoUrl: $scope.videoArr,
                    remark: $scope.disputeInfo,
                    date: utils.parseTime(new Date(), 'yyyy-MM-dd hh:mm:ss')
                  }])
                };
        if($scope.itemData.supplierCount === 1) {
          if($scope.supplierId) {
            params.supplierId = $scope.supplierId;
          }
        }
        for(let key in params){
          params1[key]=params[key];
        }
        params1.cjOrderId=$scope.itemData.ID;
        params1.userName=base64.decode(localStorage.getItem('name'));
        id = $scope.itemData.ID
        break;
      case '3':
        params = {
          disputeType: '2',
          id: $scope.itemData.ID,
          orderNumber: $scope.itemData.ORDER_NUMBER,
          orderMoney: $scope.itemData.AMOUNT - $scope.allCouponAmount,
          expectResult: $scope.disputeExpected,
          type: $scope.disputeType,
          orderSource: '2',
          message: JSON.stringify([{
            userName: '0',
            image: $scope.imgArr,
            videoUrl: $scope.videoArr,
            remark: $scope.disputeInfo,
            date: utils.parseTime(new Date(), 'yyyy-MM-dd hh:mm:ss')
          }])
        }
        if($scope.itemData.supplierCount === 1) {
          if($scope.supplierId) {
            params.supplierId = $scope.supplierId;
          }
        }
        for(let key in params){
          params1[key]=params[key];
        }
        params1.cjOrderId=$scope.itemData.ID;
        params1.userName=base64.decode(localStorage.getItem('name'));
        id = $scope.itemData.ID
    }
    disputeRequest(params, params1, id)
  }

  // 发起纠纷请求
  function disputeRequest(params, params1, id) {
    // 如果是退款 添加退途径 refundType
    if($scope.disputeExpected == 1) params.refundType = $scope.refundType

    layer.load(2);
    dsp.postFun("app/dispute/openDispute", params, res => {
      layer.closeAll("loading");
      if (res.data.code === 200) {
        $scope.isShowModal = false;
        layer.msg('Open dispute successfully');
        // 向父级组件发起通讯 告诉那条数据纠纷发起成功
        $scope.$emit('disputeSuccess', id);
        $scope.itemData.disputeId = '1';
      
          dsp.postFun('orderUsa/disputeOrder/newDisputeOrder', params1, res => {});
        
      } else {
        layer.msg("Open dispute unsuccessfully");
      }
    });
  }
}
