import { goGetShopPro, getTanData, tanShopProClick, tanCjProClick, goActConnect } from './connection-common';
import { pageFunWithParams } from '@src/pages/mycj/mycj-common';

// components
import { syncProductModal } from '@src/components/syncProductModal'

export function connectionPendingFactory(angular) {
  const app = angular.module('connection-pending.module', []);
  const connectionPicHeight = 520;

  // load components
  syncProductModal(app)

  app.controller('connection-pending.ctrl', ['$scope', '$rootScope', '$stateParams', 'dsp',
    function ($scope, $rootScope, $stateParams, dsp) {
      $scope.isAutoCone = true;
      var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
      if (vip == '1') {//vipFlag
        $('.mycj-right-wrap').css('background', '#F0EDE7');
        dsp.beforeSearchPicVIP($('.cj-load-wrap-right'), connectionPicHeight);
      } else {
        $('.mycj-right-wrap').css('background', '#f2f3f5');
        dsp.beforeSearchPic($('.cj-load-wrap-right'), connectionPicHeight);
      }
      dsp.setRightMinHeight();
      $('#product-connection').css('height', $(document).height() + 'px');
      var base64 = new Base64();
      $scope.userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
      var searFromOrder;
      if ($stateParams.searchstr) {
        searFromOrder = base64.decode($stateParams.searchstr);
      } else {
        searFromOrder = '';
      }
      $scope.getWayData = {};
      $scope.getDetailData = {};
      if ($stateParams.mcInfo) {
        $scope.manualConnectInfo = JSON.parse(base64.decode($stateParams.mcInfo));
        $scope.connect2 = function (item) {
          $scope.arr = [];
          $scope.getWayData.weight = $scope.manualConnectInfo.packWeight;
          $scope.getWayData.lcharacter = $scope.manualConnectInfo.propertyKey;
          $scope.getDetailData.productId = $scope.manualConnectInfo.storePid;
          $scope.getDetailData.pid = $scope.manualConnectInfo.pId;
          $scope.getDetailData.shopId = $scope.manualConnectInfo.shopId;
          getTanData(dsp, $scope);
        }
        $scope.connect2();
      }

      // 将上面导航栏存入变量
      var shopId, pid;
      // 将上面导航栏存入变量
      $scope.tanchuang = false;
      $scope.orange = null;
      $scope.orange2 = null;
      $scope.first = false;
      $scope.last = false;
      $scope.matchitem = null;
      $scope.firstitem = null;
      $scope.lastitem = null;
      //信息查询输入框
      $scope.searchinfoarr = [];
      $scope.searchinfostr = $stateParams.cjsku?base64.decode($stateParams.cjsku):'';
      $scope.souresearchinfo = '';
      $scope.arr = [];
      $scope.sourceitem = null;
      $scope.sourcetanchuang = false;
      $scope.yunfeicountrystr = '';
      $scope.selectshopstr = '';
      $scope.searchinfoshop = searFromOrder || '';
      $scope.classarr = ['yellow-bg', 'green-bg', 'pink-bg', 'blue-bg'];
      $scope.shop = [];
      $scope.specificSyncStore = {}; // 高级同步店铺名
      $scope.startTime = ''; // 高级同步开始时间
      $scope.endTime = ''; // 高级同步结束时间
      $scope.productName = ''; // 高级同步商品名称
      $scope.showspecificSync = false; // 是否弹出高级同步弹窗
      $scope.showUpdateGuide = false; // 更新引导
      $scope.showProductName = true; // 是否显示商品名称，shopee和Lazada店铺不显示
      $scope.showProductSKU = false; // 是否显示商品SKU，Lazada店铺显示
      $scope.showSelectDate = true; // 是否显示时间筛选， ebay店铺不支持
      $scope.leftPageNum = 1; // 左边页码
      $scope.rightPageNum = 1; // 右边页码
      $scope.leftToGo = false; // 走遍是否to go
      $scope.SKUList = ['']; // 高级同步输入的sku数组

      const UpdateGuideType = localStorage.getItem('UpdateGuideType');
      if(UpdateGuideType == 1) {
        $scope.showUpdateGuide = false;
      } else {
        $scope.showUpdateGuide = true;
      }
      $scope.invalidShopMessage = JSON.parse(localStorage.getItem('invalidShopMessage'));


      //初始化数据
      function getListLeft(search) {
        goGetShopPro(dsp, $scope, vip, search);
      }

      $scope.getListLeft = function (search) {
        getListLeft(search);
      }
      // dsp.addNodataPic($('.cj-load-wrap-right'), connectionPicHeight);
      
      //下拉框选项
      dsp.postFun('app/shop/getshop', { "data": "{'userId':'" + $scope.userId + "'}" }, getshop);
      $scope.hasshopdata = false;

      function getshop(n) {
        var obj = JSON.parse(n.data.result);
        let list = obj.shoplist.map(item=>{
          item.NAME = item.storeCountry?`${item.NAME} - ${item.TYPE} - ${item.storeCountry}`:`${item.NAME} - ${item.TYPE}`;
          return item;
        });
        list = list.filter(f => f.TYPE != 'api'); // 0702产品要求过滤掉api
        $scope.shopselectlist = list.slice();
        $scope.shopinputlist = list.slice();
        $scope.shopselectlist.unshift({NAME:'Select Store',ID:''});
        $scope.shopinputlist.unshift({NAME:'All Stores',ID:''});

        // $scope.selectshopinfo = '';
        $scope.selectshopinfo = $scope.shopselectlist[0];
        $scope.inputshopinfo = $scope.shopinputlist[0];
        $scope.specificSyncStore = $scope.specificSyncStore[0];
        if($scope.specificSyncStore && ($scope.specificSyncStore.TYPE == 'shopee' || $scope.specificSyncStore.TYPE == 'Lazada')) {
          $scope.showProductName = false;
        } else {
          $scope.showProductName = true;
        }
        if($scope.specificSyncStore && $scope.specificSyncStore.TYPE == 'ebay') {
          $scope.showSelectDate = false;
          $scope.startTime = '';
          $scope.endTime = '';
        } else {
          $scope.showSelectDate = true;
        }
        if($scope.specificSyncStore && $scope.specificSyncStore.TYPE == 'Lazada') {
          $scope.showProductSKU = true;
          $scope.productName = '';
        } else {
          $scope.showProductSKU = false;
          $scope.SKUList = [''];
        }
        if($scope.invalidShopMessage){
          $scope.searchinfoshop = searFromOrder || $scope.invalidShopMessage.storeTitle
          const store = $scope.shopselectlist.find(item => {
            return item.NAME.indexOf($scope.invalidShopMessage.shopName)>=0 && item.NAME.indexOf($scope.invalidShopMessage.platForm)>=0
          })
          $scope.selectshopinfo = store ? store : $scope.shopselectlist[0];
          $scope.shopProductId = $scope.invalidShopMessage.shopProductId || ''
          setTimeout(()=>{
            $scope.searchshopcommodity($scope.selectshopinfo)
          },0)
          localStorage.removeItem('invalidShopMessage')
        } else {
          getListLeft();
        }
        $scope.syncshopcommodity($scope.selectshopinfo);
      }

      //刷新信息
      // checkIsEbayInsynn(dsp, $scope);
      // $scope.renovation = function () {
      //   goActSyncShopPro(dsp, $scope);
      // }
      $scope.$on('syncstoresuccess', function () {
        $scope.getListLeft();
      })


      $scope.ifMatch = true;
      //下拉获取店铺信息之后进行商品筛选
      $scope.selectshopstr = '';
      $scope.searchshopcommodity = (n, type) => {
        $scope.matchitem = null;
        $scope.shopitemindex = -1;
        if (n == null) {
          n = '';
        }
        $scope.inputshopinfo = n;
        getListLeft('search');
        $scope.selectshopstr = n;
        $scope.selectType = type;
      }

      $scope.syncshopcommodity = (n) => {
        $scope.storeinfo = n;
        $scope.$broadcast('currStoreId', n);
      }

      //搜索店铺
      $scope.searchshop = function () {
        $scope.matchitem = null;
        $scope.shopitemindex = -1;
        getListLeft('search');
      }
      $scope.enterSearchLeft = function (event) {
        if (event.keyCode == 13) {
          $scope.searchshop();
        }
      }
      $scope.seaConResFun = function () {
        var seachCs = encodeURI($scope.searchinfoshop);
        location.href = "#/products-connection/connected/" + seachCs
      }
      //获取搜索信息
      $scope.searchinfo = function (item, index, index2) {
        $scope.shop[index].cla[index2].flag = true;
        if ($scope.searchinfostr.indexOf(item.classname) == -1) {
          if ($scope.searchinfostr.substr($scope.searchinfostr.length - 1, 1) == ' ') {
            // alert('空格')
          } else {
            $scope.searchinfostr = $scope.searchinfostr + ' ';
          }
          $scope.searchinfostr += item.classname;
          $scope.searchinfostr = $scope.searchinfostr.trim() + ' ';
        }
      }
      $scope.searchinfo2 = function (item, index, index2) {
        $scope.shop[index].tagsarr[index2].flag = true;
        if ($scope.searchinfostr.indexOf(item.tagname) == -1) {
          if ($scope.searchinfostr.substr($scope.searchinfostr.length - 1, 1) == ' ') {
            // alert('空格')
          } else {
            $scope.searchinfostr = $scope.searchinfostr + ' ';
          }
          $scope.searchinfostr += item.tagname;
          $scope.searchinfostr = $scope.searchinfostr.trim() + ' ';
        }
      }
      //删除搜索信息
      $scope.deletesearchinfo = function (item, $event, index, index2) {
        $event.stopPropagation();//禁止事件冒泡
        $scope.shop[index].cla[index2].flag = false;
        var str = $scope.searchinfostr;
        $scope.searchinfostr = str.replace(item.classname, '')

      }
      $scope.deletesearchinfo2 = function (item, $event, index, index2) {
        $event.stopPropagation();//禁止事件冒泡
        $scope.shop[index].tagsarr[index2].flag = false;
        var str = $scope.searchinfostr;
        $scope.searchinfostr = str.replace(item.tagname, '')
      }

      // 右侧跳页
      const rifhtToGo = () => {
        const allPageNum = $scope.cjProTotalNum && parseInt($scope.cjProTotalNum / 5) || 1;
        if($scope.rightPageNum > allPageNum) {
          $scope.rightPageNum = $scope.cjProTotalNum % 5 ? allPageNum+1 :  allPageNum;
        }
        pageFunWithParams($("#page2"), $scope.cjProTotalNum, 5, $scope.rightPageNum, function (n, type) {
          $scope.rightPageNum = n;
          if (type == 'init' && n == 1) return;
          // layer.load(2);
          // dsp.load();
          $scope.pagenum2 = n;
          var str;
          if ($scope.searchByPart) {
            str = $scope.searchinfostr.replace(/'/g, "''").replace(/ /g, ',');
          } else {
            str = $scope.searchinfostr.replace(/'/g, "''");
          }
          var jsonObj = {};
          jsonObj.pageSize = '5';
          jsonObj.pageNum = n + '';
          // jsonObj.shopId = $scope.selectshopstr;
          jsonObj.userId = $scope.userId;
          jsonObj.search = str;
          $scope.shop2 = [];
          $scope.shop2Source = false;
          dsp.postFun('app/connection/CJList', { "data": JSON.stringify(jsonObj) }, function (name) {
            var obj = JSON.parse(name.data.result);
            $scope.shop2 = obj.root;
            $scope.shop2Source = $scope.shop2.length==0;
          });
        })
      }

      // 初始化右侧数据
      function getListRight(type) {
        // dsp.load();
        var str;
        if ($scope.searchByPart) {
          str = $scope.searchinfostr.replace(/'/g, "''").replace(/ /g, ',');
        } else {
          str = $scope.searchinfostr.replace(/'/g, "''");
        }
        var jsonObj = {};
        jsonObj.pageSize = '5';
        jsonObj.pageNum = '1';
        // jsonObj.shopId = $scope.selectshopstr;
        jsonObj.userId = $scope.userId;
        jsonObj.search = str;
        $scope.shop2Source = false;
        $scope.shop2 = [];
        $rootScope.$on('app/connection/CJList', (_, bool) => $scope.loading = bool);
        dsp.postFun('app/connection/CJList', { "data": JSON.stringify(jsonObj) }, function (name) {
          // dsp.closeLoad();
          var obj = JSON.parse(name.data.result);
          if (obj.totalProperty == 0) {
            $scope.shop2Source = true;
            $scope.shop2 = [];
            // dsp.addNodataPic($('.cj-load-wrap-right'), connectionPicHeight);
            if(type == 'search') {
              if(vip == 1) {
                dsp.afterSearchPicVIP($('.cj-load-wrap-right'), connectionPicHeight);
              } else {
                dsp.afterSearchPic($('.cj-load-wrap-right'), connectionPicHeight);
              }
            } else if(vip == 1) {
              dsp.beforeSearchPicVIP($('.cj-load-wrap-right'), connectionPicHeight);
            } else {
              dsp.beforeSearchPic($('.cj-load-wrap-right'), connectionPicHeight);
            }
            $scope.cjProTotalNum = 0;
            $scope.hasCjProData = false;
            return false;
          }
          dsp.removeNodataPic($('.cj-load-wrap-right'));
          $scope.hasCjProData = true;
          $scope.shop2 = obj.root;
          $scope.shop2Source = $scope.shop2.length==0;
          $scope.cjProTotalNum = obj.totalProperty;
          // pageFunWithParams($("#page2"), obj.totalProperty, 5, 1, function (n, type) {
          //   if (type == 'init') return;
          //   // layer.load(2);
          //   // dsp.load();
          //   $scope.pagenum2 = n;
          //   var str;
          //   if ($scope.searchByPart) {
          //     str = $scope.searchinfostr.replace(/'/g, "''").replace(/ /g, ',');
          //   } else {
          //     str = $scope.searchinfostr.replace(/'/g, "''");
          //   }
          //   var jsonObj = {};
          //   jsonObj.pageSize = '5';
          //   jsonObj.pageNum = n + '';
          //   // jsonObj.shopId = $scope.selectshopstr;
          //   jsonObj.userId = $scope.userId;
          //   jsonObj.search = str;
          //   $scope.shop2 = [];
          //   $scope.shop2Source = false;
          //   dsp.postFun('app/connection/CJList', { "data": JSON.stringify(jsonObj) }, function (name) {
          //     var obj = JSON.parse(name.data.result);
          //     $scope.shop2 = obj.root;
          //     $scope.shop2Source = $scope.shop2.length==0;
          //   });
          // })
          rifhtToGo();
        });
      }

      //搜索
      $scope.hasCjProData = false;
      $scope.search = function () {
        // layer.load(2);
        $scope.searchByPart = false;
        getListRight('search');
        $scope.matchResult = true;
        $scope.ifMatch = false;
      }
      $scope.enterSearchRight = function (event) {
        if (event.keyCode == 13) {
          $scope.search();
        }
      }
      $scope.cancle = function (index) {
        // $scope.shop[index].flag=false;
        $scope.shop[index].win = false;
        // $scope.matchitem = null;
      }
      //match3
      $scope.likeImgArr = []
      $scope.match3 = function (index, item) {
        if (item.flag == false) {
          $scope.matchitem = item;
          $scope.shopitemindex = index;
          for (var i = 0; i < $scope.shop.length; i++) {
            $scope.shop[i].flag = false
          }
          $scope.shop[index].flag = true;
        } else {
          $scope.shop[index].flag = false;
          $scope.matchitem = null;
          $scope.shopitemindex = -1;
        }
      }

      /**同步店铺高级搜索初始化 */
      $scope.initSyncCallback = function(advancedSearch){
        $scope.advancedSearch = advancedSearch
      }

      

      //match6
      $scope.match6 = function (item, index) {
        if (item.flag == false) {
          $scope.matchitem = item;
          $scope.shopitemindex = index;
          for (var i = 0; i < $scope.shop.length; i++) {
            $scope.shop[i].flag = false
          }
          // $scope.shop[index].flag = true;
        } else {
          // $scope.shop[index].flag = false;
          $scope.matchitem = null;
          $scope.shopitemindex = -1;
        }
        let image;
        if (item.image.includes('?')) {
          image = item.image.substring(0, item.image.indexOf("?"));
        } else {
          image = item.image
        }
        // alert('13123')
        layer.load()
        const formData = new FormData();
        formData.append('imgUrl', image);
        dsp.postFun(
          'app/picture/searchProduct',
          formData,
          res => {
            if (res.data.statusCode == 200) {
              layer.closeAll('loading');
              const resData = JSON.parse(res.data.result);
              if (resData.totalProperty == 0) {
                $scope.shop2 = [];
                // 搜索后
                // dsp.addNodataPic($('.cj-load-wrap-right'), connectionPicHeight);
                dsp.afterSearchPic($('.cj-load-wrap-right'), connectionPicHeight);
                $scope.cjProTotalNum = 0;
                $scope.hasCjProData = false;
                return false;
              }
              dsp.removeNodataPic($('.cj-load-wrap-right'));
              $scope.hasCjProData = true;
              $scope.matchResult = true;
              $scope.shop2 = resData.root;
              $scope.cjProTotalNum = resData.totalProperty;
              // pageFunWithParams($("#page2"), resData.totalProperty, 5, 1, function (n, type) {
              //   if (type == 'init') return;
              //   // layer.load(2);
              //   // dsp.load();
              //   $scope.pagenum2 = n;
              //   var str;
              //   if ($scope.searchByPart) {
              //     str = $scope.searchinfostr.replace(/'/g, "''").replace(/ /g, ',');
              //   } else {
              //     str = $scope.searchinfostr.replace(/'/g, "''");
              //   }
              //   var jsonObj = {};
              //   jsonObj.pageSize = '5';
              //   jsonObj.pageNum = n + '';
              //   // jsonObj.shopId = $scope.selectshopstr;
              //   jsonObj.userId = $scope.userId;
              //   jsonObj.search = str;
              //   $scope.shop2 = [];
              //   $scope.shop2Source = false;
              //   dsp.postFun('app/connection/CJList', { "data": JSON.stringify(jsonObj) }, function (name) {
              //     var obj = JSON.parse(name.data.result);
              //     $scope.shop2 = obj.root;
              //     $scope.shop2Source = $scope.shop2.length==0;
              //   });
              // })
              rifhtToGo();
            } else {
              $scope.shop2 = []
              layer.closeAll('loading');
              // dsp.addNodataPic($('.cj-load-wrap-right'), connectionPicHeight);
              dsp.afterSearchPic($('.cj-load-wrap-right'), connectionPicHeight);
              $scope.hasCjProData = false;
              return layer.msg('Searching Failed. Images must be JPG or PNG.');
            }
          },
          err => console.error(error),
          {
            headers: {
              'Content-Type': undefined
            },
            // layer2: true
          }
        );
      }

      

      //match2
      $scope.match2 = function (index, item) {
        $scope.matchitem = item;
        $scope.shopitemindex = index;
        for (var i = 0; i < $scope.shop.length; i++) {
          $scope.shop[i].win = false
        }
        $scope.shop[index].win = true;
        for (var i = 0; i < $scope.shop.length; i++) {
          $scope.shop[i].flag = false
        }
        $scope.shop[index].flag = true;
      }
      //match
      $scope.match = function (val, index) {
        $('#product-connection').attr('display', 'block');
        $scope.matchitem = val;
        $scope.shopitemindex = index;
        shopId = val.pid;
        $scope.matchResult = true;
        $scope.ifMatch = false;
        var str = $scope.searchinfostr.replace(/'/g, "''").replace(/ /g, ',');
        $scope.searchByPart = true;
        getListRight('search');
      }

      $scope.closetanchuang = function () {
        $('body').css('overflow', 'auto');
        $scope.arr = [];
        $scope.first = false;
        $scope.last = false;
        for (var i = 0; i < $scope.shopList.length; i++) {
          $scope.shopList[i].flag = false;
        }
        for (var i = 0; i < $scope.CJList.length; i++) {
          $scope.CJList[i].flag = false;
        }
        $scope.tanchuang = false;
        $scope.matchcjitem = null;
      }
      // 关联店铺


      $scope.formateVariantkey = (val) => {
        const str = String(val).replace(/\s/g, ';');
        return str;
      }
      $scope.formateVariantkeyNew = (val) => {
        const str = '-' + String(val).replace(/\s/g, '-');
        return str;
      }



      //connect
      $scope.connect = function (item) {
        $scope.matchcjitem = item;
        pid = item.ID;
        // $scope.arr=[];
        if (!$scope.matchitem) {
          layer.msg('Please select a product you want to connect in your store. ');
          return;
        }
        if ($scope.matchitem.shopType != 'shopify' && $scope.matchitem.shopTyp != 'Woocommerce' && !item.customeDesign && item.customMessage) {
          layer.msg('Unfortunately, The POD products are only available to be connected to Shopify currently.', {
            time: 6000
          });
          return;
        }
        $scope.arr = [];
        $scope.getWayData.isSupplier = [5, '5'].includes(item.PRODUCTTYPE) ? 1 : 0
        $scope.getWayData.sku = item.SKU
        $scope.getWayData.weight = item.packweight;
        $scope.getWayData.lcharacter = item.PROPERTYKEY;
        $scope.getWayData.shopType = $scope.matchitem.shopType;
        $scope.getDetailData.productId = $scope.matchitem.pid;
        $scope.getDetailData.pid = pid;
        $scope.getDetailData.shopId = $scope.matchitem.shopId;
        $scope.storeSku = '',$scope.cjSku = '',$scope.cjVARIANTKEY = '',$scope.storeTitle = '';
        getTanData(dsp, $scope,$scope.matchRecommendation);
        //
        $scope.isLevels = true;
        $scope.Service = '1';
        $scope.Levels = localStorage.getItem('connectedLevels') || '1';
        $scope.ShopName = $scope.matchitem.shopName;
        if ($scope.matchitem.shopType == 'shopify') {
          const shopList = $scope.shopselectlist.filter(item => item.ID == $scope.matchitem.shopId);
          $scope.syncInventory = shopList[0].sync_inventory;
          if (!$scope.syncInventory) {
            $scope.Service = '0'
            $scope.isLevels = false;
          }
        }
      }

      //获取物流方式
      $scope.getwuliuway = function (wuliuway) {
        $scope.wuliuway = wuliuway;
        $scope.remark = wuliuway ? wuliuway.remark : '';
      }
      $scope.clearMatchValue = function(){
        $scope.storeSku = '',$scope.cjSku = '',$scope.cjVARIANTKEY = '',$scope.storeTitle = '';
      }
      $scope.matchRecommendation = function (val,originWord,targetWord,matchType) {
        var matchRecommendationNum = 0
        for (var i = 0; i < $scope.shopList.length; i++) {
          var item1 = $scope.shopList[i].sku
          for (var j = 0; j < $scope.CJList.length; j++) {
            var item2 = $scope.CJList[j].SKU
            if(originWord){
              if(matchType==0){
                item1 = $scope.ruleSize(item1)
                item2 = $scope.ruleSize(item2.replace(targetWord,originWord))
              }else if(matchType==1){
                item1 = $scope.ruleSize(item1)
                item2 = originWord + $scope.ruleSize($scope.formateVariantkeyNew($scope.CJList[j].VARIANTKEY))
              }else if(matchType==2){
                item1 = $scope.shopList[i].product_id + $scope.ruleSize($scope.formateVariantkeyNew($scope.shopList[i].title))
                item2 = originWord + $scope.ruleSize($scope.formateVariantkeyNew($scope.CJList[j].VARIANTKEY))
              }else if(matchType==3){
                item1 = $scope.shopList[i].product_id + $scope.ruleSize($scope.formateVariantkeyNew($scope.shopList[i].title))
                item1 = item1.replace(targetWord,'')
                item2 = originWord + $scope.ruleSize($scope.formateVariantkeyNew($scope.CJList[j].VARIANTKEY))
              }
            }
            if(item1 && item2 && item1 == item2){
              if(!$scope.shopList[i].flag && !$scope.CJList[j].flag) {
                tanShopProClick(val, i, $scope.shopList[i], $scope);
                tanCjProClick(val, j, $scope.CJList[j], $scope);
                matchRecommendationNum = matchRecommendationNum + 1
                continue;
              }
            }
          }
        }
        if(matchRecommendationNum==0){
          // layer.msg(matchRecommendationNum+' matched.');
        }else{
          layer.msg(matchRecommendationNum+' SKU automatic matched by CJ AI, please check if the system did it correctly.');
        }
        // $scope.clearMatchValue()
      }
      $scope.tryMatchRecommendation = function(val){
        var needMatchValue = $scope.cjSku.substring($scope.cjSku.indexOf("-"))
        var storeSkuMatchValue = $scope.ruleSize($scope.storeSku.substring($scope.storeSku.indexOf("-")))
        if($scope.ruleSize(needMatchValue) == $scope.ruleSize(storeSkuMatchValue)){
          $scope.matchRecommendation(val,$scope.storeSku.substring(0,$scope.storeSku.indexOf("-")),$scope.cjSku.substring(0,$scope.cjSku.indexOf("-")),0)
        }else {
          needMatchValue = $scope.ruleSize($scope.cjVARIANTKEY)
          if(needMatchValue == storeSkuMatchValue){
            $scope.matchRecommendation(val,$scope.storeSku.substring(0,$scope.storeSku.indexOf("-")),$scope.cjSku.substring(0,11),1)
          }else {
            storeSkuMatchValue = $scope.ruleSize($scope.storeTitle)
            if(needMatchValue == storeSkuMatchValue){
              $scope.matchRecommendation(val,$scope.storePid,$scope.cjSku.substring(0,11),2)
            }else{
              var tempArray = needMatchValue.split('-');
              var tempStr = storeSkuMatchValue
              for (var i=0;i<tempArray.length ;i++ ){
                if(!tempArray[i]==''){
                  tempStr = tempStr.replace('-'+tempArray[i],'')
                }
              }
              if(!needMatchValue == '' && storeSkuMatchValue.replace(tempStr,'') == needMatchValue){
                $scope.matchRecommendation(val,$scope.storePid,tempStr,3)
              }
            }
          }
        }
        $scope.clearMatchValue()
      }
      $scope.ruleSize = function(val){
        var ruleProcessValue =''
        if(val.indexOf("5XL")!=-1){
          ruleProcessValue = val.replace("5XL","XXXXXL")
        }else if(val.indexOf("4XL")!=-1) {
          ruleProcessValue = val.replace("4XL", "XXXXL")
        }else if(val.indexOf("3XL")!=-1) {
          ruleProcessValue = val.replace("3XL", "XXXL")
        }else if(val.indexOf("2XL")!=-1) {
          ruleProcessValue = val.replace("2XL", "XXL")
        }else {
          ruleProcessValue = val
        }
        return ruleProcessValue
      }

      //关联商品的第一次点击
      $scope.firstclick = function (val, num, item) {
        const isShow = item.flag
        tanShopProClick(val, num, item, $scope);
        const changShow = item.flag
        if(isShow && !changShow){
          $scope.clearMatchValue()
        }
        if(item.sku && !isShow && changShow) {
          $scope.storeSku = item.sku
          $scope.storeTitle = $scope.formateVariantkeyNew(item.title)
          $scope.storePid = item.product_id
          if($scope.cjSku !=''){
            $scope.tryMatchRecommendation(val)
          }
        }
      }
      //关联商品的第二次点击
      $scope.lastclick = function (val, num, item) {
        const isShow = item.flag
        tanCjProClick(val, num, item, $scope);
        const changShow = item.flag
        if(isShow && !changShow){
          $scope.clearMatchValue()
        }
        if(item.SKU && !isShow && changShow){
          $scope.cjSku = item.SKU
          $scope.cjVARIANTKEY = $scope.formateVariantkeyNew(item.VARIANTKEY)
          if($scope.storeSku !=''){
            $scope.tryMatchRecommendation(val)
          }
        }
      }
      //取消关联
      $scope.Unlink = function (index) {
        $scope.arr.splice(index, 1);
        $scope.shopList[index].flag = false;
        $scope.CJList[index].flag = false;
        var item1 = $scope.shopList.splice(index, 1);
        var item2 = $scope.CJList.splice(index, 1);
        $scope.shopList.push(item1[0]);
        $scope.CJList.push(item2[0]);
      }
      //点击提交
      $scope.goon = function () {
        $scope.connectStatus = '0';
        goActConnect(dsp, $scope);
      }

      // 打开高级同步弹窗
      $scope.handleSpecificSync = () => {
        $scope.specificSyncStore = $scope.selectshopinfo;
        $scope.showspecificSync = true;
        $scope.handleSelectSpecificSyncStore($scope.specificSyncStore);
      }

      // 下拉选择店铺
      $scope.handleSelectSpecificSyncStore = (val) => {
        const { TYPE } = val;
        if(TYPE == 'shopee' || TYPE == 'Lazada') {
          $scope.showProductName = false;
        } else {
          $scope.showProductName = true;
        }
        if(TYPE == 'ebay') {
          $scope.showSelectDate = false;
          $scope.startTime = '';
          $scope.endTime = '';
        } else {
          $scope.showSelectDate = true;
        }
        if(TYPE == 'Lazada') {
          $scope.showProductSKU = true;
          $scope.productName = '';
        } else {
          $scope.showProductSKU = false;
          $scope.SKUList = [''];
        }
      }

      // 关闭高级同步
      $scope.handleCancelSync = () => {
        $scope.specificSyncStore = {};
        $scope.startTime = '';
        $scope.endTime = '';
        $scope.productName = '';
        $scope.showspecificSync = false;
        $scope.SKUList = [''];
      }

      // 高级同步事件
      $scope.handleSpecificSyncConfirm = () => {
        const { ID } = $scope.specificSyncStore;
        if(!ID) {
          return layer.msg('Please select a store first!');
        }
        if(!$scope.startTime && $scope.endTime){
          return layer.msg('Please enter start date.');
        }
        if(!$scope.endTime && $scope.startTime){
          return layer.msg('Please enter end date.');
        }
        
        const start = new Date($scope.startTime).getTime();
        const end = new Date($scope.endTime).getTime();
        if(start > end) {
          $scope.startTime = '';
          $scope.endTime = '';
          return layer.msg('End date cannot be earlier than start date.');
        }
        if($scope.specificSyncStore && $scope.specificSyncStore.TYPE == 'shopee' && $scope.endTime && end - start > 1000*3600*24*15) {
          $scope.startTime = '';
          $scope.endTime = '';
          return layer.msg('Time span should be no more than 15 days. Please select it again.');
        }
        const new_startTime = $scope.startTime ? `${$scope.startTime} 00:00:00` : ''; // 后端要求这样传
        const new_endTime = $scope.endTime ? `${$scope.endTime} 23:59:59` : ''; // 后端要求这样传

        let productName = $scope.productName;
        if($scope.specificSyncStore.TYPE == 'Lazada') {
          productName = $scope.SKUList.join();
        }
        
        const params = {
          startTime: new_startTime,
          endTime: new_endTime,
          productId: '',
          productName: productName,
          shopId: ID
        }
        const msgLoading = cjMessage.loading({ isFixed: true });
        dsp.postFun('platform-product/pull/pullShopProducts', params, (response) => {
          msgLoading.hide();
          const { code, data, message } = response.data;
          const customCodeMsg = ['30001', '30002', 30002, 30001];
          const outMsg = msg => layer.msg(msg);
          if(customCodeMsg.includes(code)) return outMsg(message || 'Sync Failed');
          const errMsg = {
            20007: 'Failed to get product',
            20000: 'Sync in progress... Please be patient',
            5000:'Wrong request parameter',
            5001:"You haven't bound the store yet",
            5002:'Data update failed'
          };
        if (Object.keys(errMsg).includes(code + '')) return outMsg(errMsg[code]);
        if(code != 200) return outMsg('Sync Failed');
        $scope.$broadcast('$showProgressBar', { 
          selectshopinfo: $scope.specificSyncStore 
        });
        $scope.handleCancelSync();
          // if(code == 200) {
          //   layer.msg('Synced Successfully');
          //   $scope.handleCancelSync();
          // } else {
          //   layer.msg(message);
          // }
        }, () => {
          // 容错处理
          msgLoading.hide();
          layer.msg('The server is busy now. Please try it later. ');
        })
      }

      // 跳页输入
      $scope.numberInput = (type, num) => {
        if(type == 'left') {
          $scope.leftToGo = true; // 左遍是否to go
        }
      }

      // 跳页
      $scope.changeFun = (type) => {
        if(type == 'left') {
          getListLeft();
        } else if(type == 'right' && $scope.rightPageNum == 1) {
          getListRight();
        } else if(type == 'right' && $scope.rightPageNum != 1) {
          rifhtToGo();
        }
      }

      $scope.$on('$connectPage', (d,data) => {
        const { pageNum } = data;
        $scope.leftPageNum = pageNum;
      })

      $scope.$on('syncSuccess', (d, data) => {
        $scope.$broadcast('$showProgressBar', { 
          selectshopinfo: $scope.selectshopinfo 
        });
      })

      $scope.$on('hideProgress', (d, data) => {
        getListLeft('search');
      })

      $scope.handleCloseGuide = () => {
        $scope.showUpdateGuide = false;
        localStorage.setItem('UpdateGuideType', 1);
      }

      $scope.$on('$syncSuccess', (d, data) => {
        getListLeft('search');
      })

      $scope.handleAddSKU = () => {
        $scope.SKUList.unshift('');
      }

      $scope.handleReduceSKU = (i) => {
        const len = $scope.SKUList.length;
        if(len == 1) return ;
        $scope.SKUList.splice(i, 1)
      }
      
      }]);

  return app;
}
