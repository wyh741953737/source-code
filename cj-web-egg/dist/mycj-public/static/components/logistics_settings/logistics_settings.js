(function(angular) {
  angular.module('cjCompnentModule')
  .component('logisticsSettings', {
    templateUrl: 'static/components/logistics_settings/logistics_settings.html',
    controller: ['$scope', 'dsp', '$rootScope',function ($scope, dsp, $rootScope) {
      this.$onInit = function () {
        logisticsMappingSettingsCtrl.call(this, $scope, dsp, $rootScope);
      };
    }],
    bindings: {
    }
  })
  function logisticsMappingSettingsCtrl($scope, dsp, $rootScope) {
    const { vip, userId } = $rootScope.userInfo;
    $scope.vip = vip;
    $scope.userId = userId;
    $scope.shopId = null; // 店铺id
    $scope.storeName = ''; // 店铺名
    $scope.showLogisticsSettings = false;  // 是否展示弹窗
    $scope.showCJShip = null;
    $scope.search = '';
    $scope.shippingMethodList = []; // 物流映射列表
    $scope.CJShipList = [];  // cj物流列表
    $scope.noData = false; // 请求无数据时为true
    $scope.showLogisticsSettingsPopUps = false; // 是否显示确认弹窗
    $scope.content = '';  // 传给弹窗组件的内容
    $scope.confirmText = 'Confirm'; // 确定按钮文案
    $scope.popUpsType = null; // 弹窗组件的类型（对应当前页面哪个操作）
    $scope.delObj = {
      delItem: {},
      delKey: null
    }
    let defaultList = []; // 用来比较是否新增编辑过

    // 深拷贝
    const deepCopy = (source) => {
      const sourceCopy = source instanceof Array ? [] : {};
      for(let item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? deepCopy(source[item]) : source[item];
      }
      return sourceCopy;
    }

    const getList = () => {
      const params = {
        accountId: $scope.userId,
        shopId: $scope.shopId
      }
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun('platform-shop/query/getLogisticsMapping', params, function(response) {
        msgLoading.hide();
        const { code, data, message } = response.data;
        if(code == 200) {
          const list = data;
          // 从接口获取的所有数据先给一个status=2（0新增 1更新 2不变），方便区分新增和修改
          list.map(ele => {
            ele.status = 2;
          })
          $scope.shippingMethodList = deepCopy(list);
          defaultList = deepCopy(list);
          if(list.length == 0) {
            $scope.noData = true;
          } else {
            $scope.noData = false;
          }
        } else {
          $scope.noData = true;
          layer.msg(message);
        }
      },function() {
        msgLoading.hide();
      })
    }
    
    $scope.$on('showLogisticsSettings', function(d, data) {
      const { id, name } = data;
      $scope.shopId = id;
      $scope.storeName = name;
      $scope.showLogisticsSettings = true;
      getList();
      getCjShipList();
    })

    function getCjShipList() {
      // 获取cj物流列表
      const params = {
        customerId: $scope.userId,
        logisticsName: $scope.search
      };
      dsp.postFun('cujiaLogisticsFreight/operation/getModeListByCustomerId', params, function(response) {
        const { code, data, message } = response.data;
        if(code == 200) {
          $scope.CJShipList = data;
        } else {
          layer.msg(message);
        }
      })
    }

    // 修改shopify物流
    $scope.handleChangeShopLogistics = (item, key) => {
      if(item.status == 2) { // status=2代表是从接口处获取的原始数据，并非修改与新增数据
        $scope.shippingMethodList[key].status = 1;
      }
      if(item.shippingType) {
        $scope.shippingMethodList[key].shopLogisticsHeighLight = false;
        $scope.shippingMethodList[key].cjLogisticsHeighLight = false;
      }
    }

    // 展开物流下拉框
    $scope.handleSelectCJShip = (item, key, ev) => {
      ev.stopPropagation();
      $scope.search = '';
      getCjShipList();
      const dom1 = document.getElementById(`listItem${key}`);
      const dom2 = document.getElementById(`optionBox${key}`);
      const dom3 = document.getElementById('listMain');
      const text = document.getElementById(`searchInput${key}`);
      // 计算判断下拉框是出现在下面还是在上面,73px是一行的高度
      if(dom1.offsetTop > 73 || Math.abs(dom1.offsetTop - dom3.scrollTop) > 73) {
        dom2.classList.add('optionBoxTop');
      } else {
        dom2.classList.remove('optionBoxTop');
      }
      if($scope.showCJShip != key) {
        $scope.showCJShip = key;
        text.value = '';
      } else {
        $scope.showCJShip = null;
      }
    }

    // 输入框搜索cj物流
    let start = null;
    $scope.handleSearch = (value, ev) => {
      $scope.search = value;
      clearTimeout(start);
      start = setTimeout(() => {
        getCjShipList();
      }, 2000);
    }

    // 选择物流
    $scope.handleChecked = (ele, key) => {
      if($scope.shippingMethodList[key].logisticsWayNameen != ele.optionNameEn) {
        $scope.shippingMethodList[key].logisticsWayNameen = ele.optionNameEn;
        $scope.shippingMethodList[key].logisticsWayId = ele.optionId;
        if($scope.shippingMethodList[key].status == 2) {
          $scope.shippingMethodList[key].status = 1;
        }
      }
      if($scope.shippingMethodList[key].logisticsWayNameen) {
        $scope.shippingMethodList[key].shopLogisticsHeighLight = false;
        $scope.shippingMethodList[key].cjLogisticsHeighLight = false;
      }
      $scope.showCJShip = null;
      $scope.search = '';
    }

    // 删除物流映射
    $scope.handleDelete = (item, key) => {
      $scope.content = 'Are you sure to delete the corresponding shipping method? If it is deleted, CJ Shipping Method will not be automatically applied to the orders.';
      $scope.showLogisticsSettingsPopUps = true;
      $scope.popUpsType = 'delete';
      $scope.confirmText = 'Confirm';
      $scope.delObj = {
        delItem: item,
        delKey: key
      }
    }

    $scope.handleAddShipMethod = () => {
      const obj = {
        shippingType: '',
        logisticsWayNameen: '',
        logisticsWayId: '', // cj物流id
        status: 0 // 加上标识代表新增
      };
      // 上限为50条
      if($scope.shippingMethodList.length < 50){
        $scope.shippingMethodList.unshift(obj);
      }
      if($scope.shippingMethodList.length > 0) {
        $scope.noData = false;
      }
    }

    const del = () => {
      // 先判断数据是否本地新增还未上传数据库
      const { delItem, delKey } = $scope.delObj;
      if(delItem.status == 0) {
        // 本地新增数据，直接对数组进行操作
        $scope.shippingMethodList.splice(delKey, 1);
        layer.msg('Deleted Successfully');
        if($scope.shippingMethodList.length == 0) {
          $scope.noData = true;
        }
      } else {
        const params = {
          accountId: $scope.userId,
          shopId: $scope.shopId,
          logisticId:[
            { id: delItem.id }
          ]
        }
        const msgLoading = cjMessage.loading({ isFixed: true });
        dsp.postFun('platform-shop/query/deleteLogisticsMapping', params, function(response) {
          msgLoading.hide();
          const { code, data, message } = response.data;
          if(code == 200) {
            layer.msg('Deleted Successfully');
            getList();
          } else {
            layer.msg(message);
          }
        },function() {
          msgLoading.hide();
        })
      }
    }

    const add = () => {
      for(let i = 0, len = $scope.shippingMethodList.length; i < len; i++) {
        if(!$scope.shippingMethodList[i].shippingType) {
          layer.msg('Enter Shopify Shipping Method');
          $scope.shippingMethodList[i].shopLogisticsHeighLight = true;
          return ;
        } else if(!$scope.shippingMethodList[i].logisticsWayNameen) {
          layer.msg('Select CJ Shipping Method');
          $scope.shippingMethodList[i].cjLogisticsHeighLight = true;
          return ;
        } else {
          // $scope.shippingMethodList[i].heighLight = false;
          $scope.shippingMethodList[i].shopLogisticsHeighLight = false;
          $scope.shippingMethodList[i].cjLogisticsHeighLight = false;
        }
        for(let j = i+1, len = $scope.shippingMethodList.length; j < len; j++) {
          if($scope.shippingMethodList[i].shippingType == $scope.shippingMethodList[j].shippingType) {
            $scope.shippingMethodList[i].shopLogisticsHeighLight = true;
            $scope.shippingMethodList[j].shopLogisticsHeighLight = true;
            layer.msg('Shopify Shipping Method already exists.');
            return ;
          }
        }
      }
      const params = {
        accountId: $scope.userId,
        shopId: $scope.shopId,
        logisticList: $scope.shippingMethodList
      }
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun('platform-shop/query/setLogisticsMapping', params, function(response) {
        msgLoading.hide();
        const { code, data, message } = response.data;
        if(code == 200 && data != '0') {
          layer.msg('Saved Successfully');
          $scope.showLogisticsSettings = false;
        } else if(code == 200 && data == '0') {
          layer.msg('Shopify Shipping Method already exists.');
        } else {
          layer.msg(message);
        }
      }, function() {
        msgLoading.hide();
      })
    }

    // 获取弹窗组件关闭按钮
    $scope.$on('closePopUps', (e, d) => {
      $scope.showLogisticsSettingsPopUps = false;
      if($scope.popUpsType == 'add') {
        $scope.showLogisticsSettings = false;
      }
    })
    // 获取弹窗组件确定按钮
    $scope.$on('confirmPopUps', (e, d) => {
      if($scope.popUpsType == 'delete') {
        // 调用删除的方法
        del();
      } else if($scope.popUpsType == 'add') {
        // 调用添加的方法
        add();
      }
      $scope.showLogisticsSettingsPopUps = false;
    })

    $scope.handleBlur = () => {
      $scope.showCJShip = null;
    }

    $scope.handleClose = () => {
      if(JSON.stringify(defaultList) != JSON.stringify($scope.shippingMethodList)) {
        $scope.content = 'Are you sure to save changes?';
        $scope.showLogisticsSettingsPopUps = true;
        $scope.popUpsType = 'add';
        $scope.confirmText = 'Save';
      } else {
        $scope.showLogisticsSettings = false;
      }
    }
  
    $scope.handleConfirm = () => {
      add();
    }
  }
})(angular)

