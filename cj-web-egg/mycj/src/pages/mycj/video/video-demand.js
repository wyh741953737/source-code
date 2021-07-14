export function videoDemandFactory(angular) {
  const module = angular.module('video-demand.module', []);

  module.controller('video-demand.ctrl', ['$scope', '$rootScope', 'dsp', 'enumApp', function ($scope, $rootScope, dsp, enumApp) {
    var userId = $rootScope.userInfo.userInfo;
    $scope.statusEnums = enumApp.status;

    $scope.status = '';
    $scope.searchNum = '';
    $scope.sourceType = '';
    $scope.pageSize = '10';
    $scope.pageNum = '1';
  
    $rootScope.$on('media/orderMedia/selectMediaDemandList', (_, bool) => $scope.loading = bool);
  
    //数据请求函数
    function getList() {
      const parmas = {
        pageNum: $scope.pageNum,
        pageSize: $scope.pageSize,
        data:{
          number: $scope.searchNum,
          isErp: false,
          status: $scope.status,
          sourceType: $scope.sourceType,
          mediaType: $scope.mediaType ? Number($scope.mediaType) : undefined
        },
      };
      dsp.postFun('media/orderMedia/selectMediaDemandList', parmas, res => {
        if (res.data.code === 200) {
          $scope.dataList = res.data.data.list;
          $scope.totalNum = res.data.data.total;
          $scope.totalPageNum = Math.ceil($scope.totalNum / $scope.pageSize);
          if ($scope.dataList.length > 0) {
            $scope.dataList = $scope.dataList.map(o =>{
              if (o.imageUrl)
                o.imageUrl = `https://${o.imageUrl.split(',')[0].replace('https://', '').replace('http://', '')}`;
              return o;
            })
            dsp.removeNodataPic($('.source-orders-list'), 450);
          } else {
            dsp.addNodataPic($('.source-orders-list'), 450);
          }
          $scope.$broadcast('page-data', {
            pageNum: $scope.pageNum,
            totalNum: $scope.totalPageNum,
            totalCounts: $scope.totalNum,
            pageSize: $scope.pageSize
          });
        } else {
          dsp.cjMesFun(1);
        }
      }, err => {
        dsp.addNodataPic($('.source-orders-list'), 450);
        dsp.cjMesFun(1);
      });
    }
  
    $scope.$on('pagedata-fa', function(d, data) {
      $scope.pageNum = data.pageNum;
      $scope.pageSize = data.pageSize;
      getList(dsp, $scope);
    });
  
    getList();
  
    $scope.handleSearch = () => {
      $scope.pageNum = 1;
      getList();
    };
  
    $scope.enterSearch = function (e) {
      $scope.pageNum = 1;
      e.keyCode === 13 && getList();
    }

    // 删除搜品
    $scope.deleteSourcing = function (item) {
      $scope.isDelSourcing = true;
      $scope.confirmFun = function() {
        dsp.postFun('app/videoDemand/updateVideoDemand', {
            'id': item.id,
            'status': '0',
            'sourceType': item.sourcetype
          }, function(res) {
            if (res.data.statusCode == 200) {
              $scope.isDelSourcing = false;
              getList();
            } else {
              dsp.cjMesFun(1);
          }
        }, function (res) {
          console.log(res)
        }
        )
      }
    }
  }])

  return module;
}
