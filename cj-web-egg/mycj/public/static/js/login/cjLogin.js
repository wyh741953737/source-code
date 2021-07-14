(function (angular, Base64) {
	var app = angular.module('app', ['service', 'commonHeaderLoginModl', 'commonFooterLoginModl']);
	app.controller('cjLoginCtrl',['$scope', '$http', '$timeout', 'dsp', function($scope, $http, $timeout, dsp) {
			
			var b = new Base64();

			// 检测是否有tarket查询字符串
			var target = dsp.getQueryString('target');
			if (target) {
				target = b.decode(target);
			}
			console.log(target);

	    $scope.userName = b.decode(localStorage.getItem('loginName') || '') || "";
	    $scope.passWord = b.decode(localStorage.getItem('password') || '') || "";
	    $scope.remberPass = localStorage.getItem('isRememberPassword') === '1' ? true : false;
	    $scope.loginError = true;
	    $scope.loginErrorMsg = '';
	    var fromUrlArr = document.referrer.split('/');
	    var fromPage = fromUrlArr[fromUrlArr.length - 1]
	    // console.log(fromUrlArr[fromUrlArr.length - 1]);
	    // 登录函数
	    $scope.login = function () {
	    	if ($scope.userName != '' && $scope.passWord != '') {
					dsp.login({
						name: $scope.userName,
						passwd: $scope.passWord,
						chatType: "0",
						platform: 'pc'
					}, function (data) {
						console.log(data);
						var data = data.data;
						var code = data.statusCode;
						if (code != 200) {
							localStorage.clear();
							if (code == 503 || code == 502) {
								$scope.loginError = true;
								$scope.loginErrorMsg = 'User name or password error';
								$timeout(function () {
									$scope.loginErrorMsg = '';
								}, 2000);
							} else if (code == 520) {
								layer.msg('Sorry, There is something wrong with your profile, you can not login at the moment.');
							} else if (code == 518) {
								$scope.loginError = true;
								$scope.loginErrorMsg = 'Your email has not been verified. Please verify or log in with your username!';
								$timeout(function () {
									$scope.loginErrorMsg = '';
								}, 2000);
							} else if (code == 519) {
								layer.msg('Unfortunately, Your account had been blocked, please contact CJ support or your agent.')
							} else {
								layer.msg('The server is busy now, please try again later.');
							}

						} else { // 登录成功
							$scope.loginError = false;
							dsp.saveDataAfterLogin(data.result);
							if ($scope.remberPass) {
								localStorage.setItem('password', b.encode($scope.passWord));
								localStorage.setItem('isRememberPassword', '1');
							} else {
								localStorage.removeItem('password');
								localStorage.setItem('isRememberPassword', '0');
							}
							console.log('login success');
							if ($scope.target) {
								location.href = $scope.target;
								return;
							}
							if (fromPage.indexOf('list-detail.html') != -1 || fromPage.indexOf('reptail-detail.html') != -1 || fromPage.indexOf('product-detail.html') != -1) {
								location.href = fromPage;
								return;
							}
							location.href = 'home.html';
						}
					})
	    	} else {
	    		$scope.loginError = true;
	    		$scope.loginErrorMsg = 'User name or password must be input';
	    		$timeout(function () {
	    			$scope.loginError = false;
	    		}, 3000);
	    		return false;
	    	}
	    	
	    }
	    $scope.remberPass = true;
	    // 记住密码
	    $scope.isCheck = function () {
	    	$scope.remberPass = !$scope.remberPass;
	    	  	
	    }
		$scope.keyDown=function(Event){
	    	if(Event.keyCode==13){
	    		$scope.login();
	    	}
	    }
	}]);

	
})(angular, Base64)



