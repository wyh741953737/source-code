import { pageFunWithParams } from '@src/pages/mycj/mycj-common';

// 获取店铺商品列表
export function goGetShopPro(dsp, $scope, vip, search, connectionPicHeight = 520) {
  // dsp.load();
  var jsonObj = {};
  jsonObj.pageSize = '5';
  jsonObj.pageNum = '1';
  // jsonObj.shopId = $scope.selectshopinfo.ID ? $scope.selectshopinfo.ID : '';
  jsonObj.shopId = $scope.inputshopinfo && $scope.inputshopinfo.ID ? $scope.inputshopinfo.ID : '';
  if ($scope.shopProductId) jsonObj.shopProductId = $scope.shopProductId;
  // jsonObj.userId = $scope.userId;
  // var str;
  if ($scope.searchByPart) {
    jsonObj.search = $scope.searchinfoshop.replace(/ /g, ',');
    $scope.searchByPart = false;
  } else {
    jsonObj.search = $scope.searchinfoshop;
  }
  // jsonObj.search = $scope.searchinfoshop;
  $scope.shop = [];
  function noData (vip, search) {
    if(search) {
      if(vip == 1) {
        dsp.afterSearchPicVIP($('.cj-load-wrap-left'), connectionPicHeight);
      } else {
        dsp.afterSearchPic($('.cj-load-wrap-left'), connectionPicHeight);
      }
    } else if(vip == 1) {
      dsp.beforeSearchPicVIP($('.cj-load-wrap-left'), connectionPicHeight);
    } else {
      dsp.beforeSearchPic($('.cj-load-wrap-left'), connectionPicHeight);
    }
  }
  function setNoDataFn () {
    $scope.storeProTotalNum = 0;
    $scope.shop = [];
    noData(vip, search);
    $scope.hasshopdata = false;
  }
  dsp.loadPercent($('.cj-load-wrap-left'), connectionPicHeight);
  dsp.postFun('platform-product/query/queryShopProducts', jsonObj, function (name) {
    // dsp.closeLoad();
    $scope.shop = [];
    dsp.closeLoadPercent($('.cj-load-wrap-left'));
    if (!name || !name.data) return setNoDataFn();
    const { code, data: obj } = name.data
    if (+code !== 200 || !obj ) return setNoDataFn();
    $scope.shopProductId = ''; // 从订单不完整订单过来若有店铺商品id，在请求完接口后需清除id
    $scope.allShop = obj
    if (!obj.list.length || !obj.total) return setNoDataFn();

    dsp.removeNodataPic($('.cj-load-wrap-left'));
    $scope.hasshopdata = true;
    $scope.storeProTotalNum = obj.total;
    const allPageNum = obj.total && parseInt(obj.total / 5) || 1;
    let nowPageNum = 1;
    if($scope.leftToGo && ($scope.leftPageNum < allPageNum || $scope.leftPageNum == allPageNum)) {
      nowPageNum = $scope.leftPageNum;
    } else if($scope.leftToGo && $scope.leftPageNum > allPageNum) {
      nowPageNum = obj.total % 5 ? allPageNum + 1 : allPageNum;
    }
    settleConData(obj, $scope);
    pageFunWithParams($('#page1'), obj.total, 5, nowPageNum, function (n, type) {
      $scope.$broadcast('$connectPage', {pageNum: n});
      if (type == 'init' && nowPageNum == 1) return;
      // layer.load(2);
      $scope.pagenum = n
      $scope.matchitem = null;
      $scope.shopitemindex = -1;
      var jsonObj = {};
      jsonObj.pageSize = '5';
      jsonObj.pageNum = n + '';

      // jsonObj.shopId = $scope.selectshopinfo && $scope.selectshopinfo.ID ? $scope.selectshopinfo.ID : '';
      // if($scope.selectType == 'select') {
      //   jsonObj.shopId = $scope.selectshopinfo && $scope.selectshopinfo.ID ? $scope.selectshopinfo.ID : '';
      // } else {
      //   jsonObj.shopId = $scope.inputshopinfo && $scope.inputshopinfo.ID ? $scope.inputshopinfo.ID : '';
      // }
      
      jsonObj.shopId = $scope.inputshopinfo && $scope.inputshopinfo.ID ? $scope.inputshopinfo.ID : '';
      // jsonObj.userId = $scope.userId;
      jsonObj.search = $scope.searchinfoshop;
      $scope.shop = [];
      dsp.loadPercent($('.cj-load-wrap-left'), connectionPicHeight);
      dsp.postFun('platform-product/query/queryShopProducts', jsonObj, function (name) {
        dsp.closeLoadPercent($('.cj-load-wrap-left'));

        if (!name || !name.data) return setNoDataFn();
        const { code, data: obj } = name.data
        if (+code !== 200 || !obj ) return setNoDataFn();
        $scope.allshop = obj
        if (!obj.list.length || !obj.total) return setNoDataFn();

        settleConData(obj, $scope);
      })
    })
  });
}

// 处理店铺商品列表数据
function settleConData(obj, $scope) {
  for (var i = 0; i < obj.list.length; i++) {
    var str = obj.list[i].title;
    var arr = str.split(' ');
    var arr2;
    if (obj.list[i].tags) {
      arr2 = obj.list[i].tags.split(',');
    } else {
      arr2 = [];
    }
    var cla = [];
    var tagsarr = [];
    // obj.list[i].arr = arr;
    for (var j = 0; j < arr.length; j++) {
      var ob = {};
      ob.classname = arr[j];
      var num = j % 4;
      ob.classindex = num;
      ob.flag = false;
      cla.push(ob)
    }
    for (var j = 0; j < arr2.length; j++) {
      var ob = {};
      ob.tagname = arr2[j];
      var num = j % 4;
      ob.tagindex = num;
      ob.flag = false;
      tagsarr.push(ob)
    }
    obj.list[i].cla = cla;
    obj.list[i].tagsarr = tagsarr;
    obj.list[i].flag = false;
    // obj.list[i].win=false;
  }
  $scope.shop = obj.list;
}

// 获取关联商品变体详情
export function getTanData(dsp, $scope,callback) {
  layer.load(2);
  dsp.postFun('app/connection/detaill', { "data": JSON.stringify($scope.getDetailData) }, function (name) {
    layer.closeAll("loading")
    dsp.closeLoad();
    var obj = JSON.parse(name.data.result)
    for (var i = 0; i < obj.shopList.length; i++) {
      obj.shopList[i].flag = false;
    }
    for (var i = 0; i < obj.CJList.length; i++) {
      obj.CJList[i].flag = false;
    }
    $scope.shopCJ = obj;
    $scope.shopList = obj.shopList;
    $scope.CJList = obj.CJList
    $scope.tanchuang = true;
    $('#product-connection').height($(document).height());
    $('body').css('overflow', 'hidden');
    if(callback){
      callback();
    }
    dsp.getAreaByPid($scope.getDetailData.pid, function (data) {
      $scope.wareList = data;
      $scope.seleWare = data[0];
      //获取物流方式
      $scope.getWayData.aera = $scope.seleWare.countryCode;
      // dsp.postFun2('getWayBy.json', JSON.stringify($scope.getWayData), function (n) {
      //   $scope.wuliulist = n.data;
      // })
      $scope.chanSeleWare()
    })
  });
  
  $scope.chanSeleWare = function () {
    $scope.getWayData.aera = $scope.seleWare.countryCode;
    if($scope.matchcjitem&&$scope.matchcjitem.PRODUCTTYPE === "5"){
      dsp.getShipListSupplier({
        sku:$scope.matchcjitem.SKU,
        countryCode:$scope.seleWare.countryCode
      }, function (data) {
          $scope.wuliulist = data;
      });
      return
    }

    // sku 取变体
    const CJList = $scope.CJList || []
    const sku = CJList.map(item => item.SKU)

    dsp.getShipListNew({
      platForms: [$scope.getWayData.shopType],
      startCountryCode: $scope.getWayData.aera,
      weightInterval: $scope.getWayData.weight,
      propertys: $scope.getWayData.lcharacter.split(','),
      isSupplier: $scope.getWayData.isSupplier,
      sku,
    }, function (data) {
        $scope.wuliulist = data;
    });
  }
}

// 关联商品 点击店铺商品
export function tanShopProClick(val, num, item, $scope) {
  if(val){
    val.stopPropagation();
  }
  if ($scope.shopList.indexOf(item) < $scope.arr.length) {
    return false
  }
  if (item.flag == false) {
    if ($scope.first == false) {
      $scope.firstitem = item;
      item.flag = true
      $scope.orange = num;
      var item = $scope.shopList.splice(num, 1);
      $scope.shopList.splice($scope.arr.length, 0, item[0]);
      $scope.first = true;
    } else if ($scope.first == true) {
      return false;
    }
    if ($scope.last == true && $scope.first == true) {
      $scope.last = false;
      $scope.first = false;
      var obj = new Object();
      obj.first = $scope.firstitem
      obj.last = $scope.lastitem
      $scope.arr.push(obj)
      $scope.orange = null;
      $scope.orange2 = null;
    }
  } else {
    if ($scope.first == true && num >= ($scope.arr.length - 1)) {
      item.flag = false
      $scope.first = false
    }
    return false
  }
}

// 关联商品 点击cj商品
export function tanCjProClick(val, num, item, $scope) {
  if(val) {
    val.stopPropagation();
  }
  if ($scope.CJList.indexOf(item) < $scope.arr.length) {
    return false
  }
  if (item.flag == false) {
    if ($scope.last == false) {
      item.flag = true;
      $scope.lastitem = item;
      $scope.orange2 = num;
      var item = $scope.CJList.splice(num, 1);
      $scope.CJList.splice($scope.arr.length, 0, item[0]);
      $scope.last = true;
    } else if ($scope.last == true) {
      return false;
    }
    if ($scope.last == true && $scope.first == true) {
      $scope.last = false;
      $scope.first = false;
      var obj = new Object();
      obj.first = $scope.firstitem
      obj.last = $scope.lastitem
      $scope.arr.push(obj)
      $scope.orange = null;
      $scope.orange2 = null;
    }
  } else {
    if ($scope.last == true && num >= ($scope.arr.length - 1)) {
      item.flag = false
      $scope.last = false
    }
    return false;
  }
}

// 执行关联函数
export function goActConnect(dsp, $scope) {
  localStorage.setItem('connectedLevels', $scope.Levels)
  if ($scope.arr.length == 0) {
    layer.msg('Please select the products to be connected.');
    return;
  }
  if ($scope.wuliuway == undefined) {
    layer.msg('Please select the shipping method.');
    return;
  }
  var a = $scope.arr;
  var arr = [];
  var jsonObj = {};
  for (var i = 0; i < $scope.arr.length; i++) {
    var img = a[i].first.image;
    if (img == '') {
      img = $scope.matchitem.image
    }

    jsonObj.shopId = $scope.matchitem.shopId;
    jsonObj.accPid = a[i].first.product_id;
    jsonObj.accVid = a[i].first.vid;
    jsonObj.accSku = '';
    jsonObj.accPSku = '';
    jsonObj.accNameEn = $scope.matchitem.title;
    jsonObj.accHref = '';
    jsonObj.accPrice = '';
    jsonObj.Unit = '';
    jsonObj.Pid = a[i].last.PID;
    jsonObj.Vid = a[i].last.ID;
    jsonObj.PSku = ($scope.matchcjitem || $scope.sourceitem) ? ($scope.matchcjitem || $scope.sourceitem).SKU : '';
    jsonObj.Sku = a[i].last.SKU;
    jsonObj.NameEn = a[i].last.NAMEEN;
    jsonObj.sellPrice = '';
    jsonObj.costPrice = a[i].last.COSTPRICE + '';
    jsonObj.userId = $scope.userId;
    jsonObj.userName = '';
    jsonObj.logistics = $scope.wuliuway.nameEn;
    jsonObj.defaultArea = $scope.seleWare.areaId;
    jsonObj.accimgurl = img;
    jsonObj.accstandard = a[i].first.title;
    jsonObj.imgurl = a[i].last.IMG;
    jsonObj.standard = a[i].last.VARIANTKEY;
    jsonObj.packWeight = a[i].last.PACKWEIGHT + '';
    jsonObj.originStatus = $scope.connectStatus;

    arr.push(JSON.stringify(jsonObj));
    // arr.push(str);
  }
  var str2 = arr.join(",")

  var str3 = '{"data": [' + str2 + ']}'
  layer.load(2);
  dsp.postFun('app/connection/con', { "data": "[" + str2 + "]" }, function (n) {
    layer.closeAll('loading');
    var data = n.data;
    if (data.statusCode == '200') {
      $scope.sourcetanchuang = false;
      $scope.matchcjitem = null;
      $('body').css('overflow', 'auto');
      if ($scope.arr.length == $scope.shopList.length) {
        $scope.shop.splice($scope.shopitemindex, 1);
      }
      layer.msg("Connected Sccessfully");
      var parms = {
        type: '1',
        pid: jsonObj.Pid,
        shopid: $scope.matchitem.shopId,
        userid: $scope.userId
      }
      dsp.postFun('erp/publish/Calculation', parms, function() {})
      $scope.tanchuang = false;
      if ($scope.Service == '1') {
        var ShuArr = [];
        $scope.shopList.forEach(function (o, i) {
          if (o.flag && o.sku) {
            ShuArr.push({ sku: o.sku, vid: o.vid })
          }
        });
        if (ShuArr.length == 0) {
          $scope.tanchuang = false;
          return;
        }

        if ($scope.matchitem.shopType == 'shopify') {
          var parms = {
            "fulfillmentservice": "cjdropshipping",
            "inventoryManagement": $scope.Levels == '1' ? 'cjdropshipping' : null,
            "shopName": $scope.ShopName,
            "skus": JSON.stringify(ShuArr)
          };
          layer.load(2);
          dsp.postFun('app/fulfillment/addProductToFulfillment', parms, function (res) {
            layer.closeAll('loading');
            if (res.data.statusCode == 200) {
              //layer.msg(res.data.result);
              $scope.tanchuang = false;
            }
          })
        }
      } else {
        $scope.tanchuang = false;
      }
    } else if (data.statusCode == 808) {
      layer.msg("System is busy, please try it again in 10 - 20 seconds.");
    } else {
      layer.msg("Connect failed");
    }
  });
}
