var app = angular.module('myApp', ['ngCookies', 'bsTable']);
app.directive('initTable', function($compile) {
  return {
    restrict: 'A',
    link: function(scope, el, attrs) {
        var opts = scope.$eval(attrs.initTable);
        opts.onLoadSuccess = function() {
            $compile(el.contents())(scope); 
        };
        el.bootstrapTable(opts);
    }
  };
}); 
app.controller('tableCtrl', function($scope, $cookies, $http, $timeout, $interval) { 
  $scope.data = '';
  $scope.isFalse = true;// 访问成功
  $scope.isHttp = true;// 访问失败
  $scope.isDel = true;// 未选择对象
  $scope.startDate = '';
  $scope.endDate = '';
  $scope.httpMsg = '';
  $scope.fileId = '';
  $scope.userId = $cookies.get('userId');// 读取cookie存的userID
  $scope.token = $cookies.get('token');// 读取cookie存的token
  // 日志列表  
  $scope.options = {
    method: 'post',
    url: 'cfg',
    toolbar: '#toolbar',
    search: true,
    searchAlign: 'left',
    queryParams: function(pageSize) {
      pageSize.startDate = $scope.startDate;
      pageSize.endDate = $scope.endDate;
      if (pageSize.search == undefined) {
        pageSize.search = '';
      }
      if (pageSize.startDate == undefined) {
        pageSize.startDate = '';
      }
      if (pageSize.endDate == undefined) {
        pageSize.endDate = '';
      }
      var result = {"userId":$scope.userId, "token":$scope.token, "data":'{"limit":' + pageSize.limit + ', "start":' + pageSize.offset +', "sort":"' + pageSize.sort + '$' + pageSize.order.toUpperCase() + '", "filter":{"SEARCH$LTE$createDate": "' + pageSize.endDate + '", "SEARCH$GTE$createDate": "' + pageSize.startDate + '", "SEARCH$LIKE$name": "'+pageSize.search+'"}}}'};
      return result;
    },
    ajaxOptions:{headers : {'contentType' : 'application/json','url-mapping' : '/app/att/list'}},
    pagination: true,
    sidePagination: 'server',
    height: '800',
    striped: true,
    sortName:'createDate', 
    sortOrder: "DESC",
    showRefresh: true,
    pageSize: 20,
    pageList: [20],
    responseHandler:function(data) {
      if (data == '') {
        return data;
      } else {
          if(data.statusCode == 200) {          
          // console.log(angular.fromJson(data.result).root);
          var result = {total:angular.fromJson(data.result).totalProperty, rows:angular.fromJson(data.result).root};// 服务器端分页模式data特定格式,客户端直接返回data数组
          $scope.data = result;
          return result;
        }
      } 
    },
    columns: [
      {
        title: '全选',
        checkbox: true
      },{
        title: '序号',
        align: 'center',
        valign: 'middle',
        width: 100,
        formatter: function (value, row, index) {  
          return index + 1;  
        }  
      },{
        field: 'name',
        title: '文件名',
        align: 'center',
        valign: 'middle'
      },{
        field: 'memo',
        title: '描述',
        align: 'center',
        valign: 'middle'
      },{
        field: 'createUser',
        title: '发布人',
        align: 'center',
        valign: 'middle'
      },{
        field: 'createDate',
        title: '上传时间',
        align: 'center',
        valign: 'middle'
      },{

        title: '操作',
        align: 'left',
        valign: 'middle',
        formatter: function (value, row, index) {
          return '<a class="btn btn-xs" ng-click="btnEditarClick(' + index + ')" title="编辑" data-target="#Modal-exdit" data-toggle="modal"><span class="glyphicon glyphicon-pencil"></span></a>' +
          '<a class="btn btn-xs" ng-click="btnRemoveClick(' + index + ')" data-toggle="modal" title="删除"><span class="glyphicon glyphicon-trash"></span></a>'; 
        }
      }]
  };
  // 监听时间选择
  $scope.timeSelect = function() {
    $('#table').bootstrapTable('refresh');  // 刷新列表 
  }
  //日期
  $scope.date = function() {
    // 出生日期
    $('.start_date').datetimepicker({
        format:'yyyy-mm-dd hh:ii:ss',
        language:'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
    $('.end_date').datetimepicker({
        format:'yyyy-mm-dd hh:ii:ss',
        language:'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
  }();
  // 文件上传
  $scope.fileName = '';
  $scope.upFile = function(file) {
    // 附件导入
    if (file[0].size < 41943040) {
      $scope.fileName = file[0].name;
      $scope.$apply();
    } else {
      $scope.file = '';
      layer.msg('文件大小不能超过40M',{time: 2000, icon:5});
    }
  }
  // 新增清除
  $scope.fileClear = function() {
    $scope.fileName = '';
    $scope.memo = '';
    angular.element(".J_export").val(null);
    $scope.proShow = false;//进度条是否显示
    $scope.progreNum = 0; //进度条数据
      $scope.proWidth = {};
  }
  // 文件上传
  $scope.proShow = false;//进度条是否显示
  $scope.progreNum = 0; //进度条数据
    $scope.proWidth = {};
  $scope.upExcel = function(file) {
    if (angular.element(".J_export").val() == null || angular.element(".J_export").val() == '') { 
      layer.msg('请选择文件', {icon: 5});  
    } else if($scope.memo != undefined && $scope.memo.length > 50) {
      layer.msg('文件描述最多50字符', {icon: 5});
    } else {      
      function addProgre() {
        if ($scope.progreNum <= 90) {        
          $scope.progreNum += 5;
          angular.element('.J_prgress').css('width', $scope.progreNum + '%');
          if ($scope.progreNum >= 70) { 
            $interval.cancel(loaing); 
            $( "#uploadFile" ).submit();
            $("#file_upload_return")[0].onload = function(){ 
              var upResult = $("#file_upload_return").contents().find("body pre").html();
              upResult = angular.fromJson(upResult);
              if (upResult.statusCode == 200) {
                $scope.progreNum = 100;
                angular.element('.J_prgress').css('width', $scope.progreNum + '%');
                layer.msg('上传成功',{time: 2000, icon:6});
                $scope.proShow = false;
                $('#Modal-add').modal('hide');
                $('#table').bootstrapTable('refresh');
              } else {
                layer.msg(upResult.message,{time: 2000, icon:5});
              }
            };
          }  
        }
      }
      $scope.proShow = true;
      var loaing = $interval(addProgre, 100);
    }
  }
  // 文件下载
  $scope.downExcel = function(file) {
    var chooseList = $('#table').bootstrapTable('getAllSelections');
    if (chooseList.length > 0) {        
      $scope.fileId = {};
      $scope.fileId.ids = [];
      if (chooseList != '') {        
        // console.log(chooseList);       
        angular.forEach(chooseList, function(data,index,array){
          $scope.fileId.ids.push(data.id);          
        });
      }
      $scope.fileId = angular.toJson($scope.fileId);
      $('.fileId').val($scope.fileId);
      $( "#exportFile" ).submit();
    } else {
      layer.msg('请选择数据', {icon: 5});
    }
  }    
  // 删除
  $scope.btnRemoveClick = function(delIndex) {
    layer.confirm('确定删除此文件？', {
      title: '操作提示',
      icon: 3,
      btn: ['取消','确认'] //按钮
      }, function(ca){
        layer.close(ca);
      }, function(index){
        // 获取选择对象 
        $scope.isTrueDel = false;
        var deletList = {};// 删除对象
        deletList.userId = $scope.userId;
        deletList.token = $scope.token;
        deletList.data = {};
        deletList.data.ids = [];
        if (delIndex === '') {
          var chooseList = $('#table').bootstrapTable('getAllSelections');
          if (chooseList != '') {        
            // console.log(chooseList);       
            angular.forEach(chooseList, function(data,index,array){
              deletList.data.ids.push(data.id);          
            });
            $scope.isTrueDel = true;
          } else {
            $scope.isTrueDel = false;
            layer.msg('请选择数据', {icon: 5});
            $timeout(function() {$scope.isDel = false;}, 2000);
          }
        } else {
          $scope.isTrueDel = true;
          deletList.data.ids.push($scope.data.rows[delIndex].id);
        }
        if ($scope.isTrueDel) {
            deletList.data = JSON.stringify(deletList.data);
            deletList = JSON.stringify(deletList);
            // 接口访问
            $http.post('cfg', deletList, {
            headers : {'contentType' : 'application/json','url-mapping' : '/app/att/delete'}
            }).success(function(data, status, headers, config) {
                console.log(data);
                var code = data.statusCode;
                if (code != 200){
                    $scope.isHttp = false;
                    layer.msg(data.message, {icon: 5});
                    $timeout(function() {$scope.isHttp = true;}, 2000);
                } else {
                    $scope.isFalse = false;
                    $timeout(function() {$scope.isFalse = true;}, 2000); 
                    $('#table').bootstrapTable('refresh');  // 刷新列表
                    layer.close(index);          
                }
                //...
            }).error(function(data, status, headers, config ) {
                window.location.href = 'error.html';
            });
        }
    });
  }
  // 编辑
  $scope.btnEditarClick = function(index) {
    // console.log($scope.data.rows[index]);
    // 填充数据
    $scope.editFile = $scope.data.rows[index];
    $scope.fileName = $scope.editFile.name;
    $scope.memo = $scope.editFile.memo;
    $scope.id = $scope.editFile.id;
  };
  // 保存编辑
  $scope.addBtnEditarClick = function() {
      if ($scope.memo != undefined && $scope.memo.length <= 50) {          
        // 保存数据
        var editFile = {};
        editFile.data = $scope.editFile;
        editFile.userId = $scope.userId;
        editFile.token = $scope.token;
        editFile.data.memo = $scope.memo;
        editFile.data.id = $scope.id;
        editFile.data = JSON.stringify(editFile.data);
        editFile = JSON.stringify(editFile);
        // 接口访问
        $http.post('cfg', editFile, {
        headers : {'contentType' : 'application/json','url-mapping' : '/app/att/update'}
        }).success(function(data, status, headers, config) {
            // console.log(data);
            var code = data.statusCode;
            if (code != 200){
                $scope.isHttp = false;
                layer.msg(data.message, {icon: 5});
                $timeout(function() {$scope.isHttp = true;}, 2000);
            } else {
                $scope.isFalse = false;
                $('#Modal-exdit').modal('hide');
                $timeout(function() {$scope.isFalse = true;}, 2000); 
                $('#table').bootstrapTable('refresh');  // 刷新列表          
            }
            //...
        }).error(function(data, status, headers, config ) {
            window.location.href = 'error.html';
        });
      } else {
        layer.msg('文件描述最多50字符', {icon: 5});
      }
  };
});