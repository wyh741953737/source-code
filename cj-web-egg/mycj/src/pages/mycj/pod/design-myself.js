export function podDesignMyselfFactory(angular) {
  const app = angular.module('pod-design-myself.module', []);

  app.controller('pod-design-myself.ctrl', ['$scope', '$rootScope', '$timeout', '$stateParams', 'dsp',
  function ($scope, $rootScope, $timeout, $stateParams, dsp) {

    var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
    if (vip == '1') {//vipFlag
      $('.header-nav').addClass('vipFlag');
      $('.pod-design-myself').css('background', '#F0EDE7').addClass('vip');
    } else {
      $('.header-nav').removeClass('vipFlag');
      $('.pod-design-myself').css('background', '#f2f3f5').removeClass('vip');
    }
    $('.header-nav li').eq(3).addClass('active');
    $scope.afterGetLeftNav = function () {
      if (vip == '1') {
        $('.mycj-left-bar').addClass('vipFlag');
      } else {
        $('.mycj-left-bar').removeClass('vipFlag');
      }
      $('.mycj-left-bar li').eq(1).addClass('active');
    }
    dsp.setRightMinHeight();

    // 物流试算组件返回值接收
    $scope.$on('saveShipPrice', function (d, data) {
      console.log(data)
      if (data.index2 >= 0 && data.index1 >= 0) {
        if (data.shipDiscountPrice) {
          $scope.proList[data.index1].variants[data.index2].isProAmountTip = false
        }
        $scope.proList[data.index1].variants[data.index2].AMOUNTPRICE = dsp.cacuAmount($scope.proList[data.index1].variants[data.index2].discountPrice, data.shipDiscountPrice || 0);
      } else {
        if (data.shipDiscountPrice) {
          $scope.proList[data.index1].isProAmountTip = false
        }
        $scope.proList[data.index1].AMOUNTPRICE = dsp.cacuAmount($scope.proList[data.index1].discountPrice, data.shipDiscountPrice || 0);
      }
      $scope.$apply();
    })

    $scope.pageSize = '20';
    $scope.pageNum = '1';
    $scope.search = '';
    getProList();
    function getProList() {
      $scope.proList = [];
      $rootScope.$on('app/locProduct/getIndividualization', (_, bool) => {
        $scope.loading = bool;
        if (bool) $scope.notDataFound = false;
      });
      dsp.postFun('app/locProduct/getIndividualization', {
        "pageSize": $scope.pageSize,
        "pageNum": $scope.pageNum,
        "search": $scope.search
      }, function (data) {
        var data = data.data;
        console.log(data);
        if (data.statusCode == 200) {
          $scope.totalNum = data.result.count;
          if ($scope.totalNum == 0) {
            $scope.notDataFound = true;
            return;
          }
          var pList = data.result.list;
          var remarkArr = data.result.remark || [];
          for (var i = 0; i < pList.length; i++) {
            pList[i].discountPriceRate = 100 - pList[i].discountPriceRate;
            if (pList[i].discountPriceRate > 0) {
              pList[i].discountPrice = dsp.cacuDiscount(pList[i].SELLPRICE, pList[i].discountPriceRate);
            } else {
              pList[i].discountPrice = pList[i].SELLPRICE;
            }
            pList[i].SELLPRICE = pList[i].SELLPRICE.replace(' -- ', '-');
            pList[i].decountry = null;
            pList[i].deltPrice = 0;
            pList[i].discountPriceShip = 0;
            pList[i].AMOUNTPRICE = pList[i].discountPrice;
            for (var j = 0; j < remarkArr.length; j++) {
              if (pList[i].LOGISTICS == remarkArr[j].nameen) {
                console.log(remarkArr[j].remark);
                pList[i].wuliuRemark = remarkArr[j].remark;
                break;
              }
            }

            for (var k = 0; k < pList[i].variants.length; k++) {
              pList[i].variants[k].discountPriceRate = 100 - pList[i].variants[k].discountPriceRate;
              if (pList[i].variants[k].discountPriceRate > 0) {
                pList[i].variants[k].discountPrice = dsp.cacuDiscount(pList[i].variants[k].SELLPRICE, pList[i].variants[k].discountPriceRate);
              } else {
                pList[i].variants[k].discountPrice = pList[i].variants[k].SELLPRICE;
              }
              pList[i].variants[k].SELLPRICE = pList[i].variants[k].SELLPRICE.replace(' -- ', '-');
              pList[i].variants[k].decountry = null;
              pList[i].variants[k].deltPrice = 0;
              pList[i].variants[k].discountPriceShip = 0;
              pList[i].variants[k].AMOUNTPRICE = pList[i].variants[k].discountPrice;
              pList[i].variants[k].shopMethod = pList[i].shopMethod;
              // 物流试算组件用
              pList[i].variants[k].shipinfo = {
                weight: pList[i].variants[k].PACKWEIGHT,
                enName: pList[i].variants[k].shopMethod,
                pid: pList[i].variants[k].ID,
                shipDiscount: pList[i].variants[k].discountShopRate,
                index1: i,
                index2: k
              }
            }

            pList[i].down = false;
            // 物流试算组件用
            pList[i].shipinfo = {
              weight: pList[i].PACKWEIGHT,
              enName: pList[i].shopMethod,
              pid: pList[i].ID,
              shipDiscount: pList[i].discountShopRate,
              index1: i
            }
          }
          $scope.proList = pList;
          $scope.totalCounts = Math.ceil($scope.totalNum / $scope.pageSize);
          $scope.$broadcast('page-data', {
            pageNum: $scope.pageNum,
            totalNum: $scope.totalCounts,
            totalCounts: $scope.totalNum,
            pageSize: $scope.pageSize,
          });
        }
      });
    }
    
    $scope.$on('pagedata-fa', function (d, data) {
      console.log(data)
      $scope.pageNum = data.pageNum;
      $scope.pageSize = data.pageSize;
      getProList();
    });

    // 获取变体列表
    $scope.showVList = function (item, index1) {
      item.down = true;
    }
    $scope.hideVList = function (item, index1) {
      item.down = false;
      $scope.skulist[index1].vList = [];
    }

    //搜索查询
    $scope.searchFun = function () {
      getProList();
    }
    $scope.enterSearch = function (event) {
      if (event.keyCode == 13) {
        $scope.searchFun();
      }
    }

    $scope.delet = function (item, index1, index2) {
      console.log(item, index1, index2);
      if (index2 >= 0) {
        if ($scope.proList[index1].variants.length == 1) {
          layer.msg('请至少保留一个变体');
          return;
        }
      }
      layer.open({
        type: 1,
        content: '<p>Are you sure to delete it?</p>',
        area: ['480px', '200px'],
        closeBtn: 0,
        shadeClose: true,
        title: null,
        skin: "",
        btn: ['No', 'Yes'],
        success: function (layero, index) {
        },
        yes: function (index, layero) { // 取消删除
          layer.close(index);
        },
        btn2: function (index, layero) { // 确定删除
          var opeList;
          // var opeDom;
          var deleteUrl = 'app/product/deleteIndividualization';
          var deleteData;
          if (index2 >= 0) {
            opeList = $scope.proList[index1].variants;
            // opeDom = $('.SKUtable tbody').eq(index1).find('tr').eq(1 + index2);
            deleteData = {
              "pId": "",
              "vId": item.ID
            }
          } else {
            opeList = $scope.proList;
            // opeDom = $('.SKUtable tbody').eq(index1).find('tr').eq(0);
            deleteData = {
              "pId": item.ID,
              "vId": ""
            }
          }
          layer.load(2);
          dsp.postFun(deleteUrl, deleteData, function (data) {
            layer.closeAll("loading")
            var data = data.data;
            console.log(data);
            if (!data.code) {
              layer.msg('Delete failed');
              return false;
            }
            layer.msg('Delete successfully', { time: 1000 });
            $timeout(function () {
              // console.log($scope.skulist[index1].vList);
              opeList.splice(index1, 1);
              $scope.$apply();
              // console.log($scope.skulist[index1].vList);
              // opeDom.remove();
              layer.close(index);
            }, 1000);
          });
          return false;
        }
      });
    }

    $scope.deletePro = function (i) {
      $scope.designList.splice(i, 1);
      cj_desingn_list = JSON.stringify($scope.designList);
      localStorage.setItem('cj_desingn_list', cj_desingn_list);
    }

    console.log($stateParams.opencart)
    if ($stateParams.opencart) {
      $scope.showDesignCart = true;
    }
    var cj_desingn_list = localStorage.getItem('cj_desingn_list');
    if (cj_desingn_list) {
      $scope.designList = JSON.parse(cj_desingn_list);
    } else {
      $scope.designList = [];
    }

    var that = this;

    $scope.parentctrl = 'designlist';
    var dssignIndex;
    $scope.startDesign = function (item, index) {
      // getWuliuRes = null;
      console.log(item);
      dssignIndex = index;
      that.designpid = item.id;
      const msgLoading = cjMessage.loading({ isFixed: true });
      $scope.podVersion=null;
      dsp.postFun('cj/locProduct/huoQuShangPinXiangQing', JSON.stringify({
        id: that.designpid,
        token: ''
      }), function (data) {
        let result = data.data.result;
        msgLoading.hide();
        if (data.data.statusCode == '200') {
          if (result.customMessage && Array.isArray(JSON.parse(result.customMessage))) {
            $scope.podVersion = 2;
            $scope.design2=data.data.result;
          } else {
            $scope.podVersion = 1;
            $scope.$broadcast('showdesignframe', data.data.result);
          }
        } else {
          layer.msg(data.data.message);
        }

      })
    }

    $scope.$on('todesignlist', function (d, data) {
      console.log(data);
      if (data == 'deleteone') {
        $scope.designList.splice(dssignIndex, 1);
        localStorage.setItem('cj_desingn_list', JSON.stringify($scope.designList));
        $scope.showDesignCart = false;
        $scope.pageNum = '1';
        getProList();
      }
    });

    dsp.getCateList(function (data) {
      $scope.categoryListOne = data;
    })
  }])


  return app;
}
