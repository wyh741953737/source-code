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
  $scope.isFalse = false;// 访问成功
  $scope.isHttp = false;// 访问失败
  $scope.isDel = false;// 未选择对象
  $scope.httpMsg = '';
  $scope.userId = $cookies.get('userId');// 读取cookie存的userID
  $scope.token = $cookies.get('token');// 读取cookie存的token
  $scope.loginName = $cookies.get('loginName');// 读取cookie存的loginName
  $scope.roleId = '';
  $scope.name = '';// 初始化登录名
  $scope.idCard = '';// 初始化身份证
  $scope.serchName = '';//搜索姓名
  $scope.email = '';// 初始化邮箱
  // 动态设置登录名
  $scope.moreShow = false;
  $scope.more = '';
  $scope.setLogin = function() {      
    $scope.toPinyin = PinYin.toConvert($scope.name).substring(0, 30);
    if ($scope.name.length > 10) {
      $scope.moreShow = true;
      $scope.name = $scope.name.substring(0, 10);
      $scope.more = '姓名最多10字符';
    } else {
      $scope.moreShow = false;
    }
  };
  // 动态设置出生日期
  $scope.setBirday = function() {
    var tmpStr = '';
    var sexStr = '';
    if ($scope.idCard != undefined) {        
      if($scope.idCard.length == 15){
        tmpStr = $scope.idCard.substring(6, 12);
        tmpStr = "19" + tmpStr;
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
        sexStr = parseInt(iIdNo.substring(14, 1),10) % 2 ? "0" : "1";
        $scope.birthDate = tmpStr;
        $scope.sex = sexStr;
      } else {
        tmpStr = $scope.idCard.substring(6, 14);
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
        sexStr = parseInt($scope.idCard.substring(17, 1),10) % 2 ? "0" : "1";
        $scope.birthDate = tmpStr;
        $scope.sex = sexStr;
      }
    }
  };
  // 用户列表  
  $scope.options = {
    method: 'post',
    url: 'cfg',
    queryParams: function(pageSize) {
      pageSize.rolesId = $scope.roleId;
      // console.log(pageSize);
      if (pageSize.search == undefined) {
        pageSize.search = '';
      }
      $scope.serchName = pageSize.search;
      // console.log(pageSize);
      var result = {"userId":$scope.userId, "token":$scope.token, "data":'{"limit":' + pageSize.limit + ', "start":' + pageSize.offset +', "sort":"' + pageSize.sort + '$' + pageSize.order.toUpperCase() + '", "filter":{"SEARCH$NEQ$deletion": "true", "SEARCH$EQ$department": "'+pageSize.rolesId+'", "SEARCH$LIKE$name": "'+pageSize.search+'"}}'};
      return result;
    },
    searchText:'',
    ajaxOptions:{headers : {'contentType' : 'application/json','url-mapping' : '/app/user/list'}},
    pagination: true,
    /*showExport : true,*/
    showRefresh: true,
    sidePagination: 'server',
    /*exportTypes: ['excel'],*/
    exportDataType: 'all',
    height: '800',
    striped: true,
    pageList:[20],
    sortable: true, //是否启用排序
    sortName:'loginName', 
    sortOrder: "ASC",
    pageSize: 20,
    search: true,
    searchAlign: 'left',
    toolbar: '#toolbar',
    responseHandler:function(data) {
      if (data == '') {
        return data;
      } else {
          if(data.statusCode == 200) { 
          var result = {total:angular.fromJson(data.result).totalProperty, rows:angular.fromJson(data.result).root};// 服务器端分页模式data特定格式,客户端直接返回data数组
          $scope.data = result;         
          // console.log(result);
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
        align: 'left',
        valign: 'middle',
        width: 100,
        formatter: function (value, row, index) {  
          return index + 1;  
        }  
      },{
        field: 'loginName',
        title: '登录名',
        align: 'left',
        valign: 'middle',
        width: 100
      }, {
        field: 'name',
        title: '姓名',
        align: 'left',
        valign: 'middle'
      }, {
        field: 'sex',
        title: '性别',
        align: 'center',
        valign: 'middle',
        formatter: function (value, row, index) {
          if (value == '0') {
            return '男';
          } else {
            return '女';
          }
        } 
      }, {
        field: 'idCard',
        title: '身份证号',
        align: 'left',
        valign: 'middle'
      }, {
        field: 'hireDate',
        title: '入职时间',
        align: 'left',
        valign: 'middle',
        sortable: true, 
        sorter:function(a,b){
          return 1;
        },
        formatter: function (value, row, index) {
          if (value != null) {
            return value.substring(0, 10);
          }  else {
            return '';
          }
        } 
      }, {
        field: 'department',
        title: '部门',
        align: 'left',
        valign: 'middle'
      }, {
        field: 'phone',
        title: '手机号',
        align: 'left',
        valign: 'middle'
      }, {
        field: 'email',
        title: '邮箱',
        align: 'left',
        valign: 'middle'
      }, {

        title: '操作',
        align: 'left',
        valign: 'middle',
        formatter: function (value, row, index) {
          return '<a class="btn btn-xs" ng-click="btnEditarClick(' + index + ')" title="编辑" data-target="#Modal-exdit" data-toggle="modal"><span class="glyphicon glyphicon-pencil"></span></a>' +
          '<a class="btn btn-xs" ng-click="resetPass('+ index +')" title="重置密码"><span class="glyphicon glyphicon-repeat"></span></a>' +
          '<a class="btn btn-xs" ng-click="btnNovoClick(' + index + ')" data-toggle="modal" title="删除"><span class="glyphicon glyphicon-trash"></span></a>'; 
        } 
    }]
  };
  // 用户部门列表
  $scope.dep = function() {
    var depList = {};// 传参
    $scope.getList = '';// 取餐
    depList.userId = $scope.userId;
    depList.token = $scope.token;
    depList.data = {};
    depList.data.limit = '20000';// 
    depList.data.start = '0';
    depList.data.sort = '';
    depList.data.filter = {};
    depList.data = JSON.stringify(depList.data);
    depList = JSON.stringify(depList);
    $http.post('cfg', depList, {
    headers : {'contentType' : 'application/json','url-mapping' : '/app/role/list'}
    }).success(function(data, status, headers, config) {
        // console.log(data);
        var code = data.statusCode;
        if (code != 200){
            //window.location.href = 'error.html';
        } else {
            $scope.getList = angular.fromJson(data.result).root;
            // console.log($scope.getList);         
        }
        //...
    }).error(function(data, status, headers, config ) {
        //window.location.href = 'error.html';
    });         
  }(); 
  // 监听部门下拉框
  $scope.roleSelect = function() {
    $('#table').bootstrapTable('refresh');  // 刷新列表 
  };
  //监听邮箱
  $scope.moreEmail = '';
  $scope.mailShow = false;
  $scope.eyeEmail = function() {
    if ($scope.email != undefined && $scope.email.length == 50) {
      $scope.moreEmail = '邮箱长度最多50字符';
      $scope.mailShow = true;
    } else {
      $scope.mailShow = false;
    }
  };
  // 监听增加修改
  $scope.onEye = function() {
    $('#Modal-add').on('show.bs.modal', function (e) {
        $('#addMol').bootstrapValidator('resetForm', false);
    });
    $('#Modal-exdit').on('show.bs.modal', function (e) {
        $('#editMol').bootstrapValidator('resetForm', false);
    });
  }();
  // 禁止表单提交
  // 用户增加
  $scope.add = function() {
    $("#addMol").submit(function(ev){ev.preventDefault();});
    $('#addMol').bootstrapValidator('validate');
    var flag = $('#addMol').data('bootstrapValidator').isValid();
    if (flag) {        
      var addList = {};
      addList.userId = $scope.userId;
      addList.token = $scope.token;
      addList.data = {};
      addList.data.name = $scope.name;// x姓名
      addList.data.department = $scope.department;// $scope.department;// 部门
      addList.data.email = $scope.email;
      addList.data.phone = $scope.phone;
      addList.data.passwd = '123456';
      addList.data.sex = $scope.sex;
      addList.data.empNo = '';//无效字段保留
      addList.data.idCard = $scope.idCard;
      addList.data.loginName = $scope.toPinyin;
      addList.data.birthDate = $scope.birthDate;
      addList.data.hireDate = $scope.hireDate;
      // addList.data.age = $scope.birthday;
      var idValue = {};
      addList.data.roles = [];
      idValue.id = $scope.roles;
      addList.data.roles.push(idValue);
      // console.log($scope.department);
      addList.data = JSON.stringify(addList.data);
      addList = JSON.stringify(addList);
      $http.post('cfg', addList, {
          headers : {'contentType' : 'application/json','url-mapping' : '/app/user/add'}
          }).success(function(data, status, headers, config) {
              // console.log(data);
              var code = data.statusCode;
              if (code != 200){
                  $scope.isHttp = true;
                  layer.msg(data.message, {icon: 5});
                  $timeout(function() {$scope.isHttp = false;}, 2000);
              } else {
                  $scope.isFalse = true;
                  $('#Modal-add').modal('hide');
                  $timeout(function() {$scope.isFalse = false;}, 2000);
                  $('#addMol').data("bootstrapValidator").resetForm(); 
                  $('#table').bootstrapTable('refresh');  // 刷新列表          
              }
              //...
          }).error(function(data, status, headers, config ) {
              //window.location.href = 'error.html';
          });
      }
  }
  //日期
  $scope.date = function() {
    // 出生日期
    $('.form_date').datetimepicker({
        format:'yyyy-mm-dd',
        language:'zh-CN',
        minView:'month',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
    $('.form_hireDate').datetimepicker({
        format:'yyyy-mm-dd',
        language:'zh-CN',
        minView:'month',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
  }();
  //新增重置确认
  $scope.confirNewClear = function() {
    layer.confirm('确定清空数据？', {
      title: '操作提示',
      icon: 3,
      btn: ['取消','确认'] //按钮
      }, function(ca){
        layer.close(ca);
      }, function(index){
        layer.close(index);
        $scope.name = '';
        $scope.toPinyin = '';
        $scope.sex = ''; 
        $scope.phone = ''; 
        $scope.hireDate = ''; 
        $scope.birthDate = ''; 
        $scope.idCard = '';
        $scope.email = '';
        $scope.roles = '';
        $scope.department = '';
        $scope.$apply();
        $('#addMol').bootstrapValidator('resetForm', false); 
      }
    );
  }
  //修改重置确认
  $scope.confirEdiClear = function() {
    layer.confirm('确定清空数据？', {
      title: '操作提示',
      icon: 3,
      btn: ['取消','确认'] //按钮
      }, function(ca){
        layer.close(ca);
      }, function(index){
        layer.close(index);
        $scope.sex = ''; 
        $scope.phone = ''; 
        $scope.hireDate = ''; 
        $scope.birthDate = ''; 
        $scope.idCard = '';
        $scope.email = '';
        $scope.department = '';
        $scope.roles = '';
        $scope.$apply();       
        $('#editMol').bootstrapValidator('resetForm', false);
      }
    );
  }
  // 新增清除
  $scope.moveClear = function() {
    $('#addMol').bootstrapValidator('resetForm', true);
  } 
  // 删除
  $scope.btnNovoClick = function(delIndex) {
    layer.confirm('确定删除用户？', {
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
            headers : {'contentType' : 'application/json','url-mapping' : '/app/user/delete'}
            }).success(function(data, status, headers, config) {
                // console.log(data);
                var code = data.statusCode;
                if (code != 200){
                    $scope.isHttp = true;
                    layer.msg(data.message, {icon: 5});
                    $timeout(function() {$scope.isHttp = false;}, 2000);
                } else {
                    $scope.isFalse = true;
                    $timeout(function() {$scope.isFalse = false;}, 2000); 
                    $('#table').bootstrapTable('refresh');  // 刷新列表
                    layer.close(index);          
                }
                //...
            }).error(function(data, status, headers, config ) {
                //window.location.href = 'error.html';
            });
          }
        });
    }
  // 编辑
  $scope.btnEditarClick = function(index) {
    // console.log($scope.data.rows[index]);
    // 填充数据
    $scope.editList = $scope.data.rows[index];
    $scope.name = $scope.editList.name;
    $scope.sex = $scope.editList.sex + '';
    $scope.idCard = $scope.editList.idCard;//保留身份证字段 
    $scope.phone = $scope.editList.phone; 
    $scope.email = $scope.editList.email;
    if ($scope.editList.hireDate == '' || $scope.editList.hireDate == null) { 
      $scope.hireDate = '';
    } else {       
      $scope.hireDate = $scope.editList.hireDate.substring(0, 10);
    }
    if ($scope.editList.birthDate == '' || $scope.editList.birthDate == null) {
      $scope.birthDate = '';
    } else {
      $scope.birthDate = $scope.editList.birthDate.substring(0, 10);
    }
    $scope.loginName = $scope.editList.loginName;
    $scope.department = $scope.editList.department;
    if ($scope.editList.roles.length > 0) {        
      $scope.roles = $scope.editList.roles[0].id;
    } else {
      $scope.roles = '';
    }
  };
  // 保存编辑
  $scope.addBtnEditarClick = function() {
    $("#editMol").submit(function(ev){ev.preventDefault();});
    $('#editMol').bootstrapValidator('validate');
    var flag = $('#editMol').data('bootstrapValidator').isValid();
    if (flag) {        
      // 保存数据
      var editList = {};
      editList.data = $scope.editList;
      editList.userId = $scope.userId;
      editList.token = $scope.token;
      editList.data.name = $scope.name;
      editList.data.loginName = $scope.loginName;
      editList.data.sex = $scope.sex; 
      editList.data.phone = $scope.phone; 
      editList.data.hireDate = $scope.hireDate; 
      editList.data.birthDate = $scope.birthDate; 
      editList.data.idCard = $scope.idCard;
      editList.data.email = $scope.email;
      editList.data.empNo = '';//无效字段保留
      editList.data.department = $scope.department;
      var idValue = {};
      editList.data.roles = [];
      idValue.id = $scope.roles;
      editList.data.roles.push(idValue);
      editList.data = JSON.stringify(editList.data);
      editList = JSON.stringify(editList);
      // 接口访问
      $http.post('cfg', editList, {
      headers : {'contentType' : 'application/json','url-mapping' : '/app/user/update'}
      }).success(function(data, status, headers, config) {
          // console.log(data);
          var code = data.statusCode;
          if (code != 200){
              $scope.isHttp = true;
              layer.msg(data.message, {icon: 5});
              $timeout(function() {$scope.isHttp = false;}, 2000);
          } else {
              $scope.isFalse = true;
              $('#Modal-exdit').modal('hide');
              $timeout(function() {$scope.isFalse = false;}, 2000); 
              $('#editMol').data("bootstrapValidator").resetForm(); 
              $('#table').bootstrapTable('refresh');  // 刷新列表
              // 获取最新的权限列表
              var newAuthorityList = angular.fromJson(data.result);  
              if (newAuthorityList.id == $scope.userId) {
                $cookies.put('authority', angular.toJson(newAuthorityList.roles[0].authority));// 用户权限
                window.location.href = 'index.html';
              }       
          }
          //...
      }).error(function(data, status, headers, config ) {
          //window.location.href = 'error.html';
      });
    }
  };
  // 用户列表导出
  $scope.downExcel = function() {
    $('.serName').val($scope.serchName);
    $('#exportUser').submit();
  }  
  // 模板导出
  $scope.moUser = function() {
    $('#userMoter').submit();
  }
  $scope.lengthExit = '';
  $scope.lengthFlow = false;
  // 判断用户长度
  $scope.cheackLogin = function() {      
    if ($scope.toPinyin.length > 30) {
      $scope.lengthFlow = true;
      $scope.toPinyin = $scope.toPinyin.substring(0, 30);
      $scope.lengthExit = '登录名最多30字符';
    } else {
      $scope.lengthFlow = false;
    }
  }; 
  $scope.exit = '';
  $scope.flow = false; 
  // 判断用户是否存在
  $scope.loginTrue = function() {
    var loginList = {};
    loginList.userId = $scope.userId;
    loginList.token = $scope.token;
    loginList.data = {};
    loginList.data.loginName = $scope.toPinyin;
    loginList.data = JSON.stringify(loginList.data);
    loginList = JSON.stringify(loginList);
    $http.post('cfg', loginList, {
    headers : {'contentType' : 'application/json','url-mapping' : '/app/user/checkexist'}
    }).success(function(data, status, headers, config) {
      if (data.statusCode == '207') {
        $scope.exit = data.message;
        $scope.flow = true;
        $('#loginName').css({'border':'1px solid #a94442'});
      } else if (data.statusCode == '204') {
        $scope.flow = false;
        $('#loginName').css({'border':'1px solid #3c763d'});
      }
    }).error(function(data, status, headers, config ) {
        //window.location.href = 'error.html';
    }); 
  }
  // 用户列表导入
  $scope.file = '';
  $scope.upExcel = function(file) {
    // 附件导入
    var item = file[0].name;
    if (item != '') {
        var reg = /^.*\.(?:xls|xlsx)$/i;//文件名可以带空格
        if (!reg.test(item)) {//校验不通过
            layer.msg('文件格式有误，请重新选择',{time: 2000, icon:5}); 
            return;
        } else {
            layer.msg('上传中。。。', {
                icon: 14,
                shade: 0.01
            });
            $timeout(doUpload, 2000);
        }
    }               
    function doUpload() {  
      $("#uploadExcel").submit();
      $("#file_upload_return")[0].onload = function(){ 
        var upResult = $("#file_upload_return").contents().find("body").html();
        upResult = angular.fromJson(upResult);
        // console.log(upResult);
        if (upResult == undefined) {
          layer.msg('服务器错误',{time: 2000, icon:6});
        } else {            
          if (upResult.statusCode == 200) {
            layer.msg('上传成功',{time: 2000, icon:6});
            $('#table').bootstrapTable('refresh');
          } else {
            layer.msg('数据导入失败，请仔细检查内容并重新导入',{time: 2000, icon:5});
            angular.element(".J_export").val(null);
          }
        }
      };
    };
  }
  // 重置密码
  $scope.resetPass = function(index) {
    layer.confirm('确定重置密码？', {
      title: '操作提示',
      icon: 3,
      btn: ['取消','确认'] //按钮
    }, function(indel){
      layer.close(indel);
    }, function(index){        
      $scope.resetList = $scope.data.rows[index];
      var resetPass = {};
      resetPass.userId = $scope.userId;
      resetPass.token = $scope.token;
      resetPass.data = {};
      resetPass.data.ids = [];
      resetPass.data.passwd = '123456';
      resetPass.data.ids.push($scope.resetList.id);
      resetPass.data = JSON.stringify(resetPass.data);
      resetPass = JSON.stringify(resetPass);
      $http.post('cfg', resetPass, {
          headers : {'contentType' : 'application/json','url-mapping' : '/app/user/resetpwd'}
          }).success(function(data, status, headers, config) {
              // console.log(data);
              var code = data.statusCode;
              if (code != 200){
                  $scope.isHttp = true;
                  layer.msg(data.message, {icon: 5});
                  $timeout(function() {$scope.isHttp = false;}, 2000);
              } else {
                  $scope.isFalse = true;
                  $timeout(function() {$scope.isFalse = false;}, 2000);
                  $('#addMol').data("bootstrapValidator").resetForm(); 
                  layer.close(index);
                  $('#table').bootstrapTable('refresh');  // 刷新列表          
              }
              //...
          }).error(function(data, status, headers, config ) {
              //window.location.href = 'error.html';
          });
      }
    );
}
})