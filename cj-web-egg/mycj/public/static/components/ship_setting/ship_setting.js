(function (angular) {
    angular.module('cjCompnentModule')
        .component('shipSetting', {
        templateUrl: './static/components/ship_setting/ship_setting.html',
        controller: ['$scope', 'dsp', function ($scope, dsp) {
            this.$onInit = function () {
                shipSettingCtrl.call(this, $scope, dsp);
            };
        }],
        bindings: {
            proitem: '=',
            listtype: '=',
            proindex:'='
            // onLog: '&'
        }
    });

    // 使用方法
    // 传入：shipinfo
    // shipinfo = {
    //         weight: 邮寄重量,
    //         enName: 物流方式英文名称,
    //         pid: 商品id,
    //         shipDiscount: 运费折扣,
    //         index1: index, // 标记（会返回给父组件）
    //         index2:i  // 标记（会返回给父组件）
    // }
    // 点击save通知父组件
    // $scope.$emit('saveShipPrice', {
    //     index1: 传入的标记,
    //     index2: 传入的标记,
    //     shipDiscountPrice: 算好的折扣运费
    // });

    function shipSettingCtrl($scope, dsp) {
        // console.log(this.proitem);
        $scope.proitem = this.proitem;
        $scope.listtype = this.listtype;
        var proindex = this.proindex;
        console.log($scope.proindex)
        if ($scope.proitem.LOGISTICS) {
            $scope.proitem.shopMethod = $scope.proitem.LOGISTICS;
        }
        // 物流
        $scope.logisListShow = false;           // 新增物流弹窗
        $scope.selectLogisticsShow = false;     // 物流数据窗口
        $scope.notificationShow = false;        // 取消窗口
        $scope.nationalShow = false;        // 国家弹窗
        $scope.logisticsList = [];              // 物流数据
        $scope.getlogisticsList = [];           // 新增物流数据
        // $scope.selValue = '';                   // 物流选择
        // 开启物流弹窗
        let logisticsObj = {};
        let oldData;
        $scope.logisticsClick = () => {
            oldData = 0;
            console.log($scope.proitem)
            $scope.shopType = $scope.proitem.shopType;
            $scope.logisListShow = true;
            logisticsObj = $scope.proitem;
            
            dsp.getAreaByPid($scope.proitem.PID, function (data) {
                $scope.wareList = data;
                if ($scope.proitem.areaCountryCode) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].countryCode == $scope.proitem.areaCountryCode) {
                            $scope.seleWare = data[i];
                        }
                    }
                }
                let getlistdata = {
                    id: $scope.listtype == 'connect' ? $scope.proitem.dbAccId : $scope.listtype == 'skulist' ? $scope.proitem.ID : '',
                    weight: $scope.proitem.packweight,
                    areaId: $scope.seleWare && $scope.seleWare.areaId ? $scope.seleWare.areaId : '',
                    platForm: $scope.proitem.shopType
                }
                dsp.postFun('app/rebate/getModifyAccProduct', getlistdata, (res) => {
                    if (res.status == '200') {
                        res.data.forEach(function (o, i) {
                            o.wuliuGradeTem = i + 1
                            o.editFlag = true;
                            o.wuliuNameFlag = true;
                            o.status = 'Save';
                        });
                        $scope.getlogisticsList = res.data;
                        $scope.logiDiscountDisplay = false
                        for (let i = 0; i < $scope.getlogisticsList.length; i++) {
                            if ($scope.getlogisticsList[i].logiDiscount != "0") {
                                $scope.logiDiscountDisplay = true
                                break
                            }
                        }
                    }
                })
            })
        };

        $scope.focusSeleWare = function () {
            $scope.seleWareCurr = $scope.seleWare;
        }
        
        $scope.chanSeleWare = function () {
            layer.open({
                title: null,
                type: 1,
                area: ['480px', '200px'],
                skin: '',
                closeBtn: 0,
                content: '<p>Change the warehouse will clear the logistics list. Are you sure you want to change the warehouse?</p>',
                btn: ['Cancel', 'Confirm'],
                yes: function (index, layero) {
                    $scope.seleWare = $scope.seleWareCurr;
                    $scope.$apply();
                    layer.close(index);
                },
                btn2: function (index, layero) {
                    if ($scope.seleWare) {
                        $scope.getlogisticsList = [];
                        $scope.$apply();
                    }
                    layer.close(index);
                    return false;
                }
            });
            
        }
        // 控制物流折扣率显示与隐藏
        // $scope.logiDiscountDisplay = false
        // for (let i = 0; i < $scope.getlogisticsList.length; i++) {
        //     if ($scope.getlogisticsList[i].logiDiscount != "0") {
        //         $scope.logiDiscountDisplay = true
        //         break
        //     }
        // }
        // 关闭物流
        $scope.closeLogistics = () => {
            if (oldData) {
                $scope.notificationShow = true;
            } else {
                $scope.logisListShow = false;
                $scope.selectLogisticsShow = false;
            }
        };
        // 获取物流数据
        $scope.getLogistics = () => {
            if (!$scope.seleWare) {
                layer.msg('Please select a shipping warehouse first.');
                return;
            }
            $scope.selectLogisticsShow = true;
            //获取物流方式
            // let data = {
            //     weight: $scope.proitem.packweight,
            //     lcharacter: $scope.proitem.MATERIALKEY,
            //     shopType: $scope.shopType
            // }
            // dsp.postFun2('getWayBy.json', JSON.stringify(data), function (res) {
            //     if (res.status == '200') {
            //         $scope.logisticsList = res.data;
            //     }
            // });
            // console.log($scope.proitem.packweight)
            const callback = (res) => {
                const data = res.data
                if (Number(data.statusCode) === 200) {
                    const list = JSON.parse(data.result).conList || []
                    const skuList = list.map(item => item.SKU)
                    // 商品类型: 0-正常商品 1-服务商品 3-包装商品 4-供应商商品 5-供应商自发货商品 6-虚拟商品 7-个性商品
                    // 是否供应商商品，0否，1是
                    const isSupplier = [5, '5'].includes($scope.proitem.productType) ? 1 : 0
                    // 获取物流选项
                    dsp.getShipListNew({
                        platForms: $scope.shopType ? [$scope.shopType] : [],
                        startCountryCode: $scope.seleWare.countryCode,
                        weightInterval: $scope.proitem.packweight,
                        propertys: $scope.proitem.MATERIALKEY.split(','),
                        // 是否供应商商品，0否，1是
                        isSupplier: isSupplier,
                        sku: skuList,
                    }, function (data) {
                        $scope.logisticsList = data;
                    });
                }
            }

            // 临时解决线上问题, 除关联列表之外的地方会报错的问题
            if (window.location.hash === '#/products-connection/connected') {
                // 先请求接口获取 sku 变体
                dsp.postFun('app/connection/conListdateill', {
                    "data": JSON.stringify({
                        accpid: $scope.proitem.ACCPID,
                        shopId: $scope.proitem.shopId,
                    })
                }, callback)
            } else {
                // 获取物流选项
                dsp.getShipListNew({
                    platForms: $scope.shopType ? [$scope.shopType] : [],
                    startCountryCode: $scope.seleWare.countryCode,
                    weightInterval: $scope.proitem.packweight,
                    propertys: $scope.proitem.MATERIALKEY.split(','),
                    // 是否供应商商品，0否，1是
                }, function (data) {
                    $scope.logisticsList = data;
                });
            }
        };
        // 添加物流列表数据
        $scope.addSellogistics = () => {
            if (!$scope.selValue) {
                layer.msg('Please choose logistics method');
                return;
            }
            for (let item of $scope.getlogisticsList) {
                if (item.logiName == $scope.selValue.nameEn) {
                    layer.msg('You cannot add an existed shipping method.');
                    return;
                }
            }
            let data = {
                logiName: $scope.selValue.nameEn,
                logiDiscount: 0,
                wuliuGradeTem: String($scope.getlogisticsList.length + 1),
                editFlag: false,
                wuliuNameFlag: true,
                status: 'Edit',
                logiCoun:[]
            }
            $scope.getlogisticsList.push(data);
            $scope.selectLogisticsShow = false;
            $scope.selValue = null;
            oldData = 1;
        };
        // 提交物流添加的物流数据
        $scope.submitLogistics = () => {
            // if ($scope.getlogisticsList.length < 1) {
            //     layer.msg('Modify failed');
            //     return;
            // }
            if (!$scope.seleWare) {
                layer.msg('Please select a shipping warehouse first.');
                return;
            }
            let logisticsInfo = [];
            for (let [i, item] of $scope.getlogisticsList.entries()) {
                if (!item.wuliuNameFlag) {
                    layer.msg(`Please prioritize ${item.logiName}`);
                    return;
                }
                if (item.status == 'Edit') {
                    layer.msg('Please save all the shipping methods.');
                    return;
                }
                let obj = {
                    logiName: item.logiName,
                    logiDiscount: item.logiDiscount,
                    sort: item.wuliuGradeTem,
                    logiCoun: item.logiCoun
                }
                logisticsInfo.push(obj)
            }
            let data;
            if ($scope.listtype == 'connect') {
                data = {
                    logisticsInfo: JSON.stringify(logisticsInfo),
                    accpid: $scope.listtype == 'connect' ? $scope.proitem.ACCPID : $scope.listtype == 'skulist' ? $scope.proitem.productId : '',
                    shopId: $scope.proitem.shopId,
                    platForm: 'connect'
                }
            }
            if ($scope.listtype == 'skulist') {
                data = {
                    logisticsInfo: JSON.stringify(logisticsInfo),
                    productId: $scope.proitem.productId,
                    shopId: $scope.proitem.shopId,
                    platForm: 'list'
                }
            }
            data.defaultArea = $scope.seleWare.areaId;
            
            dsp.postFun('app/rebate/appModifyAccProduct', JSON.stringify(data), (res) => {
                if (res.data.result == 1) {
                    layer.msg('Saved Successfully');
                    if ($scope.getlogisticsList.length < 1) {
                        $scope.proitem.shopMethod = 'Not set';
                    } else {
                        $scope.proitem.shopMethod = $scope.getlogisticsList[0].logiName;
                    }
                    $scope.$emit('ship-setting', {
                        flag: 'submit-ship-success',
                        ship: {
                            shipMethod: $scope.proitem.shopMethod,
                            defaultArea: $scope.seleWare.areaEn,
                            proindex: proindex
                        }
                    })
                } else {
                    layer.msg('Submission failed');
                }
                $scope.logisListShow = false;
                $scope.selectLogisticsShow = false;
                $scope.notificationShow = false;
            })
        };
        // 关闭选择物流
        $scope.canceSelllogistics = () => {
            $scope.selectLogisticsShow = false;
        };
        // 关闭物流
        $scope.cancellogistics = () => {
            $scope.selectLogisticsShow = false;
            $scope.selValue = null;
        };
        // 编辑弹窗
        $scope.editLogistics = (index, item) => {
            oldData = 1;
            item.status = 'Edit';
            item.editFlag = false;
            if (item.wuliuGradeTem) {
                item.wuliuGradeTem = String(index + 1);
            } else {
                item.wuliuNameFlag = false;
                item.editFlag = false;
            }
        };
        // 保存弹窗
        $scope.saveLogistics = (index, item) => {
            item.status = 'Save';
            item.editFlag = true;
            let wuliuGradeTem = item.wuliuGradeTem;
            if (!item.wuliuGradeTem) {
                item.wuliuNameFlag = false;
                return;
            }
            for (let list of $scope.getlogisticsList) {
                if (item.wuliuGradeTem == list.wuliuGradeTem && list.editFlag) {
                    list.wuliuNameFlag = false;
                    list.wuliuGradeTem = '';
                    item.wuliuGradeTem = wuliuGradeTem;
                    item.wuliuNameFlag = true;
                }
            }
        };
        // 取消弹窗
        $scope.cancelLogistics = (item) => {
            item.status = 'Save';
            item.editFlag = true;
        };
        // 删除弹窗
        $scope.deleteLogistics = (index, item) => {
            oldData = 1;
            if ((index + 1) == $scope.getlogisticsList.length) {
                $scope.getlogisticsList.splice(index, 1);
            } else {
                // item.editFlag = false;
                // item.wuliuGradeTem = '';
                // item.status = 'Edit';
                // for (let i = (index + 1); i <= $scope.getlogisticsList.length; i++) {
                //     $scope.getlogisticsList.splice(i, 1);
                // }
                $scope.getlogisticsList.splice(index, 1);
                // $scope.getlogisticsList[index].editFlag = false;
                // $scope.getlogisticsList[index].wuliuGradeTem = '';
                // $scope.getlogisticsList[index].status = 'Edit';
                for(let i = 0, len = $scope.getlogisticsList.length; i < len;i++){
                    let curGradeTem = i + 1 + '';
                    $scope.getlogisticsList[i].wuliuGradeTem = curGradeTem;
                }
                console.log($scope.getlogisticsList)
            }
            
        };
        // 关闭
        $scope.cancellogistics = () => {
            $scope.logisticsListShow = false;
        };
        // 关闭提示弹窗取消
        $scope.candelMessage = () => {
            $scope.notificationShow = false;
        };
        // 关闭提示弹窗确定
        $scope.confirmMessage = () => {
            $scope.logisListShow = false;
            $scope.selectLogisticsShow = false;
            $scope.notificationShow = false;
        }
        
        
        // 点击选择国家列的三角按钮,获取国家列表
        $scope.getCountrylData = (shipItem) => {
            console.log(shipItem);
            $scope.curritem = angular.copy(shipItem);

            // 打开物流方式支持的国家弹窗
            $scope.nationalShow = true;

            // 点击添加国家获取国家数据
            $scope.addCountry = () => {
                // 点击添加国家打开选择国家弹窗,获取国家列表数据
                $scope.selectCountryShow = true;
                $scope.checkAllFlag = false;
                // const url = 'lc/erplogistics/getLogisticCountry'
                const url = `cujiaLogisticsFreight/operation/getReachableCountry`
                // 商品类型: 0-正常商品 1-服务商品 3-包装商品 4-供应商商品 5-供应商自发货商品 6-虚拟商品 7-个性商品
                // 是否供应商商品，0否，1是
                const isSupplier = [4, 5, '4', '5'].includes($scope.proitem.productType) ? 1 : 0
                const params = {
                    logisticsName: shipItem.logiName,
                    startCountryCode: $scope.seleWare && $scope.seleWare.countryCode,
                    isSupplier,
                };
                // dsp.load();
                // const dom = document.getElementById('router-outlet-wrap')
                const msgLoading = cjMessage.loading({ isFixed: true });
                dsp.postFun(url, JSON.stringify(params), (res) => {
                    if (res.status == 200) {
                        // console.log(res);
                        const list = res.data.data || []
                        $scope.getCountryList = list
                            .map((item) => {
                                // 格式化新接口数据为老接口形式
                                return { country: item.countryCode, countryfull: item.countryName }
                            })
                            .sort((a, b) => {
                                return a.country.charCodeAt(0) - b.country.charCodeAt(0)
                            });
                        // dsp.closeLoad();
                        console.log($scope.getCountryList);
                    }
                    msgLoading.hide();
                }, () => {
                    msgLoading.hide();
                });
            };

            // 全选
            $scope.checkAll = () => {
              $scope.checkAllFlag = !$scope.checkAllFlag;
              $scope.getCountryList = $scope.getCountryList.map(item => {
                item.checked = $scope.checkAllFlag
                return item
              })
            }
            // 单选
            $scope.checkOne = (item) => {
              console.log(item);
              item.checked = !item.checked;
              const len = $scope.getCountryList.filter(item => item.checked).length;
              $scope.checkAllFlag = len === $scope.getCountryList.length;
            }

            // 点击add暂存选中的国家
            $scope.addSelectCountry = () => {
                let selectedCountryList = [];
                selectedCountryList = $scope.getCountryList.filter(item => item.checked).map(item => {
                    return {
                        counCode: item.country,
                        counName: item.countryfull
                    }
                });
                console.log(selectedCountryList);
                for (const item of selectedCountryList) {
                    for (const list of $scope.curritem.logiCoun) {
                        if (item.counCode == list.counCode) {
                            return layer.msg('You cannot add existed country');
                        }
                    }
                }

                if (selectedCountryList.length <= 0) {
                    return layer.msg('Please select Country');
                }
                $scope.curritem.logiCoun.push(...selectedCountryList)
                console.log("暂存后===>", $scope.curritem);
                $scope.selectCountryShow = false;
            };

            // 点击删除按钮删除当前行数据
            $scope.deleteCountry = ($index) => {
                console.log($index);
                $scope.curritem.logiCoun.splice($index, 1);
            }

            // 清空重新选择
            $scope.clearCountry = () => {
                $scope.curritem = angular.copy(shipItem);
                $scope.curritem.logiCoun = []
                console.log($scope.curritem);
            }

            // 关闭选择国家弹窗
            $scope.closeSelectCountry = () => {
                if($scope.getCountryList){
                    $scope.getCountryList = $scope.getCountryList.map(item => {
                        item.checked = false
                        return item
                    })
                }
                $scope.selectCountryShow = false;
            };

            // 关闭物流方式支持的国家弹窗
            $scope.closeCountry = () => {
                $scope.nationalShow = false;
            };

            // 确认提交添加国家
            $scope.submitCountry = () => {
                if ($scope.curritem.logiCoun.length <= 0) {
                    return layer.msg(`Logistics can't be empty`);
                }
                shipItem.logiCoun = $scope.curritem.logiCoun;
                layer.msg(`Modified Successfully`);
                console.log($scope.getlogisticsList);
                $scope.nationalShow = false;
            };
        };
    }


})(angular)