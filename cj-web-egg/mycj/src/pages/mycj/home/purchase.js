export function mycjPurchaseFactory1(angular) {
  const module = angular.module('mycj-purchase.module', []);

  module.controller('mycj-purchase.ctrl', ['$scope', 'dsp', '$rootScope', '$stateParams', '$sce',
    function ($scope, dsp, $rootScope, $stateParams, $sce) {
      $scope.vip = $rootScope.userInfo.vip;
      if ($scope.vip == '1') {//vipFlag
        $('.header-nav').addClass('vipFlag');
        $('.mycj-right-wrap').css('background', '#F0EDE7');
      } else {
        $('.header-nav').removeClass('vipFlag');
        $('.mycj-right-wrap').css('background', '#f2f3f5');
      }
      $('.header-nav li').eq(0).addClass('active');
      dsp.setRightMinHeight();
      var userId = $rootScope.userInfo.userId;
      console.log( $rootScope.userInfo,userId);
      $scope.type = 0;
      $scope.list = [];
      $scope.buylist = [];
      $scope.totalgrams = 0;
      //直发和入库的切换
      $scope.wholesaleFlag = true;
      //返回
      $scope.back = function () {
        history.go(-1);
      }
      $scope.createURL = '';
      $scope.orderType = $stateParams.orderType;
      console.log($scope.orderType)
      $scope.isSupplier = $stateParams.isSupplier && $stateParams.isSupplier == 1 ? true : false; // true 供应商或泰国商品 false 其他
      if ($scope.orderType == 'taobao') { //插件订单
        $scope.orderId = $rootScope.base64.decode($stateParams.id) || '';
        $scope.createURL = 'app/externalPurchase/createZFOrderForChajian';
        $scope.pathType = '//FormTb';
        $scope.LogisticURL = 'app/externalPurchase/getLogisticList';
        getPTBdata();
      } else if ($scope.orderType == 'package') { //自定义包装订单
        $scope.orderId = null;
        $scope.createURL = 'app/buyOrder/createOrder';
        $scope.pathType = '//DIRECT';
        // $scope.list = JSON.parse(base64.decode($stateParams.proData));

        $scope.list = JSON.parse(localStorage.getItem('packageData'))
        console.log($scope.list)
        ruku();
      } else {//直发订单
        $scope.orderId = null;
        $scope.createURL = 'app/buyOrder/createOrder';
        $scope.pathType = '//DIRECT';
        $scope.LogisticURL = 'app/buyOrder/getLogisticList';
        getCartdata()
      }
      $scope.wareTipFlag = false;
      $scope.tipType = '';
      $scope.classStorage = function (item) {
        if (item) {
          // console.log(item);
          var storageName = item.storageName;
          if (storageName.trim() == '美东新泽西仓') {
            return 'Cranbury NJ USA'
          } else if (storageName.trim() == '美西奇诺仓') {
            return 'Chino CA USA'
          } else {
            return item.storageEnName + ' China';
          }
        }
      }
      //获取插件订单数据
      function getPTBdata() {
        dsp.postFun('app/externalPurchase/getPayOrderAndProductByZFOrderId', { id: $scope.orderId }, function (data) {
          if (data.data.code == 200) {
            $scope.buylist = [];
            var orderList = data.data.orderList[0].productList;
            $scope.orderType = data.data.orderList[0].ORDERSOURCE_TYPE;//ORDERSOURCE_TYPE
            console.log(orderList)
            $scope.orderId = data.data.orderList[0].orderId;
            orderList.forEach(function (o, i) {
              $scope.buylist.push({
                BIGIMG: o.img,
                ID: o.payProductId,
                NAMEEN: o.name,
                SELLPRICE: o.price,
                SKU: o.sku,
                checked: true,
                itemcount: o.totalNum,
              })
            })
            console.log($scope.buylist)
            var list = $scope.buylist;
            var temArr = [];
            for (var i = 0; i < list.length; i++) {
              if (list[i].checked) {
                temArr.push(list[i]);
              }
            }
            $scope.list = temArr;
            getadr();
          }
        }, function (data) {

        });
      }
      //获取直发订单数据
      function getCartdata() {
        dsp.postFun('app/buyOrder/getShoppingCart', {}, function (data) {
          if (data.data.code == 200) {
            $scope.buylist = data.data.shoppingCart.productList || [];
            console.log($scope.buylist)
            var list = $scope.buylist;
            var temArr = [];
            for (var i = 0; i < list.length; i++) {
              if (list[i].checked) {
                temArr.push(list[i]);
              }
            }
            $scope.list = temArr;
            getadr();
          }
        }, function (data) {

        });
      }


      angular.forEach($scope.list, function (data) {
        $scope.totalgrams += (data.PACKWEIGHT / 1000);
      })
      console.log('psign', $scope.list, $scope.totalgrams)

      //获取物流方式
      function getShipMethods() {
        var sendJson = {};
        console.log($scope.countryCode)
        sendJson.zip = $scope.parmasZip
        sendJson.countryCode = $scope.countryCode;
        sendJson.productList = [];
        for (var i = 0; i < $scope.list.length; i++) {
          sendJson.productList.push({
            ID: $scope.list[i].ID,
            itemcount: $scope.list[i].itemcount
          });
        }
        if ($scope.orderId) {
          sendJson.orderId = $scope.orderId;
        }
        sendJson.productList = JSON.stringify(sendJson.productList);
        sendJson.cjpay = 'cjpay'; // 用于区分某一个用户，后台：范庆伟 要求
        sendJson = JSON.stringify(sendJson);
        dsp.postFun($scope.LogisticURL, sendJson, function (data) {
          console.log(data);
          if (data.data.code == 200) {
            // 过滤USPS+
            $scope.wuliulist = data.data.logisticList.filter(ele => {
              return ele.logisticName !== 'USPS+';
            });
            $scope.wuliuway = $scope.wuliulist[0];
            $scope.islogistic = false;
            if ($scope.wuliulist.length == 0) {
              layer.msg('There is no shipping method to this country currently.');
              $scope.islogistic = true;
            }
          } else if (data.data.code == 111) {
            $scope.islogistic = true;
          } else if (data.data.code == 1007) {
            $scope.islogistic = true;
          } else {
            layer.msg('Get shipping methods err. ');
            $scope.islogistic = true;
          }

        });
        sendJson = null;
      }

      //获取地址
      $scope.newaddress = false;

      function getadr() {
        dsp.postFun('app/info/useraddress', { "data": "{'userId':'" + userId + "'}" }, function (n) {
          var obj = JSON.parse(n.data.result)
          $scope.addresslist = obj;
          if ($scope.addresslist.length > 0) {
            angular.forEach($scope.addresslist, function (data) {
              // console.log(data);
              if (data.isDefault == 1) {
                $scope.address = data;
                $scope.countryCode = data.countrycode;
                $scope.parmasZip = data.zip;
                getShipMethods();
              }
            });
          } else {
            $scope.usenewaddress();
          }
          console.log('地址', obj, $scope.address)
        })
      }

      //得到地址
      $scope.getaddress = function (item, index) {
        $scope.newaddress = false;
        angular.forEach($scope.addresslist, function (data) {
          // console.log(data);
          data.isDefault = 0
        });
        $scope.addresslist[index].isDefault = 1;
        $scope.address = $scope.addresslist[index];
        $scope.countryCode = item.countrycode;
        $scope.parmasZip = item.zip;
        getShipMethods();
        // getwuliuprice()
        // console.log(index, $scope.address)
      }
      //使用新地址
      $scope.usenewaddress = function () {
        //国家列表
        dsp.getFun('app/account/countrylist', function (n) {
          $scope.countrylist = JSON.parse(n.data.result);
          // $scope.country = $scope.countrylist[236];
        });
        $scope.newaddress = true;
        $scope.addCountry = '{"id":"US","name":"美国","nameEn":"United States of America (the)","phoneCode":"1"}';
        console.log($scope.addCountry)
        angular.forEach($scope.addresslist, function (data) {
          // console.log(data);
          data.isDefault = 0
        });
        if ($scope.addCountry) {
          console.log($scope.addCountry)
          $scope.countryCode = JSON.parse($scope.addCountry).id
          $scope.parmasZip = $scope.zip
          getShipMethods();
        } else {
          $scope.wuliulist = [];
          $scope.wuliuway = '';
        }
      }
      //使用新地址时得邮费
      $scope.chingeCoun = function (item) {
        console.log(JSON.parse(item).id)
        if ($scope.newaddress) {
          $scope.countryCode = JSON.parse(item).id;
          $scope.parmasZip = $scope.zip
          getShipMethods();
        }
      }
      $scope.chingeship = function (item) {
        console.log(item)
        console.log($scope.wuliuway);
        $scope.remark = item.remark;
      }
  
      // 改变zip 调取物流运费试算接口
      $scope.handleChangeZip = () =>{
        $scope.parmasZip = $scope.zip;
        getShipMethods();
      }
      
      //提交订单按钮方法
      $scope.submit = function () {
        // 是否验证邮件处理
        if (dsp.isVerifyEmail()) return
        var sendJson = {};
        sendJson.productList = [];
        for (var i = 0; i < $scope.list.length; i++) {
          sendJson.productList.push({
            ID: $scope.list[i].ID,
            SKU: $scope.list[i].SKU,
            itemcount: $scope.list[i].itemcount
          });
        }
        sendJson.orderId = $scope.orderId;
        sendJson.totalPrice = $scope.totalprice();
        sendJson.productList = JSON.stringify(sendJson.productList);
        if ($scope.wholesaleFlag) {
          sendJson.logisticName = $scope.wuliuway.logisticName;
          if ($scope.newaddress) {
            if (!$scope.city || !$scope.addressInp || !$scope.province || !$scope.phone || !$scope.firstname || !$scope.lastname || !$scope.addCountry || !$scope.zip) {
              layer.msg('Please perfect the address information.');
              return;
            }
            sendJson.addressMap = {};
            sendJson.addressMap.city = $scope.city;
            sendJson.addressMap.address = $scope.addressInp;
            sendJson.addressMap.addressNew = $scope.addressInp2;
            sendJson.addressMap.province = $scope.province;
            sendJson.addressMap.phone = $scope.phone;
            sendJson.addressMap.firstname = $scope.firstname;
            sendJson.addressMap.lastname = $scope.lastname;
            sendJson.addressMap.countryCode = JSON.parse($scope.addCountry).id;
            sendJson.addressMap.country = JSON.parse($scope.addCountry).nameEn;
            sendJson.addressMap.zip = $scope.zip;
            sendJson.addressMap = JSON.stringify(sendJson.addressMap);
          } else {
            sendJson.addressId = $scope.address.ID;
          }
        } else {
          sendJson.storageId = $scope.warehouse.id;
        }
        console.log(sendJson);
        layer.load(2);
        dsp.postFun($scope.createURL, JSON.stringify(sendJson), function (data) {
          dsp.closeLoad();
          console.log(data);
          if (data.data.code == 200) {
            localStorage.removeItem('packageData')
            location.href = 'myCJ.html?route=payment#/payment/' + $rootScope.base64.encode(data.data.orderId) + '/' + $rootScope.base64.encode(data.data.price + '') + $scope.pathType;
          } else if (data.data.code == 1007) {
            layer.msg('Insufficient inventory. Please change the product quantity.');
          } else {
            layer.msg('Submit failed');
          }
        })
      }
      // 直发
      $scope.zhifa = function () {
        $scope.wholesaleFlag = true;
        $scope.type = 0;
      }
      //入库
      $scope.ruku = function () {
        ruku();
      };
      function ruku() {
        $scope.wholesaleFlag = false;
        $scope.type = 1;
        let rq_data = [];
        $scope.list.forEach(item => {
          rq_data.push({
            ID: item.ID,
            itemcount: item.itemcount
          })
        })

        dsp.postFun('app/storagedo/getStorageDoList', { productList: rq_data }, function (n) {
          // var obj = JSON.parse(n.data.result)
          // console.log('warelist',obj)
          let arr = n.data.list
            , newArr = []

          // console.log(arr);
          arr.forEach(json => {
            !json.storageEnName.includes('Zhi Fa') && newArr.push(json)
          })
          console.log(newArr);
          // n.data.list.forEach(function (o,i) {
          //     console.log(o)
          //     if(o.storageEnName.trim() == 'Chino CA USA' || ){
          //         o.storageEnName = 'USA';
          //     }
          // });
          $scope.warehouselist = newArr;
          if (newArr.length > 0) {
            $scope.iswarehouse = false; // 是否有仓库
            $scope.warehouse = $scope.warehouselist[0];
            $scope.warehouseObj = $scope.warehouselist[0];
            console.log($scope.warehouselist)
            var itemStore = newArr[0];
            if (itemStore.storageEnName != 'USAStorage') {
              $scope.wareTipFlag = true;
              if (itemStore.storageName.indexOf('深圳') != -1) {
                $scope.tipType = 'shenZhen';
              } else if (itemStore.storageName.trim('义乌') != -1) {
                $scope.tipType = 'yiWu';
              } else {
                $scope.tipType = '';
              }
            } else {
              $scope.tipType = '';
            }
          } else {
            $scope.iswarehouse = true;
          }
        })
      }
      $('.wareCon').click(function () {
        var next = $(this).next();
        if (next.hasClass('active')) {
          next.removeClass('active');
        } else {
          next.addClass('active');
        }
      });
      $scope.selectWareFun = function (item) {
        console.log(item);
        var storageName = item.storageName.trim();
        var storageEnName = item.storageEnName.trim();
        if (!((item.storageEnName.trim() == 'USAStorage') && $scope.vip != '1')) {
          $scope.warehouse = item;
          $('.wareDrop').removeClass('active');
        }
        // console.log(storageEnName)
        if (storageEnName == 'USAStorage') {
          $scope.wareTipFlag = false;
        } else {
          $scope.wareTipFlag = true;
          if (storageName.indexOf('深圳') != -1) {
            $scope.tipType = 'shenZhen';
          } else if (storageName.indexOf('义乌') != -1) {
            $scope.tipType = 'yiWu';
          }
          // console.log($scope.tipType)
        }

      }
      //总计数目
      $scope.totalcount = function () {
        var num = 0;
        for (var i = 0; i < $scope.list.length; i++) {
          num += $scope.list[i].itemcount - 0
        }
        // console.log(num)
        return num;
      }
      //总计价格
      $scope.totalprice = function () {
        var num = 0;
        for (var i = 0; i < $scope.list.length; i++) {
          if ($scope.list[i].discountPrice > 0) {
            num += ($scope.list[i].itemcount - 0) * ($scope.list[i].discountPrice - 0)
          } else {
            num += ($scope.list[i].itemcount - 0) * ($scope.list[i].SELLPRICE - 0)
          }
        }
        return num.toFixed(2);
      }
      $scope.totalprice2 = function () {
        var num;
        if ($scope.type == 0) {
          num = (($scope.wuliuway ? $scope.wuliuway.price : 0) * 1) + ($scope.totalprice() * 1);
        }
        if ($scope.type == 1) {
          num = $scope.totalprice() * 1;
        }
        return num.toFixed(2);
      }

    }]);

  return module;
}
