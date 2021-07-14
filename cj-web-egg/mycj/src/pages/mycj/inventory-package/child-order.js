export function childOrderFactory(angular) {
  var winHeight = $(window).height() * 1;
  var rightBarHeight = winHeight - 191 - 34;
  var nodataHeight = winHeight - 311;
  const app = angular.module('inventory-package-child-order.module', []);

  app.controller('inventory-package-child-order.ctrl', ['$scope', '$stateParams', 'dsp',
    function ($scope, $stateParams, dsp) {
      /*
      * 默认配置
      * */
      $('.header-nav li').eq(0).addClass('active');
      dsp.setRightMinHeight();
      //数据声明
      $scope.pageNum = '1';
      $scope.pageSize = '10';
      $scope.totalNum = null;
      $scope.inputStr = '';
      $scope.dataList = [];
      $scope.type = $stateParams.type;
      $scope.id = $stateParams.id;
      $scope.packVid = $stateParams.packVid;
      $scope.shopId = $stateParams.shopId || '';
      $scope.title = '';
      console.log($scope.type)
      console.log($scope.packVid)
      console.log($scope.shopId)
      console.log($scope.id)
      if ($scope.type === 'use') {
        $scope.title = 'Used:';
      } else if ($scope.type === 'order') {
        $scope.title = 'Subscribed:';
      }
      //搜索
      $scope.searchPro = function () {
        $scope.pageNum = '1';
        getData();
      };
      $scope.enterSearch = function (event) {
        if (event.keyCode == 13) {
          $scope.searchPro();
        }
      }

      //获取数据
      function getData() {
        var parms = {
          id: $scope.id,
          shopId: $scope.shopId,
          packVid: $scope.packVid,
          pageNum: $scope.pageNum,
          pageSize: $scope.pageSize,
          cjId: $scope.inputStr,
          startDate: $('#cj-stime').val(),
          endDate: $('#cj-etime').val(),
        };
        //layer.load(2);
        dsp.loadPercent($('.mycj-right-bar'), nodataHeight);
        $scope.dataList = [];
        dsp.postFun('cj/PackProduct/getCjOrderInfo', parms, (res) => {
          //layer.closeAll('loading');
          dsp.closeLoadPercent($('.mycj-right-bar'));
          if (res.data.statusCode === '200') {
            $scope.dataList = res.data.result.list;
            $scope.totalNum = res.data.result.count;
            $scope.orderNo = res.data.result.id;
            $scope.num = res.data.result.totalNum;
            console.log($scope.dataList)
            pageFun()
          }
        }, (err) => {
          //layer.closeAll('loading');
          dsp.closeLoadPercent($('.mycj-right-bar'));
          console.log(err)
        })
      }

      getData();
      $scope.back = function () {
        history.go(-1);
      }
      //分页
      function pageFun() {
        $(".page-index").jqPaginator({
          totalCounts: Number($scope.totalNum) || 1,
          pageSize: Number($scope.pageSize),
          visiblePages: 5,
          currentPage: Number($scope.pageNum),
          activeClass: 'current',
          first: '<a class="prev" href="javascript:void(0);">&lt;&lt;<\/a>',
          prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
          next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
          last: '<a class="next" href="javascript:void(0);">&gt;&gt;<\/a>',
          page: '<a href="javascript:void(0);">{{page}}<\/a>',
          onPageChange: function (n, type) {
            if (type == 'init') {
              return;
            }
            ;
            $scope.pageNum = n.toString();
            getData();
          }
        });
      }

      $scope.chanPageSize = function () {
        $scope.pageNum = '1';
        getData();
      }
      $scope.chanPageNum = function () {
        if (!isNaN($scope.pageNum * 1) && $scope.pageNum * 1 > 0 && $scope.pageNum * 1 <= $scope.totalNum) {
          getData();
        } else {
          $scope.pageNum = '1';
        }
      }
    }]);

  return app;

}