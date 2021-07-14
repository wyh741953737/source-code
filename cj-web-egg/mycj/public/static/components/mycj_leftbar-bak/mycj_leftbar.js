; (function (angular) {
  angular.module('cjCompnentModule')
    .component('mycjLeftbar', {
      templateUrl: '/static/components/mycj_leftbar/mycj_leftbar.html',
      controller: ['$rootScope', '$scope', '$state', '$http', mycjLeftbarCtrl],
      bindings: { }
    });

  function mycjLeftbarCtrl($rootScope, $scope, $state, $http) {
    $scope.isShow = true;
    $scope.vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
    $scope.navArr = [];
    $scope.navAll = {};
    $scope.currentUrlName = null;
    watchRouterChange($scope, $state);
    $http.get('/static/components/mycj_leftbar/leftbar.json').then(function (data) {
      // console.log('导航列表 ->', data.data);
      $scope.navAll = data.data;
      matchRouter($scope);
    }.bind(this));

    $scope.hideFun = function () {
      $scope.isShow = false;
      angular.element(".mycj-left-bar").css({
        "transition": "0.5s"
      });
      angular.element(".mycj-right-wrap").css({
        "transition": "0.5s"
      });
      //droshipping center模块布局不同
      angular.element(".direct-right").css("transition", "0.5s");
      angular.element(".d-direct-right").css("transition", "0.5s");
      angular.element(".aftersale-right").css("transition", "0.5s");
      leftBarLight("leftbar-light");
      $rootScope.leftbarLight = true;
    }
    $scope.showFun = function () {
      $scope.isShow = true;
      angular.element(".mycj-left-bar").css({
        "transition": "0.5s"
      });
      showLeftBar("leftbar-light");
      $rootScope.leftbarLight = false;
    }
    if ($rootScope.leftbarLight) {
      leftBarLight("leftbar-light");
    } else {
      showLeftBar("leftbar-light");
    };

    function leftBarLight(ele) { //简化左侧菜单栏
      angular.element(".mycj-right-wrap").addClass(ele);
      //droshipping center模块布局不同
      angular.element(".direct-right").addClass(ele);
      angular.element(".d-direct-right").addClass(ele);
      angular.element(".aftersale-right").addClass(ele);
      $scope.$emit('leftbar-light', true);
      $scope.isShow = false;
    }

    function showLeftBar(ele) { //取消简化左侧菜单栏
      // angular.element(".mycj-left-bar").removeClass("leftbar-light");
      angular.element(".mycj-right-wrap").removeClass(ele);
      //droshipping center模块布局不同
      angular.element(".direct-right").removeClass(ele);
      angular.element(".d-direct-right").removeClass(ele);
      angular.element(".aftersale-right").removeClass(ele);
      $scope.$emit('leftbar-light', false);
      $scope.isShow = true;
    }
    // })
  }

  // https://stackoverflow.com/questions/21867569/how-to-watch-state-change-of-stateprovider-in-angularjs
  function watchRouterChange($scope, $state) {
    $scope.$watch(function() {
      return $state.$current.data;
    }, function (newVal, oldVal) {
      $scope.currentUrlName = typeof newVal === 'object' ? newVal.name : null;
      matchRouter($scope);
    }); 
  }

  function matchRouter($scope) {
    Object.keys($scope.navAll).forEach(function (key, idx) {
      const item = $scope.navAll[key];
      item.forEach(function (nav) {
        if (nav.name === $scope.currentUrlName) {
          $scope.navArr = item;
        }
      });
    });
    $scope.navArr = $scope.navArr.map(function (nav) {
      return Object.assign(nav,
        { active: nav.name === $scope.currentUrlName }); // 左側bar高亮
    });
  }
})(angular)