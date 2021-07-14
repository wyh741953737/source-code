(function (angular) {

  angular.module('commonHeaderGuestModl', ['service'])
            .component('commonheaderGuest', {
              templateUrl: 'static/components/headerandfooters/commonheader-guest.html',
              controller: commonHeaderGuestCtrl,
                bindings: {
                }
            });

  function commonHeaderGuestCtrl($scope, dsp, $rootScope, $sce,$timeout) {
    $scope.isLoginFlag = dsp.isInLoginState();
      //----------------------
      dsp.domainData().then((res) => {
          // 请求成功的结果
          $scope.iscj = res.iscj;
          if($scope.iscj == '1'){
              //cj
              $scope.logo = 'static/image/public-img/logo_app.png';
              $scope.websiteName = 'CJ Home';

          }else {
              //客户
              $scope.logo = res.logo2 || 'static/image/public-img/logo_app.png';
              $scope.websiteName = res.websiteName ? res.websiteName + ' Home' : 'CJ Home';
          }
      })
      //-----------------------
  }

})(angular);