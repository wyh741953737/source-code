import template from './ship-cost.html';
import styles from './ship-cost.less';

export function shipCostFactory(module) {
  module.component('shipCost', {
    template,
    controller: ['$rootScope', '$scope', '$location', 'dsp', '$element', 'utils', function($rootScope, $scope, $location, dsp, $element, utils) {
      $element.addClass([styles.shipCostComponent, 'ship_cost']);
      this.$onChanges = function() {
        shipCostCtrl.call(this, $rootScope, $scope, dsp, utils);
      };
    }],
    transclude: true,
    bindings: {
      shipinfo: '=',
      proinfo: '=',
    }
  });
}

function shipCostCtrl($rootScope, $scope, dsp, utils) {
  const userInfo = $rootScope.userInfo;
  $scope.vip = userInfo.vip;
  $scope.shipinfo = this.shipinfo;
  $scope.proinfo = this.proinfo;
  $scope.countryList = [];
  
  $scope.showList = false;
  $scope.weight = String($scope.shipinfo.weight).replace(' -- ', '-') + 'g';
  $scope.method = $scope.shipinfo.enName;
  $scope.selectItem = {
    id: '',
    name: '',
    nameEn: ''
  }
  $scope.selectItem.nameEn = $scope.shipinfo.enName;
  $scope.shipCost = '$' + 0;
  $scope.shipCostDis = '';
  $scope.shipDiscount = '';
  $scope.deliveryTime = ''
  const shipCostSpan1 = document.getElementById('ship-cost-span1');
  const shipCostSpan2 = document.getElementById('ship-cost-span2');
  const shipCostSpan3 = document.getElementById('ship-cost-span3');

  getCountryList();

  $scope.handleSelect = (item) => {
    // $scope.selectName = item.nameEn;
    $scope.selectItem = item;
    $scope.showList = false;
    cacuShipCost(item.id);
  }

  $scope.handleShowList = (ev) => {
    ev.stopPropagation()
    $scope.showList = !$scope.showList;
  }

  function getCountryList() {
    const msgLoading = cjMessage.loading({ isFixed: true })
    dsp.getFun('app/account/countrylist', function (response) {
        msgLoading.hide();
        let data = response.data;
        if (data.statusCode != 200) {
            layer.msg('Get the country list error');
        } else {
            $scope.countryList = JSON.parse(data.result);
            let _coutryCode = 'US'
            if($scope.shipinfo.shopType){
                if($scope.shipinfo.shopType == 'shopee' || $scope.shipinfo.shopType == 'Lazada') _coutryCode = 'TH'
            }
            if($scope.shipinfo.countryCode) _coutryCode = $scope.shipinfo.countryCode;
            const result = $scope.countryList.filter(item => item.id == _coutryCode);
            $scope.selectItem = result[0];
            cacuShipCost(_coutryCode);
            
            if ($scope.shipinfo.shipDiscount > 0) {
              $scope.shipCost = '$' + ($scope.shipinfo.shipCost || 0);
              shipCostSpan1.style.textDecoration = 'line-through';
              $scope.shipCostDis = '$' + ($scope.shipinfo.shipCostDis || 0);
              $scope.shipDiscount = '(' + $scope.shipinfo.shipDiscount + '% off)';
            } else {
              $scope.shipCost = '$' + ($scope.shipinfo.shipCost || 0);
              shipCostSpan1.style.textDecoration = 'line-through';
              $scope.shipCostDis = '';
              $scope.shipDiscount = '';
            }
        }
    }, function(err) {
      msgLoading.hide()
    });
  }
  
  function cacuShipCost(counCode) {
    dsp.getShipList({
        country: counCode,
        weight: $scope.shipinfo.weight,
        enName: $scope.shipinfo.enName,
        pid: $scope.shipinfo.pid,
        area: $scope.shipinfo.areaCountryCode,
        shopType: $scope.shipinfo.shopType,
        character : $scope.proinfo ? $scope.proinfo.propertyKey : '',
        channelValidSkip: true,
        successCallback: function (data) {
            console.log(data);
            if (data.length > 0) {
            $scope.deliveryTime = `${data[0].aging} Day(s)`
            }
            if (data.length == 0) {
              $scope.deliveryTime = '-'
              $scope.shipinfo.saveTag = false;
              layer.msg('The selected shipping method is not supported in this country.');
              shipCostSpan1.style.textDecoration = 'none';
              $scope.shipCost = '$' + 0;
              $scope.shipCostDis = '';
              $scope.shipDiscount = '';
              return false;
            }
            let shipCost;
            shipCost = data[0].discountPrice || data[0].price; // 原价
            let shipCostDis = data[0].price; // 折扣价
            if ($scope.shipinfo.shipDiscount > 0) {
              $scope.shipCost = '$' + shipCost;
              shipCostSpan1.style.textDecoration = 'line-through';
              $scope.shipCostDis = '$' + shipCostDis;
              $scope.shipDiscount = '(' + $scope.shipinfo.shipDiscount + '% off)';
            } else {
              shipCostSpan1.style.textDecoration = 'none';
              $scope.shipCost = '$' + shipCost;
              $scope.shipCostDis = '';
              $scope.shipDiscount = '';
            }
            $scope.shipinfo.saveTag = true;
        }
    })
}

  $scope.handleClose = () => {
    $scope.showList = false;
    $scope.$emit('closeShipCost', {showShipCost: false});
  }

  $scope.handleConfirm = () => {
    if ($scope.shipinfo.saveTag) {
      $scope.shipinfo.countryCode = $scope.selectItem.id; 
      $scope.shipinfo.countryName = $scope.selectItem.nameEn;
      $scope.shipinfo.price = String($scope.shipCost).replace('$', '');
      if ($scope.shipinfo.shipDiscount > 0) {
          $scope.shipinfo.discountPrice = String($scope.shipCostDis).replace('$', '');
      } else {
        $scope.shipinfo.discountPrice = String($scope.shipCost).replace('$', '');
      }
      $scope.$emit('confirmShipCost', {
        shipinfo: $scope.shipinfo
      });
    }
    $scope.handleClose();
  }
}