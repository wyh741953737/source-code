export function favoritesFactory(angular) {
  const app = angular.module('mycj-favorites.module', ['service', 'home-service']);

  app.directive('onFinishRender', ['$timeout', '$parse', function($timeout, $parse){
    return {
      restrict:'A',
      link: function(scope, element, attr){
        if(scope.$last === true){
          $timeout(function(){
            scope.$emit("ngLoadFinished")
          })
        }
      }
    }
  }])

  var winHeight = $(window).height() * 1;
  var nodataHeight = winHeight - 311;
  app.controller('mycj-favorites.ctrl', ['$scope', '$rootScope', 'dsp', 'cjhome', '$stateParams', '$timeout',
    function ($scope, $rootScope, dsp, cjhome, $stateParams, $timeout,) {
      const userInfo = $rootScope.userInfo;
      $scope.isVip = userInfo.vip;
      $scope.userId = userInfo.userId;
      $scope.loginName = userInfo.loginName;
      $scope.token = userInfo.token;
      dsp.setRightMinHeight();
      // 根据shopify判断按钮
      var getShopData = {};
      getShopData.data = JSON.stringify({
        userId: $scope.userId
      });
      //获取商品类目
      // dsp.getCateList(function (data) {
      //   $scope.categoryListOne = data;
      // })
      function getCategoryList () {
        const params = {
          flag: '',
          filter:  '{"categoryId":"","inputStr":""}', //filter这个参数暂时没用到，传一个json格式的空字符串
          pressId: $scope.selectedCategory, //收藏夹id
        }
        dsp.postFun('cj/Collect/selectCollectCategory', JSON.stringify(params), (res) => {
          const postResult = res.data;
          console.log(postResult)
          if (postResult && postResult.statusCode == '200') {
            $scope.categoryListOne = postResult.result;
          }
          else {
            layer.msg('Get Category List Fieled.');
          }
        })
      }
      
      $rootScope.$on('cj/homePage/huoQuShouCangLieBiao', (_, bool) => $scope.loading = bool);

      // flag = 0 全部, flag = 1 爬虫, flag = 2 本地
      $scope.favoriteList = [];
      $scope.pageNum = '1';
      $scope.pageSize = '10';
      $scope.favFalg = '0';
      $scope.totalNum = 0;
      $scope.seletedCate = '';
      $scope.searchVal = '';
      $scope.noListData = false;
      $scope.checkoutWishList = []; // 选中的心愿单
      $scope.customCategoryList = [];
      $scope.selectedCategory = ""; //选中的分类列表
      $scope.categoryName = ""; //自定义心愿单名称
      $scope.isHideScrollBtn = false; //是否隐藏滑动按钮
      $scope.selectedPrdList = []; //选中的商品列表
      $scope.moveToCategory = '';
      // $scope.noData = true;
      $scope.getFavoriteList = function (pageNum, pageSize, categoryId, inputStr, flag, scb) {
        // var getFavData = {};
        // getFavData.pageNo = pageNum;
        // getFavData.pageSize = pageSize;
        // getFavData.flag = flag;
        // getFavData.filter = JSON.stringify({
        //   categoryId: categoryId,
        //   inputStr: inputStr
        // });
        const filterObj = {
          categoryId: categoryId,
          inputStr: inputStr
        }
        const params = {
          pageNo: pageNum,
          pageSize: pageSize,
          flag: flag,
          filter: JSON.stringify(filterObj),
          pressId: $scope.selectedCategory,
        }

        $scope.favoriteList = [];
        dsp.postFun('cj/Collect/selectProductList', JSON.stringify(params), function (data) {  //'cj/homePage/huoQuShouCangLieBiao' 原始接口
          var data = data.data;
          if (data.statusCode != 200) {
            layer.msg('Get the wish list error');
            return false;
          }
          var result = data.result;
          $.each(result.list, function (i, v) {
            //BIGIMG
            v.BIGIMG = updateImg(v.BIGIMG);
          });
          console.log(result);
          scb(result);
        });
      }
      
      function updateImg(imgurl) {
        var url;
        if (imgurl && imgurl.indexOf('https') != -1) {
          url = imgurl.replace('https://', 'https://');
        } else if (imgurl && imgurl.indexOf('http://') != -1) {
          url = imgurl.replace('http://', 'https://');
        } else if (imgurl) {
          url = "https://" + imgurl;
        } else {
          url = '';
        }
        return url;
      }

      $scope.hasListData = true;
      $scope.firstRender = function () {
        $scope.getFavoriteList($scope.pageNum, $scope.pageSize, $scope.seletedCate, $scope.searchVal, $scope.favFalg, function (data) {
          console.log('list', data);
          $scope.totalNum = data.totalNum;
          dsp.removeNodataPic($('.favorite-cont'));
          if ($scope.totalNum > 0) {
            $scope.hasListData = true;
            $scope.noListData = false;
            $scope.noData = false;
            //settleData(data);
            $scope.favoriteList = data.list;
            $scope.checkoutWishList = data.list;
            $scope.check_All_Wish = false;
            removeImgHttp($scope.favoriteList)
            setPagination($scope.totalNum);
          } else {
            $scope.hasListData = false;
            $scope.noData = true; // 一点数据也没有，展示默认图
            $scope.noListData = false;
            if ($scope.selectedCategoryItem.wishproductSum > 0) {
              $scope.noListData = true; // 没有搜索到数据，展示nodata图
              $scope.noData = false;
              dsp.addNodataPicNewStyle($('.favorite-cont'), $scope.isVip === "1" ? true : false);
            }
          }
          $scope.totalCounts = Math.ceil($scope.totalNum / $scope.pageSize);
          $scope.$broadcast('page-data', {
            pageNum: $scope.pageNum,
            totalNum: $scope.totalCounts,
            totalCounts: $scope.totalNum,
            pageSize: $scope.pageSize,
          });
        });
      }
      // $scope.firstRender();

      $scope.searchFavList = function () {
        $scope.pageNum = '1';
        $scope.firstRender();
      }
      $scope.enterSearch = function (event) {
        if (event.keyCode == 13) {
          $scope.searchFavList();
        }
      }
     
      $scope.chingeVarient = function (index) {
        alert(index);
      }

      $('.pay-wares-list').on('change', 'li .varient-sel', function () {
        var curVarIndex = $(this).attr('index') * 1;
        var filterKeysOne = [];
        var cid = $(this).parent().siblings('.id-span').html();
        var cIndex = dsp.findIndexByKey($scope.localList, 'id', cid);
        var varientKeysInner = $scope.localList[cIndex].varientKeysInner;
        var varientArr = $scope.localList[cIndex].varientArr;
        for (var i = 0; i < varientKeysInner.length; i++) {
          var curVarKey = varientKeysInner[i].split('-');
          if (curVarKey[curVarIndex] == $(this).val()) {
            filterKeysOne.push(curVarKey);
          }
        }
        // console.log(filterKeysOne);
        for (var i = 0; i < varientArr.length; i++) {
          // console.log(i);
          if (i == curVarIndex) continue;
          var canbeTwo = [];
          // console.log(filterKeysOne);
          for (var j = 0; j < filterKeysOne.length; j++) {
            canbeTwo.push(filterKeysOne[j][i]);
          }
          // console.log(canbeTwo);
          // var curVarTwoIndex = curVarIndex + 1;
          var OtherSel1 = $(this).parent().find('.varient-sel').eq(i).val();
          var isInTwo = $.inArray(OtherSel1, canbeTwo);
          if (isInTwo == -1) {
            $(this).parent().find('.varient-sel').eq(i).val(canbeTwo[0]);
          }
          var filterKeysTwo = [];
          var curValTwo = $(this).parent().find('.varient-sel').eq(i).val();
          for (var k = 0; k < filterKeysOne.length; k++) {
            if (filterKeysOne[k][i] == curValTwo) {
              filterKeysTwo.push(filterKeysOne[k]);
            }
          }
          filterKeysOne = filterKeysTwo;
        }
      });

      function addFlag0(arr) {
        for (var i = 0; i < arr.length; i++) {
          arr[i].flag = 0;
        }
      }

      function addFlag1(arr) {
        for (var i = 0; i < arr.length; i++) {
          arr[i].flag = 1;
        }
      }

      function removeImgHttp(arr) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].bigImg)
            arr[i].bigImg = 'https://' + arr[i].bigImg.replace('https://', '').replace('http://', '');
        }
      }

      // 处理返回数据
      function settleData(data) {
        var locaList = (data[0].location[0] == null ? [] : data[0].location);
        var reptLust = data[0].reptile;
        removeImgHttp(locaList);
        addFlag1(locaList);
        addFlag0(reptLust);
        $scope.localList = locaList;
        $scope.favoriteList = locaList.concat(reptLust);
        // $scope.totalNum = data[0].all;
        var localIds = [];
        for (var i = 0; i < $scope.localList.length; i++) {
          localIds.push($scope.localList[i].id);
        }
        // console.log(localIds);
        if (localIds.length == 0) return;
        dsp.getFun('pojo/product/getByIds?ids=' + localIds.join(','), function (data) {
          var data = data.data;
          var result = JSON.parse(data.result);
          console.log('varient', result);
          var varientKeysInnerObj = {};
          for (var k in result) {
            var varientKeysInner = [];
            for (var i = 0; i < result[k].length; i++) {
              varientKeysInner.push(result[k][i].variantKey);
            }
            if (varientKeysInner[0] == 'default') {
              varientKeysInner = [];
            }
            varientKeysInnerObj[k] = varientKeysInner;
          }
          for (var i = 0; i < $scope.localList.length; i++) {
            $scope.localList[i].stanProducts = result[$scope.localList[i].id];
            $scope.localList[i].varientKeysInner = varientKeysInnerObj[$scope.localList[i].id];
          }
          for (var i = 0; i < $scope.localList.length; i++) {
            // console.log(i);
            var varientArr = [];
            var varientKeys = [];
            if ($scope.localList[i].variantKeyEn != '') {
              varientKeys = $scope.localList[i].variantKeyEn.split('-');
              for (var h = 0; h < varientKeys.length; h++) {
                varientArr.push({
                  name: varientKeys[h],
                  key: []
                });
              }
              for (var j = 0; j < $scope.localList[i].stanProducts.length; j++) {
                if ($scope.localList[i].stanProducts[j].variantKey != null) {
                  var curVarientVal = $scope.localList[i].stanProducts[j].variantKey.split('-');
                  for (var k = 0; k < curVarientVal.length; k++) {
                    varientArr[k].key.push(curVarientVal[k]);
                  }
                }
              }
              for (var m = 0; m < varientArr.length; m++) {
                varientArr[m].key = $.unique(varientArr[m].key);
              }
            } else {
              varientArr = [];
            }

            if (varientArr.length == 1 && varientArr[0].key.length == 0) {
              varientArr = [];
            }

            // console.log(varientArr);
            $scope.localList[i].varientArr = varientArr;
          }
          // console.log($scope.localList);
          $scope.favoriteList = $scope.localList.concat(reptLust);
        });
      }

      //处理分页函数
      function setPagination(totalCounts) {
        $(".page-index").jqPaginator({
          // totalPages: 20,//分页的总页数
          totalCounts: totalCounts,
          pageSize: $scope.pageSize * 1,
          visiblePages: 5,//显示多少页
          currentPage: $scope.pageNum * 1,//当钱第几页
          activeClass: 'current',
          prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
          next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
          page: '<a href="javascript:void(0);">{{page}}<\/a>',
          first: '<a class="prev" href="javascript:void(0);">&lt&lt;<\/a>',
          last: '<a class="prev" href="javascript:void(0);">&gt&gt;<\/a>',
          onPageChange: function (n, type) {
            if (type == 'init') return;
            $scope.getFavoriteList(n + '', $scope.pageSize, '', '', $scope.favFalg, function (data) {
              console.log('list', data);
              $scope.favoriteList = data.list;
              removeImgHttp($scope.favoriteList)
              //settleData(data);
            });
          }
        });
      }


      // source按钮
      $scope.goActSource = function (id) {
        cjhome.goActSource(id);
      }

      //刊登编辑按钮
      // this.parentctrl = 'myCJfavorited';
      $scope.addEditFrame = function (id, podFlag) {
        if (id) {
          $scope.editFrameShow = true;
          $scope.editFrameData = { from: 'myCJ-favorites', pid: id, podFlag: podFlag };
        }

      }
      // 关闭编辑刊登
      $scope.closeEditFrame = function () {
        console.log(arguments);
        $scope.editFrameShow = false;
      };

      $scope.cancelCollection = function (item, idx) {
        dsp.postFun("cj/homePage/shouCangShnagPin", { productId: item.ID }, function (data) {
          if (data.status == 200) {
            layer.msg('Deleted Successfully');
            $scope.favoriteList.splice(idx, 1)
            $scope.getCustomCategory();
          }
        })
      }

      // 获取购物车数据
      //加入购物车
      $scope.buylist = [];
      function getCartdata() {
        dsp.postFun('app/buyOrder/getShoppingCart', {}, function (data) {
          console.log(data);
          if (data.data.code == 200) {
            if (data.data.shoppingCart && data.data.shoppingCart.productList) {
              $scope.buylist = data.data.shoppingCart.productList;
            } else {
              $scope.buylist = [];
            }
            console.log($scope.buylist)
            if($stateParams.pid) {
              const arr = $stateParams.pid.split('&&');
              $scope.addEditFrame(arr[0], arr[1]);
            }
            
          }
        }, function (data) {

        });
      }
      getCartdata();
      $scope.addDia = function (id) {
        $scope.itemcount = 1;
        $scope.additem = '';
        $scope.addDialog = true;
        const msgLoading = cjMessage.loading({ isFixed: true });
        dsp.postFun('cj/locProduct/huoQuShangPinXiangQing', JSON.stringify({ id: id, token: '' }), function (data) {
          // console.log(data);
          msgLoading.hide();
          if (data.data.statusCode != 200) return;
          if (!data.data.result) return;
          $scope.additem = data.data.result;
          console.log($scope.additem);
          console.log($scope.additem.CATEGORYID);
          //获取推荐商品
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
              $scope.varientArr[i].key = $.unique($scope.varientArr[i].key);
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

        }, function() {
          msgLoading.hide();
        });
      }
      $scope.chanVariant = function (val, index) {
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
      $scope.checkIsNum = function (val) {
        console.log(val)
        if (!val || isNaN(val) || val == '0') {
          $scope.itemcount = '1';
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
        if ($scope.buylist.length > 0) {
          if (arr.length == $scope.buylist.length) {
            $scope.checked = true;
          } else {
            $scope.checked = false;
          }
        }
        arr.forEach(function (o, i) {
          $scope.total += Number(o.SELLPRICE) * Number(o.itemcount);
          $scope.sum += Number(o.itemcount);
        })
      }

      //添加
      $scope.addbuy = function ($event) {
        const findIdx = dsp.findIndexByKey($scope.buylist, 'SKU', $scope.variantItem.SKU);
        dsp.postFun('app/buyOrder/gouWuCheMaiDian', { productId: $scope.additem.ID }, function (data) { });
        console.log('=====>',$scope.additem);
        console.log('=====>',$scope.variantItem);
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
        console.log($scope.buylist);
        dataStorage();
      }
      //数据操作存储后台
      function dataStorage() {
        const msgLoading = cjMessage.loading({ isFixed: true });
        dsp.postFun('app/buyOrder/editShoppingCart', { productList: $scope.buylist }, function (data) {
          if(data.data.code === '200'){
            msgLoading.hide();
            layer.msg('Added Successfully');
          }
        }, function (data) {
          msgLoading.hide();
        });
      }
      //关闭弹窗
      $scope.close = function () {
        $scope.addDialog = false;
      }
      /* 头部菜单进入埋点 */
      function trackFun() {
        dsp.postFun('pojo/home/addStatisByType', {
          entryPage: +dsp.getQueryString('track')
        }, res => { console.log(res.data) })
      }
      if (+dsp.getQueryString('track') == 2) {
        trackFun();
      }
      
      // 保留2位数
      $scope.toFixed2 = val =>{
        if (!val) return
        return Number(val).toFixed(2)
      }

      
      // 全选wishlist
      $scope.handleCheckAllWish = () => {
        $scope.check_All_Wish = !$scope.check_All_Wish
        if($scope.check_All_Wish){
          $scope.checkoutWishList.forEach(item=>{
            item.check = true
          })
        }else{
          $scope.checkoutWishList.forEach(item=>{
            item.check = false
          })
        }
      }

      // 单选或多选wishlist
      $scope.handleCheckItem = (item, index) => {
        item.check = !item.check
        if (item.check) {
          let num = 0;
          for (let i = 0; i < $scope.checkoutWishList.length; i++) {
            if ($scope.checkoutWishList[i].check) {
                num++;
            }
          }
          if (num == $scope.checkoutWishList.length) {
            $scope.check_All_Wish = true;
          }
        } else {
            $scope.check_All_Wish = false;
        }
      }

      $scope.handleDelete = () => {
        const checkoutlist = $scope.checkoutWishList.filter((item) => item.check);
        if(checkoutlist.length == 0) {
          layer.msg('Please select 1 product as least');
          return false;
        }
        const params = {
          idList: []
        }
        checkoutlist.map(item => params.idList.push(item.ID));
        dsp.postFun('cj/homePage/batchDeleteFavorites', JSON.stringify(params), (res) => {
           const { message, statusCode } = res.data;
           if(statusCode == 200) {
             layer.msg('Deleted  Successfully');
             $scope.getCustomCategory();
           } else {
            layer.msg(message);
           }
        })
      }
  
      //分页
      $scope.$on('pagedata-fa', function (d, data) {
        console.log(data)
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        $scope.firstRender();
      });

      /** 自定义分类列表相关 */
      $scope.disableScrollType = "left";

      //get custom category list
      $scope.getCustomCategory = function () {
        _postFn('cj/Collect/selectCollectCommodity', {id: ''}, '', 'Get WishList Error', (postResult) => {
          $scope.customCategoryList = postResult.result || [];
          if ($scope.customCategoryList.length) {
            $scope.firstCategoryList = $scope.customCategoryList[0];
            $scope.customCategoryList.splice(0, 1);
            $scope.selectedCategory = $scope.selectedCategory ? $scope.selectedCategory : $scope.firstCategoryList.id;
            $scope.selectedCategoryItem = $scope.selectedCategoryItem ? $scope.selectedCategoryItem : $scope.firstCategoryList;
            $scope.firstRender();
            getCategoryList();
            // 删除添加判断是否需要禁用滑动按钮
            $timeout(function () {
              // 定宽box
              $scope.scrollBox = $(".scroll-box")[0];
              //ul的dom
              $scope.ulDom = $(".scroll-box-ul")[0];
              const liList = $scope.ulDom.children;
              let ulWidth = 0;
              for(let i = 0; i < liList.length; i++) {
                let wid = liList[i].offsetWidth + 33;
                ulWidth += wid
              }
              //所有li的宽度综合
              $scope.ulWidth = ulWidth;
              const wrapWidth = $scope.scrollBox.offsetWidth;
              $scope.isHideScrollBtn = wrapWidth > $scope.ulWidth ? false : true;
              if (wrapWidth > $scope.ulWidth) {
                $(".scroll-box-ul")[0].style.transform = "translateX(0px)"
              }
            })
            
          }
        })
      }

      // 获取自定义分类列表长度
      $scope.$on('ngLoadFinished',function (args){
        judgeIsHideScrollBtn();
      })

      window.onresize = () => {
        judgeIsHideScrollBtn()
      }
      //判断是否禁用滑动按钮
      function judgeIsHideScrollBtn() {
        // 定宽box
        $scope.scrollBox = $(".scroll-box")[0];
        //ul的dom
        $scope.ulDom = $(".scroll-box-ul")[0];
        const liList = $scope.ulDom.children;
        if (!$scope.ulWidth) {
          let ulWidth = 0;
          for(let i = 0; i < liList.length; i++) {
            let wid = liList[i].offsetWidth + 33;
            ulWidth += wid
          }
          //所有li的宽度综合
          $scope.ulWidth = ulWidth;
        }
        
        const wrapWidth = $scope.scrollBox.offsetWidth;
        //判断是否隐藏滑动按钮
        $scope.$apply(function () {
          let compareWidth = $scope.selectedCategory ? $scope.ulWidth + 50 : $scope.ulWidth;
          $scope.isHideScrollBtn = wrapWidth > compareWidth ? false : true;
          if (wrapWidth > $scope.ulWidth) {
            $(".scroll-box-ul")[0].style.transform = "translateX(0px)"
          }
        })
        
      }
      
      //选择分类列表
      $scope.selectCategory = (item, index) => {
        if ($scope.selectedCategory === item.id) {
          return null
        }
        $scope.selectedCategory = item.id;
        $scope.selectedCategoryItem = item;
        // 判断是否需要滑动
        // const liList = $scope.ulDom.children;
        // const targetLiLeft = liList[index].getBoundingClientRect().right;
        // const scrollBoxLeft = $scope.scrollBox.getBoundingClientRect().right;
        // if (targetLiLeft + 120 > scrollBoxLeft) {
        //   const scrollWidth = targetLiLeft + 120 - scrollBoxLeft;
        //   let ulDomScrollX = $scope.ulDom.style.transform;
        //   ulDomScrollX = Number(ulDomScrollX.substring(ulDomScrollX.indexOf('(') + 1, ulDomScrollX.indexOf('px'))) || 0;
        //   $scope.ulDom.style.transform = `translateX(${ulDomScrollX - scrollWidth}px)`;
        // }
        // $scope.searchVal = "";
        $scope.firstRender();
        getCategoryList();
      }

      //滑动分类列表 按钮
      $scope.scrollCategoryList = (type) => {
        let ulDomScrollX = $scope.ulDom.style.transform;
        const scrollBoxWidth = $scope.scrollBox.offsetWidth
        let ulWidth = $scope.ulWidth - scrollBoxWidth + 50;  //50是蒙层的宽度
        //获取原来滑动的值
        ulDomScrollX = Number(ulDomScrollX.substring(ulDomScrollX.indexOf('(') + 1, ulDomScrollX.indexOf('px'))) || 0;

        if (type && ulDomScrollX !== 0) {
          let scrollWidth = scrollBoxWidth + ulDomScrollX - 80;
          $scope.ulDom.style.transform = `translateX(${scrollWidth > 0 ? 0 : scrollWidth}px)`;
          //判断是否禁用
          $scope.disableScrollType = scrollWidth >= 0 ? 'left' : "";
        }
        if (!type && Math.abs(ulDomScrollX) <= ulWidth) {
          const scrollWidh = -scrollBoxWidth + ulDomScrollX + 80;
          $scope.ulDom.style.transform = `translateX(${scrollWidh}px)`;
          //判断是否禁用
          $scope.disableScrollType = Math.abs(scrollWidh) >= ulWidth ? 'right' : "";
        }
      }

      //打开modal
      $scope.openCategoryModal = (type, category) => {
        switch (type) {
          case 'move':
            if (category) { // 单个商品移动
              $scope.selectedPrdList = [{id: category}]
            }
            else { //批量移动
              const checkoutlist = $scope.checkoutWishList.filter((item) => item.check);
              if(checkoutlist.length == 0) {
                return layer.msg('Please select 1 product as least');
              }
              else {
                $scope.selectedPrdList = checkoutlist.map(item => ({id: item.wishid}));
              }
            }
            break;
          case 'add':
            if ($scope.customCategoryList.length >= 10)
              return layer.msg('Only up to 10 folders can be created.')
            $scope.categoryName = '';
            break;
          case 'rename':
            $scope.categoryName = category;
            break;
        }
        $scope.selectDanger = $scope.requireDanger = $scope.sameDanger = false;
        $scope.showCategoryModal = true;
        $scope.categoryModalType = type;
      }

      //分类弹窗 确定按钮
      $scope.cgyModalConfirm = () => {
        switch ($scope.categoryModalType) {
          case 'move':
            if (!$scope.moveToCategory) {
              return $scope.selectDanger = true;
            }
            moveProdToList();
            break;
          case 'add':
            if (!$scope.categoryName) {
              $scope.requireDanger = true;
              $scope.sameDanger = false;
              return
            }
            const trimName = $scope.categoryName.trim().toLowerCase()
            if ($scope.customCategoryList.find(x => x.wishName.toLowerCase() === trimName) || trimName == "wishlist") {
              $scope.sameDanger = true;
              $scope.requireDanger = false;
              return 
            }
            addCustomCgy()
            break;
          case 'rename':
            if (!$scope.categoryName) {
              $scope.requireDanger = true;
              $scope.sameDanger = false;
              return
            }
            if ($scope.customCategoryList.find(x => x.wishName === $scope.categoryName)) {
              $scope.sameDanger = true;
              $scope.requireDanger = false;
              return 
            }
            renameCustomList()
            break;
          case 'delete':
            deleteCustomList();
            break;
        }
        $scope.showCategoryModal = false;
      }

      //添加分类
      const addCustomCgy = function () {
        const params = {
          wishName: $scope.categoryName.trim()
        }
        _postFn("cj/Collect/insertCollect", params, "Added successfully.", "Add wishlist failed.", () => {
          $scope.getCustomCategory();
        })
      }
      //移动商品
      function moveProdToList() {
        const params = {
          dbCollectPressVO: {//这装的是收藏夹的信息，暂时只需要id
            id: $scope.moveToCategory
          },
          dbWishProducts: $scope.selectedPrdList//这个数组里装的是商品的信息，暂时只需要id
        }
        _postFn('cj/Collect/updateProductMove', params, 'Move succeed.', 'Move Failed.', () => {
          // $scope.firstRender();
          $scope.getCustomCategory();
        });
      }
      //删除分类
      function deleteCustomList() {
        _postFn("cj/Collect/deleteCollectProduct", {
          dbCollect: [$scope.selectedCategory]
        }, 'Deleted successfully.', 'Delete failed.', () => {
          $scope.getCustomCategory();
        })
      }
      //重命名分类
      function renameCustomList () {
        const params = {
          id: $scope.selectedCategory,
          wishName: $scope.categoryName
        }
        _postFn("cj/Collect/updateCollectProduct", params, 'Modified successfully.', 'Modified Failed.', () => {
          $scope.getCustomCategory();
        });
      }

      /**
       * 
       * @param {string} url 接口
       * @param {object} params 接口传参
       * @param {string} sucMsg 成功后的提示信息
       * @param {string} failMsg 失败后的提示信息
       * @param {function} callback 回调
       */
      function _postFn(url, params, sucMsg, failMsg, callback) {
        dsp.postFun(url, JSON.stringify(params), function (res) {
          try {
            const postResult = res.data;
            if (postResult && postResult.statusCode == '200') {
              sucMsg ? layer.msg(sucMsg) : null;
              callback(postResult);
            }
            else {
              failMsg ? layer.msg(failMsg) : null;
            }
          } catch (error) {
            layer.msg('Unexpect Error.');
          }
        })
      }

      $scope.getCustomCategory();

    }]);
  
  return app;
}
