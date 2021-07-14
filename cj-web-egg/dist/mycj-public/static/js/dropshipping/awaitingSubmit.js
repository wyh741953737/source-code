(function (angular) {
	var app = angular.module('awaitingSubmitApp', []);
	app.controller('awaitingSubmitAppCtrl',['$scope', function ($scope) {

		$scope.currentSelectTrue = true;

		$scope.splitOrder = function () {
			layer.open({
		    title: null,
		    type: 1,
		    area: ['994px', '539px'],
		    skin: 'split-orders-layer',
		    closeBtn: 0,
		    content: $('#split-orders').html(),
		    btn: ['Cancel', 'Authorization'],
		    yes: function(index, layero){
		        //按钮【按钮一】的回调
		        layer.close(index);
		      },
		    btn2: function(index, layero){
		        //按钮【按钮二】的回调
		        $.get('./1.json',function () {
		          
		        })
		        return false //开启该代码可禁止点击该按钮关闭
		      },
		    cancel: function(){ 
		        //右上角关闭回调
		        
		        //return false 开启该代码可禁止点击该按钮关闭
		      }
		  });
		}

		$scope.combineOrder = function () {
			layer.open({
		    title: null,
		    type: 1,
		    area: ['1276px', '580px'],
		    skin: 'split-orders-layer combine-order-layer',
		    closeBtn: 0,
		    content: $('#combine-order').html(),
		    btn: ['Cancel', 'Authorization'],
		    yes: function(index, layero){
		        //按钮【按钮一】的回调
		        layer.close(index);
		      },
		    btn2: function(index, layero){
		        //按钮【按钮二】的回调
		        $.get('./1.json',function () {
		          
		        })
		        return false //开启该代码可禁止点击该按钮关闭
		      },
		    cancel: function(){ 
		        //右上角关闭回调
		        
		        //return false 开启该代码可禁止点击该按钮关闭
		      }
		  });
		}


	}])
})(angular)