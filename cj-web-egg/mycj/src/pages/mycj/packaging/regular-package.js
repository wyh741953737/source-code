export function regularPackageFactory(angular) {
  const app = angular.module('regular-package.module', ['home-service']);

  app.controller('regular-package.ctrl', ['$scope', '$rootScope', '$stateParams', 'dsp', 'cjhome', '$state',
    function($scope, $rootScope, $stateParams, dsp, cjhome, $state) {
      /* 默认配置 */
      $scope.vip = $rootScope.userInfo.vip;
      $scope.totalNum = 1;
      dsp.setRightMinHeight();
      var base64 = new Base64();
      $scope.type = $stateParams.type ? $stateParams.type : 'ALL';
      //数据声明
      $scope.pageNum = '1';
      $scope.pageSize = '60';
      $scope.totalNum = null;
      $scope.inputStr = '';
      $scope.dataList = null;
      $scope.hasLogin = dsp.isInLoginState();
      $scope.$on('to-parent', function (d, data) {
        console.log('购物车数据', data);
        $scope.buylist = data;
      });
      //搜索
      $scope.searchPro = function () {
        $scope.pageNum = '1';
        getData();
      };
      $scope.enterSearch = function (event) {
        if (event.keyCode == 13) {
          $scope.searchPro();
        }
      }
      $scope.chanPageType = function (type) {
        $scope.type = type;
        $scope.pageNum = '1';
        getData();
      }

      $rootScope.$on('cj/PackProduct/queryCjPackProductInfo', (_, bool) => $scope.loading = bool);

      // 获取数据
      function getData() {

        let selectPackKey = $scope.materialArr && $scope.materialArr.filter(item=>item.isSelect === true)

        var parms = {
          name: $scope.inputStr,
          pageNum: $scope.pageNum,
          pageSize: $scope.pageSize,
          type: $scope.type,
          packingKey:$scope.materialArr && _.map(selectPackKey,'code').join(',')
        };
        if ($scope.pageNum == 0) return;
        $scope.dataList = null;
        dsp.postFun('cj/PackProduct/queryCjPackProductInfo', parms, (res) => {
          if (res.data.statusCode === '200') {
            $scope.dataList = res.data.result.list;
            $scope.totalNum = res.data.result.count;
            $scope.totalCounts = Math.ceil(($scope.totalNum / ($scope.pageSize - 0)));
            $scope.$broadcast('page-data', {
              pageNum: $scope.pageNum,
              totalNum: $scope.totalCounts,
              totalCounts: $scope.totalNum,
              pageSize: $scope.pageSize,
              pagesizeList:[]
            });
          }
        });
      }


      // 获取材质数据
      function getPackKeyList() {

        dsp.getFun('cj/SystemConfig/getPackKeyList', (res) => {

          if (res.data.statusCode === '200') {
            $scope.materialArr = res.data.result;
          }
        },e=>e);
      }

      getData();
      getPackKeyList()




      /**
       * 获取包装商品阶梯价格
       */
      function getPackProductDiscountPriceAll(id) {
        let params = {
          id,
          num:1
        }
        dsp.postFun('erp/PackProduct/getPackProductDiscountPriceAll', params,(res) => {
          if (res.data.statusCode === '200') {
            $scope.discountPriceAll = res.data.result;
          }
        },e=>e);
      }


      /* 选择材质事件 */
      $scope.selectMaterial = function (item) {

        // 如果已经选择的超过 3 个，且这个 item 不是里面的值，则提示不超过 3 个
        let selectedArr = $scope.materialArr.filter(item=>item.isSelect === true)
        if( selectedArr.length == 3 && !selectedArr.some(select =>select.code === item.code)){
          layer.msg('You can select 3 packages at most once.')
          return
        }
        // 已经选择的材质

        item.isSelect = item.isSelect? false:true
        // 获取数据
        getData()
      }
      /*收藏*/
      $scope.collectMerch = function (flag, id, $event) {
        $event.stopPropagation();
        if ($scope.hasLogin) {
          cjhome.Collection(flag, id, $event, $('#wishlist-box'));
        } else {
          layer.msg('Please login first!');
        }
      }
      /*收藏hover*/
      $scope.MerchEnter = function (ev) {
        if ($(ev.currentTarget).attr('src') == 'static/image/CJ-home/icon_love@2x.png') {
          $(ev.currentTarget).attr('src', 'static/image/CJ-home/love_hover@2x.png')
        }
      }
      $scope.MerchLeave = function (ev) {
        if ($(ev.currentTarget).attr('src') != 'static/image/CJ-home/icon_wishlist_click@2x.png') {
          $(ev.currentTarget).attr('src', 'static/image/CJ-home/icon_love@2x.png')
        }
      }
      /*商品点击去详情*/
      $scope.goTodetail = function (item) {
        window.open('product-detail.html?id=' + item.id + '&productType=3&type=2');
      };
      //打开添加购物车弹窗
      let mincount;
      $scope.addDia = function (id, $event) {
        $event.stopPropagation();
        $scope.currentGoodsId = id;
        $scope.additem = null;
        $scope.addDialog = true;
        const msgLoading = cjMessage.loading({ isFixed: true })
        dsp.postFun('cj/locProduct/huoQuShangPinXiangQing', JSON.stringify({
          id: id,
          token: ''
        }), function (data) {
          msgLoading.hide();
          if (data.data.statusCode != 200) return;
          $scope.additem = data.data.result;

          // 标示是否有阶梯价格 1 有区间价格 ；不是 1 则没有区间价格
          $scope.discountStatusFlag = $scope.additem.discountStatus

          if($scope.discountStatusFlag === 1){
            // 如果是有阶梯价格的，请求阶梯价格
            getPackProductDiscountPriceAll(id)
          }
          $scope.stanProducts = $scope.additem.stanProducts;
          $scope.varientArr = [];
          $scope.varientKeys = [];
          const supplierLink = JSON.parse($scope.additem.SUPPLIERLINK || null);
          $scope.itemcount = $scope.additem.setNum ? Number($scope.additem.setNum) : 1;
          mincount = $scope.itemcount;
          if ($scope.additem.VARIANTKEYEN != '') {
            $scope.varientKeys = $scope.additem.VARIANTKEYEN.split('-');
            for (var i = 0; i < $scope.varientKeys.length; i++) {
              $scope.varientArr.push({
                name: $scope.varientKeys[i],
                key: []
              });
            }
            for (var i = 0; i < $scope.stanProducts.length; i++) {
              if ($scope.stanProducts[i].VARIANTKEY != null) {
                var curVarientVal = $scope.stanProducts[i].VARIANTKEY.split('-');
                for (var j = 0; j < curVarientVal.length; j++) {
                  $scope.varientArr[j].key.push(curVarientVal[j]);
                }
              }
            }
            for (var i = 0; i < $scope.varientArr.length; i++) {
              $scope.varientArr[i].key = dsp.uniqueArray($scope.varientArr[i].key);
              $scope.varientArr[i].val = $scope.varientArr[i].key[0];
            }
          } else {
            $scope.varientArr = [];
          }
          if ($scope.varientArr.length == 1 && $scope.varientArr[0].key.length == 0) {
            $scope.varientArr = [];
          }
          console.log($scope.varientArr);
          $scope.varientKeysInner = [];
          for (var i = 0; i < $scope.stanProducts.length; i++) {
            $scope.varientKeysInner.push($scope.stanProducts[i].VARIANTKEY);
            if ($scope.stanProducts[i].sellDiscount != null && $scope.stanProducts[i].sellDiscount < 100) {
              $scope.stanProducts[i].SELLPRICEDIS = ($scope.stanProducts[i].SELLPRICE * $scope.stanProducts[i].sellDiscount / 100).toFixed(2);
            } else {
              $scope.stanProducts[i].SELLPRICEDIS = $scope.stanProducts[i].SELLPRICE;
            }
          }
          console.log($scope.varientKeysInner);
          getTheVitem();
        }, function (data) {
          msgLoading.hide();
        });
      }
      $scope.chanVariant = function (val, index) {
        console.log(val)
        var filterKeysOne = [];
        for (var i = 0; i < $scope.varientKeysInner.length; i++) {
          var curVarKey = $scope.varientKeysInner[i].split('-');
          if (curVarKey[index] == val) {
            filterKeysOne.push(curVarKey);
          }
        }
        for (var i = 0; i < $scope.varientArr.length; i++) {
          if (i == index) continue;
          var canbeTwo = [];
          for (var j = 0; j < filterKeysOne.length; j++) {
            canbeTwo.push(filterKeysOne[j][i]);
          }
          var OtherSel1 = $scope.varientArr[i].val;
          var isInTwo = $.inArray(OtherSel1, canbeTwo);
          if (isInTwo == -1) {
            $scope.varientArr[i].val = canbeTwo[0];
          }
          var filterKeysTwo = [];
          var curValTwo = $scope.varientArr[i].val;
          for (var k = 0; k < filterKeysOne.length; k++) {
            if (filterKeysOne[k][i] == curValTwo) {
              filterKeysTwo.push(filterKeysOne[k]);
            }
          }
          filterKeysOne = filterKeysTwo;
        }
        getTheVitem();
      }

      // 切换规格
      function getTheVitem() {
        if ($scope.varientArr.length == 0) {
          $scope.variantItem = $scope.stanProducts[0];
        } else {
          var curVarKeyArr = [];
          for (var i = 0; i < $scope.varientArr.length; i++) {
            curVarKeyArr.push($scope.varientArr[i].val);
          }
          $scope.curVarientKey = curVarKeyArr.join('-');
          var curVarientIndex = dsp.findIndexByKey($scope.stanProducts, 'VARIANTKEY', $scope.curVarientKey);
          $scope.variantItem = $scope.stanProducts[curVarientIndex];
        }
        $scope.additem = $scope.variantItem;
        calcUnitPrice()
      }

      // 计算单价
      function calcUnitPrice(){

        // 如果有阶梯价格，则计算阶梯价格,
        if($scope.discountStatusFlag === 1){
          let params = {
            id:$scope.currentGoodsId, // 商品 id
            variantId:$scope.variantItem.ID, // 变体 id
            num:$scope.itemcount // 选择数量
          }
          dsp.postFun('erp/PackProduct/getVariantDiscountPrice', params,(res) => {
            if (res.data.statusCode === '200') {
              $scope.currentVarientUnitPrice = Number(res.data.result.unitPrice)
              $scope.totalPrice = res.data.result.price
            }
          },e=>e);
        }else{
           // 否则还是用变体单价
           $scope.currentVarientUnitPrice = Number($scope.variantItem.SELLPRICE)
           $scope.totalPrice = $scope.currentVarientUnitPrice * $scope.itemcount
        }

      }

      //添加到购物车
      $scope.addbuy = function ($event) {
        console.log($scope.variantItem)
        console.log($scope.additem);
        if(!$scope.itemcount) return layer.msg('Please enter the quantity.')
        var proData = [{
          BIGIMG: $scope.additem.IMG,
          ID: $scope.variantItem.ID,
          NAMEEN: $scope.additem.NAMEEN,
          SELLPRICE: $scope.variantItem.SELLPRICE,
          SKU: $scope.variantItem.SKU,
          itemcount: $scope.itemcount,
          discountPrice:($scope.currentVarientUnitPrice).toFixed(2)
        }];
        localStorage.setItem('packageData', JSON.stringify(proData));
        //location.href = '#/myCJ-purchase///package'
        $state.go('mycj-purchase', { orderType: 'package' });
      }
      //关闭弹窗
      $scope.close = function () {
        $scope.addDialog = false;
      }
      //加减
      $scope.plusOne = function () {
        if ($scope.itemcount >= 100000) {
          $scope.itemcount = "100000"
          return;
        } else {
          $scope.itemcount = $scope.itemcount * 1 + 1 + '';
        }
        calcUnitPrice()
      }
      $scope.minusOne = function (val) {
        if (val == mincount) return;
        $scope.itemcount = $scope.itemcount * 1 - 1 + '';
        calcUnitPrice()
      }
      $scope.blurQuantity = function () {
        if(!$scope.itemcount){
          $scope.itemcount = '1';
          calcUnitPrice()
        } else if ($scope.itemcount && $scope.itemcount - mincount < 0) {
          $scope.itemcount = mincount;
          calcUnitPrice()
        }
      }
      $scope.checkIsNum = function (val) {
        // if (isNaN(val * 1) || val * 1 < 1) {
        //   $scope.itemcount = '1'
        // }
        if ($scope.itemcount > 100000) {
          $scope.itemcount = "100000"
        }
        $scope.itemcount = $scope.itemcount.replace(/[^0-9]/ig, '')
        if($scope.itemcount) {
          calcUnitPrice()
        }
      }
      // 发现 itemcountBlur 暂时没用 2020-05-09
      $scope.itemcountBlur = function () {
        if ($scope.itemcount < mincount) {
          $scope.itemcount = mincount;
        }
      }

      $scope.chanPageSize = function () {
        $scope.pageNum = '1';
        getData();
      }
      $scope.chanPageNum = function () {
        if (!isNaN($scope.pageNum * 1) && $scope.pageNum * 1 > 0 && $scope.pageNum * 1 <= $scope.totalNum) {
          getData();
        } else {
          $scope.pageNum = '1';
        }
      }
      $scope.deleteFun = function (item, oindex, $event) {
        $event.stopPropagation();
        layer.open({
          title: null,
          type: 1,
          area: ['480px', '240px'],
          skin: '',
          closeBtn: 0,
          content: 'Are you sure to delete it?',
          btn: ['Cancel', 'Confirm'],
          yes: function (index, layero) {
            //按钮【按钮一】的回调
            layer.close(index);
          },
          btn2: function (index, layero) {
            //按钮【按钮二】的回调
            dsp.postFun('erp/PackProduct/delPackProduct', {
              "pid": "'" + item.id + "'",
              "type": 4
            }, function (data) {
              if (data.data.statusCode == 200) {
                $scope.dataList.splice(oindex, 1);
              } else {
                layer.msg(data.data.message);
              }

            })
            layer.close(index);
            return false //开启该代码可禁止点击该按钮关闭
          },
          cancel: function () {

            layer.close(index);
            //右上角关闭回调
            //return false 开启该代码可禁止点击该按钮关闭
          }
        });

      }
      $scope.$on('pagedata-fa', function (d, data) {
        console.log(data)
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getData();
      });
    }]);

  return app;
}
