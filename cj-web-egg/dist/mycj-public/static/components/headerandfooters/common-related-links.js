(function (angular) {
  angular.module('commonRelatedLinks', [])
    .component('relatedLinks', {
      templateUrl: 'static/components/headerandfooters/common-related-links.html',
      controller: thisController,
      bindings: {
        vinfo: '=',
        onLog: '&',
        showWorkOrder: '&',
        productType: '<'
      }
    });

  function thisController($scope, dsp, utils) {
    $scope.hasLogin = dsp.isInLoginState();//是否登录
    $scope.hasTempName = dsp.getCookie('asj_temchatname') ? true : false //是否含有临时账号
    $scope.productType = this.productType; // productType: 4是供应商代发货商品，5是供应商自发货商品
    const supplyArr = ['4','5']; // 4是供应商代发货商品，5是供应商自发货商品
    $scope.isSupply = false; 
    this.$onChanges = (data)=>{
      if(data.productType){
        $scope.productType = data.productType.currentValue
        $scope.isSupply = supplyArr.includes($scope.productType); // 判断当前是否为供应商商品 
      }
    }
    //订阅
    $scope.subscribe = () => {
      window.postMessage({ flag: "openSubscribe", }, "*")
    };
    //判断是否登录
    $scope.checkUrlIsLogin = (url) => {
      if (utils.checkLogin()) {
        return url;
      } else {
        return `/login.html?target=${utils.base64.encode(url)}`;
      }
    }
  }
})(angular);