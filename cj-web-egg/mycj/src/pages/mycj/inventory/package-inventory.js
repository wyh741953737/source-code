export function packageInventoryFactory(angular) {
  const app = angular.module('package-inventory.module', []);

  app.controller('package-inventory.ctrl', ['$scope', '$rootScope', '$stateParams', 'dsp', '$state',
    function ($scope, $rootScope, $stateParams, dsp, $state) {
      dsp.setRightMinHeight();
      //数据声明
      $scope.pageNum = '1';
      $scope.pageSize = '10';
      $scope.totalNum = null;
      $scope.inputStr = '';
      $scope.dataList = [];
      $scope.chartDialog = false;
      $scope.packVid = $stateParams.packVid || '';
      $scope.associationType = $stateParams.type || '';
      $scope.isHideZero = false
      console.log('associationType===>', $scope.associationType)
      console.log('packVid===>', $scope.packVid)
      //搜索
      $scope.searchPro = function () {
        $scope.packVid = '';
        $scope.associationType = '';
        $scope.pageNum = '1';
        getData();
      };
      $scope.enterSearch = function (event) {
        if (event.keyCode == 13) {
          $scope.searchPro();
        }
      };

      $rootScope.$on('cj/PackProduct/getPackInventory', (_, bool) => $scope.loading = bool);

      //获取数据
      function getData() {
        var parms = {
          type: $scope.associationType,
          packVid: $scope.packVid,
          pageNum: $scope.pageNum,
          pageSize: $scope.pageSize,
          sku: $scope.inputStr
        };
        $scope.dataList = [];
        dsp.postFun('cj/PackProduct/getPackInventory', parms, (res) => {
          if (res.data.statusCode === '200') {
            $scope.dataList = res.data.result.list;
            $scope.totalNum = res.data.result.count;
            $scope.totalPrice = res.data.result.totalPrice;
            $scope.retrievalNum = res.data.result.retrievalNum;
            console.log($scope.dataList)
            $scope.totalCounts = Math.ceil($scope.totalNum / $scope.pageSize);
            $scope.$broadcast('page-data', {
              pageNum: $scope.pageNum,
              totalNum: $scope.totalCounts,
              totalCounts: $scope.totalNum,
              pageSize: $scope.pageSize
            });
          }
        }, (err) => {
          console.log(err)
        })
      }
      getData();
  
      $scope.$on('pagedata-fa', function (d, data) {
        console.log(data)
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getData();
      });
  
  
      //长宽高
      $scope.size = function (item, name) {
        let arr = item.STANDARD.split(',');
        let num = null;
        arr.forEach((o, i) => {
          if (o.indexOf(name) !== -1) {
            num = o.substr(o.indexOf('=') + 1, o.length)
          }
        });
        return num;
      };
      //openEchart
      $scope.openEchart = function (item) {
        $scope.stockout = item.Stockout;
        $scope.chartDialog = true;
        $scope.echartDataX = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10',];
        $scope.echartDataY = [];
        for (let idx in item.dateList) {
          $scope.echartDataY.push(item.dateList[idx])
        }
        //Echart图表
        var option = {
          title: {
            text: 'Last 10-day consumption'
          },
          color: ['#FDA84C'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: '20%',
            left: '3%',
            right: '1%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: $scope.echartDataX,
              axisTick: {
                alignWithLabel: true
              },
              name: '',
              axisLabel: {
                interval: 0,
                formatter: function (value) {
                  var ret = "";//拼接加\n返回的类目项
                  var maxLength = 18;//每项显示文字个数
                  var valLength = value.length;//X轴类目项的文字个数
                  var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                  if (rowN > 1)//如果类目项的文字大于3,
                  {
                    for (var i = 0; i < rowN; i++) {
                      var temp = "";//每次截取的字符串
                      var start = i * maxLength;//开始截取的位置
                      var end = start + maxLength;//结束截取的位置
                      //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                      temp = value.substring(start, end) + "\n";
                      ret += temp; //凭借最终的字符串
                    }
                    return ret;
                  }
                  else {
                    return value;
                  }
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'Quantity / Piece',
            }
          ],
          series: [
            {
              name: 'Quantity',
              type: 'bar',
              barWidth: '30px',
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: 'black'
                    }
                  }
                }
              },
              data: $scope.echartDataY
            }
          ]
        };
        if (typeof echarts === 'undefined') {
          window.addEventListener('load-script', ev => {
            if (ev.detail.name === 'echarts.common.min.js') {
              echarts.init(document.getElementById('main')).setOption(option);
            }
          });
        } else {
          setTimeout(() => {
            echarts.init(document.getElementById('main')).setOption(option);
          }, 40);
        }
      }
      //购买
      //打开弹窗
      let mincount;
      $scope.goBuy = function (item) {
        if (item.SALESTATUS == '5') {
          layer.msg('This products had been sold out!');
          return;
        }

        $scope.additem = null;
        $scope.addDialog = true;
        $scope.currentGoodsId = item.pid;
        layer.load(2);
        dsp.postFun('cj/locProduct/huoQuShangPinXiangQing', JSON.stringify({ id: item.pid, token: '' }), function (data) {
          // console.log(data);
          layer.closeAll('loading');
          if (data.data.statusCode != 200) return;
          $scope.additem = data.data.result;

           // 标示是否有阶梯价格 1 有区间价格 ；不是 1 则没有区间价格
           $scope.discountStatusFlag = $scope.additem.discountStatus


           if($scope.discountStatusFlag === 1){
             // 如果是有阶梯价格的，请求阶梯价格
             getPackProductDiscountPriceAll(item.pid)
           }

          $scope.stanProducts = $scope.additem.stanProducts;
          $scope.varientArr = [];
          $scope.varientKeys = [];
          $scope.itemcount = $scope.additem.setNum || 1;
          mincount = $scope.additem.setNum || 1;
          if ($scope.additem.VARIANTKEYEN != '') {
            $scope.varientKeys = $scope.additem.VARIANTKEYEN.split('-');
            for (var i = 0; i < $scope.varientKeys.length; i++) {
              $scope.varientArr.push({
                name: $scope.varientKeys[i],
                key: []
              });
            }
            for (var i = 0; i < $scope.stanProducts.length; i++) {
              if ($scope.stanProducts[i].VARIANTKEY != null) {
                var curVarientVal = $scope.stanProducts[i].VARIANTKEY.split('-');
                for (var j = 0; j < curVarientVal.length; j++) {
                  $scope.varientArr[j].key.push(curVarientVal[j]);
                }
              }
            }
            for (var i = 0; i < $scope.varientArr.length; i++) {
              $scope.varientArr[i].key = dsp.uniqueArray($scope.varientArr[i].key);
              $scope.varientArr[i].val = $scope.varientArr[i].key[0];
            }
          } else {
            $scope.varientArr = [];
          }
          if ($scope.varientArr.length == 1 && $scope.varientArr[0].key.length == 0) {
            $scope.varientArr = [];
          }
          console.log($scope.varientArr);
          $scope.varientKeysInner = [];
          for (var i = 0; i < $scope.stanProducts.length; i++) {
            $scope.varientKeysInner.push($scope.stanProducts[i].VARIANTKEY);
            if ($scope.stanProducts[i].sellDiscount != null && $scope.stanProducts[i].sellDiscount < 100) {
              $scope.stanProducts[i].SELLPRICEDIS = ($scope.stanProducts[i].SELLPRICE * $scope.stanProducts[i].sellDiscount / 100).toFixed(2);
            } else {
              $scope.stanProducts[i].SELLPRICEDIS = $scope.stanProducts[i].SELLPRICE;
            }
          }
          console.log($scope.varientKeysInner);
          getTheVitem();
        }, function (data) {
          layer.closeAll('loading');
        });
      }

      /**
       * 获取包装商品阶梯价格
       */
      function getPackProductDiscountPriceAll(id) {
        let params = {
          id,
          num:1
        }
        dsp.postFun('erp/PackProduct/getPackProductDiscountPriceAll', params,(res) => {
          if (res.data.statusCode === '200') {
            $scope.discountPriceAll = res.data.result;
          }
        },e=>e);
      }

      $scope.chanVariant = function (val, index) {
        console.log(val)
        var filterKeysOne = [];
        for (var i = 0; i < $scope.varientKeysInner.length; i++) {
          var curVarKey = $scope.varientKeysInner[i].split('-');
          if (curVarKey[index] == val) {
            filterKeysOne.push(curVarKey);
          }
        }
        for (var i = 0; i < $scope.varientArr.length; i++) {
          if (i == index) continue;
          var canbeTwo = [];
          for (var j = 0; j < filterKeysOne.length; j++) {
            canbeTwo.push(filterKeysOne[j][i]);
          }
          var OtherSel1 = $scope.varientArr[i].val;
          var isInTwo = $.inArray(OtherSel1, canbeTwo);
          if (isInTwo == -1) {
            $scope.varientArr[i].val = canbeTwo[0];
          }
          var filterKeysTwo = [];
          var curValTwo = $scope.varientArr[i].val;
          for (var k = 0; k < filterKeysOne.length; k++) {
            if (filterKeysOne[k][i] == curValTwo) {
              filterKeysTwo.push(filterKeysOne[k]);
            }
          }
          filterKeysOne = filterKeysTwo;
        }
        getTheVitem();
      }

      function getTheVitem() {
        if ($scope.varientArr.length == 0) {
          $scope.variantItem = $scope.stanProducts[0];
        } else {
          var curVarKeyArr = [];
          for (var i = 0; i < $scope.varientArr.length; i++) {
            curVarKeyArr.push($scope.varientArr[i].val);
          }
          $scope.curVarientKey = curVarKeyArr.join('-');
          var curVarientIndex = dsp.findIndexByKey($scope.stanProducts, 'VARIANTKEY', $scope.curVarientKey);
          $scope.variantItem = $scope.stanProducts[curVarientIndex];
        }
        $scope.additem = $scope.variantItem;
        calcUnitPrice()
      }

      //添加到购物车
      $scope.addbuy = function ($event) {
        console.log($scope.variantItem)
        console.log($scope.additem)
        var proData = [{
          BIGIMG: $scope.additem.IMG,
          ID: $scope.variantItem.ID,
          NAMEEN: $scope.additem.NAMEEN,
          SELLPRICE: $scope.variantItem.SELLPRICE,
          SKU: $scope.variantItem.SKU,
          //checked: true,
          itemcount: $scope.itemcount,
          discountPrice:($scope.currentVarientUnitPrice).toFixed(2)
        }]
        localStorage.setItem('packageData', JSON.stringify(proData));
        //location.href = '#/myCJ-purchase/' + '//package'
        $state.go('mycj-purchase', { orderType: 'package' });
      }
      //关闭弹窗
      $scope.close = function () {
        $scope.addDialog = false;
      }
      //加减
      $scope.plusOne = function () {
        $scope.itemcount = $scope.itemcount * 1 + 1 + '';
        calcUnitPrice()
      }
      $scope.minusOne = function (val) {
        console.log(mincount);
        if (val <= mincount) return;
        $scope.itemcount = $scope.itemcount * 1 - 1 + '';
        calcUnitPrice()
      }
      $scope.checkIsNum = function (val) {
        if (isNaN(val * 1) || val * 1 < 1) {
          $scope.itemcount = '1'
        }
        calcUnitPrice()
      }

      $scope.blurQuantity = function () {
        if ($scope.itemcount - mincount < 0 ) {
          $scope.itemcount = mincount;
          calcUnitPrice()
        }
      }

       // 计算单价
      function calcUnitPrice(){

        // 如果有阶梯价格，则计算阶梯价格,
        if($scope.discountStatusFlag === 1){
          let params = {
            id:$scope.currentGoodsId, // 商品 id
            variantId:$scope.variantItem.ID, // 变体 id
            num:$scope.itemcount // 选择数量
          }
          dsp.postFun('erp/PackProduct/getVariantDiscountPrice', params,(res) => {
            if (res.data.statusCode === '200') {
              $scope.currentVarientUnitPrice = Number(res.data.result.unitPrice)
              $scope.totalPrice = res.data.result.price
            }
          },e=>e);
        }else{
           // 否则还是用变体单价
           $scope.currentVarientUnitPrice = Number($scope.variantItem.SELLPRICE)
           $scope.totalPrice = $scope.currentVarientUnitPrice * $scope.itemcount
        }

      }

      $scope.meaterial = function (val) {
        var tag = null;
        var arr = [
          { name: 'Plastic bags', prop: 'PLASTIC_BAG' },
          { name: 'Cartons', prop: 'PAPER_BOX' },
          { name: 'Plastic box', prop: 'PLASTIC_BOX' },
          { name: 'Cloth bags', prop: 'FARBIC_BAG' },
          { name: 'Paper bags', prop: 'PAPER_BAG' },
          { name: 'Tags', prop: 'HANG_TAG' }
        ]
        arr.forEach((o, i) => {
          if (o.prop.includes(val)) tag = o.name;
        })
        return tag;
      };

      //隐藏0库存商品
      $scope.hideZeroProduct = function() {
        $scope.isHideZero = !$scope.isHideZero;
        const isHide = $scope.isHideZero ? '1' : '0';

        dsp.postFun("app/customerConfig/saveConfigByType", { configValue: isHide, configType: 'isHideZeroPackInventory' }, function (data) {
          if (data.status === 200) {
            getData();
          }
        })
      }
      //获取上次用户是否隐藏记录
      function getUserStockConfig () {
        dsp.postFun("app/customerConfig/getConfigByType", {
          configType: 'isHideZeroPackInventory'
        }, function (data) {
          if (data.status == 200) {
            $scope.isHideZero = data.data.result === "1" ? true :false;
          }
        })
      }
      getUserStockConfig();
      
    }]);

  return app;
}
