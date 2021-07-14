
(function () {
	var app = angular.module('dropshipping-app',['service']);
	// var mark1 = 0;
	app.controller('dropshipping-ctrl',['$scope','$http','dsp',function ($scope,$http,dsp) {
		$scope.dataFound = false;
		alert(321)
		var bs = new Base64();
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
		var dapData = {};
		dapData.userId = bs.decode(localStorage.getItem('userId'));;
		dapData.token = bs.decode(localStorage.getItem('token'));;
		// dapData.userId = "{8DA0EC3E-E4A7-4D9B-8876-2A025515EBE0}";
		// dapData.token = "";
		dapData.data = {};
		dapData.data.status = '3';
		dapData.data.page = 1;
		dapData.data.limit = 10;
		$scope.dropOrdLimit = dapData.data.limit;
		dapData.data = JSON.stringify(dapData.data);
		console.log(dapData)
		var cjdropawaitp = '';//存储订单的所有数据
		$scope.cjdropawaitpList = '';//存储所有的订单
		$scope.erpordTnum = '';//存储订单的条数
		console.log(JSON.stringify(dapData))
		dsp.postFun('app/order/queryShipmentsOrder',JSON.stringify(dapData),function (data) {
			// alert(123)
			console.log(data.data) 
			// console.log(orderData.result)
			cjdropawaitp = JSON.parse(data.data.result)
			$scope.erpordTnum = cjdropawaitp.countNumber;
			if ($scope.erpordTnum > 0) {
				$scope.dataFound = true;
			}else{
				$scope.dataFound = false;
			}
			// alert($scope.erpordTnum)
			$scope.cjdropawaitpList = cjdropawaitp.orderList;
			console.log(cjdropawaitp.orderList);
			$scope.awitPaymuid = cjdropawaitp.orderList[0].ID;
			console.log($scope.awitPaymuid)

			pageFun();
		})

		//给侧边栏添加样式
		var vip=localStorage.getItem('vip')==undefined?"":localStorage.getItem('vip');
		if(vip=='1'){//vipFlag
			$('.header-nav').addClass('vipFlag');
			$('.left-nav').addClass('vipFlag');
			$('.d-direct-right').css('background','#F0EDE7');
		}else{
			$('.header-nav').removeClass('vipFlag');
			$('.left-nav').removeClass('vipFlag');
			$('.d-direct-right').css('background','#f2f3f5');
		}
		$('.header-nav li').eq(1).addClass('active');
		//$('.left-nava').eq(1).css('background-image','linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
		$('.left-nava').click(function () {
			$('.left-nava').css('background-image','');
			$(this).css('background-image','linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
		})
		

		//给头部订单状态导航按钮添加点击事件
		//给代发订单的订单状态添加点击事件
		// $(".dropshippingStatus-nav").eq(0).show();//让代发订单的代付款页面显示
		// $('.orderstatus-nav').eq(0).css({
		// 	backgroundColor: '#fff',
		// 	color: '#3f3f3f'
		// });
		// $('.orderstatus-nav').click(function(){
		// 	//隐藏代发订单的首页
		// 	// $('.dropshipping-show').css('display','none');
		// 	//隐藏未付款的子订单部分
		// 	$('.sub-orders').hide();
		// 	// 隐藏付款后（备货中 已发送 交易成功）的子订单页面
		// 	$('.payAfter-subOrders').hide();
		// 	// 隐藏交易关闭的子订单页面
		// 	$('.closed-subOrders').hide();
		// 	// alert(1)
		// 	var index = $('.orderstatus-nav').index(this);
		// 	console.log(index)
		// 	$('.orderstatus-nav').css({
		// 		backgroundColor: '#545662',
		// 		color: '#fff'
		// 	});
		// 	$(this).css({
		// 		backgroundColor: '#fff',
		// 		color: '#3f3f3f'
		// 	});
		// 	//让对应的二级界面显示
		// 	$('.dropshippingStatus-nav').hide();
		// 	$('.dropshippingStatus-nav').eq(index).css('display','block');
		// })

		//给等待付款的子订单添加点击事件 
		$('#await-table').on('click','.beforpay-wiewsub',function () {
			// 隐藏二级界面
			$('.dropshippingStatus-nav').hide();
			// 隐藏所有的子订单页面
			$('.sub-orders').hide();
			//显示对应的子订单
			$('.awaitpay-subOrders').show();
		})
		//给备货中添加显示隐藏子订单
		$('#proce-table').on('click','.beforpay-wiewsub',function () {
			// 隐藏二级界面
			$('.dropshippingStatus-nav').hide();
			// 隐藏所有的子订单页面
			$('.sub-orders').hide();
			//显示对应的子订单
			$('.awaitpay-subOrders').show();
		})
		//给已发货的子订单添加点击事件 
		$('#disp-table').on('click','.beforpay-wiewsub',function () {
			// 隐藏二级界面
			$('.dropshippingStatus-nav').hide();
			// 隐藏所有的子订单页面
			$('.sub-orders').hide();
			//显示对应的子订单
			$('.awaitpay-subOrders').show();
		})
		//给交易成功添加显示隐藏子订单
		$('#comp-table').on('click','.beforpay-wiewsub',function () {
			// 隐藏二级界面
			$('.dropshippingStatus-nav').hide();
			// 隐藏所有的子订单页面
			$('.sub-orders').hide();
			//显示对应的子订单
			$('.awaitpay-subOrders').show();
		})
		//给交易关闭添加显示隐藏子订单
		$('#close-table').on('click','.beforpay-wiewsub',function () {
			// 隐藏二级界面
			$('.dropshippingStatus-nav').hide();
			// 隐藏所有的子订单页面
			$('.sub-orders').hide();
			//显示对应的子订单
			$('.awaitpay-subOrders').show();
		})
		// $('.beforpay-wiewsub').click(function () {
		// 	//隐藏代发订单的首页
		// 	// $('.dropshipping-show').hide();
		// 	// 隐藏二级界面
		// 	$('.dropshippingStatus-nav').hide();
		// 	// 隐藏付款后（备货中 已发送 交易成功）的子订单页面
		// 	$('.payAfter-subOrders').hide();
		// 	// 隐藏交易关闭的子订单页面
		// 	$('.closed-subOrders').hide();
		// 	$('.sub-orders').show();
		// })
		//给备货中 已发货 交易成功的子订单添加点击事件
		$('.afterpay-viewsub').click(function () {
			//隐藏代发订单的首页
			// $('.dropshipping-show').hide();
			//隐藏二级界面
			$('.dropshippingStatus-nav').hide();
			// 隐藏未款的子订单页面
			$('.sub-orders').hide();
			// 隐藏交易关闭的子订单页面
			$('.closed-subOrders').hide();
			$('.processing-subOrders').show();
		})
		// 给交易关闭添加点击查看对应的子订单
		$('.closed-viewsub').click(function () {
			//隐藏代发订单的首页
			// $('.dropshipping-show').hide();
			// 隐藏二级界面
			$('.dropshippingStatus-nav').hide();
			//隐藏未付款的子订单部分
			$('.sub-orders').hide();
			// 隐藏付款后（备货中 已发送 交易成功）的子订单页面
			$('.payAfter-subOrders').hide();
			$('.closed-subOrders').show();
		})


		// $('.drop-orderstatus-nav').click(function(){
		// 	// alert(1)
		// 	console.log('daifadingdan')
		// 	//隐藏代发订单的首页
		// 	$('.dropshipping-show').css('display','none');
		// 	//隐藏未付款的子订单部分
		// 	$('.sub-orders').hide();
		// 	// 隐藏付款后（备货中 已发送 交易成功）的子订单页面
		// 	$('.payAfter-subOrders').css('display','none');
		// 	// 隐藏交易关闭的子订单页面
		// 	$('.closed-subOrders').css('display','none');
		// 	// alert(1)
		// 	var index = $('.drop-orderstatus-nav').index(this);
		// 	console.log(index)
		// 	$('.drop-orderstatus-nav').css({
		// 		backgroundColor: '#545662',
		// 		color: '#fff'
		// 	});
		// 	$(this).css({
		// 		backgroundColor: '#fff',
		// 		color: '#3f3f3f'
		// 	});
		// 	//让对应的二级界面显示
		// 	$('.dropshippingStatus-nav').css('display','none');
		// 	$('.dropshippingStatus-nav').eq(index).css('display','block');
		// 	console.log('1111111')
		// })

		// //给未付款的子订单添加点击事件
		// $('.beforpay-wiewsub').click(function () {
		// 	//隐藏代发订单的首页
		// 	$('.dropshipping-show').css('display','none');
		// 	// 隐藏二级界面
		// 	$('.dropshippingStatus-nav').css('display','none');
		// 	// 隐藏付款后（备货中 已发送 交易成功）的子订单页面
		// 	$('.payAfter-subOrders').css('display','none');
		// 	// 隐藏交易关闭的子订单页面
		// 	$('.closed-subOrders').css('display','none');
		// 	$('.sub-orders').show();
		// })
		// //给备货中 已发货 交易成功的子订单添加点击事件
		// $('.afterpay-viewsub').click(function () {
		// 	//隐藏代发订单的首页
		// 	$('.dropshipping-show').css('display','none');
		// 	//隐藏二级界面
		// 	$('.dropshippingStatus-nav').css('display','none');
		// 	// 隐藏未款的子订单页面
		// 	$('.sub-orders').css('display','none');
		// 	// 隐藏交易关闭的子订单页面
		// 	$('.closed-subOrders').css('display','none');
		// 	$('.payAfter-subOrders').show();
		// })
		// // 给交易关闭添加点击查看对应的子订单
		// $('.closed-viewsub').click(function () {
		// 	//隐藏代发订单的首页
		// 	$('.dropshipping-show').css('display','none');
		// 	// 隐藏二级界面
		// 	$('.dropshippingStatus-nav').css('display','none');
		// 	//隐藏未付款的子订单部分
		// 	$('.sub-orders').hide();
		// 	// 隐藏付款后（备货中 已发送 交易成功）的子订单页面
		// 	$('.payAfter-subOrders').css('display','none');
		// 	$('.closed-subOrders').show();
		// })






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
		
		//设置下单时间
		var orderData = new Date();
		var orderyear = orderData.getFullYear();
		var ordermonth = orderData.getMonth() + 1;
		var orderday = orderData.getDate();
		var orderhour = orderData.getHours();
		var ordermin = orderData.getMinutes();
		// var ordersecond = orderData.getSeconds();
		var $p1 = $('<p>'+orderyear + '-'+ordermonth+'-'+orderday+orderhour + ':'+ordermin+'</p>');
		// var $p2 = $('<p>'+orderhour + ':'+ordermin+'</p>');
		$('.order-time').append($p1);
		// $('.order-time').append($p2);
		// 设置备注 Note
		// $('.order-note').click(function () {
		// 	var index1 = $('.order-note').index(this);//获取被点击的note的下标
		// 	console.log(index1);
		// 	layer.prompt({
		// 	  formType: 2,
		// 	  value: '',
		// 	  title: 'Note',
		// 	  closeBtn:0,
		// 	  btn:['conform','cancle'],
		// 	  shadeClose: true,
		// 	  area: ['350px', '150px'] //自定义文本域宽高
		// 	}, function(value, index){
		// 		var value1 = value;//记录输入框的值
		// 	  var remarkImg = $('<img class="note-message" style="margin-left:5px;" title='+value1+' src="static/image/direct-orders/iconflag.png">');
		// 	  // console.log(value+1)
		// 	  // console.log(value1)
		// 	  if ($('.order-note').eq(index1).find('img').length==0) {
		// 	  	$('.order-note').eq(index1).append(remarkImg);
		// 	  } else {
		// 	  	$('.order-note').eq(index1).children('.note-message').attr('title',value1);
		// 	  }
		// 	  // $('.order-note').eq(index1).append(remarkImg);
		// 	  layer.close(index);
		// 	  layer.msg('',{
		// 	    // icon: 2,
		// 	    content:'<ul><li><img src="static/image/direct-orders/iconsuccess.png"></li><li>Setting Sucessfuly</li></ul>',
		// 	    time: 2000 //2秒关闭（如果不配置，默认是3秒）
		// 	  }, function(){
		// 	    //do something
		// 	  }); 
		// 	});
		// })
		// 取消订单的弹框
		$('.cancel-orders').click(function () {
			// var index1 = $('.order-note').index(this);//获取被点击的note的下标
			// console.log(index1);
			layer.open({
				content:"<p>Are you sure to cancel the selected orders?</p><p style='margin-top:24px;'>Selected  1</p>",
				area: ['480px', '200px'],
				closeBtn: 0,
				shadeClose: true,
				title:"Cancel Orders",
				skin:"",
				btn:['cancle','conform'],
				yes: function(index, layero){
				    //按钮【按钮一】的回调
				    layer.close(index);
				  },
				btn2: function(index, layero){
				    //按钮【按钮二】的回调
				    // return false //开启该代码可禁止点击该按钮关闭
				    layer.open({
				    	area:['709px','385px'],
				    	// time:1000,
				    	title:null,
				    	closeBtn:0,
				    	btn:0,
				    	time:10000,
				    	shadeClose: true,
				    	skin:'note-sucess',
				    	content:'<p style="text-align:center;margin-bottom:20px;"><img src="/static/image/public-img/success.png"></p><p style="text-align:center">Orders Cancelled Successfully！</p>'
				    })
				  },
				cancel: function(){ 
				    //右上角关闭回调
				    
				    //return false 开启该代码可禁止点击该按钮关闭
				  }
			});
		})
		//自动订单 未提交订单的弹出框
		$('.reject-orders').click(function () {
			// var index1 = $('.order-note').index(this);//获取被点击的note的下标
			// console.log(index1);
			layer.open({
				type:2,
				content:"reject.html",
				// content:"login.html",
				area: ['1075px', '917px'],
				closeBtn: 0,
				shadeClose: true,
				title:"Reject",
				// skin:"invalid-orders",
				skin:"reject-layer",
				btn:['Back','Reject'],
				yes: function(index, layero){
				    //按钮【按钮一】的回调
				    layer.close(index);
				  },
				btn2: function(index, layero){
				    //按钮【按钮二】的回调
				    return false //开启该代码可禁止点击该按钮关闭
				}
			});
		})

		//给代付款添加选中非选中事件
		var awitIndex = 0;
		$('#await-table').on('click','.zcheckbox',function () {
			if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
				$(this).attr('src','static/image/direct-orders/multiple2.png');
				awitIndex++;
				if (awitIndex == $('#await-table .zcheckbox').length) {
					// alert('quanbuxuanzhogn')
					$('#await-table .zchecked-all').attr('src','static/image/direct-orders/multiple2.png');
				}
			} else {
				$(this).attr('src','static/image/direct-orders/multiple1.png');
				awitIndex--;
				if (awitIndex != $('#await-table .zcheckbox').length) {
					$('#await-table .zchecked-all').attr('src','static/image/direct-orders/multiple1.png');
				}
				
			}
		})
		//全选
		$('#await-table').on('click','.zchecked-all',function () {
			if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
				$(this).attr('src','static/image/direct-orders/multiple2.png');
				awitIndex = $('#await-table .zcheckbox').length;
				$('#await-table .zcheckbox').attr('src','static/image/direct-orders/multiple2.png');
			} else {
				$(this).attr('src','static/image/direct-orders/multiple1.png');
				awitIndex = 0;
				$('#await-table .zcheckbox').attr('src','static/image/direct-orders/multiple1.png');
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
		//给dispatched下的订单添加选中非选中
		var dispIndex = 0;
		$('#disp-table').on('click','.zcheckbox',function () {
			if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
				$(this).attr('src','static/image/direct-orders/multiple2.png');
				dispIndex++;
				if (dispIndex == $('#disp-table .zcheckbox').length) {
					// alert('quanbuxuanzhogn')
					$('#disp-table .zchecked-all').attr('src','static/image/direct-orders/multiple2.png');
				}
			} else {
				$(this).attr('src','static/image/direct-orders/multiple1.png');
				dispIndex--;
				if (dispIndex != $('#disp-table .zcheckbox').length) {
					$('#disp-table .zchecked-all').attr('src','static/image/direct-orders/multiple1.png');
				}
				
			}
		})
		//全选
		$('#disp-table').on('click','.zchecked-all',function () {
			if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
				$(this).attr('src','static/image/direct-orders/multiple2.png');
				dispIndex = $('#disp-table .zcheckbox').length;
				$('#disp-table .zcheckbox').attr('src','static/image/direct-orders/multiple2.png');
			} else {
				$(this).attr('src','static/image/direct-orders/multiple1.png');
				dispIndex = 0;
				$('#disp-table .zcheckbox').attr('src','static/image/direct-orders/multiple1.png');
			}
		})
		//给completed下的订单添加选中非选中
		var compIndex = 0;
		$('#comp-table').on('click','.zcheckbox',function () {
			if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
				$(this).attr('src','static/image/direct-orders/multiple2.png');
				compIndex++;
				if (compIndex == $('#comp-table .zcheckbox').length) {
					// alert('quanbuxuanzhogn')
					$('#comp-table .zchecked-all').attr('src','static/image/direct-orders/multiple2.png');
				}
			} else {
				$(this).attr('src','static/image/direct-orders/multiple1.png');
				compIndex--;
				if (compIndex != $('#comp-table .zcheckbox').length) {
					$('#comp-table .zchecked-all').attr('src','static/image/direct-orders/multiple1.png');
				}
				
			}
		})
		//全选
		$('#comp-table').on('click','.zchecked-all',function () {
			if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
				$(this).attr('src','static/image/direct-orders/multiple2.png');
				compIndex = $('#comp-table .zcheckbox').length;
				$('#comp-table .zcheckbox').attr('src','static/image/direct-orders/multiple2.png');
			} else {
				$(this).attr('src','static/image/direct-orders/multiple1.png');
				compIndex = 0;
				$('#comp-table .zcheckbox').attr('src','static/image/direct-orders/multiple1.png');
			}
		})
		//给closed下的订单添加选中非选中
		var closeIndex = 0;
		$('#close-table').on('click','.zcheckbox',function () {
			if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
				$(this).attr('src','static/image/direct-orders/multiple2.png');
				closeIndex++;
				if (closeIndex == $('#close-table .zcheckbox').length) {
					// alert('quanbuxuanzhogn')
					$('#close-table .zchecked-all').attr('src','static/image/direct-orders/multiple2.png');
				}
			} else {
				$(this).attr('src','static/image/direct-orders/multiple1.png');
				closeIndex--;
				if (closeIndex != $('#close-table .zcheckbox').length) {
					$('#close-table .zchecked-all').attr('src','static/image/direct-orders/multiple1.png');
				}
				
			}
		})
		//全选
		$('#close-table').on('click','.zchecked-all',function () {
			if ($(this).attr('src')=='static/image/direct-orders/multiple1.png') {
				$(this).attr('src','static/image/direct-orders/multiple2.png');
				closeIndex = $('#close-table .zcheckbox').length;
				$('#close-table .zcheckbox').attr('src','static/image/direct-orders/multiple2.png');
			} else {
				$(this).attr('src','static/image/direct-orders/multiple1.png');
				closeIndex = 0;
				$('#close-table .zcheckbox').attr('src','static/image/direct-orders/multiple1.png');
			}
		})
		//获取等待付款的子订单的数据
		$('#await-table').on('click','.viewSub-orders',function () {
			console.log($scope.awitPaymuid)
			var aa = {};
			// aa.data={};
			aa.id = $scope.awitPaymuid;
			// aa.data=JSON.stringify(aa.data)
			dsp.postFun('app/order/getShipmentsOrder',JSON.stringify(aa),function (data) {
				console.log(data);
				alert(433)
			},function () {
				alert(333)
			})
		})
		//按条件分页 上dsp
		$('.jump-btn1').click(function () {
			var selectVal = 1;//复选框的值
			selectVal = $('.select-page-num1').val()-0;
			// alert(selectVal);
			var inpVal = $('.inp-num-go1').val();//输入框 需要跳到第几页
			// alert(inpVal)
			var countN = Math.ceil($scope.erpordTnum/selectVal);
			// alert(countN)
			if (inpVal=='') {
				layer.msg('The value of the input box cannot be empty!');
				return;
			}
			if (inpVal>countN) {
				layer.msg('输入的值不能大于总页数');
				return;
			}
			$(".pagination-demo").jqPaginator({
			    totalCounts: $scope.erpordTnum,
			    pageSize: selectVal,
			    visiblePages: 5,
			    currentPage: 1,
			    activeClass: 'active',
			    first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
			    prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
			    next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
			    last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
			    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
			    onPageChange: function (n) {
			        $("#pagination-demo-text").html("当前第" + n + "页");
			        var dapData = {};
			        dapData.userId = "{8DA0EC3E-E4A7-4D9B-8876-2A025515EBE0}";
			        dapData.token = "";
			        dapData.data = {};
			        dapData.data.status = '2';
			        dapData.data.page = 1;
			        dapData.data.limit = selectVal;
			        dapData.data = JSON.stringify(dapData.data);
			        console.log(dapData)
			        var cjdropawaitp = '';//存储订单的所有数据
			        $scope.cjdropawaitpList = '';//存储所有的订单
			        console.log(JSON.stringify(dapData))
			        dsp.postFun('app/order/queryShipmentsOrder',JSON.stringify(dapData),function (data) {
			        	// alert(123)
			        	console.log(data.data) 
			        	// console.log(orderData.result)
			        	cjdropawaitp = JSON.parse(data.data.result)
			        	$scope.erpordTnum = cjdropawaitp.countNumber;
			        	$scope.cjdropawaitpList = cjdropawaitp.orderList;
			        	console.log($scope.cjdropawaitpList)
			        })
			    }
			});
		})
		//按条件分页 下
		$('.jump-btn2').click(function () {
			var selectVal = 1;//复选框的值
			selectVal = $('.select-page-num2').val()-0;
			// alert(selectVal);
			// var inpVal = 0;//存储输入框的值
			var inpVal = $('.inp-num-go2').val();//输入框 需要跳到第几页
			// alert(inpVal)
			if (inpVal=='') {
				layer.msg('The value of the input box cannot be empty!');
				return;
			}
			var countN = Math.ceil($scope.erpordTnum/selectVal);
			// alert(countN)
			if (inpVal>countN) {
				layer.msg('输入的值不能大于总页数');
				return;
			}
			$(".pagination-demo").jqPaginator({
			    totalCounts: $scope.erpordTnum,
			    pageSize: selectVal,
			    visiblePages: 5,
			    currentPage: 1,
			    activeClass: 'active',
			    first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
			    prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
			    next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
			    last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
			    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
			    onPageChange: function (n) {
			        $("#pagination-demo-text").html("当前第" + n + "页");
			        var dapData = {};
			        dapData.userId = "{8DA0EC3E-E4A7-4D9B-8876-2A025515EBE0}";
			        dapData.token = "";
			        dapData.data = {};
			        dapData.data.status = '2';
			        dapData.data.page = 1;
			        dapData.data.limit = selectVal;
			        dapData.data = JSON.stringify(dapData.data);
			        console.log(dapData)
			        var cjdropawaitp = '';//存储订单的所有数据
			        $scope.cjdropawaitpList = '';//存储所有的订单
			        console.log(JSON.stringify(dapData))
			        dsp.postFun('app/order/queryShipmentsOrder',JSON.stringify(dapData),function (data) {
			        	// alert(123)
			        	console.log(data.data) 
			        	// console.log(orderData.result)
			        	cjdropawaitp = JSON.parse(data.data.result)
			        	$scope.erpordTnum = cjdropawaitp.countNumber;
			        	$scope.cjdropawaitpList = cjdropawaitp.orderList;
			        	console.log($scope.cjdropawaitpList)
			        })
			    }
			});
		})
		//分页
		function pageFun() {
			// alert($scope.erpordTnum)
			if ($scope.erpordTnum==0) {
				return;
			}
			$(".pagination-demo").jqPaginator({
			    totalCounts: $scope.erpordTnum,
			    pageSize: $scope.dropOrdLimit,
			    visiblePages: 5,
			    currentPage: 1,
			    activeClass: 'active',
			    first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
			    prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
			    next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
			    last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
			    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
			    onPageChange: function (n) {
			        $("#pagination-demo-text").html("当前第" + n + "页");
			        // var dapData = {};
			        // dapData.userId = "{8DA0EC3E-E4A7-4D9B-8876-2A025515EBE0}";
			        // dapData.token = "";
			        // dapData.data = {};
			        dapData.data=JSON.parse(dapData.data)
			        console.log(dapData.data)
			        dapData.data.page = n;
			        // alert(n)
			        dapData.data = JSON.stringify(dapData.data);
			        console.log(dapData)
			        var cjdropawaitp = '';//存储订单的所有数据
			        // console.log(JSON.stringify(dapData))
			        dsp.postFun('app/order/queryShipmentsOrder',JSON.stringify(dapData),function (data) {
			        	// alert(123)
			        	console.log(data.data) 
			        	// console.log(orderData.result)
			        	cjdropawaitp = JSON.parse(data.data.result);
			        	$scope.erpordTnum = cjdropawaitp.countNumber;
			        	$scope.cjdropawaitpList = cjdropawaitp.orderList;
			        	console.log($scope.cjdropawaitpList)
			        })
			    }
			});
		}
		// var pageH = $(window).height()-80;
		// var docH = $(document).height();
		$('.d-direct-right').css({
		  'min-height': $(window).height() * 1 -15 + 'px'
		});
		
		// $('.direct-right').height()
		$('.orders-list').on('click','.cj-order-num',function () {
			location.href="#/order-detail";
		})
	}])
})()