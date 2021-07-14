(function (angular) {
	const app = angular.module('partnership-success-app', ['service', 'home-service', 'CommonHeaderCom', 'CommonFooterCom', 'utils', 'custom-filter', 'cjCompnentModule', 'cjDotModule']);
	app.controller('partnershipSuccessController', ['$scope', '$timeout', '$window', 'dsp', '$window', '$sce', '$rootScope', '$location', '$anchorScroll', 'utils', function ($scope, $timeout, $watch, dsp, $window, $sce, $rootScope, $location, $anchorScroll, utils) {

    $scope.handleComfirm = () =>{
      location.href = 'home.html';
    }

    $scope.handleApply = () =>{
      location.href = 'partnership-add.html';
    }
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
})(angular)
