(function () {
	var app = angular.module('imp-refund-app',['service']);
	app.controller('imp-refund-control',['$scope','dsp',function ($scope,dsp) {
		// var $navLis = $('.header-nav li');
		// $navLis.eq(1).css('border-bottom','2px solid #f88f29');
		var pageH = $(window).height()-171;
		var docH = $(document).height();
		
		$('.directorders-wrap').css({
		  'min-height': $(window).height() * 1 + 'px'
		});
		$('.direct-right').css({
		  'min-height': $(window).height() * 1 + 'px'
		});
		$scope.dataFound = false;
		//左侧导航栏的样式
		var vip=localStorage.getItem('vip')==undefined?"":localStorage.getItem('vip');
		if(vip=='1'){//vipFlag
			$('.header-nav').addClass('vipFlag');
			$('.left-nav').addClass('vipFlag');
			$('.direct-right').css('background','#F0EDE7');
		}else{
			$('.header-nav').removeClass('vipFlag');
			$('.left-nav').removeClass('vipFlag');
			$('.direct-right').css('background','#f2f3f5');
		}
		$('.header-nav li').eq(1).addClass('active');
		$('.direct-leftbara').click(function () {
			$('.direct-leftbara').css('background-image','');
			$(this).css('background-image','linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
		})
		//给导航栏的待处理订单添加样式
		$('.direct-orders-ctrltatus-nav').eq(4).css({
			backgroundColor: '#fff',
			color: '#3f3f3f'
		});
		var codeInlocal = localStorage.getItem('code');
		console.log(codeInlocal)
		if(codeInlocal){
			var timer = setInterval(function () {
				var myDate = new Date();
				var tipHour = myDate.getHours();       //获取当前小时数(0-23)
				var tipMinute = myDate.getMinutes();     //获取当前分钟数(0-59)
				var tipSecond = myDate.getSeconds();     //获取当前秒数(0-59)
				$('#tiphour').text(tipHour+':')
				$('#tipminute').text(tipMinute+':')
				$('#tipsecond').text(tipSecond)
				codeInlocal = localStorage.getItem('code');
				$scope.tipsOrdStatues = localStorage.getItem('ordTips');
				if (codeInlocal == '200') {
					clearTimeout(timer)
					console.log(myDate)
					$scope.tipsOrdStatues = localStorage.getItem('ordTips');
					$('.titOrdTips').text($scope.tipsOrdStatues)
				}
				console.log($scope.tipsOrdStatues)
				console.log(codeInlocal)
			},1000)
		}
		//设置默认时间
		function GetDateStr(AddDayCount) { 
		    var dd = new Date();
		    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
		    var y = dd.getFullYear(); 
		    var m = dd.getMonth()+1;//获取当前月份的日期 
		    var d = dd.getDate(); 
		    if (m<10) {
		    	m='0'+m
		    }
		    if (d<10) {
		    	d='0'+d
		    }
		    return y+"-"+m+"-"+d; 
		}
		var aDate = GetDateStr(-45);
		var enDate = GetDateStr(0);            
		// $("#y-ord-sdate").val(aDate );   //关键语句
		// $("#y-ord-edate").val(enDate );   //关键语句
		$("#cj-stime").val(aDate );   //关键语句
		// $("#cj-etime").val(enDate );   //关键语句
		// //给取消订单添加选中非选中
		// var qxIndex = 0;
		// // var $qxLength = $('#cj-cancel-table .zchecked-all');
		// // alert($qxLength.length)
		// $('#cj-cancel-table').on('click','.wcheckbox',function () {
		// 	if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
		// 		$(this).attr('src','static/image/direct-orders/multiple2.png');
		// 		qxIndex++;
		// 		if (qxIndex == $('#cj-cancel-table .wcheckbox').length) {
		// 			// alert('quanbuxuanzhogn')
		// 			$('#cj-cancel-table .zchecked-all').attr('src','static/image/direct-orders/multiple2.png');
		// 		}
		// 	} else {
		// 		$(this).attr('src','static/image/direct-orders/multiple1.png');
		// 		qxIndex--;
		// 		if (qxIndex != $('#cj-cancel-table .wcheckbox').length) {
		// 			$('#cj-cancel-table .zchecked-all').attr('src','static/image/direct-orders/multiple1.png');
		// 		}
				
		// 	}
		// })
		// //全选
		// $('#cj-cancel-table').on('click','.zchecked-all',function () {
		// 	if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
		// 		$(this).attr('src','static/image/direct-orders/multiple2.png');
		// 		qxIndex = $('#cj-cancel-table .wcheckbox').length;
		// 		$('#cj-cancel-table .wcheckbox').attr('src','static/image/direct-orders/multiple2.png');
		// 	} else {
		// 		$(this).attr('src','static/image/direct-orders/multiple1.png');
		// 		qxIndex = 0;
		// 		$('#cj-cancel-table .wcheckbox').attr('src','static/image/direct-orders/multiple1.png');
		// 	}
		// })
		//给已经付款的订单添加选中非选中
		var rfIndex = 0;
		$('#refund-table').on('click','.fcheckbox',function () {
			if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
				$(this).attr('src','static/image/direct-orders/multiple2.png');
				rfIndex++;
				if (rfIndex == $('#refund-table .fcheckbox').length) {
					// alert('quanbuxuanzhogn')
					$('#refund-table .zchecked-all').attr('src','static/image/direct-orders/multiple2.png');
				}
			} else {
				$(this).attr('src','static/image/direct-orders/multiple1.png');
				rfIndex--;
				if (rfIndex != $('#refund-table .fcheckbox').length) {
					$('#refund-table .zchecked-all').attr('src','static/image/direct-orders/multiple1.png');
				}
				
			}
		})
		//全选
		$('#refund-table').on('click','.zchecked-all',function () {
			if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
				$(this).attr('src','static/image/direct-orders/multiple2.png');
				rfIndex = $('#refund-table .fcheckbox').length;
				$('#refund-table .fcheckbox').attr('src','static/image/direct-orders/multiple2.png');
			} else {
				$(this).attr('src','static/image/direct-orders/multiple1.png');
				rfIndex = 0;
				$('#refund-table .fcheckbox').attr('src','static/image/direct-orders/multiple1.png');
			}
		})
		//给更多搜索添加点击显示隐藏的动画
		$('#ditect-searchmore').click(function() {
			$('#ditect-moresearch').toggle(300);
			// debugger;
			console.log(111111)
			$('#toggle-logo1').toggleClass('.glyphicon glyphicon-triangle-top');
		});
		//给左侧的导航添加滚动事件
		$(document).scroll(function () {
			if ($(document).scrollTop()>=0) {
				$('.left-nav').css({
					position : 'fixed',
					top:'80px'
				});
			}
			else{
				$('.left-nav').css({
					position : 'relative',
					top: '80px'
				});
			}
		})

		var bs = new Base64();
		var orData = {};
        orData.userId = bs.decode(localStorage.getItem('userId'));
        // console.log(orData.userId)
        orData.token = bs.decode(localStorage.getItem('token'));
        
        orData.data = {};
        orData.data.status = '1';//请求的订单状态
        orData.data.page = 1;//请求的第几页   10*1-10Ò³Âë
        orData.data.limit = 10;//每页限制的订单条数
      	orData.data = JSON.stringify(orData.data)
		// $('#dcl-sel').val('100');
		console.log(JSON.stringify(orData))
		dsp.postFun('app/order/queryOrders',JSON.stringify(orData),dclsFun,dcleFun)
		function dclsFun(data) {
			console.log(data.data)
			var list1 = data.data.result;
		   $scope.list = JSON.parse(list1);
		   $scope.shops = $scope.list.shops;//店铺的数组
		   
		   // $scope.ordersList = $scope.list.ordersList;
		   // console.log($scope.ordersList)
		   // $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
		   console.log($scope.list.allOrderCount)
		   $scope.ordstatusNum = $scope.list.allOrderCount2;//各种状态订单的数量
		   numFun ();//调用给订单赋值的函数
		 //   if ($scope.pcountN > 0) {
		 //   		$scope.dataFound = true;
		 //   		layer.closeAll("loading")

		 //   }else {
			//    	$scope.dataFound = false;
			//    	layer.closeAll("loading")
			// }
		  // importFun ();//分页函数
		}
		function dcleFun() {
			layer.closeAll("loading")
			dsp.cjMesFun(1);
		}

		//给订单状态赋值的函数
		function numFun () {
			$scope.impprocessNum = $scope.ordstatusNum.yi;
			$scope.cartNum = $scope.ordstatusNum.er;
			$scope.incompleteNum = $scope.ordstatusNum.san;
			$scope.cancelNum = $scope.ordstatusNum.si;
			$scope.refundNum = $scope.ordstatusNum.wu;
			//自动订单的订单总数
			//$scope.importedNum = $scope.ordstatusNum.new_order+$scope.ordstatusNum.submitted_order+$scope.ordstatusNum.canque_orderMap+$scope.ordstatusNum.delete_order;
			// console.log($scope.importedNum)
			// //代发订单
			// //$scope.dropshipNum = $scope.ordstatusNum.not_paying+$scope.ordstatusNum.transfer_accounts_paying
			// //					+$scope.ordstatusNum.green_channel_order+$scope.ordstatusNum.paid_order;
			// $scope.awaitNum = $scope.ordstatusNum.not_paying+$scope.ordstatusNum.transfer_accounts_paying;
			// $scope.dropprocessNum = $scope.ordstatusNum.green_channel_order+$scope.ordstatusNum.paid_order;
			// $scope.dispatchNum = 0;
			// $scope.completeNum = 0;
			// $scope.closedNum = 0;
			//售后
			//$scope.serveiceNum = 0;
		}
		//检查没有拉取到订单的原因
		$scope.noOrdResonFlag = false;
		$scope.resResonFlag = false;//展示后台返回的没有订单原因的弹框
		$scope.noOrdResonFun = function () {
			$scope.noOrdResonFlag = true;
		}
		$scope.noOrdSureFun = function () {
			if ($scope.shopOrdNum=='undefined'||$scope.shopOrdNum=='') {
				layer.msg('Please enter the order number in your shop.')
				return;
			}
			dsp.load();
			dsp.postFun('app/order/checkSyncOrder',{
				customerOrderId:$scope.shopOrdNum
			},function (data) {
				console.log(data)
				layer.closeAll("loading")
				$scope.noOrdResonFlag = false;
				if (data.data.result!='') {
					$scope.resResonFlag = true;
					$('.no-ordres-reson').text(data.data.result)
				} else {
					layer.msg('The query fails.')
				}
			},function (data) {
				layer.closeAll("loading")
				console.log(data)
			})
		}
		$scope.noOrdQxFun = function () {
			$scope.noOrdResonFlag = false;
		}
		$scope.closeResReasonFun = function () {
			$scope.resResonFlag = false;
			$('.no-ordres-reson').text('');
		}
	}])
})()