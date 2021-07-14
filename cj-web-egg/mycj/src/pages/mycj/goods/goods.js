export function goodsFactory(angular) {
  var app = angular.module('goods.module', ['service', 'home-service']);
  var winHeight = $(window).height() * 1;
  var rightBarHeight = winHeight - 160;
  // var nodataHeight = winHeight - 331;
  app.controller('goods.ctrl', ['$scope', '$rootScope', 'dsp', '$state', 'cjhome', '$stateParams','$timeout',
    function ($scope, $rootScope, dsp, $state, cjhome, $stateParams,$timeout) {
      $scope.fbaType = $stateParams.type;
      console.log($scope.fbaType);
      dsp.getCateList(function (data) {
        $scope.categoryList = data; 
        sessionStorage.setItem('CategoryList',JSON.stringify(data)) //将当前目录数据存入sessionStorage
      })
      //商品列表
      // $scope.flag = '0';
      $scope.pageNum = null;
      // $scope.pageSize = 20;
      // $scope.totalNum = 0;
      $scope.goodList = ''; //存储获取到的爬虫商品列表
      $scope.locationList = ''; //存储本地商品列表
      $scope.localpageAll = 0; //本地商品的总条数
      $scope.searchpageAll = 0; //爬虫商品的总条数
      $scope.isselect = false;
      $scope.selectTxt = 'All';
      $scope.selectedItem = null
      $scope.searchID = '';
      $scope.addDialog = false;
      $scope.buylist = [];
      $scope.hasLogin = dsp.isInLoginState();
      $scope.isRecommendation = true; // 目前展示的商品类型（搜索或推荐）
      /*收藏*/
      $scope.collectMerch = function (flag, id, $event) {
        $event.stopPropagation();
        if ($scope.hasLogin) {
          cjhome.Collection(flag, id, $event, $('#mycjLeft'));
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
        window.open('product-detail.html?id=' + item.id + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType + '&productType=' + (item.productType || 0));
      };
      //listOrsource按钮
      $scope.listOrsourceBtn = function (item, $event) {
        $event.stopPropagation();
        window.open('product-detail.html?id=' + item.id + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType + '&list=1');
      };

      //获取购物车数据
      $scope.$on('to-parent', function (d, data) {
        console.log('购物车数据', data);
        $scope.buylist = data;
      });
      //打开添加购物车弹窗
      $scope.addDia = function (id, $event) {
        $event.stopPropagation();
        $scope.itemcount = 1;
        $scope.additem = null;
        layer.load(2);
        dsp.postFun('cj/locProduct/huoQuShangPinXiangQing', JSON.stringify({ id: id, token: '' }), function (data) {
          // console.log(data);
          layer.closeAll('loading');
          if (data.data.statusCode != 200) return;
          $scope.additem = data.data.result;
          $scope.addDialog = true;
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
          layer.closeAll('loading');
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
        //$scope.additem = $scope.variantItem;
        console.log($scope.variantItem);
      }

      //添加到购物车
      $scope.addbuy = function ($event) {
        const findIdx = dsp.findIndexByKey($scope.buylist, 'SKU', $scope.variantItem.SKU);
        dsp.postFun('app/buyOrder/gouWuCheMaiDian', { productId: $scope.additem.ID }, function (data) { });
        console.log('==>',$scope.additem);
        console.log('==>',$scope.variantItem);
        if (findIdx === -1) {
          $scope.buylist.unshift({
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
        console.log($scope.buylist);
        const load = layer.load(2)
        $scope.$broadcast('to-cart', { list:$scope.buylist, callback:()=>{
          $scope.$broadcast('freshCart', { flag:true, callback:data => {
            layer.close(load)
          }
        });
        }});
      
        //dataStorage ();
        cjhome.goToCart($event, $('#cart'));
        // layer.msg('The goods have been successfully added to the shopping cart!')
        $('#cart_list_ul').scrollTop(0)
      }
      //关闭弹窗
      $scope.close = function () {
        $scope.addDialog = false;
      }
      //加减
      $scope.plusOne = function () {
        $scope.itemcount = $scope.itemcount * 1 + 1 + '';
      }
      $scope.minusOne = function () {
        if ($scope.itemcount == '1') return;
        $scope.itemcount = $scope.itemcount * 1 - 1 + '';
      }
      $scope.checkIsNum = function () {
        if (isNaN($scope.itemcount * 1) || $scope.itemcount * 1 < 1) {
          $scope.itemcount = '1'
        }
      }
      //生成从minNum到maxNum的随机数
      function randomNum(minNum, maxNum) {
        switch (arguments.length) {
          case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
          case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
          default:
            return 0;
            break;
        }
      }
      var orderByNum = randomNum(1, 8);

      $rootScope.$on('app/locProduct/cjList', (_, bool) => $scope.loading = bool);
  
      // 由于左边导航栏问题导致计算右边宽度不准确，故使用延时器
      $timeout(() =>{
        $scope.pageSize = 3 * Math.floor($('#pic-box').width() / 244);
        getProList();
      },100)
      
      //获取推荐商品
      $scope.proList = [];
      $scope.clickNum = 0;
      $scope.$on('prodCardList-fa', function (d, msgLoading) {
        $scope.clickNum += 1
        $scope.pageNum += 1;
        if ($scope.clickNum >= $scope.totalCounts) {
          msgLoading && msgLoading.hide()
          return;
        } else {
          if ($scope.pageNum > $scope.totalCounts) {
            $scope.pageNum = 1;
          }
        }
        getProList(msgLoading, false)
      });
      const { getInterfereProdId, getInterfereProdVersion } = window
      const getVersion = getInterfereProdVersion && getInterfereProdVersion()
      function getProList(msgLoading, isLoading = true) {
        const interfereProdVersion = getVersion && getVersion() || undefined
        if (isLoading) {
          // 是否显示初始加载loading
          $scope.loading = true
        }
        dsp.postFun('elastic-api/recommend/search/purchaseList/queryPage', {
          page: $scope.pageNum,
          size: 24,
          requestSource: '0', // 请求来源  0 : web端 1 : M站/App
          categoryIdList: getInterfereProdId && getInterfereProdId(), // 干预的类目的id集合
          versionNum: interfereProdVersion, // 版本号
        }, ({ data }) => {
          msgLoading && msgLoading.hide()
          if(isLoading) {
            $scope.loading = false
          }
          const result = data.data;
          if (interfereProdVersion == undefined) {
            // 没有版本号的时候，设置
            getVersion && getVersion(result.content[0] && result.content[0].versionNum)
          }
          $scope.totalCounts = parseInt(result.totalPages);
          $scope.pageNum = parseInt(result.pageNumber);
          const d = result.content.map(item => {
            return {
              ...item,
              flag: '1-2',
            }
          });
          $scope.proList = [...$scope.proList, ...d]
          $scope.$broadcast('prodCardList-data', {
            data: $scope.proList,
            isMore: $scope.clickNum < $scope.totalCounts
          });
        });
      }
      //获取搜索商品
      function getSearchProList() {
        const sendData = {
          userId: '',
          token: '',
          flag: '2',
          data: JSON.stringify({
            pageNum: $scope.pageNum,
            pageSize: $scope.pageSize,
            filter: {
              inputStr: $scope.searchStr,
              categoryId: $scope.cateId
            },
            orderBy: orderByNum, // 为了让客户看到不同效果
            codeType: 'china' // 过滤供应商商品
          }),
        };
        $scope.proSearchList = [];
        dsp.postFun('app/locProduct/cjList', sendData, ({ data }) => {
          $scope.categoryList = JSON.parse(sessionStorage.getItem('CategoryList')); //翻译问题,将当前目录数据取出赋值给categoryList,重新赋值
          if (data.statusCode != 200) {
            layer.msg('Get the product list error');
            return false;
          }
          const result = JSON.parse(data.result);
          $scope.totalNum = result.locationAll;
          $scope.totalText = $scope.totalNum > 1 ? 'Records':'Record';
          if (!$scope.totalNum) {
            $scope.proSearchList = [];
            dsp.addNodataPic($('.pd-related-con'), 400);
            return;
          }
          $scope.proSearchList = result.location;
          dsp.removeNodataPic($('.pd-related-con'));
          $scope.totalCounts = Math.ceil($scope.totalNum / $scope.pageSize);
          $scope.$broadcast('page-data', {
            pageNum: $scope.pageNum,
            totalNum: $scope.totalCounts,
            totalCounts: $scope.totalNum,
            pageSize: $scope.pageSize,
            pagesizeList: []
          });
        });
      }
      $scope.changesearch = function () {
        $scope.totalNum = 0
        $scope.isRecommendation = false
        $scope.cateId = $scope.selectedItem; //当前选中id赋值
        $scope.searchID = $scope.selectedItem; //当前选中id赋值
        $scope.isselect = false;
        $scope.pageNum = 1;
        getSearchProList();
      }
      $scope.search = function () {
        if ($scope.searchStr) {
          $scope.isRecommendation = false
          $scope.cateId = $scope.searchID;
          $scope.isselect = false;
          $scope.pageNum = 1;
          getSearchProList()
        }
      }
      $scope.enterSearch = function (event) {
        if (event.keyCode == 13) {
          $scope.search();
        }
      }
      //分页
      $scope.$on('pagedata-fa', function (d, data) {
        console.log(data)
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getSearchProList();
      });
      
      // 保留2位数,大于2位进一
      $scope.toFixed2 = val =>{
        if (!val) return
        return Math.ceil(Number(val)*100)/100
      }

      $rootScope.$on('leftbar-light-end', function (event, data) {
        if (!$state.current.url.startsWith('/goods')) {
          return;
        }
        $scope.pageSize = 3 * Math.floor($('#pic-box').width() / 244);
        $scope.pageNum = 1;
        getSearchProList();
      });
    }]);

  return app;
}
