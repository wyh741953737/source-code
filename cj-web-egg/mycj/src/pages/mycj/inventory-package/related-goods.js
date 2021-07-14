export function relatedGoodsFactory(angular) {
  var winHeight = $(window).height() * 1;
  var rightBarHeight = winHeight - 191 - 34;
  var nodataHeight = winHeight - 311;
  const app = angular.module('inventory-package-related-goods.module', []);

  app.controller('inventory-package-related-goods.ctrl', ['$scope', '$stateParams', 'dsp',
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
      $scope.chartDialog = false;
      $scope.shopId = $stateParams.shopId;
      $scope.id = $stateParams.id;
      $scope.shopName = $stateParams.shopName;
      console.log('shopId===>', $scope.shopId, 'id===>', $scope.id)
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
          packVid: $scope.id,
          shopId: $scope.shopId,
          pageNum: $scope.pageNum,
          pageSize: $scope.pageSize,
          name: $scope.inputStr
        };
        //layer.load(2);
        dsp.loadPercent($('.mycj-right-bar'), nodataHeight);
        $scope.dataList = [];
        dsp.postFun('cj/PackProduct/getCorrelationPackProduct', parms, (res) => {
          //layer.closeAll('loading');
          dsp.closeLoadPercent($('.mycj-right-bar'));
          if (res.data.statusCode === '200') {
            $scope.dataList = res.data.result.list;
            $scope.totalNum = res.data.result.count;
            $scope.num = res.data.result.num;
            $scope.dataList.forEach((o, i) => {
              o.isOpen = true;
            })
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
      //解除绑定
      $scope.shoePopUps = false;
      $scope.content = 'Are you sure to remove the binding?';
      $scope.unBindItem = null;
      $scope.unBind = function (item) {
        console.log(item)
        $scope.shoePopUps = true;
        $scope.unBindItem = item;
        // layer.open({
        //   type: 1,
        //   content: '<p>Are you sure to remove the binding?</p>',
        //   area: ['480px', '200px'],
        //   closeBtn: 0,
        //   shadeClose: true,
        //   title: null,
        //   skin: "",
        //   btn: ['No', 'Yes'],
        //   success: function (layero, index) {
        //   },
        //   yes: function (index, layero) {
        //     layer.close(index);
        //   },
        //   btn2: function (index, layero) {
        //     var parms = {
        //       type: item.shopId ? '0' : '1',
        //       pid: item.pid || '',
        //       vid: item.id || '',
        //       shopId: item.shopId
        //     };
        //     layer.load(2);
        //     dsp.postFun('cj/PackProduct/delCorrelation', parms, (res) => {
        //       layer.closeAll('loading');
        //       if (res.data.statusCode == '200') {
        //         layer.msg('Binding removed')
        //         layer.close(index);
        //         getData();
        //       } else {
        //         layer.msg('Binding removal failed')
        //       }
        //     }, (err) => {
        //       layer.close(index);
        //       console.log(err)
        //     })
        //     return false;
        //   }
        // });
      }
      // 获取弹窗组件关闭按钮
      $scope.$on('closePopUps', (e, data) => {
        $scope.shoePopUps = false;
      })
      // 获取弹窗组件确定按钮
      $scope.$on('confirmPopUps', (e, data) => {
        if($scope.unBindItem) {
          unBindFn($scope.unBindItem);
        }
        $scope.shoePopUps = false;
        $scope.unBindItem = null;
      })
      function unBindFn(item) {
        var parms = {
          type: item.shopId ? '0' : '1',
          pid: item.pid || '',
          vid: item.id || '',
          shopId: item.shopId
        };
        layer.load(2);
        dsp.postFun('cj/PackProduct/delCorrelation', parms, (res) => {
          layer.closeAll('loading');
          if (res.data.statusCode == '200') {
            layer.msg('Binding removed')
            layer.close(2);
            getData();
          } else {
            layer.msg('Binding removal failed')
          }
        }, (err) => {
          layer.close(2);
          console.log(err)
        })
      }

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
