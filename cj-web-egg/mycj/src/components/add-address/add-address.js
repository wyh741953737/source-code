import template from './add-address.html';
import styles from './add-address.less';

export function addAddressFactory(module) {
  module.component('addAddress', {
    template,
    controller: ['$rootScope', '$scope', '$location', 'dsp', '$element', 'utils', function($rootScope, $scope, $location, dsp, $element, utils) {
      $element.addClass([styles.addAddressComponent, 'add-address-box']);
      this.$onChanges = function() {
        addAddressCtrl.call(this, $rootScope, $scope, dsp, utils);
      };
    }],
    transclude: true,
    bindings: {
      parmas: '<'
    }
  });
}

function addAddressCtrl($rootScope, $scope, dsp, utils) {
  $scope.addressParmas = angular.copy(this.parmas);
  const { userId, vip } = $rootScope.userInfo;
  const { title, addressData = {}, addressList = [], flag = '' } = $scope.addressParmas;
  $scope.isVip = vip;
  $scope.isDefault = addressList.length==0 ? '1' : (addressData.isDefault || '0');
  $scope.addressList = addressList;
  // 获取国家地址
  function getCountryData() {
    return new Promise(resolve => {
      if (localStorage.getItem('countryData')) {
        resolve(JSON.parse(localStorage.getItem('countryData')) || []);
      } else {
        dsp.getFun('app/account/countrylist', ({ data }) => {
          resolve(data.statusCode === '200' ? JSON.parse(data.result) : []);
          localStorage.setItem('countryData', data.result);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  getCountryData().then(res => {
    $scope.countryData = res;
    // 设置默认选中国家
    if (Array.isArray($scope.countryData)) {
      if ($scope.countryData.length > 0) {
        $scope.countryInfo = title === 'Add Address' ?
            $scope.countryData[236] :
            $scope.countryData[dsp.findIndexByKey($scope.countryData, 'id', addressData.countrycode)]
        $scope.cityName = $scope.countryInfo.nameEn; //获取国家名
        // if ($scope.cityItem.indexOf($scope.cityName) >= 0) {
        //   $scope.showTaxid = true;
        // }
        $scope.$apply();
        $('.singleSelect').select2();
      }
    }
  });
  // 国家切换
  $scope.handleCountryChang = (item) => {
    $scope.countryInfo = item;
  };

  // 是否默认
  $scope.handleChangeCheckbox = () => {
    if(addressData.isDefault==1)return;
    if(addressList.length==0) return;
    $scope.isDefault = $scope.isDefault === '0' ? '1' : '0';
  };
  
  // 取消按钮
  $scope.handleCancel = () => {
    $scope.addressParmas.visible = false;
  };
  
  // 确认按钮
  $scope.handleConfirm = () => {

    if (!addressData.firstname) {
      layer.msg('please enter first name');
      return;
    }
    if (!addressData.lastname) {
      layer.msg('please enter last name');
      return;
    }
    if (!addressData.address) {
      layer.msg('please enter address1');
      return;
    }
    if (!$scope.countryInfo) {
      layer.msg('please select country');
      return;
    }
    if (!addressData.province) {
      layer.msg('please enter province');
      return;
    }
    if (!addressData.city) {
      layer.msg('please enter city');
      return;
    }
    //更改不需要税号
    const {ID:id,firstname,lastname,province,city,phone,address,postCode,zip,reserve,addressNew} = addressData;
    const {productList,totalPrice,logisticName,orderType,dutyNo} = $scope.addressParmas;
    const parmas = {
      userId,
      id,
      firstname,
      lastname,
      province,
      city,
      country: $scope.countryInfo.nameEn,
      countryCode: $scope.countryInfo.id,
      phone,
      address,
      addressNew: addressNew || '',
      zip,
      reserve: reserve || '',
      isDefault: $scope.isDefault,
      postCode,
      addressFlag: '1',
    };
    console.log(parmas)
    const data = {
      productList,
      addressId:id,
      totalPrice,
      logisticName,
      orderType,
      dutyNo,
      phone,
      zip
    }
    layer.load(2);
    const url = title === 'Add Address' ? 'app/info/adByAddress' : 'app/info/modifyAddress';
    const req = () => {
      dsp.postFun(url, { data: JSON.stringify(parmas) }, ({ data }) => {
        layer.closeAll('loading');
        if (data.statusCode === '200' || data.status === '200') {
          $scope.addressParmas.visible = false;
          // 向父级组件发起通讯
          $scope.$emit('confirmSuccess', {});
        }
      }, err => {
        console.log(err);
      });
    }
    if(!flag){
      if(url === 'app/info/adByAddress'){
        req()
      }else{
        dsp.postFun('app/buyOrder/checkCreateOrder',JSON.stringify(data),({data})=>{
          if(data.code==='200'){
            req()
          }else{
              layer.closeAll('loading');
              if(data.message){
                $scope.taxidErr = data.message.filter(item => item.type === 'dutyNo') || []
                $scope.phoneErr = data.message.filter(item => item.type==='phone') || []
                $scope.zipErr = data.message.filter(item => item.type==='zip') || []
              if($scope.phoneErr.length == 0 && $scope.zipErr.length === 0 && $scope.taxidErr.length > 0){
                req()
              }
            }
          }
        })
      }
    }else{
      req()
    }
  };
  //发票弹窗 电话号码只能输入数字
  $scope.onlyNumber = () => {
    $scope.addressParmas.addressData.phone = $scope.addressParmas.addressData.phone.replace(/[^\d\()-\s]/g, '');
  }
}

