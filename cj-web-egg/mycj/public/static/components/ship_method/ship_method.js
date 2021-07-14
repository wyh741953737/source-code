(function (angular) {
  angular.module('cjCompnentModule')
    .component('shipMethod', {
      templateUrl: './static/components/ship_method/ship_method.html',
      controller: shipMethodCtrl,
      bindings: {
        // storeinfo: '=',
        proinfo: '=',
        frompage: '='
        // onLog: '&'
      }
    });
  
  function shipMethodCtrl($scope, dsp, $timeout, utils) {

    // 新物流接口：'erp/logistics/getLogisticsFreight'
    // POST
    // 必传：countryCode - 到达国家，property - 商品属性，weight - 商品（邮寄）重量 ，
    // 非必传：logisticsName - 物流名字，logisticsId - 物流ID，


    var proData = {}; // 保存商品
    var frompage; // 保存父页面
    // var frompage = this.frompage; // 保存父页面
    // proData-shipFromName:发货区域英文名，weight：（当前）试算重量，character：商品属性，pid：商品id
    // shipFromId：发货区域ID，
    var currShipMethod;
    var bs = new Base64();
    $scope.$on('to-ship-method', function (d, data) {
      if (data.flag == 'get-default') {
        var data = data.data;
        proData.areaEn = data.areaObj.areaEn;
        proData.areaId = data.areaObj.areaId;
        proData.countryCode = data.areaObj.countryCode;
        proData.weight = data.weight;
        proData.character = data.character;
        proData.pid = data.pid;
        proData.varientWeightArr = data.varientWeightArr;
        proData.stanProducts = data.stanProducts;
        proData.productSku = data.productSku;
        if(data.productType === '5') { // 如果该商品是供应商自发商品，需加参数
          const supplierSelfDeliveryParams = {
              supplierId: data.supplierId || undefined,
              productType: data.productType || undefined,
              sku: data.sku || undefined
          }
          proData = Object.assign(proData, supplierSelfDeliveryParams)
        }
        $scope.inventoryList = data.inventoryList;
        $timeout(() => {
          $scope.areaObj = data.areaObj;
          getCounAndShip();
        })
        
      }
      
      // 改变发货仓
      if (data.flag == 'chan-ware') {
        proData.areaEn = data.areaObj.areaEn;
        proData.areaId = data.areaObj.areaId;
        proData.countryCode = data.areaObj.countryCode;
        $timeout(() => {
          $scope.areaObj = data.areaObj;
          getCounAndShip();
        })
        
      }

      if (data.flag == 'show-list') {
        $scope.isShowList = true
        frompage = data.frompage;
        forbidScroll();
        $scope.showWuliuFlag = true;
        $scope.checkWuliu = $scope.shipItem;
        $('#from-coun-span').html(proData.areaEn);
        if($scope.platformItem == 'Shopee' || $scope.platformItem == 'Lazada') {
          for (let i = 0; i < $scope.platformCountryList.length; i++) {
            if($scope.platformCountryList[i].nameEn == data.outerplatformCountryItem.nameEn) {
              $scope.platformCountryItem = $scope.platformCountryList[i]
            }
          }
        }
      }

      if (data.flag == 'change-ship-method') {
        $scope.isOuter = data.isOuter
        $scope.platformItem = data.outerPlatform
        $scope.platformCountryList = data.outerPlatformCountryList
        $scope.chanPlatform() 
      }

      // 改变重量
      if (data.flag == 'chan-weight') {
        proData.weight = data.data.weight;
        proData.stanProducts = data.data.variantList;
        if(proData.productType === '5') {
          getShipCost(proData, function (data) {
            $scope.$emit('ship-method', {
              flag: 'ship-cost',
              data: data
            });
          })
          // 更新物流列表
          getShipList(proData, function (data2) {
            if(data2 && data2.length !== 0) {
              
              $scope.checkWuliu = data2[0];
              $scope.logisticList = data2;
            }
          })
        } else {
          getCounAndShip();
        }
      }
    })

    function getCounAndShip () {
      if(proData.productType === '5') {  // 如果是供应商自发货商品，需要走另外的供应商物流
        dsp.getSupplierReceiveCountries({sku: proData.sku}, function (data) {
            $scope.countryList = data;
            if ($scope.countryList.length == 0) {
              $scope.checkWuliu = null;
              $scope.logisticList = [];
              return;
            }
            setCountry();
            getShipList(proData, function (data) {
              $scope.logisticList = data;
              if($scope.shipItem) {
                const findLogistic = data.find(i => $scope.shipItem.logisticName === i.logisticName);
                if(findLogistic) {
                  $scope.checkWuliu = findLogistic;
                  $scope.shipItem = findLogistic;
                } else {
                  $scope.checkWuliu = data[0];
                  $scope.shipItem = data[0];
                }
              } else {
                $scope.checkWuliu = data[0];
                $scope.shipItem = data[0]
              }
              $scope.$emit('ship-method', {
                flag: 'get-default-back',
                data: {
                  shipCountryCode: $scope.countryItem ? $scope.countryItem.code : '',
                  shipCountryName: $scope.countryItem ? $scope.countryItem.nameEn : '',
                  merchShipMethod: $scope.shipItem ? $scope.shipItem.logisticName : '',
                  shipInfo: data,
                }
              });
            })
          })
      } else {
        dsp.getReceiveCountries({
          startCountryCodes: [proData.countryCode],
          platForm: $scope.platformItem
        }, function (data) {
            if(!data) {
              $scope.checkWuliu = null;
              $scope.logisticList = [];
              return;
            }
            $scope.countryList = data;
            setCountry();
            getMulShipList(proData, function (data) {
              
              
              if($scope.shipItem) {
                const findLogistic = data.find(i => $scope.shipItem.logisticName === i.logisticName);
                if(findLogistic) {
                  $scope.checkWuliu = findLogistic;
                  $scope.shipItem = findLogistic;
                } else {
                  $scope.checkWuliu = data[0];
                  $scope.shipItem = data[0];
                }
              } else {
                $scope.checkWuliu = data[0];
                $scope.shipItem = data[0]
              }
              
              $scope.logisticList = data;
              if (!$scope.shipItem) {
                $scope.checkWuliu = null;
                $scope.logisticList = [];
              }
              $scope.$emit('ship-method', {
                flag: 'get-default-back',
                data: {
                  shipCountryCode: $scope.countryItem ? $scope.countryItem.code : '',
                  shipCountryName: $scope.countryItem ? $scope.countryItem.nameEn : '',
                  merchShipMethod: $scope.shipItem ? $scope.shipItem.logisticName : '',
                  shipInfo: data,
                  // merchShipDays: $scope.shipItem.aging
                }
              });
            })
          })
      }
    }


    function setCountry () { // 设置默认的目的地仓库
      if(!$scope.countryList) {
        $scope.countryList = []
      }
      if($scope.countryItem) {
        const destination = $scope.countryList.find(i => i.code === $scope.countryItem.code);
        if(destination) {
          $scope.countryItem = destination;
        } else {
          $scope.countryItem = $scope.countryList[0];
        }
      } else {
        var setFlag = 0;
        for (var i = 0; i < $scope.countryList.length; i++) {
          if(proData.countryCode === 'CN') { // 当发货仓为中国仓时 
            if ($scope.countryList[i].code == 'US') {
              setFlag = 1;
              $scope.countryItem = $scope.countryList[i];
              break;
            }
          } else {
            if ($scope.countryList[i].code == proData.countryCode) {
              setFlag = 1;
              $scope.countryItem = $scope.countryList[i];
              break;
            }
          }
        }
        if (!setFlag) {
          $scope.countryItem = $scope.countryList[0];
        }
      }
    }

    // 试算运费
    function getShipCost(proData, successCallback) {
      
      dsp.getShipList({
        enName: $scope.shipItem.logisticName,
        country: proData.country,
        weight: proData.weight,
        character: proData.character,
        pid: proData.pid,
        country: $scope.countryItem.code,
        shopType: $scope.platformItem,
        // areaId: proData.areaId,
        area: $scope.platformItem == 'Shopee' ? $scope.platformCountryItem.nameEn != 'International' ? $scope.platformCountryItem.code : proData.countryCode : proData.countryCode,
        storeCountry: $scope.platformCountryItem && $scope.platformCountryItem.code,
        successCallback: function (data) {
          successCallback(data)
        }
      })
    }

    function getShipList(proData, successCallback) {
      
      dsp.getShipList({
        country: proData.country,
        weight: proData.weight,
        character: proData.character,
        pid: proData.pid,
        country: $scope.countryItem && $scope.countryItem.code,
        // areaId: proData.areaId,
        shopType: $scope.platformItem,
        // area: 'CN',
        area: $scope.platformItem == 'Shopee' ? $scope.platformCountryItem.nameEn != 'International' ? $scope.platformCountryItem.code : proData.countryCode : proData.countryCode,
        storeCountry: $scope.platformCountryItem && $scope.platformCountryItem.code,
        supplierId: proData.supplierId,
        productType: proData.productType,
        sku: proData.sku,
        // shopId: option.shopId,
        successCallback: function (data) {
          if(Array.isArray(data)) {
            data.sort((prevStr,currentStr) => {
              if(typeof prevStr.price === 'string' && typeof currentStr.price === 'string') {
                const arrPrev = prevStr.price.split('--');
                const arrCurrent = currentStr.price.split('--');
                const prev = parseFloat(arrPrev[0]);
                const current = parseFloat(arrCurrent[0]);
                return prev - current;
              }
              if(typeof prevStr.price === 'number' && typeof currentStr.price === 'number') {
                const prev = prevStr.price;
                const current = currentStr.price;
                return prev - current;
              }
              return data;
            })
          }
          successCallback(data)
        }
      })
    }

    function getMulShipList(proData, successCallback) { // 这个是新的物流试算，需要传入商品的长宽高
    
      if(!$scope.countryItem) {
        return successCallback([]);
      }
      const params = proData.stanProducts.map(i => {
        return {
          startCountryCode: proData.countryCode,
          countryCode: $scope.countryItem ? $scope.countryItem.code : '',
          platform: $scope.platformItem,
          property: proData.character,
          weight: i.PACKWEIGHT,
          sku: proData.pid,
          length: i.long,
          width: i.width,
          height: i.height,
          volume: i.volume,
          customerCode: localStorage.getItem('userId') ? bs.decode(localStorage.getItem('userId')) : '',
          skus: [i.SKU]
        }
      });
      dsp.getMulShipList (
        params,
        function (data) {
          if(Array.isArray(data)) {
            data.sort((prevStr,currentStr) => {
              if(typeof prevStr.price === 'string' && typeof currentStr.price === 'string') {
                const arrPrev = prevStr.price.split('--');
                const arrCurrent = currentStr.price.split('--');
                const prev = parseFloat(arrPrev[0]);
                const current = parseFloat(arrCurrent[0]);
                return prev - current;
              }
              if(typeof prevStr.price === 'number' && typeof currentStr.price === 'number') {
                const prev = prevStr.price;
                const current = currentStr.price;
                return prev - current;
              }
              return data;
            })
          }
          successCallback(data)
        }
      )
    }

    $scope.checkOneWuliu = function (item) {
      $scope.checkWuliu = item;
    }
    $scope.hover = null;
    $scope.handleMouseover = (item) => {
      $scope.hover = item;
    }
    $scope.handleMouseout = () => {
      $scope.hover = null;
    }

    // 变更目的国家
    $scope.chanCoun = function () {
      if(proData.productType === '5') { 
        getShipList(proData, function (data2) {
          if(data2 && data2.length !== 0) {
            if($scope.shipItem) {
              const findLogistic = data2.find(i => $scope.shipItem.logisticName === i.logisticName);
              if(findLogistic) {
                $scope.checkWuliu = findLogistic;
                $scope.shipItem = findLogistic;
              } else {
                $scope.checkWuliu = data[0];
                $scope.shipItem = data[0];
              }
            } else {
              $scope.checkWuliu = data[0];
              $scope.shipItem = data[0]
            }
            $scope.logisticList = data2;
          } else {
            $scope.logisticList = [];
          }
        })
      } else {
        getMulShipList(proData, function (data) {
          if(data && data.length !== 0) { 
            if($scope.shipItem) {
              const findLogistic = data.find(i => $scope.shipItem.logisticName === i.logisticName);
              if(findLogistic) {
                $scope.checkWuliu = findLogistic;
                $scope.shipItem = findLogistic;
              } else {
                $scope.checkWuliu = data[0];
                $scope.shipItem = data[0];
              }
            } else {
              $scope.checkWuliu = data[0];
              $scope.shipItem = data[0]
            }
            $scope.logisticList = data;
          } else {
            $scope.logisticList = [];
          }
        })
      }
      
    }

    $scope.wuliuok = function () {
      $scope.isShowList = false
      if ($scope.checkWuliu) {
        $scope.shipItem = $scope.checkWuliu;
        const emitData = {
          shipCountryCode: $scope.countryItem.code,
          shipCountryName: $scope.countryItem.nameEn,
          merchShipMethod: $scope.shipItem.logisticName,
          areaObj: $scope.areaObj,
          shipInfo: [$scope.checkWuliu],
        }
          $scope.$emit('ship-method', {
            flag: 'get-default-back',
            data: emitData
          });
          trackingPush(emitData)
      }
      $scope.$emit('ship-method', {
        flag: 'inner-platform',
        innerPlatform: $scope.platformItem,
        innerPlatformCountryList: $scope.platformCountryList,
        innerPlatformCountryItem: $scope.platformCountryItem,
      })
      $scope.showWuliuFlag = false;
      $scope.checkWuliu = null;
      $scope.isOuter = false;
      permitScroll();
    }
    
    function trackingPush(params) {
      if (params.areaObj?.countryCode) {
        generateTrackingParams("016", "shipped_from_click", "shippedFrom", params.areaObj.countryCode)
      }
      if ($scope.platformItem) {
        generateTrackingParams("017", "platform_select_click", "platformSelect", $scope.platformItem)
      }
      if (params.merchShipMethod) {
        generateTrackingParams("019", "Shipping_Method_click", "shippingMethod", params.merchShipMethod)
      }
      if (params.shipCountryCode) {
        generateTrackingParams("018", "Destination_Country_click", "destinationCountry", params.shipCountryCode)
      }
    }

    function generateTrackingParams(eleId, act, filedName, fieldValue) {
      const track = {
        elementId: eleId,
        actionType: act,
        list: [
          {
            fieldValue,
            filedName
          }
        ]
      }
      $global_tracking.pushData(track)
    }

    $scope.wuliuCancel = () => {
      $scope.showWuliuFlag = false;
      $scope.checkWuliu = null;
      permitScroll();
    }

    // 运费试算
    $scope.platFormList = []
    $scope.platformItem = 'Shopify'
    function getPlatform() {
      var url = 'freight/logistics/getFreightStepOne';
      dsp.postFun(url, JSON.stringify({}), function (data) {
        if (data.data.code == '200') {
          var result = data.data.data
          $scope.platFormList = result.platFormList
          
        }
      })
    }
    getPlatform()
    function getPlatformCountry (successCallback) {
      dsp.postFun('freight/logistics/getPlatformCountry', {
        platForm: $scope.platformItem
      }, function (data) {
        if (data.data.code == '200') {
          successCallback(data.data.data);
        }
      })
    }
    $scope.chanPlatform = function () {
      if($scope.isShowList) {
        $scope.isOuter = false
      }
      getPlatformCountry(function (data) {
        
        $scope.platformCountryList = data || [];
        if ($scope.platformItem === 'Shopee') {
          $scope.platformCountryList.push({
            code: "",
            nameCn: "国际站",
            nameEn: "International"
          })
        }
        
        if ($scope.platformCountryList && $scope.platformCountryList.length > 0) {
          $scope.platformCountryItem = $scope.platformCountryList[0];
        } else {
          $scope.platformCountryItem = null;
        }
        if(proData.productType === '5') {
          dsp.getSupplierReceiveCountries({
            sku: proData.sku
          },function (data) {
            $scope.countryList = data || [];
            if ($scope.countryList.length == 0) {
              $scope.checkWuliu = null;
              $scope.logisticList = [];
              return;
            }
            setCountry();
            getShipList(proData, function (data2) {
              if(data2.length !== 0) {
                $scope.checkWuliu = data2[0];
                $scope.logisticList = data2;
              }
            })
          })
        } else {
          dsp.getReceiveCountries({
            startCountryCodes: $scope.platformItem == 'Shopee' ? $scope.platformCountryItem.nameEn != 'International' ? [$scope.platformCountryItem.code] : [proData.countryCode] : [proData.countryCode],
            platForm: $scope.platformItem
          },function (data) {
            $scope.countryList = data || [];
            if ($scope.countryList.length == 0) {
              $scope.checkWuliu = null;
              $scope.logisticList = [];
              return;
            }
            setCountry();
            getMulShipList(proData, function (data) {
              $scope.checkWuliu = data[0];
              $scope.logisticList = data;
              $scope.shipItem = data[0];
              if (!$scope.shipItem) {
                $scope.checkWuliu = null;
                $scope.logisticList = [];
              }
              if($scope.isOuter) {
                $scope.wuliuok()
              }
            })
          })
        }
      })
    }
    $scope.chanplatformCountry = function () {
      if(proData.productType === '5') { //供应商自发货商品
        dsp.getSupplierReceiveCountries({
          sku: proData.sku
        }, 
          function (data) {
          $scope.countryList = data || [];
          if ($scope.countryList.length == 0) {
            $scope.checkWuliu = data2[0];
            $scope.logisticList = [];
            return;
          }
          setCountry();
          getShipList(proData, function (data2) {
            if(data2.length !== 0) {
              $scope.checkWuliu = data2[0];
              $scope.logisticList = data2;
            }
          })
        })
      } else {
        dsp.getReceiveCountries({
          startCountryCodes: $scope.platformItem == 'Shopee' ? $scope.platformCountryItem.nameEn != 'International' ? [$scope.platformCountryItem.code] : [proData.countryCode] : [proData.countryCode],
          platForm: $scope.platformItem
        }, function (data) {
          $scope.countryList = data || [];
          if ($scope.countryList.length == 0) {
            $scope.checkWuliu = null;
            $scope.logisticList = [];
            return;
          }
          setCountry();
          getMulShipList(proData, function (data) {
            $scope.checkWuliu = data[0];
            $scope.logisticList = data;
            $scope.shipItem = data[0];
            if (!$scope.shipItem) {
              $scope.checkWuliu = null;
              $scope.logisticList = [];
            }
          })
        })
      }
    }

    $scope.chanCountryCode = function () {
      proData.areaEn = $scope.areaObj.areaEn;
      proData.areaId = $scope.areaObj.areaId;
      proData.countryCode = $scope.areaObj.countryCode;
      $scope.$emit('change-shippingFrom',{
          flag: 'change-from',
          areaObj: $scope.areaObj
      })
      if(proData.productType === '5') { 
        getShipList(proData, function (data2) {
          if(data2 && data2.length !== 0) {
            $scope.checkWuliu = data2[0];
            $scope.logisticList = data2;
            $scope.shipItem = data2[0];
          }
        })
      } else {
        getMulShipList(proData, function (data) {
          $scope.checkWuliu = data[0];
          $scope.logisticList = data;
          $scope.shipItem = data[0];
          if (!$scope.shipItem) {
            $scope.checkWuliu = null;
            $scope.logisticList = [];
          }
        })
      }
    }

    // 运费试算中当有抛货时展示
    $scope.showCastTips = (list) => {
      if(!list || list.length == 0) return false

      for(let i = 0; i < list.length;i++){
        const item = list[i]
        if(item.cast == 1) return true
      }

      return false
    }

    function bodyScroll(event) {
      event.preventDefault();
    }
    function forbidScroll() { // 禁止滚动
      document.body.addEventListener('touchmove', bodyScroll, false);
      angular.element('body').css({ 'position': 'fixed', "width": "100%" });
      angular.element('.pd-con-wrap').css({ 'position': 'relative', 'zIndex': 101 });
    }
    function permitScroll() { // 放开滚动
      document.body.removeEventListener('touchmove', bodyScroll, false);
      angular.element("body").css({ "position": "initial", "height": "auto" });
      angular.element('.pd-con-wrap').css({ 'position': 'static', 'zIndex': 101 });
    }

    const matchStart = (params, data) => {
      // If there are no search terms, return all of the data
      if ($.trim(params.term) === '') {
        return data;
      }

      // Do not display the item if there is no 'text' property
      if (typeof data.text === 'undefined') {
        return null;
      }

      // `params.term` should be the term that is used for searching
      // `data.text` is the text that is displayed for the data object
      if (data.text.toLowerCase().startsWith(params.term.toLowerCase())) {
        var modifiedData = $.extend({}, data, true);
        // You can return modified objects from here
        // This includes matching the `children` how you want in nested data sets
        return modifiedData;
      }

      // Return `null` if the term should not be displayed
      return null;
    }

    $('#country-list-sele').select2({
      matcher: matchStart
    });

  }


})(angular)