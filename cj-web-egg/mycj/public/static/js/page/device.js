var app = angular.module('myApp', ['ngCookies']);
app.directive('initTable', function($compile) {
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
$(document).ready(function(){
    $('#addForm').bootstrapValidator();
    $('#editForm').bootstrapValidator();
});
app.controller('deviceCtrl', function($scope,$http,$cookies,$timeout,$compile,$rootScope) {
    $scope.isSuccess = false; //是否操作成功
    $scope.isError = false; //是否操作失败
    $scope.isSelect = false; //是否选择了数据
    $scope.isSelectThis = false; //是否选择了当前行数据
    $scope.userId = $cookies.get('userId');// 读取cookie存的userID
    $scope.token = $cookies.get('token');// 读取cookie存的token
    $scope.loginName = $cookies.get('loginName');// 读取cookie存的loginName
    //console.log($cookies.get('userId'),$cookies.get('token'));
    $scope.startDate = '';
    $scope.endDate = '';
    $scope.assetsID = '';
    $scope.selArr = ['闲置','维修中','已报废'];
    $scope.selArr1 = ['闲置','维修中','已报废'];
    $scope.selArr2 = ['使用中'];
    //设备类型列表
    $scope.getAssetsList = function(){
        var appData = {};//请求参数
        appData.userId = $scope.userId;
        appData.token = $scope.token;
        appData.data = {};
        appData.data.limit = '20';
        appData.data.start = '0';
        appData.data.sort = '';
        appData.data.filter = {};
        appData.data.filter['SEARCH$EQ$deletion'] = false;
        appData.data = JSON.stringify(appData.data);
        appData = JSON.stringify(appData);
        //console.log(appData);
        $http.post('cfg', appData, {
            headers : {'contentType' : 'application/json','url-mapping' : '/fixed/assetsList'}
        }).then(function successCallback(data){
           //console.log(data);
            if (data.status != 200) {
                alert('获取设备类型列表失败');
            } else {
                if (data.data.statusCode == '200') {
                    //console.log(angular.fromJson(data.data.result));
                    /*var opts = [];
                     $.each(root,function(i, n){
                     if(n.assetsSup == null){
                     n.assetsSub = [];
                     $.each(root,function(j,k){
                     if(k.assetsSup!=null&&k.assetsSup.id == n.id){
                     n.assetsSub.push(k);
                     }
                     });
                     opts.push(n);
                     }
                     });*///两层分类
                    $scope.opts = angular.fromJson(data.data.result).root;
                } else {
                    alert('获取设备类型列表失败');
                }
            }
        },function errorCallback(data){
            //console.log(data);
            window.location.href = 'error.html';
        });
    };
    //console.log($scope.assetsID);
    /*$scope.doMore = function($event){
        $event.preventDefault();
        $($event.target).next().show();
    };
    $scope.doLess = function($event){
        $event.preventDefault();
        $($event.target).parent('.sub-select').find('ul.more').hide();
    };
    $scope.selectIt = function($event){
        $event.preventDefault();
        //console.log($($event.target).attr('data-id'));
        $scope.fixedGroup = $($event.target).text();
        $scope.assetsID = $($event.target).attr('data-id');
    };*/ //两层分类事件
    //用户列表
    /*$scope.getUserList = function(){
        var appData = {};//请求参数
        appData.userId = $scope.userId;
        appData.token = $scope.token;
        appData.data = {};
        appData.data.limit = '20';
        appData.data.start = '0';
        appData.data.sort = '';
        appData.data.filter = {};
        appData.data.filter['SEARCH$EQ$deletion'] = false;
        appData.data = JSON.stringify(appData.data);
        appData = JSON.stringify(appData);
        //////console.log(appData);
        $http.post('cfg', appData, {
            headers : {'contentType' : 'application/json','url-mapping' : '/app/user/list'}
        }).then(function successCallback(data){
            ////console.log(data);
            if (data.status != 200) {
                alert('获取用户列表失败');
            } else {
                //////console.log(angular.fromJson(data.data.result));
                if (data.data.statusCode == '200') {
                    var root = angular.fromJson(data.data.result).root;
                    //////console.log(root);
                    $scope.userOpts = root;
                } else {
                    alert('获取用户列表失败');
                }
            }
        },function errorCallback(data){
            //////console.log(data);
            alert(data.data);
        });
    }();*/
    //相似使用人下拉
    $scope.selectTip = function(){
        if ($scope.user != '') {
            $scope.selArr = $scope.selArr2;
            $scope.useStatus = $scope.selArr[0];
            var appData = {};//请求参数
            appData.userId = $scope.userId;
            appData.token = $scope.token;
            appData.data = {};
            appData.data.limit = '20';
            appData.data.start = '0';
            appData.data.sort = '';
            appData.data.filter = {};
            appData.data.filter['SEARCH$LIKE$name'] = $scope.user;
            appData.data.filter['SEARCH$EQ$deletion'] = false;
            appData.data = JSON.stringify(appData.data);
            appData = JSON.stringify(appData);
            //console.log(appData);
            $http.post('cfg', appData, {
                headers : {'contentType' : 'application/json','url-mapping' : '/app/user/list'}
            }).then(function successCallback(data){
                //console.log(data);
                if (data.status != 200) {
                    window.location.href = 'error.html';
                    //$('.sel-user').hide();
                } else {
                    //console.log(angular.fromJson(data.data.result));
                    if (data.data.statusCode == '200') {
                        if (angular.fromJson(data.data.result).totalProperty == 0) {
                            $('.sel-user').hide();
                        } else {
                            var root = angular.fromJson(data.data.result).root;
                            var reg = new RegExp($scope.user);
                            var html = '';
                            $.each(root, function(i, n){
                                var name = n.name.replace(reg,'<span class="text-danger">'+$scope.user+'</span>');
                                html += '<li><a ng-click="selectUser($event)" data-id="'+ n.id +'" href="#">'+ name +'</a></li>';
                            });
                            //console.log(root);
                            //$scope.userTips = root;
                            var compileFn = $compile(html);
                            var $dom = compileFn($scope);
                            $('.sel-user').empty().append($dom).show();
                        }
                    } else {
                        window.location.href = 'error.html';
                        //$('.sel-user').hide();
                    }
                }
            },function errorCallback(data){
                //console.log(data);
                window.location.href = 'error.html';
            });
        } else {
            $('.userError').text('');
            $scope.selArr = $scope.selArr1;
            $scope.useStatus = $scope.selArr[0];
            $scope.selectID = '';
            $('.sel-user').hide();
        }
    };
    //使用人验证
    $scope.checkUser = function(){
        //console.log($scope.user);
        if ($scope.user != '') {
            var appData = {};//请求参数
            appData.userId = $scope.userId;
            appData.token = $scope.token;
            appData.data = {};
            appData.data.limit = '20';
            appData.data.start = '0';
            appData.data.sort = '';
            appData.data.filter = {};
            appData.data.filter['SEARCH$EQ$name'] = $scope.user;
            appData.data.filter['SEARCH$EQ$deletion'] = false;
            appData.data = JSON.stringify(appData.data);
            appData = JSON.stringify(appData);
            //console.log(appData);
            $http.post('cfg', appData, {
                headers : {'contentType' : 'application/json','url-mapping' : '/app/user/list'}
            }).then(function successCallback(data){
                if (data.status != 200) {
                    window.location.href = 'error.html';
                } else {
                    //console.log(angular.fromJson(data.data.result));
                    if (data.data.statusCode == '200') {
                        if (angular.fromJson(data.data.result).totalProperty == 0) {
                            $('.userError').text('使用人不存在');
                            $scope.selectID = '';
                        } else {
                            $('.userError').text('');
                            $scope.selectID = angular.fromJson(data.data.result).root[0].id;
                        }
                    } else {
                        window.location.href = 'error.html';
                    }
                }
            },function errorCallback(data){
                //console.log(data);
                window.location.href = 'error.html';
            });
        } else {
            $('.userError').text('');
            $scope.selectID = '';
        }
    };
    //相似使用人下拉选择
    $scope.selectUser = function($event){
        $scope.user = $($event.target).text();
        $scope.selectID = $($event.target).attr('data-id');
        $('.userError').text('');
        $scope.selArr = $scope.selArr2;
        $scope.useStatus = $scope.selArr[0];
    };
    //失去焦点隐藏下拉提示
    $scope.hideSel = function() {
        $timeout(function(){
            $('.sel-user').hide();
            $scope.checkUser();
        },300);//延迟，先执行相似使用人选择
    };
    $scope.options={
        method: 'post',
        url: 'cfg',
        queryParams: function(pageSize) {
            if (pageSize.search == undefined) {
                pageSize.search = '';
            }
            if ($scope.startDate == undefined) {
                $scope.startDate = '';
            }
            if ($scope.endDate == undefined) {
                $scope.endDate = '';
            }
            if ($scope.assetsID == undefined) {
                $scope.assetsID = '';
            }
            //console.log(pageSize);
            var result = {};
            result.userId = $scope.userId;
            result.token = $scope.token;
            result.data = {};
            result.data.limit = pageSize.limit;
            result.data.start = pageSize.offset;
            result.data.sort = pageSize.sort == undefined?'fixedBuyTime$DESC':pageSize.sort + '$' + pageSize.order.toUpperCase();;
            result.data.filter = {};
            result.data.filter['SEARCH$GTE$fixedBuyTime'] = $scope.startDate;
            result.data.filter['SEARCH$LTE$fixedBuyTime'] = $scope.endDate;
            result.data.filter['SEARCH$EQ$assetsID.id'] = $scope.assetsID;
            result.data.filter['JOIN$INNER_JOIN$assetsID'] = "";
            result.data.filter['SEARCH$LIKE$userName'] = pageSize.search;
            $scope.searchName = pageSize.search;
            //result.data.filter['JOIN$LEFT_OUTER_JOIN$user'] = "";
            result.data.filter['SEARCH$EQ$deletion'] = false;
            result.data = JSON.stringify(result.data);
            //console.log(result);
            return result;
        },
        searchText:'',
        ajaxOptions:{headers : {'contentType' : 'application/json','url-mapping' : '/fixed/fixedList'}},
        pagination: true,
        showRefresh: true,
        sidePagination: 'server',
        exportDataType: 'all',
        trimOnSearch: true,
        height: '800',
        striped: true,
        sortable: true, //是否启用排序
        pageSize: 20,
        pageList: [20],
        search: true,
        searchAlign: 'left',
        toolbar: '#toolbar',
        responseHandler:function(data) {
            //console.log(data);
            if (data == '') {
                return data;
            } else {
                if(data.statusCode == 200) {
                    var root = angular.fromJson(data.result).root;
                    //console.log(angular.fromJson(data.result).root);
                    var someResult = {total:angular.fromJson(data.result).totalProperty,rows:[]};
                    /*Date.prototype.format = function(format) {
                        var date = {
                            "M+": this.getMonth() + 1,
                            "d+": this.getDate(),
                            "h+": this.getHours(),
                            "m+": this.getMinutes(),
                            "s+": this.getSeconds(),
                            "q+": Math.floor((this.getMonth() + 3) / 3),
                            "S+": this.getMilliseconds()
                        };
                        if (/(y+)/i.test(format)) {
                            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                        }
                        for (var k in date) {
                            if (new RegExp("(" + k + ")").test(format)) {
                                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                            }
                        }
                        return format;
                    };*/
                    function parseTime(time){
                        var pattern = /\d{4}-\d{2}-\d{2}/g;
                        return time.match(pattern);
                    }
                    $.each(root,function(i, n){
                        //var date = new Date(n.fixedBuyTime);
                        //n.fixedBuyTime = date.format('yyyy-MM-dd');
                        n.fixedBuyTime = parseTime(n.fixedBuyTime)[0];
                        //console.log(parseTime(n.fixedBuyTime)[0]);
                        n.fixedOnePrice = n.fixedOnePrice.toFixed(2);
                        n.fixedPrice = n.fixedPrice.toFixed(2);
                        someResult.rows.push(n);
                    });
                    //console.log(someResult);
                    $scope.deviceListData = someResult;//另存放表格数据
                    return someResult;
                }
            }
        },
        columns: [{
            title: '全选',
            checkbox: true
        },{
            field: 'id',
            align: 'center',
            valign: 'middle',
            title: '序号',
            formatter: function (value, row, index) {
                return index + 1;
            }
        }, {
            field: 'fixedName',
            align: 'center',
            valign: 'middle',
            title: '名称'
        }, {
            field: 'assetID',
            align: 'center',
            valign: 'middle',
            title: '类别',
            formatter: function(value,row,index){
                return row.assetsID.assetsName;
            }
        }, {
            field: 'fixedID',
            align: 'center',
            valign: 'middle',
            title: '编号'
        }, {
            field: 'fixedDetailID',
            align: 'center',
            valign: 'middle',
            title: '型号'
        }, {
            field: 'fixedOnePrice',
            align: 'center',
            valign: 'middle',
            title: '单价'
        }, {
            field: 'fixedNumber',
            align: 'center',
            valign: 'middle',
            title: '数量'
        }, {
            field: 'fixedPrice',
            align: 'center',
            valign: 'middle',
            title: '总价'
        }, {
            field: 'fixedBuyTime',
            align: 'center',
            valign: 'middle',
            title: '购入时间',
            sortable: true
        }, {
            field: 'fixedPlace',
            align: 'center',
            valign: 'middle',
            title: '存放地点'
        }, {
            field: 'departmentName',
            align: 'center',
            valign: 'middle',
            title: '使用部门'
        }, {
            field: 'user',
            align: 'center',
            valign: 'middle',
            title: '使用人',
            formatter: function(value,row,index){
                return row.userName == undefined?'':row.userName;
            }
        }, {
            field: 'fixedSituation',
            align: 'center',
            valign: 'middle',
            title: '使用状态'
        }, {
            align: 'center',
            valign: 'middle',
            title: '操作',
            formatter: function(value,row,index){
                return '<a class="btn primary glyphicon glyphicon-pencil opStyle" data-toggle="modal" data-target="#editDevice" ng-click="deviceMsg('+index+')"></a>' +
                    '<a class="btn primary glyphicon glyphicon-trash opStyle" ng-click="delOneDevice('+index+')"></a>';
            }
        }]
    };
    //监听条件进行搜索
    $scope.reflash = function(){
        $('#table').bootstrapTable('refresh');  // 刷新列表
    };
    //新增
    $scope.add = function(){
        $('#addForm').data('bootstrapValidator').validate();
        if($('#addForm').data('bootstrapValidator').isValid()){
            if ($scope.user == ''||$scope.selectID != '') {
                var appData = {};
                appData.userId = $scope.userId;
                appData.token = $scope.token;
                appData.data = {};
                appData.data.fixedName = $scope.deviceName;//fixedName	固定资产名称
                appData.data.assetsID = $scope.deviceGroup;//assetsID   类别ID
                appData.data.fixedID = $scope.deviceNumber;//fixedID   固定资产编号
                appData.data.fixedDetailID = $scope.deviceType;//fixedDetailID	资产型号
                appData.data.fixedBuyTime = $scope.buyTime;//fixedBuyTime	购入日期
                appData.data.fixedPlace = $scope.storagePlace; //fixedPlace	存放地点
                appData.data.fixedNumber = $scope.deviceCount;//fixedNumber	数量
                appData.data.fixedOnePrice = $scope.devicePrice;//fixedOnePrice	单价
                appData.data.fixedPrice = $scope.deviceAmount;//fixedPrice	总价
                appData.data.departmentName = $scope.useDept;//departmentName	使用部门
                appData.data.userName = $scope.selectID;//userName	用户名称
                appData.data.fixedSituation = $scope.useStatus; //fixedSituation	使用状态
                //console.log(appData);
                appData.data = JSON.stringify(appData.data);
                //appData = JSON.stringify(appData);
                $http.post('cfg', appData, {
                    headers : {'contentType' : 'application/json','url-mapping' : '/fixed/fixedAdd'}
                }).then(function successCallback(data){
                    //console.log(data);
                    if (data.data.statusCode == '200') {
                        $scope.isSuccess = true;
                        $('#addDevice').modal('hide');
                        $('#addForm').data("bootstrapValidator").resetForm();
                        $('#table').bootstrapTable('refresh');  // 刷新列表
                        $timeout(function() {$scope.isSuccess = false;}, 2000);
                    } else {
                        layer.msg(data.data.message,{icon: 5});
                        $scope.isError = true;
                        $timeout(function() {$scope.isError = false;}, 2000);
                    }
                },function errorCallback(data){
                    window.location.href = 'error.html';
                });
            }
        }
    };
    // 新增清除
    $scope.moveClear = function() {
        $('.userError').text('');
        $('#addForm').data("bootstrapValidator").resetForm(true);
        $scope.deviceName = '';
        $scope.deviceGroup = '';
        $scope.deviceNumber = '';
        $scope.deviceType = '';
        $scope.buyTime = '';
        $scope.storagePlace = '';
        $scope.deviceCount = '';
        $scope.devicePrice = '';
        $scope.deviceAmount = '';
        $scope.useDept = '';
        $scope.user = '';
        $scope.selArr = $scope.selArr1;//使用状态下拉重置
        $scope.selectID = '';
        $scope.useStatus = '';
    };
    //批量删除
    $scope.delDevices = function() {
        var chooseList = $('#table').bootstrapTable('getAllSelections');
        //console.log(chooseList);
        if (chooseList == '') {
            $scope.isSelect = true;
            $timeout(function() {$scope.isSelect = false;}, 2000);
        } else {
            layer.confirm('确定删除所选设备？', {
                title: '操作提示',
                icon: 3,
                btn: ['取消','确认'] //按钮
            }, function(ca){
                layer.close(ca);
            }, function(index){
                var appData = {};
                appData.userId = $scope.userId;
                appData.token = $scope.token;
                appData.data = {};
                appData.data.fixedIDs = (function(){
                    var ids = [];
                    $.each(chooseList,function(i, n){
                        ids.push(n.id);
                    });
                    return ids.join(',');
                })();
                appData.data = JSON.stringify(appData.data);
                //console.log(appData);
                $http.post('cfg', appData, {
                    headers : {'contentType' : 'application/json','url-mapping' : '/fixed/fixedDelete'}
                }).then(function successCallback(data){
                    //console.log(data);
                    layer.close(index);
                    if (data.data.statusCode == '200') {
                        $scope.isSuccess = true;
                        $('#table').bootstrapTable('refresh');  // 刷新列表
                        $timeout(function() {$scope.isSuccess = false;}, 2000);
                    } else {
                        layer.msg(data.data.message,{icon: 5});
                        $scope.isError = true;
                        $timeout(function() {$scope.isError = false;}, 2000);
                    }
                },function errorCallback(data){
                    window.location.href = 'error.html';
                });
            });
        }
    };
    //单个删除
    $scope.delOneDevice = function(index) {
        layer.confirm('确定删除该设备？', {
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
            appData.data.fixedIDs = $scope.deviceListData.rows[index].id;
            appData.data = JSON.stringify(appData.data);
            //console.log(appData);
            $http.post('cfg', appData, {
                headers : {'contentType' : 'application/json','url-mapping' : '/fixed/fixedDelete'}
            }).then(function successCallback(data){
                //console.log(data);
                layer.close(idx);
                if (data.data.statusCode == '200') {
                    $scope.isSuccess = true;
                    $('#table').bootstrapTable('refresh');  // 刷新列表
                    $timeout(function() {$scope.isSuccess = false;}, 2000);
                } else {
                    layer.msg(data.data.message,{icon: 5});
                    $scope.isError = true;
                    $timeout(function() {$scope.isError = false;}, 2000);
                }
            },function errorCallback(data){
                window.location.href = 'error.html';
            });
        });
    };
    //编辑设备信息填充
    $scope.deviceMsg = function(index){
        $scope.getAssetsList();//类型列表加载
        $('.userError').text('');
        $('#editForm').data("bootstrapValidator").resetForm();
        $scope.editList = $scope.deviceListData.rows[index];
        //console.log($scope.editList);
        $scope.deviceName = $scope.editList.fixedName;
        $scope.deviceGroup = $scope.editList.assetsID.id;
        $scope.deviceNumber = $scope.editList.fixedID;
        $scope.deviceType = $scope.editList.fixedDetailID;
        $scope.buyTime = $scope.editList.fixedBuyTime;
        $scope.storagePlace = $scope.editList.fixedPlace;
        $scope.deviceCount = $scope.editList.fixedNumber;
        $scope.devicePrice = $scope.editList.fixedOnePrice;
        $scope.deviceAmount = $scope.editList.fixedPrice;
        $scope.useDept = $scope.editList.departmentName;
        $scope.user = $scope.editList.user.name == undefined?'':$scope.editList.user.name;
        $scope.selArr = $scope.editList.user.name == undefined?$scope.selArr1:$scope.selArr2;//使用状态下拉重置
        $scope.selectID = $scope.editList.user.id == undefined?'':$scope.editList.user.id;
        $scope.useStatus = $scope.editList.fixedSituation;
    };
    //设备编辑
    $scope.edit = function() {
        $('#editForm').data('bootstrapValidator').validate();
        if($('#editForm').data('bootstrapValidator').isValid()){
            if($scope.user == ''||$scope.selectID != ''){
                var appData = {};
                appData.userId = $scope.userId;
                appData.token = $scope.token;
                appData.data = {};
                appData.data.fixedName = $scope.deviceName;//fixedName	固定资产名称
                appData.data.assetsID = $scope.deviceGroup;//assetsID   类别ID
                appData.data.fixedID = $scope.deviceNumber;//fixedID   固定资产编号
                appData.data.fixedDetailID = $scope.deviceType;//fixedDetailID	资产型号
                appData.data.fixedBuyTime = $scope.buyTime;//fixedBuyTime	购入日期
                appData.data.fixedPlace = $scope.storagePlace; //fixedPlace	存放地点
                appData.data.fixedNumber = $scope.deviceCount;//fixedNumber	数量
                appData.data.fixedOnePrice = $scope.devicePrice;//fixedOnePrice	单价
                appData.data.fixedPrice = $scope.deviceAmount;//fixedPrice	总价
                appData.data.departmentName = $scope.useDept;//departmentName	使用部门
                appData.data.userName = $scope.selectID;//userName	用户名称
                appData.data.fixedSituation = $scope.useStatus; //fixedSituation	使用状态
                appData.data.id = $scope.editList.id;  //设备id
                //console.log(appData.data);
                appData.data = JSON.stringify(appData.data);
                //appData = JSON.stringify(appData);
                $http.post('cfg', appData, {
                    headers : {'contentType' : 'application/json','url-mapping' : '/fixed/fixedUpdate'}
                }).then(function successCallback(data){
                    //console.log(data);
                    if (data.data.statusCode == '200') {
                        $scope.isSuccess = true;
                        $('#editDevice').modal('hide');
                        $('#editForm').data("bootstrapValidator").resetForm();
                        $('#table').bootstrapTable('refresh');  // 刷新列表
                        $timeout(function() {$scope.isSuccess = false;}, 2000);
                    } else {
                        layer.msg(data.data.message,{icon: 5});
                        $scope.isError = true;
                        $timeout(function() {$scope.isError = false;}, 2000);
                    }
                },function errorCallback(data){
                    window.location.href = 'error.html';
                });
            }
        }
    };
    $scope.parsePrice = function($event) {
        var p = $($event.target).val();
        var pattern = /^\d+(\.\d*)?$/g;
        if(pattern.test(p)){
            $scope.devicePrice = parseFloat(p).toFixed(2);
        }
    };
    $scope.parseAmount = function($event) {
        var p = $($event.target).val();
        var pattern = /^\d+(\.\d*)?$/g;
        if(pattern.test(p)){
            $scope.deviceAmount = parseFloat(p).toFixed(2);
        }
    };
    //重置
    $scope.resetEdit = function() {
        layer.confirm('确定清空数据？', {
                title: '操作提示',
                icon: 3,
                btn: ['取消','确认'] //按钮
            }, function(ca){
                layer.close(ca);
            }, function(idx){
                $scope.$apply($scope.moveClear);
                layer.close(idx);
            }
        );
    };
    $scope.resetAdd = function() {
        layer.confirm('确定清空数据？', {
                title: '操作提示',
                icon: 3,
                btn: ['取消','确认'] //按钮
            }, function(ca){
                layer.close(ca);
            }, function(idx){
                $scope.$apply($scope.moveClear);
                layer.close(idx);
            }
        );
    };
    //导出
    $scope.export = function() {
        $("#exportFixed input[name = 'userName']").val($scope.searchName);
        $('#exportFixed').submit();
    };
    // 模板导出
    $scope.downModel = function() {
        $('#fixedMoter').submit();
    };
    //导入
    $scope.upExcel = function(file){
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
            $( "#uploadExcel" ).submit();
            $("#file_upload_return")[0].onload = function(){
                var upResult = $("#file_upload_return").contents().find("body").html();
                upResult = angular.fromJson(upResult);
                //console.log(upResult);
                if (upResult.code == 0) {
                    layer.msg('上传成功',{time: 2000, icon:6});
                    $('#table').bootstrapTable('refresh');
                } else {
                    layer.msg(upResult.msg,{time: 2000, icon:5});
                }
            };
        }
    };
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
});