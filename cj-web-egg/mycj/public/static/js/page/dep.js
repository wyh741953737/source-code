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
app.controller('tableCtrl', function($scope, $cookies, $http, $timeout) { 
  $scope.data = '';
  $scope.isFalse = true;// 访问成功
  $scope.isHttp = true;// 访问失败
  $scope.isDel = true;// 未选择对象
  $scope.httpMsg = '';
  $scope.userId = $cookies.get('userId');// 读取cookie存的userID
  $scope.token = $cookies.get('token');// 读取cookie存的token
  // 角色列表  
  $scope.options = {
    method: 'post',
    url: 'cfg',
    queryParams: function(pageSize, pageNumber, searchText) {
      //查询功能, "SEARCH$LIKE$name": "'+pageSize.search+'"//此代码加入filter
      /*if (pageSize.search == undefined) {
        pageSize.search = '';
      }*/
      var result = {"userId":$scope.userId, "token":$scope.token, "data":'{"limit":' + pageSize.limit + ', "start":' + pageSize.offset +', "sort":"", "filter":{"SEARCH$NEQ$name": "超级管理员"}}'};
      return result;
    },
    ajaxOptions:{headers : {'contentType' : 'application/json','url-mapping' : '/app/role/list'}},
    pagination: true,
    showRefresh: true,
    sidePagination: 'server',
    height: '800',
    striped: true,
    pageSize: 20,
    pageList: [20],
    toolbar: '#toolbar',
    responseHandler:function(data) {
      if (data == '') {
        return data;
      } else {
          if(data.statusCode == 200) {          
          // console.log(angular.fromJson(data.result).root);
          var result = {total:angular.fromJson(data.result).totalProperty, rows:angular.fromJson(data.result).root};// 服务器端分页模式data特定格式,客户端直接返回data数组
          $scope.data = result;
          return result;
        } else if (code == '203') {
          window.location.href = 'error.html';
        }
      } 
    },
    columns: [{
        title: '序号',
        align: 'right',
        valign: 'middle',
        width: 100,
        formatter: function (value, row, index) {  
          return index + 1;  
        }  
      },{
        field: 'name',
        title: '角色名字',
        align: 'center',
        valign: 'middle',
        sortable: true
      },{
        title: '操作',
        align: 'center',
        valign: 'middle',
        width: 200,
        formatter: function (value, row, index) {
          // console.log(row);
          return '<a class="btn btn-xs" title="编辑权限" ng-click="btnEditarClick(' + index + ')" data-target="#Modal-exdit" data-toggle="modal"><span class="glyphicon glyphicon-pencil"></span></a>' +
          '<a class="btn btn-xs" ng-click="btnNovoClick(' + index + ')" data-toggle="modal" title="删除"><span class="glyphicon glyphicon-trash"></span></a>'; 
        } 
    }]
  };
  // 控制radio
  // 定义radio列表
  $scope.allRadio = false;// 全选
  $scope.userRadio = false;// 用户管理
  $scope.owerRadio = false;// 权限管理
  $scope.owerRadioType = false;// 权限管理-分组管理
  $scope.owerRadioConsole = false;// 权限管理-操作日志
  $scope.fileRadio = false;// 文件管理
  $scope.userRadioCount = false;// 人员统计
  $scope.moneyRadio = false;// 资产管理
  $scope.deviceRadio = false;// 设备统计
  $scope.moneyRadioDevice = false;// 设备管理
  $scope.moneyRadioType = false;// 设备分组管理
  // 控制radio 点击事件
  $scope.clickRadio = function(radio) {
    if (radio == 'allRadio') {
      if ($scope.allRadio) {
        $scope.allRadio = false;// 全选
        $scope.userRadio = false;// 用户管理
        $scope.owerRadio = false;// 权限管理
        $scope.owerRadioType = false;// 权限管理-分组管理
        $scope.owerRadioConsole = false;// 权限管理-操作日志
        $scope.fileRadio = false;// 文件管理
        $scope.userRadioCount = false;// 人员统计
        $scope.moneyRadio = false;// 资产管理
        $scope.deviceRadio = false;// 设备统计
        $scope.moneyRadioDevice = false;// 设备管理
        $scope.moneyRadioType = false;// 设备分组管理
      } else {
        $scope.allRadio = true;// 全选
        $scope.userRadio = true;// 用户管理
        $scope.owerRadio = true;// 权限管理
        $scope.owerRadioType = true;// 权限管理-分组管理
        $scope.owerRadioConsole = true;// 权限管理-操作日志
        $scope.fileRadio = true;// 文件管理
        $scope.userRadioCount = true;// 人员统计
        $scope.moneyRadio = true;// 资产管理
        $scope.deviceRadio = true;// 设备统计
        $scope.moneyRadioDevice = true;// 设备管理
        $scope.moneyRadioType = true;// 设备分组管理
      }
    } else if (radio == 'owerRadio') {
      if ($scope.owerRadio) {
        $scope.owerRadio = false;// 权限管理
        $scope.owerRadioType = false;// 权限管理-分组管理
        $scope.owerRadioConsole = false;// 权限管理-操作日志
      } else {
        $scope.owerRadio = true;// 权限管理
        $scope.owerRadioType = true;// 权限管理-分组管理
        $scope.owerRadioConsole = true;// 权限管理-操作日志
      }
    } else  if(radio == 'userRadio'){
      if ($scope.userRadio) {
        $scope.userRadio = false;
      } else {
        $scope.userRadio = true;
      }
    } else  if(radio == 'owerRadioType'){
      if ($scope.owerRadioType) {
        $scope.owerRadioType = false;
      } else {
        $scope.owerRadioType = true;
      }
    } else  if(radio == 'owerRadioConsole'){
      if ($scope.owerRadioConsole) {
        $scope.owerRadioConsole = false;
      } else {
        $scope.owerRadioConsole = true;
      }
    } else  if(radio == 'fileRadio'){
      if ($scope.fileRadio) {
        $scope.fileRadio = false;
      } else {
        $scope.fileRadio = true;
      }
    } else  if(radio == 'userRadioCount'){
      if ($scope.userRadioCount) {
        $scope.userRadioCount = false;
      } else {
        $scope.userRadioCount = true;
      }
    } else  if(radio == 'moneyRadio'){
      if ($scope.moneyRadio) {
        $scope.moneyRadio = false;
        $scope.moneyRadioDevice = false;// 设备管理
        $scope.moneyRadioType = false;// 设备分组管理
      } else {
        $scope.moneyRadio = true;
        $scope.moneyRadioDevice = true;// 设备管理
        $scope.moneyRadioType = true;// 设备分组管理
      }
    } else  if(radio == 'moneyRadioDevice'){
      if ($scope.moneyRadioDevice) {
        $scope.moneyRadioDevice = false;
      } else {
        $scope.moneyRadioDevice = true;
      }
    } else  if(radio == 'moneyRadioType'){
      if ($scope.moneyRadioType) {
        $scope.moneyRadioType = false;
      } else {
        $scope.moneyRadioType = true;
      }
    } else  if(radio == 'deviceRadio'){
      if ($scope.deviceRadio) {
        $scope.deviceRadio = false;
      } else {
        $scope.deviceRadio = true;
      }
    }
    //判断是否全选权限管理
    if ($scope.owerRadioType && $scope.owerRadioConsole) {
      $scope.owerRadio = true;
    } else {
      $scope.owerRadio = false;
    }
    //判断是否全选资产管理
    if ($scope.moneyRadioDevice && $scope.moneyRadioType) {
      $scope.moneyRadio = true;
    } else {
      $scope.moneyRadio = false;
    }
    // 判断是否全选，没有则把全选按钮变为false
    if ($scope.userRadio && $scope.owerRadio && $scope.owerRadioType && $scope.owerRadioConsole && $scope.fileRadio &&  $scope.userRadioCount && $scope.moneyRadio && $scope.moneyRadioDevice && $scope.moneyRadioType && $scope.deviceRadio) {
      $scope.allRadio = true;
    } else {
      $scope.allRadio = false;
    }
  };
  // 监听增加修改
  $scope.onEye = function() {
    $('#Modal-add').on('show.bs.modal', function (e) {
        $('#addDep').bootstrapValidator('resetForm', false);
    });
    $('#Modal-exdit').on('show.bs.modal', function (e) {
        $('#editDep').bootstrapValidator('resetForm', false);
    });
  }();
  // 角色增加
  $scope.add = function() {
    $("#addDep").submit(function(ev){ev.preventDefault();});
    $('#addDep').bootstrapValidator('validate');
    var flag = $('#addDep').data('bootstrapValidator').isValid();
    if (flag) {        
      if ($scope.name != '') {        
        var addList = {};
        addList.userId = $scope.userId;
        addList.token = $scope.token;
        addList.data = {};
        addList.data.name = $scope.name;// 角色名
        addList.data.authority = {};// 是否全选
        addList.data.authority.allRadio = $scope.allRadio;// 是否全选
        addList.data.authority.userRadio = $scope.userRadio;// 用户管理
        addList.data.authority.owerRadio = $scope.owerRadio;// 权限管理
        addList.data.authority.owerRadioType = $scope.owerRadioType;// 权限管理-分组管理
        addList.data.authority.owerRadioConsole = $scope.owerRadioConsole;//权限管理-操作日志
        addList.data.authority.fileRadio = $scope.fileRadio;// 文件管理
        addList.data.authority.userRadioCount = $scope.userRadioCount;// 人员统计
        addList.data.authority.moneyRadio = $scope.moneyRadio;// 资产管理
        addList.data.authority.moneyRadioDevice = $scope.moneyRadioDevice;// 设备管理
        addList.data.authority.moneyRadioType = $scope.moneyRadioType;// 设备分组管理
        addList.data.authority.deviceRadio = $scope.deviceRadio;// 设备统计
        addList.data.roleType = '';// roleType功能保留
        addList.data.authority = JSON.stringify(addList.data.authority);    
        addList.data = JSON.stringify(addList.data);
        addList = JSON.stringify(addList);
        $http.post('cfg', addList, {
            headers : {'contentType' : 'application/json','url-mapping' : '/app/role/add'}
            }).success(function(data, status, headers, config) {
                console.log(data);
                var code = data.statusCode;
                if (code == 200){
                    $scope.isFalse = false;
                    $timeout(function() {$scope.isFalse = true;}, 2000); 
                    $('#Modal-add').modal('hide');
                    $('#addDep').data("bootstrapValidator").resetForm(); 
                    $('#table').bootstrapTable('refresh');  // 刷新列表   
                } else if (code == '203') {
                  window.location.href = 'error.html';
                } else {
                  layer.msg('数据新增失败，请保证分组名唯一性！', {icon: 5});    
                }
                //...
            }).error(function(data, status, headers, config ) {
                window.location.href = 'error.html';
            });
      }
    }
  }
  // 新增清除
  $scope.moveClear = function() {
    $scope.name = '';
    $scope.allRadio = false;// 全选
    $scope.userRadio = false;// 用户管理
    $scope.owerRadio = false;// 权限管理
    $scope.owerRadioType = false;// 权限管理-分组管理
    $scope.owerRadioConsole = false;// 权限管理-操作日志
    $scope.fileRadio = false;// 文件管理
    $scope.userRadioCount = false;// 人员统计
    $scope.moneyRadio = false;// 资产管理
    $scope.moneyRadioDevice = false;// 设备管理
    $scope.moneyRadioType = false;// 设备分组管理
    $scope.deviceRadio = false;// 设备统计
  }
  $scope.resetClear = function() {
    layer.confirm('确定清空数据？', {
      title: '操作提示',
      icon: 3,
      btn: ['取消','确认'] //按钮
      }, function(ca){
        layer.close(ca);
      }, function(index){
        $scope.name = '';
        $('#addDep').bootstrapValidator('resetForm', false);
        $('#editDep').bootstrapValidator('resetForm', false);
        $scope.allRadio = false;// 全选
        $scope.userRadio = false;// 用户管理
        $scope.owerRadio = false;// 权限管理
        $scope.owerRadioType = false;// 权限管理-分组管理
        $scope.owerRadioConsole = false;// 权限管理-操作日志
        $scope.fileRadio = false;// 文件管理
        $scope.userRadioCount = false;// 人员统计
        $scope.moneyRadio = false;// 资产管理
        $scope.moneyRadioDevice = false;// 设备管理
        $scope.moneyRadioType = false;// 设备分组管理
        $scope.deviceRadio = false;// 设备统计
        $scope.$apply();
        layer.close(index);
      }
    );
  }
  // 删除
  $scope.btnNovoClick = function(delIndex) {
    layer.confirm('确定删除该分组？', {
      title: '操作提示',
      icon: 3,
      btn: ['取消','确认'] //按钮
      }, function(ca){
        layer.close(ca);
      }, function(index){
        // 判断用户组下是否有人
        var checkList = {};
        checkList.userId = $scope.userId;
        checkList.token = $scope.token;
        checkList.data = {};
        checkList.data.id = $scope.data.rows[delIndex].id;
        checkList.data = JSON.stringify(checkList.data);
        checkList = JSON.stringify(checkList); 
        $http.post('cfg', checkList, {
          headers : {'contentType' : 'application/json','url-mapping' : '/app/role/checkhasuser'}
          }).success(function(data, status, headers, config) {
              console.log(data);
              var code = data.statusCode;
              if (code == 511){
                layer.msg('该分组下还有人员，请移除后再删除', {icon: 5});
              } else {             
                // 获取选择对象
                var deletList = {};
                deletList.userId = $scope.userId;
                deletList.token = $scope.token;
                deletList.data = {};
                deletList.data.ids = [];
                deletList.data.ids.push($scope.data.rows[delIndex].id);
                deletList.data = JSON.stringify(deletList.data);
                deletList = JSON.stringify(deletList);
                // 接口访问
                $http.post('cfg', deletList, {
                headers : {'contentType' : 'application/json','url-mapping' : '/app/role/delete'}
                }).success(function(data, status, headers, config) {
                    console.log(data);
                    var code = data.statusCode;
                    if (code != 200){
                        $scope.isHttp = false;
                        layer.msg(data.message, {icon: 5});
                        $timeout(function() {$scope.isHttp = true;}, 2000);
                    } else if (code == '203') {
                      window.location.href = 'error.html';
                    } else {
                        $scope.isFalse = false;
                        $timeout(function() {$scope.isFalse = true;}, 2000); 
                        layer.close(index);
                        $('#table').bootstrapTable('refresh');  // 刷新列表          
                    }
                    //...
                }).error(function(data, status, headers, config ) {
                    window.location.href = 'error.html';
                });  
              }
              //...
          }).error(function(data, status, headers, config ) {
              window.location.href = 'error.html';
          });
      });
  };
  // 编辑
  $scope.btnEditarClick = function(index) {
    // console.log($scope.data.rows[index]);
    // 填充数据
    $scope.editList = $scope.data.rows[index];
    $scope.name = $scope.editList.name;
    if ($scope.editList.authority != '') {
      var editAuthor = $scope.editList.authority;
      editAuthor = eval('"' + editAuthor + '"')
      editAuthor = angular.fromJson(editAuthor);
      $scope.allRadio = editAuthor.allRadio;// 全选
      $scope.userRadio = editAuthor.userRadio;// 用户管理
      $scope.owerRadio = editAuthor.owerRadio;// 权限管理
      $scope.owerRadioType = editAuthor.owerRadioType;// 权限管理-分组管理
      $scope.owerRadioConsole = editAuthor.owerRadioConsole;// 权限管理-操作日志
      $scope.fileRadio = editAuthor.fileRadio;// 文件管理
      $scope.userRadioCount = editAuthor.userRadioCount;// 人员统计
      $scope.moneyRadio = editAuthor.moneyRadio;// 资产管理
      $scope.moneyRadioDevice = editAuthor.moneyRadioDevice;// 设备管理
      $scope.moneyRadioType = editAuthor.moneyRadioType;// 设备分组管理
      $scope.deviceRadio = editAuthor.deviceRadio;// 设备统计
    } else {
      $scope.allRadio = false;// 全选
      $scope.userRadio = false;// 用户管理
      $scope.owerRadio = false;// 权限管理
      $scope.owerRadioType = false;// 权限管理-分组管理
      $scope.owerRadioConsole = false;// 权限管理-操作日志
      $scope.fileRadio = false;// 文件管理
      $scope.userRadioCount = false;// 人员统计
      $scope.moneyRadio = false;// 资产管理
      $scope.deviceRadio = false;// 设备统计
      $scope.moneyRadioDevice = false;// 设备管理
      $scope.moneyRadioType = false;// 设备分组管理
    }
  };
  // 保存编辑
  $scope.addBtnEditarClick = function() {
    $("#editDep").submit(function(ev){ev.preventDefault();});
    $('#editDep').bootstrapValidator('validate');
    var flag = $('#editDep').data('bootstrapValidator').isValid();
    if (flag) {        
      if ($scope.name != '') {        
        // 保存数据
        var editList = {};
        editList.data = $scope.editList;
        editList.userId = $scope.userId;
        editList.token = $scope.token;
        editList.data.name = $scope.name;//角色名字
        editList.data.authority = {};// 是否全选
        editList.data.authority.allRadio = $scope.allRadio;// 是否全选
        editList.data.authority.userRadio = $scope.userRadio;// 用户管理
        editList.data.authority.owerRadio = $scope.owerRadio;// 权限管理
        editList.data.authority.owerRadioType = $scope.owerRadioType;// 权限管理-分组管理
        editList.data.authority.owerRadioConsole = $scope.owerRadioConsole;//权限管理-操作日志
        editList.data.authority.fileRadio = $scope.fileRadio;// 文件管理
        editList.data.authority.userRadioCount = $scope.userRadioCount;// 人员统计
        editList.data.authority.moneyRadio = $scope.moneyRadio;// 资产管理
        editList.data.authority.moneyRadioDevice = $scope.moneyRadioDevice;// 设备管理
        editList.data.authority.moneyRadioType = $scope.moneyRadioType;// 设备分组管理
        editList.data.authority.deviceRadio = $scope.deviceRadio;// 设备统计
        editList.data.roleType = '';//roleType功能保留
        editList.data.authority = JSON.stringify(editList.data.authority);
        editList.data = JSON.stringify(editList.data);
        editList = JSON.stringify(editList);
        // 接口访问
        $http.post('cfg', editList, {
        headers : {'contentType' : 'application/json','url-mapping' : '/app/role/update'}
        }).success(function(data, status, headers, config) {
            console.log(data);
            var code = data.statusCode;
            if (code == 200){
                $scope.isFalse = false;
                $('#Modal-exdit').modal('hide');
                $('#editDep').data("bootstrapValidator").resetForm(); 
                $timeout(function() {$scope.isFalse = true;}, 2000); 
                $('#table').bootstrapTable('refresh');  // 刷新列表   
            } else if (code == '203') {
              window.location.href = 'error.html';
            } else {
                layer.msg('数据新增失败，请保证分组名唯一性！', {icon: 5});        
            }
            //...
        }).error(function(data, status, headers, config ) {
            window.location.href = 'error.html';
        });
      }
    }
  }
});