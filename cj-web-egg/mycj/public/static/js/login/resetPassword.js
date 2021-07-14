(function (angular) {
    var app = angular.module('app', ['service', 'cjDotModule']);
    app.controller('resetCtrl', ['$scope', '$http', 'dsp', '$sce', function($scope, $http, dsp, $sce) {
      $scope.inputType1 = 'password';
      $scope.inputType2 = 'password';
      const passReq = /^(?=(.*[A-Za-z]){1,})(?=(.*[\d]){1,})(?=(.*[^\w\s]){1,})(?=(.*[\s]){0,}).{1,}$/;
      $scope.verifyPass = function() {
        if (!$scope.password) {
          $scope.passErrorMsg = $sce.trustAsHtml('! Please input a password.');
          return
        }
        let errMsg = ``;
        if ($scope.password.includes(' ')) {
          errMsg = `! Password can\'t contain any spaces.<br/>`;
        }
        if ($scope.password.length < 8 || $scope.password.length > 15) {
          errMsg = `${errMsg} ! Password must be at least 8-15 characters long.<br/>`;
        }
        if (!(passReq.test($scope.password))) {
          errMsg = `${errMsg} ! Password must contain letters, numbers and special characters.<br/>`;
        }
        $scope.passErrorMsg = $sce.trustAsHtml(errMsg);
        return !$scope.passErrorMsg
      };
  
      $scope.verifyConfirmPass = function() {
        if (!$scope.password) {
          $scope.confirmPassErrorMsg = '! Please input a password.';
        }
        if ($scope.confirmPassword) {
          $scope.confirmPassErrorMsg = $scope.confirmPassword === $scope.password ? '' : '! Two passwords must match.';
        } else {
          $scope.confirmPassErrorMsg = '! Please re-enter the password.';
        }
        return $scope.confirmPassword === $scope.password
      };
      
      $scope.handleChangeType = (type) =>{
        $scope[type] = $scope[type] === 'password' ? 'text' : 'password'
      }
  
      $scope.handleResetPassWord = function() {
        if ($scope.verifyPass() && $scope.verifyConfirmPass()) {
          const parmas = {
            data: JSON.stringify({
              ln: dsp.getQueryString('ln'),
              ek: dsp.getQueryString('ek'),
              passwd: dsp.encryptF($scope.password),
              isEncryption: '1',
              isLazada: '1'
            })
          };
          dsp.postFun('app/account/resetpwd', parmas, ({ data }) => {
            if (data.statusCode === '200') {
              localStorage.getItem('password') && localStorage.removeItem('password');
              window.location = 'passreset-success.html';
            } else if (data.statusCode === '607') {
              layer.msg('New password can‘t be the same as any of the last four passwords.');
            } else if (data.statusCode === '401') {
              layer.msg('Verification code incorrect.');
            }
          });
        }
      };
  
    }]);
})(angular)
