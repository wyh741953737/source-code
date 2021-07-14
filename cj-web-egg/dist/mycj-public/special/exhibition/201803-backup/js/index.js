(function () {
	var app = angular.module('app',['service']);
	app.controller('appCtrl',['$scope', '$http', '$timeout', '$compile', '$interval', 'dsp', function ($scope, $http, $timeout, $compile, $interval, dsp) {
		$timeout(function () {
			function err (error) {
				dsp.closeLoad();
				console.log(error);
			}

			var testIp = 'http://192.168.5.243:8097/dsp_server/';
			var reqFlag = false;
			var reqUrl1, reqUrl2;
			if (reqFlag) {
				reqUrl1 = testIp + 'app/employee/getempbyname';
				reqUrl2 = testIp + 'pojo/exhibition/add';
			} else {
				reqUrl1 = '../../../' + 'app/employee/getempbyname';
				reqUrl2 = '../../../' + 'pojo/exhibition/add';
			}

			$scope.isPhoneEnd = dsp.isPhone();

			$scope.submitFace = true;
			// $scope.submitSuccess = true;
			$scope.webphoneType = 'Skype';
			$scope.countDownTime = 5;
			// { headers: { 'token': token }}
			$http.post(reqUrl1, {"data":"{'name':''}"}).then(function (data) {
				console.log(data);
				var list = JSON.parse(data.data.result).list;
				var filterArr = [];
				// console.log(list);
				for (var i = 0; i < list.length; i++) {
					// console.log(list[i].nameEN);
					if (list[i].nameEN == '' || list[i].nameEN == undefined || list[i].nameEN == 'admin') {
						continue;
					}
					filterArr.push(list[i]);
				}
				$scope.salemanlist = filterArr;
				// console.log($scope.salemanlist);
				$scope.salemaninfo = $scope.salemanlist[0].ID + '_' + $scope.salemanlist[0].nameEN + '_' + $scope.salemanlist[0].NAME;
			}, err);
			$scope.submit = function () {
				// alert(1)
				if (!$scope.firstname) {
					layer.msg('Please input your first name.');
					$('#firstname').focus();
					return;
				}
				if (!$scope.lastname) {
					layer.msg('Please input your last name.');
					$('#lastname').focus();
					return;
				}
				if (!$scope.email) {
					layer.msg('Please input your email address.');
					$('#email').focus();
					return;
				} else if (!dsp.isEmail($scope.email)) {
						layer.msg('Please input a correct email address.');
						$('#email').focus();
						return;
				}
				if (!$scope.webphoneNum) {
					layer.msg('Please input your social media account.');
					$('#webphoneNum').focus();
					return;
				} else if ($scope.webphoneType == 'Whatsapp') {
					 // /^[0-9\+]\d*$/
					 if (!/^[0-9\+]\d*$/.test($scope.webphoneNum)) {
					 		layer.msg('Please input a correct account.');
							$('#webphoneNum').focus();
							return;
					 }
				}
				// /pojo/exhibition/add   post   {firstName,lastName,email,contact,operatorId,operatorName,operatornameEn}
				var sendData = {};
				sendData.firstName = $scope.firstname;
				sendData.lastName = $scope.lastname;
				sendData.email = $scope.email;
				sendData.email = $scope.email;
				// var contact = {};
				// contact[$scope.webphoneType] = $scope.webphoneNum;
				sendData.contactType = $scope.webphoneType;
				sendData.contact = $scope.webphoneNum;
				var saleman = $scope.salemaninfo.split('_');
				sendData.operatorId = saleman[0];
				sendData.operatorName = saleman[2];
				sendData.operatornameEn = saleman[1];
				sendData = JSON.stringify(sendData);
				console.log(sendData);
				dsp.load();
				$http.post(reqUrl2, sendData).then(function (data) {
					dsp.closeLoad();
					console.log(data);
					if (data.data.statusCode == 200) {
						$scope.submitFace = false;
						$scope.submitSuccess = true;
						$scope.countDownTime = 5;
						var timer = $interval(function () {
				      $scope.countDownTime--;
				    },1000,5);
				    timer.then(function () {
				      //时间走完以后页面跳转
				      // window.location = 'home.html';
				      if ($scope.isPhoneEnd) {
				      	window.location.href = 'https://app.cjdropshipping.com/phone/index.html#/home';
				      	return;
				      }
				      $scope.submitFace = true;
				      $scope.submitSuccess = false;
				      $scope.firstname = '';
				      $scope.lastname = '';
				      $scope.email = '';
				      $scope.webphoneType = 'Skype';
				      $scope.webphoneNum = '';
				      $scope.salemaninfo = $scope.salemanlist[0].ID + '_' + $scope.salemanlist[0].nameEN + '_' + $scope.salemanlist[0].NAME;
				    });
						// layer.msg('Thanks, We will get back to you ASAP. Hope we will work together for a long time :)');
					}
				}, err);
			}

			$scope.tiaozhuan = function () {
				if ($scope.isPhoneEnd) {
	      	window.location.href = 'https://app.cjdropshipping.com/phone/index.html#/home';
	      	return;
	      }
	      $scope.submitFace = true;
	      $scope.submitSuccess = false;
	      $scope.firstname = '';
	      $scope.lastname = '';
	      $scope.email = '';
	      $scope.webphoneType = 'Skype';
	      $scope.webphoneNum = '';
	      $scope.salemaninfo = $scope.salemanlist[0].ID + '_' + $scope.salemanlist[0].nameEN + '_' + $scope.salemanlist[0].NAME;
			}
	    
	  },0)
	}])
})()