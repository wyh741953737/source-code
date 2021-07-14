(function (angular) {
	var app = angular.module('app', ['service', 'cjDotModule']);
	app.controller('passResetSuccessCtrl',['$scope','$http', '$interval','dsp',function ($scope,$http,$interval,dsp) {
	  $scope.countDownTime = 5;
		var timer = $interval(function () {
			$scope.countDownTime--;
		},1000,5);
		timer.then(function () {
			//时间走完以后页面跳转
			window.location = 'login.html';
		})
	}])
})(angular)
