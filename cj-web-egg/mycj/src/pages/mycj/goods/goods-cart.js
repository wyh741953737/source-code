export function goodsCartFactory(angular) {
  const module = angular.module('goods-cart.module', ['home-service']);
  const winHeight = $(window).height() * 1;
  const rightBarHeight = winHeight - 160;

  module.controller('goods-cart.ctrl', ['$scope', 'dsp', '$location', 'cjhome', '$state', '$rootScope', function ($scope, dsp, $location, cjhome, $state, $rootScope) {
    const userInfo = $rootScope.userInfo;
    $scope.isVip = userInfo.vip == 1;
    $scope.isdelete = false;
    $scope.iswishist = false;
    $scope.item = '';
    $scope.index = '';
    $scope.delType = '';
    $scope.wisType = '';
    $scope.buylist = [];
    $scope.noOrders = false;
    $scope.idList = [];
    $scope.hasLogin = dsp.isInLoginState();
    $scope.bundleshow = false;// 组合商品详情
    $scope.showPurchaseButton = true; // 从skulist过来的
    $scope.isApplied = false; // 从skulist过来的

    
    // 组合商品列表
    $scope.groupProductList = []
    // 关闭组合商品弹窗
    $scope.closeBundle = () => {
      $scope.bundleshow = !$scope.bundleshow;
    }
    // 打开组合商品弹窗
    $scope.openBundle = (list) => {
      $scope.bundleshow = true;
      $scope.groupProductList = list
    }
    //返回
    $scope.back = function () {
      history.go(-1);
    }

    //数据操作存储后台
    function dataStorage(t) {
      const msgLoading = cjMessage.loading({ isFixed: true })
      dsp.postFun('app/buyOrder/editShoppingCart', { productList: $scope.buylist }, function (data) {
        if(data.data.code === '200'){
          if (t === 'addToCart') layer.msg('Added Successfully')
        }
        msgLoading.hide();
      }, function (data) {
        msgLoading.hide();
      });
      allprice()
    }
  
    // 获取购物车数据
    function getCartdata() {
      dsp.postFun('app/buyOrder/getShoppingCart', {}, function (data) {
        if (data.data.code == 200) {
          if (data.data.shoppingCart) {
            if(!$scope.isApplied) {
              $scope.buylist = data.data.shoppingCart.productList.map(item => {item.checked = true; return item; }) || [];
              $scope.isApplied = true;
            } else {
              $scope.buylist = data.data.shoppingCart.productList || [];
            }

            if($scope.buylist.length == 0) {
              $scope.noOrders = true;
            } else {
              $scope.noOrders = false;
            }

            dataStorage();
            setTimeout(() => {
              const body = document.body.clientHeight;
              const h = document.getElementById('myContent').clientHeight;
              const bottom = document.getElementById('relatedList').clientHeight;
              const box = document.getElementById('my-right-list-box');
              const _height = body - 200;
              const fixedBox = document.getElementById('fixedBox').style;
              const w = box.clientWidth + 'px';
              
              if(h > _height) {
                fixedBox.width = '100%';
                fixedBox.position = 'sticky';
                fixedBox.left = 0;
                fixedBox.right = 0;
              } else {
                fixedBox.width = '100%';
                fixedBox.position = 'relative';
                fixedBox.left = 0;
                fixedBox.right = 0;
              }

              const ele = dsp.getScroll();
              ele.onscroll = (e) => {
                const scrolltop = e.target.scrollTop;
                if((bottom > 0 && h - scrolltop <= bottom) || (h - scrolltop < 800) || (h < _height)) {
                  fixedBox.width = '100%';
                  fixedBox.position = 'relative';
                  fixedBox.left = 0;
                  fixedBox.right = 0;
                }
                // else if(h - scrolltop < 800) {
                //   fixedBox.position = 'relative';
                //   fixedBox.paddingLeft = 0;
                //   fixedBox.paddingRight = 0;
                // } 
                else {
                  fixedBox.width = '100%';
                  fixedBox.position = 'sticky';
                  fixedBox.left = 0;
                  fixedBox.right = 0;
                }
              }
            },1000)
          }
        }
      }, function (data) {

      });
    }

    getCartdata();

    //计算价钱
    function allprice() {
      $scope.total = 0;
      $scope.sum = 0;
      var arr = [];
      $scope.buylist.forEach(function (o, i) {
        if (o.checked) {
          arr.push(o);
        }
      })
      console.log($scope.buylist)
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

    //加减修改数量
    $scope.checkIsNum = function (val, index) {
      if (isNaN(val) || val*1 < 1) {
        if (index >= 0) {
          $scope.buylist[index].itemcount = '1';
        } else {
          $scope.itemcount = '1';
        }
      }
      allprice()
    }
    $scope.plusOne = function (val, index) {
      if (index >= 0) {
        $scope.buylist[index].itemcount = $scope.buylist[index].itemcount * 1 + 1 + '';
        // localStorage.setItem('buylist', JSON.stringify($scope.buylist));
        allprice()
      } else {
        $scope.itemcount = $scope.itemcount * 1 + 1 + '';
      }
    }
    $scope.minusOne = function (val, index) {
      if (val == '1') return;
      if (index >= 0) {
        if (val == '') {
          $scope.buylist[index].itemcount = '1';
        } else {
          $scope.buylist[index].itemcount = $scope.buylist[index].itemcount * 1 - 1 + '';
        }
        // localStorage.setItem('buylist', JSON.stringify($scope.buylist));
        allprice()
      } else {
        if (val == '') {
          $scope.itemcount = '1';
        } else {
          $scope.itemcount = $scope.itemcount * 1 - 1 + '';
        }
      }
    }
    //删除
    $scope.delbuy = function (item, index) {
      $scope.isdelete = true;
      $scope.item = item;
      $scope.index = index;
      $scope.delType = 'cld';
      $scope.wisType = 'cld';
    }
    //批量删除
    $scope.batchDel = function () {
      console.log($scope.buylist)
      var a = 0;
      $scope.buylist.forEach(function (o, i) {
        if (o.checked) {
          a += 1;
        }
      })
      if (a > 0) {
        $scope.isdelete = true;
        $scope.delType = 'all';
        $scope.wisType = 'all';
      } else {
        layer.msg('Please select product.')
      }
    }
    $scope.delete = function () {
      if ($scope.delType == 'cld') {
        $scope.buylist.splice($scope.index, 1)
      } else if ($scope.delType == 'all') {
        console.log($scope.buylist)
        var arr = [];
        $scope.buylist.forEach(function (o, i) {
          if (!o.checked) {
            arr.push(o);
          }
        })
        $scope.buylist = arr;
      }
      dataStorage();
      getCartdata();
      $scope.isdelete = false;
      console.log($scope.buylist)
      if ($scope.buylist.length < 1) {
        $scope.checked = false;
      }
    }
    //移除到收藏
    $scope.collectionlog = function () {
      //$scope.collection ();
      console.log($scope.item, $scope.index)
      var arr = [];
      arr.push({ id: $scope.item.ID, CollectID: $scope.item.CollectID });
      dsp.postFun('cj/homePage/shouCangDuoGeShangPin', { idList: arr }, function (data) {
        if (data.data.statusCode == 200) {
          $scope.isdelete = false;
          getCartdata();
        }
      }, function (data) {

      })
    }
    $scope.collection = function (item, index, type) {
      $scope.idList = [];
      if (type == 'all') {
        $scope.buylist.forEach(function (o, i) {
          console.log(o)
          if (o.checked) {
            $scope.idList.push({ id: o.ID, CollectID: o.CollectID });
          }
        })
        if ($scope.idList.length < 1) {
          layer.msg('Please select product.')
          return;
        }
      }
      console.log($scope.buylist)
      console.log($scope.idList)
      $scope.iswishist = true;
      $scope.item = item;
      $scope.index = index;
      $scope.wisType = type;
    }
    $scope.wishist = function () {
      if ($scope.wisType == 'cld') {
        console.log('单个移入')
        console.log($scope.item, $scope.index)
        var arr = [];
        arr.push({ id: $scope.item.ID, CollectID: $scope.item.CollectID });
        // check
        dsp.postFun('cj/homePage/shouCangDuoGeShangPin', { idList: arr }, function (data) {
          if (data.data.statusCode == 200) {
            $scope.iswishist = false;
            if ($scope.isdelete) {
              $scope.isdelete = false;
            }
            getCartdata();
          }
        }, function (data) {

        })
      } else if ($scope.wisType == 'all') {
        console.log('多个移入')
        console.log($scope.idList)
        // check
        dsp.postFun('cj/homePage/shouCangDuoGeShangPin', { idList: $scope.idList }, function (data) {
          if (data.data.statusCode == 200) {
            $scope.idList = [];
            $scope.iswishist = false;
            if ($scope.isdelete) {
              $scope.isdelete = false;
            }
            getCartdata();
          }
        }, function (data) {

        })
      }
    }
    //加入收藏
    $scope.AddCollection = function (item, index, $event) {
      console.log(item)
      var $this = $($event.currentTarget);
      var selectData = {};
      selectData.id = item.CollectID;
      dsp.postFun('cj/homePage/shouCangShnagPin', { productId: item.CollectID }, function (data) {
        var cart = $('#mycjLeft');
        var imgtodrag = $this.siblings('.cartcoll');
        if (imgtodrag) {
          var imgclone = imgtodrag.clone()
            .offset({
              top: imgtodrag.offset().top,
              left: imgtodrag.offset().left
            })
            .css({
              'opacity': '0.6',
              'position': 'absolute',
              'height': '100px',
              'width': '100px',
              'z-index': '100'
            })
            .appendTo($('body'))
            .animate({
              'top': cart.offset().top + 10,
              'left': cart.offset().left + 10,
              'width': 75,
              'height': 75
            }, 500);

          imgclone.animate({
            'width': 0,
            'height': 0
          }, function () {
            $(this).detach()
          });
        }
        getCartdata();
      }, function (data) {

      });
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
        dataStorage();
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
      dataStorage();
    }
    //提交
    $scope.cartSub = function (shipType) {
      var a = 0;
      var arr = [];
      $scope.buylist.forEach(function (o, i) {
        if (o.checked) {
          a += 1;
          arr.push(o);
        }
      })
      if (a > 0) {
        var data = {
          productList: arr,
          totalPrice: $scope.total.toFixed(2)
        }
        console.log(data)
        dsp.postFun('app/buyOrder/saveShoppingCart', data, function (data) {
          console.log(data)
          if (data.data.checkFlag) {
            let isSupplier = data.data.isSupplier && data.data.isSupplier == true ? 1 : 0; // 1 供应商或泰国商品 0 其他
            //location.href = 'myCJ.html#/myCJ-purchase?isSupplier=' + isSupplier;
            $state.go('mycj-purchase', {
              orderType: 'zf',
              isSupplier,
              shipType // 区分直发、私有库存 1直发 2私有
            });
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
    //
    $scope.pageNum = 1;
    //历史记录
    $scope.History = JSON.parse(localStorage.getItem('viewHistory'));
    console.log($scope.History)
    //打开添加弹窗
    $scope.addDia = function (id, $event) {
      $event.stopPropagation();
      $scope.itemcount = 1;
      $scope.additem = null;
      $scope.addDialog = true;
        const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun('cj/locProduct/huoQuShangPinXiangQing', JSON.stringify({ id: id, token: '' }), function (data) {
        // console.log(data);
        msgLoading.hide();
        if (data.data.statusCode != 200) return;
        $scope.additem = data.data.result;
        console.log($scope.additem);
        console.log($scope.additem.CATEGORYID);
        $scope.stanProducts = $scope.additem.stanProducts;
        $scope.varientArr = [];
        $scope.varientKeys = [];
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
      }, function() {
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

      console.log($scope.variantItem);
    }

    //添加
    $scope.addbuy = function ($event) {
      const findIdx = dsp.findIndexByKey($scope.buylist, 'SKU', $scope.variantItem.SKU);
      dsp.postFun('app/buyOrder/gouWuCheMaiDian', { productId: $scope.additem.ID }, function (data) { });
      if (findIdx === -1) {
        $scope.buylist.push({
          NAMEEN: $scope.additem.NAMEEN,
          BIGIMG: $scope.additem.BIGIMG,
          isCollect: $scope.additem.isCollect,
          nowPrice: $scope.variantItem.nowPrice,
          ID: $scope.variantItem.ID,
          CollectID: $scope.variantItem.PID,
          SKU: $scope.variantItem.SKU,
          SELLPRICE: $scope.variantItem.SELLPRICE,
          itemcount: $scope.itemcount,
          checked: true
        })
      } else {
        $scope.buylist[findIdx].itemcount = ($scope.buylist[findIdx].itemcount * 1) + ($scope.itemcount * 1);
        $scope.buylist[findIdx].checked = true;
      }
      dataStorage('addToCart');
    }
  
    //关闭弹窗
    $scope.close = function () {
      $scope.addDialog = false;
    }
    /*收藏*/
    $scope.collectMerch = function (flag, id, $event, type, isCollect) {
      $event.stopPropagation();
      for(let i = 0; i < $scope.History.length; i++) {
        if($scope.History[i].id == id) {
          if(isCollect == '1') {
            $scope.History[i].isCollect = '0'
          } else {
            $scope.History[i].isCollect = '1'
          }
        }
      }
      if ($scope.hasLogin) {
        if (type == 'History') {
          console.log($scope.History);
          cjhome.Collection(flag, id, $event, $('#mycjLeft'), $scope.History);
        } else {
          cjhome.Collection(flag, id, $event, $('#mycjLeft'));
        }
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
    $scope.ProMerchEnter = function (ev) {
      if ($(ev.currentTarget).attr('src') == 'static/image/CJ-home/love_product@2x.png') {
        $(ev.currentTarget).attr('src', 'static/image/CJ-home/love_product_hover@2x.png')
      }
    }
    $scope.ProMerchLeave = function (ev) {
      if ($(ev.currentTarget).attr('src') != 'static/image/CJ-home/love_product_click@2x.png') {
        $(ev.currentTarget).attr('src', 'static/image/CJ-home/love_product@2x.png')
      }
    }
    /*商品点击去详情*/
    $scope.goTodetail = function (item) {
      if (item.flag == '1') {
        window.open('product-detail.html?id=' + item.id + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType + '&productType=' + (item.productType || 0));
      } else {
        window.open('reptail-detail.html?id=' + item.id);
      }
    };
    //listOrsource按钮
    $scope.listOrsourceBtn = function (item, $event, type) {
      $event.stopPropagation();
      if (type == 'source') {
        window.open('reptail-detail.html?id=' + item.id + '&source=1');
      } else if (type == 'list') {
        window.open('product-detail.html?id=' + item.id + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType + '&list=1');
      }
    };
    // 保留2位数
    $scope.toFixed2 = val =>{
      if (!val) return
      return Number(val).toFixed(2)
    }


    // 判断是否显示批量够慢按钮
    function isPurchaseShow() {
      const path= $location.path();
      if(path.includes('sku')) {
        $scope.showPurchaseButton = false;
      }
    }

    isPurchaseShow();
  }]);


  return module;
}

