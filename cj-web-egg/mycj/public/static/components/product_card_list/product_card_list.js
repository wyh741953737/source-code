(function (angular) {
  const app = angular.module('cjCompnentModule')
    .component('productCardList', {
      templateUrl: './static/components/product_card_list/product_card_list.html',
      controller: ['$scope', 'dsp', 'cjhome', '$rootScope', '$timeout', 'utils',  function ($scope, dsp, cjhome, $rootScope ,$timeout, utils) {
        this.$onInit = function () {
          cardList.call(this, $scope, dsp, cjhome, $rootScope ,$timeout, utils);
        };
      }],
      bindings: {
        productlist: '=',
        isaddcartbtn: '=',
        addCartFun: '=',
        purchaseListIn: '=',
      }
    })
  function cardList($scope) {
    const $this = this
    $scope.isBackTopShow = false
    $scope.productlist = $this.productlist
    $scope.isaddcartbtn = $this.isaddcartbtn
    $scope.addCartFun = $this.addCartFun
    $scope.purchaseListIn = $this.purchaseListIn
    $scope.isObserve = true
    $scope.footerShow = true
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        // 这段逻辑，是每一个被观察的组件进入视窗时都会触发的
        if (entry.isIntersecting) {
          if (entry.target.getAttribute('id') == 'card-list-footer') {
            $scope.footerShow = false // 先取消监听，防止多次触发
            const msgLoading = cjMessage.loading({ popupContainerDom: document.querySelector('#card-list-loading') })
            $scope.$emit('prodCardList-fa', msgLoading);
          }
        }
      })
    }, {
      root: null, // 默认根节点是视口
      rootMargin: '0px',
      threshold: 0.7 // 全部进入视口才被观察  这个阈值介于0和1之间
    })
    $scope.$on('repeatCardListCallback', function (args) {
      if ($scope.isObserve) {
        $scope.isObserve = false
        observer.observe(document.querySelector('#card-list-footer'))
      }
      $scope.footerShow = true // 恢复监听
    });
    $scope.$on('prodCardList-data', function (d, data) {
      $scope.productlist = data.data || []
    });
    const scrollDom = document.querySelector('#router-outlet-wrap')
    $(scrollDom).scroll(() => {
      const scrollTop = scrollDom?.scrollTop || 0
      const clientHeight = scrollDom?.clientHeight || 0
      if (scrollTop <= clientHeight) { // 滚动大于一屏，出现返回顶部按钮
        document.querySelector('.new-product-card-box .backTop').style.display = 'none'
      } else {
        document.querySelector('.new-product-card-box .backTop').style.display = 'flex'
      }
    });

    $scope.backTop = function() {
      document.querySelector(".right-content").scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
  app.directive('repeatCardList', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, elem, attr) {
        //当前循环至最后一个
        if (scope.$last === true) {
          $timeout(function () {
            //向父控制器传递事件消息
            scope.$emit('repeatCardListCallback');
          }, 100);
        }
      }
    }
  });
})(angular)
