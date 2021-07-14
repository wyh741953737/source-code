(function () {
	var app = angular.module('page404', ["service", 'commonHeaderGuestModl', 'cjDotModule']);
    //执行完毕执行
	app.controller('404Ctrl', ['$scope','dsp','$http','$interval',function($scope,dsp,$http,$interval) {
		console.log("404Ctrl");
        dsp.domainData().then((res) => {
            // 请求成功的结果
            console.log(res)
            $scope.iscj = res.iscj;
            if($scope.iscj == '1'){
                //cj
                $scope.icon = '/favicon.ico';
            }else {
                //客户
                $scope.icon = res.logo1 || '/favicon.ico';
                $('link[rel$=icon]').replaceWith('');
                $('head').append($('<link rel="shortcut icon"/>').attr('href', $scope.icon ));
            }
        })
		//判断有没有登陆
		console.log(dsp.isInLoginState());
		var bs = new Base64();
	    $scope.loginName = localStorage.getItem('firstName') == undefined ? "" :bs.decode(localStorage.getItem('firstName'));
		if(dsp.isInLoginState() == false){//没有登陆
			$scope.hasLogin = false;
		}else{//登陆过的
			$scope.name = $scope.loginName;
			$scope.hasLogin = true;
		}
		$scope.fromPage = dsp.getQueryString('from') || 'home.html';
		$scope.time = 5;
		var timer = $interval(function(){
			$scope.time--;
		},1000,5);
		timer.then(function(){
			window.location = 'home.html';
		})
    }])
})()

