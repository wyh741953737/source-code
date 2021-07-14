var myapp = angular.module('myApp', ['ngCookies']);
myapp.directive('initTable', function($compile) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            var opts = scope.$eval(attrs.initTable);
            //console.log(scope,el,attrs,attrs.initTable);
            //console.log(opts);
            opts.onLoadSuccess = function() {
                $compile(el.contents())(scope);
            };
            el.bootstrapTable(opts);
        }
    };
});
$(document).ready(function() {
    $('#addAssetsForm').bootstrapValidator();
    $('#editAssetsForm').bootstrapValidator();
});
myapp.controller('deviceGroupCtrl', function($scope,$http,$cookies,$timeout) {
    $scope.isSuccess = false; //是否操作成功
    $scope.isError = false; //是否操作失败
    $scope.isHasData = false; //该分组下是否还有设备
    $scope.userId = $cookies.get('userId');// 读取cookie存的userID
    $scope.token = $cookies.get('token');// 读取cookie存的token
    $scope.options={
        method: 'post',
        url: 'cfg',
        queryParams: function(pageSize) {
            /*if (pageSize.search == undefined) {
                pageSize.search = '';
            }*/
            //console.log(pageSize);
            var result = {};
            result.userId = $scope.userId;
            result.token = $scope.token;
            result.data = {};
            result.data.limit = pageSize.limit;
            result.data.start = pageSize.offset;
            result.data.sort = pageSize.sort + pageSize.order.toUpperCase();
            result.data.filter = {};
            result.data.filter['SEARCH$EQ$deletion'] = false;
            result.data = JSON.stringify(result.data);
            //console.log(result);
            return result;
        },
        searchText:'',
        ajaxOptions:{headers : {'contentType' : 'application/json','url-mapping' : '/fixed/assetsList'}},
        pagination: true,
        showRefresh: true,
        sidePagination: 'server',
        height: '800',
        striped: true,
        sortName:'',
        sortable: true, //是否启用排序
        sortOrder: '', //$ASC
        pageSize: 20,
        pageList: [20,50,100],
        //search: true,
        searchAlign: 'left',
        toolbar: '#toolbar',
        responseHandler:function(data) {
            //console.log(data);
            if (data == '') {
                return data;
            } else {
                if(data.statusCode == 200) {
                    var root = angular.fromJson(data.result).root;
                    //console.log(root);
                    var someResult = {total:angular.fromJson(data.result).totalProperty,rows:root};
                    //console.log(someResult);
                    $scope.assetsListData = someResult;//另存放表格数据
                    return someResult;
                }
            }
        },
        columns: [{
            field: 'assetsID',
            title: 'ID',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'assetsName',
            title: '设备分类',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'op',
            title: '操作',
            align: 'center',
            valign: 'middle',
            formatter: function(value,row,index){
                return '<a ng-click="assetsMsg('+index+')" data-toggle="modal" data-target="#editAssets" class="btn primary opStyle glyphicon glyphicon-pencil"></a>'+
                    '<a ng-click="delAssets('+index+')" class="btn primary opStyle glyphicon glyphicon-trash"></a>';
            }
        }]
    };
    //新增的清除、验证重置
    $scope.clear = function() {
        $('#addAssetsForm').data("bootstrapValidator").resetForm();
        $scope.assetsName = "";
        $scope.assetsID = "";
    };
    //编辑的信息填充、验证重置
    $scope.assetsMsg =function(index) {
        $('#editAssetsForm').data("bootstrapValidator").resetForm();
        $scope.assetsEditList = $scope.assetsListData.rows[index];
        $scope.assetsName = $scope.assetsEditList.assetsName;
        $scope.assetsID = $scope.assetsEditList.assetsID;
    };
    //取消新增
    $scope.cancelAdd = function() {
        $('#addAssets').modal('hide');
    };
    //新增
    $scope.addAssets = function() {
        $('#addAssetsForm').data('bootstrapValidator').validate();
        if($('#addAssetsForm').data('bootstrapValidator').isValid()) {
            var appData = {};
            appData.userId = $scope.userId;
            appData.token = $scope.token;
            appData.data = {};
            appData.data.assetsName = $scope.assetsName;
            appData.data.assetsID = $scope.assetsID;
            appData.data = JSON.stringify(appData.data);
            //console.log(appData);
            $http.post('cfg', appData, {
                headers : {'contentType' : 'application/json','url-mapping' : '/fixed/assetsAdd'}
            }).then(function successCallback(data){
                //console.log(data);
                if (data.data.statusCode == '200') {
                    $scope.isSuccess = true;
                    $('#addAssets').modal('hide');
                    $('#addAssetsForm').data("bootstrapValidator").resetForm();
                    $('#table').bootstrapTable('refresh');  // 刷新列表
                    $timeout(function() {$scope.isSuccess = false;}, 2000);
                } else {
                    layer.msg(data.data.message, {icon: 5});
                    $scope.isError = true;
                    $timeout(function() {$scope.isError = false;}, 2000);
                }
            },function errorCallback(data){
                window.location.href = 'error.html';
            });
        }
    };
    //取消编辑
    $scope.cancelEdit = function() {
        $('#editAssets').modal('hide');
    };
    //编辑
    $scope.editAssets = function() {
        $('#editAssetsForm').data('bootstrapValidator').validate();
        if($('#editAssetsForm').data('bootstrapValidator').isValid()) {
            var appData = {};
            appData.userId = $scope.userId;
            appData.token = $scope.token;
            appData.data = {};
            appData.data.assetsName = $scope.assetsName;
            appData.data.assetsID = $scope.assetsID;
            appData.data.id = $scope.assetsEditList.id;
            appData.data = JSON.stringify(appData.data);
            //console.log(appData);
            $http.post('cfg', appData, {
                headers : {'contentType' : 'application/json','url-mapping' : '/fixed/assetsUpdate'}
            }).then(function successCallback(data){
                //console.log(data);
                if (data.data.statusCode == '200') {
                    $scope.isSuccess = true;
                    $('#editAssets').modal('hide');
                    $('#editAssetsForm').data("bootstrapValidator").resetForm();
                    $('#table').bootstrapTable('refresh');  // 刷新列表
                    $timeout(function() {$scope.isSuccess = false;}, 2000);
                } else {
                    layer.msg(data.data.message, {icon: 5});
                    $scope.isError = true;
                    $timeout(function() {$scope.isError = false;}, 2000);
                }
            },function errorCallback(data){
                window.location.href = 'error.html';
            });
        }
    };
    //删除
    $scope.delAssets = function(index) {
        layer.confirm('确定删除该条数据？', {
            title: '操作提示',
            icon: 3,
            btn: ['取消','确认'] //按钮
        }, function(ca){
            layer.close(ca);
        }, function(idx){
            var appData = {};
            appData.userId = $scope.userId;
            appData.token = $scope.token;
            appData.data = {};
            appData.data.assetsIDs = $scope.assetsListData.rows[index].id;
            appData.data = JSON.stringify(appData.data);
            //console.log(appData);
            $http.post('cfg', appData, {
                headers : {'contentType' : 'application/json','url-mapping' : '/fixed/assetsDelete'}
            }).then(function successCallback(data){
                //console.log(data);
                if (data.data.statusCode == '200') {
                    $scope.isSuccess = true;
                    layer.close(idx);
                    $('#table').bootstrapTable('refresh');  // 刷新列表
                    $timeout(function() {$scope.isSuccess = false;}, 2000);
                } else if (data.data.statusCode == '505') {
                    $scope.isHasData = true;
                    $timeout(function() {$scope.isHasData = false;}, 2500);
                } else {
                    layer.msg(data.data.message, {icon: 5});
                    $scope.isError = true;
                    $timeout(function() {$scope.isError = false;}, 2000);
                }
            },function errorCallback(data){
                window.location.href = 'error.html';
            });
        });
    };
});


