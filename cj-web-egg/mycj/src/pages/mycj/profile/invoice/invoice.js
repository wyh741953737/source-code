import template from './invoice.html';
import css from './invoice.less';

export function profileInvioceFactory(module) {
  module.component('profileInvoice', {
    template,
    controller: ['$scope', '$element', 'dsp', function ($scope, $element, dsp) {
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
  $scope.invoiceParmas = {
    visible: false,
    title: '',
    invoiceData: {}
  }
  $scope.isDefault=0;
  getInvoiceList();
  function getInvoiceList() {
    dsp.postFun('app/invoiceBill/getInvoiceBillTitalList', '{}', function ({ data }) {
      let list = data.list;
      let key = 0, obj;
      if (list.length > 0) {
        list.forEach((item, index) => {
          if (item.isDefault == '1') key = index, obj = item;
        })
        list.splice(key, 1);
        list.unshift(obj);
      }
      $scope.invoiceList = list;
    }, function (data) {
      console.log(data)
    })
  }
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
    const countrycode = $scope.invoiceParmas.invoiceData.countrycode;
    // 设置默认选中国家
    if (Array.isArray($scope.countryData) && $scope.countryData.length > 0) {
      $scope.countryInfo = $scope.itemId ? $scope.countryData[dsp.findIndexByKey($scope.countryData, 'id', countrycode)] : $scope.countryData[236];
    }
  });
  //设置默认发票 
  $scope.inSetDefult = function (item) {
    const changeData = {
      id: item.id
    };
    layer.load(2)
    dsp.postFun('app/invoiceBill/updateInvoiceBillTitalIsDeault', JSON.stringify(changeData), ({ data }) => {
      layer.closeAll('loading')
      layer.msg(data.code == '200' ? 'Set default success' : 'Set default failed')
      if (data.code == '200') getInvoiceList();
    }, function (data) {
      layer.closeAll('loading')
    })
  }
  //删除发票弹窗
  $scope.isdelInvoiceFun = item => {
    $scope.isdelConginessFlag = true;
    $scope.itemId = item.id;
  }

  // 是否默认
  $scope.handleChangeCheckbox = () => {
    if($scope.invoiceParmas.invoiceData.isDefault==1)return;
    if($scope.invoiceList.length==0) return;
    $scope.isDefault = $scope.isDefault === '0' ? '1' : '0';
  };
  //删除发票弹窗确认
  $scope.deletInvoiceFun = function () {
    const changeData = {
      id: $scope.itemId
    };
    layer.load(2)
    dsp.postFun('app/invoiceBill/dellInvoiceBillTital', JSON.stringify(changeData), ({ data }) => {
      layer.closeAll('loading')
      if (data.code == '200') {
        $scope.isdelConginessFlag = false;
        layer.msg('Delete success')
        getInvoiceList()
      } else {
        layer.msg('Delete failed')
      }
    }, function (data) {
      layer.closeAll('loading')
    })
  }
  //修改默认发票信息弹窗
  $scope.inChangeFun = function (item) {
    $scope.itemId = item.id;
    $scope.invoiceParmas = {
      visible: true,
      title: 'Edit Consignee',
      invoiceData: angular.copy(item)
    }
    $scope.countryInfo = $scope.countryData[dsp.findIndexByKey($scope.countryData, 'id', item.userCountryCode)]
    $scope.isDefault = item.isDefault;
  }
  //新增发票弹窗打开
  $scope.addConsigneeFun = function () {
    $scope.itemId = '';
    $scope.invoiceParmas = {
      visible: true,
      title: 'Add New Consignee',
      invoiceData: {}
    }
    setTimeout(function() {
      $('.singleSelect').select2();
    }, 100)
    $scope.isDefault = $scope.invoiceList.length > 0 ? '0' : '1';
  }
  //取消修改发票
  $scope.handleCancel = function () {
    $scope.invoiceParmas.visible = false;
  }
  //发票弹窗 电话号码只能输入数字
  $scope.onlyNumber = () => {
    $scope.invoiceParmas.invoiceData.userPhone = $scope.invoiceParmas.invoiceData.userPhone.replace(/[^\d\()-\s]/g, '');
  }
  function verifyFun() {
    const invoiceData = $scope.invoiceParmas.invoiceData;
    if (!invoiceData.firstName) {
      layer.msg('Please enter the first name.')
      return false;
    } else if (!invoiceData.lastName) {
      layer.msg('Please enter the last name.')
      return false;
    } else if (!invoiceData.userPhone) {
      layer.msg('Please enter the phoneNumber.')
      return false;
    } else if (!invoiceData.userEmail) {
      layer.msg('Please enter the email.')
      return false;
    } else if (!dsp.isEmail(invoiceData.userEmail)) {
      layer.msg('Please enter a correct email address')
      return false;
    } else if (!invoiceData.userOrgName) {
      layer.msg('please enter the company.')
      return false;
    } else if (!$scope.countryInfo) {
      layer.msg('please select thr country.')
      return false;
    } else if (!invoiceData.userVatNumber) {
      layer.msg('Please enter the vat number.')
      return false;
    } else if (!invoiceData.userAddress) {
      layer.msg('Please enter the address1.')
      return false;
    } else if (!invoiceData.userProvince) {
      layer.msg('Please enter the province.')
      return false;
    } else if (!invoiceData.userCity) {
      layer.msg('Please enter the city.')
      return false;
    } else if (!invoiceData.userZip) {
      layer.msg('Please enter the postcode.')
      return false;
    } else {
      return true;
    }
  }
  // 国家切换
  $scope.handleCountryChang = (data) => {
    $scope.countryInfo = data;
  };
  //修改或新增发票
  $scope.handleConfirm = function () {
    const invoiceData = $scope.invoiceParmas.invoiceData;
    console.log($scope.countryInfo)
    if(!verifyFun()) return;
    let addInvData = {
      ...invoiceData,
      userCountryCode: $scope.countryInfo.id,
      userCountry:$scope.countryInfo.nameEn,
      id: $scope.itemId,
      isDefault:$scope.isDefault,
      editFlag:'1'//只在编辑模式下起作用
    }
    let ourl = $scope.itemId ? 'app/invoiceBill/editInvoiceBillTitalInfo' : 'app/invoiceBill/addInvoiceBillTital'
    layer.load(2)
    dsp.postFun(ourl, JSON.stringify(addInvData), function (data) {
      console.log(data)
      layer.closeAll('loading')
      if (data.data.code == '200') {
        $scope.invoiceParmas.visible = false;
        layer.msg('Change invoice success')
        layer.closeAll('loading')
        getInvoiceList()
      } else {
        layer.msg('Change invoice failed')
        layer.closeAll('loading')
      }
    }, function (data) {
      layer.closeAll('loading')
    })
  }
}
