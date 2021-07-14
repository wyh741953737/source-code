export function listedFactory(angular) {
  const app = angular.module('mycj-listed.module', []);
  const winHeight = $(window).height() * 1;
  const skuPicHeight = winHeight - 339;

  let liststatus = '';
  app.controller('mycj-listed.ctrl', ['$scope', '$rootScope', '$stateParams', 'dsp','$timeout', '$location',
    function ($scope, $rootScope, $stateParams, dsp,$timeout, $location) {
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
      dsp.setRightMinHeight();
      $scope.listedList = [];
      $scope.listedsearch = '';
      $scope.listedpagesize = '10';
      $scope.listedpagenum = '1';
      $scope.listedTotalNum = '';
      $scope.listedTotalPage = '';
      $scope.listedsearch = '';
      $scope.shopId = '';
      $scope.listCheckLen = 0;
      $scope.getListedUrl = 'app/rebate/getAssignAndVisibility';
      $scope.authorizationExpired = false;

      if (localStorage.getItem('vip') == 1) {
        $scope.isVip = true;
      } else {
        $scope.isVip = false;
      }

      // 刊登列表状态
      $scope.status = $stateParams.status ? $stateParams.status : '-1';
      console.log($scope.status) 

      //-1--刊登成功,0--待刊登，1--刊登中，2--刊登失败
      let listDataObj = {
        "-1":  "pojo/product/getListedCj",
        "0": "cj/listedproduct/list",
        "1": "cj/listedproduct/list",
        "2": "cj/listedproduct/list"
      }
    // 编辑刊登
    $scope.editList = function (item,index) {
      editIndex = index;
      $scope.$broadcast('showeditframe', {
        from: '2',
        pid: item.ID
      });
    }
    $scope.$on('editListSuccess', function (d, data) {
      $scope.getListedPost();
    });
    // 选择某一个
    $scope.checkOne = function (item,index) {
      item.check = !item.check;
      $scope.checkAllList=false;
      $scope.banListItems = $scope.listedList.filter(function (e) {
        return e.check;
      })
      $scope.listCheckLen = $scope.banListItems.length;
      if ($scope.banListItems.length == $scope.listedList.length) {
        $scope.check_All = true;
      } else {
        $scope.check_All = false;
      }
    }
    //全选当前页
    $scope.checkAll = function (val) {
      if(val=='all'){
        $scope.checkAllList=!$scope.checkAllList;
        $scope.listCheckLen = $scope.checkAllList ? $scope.listedTotalNum:0;
        $scope.check_All=$scope.checkAllList ? true:false;
      }else{
        $scope.check_All = !$scope.check_All;
        $scope.checkAllList=false;
        $scope.banListItems = $scope.check_All?$scope.listedList:[];
        $scope.listCheckLen = $scope.banListItems.length;
      }
      $scope.listedList.forEach(function (e) {
        e.check = $scope.check_All;
      })
    }
    $scope.banListItems = [];
    //
    $scope.banchList = function () {
      if(!$scope.checkAllList){
        getSelectFun();
      }
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
      console.log(list)
      for (var i = 0; i < list.length; i++) {
        if (list[i].BIGIMG) {
          list[i].BIGIMG = list[i].BIGIMG.replace('https://', '').replace('http://', '');
          list[i].BIGIMG = 'https://' + list[i].BIGIMG;
        }
        list[i].INVENTORCOUNTRY = list[i].INVENTORCOUNTRY
          ? JSON.parse(list[i].INVENTORCOUNTRY)
          : {China: 0, US: 0};
        list[i].decountry = null;
        list[i].deltPrice = 0;
        
        if(list[i].ACCPRICE){
          list[i].ACCPRICE = `${list[i].ACCPRICE}`
        }

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
          shopType:list[i].SHOPTYPE,
          pid: list[i].PID,
          // shipDiscount: list[i].discountShopRate,
          areaCountryCode: list[i].areaCountryCode,
          index1: i
        }
      }
      $scope.listedList = list;
      console.log($scope.listedList);
    }

    // 物流试算组件返回值接收
    $scope.$on('saveShipPrice', function (d, data) {
      if (data.shipDiscountPrice) {
        $scope.listedList[data.index1].isProAmountTip = false
      }
      $scope.listedList[data.index1].AMOUNTPRICE = dsp.cacuAmount($scope.listedList[data.index1].SELLPRICE, data.shipDiscountPrice || 0);
      setTimeout(function () {
        $scope.$apply()
      })
    })
    
    //开启刊登任务之后轮询执行每一条刊登,status为1时
    $scope.listIndex = 0;
    $scope.progressLength=0;
    $scope.checkAllList = false;//是否全部选择
    $scope.listCountdownObj = {
      isShow:false,
      time:30
    }
    let timer =null;
    function startListFun(){
      dsp.postFun('listed_products/listedLocproduct/do',{
        id:$scope.listedList[$scope.listIndex].ID
      }, function (data) {
        layer.closeAll('loading');
        let ocode = data.data.statusCode;
        if (ocode == 801||ocode == 804) {
          $scope.listedList[$scope.listIndex].status=2;
        }else{
          $scope.listedList[$scope.listIndex].status=3;
        }
        $scope.progressLength=(Number($scope.listIndex-0+1)/Number($scope.listedList.length)*100).toFixed(0);
        if($scope.listIndex==$scope.listedList.length-1&&$scope.listedList.length==100){//
          $scope.listCountdownObj.isShow = true;
          function countDownFun(){
            if($scope.listCountdownObj.time>0){
              $scope.listCountdownObj.time-=1;
              timer = setTimeout(countDownFun,1000);
              if($scope.listCountdownObj.time<29){
                $scope.$apply();
              }
            }else{
              clearTimeout(timer);
              $scope.getListedPost();
            }
          }
          countDownFun();
        }
        if(($scope.listIndex<$scope.listedList.length-1) && liststatus==1){
          $scope.listIndex += 1;
          startListFun();
        }
      })
    }
    function getShopList(){
//        const msgLoading = cjMessage.loading({ isFixed: true });
      //获取店铺列表
      dsp.postFun('app/shop/getshop',{
        data:JSON.stringify({userId:userId})
      }, (res)=>{
        // msgLoading.hide();
        var obj = JSON.parse(res.data.result);
        $scope.shopList = obj.shoplist;
      }, () => {
        // msgLoading.hide();
      })
    }
    function resetListing(){//重置listing数据
      clearTimeout(timer);
      $scope.listIndex=0;
      $scope.listCountdownObj = {
        isShow:false,
        time:30
      }
      $scope.progressLength=0;//百分比进度条重置为0
      $scope.check_All=false;
      $scope.listCheckLen = 0
      $scope.checkAllList = false;
    }
    $scope.getListedPost = function () {
      resetListing();
      let getListedList = {
        pageNum: $scope.listedpagenum + '',
        pageSize: ($scope.status==1?100:$scope.listedpagesize) + '',
        shopId: $scope.shopId,
        inputStr: $scope.listedsearch,
        status: $scope.status
      };
      $scope.listedList = [];
      dsp.loadPercent($('.cj-load-wrap'), skuPicHeight);
      dsp.postFun(listDataObj[$scope.status], JSON.stringify(getListedList), function (data) {
        dsp.closeLoadPercent($('.cj-load-wrap'));
        var data = data.data;
        if (data.statusCode != 200 || data.result == '') {
          $scope.listedList = [];
          $scope.listedTotalNum = 0;
          $scope.listedTotalPage = 0;
          $scope.hasListedData = false;
          $scope.noListedData = true;
          return false;
        }
        var result = JSON.parse(data.result);
        if (result.totle == 0) {
          $scope.listedList = [];
          $scope.listedTotalNum = 0;
          $scope.listedTotalPage = 0;
          $scope.hasListedData = false;
          $scope.noListedData = true;
          console.log(data);
          return false;
        }
        
        $scope.listedTotalNum = result.totle;
        $scope.listedTotalPage = Math.ceil(($scope.listedTotalNum * 1) / ($scope.listedpagesize * 1));
        $scope.hasListedData = true;
        $scope.noListedData = false;
        settleData(result);
        if($scope.status=='1'&&$scope.listedList.length>0){
          liststatus = 1;//当前在轮询刊登列表
          $scope.listedList = $scope.listedList.map(item=>{
            item.status=1;
            return item;
          })
          startListFun();
        }else{
          liststatus=2;//当前不在轮询刊登列表
        }
        if($scope.status=='-1'||$scope.status=='2'){//在listed与list Fail列表时请求店铺接口
          getShopList();
        }
        $scope.$broadcast('page-data', {
          pageNum:$scope.listedpagenum * 1,
          totalNum:$scope.listedTotalPage,
          totalCounts:$scope.listedTotalNum * 1,
          pageSize:$scope.listedpagesize,
          pagesizeList:['10','20','50']
        });
      });
    }
    $scope.getListedPost();
    $scope.$on('pagedata-fa',function(d,data){//分页切换数据监听
      $scope.listedpagenum = data.pageNum;
      $scope.listedpagesize = data.pageSize;
      $scope.getListedPost();
    })
    $scope.enterSearch = function (event) {
      if (event.keyCode == 13) {
        $scope.getListedPost();
      }
    }

    var deleteItem = {};
    $scope.content = 'Are you sure to delete it?';
    // $scope.title = 'Prompt';
    $scope.title = '';
    $scope.listeddelet = function (item, index) {
      deleteItem = item;
      deleteItem.index = index;
      $scope.confirmDelLayer = true;
      $scope.banListItems.push(item);
      $scope.queueParams.ids = [item.ID];
    }
    // 获取弹窗组件关闭按钮
    $scope.$on('closePopUps', (e, data) => {
      $scope.confirmDelLayer = data.showPopUps;
    })
    // 获取弹窗组件确定按钮
    $scope.$on('confirmPopUps', (e, data) => {
      if($scope.status == '-1') {
        $scope.doDelete();
      } else if($scope.status == 0 || $scope.status == 2) {
        $scope.doDelete2();
      }
    })

    $scope.handleCancelAuthorization = () => {
      $scope.authorizationExpired = false;
    }

    $scope.handleConfirmAuthorization = () => {
      const shopType = replaceStr(deleteItem.SHOPTYPE)
      function replaceStr(str){ // 正则使首字母大写
        str = str.toLowerCase();
        var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
        return str.replace(reg,function(m){ 
         return m.toUpperCase()
        });
       }
      if(shopType) {
        $location.path(`/authorize/${shopType}`).search({track: '', storeName: `${deleteItem.SHOPNAME}`})
      }
      $scope.handleCancelAuthorization();
    }

    $scope.isRutter = function(type){
      return /(etsy|wix)/i.test(type)
    }

    $scope.doDelete = function () {//在listed的tab使用
      if (deleteItem.SHOPTYPE == "Woocommerce") {
        const msgLoading = cjMessage.loading({ isFixed: true });
        dsp.getFun('woo/wooDeleteProduct?id=' + deleteItem.ID, function (data) {
          msgLoading.hide();
          if (data.data.code == 200) {
            $scope.listedList.splice(deleteItem.index, 1);
            $scope.confirmDelLayer = 0;
          } 
          else if(data.data.code == 209) {
            // 店铺处于授权失效状态
            $scope.confirmDelLayer = false;
            $scope.authorizationExpired = true;
          return false;
          }
          else {
            layer.msg('The product cannot be deleted because the store is deactivated.');
          }
        }, function() {
          msgLoading.hide();
        })
      } else if (deleteItem.SHOPTYPE == "Lazada") {
        const msgLoading = cjMessage.loading({ isFixed: true });
        dsp.postFun('lazada/product/deleteProductById', {
          'shopId': deleteItem.SHOPID, 'accPid': deleteItem.ACCPID
        }, function (data) {
          msgLoading.hide();
          var data = data.data;
          if(data.statusCode == 209) {
            // 店铺处于授权失效状态
            $scope.confirmDelLayer = false;
            $scope.authorizationExpired = true;
            return false;
          }
          if (data.statusCode != 200) {
            layer.msg('The product cannot be deleted because the store is deactivated.');
            return false;
          }
          layer.msg('Delete successfully', {
            time: 1000
          });
            $scope.getListedPost(); // 刷新列表
          $scope.confirmDelLayer = 0;
        }, function() {
          msgLoading.hide();
        });
      } else if (deleteItem.SHOPTYPE == "shopee") {
        const msgLoading = cjMessage.loading({ isFixed: true });
        dsp.postFun('shopee/product/deleteProductById', {
          'shopId': deleteItem.SHOPID,
          'accPid': deleteItem.ACCPID
        }, function (data) {
          msgLoading.hide();
          var data = data.data;
          if(data.statusCode == 209) {
            // 店铺处于授权失效状态
            $scope.confirmDelLayer = false;
            $scope.authorizationExpired = true;
            return false;
          }
          if (data.statusCode != 200) {
            layer.msg('The product cannot be deleted because the store is deactivated.');
            return false;
          }
          layer.msg('Delete successfully', {
            time: 1000
          });
          $scope.getListedPost(); // 刷新列表
          $scope.confirmDelLayer = 0;
        }, function() {
          msgLoading.hide();
        }, function() {
          msgLoading.hide();
        });
      } else if (deleteItem.SHOPTYPE == "ebay") {
        const msgLoading = cjMessage.loading({ isFixed: true });
        var reqData = {
          pid: deleteItem.ACCPID,
          shopId: deleteItem.SHOPID
        }
        dsp.postFun('ebay/endProduct', reqData, function (data) {
          msgLoading.hide();
          if (data.data.statusCode == 200) {
            $scope.listedList.splice(deleteItem.index, 1);
            $scope.confirmDelLayer = 0;

            layer.msg('Delete successfully', {
              time: 1000
            });
          } 
          else if(data.data.statusCode == 209) {
            // 店铺处于授权失效状态
            $scope.confirmDelLayer = false;
            $scope.authorizationExpired = true;
            return false;
          }
          else {
            layer.msg('The product cannot be deleted because the store is deactivated.');
          }
        }, function() {
          msgLoading.hide()
        },function() {
          msgLoading.hide();
        })
      } else if($scope.isRutter(deleteItem.SHOPTYPE)) {
        const reqData = {
          listId: deleteItem.ID,
          shopId: deleteItem.SHOPID
        }
        debugger
        const msgLoading = cjMessage.loading({ isFixed: true });
        dsp.postFun('platform-product/publish/deletePublishRecord', reqData, function(res) {
          msgLoading.hide()
          if (res.data.code == 200) {
            $scope.listedList.splice(deleteItem.index, 1);
            $scope.confirmDelLayer = 0;

            layer.msg('Delete successfully', {
              time: 1000
            });
          } 
        }, function(){
          msgLoading.hide()
        })
      } else {
        const msgLoading = cjMessage.loading({ isFixed: true });
        dsp.getFun('pojo/product/cancelListed?id=' + deleteItem.ID, function (data) {
          msgLoading.hide();
          var data = data.data;
          if(data.statusCode == 209) {
            // 店铺处于授权失效状态
            $scope.confirmDelLayer = false;
            $scope.authorizationExpired = true;
            return false;
          }
          if (data.statusCode != 200) {
            // layer.msg('Delete failed');
            layer.msg('The product cannot be deleted because the store is deactivated.');
            return false;
          }
          layer.msg('Deleted Successfully', { time: 1000 });
          $scope.getListedPost(); // 刷新列表
          $scope.confirmDelLayer = false;
        }, function() {
          msgLoading.hide();
        })
        return false;
      }
    }
    //全部删除
    function deleteAllFun(){
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun('cj/listedproduct/deleteAll',{}, function (data) {
        msgLoading.hide();
        if (data.data.statusCode == 200) {
          //循环删除item
          $scope.getListedPost();
          $scope.confirmDelLayer = false;
        } else if(data.data.statusCode == 209) {
          // 店铺处于授权失效状态
          $scope.confirmDelLayer = false;
          $scope.authorizationExpired = true;
          return false;
        } else {
          layer.msg('The product cannot be deleted because the store is deactivated');
        }
      }, function() {
        msgLoading.hide();
      })
    }
    //全部删除
    function deleteAllFailFun(){
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun('cj/listedproduct/deleteAllFail',{}, function (data) {
        msgLoading.hide();
        if (data.data.statusCode == 200) {
          //循环删除item
          $scope.getListedPost();
          $scope.confirmDelLayer = false;
        } else if(data.data.statusCode == 209) {
          // 店铺处于授权失效状态
          $scope.confirmDelLayer = false;
          $scope.authorizationExpired = true;
          return false;
        } else {
          layer.msg('The product cannot be deleted because the store is deactivated');
        }
      }, function() {
        msgLoading.hide();
      })
    }
    //刪除列表
    $scope.doDelete2 = function () {
      if($scope.checkAllList){
        if($scope.status=='0'){
          deleteAllFun();
        }else{
          deleteAllFailFun();
        }
      }else{
        const msgLoading = cjMessage.loading({ isFixed: true });
        dsp.postFun('cj/listedproduct/delete',$scope.queueParams.ids, function (data) {
          msgLoading.hide();
          if (data.data.statusCode == 200) {
            //循环删除item
            $scope.getListedPost();
            $scope.confirmDelLayer = false;
          } else if(data.data.statusCode == 209) {
            // 店铺处于授权失效状态
            $scope.confirmDelLayer = false;
            $scope.authorizationExpired = true;
            return false;
          } else {
            layer.msg('The product cannot be deleted because the store is deactivated');
          }
        }, function() {
          msgLoading.hide();
        })
      }
    }

    $scope.categoryType = 'select' || 'input';

    //获取选择的id数组
    function getSelectFun(){
      $scope.banListItems = $scope.listedList.filter(function(e) {
        return e.check;
      })
      if ($scope.banListItems.length == 0) {
        throw layer.msg('Please select at least one product!');
      }
      let oarr = $scope.banListItems.map(item=>{
        return item.ID
      });
      $scope.queueParams.ids=oarr;
    }
    $scope.startList = (val) => {//开始提交刊登
      if($scope.listedList.length==0) return false;
      if($scope.checkAllList){
        $scope.check_All=false;
        $scope.listCheckLen = 0
        $scope.listedList.forEach(item=> {
          item.check=false;
        })
      }else{
        getSelectFun();
      }
      const dom = document.getElementById('router-outlet-wrap')
        const msgLoading = cjMessage.loading({ popupContainerDom: dom });
      //获取店铺列表
      dsp.postFun('app/shop/getshop',{
        data:JSON.stringify({userId:userId})
      }, (res)=>{
        msgLoading.hide();
        var obj = JSON.parse(res.data.result);
        if(obj.shoplist){
          //目前只支持shopify的店铺
          $scope.shopList = (obj.shoplist).filter(item=>{
            if(item.TYPE=='shopify') return item;
          });
          if($scope.shopList.length>0){
            $scope.showStartListDialog = true;
          }else{
            layer.open({
              area: ['480px', '200px'],
              title: '',
              closeBtn: 0,
              btn: ['Confirm'],
              shadeClose: true,
              skin: '',
              content: '<p style="margin-top:45px">The listing feature is only available to Shopify stores now.</p>',
              yes: function (index, layero) {
                  layer.close(index);
              }
            });
          }
        }else{
          layer.msg('Failed to get your stores');
        }
      }, () => {
        msgLoading.hide();
      })
    }
    //提交刊登请求数据
    $scope.queueParams = {
      logistics:'',
      taxable:'0',
      tax:false
    };
    //全部提交到刊登队列
    $scope.submitAllFun =()=>{
      dsp.postFun('cj/listedproduct/submitAll', $scope.queueParams, (res)=>{
        $scope.msgLoading && $scope.msgLoading.hide();
        location.href='myCJ.html#/products-connection/history/1';
      });
    }

    //提交到刊登队列
    $scope.listConfirmFun = ()=>{
      if (!$scope.shopItem) return layer.msg('Please select a store first.');
      if (!$scope.categoryItem) return layer.msg('Please select the category.');
      if (!$scope.shippingItem) return layer.msg('Please select the logistics.');
      if($scope.categoryType=='select'){
        $scope.queueParams.productType = $scope.categoryItem.name;
      }
      $scope.queueParams.shopId = $scope.shopItem.ID;
      $scope.queueParams.shopName = $scope.shopItem.NAME;
      $scope.queueParams.logistics = $scope.shippingItem.nameEn;
      $scope.queueParams.taxable=$scope.queueParams.tax?'1':'0';
      $scope.queueParams.collectionId = $scope.collectionId ? $scope.collectionId : '';
      console.log($scope.queueParams)
      if(!$scope.queueParams.shopId){
        return layer.msg('Please select Store');
      }else if(!$scope.queueParams.productType){
        return layer.msg('Please select Category')
      }else if(!$scope.queueParams.logistics){
        return layer.msg('Please select Shipping')
      }
       $scope.msgLoading = cjMessage.loading({ isFixed: true });
      if($scope.checkAllList){//全部选择
        $scope.submitAllFun();
      }else{
        dsp.postFun('cj/listedproduct/submit', $scope.queueParams, (res)=>{
          $scope.msgLoading && $scope.msgLoading.hide();
          location.href='myCJ.html#/products-connection/history/1';
        });
      }
    }
    function getShippingFun(){//获取物流列表
      // dsp.postFun2('getNewModeByShopType.json',{shopeType:$scope.shopItem.TYPE}, function (data) {
      //   $scope.shippingList = data.data;
      //   console.log(data)
      // })
      dsp.getShipListNew({
        platForms: [$scope.shopItem.TYPE]
      }, function (data) {
        $scope.shippingList = data;
      });
    }

    //修改店铺获取相应的标题和物流
    $scope.changeListFun = ()=>{
      console.log($scope.shopItem)
      //获取商品
        const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.getFun(`pojo/product/ShopifyProductType?shopId=${$scope.shopItem.ID}`, function (data) {
        msgLoading.hide();
        $scope.categoryList = JSON.parse(data.data.result) || [];
        $scope.categoryList = $scope.categoryList.map(item => {
          item.name = item.product_type; // 统一店铺名称 name 字段，方便模版取值
          return item;
        });
      }, function() {
        msgLoading.hide();
      })
      getShippingFun();
      // 告诉shopify collections组件切换店铺了
      $scope.$broadcast('quick-list', {
        flag: 'chan-store',
        store: $scope.shopItem
      });
    }
    // 接收shopify collections组件传过来的collectionId
    $scope.$on('shopify-collections', function (ev, data) {
      if (data.flag == 'fresh-collection-id') {
        $scope.collectionId = data.collectionId;
      }
    })
    $scope.listPriceObj = {//编辑金额参数
      flag:'2',//0:固定价格；1:+；2：*
      price:'',
      lastPrice:'',
      fixedPrice:''
    }
    $scope.confirmPriceFun=()=>{
      $scope.check_All=false;
      $scope.listCheckLen = 0
      let param = {};
      if($scope.priceCheck){
        param.flag = '0';
        param.price = $scope.listPriceObj.fixedPrice;
      }else{
        param.flag = $scope.listPriceObj.flag;
        param.price = $scope.listPriceObj.price;
      }
      if($scope.checkAllList){
        dsp.postFun('cj/listedproduct/updatePriceAll', param, (res)=>{
          $scope.getListedPost();
          $scope.showEditPriceDialog=false;
        });
      }else{
        param.ids= $scope.queueParams.ids
        console.log(param)
        dsp.postFun('cj/listedproduct/updatePrice', param, (res)=>{
          $scope.getListedPost();
          $scope.showEditPriceDialog=false;
        });
      }
      
    }
    function onlyprice(){
	    $scope.listPriceObj.price = $scope.listPriceObj.price.replace(/[^\d.]/g, "");
	    //必须保证第一个为数字而不是.
	    $scope.listPriceObj.price = $scope.listPriceObj.price.replace(/^\./g, "");
	    //保证只有出现一个.而没有多个.
	    $scope.listPriceObj.price = $scope.listPriceObj.price.replace(/\.{2,}/g, ".");
	    //保证.只出现一次，而不能出现两次以上
      $scope.listPriceObj.price = $scope.listPriceObj.price.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
      $scope.listPriceObj.price = $scope.listPriceObj.price.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    }
    $scope.changeFiexdPriceFun=()=>{
	    $scope.listPriceObj.fixedPrice = $scope.listPriceObj.fixedPrice.replace(/[^\d.]/g, "");
	    //必须保证第一个为数字而不是.
	    $scope.listPriceObj.fixedPrice = $scope.listPriceObj.fixedPrice.replace(/^\./g, "");
	    //保证只有出现一个.而没有多个.
	    $scope.listPriceObj.fixedPrice = $scope.listPriceObj.fixedPrice.replace(/\.{2,}/g, ".");
	    //保证.只出现一次，而不能出现两次以上
      $scope.listPriceObj.fixedPrice = $scope.listPriceObj.fixedPrice.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
      $scope.listPriceObj.fixedPrice = $scope.listPriceObj.fixedPrice.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    }
    $scope.changePriceFun = ()=>{
      onlyprice($scope.listPriceObj.price);
      if($scope.listPriceObj.flag=='1'){
        $scope.listPriceObj.lastPrice=($scope.listPriceObj.price-0)+10
      }else{
        $scope.listPriceObj.lastPrice=($scope.listPriceObj.price-0)*10
      }
    }
    $scope.listNowFun = (item)=>{
      window.open(`product-detail.html?id=${item.PID}&from=all&fromType=all&list=1`);
    }
    $scope.editPriceFun=()=>{
      if(!$scope.checkAllList){//当前不是全选时判断
        getSelectFun();
      }
      $scope.showEditPriceDialog=true;
    }
    $scope.closeCountdownFun = ()=>{
      clearTimeout(timer);
      $scope.listCountdownObj.isShow=false;
    }
    $scope.newCategory = () => {
      if (!$scope.shopItem) return layer.msg('Please select a store first.');
      if (!$scope.queueParams.productType) return layer.msg("Please input the new category.");
      if ($scope.queueParams.productType) {
        $scope.categoryList.push({
          name: $scope.queueParams.productType
        })
        $scope.categoryType = 'select';
      }
    }
    
    /* 头部菜单进入埋点 */
    function trackFun(){
      dsp.postFun('pojo/home/addStatisByType',{
          entryPage:+dsp.getQueryString('track')
      },res=> {console.log(res.data)})
    }
    if(+dsp.getQueryString('track')==10){
        trackFun();
    }
    }]);

  return app;
}