(function (angular) {
  angular.module('cjCompnentModule')
    .component('storeShipSetting', {
      templateUrl: './static/components/store_ship_setting/store_ship_setting.html',
      controller: ['$scope', 'dsp', 'utils', function ($scope, dsp, utils) {
        this.$onInit = function () {
          storeShipSettingCtrl.call(this, $scope, dsp, utils);
        };
      }],
      bindings: {
        iteminfo: '=',
      }
    });

  function storeShipSettingCtrl($scope, dsp, utils) {
    console.log(this.iteminfo);
    $scope.itemInfo = this.iteminfo;
    $scope.userId = utils.getLocalInfo('userId');
    $scope.token = utils.getLocalInfo('token');
    // console.log($scope.userId, $scope.token);
    $scope.content = 'The changes have not been saved. Are you sure to exit?';


    // 获取物流方式
    function getLogisticsWay(shopType) {
      dsp.postFun('app/shop/getLogisticsWay', {
        shopType
      }, res => {
        // console.log(res);
        const data = res.data;
        if (data.statusCode == 200 && data.result && data.result.length > 0) {
          $scope.getLogisticsWay = data.result;
        }
      })
    }

    $scope.getlogisticsList = []; //获取物流优先级数据
    $scope.wuliuMethod = ''; //物流方式
    $scope.wuliuPriority = ''; //物流优先级
    $scope.logisListShow = false; //店铺物流设置弹窗
    $scope.saveLogisticsShow = false; //保存操作确认弹窗
    $scope.deleteLogisticsShow = false; //删除操作确认弹窗
    $scope.wuliuMethod = {};
    $scope.wuliuPriority = {};

    $scope.$on('showStoreLogistics', (d, data) => {
      const { iteminfo } = data;
      $scope.itemInfo = iteminfo;
      $scope.logisticsClick();
    })

    // 打开店铺物流设置
    $scope.logisticsClick = () => {
      console.log($scope.itemInfo);
      getLogisticsWay($scope.itemInfo.type);
      $scope.logisListShow = true; //开启弹窗

      // 获取物流优先级列表数据
      let data = {
        accountId: $scope.userId,
        shopId: $scope.itemInfo.id
      }
      dsp.postFun('app/shop/logisticsPriorityList', data, (res) => {
        // console.log(res);
        const data = res.data;
        if (data.statusCode == 200) {
          if(data.result && data.result.length > 0) {
            data.result.forEach((e, i) => {
              e.priority = String(e.priority);
              e.editFlag = true;
              e.status = 'Save';
            });
            $scope.getlogisticsList = data.result;
          } else {
            $scope.getlogisticsList = [];
          }
        } else {
          // layer.msg(data.message);
        }
      }, (err) => {});
    };

    // 关闭店铺物流设置
    $scope.closeLogistics = () => {
      console.log($scope.getlogisticsList);
      for (const item of $scope.getlogisticsList) {
        if (!item.editFlag) return $scope.notificationShow = true;
      }
      $scope.logisListShow = false;
      $scope.$emit('hideAction', true);
      $scope.getlogisticsList = [];
      $scope.wuliuMethod = {};
      $scope.wuliuPriority = {};
    };

    // 编辑
    $scope.editLogistics = (index, item) => {
      item.status = 'Edit';
      item.editFlag = false;
      $scope.wuliuMethod[index] = '';
      $scope.wuliuPriority[index] = '';
    };

    // 保存
    $scope.saveLogistics = (index, item) => {
      if (!$scope.wuliuMethod[index]) return layer.msg('Please select the shipping method.');
      if (!$scope.wuliuPriority[index]) return layer.msg('Please set the priority.');
      for (let i = 0; i < $scope.getlogisticsList.length; i++) {
        if ($scope.getlogisticsList[i].shippingMethod == $scope.wuliuMethod[index]) return layer.msg('You cannot add an existed shipping method.');
        if ($scope.getlogisticsList[i].priority == $scope.wuliuPriority[index]) return layer.msg('You cannot add existed priority.');
      }
      $scope.saveLogisticsShow = true;
      // 确认保存操作后更新物流数据
      $scope.updateLogistics = () => {
        if (item.newItemFlag) {
          post = 'app/shop/addLogisticsPriority';
          data = {
            shopId: $scope.itemInfo.id,
            shippingMethod: $scope.wuliuMethod[index],
            priority: $scope.wuliuPriority[index]
          }
        } else {
          post = 'app/shop/modifyLogisticsPriority';
          data = {
            id: item.id,
            shippingMethod: $scope.wuliuMethod[index],
            priority: $scope.wuliuPriority[index]
          };
        }
        dsp.postFun(post, data, res => {
          console.log(res);
          const data = res.data;
          $scope.saveLogisticsShow = false;
          if (data.statusCode == 200) {
            layer.msg(data.message);
            item.status = 'Save';
            item.editFlag = true;
            item.newItemFlag = false;
            item.shippingMethod = $scope.wuliuMethod[index];
            item.priority = $scope.wuliuPriority[index];
            console.log($scope.getlogisticsList);
          } else {
            layer.msg(data.message);
          }
        })
      }
    };


    // 取消
    $scope.cancelLogistics = (index, item) => {
      item.status = 'Save';
      item.editFlag = true;
      $scope.wuliuMethod[index] = '';
      $scope.wuliuPriority[index] = '';
      console.log($scope.getlogisticsList);
    };

    // 删除
    $scope.deleteLogistics = (index, item) => {
      if (item.newItemFlag) {
        $scope.getlogisticsList.splice(index, 1);
        $scope.wuliuMethod[index] = '';
        $scope.wuliuPriority[index] = '';
        return ;
      }
      $scope.deleteLogisticsShow = true;
      $scope.deleteLogisticsAck = () => {
        dsp.postFun('app/shop/removeLogisticsPriority', {
          id: item.id
        }, res => {
          console.log(res);
          const data = res.data;
          $scope.deleteLogisticsShow = false;
          if (data.statusCode != 200) return layer.msg(data.message);
          layer.msg(data.message);
          $scope.getlogisticsList.splice(index, 1);
          $scope.wuliuMethod[index] = '';
          $scope.wuliuPriority[index] = '';
        })
      }
    };

    // 新增物流方式
    $scope.addSellogistics = () => {
      // 只能添加三种物流方式
      if ($scope.getlogisticsList.length >= 3) return layer.msg("You can only set three shipping methods at most.");
      let data = {
        shopName: $scope.itemInfo.name,
        shippingMethod: '',
        priority: '',
        editFlag: false,
        // status: 'Edit',
        newItemFlag: true
      }
      $scope.getlogisticsList.push(data);
    };

    // 获取弹窗组件关闭按钮
    $scope.$on('closePopUps', (e, data) => {
      $scope.notificationShow = false;
    })
    // 获取弹窗组件确定按钮
    $scope.$on('confirmPopUps', (e, data) => {
      $scope.logisListShow = false;
      $scope.selectLogisticsShow = false;
      $scope.notificationShow = false;
      $scope.wuliuMethod = {};
      $scope.wuliuPriority = {};
      $scope.getlogisticsList = [];
    })


    // // 关闭提示弹窗取消
    // $scope.candelMessage = () => {
    //   $scope.notificationShow = false;
    // };

    // // 关闭提示弹窗确定
    // $scope.confirmMessage = () => {
    //   $scope.logisListShow = false;
    //   $scope.selectLogisticsShow = false;
    //   $scope.notificationShow = false;
    // }
  }

})(angular)