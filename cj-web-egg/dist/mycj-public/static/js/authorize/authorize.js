(function(angular){
    var module = angular.module('second-auth',['service', 'mfaverifyModule','commonFooterLoginModl']);//创建一个模块
    module.controller('mfaAuthorizeController',['$scope','dsp','$http',function($scope,dsp,$http){
        $scope.shortTitle = 'MFA Verification'
        $scope.shortDescPrefix = 'Hi '
        // $scope.shortDescSpecial = '###'
        $scope.shortDescSuffix = ', your account is in security. Please follow the tips.'
        $scope.showQrFlag = false
        $scope.buttonName = 'Next'
        dsp.addChatWindow()
        const thirdLoginTempData = JSON.parse(localStorage.getItem('thirdLoginTempData') || '{}')
        $scope.thirdLoginParams = thirdLoginTempData.thirdLoginParams ? thirdLoginTempData.thirdLoginParams : { // 第三方登录id
            facebookId: '', // 第三方登录的facebookId
            googleId: '', // 第三方登录的googleId
        }
    }])
})(angular)
