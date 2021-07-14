export function useOrderFactory(angular) {
  var winHeight = $(window).height() * 1;
  var rightBarHeight = winHeight - 191 - 34;
  var nodataHeight = winHeight - 311;
  const app = angular.module('inventory-package-use-order.moodule', []);

  app.controller('inventory-package-use-order.ctrl', ['$scope', '$stateParams', 'dsp',
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
      $scope.title = '';
      $scope.dataList = [];
      $scope.chartDialog = false;
      $scope.path = $stateParams.path;
      $scope.shopId = $stateParams.shopId || '';
      $scope.id = $stateParams.id;
      console.log('shopId===>', $scope.shopId, 'id===>', $scope.id)
      console.log($scope.path)
      if ($scope.path === 'use') {
        $scope.title = 'Total used:';
        $scope.url = 'cj/PackProduct/getPackUsedOrder';
      } else if ($scope.path === 'order') {
        $scope.title = 'Total subscribed:';
        $scope.url = 'cj/PackProduct/getPackMakeOrder';
      }
      //
      $scope.price = function (price) {
        $scope[price] = $scope[price].replace(/[^\.\d]/g, '');
      };
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
          pageNum: $scope.pageNum,
          pageSize: $scope.pageSize,
          sku: $scope.inputStr,
          packVid: $scope.id,
          shopId: $scope.shopId,
          startDate: $('#cj-stime').val(),
          endDate: $('#cj-etime').val(),
        };
        //layer.load(2);
        dsp.loadPercent($('.mycj-right-bar'), nodataHeight);
        $scope.dataList = [];
        dsp.postFun($scope.url, parms, (res) => {
          //layer.closeAll('loading');
          dsp.closeLoadPercent($('.mycj-right-bar'));
          if (res.data.statusCode === '200') {
            $scope.dataList = res.data.result.list;
            $scope.totalNum = res.data.result.count;
            $scope.usedNum = res.data.result.usedNum;
            console.log($scope.dataList)
            $scope.totalCounts = Math.ceil($scope.totalNum / $scope.pageSize);
            $scope.$broadcast('page-data', {
              pageNum: $scope.pageNum,
              totalNum: $scope.totalCounts,
              totalCounts: $scope.totalNum,
              pageSize: $scope.pageSize,
            });
          }
        }, (err) => {
          //layer.closeAll('loading');
          dsp.closeLoadPercent($('.mycj-right-bar'));
          console.log(err)
        })
      }

      getData();

      //状态
      $scope.status = function (status) {
        console.log(status,typeof(status))
        let stu;
        switch (status) {
          case '2':
            stu = 'Pending';
            break;
          case '3':
            stu = 'Awaiting Payment';
            break;
          case '10':
            stu = 'Paid';
            break;
          case '5':
            stu = 'Completed';
            break;
          case '11':
            stu = 'Payment Incoming';
            break;
          case '6':
            stu = 'Pending Shipment';
            break;
          case '12':
            stu = 'Dispatched';
            break;
          case '7':
            stu = 'Closed';
            break;
          case '13':
            stu = 'Completed';
            break;
        }
        return stu;
      };
      
      //分页
      $scope.$on('pagedata-fa', function (d, data) {
        console.log(data)
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getData();
      });
    }]);

  return app;

}
