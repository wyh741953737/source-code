(function (angular) {
  angular.module('cjCompnentModule')
    .component('shipFrom', {
      templateUrl: './static/components/ship_from/ship_from.html',
      controller: shipFromCtrl,
      bindings: {
        // storeinfo: '=',
        proinfo: '=',
        frompage: '='
        // onLog: '&'
      }
    });
  
  function shipFromCtrl($scope, dsp,$timeout, utils) {
    var pvFlag = 'product'; // 区分商品还是变体，默认商品
    $scope.proinfo = this.proinfo;
    var productId = this.proinfo.id;
    var variantId; // 保存变体id
    
    $scope.wareList = []; //当前的仓库列表
    var wareListObj = {}; //当前的仓库列表
    $scope.frompage = this.frompage;
    $scope.inventoryType = '0' // 库存类型 0：所有库存 1：CJ库存 2：工厂库存

    var allowZifaAreaCountryCodes = ['CN'];

    function getInvsFun (param, cb) {
      dsp.postFun('storehousecj/areaInventory/getAreaInventoryInfo', param, function (data) {
        
        if (data.data.code == 200) {
          cb(data.data.data);
        }
      })
    }
    const supplierInventory = Array.isArray($scope.proinfo.defaultInventory) && $scope.proinfo.defaultInventory[0]  ? $scope.proinfo.defaultInventory[0] : null; // 供应商默认配仓，每个供应商都有一个默认仓库

    // 根据商品id，获取物流列表
    dsp.getAreaByPid(productId, function (data) {

        const tempArr = [];

        if(supplierInventory) {
          if(supplierInventory.countryCode === 'CN') {
            if(!data.some(i => i.areaId === '1')) {
              data = [{ areaEn: "China Warehouse ", areaId: "1", countryCode: "CN", entityId: "", num: 0 }, ...data]
            }
          }
        }
        for (var i = 0; i < data.length; i++) {
          data[i].allowZhifa = allowZifaAreaCountryCodes.includes(data[i].countryCode) ? '1' : '0';
          if(supplierInventory) {
            if(data[i].num !== 0) {
              wareListObj[data[i].countryCode] = data[i];
            }
          } else {
            wareListObj[data[i].countryCode] = data[i];
          }
        }

        if(!supplierInventory) { // 没有默认仓库，代表为cj商品， 有默认仓库，代表为供应商商品
          /* 老逻辑 */
          $scope.wareList = data;
          $scope.seleWare = $scope.wareList[0];
          /* 老逻辑 */
        } else {
          supplierInventory.allowZhifa = allowZifaAreaCountryCodes.includes(supplierInventory.countryCode) ? '1' : '0';
          supplierInventory.entityId = "";
          if(supplierInventory.hasOwnProperty('supplierId')) {
            delete supplierInventory.supplierId // 默认仓库对象中 有supplierId 需要删除统一
          }
          
          if($scope.proinfo.productType === '4') { // 如果为供应商自代发商品
            if(supplierInventory.countryCode === 'CN') {  //如果默认仓为中国仓
            data.some((item, index, arr) => {if(item.countryCode === supplierInventory.countryCode) {
              return tempArr.push(item)
            }})
            if(tempArr.length > 0) {  // 如果cj仓库中 包含默认仓
              $scope.wareList = data;
            } else {  // 如果cj返回的接口不包括 默认仓 则合并数据
               $scope.wareList = [...data, supplierInventory];
            }

            const cnWarehouse = $scope.wareList.find(i => i.countryCode === 'CN');
            $scope.seleWare = cnWarehouse;
            wareListObj['CN'] = cnWarehouse;
          } else { // 非中国默认仓
            if(data.length === 1 && data[0].countryCode === 'CN' && data[0].num === 0) {
              data = [];
            }
            
            data.some((item, index, arr) => {
              if(item.countryCode === supplierInventory.countryCode) {
                return tempArr.push(item)
              }
            })
            if(tempArr.length > 0) {
              
              $scope.wareList = [...data];
              $scope.seleWare = tempArr[0]
              wareListObj[$scope.seleWare.countryCode] = $scope.seleWare; // wareListObj 跟刊登list挂钩

            } else {
              const tempObj = {
                areaEn: "",
                areaId: "",
                countryCode: "",
                entityId: "",
                num: 0,
                realNum: 0,
                virtualNum: 0,
              }
              const tempSupplierInventory = {...tempObj, ...supplierInventory};  // 因为商品详情获取库存列表和供应商默认配仓字段对不上，特殊处理
              $scope.wareList = [...data, tempSupplierInventory];
              $scope.seleWare = tempSupplierInventory
              
            }
            $scope.wareList = $scope.wareList.filter(i => {
              if(i.num !== 0 || i.countryCode === supplierInventory.countryCode) { // 剔除多余库存为0的仓库但除开默认仓库
                return i;
              }
            })
            $scope.wareList.forEach(item => { // 设置默认仓
                if(item.countryCode === 'CN') {
                  if($scope.proinfo.productType === '5') {
                    item.num = item.num
                  } else {
                    item.num = item.num || 10000;
                  }
                 
                }
            })
            }
          }
          if($scope.proinfo.productType === '5') { // 如果为供应商自自发货商品
  
              if(data.every(i => i.num === 0)) { // 如果所有仓库的数量都为0
                wareListObj[supplierInventory.countryCode] = supplierInventory; // list 默认仓库为默认配仓
                $scope.wareList = [supplierInventory];
                $scope.seleWare = supplierInventory;
              } else {
                data.some((item, index, arr) => {
                  if(item.countryCode === supplierInventory.countryCode) {
                    return tempArr.push(item)
                  }
                })
                if(tempArr.length > 0) {
                  $scope.wareList = [...data];
                  $scope.seleWare = tempArr[0]
                } else {
                  $scope.wareList = [...data, supplierInventory];
                  $scope.seleWare = supplierInventory
                }
                if($scope.wareList.some(i => i.countryCode === supplierInventory.countryCode && i.num === 0)) {
                  $scope.wareList = $scope.wareList.filter(i => i.num !== 0);
                  $scope.seleWare = $scope.wareList[0];
                } else {
                  $scope.wareList = $scope.wareList.filter(i => {
                    if(i.num !== 0 || i.countryCode === supplierInventory.countryCode) { // 剔除多余库存为0的仓库但除开默认仓库
                      return i;
                    }
                  })
                }
              }
            }
         
        }
        
        // 把当前仓库及库存传给父组件（商品）
        $scope.$emit('ship-from', {
          flag: 'storage-default',
          data: {
            area: $scope.seleWare,
            list: $scope.wareList,
            num: $scope.seleWare.num,
            wareListObj: wareListObj,
            virtualNum: $scope.seleWare.virtualNum,
            realNum: $scope.seleWare.realNum,
            inventoryType: $scope.inventoryType
          }
        });
        dsp.getVInvsByPidAndAreaId({
          pid: productId, 
          areaId: $scope.seleWare.areaId
        },function (data) {
          $scope.$emit('ship-from', {
            flag: 'variant-invs',
            data: data
          });
        })
    })
    $scope.$on('change-shippingDetail',function(d,data) {
      if(data.flag === 'change-from') {
        $timeout(() =>{
          $scope.seleWare = {...$scope.seleWare , ...data.areaObj}
          $scope.chanSeleWare();
        })
        
      }
    })
    // $scope.changeInventory = function() {}
    $scope.chanSeleWare = function () {
      
      if (pvFlag == 'product') { // 选中的是商品的时候
        // 把当前仓库及库存传给父组件（商品）
        $scope.$emit('ship-from', {
          flag: 'chan-ware',
          data: {
            list: $scope.wareList,
            num: $scope.seleWare.num,
            virtualNum: $scope.seleWare.virtualNum,
            realNum: $scope.seleWare.realNum,
            area: $scope.seleWare,
            inventoryType: $scope.inventoryType
          }
        });
      }
      if (pvFlag == 'variant') { // 选中的是变体的时候
        // 根据商品id，获取物流列表
        getInvsFun({
          vid: variantId
        }, function (data) {
          let vStoreNum = 0, virtualNum = 0,realNum = 0;
          const currentSelected = data.find(i => i.countryCode === $scope.seleWare.countryCode);
          if(currentSelected) {
            vStoreNum = currentSelected.num;
            virtualNum = currentSelected.virtualNum;
            realNum = currentSelected.realNum;
          } else {
            data = [{
              areaEn: $scope.seleWare.areaEn,
              areaId: $scope.seleWare.areaId,
              countryCode: $scope.seleWare.countryCode,
              entityId: "",
              num: 0,
              priNum: 0,
              pubNum: 0,
              realNum: 0,
              virtualNum: 0
            }]
          }
          if(supplierInventory) {
            if($scope.proinfo.productType === '5') {
              if(data.every(i => i.num === 0)) { // 如果所有仓库的数量都为0
                data = [supplierInventory];
              } else {
                if(data.some(i => i.countryCode === supplierInventory.countryCode && i.num === 0)) {
                  data = data.filter(i => i.num !== 0);
                } else {
                  data = data.filter(i => i.num !== 0 || i.countryCode !== supplierInventory.countryCode)
                }
              }
            }
            if($scope.proinfo.productType === '4') {
              if(supplierInventory.countryCode !== 'CN' && data.length === 1 && data[0].countryCode === 'CN' && data[0].num == 0) {
                data = [];
              }
              if(!data.some(item => item.countryCode === supplierInventory.countryCode)) {
                data = [...data, supplierInventory]
              }
              if(supplierInventory.countryCode !== 'CN') {
                data.forEach(item => {
                  if(item.countryCode === 'CN') { 
                      item.num = item.num || 10000;
                  }
                })
              } else {
                data.forEach(item => {
                  if(item.countryCode === 'CN') { 
                      item.num = item.num;
                  }
                })
              }
            }
          }
          // 把当前仓库及库存传给父组件（商品）
          $scope.$emit('ship-from', {
            flag: 'chan-ware',
            data: {
              list: data,
              num: vStoreNum,
              virtualNum,
              realNum,
              area: $scope.seleWare,
              inventoryType: $scope.inventoryType
            }
          });
        })
      }
      dsp.getVInvsByPidAndAreaId({
        pid: productId,
        areaId: $scope.seleWare.areaId
      }, function (data) {
        $scope.$emit('ship-from', {
          flag: 'variant-invs',
          data: data
        });
      })
    }
    $scope.$on('to-ship-from', function (ev, data) {
      
      if (data.flag == 'get-pid-storage') { // 商品本体的时候
        // 把当前仓库及库存传给父组件（商品）
        if(supplierInventory) {
          $scope.$emit('ship-from', {
            flag: 'storage-pro',
            data: {
              list: $scope.wareList,
              num: $scope.seleWare.num
            }
          });
        } else {
          $scope.$emit('ship-from', {
            flag: 'storage-pro',
            data: {
              list: $scope.wareList,
              num: $scope.seleWare.num,
              virtualNum: $scope.seleWare.virtualNum,
              realNum: $scope.seleWare.realNum,
              inventoryType: $scope.inventoryType
            }
          });
        }
        
        pvFlag = 'product';
        
      }
      if (data.flag == 'get-vid-storage') { // 变体的时候
        // 把当前仓库对应的库存传给父组件（变体）
        variantId = data.data.vid;
        getInvsFun({
          vid: variantId
        }, function (data) {
          
          if(supplierInventory) {
            if($scope.proinfo.productType === '5') {
              if(data.every(i => i.num === 0)) { // 如果所有仓库的数量都为0
                data = [supplierInventory];
              } else {
                if(data.some(i => i.countryCode === supplierInventory.countryCode && i.num === 0)) {
                  data = data.filter(i => i.num !== 0);
                } else {
                  data = data.filter(i => i.num !== 0)
                }
              }
              
              
            }
            
            if($scope.proinfo.productType === '4') {
              if(supplierInventory.countryCode === 'CN') {
                data.forEach(i => {
                  i.num = i.num || 10000;
                  // i.realNum = i.num || 1000;
                  // i.virtualNum = i.num || 1000
                });
              } else {
                data.forEach(i => i.num = i.num);
              }
            }
            const currentWarehouse = data.find(i => i.countryCode === $scope.seleWare.countryCode);
            // 把当前仓库及库存传给父组件（商品）
            $scope.$emit('ship-from', {
              flag: 'storage-var',
              data: {
                list: data,
                num: currentWarehouse ? currentWarehouse.num : 0
              }
            });
          } else {
            console.log('$scope.seleWare: ', $scope.seleWare);
            let vStoreNum = 0, virtualNum = 0,realNum = 0;
            const currentSelected = data.find(i => i.countryCode === $scope.seleWare.countryCode);
            if(currentSelected) {
              vStoreNum = currentSelected.num;
              virtualNum = currentSelected.virtualNum;
              realNum = currentSelected.realNum;
            } else {
              data = [{
                areaEn: $scope.seleWare.areaEn,
                areaId: $scope.seleWare.areaId,
                countryCode: $scope.seleWare.countryCode,
                entityId: "",
                num: 0,
                priNum: 0,
                pubNum: 0,
                realNum: 0,
                virtualNum: 0
              }]
            }
            // 把当前仓库及库存传给父组件（商品）
            $scope.$emit('ship-from', {
              flag: 'storage-var',
              data: {
                list: data,
                num: vStoreNum,
                virtualNum,
                realNum,
                inventoryType: $scope.inventoryType
              }
            });
          }
        })
        pvFlag = 'variant';
      }
      if (data.flag == 'change-ship-from-select') {
        $scope.platformItem = data.outerPlatform
        $scope.platformCountryItem = data.outerplatformCountryItem
      }
    })
  }


})(angular)