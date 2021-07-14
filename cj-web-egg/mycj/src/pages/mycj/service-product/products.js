export function serviceProductProductsFactory(angular) {
  const app = angular.module('service-product-products.module', []);

  app.controller('service-product-products.ctrl', ['$scope', '$rootScope', 'dsp', '$timeout', '$q',
    function ($scope, $rootScope, dsp, $timeout, $q) {
      function mypost(url, params) {//2019-7-4封装post方法
        return $q((resolve, reject) => {
          dsp.postFun(url, JSON.stringify(params), function ({ data }) {
            layer.closeAll('loading');
            const { result, statusCode, message } = data;
            if (statusCode != 200) {
              reject(data)
              return myMsg(message)
            }
            resolve(result)
          }, function (err) {
            console.log('errHandle  --->  ', err)
            reject(err)
            layer.closeAll('loading');
            // layer.msg('服务器错误')
          })
        })
      }
      $scope.status = '2';              // 0 提交审核 1 审核中  2  审核通过
      $scope.goodsShow = false;         // 申请服务商品
      $scope.trackingShow = false;      // 添加/修改运单
      $scope.shippingFeeShow = false;   // 费用详情
      $scope.shippingFeeHintShow = false; // 费用详情温馨提示
      $scope.goodsList = [];
      $scope.productList = [];
      $scope.serveMoneyList = [];
      $scope.productMoneyList = [];
      $scope.shippingFeeHintMoneyList = {};
      $scope.storagedoId ="";
      $scope.storeId = 2;
      $scope.pageNum = '1';
      $scope.pageSize = '10';
      $scope.goodsName = '';
      $scope.serveGoodsName = '';
      $scope.trackingName = '';        // 运单名称
      $scope.trackingNumber = '';      // 运单号
      $scope.num = '';                 // 数量
      $scope.quantityObj = {};         // 批次号数据
      $scope.downloadFlag = false;     // 下载状态
      $scope.downloadColor = false;    // 下载颜色
      $scope.selClass = false;
      $scope.warehouse = [];
      let bs = new Base64();
      $scope.loginName = bs.decode(dsp.getCookie('loginName'));
      console.log($scope.loginName,"loginName=========")

      var serviceItem = {};            // 费用集合
      let vip = $rootScope.userInfo.vip;
      $scope.vipStuFlag = vip;
      //根据国家code 判断storeId
      const countryCodeModal = {
        CN: { nameEn: 'cn', name: 'China warehouse', key: 1 },
        US: {nameEn: 'us', name: 'US warehouse', key: 2 },
        TH: {nameEn: 'th', name: 'Thailand warehouse', key: 3 },
        DE: {nameEn: 'de', name: 'Germany warehouse', key: 4 },
        ID: {nameEn: 'id', name: 'Indonesia warehouse', key: 5 },
      }

      /** 暂时隐藏深圳仓，德国仓"，"印尼仓",“泰国仓 */
      const hidewarehouseArr = ['08898c4735bf43068d5d677c1d217ab0','e18668c0-0b6b-4d07-837e-fe2150d9d9c9','f87a1c014e6c4bebbe13359467886e99'];

      if (vip == '1') {//vipFlag
        $('.mycj-right-wrap').css('background', '#F0EDE7').addClass('vip');
        $('.spzd-wrap').addClass('vip');
        $('.shipping-wrap').addClass('vip');
      } else {
        $('.mycj-right-wrap').css('background', '#f2f3f5').removeClass('vip');
        $('.spzd-wrap').removeClass('vip');
        $('.shipping-wrap').removeClass('vip');
      }
      dsp.setRightMinHeight();
      // 服务商品数据
      function getGoods() {
        $scope.goodsList = [];
        let data = {
          dbProductName: $scope.goodsName,
          pageNo: $scope.pageNum,
          pageSize: $scope.pageSize,
          statuses: $scope.status
        }
        $rootScope.$on('cj/server/getServeProductList', (_, bool) => {
          $scope.loading = bool;
          if (bool) $scope.notDataFound = false;
        });
        dsp.postFun('cj/server/getServeProductList', data, (res) => {
          $('.cj-load-wrap').css('min-height', '75vh')
          console.log(res)
          if(res.data.statusCode ==200){
            const result = res.data.result
            if (result.dPPointList.length > 0) {
              $scope.goodsList = result.dPPointList;
              $scope.totalNum = result.total;
              // if ($scope.totalPageNum > 0 && $scope.status != '2') {
              //   for (let i = 0, len = $scope.goodsList.length; i < len; i++) {
              //     try {
              //       $scope.goodsList[i].customerImage = JSON.parse($scope.goodsList[i].customerImage);
              //     } catch (error) {
              //       console.log(error)
              //     }
              //   }
              //   console.log($scope.goodsList)
              // }
              $scope.totalCounts = Math.ceil($scope.totalNum / $scope.pageSize);
              $scope.$broadcast('page-data', {
                pageNum: $scope.pageNum,
                totalNum: $scope.totalCounts,
                totalCounts: $scope.totalNum,
                pageSize: $scope.pageSize,
              });
            } else {
              $scope.notDataFound = true;
              $('.cj-load-wrap').css('min-height', $('.cj-nodata-pic').height() + 110)
            }
          }
          
        })
      };
      getGoods();
      // 导航切换
      $scope.navShow = (status) => {
        $scope.pageNum = '1';
        $scope.pageSize = '10';
        $scope.status = status;
        console.log($scope.status)
        getGoods();
      };
      // 搜索服务商品列表
      $scope.searchGoodsList = () => {
        getGoods();
      };
      //查看图片
      $scope.showImgsFun = function (imgs) {
        $scope.itemImgsArr = imgs;
        $scope.imgsFlag = true;
      }
      // 查看费用详情
      $scope.lookFeeDeteils = (item) => {

        const msgLoading = cjMessage.loading({ isFixed: true })
        mypost('cj/server/getDbServeProductMoney', { dbProductId: item.dbProductId }).then(res => {
          msgLoading.hide();
          $scope.shippingFeeShow = true;
          console.log('查看费用详情', res)
          $scope.productMoneyList = res;
          // console.log($scope.productMoneyList)
          // for (let i = 0, len = res.retMoney.length; i < len; i++) {
          //   if (res.retMoney[i].store_id == 3) {
          //     $scope.isHavTaiGuoFlag = true;
          //     break
          //   } else {
          //     $scope.isHavTaiGuoFlag = false;
          //   }
          // }
        }).finally(() => {
          msgLoading.hide();
        })
      };
      // 关闭费用详情
      $scope.cancelFeeDeteils = () => {
        $scope.shippingFeeShow = false;
      };
      // 申请服务商品
      $scope.productShow = () => {
        $scope.goodsShow = true;
      };
      // 关闭服务商品
      $scope.closeGoods = () => {
        $scope.goodsShow = false;
        $scope.serveGoodsName = '';
        $scope.productList = [];
      };
      // 搜索申请服务商品
      $scope.searchGoods = () => {
        if (!$scope.serveGoodsName) {
          layer.msg('Product Title is required')
          return
        }
        dsp.load()
        mypost('cj/server/getDbProductList', { name: $scope.serveGoodsName }).then(res => {
          console.log('searchGoods', res)
          $scope.productList = res.filter(({ NAMEEN }) => NAMEEN.split(' ').every(str => str.length < 30));//过滤英文名 单词字符数 大于30的 记录 修复页面显示不正常
        })
      };
      
      $scope.wareData = []
      $scope.currWare;
      $scope.wareObj ={
        isLoad: true
      }
      function getStore(){
        dsp.postFun('storehouse/WarehousInfo/cjGetStorehouse', {useStorageType:'1'}, ({data}) => {
          if (data.code == '200') {
            $scope.wareObj.isLoad=false;
            let list = data.data||[];
            console.log('----------')
            console.log(list)
            /** 暂时隐藏深圳仓，德国仓"，"印尼仓",“泰国仓” --start */

            $scope.wareData = list.filter(item=>{
              return !item.storageNo2Name.includes('Zhi Fa') && hidewarehouseArr.indexOf(item.id) === -1
            });
             /** 暂时隐藏深圳仓，德国仓"，"印尼仓",“泰国仓” --end */

            // $scope.wareData = list.filter(item=>{
            //   if(!item.storageNo2Name.includes('Zhi Fa') && item.id !== "08898c4735bf43068d5d677c1d217ab0")
            //   return item;
            // });
            $scope.currWare = $scope.wareData[0];
          }
        })
      }
      $scope.chanWare = function (item) {
        $scope.currWare = item;
      }
      $scope.myMouseenter = function () {
        $scope.isAddress = true;
        if($scope.wareData.length==0) getStore();
      }
      $scope.myMouseleave = function () {
        $scope.isAddress = false
      }
      // 添加服务商品
      $scope.addGoods = function (item) {
        let data = {
          dbProductId: item.id,
          dbProductName: item.name,
          dbProductNameen: item.NAMEEN,
          dbImage: item.bigimg,
          dbSku: item.sku
        }
        dsp.postFun('cj/server/addServeProduct', data, (res) => {
          if (res.data.statusCode == '200') {
            $scope.goodsShow = false;
            $scope.serveGoodsName = '';
            layer.msg('Added Successfully');
            getGoods();
          }
        })
      };
      // 取消服务
      $scope.cancelGoods = (item) => {
        layer.confirm('Confirm to cancel?', {
          title: false,
          closeBtn: 0,
          btnAlign: 'c',
          skin: 'goods-class',
          btn: ['Confirm', 'Cancel'] //按钮
        }, function (index) {
          layer.close(index);
          dsp.postFun('cj/server/cancelServeProduct', { id: item.id }, (res) => {
            if (res.data.statusCode == '200') {
              layer.msg('Cancelled successfully');
              getGoods();
            }
          });
        }, function (index) {
          layer.close(index);
        });
      };
      function getWarehouseData() {
        const msgLoading = cjMessage.loading({ isFixed: true })
        dsp.getWareList({
          productType:1,
          successCallback:function(data){
            msgLoading.hide();

            /* 暂时隐藏深圳仓，德国仓"，"印尼仓",“泰国仓” --start */
            $scope.warehouse = data.filter((item)=> {
             return  hidewarehouseArr.indexOf(item.id) === -1
            });
             /* 暂时隐藏深圳仓，德国仓"，"印尼仓",“泰国仓” --end */


            // $scope.warehouse = data;
            $timeout(function(){
              $scope.storagedoId = "";
              $scope.storeId = ""
            },300)
          }
        });
      }
      $scope.addFwspWFun = function(){
        fixed2Fun()
      }
      $scope.addFwspMFun = function(){
        // $scope.addFwspMoney = $scope.addFwspMoney.replace(/[^\d]/g,'');
      }
      function fixed2Fun(){
        $scope.addFwspWeight = $scope.addFwspWeight.replace(/[^\d]/g,'');
        // $scope.addFwspWeight = $scope.addFwspWeight.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
        // $scope.addFwspWeight = $scope.addFwspWeight.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
      }
      // 添加订单和费用
      $scope.addTracking = (item) => {
        serviceItem = item;
        $scope.trackingShow = true;
        resetTracking();
        //cost(item.dbProductId);
        if($scope.warehouse.length==0) getWarehouseData();
      };
      $scope.addTrackingLink = function (item) {
        console.log(item)
        let outJson = {
          dbProductNameen: item.dbProductNameen
        }
        dsp.load()
        console.log($scope.storeId)
        console.log( $scope.storagedoId)
        dsp.postFun('pojo/procurement/getServeProCodeImg', outJson, function (res) {
          console.log(res)
          if (res.status == '200' && res.data.batchUrl) {
            let upJson = {
              dbProductId: item.dbProductId,
              dbProductName: item.dbProductName,
              dbProductNameen: item.dbProductNameen,
              dbServeProductId: item.id,
              dbSku: item.dbSku,
              dbImages: item.dbImage,
              batchUrl: res.data.batchUrl,
              batchNumber: res.data.batchNumber,
              status: 1,
              
              orderName: $scope.trackingName,
              storeId: $scope.storeId,
              storagedoId: $scope.storagedoId,
              trackingNumber: $scope.trackingNumber,
              num: $scope.num,
              deliveryTime: $("#cj-stime").val(),
              isDownload: 1,
              moneylist: []
            }
            for (let [i, item] of new Map($scope.serveMoneyList.map((item, i) => [i, item]))) {
              upJson.moneylist[i] = {
                serverMoneyId: item.serverMoneyId,
                status: item.status
              }
            }
            dsp.postFun('cj/server/insertServeOrder', upJson, function (data) {
              console.log(data)
              if (data.data.statusCode == 200) {
                localStorage.setItem('fwStu', 'downBatch')
                location.href = 'myCJ.html#/products-connection/waybill';
              } else {
                layer.msg(data.message)
              }
              dsp.closeLoad();
            }, function (data) {
              console.log(data)
              dsp.closeLoad();
              layer.msg('Unexpect Error.');
            })
          } else {
            layer.msg('Batch Number Generate Failed')
            dsp.closeLoad()
          }
        }, function (data) {
          console.log(data)
          dsp.closeLoad()
        })
        confirmTrackingflag = true;
      }
      // 国家筛选
      $scope.stateChange = function () {
        console.log($scope.storagedoId)//筛选的仓库id
        console.log($scope.warehouse)
        if(!$scope.storagedoId){
          $scope.storeId = "";
          $scope.serveMoneyList = []
          return
        }
        let countryCode = ""
        $scope.warehouse.forEach(item=>{
          if(item.id===$scope.storagedoId){
            countryCode = item.countryCode
          }
        })
        $scope.storeId = countryCodeModal[countryCode]
        ? countryCodeModal[countryCode].key : 1
        cost(serviceItem.dbProductId,$scope.storeId)
      };
      // 批次号
      $scope.quantityBlur = () => {
        if ($scope.trackingNumber && $scope.num) {
          let data = {
            trackingNumber: $scope.trackingNumber,
            num: $scope.num
          }
          $scope.quantityObj = {};
          $scope.downloadColor = false;
          $scope.downloadFlag = false;
          dsp.postFun('pojo/procurement/getServeProCodeImg', data, (res) => {
            if (res.status == '200') {
              $scope.quantityObj = res.data;
            }
          })
        }
      };
      // 单选框选中
      $scope.radioClick = (item, state) => {
        if (item.serverMoneyTypeId == 3 || item.serverMoneyTypeId == 2) {
          item.status = state;
        }
      };
      // 服务商品批次号下载
      $scope.batchDownload = () => {
        $scope.downloadFlag = true;
        $scope.downloadColor = false;
        if (!$scope.quantityObj.batchUrl) return;
        download('https://' + $scope.quantityObj.batchUrl);
      };
      // 关闭订单
      $scope.content = 'Confirm to cancel?';
      $scope.showPopUps = false;
      $scope.cancelTracking = () => {
        $scope.showPopUps = true;
      };
      // 获取弹窗组件关闭按钮
      $scope.$on('closePopUps', (e, data) => {
        layer.close(2);
        $scope.downloadFlag = false;
        $scope.downloadColor = false;
        $scope.showPopUps = data.showPopUps;
      })
      // 获取弹窗组件确定按钮
      $scope.$on('confirmPopUps', (e, data) => {
        layer.close(2);
        $scope.trackingShow = false;
        $scope.showPopUps = data.showPopUps;
      })

      // 服务商品确定新增订单
      let confirmTrackingflag = true;
      $scope.confirmTracking = () => {
        if (!$scope.trackingName) {
          layer.msg('Shipping Label Name is required');
          return;
        }
        if (!$scope.storagedoId) {
          layer.msg('Warehouse is required');
          return;
        }
        if (!$scope.trackingNumber) {
          layer.msg('Tracking number is required');
          return;
        }
        if (!$scope.num) {
          layer.msg('Quantity is required');
          return;
        }
        if (!$("#cj-stime").val()) {
          layer.msg('Date is required');
          return;
        }
        // 必须先下载批次号
        // if (!$scope.downloadFlag) {
        //   $scope.downloadColor = true;
        //   layer.msg('Please download the batch number first and then you can submit and move on to the next step', {
        //     area: '450px',
        //     time: 5000
        //   });
        //   return;
        // }
        // 防重
        if (!confirmTrackingflag) return;
        confirmTrackingflag = false;
        $scope.addTrackingLink(serviceItem)
        // let data = {
        //   orderName: $scope.trackingName,
        //   dbServeProductId: serviceItem.id,
        //   dbProductId: serviceItem.dbProductId,
        //   dbProductName: serviceItem.dbProductName,
        //   dbProductNameen: serviceItem.dbProductNameen,
        //   dbImages: serviceItem.dbImage,
        //   dbSku: serviceItem.dbSku,
        //   status: 1,
        //   storeId: $scope.storeId,
        //   storagedoId: $scope.storagedoId.id,
        //   trackingNumber: $scope.trackingNumber,
        //   num: $scope.num,
        //   deliveryTime: $("#cj-stime").val(),
        //   isDownload: 1,
        //   batchUrl: $scope.quantityObj.batchUrl,
        //   batchNumber: $scope.quantityObj.batchNumber,
        //   moneylist: []
        // }
        // for (let [i, item] of new Map($scope.serveMoneyList.map((item, i) => [i, item]))) {
        //   data.moneylist[i] = {
        //     serverMoneyId: item.serverMoneyId,
        //     status: item.status
        //   }
        // }
        // dsp.postFun('cj/server/insertServeOrder', data, (res) => {
        //   if (res.data.statusCode == '200') {
        //     $scope.trackingShow = false;
        //     confirmTrackingflag = true;
        //     $scope.shippingFeeHintShow = true;
        //     getShippingFeeHint(serviceItem.dbProductId, res.data.result);
        //   }
        // });
      };
      // 温馨提示费用
      function getShippingFeeHint(dbProductId, resultId) {
        $scope.shippingFeeHintMoneyList = {};
        let data = {
          dbProductId: dbProductId,
          storeId: $scope.storeId,
          dbServeOrderId: resultId
        }
        dsp.postFun('cj/server/getDbServeOrderMoney', data, (res) => {
          if (res.data.statusCode == '200') {
            $scope.shippingFeeHintMoneyList = res.data.result;
            for (let item of $scope.shippingFeeHintMoneyList.moneyList) {
              if (item.id == 7) {
                $scope.shippingFeeHintMoneyList.moneys = item.moneys;
              }
            }
          }
          console.log($scope.shippingFeeHintMoneyList);
        });
      };
      // 运单费用温馨提示
      $scope.cancelShippingFeeHint = () => {
        $scope.shippingFeeHintShow = false;
        layer.msg('Added successfully');
        getGoods();
      };
      // 费用数据
      function cost(dbProductId, storeType = 2) {
        let data = {
          dbProductId,
          storeType: parseInt(storeType)
        }
        $scope.serveMoneyList = [];
        dsp.postFun('cj/server/getDbServeMoneyList', data, (res) => {
          if (res.data.statusCode == '200') {
            const { moneyList,retentionList }  = res.data.result;
            $scope.serveMoneyList = moneyList
            $scope.overtimeDays = retentionList[0].days
            for (let item of $scope.serveMoneyList) {
              item.status = '1';
              item.flag = false;
              if (item.serverMoneyTypeId == 3 || item.serverMoneyTypeId == 2) {
                item.flag = true;
              }
              if(item.itemNameen =="Overtime Fee"){
                $scope.overtimeFee = item.moneys
              }
            }
          }
        });
      };
      // 重置
      function resetTracking() {
        $scope.storagedoId = "";
        $scope.storeId = "";
        $scope.trackingName = '';        // 运单名称
        $scope.trackingNumber = '';      // 运单号
        $scope.num = '';                 // 数量
        $scope.quantityObj = {};         // 批次号数据
        $scope.downloadFlag = false;     // 下载状态
        $scope.downloadColor = false;    // 下载颜色
        $scope.serveMoneyList = [];      // 单选项
        $("#cj-stime").val('');          // 时间
      };
      //分页
      $scope.$on('pagedata-fa', function (d, data) {
        console.log(data)
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getGoods();
      });
      
      var addOneFlag = true;
      $scope.cancelApplyFun = function () {
        $scope.goodsShow = false;
        addOneFlag = true;
      }
      $scope.confirmApplyFun = function () {
        console.log($scope.applyNoteMes)
        let data = {
          customerMessage: $scope.applyNoteMes,
          customerImage: $scope.imgOssArr,
          weight: $scope.addFwspWeight,
          referencePrice: $scope.addFwspMoney
        }
        data.customerImage = JSON.stringify(data.customerImage)
        console.log(data)
        if (!$scope.applyNoteMes) {
          layer.msg('Please leave messages to CJ.')
          return
        }
        if (!addOneFlag) return
        addOneFlag = false;
        dsp.postFun('cj/server/addServeProduct', data, function (data) {
          addOneFlag = true;
          if (data.data.statusCode == '200') {
            $scope.goodsShow = false;
            $scope.imgArr = [];
            $scope.imgOssArr = [];
            $scope.applyNoteMes = '';
            layer.msg('Added Successfully');
            getGoods();
          }
        }, function (data) {
          console.log(data)
          addOneFlag = true;
        }, { layer: true })
      }
      // 上传图片
      //点击上传的图片显示大图
      $scope.viewBigImg = function (item) {
        $scope.viewImgFlag = true;
        $scope.bigImgSrc = item;
        console.log(item)
      }
      $scope.closePreImg = function () {
        $scope.viewImgFlag = false;
      }
      $scope.imgArr = [];       // 读取本地地址----速度快
      $scope.imgOssArr = [];  // 需要传给后台的线上地址
      let loadList = {
        img: ['png', 'jpg', 'jpeg', 'gif', "PNG", "JPG", "JPEG", "GIF"]
      };
      $scope.upLoadImg4 = function (files) {
        let file = files[0];
        let fileName = file.name.substring(file.name.lastIndexOf('.') + 1);
        if (loadList.img.indexOf(fileName) == -1) {
          layer.msg('Images format error');
          return;
        }
        if ($scope.imgArr.length >= 8) {
          layer.msg('Upload eight images at most');
          return;
        }
        dsp.ossUploadFile(files, function (data) {
          console.log(data)
          if (data.code == 0) {
            layer.msg('Images Upload Failed');
            return;
          }
          let result = data.succssLinks;
          for (let j = 0; j < result.length; j++) {
            let srcList = result[j].split('.');
            let fileName = srcList[srcList.length - 1].toLowerCase();
            if (fileName == 'png' || fileName == 'jpg' || fileName == 'jpeg' || fileName == 'gif') {
              $scope.imgArr.push(URL.createObjectURL(files[j]));
              $scope.imgOssArr.push(data.succssLinks[j]);
            }
          }
          if ($scope.imgArr && $scope.imgArr.length >= 8) {
            $scope.hideUpImgFlag = true;
          }
          $('.upload_file').val('')
          $scope.$apply();
        })
      };
      // 删除上传的图片
      $scope.delImg = (index, event) => {
        event.stopPropagation();
        $scope.imgArr.splice(index, 1);
        $scope.imgOssArr.splice(index, 1);
        if ($scope.imgArr.length < 8) {
          $scope.hideUpImgFlag = false;
        }
      };
    }]);

  return app;
}
