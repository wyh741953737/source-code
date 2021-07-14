(function (angular) {
  angular.module('cjCompnentModule')
  .component('mycjCart', {
    templateUrl: './static/components/cart/cart.html',
    controller: ['$scope', 'dsp', '$stateParams','$state', function ($scope, dsp, $stateParams,$state) {
      this.$onInit = function () {
        cartCtrl.call(this, $scope, dsp, $stateParams,$state);
      };
    }],
    bindings: {
      fbatype: '=',
      carttype: '=', // 0 自定义包装购物车 1 直发商品购物车
      //navparamy: '=',
      // onLog: '&'
    }
  });

  //
  function cartCtrl($scope, dsp, $stateParams,$state) {
    var that = this;
    console.log(that.fbatype)
    console.log(that.carttype)
    $scope.cartHeight = (document.documentElement.clientHeight || document.body.clientHeight) - 80;

    console.log($scope.cartHeight);

    $scope.carttype = that.carttype;
    $scope.buylist = [];
    if ($stateParams.show==1){
      $scope.isclick = true;
    }
    //购物车点击
    $scope.cartClick = function () {
      $scope.isclick = !$scope.isclick;
    }
    $scope.$on('to-cart', function (d, data) {
      console.log(d,data)
      dataStorage(data.list, data.callback);
    });
    $scope.$on("freshCart", function (event, data) {
      console.log(data)
      if(data.flag){
        getCartdata(data.callback)
      }
    });


    // 获取购物车数据
    function getCartdata(callback) {
      dsp.postFun('app/buyOrder/getShoppingCart', {}, function (data) {
        if (data.data.code == 200) {
          if (data.data.shoppingCart) {
            $scope.buylist = data.data.shoppingCart.productList || [];
          }
          console.log($scope.buylist)
          //向父组件发送购物车数据
          $scope.$emit('to-parent', $scope.buylist);
          allprice();
        }
        callback && callback(data)
      }, function (data) {

      });
    }

    getCartdata();

    //计算价钱
    function allprice() {
      $scope.total = 0;
      $scope.sum = 0;
      var arr = [];
      console.log($scope.buylist)
      $scope.buylist.forEach(function (o, i) {
        if (o.checked) {
          arr.push(o);
        }
      })
      if ($scope.buylist.length > 0) {
        if (arr.length == $scope.buylist.length) {
          $scope.checked = true;
        } else {
          $scope.checked = false;
        }
      } else {
        $scope.checked = false;
      }
      arr.forEach(function (o, i) {
        let oprice = o.nowPrice?o.nowPrice:o.SELLPRICE;
        $scope.total += Number(oprice) * Number(o.itemcount);
        $scope.sum += Number(o.itemcount);
      })
    }

    //数据操作存储后台
    function dataStorage(dataList, callback) {
      dsp.postFun('app/buyOrder/editShoppingCart', {productList: dataList}, function (data) {
        callback && callback(data)

      }, function (data) {

      });
      allprice();
    }

    //加减
    $scope.plusOne = function (val, index) {
      if (index >= 0) {
        $scope.buylist[index].itemcount = $scope.buylist[index].itemcount * 1 + 1 + '';
      }
      dataStorage($scope.buylist);
    }
    $scope.minusOne = function (val, index) {
      if (val == '1') return;
      if (index >= 0) {
        $scope.buylist[index].itemcount = $scope.buylist[index].itemcount * 1 - 1 + '';
      }
      dataStorage($scope.buylist);
    }
    $scope.checkIsNum = function (val,idx) {
      if (isNaN(val * 1) || val * 1 < 1) {
        $scope.buylist[idx].itemcount = '1'
      }
      dataStorage($scope.buylist);
    }
    //删除
    $scope.delbuy = function (item, index) {
      $scope.buylist.splice(index, 1)
      dataStorage($scope.buylist);
      console.log($scope.buylist)
      console.log(item, $scope.buylist)
      if ($scope.buylist.length < 1) {
        $scope.checked = false;
      }
    }
    //全选
    $scope.AllChecked = function () {
      if ($scope.buylist.length > 0) {
        $scope.checked = !$scope.checked;
        if ($scope.checked) {
          $scope.buylist.forEach(function (o, i) {
            o.checked = true;
          })
        } else {
          $scope.buylist.forEach(function (o, i) {
            o.checked = false;
          })
        }
        dataStorage($scope.buylist);
      }
    }
    //单选
    $scope.cldChecked = function (item) {
      item.checked = !item.checked;
      var a = 0;
      $scope.buylist.forEach(function (o, i) {
        if (o.checked) {
          a += 1;
        }
      })
      if (a == $scope.buylist.length) {
        $scope.checked = true;
      } else {
        $scope.checked = false;
      }
      dataStorage($scope.buylist);
    }
    //提交
    $scope.cartSub = function (shipType) {
      var arr = $scope.buylist.filter(item => {
        return item.checked
      });
      if (arr.length > 0) {
        var data = {
          productList: arr,
          totalPrice: $scope.total.toFixed(2)
        }
        console.log(data)
        dsp.postFun('app/buyOrder/saveShoppingCart', data, function (data) {
          if (data.data.checkFlag) {
            if (that.fbatype == '' || that.fbatype == undefined || that.fbatype == null) {
              let isSupplier = data.data.isSupplier && data.data.isSupplier == true ? 1 : 0; // 1 供应商或泰国商品 0 其他
              //location.href = 'myCJ.html#/myCJ-purchase?isSupplier='+isSupplier;
              $state.go('mycj-purchase', { orderType: 'zf', isSupplier, shipType }); // shipType: 区分直发、私有库存 1直发 2私有
            } else {
              location.href = 'myCJ.html#/myCJ-FBApurchase';
            }

          } else {
            layer.msg('data error')
          }
        }, function (data) {
          layer.msg('System abnormality')
        });
      } else {
        layer.msg('Please select product.')
      }
    }

    //查看购物车
    $scope.viewCart = function () {
      location.href = 'myCJ.html#/cart';
    }
  }


})(angular)
