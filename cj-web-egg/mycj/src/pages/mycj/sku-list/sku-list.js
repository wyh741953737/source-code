export function skuListFactory(angular) {
  const app = angular.module('mycj-sku-list.module', []);
  const skuPicHeight = 520;

  app.controller('mycj-sku-list.ctrl', ['$scope', '$rootScope', 'dsp',
    function ($scope, $rootScope, dsp) {
      $scope.getListUrl = 'app/rebate/getAssignAndVisibility';
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
        $('.mycj-left-bar li').eq(1).addClass('active');
      }
      dsp.setRightMinHeight();
      console.log('mycj-sku-list.ctrl')
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
      $scope.content = 'Are you sure to delete it?';

      // $scope.getListUrl = 'app/rebate/getAssignAndVisibility';

      $scope.$on('ship-setting', function (ev, data) {
        if (data.flag == 'submit-ship-success') {
          $scope.skulist[data.ship.proindex].shopMethod = data.ship.shipMethod;
          $scope.skulist[data.ship.proindex].defaultArea = data.ship.defaultArea;
        }
      })

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

      function getListData(pageNum, pageSize) {
        var sendData;
        sendData = {
          pageNum: pageNum,
          pageSize: pageSize,
          type: $scope.listType,
          search: $scope.skusearch.replace(/'/g, "''"),
          isWarning: $scope.isWarning
        }
        return JSON.stringify(sendData);
      }

      function settleData(obj) {
        var productList = obj.list || [];
        var remarkArr = obj.remark || [];
        for (var i = 0; i < productList.length; i++) {
          productList[i].down = false;
          productList[i].BIGIMG = productList[i].BIGIMG.replace('https://', '').replace('http://', '');
          productList[i].discountPrice = dsp.cacuDiscount(productList[i].SELLPRICE, productList[i].discountPriceRate);
          productList[i].decountry = null;
          productList[i].deltPrice = 0;
          productList[i].discountPriceShip = 0;
          if (productList[i].deltPrice) {
            productList[i].discountPriceShip = dsp.cacuDiscount(productList[i].deltPrice, productList[i].discountShopRate);
            productList[i].AMOUNTPRICE = dsp.cacuAmount(productList[i].discountPrice, productList[i].discountPriceShip);
          } else {
            productList[i].discountPriceShip = '';
            productList[i].AMOUNTPRICE = productList[i].discountPrice;
          }
          for (var j = 0; j < remarkArr.length; j++) {
            if (productList[i].shopMethod && productList[i].shopMethod == remarkArr[j].nameen) {
              productList[i].wuliuRemark = remarkArr[j].remark;
              break;
            }
          }
          // 物流试算组件用
          productList[i].shipinfo = {
            weight: productList[i].packweight,
            enName: productList[i].shopMethod,
            pid: productList[i].PID,
            shipDiscount: productList[i].discountShopRate,
            areaCountryCode: productList[i].areaCountryCode,
            index1: i
          }
        }
        $scope.skulist = productList;
      }
      // 物流试算组件返回值接收
      $scope.$on('saveShipPrice', function (d, data) {
        if (data.index2 >= 0 && data.index1 >= 0) {
          if (data.shipDiscountPrice) {
            $scope.skulist[data.index1].vList[data.index2].isProAmountTip = false
          }
          $scope.skulist[data.index1].vList[data.index2].AMOUNTPRICE = dsp.cacuAmount($scope.skulist[data.index1].vList[data.index2].discountPrice, data.shipDiscountPrice || 0);
        } else {
          if (data.shipDiscountPrice) {
            $scope.skulist[data.index1].isProAmountTip = false
          }
          $scope.skulist[data.index1].AMOUNTPRICE = dsp.cacuAmount($scope.skulist[data.index1].discountPrice, data.shipDiscountPrice || 0);
        }
        setTimeout(function () {
          $scope.$apply()
        })
      })

      function getSkuList() {
        $scope.skulist = [];

	      $scope.isCheckAll = false
        $rootScope.$on($scope.getListUrl, (_, bool) => {
          $scope.loading = bool;
          if (bool) $scope.notDataFound = false;
        });
        dsp.postFun($scope.getListUrl, getListData($scope.pageNum, $scope.pageSize), function SKUget(data) {
          console.log(data);
          var obj = data.data;
          console.log("SKU", obj);
          $scope.skuall = obj;
          if (obj.count == 0) {
            $scope.skuTotalPage = 0;
            $scope.skulist = [];
            $scope.notDataFound = true;
            return;
          }
          $scope.totalNum = obj.count;
          settleData(obj);
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
        // dsp.load();
        const isWarning = item.isWarning == '1' ? '1' : '';
        layer.load(2);
        dsp.postFun('app/rebate/getAssignAndVisibilitydetaill', JSON.stringify({ productId: item.productId, isWarning }), function (data) {
          layer.closeAll("loading")
          console.log(data.data.list);
          item.down = true;
          var vList = data.data.list;

          for (var i = 0; i < vList.length; i++) {
            vList[i].discountPrice = dsp.cacuDiscount(vList[i].SELLPRICE, vList[i].discountPriceRate);
            vList[i].decountry = null;
            vList[i].deltPrice = 0;
            vList[i].discountPriceShip = 0;
            if (vList[i].deltPrice) {
              vList[i].discountPriceShip = dsp.cacuDiscount(vList[i].deltPrice, vList[i].discountShopRate);
              vList[i].AMOUNTPRICE = dsp.cacuAmount(vList[i].discountPrice, vList[i].discountPriceShip);
            } else {
              vList[i].discountPriceShip = '';
              vList[i].AMOUNTPRICE = vList[i].discountPrice;
            }

            // 展示变体属性
            if(vList[i].variantkey) {
              const curVarientVal = Array.isArray(vList[i].variantkey) ? vList[i].variantkey : vList[i].variantkey.split('-');
              vList[i].varientStr = curVarientVal.join('; ');
            }


            // 物流试算组件用
            vList[i].shipinfo = {
              weight: vList[i].PACKWEIGHT,
              enName: vList[i].shopMethod,
              pid: vList[i].PID,
              shipDiscount: vList[i].discountShopRate,
              areaCountryCode: $scope.skulist[index1].areaCountryCode,
              index1: index1,
              index2: i
            }
          }

          $scope.skulist[index1].vList = vList;
        });
      }
      $scope.hideVList = function (item, index1) {
        item.down = false;
        $scope.skulist[index1].vList = [];
      }
      //skudelet
      $scope.skudelet = function (item, index1, index2) {
        $scope.content = 'Are you sure to delete it?';
        $scope.popType = 1;
        $scope.deletePopup =  true
        $scope.item = item
        $scope.index1 = index1
        $scope.index2 = index2
      }
      // 获取弹窗组件关闭按钮
      $scope.$on('closePopUps', (e, data) => {
        $scope.deletePopup = data.showPopUps;
        $scope.showPopUps = false;
      })
      // 获取弹窗组件确定按钮
      $scope.$on('confirmPopUps', (e, d) => {
        if($scope.popType == 1) {
          $scope.deleteConfirmFun();
        } else if($scope.popType == 3) {
          $scope.batchRemove();
        }
        
      })

      $scope.text = 'Note: The CJ inventory of this product is less than the average daily sales volume of the past 7 days.'
      $scope.getTest = function(item) {
        if(!item) return;
        if(item.warningValue===item.actualValue) {
          $scope.text = 'Note: The CJ inventory of this product is the same as the average daily sales volume of the past 7 days.';
        } 
        return $scope.text;
      }

      $scope.batchRemove = () => {
        console.log(1)
        layer.load(2);
        dsp.postFun('cj/PackProduct/delCorrelation', $scope.removeParams, (res) => {
          layer.closeAll('loading');
          if (res.data.statusCode == '200') {
            $scope.showPopUps = false
            layer.msg('Binding removed')
            getSkuList();
          } else {
            $scope.showPopUps = false
            layer.msg('Binding removal failed')
          }
        }, (err) => {
          $scope.showPopUps = false
          console.log(err)
        })
        return false;
      }
      $scope.deleteCancelFun = function () {
        $scope.deletePopup =  false
        $scope.item = null
        $scope.index1 = null
        $scope.index2 = null
      }

      $scope.deleteConfirmFun = function () {
        let {item, index1, index2} = $scope
        var opeList;
            var deleteUrl;
            if (index2 >= 0) {
              deleteUrl = 'app/connection/deleteCondetaill';
              opeList = JSON.parse(JSON.stringify($scope.skulist[index1].vList));
            } else {
              deleteUrl = 'app/connection/deleteCon';
              opeList = JSON.parse(JSON.stringify($scope.skulist));
            }
            // dsp.load();
            layer.load(2);
            dsp.postFun(deleteUrl, { "data": "{'id':'" + (item.productId || item.ID) + "'}" }, function (data) {
              layer.closeAll("loading")
              var data = data.data;
              console.log(data);
              if (data.statusCode != 200) {
                layer.msg('Delete failed');
                return false;
              }
              layer.msg('Deleted Successfully', { time: 1000 });
              if (index2 >= 0) {
                opeList.splice(index2, 1);
                $scope.skulist[index1].vList = JSON.parse(JSON.stringify(opeList));
              } else {
                getSkuList(); // 刷新数据
                // $scope.skulist = JSON.parse(JSON.stringify(opeList));
              }
              layer.close();
              $scope.deletePopup =  false
            });
      }

      // 打开预警弹框
      $scope.dropDown = (item, fileds) => {
        $scope.skulist = $scope.skulist.map(o => {   
           if(o.vList) {
              o.vList = o.vList.map(i => ({
                ...i,
                [fileds]: i[fileds] ? false : i.vid === item.vid,
              }))
           }
           return o;
        })
      }
      // 关闭预警弹框
      $scope.closeInventoryModal = (fileds) => {
        $scope.skulist = $scope.skulist.map( o => {
          if(o.vList) {
            o.vList = o.vList.map(i => ({
              ...i,
              [fileds]: false,
            }))
         }
         return o;
        })
      }

      // 不再提醒
      $scope.warnNoLonger = function(vid) {
        layer.load(2);
        dsp.postFun('early-warning-web/earlyWarning/neverPromptAgain', {entityId: vid}, ({data}) => {
          layer.closeAll('loading');
          if(data.success){
            getSkuList(); 
            layer.close(2);
          }else {
            layer.msg('Never Prompt Again failed')
          }
        }, (err) => {
          layer.close(2);
        })
      }

      $scope.buylist = [];
      // 点击购买私有库存，将商品加入购物车后跳转
      $scope.addPrivateToCar = function(vitem) {  
        dsp.postFun('app/buyOrder/getShoppingCart', {}, function (data) {
          if (data.data.code == 200) {
            if (data.data.shoppingCart) {
                $scope.buylist = data.data.shoppingCart.productList || [];
                const findIdx = dsp.findIndexByKey($scope.buylist, 'SKU', vitem.SKU);
                dsp.postFun('app/buyOrder/gouWuCheMaiDian', { productId: vitem.ID }, function (data) { });
                const token = $rootScope.userInfo.token;
                const params = {
                  id: vitem.PID,
                  token,
                }
                dsp.postFun('cj/locProduct/huoQuShangPinXiangQing', {...params}, function ({data}) { 
                  if(data.statusCode == 200 && data.result) {
                      const dataList = {
                        NAMEEN: vitem.NAMEEN,
                        BIGIMG: vitem.IMG,
                        isCollect:data.result.isCollect, 
                        discountPrice: vitem.discountPrice,
                        itemcount: 1,
                        SELLPRICE: vitem.SELLPRICE,
                        CollectID: vitem.PID,
                        checked: false,
                        ID:	vitem.vid,
                        SKU:vitem.SKU
                      }
                      if (findIdx === -1) {
                        $scope.buylist.unshift(dataList)
                      } else {
                        $scope.buylist[findIdx].itemcount = ($scope.buylist[findIdx].itemcount * 1) + 1;
                        $scope.buylist[findIdx].checked = true;
                      }
                      dsp.postFun('app/buyOrder/editShoppingCart', {productList: $scope.buylist},function (res){
                        if(res.status == 200) {
                          window.location.href = window.origin + '/myCJ.html#/cart/sku';
                        }
                      }) 
                  }
                });
            }
          }
        }, function (data) {
        });
      }

      // 打开Skualias弹窗
      $scope.skualiasList = {}
      $scope.addSkuList = (item, index2, index1) => {
        $scope.skuName = '';
        $scope.skuItemFlag = false;
        $scope.skualias = true;
        $scope.skuItemHint = true;
        $scope.skualiasList.stanId = item.stanId;
        $scope.skualiasList.index2 = index2;
        $scope.skualiasList.index1 = index1;
        $scope.skuliasIndex = [index1, index2]
        if (!item.skuAlisa) {
          $scope.skualiasList.skuAlisa = [];
        } else {
          $scope.skualiasList.skuAlisa = JSON.parse(JSON.stringify(item.skuAlisa.split(',')));
        }
      };
      // 关闭Skualias弹窗
      $scope.closeSkualias = () => {
        $scope.skualias = false;
      };
      // 添加SkuName
      $scope.addSplit = () => {
        if ($scope.skualiasList.skuAlisa && $scope.skualiasList.skuAlisa.length === 3) {
          layer.msg('The quantity that can be added is limited to 3.');
          return
        }
        $scope.skuItemFlag = true;
        $scope.skuItemHint = false;
      };
      // 删除Skualias
      $scope.delSkualias = (item) => {
        layer.open({
          type: 1,
          content: ' <p>Are you sure to delete it?</p>',
          area: ['480px', '200px'],
          closeBtn: 0,
          shadeClose: true,
          title: null,
          skin: "",
          btn: ['No', 'Yes'],
          success: function (layero, index) {
          },
          yes: function (index, layero) {
            layer.close(index);
          },
          btn2: function (index, layero) {
            layer.close(index);
            let data = {
              vid: $scope.skualiasList.stanId,
              bieMing: item
            }
            dsp.postFun('pojo/product/shanChuBieMing', data, (res) => {
              if (res.data.statusCode === '200') {
                $scope.skualiasList.skuAlisa.splice($scope.skualiasList.skuAlisa.indexOf(item), 1);
                $scope.skulist[$scope.skualiasList.index1].vList[$scope.skualiasList.index2].skuAlisa = $scope.skualiasList.skuAlisa.join(',');
              } else {
                layer.msg('Deletion failed');
              }
            })
            // return false;
          }
        });
      };
      // 取消添加Skualias
      $scope.cancelSku = () => {
        $scope.skuItemFlag = false;
        $scope.skuItemHint = true;
        $scope.skuName = '';
      };
      // 确定添加Skualias
      $scope.confirmSku = () => {
        if (!$scope.skuName) {
          layer.msg('Your SKU is required')
          return
        }
        if (strLength($scope.skuName) > 60) {
          layer.msg('The characters of your SKU is limited to 60 letters.');
          return
        }
        let data = {
          vid: $scope.skualiasList.stanId,
          bieMing: [$scope.skuName]
        }
        dsp.postFun('pojo/product/cjKeHuZengJiaBieMingBianTi', data, (res) => {
          if (res.data.statusCode === '200') {
            $scope.skualiasList.skuAlisa.push($scope.skuName);
            $scope.skulist[$scope.skuliasIndex[0]].vList[$scope.skuliasIndex[1]].skuAlisa = $scope.skualiasList.skuAlisa.join(',');
          } else {
            layer.msg('Addition failed');
          }
          $scope.cancelSku();
        })
      };
      function strLength(str) {
        return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
      };
      // 只展示私有商品
      $scope.showPrivatePro = function (flag) {
        if (flag) {
          $scope.listType = '0';
        } else {
          $scope.listType = '1';
        }
        getSkuList();
      }
      // 查询预警数据 是为true,否为''
      $scope.showIsWarning = function (flag) {
        if (flag) {
          $scope.isWarning = true;
        } else {
          $scope.isWarning = '';
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
      
      
      $scope.openSkuFun = function () {
        $scope.addskuFlag = true;
      }
      
      $('.sea-inp').keypress(function (ev) {
        if (ev.keyCode == '13') {
          $scope.seaSpFun();
        }
      })
      $scope.seaSpFun = function () {
        if (!$scope.seaSpInpVal) {
          layer.msg('Please enter a sku')
          return;
        }
        layer.load(2)
        var filterObj = {};
        filterObj.filter = {};
        filterObj.filter.inputStr = $scope.seaSpInpVal;
        dsp.postFun('pojo/product/getProductByAccount', JSON.stringify(filterObj), function (data) {
          console.log(data)
          layer.closeAll("loading");
          if (data.data.statusCode == 200) {
            $scope.pList = JSON.parse(data.data.result)
            console.log($scope.pList)
            if ($scope.pList.length) {
              dsp.getAreaByPid($scope.pList[0].id, function (data) {
                $scope.wareList = data;
                $scope.seleWare = data[0];
                
                $scope.chanSeleWare()

                
              })

            } else {
              // 没查到结果
              layer.msg('Oops, invalid SKU. Please check it carefully.');
            }

          } else {
            layer.msg('Search error')
          }
        }, function (data) {
          console.log(data)
          layer.closeAll("loading");
        })
      }
      $scope.chanSeleWare = function () {

        if($scope.pList[0].PRODUCTTYPE == "5"){
          const item = $scope.pList[0]
          dsp.getShipListSupplier({
            sku:item.sku,
            countryCode: $scope.seleWare.countryCode
          }, function (data) {
            $scope.logSet = data;
          });
        }else{
          dsp.getShipListNew({
            startCountryCode: $scope.seleWare.countryCode,
            propertys: $scope.pList[0].propertyKey.split(',')
          }, function (data) {
            $scope.logSet = data;
          });
        }
      }
      $scope.closeBzFun = function () {
        $scope.addskuFlag = false;
      }
      $scope.sureAddFun = function () {
        if (!$scope.pList) {
          layer.msg('Please search sku first');
          return
        }
        if (!$scope.addWlVal) {
          layer.msg('Please select shipping method.');
          return
        }
        layer.load(2)
        var addData = {};
        addData.data = {};
        addData.data.productId = $scope.pList[0].id;
        addData.data.shopMethod = $scope.addWlVal.nameEn;
        addData.data.defaultArea = $scope.seleWare ? $scope.seleWare.areaId : '';
        addData.data = JSON.stringify(addData.data);
        dsp.postFun('app/locProduct/assign', addData, function (data) {
          console.log(data)
          layer.closeAll('loading')
          if (data.data.statusCode == '200') {
            var parms = {
              type: '0',
              pid: $scope.pList[0].id,
              userid: userId
            }
            dsp.postFun('erp/publish/Calculation', parms, function() {})
            $scope.addskuFlag = false;
            $scope.logSet = [];
            $scope.pList = [];

          } else {
            layer.msg('Add failed');
          }
        }, function (data) {
          console.log(data)
          layer.closeAll('loading')
        })
      }

      /*包装相关操作*/
      //批量关联
      $scope.batchAssociation = function (item) {
        if(item.productType === '5') {
          layer.msg('Packages are not available to the product. ');
          return;
        }
        let itemData = {
          type: "0",
          pid: item.productId,
          shopId: item.shopId,
          NAMEEN: item.NAMEEN, //商品名称
          SKU: item.SKU,  // sku
          prices: item.SELLPRICE, //价格
          packweight: item.WEIGHT, //重量
          connectType:2 // 关联包装类型 2 是指派包装
        };
        location.href = '#/relevant-packaging/' + base64.encode(JSON.stringify(itemData)) + '/1';
      };
      //关联包装
      $scope.associatedPackaging = function (item) {
        if(item.productType === '5') {
          layer.msg('Packages are not available to the product. ');
          return;
        }
        console.log(item)
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
          vid: item.stanId,
          shopId: item.shopId,
          NAMEEN: item.NAMEEN, //商品名称
          SKU: item.SKU,  // sku
          prices: item.SELLPRICE, //价格
          packweight: item.PACKWEIGHT, //重量
          long: long, //长
          width: width, //宽
          height: height, //高
        };
         location.href = '#/relevant-packaging/' + base64.encode(JSON.stringify(itemData)) + '/1';
      }
      //查看包装
      $scope.viewPackaging = function (item) {
        console.log(item)
        dsp.getFun('cj/PackProduct/getProductStandList?pid='+item.PID+'&type=2', (res) => {
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


        if(item.vid){
           // 如果点击的是变体,直接查询该变体
          $scope.selectedVid = item.vid
          $scope.viewPackagingModal = true
          $scope.onSelectPackaging()
        }
      }

      $scope.formateSize = function(size) {
        let newSize = String(size);
        newSize = newSize.replace(/Long/,'Length');
        return newSize;
      }


      //选择某个包装变体，查询详情
      $scope.onSelectPackaging = function () {
        if($scope.selectedVid){
          // 选择了变体，显示变体下关联的包装商品
          dsp.postFun('cj/PackProduct/getCheckedList', {vid:$scope.selectedVid}, (res) => {
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

       // 关闭 view 弹框
       $scope.closeViewPackagingModal = function () {
        $scope.viewPackagingModal = false
        $scope.vidCheckedList = []
        $scope.selectedVid = ''
        $('.singleSelect').select2('destroy');
      }
      //解除绑定
      $scope.content2 = 'Are you sure to remove the binding?';
      $scope.showPopUps = false;
      $scope.unBind = function (item,isVarient) {
        $scope.showPopUps = true;
        $scope.popType = 3;
        $scope.removeParams = {
          type: '1',
          pid: item.PID || '',
        }
        if(isVarient){
          // 如果展开变体，则传入变体id
          $scope.removeParams.vid= item.stanId || ''
        }
      };

      // 全选所有商品
      $scope.chechedAll = () => {
        $scope.isCheckAll = !$scope.isCheckAll
        console.log($scope.skulist)
        $scope.skulist.forEach(o => {
          o.ischeck = $scope.isCheckAll
        })
        $scope.packNames =  $scope.skulist.filter(o => o.ischeck).map(o => ({ NAMEEN: o.NAMEEN, SKU:o.SKU, prices:o.SELLPRICE, packweight:o.WEIGHT,pid: o.ID, shopId: o.shopId}))
        console.log($scope.packNames)
        $scope.isConnection = $scope.skulist.filter(o => o.ischeck).length > 0
      }

      // 单选商品
      $scope.checkPro = (item, idx) => {
        console.log(item)
        item.ischeck = !item.ischeck
        const checkLen = $scope.skulist.filter(o => o.ischeck).length
        $scope.isConnection = checkLen > 0
        $scope.isCheckAll = $scope.skulist.length === checkLen 
      }
      
      // 单选变体商品
      $scope.checkProVid = (item, idx) => {
        console.log(item)
        item.ischeck = !item.ischeck
        // const checkLen = $scope.skulist.filter(o => o.ischeck).length
        // $scope.isConnection = checkLen > 0
        // $scope.isCheckAll = $scope.skulist.length === checkLen
      }

      // 批量关联包装
      $scope.bulkConnection = () => {
        $scope.packNames = $scope.skulist.filter(o => o.ischeck).map(o => ({ 
          type: "0",
          NAMEEN: o.NAMEEN, 
          SKU:o.SKU, 
          prices:o.SELLPRICE, 
          packweight:o.WEIGHT,
          pid: o.productId, 
          shopId: o.shopId,
          connectType:2 // 关联包装类型 2 是指派包装
        }))
        location.href = `#/relevant-packaging/1/1`;
        localStorage.setItem('relevantpackage',base64.encode(JSON.stringify($scope.packNames)));
        // location.href = `myCJ.html#/relevant-packaging//1/${base64.encode(JSON.stringify(ids))}`
      }

      // 批量解除包装弹框显示
      $scope.bulkRemoveConnection = () => {
        $scope.checkSkuList = $scope.skulist.filter(o => o.ischeck);
        if($scope.checkSkuList.length>0) $scope.batchDeletePopup =  true;
      }
      
      // 批量移除包装
      $scope.batchDeleteConfirmFun = ()=>{
        let params = $scope.checkSkuList.map(o=>({
          pid:o.PID,
          shopId:'', // 店铺id的是connetion包装删除，不传是skulist
          vid:o.vid
        }))
        dsp.postFun('cj/PackConnection/batchDelCorrelation', params, function ({data}) {
          if(data.statusCode=='200'){
            layer.msg("Bulk Removed Successfully");
          }else if(data.statusCode=='1102'){
            layer.msg("You're not authorized to delete the packaging, please contact your agent for more information");
          }else{
            layer.msg("Bulk Removing Failed");
          }
          $scope.batchDeletePopup =  false;
        })
      }

      function removeConnect() {
        const parms = {
          data: $scope.ids,
          type: '1'
        };
        layer.load(2);
        dsp.postFun('cj/PackProduct/batchDelCorrelation', parms, (res) => {
          layer.closeAll('loading');
          if(res.data.statusCode == '200'){
            layer.msg('Binding removed')
            layer.close(2);
            $scope.deletePopup =  false;
            getSkuList();
          }else {
            layer.msg('Binding removal failed')
          }
        }, (err) => {
          layer.close(2);
        })
        return false;
      }
    }]);

  return app;
}
