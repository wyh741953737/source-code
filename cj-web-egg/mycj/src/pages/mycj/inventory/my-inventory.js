export function myInventoryFactory(angular) {
  var app = angular.module('my-inventory.module', []);

  app.controller('my-inventory.ctrl', ['$scope', '$rootScope', 'dsp', 'utils', function ($scope, $rootScope, dsp, utils) {
    $scope.isvip = $rootScope.userInfo.vip;
    dsp.setRightMinHeight();
    $scope.invelist = [];
    $scope.pageSize = '20';
    $scope.pageNum = '1';
    $scope.totalNum = 0;
    $scope.inputStr = '';
    $scope.isHideZero = false;

    $rootScope.$on('pojo/inventory/getCjAuthorityList', (_, bool) => {
      $scope.loading = bool;
      if (bool) {
        $scope.notDataFound = false;
      }
    });
    $rootScope.$on('pojo/inventory/getCjAuthorityTransforRecordList', (_, bool) => {
      $scope.loading = bool;
      if (bool) {
        $scope.notDataFound = false;
      }
    });

    $scope.returnInventoryList = function() {
      $scope.pageSize = '20';
      $scope.pageNum = '1';
      $scope.listUrl = false;
      $scope.listVidUrl = false;
      $scope.isViewTransRecord = false;
      getKuncunList();
    }

    $scope.transRecordsList = function () {
      $scope.pageSize = '20';
      $scope.pageNum = '1';
      $scope.listUrl = 'pojo/inventory/getCjAuthorityTransforRecordList';
      $scope.listVidUrl = 'pojo/inventory/getCjAuthorityVariantsTransforRecords';
      $scope.isViewTransRecord = true;
      getKuncunList();
    }

    $scope.returnInventoryList = function() {
      $scope.pageSize = '20';
      $scope.pageNum = '1';
      $scope.listUrl = false;
      $scope.listVidUrl = false;
      $scope.isViewTransRecord = false;
      getKuncunList();
    }

    function getKuncunList() {
      var url = $scope.listUrl || 'pojo/inventory/getCjAuthorityList'
      $scope.invelist = [];
      dsp.postFun(url, JSON.stringify({
        inputStr: $scope.inputStr,
        pageSize: $scope.pageSize,
        pageNum: $scope.pageNum
      }), function (data) {
        if (data.data.statusCode != 200) {
          dsp.cjMesFun(1);
          return;
        }
        var result = JSON.parse(data.data.result);
        $scope.supplier = result.bindingAccount;
        $scope.getCjAuthorityList = result.transforProducts;
        if (result.total == 0) {
          $scope.totalNum = 0;
          $scope.invelist = [];
          if ($scope.inputStr) {
            $scope.notDataFound = true;
          } else {
            $scope.noData = true;
          }
          return;
        }
        $scope.noData = false;
        var list = result.list;
        for (var i = 0; i < list.length; i++) {
          list[i].down = true;
        }
        $scope.invelist = list;
        $scope.totalNum = result.total;
        $scope.totalMoney = result.totalMny;
        $scope.totalCounts = Math.ceil($scope.totalNum / $scope.pageSize);
        $scope.$broadcast('page-data', {
          pageNum: $scope.pageNum,
          totalNum: $scope.totalCounts,
          totalCounts: $scope.totalNum,
          pageSize: $scope.pageSize,
          pagesizeList: ['10', '20', '50', '100']
        });
      });
    }
    getKuncunList();

  
    $scope.$on('pagedata-fa', function (d, data) {
      $scope.pageNum = data.pageNum;
      $scope.pageSize = data.pageSize;
      $scope.check_All = false;
      getKuncunList();
    });
  
    $scope.searchPro = function () {
      $scope.showResearch = true;
      $scope.pageNum = '1';
      getKuncunList();
    }
    $scope.enterSearch = function (event) {
      if (event.keyCode == 13) {
        $scope.searchPro();
      }
    }
    $scope.showVariant = function (item, index) {
      const isWarning = item.isWarning == '1' ? '1' : '';
      var url = 'pojo/inventory/getCjAuthorityVariants';
      $scope.currentClickedCategory = item.categoryId;
      dsp.postFun($scope.listVidUrl || url, JSON.stringify({ pid: item.pid, isWarning }), function (data) {
        if (data.data.statusCode != 200) {
          dsp.cjMesFun(1);
          return;
        }
        var result = JSON.parse(data.data.result);
        console.log('result--------------', result)
        $scope.invelist[index].vlist = result.list;
        $scope.invelist[index].down = false;
      });
    }
    $scope.hideVariant = function (item, index) {
      $scope.invelist[index].vlist = [];
      $scope.invelist[index].down = true;
    }

    $scope.toShowExport=function(){
      $scope.showExport = true;
    }

    $scope.exportExcel=function(){
      $scope.showExport = false;
      const pids=[]
      $scope.invelist.forEach(item=>{
          if(item.check == true){
              pids.push(item.pid)
          }
      })
      if(pids.length==0){
        layer.msg("Please select export list")
        return
      }
        const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun('order/goods/exportInventor', {"pids":pids.join(",")}, function (data) {
         msgLoading.hide();
          var result = data.data.result;
          if(data.data.statusCode == 200){
              location.href=result
          }
      }, function() {
        msgLoading.hide();
      })
    }

    $scope.transInventory = function(item, type) {
      $scope.clickedItem = item;
      $scope.showTransferConfirm = true;
      $scope.isTransVid = type
    }

    $scope.confirmTransInventory = function() {
      $scope.showTransferConfirm = false;
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun('app/ajax/autoSku', {"cid":$scope.clickedItem.categoryId || $scope.currentClickedCategory}, function (res1) {
        if(res1.data.statusCode === '200') {
          const params1 = {
            "locPid":$scope.clickedItem.pid,
            "accountName": utils.getLocalInfo('loginName'),
            "accountId":utils.getLocalInfo('userId'),
            "newSku":res1.data.result,
            "stanPids":$scope.isTransVid ? [$scope.clickedItem.vid] : [...$scope.clickedItem.privateVids]
          }
          dsp.postFun('supplierPlanInfo/cjproductTransform/doTransform', params1, function (res2) {
            if(res2.data.code === 200) {
              const params2 = {
                "accountId":utils.getLocalInfo('userId'),
                "stanIds": res2.data.data.map(item => {
                  return {
                    newStanSku: item.newSku,
                    oldStanId: item.oldStanPid,
                    newLocPid: item.newLocPid,
                    newStanPid: item.newStanPid,
                  }
                })
              }
              dsp.postFun('storehouse/cjproductTransform/outInventorys', params2, function (res3) {
                if(res3.data.code === 200) {
                  layer.msg('Transfer Success')
                  getKuncunList();
                } else {
                  layer.msg('Transfer failed')
                }
                msgLoading.hide();
              },function() {
                msgLoading.hide();
                layer.msg('Transfer failed')
              })
            } else if (res2.data.code === 5000024) {
              layer.msg('Out of listing products, you cannot transfer them. You can upgrade Pricing to list more products.')
              msgLoading.hide();
            } else if (res2.data.code === 5000001 || res2.data.code === 10000) {
              layer.msg(res2.data.error)
              msgLoading.hide();
            } else {
              layer.msg(res2.data.error)
              msgLoading.hide();
            }
          },function() {
            msgLoading.hide();
            layer.msg('Transfer failed')
          })
        } else {
          msgLoading.hide();
          layer.msg('Transfer failed')
        }
      },function() {
        msgLoading.hide();
        layer.msg('Transfer failed')
      }, function() {
        msgLoading.hide();
      })
    }

    $scope.checkAll = function(){
        if($scope.check_All){
          $scope.invelist.forEach(item=>{
            item.check = true
          })
        }else{
          $scope.invelist.forEach(item=>{
            item.check = false
          })
        }
    }
    $scope.checkOne = function (item, index) {
        if (item.check) {
            var num = 0;
            for (var i = 0; i < $scope.invelist.length; i++) {
            if ($scope.invelist[i].check) {
                num++;
            }
            }
            if (num == $scope.invelist.length) {
            $scope.check_All = true;
            }
        } else {
            $scope.check_All = false;
        }
    }

    dsp.getFun("app/storage/getStorage", function (data) {
      $scope.wareList = JSON.parse(data.data.result);
    });
    //viewDetails
    $scope.viewDetails = function (item) {
      $scope.isView = true;
      $scope.storageId = item.storageId;
      $scope.sku = item.sku;

      // 新仓库数据接口
      dsp.postFun("storehouse/WarehousInfo/getStorehouseNew ", {useStorageType:"1"}, function (data) {
        layer.closeAll('loading');
        if (data.data.code == 200) {
          var list = data.data.data;
          for (var i = 0; i < list.length; i++) {//直发仓
            var target = list[i];
            if (target.storageName == '直发仓') {
              list.splice(i, 1);
            }
          }
          var newArr = list.filter(item => {
            if (item.storageName !== '义乌直发仓') {
              return true;
            }
          }).filter(item => {
            if (item.storageName !== '深圳直发仓') {
              return true;
            }
          });
          $scope.StorageList = newArr;
        }
      })
      getList($scope.storageId)
    }
    function getList(storageId) {
        const msgLoading = cjMessage.loading({ isFixed: true });
        dsp.postFun("cj/CjAccInventoryDetail/getOutInInventoryRecordInfo", { storageId: storageId, sku: $scope.sku }, function (data) {
          msgLoading.hide();
          if (data.data.statusCode == 200) {
            $scope.detailList = data.data.result;
          }
        }, function() {
          msgLoading.hide();
        })
    }
    $scope.storageSelect = function (storageId) {
      getList(storageId)
    }
    //隐藏0库存商品
    $scope.hideZeroProduct = function() {
      $scope.isHideZero = !$scope.isHideZero;
      const isHide = $scope.isHideZero ? '1' : '0';

      dsp.postFun("app/customerConfig/saveConfigByType", { configValue: isHide, configType: 'isHideZeroInventory' }, function (data) {
        if (data.status === 200) {
          getKuncunList();
        }
      })

    }

    //获取上次用户是否隐藏记录
    function getUserStockConfig () {
      dsp.postFun("app/customerConfig/getConfigByType", {
        configType: 'isHideZeroInventory'
      }, function (data) {
        if (data.status == 200) {
          $scope.isHideZero = data.data.result === "1" ? true :false;
        }
      })
    }
    getUserStockConfig();
    // 显示预警提示文本
    $scope.warningMsgOne = '';
    $scope.warningMsgTwo = '';
    
    $scope.getMsg = function(item, fileds) {
      $scope.invelist = $scope.invelist.map(o => {
          if(o.vlist) {
              o.vlist = o.vlist.map(i => ({
                ...i,
                [fileds]: i[fileds] ? false : i.vid == item.vid,
              }))
          }
          return o;
      })
      
      if(typeof item.warningMap == 'object' && Object.keys(item.warningMap).length > 0) {
        const {warningType, actualValue, warningValue} = item.warningMap;
        switch (Number(warningType)) {
          case 0: { // 库存数量
            if(actualValue == warningValue) {
              $scope.warningMsgOne = 'Current private inventory (' + actualValue + ')';
              $scope.warningMsgTwo = 'has come to the set safety stock value '+ warningValue;
            } else if(actualValue < warningValue) {
              $scope.warningMsgOne = 'Cucurrent private inventory (' + actualValue + ')';
              $scope.warningMsgTwo = 'is less than set safety stock value by ' + (warningValue-actualValue) +  ' pieces';
            }
            break;
          }
          case 1: { // 可变天数
              $scope.warningMsgOne = 'Estimated Remaining Days: '+ actualValue;
              $scope.warningMsgTwo = 'Estimated Days to Restock: ' + warningValue;
              break;
          }
        }
      }
    }

    $scope.isShow = function (obj) {
      for (let i in obj) if (obj.hasOwnProperty(i)) return true;
      return false;
    };

    $scope.mouseOut = function(fileds) {
      $scope.invelist = $scope.invelist.map(o => {
        if(o.vlist) {
            o.vlist = o.vlist.map(i => ({
              ...i,
              [fileds]: false
            }))
        }
        return o;
    })
    }
  }]);

  return app;
}
