var app = angular.module('Index', ['ngCookies']);
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
app.controller('passwd', function($scope, $cookies, $http, $timeout) {
  $scope.userId = $cookies.get('userId');// 读取cookie存的userID
  $scope.token = $cookies.get('token');// 读取cookie存的token  
  $scope.name = $cookies.get('name');// 读取cookie存的name 
  // 修改密码
  $scope.restePass = function() {
    $('#editPass').bootstrapValidator('validate');
    var flag = $('#editPass').data('bootstrapValidator').isValid();
    if (flag) {        
      var restePass = {};
      restePass.userId = $scope.userId;
      restePass.token = $scope.token;
      restePass.oldpwd = $scope.oldpwd;
      restePass.passwd = $scope.passwd;
      restePass = JSON.stringify(restePass);
      $http.post('cfg', restePass, {
          headers : {'contentType' : 'application/json','url-mapping' : '/app/platform/modifypwd'}
          }).success(function(data, status, headers, config) {
              // console.log(data);
              var code = data.statusCode;
              if (code != 200){
                  $('#resetError').modal('show');
              } else {
                  $('#editPass').modal('hide');                  
                  $('#resetSuccess').modal('show');   
              }
              //...
          }).error(function(data, status, headers, config ) {
              window.location.href = 'error.html';
          });
    }
  };
  //获取上次修改密码
  $scope.getChangeTime = function() {
    var passList = {};// 传参
    $scope.passTime = '';// 取餐
    passList.userId = $scope.userId;
    passList.token = $scope.token;
    passList.data = {};
    passList.data.limit = '5';// 
    passList.data.start = '0';
    passList.data.sort = 'opDate$DESC';
    passList.data.filter = {"SEARCH$EQ$type": 1, "JOIN$INNER_JOIN$user":"", "SEARCH$EQ$user.id": $scope.userId};
    passList.data = JSON.stringify(passList.data);
    passList = JSON.stringify(passList);
    $http.post('cfg', passList, {
          headers : {'contentType' : 'application/json','url-mapping' : '/app/audit/list'}
          }).success(function(data, status, headers, config) {
              // console.log(data);
              var code = data.statusCode;
              if (code != 200){
                  // window.location.href = 'error.html';
                  alert(qingqiucuowu)
              } else {
                  if (angular.fromJson(data.result).root.length > 0) {                    
                    $scope.passTime = angular.fromJson(data.result).root[0].opDate;
                    $scope.passTimeList = angular.fromJson(data.result).root;
                  }
              }
              //...
          }).error(function(data, status, headers, config ) {
              window.location.href = 'error.html';
          });
  }();
  $scope.clearPass = function() {
    $scope.oldpwd = '';
    $scope.passwd = '';
    $scope.checkpass = '';
  }
});
app.controller('tab', function($scope, $cookies, $timeout, $http) {
  $scope.userId = $cookies.get('userId');// 读取cookie存的userID
  $scope.token = $cookies.get('token');// 读取cookie存的token  
  $scope.tabList = [{"link":'defauctChar.html', "name":'首页', "id":1, "active":"active"}];
  $scope.authority = angular.fromJson($cookies.get('authority'));// 读取cookie存的name 
  // console.log($scope.authority.userRadio);
  $scope.perData = '';//单个人员信息
  $scope.avatar = $cookies.get('avatar');// 头像
  $scope.name = $cookies.get('name');// 读取cookie存的name
  if ($scope.avatar != '') { 
    $scope.thumb = {
      imgSrc : 'app/att/download?userId=' + $scope.userId + '&token=' + $scope.token + '&data=' + $scope.avatar
    }
  }
  // 获取人员信息
  $scope.getPerson = function() {
    var peopleList = {};// 传参
    $scope.passTime = '';// 取餐
    peopleList.userId = $scope.userId;
    peopleList.token = $scope.token;
    peopleList.data = {};
    peopleList.data.limit = '1';// 
    peopleList.data.start = '0';
    peopleList.data.sort = '';
    peopleList.data.filter = {"SEARCH$EQ$id": $scope.userId};
    peopleList.data = JSON.stringify(peopleList.data);
    peopleList = JSON.stringify(peopleList);
    $http.post('cfg', peopleList, {
          headers : {'contentType' : 'application/json','url-mapping' : '/app/user/list'}
          }).success(function(data, status, headers, config) {
              // console.log(data);
              var code = data.statusCode;
              if (code != 200){
                window.location.href = 'error.html';
              } else {
                  $scope.perData = angular.fromJson(data.result).root[0];
                  // console.log($scope.perData);
                  $scope.sex = $scope.perData.sex;
                  if ($scope.sex == '0') {
                    $scope.sex = '男';
                  } else {
                    $scope.sex = '女';
                  }
                  $scope.birthDate = $scope.perData.birthDate.substring(0, 10);
                  $scope.email = $scope.perData.email;
                  $scope.avatar = $scope.perData.avatar;
                  $scope.phone = $scope.perData.phone;
                  if ($scope.avatar != ''){ 
                    $scope.thumb = {
                      imgSrc : 'app/att/download?userId=' + $scope.userId + '&token=' + $scope.token + '&data=' + $scope.avatar
                    }
                  }
                  $('#editPerson').bootstrapValidator('resetForm', false);
                  
              }
              //...
          }).error(function(data, status, headers, config ) {
              window.location.href = 'error.html';
          });
  };
  // 保存修改信息
  $scope.addBtnEditarClick = function() {
    $("#editPerson").submit(function(ev){ev.preventDefault();});
    $('#editPerson').bootstrapValidator('validate');
    var flag = $('#editPerson').data('bootstrapValidator').isValid();
    if (flag) {        
      // 保存数据
      var persEditList = {};
      persEditList.data = $scope.perData;
      persEditList.userId = $scope.userId;
      persEditList.token = $scope.token;
      persEditList.data.phone = $scope.phone;
      persEditList.data.avatar = $scope.avatar;//头像
      persEditList.data.email = $scope.email;
      persEditList.data.birthDate = persEditList.data.birthDate.substring(0, 10);
      persEditList.data.hireDate = persEditList.data.hireDate.substring(0, 10);
      persEditList.data = JSON.stringify(persEditList.data);
      persEditList = JSON.stringify(persEditList);
      // 接口访问
      $http.post('cfg', persEditList, {
      headers : {'contentType' : 'application/json','url-mapping' : '/app/user/update'}
      }).success(function(data, status, headers, config) {
          // console.log(data);
          var code = data.statusCode;
          if (code != 200){
              layer.msg(data.message, {icon: 5});
              window.location.href = 'error.html';
          } else {
              $('#person').modal('hide');
              layer.msg('修改成功！', {icon: 6}); 
              $scope.getPerson();
              $('#editPerson').data("bootstrapValidator").resetForm();       
          }
          //...
      }).error(function(data, status, headers, config ) {
          window.location.href = 'error.html';
      });
    }
  };
  // 是否显示下拉
  $scope.check = function(num) {
    $scope.isShowMore = false;
    if ($scope.tabList.length >= num) {
      $scope.isShowMore = true;
    } else {
      $scope.isShowMore = false;
    }
  }
  // 改变导航样式
  $scope.changeTab = function($event) {
    
  }
  // 上传头像
  $scope.upHead = function(file) {
    // console.log(file);
    var isTrue = false;
    $scope.file = file[0]; 
    if($scope.file.size > 1048576){ 
      layer.msg("The image size should be within 1M", {icon: 5});
      $scope.file = null; 
      isTrue = false; 
    } else {
      isTrue = true;
    }
    $scope.fileName = $scope.file.name; 
    var postfix = $scope.fileName.substring($scope.fileName.lastIndexOf(".")+1).toLowerCase();
    if(postfix != "jpg" && postfix != "png" && postfix != 'bmp'){ 
      layer.msg("Only support PNG, JPG, and BMP", {icon: 5}); 
      $scope.fileName = ""; 
      $scope.file = null; 
      $scope.$apply(); 
      isTrue = false; 
    } else {
      isTrue = true;
    } 
    $scope.$apply(); 
    $scope.reader = new FileReader(); //创建一个FileReader接口 
    // console.log($scope.reader); 
    if ($scope.file) { 
     //获取图片（预览图片） 
      $scope.reader.readAsDataURL($scope.file); //FileReader的方法，把图片转成base64 
      $scope.reader.onload = function(ev) { 
        $scope.$apply(function(){ 
          $scope.thumb = { 
            imgSrc : ev.target.result  //接收base64，scope.thumb.imgSrc为图片。 
          }; 
          $timeout(viewHead, 1000);
        }); 
      };
      isTrue = true; 
    } else { 
      isTrue = false;
      layer.msg("Please upload an image!", {icon: 5});
    }
    function viewHead() {        
      if (isTrue) {
        $("#uploadHead").submit();
        $("#head_upload_return")[0].onload = function(){ 
          var upResult = $("#head_upload_return").contents().find("body pre").html();
          upResult = angular.fromJson(upResult);
          if (upResult.statusCode == 200) {
            layer.msg('Uploaded Successfully',{time: 2000, icon:6});
          } else {
            layer.msg(upResult.message,{time: 2000, icon:5});
          }
        };
      }
    } 
  }
  // 点击增加tab
  $scope.addTab = function(iflameSrc, name, id) {
    $scope.isHave = false;
    angular.forEach($scope.tabList, function(data,index){
      if (data.id == id) {
        $scope.isHave = true;
        data.active = "active";
        $scope.check(9);
        return false;
      } else {
        $scope.check(8);
        data.active = "";
      } 
    });
    if (!$scope.isHave) {
      $scope.tabList.push({"link":iflameSrc, "name":name, "id":id, "active":"active"});
    }
  }
  // 删除tab
  $scope.remove = function(id) {
    angular.forEach($scope.tabList, function(data,index){
      if (data.id == id) {        
        $scope.tabList.splice(index, 1);
        if (data.active == 'active') {
            if (index - 1 >= 0) {                    
                $scope.tabList[index - 1].active = 'active';
            } else {
                $scope.tabList[0].active = 'active';
            }
        }
        return false;
      }
    });
    $scope.check(9);    
  };
  // 检验点中tab
  $scope.tab = function(id) {
    angular.forEach($scope.tabList, function(data,index){
      if (data.id == id) { 
        data.active = 'active';
      } else {
        data.active = '';
      }
    });
  }
});