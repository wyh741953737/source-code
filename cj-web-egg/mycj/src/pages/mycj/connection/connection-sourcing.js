import { goGetShopPro, getTanData, tanShopProClick, tanCjProClick, goActConnect } from './connection-common';
import { pageFunWithParams } from '@src/pages/mycj/mycj-common';

// components
import { syncProductModal } from '@src/components/syncProductModal'

export function connectionSourcingFactory(angular) {
  const app = angular.module('connection-sourcing.module', []);
  const connectionPicHeight = 520;

   // load components
   syncProductModal(app)

  app.controller('connection-sourcing.ctrl', ['$scope', '$location', '$stateParams', 'dsp',
    function ($scope, $location, $stateParams, dsp) {
      var curPath = $location.path();
      console.log("curPath",curPath)
      var postUrlLeft;
      if (curPath.indexOf('/products-connection/sourcing-connection') != -1) {
        $scope.connectType = 0;
        postUrlLeft = 'app/connection/sourcecjlist';
      }
      if (curPath.indexOf('/products-connection/service-connection') != -1) {
        $scope.connectType = 1;
        postUrlLeft = 'pojo/product/getServiceProcuctCj';
      }
      if ($stateParams.searchstr) {
        $scope.searchinfosource = $stateParams.searchstr;
      } else {
        $scope.searchinfosource = '';
      }
      $scope.isSourceCon = true;
      var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
       // 是否是vip
      $scope.isVip = () => !!vip && +vip > 0
      if (vip == '1') {//vipFlag
        $('.mycj-right-wrap').css('background', '#F0EDE7');
      } else {
        $('.mycj-right-wrap').css('background', '#f2f3f5');
      }
      dsp.setRightMinHeight();
      $('#sourcing-connection').css('height', $(document).height() + 'px');
      var base64 = new Base64();
      $scope.userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));

      $scope.formateVariantkey = (val) => {
        const str = String(val).replace(/\s/g, ';');
        return str;
      }

      // 将上面导航栏存入变量
      $scope.tanchuang = false;
      //
      $scope.orange = null;
      $scope.orange2 = null;
      $scope.first = false;
      $scope.last = false;
      // {storePid: "987644657700", shopId: "7CE4F25E-C441-411B-AA38-310D75EA23ED", pId: "10F8F114-77C4-4B5C-B9A1-0918B379583D", packWeight: "530.0 -- 6030.0", propertyKey: "COMMON"}
      var routeParam = null
      try {
        const scInfo = sessionStorage.getItem('connection-scInfo');
        if(scInfo) routeParam = JSON.parse(scInfo);
        if($stateParams.scInfo) routeParam = JSON.parse(base64.decode($stateParams.scInfo)); // 选中店铺商品
        
      } catch (err) {
        console.log(err)
      }
      $scope.$on("$destroy", function() {
        // 关闭页面时要做的事
        sessionStorage.removeItem('connection-scInfo');
      })
      // $scope.matchitem = routeParam;
      $scope.firstitem = null;
      $scope.lastitem = null;
      //信息查询输入框
      $scope.searchinfoarr = [];
      $scope.searchinfostr = '';
      $scope.souresearchinfo = '';
      $scope.arr = [];
      $scope.sourceitem = null;
      $scope.sourcetanchuang = false;
      $scope.yunfeicountrystr = '';
      $scope.selectshopstr = '';
      $scope.searchinfoshop = '';
      $scope.sourcepagenum = '1';
      var topTabs = $('.top-taps li');

      $scope.specificSyncStore = {}; // 高级同步店铺名
      $scope.startTime = ''; // 高级同步开始时间
      $scope.endTime = ''; // 高级同步结束时间
      $scope.productName = ''; // 高级同步商品名称
      $scope.showspecificSync = false; // 是否弹出高级同步弹窗
      $scope.showUpdateGuide = false; // 更新引导
      $scope.matchitem = null;
      $scope.showProductName = true; // 是否显示商品名称，shopee和Lazada店铺不显示
      $scope.showProductSKU = false; // 是否显示商品SKU，Lazada店铺显示
      $scope.showSelectDate = true; // 是否显示时间筛选， ebay店铺不支持
      $scope.leftPageNum = 1; // 左边页码
      $scope.rightPageNum = 1; // 右边页码
      $scope.leftToGo = false; // 走遍是否to go
      $scope.SKUList = ['']; // 高级同步输入的sku数组
      $scope.noData = false;

      function noData (vip, search) {
        if(search) {
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
      }

      function runm(x, y) {
        return Math.floor(Math.random() * (y - x + 1) + x)
      }

      // 执行关联窗口自动弹出
      var manualConnectInfo
      if ($stateParams.scInfo || routeParam) {
        manualConnectInfo = $stateParams.scInfo ? JSON.parse(base64.decode($stateParams.scInfo)) : routeParam;
        $scope.searchinfosource = manualConnectInfo.cjProSku;
        $scope.searchinfoshop = manualConnectInfo.storeProductName;
        // return
        // $scope.arr = [];
        // $scope.getWayData.weight = $scope.manualConnectInfo.packWeight;
        // $scope.getWayData.lcharacter = $scope.manualConnectInfo.propertyKey;
        // $scope.getDetailData.productId = $scope.manualConnectInfo.storePid;
        // $scope.getDetailData.pid = $scope.manualConnectInfo.pId;
        // $scope.getDetailData.shopId = $scope.manualConnectInfo.shopId;
        // getTanData(dsp, $scope);
      }

      $scope.classarr = ['yellow-bg', 'green-bg', 'pink-bg', 'blue-bg'];
      //搜品管理数据初始化
      // $scope.noData = false;
      $scope.hasSourceData = false;
      // $scope.reqFlag = 1;

      function getSendData() {
        var jsonObj = {};
        if ($scope.connectType) {
          jsonObj.pageNum = $scope.sourcepagenum;
          jsonObj.pageSize = '5';
          jsonObj.inputStr = $scope.searchinfosource;
        } else {
          jsonObj.data = {};
          jsonObj.data.pageSize = '5';
          jsonObj.data.pageNum = $scope.sourcepagenum;
          jsonObj.data.userId = $scope.userId;
          jsonObj.data.inputStr = $scope.searchinfosource;
          jsonObj.data = JSON.stringify(jsonObj.data);
        }
        return JSON.stringify(jsonObj);
      }

      function settleLeftData(obj) {
        var pList = obj.sourcelist || obj.list;
        for (var i = 0; i < pList.length; i++) {
          var str = pList[i].NAMEEN;
          var arr = str.split(' ');
          var arr2 = pList[i].CATEGORY.split(' / ')
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
          pList[i].cla = cla;
          pList[i].tagsarr = tagsarr;
          pList[i].flag = false;
          if ($scope.connectType == 1) {
            for (var k = 0; k < pList[i].stanProdcuts.length; k++) {
              pList[i].stanProdcuts[k].serviceFee = (pList[i].stanProdcuts[k].CNTOUSACHARGE * 1 + pList[i].stanProdcuts[k].PROCESSCHARGE * 1 + pList[i].stanProdcuts[k].UNLOADCHARGE * 1).toFixed(2);
            }
          }
        }
        if (manualConnectInfo && pList.length == 1) {
          pList[0].flag = true;
          $scope.sourceitem = pList[0];
        }
        $scope.sourcelist = pList;
      }

      const leftToGo = () => {
        const allPageNum = $scope.sourceProTotalpage && parseInt($scope.sourceProTotalpage / 5) || 1;
        if($scope.rightPageNum > allPageNum) {
          $scope.rightPageNum = $scope.sourceProTotalpage % 5 ? allPageNum+1 :  allPageNum;
        }
        pageFunWithParams($("#page3"), $scope.sourceProTotalpage, 5, $scope.rightPageNum, function (n, type) {
          $scope.rightPageNum = n;
          if (type == 'init' && n == 1) return;
          $scope.sourceitem = null;
          $scope.sourcepagenum = n;
          $scope.sourcelist = [];
          dsp.loadPercent($('.cj-load-wrap-right'), connectionPicHeight);
          dsp.postFun(postUrlLeft, getSendData(), function (name) {
            dsp.closeLoadPercent($('.cj-load-wrap-right'));
            var obj = JSON.parse(name.data.result)
            settleLeftData(obj);
          });
        })
      }

      /**同步店铺高级搜索初始化 */
      $scope.initSyncCallback = function(advancedSearch){
        $scope.advancedSearch = advancedSearch
      }

      function getSourceList(search) {
        $scope.sourcelist = [];
        dsp.loadPercent($('.cj-load-wrap-right'), connectionPicHeight);
        dsp.postFun(postUrlLeft, getSendData(), function (name) {
          dsp.closeLoadPercent($('.cj-load-wrap-right'));
          var obj = JSON.parse(name.data.result)
          $scope.sourceProTotalpage = obj.total;  // || obj.totle
          if ($scope.sourceProTotalpage == 0) {
            $scope.sourcelist = [];
            if (!$scope.searchinfosource) {
              $scope.noData = true;
            }
            noData(vip, search);

            $scope.hasSourceData = false;
            return;
          }
          dsp.removeNodataPic($('.cj-load-wrap-right'));
          $scope.noData = false;
          $scope.hasSourceData = true;
          settleLeftData(obj);
          leftToGo();
          // pageFunWithParams($("#page3"), $scope.sourceProTotalpage, 5, 1, function (n, type) {
          //   if (type == 'init') return;
          //   // dsp.load();
          //   $scope.sourceitem = null;
          //   $scope.sourcepagenum = n;
          //   $scope.sourcelist = [];
          //   dsp.loadPercent($('.cj-load-wrap-right'), connectionPicHeight);
          //   dsp.postFun(postUrlLeft, getSendData(), function (name) {
          //     dsp.closeLoadPercent($('.cj-load-wrap-right'));
          //     var obj = JSON.parse(name.data.result)
          //     settleLeftData(obj);
          //   });
          // })
        });
      }

      getSourceList();

      const UpdateGuideType = localStorage.getItem('UpdateGuideTypeSourcing');
      if(UpdateGuideType == 1) {
        $scope.showUpdateGuide = false;
      } else if($scope.connectType == 0 && $scope.noData){
        $scope.showUpdateGuide = false;
      } else {
        $scope.showUpdateGuide = true;
      }

      $scope.searchsource = function () {
        // $scope.reqFlag = 0;
        $scope.sourcepagenum = '1';
        getSourceList('search');
      }
      $scope.enterSearchSource = function (event) {
        if (event.keyCode == 13) {
          $scope.searchsource();
        }
      }

      //刷新信息
      // checkIsEbayInsynn(dsp, $scope);
      // $scope.renovation = function () {
      //   goActSyncShopPro(dsp, $scope);
      // }
      $scope.$on('syncstoresuccess', function () {
        $scope.getRightList();
      })

      //下拉框选项
      dsp.postFun('app/shop/getshop', { "data": "{'userId':'" + $scope.userId + "'}" }, getshop);

      function getRightList(search) {
        goGetShopPro(dsp, $scope, vip, search);
      }

      $scope.getRightList = function () {
        getRightList();
      }

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
        getRightList();
        // $scope.searchshopcommodity($scope.selectshopinfo);
      }

      $scope.ifMatch = true;
      //搜品搜索信息
      $scope.a = function () {
      }
      //下拉获取店铺信息之后进行商品筛选
      $scope.selectshopstr = '';
      $scope.conshopid = ''
      $scope.searchshopcommodity = function (n, type) {
        if (n == null) {
          n = '';
        }
        // dsp.load();
        $scope.inputshopinfo = n;
        getRightList('search');
        $scope.conshopid = n;
        // $scope.storeinfo = n;
        $scope.selectType = type;
        
      }

      $scope.syncshopcommodity = (n) => {
        $scope.storeinfo = n;
        $scope.$broadcast('currStoreId', n);
      }

      //搜品店铺搜索信息获取
      $scope.shopsearch = function () {
        getRightList('search');
      }
      $scope.enterSearchShop = function (event) {
        if (event.keyCode == 13) {
          $scope.shopsearch();
        }
      }

      //获取搜索信息
      $scope.searchinfo = function (item, index, index2) {
        $scope.sourcelist[index].cla[index2].flag = true;
        if ($scope.searchinfoshop.indexOf(item.classname) == -1) {
          var arr = $scope.searchinfoshop.split(' ');
          $scope.searchinfoshop = arr.join(' ');
          $scope.searchinfoshop += ' ' + item.classname.trim() + ' ';
        }
      }
      $scope.searchinfo2 = function (item, index, index2) {

        var arr = $scope.searchinfoshop.split(' ');
        $scope.searchinfoshop = arr.join(' ');
        $scope.sourcelist[index].tagsarr[index2].flag = true;
        if ($scope.searchinfoshop.indexOf(item.tagname) == -1) {
          $scope.searchinfoshop += ' ' + item.tagname.trim() + ' ';
        }
      }
      // 删除搜索信息
      $scope.deletesearchinfo = function (item, $event, index, index2) {

        $event.stopPropagation();//禁止事件冒泡
        $scope.sourcelist[index].cla[index2].flag = false;
        var str = $scope.searchinfoshop;
        $scope.searchinfoshop = str.replace(item.classname, '')

      }
      $scope.deletesearchinfo2 = function (item, $event, index, index2) {

        $event.stopPropagation();//禁止事件冒泡
        $scope.sourcelist[index].tagsarr[index2].flag = false;
        var str = $scope.searchinfoshop;
        $scope.searchinfoshop = str.replace(item.tagname, '')
      }
      $scope.cancle = function (index) {
        // $scope.shop[index].flag=false;
        $scope.sourcelist[index].win = false;
        // $scope.matchitem = null;
      }
      //sourcematch
      $scope.sourcematch3 = function (index, item) {
        if (item.flag == false) {
          $scope.sourceitem = item;
          for (var i = 0; i < $scope.sourcelist.length; i++) {
            $scope.sourcelist[i].flag = false
          }
          $scope.sourcelist[index].flag = true;
        } else {
          $scope.sourcelist[index].flag = false;
          $scope.sourceitem = null;
        }
      }
      $scope.sourcematch2 = function (item, index) {
        $scope.sourceitem = item;
        $scope.shopitemindex = index;
        for (var i = 0; i < $scope.sourcelist.length; i++) {
          $scope.sourcelist[i].win = false
        }
        $scope.sourcelist[index].win = true;
        for (var i = 0; i < $scope.sourcelist.length; i++) {
          $scope.sourcelist[i].flag = false
        }
        $scope.sourcelist[index].flag = true;
      }
      $scope.sourcematch = function (val, index) {
        // if (val.flag==false) {
        //   $scope.sourcematch3(index,val);
        // }
        $scope.sourceitem = val;
        // $scope.searchinfoshop=val.NAMEEN;
        $scope.searchByPart = true;
        getRightList('search');
      }

      $scope.getWayData = {};
      $scope.getDetailData = {};

      $scope.sourceconnect = function (val, shopitemindex) {
        $scope.shopitemindex = shopitemindex;
        $scope.matchitem = val;
        $scope.ShopName = $scope.matchitem.shopName;
        if (!$scope.sourceitem) {
          layer.msg('Please select a product you want to connect in your store. ');
          return;
        }
        $scope.arr = [];
        $scope.getWayData.weight = $scope.sourceitem.PACKWEIGHT;
        $scope.getWayData.lcharacter = $scope.sourceitem.PROPERTYKEY;
        $scope.getWayData.shopType = $scope.matchitem.shopType;
        $scope.getDetailData.productId = $scope.matchitem.pid;
        $scope.getDetailData.pid = $scope.sourceitem.ID;
        $scope.getDetailData.shopId = $scope.matchitem.shopId;
        getTanData(dsp, $scope);
        //
        $scope.isLevels = true;
        $scope.Service = '1';
        $scope.Levels = localStorage.getItem('connectedLevels') || '1';
        if ($scope.matchitem.shopType == 'shopify') {
          const shopList = $scope.shopselectlist.filter(item => item.ID == $scope.matchitem.shopId);
          $scope.syncInventory = shopList[0].sync_inventory;
          if (!$scope.syncInventory) {
            $scope.Service = '0'
            $scope.isLevels = false;
          }
        }
      }
      //closesourcetanchuang
      $scope.closesourcetanchuang = function () {
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
        $scope.matchitem = null;
        $scope.shopitemindex = -1;
      }
      //获取物流方式
      $scope.getwuliuway = function (wuliuway) {
        $scope.wuliuway = wuliuway;
        $scope.remark = wuliuway ? wuliuway.remark : '';
      }
      //关联商品的第一次点击
      $scope.firstclick = function (val, num, item) {
        tanShopProClick(val, num, item, $scope);
      }
      //关联商品的第二次点击
      $scope.lastclick = function (val, num, item) {
        tanCjProClick(val, num, item, $scope);
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
      $scope.sourcegoon = function () {
        $scope.connectStatus = '1';
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
        const end = new Date($scope.
          endTime).getTime();
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
          getRightList();
        } else if(type == 'right' && $scope.rightPageNum == 1) {
          getSourceList();
        } else if(type == 'right' && $scope.rightPageNum != 1) {
          leftToGo();
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
        getRightList('search');
      })

      $scope.handleCloseGuide = () => {
        $scope.showUpdateGuide = false;
        localStorage.setItem('UpdateGuideTypeSourcing', 1);
      }

      $scope.$on('$syncSuccess', (d, data) => {
        getRightList('search');
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
