(function (angular) {
  var app = angular.module('productsConnected-app', []);
  var winHeight = $(window).height() * 1;
  // console.log(winHeight);
  app.controller('historyCtrl', ['$scope', '$http', '$window', '$location', '$timeout', '$routeParams', 'dsp', function ($scope, $http, $window, $location, $timeout, $routeParams, dsp) {
    // console.log('historyCtrl')
    dsp.domainData().then((res) => {
      $scope.iscj = res.iscj;
      if ($scope.iscj == '1') {
        //cj
        $scope.websiteName = 'CJ';
      } else {
        //客户
        $scope.websiteName = res.websiteName || 'CJ';
      }
    })
    var base64 = new Base64();
    var userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
    var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
    if (vip == '1') {//vipFlag
      $('.header-nav').addClass('vipFlag');
      $('.mycj-right-wrap').css('background', '#F0EDE7').addClass('vip');
    } else {
      $('.header-nav').removeClass('vipFlag');
      $('.mycj-right-wrap').css('background', '#f2f3f5').removeClass('vip');
    }
    $('.header-nav li').eq(2).addClass('active');
    $scope.afterGetLeftNav = function () {
      if (vip == '1') {
        $('.mycj-left-bar').addClass('vipFlag');
      } else {
        $('.mycj-left-bar').removeClass('vipFlag');
      }
      $('.mycj-left-bar li').eq(0).addClass('active');
    }
    dsp.setRightMinHeight();
    $scope.listedList = [];
    $scope.listedsearch = '';
    $scope.listedpagesize = '10';
    $scope.listedpagenum = '1';
    $scope.listedTotalNum = '';
    $scope.listedTotalPage = '';
    $scope.listedsearch = '';
    $scope.shopId = '';
    $scope.getListedUrl = 'app/rebate/getAssignAndVisibility';

    // 刊登列表状态
    $scope.status = $routeParams.status ? $routeParams.status : '-1';
    // //0--待刊登，1--刊登中，2--刊登失败

    var listDataObj = {
      "-1": {
        "url": "pojo/product/getListedCj"
      },
      "0": {
        "url": "cj/listedproduct/list"
      },
      "1": {
        "url": "cj/listedproduct/list"
      },
      "2": {
        "url": "cj/listedproduct/list"
      }
    }
    // 编辑刊登
    var editIndex;
    $scope.editList = function (item,index) {
      editIndex = index;
      $scope.$broadcast('showeditframe', {
        from: '2',
        pid: item.ID
      });
    }
    $scope.$on('editListSuccess', function (d, data) {
      console.log(data);
      $scope.getListedPost();
    });
    // 全选
    $scope.checkOne = function (item,index) {
      var temArr = $scope.listedList.filter(function (e) {
        return e.check;
      })
      if (temArr.length == $scope.listedList.length) {
        $scope.check_All = true;
      } else {
        $scope.check_All = false;
      }
    }
    $scope.checkAll = function () {
      $scope.listedList.forEach(function (e) {
        e.check = $scope.check_All;
      })
      console.log($scope.listedList)
    }
    $scope.banListItems = [];
    //
    $scope.banchList = function () {
      $scope.banListItems = $scope.listedList.filter(function(e) {
        return e.check;
      })
      if ($scope.banListItems.length == 0) {
        layer.msg('Please select at least one product!');
        return;
      }
      console.log($scope.banListItems);
      $scope.confirmDelLayer = true;
    }
    $scope.goActBanList = function () {
      for (var i = 0; i < $scope.banListItems.length; i++) {
        if (!$scope.banListItems[i].SHOPNAME || $scope.banListItems[i].ACCPRICE == '0.0') {
          layer.msg('Products information short, please optimize products detail and try again.')
          return;
        }
      }
      var banchListIds = [];
      $scope.listedList.forEach(function (e) {
        e.check ? banchListIds.push(e.ID) : '';
      })
      console.log(banchListIds)
      dsp.postFun('cj/listedproduct/submit', banchListIds, function (data) {
        if (data.data.statusCode == 200) {
          layer.msg('Submit Successfully');
          $scope.confirmBanListFlag = 0;
          $scope.getListedPost();
        } else {
          layer.msg('Submit Failed');
        }
      })
    }

    
    function settleData(result) {
      var list = result.products;
      var remarkArr = result.remark || [];
      for (var i = 0; i < list.length; i++) {
        list[i].BIGIMG = list[i].BIGIMG.replace('https://', '').replace('http://', '');
        list[i].BIGIMG = 'https://' + list[i].BIGIMG;
        list[i].INVENTORCOUNTRY = list[i].INVENTORCOUNTRY
          ? JSON.parse(list[i].INVENTORCOUNTRY)
          : {China: 0, US: 0};
        list[i].decountry = null;
        list[i].deltPrice = 0;
        if (list[i].deltPrice) {
          list[i].AMOUNTPRICE = dsp.cacuAmount(list[i].SELLPRICE, list[i].deltPrice);
        } else {
          list[i].AMOUNTPRICE = list[i].SELLPRICE;
        }
        for (var j = 0; j < remarkArr.length; j++) {
          if (list[i].LOGISTICS && list[i].LOGISTICS == remarkArr[j].nameen) {
            list[i].wuliuRemark = remarkArr[j].remark;
            break;
          }
        }
        // 物流试算组件用
        list[i].shipinfo = {
          weight: list[i].PACKWEIGHT,
          enName: list[i].LOGISTICS,
          pid: list[i].PID,
          // shipDiscount: list[i].discountShopRate,
          index1: i
        }
      }
      $scope.listedList = list;
      console.log($scope.listedList);
    }

    // 物流试算组件返回值接收
    $scope.$on('saveShipPrice', function (d, data) {
      $scope.listedList[data.index1].AMOUNTPRICE = dsp.cacuAmount($scope.listedList[data.index1].SELLPRICE, data.shipDiscountPrice || 0);
      $scope.$apply();
    })
    // pojo/product/getListedCj
    $scope.getListedPost = function () {
      var getListedList = {}
      getListedList.pageNum = $scope.listedpagenum + '';
      getListedList.pageSize = $scope.listedpagesize + '';
      getListedList.shopId = $scope.shopId;
      getListedList.inputStr = $scope.listedsearch;
      getListedList.status = $scope.status;
      // dsp.load();
      $scope.listedList = [];
      dsp.loadPercent($('.cj-load-wrap'), skuPicHeight);
      dsp.postFun(listDataObj[$scope.status].url, JSON.stringify(getListedList), function (data) {
        // layer.closeAll("loading");
        dsp.closeLoadPercent($('.cj-load-wrap'));
        var data = data.data;
        if (data.statusCode != 200) {
          $scope.listedList = [];
          dsp.addNodataPic($('.cj-load-wrap'), skuPicHeight);
          console.log(data);
          return false;
        }
        var result = JSON.parse(data.result);
        if (result.totle == 0) {
          $scope.listedList = [];
          dsp.addNodataPic($('.cj-load-wrap'), skuPicHeight);
          $scope.listedTotalNum = 0;
          $scope.listedTotalPage = 0;
          $scope.hasListedData = false;
          $scope.noListedData = true;
          console.log(data);
          return false;
        }
        dsp.removeNodataPic($('.cj-load-wrap'));
        $scope.listedTotalNum = result.totle;
        $scope.listedTotalPage = Math.ceil(($scope.listedTotalNum * 1) / ($scope.listedpagesize * 1));
        $scope.hasListedData = true;
        $scope.noListedData = false;
        settleData(result);
        pageFun($("#page6"), $scope.listedTotalNum * 1, $scope.listedpagesize * 1, $scope.listedpagenum * 1, function (n, type) {
          if (type == 'init') return;
          var getListedList = {}
          getListedList.pageNum = n + '';
          getListedList.pageSize = $scope.listedpagesize + '';
          getListedList.shopId = $scope.shopId;
          getListedList.inputStr = $scope.listedsearch;
          // dsp.load();
          $scope.listedList = [];
          dsp.loadPercent($('.cj-load-wrap'), skuPicHeight);
          dsp.postFun('pojo/product/getListedCj', JSON.stringify(getListedList), function (data) {
            // layer.closeAll("loading");
            dsp.closeLoadPercent($('.cj-load-wrap'));
            var result = JSON.parse(data.data.result);
            settleData(result);
          });
        });
      });
    }
    $scope.getListedPost();

    $scope.searchListed = function () {
      $scope.getListedPost();
    }
    $scope.changeShop = function () {
      $scope.getListedPost();
    }
    $scope.listedpagesizechange = function () {
      $scope.getListedPost();
    }
    $scope.listedpagenumchange = function () {
      if ($scope.listedpagenum * 1 > $scope.listedTotalPage * 1) return;
      $scope.getListedPost();
    }
    $scope.enterSearch = function (event) {
      if (event.keyCode == 13) {
        $scope.searchListed();
      }
    }

    var deleteItem = {};
    $scope.listeddelet = function (item, index) {
      deleteItem = item;
      deleteItem.index = index
      $scope.confirmDelLayer = 1;
    }
    $scope.doDelete = function () {
      if (deleteItem.SHOPTYPE == "Woocommerce") {
        layer.load(2);
        // dsp.load();
        dsp.getFun('app/woocommerce/wooDeleteProduct?id=' + deleteItem.ID, function (data) {
          layer.closeAll('loading');
          if (data.data.statusCode == 200) {
            $scope.listedList.splice(deleteItem.index, 1);
            $scope.confirmDelLayer = 0;
          } else {
            layer.msg('Delete failed');
          }
        })
      } else if (deleteItem.SHOPTYPE == "Lazada") {
        layer.load(2);
        // dsp.load();
        dsp.postFun('lazada/product/deleteProductById', {
          'shopId': deleteItem.SHOPID, 'accPid': deleteItem.ACCPID
        }, function (data) {
          // console.log(data);
          layer.closeAll('loading');
          var data = data.data;
          if (data.statusCode != 200) {
            layer.msg('Delete failed');
            return false;
          }
          layer.msg('Deleted Successfully', {
            time: 1000
          });
          $scope.listedList.splice(deleteItem.index, 1);
          $scope.confirmDelLayer = 0;
        });
      } else if (deleteItem.SHOPTYPE == "shopee") {
        layer.load(2);
        // dsp.load();
        dsp.postFun('shopee/product/deleteProductById', {
          'shopId': deleteItem.SHOPID, 'accPid': deleteItem.ACCPID
        }, function (data) {
          // console.log(data);
          layer.closeAll('loading');
          var data = data.data;
          if (data.statusCode != 200) {
            layer.msg('Delete failed');
            return false;
          }
          layer.msg('Deleted Successfully', {
            time: 1000
          });
          $scope.listedList.splice(deleteItem.index, 1);
          $scope.confirmDelLayer = 0;
        });
      } else {
        layer.load(2);
        // dsp.load();
        dsp.getFun('pojo/product/cancelListed?id=' + deleteItem.ID, function (data) {
          // console.log(data);
          layer.closeAll('loading');
          var data = data.data;
          if (data.statusCode != 200) {
            layer.msg('Delete failed');
            return false;
          }
          layer.msg('Deleted Successfully', { time: 1000 });
          $scope.listedList.splice(deleteItem.index, 1);
          $scope.confirmDelLayer = false;
        });
        return false;
      }
    }
    //刪除列表
    $scope.doDelete2 = function () {
      layer.load(2);
      let oarr = $scope.banListItems.map(item=>{
        return item.ID
      });
      //拿到当前删除list的index
      let keyIndexs = $scope.banListItems.map(item=>{
        return $scope.listedList.indexOf(item)
      })
      console.log('keyIndexs====',keyIndexs)
      dsp.postFun('cj/listedproduct/delete',oarr, function (data) {
        layer.closeAll('loading');
        if (data.data.statusCode == 200) {
          //循环删除item
          for(let i=0,olen=keyIndexs.length;i<olen;i++){
            $scope.listedList.splice(keyIndexs[i], 1);
          }
          $scope.confirmDelLayer = false;
        } else {
          layer.msg('Delete failed');
        }
      })
    }

    $scope.categoryType = 'select' || 'input';

    //提交刊登请求数据
    $scope.queueParams = {
      logistics:'USPS',
      taxable:'1'
    };
    $scope.startList = () => {//开始提交刊登
      $scope.banListItems = $scope.listedList.filter(function(e) {
        return e.check;
      })
      if ($scope.banListItems.length == 0) {
        layer.msg('Please select at least one product!');
        return;
      }
      let oarr = $scope.banListItems.map(item=>{
        return item.ID
      });
      $scope.queueParams.ids=oarr;
      $scope.showStartListDialog = true;
      layer.load(2);
      //获取店铺列表
      dsp.postFun('app/shop/getshop',{
        data:JSON.stringify({userId:userId})
      }, (res)=>{
        layer.closeAll();
        var obj = JSON.parse(res.data.result);
        $scope.shopList = obj.shoplist;
      })
    }
    $scope.listConfirmFun = ()=>{
      console.log($scope.shopItem)
      console.log($scope.categoryItem)
      $scope.queueParams.productType = $scope.categoryItem.product_type;
      $scope.queueParams.shopId = $scope.shopItem.ID;
      $scope.queueParams.shopName = $scope.shopItem.NAME;
      console.log($scope.queueParams)
      layer.load(2);
      dsp.postFun('cj/listedproduct/submit', $scope.queueParams, (res)=>{
        layer.closeAll();
        location.href='myCJ.html#/products-connection/history/1';
      });
    }
    $scope.changeListFun = ()=>{
      console.log($scope.shopItem)
      dsp.getFun(`pojo/product/ShopifyProductType?shopId=${$scope.shopItem.ID}`, function (data) {
        $scope.categoryList = JSON.parse(data.data.result) || [];

        $scope.categoryList = $scope.categoryList.map(item => {
          item.name = item.product_type; // 统一店铺名称 name 字段，方便模版取值
          return item;
        });
      })
    }
    $scope.listPriceObj = {//编辑金额参数
      unit:'0',
      val:'',
      price:'',
      fixedPrice:''
    }
    $scope.confirmPriceFun=()=>{
      for(let i=0,olen=$scope.listedList.length;i<olen;i++){
        /* if($scope.listPriceObj.unit=='0'){
          $scope.listedList[i].ACCPRICE=($scope.listedList[i].SELLPRICE-0)*($scope.listPriceObj.val-0)
        }else if($scope.listPriceObj.unit=='1'){
          $scope.listedList[i].ACCPRICE=($scope.listedList[i].SELLPRICE-0)+($scope.listPriceObj.val-0)
        } */
        $scope.listedList[i].ACCPRICE= $scope.listPriceObj.fixedPrice;
      }
      $scope.showEditPriceDialog=false;
    }
    $scope.changePriceFun = ()=>{
      if($scope.listPriceObj.unit=='1'){
        $scope.listPriceObj.price=$scope.listPriceObj.val-0+10
      }else{
        $scope.listPriceObj.price=($scope.listPriceObj.val-0)*10
      }
    }
    function startListFun(oid){
      dsp.postFun('listed_products/listedLocproduct/do',{
        id:$scope.listedList[$scope.listIndex].ID
      }, function (data) {
        layer.closeAll('loading');
        if (data.data.statusCode == 200) {
          if($scope.listedList.length>$scope.listIndex){
            startListFun($scope.listIndex+1);
          }
        } else {
          layer.msg('Delete failed');
        }
      })
    }
  }]);


})(angular)