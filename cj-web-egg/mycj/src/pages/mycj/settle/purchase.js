import { obj } from 'through2';
import { debounce } from '../../../utils'
 
export function mycjPurchaseFactory(angular) {
  const module = angular.module('mycj-purchase.module', []);
  module.controller('mycj-purchase.ctrl', ['$scope', 'dsp', '$rootScope', '$stateParams', '$sce', '$element', '$timeout', 'utils', function ($scope, dsp, $rootScope, $stateParams, $sce, $element, $timeout, utils) {
    const { userId, vip } = $rootScope.userInfo; // 用户信息
    let timer;
    $scope.bundleshow = false;// 组合商品详情
    $scope.iossShow = false;// 组合商品详情
    $scope.vip = vip; // ['0':普通用户,'1':'VIP用户']
    $scope.isVip = vip === '1';
    // 展示ioss下拉框
    $scope.showIossSelect = false;
    $scope.addressData = []; // 地址数据
    $scope.shippingData = []; // 物流方式
    $scope.addressInfo = null; // 选中的地址信息
    $scope.pageNum = 0; // 地址数据总页数
    $scope.orderType = $stateParams.orderType || 'zf'; // 订单类型[1688插件订单:'taobao',自定义包装订单:'package',直发订单:'zf']
    $scope.shippingTips = null; // 物流提示信息
    // $scope.loadingFlag = true; // loading
    // $scope.shipType = '1'; // [1:选择地址 2:选择仓库]
    $scope.shipType = $stateParams.shipType || '1'; // 区分直发、私有库存 1直发 2私有
    $scope.warehouseData = []; // 仓库数据
    $scope.warehouseTips = null; // 仓库提示
    $scope.isSupplier = $stateParams.isSupplier && $stateParams.isSupplier === 1; // true 供应商或泰国商品 false 其他
    $scope.warehouseRuleTips = 'The policy to use overseas warehouses (US, Thailand, Germany) is: no less than <strong>10pcs for a variant</strong> and no less than <strong>100pcs for a total</strong>.';
    // 组合商品信息
    $scope.groupProductList = []
    // 展示no Ioss 项
    $scope.notShowNoIossOption = true;
    // 展示add Ioss 按钮
    $scope.showAddIoss = true
    console.log('接收的参数===》', $stateParams);
    console.log('用户信息===》', $rootScope.userInfo);

    // 控制模态框显示参数
    $scope.showShippingModal = false

    // 地址组件参数
    $scope.addressParmas = {
      visible: false,
      title: 'Add Address',
      addressData: {},
      addressList:[],
      productList:[]
    };
    let bs = new Base64();
    $scope.loginName = bs.decode(dsp.getCookie('loginName'));
    console.log($scope.loginName,"loginName=========")

    // 提交异常提示
    const errMsg = {
      '1007': 'Insufficient inventory. Please change the product quantity.',
      '3000': 'There’s an error on the order, please contact your agent or try again later.',
      '3001': 'There’s an error on the amount, please try again later.',
      '3002': 'The amount exceeds the limit, please try again later.',
      '3003': 'There is no available shipping method for the weight of all products exceed the limit, please split the order to place.',
      '3004': 'There is a network problem, please try again later.',
      '3005': 'There’s an error on your order placement, please try again later.',
      '3006': 'There’s an error on the amount settlement, please try again later.',
      '3007': 'There are products not connected, please connect them and try again later.'
    };

    $scope.modalTxt = []
    // 关闭组合商品弹窗
    $scope.closeBundle = () => {
      $scope.bundleshow = !$scope.bundleshow;
    }
    // 关闭ioss弹窗
    $scope.closeIoss = () => {
      $scope.iossShow = !$scope.iossShow;
    }
    // 打开ioss弹窗
    $scope.openIoss= (list) => {
      $scope.iossShow = true;
    }

    // 打开组合商品弹窗
    $scope.openBundle = (list) => {
      $scope.groupProductList = list;
      $scope.bundleshow = true;
    }

    // 定义基本数据
    const initData = {
      zf: { // 直发单
        orderId: undefined,
        pathType: 'DIRECT',
        createURL: 'app/buyOrder/createOrder',
        LogisticURL: 'app/buyOrder/getLogisticList',
        getProductUrl: 'app/buyOrder/getShoppingCart',
        getProductData: getProductData
      },
      taobao: { // 1688 淘宝插件订单
        orderId: $stateParams.id || '',
        pathType: 'FormTb',
        createURL: 'app/externalPurchase/createZFOrderForChajian',
        getProductUrl: 'app/externalPurchase/getPayOrderAndProductByZFOrderId',
        LogisticURL: 'app/externalPurchase/getLogisticList',
        getProductData: getProductData
      },
      package: { // 包装商品订单
        orderId: undefined,
        pathType: 'DIRECT',
        createURL: 'app/buyOrder/createOrder',
        LogisticURL: 'app/externalPurchase/getLogisticList',
        getProductData: () => new Promise((resolve => resolve(JSON.parse(localStorage.getItem('packageData')) || [])))
      }
    };

    // 发私有库存对某些仓库取消限制
    const warehouseName = ['义乌仓', '义乌直发仓', '深圳仓', '深圳直发仓', '金华仓','东莞仓', '金华-2'];

    // 获取商品数据
    initData[$scope.orderType].getProductData().then(res => {
      $scope.productData = res.map(obj => {
        let productObj = {
          ...obj,
          SELLPRICE: Number(obj.SELLPRICE),
          discountPrice: obj.discountPrice ? Number(obj.discountPrice) : null,
        }
        if(obj.isGroupProduct) {
          // 计算组合商品实际数量
          productObj.realQuantity = obj.groupProductList.reduce((pre, val) => pre + Number(val.itemCount), 0)
        }
        return productObj
      });
      console.log('商品信息===》', $scope.productData);
      $scope.productList = [];
      $scope.productData.forEach(item => {
        $scope.objectData = {};
        $scope.objectData.ID = item.ID;
        $scope.objectData.SKU = item.SKU;
        $scope.objectData.itemcount = item.itemcount;
        $scope.productList.push($scope.objectData);
      });
      $scope.productID = $scope.productData[0].ID;
      $scope.productSKU = $scope.productData[0].SKU;
      $scope.productItemcount = $scope.productData[0].itemcount;
      if ($scope.productData.length > 0) {
        // 如果是包装商品就去获取仓库信息
        if ($scope.orderType === 'package') {
          $scope.shipType = '2';
          getWarehouseData();
        } else {
          // 获取地址信息
          getAddressData();
        }
        // 计算商品总数和总价
        $scope.totalNum = $scope.productData.reduce((pre, cur) => { if(cur.isGroupProduct) { return Number(cur.realQuantity) + pre } return (Number(cur.itemcount) + pre) }, 0);
        // $scope.totalNum = $scope.productData.reduce((pre, cur) => Number(cur.itemcount) + pre , 0);
        $scope.productTotalPrice = res.reduce((pre, cur) => {
          let oprice;
          if(cur.nowPrice){
            oprice=Number(cur.itemcount * cur.nowPrice) + pre;
          }else{
            oprice = (cur.discountPrice > 0 && cur.SELLPRICE !== cur.discountPrice) ?
              Number(cur.itemcount * cur.discountPrice) + pre :
              Number(cur.itemcount * cur.SELLPRICE) + pre;
          }
          return oprice;
        }, 0);
      } else {
        layer.msg('No order information.');
        location.href = 'myCJ.html#/goods'
      }
    });

    if ($scope.shipType === '2') {
      if ($scope.warehouseData.length == 0) getWarehouseData();
    } else {
      $scope.subErrInfo = null;
    }

    // 获取订单商品请求
    function getProductData() {
      const parmas = $scope.orderType === 'taobao' ? { id: $stateParams.id } : {};
      return new Promise((resolve => {
        dsp.postFun(initData[$scope.orderType].getProductUrl, parmas, ({ data }) => {
          if (data.code === '200') {
            if ($scope.orderType === 'taobao') {
              resolve(data.orderList[0].productList.map(obj => ({
                BIGIMG: obj.img,
                ID: obj.payProductId,
                NAMEEN: obj.name,
                SELLPRICE: obj.price,
                SKU: obj.sku,
                checked: true,
                itemcount: obj.totalNum
              })) || []);
            } else if ($scope.orderType === 'zf') {
              resolve(data.shoppingCart.productList.filter(obj => obj.checked) || []);
            }
          }
        }, err => {
          console.log(err);
        });
      }));
    }

    //税号
    $scope.showTaxid = false;
    // 获取地址信息
    function getAddressData() {
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun('app/info/useraddress', { data: JSON.stringify({ userId }) }, ({ data }) => {
        //dsp.closeLoad();
        msgLoading.hide();
        if (data.statusCode === '200') {
          if (JSON.parse(data.result).length > 0) {
            $scope.addressData = JSON.parse(data.result).map(obj => ({ ...obj, active: obj.isDefault === '1' }));
            $scope.totalPage = Math.ceil(($scope.addressData.length + 1) / 3) - 1;
            const addressViewWidth = document.getElementsByClassName('address-info-content')[0].offsetWidth;
            $scope.addressWidth = (addressViewWidth - 2 * 16) / 3
            console.log($scope.addressWidth, addressViewWidth);
            //console.log($scope.totalPage);
            console.log('地址信息===》', $scope.addressData);
            $scope.defaultAddress = $scope.addressData.find(o => o.isDefault === '1');
            console.log('默认地址信息===》', $scope.defaultAddress);
            if ($scope.defaultAddress) {
              $scope.addressID = $scope.defaultAddress.ID;
              $scope.addressInfo = $scope.defaultAddress;
            } else {
              $scope.addressData[0].active = '1';
              $scope.addressInfo = $scope.addressData[0];
            }
            getShippingData();
            // 获取当前用户ioss号
            $scope.getUserIoss();
          }
        }
      }, err => {
        console.log(err);
        msgLoading.hide();
      });
    }
    $scope.taxid = {
      text: ''
    }
    //失去光标弹窗
    $scope.lost = function(){
      if (!$scope.taxid.text){
        layer.msg('Please enter the tax ID.');
        return;
      }
    };

    // 获取用户设置的ioss
    $scope.getUserIoss = function getUserIoss() {
      let bs = new Base64();
      const userId = localStorage.getItem('userId') == undefined ? "" : bs.decode(localStorage.getItem('userId'));
      const iossCountryParams = new URLSearchParams({
        accountId:userId,
        countryCode:$scope.addressInfo.countrycode
      })
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.getFun('cj-logistics-rule/api/user/targetCountryIoss?' + iossCountryParams, ({data})=> {
        const result = data.data
        msgLoading.hide();
        if(!result.configBoolean){
          $scope.showAddIoss = false
        }else{
          $scope.showAddIoss = true
        }
        getIOSSOption()

      }, err => {
        console.log(err);
        msgLoading.hide();
      })
    }

    // 获取ioss下拉选项内容
    function getIOSSOption(){
      const params = {
        id: $scope.addressID
      }
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun('app/buyOrder/getIossList', params, ({data}) => {
        msgLoading.hide();
        $scope.userIossOption = data.data
        if($scope.userIossOption.length === 0){
          $scope.showIossSelect = false
        }else{
          $scope.showIossSelect = true
        }
        // 获取默认值
        $scope.iossSelected = $scope.userIossOption.find(iossInfo => iossInfo.isDefault == 1)
        
        // 如果没有默认项则默认选中no ioss id
        if(!$scope.iossSelected) {
          $scope.iossSelected = $scope.userIossOption.find( iossInfo => iossInfo.iossNumber == '' )
        }
      }, err => {
        console.log(err);
        msgLoading.hide();
      })
    }

    // 获取物流
    function getShippingData() {
      const parmas = {
        zip: $scope.addressInfo.zip,
        countryCode: $scope.addressInfo.countrycode,
        productList: JSON.stringify($scope.productData.map(obj => ({
          ID: obj.ID,
          itemcount: obj.itemcount
        }))),
        orderId: initData[$scope.orderType].orderId,
        cjpay: 'cjpay' ,// 用于区分某一个用户，后台：范庆伟 要求
        phone: $scope.addressInfo.phone
      };
      $scope.showTaxid = false;
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun(initData[$scope.orderType].LogisticURL, parmas, ({ data }) => {
        msgLoading.hide();
        // $scope.loadingFlag = false;
        $scope.shippingMethod = null
        $scope.shippingTips = null;
        if (data.code === '200') {
          // 过滤 USPS+
          $scope.shippingData = data.logisticList.filter(o => o.logisticName !== 'USPS+');
          $scope.logisticsRemind = data.logisticsNoticeRuleList;
          if ($scope.shippingData.length > 0) {
            $scope.shippingMethod = $scope.shippingData[0]; // 默认物流方式
            $scope.shippingPrice = $scope.shippingData[0].price || 0; // 运费
            console.log('物流方式===》', $scope.shippingData);
            console.log('默认物流方式===》', $scope.shippingMethod);
            //返回某值，决定是否展示税号
            $scope.ruleTipslen = $scope.shippingMethod.ruleTips;
            // ioss Option根据物流方式的必填项进行变动，必填ioss时隐藏no Ioss选项
            $scope.notShowNoIossOption = $scope.shippingMethod.ruleTips.find(rule => 
              rule.type === 'iossNumber'
            )
            if($scope.ruleTipslen && $scope.ruleTipslen.length > 0){
              $scope.showTaxid = $scope.ruleTipslen.findIndex(i => i.msgCode.split('')[0] === '2') > -1;
            }
          } else {
            $scope.shippingTips = 'Unfortunately, There is no shipping method to ship these products because of the special attribute of the products.' +
              ' Please contact your agent for more details.';
          }

        } else if (data.code === '111' || data.code === '1007') {
          $scope.shippingTips = 'Unfortunately, There is no shipping method to ship these products because of the special attribute of the products.' +
            ' Please contact your agent for more details.';
        } else {
          layer.msg('Get shipping methods err. ');
        }
      }, err => {
        console.log(err);
        msgLoading.hide();
      });
    }

    // 获取物流提醒的第一条，用于在气泡中显示
    $scope.getFirstOfRemind = (arr,e) => {
      $scope.controlShowPopover(true)
      const scrollHeight = document.getElementById('router-outlet-wrap').scrollTop
      // $scope.tootipTopY = Math.floor((e.clientY-e.offsetY- 433 + 9)/32)*32+9
      $scope.tootipTopY = -(Math.floor((e.pageY-e.offsetY + scrollHeight - 433 + 9)/32)*32+9)
      console.log('tootipTopY', $scope.tootipTopY, scrollHeight)
      for (var value of arr){
        $scope.currentRemind = value.content;
        return;
      }
    }
    // 移出弹窗
    $scope.mouseLeave = () => {
      $scope.controlShowPopover(false)
    }

    // 控制显示popover
    $scope.controlShowPopover = (type) => {
      $scope.showPopover = type
    }

    // 获取对象长度
    // $scope.getLengthOfObj = (object) => {
    //   $scope.currentObjLength = 0
    //   for (var key in object){
    //     $scope.currentObjLength ++
    //   }
    // }


    class getWareTip{
      constructor(item){
        if (item.storageName.includes('深圳')) {
          this.tip = 'We prefer to get the electronic, liquid and cosmetic items in Shenzhen warehouse, China.';
        }else if (item.storageName.includes('义乌')) {
          this.tip = 'We prefer to get the non-electronic, non-liquid or non-cosmetic items in Yi Wu China warehouse.';
        }else{
          this.tip = null;
        }
      }
    }

    // 获取仓库数据
    function getWarehouseData() {
      let parmas = {
        useStorageType:'1',
        privateInventory: true
      };
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun('storehouse/WarehousInfo/getStorehouseNew', parmas, ({ data }) => {
        msgLoading.hide();
        if(data.code != 200) $scope.warehouseData = [];
        const list = data.data.length>0?data.data:[];
        const odata = $scope.orderType === 'package' ? list.filter(o => o.areaId === 1) : list;
        $scope.warehouseData = (odata.filter(o=>!o.storageNo2Name.includes('Zhi Fa') && o.id !== '08898c4735bf43068d5d677c1d217ab0')).map(item=>{
          item.name = item.storageNo2Name;
          if(item.cjStorageName == "Frankfurt, Hessen, Germany") {
            item.disabled = true;
          }
          return item;
        })
        if ($scope.warehouseData.length > 0) {
          $scope.warehouseInfo = $scope.warehouseData[0];
          $scope.warehouseTips = new getWareTip($scope.warehouseInfo).tip;
        }
      }, err => {
        console.log(err);
        msgLoading.hide();
      });
    }

    // 提交订单错误信息提示
    function openErrMsg(msg, showTime = 3000) {
      if (!msg) return;
      $scope.subErrInfo = msg;
      if(showTime != 0){ // 设置为0的时候则不消失
        clearTimeout(timer);
        timer = setTimeout(() => {
          $scope.subErrInfo = null;
          $scope.$apply();
        }, showTime);
      }
    }

    // 返回
    $scope.back = () => {
      history.go(-1);
    };

    // 关闭选择私有库存的提示弹窗
    $scope.handleRead = () => {
      $scope.showWarehouseTips = false;
      localStorage.setItem('isReadWarehouseRule', '1');
    };

    function calculationAddressWidth(){
      const addressViewWidth = document.getElementsByClassName('address-info-content')[0].offsetWidth;
      const itemW = (addressViewWidth - 2 * 16) / 3

      const addressBox = document.getElementsByClassName('address-info')[0];
      addressBox.style.left = `0px`
      $timeout(()=>{
        $scope.addressWidth = itemW
        $scope.pageNum = 0
      },0)
    }

    const de_calculationAddressWidth = utils.debounce(calculationAddressWidth, 400)
    window.onresize = function(){
      de_calculationAddressWidth()
    }

    // 地址左右切换
    $scope.handleLeftOrRight = type => {
      const addressViewWidth = document.getElementsByClassName('address-info-content')[0].offsetWidth;
      const addressBox = document.getElementsByClassName('address-info')[0];
      if (type === 'left') {
        $scope.pageNum = $scope.pageNum > 0 ? $scope.pageNum - 1 : $scope.pageNum;
      } else if (type === 'right') {
        $scope.pageNum = $scope.pageNum < $scope.totalPage ? $scope.pageNum + 1 : $scope.totalPage;
      }
      addressBox.style.left = `${-$scope.pageNum * addressViewWidth}px`;
    };

    // 选择地址
    $scope.handleChangeAddress = item => {
      $scope.addressInfo = item;
      $scope.addressID = item.ID;
      $scope.addressData = $scope.addressData.map(obj => ({ ...obj, active: obj.ID === item.ID }));
        
      getShippingData();
      // 获取当前用户ioss号
      $scope.getUserIoss()
    };

    // 修改地址
    $scope.handleEditAddress = (e, item) => {
      e.stopPropagation();
      $scope.addressParmas = {
        visible: true,
        title: 'Edit Address',
        addressData: item,
        addressList:$scope.addressData,
        productList:JSON.stringify($scope.productData.map(obj => ({
          ID: obj.ID,
          SKU: obj.SKU,
          itemcount: obj.itemcount
        }))),
        logisticName:$scope.shippingMethod ? $scope.shippingMethod.logisticName : '',
        totalPrice: $scope.productTotalPrice.toFixed(2),
        orderType: $scope.orderType.toLocaleUpperCase(),
        dutyNo: $scope.taxid.text,
      };
    };

    // 新增地址
    $scope.handleAddAddress = () => {
      $scope.addressParmas = {
        visible: true,
        title: 'Add Address',
        addressData: {},
        addressList:$scope.addressData
      };
    };

    // 改变ioss选项
    $scope.isOpenIossOption = false
    $scope.handleChangeIoss = item => {
      event.stopPropagation();
      $scope.iossSelected = item
      $scope.isOpenIossOption = false;
    }

    // 改变物流方式
    $scope.isOpenLogistic = false;
    $scope.handleChangeShipping = item => {
      // 切换物流方式是否ioss必填
      $scope.notShowNoIossOption = item.ruleTips.find(rule => 
        rule.type == 'iossNumber'
      )
      if($scope.notShowNoIossOption){
        $scope.iossSelected = undefined
      }
      $scope.logisticName = item.logisticName;
      
      if(item.ruleTips && item.ruleTips.length){
        if(item.ruleTips.findIndex(i => i.msgCode.split('')[0] === '2') > -1){
          $scope.showTaxid = true;
        }else{
          $scope.showTaxid = false;
        }
      }else{
        $scope.showTaxid = false;
      }
      event.stopPropagation();
      $scope.shippingMethod = item;
      $scope.shippingPrice = $scope.shippingMethod.price || 0;
      $scope.shippingTips = $scope.shippingMethod.remark;
      const day = $scope.shippingMethod.aging || '0';
      if(day.split('-').length < 2 || day == '0') {
        $scope.aging = day + ' Day';
      } else {
        $scope.aging = day + ' Days';
      }
      $scope.isOpenLogistic = false;
    };

    // ioss下拉条clcik回调
    $scope.iossSelectClickHandle = () => {
      event.stopPropagation();
      $scope.isOpenIossOption = true;
      $scope.isOpenLogistic = false;
    }

    // 物流下拉条click回调
    $scope.handleOpenLogistic = () => {
      event.stopPropagation();
      $scope.isOpenLogistic = true;
      $scope.isOpenIossOption = false;
    };


    // 计算商品总价
    $scope.calcTotalPrice = () => {
      if ($scope.shipType === '1') {
        return $scope.shippingPrice ? `$${($scope.shippingPrice + $scope.productTotalPrice).toFixed(2)}` : '--';
      } else {
        return `$${$scope.productTotalPrice && $scope.productTotalPrice.toFixed(2)}`;
      }
    };


    // 选择仓库
    $scope.isOpenWarehouse = false;
    $scope.handleSelectWarehouse = item => {
      if(item.disabled) {
        return false;
      }
      event.stopPropagation();
      $scope.warehouseInfo = item;
      $scope.warehouseTips = new getWareTip($scope.warehouseInfo).tip;
      $scope.verifyWarehouseOrder()
    };

    // $scope.show = false;
    // $scope.handleMouseOver = (item) => {
    //   console.log('iiiiiiiiiiiiiiiiii', item)
    //   if(item.disabled) {
    //     $scope.show = true;
    //   }
    // }

    $scope.handleShowWarehouse = () => {
      event.stopPropagation();
      $scope.isOpenWarehouse = true;
    }

    $scope.handleCloseWarehouse = () => {
      $scope.isOpenWarehouse = false;
      $scope.isOpenLogistic = false;
      $scope.isOpenIossOption = false;
    }

    // 仓库发货订单规则校验
    $scope.isVerifyRule = () => {
      const hasWarehouseName = $scope.warehouseInfo ? $scope.warehouseInfo.storageName : null;
      const hasWarehouse = warehouseName.includes(hasWarehouseName);
      if (hasWarehouseName === '德国法兰克福') return $scope.shipType === '2' && !hasWarehouse && $scope.productData.find(o =>  { if(o.isGroupProduct) { return o.realQuantity < 100 } else { return o.itemcount < 100 } } );
      return $scope.shipType === '2' && !hasWarehouse && (($scope.productData && $scope.productData.find(o => { if(o.isGroupProduct) { return o.realQuantity < 10 } else {  return o.itemcount < 10 }})) || $scope.totalNum < 100);
    };

    $scope.verifyWarehouseOrder = () => {
      if ($scope.isVerifyRule()) openErrMsg($scope.warehouseRuleTips, 0);
      else $scope.subErrInfo = null // 关闭信息弹窗
      return $scope.isVerifyRule();
    };

    // 提交

    const submitDebounce = debounce(() => {
      if (dsp.isVerifyEmail()) return
          if ($scope.verifyWarehouseOrder()) return;
        const msgLoading = cjMessage.loading({ isFixed: true });
          dsp.postFun('app/dispute/getTipsListByType', {}, data => {
            // dsp.closeLoad();
            msgLoading.hide();
            let oresult = data.data.result ? JSON.parse(data.data.result) : '';
            if (oresult) {
              $scope.holidayTips = {
                title: oresult.title,
                content: $sce.trustAsHtml(oresult.content)
              };
              $scope.showCountryTip = true;
            } else {
              $scope.handleAccept();
            }

          }, err => {
            // dsp.closeLoad();
            msgLoading.hide();
          })
    })

    $scope.handleSubmit = () => submitDebounce()
    $scope.handleAccept = () => {
      let parmas = {
        productList: JSON.stringify($scope.productData.map(obj => ({
          ID: obj.ID,
          SKU: obj.SKU,
          itemcount: obj.itemcount
        }))),
        orderId: initData[$scope.orderType].orderId,
        totalPrice: $scope.productTotalPrice.toFixed(2),
        // totalPrice: $scope.totalPrice,
        orderType: $scope.orderType.toLocaleUpperCase(),
        dutyNo: $scope.taxid.text,
      };
      let parmas2 = {
        productList: JSON.stringify($scope.productData.map(obj => ({
          ID: obj.ID,
          SKU: obj.SKU,
          itemcount: obj.itemcount
        }))),
        orderId: initData[$scope.orderType].orderId,
        totalPrice: $scope.productTotalPrice.toFixed(2),
      }
      if ($scope.shipType === '1') {
        parmas = {
          ...parmas,
          logisticName:$scope.shippingMethod ? $scope.shippingMethod.logisticName : '',
          addressId: $scope.addressInfo.ID
        };
        if($scope.iossSelected){
          parmas.iossNumber = $scope.iossSelected.iossNumber,
          parmas.iossType= $scope.iossSelected.iossType
        }
      }
      if ($scope.shipType === '2') {
        parmas = {
          ...parmas2,
          storageId: $scope.warehouseInfo.id
        };
      }
      console.log('提交参数===》', parmas);
        const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun(initData[$scope.orderType].createURL, parmas, ({ data }) => {
        // dsp.closeLoad();
        msgLoading.hide();
        if (data.code === '200') {
          localStorage.removeItem('packageData');
          location.href = `myCJ.html?route=payment#/payment/${$rootScope.base64.encode(data.orderId)}/${$rootScope.base64.encode(data.price + '')}/10000/${initData[$scope.orderType].pathType}`;
        }else if(data.code === '505'){
          $scope.iossNumberErr = data.message.filter(item => item.type==='iossNumber') || []
          if($scope.iossNumberErr.length > 0){
            return
          }
          $scope.phoneErr = data.message.filter(item => item.type==='phone') || []
          if($scope.phoneErr.length > 0){
            return
          }
          $scope.zipErr = data.message.filter(item => item.type==='zip') || []
          if($scope.zipErr.length > 0){
            return
          }
          $scope.taxidErr = data.message.filter(item => item.type==='dutyNo') || []
          if($scope.taxidErr.length > 0){
            return
          }
        } else if(data.code === '100001'){
          layer.msg('Failed to submit. IOSS has been updated.');
          setTimeout(()=>{
            getIOSSOption()
          },2000)
          return
        } else {
          openErrMsg(errMsg[data.code]);
        }
      }, err => {
        msgLoading.hide();
        console.log(err);
      });
    };

    // 监听地址组件确认成功后的回调
    $scope.$on('confirmSuccess', (e, data) => {
      getAddressData();
      //const addressBox = document.getElementsByClassName('address-info')[0];
      //addressBox.style.marginLeft = 0;
      //$scope.pageNum = 0;
    });
    
    // 控制模态框显示方法
    $scope.modalControl = (type) =>{
      $scope.showShippingModal = type
    }

    // 控制打开物流信息提醒的模态框回调
    $scope.viewModalHandle = (e,remind) =>{
      e.stopPropagation()
      $scope.modalControl(true)
      for( var value of remind){
        $scope.modalTxt.push({
          title:value.name,
          content:value.content
        })
      }

    }

    // 设置鼠标移入的物流名
    $scope.setCurrentMethodName = (value) => {
      $scope.currentShippingMethod = value
    }

    // 控制物流提示icon
    $scope.controlShowMethod = (value) => {
      $scope.showIcon = value
    }

    // 设置当前
    // 蒙层点击事件
    $scope.maskClick = (e) => {
      e.stopPropagation()
    }

    // 气泡点击事件
    $scope.popoverClickHandle = (e) =>{
      e.stopPropagation()
    }

    // 模态框ok事件
    $scope.modalOkHandle = (e) =>{
      e.stopPropagation()
      $scope.modalControl(false)
      $scope.modalTxt = []
    }

  }]);
  return module;
}

