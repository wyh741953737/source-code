(function () {
	var app = angular.module('drop-completzi-app',['service']);
	// var mark1 = 0;
	app.controller('drop-completzi-ctrl',['$scope','$http','dsp','$routeParams',function ($scope,$http,dsp,$routeParams) {
        dsp.domainData().then((res) => {
            // 请求成功的结果
            console.log(res)
            $scope.iscj = res.iscj;
            if($scope.iscj == '1'){
                //cj
                $scope.websiteName = 'CJ';
            }else {
                //客户
                $scope.websiteName = res.websiteName || 'CJ';
            }
        })
		$scope.dataFound = true;
		$scope.zdataFound = true;
		var bs = new Base64();
		// dsp.load();
		// alert('proce')
		

		//鼠标划过事件
		// $('.orders-table').on('click','.order-detail',function () {
		// 	$('.orders-table .order-detail').removeClass('order-click-active');
		// 	$(this).addClass('order-click-active');
		// })
		$('.orders-table').on('mouseenter','.order-detail',function () {
			// $(this).next().show();
			$('.orders-table .order-detail').removeClass('order-detail-active');
			$(this).addClass('order-detail-active');
		})
		$('.orders-table').on('mouseleave','.order-detail',function () {
			$(this).next().hide();
		})
		$('.orders-table').mouseleave(function() {
			$('.orders-table .order-detail').removeClass('order-detail-active');
		});
		
		//给侧边栏添加样式
		var vip=localStorage.getItem('vip')==undefined?"":localStorage.getItem('vip');
		if(vip=='1'){//vipFlag
			$('.header-nav').addClass('vipFlag');
			$('.left-nav').addClass('vipFlag');
			$('.d-direct-right').css('background','#F0EDE7').addClass('vip');
			$('.orderstatus-nav').eq(3).css({
				background: '#fff',
				color: 'rgba(221,168,99,1)'
			});
		}else{
			$('.header-nav').removeClass('vipFlag');
			$('.left-nav').removeClass('vipFlag');
			$('.d-direct-right').css('background','#f2f3f5').removeClass('vip');
			$('.orderstatus-nav').eq(3).css({
				backgroundColor: '#fff',
				color: '#3f3f3f'
			});
		}
		$('.header-nav li').eq(1).addClass('active');
		//$('.left-nava').eq(1).css('background-image','linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
		$('.left-nava').click(function () {
			$('.left-nava').css('background-image','');
			$(this).css('background-image','linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
		})
		
		
		//给头部订单状态导航按钮添加点击事件
		//给代发订单的订单状态添加点击事件

		//给导航按钮添加点击事件 隐藏子订单
		$('.drop-orderstatus-nav').click(function () {
			$('.dropshippingStatus-nav').show();
			// 隐藏子订单页面
			$('.processing-subOrders').hide();
		})
		

		// 给搜索按钮添加鼠标移入移出事件
		$('.search-btn').hover(function () {
			$(this).css('background-color','rgb(249, 170, 87)');
		},function () {
			$(this).css('background-color','rgb(249, 148, 41)');
		})
		// 给处理订单的按钮添加鼠标移入移出
		$('.deal-style').hover(function () {
			$(this).css('background-color','rgb(249, 148, 41)');
			$(this).css('color','#fff');
		},function () {
			$(this).css('background-color','');
			$(this).css('color','#f99429');
		})
		// 给导出订单的按钮添加鼠标移入移出
		$('.export-orders').hover(function () {
			$(this).css('background-color','rgb(11, 98, 130)');
		},function () {
			$(this).css('background-color','rgb(11, 78, 103)');
		})
		//显示隐藏高级搜索
		$('.toggle-moresearch').click(function() {
			$('.more-search').toggle(300);
			console.log(22222222)
			$('#toggle-logo').toggleClass('.glyphicon glyphicon-triangle-top');
		});
		//给processing下的订单添加选中非选中
		
		var zproIndex = 0;
		$('#zproce-tab').on('click','.zcheckbox',function () {
			if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
				$(this).attr('src','static/image/direct-orders/multiple2.png');
				zproIndex++;
				if (zproIndex == $('#zproce-tab .zcheckbox').length) {
					// alert('quanbuxuanzhogn')
					$('#zproce-tab .zchecked-all').attr('src','static/image/direct-orders/multiple2.png');
				}
			} else {
				$(this).attr('src','static/image/direct-orders/multiple1.png');
				zproIndex--;
				if (zproIndex != $('#zproce-tab .zcheckbox').length) {
					$('#zproce-tab .zchecked-all').attr('src','static/image/direct-orders/multiple1.png');
				}
				
			}
		})
		//全选
		$('#zproce-tab').on('click','.zchecked-all',function () {
			if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
				$(this).attr('src','static/image/direct-orders/multiple2.png');
				zproIndex = $('#zproce-tab .zcheckbox').length;
				$('#zproce-tab .zcheckbox').attr('src','static/image/direct-orders/multiple2.png');
			} else {
				$(this).attr('src','static/image/direct-orders/multiple1.png');
				zproIndex = 0;
				$('#zproce-tab .zcheckbox').attr('src','static/image/direct-orders/multiple1.png');
			}
		})
		// var pageH = $(window).height()-80;
		// var docH = $(document).height();
		$('.d-direct-right').css({
		  'min-height': $(window).height() * 1 -15 + 'px'
		});
		
		

		//显示隐藏子订单
		// $('#proce-table').on('click','.viewSub-orders',function () {
		// 	// 隐藏二级界面
		// 	$('.dropshippingStatus-nav').hide();
		// 	//显示对应的子订单
		// 	$('.processing-subOrders').show();
		// })
		//点击子订单的返回按钮 隐藏子订单
		$('.back-mu-ord').click(function () {
			window.history.back();
			// $('.sub-orders').hide();
			// $('.dropshippingStatus-nav').show();
		})
		$('.sub-orders').show();//显示子订单
		dsp.loadPercent($('.orders-list'),$(window).height()-171,47,0);
		var aa = {};//存储 需要拼接发送的参数

		//获取该条母订单的id
		// alert($routeParams.muordid)
		console.log(bs.decode($routeParams.muordid))
		// return;
		var muordId = bs.decode($routeParams.muordid);
		var ziId;
		if($routeParams.ziid && $routeParams.ziid !== '*') {
			ziId = $routeParams.ziid;
		}
		if($routeParams.type){
			$scope.orderType=$routeParams.type;
		}else{
			$scope.orderType='';
		}
		$scope.muordId = muordId;
		// alert($(this).siblings('.await-ord-num').html())
		// alert(muordId)
		console.log(muordId);

		$('#await-zsel').val('50');
		aa.page = 1;
		aa.limit = 50;
		$scope.zddlimt = aa.limit-0;
		aa.id = muordId;
		aa.status = $scope.orderType;
		if (ziId) {
			$('.ord-search-inp').val(ziId)
			aa.orderId = ziId;
		} else {
			aa.orderId = '';
		}
		console.log(JSON.stringify(aa))
		dsp.postFun('app/order/getShipmentsOrder',JSON.stringify(aa),function (data) {
			
			console.log(data);
			$scope.shops = data.data.shops;//店铺的数组
			$scope.zcountNum = data.data.productsCount;
			if ($scope.zcountNum > 0) {
				dsp.removeNodataPic($('.orders-list'))
				dsp.closeLoadPercent($('.orders-list'))
			}else {
			   	dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'})
			   	dsp.closeLoadPercent($('.orders-list'))
			}
			console.log($scope.zcountNum)
			$scope.awaitpayList = data.data.productsList;
			// JSON.parse(awaitpayList)
			// alert(433)
			console.log($scope.awaitpayList)
			$scope.ordstatusNum = data.data.allOrderCount2;//各种状态订单的数量
			numFun ();//调用给订单赋值的函数

			pageFun1();
		},errFun)

		//给订单状态赋值的函数
		function numFun () {
			$scope.awaitNum = $scope.ordstatusNum.yi;
			$scope.dropprocessNum = $scope.ordstatusNum.er;
			$scope.dropprocessedNum = $scope.ordstatusNum.san;
			$scope.completeNum = $scope.ordstatusNum.si;
			$scope.closedNum = $scope.ordstatusNum.wu;
			// $scope.dispatchNum = $scope.ordstatusNum.liu;
		}
		//按店铺搜索订单
		$('#dcl-sel-store').change(function () {
			$scope.awaitpayList = [];
			dsp.loadPercent($('.orders-list'),$(window).height()-171,47,0);
			var showList = $('#await-zsel').val()-0;
			var shopstore = $(this).val();
			var searchinpVal = $.trim($('.ord-search-inp').val());
			aa.page = 1;
			aa.limit = showList;
			aa.id = $scope.muordId;
			aa.shopId = shopstore;
			aa.orderId = searchinpVal;
			aa.status = $scope.orderType;
			console.log(JSON.stringify(aa))
			dsp.postFun('app/order/getShipmentsOrder',JSON.stringify(aa),dclsFun,errFun)
			function dclsFun(data) {
				layer.closeAll("loading")
				console.log(data);
				$scope.zcountNum = data.data.productsCount;
				$scope.awaitpayList = data.data.productsList;
				if ($scope.zcountNum > 0) {
					dsp.removeNodataPic($('.orders-list'))
					dsp.closeLoadPercent($('.orders-list'))
				}else {
				   	dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'})
				   	dsp.closeLoadPercent($('.orders-list'))
				}
				console.log($scope.awaitpayList)
				pageFun1();
			}
		})
		//用订单号搜索 orderNumber
		$('.ord-search-inp').keypress(function(Event){
		    if(Event.keyCode==13){
		        $scope.ordNumSearchFun();
		    }
		})
		//搜索订单号
		$scope.ordNumSearchFun = function () {
			$scope.awaitpayList = [];
			dsp.loadPercent($('.orders-list'),$(window).height()-171,47,0);
			var showList = $('#await-zsel').val()-0;
			var shopstore = $('#dcl-sel-store').val();
			var searchinpVal = $.trim($('.ord-search-inp').val());
			$scope.orderType='';
			aa.page = 1;
			aa.limit = showList;
			aa.id = $scope.muordId;
			aa.shopId = shopstore;
			aa.orderId = searchinpVal;
			aa.status = $scope.orderType;
			console.log(JSON.stringify(aa))
			dsp.postFun('app/order/getShipmentsOrder',JSON.stringify(aa),dclsFun,errFun)
			function dclsFun(data) {
				layer.closeAll("loading")
				console.log(data);
				$scope.zcountNum = data.data.productsCount;
				$scope.awaitpayList = data.data.productsList;
				if ($scope.zcountNum > 0) {
					dsp.removeNodataPic($('.orders-list'))
					dsp.closeLoadPercent($('.orders-list'))
				}else {
				   	dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'})
				   	dsp.closeLoadPercent($('.orders-list'))
				}
				console.log($scope.awaitpayList)
				pageFun1();
			}
		}
		
		//跳转到erp
		$scope.erpLinkFun = function () {
			var muordstu = 2;
			window.open('https://erp.cjdropshipping.com/manage.html#/erp-czi-ord//'+muordstu)
			//window.open('http://localhost:8080/erp_web/webapp/manage.html#/erp-czi-ord//'+muordstu);
		}
		//子订单选择框的查询事件
		$('#await-zsel').change(function () {
			// alert($(this).val())
			//让待处理全选按钮置为非选中状态
			$('#zawait-tab .zchecked-all').attr('src','static/image/direct-orders/multiple1.png');
			var showList = $(this).val()-0;
			$(".pagination-demo2").jqPaginator({
			    totalCounts: $scope.zcountNum,//设置分页的总条目数
				pageSize: showList,//设置每一页的条目数
				visiblePages: 5,//显示多少页
				currentPage: 1,
				activeClass: 'active',
			    first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
			    prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
			    next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
			    last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
			    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
			    onPageChange: function (n) {
			    	$scope.awaitpayList = [];
			    	dsp.loadPercent($('.orders-list'),$(window).height()-171,47,0);
			     	aa.page = 1;
			     	aa.limit = showList;
			     	aa.id = $scope.muordId;
					aa.status = $scope.orderType;
			     	console.log(JSON.stringify(aa))
			     	dsp.postFun('app/order/getShipmentsOrder',JSON.stringify(aa),dclsFun,errFun)
			     	function dclsFun(data) {
			     		layer.closeAll("loading")
			     		console.log(data);
			     		$scope.zcountNum = data.data.productsCount;
			     		// console.log($scope.zcountNum)
			     		$scope.awaitpayList = data.data.productsList;
			     		if ($scope.zcountNum > 0) {
			     			dsp.removeNodataPic($('.orders-list'))
			     			dsp.closeLoadPercent($('.orders-list'))
			     		}else {
			     		   	dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'})
			     		   	dsp.closeLoadPercent($('.orders-list'))
			     		}
			     		console.log($scope.awaitpayList)
			     	}
			    }
			});
		})
		//子订单的分页
		function pageFun1() {
			// alert($scope.zcountNum+'==='+$scope.zddlimt)
			var showList = $('#await-zsel').val()-0; 
			if ($scope.zcountNum==0) {
				layer.closeAll("loading")
				dsp.closeLoadPercent($('.orders-list'))
				return;
			}
			// alert(showList)
			$('#zawait-tab .zchecked-all').attr('src','static/image/direct-orders/multiple1.png');
			$(".pagination-demo2").jqPaginator({
			    totalCounts: $scope.zcountNum,
			    pageSize: showList,
			    visiblePages: 5,
			    currentPage: 1,
			    activeClass: 'active',
			    first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
			    prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
			    next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
			    last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
			    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
			    onPageChange: function (n,type) {
			        $("#pagination-demo-text").html("当前第" + n + "页");
			        if (type == 'init') {
			        	layer.closeAll("loading")
			        	dsp.closeLoadPercent($('.orders-list'))
			        	return;
			        }
			        $scope.awaitpayList = [];
			        dsp.loadPercent($('.orders-list'),$(window).height()-171,47,0);
			        // alert(n)
			        aa.page = n;
			        aa.limit = showList;
			        aa.id = $scope.muordId;
			        // alert($scope.muordId);
					aa.status = $scope.orderType;
			        console.log(JSON.stringify(aa))
			        dsp.postFun('app/order/getShipmentsOrder',JSON.stringify(aa),function (data) {
			        	layer.closeAll("loading")
			        	console.log(data);
			        	$scope.zcountNum = data.data.productsCount;
			        	// console.log($scope.zcountNum)
			        	$scope.awaitpayList = data.data.productsList;;
			        	if ($scope.zcountNum > 0) {
			        		dsp.removeNodataPic($('.orders-list'))
			        		dsp.closeLoadPercent($('.orders-list'))
			        	}else {
			        	   	dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'})
			        	   	dsp.closeLoadPercent($('.orders-list'))
			        	}
			        	console.log($scope.awaitpayList)
			        },errFun)
			    }
			});
		}

		//按条件分页 下
		$('#z-search-btn').click(function () {
			// var selectVal = 1;//复选框的值
			var selectVal = $('#await-zsel').val()-0;
			// alert(selectVal);
			// var inpVal = 0;//存储输入框的值
			var inpVal = $('#z-inp-val').val()-0;//输入框 需要跳到第几页
			// alert(inpVal)
			if (inpVal==''||inpVal<1) {
				layer.closeAll("loading")
				layer.msg('Page does not exist.');
				return;
			}
			var countN = Math.ceil($scope.zcountNum/selectVal);
			// alert(countN)
			if (inpVal>countN) {
				layer.closeAll("loading")
				layer.msg('Please input number less than page amount.');
				return;
			}
			// alert($scope.zcountNum)
			$(".pagination-demo2").jqPaginator({
			    totalCounts: $scope.zcountNum,
			    pageSize: selectVal,
			    visiblePages: 5,
			    currentPage: inpVal,
			    activeClass: 'active',
			    first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
			    prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
			    next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
			    last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
			    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
			    onPageChange: function (n) {
			        $("#pagination-demo-text").html("当前第" + n + "页");
			        $scope.awaitpayList = [];
			        dsp.loadPercent($('.orders-list'),$(window).height()-171,47,0);
			        aa.page = n;
			        aa.limit = selectVal;
			        aa.id = $scope.muordId;
					aa.status = $scope.orderType;
			        console.log(JSON.stringify(aa))
			        dsp.postFun('app/order/getShipmentsOrder',JSON.stringify(aa),function (data) {
			        	layer.closeAll("loading")
			        	console.log(data);
			        	console.log(data.data)
			        	$scope.zcountNum = data.data.productsCount;
			        	// console.log($scope.zcountNum)
			        	$scope.awaitpayList = data.data.productsList;;
			        	if ($scope.zcountNum > 0) {
			        		dsp.removeNodataPic($('.orders-list'))
			        		dsp.closeLoadPercent($('.orders-list'))
			        	}else {
			        	   	dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'})
			        	   	dsp.closeLoadPercent($('.orders-list'))
			        	}
			        	console.log($scope.awaitpayList)
			        	
			        },errFun)
			    }
			});
		})
		function errFun (data) {
			console.log(data)
			layer.closeAll("loading")
			dsp.closeLoadPercent($('.orders-list'))
			dsp.cjMesFun(1);
		}
		//子订单的详情
		// $('.orders-list').on('click','.zi-order-num',function () {
		// 	location.href="#/order-detail";
		// })
		$scope.hrefLinkFun = function (item) {
			var id = item.ID;
			var istrackFlag = 2;
			location.href="#/order-detail/"+id+'/'+istrackFlag;
		}
		//下载面单
		$scope.loadPdfFun = function(item){
			$scope.downLoadPdfFlag = true;
			$scope.itemId = item.ID;
		}
		$scope.sureDownLoadFun = function () {
			layer.load(2)
			$scope.downLoadPdfFlag = false;
			var upJson = {};
			upJson.ids = $scope.itemId;
			upJson.loginName = "CJAPP";
			upJson.uspsType = "1"
			dsp.postFun2('getExpressSheet.json',JSON.stringify(upJson),function(data){
				console.log(data)
				layer.closeAll('loading')
				var mdLink = data.data;
				console.log(mdLink)
				if(mdLink&&JSON.stringify(mdLink)!='[]'&&mdLink[0].indexOf('miandan')!=-1){
					mdLink[0].indexOf('http')==-1?mdLink[0] = 'http://' + mdLink[0]:mdLink[0]
					$scope.mdLink = mdLink[0];
					$scope.mdLinkTkFlag = true;
				}else{
					layer.msg('No shipping labels found.')
				}
			},function(data){
				console.log(data)
				layer.closeAll('loading')
			})
		}
			//开启纠纷弹框
			$scope.openJfFun = function (item,index) {
				console.log(item)
				$scope.itemIndex = index;
				$scope.disputeFlag = true;
				$scope.itemId = item.ID;
				$scope.itemCustomeId = item.ORDER_NUMBER;
				$scope.itemMoney = item.AMOUNT;
			}
			//点击已开启的纠纷跳到纠纷页
			$scope.afterLinkFun = function (item) {
				var jfId = item.ID;
				window.open('#/after-sale//'+jfId)
			}
			$scope.closeJfFun = function () {
				$scope.disputeFlag = false;
				$scope.imgArr=[];
				$('.sel-jfres').val('');
				$scope.disTextareaVal = '';
				$('.dispute-tip').hide();
				$('.dispute-con').animate({
					height:'541px'
				},100);
			}
			var selVal = '';
			//纠纷原因
			$('.sel-jfres').change(function () {
				console.log($(this).val())
				selVal = $(this).val();
				if (selVal=='Products Short'||selVal=='Defective Products'||selVal=='Received Incorrect Products'||selVal=='Order Not Received'||selVal=='Order Returned') {
					$('.dispute-tip').show();
					$('.dispute-con').animate({
						height:'576px'
					},100);
				}else{
					$('.dispute-tip').hide();
					$('.dispute-con').animate({
						height:'541px'
					},100);
				}
			})
			//期望处理的结果
			var expectResult = '';
			$('.sel-wantway').change(function () {
				console.log($(this).val())
				expectResult = $(this).val();
			})
			// console.log(timestampToTime(new Date()))
			$scope.sureJfFun = function () {
				// console.log($scope.disTextareaVal)
				// console.log($scope.disputeInpVal)
				// console.log(selVal)
				// console.log($scope.imgArr.length)
				var listArr = [];
				var listObj = {};//存储一条消息内容
				listObj.userName = '0';//客户
				listObj.image = $scope.imgArr;
				if ($scope.disTextareaVal) {
					listObj.remark = $scope.disTextareaVal;
				} else {
					layer.msg('Please write your message')
					return;
				} 
				listObj.date = timestampToTime(new Date())
				listArr.push(listObj);
				console.log(listObj)
				console.log(listArr)
				listArr = JSON.stringify(listArr)
				var upData = {};
				upData.id = $scope.itemId;
				upData.orderNumber = $scope.itemCustomeId;
				upData.message =listArr;
				upData.orderNumber = $scope.itemCustomeId;
				if (expectResult=='Refund') {
					upData.expectResult = 1;
				} else if(expectResult=='Resend'){
					upData.expectResult = 2;
				}else {
					layer.msg('Please select expected operation')
					return;
				}
				if (selVal=='') {
					layer.msg('Please select the type of dispute.')
					return;
				} else {
					if($scope.itemStatus!='6'&&$scope.itemStatus!='10'&&selVal=='Unfilled Orders Cancellation'){
						layer.msg('Sorry, this order has been processed already.')
						return;
					}
					upData.type = selVal;
					if (selVal=='Products Short'||selVal=='Defective Products'||selVal=='Received Incorrect Products'||selVal=='Order Not Received') {
						if ($scope.imgArr.length<1) {
							layer.msg('The screenshoot of buyer complains (email address included) and images of parcel are required for this kinds of dispute.')
							return;
						} else {
							layer.load(2);
							openJfFun1(upData)
						}
					}else{
						layer.load(2);
						openJfFun1(upData)
					}
				}
				// else if(selVal=='Other'){
				// 	console.log($scope.disputeInpVal)
				// 	if ($scope.disputeInpVal) {
				// 		upData.type = $scope.disputeInpVal;
				// 		openJfFun1(upData)
				// 	} else {
				// 		layer.msg('请填写纠纷类型')
				// 		return;
				// 	}
				// } 

			}
			function openJfFun1(upData){
				dsp.postFun('app/dispute/openDispute',JSON.stringify(upData),function (data) {
					console.log(data)
					layer.closeAll('loading')
					if (data.data.result==true) {
						$scope.disputeFlag = false;
						layer.msg('Open dispute successfully')
						//把该条订单设置成
						$scope.imgArr=[];
						$('.sel-jfres').val('');
						$scope.disTextareaVal = '';
						$scope.awaitpayList[$scope.itemIndex].disputeId='1';
						$('.dispute-tip').hide();
						$('.dispute-con').animate({
							height:'541px'
						},100);
					}else{
						layer.msg('Open dispute unsuccessfully')
					}
				},errFun)		
			}
			
			//点击上传的图片显示大图
			$scope.viewBigImg = function (item) {
				$scope.viewImgFlag = true;
				$scope.bigImgSrc = item;
				console.log(item)
			}
			$scope.closePreImg = function () {
				$scope.viewImgFlag = false;
			}
			$scope.imgArr=[];
			$scope.upLoadImg4=function (files) {
				dsp.ossUploadFile($('#document-img')[0].files,function (data) {
				    console.log(data)
				    if (data.code == 0) {
				        layer.msg('Images Upload Failed');
				        return;
				    }
				    if (data.code == 2) {
				        layer.msg('Images Upload Incomplete');
				    }
				    var result = data.succssLinks;
				    console.log(result)
				    var filArr = [];
				    for(var j = 0;j < result.length;j++){
				        var srcList = result[j].split('.');
				        var fileName = srcList[srcList.length-1].toLowerCase();
				        console.log(fileName)
				        if(fileName=='png' || fileName=='jpg' || fileName=='jpeg' || fileName=='gif'){
				            $scope.imgArr.push(result[j]);
				        }
				    }
				    // $scope.imgArr = filArr;
				    console.log($scope.imgArr)
				    $scope.$apply();
				})
			}
			function timestampToTime(date) {
				var Y,M,D,h,m,s
		        Y = date.getFullYear() + '-';
		        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		        D = date.getDate() + ' ';
		        h = date.getHours() + ':';
		        m = date.getMinutes() + ':';
		        s = date.getSeconds();
		        return Y+M+D+h+m+s;
		    }
	}])
})()