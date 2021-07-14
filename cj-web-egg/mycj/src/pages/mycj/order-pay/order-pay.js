import {STORAGE_INFO} from './order-pay-const';

export function orderPayFactory(angular) {
    const app = angular.module('order-pay.module', []);

    app.controller('order-pay.ctrl', ['$scope', 'dsp',
        function ($scope, dsp) {
            let orderInfo = JSON.parse(sessionStorage.getItem('order_info'));
            console.log(orderInfo);
            var bs = new Base64();
            let dataList = orderInfo;
            let allPrice = dataList.price;
            let orderNumber = dataList.id;
            let infoId = ''; //返回的状态类型id
            $scope.showTips = false;
            $scope.showConfirm = false;
            $scope.showStorehouse = false; //显示仓库列表
            $scope.storageList = []; //查看仓库列表
            $scope.isServer = false; //当前是否是服务商品
            $scope.unpayTip = false; //私有库存已抵扣未付款
            $scope.isPackagedGoods = false;
            $scope.type = dataList.type ? dataList.type : 1; //1:可抵扣详情；2：所包含子订单详情；3：子订单sku详情;4:失败的服务商品;5-不可抵扣的商品
            $scope.orderObj = {
                title: 'Bulk CJ Order Number: ' + orderNumber,
                postage: '',
                serverPrice: '',
                dikouPrice: '',
                allPrice: allPrice,
                payPrice: '',
                isServer: false
            }
            if ($scope.type == 4) {
                let oindex = dataList.index;
                let dataObj = dataList.errorLogInfo[oindex];
                $scope.orderObj.title = "SKU：" + dataObj.SKU;
                $scope.erroritemList = dataObj[dataObj.id];
            } else {
                // $scope.isServer = dataList.isServer;
                $scope.isServer = dataList.server;
                $scope.succList = dataList.successLogInfo;
                $scope.allOrderLogMap = dataList.allOrderLogMap;
                $scope.orderObj.postage = dataList.postage;
                $scope.orderObj.serverPrice = dataList.serverPrice;
                $scope.orderObj.dikouPrice = dataList.dikouPrice;
                $scope.orderObj.payPrice = (allPrice - dataList.dikouPrice + dataList.serverPrice).toFixed(2);
                for(let i = 0; i < $scope.succList.length; i++) {
                    if($scope.succList[i].productType == '3') {
                        $scope.isPackagedGoods = true;
                    }
                }
                
            }
            
            if ($scope.type == 5) {
                let oarr = dataList.stockoutOrderId;
                let newArr = [];
                $scope.stockoutIdList = oarr.join(',');
                for (let key in $scope.allOrderLogMap) {
                    if (oarr.indexOf(key) != -1) {
                        newArr.push($scope.allOrderLogMap[key])
                    }
                }
                $scope.stockoutList = newArr.reduce((acc, val) => acc.concat(val), []);
            }
            //返回
            $scope.goBack = function () {
                if ($scope.type == 2) {
                    $scope.type = 1;
                } else if ($scope.type == 3) {
                    $scope.type = 2;
                } else {
                    history.back();
                }
            }
            //查看子订单列表
            $scope.showOrderDetail = function (item) {
                $scope.type = 2;
                $scope.succitemList = item[item.id];
                $scope.orderObj.title = "SKU: " + item.SKU;
                $scope.SKUtitle = "SKU: " + item.SKU;
            }
            //查看子订单的sku列表
            $scope.showOrderDetailSKU = function (item) {
                $scope.type = 3;
                $scope.succitemSkuList = $scope.allOrderLogMap[item.id];
                $scope.orderObj.title = item.id + ' (Shipping Method：' + item.logistic_name + ':Warehouse：' + item.storageName + ')';
            }
            //可抵扣数量为0时显示提示信息
            $scope.showNumTip = function (num) {
                if (num != 0) return;
                $scope.showTips = true;
            }
            //物流查看
            $scope.stockSearch = function (item) {
                layer.load(2);
                $scope.storageList = [];
                dsp.postFun('cj/cjOrderPay/stockSearch', JSON.stringify({
                    "vid": item.stanProductId
                }), function (data) {
                    let oresult = data.data.result;
                    if ($scope.type == 4 && item.logistic_name == 'USPS+') {
                        infoId = 20;
                    } else if ($scope.type == 4 && item.logistic_name != 'USPS+') {
                        infoId = 21;
                    } else {
                        infoId = item.infoId;
                    }
                    layer.closeAll("loading")
                    if (infoId == 19) {
                        $scope.unpayTip = true;
                    } else {
                        let infoObj = STORAGE_INFO[infoId];
                        for (let key in oresult) {
                            if (infoObj[key]) {
                                $scope.storageList.push({
                                    title: infoObj[key].title,
                                    num: oresult[key],
                                    reason: infoObj[key].info
                                });
                            }
                        }
                        $scope.showStorehouse = true;
                    }

                })
            }
            //去付款
            let orderid = dataList.ordernum;
            if (orderid) {
                $scope.payOrdNum = bs.encode(orderNumber);
                $scope.ordquantity = bs.encode(orderid.toString());
                $scope.muordMoney = $scope.orderObj.payPrice.toString();
            }
            $scope.goSkipPay = function () {
                layer.load(2)
                // cj/cjOrderPay/cjOrderInventoryCheck
                dsp.postFun('cj/cjOrderPay/cjOrderBranchWarehouse', JSON.stringify({
                    "shipOrderId": orderNumber,
                    "type": "2",
                    money: $scope.orderObj.allPrice
                }), function ({data}) {
                    layer.closeAll("loading");
                    $scope.muordMoney = bs.encode(data.result.payMoney.toString()); //订单金额
                    location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + $scope.muordMoney + '/' + $scope.ordquantity;
                })
            }
            $scope.goPay = function (val) {
                let oPayPrice = $scope.orderObj.payPrice;
                let oBalance = dataList.balance;
                let allNum = 0;
                $scope.balanceM = oBalance;
                for (let i = 0, len = $scope.succList.length; i < len; i++) {
                    allNum = allNum + ($scope.succList[i].totalDeductionNum - 0);
                }
                if (allNum > 0) {
                    payFun();
                } else {
                    if (oBalance > 0 && oBalance < oPayPrice) {
                        $scope.showBalance = true;
                    } else {
                        location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + bs.encode($scope.muordMoney) + '/' + $scope.ordquantity;
                    }
                }
            }
            $scope.errorShowFlag = false;
            function payFun() {
                layer.load(2);
                let oPayPrice = $scope.orderObj.payPrice;
                let oBalance = dataList.balance;
                // cj/cjOrderPay/cjOrderDeduction
                dsp.postFun('app/goodsInfo/orderOutGoodsInfoOpt', JSON.stringify({
                    shipOrderId: orderNumber,
                    siyoucangku: 'init',
                    money: $scope.orderObj.payPrice
                }), function (data) {
                    layer.closeAll('loading');
                    if (data.data.result) {
                        layer.msg('Deducted Successfully', {time: 3000});
                        if (oBalance > 0 && oBalance < oPayPrice) {
                            $scope.showBalance = true;
                        } else {
                            location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + bs.encode($scope.muordMoney) + '/' + $scope.ordquantity;
                        }
                    } else {
                        if (data.data.code == 400) {
                            $scope.errorShowFlag = true;
                            $scope.logisticsReasonList = data.data.data.map((item) => {
                                return {
                                    recordNum: item,
                                    message: data.data.message
                                }
                            })
                        } else {
                            layer.msg('Deduct error');
                        }
                        // layer.msg('Deduct error');
                    }
                }, function (data) {
                    layer.closeAll('loading')
                    console.log(data)
                })
            }

            //余额抵扣
            $scope.deductMFun = function () {
                if ($scope.balanceM - $scope.muordMoney > 0) {
                    // layer.msg('余额大于订单金额!!!!')
                    location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + bs.encode($scope.muordMoney) + '/' + $scope.ordquantity;
                    return
                }
                layer.load(2);
                dsp.postFun('app/finance/prepayment', JSON.stringify({
                    shid: orderNumber,
                    money: $scope.balanceM
                }), function (data) {
                    layer.closeAll('loading')
                    $scope.showBalance = false;
                    if (data.data.result) {
                        layer.msg('deduct success')
                        $scope.muordMoney = ($scope.muordMoney - $scope.balanceM).toFixed(2);
                        location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + bs.encode($scope.muordMoney) + '/' + $scope.ordquantity;
                    } else {
                        layer.msg('deduct error')
                    }
                })
            }
            $scope.noDkYeFun = function () {
                $scope.isDkFlag = false;
                $scope.balanceM = 0;
                location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + bs.encode($scope.muordMoney) + '/' + $scope.ordquantity;
            }
            $scope.delFun = () => {
                let obj = {
                    shipId: orderNumber,
                    ids: $scope.stockoutIdList,
                    orderType: 'restoreOrder'
                }
                layer.load(2);
                dsp.postFun('app/order/cleanOrder', JSON.stringify(obj), function (data) {
                    layer.closeAll();
                    if (data.data.result) {
                        layer.msg('Delete Success');
                        history.back();
                    } else {
                        let msg = ''
                        if (Object.keys($scope.allOrderLogMap).length == $scope.stockoutList) {
                            msg = 'All the items of this order in the US warehouse have been employed by other users. Please keep waiting or delete the order.';
                        } else {
                            msg = 'Some items of this order in the US warehouse have been employed by other users. Please keep waiting.';
                        }
                        layer.open({
                            area: ['400px', '150px'],
                            title: '',
                            closeBtn: 0,
                            btn: ['Got it'],
                            shadeClose: true,
                            skin: '',
                            content: `<p style='padding-top:10px'>${msg}</p>`,
                            yes: function (indexf, layero) {
                                layer.close(indexf);
                            }
                        });
                    }
                })
            }
        }]);

    return app;
}
