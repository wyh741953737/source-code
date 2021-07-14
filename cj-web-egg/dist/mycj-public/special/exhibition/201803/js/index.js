(function () {
	var app = angular.module('app',['service']);
	app.controller('appCtrl',['$scope', '$http', '$timeout', '$compile', '$interval', 'dsp', function ($scope, $http, $timeout, $compile, $interval, dsp) {
		$timeout(function () {
			function err (error) {
				dsp.closeLoad();
				console.log(error);
			}

			// var testIp = 'http://192.168.5.243:8082/dsp-server/';
			var testIp = 'http://192.168.5.173:8080/';
			var reqFlag = false;
			var reqUrl1, reqUrl2, reqUrl3;
			if (reqFlag) {
				reqUrl1 = testIp + 'app/employee/getempbynamecj';
				reqUrl2 = testIp + 'pojo/exhibition/add';
				reqUrl3 = testIp + 'pojo/exhibition/validateShop';
			} else {
				reqUrl1 = '../../../' + 'app/employee/getempbynamecj';
				reqUrl2 = '../../../' + 'pojo/exhibition/add';
				reqUrl3 = '../../../' + 'pojo/exhibition/validateShop';
			}

			$scope.isPhoneEnd = dsp.isPhone();

			$scope.submitFace = true;
			// $scope.submitSuccess = true;
			$scope.webphoneType = 'Skype';
			$scope.countDownTime = 5;
			// { headers: { 'token': token }}
			$http.post(reqUrl1, {"data":"{'name':''}"}).then(function (data) {
				var list = JSON.parse(data.data.result).list;
				console.log(list);
				var filterArr = [];
				// console.log(list);
				for (var i = 0; i < list.length; i++) {
					// console.log(list[i].nameEN);
					if (list[i].name == '' || list[i].name == undefined || list[i].name == 'admin') {
						continue;
					}
					filterArr.push(list[i]);
				}
				$scope.salemanlist = filterArr;
				// console.log($scope.salemanlist);
				$scope.salemaninfo = $scope.salemanlist[0].id + '_' + $scope.salemanlist[0].name + '_' + $scope.salemanlist[0].namecn;
			}, err);
			$scope.submit = function () {
				// $scope.inpStoreFlag = true;
				// return;
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
						$scope.inpStoreFlag = true;
						$scope.submitUserId = JSON.parse(data.data.result).info;
					} else {
						layer.msg('The server is busy now, please try again later.');
					}
				}, err);
			}
			$scope.storeTypeList = ['WooCommerce','Shopify'];
			$scope.storeType = $scope.storeTypeList[1];
			$scope.showTypeList = function () {
				$scope.showListFlag = !$scope.showListFlag;
			}
			$scope.storeSuffix = '.myshopify.com';
			$scope.appointType = function (item) {
				if ($scope.storeType != item) {
					$scope.storeType = item;
					$scope.storeName = '';
				}
				if ($scope.storeType == 'Shopify') {
					$scope.storeSuffix = '.myshopify.com';
				} else {
					$scope.storeSuffix = '.com';
				}
				// $scope.storeType = item;
				$scope.showListFlag = false;
			}
			$scope.storeCode = '368098120AD';
			$scope.submitStore = function () {
				if (!$scope.storeName) {
					layer.msg('Please input your store name.');
					angular.element('#store-name').focus();
					return;
				}
				dsp.load();
				$http.post(reqUrl3, JSON.stringify({
					shopname: $scope.storeName,
					shoptype: $scope.storeType,
					id: $scope.submitUserId
				})).then(function (data) {
					dsp.closeLoad();
					console.log(data);
					if (data.data.statusCode == 200) {
						$scope.storeCode = JSON.parse(data.data.result).info;
						$scope.inpStoreFlag = false;
						$scope.storeCodeFlag = true;
						$scope.storeName = '';
						$scope.hasVerifyStore = true;
					} else if (data.data.statusCode == 506) {
						// 店铺不存在，请检查输入是否正确
						layer.msg('The store does not exist. Please check if the input is correct.');
					} else if (data.data.statusCode == 509) {
						// 店铺已经被验证过，请不要重复验证
						layer.msg('The store has been verified, please do not repeat the verification.');
					}else {
						// 服务器错误
						layer.msg('The server is busy now, please try again later.');
					}
				}, err);

				// $scope.inpStoreFlag = false;
				// $scope.storeCodeFlag = true;
			}
			var timer;
			$scope.closePopup = function () {
				$scope.submitFace = false;
				$scope.submitSuccess = true;
				$scope.countDownTime = 5;
				$scope.timer = $interval(function () {
		      $scope.countDownTime--;
		    },1000,5);
		    $scope.timer.then(function () {
		      //时间走完以后页面跳转
		      if ($scope.isPhoneEnd) {
		      	window.location.href = '../../../phone/index.html#/home';
		      	// return;
		      } else {
		      	window.location.reload();
		      }
		    });
			}
			$scope.reVeriftStore = function () {
				$scope.inpStoreFlag=true;
				$interval.cancel($scope.timer);
			}

			$scope.tiaozhuan = function () {
				if ($scope.isPhoneEnd) {
	      	window.location.href = '../../../phone/index.html#/home';
	      } else {
	      	window.location.reload();
	      }
	      return;
			}
	    
	  },0)
	}])
})()