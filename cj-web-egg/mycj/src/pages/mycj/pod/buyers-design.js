import { pageFunWithParams } from '@src/pages/mycj/mycj-common';

export function podBuyersDesignFactory(angular) {
  const app = angular.module('pod-buyers-design.module', []);

  app.controller('pod-buyers-design.ctrl', ['$rootScope', '$scope', '$timeout', 'dsp',
    function ($rootScope, $scope, $timeout, dsp) {
      dsp.domainData().then((res) => {
        // 请求成功的结果
        console.log(res)
        $scope.iscj = res.iscj;
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
      $('.header-nav li').eq(3).addClass('active');
      $scope.afterGetLeftNav = function () {
        if (vip == '1') {
          $('.mycj-left-bar').addClass('vipFlag');
        } else {
          $('.mycj-left-bar').removeClass('vipFlag');
        }
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
        $scope.$apply();
      })

      dsp.setRightMinHeight();
      $scope.pageSize = '20';
      $scope.pageNum = '1';
      $scope.search = '';
      function getConnectedList() {
        var jsonObj = {};
        jsonObj.pageSize = $scope.pageSize;
        jsonObj.pageNum = $scope.pageNum;
        jsonObj.productType = '0';
        jsonObj.serachName = $scope.search.replace(/'/g, "''");
        $scope.conlist = [];
        $rootScope.$on('app/connection/conList', (_, bool) => {
          $scope.loading = bool;
          if (bool) $scope.notDataFound = false;
        });
        dsp.postFun('app/connection/conList', { "data": JSON.stringify(jsonObj) }, function (data) {
          var data = data.data;
          console.log(data);
          if (data.statusCode == 200) {
            var result = JSON.parse(data.result);
            console.log('conList ->', result)
            $scope.totalNum = result.total;
            var pList = result.conList;
            var remarkArr = result.remark || [];
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
                shipDiscount: pList[i].FREIGHTDISCOUNT,
                shopType: pList[i].shopType,
                areaCountryCode: pList[i].areaCountryCode,
                index1: i
              }
            }
            $scope.conlist = pList;
            if ($scope.totalNum == 0) {
              $scope.notDataFound = true;
            }
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
      getConnectedList();
      //搜索查询
      $scope.searchFun = function () {
        $scope.pageNum = '1';
        getConnectedList();
      }
      $scope.enterSearch = function (event) {
        if (event.keyCode == 13) {
          $scope.searchFun();
        }
      }
      $scope.showVarient = function (item, index) {
        const msgLoading = cjMessage.loading({ isFixed: true });
        //{"data":"{'accpid': '"+ item.ACCPID +"'}"}
        dsp.postFun('app/connection/conListdateill', { "data": JSON.stringify({ accpid: item.ACCPID, shopId: item.shopId }) }, function (data) {
          // layer.closeAll("loading")
          // dsp.closeLoad();
          msgLoading.hide()
          var data = data.data;
          if (data.statusCode != '200') {
            console.log(data);
            return false;
          }
          var varientList = JSON.parse(data.result).conList;
          for (var i = 0; i < varientList.length; i++) {
            varientList[i].discountPrice = dsp.cacuDiscount(varientList[i].SELLPRICE, varientList[i].SELLDISCOUNT);
            varientList[i].decountry = null;
            varientList[i].deltPrice = 0;
            varientList[i].discountPriceShip = 0;
            if (varientList[i].deltPrice) {
              varientList[i].discountPriceShip = dsp.cacuDiscount(varientList[i].deltPrice, varientList[i].FREIGHTDISCOUNT);
              varientList[i].AMOUNTPRICE = dsp.cacuAmount(varientList[i].discountPrice, varientList[i].discountPriceShip);
            } else {
              varientList[i].discountPriceShip = '';
              varientList[i].AMOUNTPRICE = varientList[i].discountPrice;
            }
            // 物流试算组件用
            varientList[i].shipinfo = {
              weight: varientList[i].PACKWEIGHT,
              enName: varientList[i].LOGISTICS,
              pid: varientList[i].PID,
              shipDiscount: varientList[i].FREIGHTDISCOUNT,
              shopType: $scope.conlist[index].shopType,
              areaCountryCode: $scope.conlist[index].areaCountryCode,
              index1: index,
              index2: i
            }
          }
          console.log(varientList);
          $scope.conlist[index].varientList = varientList;
          $('.media').eq(index).find('.asj-pro-box').hide();
          $('.media').eq(index).css({ 'padding-bottom': '25px', 'background': '#f8f8f8' });
        }, function() {
          msgLoading.hide();
        })
      }

      $scope.hideVarient = function (item, index) {
        $scope.conlist[index].varientList = undefined;
        $('.media').eq(index).find('.asj-pro-box').show();
        $('.media').eq(index).css({ 'padding-bottom': '0', 'background': '#fff' });
      }

      $scope.disconnect = function (item, index1, index2) {
        // return alert($rootScope.soldOutCount)
        var disconnectUrl, sendStr;
        if (index2 >= 0) {
          disconnectUrl = 'app/connection/relieveCondetaill';
          sendStr = { "data": "{'id':'" + item.id + "','shopVid':'" + item.ACCVID + "','shopId':'" + item.shopId + "'}" };
        } else {
          disconnectUrl = 'app/connection/relieveCon';
          sendStr = { "data": "{'pid':'" + item.ID + "','shopproductId':'" + item.ACCPID + "','shopId':'" + item.shopId + "'}" };
        }
        layer.open({
          title: null,
          type: 1,
          area: ['480px', '200px'],
          skin: '',
          closeBtn: 0,
          content: '<p>Are you sure to disconnect them?</p>',
          btn: ['Cancel', 'Confirm'],
          yes: function (index, layero) {
            layer.close(index);
          },
          btn2: function (index, layero) {
        const msgLoading = cjMessage.loading({ isFixed: true })
            dsp.postFun(disconnectUrl, sendStr, function (data) {
              // layer.closeAll("loading")
              // dsp.closeLoad();
              msgLoading.hide()
              var data = data.data;
              console.log(data);
              if (data.statusCode != '200') {
                layer.msg('Disconnect the products failed. ');
                return false;
              }
              var disconnectLayer = index;
              layer.msg('Disconnect the products successfully!');
              $timeout(function () {
                layer.close(index);
                layer.close(disconnectLayer);
                if (index2 >= 0) {
                  $scope.conlist[index1].varientList.splice(index2, 1);
                } else {
                  $scope.conlist.splice(index1, 1);
                  if (item.SALESTATUS == '5') {
                    $rootScope.soldOutCount -= 1; // 导航栏角标数量
                  }
                }
              }, 1000);
            });
            return false;
          }
        });
      }
  
      $scope.$on('pagedata-fa', function (d, data) {
        console.log(data)
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getConnectedList();
      });
    }]);

  return app;
}
