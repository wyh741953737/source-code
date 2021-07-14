(function (angular) {
    angular.module('CommonFooterCom', [])
            .component('commonFooter', {
                templateUrl: 'static/components/headerandfooters/common-footer.html',
                controller: CommonFooterCtrl,
                bindings: {
                    vinfo: '=',
                    onLog: '&',
                    showWorkOrder: '&'
                }
            });

    function CommonFooterCtrl($scope,dsp) {
      $scope.year = new Date().getFullYear();
      //dsp.domainData().then((res) => {
      //    // 请求成功的结果
      //    $scope.iscj = res.iscj;
      //    if ($scope.iscj == '1') {
      //        //cj
      //        $scope.useLink = 'https://cjdropshipping.com/term-of-use/';
      //        $scope.policyLink = 'https://cjdropshipping.com/privacy-policy/';
      //        $scope.isuseLink = true;
      //        $scope.ispolicyLink = true;
      //    } else {
      //        //客户
      //        $scope.useLink = 'termsOfuse.html';
      //        $scope.policyLink = 'privacyPolicy.html';
      //        $scope.isuseLink = res.termUse ;
      //        $scope.ispolicyLink = res.privacyPolicy;
      //    }
      //})
    }
})(angular);