(function (angular) {

    angular.module('commonHeaderLoginModl', ['service'])
            .component('commonheaderLogin', {
                templateUrl: 'static/components/headerandfooters/commonheader-login.html',
                controller: commonHeaderLoginCtrl,
                bindings: {}
            });

    function commonHeaderLoginCtrl($scope, dsp, $rootScope, $sce, $timeout) {
        $scope.isLoginFlag = dsp.isInLoginState();
        dsp.domainData().then((res) => {
            console.log(res)
            // 请求成功的结果
            $scope.iscj = res.iscj;
            if($scope.iscj == '1'){
                //cj
                $scope.logo = './static/image/login/logo_app_login.png';
            }else {
                //客户
                $scope.logo = res.logo2 || './static/image/login/logo_app_login.png';
            }
        })
    }

})(angular);