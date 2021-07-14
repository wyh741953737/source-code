export function videoDemandDetailFactory(angular) {
  const module = angular.module('video-demand-detail.module', []);

  module.controller('video-demand-detail.ctrl', ['$scope', '$rootScope', '$stateParams', 'dsp','enumApp',
    function ($scope, $rootScope, $stateParams, dsp, enumApp) {
      $scope.orderStatusEnums = enumApp.status;

      const userInfo = $rootScope.userInfo;
      $scope.soudeId = $stateParams.id;
      $scope.sourcetype = $stateParams.sourcetype;
      // console.log($scope.sourcetype);
      var base64 = $rootScope.base64;
      var userId = userInfo.userInfo;
      var username = userInfo.name;
      $scope.username = username;
      $scope.userImg = username.slice(0, 1).toUpperCase();
      console.log(userId, username);
      const parmas = {
        ids: $scope.soudeId
      };
      layer.load(2);
      dsp.postFun('media/orderMedia/selectMediaDemandById', parmas, ({ data }) => {
        layer.closeAll('loading');
        console.log(data);
        if (data.code === 200) {
          $scope.sourcecontent = data.data;
          $scope.sourcecontent.imagelist = data.data.imageUrl;
          $scope.selPrice = data.data.copyrightPrice;
          $scope.sourcecontent.imageUrl = $scope.sourcecontent.imageUrl.split(',')
          .map(o => {
            o = 'https://' + o.replace('https://', '').replace('http://', '');
            return o;
          });
          console.log($scope.sourcecontent.imageUrl);
        }else {
          layer.msg(data.message)
        }
      });
      $scope.succeed = function () {
        $scope.DownDialog = true;
      };
      $scope.isact1 = true;
      $scope.isact2 = false;
      $scope.videoType = 2;
      $scope.price1 = function (price) {
        $scope.isact1 = true;
        $scope.isact2 = false;
        $scope.selPrice = price;
        $scope.videoType = 2;
      }
      $scope.price2 = function (price) {
        $scope.isact1 = false;
        $scope.isact2 = true;
        $scope.selPrice = price;
        $scope.videoType = 1;
      }
      $scope.payClick = function () {
        // 是否验证邮件处理
        if (dsp.isVerifyEmail()) return
        console.log($scope.sourcecontent)
        var data = {
          productName: $scope.sourcecontent.productName,
          imgUrl: $scope.sourcecontent.imagelist,
          videoDemandId: $scope.sourcecontent.id,
          videoPrice: $scope.selPrice,
          videoType: $scope.videoType,
          mediaType: $scope.sourcecontent.mediaType,
          quantity: $scope.sourcecontent.quantity
        };
        console.log(data);
        layer.load(2);
        dsp.postFun('app/videoDemand/paymentOfVideoDemand', data, function (data) {
          layer.closeAll("loading");
          if (data.data.code == 200) {
            location.href = 'myCJ.html?route=payment#/payment/' + base64.encode(data.data.videoDownloadRecordId) + '/' + base64.encode(data.data.practicalPrice + '') + '/' + base64.encode('1') + '/VIDEOHOT';
          } else if (data.data.code == 807) {
            layer.msg('This order already exists');
            location.href = 'myCJ.html#/video-history';
          } else {
            layer.msg('System exception');
          }
        });
      }
  
      // 下载
      $scope.hadleDownload = function(item) {
        console.log(item);
        if ($scope.sourcecontent.mediaType === 0) {
          downloadVideo();
        } else if ($scope.sourcecontent.mediaType === 1) {
          downloadImg();
        }
      };
  
      // 下载视频
      function downloadVideo() {
        const fileName = $scope.sourcecontent.number;
        if ($scope.sourcecontent.videoId) {
          const url = $('<a id="downLoadBtn" href="https://tools.cjdropshipping.com/tool/downLoad/byVideoId?videoId=' + $scope.sourcecontent.videoId + '&fileName=' + fileName + '.mp4" download=""></a>');
          url.get(0).click();
        } else {
          const url = $scope.sourcecontent.businessVideoUrl;
          const arr = url.split('.');
          const videoName = fileName + '.' + arr[arr.length - 1];
          const src = 'http://' + url;
          const link = $('<a id="downLoadBtn" href="https://tools.cjdropshipping.com/tool/downLoad/file?urlStr=' + src + '&fileName=' + videoName + '" download=""></a>');
          link.get(0).click();
        }
      }
  
      // 下载图片
      function downloadImg() {
        const imgs = JSON.parse($scope.sourcecontent.images).join(',')
        const sku = $scope.sourcecontent.number
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
    
      const typeText = {
        '0': "Store's",
        '1': "Individual",
        '2': "CJ's"
      } 
      //将type值转化成文本值
      $scope.handleTypeText = (type) => {
        return typeText[type] ? typeText[type]: '--';
      };
    }]);

  return module;
}
