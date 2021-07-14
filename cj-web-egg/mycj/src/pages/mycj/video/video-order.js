import { NODE_ENV } from '@root_egg/env';
const awinTesMode = ['testnew', 'development', 'test'].includes(NODE_ENV) ? 1 : 0;
export function videoOrderFactory(angular) {
  const module = angular.module('video-order.module', []);
  module.controller('video-order.ctrl',
    ['$scope', '$rootScope', 'dsp', '$sce', 'utils', '$stateParams', function($scope, $rootScope, dsp, $sce, utils, $stateParams) {
      var base64 = $rootScope.base64;
      let aliPlayer;
      dsp.setRightMinHeight();
      $scope.searchStr = '';
      $scope.pageSize = '10';
      $scope.pageNum = '1';
      $scope.totalNum = 0;
      $scope.totalPageNum = 0;
      $scope.purchaseList = [];
  
      $scope.payType = '';
      $scope.mediaType = '';
  
      $rootScope.$on('media/orderMedia/selectMediaOrderList', (_, bool) => $scope.loading = bool);
  
      function getList(dsp, $scope) {
        const parmas = {
          pageNum: Number($scope.pageNum),
          pageSize: Number($scope.pageSize),
          data:{
            id: $scope.searchStr,
            mediaType: $scope.mediaType ? Number($scope.mediaType) : undefined,
            status: $scope.payType
          }
        };
        dsp.postFun('media/orderMedia/selectMediaOrderList', parmas, res => {
          if (res.data.code === 200) {
            $scope.purchaseList = res.data.data.list;
            $scope.totalNum = res.data.data.total;
            $scope.totalPageNum = Math.ceil($scope.totalNum / $scope.pageSize);
            if ($scope.purchaseList.length > 0) {
              dsp.removeNodataPic($('.cj-load-wrap'), 450);
            } else {
              dsp.addNodataPic($('.cj-load-wrap'), 450);
            }
            $scope.$broadcast('page-data', {
              pageNum: $scope.pageNum,
              totalNum: $scope.totalPageNum,
              totalCounts: $scope.totalNum,
              pageSize: $scope.pageSize
            });
          }else {
            layer.msg(res.data.message)
            dsp.addNodataPic($('.cj-load-wrap'), 450);
          }
        },err =>{
          console.log(err);
          dsp.addNodataPic($('.cj-load-wrap'), 450);
        });
      }
  
      $scope.$on('pagedata-fa', function(d, data) {
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getList(dsp, $scope);
      });

      //获取url中的参数方法
      function getUrlParamByKey (href, key) {
        if(!href) return ''
        var vars = href.split("&");
        for (var i = 0;i < vars.length; i++) {
          var pair = vars[i].split("=");
          if(pair[0] == key) { return pair[1]; }
        }
      }
  
      // getList(dsp, $scope);
      // paypay支付视频订单回调
      function initIsCheckout() {
        // 判断当前是否存在ckosessionid
        $scope.ckoSessionId = base64.decode(localStorage.getItem('ckoSessionId') || '') && JSON.parse(base64.decode(localStorage.getItem('ckoSessionId') || ''))
        if($scope.ckoSessionId) {
          getList(dsp, $scope)
          getCheckoutTrade()
          return 
        }
        var href = window.location.href;
        if (href.indexOf('?') >= 0) {
          const regexp = /\?[\w\W]*\#/
          $scope.sessionId = getUrlParamByKey(href.match(regexp) && href.match(regexp)[0].slice(1,-1),'cko-payment-id') || getUrlParamByKey(href.match(regexp) && href.match(regexp)[0].slice(1,-1),'cko-session-id')
          if($scope.sessionId) {
            localStorage.setItem('ckoSessionId', base64.encode(JSON.stringify($scope.sessionId)));
            // 后端接口返回状态较慢，延迟一秒再刷新当前页面
            let timer = setTimeout(() => {
              clearTimeout(timer)
              window.location.href = window.location.origin + '/myCJ.html#/video-history'
            }, 200)
            getList(dsp, $scope)
            return
          }
          var hrefArr = href.split('?');
          console.log(hrefArr);
          var paydataArr = hrefArr[1].split('&');
          var lengthPay = paydataArr.length;
          console.log(paydataArr);
          console.log(lengthPay);
          if (lengthPay == 3) {
            var paymentArr = paydataArr[0].split('=');
            var tokenArr = paydataArr[1].split('=');
            var payidArr = paydataArr[2].split('=');

            var payCS = {};
            payCS.paymentId = paymentArr[1];
            payCS.token = tokenArr[1];
            payCS.payerID = payidArr[1];
            payCS.code = 9;
            payCS.awc = dsp.getCookie("awc") || '';

            console.log(payCS)
            console.log(JSON.stringify(payCS))
            var isToken = localStorage.getItem('payToken');
            console.log(isToken)
            if (isToken == tokenArr[1]) {
              getList(dsp, $scope);
              return;
            } else {
              dsp.postFun('app/pay/pay', JSON.stringify(payCS), function (data) {
                console.log(data)
                if (data.data.result !== true) {
                  layer.msg('Payment Failed')
                  getList(dsp, $scope);
                } else {
                  layer.msg('Payment Succeed')
                  localStorage.setItem('payToken', tokenArr[1])
                  getList(dsp, $scope);

                  //awin 发送支付成功fall-back
                  let awinLocalParams = null;
                  try {
                    awinLocalParams = JSON.parse(localStorage.getItem(`_paypal_${payCS.token}`))
                    console.log(awinLocalParams)
                  } catch(err) { console.log('解析错误'); }
                  if(awinLocalParams){
                    function awinJS () {
                      let content = '<script >'+
                          ' var AWIN = {};' + 
                          '  AWIN.Tracking = {};' +
                          ' AWIN.Tracking.Sale = {};' +
                          ' AWIN.Tracking.Sale.amount =' + awinLocalParams.awinAmount + ';' +
                          ' AWIN.Tracking.Sale.orderRef ="' + awinLocalParams.awinRef+ '";' +
                          ' AWIN.Tracking.Sale.parts  ="' + "DEFAULT:" + awinLocalParams.awinAmount+ '";' +
                          'AWIN.Tracking.Sale.currency = "USD";'+
                          ' AWIN.Tracking.Sale.test = "' + awinTesMode + '";'+
                          'AWIN.Tracking.Sale.channel = "aw";'+
                          +'<\/script>'
                        $('body').append(content);
                        let osrc = 'https://www.dwin1.com/21578.js';
                        let script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.src = osrc;
                        document.getElementsByTagName('body')[0].appendChild(script);
                    }

                    function imgHttpFun(){
                      let orderCountMoney = awinLocalParams.awinAmount.toFixed(2)
                      let BasketImage = new Image(1,1);
                      BasketImage.src = `https://www.awin1.com/sread.img?tt=ns&tv=2&merchant=21578&amount=${orderCountMoney}&ch=aw&parts=DEFAULT:${orderCountMoney}&cr=USD&ref=${awinLocalParams.awinRef}&tesmode=${awinTesMode}`;
                      localStorage.removeItem(`_paypal_${payCS.token}`)
                    }
                    let awcText = dsp.getCookie('awc')
                    let utmSource = localStorage.getItem('utmSource');
                    if(awcText && utmSource == 'awin'){//有awin的awc值 并且登录平台来源是awin
                      awinJS()
                      imgHttpFun()
                    }
                  }
                }
              }, function (data) {
                console.log(data)
              })
            }
          }
          if (lengthPay < 3) {
            layer.msg('Payment Failed')
            getList(dsp, $scope);
          }
        } else {
          getList(dsp, $scope);
        }
      }
      initIsCheckout()
      $scope.search = function () {
        $scope.pageNum = '1';
        getList(dsp, $scope);
      }
      $scope.enterSearch = function (e) {
        $scope.pageNum = '1';
        e.keyCode === 13 && getList(dsp, $scope);
      }
      
      $scope.handleChangePayTypeSearch = () =>{
        console.log($scope.payType );
        $scope.pageNum = '1';
        getList(dsp, $scope)
      }
      
      $scope.handleChangeTypeSearch = () =>{
        console.log($scope.mediaType );
        getList(dsp, $scope)
      }
      
      $scope.payMoney = function (item) {
        console.log(item);
        console.log('myCJ.html#/payment/' + item.id + '/' + item.orderMoney + '//DIRECT');
        console.log(base64.encode(item.id));
        console.log(base64.encode(item.orderMoney + ''));
        // 是否验证邮件处理
        if (dsp.isVerifyEmail()) return
        location.href = 'myCJ.html?route=payment#/payment/' + base64.encode(item.id) + '/' + base64.encode(item.videoPracticalPrice + '') + '/' + base64.encode('1') + '/VIDEOHOT';
      }
      $scope.confirmReceive = function (item, index) {
        $scope.confirmReceiveFlag = true;
        $scope.operateItem = item;
        $scope.operateItem.index = index;
      }
      $scope.cancelOrder = function (item, index) {
        $scope.cancelOrderFlag = true;
        $scope.operateItem = item;
        $scope.operateItem.index = index;
      }
      $scope.goConfirmCancel = function () {
        dsp.postFun('app/businessVideo/cancelVideoDownload', { id: $scope.operateItem.id }, function (data) {
          console.log(data);
          if (data.data.code == 200) {
            layer.msg('Cancel order successfully');
            $scope.purchaseList.splice($scope.operateItem.index, 1);
            $scope.cancelOrderFlag = false;
            $scope.operateItem = null;
          } else {
            layer.msg('Cancel order failed');
          }
        });
      }
      $scope.content = 'Are you sure to cancel the order?';
      // 获取弹窗组件关闭按钮
      $scope.$on('closePopUps', (e, data) => {
        $scope.cancelOrderFlag = false;
        $scope.operateItem = null;
      })
      // 获取弹窗组件确定按钮
      $scope.$on('confirmPopUps', (e, data) => {
        $scope.goConfirmCancel()
      })
      
      // 查看视频
      $scope.handleLookVideo = (item)=> {
        console.log(item);
        if (!item.status === '3') {
          layer.msg('Please place an order and it will be shot for you')
          return
        }
        if (!item.videoId) {
          layer.msg('Video production in progress')
          return
        }
        let { videoId = '' } = item;
        const eleId = 'video-box';
        const sourceUrl = '';
        $scope.isLookVideo = true;
        $scope.videoLoading = true;
        cjUtils.getVideoInfo({
          eleId,
          videoId,
          sourceUrl,
          configuration: {
            width: '100%',     //视频宽度
            height: '100%',     //视频高度
          },
          callback: player => {
            aliPlayer = player
            $scope.videoLoading = false
            $scope.$apply()
          }
        })
      }
      
      // 关闭视频
      $scope.handleCloseVideo = () =>{
        aliPlayer && aliPlayer.pause()
        $scope.isLookVideo = false
      }

      // 下载视频
      $scope.handleDownloadVideo = function (item) {
        console.log(item)
        const videoName = item.businessVideoName
        if (item.videoId) {
          const url = $('<a id="downLoadBtn" href="https://tools.cjdropshipping.com/tool/downLoad/byVideoId?videoId=' + item.videoId + '&fileName=' + videoName + '.mp4" download=""></a>');
          url.get(0).click();
        } else {
          if (item.businessVideoUrl.indexOf('.') != -1) {
            const url = item.businessVideoUrl;
            const arr = url.split('.');
            const fileName = videoName + '.' + arr[arr.length - 1];
            const src = 'http://' + url
            const link = $('<a id="downLoadBtn" href="https://tools.cjdropshipping.com/tool/downLoad/file?urlStr=' + src + '&fileName=' + fileName + '" download=""></a>');
            link.get(0).click();
          } else {
            const url = $('<a id="downLoadBtn" href="https://tools.cjdropshipping.com/tool/downLoad/byVideoId?videoId=' + item.businessVideoUrl + '&fileName=' + videoName + '.mp4" download=""></a>');
            url.get(0).click();
          }
        }
      }
      
      // 下载图片
      $scope.handleDownloadImg = item =>{
        console.log(item);
        const imgs = JSON.parse(item.images).join(',')
        const sku = item.id
        layer.load(2);
        dsp.getFun(`erp/downloadImg/filesdown?imgs=${imgs}&sku=${sku}`, res => {
          layer.closeAll('loading');
          const {
            data
          } = res
          cjUtils.exportFile(data, `${sku}.zip`)
        }, err => {
  
        }, {
          responseType: 'blob'
        })
      }
  
      //发票按钮事件
      $scope.invoiceFun = function(id, type) {
        console.log(id, type);
        dsp.isinvoiceDialog(id, type);
      };
  
      $scope.videosrc = function(url) {
        return $sce.trustAsResourceUrl('https://' + url);
      };
  
      // 纠纷
      // 开启纠纷
      $scope.handleOpenDispute = (item) => {
        if (item.disputeId === '2') {
          layer.msg('The dispute has been opened once, if you need to open it, please contact the salesperson');
          return;
        }
        $scope.isShowModal = true;
        $scope.imgArr = [];
        $scope.disputeType = '';
        $scope.disputeExpected = '';
        $scope.disputeInfo = '';
        $scope.itemData = item;
      };
      // 添加上传图片
      $scope.handleAddImg = () => {
        document.getElementById('dispute-upload').click();
      };

      // 退款途径
      $scope.refundType = '1' // 默认退款到钱包
      $scope.refundTypeList = {
        "1":'Back in balance',
        "2":'Return to the original way'
      }
  
      // 上传图片
      $scope.upLoadImg = (files) => {
        dsp.ossUploadFile(files, res => {
          document.getElementById('dispute-upload').value = '';
          const { code, succssLinks } = res;
          if (code === 0) {
            layer.msg('Images Upload Failed');
            return;
          }
          console.log(succssLinks);
          $scope.imgArr = [...$scope.imgArr, ...succssLinks];
          $scope.$apply();
        });
      };
  
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
          layer.msg('Please select the type of dispute.');
          return;
        }
        if (!$scope.disputeExpected) {
          layer.msg('Please select expected result');
          return;
        }
        if (!$scope.disputeInfo) {
          layer.msg('Please input remark');
          return;
        }
        const params = {
          id: $scope.itemData.id,
          orderNumber: $scope.itemData.id,
          orderMoney: $scope.itemData.videoPracticalPrice,
          expectResult: $scope.disputeExpected,
          type: $scope.disputeType,
          orderSource: '3',
          message: JSON.stringify([{
            userName: '0',
            image: $scope.imgArr,
            remark: $scope.disputeInfo,
            date: utils.parseTime(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            videoUrl: []
          }])
        };

        // 如果是退款 添加退途径 refundType
        if($scope.disputeExpected == 1) params.refundType = $scope.refundType
        
        layer.load(2);
        dsp.postFun('app/dispute/OpenVideoDispute', params, res => {
          layer.closeAll('loading');
          if (res.data.code === 200) {
            $scope.isShowModal = false;
            layer.msg('Dispute Opened Successfully');
            $scope.purchaseList = $scope.purchaseList.map(obj => ({
              ...obj,
              disputeId: obj.id === $scope.itemData.id ? '1' : obj.disputeId
            }));
          } else {
            layer.msg('Open dispute unsuccessfully');
          }
        });
      };

  // stripe和checkuot交易状态查询
  function stripeTradeQuery(parmas) {
    layer.load(2)
    dsp.postFun('app/pay/stripeTradeQuery', parmas, ({data}) => {
      layer.closeAll('loading')
      if(data.code == 200) {
        $scope.stripeStatus = +data.data
        if(parmas && parmas.paymentType === 'Stripe') {
          /** 1待支付 2支付中 3支付成功 4支付失败 5支付异常 6支付取消 */
          switch(+data.data) {
            case 1:  
              layer.msg('Awaiting payment confirmation. Please refresh and check it later.');
              break;
            case 2: 
              layer.msg('Awaiting payment confirmation. Please refresh and check it later.');
              break
            case 3: 
              layer.msg('Payment Successful.');
              break;
            case 4: 
              layer.msg('Payment via Stripe failed. Please try again.');
              break;
            case 5: 
              layer.msg('Payment via Stripe failed. Please try again.');
              break;
            case 6: 
              layer.msg('Payment via Stripe failed. Please try again.');
              break;
            default:  ''
          }
        }
        if(parmas && parmas.paymentType === 'Checkout') {
          /** 1待支付 2支付中 3支付成功 4支付失败 5支付异常 6支付取消 */
					switch(+data.data) {
						case 1:  
							layer.msg('Awaiting Payment.');
							break;
						case 2: 
							layer.msg('Awaiting payment confirmation. Please refresh and check it later.');
							break;
						case 3: 
							layer.msg('Payment Successful.');
							break;
						case 4: 
							layer.msg('Payment via CheckOut failed. Please try again.');
							break;
						case 5: 
							layer.msg('Payment via CheckOut failed. Please try again.');
							break;
						case 6: 
							layer.msg('Payment Cancelled.');
							break;
						default: break;
          }
          // window.location.href = window.location.origin + '/myCJ.html#/video-history';
          getList(dsp, $scope);
        }
      } else {
        layer.msg(data.msg)
        return
      }
    }, err => {
      console.log(err);
    })
  }

  // stripe交易状态查询
  function  getStripeTrade() {
    const stripeObj = base64.decode(localStorage.getItem('stripeObj') || '') && JSON.parse(base64.decode(localStorage.getItem('stripeObj') || ''));
    localStorage.removeItem('stripeObj')
    if(!(stripeObj && stripeObj.orderId)) {
      return
    }
    const ordid = $stateParams.ordid;
    if(ordid !== stripeObj.showOrdId) {
      return
    }
    const parmas = {
      'orderId': stripeObj && stripeObj.orderId,
      'code': stripeObj && stripeObj.stripeCode,
      'payId': stripeObj && stripeObj.payId,
      'paymentType': stripeObj && stripeObj.paymentType,
    }
    stripeTradeQuery(parmas)
  }
  getStripeTrade()

  // checkout交易状态查询
  function getCheckoutTrade() {
    const checkoutObj = base64.decode(localStorage.getItem('checkoutObj') || '') && JSON.parse(base64.decode(localStorage.getItem('checkoutObj') || ''));
    localStorage.removeItem('checkoutObj')
    localStorage.removeItem('ckoSessionId')
    if(!(checkoutObj && checkoutObj.paymentType === 'Checkout')) {
      return
    }
    const parmas = {
      'orderId': checkoutObj && checkoutObj.orderId,
      'code': checkoutObj && checkoutObj.stripeCode,
      'paymentType': checkoutObj && checkoutObj.paymentType,
      'payId': checkoutObj && checkoutObj.payId,
      'sessionId': $scope.ckoSessionId
    }
    stripeTradeQuery(parmas)
  }


    }]);

  return module;
}
