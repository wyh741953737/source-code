(function () {
	var app = angular.module('drop-dispat-app',['service']);
	// var mark1 = 0;
	app.controller('drop-dispat-ctrl',['$scope','$http','dsp',function ($scope,$http,dsp) {
		$scope.dataFound = true;
		// alert(6666)
		var bs = new Base64();
		dsp.load();
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
		$("#cj-stime").val(aDate );   //关键语句
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
		$('.left-nava').click(function () {
			$('.left-nava').css('background-image','');
			$(this).css('background-image','linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
		})
		
		//给导航按钮添加点击事件 隐藏子订单
		$('.drop-orderstatus-nav').click(function () {
			$('.dropshippingStatus-nav').show();
			// 隐藏子订单页面
			$('.sub-orders').hide();
		})
		//显示隐藏子订单
		$('.orders-list').on('click','.viewSub-orders',function () {
			// 隐藏二级界面
			$('.dropshippingStatus-nav').hide();
			//显示对应的子订单
			$('.sub-orders').show();
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
			if(vip=='1'){
				$(this).css('background-color','#C2996E');
			}else{
				$(this).css('background-color','rgb(11, 98, 130)');
			}

		},function () {
			if(vip=='1'){
				$(this).css('background-color','#A17C4E');
			}else{
				$(this).css('background-color','rgb(11, 78, 103)');
			}

		})
		//显示隐藏高级搜索
		$('.toggle-moresearch').click(function() {
			$('.more-search').toggle(300);
			console.log(22222222)
			$('#toggle-logo').toggleClass('.glyphicon glyphicon-triangle-top');
		});
		
		
		var orData = {};
        orData.userId = bs.decode(localStorage.getItem('userId'));
        // console.log(orData.userId)
        orData.token = bs.decode(localStorage.getItem('token'));
        orData.data = {};
        orData.data.status = '6';//请求的订单状态
        orData.data.page = 1;//请求的第几页
        $('#drop-sel-num').val('100')
        orData.data.limit = $('#drop-sel-num').val()-0;//每页限制的订单条数
        $scope.dropOrdLimit = orData.data.limit;
        orData.data.cjOrderDateBegin = $('#cj-stime').val();
        orData.data.cjOrderDateEnd = $('#cj-etime').val();
        orData.data = JSON.stringify(orData.data)
		dsp.postFun('app/order/queryOrders',JSON.stringify(orData),function (data) {
			console.log(data.data)
			var list1 = data.data.result;
		   $scope.list = JSON.parse(list1);
		   $scope.shops = $scope.list.shops;//店铺的数组
		   
		   $scope.ordersList = $scope.list.ordersList;
		   console.log($scope.ordersList)
		   $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
		   console.log($scope.list.allOrderCount2)
		   $scope.ordstatusNum = $scope.list.allOrderCount2;//各种状态订单的数量
		   numFun ();//调用给订单赋值的函数
		   if ($scope.pcountN > 0) {
		   		$scope.dataFound = true;
		   		layer.closeAll("loading")
		   }else {
			   	$scope.dataFound = false;
			   	layer.closeAll("loading")
			}
			pageFun();
		})
		//给订单状态赋值的函数
		function numFun () {
			$scope.awaitNum = $scope.ordstatusNum.yi;
			$scope.dropprocessNum = $scope.ordstatusNum.er;
			$scope.dropprocessedNum = $scope.ordstatusNum.san;
			$scope.completeNum = $scope.ordstatusNum.si;
			$scope.closedNum = $scope.ordstatusNum.wu;
			// $scope.dispatchNum = $scope.ordstatusNum.liu;
		}
		//用订单号搜索 orderNumber
		$('.ord-search-inp').keypress(function(Event){
		    if(Event.keyCode==13){
		        $scope.ordnumSearch();
		    }
		})
		$scope.ordnumSearch = function () {
			var searchinpVal = $.trim($('.ord-search-inp').val());
			dsp.load();

			var orData = {};
			tjFun(orData);
	        // orData.userId = bs.decode(localStorage.getItem('userId'));
	        // // console.log(orData.userId)
	        // orData.token = bs.decode(localStorage.getItem('token'));
	        // orData.data = {};
	        // orData.data.status = '6';//请求的订单状态
	        // orData.data.page = 1;//请求的第几页
	        // orData.data.limit = $('#drop-sel-num').val()-0;//每页限制的订单条数
	        // orData.data.cjOrderDateBegin = $('#cj-stime').val();
	        // orData.data.cjOrderDateEnd = $('#cj-etime').val();
	        // orData.data.orderNumber = searchinpVal;

	        orData.data = JSON.stringify(orData.data)
			dsp.postFun('app/order/queryOrders',JSON.stringify(orData),function (data) {
				console.log(data.data)
				var list1 = data.data.result;
			   $scope.list = JSON.parse(list1);
			   $scope.shops = $scope.list.shops;//店铺的数组
			   
			   $scope.ordersList = $scope.list.ordersList;
			   console.log($scope.ordersList)
			   $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
			   console.log($scope.list.allOrderCount2)
			   $scope.ordstatusNum = $scope.list.allOrderCount2;//各种状态订单的数量
			   numFun ();//调用给订单赋值的函数
			   if ($scope.pcountN > 0) {
			   		$scope.dataFound = true;
			   		layer.closeAll("loading")

			   }else {
				   	$scope.dataFound = false;
				   	layer.closeAll("loading")
				}
				pageFun();
			})
		}
		
		//cj开始日期搜索
		$("#cj-stime").click(function (){
			var cjendtime=$("#cj-stime").val();
			var interval=setInterval(function (){
				var endtime2=$("#cj-stime").val();
				if(endtime2!=cjendtime){
					// alert(endtime2+'!='+cjendtime)
					dsp.load();
					clearInterval(interval);

					var orData = {};
					tjFun(orData);
			        // orData.userId = bs.decode(localStorage.getItem('userId'));
			        // orData.token = bs.decode(localStorage.getItem('token'));
			        // orData.data = {};
			        // orData.data.status = '6';//请求的订单状态
			        // orData.data.page = 1;//请求的第几页
			        // orData.data.limit = $('#drop-sel-num').val()-0;//每页限制的订单条数
			        // orData.data.cjOrderDateBegin = $('#cj-stime').val();
			        // orData.data.cjOrderDateEnd = $('#cj-etime').val();
			        orData.data = JSON.stringify(orData.data)
					dsp.postFun('app/order/queryOrders',JSON.stringify(orData),function (data) {
						console.log(data.data)
						var list1 = data.data.result;
					   $scope.list = JSON.parse(list1);
					   $scope.shops = $scope.list.shops;//店铺的数组
					   
					   $scope.ordersList = $scope.list.ordersList;
					   console.log($scope.ordersList)
					   $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
					   
					   if ($scope.pcountN > 0) {
					   		$scope.dataFound = true;
					   		layer.closeAll("loading")

					   }else {
						   	$scope.dataFound = false;
						   	layer.closeAll("loading")
						}
						pageFun();
					})
				}
			},100)
		})
		//cj结束日期搜索
		$("#cj-etime").click(function (){
			var cjendtime=$("#cj-etime").val();
			var interval=setInterval(function (){
				var endtime2=$("#cj-etime").val();
				if(endtime2!=cjendtime){
					// alert(endtime2+'!='+cjendtime)
					dsp.load();
					clearInterval(interval);
					var orData = {};
					tjFun(orData);
			        // orData.userId = bs.decode(localStorage.getItem('userId'));
			        // orData.token = bs.decode(localStorage.getItem('token'));
			        // orData.data = {};
			        // orData.data.status = '6';//请求的订单状态
			        // orData.data.page = 1;//请求的第几页
			        // orData.data.limit = $('#drop-sel-num').val()-0;//每页限制的订单条数
			        // orData.data.cjOrderDateBegin = $('#cj-stime').val();
			        // orData.data.cjOrderDateEnd = $('#cj-etime').val();
			        orData.data = JSON.stringify(orData.data)
					dsp.postFun('app/order/queryOrders',JSON.stringify(orData),function (data) {
						console.log(data.data)
						var list1 = data.data.result;
					   $scope.list = JSON.parse(list1);
					   $scope.shops = $scope.list.shops;//店铺的数组
					   
					   $scope.ordersList = $scope.list.ordersList;
					   console.log($scope.ordersList)
					   $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
					  
					   if ($scope.pcountN > 0) {
					   		$scope.dataFound = true;
					   		layer.closeAll("loading")

					   }else {
						   	$scope.dataFound = false;
						   	layer.closeAll("loading")
						}
						pageFun();
					})
				}
			},100)
		})
		//高级搜索部分的查询		
		$('#tj-search-btn').click(function () {
			dsp.load();
			// var showList = $('#drop-sel-num').val()-0;
			// var yStoresTime = $('#y-ord-sdate').val();
			// var yStoreeTime = $('#y-ord-edate').val();
			// var yStoreName = $.trim($('#y-pro-name').val());
			// var cjStoreName = $.trim($('#cj-pro-name').val());
			// var berName = $.trim($('.buyer-inp').val());
			// var storeName = $('#dcl-sel-store').val();
			// // alert(yStoresTime+'--'+yStoreeTime+'==='+cjsTime+'///'+cjeTime)
			// var ordType = '';
			// if($('.type-sel').val()=='All'){
			// 	ordType = '';
			// }else if($('.type-sel').val()=='Shopify Imported'){
			// 	ordType = '2';
			// }else if($('.type-sel').val()=='Excel Imported'){
			// 	ordType = '1';
			// }
			var orData = {};
			tjFun(orData);
	        // orData.data = {};
	        // orData.data.cjOrderDateBegin = $('#cj-stime').val();
	        // orData.data.cjOrderDateEnd = $('#cj-etime').val();
	        // orData.data.status = '6';//请求的订单状态
	        // orData.data.page = 1;//请求的第几页   10*1-10Ò³Âë
	        // orData.data.limit = showList;//每页限制的订单条数
	        // // orData.data.cjOrderDateBegin = cjsTime;
	        // // orData.data.cjOrderDateEnd = cjeTime;
	        // orData.data.storeOrderDateBegin = yStoresTime;
	        // orData.data.storeOrderDateEnd = yStoreeTime;
	        // orData.data.storeProductName = yStoreName;
	        // orData.data.cjProductName = cjStoreName;
	        // // orData.data.canhandler = 'y';
	        // orData.data.buyerName = berName;
	        // orData.data.orderType = ordType;
	        // //关联上表格中的按店铺搜索
	        // if(storeName=='Stores All'){
	        // 	orData.data.storeNumber = '';
	        // }else {
	        // 	orData.data.storeNumber = storeName;
	        // }
	        orData.data=JSON.stringify(orData.data)
	        console.log(orData.data)
	        console.log(JSON.stringify(orData))
	        dsp.postFun('app/order/queryOrders',JSON.stringify(orData),dclsFun)
	        function dclsFun(data) {
	        	//让待处理全选按钮置为非选中状态
	        	$('#z-dcl-ord .zchecked-all').attr('src','static/image/direct-orders/multiple1.png');
	        	console.log(data.data)
	        	var list1 = data.data.result;
        	   $scope.list = data.data.result;
        	   $scope.list = JSON.parse(list1);
        	   $scope.ordersList = $scope.list.ordersList;
        	   console.log($scope.ordersList)
        	   // console.log($scope.list)
        	   // console.log($scope.list.productList);
        	   // $scope.aaaa = $scope.list.productList;
        	   // console.log($scope.aaaa);
        	   // $scope.orderList = $scope.list.orderList;//订单列表
        	   // $scope.productList = $scope.list.productList;//产品列表
        	   $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
        	   // alert($scope.pcountN)
        	   if ($scope.pcountN > 0) {
        	   		$scope.dataFound = true;
        	   		layer.closeAll("loading")
        	   }else {
        		   	$scope.dataFound = false;
        		   	layer.closeAll("loading")
        		   	// $scope.orderList = '';
        		   	// alert('没有找到啊'+$scope.dataFound)
        		   	return;
        		}
        	  importFun ();//分页函数

	        }
		})
		//高级搜索里面的按订单类型搜索
		$('.type-sel').change(function () {
			dsp.load();
			// var showList = $('#drop-sel-num').val()-0;
			// var ordType = '';
			// if($('.type-sel').val()=='All'){
			// 	ordType = '';
			// }else if($('.type-sel').val()=='Shopify Imported'){
			// 	ordType = '2';
			// }else if($('.type-sel').val()=='Excel Imported'){
			// 	ordType = '1';
			// }
			var orData = {};
			tjFun(orData);
	        // orData.userId = bs.decode(localStorage.getItem('userId'));
	        // orData.token = bs.decode(localStorage.getItem('token'));

	        // orData.data = {};
	        // orData.data.status = '6';//请求的订单状态
	        // orData.data.page = 1;//请求的第几页   10*1-10Ò³Âë
	        // orData.data.limit = showList;//每页限制的订单条数
	     //    orData.data.orderType = ordType;
      //       //获取时间参数
    		// var yStoresTime = $('#y-ord-sdate').val();
    		// var yStoreeTime = $('#y-ord-edate').val();
    		// var cjsTime = $('#cj-stime').val();
    		// var cjeTime = $('#cj-etime').val();
      //       // orData.data.storeOrderDateBegin = yStoresTime;//店铺开始时间
      //       orData.data.cjOrderDateBegin = cjsTime;//cj开始时间
      //       // orData.data.storeOrderDateEnd = yStoreeTime;//店铺结束时间
      //       orData.data.cjOrderDateEnd = cjeTime;//cj结束时间
	        orData.data=JSON.stringify(orData.data)
	        console.log(orData.data)
	        console.log(JSON.stringify(orData))
	        dsp.postFun('app/order/queryOrders',JSON.stringify(orData),dclsFun)
	        function dclsFun(data) {
	        	//让待处理全选按钮置为非选中状态
				$('#z-dcl-ord .zchecked-all').attr('src','static/image/direct-orders/multiple1.png');
	        	console.log(data.data)
	        	var list1 = data.data.result;//ËùÓÐÊý¾Ý
        	   $scope.list = data.data.result;
        	   $scope.list = JSON.parse(list1);//json×Ö·û´®×ª¶ÔÏó
        	   // console.log($scope.list)
        	   // console.log($scope.list.productList);
        	   $scope.ordersList = $scope.list.ordersList;
        	   console.log($scope.ordersList)
        	   $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
        	   // alert($scope.pcountN)
        	   if ($scope.pcountN > 0) {
        	   		$scope.dataFound = true;
        	   		layer.closeAll("loading")
        	   }else {
        		   	$scope.dataFound = false;
        		   	layer.closeAll("loading")
        		   	// $scope.orderList = '';
        		   	return;
        		}
        	  importFun ();//分页函数
	        }
		})
		
		//给processing下的订单添加选中非选中
		var proceIndex = 0;
		$('#proce-table').on('click','.zcheckbox',function () {
			if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
				$(this).attr('src','static/image/direct-orders/multiple2.png');
				proceIndex++;
				if (proceIndex == $('#proce-table .zcheckbox').length) {
					// alert('quanbuxuanzhogn')
					$('#proce-table .zchecked-all').attr('src','static/image/direct-orders/multiple2.png');
				}
			} else {
				$(this).attr('src','static/image/direct-orders/multiple1.png');
				proceIndex--;
				if (proceIndex != $('#proce-table .zcheckbox').length) {
					$('#proce-table .zchecked-all').attr('src','static/image/direct-orders/multiple1.png');
				}
				
			}
		})
		//全选
		$('#proce-table').on('click','.zchecked-all',function () {
			if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
				$(this).attr('src','static/image/direct-orders/multiple2.png');
				proceIndex = $('#proce-table .zcheckbox').length;
				$('#proce-table .zcheckbox').attr('src','static/image/direct-orders/multiple2.png');
			} else {
				$(this).attr('src','static/image/direct-orders/multiple1.png');
				proceIndex = 0;
				$('#proce-table .zcheckbox').attr('src','static/image/direct-orders/multiple1.png');
			}
		})
		
		
		var zproIndex = 0;
		$('#zdispat-tab').on('click','.zcheckbox',function () {
			if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
				$(this).attr('src','static/image/direct-orders/multiple2.png');
				zproIndex++;
				if (zproIndex == $('#zdispat-tab .zcheckbox').length) {
					// alert('quanbuxuanzhogn')
					$('#zdispat-tab .zchecked-all').attr('src','static/image/direct-orders/multiple2.png');
				}
			} else {
				$(this).attr('src','static/image/direct-orders/multiple1.png');
				zproIndex--;
				if (zproIndex != $('#zdispat-tab .zcheckbox').length) {
					$('#zdispat-tab .zchecked-all').attr('src','static/image/direct-orders/multiple1.png');
				}
				
			}
		})
		//全选
		$('#zdispat-tab').on('click','.zchecked-all',function () {
			if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
				$(this).attr('src','static/image/direct-orders/multiple2.png');
				zproIndex = $('.zdispat-tab .zcheckbox').length;
				$('#zdispat-tab .zcheckbox').attr('src','static/image/direct-orders/multiple2.png');
			} else {
				$(this).attr('src','static/image/direct-orders/multiple1.png');
				zproIndex = 0;
				$('#zdispat-tab .zcheckbox').attr('src','static/image/direct-orders/multiple1.png');
			}
		})
		//按条件分页 下
		$('.jump-btn2').click(function () {
			var selectVal = $('#drop-sel-num').val()-0;
			// alert(selectVal);
			// var inpVal = 0;//存储输入框的值
			var inpVal = $('.inp-num-go2').val()-0;//输入框 需要跳到第几页
			// alert(inpVal)
			if (inpVal=='') {
				layer.msg('The value of the input box cannot be empty!');
				return;
			}
			var countN = Math.ceil($scope.pcountN/selectVal);
			// alert(countN)
			if (inpVal>countN) {
				layer.msg('输入的值不能大于总页数');
				return;
			}
			console.log($scope.pcountN,selectVal,inpVal)
			$(".pagination-demo1").jqPaginator({
			    totalCounts: $scope.pcountN,
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
			        dsp.load();
			        var orData = {};
			        tjFun(orData);
			        // orData.data = {};
			        // orData.data.status = '6';
			        orData.data.page = n;
			        // orData.data.limit = selectVal;
			        // orData.data.cjOrderDateBegin = $('#cj-stime').val();
			        // orData.data.cjOrderDateEnd = $('#cj-etime').val();
			        orData.data = JSON.stringify(orData.data);
			        console.log(JSON.stringify(orData))
			        dsp.postFun('app/order/queryOrders',JSON.stringify(orData),function (data) {
			        	// alert(123)
			        	   var list1 = JSON.parse(data.data.result);
			        	   
			        	   $scope.ordersList = list1.ordersList;
			        	   console.log($scope.ordersList)
			        	   $scope.pcountN = list1.countNumber;//获取总订单的条数
			        	  
			        	   if ($scope.pcountN > 0) {
			        	   		$scope.dataFound = true;
			        	   		layer.closeAll("loading")

			        	   }else {
			        		   	$scope.dataFound = false;
			        		   	layer.closeAll("loading")
			        		}
			        })
			    }
			});
		})
		$('#drop-sel-num').change(function () {
			$('.orders-list .zchecked-all').attr('src','static/image/direct-orders/multiple1.png');
			var selectVal = $(this).val()-0;
			$(".pagination-demo1").jqPaginator({
			    totalCounts: $scope.pcountN,//设置分页的总条目数
				pageSize: selectVal,//设置每一页的条目数
				visiblePages: 5,//显示多少页
				currentPage: 1,
				activeClass: 'active',
			    first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
			    prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
			    next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
			    last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
			    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
			    onPageChange: function (n) {
			    	dsp.load();
	    			var orData = {};
	    			tjFun(orData);
	    	        // orData.data = {};
	    	        // orData.data.status = '6';//请求的订单状态
	    	        orData.data.page = n;//请求的第几页
	    	        orData.data.limit = $('#drop-sel-num').val()-0;//每页限制的订单条数
	    	        // orData.data.cjOrderDateBegin = $('#cj-stime').val();
	    	        // orData.data.cjOrderDateEnd = $('#cj-etime').val();
	    	        orData.data = JSON.stringify(orData.data)
	    	        dsp.postFun('app/order/queryOrders',JSON.stringify(orData),function (data) {
	    	        	console.log(data.data)
	    	        	var list1 = data.data.result;
	    	           $scope.list = JSON.parse(list1);
	    	           
	    	           $scope.ordersList = $scope.list.ordersList;
	    	           console.log($scope.ordersList)
	    	           $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
	    	           console.log($scope.list.allOrderCount2)
	    	           if ($scope.pcountN > 0) {
	    	           		$scope.dataFound = true;
	    	           		layer.closeAll("loading")
	    	           }else {
	    	        	   	$scope.dataFound = false;
	    	        	   	layer.closeAll("loading")
	    	        	}
	    	        })
			    }
			});
		})
		//分页
		function pageFun() {
			console.log($scope.pcountN,$scope.dropOrdLimit)
			if ($scope.pcountN<=0) {
				return;
			}
			$(".pagination-demo1").jqPaginator({
			    totalCounts: $scope.pcountN,
			    pageSize: $scope.dropOrdLimit,
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
			        	return;
			        }
			        dsp.load();
	        		var orData = {};
	        		tjFun(orData);
	                // orData.data = {};
	                // orData.data.status = '6';//请求的订单状态
	                orData.data.page = n;//请求的第几页
	                // orData.data.limit = $('#drop-sel-num').val()-0;//每页限制的订单条数
	                // orData.data.cjOrderDateBegin = $('#cj-stime').val();
	                // orData.data.cjOrderDateEnd = $('#cj-etime').val();
	                orData.data = JSON.stringify(orData.data)
	                dsp.postFun('app/order/queryOrders',JSON.stringify(orData),function (data) {
	                	console.log(data.data)
	                	var list1 = data.data.result;
	                   $scope.list = JSON.parse(list1);
	                   
	                   $scope.ordersList = $scope.list.ordersList;
	                   console.log($scope.ordersList)
	                   $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
	                   console.log($scope.list.allOrderCount2)
	                   if ($scope.pcountN > 0) {
	                   		$scope.dataFound = true;
	                   		layer.closeAll("loading")
	                   }else {
	                	   	$scope.dataFound = false;
	                	   	layer.closeAll("loading")
	                	}
	                })
			    }
			});
		}
		//条件搜索
		function tjFun (tjcs) {
			var showList = $('#drop-sel-num').val()-0;
			var yStoresTime = $('#y-ord-sdate').val();
			var yStoreeTime = $('#y-ord-edate').val();
			var cjsTime = $('#cj-stime').val();
			var cjeTime = $('#cj-etime').val();
			var yStoreName = $.trim($('#y-pro-name').val());
			var cjStoreName = $.trim($('#cj-pro-name').val());
			var berName = $.trim($('.buyer-inp').val());
			var searchinpVal = $('.ord-search-inp').val();
			var ordType = '';
			if($('.type-sel').val()=='All'){
				ordType = '';
			}else if($('.type-sel').val()=='Shopify Imported'){
				ordType = '2';
			}else if($('.type-sel').val()=='Excel Imported'){
				ordType = '1';
			}
	        tjcs.data = {};
	        tjcs.data.status = '6';//请求的订单状态
	        tjcs.data.page = 1;//请求的第几页   10*1-10Ò³Âë
	        tjcs.data.limit = showList;//每页限制的订单条数
	        // tjcs.data.orderNumber = searchinpVal;
	        tjcs.data.storeOrderDateBegin = yStoresTime;
	        tjcs.data.cjOrderDateBegin = cjsTime;
	        tjcs.data.storeOrderDateEnd = yStoreeTime;
	        tjcs.data.cjOrderDateEnd = cjeTime;
	        tjcs.data.storeProductName = yStoreName;
	        tjcs.data.cjProductName = cjStoreName;
	        tjcs.data.buyerName = berName;
	        tjcs.data.orderType = ordType;
	        // tjcs.data.shipOrder = searchinpVal;
	        if(searchinpVal.indexOf('CJ')>=0){
	        	tjcs.data.shipOrder = searchinpVal;
	        }else{
	        	tjcs.data.orderNumber = searchinpVal;
	        }
		}
		//点击母订单进行筛选搜索
		$scope.filterMuOrdFun = function (item) {
			dsp.load();
			$('.ord-search-inp').val(item.SHIPMENTS_ORDER_ID);
			var orData = {};
			tjFun(orData);
	        // orData.data = {};
	        // orData.data.status = '6';//请求的订单状态
	        // orData.data.page = 1;//请求的第几页
	        // orData.data.limit = $('#drop-sel-num').val()-0;//每页限制的订单条数
	        // orData.data.cjOrderDateBegin = $('#cj-stime').val();
	        // orData.data.cjOrderDateEnd = $('#cj-etime').val();
	        // orData.data.orderNumber = $('.ord-search-inp').val();
	        orData.data.shipOrder = item.SHIPMENTS_ORDER_ID;
	        orData.data = JSON.stringify(orData.data)
			dsp.postFun('app/order/queryOrders',JSON.stringify(orData),function (data) {
				console.log(data.data)
				var list1 = data.data.result;
			   $scope.list = JSON.parse(list1);
			   $scope.ordersList = $scope.list.ordersList;
			   console.log($scope.ordersList)
			   $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
			   console.log($scope.list.allOrderCount2)
			   $scope.ordstatusNum = $scope.list.allOrderCount2;//各种状态订单的数量
			   numFun ();//调用给订单赋值的函数
			   if ($scope.pcountN > 0) {
			   		$scope.dataFound = true;
			   		layer.closeAll("loading")

			   }else {
				   	$scope.dataFound = false;
				   	layer.closeAll("loading")
				}
				pageFun();
			})
		}
		// var pageH = $(window).height()-80;
		// var docH = $(document).height();
		$('.d-direct-right').css({
		  'min-height': $(window).height() * 1 -15 + 'px'
		});
		
		// $('.direct-right').height()
		// $('.orders-list').on('click','.cj-order-num',function () {
		// 	location.href="#/order-detail";
		// })
		//查看订单详情
		$scope.hrefLinkFun = function (item) {
			var id = item.ID;
			var istrackFlag = 2;
			location.href="#/order-detail/"+id+'/'+istrackFlag;
		}
		//导出
		$scope.exportFlag = false;
		$scope.exportFun = function () {
			var numindex = 0;
			$('#proce-table .zcheckbox').each(function () {
				if ($(this).attr('src')=='static/image/direct-orders/multiple2.png') {
					numindex++;
				} 
			})
			$scope.exportNum = numindex;
			if (numindex<=0) {
				layer.msg('Please select order(s) first!')
				return;
			} else {
				$scope.exportFlag = true;
			}
		}
		//取消
		$scope.closeexportFun = function () {
			$scope.exportFlag = false;
		}
		//确定
		$scope.enterExportFun = function () {
			$scope.exportFlag = false;//关闭弹窗
			dsp.load();
			var ids = {};
			var printIds = '';
			$('.orders-table .zcheckbox').each(function () {
				if ($(this).attr('src')=='static/image/direct-orders/multiple2.png') {
					printIds+=$(this).siblings('.dord-date-time').text()+',';
				} 
			})
			ids.ids = printIds;
			console.log(JSON.stringify(ids))
			dsp.postFun('app/order/exportCJOrder',JSON.stringify(ids),function (data) {
				console.log(data)
				var href = data.data.href;
				console.log(href)
				layer.closeAll("loading")
				if (href.indexOf('https')>=0) {
					
					// window.open(href,'_blank')
					$scope.hrefsrc = href;
					console.log($scope.hrefsrc)
					$scope.excelaflag=true;//打开下载excel的弹窗
				} else {
					layer.msg('Export Tracking Numbers Error')
				}
			},function (data) {
				layer.closeAll("loading")
				console.log(data)
			})
		}
		//打开下载excel的弹窗
		$scope.excelaflag=false;
		$scope.excelcloFun = function () {
			$scope.excelaflag=false;
		}
	}])
})()