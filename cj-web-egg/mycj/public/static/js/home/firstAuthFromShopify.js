

(function(Base64) {
  var app = angular.module("firstAuthFromShopifyApp", [
    "service",
    "home-service",
    "cjCompnentModule",
    "cjDirectiveModule",
    "CommonHeaderCom",
    "CommonFooterCom",
    "custom-filter",
    'cjDotModule'
  ]);
  // // 创建组件模块
  angular.module("cjCompnentModule", ["utils"]);
  /*新版*/
  app.controller("firstAuthFromShopifController", [
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
      const shop = dsp.getQueryString("shop");
      const code = dsp.getQueryString("code");
      const state = dsp.getQueryString("state");
      const shopToken = dsp.getQueryString("shopToken");
      const hmac = dsp.getQueryString("hmac");
      const timestamp = dsp.getQueryString("timestamp")


      if (state === 'cjdropshipping'&& shopToken) {
        location.href=`fromShopifyLoading.html?shopToken=${shopToken}`;
        return;
      }

      /* 判断pc/phone端 */
      if (dsp.isPhone(true)) return;
      //-----------------------------------------------------------------------------------
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      if (!!token && !!email) {
        //判断cj是否已有账号登录 同时判断是否有邮箱
        $scope.email = bs.decode(email);
      }
      $scope.notLogin = false

      if (!! state && !!shop && !!code) {
        //根据从shopify过来url中参数去拿具体的信息 做下一步处理
        const params = {
          shopName: shop,   //店铺名称
          code,             //编号 也是shopify 用来换授权token的参数
          state,            //ebay回参 也是shopify的请求标识
          hmac,             //shopify 加密后参数
          message : `code=${code}&shop=${shop}&state=${state}&timestamp=${timestamp}`       //shopify 验证请求正确性
        };
        $scope.isLoading = true;
        dsp.postFun("platform-shop/authorize/authorizeShopIfy", params, function(res) {
          const { data: resData } = res;
          if (resData.code === 200) {
            /*resData.data.code对应4种状态:
              1.YET_LOGIN, 已授权过账号,已登录
              2.NOT_LOGIN, 已授权过账号,未登录
              3.NOT_AUTHORIZE_YETLOGIN, 未授权过账号,已登录
              4.NOT_AUTHORIZELOGIN, 未授权过账号,未登录
            */
            if (resData.data.code == 'NOT_LOGIN') {
              $scope.notLogin = true
            }
            $scope.shopName = shop;
            $scope.shopId = resData.data.shopId;
            //判断shopify绑定店铺邮箱是否在cj有对应的账户, 如果有的话就赋值给$scope.existEmail
            if(resData.data.isItConsistent && resData.data.email) {
              $scope.existEmail = resData.data.email;
            }
            $scope.isLoading = false;
          } else {
            location.href = `welcome.html?from=authorize&result=0&shopName=${$scope.shopName}`
          }
        });
      }

      // 从授权跳到登录页
      $scope.jumpSignIn = function() {
        window.location.href = `login.html?from=shopifyNeedAuth&shopId=${$scope.shopId}&shopName=${$scope.shopName}`;
      };

      $scope.jumpRegisterAndAuth = function() {
        window.location.href = `register.html?from=shopifyNeedAuth&shopId=${$scope.shopId}&shopName=${$scope.shopName}`;
      };

      $scope.jumpLoginAndAuth = function(email) {
        window.location.href = `login.html?from=shopifyNeedAuth&email=${email}&shopId=${$scope.shopId}&shopName=${$scope.shopName}`;
      }

      $scope.buildConnect = function() {
        const params = {
          email: $scope.email,
          shopId: $scope.shopId
        }
        dsp.postFun("platform-shop/authorize/saveAccount", params, function(res) {
          const { data: resData } = res;
          if (resData.code === 200) {
            try {
              dsp.postFun(
              "app/shop/upShopIndividuationNum",
              { ID: $scope.shopId })
              dsp.postFun(
              "platform-product/product/pullShopProduct",
              { ID: $scope.shopId })
            } catch (error) {
              console.log(error)
            }
            location.href = 'welcome.html?from=authorize&result=1'
          } else {
            location.href = `welcome.html?from=authorize&result=0&shopName=${$scope.shopName}`
          }
        })
      } 
    }   
  ]);
})(Base64);
