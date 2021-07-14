(function () {
	const app = angular.module('boardApp', ['service', 'home-service', 'CommonHeaderCom', 'CommonFooterCom', 'utils', 'custom-filter', 'cjCompnentModule', 'cjDotModule']);
	app.controller('boardController', ['$scope', '$timeout', '$window', 'dsp', '$window', '$sce', '$rootScope', '$location', '$anchorScroll', 'utils', function ($scope, $timeout, $watch, dsp, $window, $sce, $rootScope, $location, $anchorScroll, utils) {
    $scope.theme = dsp.getQueryString('theme') || 't1';
    const linkNode = document.createElement('link');
    linkNode.setAttribute('rel', 'stylesheet');
    linkNode.setAttribute('type', 'text/css');
    linkNode.setAttribute('href', `static/activity/board/css/theme-${$scope.theme}.css`);
    document.head.appendChild(linkNode);
    
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
    
    // 主题数据
    const dataArr = {
      t1: [
        {
          id: 43,
          title: 'Phone Cases',
          loadingColor: '#061346',
          productData: [],
          flag: false
        },
        {
          id: 44,
          title: 'Phone Holders',
          loadingColor: '#061346',
          productData: [],
          flag: false
        },
        {
          id: 45,
          title: 'Phone Charger & Cable',
          loadingColor: '#061346',
          productData: [],
          flag: false
        },
        {
          id: 46,
          title: 'Power Bank',
          loadingColor: '#061346',
          productData: [],
          flag: false
        },
        {
          id: '',
          title: 'More To Love',
          loadingColor: '#061346',
          productData: [],
          flag: false
        }
      ],
      t2: [
        {
          id: 52,
          title: 'Lighting',
          loadingColor: '#5695A5',
          productData: [],
          flag: false
        },
        {
          id: 53,
          title: 'Cleaning Tools',
          loadingColor: '#5695A5',
          productData: [],
          flag: false
        },
        {
          id: 54,
          title: 'Kitchen Gadgets',
          loadingColor: '#5695A5',
          productData: [],
          flag: false
        },
        {
          id: 55,
          title: 'You May Like',
          loadingColor: '#5695A5',
          productData: [],
          flag: false
        },
        {
          id: '',
          title: 'More To Love',
          loadingColor: '#5695A5',
          productData: [],
          flag: false
        }
      ],
      t3: [
        {
          id: 59,
          title: 'Fashion Bags',
          loadingColor: '#27ADDC',
          productData: [],
          flag: false
        },
        {
          id: 60,
          title: 'Backpacks',
          loadingColor: '#27ADDC',
          productData: [],
          flag: false
        },
        {
          id: 61,
          title: 'Fashion Shoes',
          loadingColor: '#27ADDC',
          productData: [],
          flag: false
        },
        {
          id: 62,
          title: 'Footwear Accessories',
          loadingColor: '#27ADDC',
          productData: [],
          flag: false
        },
        {
          id: '',
          title: 'More To Love',
          loadingColor: '#5695A5',
          productData: [],
          flag: false
        }
      ],
      t4: [
        {
          id: 47,
          title: 'Cycling',
          loadingColor: '#EC7E43',
          productData: [],
          flag: false
        },
        {
          id: 48,
          title: 'Fishing',
          loadingColor: '#EC7E43',
          productData: [],
          flag: false
        },
        {
          id: 49,
          title: 'Camping & Hiking',
          loadingColor: '#EC7E43',
          productData: [],
          flag: false
        },
        {
          id: '',
          title: 'More To Love',
          loadingColor: '#EC7E43',
          productData: [],
          flag: false
        }
      ],
      t5: [
        {
          id: 56,
          title: 'Mother & Baby Items',
          loadingColor: '#F38531',
          productData: [],
          flag: false
        },
        {
          id: 57,
          title: 'Toys',
          loadingColor: '#F38531',
          productData: [],
          flag: false
        },
        {
          id: 58,
          title: 'Baby Wears',
          loadingColor: '#F38531',
          productData: [],
          flag: false
        },
        {
          id: '',
          title: 'More To Love',
          loadingColor: '#F38531',
          productData: [],
          flag: false
        },
      ],
      t6: [
        {
          id: 50,
          title: 'Dog Supplies',
          loadingColor: '#266059',
          productData: [],
          flag: false
        },
        {
          id: 51,
          title: 'Cat Supplies',
          loadingColor: '#266059',
          productData: [],
          flag: false
        },
        {
          id: '',
          title: 'More To Love',
          loadingColor: '#266059',
          productData: [],
          flag: false
        }
      ]
    };
    
    const domTitle = {
      t1: 'Phone Accessories',
      t2: 'Home',
      t3: 'Bags & Shoes',
      t4: 'Outdoors',
      t5: 'Baby Items',
      t6: 'Pet Supplies'
    };
    
    document.title = domTitle[$scope.theme]
    
    // 当前主题数据
    $scope.activityData = dataArr[$scope.theme];
    
    // 楼层渲染完成
    $scope.repeatDone = () => {
      let ids = [];
      $scope.activityData.forEach((obj, idx) => {
        loadingShow(`.floor`, obj.loadingColor);
        if (obj.id) {
          ids = [...ids, obj.id];
          getActivityData(obj.id, idx + 1).then(res => obj.productData = res);
        } else {
          const parmas = {
            activityId: ids.join(','),
            pageNum: 1,
            pageSize: 30
          };
          getRecommendData(parmas, idx + 1).then(res => obj.productData = res);
        }
      });
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
    
    // 获取推荐商品数据
    function getRecommendData(parmas, idx) {
      console.log(idx);
      return new Promise(resolve => {
        dsp.postFun('cj/activity/tuiJianShangPin', parmas, ({ data = {} }) => {
          loadinghide(`.floor-${idx}`);
          const { result, statusCode } = data;
          statusCode === '200' ? resolve(result.rows.map(obj => Object.assign(obj, {
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
      let floorTop = $scope.activityData.map((o, i) => (document.getElementsByClassName(`floor-${i + 1}`)[0].offsetTop));
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
          $scope.floorNum = $scope.activityData.length - 1;
          return true;
        }
      });
      $scope.activityData.forEach((o, i) => o.flag = false);
      //console.log(`目前处在${$scope.floorNum + 1} L`);
      $scope.activityData[$scope.floorNum].flag = true;
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
    
    recordView($scope.activityData.map(item => item.id).filter(i => i).join(','));
    
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
})()
