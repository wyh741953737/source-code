import { pageFunWithParams } from '@src/pages/mycj/mycj-common';


export function connectionFactory(angular) {
  const app = angular.module('connection.module', []);

  app.controller('connection.ctrl', ['$rootScope', '$scope', '$timeout', '$stateParams', 'dsp', '$state',
    function ($rootScope, $scope, $timeout, $stateParams, dsp, $state) {
      $rootScope.$on('app/connection/conList', (_, bool) => {
        $scope.loading = bool;
        if (bool) $scope.notDataFound = false;
      });
      dsp.domainData().then((res) => {
        // 请求成功的结果
        console.log(res)
        $scope.iscj = res.iscj;
        $scope.affModel = res.affModel;
        if ($scope.iscj == '1') {
          //cj
          $scope.websiteName = 'CJ';
        } else {
          //客户
          $scope.websiteName = res.websiteName || 'CJ';
        }
      })
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
      console.log("productsConnectedCtrl")
      var base64 = new Base64();
      var userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
      console.log(userId)
      try {
        var seachCs = decodeURI($stateParams.seachCs || '');
      } catch(e) {
        console.log(e)
      }
      $scope.content = 'Are you sure to remove the packaging?';
      $scope.showPopUps = false;
      
      console.log(seachCs)
      $rootScope.$on('app/shop/getshop', (_, bool) => $scope.loading_shop = bool);
      dsp.postFun('app/shop/getshop', { "data": "{'userId':'" + userId + "'}" }, getshop);

      function getshop(n) {
        var obj = JSON.parse(n.data.result);
        // console.log('下拉', obj.shoplist)
        $scope.shopselectlist = obj.shoplist;
        $scope.shopselectlist.forEach(e => {
          e.rNAME = `${e.NAME} - ${e.TYPE} ${replaceName((e.ThemeId || e.MarketplaceUrl))}`; //ThemeId是shopee的国家;MarketplaceUrl是lazada的国家
        });
        function replaceName(params) {
          let rName = '';
          if (/sg/i.test(params)) { rName = ' - Singapore' }
          if (/my/i.test(params)) { rName = ' - Malaysia' }
          if (/id/i.test(params)) { rName = ' - Indonesia' }
          if (/th/i.test(params)) { rName = ' - Thailand' }
          if (/ph/i.test(params)) { rName = ' - Philippines' }
          if (/vn/i.test(params)) { rName = ' - Vietnam' }
          return rName;
        }
        $scope.shopselectlist.unshift({rNAME:'All Stores'})
        console.log('下拉', $scope.shopselectlist);1
        $scope.selectshopinfo = $scope.shopselectlist[0];
        getConnectedList();
      }

      //获取批量删除权限
      function getBatchPermisstion(){
        const userId =  $rootScope.base64.decode(localStorage.getItem('userId'))
        console.log(userId)
        dsp.postFun('cj/PackConnection/getDelPackPermissions',{userId:userId},(res)=>{
          if(res.data.statusCode == 200){
            $scope.packStatus = res.data.result.packStatus //0-无 1-有
          }else{
            $scope.packStatus = 0
          }
        })
      }
      getBatchPermisstion();

      function getElementLeft(element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;

        while (current !== null) {
          actualLeft += current.offsetLeft;
          current = current.offsetParent;
        }

        return actualLeft;
      }

      function getElementTop(element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;

        while (current !== null) {
          actualTop += current.offsetTop;
          current = current.offsetParent;
        }

        return actualTop;
      }

      $scope.conpagesize = '10';
      $scope.conpagenum = '1';
      $scope.conshopid = '';
      $scope.consearchinfo = '';
      $scope.conTotalNum = '';
      $scope.conTotalPage = '';
      // $scope.conlist = [];
      if (seachCs) {
        $scope.consearchinfo = seachCs;
        console.log($scope.consearchinfo)
      }

      // layer.load(2);
      function getConnectedList() {
        // dsp.load();
        var jsonObj = {};
        jsonObj.pageSize = $scope.conpagesize;
        jsonObj.pageNum = $scope.conpagenum;
        jsonObj.shopId = $scope.selectshopinfo.ID ? $scope.selectshopinfo.ID : '';
        jsonObj.userId = userId;
        jsonObj.serachName = $scope.consearchinfo.replace(/'/g, "''");
        $scope.conlist = [];
        $scope.showFlag = [];
        $scope.isCheckAll = false
        dsp.postFun('app/connection/conList', { "data": JSON.stringify(jsonObj) }, jiechuguanlian);
      }

      $scope.$on('ship-setting', function (ev, data) {
        if (data.flag == 'submit-ship-success') {
          $scope.conlist[data.ship.proindex].LOGISTICS = data.ship.shipMethod;
          $scope.conlist[data.ship.proindex].defaultArea = data.ship.defaultArea;
        }
      })

      function settleData(obj) {
        var pList = obj.conList;
        var remarkArr = obj.remark || [];
        console.log(pList);
        for (var i = 0; i < pList.length; i++) {
          pList[i].discountPrice = dsp.cacuDiscount(pList[i].SELLPRICE, pList[i].SELLDISCOUNT);
          pList[i].decountry = null;
          pList[i].deltPrice = 0;
          pList[i].discountPriceShip = 0;
          if (pList[i].deltPrice) {
            pList[i].discountPriceShip = dsp.cacuDiscount(pList[i].deltPrice, pList[i].FREIGHTDISCOUNT);
            pList[i].AMOUNTPRICE = dsp.cacuAmount(pList[i].discountPrice, pList[i].discountPriceShip);
          } else {
            pList[i].discountPriceShip = '';
            pList[i].AMOUNTPRICE = pList[i].discountPrice;
          }
          for (var j = 0; j < remarkArr.length; j++) {
            if (pList[i].LOGISTICS == remarkArr[j].nameen) {
              console.log(remarkArr[j].remark);
              pList[i].wuliuRemark = remarkArr[j].remark;
              break;
            }
          }
          // 物流试算组件用
          pList[i].shipinfo = {
            weight: pList[i].packweight,
            enName: pList[i].LOGISTICS,
            pid: pList[i].PID,
            shopType: pList[i].shopType,
            shipDiscount: pList[i].FREIGHTDISCOUNT,
            areaCountryCode: pList[i].areaCountryCode,
            index1: i
          }
        }
        $scope.conlist = pList;
        console.log($scope.conlist);
        $scope.conTotalPage = Math.ceil(($scope.conTotalNum * 1) / ($scope.conpagesize * 1));
      }
      // 物流试算组件返回值接收
      $scope.$on('saveShipPrice', function (d, data) {
        console.log(data)
        if (data.index2 >= 0 && data.index1 >= 0) {
          if (data.shipDiscountPrice) {
            $scope.conlist[data.index1].varientList[data.index2].isProAmountTip = false
          }
          $scope.conlist[data.index1].varientList[data.index2].AMOUNTPRICE = dsp.cacuAmount($scope.conlist[data.index1].varientList[data.index2].discountPrice, data.shipDiscountPrice || 0);
        } else {
          if (data.shipDiscountPrice) {
            $scope.conlist[data.index1].isProAmountTip = false
          }
          $scope.conlist[data.index1].AMOUNTPRICE = dsp.cacuAmount($scope.conlist[data.index1].discountPrice, data.shipDiscountPrice || 0);
        }
        setTimeout(function () {
          $scope.$apply()
        })
      })

      function jiechuguanlian(n) {
        console.log(n.data);
        var obj = JSON.parse(n.data.result);
        $scope.connectedlist = obj;
        $scope.conTotalNum = obj.total;
        if ($scope.conTotalNum == 0) {
          $scope.conTotalPage = 0;
          $scope.conlist = [];
          $scope.notDataFound = true;
          return;
        }
        settleData(obj);
        $scope.$broadcast('page-data', {
          pageNum: +$scope.conpagenum,
          totalNum: $scope.conTotalPage,
          totalCounts: +$scope.conTotalNum,
          pageSize: $scope.conpagesize,
          pagesizeList: ['10', '20', '50']
        });
      }
      $scope.$on('pagedata-fa', function (d, data) {//分页切换数据监听
        $scope.conpagenum = data.pageNum;
        $scope.conpagesize = data.pageSize;
        getConnectedList();
      })
      //搜索
      $scope.searchshop = function () {
        $scope.conpagenum = '1';
        getConnectedList();
      }
      $scope.enterSearch = function (event) {
        if (event.keyCode == "13") {
          $scope.searchshop();
        }
      }
      //每页数据条数改变的时候
      $scope.conpagechange = function (pagesize) {
        console.log(pagesize)
        $scope.conpagesize = pagesize;
        $scope.conpagenum = '1';
        getConnectedList();
      }

      //输入页码数跳转
      $scope.conpagenumchange = function () {
        $scope.conpagenum = $scope.conpagenum * 1;
        if ($scope.conpagenum > $scope.conTotalPage || $scope.conpagenum < 1) return;
        console.log($scope.conpagenum)
        getConnectedList();
      }
      //店铺选择
      $scope.searchshopconnect = function (n) {
        if (n == null) {
          n = '';
        }
        console.log(n)
        $scope.conshopid = n;
        $scope.selectshopinfo = n;
        getConnectedList();

      }

      // 展开变体详情
      $scope.showVarient = function (item, index) {
        $scope.Management = [];
        dsp.postFun('app/connection/conListdateill', {
          "data": JSON.stringify({
            accpid: item.ACCPID,
            shopId: item.shopId
          })
        }, function (data) {
          var data = data.data;
          if (data.statusCode != '200') {
            console.log(data);
            return false;
          }
          var varientList = JSON.parse(data.result).conList;

          $timeout(() => {
            for (var i = 0; i < varientList.length; i++) {
              varientList[i].discountPrice = dsp.cacuDiscount(varientList[i].SELLPRICE, varientList[i].SELLDISCOUNT);
              varientList[i].decountry = null;
              varientList[i].deltPrice = 0;
              varientList[i].discountPriceShip = 0;
              varientList[i].ischeck = false;
              if (varientList[i].deltPrice) {
                varientList[i].discountPriceShip = dsp.cacuDiscount(varientList[i].deltPrice, varientList[i].FREIGHTDISCOUNT);
                varientList[i].AMOUNTPRICE = dsp.cacuAmount(varientList[i].discountPrice, varientList[i].discountPriceShip);
              } else {
                varientList[i].discountPriceShip = '';
                varientList[i].AMOUNTPRICE = varientList[i].discountPrice;
              }

              // 展示变体属性
              if(varientList[i].variantkey) {
                const curVarientVal = Array.isArray(varientList[i].variantkey) ? varientList[i].variantkey : varientList[i].variantkey.split('-');
                varientList[i].varientStr = curVarientVal.join('; ');
              }
              
              // 物流试算组件用
              varientList[i].shipinfo = {
                weight: varientList[i].PACKWEIGHT,
                enName: varientList[i].LOGISTICS,
                pid: varientList[i].PID,
                shopType: item.shopType,
                shipDiscount: varientList[i].FREIGHTDISCOUNT,
                areaCountryCode: $scope.conlist[index].areaCountryCode,
                index1: index,
                index2: i
              }
            }
            console.log(varientList);
            $scope.conlist[index].varientList = varientList;
            $('.media').eq(index).find('.asj-pro-box').hide();
            $('.media').eq(index).css({ 'padding-bottom': '25px', 'background': '#f8f8f8' });
            console.log($scope.conlist)
            $scope.showFlag = $scope.conlist.filter(function (item) {
              if (item.varientList && item.varientList.length > 0) {
                return true;
              }
            })
            getCheckList();
          })
        })
      };
      // 获取变体选择列表
      function getCheckList(){
        const checkL = [];
        $scope.conlist.forEach(_v=>{
          if(_v.varientList){
            _v.varientList.forEach(_cv=>{
              if(_cv.ischeck){
                const {shopId,NAMEEN,prices,PACKWEIGHT,shopName,SKU,VID,ACCPID,vsku,ACCVID} = _cv;
                checkL.push({
                  shopName,shopId,NAMEEN,prices,SKU,VID,ACCPID,vsku,ACCVID,
                  shopType:_v.shopType,
                  PID:'',
                  packweight:PACKWEIGHT,
                  type: "1",
                  sku:SKU,
                })
              }
            })
          }else if(_v.ischeck){
            const {PID,shopId,NAMEEN,prices,packweight,shopName,SKU,VID,ACCPID,ACCVID,shopType} = _v;
            checkL.push({
              shopName,shopId,NAMEEN,prices,SKU,VID,PID,packweight,ACCPID,ACCVID,shopType,
              VID:'',//假设是商品列表，则把变体id置为空
              type: "1",
              sku:SKU,
            })
          }
        })
        console.log("checkL===",checkL)
        $scope.checkList = checkL;
        $scope.isConnection = checkL.length > 0;
        $scope.showFlag = $scope.checkList;
      }
      //变体列表
      $scope.Management = []
      $scope.cheched = function (itemV, idx) {
        console.log(itemV)
        itemV.ischeck = !itemV.ischeck;
        getCheckList();
      };
      // 同步库存到店铺
      $scope.fulfil = '1';
      $scope.Levels = '1';
      $scope.fulfillmentFun = function () {
        if ($scope.checkList.length == 0) return layer.msg('Please select a product');
        let isSame = true,isShopify=true;
        const shopName = $scope.checkList[0].shopName;
        $scope.checkList.some(_v=>{
          if(_v.shopName!=shopName) isSame=false;
          if(_v.shopType!=='shopify')isShopify=false;
        })
        if(!isSame) return layer.msg('Please select the item under the same store');
        if(!isShopify) return layer.msg('CJ Fulfillment is only available to Shopify stores');
        $scope.isCJManagement = true;
        $scope.YCJManagement = function () {
          const shopName = $scope.checkList[0].shopName;
          const shopId = $scope.checkList[0].shopId;
          let skus = [];
          let accPids = [];
          $scope.checkList.forEach((o)=>{
            if(!o.PID){
              skus.push({ vid: o.ACCVID, sku: o.vsku })
            }else{
              accPids.push(o.ACCPID)
            }
            
          })
          var url = 'platform-product/fulfillment/fulfillmentSetting';
          var parms = {
            fulfillmentservice: $scope.fulfil == '1' ? 'cjdropshipping' : null,
            inventoryManagement: $scope.Levels == '1' ? 'cjdropshipping' : null,
            shopName,
            shopId,
            accPids,
            skus
          };
          const msgLoading = cjMessage.loading({ isFixed: true});
          dsp.postFun(url, parms, function (res) {
            msgLoading.hide()
            if (res.data.code == 200) {
              $scope.isCJManagement = false;
              getConnectedList()
              $scope.Management = [];
              layer.msg(res.data.data);
            }else if(res.data.code == 5010){
              $scope.isCJManagement = false;
              $scope.storeAutoExpirePopup = true;
            } else {
              layer.msg('The server is busy now, please try again later.')
            }
          }, function (err) {
            layer.msg('Service exception')
            msgLoading.hide()
          })
        }
        if ($scope.showFlag[0].shopType == "shopify") {
          const shopList = $scope.shopselectlist.filter(item => item.ID == $scope.showFlag[0].shopId);
          $scope.syncInventory = shopList[0].sync_inventory;
          console.log(shopList, $scope.syncInventory);
        }
      }


      $scope.hideVarient = function (item, index) {
        $scope.Management = [];
        $scope.conlist[index].varientList = undefined;
        $('.media').eq(index).find('.asj-pro-box').show();
        $('.media').eq(index).css({ 'padding-bottom': '0', 'background': '#fff' });
        getCheckList();
      }

      $scope.disconnect = function (item, index1, index2) {

        $scope.disconnectPopup = true
        $scope.item = item
        $scope.index1 = index1
        $scope.index2 = index2

      }

      $scope.disconnectCancelFun = function (params) {
        $scope.disconnectPopup = false
        $scope.item = null
        $scope.index1 = null
        $scope.index2 = null
      }

      $scope.disconnectConfirmFun = function () {

        // return alert($rootScope.soldOutCount)
        let { item, index1, index2 } = $scope
        var disconnectUrl, sendStr;
        if (index2 >= 0) {
          disconnectUrl = 'app/connection/relieveCondetaill';
          sendStr = { "data": "{'id':'" + item.id + "','shopVid':'" + item.ACCVID + "','shopId':'" + item.shopId + "'}" };
        } else {
          disconnectUrl = 'app/connection/relieveCon';
          sendStr = { "data": "{'pid':'" + item.ID + "','shopproductId':'" + item.ACCPID + "','shopId':'" + item.shopId + "'}" };
        }

        const msgLoading = cjMessage.loading({ isFixed: true })
        dsp.postFun(disconnectUrl, sendStr, function (data) {
          // layer.closeAll("loading")
          msgLoading.hide();
          var data = data.data;
          console.log(data);
          if (data.statusCode != '200') {
            layer.msg('Disconnect the products failed. ');
            return false;
          }
          layer.msg('Disconnected Successfully!');
          $timeout(function () {
            if (index2 >= 0) {
              $scope.conlist[index1].varientList.splice(index2, 1);
              if ($scope.conlist[index1].varientList.length == 0) {
                $scope.conlist.splice(index1, 1);
              }
            } else {
              getConnectedList(); // 刷新数据
              if (item.SALESTATUS == '5') {
                $rootScope.soldOutCount -= 1; // 导航栏角标数量
              }
            }
          }, 1000);

          $scope.disconnectPopup = false
        }, function() {
          msgLoading.hide();
        });


      }
      /*包装相关操作*/
      // 商品批量关联
      $scope.batchAssociation = function (item) {
        console.log(item);
        if(item.productType === '5') {
          layer.msg('Packages are not available to the product. ');
          return;
        }
        let itemData = {
          type: "0",
          pid: item.ID,
          shopId: item.shopId,
          NAMEEN: item.NAMEEN, //商品名称
          SKU: item.SKU,  // sku
          prices: item.prices, //价格
          packweight: item.packweight, //重量
          connectType:1 // 关联包装类型 1 是店铺关联
        };
        location.href = '#/relevant-packaging/' + base64.encode(JSON.stringify(itemData)) + '/0';
      };
      // 变体关联包装
      $scope.associatedPackaging = function (item) {
        console.log(item)
        if(item.productType === '5') {
          layer.msg('Packages are not available to the product. ');
          return;
        }
        let arr = item.STANDARD ? item.STANDARD.split(',') : [], long = null, width = null, height = null;
        arr.forEach((o, i) => {
          if (o.indexOf('long') !== -1) {
            long = o.substr(o.indexOf('=') + 1, o.length)
          } else if (o.indexOf('width') !== -1) {
            width = o.substr(o.indexOf('=') + 1, o.length)
          } else if (o.indexOf('height') !== -1) {
            height = o.substr(o.indexOf('=') + 1, o.length)
          }
        });
        let itemData = {
          type: "1",
          vid: item.VID,
          shopId: item.shopId,
          NAMEEN: item.NAMEEN, //商品名称
          SKU: item.SKU,  // sku
          prices: item.prices, //价格
          packweight: item.PACKWEIGHT, //重量
          long: long, //长
          width: width, //宽
          height: height, //高

        };
        location.href = '#/relevant-packaging/' + base64.encode(JSON.stringify(itemData)) + '/0';
      }

       //查看包装
       //获取商品变体集合
       $scope.viewPackaging = function (item) {
        $scope.selectedShopId = item.shopId
        // 如果是商品点击的
        dsp.getFun('cj/PackProduct/getProductStandList?pid='+item.PID+'&type=1&shopId='+item.shopId , (res) => {
          layer.closeAll('loading');

          if (res.data.statusCode === '200') {
            $scope.viewPackagingModal = true
            $scope.proStandList = res.data.result
            $('.singleSelect').select2();
          }
        }, (err) => {
          $scope.proStandList = []
          layer.closeAll('loading');
          console.log(err);
        })


        if(!item.ID){
           // 如果点击的是变体,直接查询该变体
          $scope.selectedVid = item.VID
          $scope.viewPackagingModal = true
          $scope.onSelectPackaging()
        }

    }

      //选择某个包装变体，查询详情
      $scope.onSelectPackaging = function () {
        if($scope.selectedVid){
          // 选择了变体，显示变体下关联的包装商品
          dsp.postFun('cj/PackProduct/getCheckedList', {vid:$scope.selectedVid,shopId:$scope.selectedShopId}, (res) => {
            layer.closeAll('loading');
            if (res.data.statusCode == '200') {
              $scope.vidCheckedList = res.data.result.checkedList
            } else {
              $scope.vidCheckedList = []
            }
          }, (err) => {
            layer.closeAll('loading');
            console.log(err)
          })
        }else{
          // 没有选择，则不要
          $scope.vidCheckedList = []
        }
      }

      $scope.formateSize = function(size) {
        let newSize = String(size);
        newSize = newSize.replace(/Long/,'Length');
        return newSize;
      }

      // 关闭 view 弹框
      $scope.closeViewPackagingModal = function () {
        $scope.viewPackagingModal = false
        $scope.vidCheckedList = []
        $scope.selectedVid = ''
        $('.singleSelect').select2('destroy');
      }


      //解除绑定
      $scope.removeParams = {};
      $scope.isVarient = false;
      $scope.unBind = function (item,isVarient) {
        $scope.showPopUps = true;
        $scope.removeParams = {
          type: '0',
          pid: item.PID || '',
          shopId: item.shopId
        }
        if(isVarient){
          // 如果展开变体，则传入变体id
          $scope.removeParams.vid= item.VID || ''
        }
      };

      // 获取弹窗组件关闭按钮
      $scope.$on('closePopUps', (e, data) => {
        $scope.showPopUps = false;
      })
      // 获取弹窗组件确定按钮
      $scope.$on('confirmPopUps', (e, data) => {
        const msgLoading = cjMessage.loading({ isFixed: true });
        dsp.postFun('cj/PackProduct/delCorrelation', $scope.removeParams, (res) => {
          msgLoading.hide();
          if (res.data.statusCode == '200') {
            layer.msg('Removed Successfully')
            getConnectedList();
          } else {
            layer.msg('Binding removal failed')
          }
        }, (err) => {
          msgLoading.hide();
          // layer.close(index);
          console.log(err)
        })
        $scope.showPopUps = false;
      })

      // 全选所有商品
      $scope.chechedAll = () => {
        $scope.isCheckAll = !$scope.isCheckAll;
        $scope.conlist.forEach(o => {
          o.ischeck = $scope.isCheckAll;
          if(o.varientList){
            o.varientList.forEach(_v=>{
              _v.ischeck = $scope.isCheckAll;
            });
          }
        })
        $scope.isConnection = $scope.conlist.filter(o => o.ischeck).length > 0;
        getCheckList();
      }


      // 单选商品
      $scope.checkPro = (item, idx) => {
        console.log(item)
        item.ischeck=!item.ischeck;
        const checkLen = $scope.conlist.filter(o => o.ischeck).length
        $scope.isConnection = checkLen > 0
        $scope.isCheckAll = $scope.conlist.length === checkLen;
        getCheckList();
      }

      // 批量关联包装
      $scope.bulkConnection = () => {
        if(!$scope.checkList || $scope.checkList.length==0)return false;
        const packNames =  $scope.checkList.map(o => ({ 
          type: "0",
          pid: o.PID,
          SKU:o.sku, 
          shopId: o.shopId, 
          NAMEEN: o.NAMEEN,
          prices: o.prices, //价格
          vid: o.VID,
          packweight: o.packweight, //重量
          connectType:1 // 关联包装类型 1 是店铺关联
        }));;
        console.log("packNames====",packNames)
        localStorage.setItem('relevantpackage',base64.encode(JSON.stringify(packNames)));
        location.href = `#/relevant-packaging/1/0`;
      }

      // 批量解除包装
      $scope.bulkRemoveConnection = () => {
        if(!$scope.checkList || $scope.checkList.length==0) return false;
        if($scope.checkList.length>0) $scope.batchDeletePopup = true;
      }
      // 批量移除包装
      $scope.batchDeleteConfirmFun = ()=>{
        if(!$scope.checkList || $scope.checkList.length==0)return false;
        const params = $scope.checkList.map(o => ({ 
          pid:o.PID,
          shopId:o.shopId,
          vid:o.VID
        }));
        dsp.postFun('cj/PackConnection/batchDelCorrelation', params, function ({data}) {
          if(data.statusCode=='200'){
            layer.msg("Bulk Removed Successfully");
          }else if(data.statusCode=='1102'){
            layer.msg("You're not authorized to delete the packaging, please contact your agent for more information");
          }else{
            layer.msg("Bulk Removing Failed");
          }
          $scope.batchDeletePopup = false;
        })
      }

      /* 修改默认物流 */
      $scope.settingLogisticVisible = false;
      $scope.settingLogisticList = [];
      $scope.settingCountry = [];
      $scope.currentProData = null;
      $scope.currentVarData = null;

      $scope.initSettingLogistic = (item, itemProduct,index) => {
        $scope.currentIndex = index;
        $scope.currentProData = itemProduct;
        $scope.currentVarData = item;
        $scope.settingLogisticVisible = true;
        dsp.getAreaByPid(item.PID, function (res) {
          $scope.settingCountry = res;
          $scope.currentCountry = item.areaCountryCode;
          dsp.getShipListNew({
              platForms: item.shopType || [],
              startCountryCode: item.areaCountryCode,
              weightInterval: item.packweight,
              propertys: itemProduct.MATERIALKEY.split(',')
          }, function (res2) {
              $scope.settingLogisticList = res2;
              if(item.LOGISTICS) {
                $scope.currentLogistic = res2.find(i => i.nameEn === item.LOGISTICS)
              }
          });
        })
        console.log(item)
      }
      
      $scope.changeCountry = (contryCode) => {
        dsp.getShipListNew({
            platForms: $scope.currentVarData.shopType || [],
            startCountryCode: contryCode,
            weightInterval: $scope.currentVarData.packweight,
            propertys: $scope.currentProData.MATERIALKEY.split(',')
        }, function (res) {
            $scope.settingLogisticList = res;
        });
      }

      /* 修改默认物流 */
      $scope.submitChangeLogistic = () => {
        const currentCountryObj = $scope.settingCountry.find(i => i.countryCode === $scope.currentCountry);
        if(!$scope.currentLogistic) {
          return layer.msg('Please select logistics');
        }
        if(!$scope.currentVarData) {
          return layer.msg('Please select shipping country');
        }
        const params = {
          vid: $scope.currentVarData.VID,
          shopId: $scope.currentProData.shopId,
          logisticsName: $scope.currentLogistic.nameEn,
          areaId: currentCountryObj.areaId,
          areaEnName: currentCountryObj.areaEn,
          areaCountryCode: currentCountryObj.countryCode
        }
        dsp.postFun('app/connection/updateConStanLogistics',params ,function(res) {
          console.log(res)
          if(res.data.statusCode === '200') {
            layer.msg('Set successfully')
            $scope.showVarient($scope.currentProData, $scope.currentIndex);
          } else {
            layer.msg('Set failed')
          }
          $scope.settingLogisticVisible = false;
        });
      }
      //关闭授权过期提示
      $scope.closeStoreAutoExpire = ()=>{
        $scope.storeAutoExpirePopup = false;
        getConnectedList();
      }
      //授权过期跳转到shopify授权列表页面
      $scope.storeAutoExpireConfirmFun = ()=>{
        location.href="/myCJ.html#/authorize/Shopify";
      }
    }]);

  app.directive('repeatFinish', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, elem, attr) {
        //当前循环至最后一个
        if (scope.$last === true) {
          $timeout(function () {
            //向父控制器传递事件消息
            scope.$emit('repeatFinishCallback');
            var itemTop = $("#down-batch0").offset().top;
            var itemLeft = $("#down-batch0").offset().left;
            var itemTop1 = $("#input-yd0").offset().top;
            var itemLeft1 = $("#input-yd0").offset().left;
            console.log(itemTop, itemLeft, itemTop1, itemLeft1)
            if (localStorage.getItem('fwStu') == 'downBatch') {
              $('.fir-zhidao').css({
                top: itemTop - 5,
                left: itemLeft - 6
              })
            } else {
              $('.sec-zhidao').css({
                top: itemTop1 - 11,
                left: itemLeft1 - 8
              })
            }
          }, 100);
        }
      }
    }
  });

  return app;

}
