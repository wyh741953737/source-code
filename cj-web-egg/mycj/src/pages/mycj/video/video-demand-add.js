import { floatLength } from '@src/utils/index';

export function videoDemandAddFactory(angular) {
  const module = angular.module('video-demand-add.module', ['home-service']);
  module.controller('video-demand-add.ctrl',
    ['$scope', '$rootScope', 'dsp', 'cjhome',
      function($scope, $rootScope, dsp, cjhome) {
        const userInfo = $rootScope.userInfo;
        const { userId, loginName, salesmanId, relateSalesman, vip } = userInfo;
        $scope.requestType = '1';
        $scope.storeDataList = [];
        $scope.pageNum = '1';
        $scope.quantity = 6;
        $scope.imgData = [];
        $scope.showSelect = false;
        
        // 选择类型
        $scope.onChangeProductType = val => {
          $scope.requestType = val;
        };

        $scope.showSelectFun = function(event) {
          event.stopImmediatePropagation();
          if($scope.showSelect) {
            $scope.showSelect = false
          } else {
            $scope.showSelect = true
          }
        }

        $scope.closeStoreList = function(event) {
          event.stopPropagation();
          $scope.showSelect = false
        }

        // 获取店铺数据
        function getStoreData() {
          dsp.postFun('app/shop/getshop', { data: JSON.stringify({ userId }) }, ({ data }) => {
            if (data.statusCode === '200') {
              $scope.storeDataList = JSON.parse(data.result).shoplist || [];
              $scope.storeData = $scope.storeDataList[0];
              $scope.storeDataValue = $scope.storeData.NAME
              getProductData();
              // 告诉sync组件当前店铺id
              $scope.storeinfo = $scope.storeData;
              $scope.$broadcast('currStoreId', $scope.storeData);
            }
          }, err => {
            console.log(err);
          });
        }
        
        getStoreData();
        
        // 获取商品数据
        function getProductData(search) {
          const boxWidth = document.getElementsByClassName('product-box')[0].clientWidth;
          $scope.pageSize = Math.floor(boxWidth / 220) *  2;
          const parmas = {
            pageNum: $scope.pageNum,
            pageSize: $scope.pageSize.toString(),
            userId: userId,
            shopId: $scope.storeData.ID,
            productName: $scope.productName
          };
          dsp.postFun('cj/Shop/shopproduct', { data: JSON.stringify(parmas) }, ({ data }) => {
            if (data.statusCode === '200') {
              $scope.productData = data.result.shopProduct || [];
              $scope.totalNum = data.result.count;
              $scope.totalPageNum = Math.ceil($scope.totalNum / $scope.pageSize);
              $scope.$broadcast('page-data', {
                pageNum: $scope.pageNum,
                totalNum: $scope.totalPageNum,
                totalCounts: $scope.totalNum,
                pageSize: $scope.pageSize,
                pagesizeList: []
              });
              if ($scope.productData.length > 0) {
                dsp.removeNodataPic($('.product-box'), 450);
              } else {
                // dsp.addNodataPic($('.product-box'), 450);
                showNoddata(search);
              }
            } else {
              layer.msg('The server is busy now, please try again later.');
            }
          }, err => {
            console.log(err);
          });
        }


        // 普通用户与vip，搜索前与搜索后的nodata插图
        function showNoddata(search) {
          if(vip == '1') {
            $scope.isVip = true
            if(search) {
              dsp.afterSearchPicVIP($('.product-box'), 450);
            } else {
              dsp.beforeSearchPicVIP($('.product-box'), 450);
            }
          } else {
            $scope.isVip = false
            if(search) {
              dsp.afterSearchPic($('.product-box'), 450);
            } else {
              dsp.beforeSearchPic($('.product-box'), 450);
            }
          }
        }
        
        $rootScope.$on('app/sourcing/shopproduct', (_, bool) => $scope.loading = bool);
        
        $scope.$on('pagedata-fa', function(d, data) {
          $scope.pageNum = data.pageNum;
          $scope.pageSize = data.pageSize;
          getProductData();
        });
        
        
        // 选择店铺
        $scope.onSelectStore = (item) => {
          $scope.showSelect = false
          $scope.storeDataValue = item.NAME
          $scope.storeData = item
          // 告诉sync组件当前店铺id
          $scope.storeinfo = $scope.storeData;
          $scope.$broadcast('currStoreId', $scope.storeData);
          $scope.pageNum = '1';
          getProductData('search');
        };
        
        // sync
        $scope.$on('syncstoresuccess', function() {
          location.reload();
        });
  
        // 搜索商品
        $scope.handleSearchProduct = () => {
          $scope.pageNum = '1';
          getProductData('search');
        };
        
        // 选择商品
        $scope.handleSelectProduct = item => {
          $scope.productData = $scope.productData.map(o => ({ ...o, isSelect: o.id === item.id }));
        };
        
        // 选择video / photo
        $scope.onSelectPhotography = val => {
          $scope.photographyType = val;
          const msg = String(val).toLocaleLowerCase();
          layer.msg(`You selected ${msg} shooting service.`);
        };
        
        // 数量改变
        $scope.onAddQty = () => {
          $scope.quantity < 999 && $scope.quantity++;
        };
        
        $scope.onCutQty = () => {
          $scope.quantity > 1 && $scope.quantity--;
        };
        
        $scope.onChangeQty = () => {
          if($scope.quantity > 999) {
            $scope.quantity = 999
          }
          $scope.quantity = floatLength($scope.quantity, 0);
        };
        
        $scope.onBlurQty = () => {
          if ($scope.quantity < 1) {
            $scope.quantity = 1;
          } else if ($scope.quantity > 999) {
            $scope.quantity = 999;
          }
        };
        
        // 添加图片
        $scope.handleAddImg = () => {
          if ($scope.imgData.length === 6) {
            layer.msg('You can only upload up to 6 images.');
            return;
          }
          document.getElementById('upload').click();
        };
        
        // 上传图片
        $scope.upLoadImg = file => {
          dsp.ossUploadFile(file, res => {
            document.getElementById('upload').value = '';
            if (res.code === 1) {
              $scope.imgData = [...$scope.imgData, res.succssLinks[0]];
            }
            $scope.$apply();
          });
        };
  
        // 删除图片
        $scope.handleRemove = item => {
          $scope.imgData = $scope.imgData.filter(o => o !== item);
        };
  
        // 取消
        $scope.handleCancel = () => {
          location.href = 'myCJ.html#/video-demand';
        };
  
        // 提交
        $scope.handleSubmit = () => {
          if ($scope.requestType === '1') {
            const selectProduct = $scope.productData.filter(o => o.isSelect)[0];
            if (!selectProduct) {
              layer.msg('Please select the product.');
              return;
            }
            if (!$scope.photographyType) {
              layer.msg('Please select the shooting type.');
              return;
            }
            checkSupplier(selectProduct)
          } else if ($scope.requestType === '2') {
            if (!$scope.productTitle) {
              layer.msg('Please enter the product title.');
              return;
            }
            if (!$scope.productUrl) {
              layer.msg('Please enter the product URL.');
              return;
            }
            if (!$scope.photographyType) {
              layer.msg('Please select the shooting type.');
              return;
            }
            const parmas = {
              param: $scope.productUrl
            }
            dsp.postFun('media/orderMedia/todayCount', {}, ({ data }) => {
              $scope.todayCountCode = data.code
              if (data.code === 200) {
                $scope.totalCount = data.data.totalCount;
                $scope.remainingCount = data.data.remainingCount;
                if ($scope.remainingCount === 0) {
                  layer.msg(`Please note that you can only send us ${$scope.totalCount} requests per day.`);
                }
              } else {
                layer.msg(data.message);
              }
            })
            if($scope.todayCountCode === 200 && $scope.remainingCount !== 0) {
              dsp.postFun('product-api/cjProductInfo/checkUrlIsCjProduct', parmas, ({ data }) => {
                $scope.isCjProduct = data.data
                if(!$scope.isCjProduct) {
                  layer.open({
                    area: ['600px', 'auto'],
                    title: ['Are you sure to post a photography request to us?'],
                    type: 1,
                    closeBtn: 1,
                    btn: ['Cancel', 'Sourcing'],
                    move: false,
                    shadeClose: true,
                    skin: 'center-layer',
                    content: `<p style="height: 44px">Please keep in mind that you can only send ${$scope.totalCount} requests per day.Your current request limit is ${$scope.remainingCount}.</p>
                              <br/>
                              <p style="height: 66px">Please connect the selected product to an existing CJ product or post a sourcing request before a matched result can be found as photography requests can only be accepted upon existing products on CJ.</p>`,
                    yes: idx => layer.close(idx),
                    btn2: (idx) => {
                      $scope.requestType === '1' ? storeRequest(idx) : individualRequest(idx);
                      return false;
                    }
                  });
                } else {
                  layer.open({
                    area: ['600px', 'auto'],
                    title: ['Are you sure to post a photography request to us?'],
                    type: 1,
                    closeBtn: 1,
                    btn: ['Cancel', 'Confirm'],
                    move: false,
                    shadeClose: true,
                    skin: 'center-layer',
                    content: `<p>Please keep in mind that you can only send ${$scope.totalCount} requests per day.Your current request limit is ${$scope.remainingCount}.</p>`,
                    yes: idx => layer.close(idx),
                    btn2: (idx) => {
                      $scope.requestType === '1' ? storeRequest(idx) : individualRequest(idx);
                      return false;
                    }
                  });
                }
              })
            }
          }
        };

        /** 检查是否为供应商商品如果是，不能下视频订单 */ 
        function checkSupplier(item) {
          $scope.isCjProduct = item.conCJProduct
          $scope.locPid = item.locPid
          const param = {
            pid:item.pid
          }
          dsp.postFun('app/sourcing/getProductStatus',param,(res)=>{
            try {
              const { data } = res
              const result = JSON.parse(data.result)
              const { status } = result
              if(status && (status ==='4' || status === '5')){
                layer.msg('Photography request is unavailable to the product.') 
              }else{
                dsp.postFun('media/orderMedia/todayCount', {}, ({ data }) => {
                  $scope.todayCountCode = data.code
                  if (data.code === 200) {
                    $scope.totalCount = data.data.totalCount;
                    $scope.remainingCount = data.data.remainingCount;
                    if ($scope.remainingCount === 0) {
                      layer.msg(`Please note that you can only send us ${$scope.totalCount} requests per day.`);
                    } else {
                      if(!$scope.isCjProduct) {
                        layer.open({
                          area: ['600px', 'auto'],
                          title: ['Are you sure to post a photography request to us?'],
                          type: 1,
                          closeBtn: 1,
                          btn: ['Cancel', 'Sourcing'],
                          move: false,
                          shadeClose: true,
                          skin: 'center-layer',
                          content: `<p style="height: 44px">Please keep in mind that you can only send ${$scope.totalCount} requests per day.Your current request limit is ${$scope.remainingCount}.</p>
                                    <br/>
                                    <p style="height: 66px">Please connect the selected product to an existing CJ product or post a sourcing request before a matched result can be found as photography requests can only be accepted upon existing products on CJ.</p>`,
                          yes: idx => layer.close(idx),
                          btn2: (idx) => {
                            $scope.requestType === '1' ? storeRequest(idx) : individualRequest(idx);
                            return false;
                          }
                        });
                      } else {
                        layer.open({
                          area: ['600px', 'auto'],
                          title: ['Are you sure to post a photography request to us?'],
                          type: 1,
                          closeBtn: 1,
                          btn: ['Cancel', 'Confirm'],
                          move: false,
                          shadeClose: true,
                          skin: 'center-layer',
                          content: `<p>Please keep in mind that you can only send ${$scope.totalCount} requests per day.Your current request limit is ${$scope.remainingCount}.</p>`,
                          yes: idx => layer.close(idx),
                          btn2: (idx) => {
                            $scope.requestType === '1' ? storeRequest(idx) : individualRequest(idx);
                            return false;
                          }
                        });
                      }
                    }
                  } else {
                    layer.msg(data.message);
                  }
                })
              }
            } catch (error) {
              layer.msg('Service Busy') 
            }
          })
        }
  
        // 店铺媒体请求
        function storeRequest(idx) {
          const selectProduct = $scope.productData.filter(o => o.isSelect)[0];
          const parmas = {
            productName: selectProduct.title,
            pid: selectProduct.pid,
            price: selectProduct.prices,
            imageUrl: selectProduct.image,
            sourcetype: 0,
            shopId: selectProduct.shopid,
            shopName: selectProduct.shopname,
            description: $scope.instructions,
            mediaType: $scope.photographyType === 'video' ? 0 : 1,
            quantity: $scope.photographyType === 'video' ? 1 : $scope.quantity,
            isCjProduct: $scope.isCjProduct,
            locPid: $scope.locPid
          };
          layer.load(2);
          dsp.postFun('media/orderMedia/addAccSourceMediaDemand', parmas, ({ data }) => {
            layer.closeAll('loading');
            if (data.code === 200) {
              layer.close(idx);
              layer.msg('Submited Successfully');
              $scope.photographyType = null;
              $scope.quantity = 6;
              $scope.instructions = '';
              $scope.productData = $scope.productData.map(o => ({ ...o, isSelect: false }));
            } else {
              layer.msg(data.message);
            }
          }, err => {
            console.log(err);
          });
        }
  
        // 独有发布媒体请求
        function individualRequest(idx) {
          const parmas = {
            productName: $scope.productTitle,
            sourceUrl: $scope.productUrl,
            imageUrl: $scope.imgData.join(','),
            description: $scope.instructions,
            sourcetype: '1',
            price: '',
            country: '',
            mediaType: $scope.photographyType === 'video' ? 0 : 1,
            quantity: $scope.quantity,
            isCjProduct: $scope.isCjProduct
          };
          layer.load(2);
          dsp.postFun('media/orderMedia/addAccSourceMediaDemand', parmas, ({ data }) => {
            layer.closeAll('loading');
            if (data.code === 200) {
              layer.close(idx);
              layer.msg('Submited Successfully');
              $scope.photographyType = null;
              $scope.quantity = 6;
              $scope.instructions = '';
              $scope.productName = '';
              $scope.sourceUrl = '';
              $scope.imgData = [];
            } else {
              layer.msg(data.message);
            }
          }, err => {
            console.log(err);
          });
        }
      }])
  
  return module;
}
