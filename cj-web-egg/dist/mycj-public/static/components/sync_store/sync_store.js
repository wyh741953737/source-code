(function(angular) {
    angular.module('cjCompnentModule')
        .component('syncStore', {
            templateUrl: './static/components/sync_store/sync_store.html',
            controller: syncStoreCtrl,
            controllerAs: "vm",
            bindToController: true,
            bindings: {
                storeinfo: '=',
                synctip: '=',
                // storetype: '=',
                // onLog: '&'
            }
        });

    function syncStoreCtrl($scope, dsp, utils, $timeout) {
        var that = this;
        var userId = utils.getLocalInfo('userId');

        var storeinfo = that.storeinfo;
        $scope.showPopUps = false;
        $scope.content = 'Sync may take a while. Please be patient.'
        // storeinfo = {
        //     TYPE: 'shopify',
        //     NAME: 'redkoii',
        //     ID: '1'
        //

        // 四秒后隐藏
        $timeout(() => {
            this.synctip = false;
        }, 4000)
        
        

        // goActSyncShopPro()
        $scope.renovation = goActSyncShopPro;
        $scope.$on('currStoreId', function(d, data) {
            storeinfo = data;
        })
        // 获取弹窗组件关闭按钮
        $scope.$on('closePopUps', (e, data) => {
            $scope.showPopUps = data.showPopUps;
        })
        // 获取弹窗组件确定按钮
        $scope.$on('confirmPopUps', (e, data) => {
            confirmActSyncShopPro();
            $scope.showPopUps = data.showPopUps;
        })
        // 同步店铺商品
        function goActSyncShopPro() {
            if (!storeinfo) {
                layer.msg('Please select a store first! ');
                return false;
            }
            $scope.showPopUps = true;
        }

        function confirmActSyncShopPro() {
            layer.load(2);

            const { TYPE, ID:shopId } = storeinfo 
            // 新的拉取商品接口 整合版
            const shopTypes = ['ebay', 'Lazada', 'shopee', 'Woocommerce', 'shopify', 'etsy', 'wix']
            if(shopTypes.includes(TYPE)){
                dsp.postFun('platform-product/pull/pullShopProducts', { shopId }, function(res){
                    layer.closeAll()
                    // $scope.$emit('syncSuccess') // 这里是错误的位置，开发用，提测删
                    const customCodeMsg = ['30001', '30002', 30002, 30001]
                    const statusCode = res.data.code 
                    const outMsg = msg => layer.msg(msg)
                    if(customCodeMsg.includes(statusCode)) return outMsg(res.data.message || 'Sync Failed')

                    const errMsg = {
                        20007: 'Failed to sync store products',
                        20000: 'Sync in progress... Please be patient',
                        5000:'Wrong request parameter',
                        5001:"You haven't bound the store yet",
                        5002:'Data update failed',
                        5012:'Syncing failed. The number of the products for syncing has exceeded 1,000. Please contact our agents for more information. ',
                    }
                    if (Object.keys(errMsg).includes(statusCode + '')) return outMsg(errMsg[statusCode])
                    if(statusCode != 200) return outMsg('Sync Failed')
                    // outMsg('Synced Successfully')
                    $scope.$emit('syncSuccess') // 这里才是正确的位置
                })
                return 
            }

            // 老的拉取商品接口 保留部分第三方店铺拉取接口操作
            if (storeinfo.TYPE == 'ebay') {
                // "60F6BAF1-6CC0-493E-A675-923B6F205DFD"
                // storeinfo.ID
                dsp.postFun('ebay/getItemInfo', { "shopID": storeinfo.ID }, function(data) {
                    layer.closeAll('loading');
                    layer.msg('Synchronized products need to wait for a period of time depending on the number of products.')
                    if (data.data.statusCode == 200) {
                        if (data.data.result == '0/0') {
                            layer.msg('No product in this store.');
                        } else {
                            layer.msg('Sync successfully')
                        }
                    } else if (data.data.statusCode == 516) {
                        layer.msg('Sync Failed');   
                    } else {
                        // layer.msg('Sync Failed');
                        layer.msg(data.data.message);
                    }
                    layer.close(2);
                }, function(data) {
                    layer.closeAll('loading');
                    layer.msg('Sync Failed');
                });
            } else if (storeinfo.TYPE == 'Shipstation') {
                dsp.postFun('order/order/shipstationproduct', { "shopId": storeinfo.ID }, function(data) {
                    layer.closeAll('loading');
                    if (data.data.statusCode == 200) {
                        $scope.$emit('syncstoresuccess', 1);
                        layer.msg('Sync Success', { time: 2000 }, function() {
                            layer.close(2);
                        });
                    } else {
                        layer.msg('Sync Failed');
                    }
                }, function(data) {
                    layer.closeAll('loading');
                    layer.msg('Sync Failed');
                });
            } else if (storeinfo.TYPE == 'wix') {
                dsp.postFun('order/order/wixproduct', { "shopId": storeinfo.ID }, function(data) {
                    layer.closeAll('loading');
                    if (data.data.statusCode == 200) {
                        $scope.$emit('syncstoresuccess', 1);
                        layer.msg('Sync Success', { time: 2000 }, function() {
                            layer.close(2);
                        });
                    } else {
                        layer.msg('Sync Failed');
                    }
                }, function(data) {
                    layer.closeAll('loading');
                    layer.msg('Sync Failed');
                });
            } else if (storeinfo.TYPE == 'Brightpearl') {
                // ---------------------------------------------- 18-11-02-add 更改拉取店铺商品接口【backend:tyy】
                // ----------------------------------------------
                dsp.postFun('app/order/getBrightpearlUserProducts', JSON.stringify({
                    shops: storeinfo.ID
                }), function (n) {
                    layer.closeAll('loading');
                    if (n.data.data == true) {
                        layer.msg('Sync Success', { time: 2000 }, function () {
                            layer.close(2);
                        });
                        $scope.$emit('syncstoresuccess', 1);
                    } else {
                        layer.msg('Sync Failed');
                    }
                    }, function (data) {
                        layer.closeAll('loading');
                        layer.msg('Sync Failed');
                    });
            } else if (storeinfo.TYPE == 'Lazada') { // 19.8.7-lazada-add
                let bs = new Base64();
                const userId = localStorage.getItem('userId') == undefined ? "" : bs.decode(localStorage.getItem('userId'));
                dsp.postFun('lazada/product/getUserProducts', { "shops": storeinfo.ID,"userId":userId }, function (res) {
                    const data = res.data
                    layer.closeAll('loading');
                    if (data.statusCode == 200) {
                        $scope.$emit('syncstoresuccess', 1);
                        layer.msg('Sync Success', {
                            time: 2000
                        }, function () {
                            layer.close(index);
                        });
                    } else {
                        layer.msg('Sync Failed', {
                            time: 2000
                        }, function () {
                            layer.close(index);
                        });
                    }
                }, function (data) {
                    layer.closeAll('loading');
                    layer.msg('Sync Failed');
                });
            } else if (storeinfo.TYPE == 'shopee') { // 19.8.31-shopeee
                dsp.postFun('shopee/product/getGetItems', {"shopId": storeinfo.ID}, function (res) {
                    const data = res.data
                    layer.closeAll('loading');
                    if (data.statusCode == 200) {
                        $scope.$emit('syncstoresuccess', 1);
                        layer.msg('Sync Success', {
                            time: 2000
                        }, function () {
                            layer.close(index);
                        });
                    } else {
                        layer.msg('Sync Failed', {
                            time: 2000
                        }, function () {
                            layer.close(index);
                        });
                    }
                }, function (err) {
                    layer.closeAll('loading');
                    layer.msg('Sync Failed');
                });
            } else if (storeinfo.TYPE === 'Woocommerce') {
                dsp.postFun('woo/wooGetProducts', {
                        shopName: storeinfo.NAME,
                        shopId: storeinfo.ID,
                        userId: userId,
                    }, function (data) {
                        layer.closeAll('loading');
                        if (data.data.code == 200) {
                            $scope.$emit('syncstoresuccess', 1);
                            layer.msg('Sync Success', { time: 2000 }, function () {
                                layer.close(index);
                            });
                        } else if (data.data.code == 602) {
                            // 没有拉到新商品
                            $scope.$emit('syncstoresuccess', 1);
                            layer.msg('All products in your store have been synced to CJ.', { time: 2000 }, function () {
                                layer.close(2);
                            });
                        } else {
                            layer.msg('Sync Failed');
                        }
                    }, function (data) {
                        layer.closeAll('loading');
                        if (data.status == 504) {
                            $scope.$emit('syncstoresuccess', 1);
                            layer.msg('Sync Success', { time: 2000 }, function () {
                                layer.close(2);
                                $scope.$emit('syncstoresuccess', 1);
                            });
                        } else {
                            layer.msg('Sync Failed');
                        }
                    });
            } else if (storeinfo.TYPE === 'shopify') {
                dsp.postFun('listed_products/shopfiy/product/getUserProducts', {
                    shopId: storeinfo.ID,
                    userId: userId,
                }, res => {
                    layer.closeAll('loading');
                    const {data} = res;
                    if (data.code != 200) return layer.msg(data.message, { time: 2000 }, function () {
                        layer.close(2);
                    });
                    layer.msg(data.message, { time: 2000 }, function () {
                        layer.close(2);
                    });
                })
            } else {
                dsp.postFun('app/order/getUserProducts', {
                    shops: storeinfo.ID,
                    // shopID: storeinfo.ID,
                    userId: userId,
                }, function (data) {
                    layer.closeAll('loading');
                    if (data.data.statusCode == 200) {
                        $scope.$emit('syncstoresuccess', 1);
                        layer.msg('Sync Success', { time: 2000 }, function () {
                            layer.close(2);
                        });
                    } else if (data.data.statusCode == 602) {
                        // 没有拉到新商品
                        $scope.$emit('syncstoresuccess', 1);
                        layer.msg('All products in your store have been synced to CJ.', { time: 2000 }, function () {
                            layer.close(2);
                        });
                    } else {
                        layer.msg('Sync Failed');
                    }
                }, function (data) {
                    layer.closeAll('loading');
                    if (data.status == 504) {
                        $scope.$emit('syncstoresuccess', 1);
                        layer.msg('Sync Success', { time: 2000 }, function () {
                            layer.close(2);
                            $scope.$emit('syncstoresuccess', 1);
                        });
                    } else {
                        layer.msg('Sync Failed');
                    }
                });
            }
            return false;
        }
        // checkIsEbayInsynn()
            // 检查是否有正在同步中的ebay店铺
        function checkIsEbayInsynn() {
            if (!localStorage.getItem('syncingebaystore')) return;
            $scope.syncingebaystore = JSON.parse(localStorage.getItem('syncingebaystore'));
            // layer.msg('正在同步'+$scope.syncingebaystore.NAME+'的商品');
            $scope.syncing = true;
            // $scope.syncResult = data.data.result;
            var jinduTimer = setInterval(function() {
                dsp.postFun('ebay/getItemInfo', { "shopID": $scope.syncingebaystore.ID }, function(data) {
                    if (data.data.result == 'error') {
                        $scope.syncing = false;
                        clearInterval(jinduTimer);
                        $scope.syncResult = null;
                        layer.msg('Sync Failed');
                        return;
                    }
                    $scope.syncingebaystore.syncResult = data.data.result;
                    localStorage.setItem('syncingebaystore', JSON.stringify($scope.syncingebaystore));
                    if (data.data.result == 'success' || data.data.result == 'null') {
                        $scope.syncing = false;
                        localStorage.removeItem('syncingebaystore');
                        clearInterval(jinduTimer);
                        $scope.$emit('syncstoresuccess', 1);
                        // if ($scope.isAutoCone) {
                        //     $scope.getListLeft();
                        // }
                        // if ($scope.isSourceCon) {
                        //     $scope.getRightList();
                        // }
                    }
                }, function() {
                    clearInterval(jinduTimer);
                });
            }, 5000);
        }
    }


})(angular)