(function() {
  const app = angular.module('boardsApp', ['service', 'home-service', 'CommonHeaderCom', 'CommonFooterCom', 'utils', 'custom-filter', 'cjCompnentModule', 'cjDotModule']);
  app.controller('boardsController', ['$scope', '$timeout', '$window', 'dsp', '$window', '$sce', '$rootScope', '$location', '$anchorScroll', 'utils', function($scope, $timeout, $watch, dsp, $window, $sce, $rootScope, $location, $anchorScroll, utils) {
    const id = dsp.getQueryString('id');
    
    // 导航距顶部距离
    $scope.navOffsetTop = document.getElementsByClassName('nav-tabs')[0].offsetTop + 40;
    
    // loading 加载动画
    function loadingShow(el, color) {
      $(el).busyLoad('show', {
        color,
        background: 'transparent'
      });
    }
    
    function loadinghide(el) {
      $(el).busyLoad('hide');
    }
    
    // 获取详细数据信息
    function getDataInfo() {
      loadingShow('.board-warp', '#FF7700');
      dsp.postFun('cj/activity/getActivityByIdV2', { id }, ({ data = {} }) => {
        loadinghide('.board-warp');
        if (data.statusCode === '200') {
          const colors = JSON.parse(data.result.v3);
          document.title = data.result.category;
          $scope.floorDatas = data.result.threeNames.map(o => ({ ...o, loadingColor: colors.backColor}));
          setStyles(data.result);
        }
      }, err => {
        console.log(err);
      });
    }
    
    getDataInfo();
    
    function setStyles(data) {
      const colors = JSON.parse(data.v3);
      const headNode = document.getElementsByTagName('head')[0];
      const styleNode = document.createElement('style');
      const styles = `
           .banner {
              background-image: url(${data.activityImgUrl});
            }
            
            .bg-box {
              background-color: ${colors.backColor};
            }
            
            .nav-tabs {
              color: ${colors.allThreeFontColor};
              background-color: ${colors.allThreeBackColor};
            }
            
            .nav-tabs-fixed .nav-tab-box {
              color: ${colors.allThreeFontColor};
              background-color: ${colors.allThreeBackColor};
            }
            
            .nav-tabs .tab:hover, .nav-tabs .tab.active {
              color: ${colors.threeMoveColor};
              transition: all .2s;
            }
            
            .nav-tabs .tab:hover:before, .nav-tabs .tab.active:before {
              background-color: ${colors.threeMoveColor};
              transition: all .2s;
            }
            
            .floor .title {
              color: ${colors.oneThreeFontColor};
              background-color: ${colors.oneThreeBackColor};
            }
            
            .product-card-btn:hover {
              background-color: rgba(71, 147, 222, .1);
            }
            
            .product-card .info .price, .product-card-btn,
            .product-card-hover,
            .product-card .info .tit:hover,
            .product-card .unwishlist:hover::after,
            .product-card .wishlist::after,
            .product-card-add {
              color: ${colors.merchCardColor};
              border-color: ${colors.merchCardColor};
            }
            
            .product-card .listOrsource,
            .product-card .addToQueue {
              background-color: ${colors.merchCardColor};
              border-color: ${colors.merchCardColor};
            }
            
            .product-card .addToQueue:hover,
            .product-card .info .listOrsource:hover:hover,
            .product-card-add .add-icon-bg {
              background-color: ${colors.merchCardColor};
              border-color: ${colors.merchCardColor};
              color: #fff;
            }
      `;
      styleNode.appendChild(document.createTextNode(styles));
      headNode.appendChild(styleNode);
    }
    
    // 楼层渲染完成
    $scope.repeatDone = () => {
      let ids = [];
      $scope.floorDatas.forEach((obj, idx) => {
        loadingShow(`.floor`, obj.loadingColor);
        if (obj.id) {
          ids = [...ids, obj.id];
          getActivityData(obj.id, idx + 1).then(res => obj.productData = res);
        }
      });
      recordView(ids.join(','));
    };
    
    // 获取活动商品数据
    function getActivityData(activityId, idx) {
      return new Promise(resolve => {
        dsp.postFun('cj/activity/getProductList', { activityId }, ({ data = {} }) => {
          loadinghide(`.floor-${idx}`);
          const { result, statusCode } = data;
          statusCode === '200' ? resolve(result.map(obj => Object.assign(obj, {
            flag: '1',
            num: obj.listedCount
          }))) : resolve([]);
        }, err => {
          resolve([]);
        });
      });
    }
    
    // 页面滑动
    document.documentElement.onscroll = document.body.onscroll = (ev) => {
      $scope.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      scrollFloor();
      $scope.$apply();
    };
    
    //页面滑动tab对应楼层
    function scrollFloor() {
      let scrollTop = (document.documentElement.scrollTop || document.body.scrollTop) + 271;
      let floorTop = $scope.floorDatas.map((o, i) => (document.getElementsByClassName(`floor-${i + 1}`)[0].offsetTop));
      //console.log('滑动距离 =====》', scrollTop);
      //console.log(floorTop);
      floorTop.some((o, i) => {
        if (scrollTop < floorTop[1]) {
          $scope.floorNum = 0;
          return true;
        } else if (scrollTop <= floorTop[i + 1] && scrollTop > floorTop[i]) {
          $scope.floorNum = i;
          return true;
        } else if (scrollTop > floorTop[floorTop.length - 1]) {
          //console.log('floorTop.length - 1');
          $scope.floorNum = $scope.floorDatas.length - 1;
          return true;
        }
      });
      $scope.floorDatas.forEach((o, i) => o.flag = false);
      //console.log(`目前处在${$scope.floorNum + 1} L`);
      $scope.floorDatas[$scope.floorNum].flag = true;
    }
    
    // 点击导航跳转到对应楼层
    $scope.jump = (idx) => {
      const st = document.getElementsByClassName(`floor-${idx}`)[0].offsetTop - 270;
      window.scrollTo({
        top: st,
        behavior: 'smooth'
      });
    };
    
    // banner点击后 浏览量埋点
    function recordView(ids) {
      dsp.postFun('cj/activity/activityClickV2', { ids }, function({ data = {} }) {
        const { statusCode } = data;
        if (statusCode === '200') {
          console.log('addView success');
        }
      }, function() {
        console.log('addView failed');
      });
    }
    
    // 商品点击埋点
    $scope.$on('productClick', (e, item) => {
      const { id, activityId } = item;
      dsp.postFun('cj/activity/productClick', { productId: id, activityId }, function({ data = {} }) {
        const { statusCode } = data;
        if (statusCode == '200') {
          console.log('addGoodsDetailView success');
        }
      }, function() {
        console.log('addGoodsDetailView failed');
      });
    });
    
  }]);
  // 页面商品渲染完毕执行
  app.directive('repeatFinish', function() {
    return {
      link: function(scope, element, attr) {
        if (scope.$last) {
          scope.$eval(attr.repeatFinish);
        }
      }
    };
  });
})();
