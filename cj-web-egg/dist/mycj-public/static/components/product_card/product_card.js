(function (angular) {
  angular.module('cjCompnentModule')
    .component('productCard', {
      templateUrl: './static/components/product_card/product_card.html',
      controller: ['$scope', 'dsp', 'cjhome', '$rootScope', '$timeout', 'utils',  function ($scope, dsp, cjhome, $rootScope ,$timeout, utils) {
        this.$onInit = function () {
          productCardCtrl.call(this, $scope, dsp, cjhome, $rootScope ,$timeout, utils);
        };
        
      }],
      bindings: {
        istag: '=', //排名
        data: '=',
        width: '=',
        isSales: '=',
        country: '=',
        title: '=',
        tracking: '=',
        isaddcartbtn: '=',
        addCartFun: '=',
        purchaseListIn: '=',
        // onLog: '&'
      }
    }).filter('nowpriceProcessor', function () {
      return function (price) {
        const priceNew = typeof price === 'string' ? price.replace(' -- ', '-').replace('--', '-') : price;
        return priceNew ? priceNew : '--';
      };
    }).directive('onFinishRender', ['$timeout', '$parse', function($timeout){
    return {
      restrict:'A',
      link: function(scope){
        // 添加directive 方法是为了在dom加载完成之后获取dom
        $timeout(function(){
          scope.$emit('ngLoadFinished');
        });
      }
    };
  }]);
  function productCardCtrl($scope, dsp, cjhome, $rootScope,$timeout,utils) {
    $scope.cardTitle = this.title;
    let bs = new Base64();
    const prodHash = this.data.$$hashKey || "";
    $scope.tracking = this.tracking;
    $scope.fromCountry = dsp.getQueryString('from') || 'all';
    $scope.fromType = dsp.getQueryString('fromType') || 'all';
    $scope.list = dsp.getQueryString('list') || '';
    $scope.hasLogin = dsp.isInLoginState();
    $scope.productData = this.data;
    $scope.uuid = `uuid-${this.data.id || cjUtils.uuid()}`; //加字符串以免数字id引起的报错
    $scope.defaultImg = 'static/image/public-img/default.jpg';
    $scope.lazyRef = "lazyImg";
    $scope.hashKey = "hash-" + prodHash.substring(prodHash.indexOf(':') + 1) //加字符串以免数字id引起的报错
    // console.log(this.data,"%%%%%%%%%%%%%%");
    // console.log($scope.productData,"productDataproductDataproductDataproductData");
    if($scope.fromType=='CommentList'){
        $scope.productData.flag = 1;
        // $scope.productData.bigImg = $scope.productData.img.split()[0]
        $scope.productData.bigImg =  $scope.productData.bigImg? $scope.productData.bigImg:$scope.productData.img.split(',')[0];
        $scope.productData.nameEn = $scope.productData.nameEn?$scope.productData.nameEn:$scope.productData.productname;
    }
    $scope.istag = this.istag;
    $scope._width = this.width || 230;
    $scope.isSales = this.isSales || false;
    $scope.country = this.country; //th：泰国
    $scope.isaddcartbtn = this.isaddcartbtn
    $scope.addCartFun = this.addCartFun
    $scope.purchaseListIn = this.purchaseListIn
    $scope.resetUrl = (url) => {
      if (url) {
        return 'https://' + url.replace('https://', '').replace('http://', '');
      }
    };
    $scope.$on('ngLoadFinished',function (args){
      const observer = new IntersectionObserver((changes)=>{
        // changes是观测对象合集（即使是一个观测对象也会形成数组的形式）
        changes.forEach(({target, isIntersecting})=>{
          // target是节点dom isIntersecting是否有交叉（有交叉就是一部分在可视区一部分不在可视区）
          // 第一次进入如果有交叉证明进入可视区这时候就可以解除
          if(isIntersecting){
            // 关闭观察器
            observer.disconnect();
            // 停止观察
            observer.unobserve(target);
          }
          if(isIntersecting && $scope.productData.bigImg){
            // 判断是否数据img存在，如果不存在继续使用默认图片
            $scope.defaultImg = $scope.resetUrl($scope.productData.bigImg);
          }
        });
      });
      // 观测根据数据id生成的dom节点
      observer.observe(document.getElementById(`${args.targetScope.uuid}`));
      const targetDom = document.getElementById(`${$scope.hashKey}-${$scope.productData.id}`);
      if (targetDom && $scope.tracking?.exposureId) {
        const tarckingData = {
          elementId: $scope.tracking?.exposureId,
          actionType: "product_exposure",
          list: [
            {
              filedName: "productId",
              fieldValue: $scope.productData.id
            }
          ]
        }
        targetDom.setAttribute('data-tracking-element-view', JSON.stringify(tarckingData))
      } 
    });
  /*收藏*/
   $scope.collectMerch = function ($event) {
     // productData.flag,  productData.id, $event
     $event.stopPropagation();
     $scope.collectType = $scope.productData.isCollect;
     if (!$scope.hasLogin) {
       return layer.msg('Please login first!');
     } else {
       // cjhome.Collection(flag, id, $event, $('#wishlist-box'),formType,push_id);
       let oCollect = $scope.productData.isCollect;
       dsp.postFun('cj/homePage/shouCangShnagPin', {
         "productId":$scope.fromType==='CommentList'? $scope.productData.productid || $scope.productData.productId : $scope.productData.id || $scope.productData.productId,
       }, function (res) {
         if(res.data.statusCode=='200'){
           $scope.productData.isCollect = oCollect==0 ? 1:0;
         }
       });
     }
     if($scope.fromType=='CommentList'){
       dsp.postFun('cj/appPush/updatePushProductsCollect', {
         "productid":$scope.productData.productid,
         "collectionCount":1,
         "push_id":$scope.productData.push_id
       }, function (res) {
         console.log(res);
       });
     }
   };
   /*收藏hover*/
   $scope.MerchEnter = function (ev) {
     if ($(ev.currentTarget).attr('src') == 'static/image/CJ-home/icon_love@2x.png') {
       $(ev.currentTarget).attr('src', 'static/image/CJ-home/love_hover@2x.png');
     }
   };
   $scope.MerchLeave = function (ev) {
     if ($(ev.currentTarget).attr('src') != 'static/image/CJ-home/icon_wishlist_click@2x.png') {
       $(ev.currentTarget).attr('src', 'static/image/CJ-home/icon_love@2x.png');
     }
   };
    /*商品点击去详情*/
    $scope.goTodetail = function (item, $event) {
      $event.preventDefault();
      $scope.$emit('productClick', item);
      dsp.postFun('cj/homePage/shangPinMaiDian', {
        ID: $scope.fromType=='CommentList'?item.productid:item.id,
        BIGIMG: item.bigImg,
        NAME: '',
        SKU: '',
        type: 'clickSource'
      }, function (data) {

      }, function (data) {});
      let id = $scope.fromType=='CommentList'?item.productid:item.id || item.productId;
      if (item.flag == '1' || item.flag == '1-2') {
        window.open('product-detail.html?id=' + id + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType + '&productType=' + (item.productType || 0));
      } else {
        window.open('reptail-detail.html?id=' + id);
      }
    };
    //listOrsource按钮
    $scope.listOrsourceBtn = function (item, $event, type) {
      $event.stopPropagation();
      $scope.$emit('productClick', item);
      let id = item.id || item.productId || item.productid;
      let push_id = item.push_id
      if ($scope.hasLogin) {
        if (type == 'source') {
          window.open('reptail-detail.html?id=' + id + '&source=1');
        } else if (type == 'list' && $scope.fromType != 'CommentList') {
          // $scope.addToWaitlist(id);
          window.open('product-detail.html?id=' + id + '&from=' + $scope.fromCountry + '&fromType=' + '&list=1');
        }else if($scope.fromType == 'CommentList'){
          window.open('product-detail.html?id=' + id + '&push_id=' + push_id + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType + '&list=1');
        }
      } else {
        if (type == 'source') {
          location.href = 'login.html?target=' + bs.encode('reptail-detail.html?id=' + id + '&source=1');
        } else if (type == 'list') {
          location.href = 'login.html?target=' + bs.encode('product-detail.html?id=' + id + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType + '&list=1');
        }
      }
    };
    // 添加到待刊登列表
    $scope.addToWaitlist = function (detailId) {
      layer.load(2);
      dsp.postFun('cj/listedproduct/add', [
        detailId
      ], function (data) {
        layer.closeAll('loading');
        if (data.data.statusCode == 200) {
          $scope.addToWaitlistFlag = 1;
        } else {
          layer.msg('Add failed');
        }
      })
    }
    $scope.toWaitlist = function () {
      location.href = 'myCJ.html#/products-connection/history/0';
    }
    // 到我的店铺
    $scope.toMyStore = function (item) {
      location.href = `/list-detail.html?from=all&fromType=all&store=1&storeId=${item.shop_id}`
    }
    $scope.stringToJson = (val) => {
      if (val) {
        return JSON.parse(val)
      }
    }
    $scope.getInventory = throttle(getInventoryData, 2000);

    //查看库存
    function throttle(func, wait) {
      let previous = 0;
      return function () {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
          func.apply(context, args);
          previous = now;
        }
      }
    }

    function getInventoryData() {
      if (!$scope.productData.INVENTORCOUNTRY){
        let proId = $scope.productData.id || $scope.productData.productid || $scope.productData.productId;
        dsp.postFun('product-integration-api/warehouse/getStorehouseByArea', {
          pid: proId
        }, function(response) {
          const { code, data, message } = response.data;
          if(code == 200) {
            $scope.productData.INVENTORCOUNTRY = data;
          } else {
            layer.msg(message);
          }
        },
        (error) => {}, 
        {
          headers: {
            signType: 'md5'  // 新商品中心规范，作用是免登
          }
        })
      }
    }

    // function getInventoryData() {
    //   if (!$scope.productData.INVENTORCOUNTRY){
    //     let proId = $scope.productData.id || $scope.productData.productid
    //     dsp.getAreaByPid(proId, function(data){
    //       if (data.length == 1 && data[0].countryCode == 'CN' && data[0].num == 0) {
    //         dsp.postFun('cj/locProduct/huoQuShangPinXiangQing',{
    //           id: proId
    //         }, function (data2) {
    //             if (data2.data.statusCode == 200) {
    //             // data[0].num = 10000 * data2.data.result.stanProducts.length;
    //             $scope.productData.INVENTORCOUNTRY = data;
    //           }
    //         })
    //         return;
    //       }
    //       $scope.productData.INVENTORCOUNTRY = data;
    //     })
    //   }
    // }


    $scope.addToQueueRun = (data, e) => {
      console.log($scope.productData,'=======', e);
      let oid= $scope.productData.productId?$scope.productData.productId:$scope.productData.id
      dsp.postFun('cj/listedproduct/add',[oid], function (data) {
        if(data.data.statusCode=='200'&&data.data.result>0){
          $scope.productData.islist=true;
          $rootScope.$broadcast('queue_data',data.data.result)
        }else{
          layer.msg('Added to Queue successfully.')
        }
      })
    }
    //type:1-添加；2：移除
    $scope.addToQueueFun = (type)=>{
      if($scope.productData.flag == 1){//&&$scope.productData.productType==0 当前是list并且为普通商品时可操作
        if(type==1 && !$scope.productData.islist){
          $scope.addToQueue = true;
        }else{
          $scope.addToQueue = false;
        }
      }
    }
  
    // 图片点击  初步用作商品点击埋点
    $scope.handleImgClcick = (item) => {
      $scope.$emit('productClick', item)
    }
    // 商品点击埋点
    $scope.$on('productClick', (e, item) => {
      window.cjSetInterfereProdId && window.cjSetInterfereProdId(item.categoryId)
    });
  }

})(angular)
