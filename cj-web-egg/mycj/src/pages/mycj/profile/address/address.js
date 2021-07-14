import template from './address.html';
import css from './address.less';

export function profileAddressFactory(module) {
  module.component('profileAddress', {
    template,
    controller: ['$scope', '$element','dsp', function ($scope, $element, dsp) {
      $element.addClass([css.address, 'address-manage']);
      this.$onInit = function () {
        controllerFn.call(this, $scope, $element, dsp);
      };
    }],
    bindings: {
      el: '=', // 目标元素
    },
  });
}

function controllerFn($scope, $element, dsp) {
  const base64 = new Base64();
  const isNotErpAdmin = base64.decode(localStorage.getItem('erpoperateuser') || '') != 'admin' 
  const isFromErp = encodeURIComponent(localStorage.getItem('loginfromerp') || '') == '1' 
  $scope.fromErpNotAdmin = isNotErpAdmin && isFromErp
  const userId = localStorage.getItem('userId') ? base64.decode(localStorage.getItem('userId')) : "";

  function err(n) {
    console.log(n)
    layer.closeAll('loading')
  }
  //  获取用户地址列表
  function getAddress() {
    layer.load(2);
    dsp.postFun('app/info/useraddress', { "data": "{'userId': '" + userId + "'}" }, ({ data }) => {
      layer.closeAll('loading');
      let list = JSON.parse(data.result);
      let key = 0,obj;
      if(list.length>0){
        list.forEach((item,index)=>{
          if(item.isDefault=='1') key=index, obj= item;
        })
        list.splice(key,1);
        list.unshift(obj);
      }
      
      $scope.addressList = list;
    }, err)
  }
  getAddress();

  //设置默认地址
  $scope.setDefaultAddress =  (item, $event)=> {
    $event.stopPropagation();
    dsp.postFun('app/info/modifydefault', { "data": "{'userId': '" + item.userId + "','id':'" + item.ID + "'}" }, con, err)

    function con(n) {
      if (n.status == 200) {
        getAddress()
      }
    }
  }
  // 地址组件参数
  $scope.addressParmas = {
    visible: false,
    title: 'Add Address',
    addressData: {},
    addressList:[],
    flag:'profile'
  };

  //点击修改地址的按钮 显示弹窗 -- 模块2
  $scope.edit = function (item) {//点击修改地址的按钮
    $scope.addressParmas = {
      visible: true,
      title: 'Edit Address',
      addressData: item,
      addressList:$scope.addressList,
      flag:'profile'
    };
  }
  //添加新地址
  $scope.addNewFun = function () {
    $scope.addressParmas = {
      visible: true,
      title: 'Add Address',
      addressData: {},
      addressList:$scope.addressList,
      flag:'profile'
    };
  }
  //删除收货地址 -- 是否删除弹窗 -- 模块2
  $scope.isdelAdressFun = function (item) {
    $scope.isdelAddressFlag = true;
    $scope.itemId = item.ID;
  }
  
  //确认删除收货地址 -- 模块2
  $scope.deleteAddress = function () {
    dsp.postFun('app/info/delByAddress', { "data": `{'id': '${$scope.itemId}'}` },  ({data})=> {
      if (data.statusCode == 200) {
        $scope.isdelAddressFlag = false;
        layer.msg('Delete success')
        getAddress()
      } else {
        $scope.isdelAddressFlag = false;
        layer.msg('Delete failed')
      }
    })
  }
  // 监听地址组件确认成功后的回调
  $scope.$on('confirmSuccess', (e, data) => {
    getAddress();
  })
}
