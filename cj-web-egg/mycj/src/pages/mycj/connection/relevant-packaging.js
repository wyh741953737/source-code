import _ from 'lodash'

export function relevantPackagingFactory(angular) {
  const app = angular.module('relevant-packaging.module', []);

  app.controller('relevant-packaging.ctrl', ['$scope', '$rootScope', '$stateParams', 'dsp',
    function ($scope, $rootScope, $stateParams, dsp) {
      /*
      * 默认配置
      * */
      dsp.setRightMinHeight();
      // $('.header-nav li').eq(2).addClass('active');
      $('.header-nav li').eq(2).addClass('active productActive');
      
      $scope.PACKAGE_LIMIT_NUM = 5 // 最多添加包装 5 个
      //数据声明
      $scope.pageNum = '1';
      $scope.pageSize = '8';
      $scope.totalNum = null;
      $scope.inputStr = '';
      $scope.dataList = null;
      $scope.matchingType = '1';//配货类型
      $scope.count = '1';//配货数量
      $scope.packagingType = '1'//包装类型
      $scope.packagingPropertiesArr = [
        { name: 'Plastic bags', prop: 'PLASTIC_BAG', flag: false },
        { name: 'Cartons', prop: 'PAPER_BOX', flag: false },
        { name: 'Plastic box', prop: 'PLASTIC_BOX', flag: false },
        { name: 'Cloth bags', prop: 'FARBIC_BAG', flag: false },
        { name: 'Paper bags', prop: 'PAPER_BAG', flag: false },
        { name: 'Tags', prop: 'HANG_TAG', flag: false },
        { name: 'Stickers', prop: 'STICKER', flag: false },
        { name: 'Cards', prop: 'KAPIAN', flag: false },
        { name: 'Gifts', prop: 'GIFT', flag: false },
        { name: 'Others', prop: 'MATERIAL', flag: false }
      ];//包装性质
      $scope.packingKey = '';//包装性质
      $scope.queryType = 'Name'; // 搜索类型
      $scope.queryName = 'Packaging Name'; // 搜索类型
      $scope.queryNameLower = String($scope.queryName).toLocaleLowerCase();  // 搜索类型小写
      $scope.packageSelectedArr = {}; // 已选择包装类型
      // 统计选择了商品的变体数量
      $scope.packageSelectedNum = {}
      $scope.associationType = $stateParams.type;
      if($stateParams.itemData==1){
        const data = localStorage.getItem('relevantpackage');
        $scope.itemData = JSON.parse($rootScope.base64.decode(data));
      }else{
        const data  = JSON.parse($rootScope.base64.decode($stateParams.itemData));
        $scope.itemData = [data];
      }
      

      console.log('itemData====',$scope.itemData)
      $scope.itemDataList = $scope.itemData.length < 6
      // 是否来自商品页
      $scope.isFromPro = !!$scope.itemData.pid == true;

      (function () {
          // 如果选择的是变体，则获取已经选择 sku
          if(!$scope.isFromPro){
            _getCheckedList($scope.itemData.VID).then(data=>{
                // 统计选择了商品的变体数量 mock
                // $scope.packageSelectedArr = {
                //   '576A8447-006A-4DD5-ABB6-2646E967876B':[{sku:'hhhdfhdh',packVid:'TWEWRWRTYU'}]
                // }
                $scope.packageSelectedArr = _.groupBy(data,'packPid')
            })
          }
        })()

      //加减
      $scope.plusOne = function () {
        $scope.count = $scope.count * 1 + 1 + '';
      }
      $scope.minusOne = function () {
        if ($scope.count == '1') return;
        $scope.count = $scope.count * 1 - 1 + '';
      }
      $scope.checkIsNum = function () {
        if (isNaN($scope.count * 1) || $scope.count * 1 < 1) {
          $scope.count = '1'
        }
      }

      //搜索 查询
      //包装类型
      $scope.packagingTypeFun = function (type) {
        $scope.packagingType = type;
        $scope.pageNum = '1';
        getData();
      };
      //包装性质
      $scope.packagingPropertiesFun = function (item) {
        item.flag = !item.flag;

        // 最多只能选 3 个
        if($scope.packagingPropertiesArr.filter(pack=>pack.flag === true).length > 3){
          item.flag = !item.flag;
          layer.msg('You can select 3 packages at most once.')
          return
        }

        $scope.pageNum = '1';
        let arr = [];
        $scope.packagingPropertiesArr.forEach((o, i) => {
          if (o.flag) {
            arr.push(o.prop)
          }
        });
        $scope.packingKey = arr.join(',');

        getData();
      };
      $scope.searchPro = function () {
        $scope.pageNum = '1';
        getData();
      };
      $scope.enterSearch = function (event) {
        if (event.keyCode == 13) {
          $scope.searchPro();
        }
      }

      //获取数据
      function getData() {
        var parms = {
          [$scope.queryType]: $scope.inputStr,
          type: $scope.packagingType,
          pageNum: $scope.pageNum,
          pageSize: $scope.pageSize,
          packingKey: $scope.packingKey
        };

        const msgLoading = cjMessage.loading({ isFixed: true })
        $scope.dataList = null;
        dsp.postFun('cj/PackProduct/queryPackProductInfo', parms, (res) => {
          msgLoading.hide();
          if (res.data.statusCode === '200') {
            $scope.dataList = res.data.result.list;
            $scope.totalNum = res.data.result.count;
            $scope.totalPageNum = Math.ceil($scope.totalNum / $scope.pageSize);
            $scope.$broadcast('page-data', {
              pagesizeList: ['8', '16', '24'],
              pageNum: $scope.pageNum,
              totalNum: $scope.totalPageNum,
              totalCounts: $scope.totalNum,
              pageSize: $scope.pageSize
            });
          }
        }, (err) => {
          msgLoading.hide();
          console.log(err);
        })
      }

      getData();

      $scope.$on('pagedata-fa', function(d, data) {
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getData(dsp, $scope);
      });
      //切换关联订单或商品选项
      $scope.matchingChange = (type)=>{
        $scope.matchingType = type;
        checkStandInfoChecked();
      }
      // 选择商品
      $scope.showPackage=false;
      $scope.selectPro = function(proItem,e,index) {
        // 存当前选择的 item
        $scope.currentItem = {proItem,e}

        let current = $(e.currentTarget)
        let { top,left } = current.offset()
        let headerHeight = $('mycj-header').height()
        console.log(proItem)
        // 把当前选择的商品凸显
        $(e.currentTarget).css('z-index',4)

        // 计算展开盒子默认位置
        $('.package-sku-box').css({
          'left':left,
          'top':top + $('#router-outlet-wrap').scrollTop() - headerHeight,
          'z-index':9
        });
        if(proItem.standInfo){
          $scope.standInfo=proItem.standInfo;
          checkStandInfoChecked()

          // 计算展开盒子展开时位置
          _positionVariantPopup();
          $scope.showPackage = !$scope.showPackage;
          console.log('showProduct====',$scope.showPackage)
        }else{
          const msgLoading = cjMessage.loading({ isFixed: true });
          // 获取变体信息
          dsp.getFun('cj/PackProduct/getProductStandInfo?pid='+proItem.PID, (res) => {
            layer.closeAll('loading');
            msgLoading.hide();
            if (res.data.statusCode === '200') {
              // 获取到变体信息
              $scope.standInfo = res.data.result;
              $scope.dataList[index].standInfo=$scope.standInfo;
              $scope.showPackage=true;
              checkStandInfoChecked()

              // 计算展开盒子展开时位置
              _positionVariantPopup()
            }
          }, (err) => {
            $scope.standInfo = []
            layer.closeAll('loading');
            console.log(err);
          })
        }
      };

      // 只要列表数据有变动就要合并检查
      $scope.$watch('dataList',function () {
        checkStandInfoChecked()
      })

      // 检查展开盒子的高度，如果页面变动，要及时变动
      function _positionVariantPopup() {
        // 如果没选中
        if(!$scope.currentItem){
          return
        }
        // index 为选择商品的序号
        let { e } = $scope.currentItem;

        let current = $(e.currentTarget);
        let { top, left } = current.offset();
        let headerHeight = $("mycj-header").height();

        // 计算展开盒子展开时位置
        if($(window).width() - left - current.width() > $(".package-sku-box").outerWidth()){
          // 如果右边能展示 则在右边屏幕展示，显示不下，从左边推出
          $(".package-sku-box").animate(
            {
              left: current.width() + left,
              top: top + $("#router-outlet-wrap").scrollTop() - headerHeight,
            },
            100
            );
          }else{
          // 从左边展开
          $(".package-sku-box").animate(
            {
              left: left -   $(".package-sku-box").outerWidth(),
              top: top + $("#router-outlet-wrap").scrollTop() - headerHeight,
            },
           100
          );

        }
      }

      // 关闭选择商品
      $scope.closePackageBox = function() {
        // 当前选择的 item
        let { proItem, e} = $scope.currentItem
        let current = $(e.currentTarget)
        current.css('z-index','auto')

        // 删除临时选中显示的信息
        delete proItem.tempStand
        $scope.showPackage = false;
      };

      // 查看关联包装 sku
      $scope.pickPackageSku = function(standItem){
        // 当前选择的商品
        let { proItem } = $scope.currentItem

        // 选中当前 sku 效果
        $scope.standInfo.forEach(standItem => standItem.selecting = false)
        standItem.selecting =  true

        // 当前选中的包装 sku
        // console.log('当前的 list: ', $scope.dataList);
        // console.log('选中的 item: ', proItem);
        // console.log('选中的规格 standItem: ', standItem);

        // 临时存放当前选中的包装 sku
        proItem.tempStand = {
          IMG:standItem.imgUrl, // 图片
          NAMEEN:standItem.name, // 名称
          WEIGHT:standItem.weight, // 重量
          long:standItem.long, // 长度
          width:standItem.width, // 宽度
          height:standItem.height, // 高度
          SELLPRICE:standItem.price, // 价格
          goodNum:standItem.remained, // 库存
          correlationNum:standItem.connected, // 关联数
          // selectNum:proItem.selectNum // 当前商品的选择的 sku 数
        }

      }
      // 切换选择关联包装 sku
      $scope.changeSelectPackageSku = function(standItem,e){
        e.stopPropagation()
        // 当前选择的商品
        let { proItem } = $scope.currentItem
        let isRemove = false;//是否重复选择并移除
        // 判断是否已经已选中
        $scope.skus = _.flatten(Object.values($scope.packageSelectedArr));
        const skuArr =  $scope.skus.map(i=>i.sku)
        if(skuArr.includes(standItem.sku)){
          // 删除
          _deleteSelectPackageSku(standItem.sku)
        }else{
          // 最多添加 5 个
          if($scope.skus.length === $scope.PACKAGE_LIMIT_NUM){
            layer.msg('Sorry, the packages selected exceed the limit.')
            return
          }
          // 如果没有，添加到数组中
          const packObj = {
            sku:standItem.sku,
            packVid:standItem.vid,
            matchingType:$scope.matchingType
          }
          if($scope.packageSelectedArr[proItem.PID]){
            $scope.packageSelectedArr[proItem.PID].push(packObj)
          }else{
            $scope.packageSelectedArr[proItem.PID] = [packObj]
          }
        }
        checkStandInfoChecked()
        _positionVariantPopup()
      }

      // 删除关联 sku
      function _deleteSelectPackageSku(sku) {
        for (const key in $scope.packageSelectedArr) {
          // value = [{sku:'ewqeqweqwe',vid:'EREWREWRW'},{sku:'gergergre',vid:'BBNDFD'}]
          $scope.packageSelectedArr[key] = $scope.packageSelectedArr[key].filter(value => value.sku !== sku)
        }
      }


      // 取消选择关联包装 sku
      $scope.cancelSelectPackageSku = function(sku){
        _deleteSelectPackageSku(sku)
        checkStandInfoChecked()
      }

      /**
       * 根据前端缓存的选中状态，修改信息状态
       * 1. 缓存选择的变体 id
       * 2. 缓存选择商品的变体数量
       */
      function checkStandInfoChecked() {
        // 找到对应 item 标签，增加选中状态

        $scope.skus =  _.flatten(Object.values($scope.packageSelectedArr));
        const skuArr =  $scope.skus.map(i=>i.sku)

        $scope.standInfo && $scope.standInfo.forEach((item) => {
          // 如果已经选择了选择的变体 id
          if (skuArr.includes(item.sku)) {
            item.isSelected = true;
          } else {
            item.isSelected = false;
          }
        })


        // 找到已经选择了的商品的,标记起选中数量
        $scope.dataList && $scope.dataList.forEach(item=>{
          item.selectNum = $scope.packageSelectedArr[item.PID] && $scope.packageSelectedArr[item.PID].length
        })
      }
      
      // 取消
      $scope.cancel = function() {
        history.go(-1);
      };
      // 确认选择
      $scope.confirm = function() {
        // const shopIdAll = $scope.itemData.map(o => o.shopId)
        // console.log(shopIdAll)
        $scope.dataList.forEach((o, i) => {
          if (o.select) {
            $scope.packVid = o.ID;
          }
        });
        // 包装商品集合
        let packList = []
        _.flatten(Object.values($scope.packageSelectedArr)).map(i=>{
          packList.push({
            packVid:i.packVid,
            matchingType:i.matchingType
          })
        })
        // 如果没有选择
        if (packList.length === 0) {
          layer.msg('Please choose the packing');
          return;
        }

        const plist = $scope.itemData.map(_item=>{
          return {
            pid:_item.pid,
            vid:_item.vid,
            shopId:_item.shopId,
            packList:packList
          }
        })
        var parms = plist;
        const msgLoading = cjMessage.loading()
        dsp.postFun('cj/PackConnection/batchAddCorrelation', parms, (res) => {
          msgLoading.hide();
          if (res.data.statusCode == '200') {
            layer.msg('Connection completed')
            history.go(-1);
          } else {
             // code为509时：没有相关的商店商品  绑定失败
            layer.msg('Connection failed')
          }
        }, (err) => {
          msgLoading.hide();
          console.log(err)
        })
      };

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

      $scope.categoryItemClick = function (key) {
        $scope.isShowCategory = 0;
        $scope.queryType = key

        const keyNameObj = {
          'name':'Name',
          'sku':'SKU'
        }

        $scope.queryName = 'Packaging '+ keyNameObj[key]
        $scope.queryNameLower = String($scope.queryName).toLocaleLowerCase();  // 搜索类型小写
      }

      //获取商品变体集合
      $scope.onClickViewPackageShow = function () {
          // 获取变体集合
          // 初始化下拉框
          $('.singleSelect').select2();

          dsp.getFun('cj/PackProduct/getProductStandList?pid='+$scope.itemData.pid+'&type='+$scope.itemData.connectType +'&shopId='+$scope.itemData.shopId, (res) => {
            layer.closeAll('loading');

            if (res.data.statusCode === '200') {
              console.log(res.data);
              $scope.viewPackagingModal = true
              $scope.proStandList = res.data.result
            }
          }, (err) => {
            $scope.proStandList = []
            layer.closeAll('loading');
            console.log(err);
          })

      }

      // 选择某个包装变体，查询详情
      $scope.onSelectPackaging = function () {

        if($scope.selectedVid){
          // 选择了变体，显示变体下关联的包装商品
          _getCheckedList($scope.selectedVid).then(data=>{
            $scope.vidCheckedList = data
            $scope.$apply()
          })

        }else{
          // 没有选择，则不要
          $scope.vidCheckedList = []
        }
      }

      // 关闭 view 弹框
      $scope.closeViewPackagingModal = function () {
        $scope.viewPackagingModal = false
        $scope.vidCheckedList = []
        $scope.selectedVid = ''
        $('.singleSelect').select2('destroy');
      }

      // 获取变体已关联包装商品
      function _getCheckedList(vid){
        return new Promise((resolve,reject)=>{
          dsp.postFun('cj/PackProduct/getCheckedList', {vid:vid,shopId:$scope.itemData.shopId}, (res) => {
            layer.closeAll('loading');
            if (res.data.statusCode == '200') {
              resolve(res.data.result.checkedList)
            } else {
              reject()
              $scope.vidCheckedList = []
            }
          }, (err) => {
            layer.closeAll('loading');
            console.log(err)
          })
        })
      }

      // 选中关联商品列表弹窗
      $scope.openProduct = () => {
        $scope.showProduct = true
      }

      $scope.cencelProduct = () => {
        $scope.showProduct = false
      }
      
    }]);

  return app;
}
