(function(angular){
    var module = angular.module('second-auth',['service', 'mfaverifyModule','commonFooterLoginModl']);//创建一个模块
    module.controller('mfaBindController',['$scope','dsp','$http',function($scope,dsp,$http){
        $scope.shortTitle = 'Link MFA'
        $scope.shortDescPrefix = 'Security Token Verification '
        // $scope.shortDescSpecial = '###'
        $scope.shortDescSuffix = ', please follow the steps.'
        $scope.showQrFlag = true
        $scope.buttonName = 'Link Now'
    }])
})(angular)
