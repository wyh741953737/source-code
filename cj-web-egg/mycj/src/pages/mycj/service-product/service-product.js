export function serviceProductFactory(angular) {
  const app = angular.module('service-product.module', []);

  app.controller('service-product.ctrl', ['$scope', '$rootScope', 'dsp',
    function ($scope, $rootScope, dsp) {
      $scope.getListUrl = 'pojo/product/getServiceProcuctCj';
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
        $('.mycj-left-bar li').eq(2).addClass('active');
      }
      dsp.setRightMinHeight();
      console.log('service-product.ctrl')
      var base64 = new Base64();
      var userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
      // layer.load(2,{shade: [0.3, '#393D49']});
      console.log(userId)
      $scope.skusearch = '';
      $scope.pageSize = '10';
      $scope.pageNum = '1';
      $scope.skuTotalPage = '';
      $scope.skusearch = '';
      $scope.listType = '1';

      // $scope.getListUrl = 'app/rebate/getAssignAndVisibility';

      function getListData(pageNum, pageSize) {
        var sendData;
        sendData = {
          pageNum: pageNum,
          pageSize: pageSize,
          inputStr: $scope.skusearch.replace(/'/g, "''")
        }
        return JSON.stringify(sendData);
      }

      function settleData(obj) {
        var pList = obj.list;
        var remarkArr = obj.remark || [];
        for (var i = 0; i < pList.length; i++) {
          pList[i].down = false;
          pList[i].BIGIMG = pList[i].BIGIMG.replace('https://', '').replace('http://', '');
          pList[i].INVENTORCOUNTRY = JSON.parse(pList[i].INVENTORCOUNTRY);
          for (var k = 0; k < pList[i].stanProdcuts.length; k++) {
            pList[i].stanProdcuts[k].serviceFee = (pList[i].stanProdcuts[k].CNTOUSACHARGE * 1 + pList[i].stanProdcuts[k].PROCESSCHARGE * 1 + pList[i].stanProdcuts[k].UNLOADCHARGE * 1).toFixed(2);
            // 物流试算组件用
            pList[i].stanProdcuts[k].shipinfo = {
              weight: pList[i].stanProdcuts[k].PACKWEIGHT,
              enName: pList[i].stanProdcuts[k].shopMethod,
              pid: pList[i].stanProdcuts[k].PID,
              shipDiscount: pList[i].stanProdcuts[k].discountShopRate,
              index1: i,
              index2: k
            }
          }
          pList[i].AMOUNTPRICE = pList[i].serviceFee || 0;
          for (var j = 0; j < remarkArr.length; j++) {
            if (pList[i].shopMethod && pList[i].shopMethod == remarkArr[j].nameen) {
              pList[i].wuliuRemark = remarkArr[j].remark;
              break;
            }
          }
          // 物流试算组件用
          pList[i].shipinfo = {
            weight: pList[i].packweight,
            enName: pList[i].shopMethod,
            pid: pList[i].PID,
            shipDiscount: pList[i].discountShopRate,
            index1: i
          }
        }
        $scope.skulist = pList;
      }

      // 物流试算组件返回值接收
      $scope.$on('saveShipPrice', function (d, data) {
        if (data.index2 >= 0 && data.index1 >= 0) {
          if (data.shipDiscountPrice) {
            $scope.skulist[data.index1].stanProdcuts[data.index2].isProAmountTip = false
          }
          $scope.skulist[data.index1].stanProdcuts[data.index2].AMOUNTPRICE = dsp.cacuAmount($scope.skulist[data.index1].stanProdcuts[data.index2].serviceFee, data.shipDiscountPrice || 0);
        } else {
          if (data.shipDiscountPrice) {
            $scope.skulist[data.index1].isProAmountTip = false
          }
          $scope.skulist[data.index1].AMOUNTPRICE = dsp.cacuAmount($scope.skulist[data.index1].serviceFee, data.shipDiscountPrice || 0);
        }
        setTimeout(function () {
          $scope.$apply()
        })
      })

      // $scope.skulist = [];
      function getSkuList() {
        // dsp.load();
        $scope.skulist = [];
        $rootScope.$on($scope.getListUrl, (_, bool) => {
          $scope.loading = bool;
          if (bool) $scope.notDataFound = false;
        });
        dsp.postFun($scope.getListUrl, getListData($scope.pageNum, $scope.pageSize), function SKUget(data) {
          console.log(data);
          var obj = data.data;
          var result = JSON.parse(obj.result);
          console.log("service", result);
          if ($scope.productType) {
            obj.result = JSON.parse(obj.result);
            var temnum = obj.result.totle;
            obj = obj.result;
            obj.count = temnum;
          }
          if (result.totle == 0) {
            $scope.skuTotalPage = 0;
            $scope.skulist = [];
            $scope.notDataFound = true;
            return;
          }
          $scope.totalNum = result.totle;
          settleData(result);
          $scope.totalCounts = Math.ceil($scope.totalNum / $scope.pageSize);
          $scope.$broadcast('page-data', {
            pageNum: $scope.pageNum,
            totalNum: $scope.totalCounts,
            totalCounts: $scope.totalNum,
            pageSize: $scope.pageSize,
          });
        });
      }

      getSkuList();


      // 获取变体列表
      $scope.showVList = function (item, index1) {
        item.down = true;
      }
      $scope.hideVList = function (item, index1) {
        item.down = false;
        $scope.skulist[index1].vList = [];
      }
      // 只展示私有商品
      $scope.showPrivatePro = function (flag) {
        if (flag) {
          $scope.listType = '0';
        } else {
          $scope.listType = '1';
        }
        getSkuList();
      }
      //搜索查询
      $scope.searchsku = function () {
        $scope.pageNum = '1';
        getSkuList();
      }
      $scope.enterSearch = function (event) {
        if (event.keyCode == 13) {
          $scope.searchsku();
        }
      }

      //分页
      $scope.$on('pagedata-fa', function (d, data) {
        console.log(data)
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getSkuList();
      });
    }]);

  return app;
}
