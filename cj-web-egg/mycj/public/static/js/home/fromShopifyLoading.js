(function(Base64) {
  var app = angular.module("fromShopifyLoadingApp", [
    "service",
    "home-service",
    "cjCompnentModule",
    "cjDirectiveModule",
    "CommonHeaderCom",
    "CommonFooterCom",
    "custom-filter",
    "cjDotModule"
  ]);
  // // 创建组件模块
  angular.module("cjCompnentModule", ["utils"]);
  /*新版*/
  app.controller("fromShopifyLoadingController", [
    "$scope",
    "$timeout",
    "$window",
    "dsp",
    "$window",
    "$sce",
    "$rootScope",
    "$location",
    "$anchorScroll",
    "utils",
    function(
      $scope,
      $timeout,
      $watch,
      dsp,
      $window,
      $sce,
      $rootScope,
      $location,
      $anchorScroll,
      utils
    ) {
      const bs = new Base64();
      const shopToken = dsp.getQueryString("shopToken");
      $scope.email = dsp.getQueryString("email");
      $scope.time = 5;
      const timeJump = () => {
        $timeout(() => {
          $scope.time = $scope.time - 1;
          if ($scope.time > 0) {
            timeJump();
          } else {
            location.href = "home.html";
          }
        }, 1000);
      };
      
      if (shopToken) {
        dsp.postFun(
          "app/account/automaticLogin",
          {
            shopToken: shopToken,
          },
          function(data) {
            if (data.data.statusCode == "200") {
              // 保存登录信息
              dsp.saveDataAfterLogin(data.data.result);
              localStorage.setItem("isFirstLogin", "1");
              localStorage.setItem("isEmpower", "2");
              timeJump();
            }
          }
        );
      }
    },
  ]);
})(Base64);
