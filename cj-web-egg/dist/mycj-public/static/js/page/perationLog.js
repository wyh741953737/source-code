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
    $scope.opContents = {'1':'修改密码','2':'新增','3':'修改','4':'删除','10':'重置密码'};
  // 日志列表  
  $scope.options = {
    method: 'post',
    url: 'cfg',
    toolbar: '#toolbar',
    search: true,
    searchAlign: 'left',
    queryParams: function(pageSize, pageNumber, searchText) {
        //console.log(pageSize,pageNumber,searchText);
        if (pageSize.search == undefined) {
            pageSize.search = '';
        }
        if ($scope.startDate == undefined) {
            $scope.startDate = '';
        }
        if ($scope.endDate == undefined) {
            $scope.endDate = '';
        }
        if ($scope.typeSet == undefined) {
            $scope.typeSet = '';
        }
        var result = {};
        result.userId = $scope.userId;
        result.token = $scope.token;
        result.data = {};
        result.data.limit = pageSize.limit;
        result.data.start = pageSize.offset;
        result.data.sort = pageSize.sort == undefined?'opDate$DESC':pageSize.sort + '$' + pageSize.order.toUpperCase();
        result.data.filter = {};
        result.data.filter['SEARCH$GTE$opDate'] = $scope.startDate;
        result.data.filter['SEARCH$LTE$opDate'] = $scope.endDate;
        result.data.filter['SEARCH$EQ$type'] = $scope.typeSet;
        result.data.filter['SEARCH$LIKE$opUser'] = pageSize.search;
        $scope.searchName = pageSize.search;
        result.data = JSON.stringify(result.data);
        //console.log(result);
        return result;
    },
    ajaxOptions:{headers : {'contentType' : 'application/json','url-mapping' : '/app/audit/list'}},
    pagination: true,
    sidePagination: 'server',
    height: '800',
    showRefresh: true,
    striped: true,
    pageSize: 20,
    pageList: [20],
    responseHandler:function(data) {
      if (data == '') {
        return data;
      } else {
          //console.log(data);
          if(data.statusCode == 200) {
              //console.log(data);
              //console.log(angular.fromJson(data.result).root);
          var result = {total:angular.fromJson(data.result).totalProperty, rows:angular.fromJson(data.result).root};// 服务器端分页模式data特定格式,客户端直接返回data数组
          $scope.data = result;
          return result;
          }
      } 
    },
    columns: [{
        title: '序号',
        align: 'center',
        valign: 'middle',
        width: 100,
        formatter: function (value, row, index) {  
          return index + 1;  
        }  
      },{
        field: 'opUser',
        title: '账号',
        align: 'center',
        valign: 'middle'
      },{
        field: 'type',
        title: '操作内容',
        align: 'center',
        valign: 'middle',
        formatter: function(value, row, index){
            //console.log(value,row,index);
            return $scope.opContents[value];
        }
      },{
        field: 'type',
        title: '操作页面',
        align: 'center',
        valign: 'middle',
        formatter: function(value, row, index){
            //console.log(value,row,index);
            if (value != 1&&value != 10) {
                return row.memo.url;
            }
        }
    },{
        field: 'opIp',
        title: 'IP',
        align: 'center',
        valign: 'middle'
      },{
        field: 'opDate',
        title: '时间',
        align: 'center',
        valign: 'middle',
        sortable: true
      }]
  };
    $scope.reflash = function(){
        $('#table').bootstrapTable('refresh');  // 刷新列表
    };
    //导出
    $scope.export = function() {
        $("#exportLog input[name = 'userName']").val($scope.searchName);
        $('#exportLog').submit();
    };
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
});