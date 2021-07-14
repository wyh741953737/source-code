(function (angular) {
  angular.module('cjCompnentModule')
  .component('swiperImg', {
    templateUrl: './static/components/swiper_img/swiper_img.html',
    controller: swiperImgCtrl,
    bindings: {
      autoplay: '=',
      imgData:'=',
      store:'=',
      storeId:'='
    }
  });
  function swiperImgCtrl($scope, dsp, $timeout,$rootScope) {
    $scope.autoplay = this.autoplay;
    let that = this;
    $scope.store= this.store || '0';//0:默认；1：供应商
    function swiperFun() {
      $timeout(function () {
        let swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          autoplay: $scope.autoplay,
          slidesPerView: 1,
          paginationClickable: true,
          autoplayDisableOnInteraction : false,
          speed:1500,
          loop: $scope.imgData.length>1?true:false
        });
      }, 1000);
    }
    function getBanner1(){
      loadingShow('.swiper-container');
      dsp.postFun('cj/banner/getWebHomeBannerInfo', {
        platformType:1
      }, ({ data }) => {
        loadinghide('.swiper-container');
        const { result, statusCode } = data
        if (statusCode === '200') {
          $scope.bannerList = result.map((item, idx) => {
            item.img_url = item.webImg
            item.link = item.urlOrSku?item.urlOrSku:'';

            if (item.skipType == '3' && item.isSkuOut == '0') {//商品详情页
              item.link = `product-detail.html?id=${item.pid}&from=all&fromType=all&productType=0`
            }
            return item
          })
          $scope.imgData = $scope.bannerList;
          $scope.isNeedClick = true;
          swiperFun();
        }
      }, error => {
        console.log('Data acquisition failed')
      })
    }
    function getBanner2(){
      dsp.postFun('app/web/shopInfoById', {
        shopId:that.storeId
      }, (data) => {
        const { result, statusCode } = data.data;
        if (statusCode === '200') {
          let oresult = JSON.parse(result);
          $scope.isShop=true;
          $rootScope.$broadcast('shop_data', {
            name:oresult.list[0].shopName,
            supplierId:oresult.list[0].supplierId,
            id:oresult.list[0].id,
            logo:oresult.list[0].logoUrl
          });
          $scope.bannerList = oresult.list[0].webShopSettingVos[0].webBannerUrl.map((item, idx) => {
            item.img_url = item.bannerUrl
            item.link = '';
            item.skipType='1';
            return item
          })
          $scope.imgData = $scope.bannerList;
          $scope.isNeedClick = false;
          swiperFun();
        }else{
          layer.msg(data.data.message);
        }
      }, (err) => {
        layer.msg(err.message);
      });
    }
    if(this.imgData){//直接赋值的列表
      $scope.imgData = that.imgData;
      $scope.isNeedClick=true;
      swiperFun();
    }else{
      if($scope.store ==0){
        getBanner1();
      }else {
        getBanner2();
      }
    }
    
    $scope.goDetail = (idx)=>{
      console.log(idx)
      let item = $scope.imgData[idx];
      if($scope.isNeedClick){
        // 埋点，不需要处理返回值
        dsp.postFun('cj/banner/checkBanner', {
          bannerId:item.id
        }, (data) => {
        }, error => {
        })
      }
      if (item.link) {
        if (item.skipType == '3' && item.isSkuOut == '0') {//商品详情页
          window.open(`product-detail.html?id=${item.pid}&from=all&fromType=all&productType=0`);
        } else if (item.skipType == '2') {//指定页面
          window.open(item.link);
        } else if (item.skipType === '4') {
          location.href = item.link
        }
      }
    }
    function loadingShow(el) {
      $(el).busyLoad("show", {
        color: '#FF7700',
        background: 'transparent'
      });
    }

    function loadinghide(el) {
      $(el).busyLoad("hide")
    }
  }
})(angular)