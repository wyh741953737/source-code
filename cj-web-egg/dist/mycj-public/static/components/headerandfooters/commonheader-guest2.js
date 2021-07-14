(function (angular) {

    angular.module('commonHeaderGuestModl2', ['service'])
            .component('commonheaderGuest2', {
                templateUrl: 'static/components/headerandfooters/commonheader-guest2.html',
                controller: commonHeaderGuestCtrl2,
                bindings: {}
            });

    function commonHeaderGuestCtrl2($scope, dsp, $rootScope, $sce, $timeout) {
        $scope.isLoginFlag = dsp.isInLoginState();
        $scope.phUserInfoFlag = false;
        $scope.showListFun = function () {
            $scope.phUserInfoFlag = !$scope.phUserInfoFlag;
        }
        var saleman = dsp.getQueryString('ma');
        console.log(saleman)
        $scope.saleman = saleman;
        dsp.domainData().then((res) => {
            // 请求成功的结果
            $scope.iscj = res.iscj;
            if ($scope.iscj == '1') {
                //cj
                $scope.logo = '/egg/image/new_logo.svg';
            } else {
                //客户
                $scope.logo = res.logo2 || '/egg/image/new_logo.svg';
            }
        })
    }

})(angular);