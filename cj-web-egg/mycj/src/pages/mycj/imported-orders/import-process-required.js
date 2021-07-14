export function importProcessRequiredFactory(angular) {
    const app = angular.module('import-process-required.module', ['service']);

    app.directive('repeatFinish', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
                //当前循环至最后一个
                if (scope.$last === true) {
                    $timeout(function () {
                        //向父控制器传递事件消息
                        scope.$emit('repeatFinishCallback');
                    }, 100);
                }
            }
        }
    });
    app.controller('import-process-required.ctrl', ['$scope', '$rootScope', 'dsp', '$stateParams',
        function ($scope, $rootScope, dsp, $stateParams,) {
            const base64 = $rootScope.base64;
            const userInfo = $rootScope.userInfo;
            $scope.userId = userInfo.userId;
            let discounteTransferFlag = false;//是否享受美国仓物流折扣优惠
            $('#yzy-merge-select').select2()
            $('#init_select').select2()
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
            $scope.storage = '';
            $scope.storageList = [{
                name: 'Yiwu Warehosue',
                id: '0'
            }, {
                name: 'Shenzhen Warehosue',
                id: '1'
            }, {
                name: 'Cal Warehouse',
                id: '2'
            }, {
                name: 'NJ Warehouse',
                id: '3'
            }]
            $scope.dataFound = true;
            //客户第一次进入订单模块的界面
            $scope.isordFlag = false;
            $scope.syStuFlag = false;
            $scope.errorShowFlag = false
            // var $navLis = $('.header-nav li');
            $scope.$on('repeatFinishCallback', function () {
                // pselwlFun(); //检测是否选择了物流
                $('#z-dcl-ord #dcl-note').attr('disabled', 'true');
                $('#z-dcl-ord .bj-spsku').attr('disabled', 'true');
            });


            // 20-01-19 物流原因 ---- 20-01-31 迁移
            const logisticsReasonURL = 'order/order/checkOrderLogsitics';
            $scope.logisticsReasonList = [];
            $rootScope.$on(logisticsReasonURL, function (_, bool) {
                bool ? layer.load(2) : layer.closeAll("loading");
            });
            $scope.showLogisticsReason = function (orderItem) {
                $scope.logisticsReasonList = []
                const params = {
                    orderNumber: orderItem.order.ID,
                    // orderNumber: '200116100011906809',
                };
                dsp.postFun(logisticsReasonURL, params, function (res) {
                    const data = res.data || {};
                    console.log(orderItem)
                    if (data.statusCode == '200') {
                        if (data.result.some(item => !item.success)) { // 含有不可用物流才显示列表
                            $scope.showLogisticsToggle(true);
                            for (var i = 0; i < data.result.length; i++) {
                                if (!data.result[i]['success']) {
                                    $scope.logisticsReasonList.push(data.result[i])
                                }
                            }
                        }
                    }
                });
            };
            $scope.showLogisticsToggle = function (bool = !$scope.logisticsReasonShow) {
                $scope.logisticsReasonShow = bool;
            };

            $scope.showWlListFun = function (orderItem, products, index) {
                console.log(orderItem)
                $scope.itemOrdSelected = orderItem;
                console.log($scope.itemOrdSelected);
                $scope.itemProductSelected = products;
                console.log($scope.itemProductSelected);
                $scope.curOrdIndex = index;
                console.log($scope.curOrdIndex);
                $scope.selectWlFlag = true;
                $scope.itemLogisticList = orderItem.LOGISTICINFO;
                console.log($scope.itemLogisticList);
                if (orderItem.LOGISTIC_NAME) {
                    $scope.checkdWlName = orderItem.LOGISTIC_NAME;
                } else {
                    $scope.checkdWlName = '';
                }
                console.log($scope.checkdWlName)
            }

            var pageH = $(window).height() - 171;
            var docH = $(document).height();
            $(window).scroll(function () {
                var before = $(window).scrollTop();
                if (before > 60) {
                    if (window.innerWidth > 1330 && window.innerWidth < 1590) {
                        $('.direct-ord-fil').addClass("showtop");
                    } else {
                        $('.direct-ord-fil').addClass("showtop1");
                    }
                } else {
                    $('.direct-ord-fil').removeClass("showtop");
                    $('.direct-ord-fil').removeClass("showtop1");
                }
            });
            $('.directorders-wrap').css({
                'min-height': $(window).height() * 1 + 'px'
            });
            $('.direct-right').css({
                'min-height': $(window).height() * 1 + 'px'
            });
            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
            //给更多搜索添加点击显示隐藏的动画
            $('#ditect-searchmore').click(function () {
                $('#ditect-moresearch').stop().toggle(300);
                $('#toggle-logo1').toggleClass('glyphicon-triangle-top');

                setTimeout(function () {
                    console.log($('#ditect-moresearch').height())
                    if ($('#toggle-logo1').hasClass('glyphicon-triangle-top')) {
                        console.log('显示搜索')
                        $('.direct-right').css({
                            'min-height': $(window).height() * 1 + $('#ditect-moresearch').height() + 10 + 'px'
                        });
                    } else {
                        console.log('隐藏搜索')
                        $('.direct-right').css({
                            'min-height': $(window).height() * 1 + 'px'
                        });
                    }
                }, 400)

            });
            // var isEmpower = localStorage.getItem('isEmpower');
            // if (isEmpower == null || isEmpower == '' || isEmpower == undefined) { } else {
            //   if (isEmpower == '1') {
            //     // var a = $('.tbnew-div>p:first-child');
            //     // var left = getElementLeft(a[0]) - 14;
            //     // var top = getElementTop(a[0]) - 4;
            //     // console.log(left, top);
            //     // $('.online-wrap2').css({
            //     //   "top": top + 'px',
            //     //   "left": left + 'px'
            //     // });
            //     // $scope.syStuFlag = true;
            //     // $('.zzc').hide();
            //     // $('.zzc2').show();
            //   }
            // }
            // $('.know').click(function () {
            //   $('.zzc').hide();
            //   $('.zzc2').hide();
            //   localStorage.setItem('closeFlag', '1');
            //   location.href = '#/myCJAssociatedStore';
            // });
            // $('#online-content2').click(function () {
            //   $('.zzc2').hide();
            //   var a = $('.mycj-left-bar>ul>li').eq(0);
            //   console.log(a)
            //   var left = getElementLeft(a[0]) + 1;
            //   var top = getElementTop(a[0]) - 4;
            //   console.log(left, top);
            //   $('.online-wrap').css({
            //     "top": top + 'px',
            //     "left": left + 'px'
            //   });
            //   //$('.reordstu-dlist').css('display','block');
            //   $('.zzc').show();

            // });
            // $scope.jump = function () {
            //   console.log('1111111111')
            //   localStorage.setItem('closeFlag', '');
            //   location.href = '#/dropshipping-orders';
            // };

            function getElementLeft(element) {
                var actualLeft = element.offsetLeft;
                var current = element.offsetParent;

                while (current !== null) {
                    actualLeft += current.offsetLeft;
                    current = current.offsetParent;
                }

                return actualLeft;
            }

            function getElementTop(element) {
                var actualTop = element.offsetTop;
                var current = element.offsetParent;

                while (current !== null) {
                    actualTop += current.offsetTop;
                    current = current.offsetParent;
                }

                return actualTop;
            }

            //物流的请求
            //选择物流的请求
            var upShId; //税号的id
            var upShIndex; //税号的index
            $('#z-dcl-ord').on('change', '.dcl-ord-selwl', function (event) {
                event.stopPropagation();
                //获取选择框中的物流方式
                var thisWlFs = $(this).val();
                var countryCode = $(this).parent('.dcl-ord-wltd').siblings('.shipping-info').find('.imp-procus-country').text();
                var taxidText = $(this).parent('.dcl-ord-wltd').siblings('.shipping-info').children('.taixd-text').text();

                if ((thisWlFs == 'CJPacket' || thisWlFs == 'DHL' || thisWlFs == 'ePacket') && countryCode == 'BR' && !taxidText) {
                    upShId = $(this).parent().siblings('.ord-cai').children('.order-id').text();
                    upShIndex = $('#z-dcl-ord .dcl-ord-selwl').index(this);//订单下标
                    console.log(upShIndex, 'upShIndex')
                    $scope.taxidFlag = true;
                }
                //如果是切换成的是USPS+ 改变发往仓库
                console.log($(this).parent().parent().siblings('.d-toggle-tr').find('.where-from'))
                if (thisWlFs == 'USPS+') {
                    $(this).parent().parent().siblings('.d-toggle-tr').find('.where-from').text('USA')
                } else {
                    $(this).parent().parent().siblings('.d-toggle-tr').find('.where-from').text('China')
                }
                var propertyText = $(this).parent().parent().siblings('.d-toggle-tr').find('.property-text').text();
                console.log(propertyText)

                //获取隐藏域中可以发的物流数据
                var wlhidedata = $(this).siblings('.dclord-wl-hide').text();
                wlhidedata = JSON.parse(wlhidedata)
                console.log(wlhidedata)
                var wlstuPrice = 0; //存储物流费用
                for (var i = 0; i < wlhidedata.length; i++) {
                    // console.log(wlhidedata[i].logisticName)
                    if (wlhidedata[i].logisticName == thisWlFs) {
                        wlstuPrice = wlhidedata[i].price - 0;
                        $(this).css('border', '1px solid #ececec');
                        break;
                    } else {
                        $(this).css('border', '1px solid #f88f29');
                    }
                }
                console.log(wlstuPrice)
                //给邮费赋值
                // $(this).parent('.dcl-ord-wltd').siblings('.ship-cost-td').children('.logis-info-wlprice').children('.wl-money-span').text(wlstuPrice);
                //给邮费加上单位
                // $(this).parent('.dcl-ord-wltd').siblings('.ship-cost-td').children('.logis-info-wlprice').children('.unit-span').text('USD')
                //获取隐藏域中的商品总金额
                var spallmoney = $(this).parent('.dcl-ord-wltd').siblings('.ship-cost-td').children('.dclord-amount').text() - 0;
                //给 订单总金额赋值
                var cjAmountMoney = (wlstuPrice + spallmoney).toFixed(2);
                // var abc = $cjAmountMoney.toFixed(2);
                $(this).parent('.dcl-ord-wltd').siblings('.z-cjord-wm').children('.cj-price-num').children('#cj-a-money').text(cjAmountMoney + 'USD');
                // $scope.zlFun();
                console.log(spallmoney)
                console.log(cjAmountMoney)
                var wlData = {};
                var ordId = $(this).parent().siblings('.ord-cai').children('.order-id').text();
                var nowIndex = $(this).attr('index') * 1;
                var logistic = $(this).val();
                console.log(ordId + '===' + logistic);
                wlData.orderNum = ordId;
                wlData.logisic = logistic;
                console.log(logistic)
                $scope.ordersList.forEach(function (o, i) {
                    if (o.order.ID == ordId) {
                        o.order.LOGISTIC_NAME = logistic;
                        o.order.POSTAGE = wlstuPrice;
                        for (var j = 0; j < o.order.LOGISTICINFO.length; j++) {
                            if (thisWlFs == o.order.LOGISTICINFO[j].logisticName) {
                                $scope.ordersList[i].order.cast = o.order.LOGISTICINFO[j].cast == null ? '0' : o.order.LOGISTICINFO[j].cast;
                                break;
                            }
                        }
                    }
                })

                console.log($scope.remark)
                console.log($scope.remarkList)
                $scope.ordersList[nowIndex].order.POSTAGE = wlstuPrice;
                // 当前选中的物流
                let [currentWl] = ($scope.ordersList[nowIndex].order.LOGISTICINFO).filter(v => v.logisticName === thisWlFs);

                $scope.ordersList[nowIndex].order.currentWl_price = currentWl.price
                $scope.ordersList[nowIndex].order.currentWl_pack_price = currentWl.packPrice || 0

                dsp.postFun('app/order/upOrderLogisics', JSON.stringify(wlData), function (data) {
                    console.log(data)
                    if (data.data.result) {
                        // logisRemark($scope.list);
                        for (var j = 0; j < $scope.remarkList.length; j++) {
                            if (logistic == $scope.remarkList[j].nameen) {
                                if ($scope.remarkList[j].remark) {
                                    $scope.ordersList[nowIndex].order.remark = $scope.remarkList[j].remark.toString().replace(/<br>/g, '');
                                } else {
                                    $scope.ordersList[nowIndex].order.remark = $scope.remarkList[j].remark;
                                }
                                break;
                            }

                        }
                        console.log(propertyText)
                        console.log(propertyText.indexOf("BATTERY") >= 0 || propertyText.indexOf("ELECTRONIC") >= 0 || propertyText.indexOf("HAVE_CREAM") >= 0 || propertyText.indexOf("HAVE_MAGNETISM") >= 0)
                        console.log(thisWlFs)
                        if (thisWlFs == 'ePacket' && (propertyText.indexOf("BATTERY") >= 0 || propertyText.indexOf("ELECTRONIC") >= 0 || propertyText.indexOf("HAVE_CREAM") >= 0 || propertyText.indexOf("HAVE_MAGNETISM") >= 0)) {
                            $scope.ordersList[nowIndex].order.remark = 'We have to use a special ePacket channel to ship this order as it contains sensitive material like: battery, liquid, cream, magnet etc. The shipping cost will be 15% higher than normal ePacket.';
                        }
                        console.log($scope.ordersList[nowIndex])
                        for (var i = 0; i < wlhidedata.length; i++) {//如果有偏远费用 提示的优先级最高
                            if (wlhidedata[i].logisticName == thisWlFs) {
                                if (wlhidedata[i]['remoteFee'] > 0) {
                                    $scope.ordersList[nowIndex].order.remark = 'Additional Charges for Remote Address: ' + wlhidedata[i]['remoteFee'] + 'USD'
                                }
                            }
                        }
                    }
                }, function (data) {
                    console.log(data)
                })
            })

            $scope.checkItem = function (item) {
                console.log($scope.checkdWlName)
                $scope.checkdWlName = item.logisticName;
                $scope.confirmSelWlFun()
            }
            $scope.confirmSelWlFun = function () {
                console.log($scope.checkdWlName)
                console.log($scope.itemOrdSelected)
                let curOrdObj = $scope.itemOrdSelected;
                let curOrdProArr = $scope.itemProductSelected;
                console.log(curOrdProArr, 'curOrdProArr')
                //获取选择框中的物流方式
                var thisWlFs = $scope.checkdWlName;
                var countryCode = curOrdObj.COUNTRY_CODE;
                var taxidText = curOrdObj.taxidExtend;
                let curOrdId = curOrdObj.ID;
                if ((thisWlFs == 'CJPacket' || thisWlFs == 'DHL' || thisWlFs == 'ePacket') && countryCode == 'BR' && !taxidText) {
                    upShId = curOrdId;
                    upShIndex = $scope.curOrdIndex;//订单下标
                    console.log(upShIndex, 'upShIndex')
                    $scope.taxidFlag = true;
                }
                var propertyText = '';
                curOrdProArr.forEach(function (item, i) {
                    propertyText += curOrdProArr[i].PROPERTY
                })

                //获取隐藏域中可以发的物流数据
                var wlhidedata = curOrdObj.LOGISTICINFO;
                var wlstuPrice = 0; //存储物流费用
                for (var i = 0; i < wlhidedata.length; i++) {
                    if (wlhidedata[i].logisticName == thisWlFs) {
                        wlstuPrice = wlhidedata[i].price - 0;
                        break;
                    }
                }
                curOrdObj.POSTAGE = wlstuPrice;
                var spallmoney = curOrdObj.ORDER_AMOUNT - 0;
                //给 订单总金额赋值
                var cjAmountMoney = (wlstuPrice + spallmoney).toFixed(2);
                var wlData = {};
                var ordId = curOrdObj.ID;
                var nowIndex = $scope.curOrdIndex;
                var logistic = thisWlFs;
                $scope.ordersList[nowIndex].order.POSTAGE = wlstuPrice;
                wlData.orderNum = ordId;
                wlData.logisic = logistic;
                $scope.ordersList.forEach(function (o, i) {
                    if (o.order.ID == ordId) {
                        o.order.LOGISTIC_NAME = logistic;
                        o.order.POSTAGE = wlstuPrice;
                        for (var j = 0; j < o.order.LOGISTICINFO.length; j++) {
                            if (thisWlFs == o.order.LOGISTICINFO[j].logisticName) {
                                $scope.ordersList[i].order.cast = o.order.LOGISTICINFO[j].cast == null ? '0' : o.order.LOGISTICINFO[j].cast;
                                break;
                            }
                        }
                    }
                })
                console.log($scope.ordersList[nowIndex].order, '$scope.ordersList[nowIndex].order')
                $('#z-dcl-ord .dcl-ord-selwl').eq($scope.curOrdIndex).val(thisWlFs)
                $('#z-dcl-ord .z-cjord-wm').eq($scope.curOrdIndex).children('.cj-price-num').children('#cj-a-money').text(cjAmountMoney + 'USD');
                // 当前选中的物流
                let [currentWl] = ($scope.ordersList[nowIndex].order.LOGISTICINFO).filter(v => v.logisticName === thisWlFs);
                $scope.ordersList[nowIndex].order.currentWl_price = currentWl.price
                $scope.ordersList[nowIndex].order.currentWl_pack_price = currentWl.packPrice || 0
                dsp.postFun('app/order/upOrderLogisics', JSON.stringify(wlData), function (data) {
                    $scope.selectWlFlag = false;
                    if (data.data.result) {
                        for (var j = 0; j < $scope.remarkList.length; j++) {
                            if (logistic == $scope.remarkList[j].nameen) {
                                if ($scope.remarkList[j].remark) {
                                    $scope.ordersList[nowIndex].order.remark = $scope.remarkList[j].remark.toString().replace(/<br>/g, '');
                                } else {
                                    $scope.ordersList[nowIndex].order.remark = $scope.remarkList[j].remark;
                                }
                                break;
                            }

                        }
                        if (thisWlFs == 'ePacket' && (propertyText.indexOf("BATTERY") >= 0 || propertyText.indexOf("ELECTRONIC") >= 0 || propertyText.indexOf("HAVE_CREAM") >= 0 || propertyText.indexOf("HAVE_MAGNETISM") >= 0)) {
                            $scope.ordersList[nowIndex].order.remark = 'We have to use a special ePacket channel to ship this order as it contains sensitive material like: battery, liquid, cream, magnet etc. The shipping cost will be 15% higher than normal ePacket.';
                        }
                        for (var i = 0; i < wlhidedata.length; i++) {//如果有偏远费用 提示的优先级最高
                            if (wlhidedata[i].logisticName == thisWlFs) {
                                if (wlhidedata[i]['remoteFee'] > 0) {
                                    $scope.ordersList[nowIndex].order.remark = 'Additional Charges for Remote Address: ' + wlhidedata[i]['remoteFee'] + 'USD'
                                }
                            }
                        }
                    }
                }, function (data) {
                    console.log(data)
                })
            }
            //确定填写税号
            $scope.sureShFun = function () {
                console.log(upShId)
                console.log(upShIndex)
                if (!$scope.taixeVal) {
                    layer.msg('Please enter the tax number')
                    return;
                }
                layer.load(2)
                var uptaxid = {};
                uptaxid.cjorderid = upShId;
                uptaxid.taxid = $scope.taixeVal;
                console.log(JSON.stringify(uptaxid))
                dsp.postFun('app/order/updateTaxid', JSON.stringify(uptaxid), function (data) {
                    console.log(data)
                    layer.closeAll("loading")
                    if (data.data.code == 1) {
                        $scope.taxidFlag = false;
                        layer.msg('Add Success')
                        $scope.ordersList[upShIndex].order.taxidExtend = $scope.taixeVal;
                        $scope.taixeVal = '';
                    } else {
                        layer.msg('Add Failed')
                    }
                }, function (data) {
                    console.log(data)
                    layer.closeAll("loading")
                })
            }
            $scope.upShBtnFun = function (item, index) {
                $scope.taxidFlag = true;
                upShId = item.ID;
                upShIndex = index;
            }
            $scope.overOption1 = function (item) {
                $scope.remark = '';
                $scope.bulkWlList.forEach(function (o, i) {
                    if (item.order.LOGISTIC_NAME == o.nameen) {
                        $scope.remark = o.remark;
                    }
                })
                if ($scope.remark) {
                    item.isremark = true;
                }
            }
            $scope.overOption2 = function (item) {
                item.isremark = false;
            }
            //留言功能
            $scope.editnoteFlag = false;
            var changenoteid = '';
            var $noteObj = {};
            var $hidenoteObj = {};
            $scope.editNote = function (item, $event) {
                // $event.stopPropagation();
                $scope.editnoteFlag = true;
                changenoteid = item.ID;
                var textstr = '<textarea type="text" id="dcl-note"></textarea>'
                if ((item.NOTE_ATTRIBUTES == '' && $($event.target).parent().parent().find('#dcl-note').length == 0) || (item.NOTE_ATTRIBUTES == null && $($event.target).parent().parent().find('#dcl-note').length == 0)) { //&&$($event.target).parent().siblings('#dcl-note')==undefined
                    $($event.target).parent().parent().prepend(textstr);
                    // alert('创建一个文本框')
                }
                $hidenoteObj = $($event.target).parent().siblings('.hide-note-p'); //获取隐藏域的笔记内容
                $('.editmess-text').val($hidenoteObj.text()); //给留言框赋当前值
                $noteObj = $($event.target).parent().siblings('#dcl-note'); //获取当前的留言框
                // return false;
            }
            //留言的取消按钮
            $scope.cancelmessFun = function () {
                $scope.editnoteFlag = false;
                $('.editmess-text').val('');
                $noteObj.attr('disabled', 'true');
            }
            //确定留言功能
            $scope.entermessFun = function () {
                var noteText = $.trim($('.editmess-text').val());
                $hidenoteObj.text(noteText); //给隐藏域里笔记内容赋值
                console.log(noteText)
                var noteData = {};
                noteData.orderNum = changenoteid;
                noteData.note = noteText;
                console.log(noteText)
                console.log(noteData)
                console.log($noteObj)
                dsp.postFun('app/order/upOrderNote', JSON.stringify(noteData), function (data) {
                    $scope.editnoteFlag = false; //关闭留言弹窗

                    $noteObj.removeAttr('disabled')
                    $noteObj.val(noteText); //给修改的留言赋值
                    $noteObj.attr('disabled', 'true');
                    console.log(data)
                }, function (data) {
                    console.log(data)
                })
            }
            //国家切换，税收显示
            $scope.showTaxid = false
            $scope.cityChange = function(city){
                $scope.addCountryCode = city.substr(0,2)
                $scope.logisticsWay()
                console.log($scope.addCountryCode)
            }

            // $scope.countrySelect = (res) => {
            //     console.log(res)
            // }

            //数组去重
            function unique(arr){
                let result = new Map()
                return arr.filter((a) => !result.has(a) && result.set(a,1))
              }

            //修改地址
            $scope.modefyAddFun = function (pro, item, index) {
                console.log(item)
                console.log(pro)
                $scope.property = [] //商品属性
                $scope.productTypes = [] //商品类型
                $scope.productOrdSku = [] //商品sku
                $scope.productPrice = [] //商品价格
                $scope.addModefyFlag = true;
                $scope.addItemId = item.ID;
                $scope.addItemIndex = index;
                $scope.address1 = item.SHIPPING_ADDRESS; //地址
                $scope.address2 = item.shippingAddress2;
                $scope.addCity = item.CITY; //城市
                $scope.addProvince = item.PROVINCE;
                $scope.addZip = item.ZIP; //邮编
                $scope.addPhone = item.PHONE;
                $scope.addName = item.CUSTOMER_NAME;
                $scope.addTaxid = item.dutyNo//税号
                $scope.addLogisiticName = item.LOGISTIC_NAME; //选择的发货地址
                $scope.addAreaId = item.areaId; //发货地区Id
                $scope.updateId = item.areaId
                $scope.addLogisiticinfo = item.LOGISTICINFO; //发货仓列表
                $scope.addOrderWeight = item.ORDERWEIGHT; //商品总重量
                $scope.addQuantity = item.ORDER_QUANTITY; //商品总数量
                $scope.addCountryCode = item.COUNTRY_CODE; //目的国家
                $scope.addStartCountry = item.startCountryCode; //发货国家缩写
                $scope.addVolume = item.volume; //商品体积
                $scope.customerId = item.MERCHANTN_NUMBER; //客户id
                $scope.parameter =[{orderId:$scope.addItemId,transferAreaId:$scope.addAreaId}] //更新发货仓列表
                $("#init_select").val(item.areaId).select2()
                $('#init_select3').select2()
                const enName = countryEnName(item.COUNTRY_CODE);
                $scope.countryEnName = enName
                console.log( $scope.countryEnName )
                console.log(enName)
                if (enName) {
                    $scope.couneryInfo = item.COUNTRY_CODE + '#' + enName; //国家
                    $("#init_select2").val(item.COUNTRY_CODE + '#' + enName).select2()
                } else {
                    $scope.couneryInfo = '';
                }
                console.log($scope.couneryInfo)
                pro.forEach(item => {
                    $scope.property.push(item.PROPERTY) //添加商品属性
                    $scope.productTypes.push(item.product_type) //添加商品类型
                    $scope.productOrdSku.push(item.SKU) //添加商品sku
                    $scope.productPrice.push(item.PRICE)
                })
                $scope.property = $scope.property.join(',').split(',')
                $scope.property = unique($scope.property)
                $scope.productPrice.sort()
                $scope.maxPrice = $scope.productPrice[$scope.productPrice.length - 1]
                $scope.phoneErr = false
                $scope.zipErr = false
                $scope.taxidErr = false
                $scope.opinion().then();
            }

            $scope.checkPhone = function (phone) {
                phone = phone.replace(/[^\d\+\-\(\)]/g, "");
                $scope.addPhone = phone;
            }
            function countryEnName(code) {
                console.log(code)
                let len = $scope.countryList.length;
                console.log(len)
                let enName;
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        if (code == $scope.countryList[i].ID) {
                            enName = $scope.countryList[i].NAME_EN;
                            break;
                        }
                    }
                }
                return enName;
            }

            //改变发货仓,请求物流
            $scope.changeArea = (areaId) => {
                $scope.addLogisiticName = ''
                $scope.parameter[0].transferAreaId = areaId
                console.log(areaId)
                $scope.areaList.forEach(item=>{
                    if(item.areaId === +areaId){
                        console.log(item.countryCode)
                        $scope.addStartCountry = item.countryCode
                    }
                })
                $scope.logisticsWay()
                console.log($scope.addStartCountry)
            }
            $scope.wuliuCode = [];
            //改变物流方式
            $scope.changeLogisitic = () => {
                if($scope.addLogisiticinfo){
                    let dataIndex = $scope.addLogisiticinfo.findIndex((item) => item.nameEn === $scope.addLogisiticName)
                    if(dataIndex > -1) {
                        let obj = $scope.addLogisiticinfo[dataIndex]
                        let index = obj.ruleTips.findIndex((i) => i.msgCode.split('')[0] === '2')
                        if(index > -1 || $scope.addTaxid){
                            $scope.showTaxid = true
                            if(!$scope.addTaxid){
                                layer.msg('Please enter the tax ID.')
                            }
                        }else{
                            $scope.showTaxid = false
                        }
                    }
                }
            }

            //请求物流接口，获取物流方式
            $scope.logisticsWay = () => {
                var optionList = {
                    srcAreaCode:$scope.addStartCountry,
                    destAreaCode:$scope.addCountryCode,
                    weight:$scope.addOrderWeight, //商品重量
                    productProp:$scope.property, //商品属性
                    phone:$scope.addPhone,
                    zip:$scope.addZip,
                    dutyNo:$scope.addTaxid,//do it
                    productTypes:$scope.productTypes, //商品类型
                    skuList:$scope.productOrdSku, //商品sku
                    amount:$scope.maxPrice,
                    uid:$scope.addItemId,
                    volume:$scope.addVolume,//商品体积
                    platforms: '',//平台
                    customerCode: $scope.customerId, //客户id
                }
                console.log(optionList)
                console.log(JSON.stringify(optionList))
                if(!$scope.addTaxid){
                    $scope.showTaxid = false
                }
                if(!$scope.addLogisiticName){
                    $scope.showTaxid = false
                    layer.msg('Please select a shipping method.')
                }
                return new Promise((resolve,reject)=>{
                    dsp.postFun('freightService/cujiaLogisticsFreight/freight/option/list',JSON.stringify(optionList),function(res){
                        $scope.arrayLogistics = res.data.data;
                        $scope.addLogisiticinfo = $scope.arrayLogistics
                        if($scope.addLogisiticinfo){
                            let dataIndex = $scope.addLogisiticinfo.findIndex((item) => item.nameEn === $scope.addLogisiticName)
                            if(dataIndex > -1) {
                                let obj = $scope.addLogisiticinfo[dataIndex]
                                let index = obj.ruleTips.findIndex((i) => i.msgCode.split('')[0] === '2')
                                if(!$scope.addLogisiticName){
                                    return
                                }
                                if(index > -1){
                                    $scope.showTaxid = true
                                    resolve(true)
                                }else if($scope.showTaxid && !$scope.addTaxid){
                                    layer.msg('Please enter the tax ID.')
                                    resolve(true)
                                }else if($scope.addTaxid){
                                    $scope.showTaxid = true
                                    resolve(true)
                                }else{
                                    $scope.showTaxid = false
                                }
                            }
                        }
                        resolve(false)
                    })
                })
            }

            //校验判断 校验城市地址邮编等发生变化了给发货方式重新赋值
            $scope.opinion = function(){
                return new Promise ((resolve,reject)=>{
                    dsp.closeLoad()
                    if(!$scope.address1){
                        layer.msg('Please enter the address.')
                        resolve(false)
                    }else if(!$scope.addCity){
                        layer.msg('Please enter the city.')
                        resolve(false)
                    }else if(!$scope.addName){
                        layer.msg('Please enter name.')
                        resolve(false)
                    }else if(!$scope.couneryInfo){
                        layer.msg('Please select a country.')
                        resolve(false)
                    }else{
                        $scope.logisticsWay().then((data)=>{
                            if(data){
                                if ($scope.showTaxid && !$scope.addTaxid){
                                    layer.msg('Please enter the tax ID.')
                                    resolve(false)
                                }else{
                                    resolve(true)
                                }
                            }else{
                                resolve(true)
                            }
                        })
                    }
                })
            }
            
            //失去光标校验
            $scope.lost = function(){
                console.log('lost')
                $scope.opinion().then();
            }
            //确认编辑
            $scope.sureModeFun = function () {
                layer.load(2)
                console.log($scope.addItemIndex)
                var addUpdata = {};
                addUpdata.id = $scope.addItemId;
                addUpdata.shipping_address = $scope.address1;
                addUpdata.shipping_address2 = $scope.address2;
                addUpdata.city = $scope.addCity;
                addUpdata.province = $scope.addProvince;
                addUpdata.zip = $scope.addZip;
                addUpdata.phone = $scope.addPhone;
                addUpdata.name = $scope.addName;
                addUpdata.taxid = $scope.addTaxid;
                addUpdata.startCountryCode = $scope.addStartCountry; //发货国家缩写
                addUpdata.LOGISTIC_NAME = $scope.addLogisiticName; //发货物流名称
                addUpdata.areaId = $scope.addAreaId; //发货区域id
                addUpdata.country = $scope.countryEnName; //国家
                addUpdata.countryCode = $scope.addCountryCode; //目的国家缩写
                addUpdata.type = '1';
                console.log(addUpdata)
                console.log(JSON.stringify(addUpdata))
                if ($scope.couneryInfo) {
                    addUpdata.country = $scope.couneryInfo.split('#')[1];
                    addUpdata.countryCode = $scope.couneryInfo.split('#')[0];
                }
                $scope.opinion().then(data=>{
                    layer.load(2);
                    if(data){ //验证成功后请求Shipping From 和 update接口
                        console.log('1')
                        dsp.postFun('order/order/orderTransferArea', {
                            transferOrderDetailPMS: $scope.parameter,
                            routeDiscounteTransfer: false
                        }, function (data) {
                            discounteTransferFlag = false;
                            if (data.data.statusCode == 200) {
                                closebulkWareFlag()
                                $scope.zchecked_all = false
                                dsp.postFun('app/order/updateFiled', JSON.stringify(addUpdata), function ({data}) {
                                    console.log(data.ruleMsg)
                                    layer.closeAll("loading")
                                    if(data.msgCode === '505'){
                                        $scope.phoneErr = data.ruleMsg.filter(item => item.type==='phone') || []
                                        $scope.zipErr = data.ruleMsg.filter(item => item.type==='zip') || []
                                        $scope.taxidErr = data.ruleMsg.filter(item => item.type==='dutyNo') || []
                                    }else if (data.result > 0) {
                                        $scope.addModefyFlag = false;
                                        layer.msg('Modified Successfully')
                                        $scope.addressOrderList = []
                                        $scope.checkAddressList = []
                                        freshList()
                                    } else {
                                        layer.msg('Modify failed')
                                    }
                                }, function (data) {
                                    dsp.closeLoad();
                                    console.log(data)
                                })
                            } else {
                                layer.closeAll("loading")
                            }
                        })
                    }else{
                        dsp.closeLoad()
                    }
                });
                
            }

            //封装更新列表
            //提交过程中更新Shopping From
            $scope.updateSF = () => {
                dsp.postFun('order/order/orderTransferArea', {
                    transferOrderDetailPMS: $scope.parameter,
                    routeDiscounteTransfer: false
                }, function (data) {
                    discounteTransferFlag = false;
                    layer.closeAll("loading")
                    if (data.data.statusCode == 200) {
                        closebulkWareFlag()
                        $scope.zchecked_all = false
                        // layer.msg("Successfully changed shipping area！")
                    } else {
                        layer.msg(data.data.message)
                    }
                })
            }

            var bs = new Base64();
            var codeInlocal = localStorage.getItem('code');
            console.log(codeInlocal)
            var btnWidth = 0;
            var btnHeight = 0;
            if (codeInlocal) {
                var timer = setInterval(function () {
                    var myDate = new Date();
                    var tipHour = myDate.getHours(); //获取当前小时数(0-23)
                    var tipMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
                    var tipSecond = myDate.getSeconds(); //获取当前秒数(0-59)
                    $('#tiphour').text(tipHour + ':')
                    $('#tipminute').text(tipMinute + ':')
                    $('#tipsecond').text(tipSecond)
                    codeInlocal = localStorage.getItem('code');
                    $scope.tipsOrdStatues = localStorage.getItem('ordTips');
                    if (codeInlocal == '200') {
                        // $scope.refreshBtnFlag = true;
                        $('.refresh-btn').show();
                        clearInterval(timer)
                        console.log(myDate)
                        $scope.tipsOrdStatues = localStorage.getItem('ordTips');
                        $('.titOrdTips').text($scope.tipsOrdStatues)
                    }
                }, 1000)
            }
            //刷新价格
            $scope.freshBtnFun = function () {
                $scope.productList2 = [];
                $scope.searchPriceBySKU = ''
                getProductList2();
                $scope.freshPriceFlag = true;
                $('#checkAll2').attr('src', 'static/image/public-img/iconxz.png').removeClass('checkAll');
            }
            $scope.freshPriceFun = function (sku) {
                $scope.freshPriceFlag = false;
                var freshData = {};
                freshData.sku = sku;
                dsp.postFun('app/order/refreshOrderPrice', JSON.stringify(freshData), function (data) {
                    console.log(data)
                    layer.closeAll('loading')
                    if (data.data.result) {
                        layer.msg('Change success')
                        freshList();
                    } else {
                        layer.msg('Change failed')
                    }
                }, function (data) {
                    console.log(data)
                    layer.closeAll('loading')
                })
            }
            //刷新物流
            $scope.freshlogisticBtnFun = function () {
                $scope.productList = [];
                $scope.searchWuliuBySKU = ''
                getProductList();
                $scope.freshLogisticsFlag = true;
                $('#checkAll').attr('src', 'static/image/public-img/iconxz.png').removeClass('checkAll');
            };
            $scope.pagesize2 = '5';
            $scope.pagesize3 = '5';
            $scope.pagenum2 = '1';
            $scope.pagenum3 = '1';

            $scope.searchWuliu = () => {
                $scope.pagenum2 = '1';
                getProductList()
            }
            $scope.searchPrice = () => {
                $scope.pagenum3 = '1';
                getProductList2()
            }

            function getProductList2() {
                var sendData = {
                    pageSize: $scope.pagesize3,
                    page: $scope.pagenum3,
                    sku: $scope.searchPriceBySKU ? $scope.searchPriceBySKU : ''
                }
                dsp.load();
                dsp.postFun('app/order/getSkuByMerchantn', JSON.stringify(sendData), function (data) {
                    console.log(data.data);
                    dsp.closeLoad();
                    if (data.data.statusCode == 'CODE_200') {
                        var result = data.data.result;
                        $.each(result, function (i, v) {
                            var sku = v.sku;
                            var arr = sku.split('-')[0];
                            v.sku = arr;
                        });
                        $scope.productList2 = result;
                        $scope.totalNum3 = data.data.count;
                        pageFun3();
                    } else {
                        layer.msg('Failed to get list of items');
                    }
                });
            }

            function getProductList() {
                var sendData = {
                    pageSize: $scope.pagesize2,
                    page: $scope.pagenum2,
                    sku: $scope.searchWuliuBySKU ? $scope.searchWuliuBySKU : ''
                }
                dsp.load();
                dsp.postFun('app/order/getSkuByMerchantn', JSON.stringify(sendData), function (data) {
                    console.log(data.data);
                    dsp.closeLoad();
                    if (data.data.statusCode == 'CODE_200') {
                        var result = data.data.result;
                        $.each(result, function (i, v) {
                            // console.log(i,v)
                            var sku = v.sku;
                            var arr = sku.split('-')[0];
                            v.sku = arr;
                        });
                        $scope.productList = result;
                        $scope.totalNum2 = data.data.count;
                        pageFun2();
                    } else {
                        layer.msg('Failed to get list of items');
                    }
                });
            }

            function pageFun2() {
                console.log('11111');
                $(".pagegroup").jqPaginator({
                    totalCounts: $scope.totalNum2 || 1,
                    pageSize: $scope.pagesize2 * 1,
                    visiblePages: 5,
                    currentPage: $scope.pagenum2 * 1,
                    activeClass: 'current',
                    first: '<a class="prev" href="javascript:void(0);">&lt;&lt;<\/a>',
                    prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
                    next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
                    last: '<a class="next" href="javascript:void(0);">&gt;&gt;<\/a>',
                    page: '<a href="javascript:void(0);">{{page}}<\/a>',
                    onPageChange: function (n, type) {
                        if (type == 'init') {
                            return;
                        }
                        $scope.pagenum2 = n + '';
                        getProductList();
                    }
                });
            }

            function pageFun3() {
                console.log('11111');
                $(".pagegroup2").jqPaginator({
                    totalCounts: $scope.totalNum3 || 1,
                    pageSize: $scope.pagesize3 * 1,
                    visiblePages: 5,
                    currentPage: $scope.pagenum3 * 1,
                    activeClass: 'current',
                    first: '<a class="prev" href="javascript:void(0);">&lt;&lt;<\/a>',
                    prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
                    next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
                    last: '<a class="next" href="javascript:void(0);">&gt;&gt;<\/a>',
                    page: '<a href="javascript:void(0);">{{page}}<\/a>',
                    onPageChange: function (n, type) {
                        if (type == 'init') {
                            return;
                        }
                        $scope.pagenum3 = n + '';
                        getProductList2();
                    }
                });
            }

            //跳页
            $scope.pagenumchange3 = function () {
                let totalPage = Math.ceil(($scope.totalNum3 - 0) / ($scope.pagesize3 - 0))
                console.log(totalPage)
                if ($scope.pagenum3 > totalPage || $scope.pagenum3 < 1) {
                    if ($scope.pagenum3 < 1) {
                        $scope.pagenum3 = '1';
                    }
                    layer.msg('Page does not exist.');
                    return;
                }
                getProductList2();
            }
            //条数改变
            $scope.pagesizechange3 = function () {
                $scope.pagenum3 = "1";
                console.log($scope.pagesize);
                getProductList2();
            }
            //跳页
            $scope.pagenumchange2 = function () {
                let totalPage = Math.ceil(($scope.totalNum2 - 0) / ($scope.pagesize2 - 0))
                console.log(totalPage)
                if ($scope.pagenum2 > totalPage || $scope.pagenum2 < 1) {
                    if ($scope.pagenum2 < 1) {
                        $scope.pagenum2 = '1';
                    }
                    layer.msg('Page does not exist.');
                    return;
                }
                getProductList();
            }
            //条数改变
            $scope.pagesizechange2 = function () {
                $scope.pagenum2 = "1";
                console.log($scope.pagesize);
                getProductList();
            }

            //全选
            $('#checkAll').click(function () {
                if ($(this).hasClass('checkAll')) {
                    $(this).attr('src', 'static/image/public-img/iconxz.png').removeClass('checkAll');
                    $('.fresh-body1').find('.checkImg').attr('src', 'static/image/public-img/iconxz.png').removeClass('checked');
                } else {
                    $(this).attr('src', 'static/image/public-img/multiple11.png').addClass('checkAll');
                    $('.fresh-body1').find('.checkImg').attr('src', 'static/image/public-img/multiple11.png').addClass('checked');
                }
            });
            $('#checkAll2').click(function () {
                if ($(this).hasClass('checkAll')) {
                    $(this).attr('src', 'static/image/public-img/iconxz.png').removeClass('checkAll');
                    $('.fresh-body2').find('.checkImg').attr('src', 'static/image/public-img/iconxz.png').removeClass('checked');
                } else {
                    $(this).attr('src', 'static/image/public-img/multiple11.png').addClass('checkAll');
                    $('.fresh-body2').find('.checkImg').attr('src', 'static/image/public-img/multiple11.png').addClass('checked');
                }
            });
            $('.fresh-body1').on('click', '.checkImg', function () {
                if ($(this).hasClass('checked')) {
                    $(this).attr('src', 'static/image/public-img/iconxz.png').removeClass('checked');
                } else {
                    $(this).attr('src', 'static/image/public-img/multiple11.png').addClass('checked');
                }
                var len = $('.fresh-body1 .checkImg').length;
                var len2 = $('.fresh-body1 .checkImg.checked').length;
                if (len == len2) {
                    $('#checkAll').attr('src', 'static/image/public-img/multiple11.png').addClass('checkAll');
                } else {
                    $('#checkAll').attr('src', 'static/image/public-img/iconxz.png').removeClass('checkAll');
                }
            })
            $('.fresh-body2').on('click', '.checkImg', function () {
                if ($(this).hasClass('checked')) {
                    $(this).attr('src', 'static/image/public-img/iconxz.png').removeClass('checked');
                } else {
                    $(this).attr('src', 'static/image/public-img/multiple11.png').addClass('checked');
                }
                var len = $('.fresh-body2 .checkImg').length;
                var len2 = $('.fresh-body2 .checkImg.checked').length;
                if (len == len2) {
                    $('#checkAll2').attr('src', 'static/image/public-img/multiple11.png').addClass('checkAll');
                } else {
                    $('#checkAll2').attr('src', 'static/image/public-img/iconxz.png').removeClass('checkAll');
                }
            })
            $scope.freshLogisFun = function (sku) {
                layer.load(2)
                $scope.freshLogisticsFlag = false;
                var freshData = {};
                freshData.sku = sku;
                dsp.postFun('app/order/refreshLogisticsPrice', JSON.stringify(freshData), function (data) {
                    console.log(data)
                    layer.closeAll('loading')
                    if (data.data.result) {
                        layer.msg('Change success')
                        freshList();
                    } else {
                        layer.msg('Change failed')
                    }
                }, function (data) {
                    console.log(data)
                    layer.closeAll('loading')
                })
            }

            function freshList() {
                var searchinpVal = $.trim($('.ord-search-inp').val());
                $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                $scope.ordersList = [];
                dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                var orData = {};
                tjFun(orData)
                orData.data = JSON.stringify(orData.data);
                console.log(JSON.stringify(orData))
                dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                function dclsFun(data) {
                    var list1 = data.data.result;
                    $scope.list = data.data.result;
                    $scope.list = JSON.parse(list1);
                    $scope.ordersList = $scope.list.ordersList;
                    console.log(data)
                    $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                    if ($scope.pcountN > 0) {
                        dsp.removeNodataPic($('.orders-list'))
                        dsp.closeLoadPercent($('.orders-list'))
                    } else {
                        addNotSjFun()
                        dsp.closeLoadPercent($('.orders-list'))
                    }
                    $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                    logisRemark($scope.list);
                    importFun(); //分页函数
                    numFun(); //调用给订单赋值的函数
                }

                function dcleFun() {
                    layer.closeAll("loading")
                    dsp.closeLoadPercent($('.orders-list'))
                    dsp.cjMesFun(1);
                }
            }

            $('#updata-btn-wrap').mouseenter(function () {
                $('.ord-updata-div').show();
            })
            $('#updata-btn-wrap').mouseleave(function () {
                $('.ord-updata-div').hide();
            })
            $scope.refershFun = function () {
                $scope.syStuFlag = false;
                $('.reordstu-dlist').animate({
                    height: '275px'
                }, 300);
                $scope.syStu = 0;
                $scope.resOrdStu = 0;
                $('#dcl-sel').val('100');
                $scope.ordersList = [];
                dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                var orData = {};
                tjFun(orData)
                orData.data = JSON.stringify(orData.data);
                dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                function dclsFun(data) {
                    console.log(data.data)
                    var list1 = data.data.result;
                    $scope.list = data.data.result;
                    $scope.list = JSON.parse(list1);
                    $scope.ordersList = $scope.list.ordersList;
                    $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                    if ($scope.pcountN > 0) {
                        dsp.removeNodataPic($('.orders-list'))
                        dsp.closeLoadPercent($('.orders-list'))
                    } else {
                        addNotSjFun()
                        dsp.closeLoadPercent($('.orders-list'))
                    }

                    $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                    logisRemark($scope.list);
                    importFun(); //分页函数
                    numFun(); //调用给订单赋值的函数
                }

                function dcleFun() {
                    layer.closeAll("loading")
                    dsp.closeLoadPercent($('.orders-list'))
                    dsp.cjMesFun(1);
                }
            }

            //设置默认时间
            function GetDateStr(AddDayCount) {
                var dd = new Date();
                dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
                var y = dd.getFullYear();
                var m = dd.getMonth() + 1; //获取当前月份的日期
                var d = dd.getDate();
                if (m < 10) {
                    m = '0' + m
                }
                if (d < 10) {
                    d = '0' + d
                }
                return y + "-" + m + "-" + d;
            }

            var aDate = GetDateStr(-45);
            var enDate = GetDateStr(0);
            $("#cj-stime").val(aDate); //关键语句
            // $("#cj-etime").val('Now');   //关键语句

            var orData = {};
            orData.userId = bs.decode(localStorage.getItem('userId'));

            orData.data = {};
            orData.data.status = '1'; //请求的订单状态
            orData.data.canhandler = 'y';
            orData.data.page = 1; //请求的第几页   10*1-10Ò³Âë
            orData.data.limit = 100; //每页限制的订单条数
            //获取时间参数
            var yStoresTime = $('#y-ord-sdate').val();
            var yStoreeTime = $('#y-ord-edate').val();
            var cjsTime = $('#cj-stime').val();
            var cjeTime = $('#cj-etime').val();
            orData.data.storeOrderDateBegin = yStoresTime; //店铺开始时间
            orData.data.storeOrderDateEnd = yStoreeTime; //店铺结束时间
            orData.data.cjOrderDateBegin = cjsTime; //cj开始时间
            orData.data.cjOrderDateEnd = cjeTime; //cj结束时间

            $scope.pageLimit = orData.data.limit;
            $scope.countNumber = ''; //Ò»¹²¶àÉÙÌõ¶©µ¥
            $scope.list = ''; //¶©µ¥ºÍ²úÆ·
            $scope.orderList = ''; //¶©µ¥µÄÁÐ±íÊý¾Ý
            $scope.productList = ''; //²úÆ·µÄÁÐ±íÊý¾Ý
            $scope.flag = false; //ÅÐ¶Ï×´Ì¬
            //给待提交订单里的下拉框赋值
            $('#dcl-sel').val('100');

            $('.direct-orders-ctrltatus-nav').click(function () {
                bianliangtime++;
            });
            var a = $stateParams.idlist;
            if (a) {
                //console.log(a);
                var idList = base64.decode(a);
                console.log(idList);
                orData.data.orderNumber = idList;
            }
            orData.data = JSON.stringify(orData.data);
            $scope.pcountN = 0; //存储待提交订单的总条数 process required
            console.log(JSON.stringify(orData))
            dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

            function dclsFun(data) {
                var list1 = data.data.result;
                $scope.list = JSON.parse(list1);
                console.log($scope.list.orderList)
                $scope.shops = $scope.list.shops; //店铺的数组
                delShopFun($scope.shops)
                var excelShop = {};
                excelShop.id = 'excel';
                excelShop.name = 'Excel';
                excelShop.rNAME = 'Excel';
                $scope.shops.push(excelShop)
                console.log($scope.shops)
                $scope.ordersList = $scope.list.ordersList;
                console.log($scope.ordersList)
                console.log($scope.ordersList.orderArea)
                $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                console.log($scope.list.allOrderCount2)
                $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                if ($scope.pcountN > 0) {
                    dsp.removeNodataPic($('.orders-list'))
                    dsp.closeLoadPercent($('.orders-list'))
                } else {
                    addNotSjFun()
                    dsp.closeLoadPercent($('.orders-list'))
                }
                logisRemark($scope.list);
                importFun(); //分页函数
                numFun(); //调用给订单赋值的函数
            }

            function dcleFun() {
                layer.closeAll("loading")
                dsp.closeLoadPercent($('.orders-list'))
                dsp.cjMesFun(1);
            }

            //给订单状态赋值的函数
            function numFun() {
                $scope.impprocessNum = $scope.ordstatusNum.yi;
                $scope.cartNum = $scope.ordstatusNum.er;
                $scope.incompleteNum = $scope.ordstatusNum.san;
                $scope.cancelNum = $scope.ordstatusNum.si;
                $scope.refundNum = $scope.ordstatusNum.wu;
                $scope.allProNum = $scope.ordstatusNum.jiu;
                if ($scope.impprocessNum == 0 && $scope.cartNum == 0 && $scope.incompleteNum == 0 && $scope.cancelNum == 0 && $scope.refundNum == 0) {
                    $scope.dataFound = true; //隐藏没有数据的图片
                    $scope.isordFlag = true; //显示关联搜索的内容
                } else {
                    $scope.isordFlag = false; //隐藏关联搜索的内容
                }
            }

            //给物流加标记 - 物流备注信息分开写 [20-01-19]
            function logisRemark(orderData) {
                dsp.postFun('order/order/logisticsRemarkList', {}, function (res) {
                    const {data} = res || {};
                    if (data.statusCode == '200') {
                        logisRemarkHandle(Object.assign(orderData, {remark: data.result}));
                    } else {
                        logisRemarkHandle(Object.assign(orderData, {remark: []}));
                    }
                }, function () {
                    logisRemarkHandle(Object.assign(orderData, {remark: []}));
                });
            }

            //给物流加标记
            function logisRemarkHandle(res) {
                console.log('订单信息 ->', res);
                $scope.remarkList = res.remark;
                console.log($scope.remarkList)
                var listLength = $scope.ordersList.length;
                for (var i = 0; i < listLength; i++) {
                    if ($scope.ordersList[i].order.LOGISTIC_NAME) {
                        for (var j = 0; j < $scope.remarkList.length; j++) {
                            if ($scope.ordersList[i].order.LOGISTIC_NAME == $scope.remarkList[j].nameen) {
                                if ($scope.remarkList[j].remarkstr) {
                                    $scope.ordersList[i].order.remark = $scope.remarkList[j].remarkstr.toString().replace(/<br>/g, '');
                                } else {
                                    $scope.ordersList[i].order.remark = $scope.remarkList[j].remark;
                                }
                                break;
                                // console.log($scope.ordersList[i].order)
                            }
                        }
                        for (var k = 0; k < $scope.ordersList[i].order.LOGISTICINFO.length; k++) {
                            if ($scope.ordersList[i].order.LOGISTIC_NAME == $scope.ordersList[i].order.LOGISTICINFO[k].logisticName) {
                                $scope.ordersList[i].order.cast = $scope.ordersList[i].order.LOGISTICINFO[k].cast == null ? '0' : $scope.ordersList[i].order.LOGISTICINFO[k].cast;
                                break;
                            }
                        }
                        if ($scope.ordersList[i].order.LOGISTICINFO) {
                            for (var n = 0, nLen = $scope.ordersList[i].order.LOGISTICINFO.length; n < nLen; n++) {
                                if ($scope.ordersList[i].order.LOGISTIC_NAME == $scope.ordersList[i].order.LOGISTICINFO[n].logisticName && $scope.ordersList[i].order.LOGISTICINFO[n].remoteFee > 0) {
                                    $scope.ordersList[i].order.remark = 'Additional Charges for Remote Address: ' + $scope.ordersList[i].order.LOGISTICINFO[n].remoteFee + 'USD';
                                    break;
                                }
                            }
                        }

                    }
                    //地址1包含固定值 限制相应的物流
                    if ($scope.ordersList[i].order.SHIPPING_ADDRESS && $scope.ordersList[i].order.SHIPPING_ADDRESS.indexOf('Po Box') >= 0) {
                        for (let l = 0; l < $scope.ordersList[i].order.LOGISTICINFO.length; l++) {
                            if ($scope.ordersList[i].order.LOGISTIC_NAME == 'CJ Normal Express') {
                                $scope.ordersList[i].order.LOGISTIC_NAME = null;
                            }
                            if ($scope.ordersList[i].order.LOGISTICINFO[l].logisticName == 'CJ Normal Express') {
                                $scope.ordersList[i].order.LOGISTICINFO.splice(l, 1);
                                break;
                            }
                        }
                    }
                    //循环检测epacket带电的订单
                    if ($scope.ordersList[i].order.LOGISTIC_NAME == 'ePacket') {
                        if ($scope.ordersList[i].product) {
                            for (var j = 0, len = $scope.ordersList[i].product.length; j < len; j++) {
                                if ($scope.ordersList[i].product[j].PROPERTY.indexOf("BATTERY") >= 0 || $scope.ordersList[i].product[j].PROPERTY.indexOf("ELECTRONIC") >= 0 || $scope.ordersList[i].product[j].PROPERTY.indexOf("HAVE_CREAM") >= 0 || $scope.ordersList[i].product[j].PROPERTY.indexOf("HAVE_MAGNETISM") >= 0) {
                                    $scope.ordersList[i].order.remark = 'We have to use a special ePacket channel to ship this order as it contains sensitive material like: battery, liquid, cream, magnet etc. The shipping cost will be 15% higher than normal ePacket.';
                                    break
                                }
                            }
                        }
                    }
                    //检测sku
                    if ($scope.ordersList[i].product) {
                        for (var k = 0, klen = $scope.ordersList[i].product.length; k < klen; k++) {
                            if ($scope.ordersList[i].product[k].SKU.indexOf('CJJJJTJT00947') != -1 || $scope.ordersList[i].product[k].SKU.indexOf('CJJJJTJT00700') != -1) {
                                if ($scope.ordersList[i].order.LOGISTIC_NAME == 'PostNL' || $scope.ordersList[i].order.LOGISTIC_NAME == 'S.F China Domestic') {
                                    // console.log('默认是postnl')
                                    $scope.ordersList[i].order.LOGISTICINFO = [];
                                } else {
                                    if ($scope.ordersList[i].order.LOGISTICINFO) {
                                        // console.log('有备选物流')
                                        for (var l = 0, llen = $scope.ordersList[i].order.LOGISTICINFO.length; l < llen; l++) {
                                            if ($scope.ordersList[i].order.LOGISTICINFO[l].logisticName == 'PostNL' || $scope.ordersList[i].order.LOGISTICINFO[l].logisticName == 'S.F China Domestic') {
                                                $scope.ordersList[i].order.LOGISTIC_NAME = null;
                                                var logInfoArr = [];
                                                logInfoArr.push($scope.ordersList[i].order.LOGISTICINFO[l])
                                                $scope.ordersList[i].order.LOGISTICINFO = logInfoArr;
                                                // console.log('备选有psotnl')
                                                break
                                            }
                                            // console.log(l,llen)
                                            if (l == llen - 1) {
                                                $scope.ordersList[i].order.LOGISTIC_NAME = null;
                                                $scope.ordersList[i].order.LOGISTICINFO = [];
                                                // console.log('备选没有psotnl')
                                            }
                                        }
                                    } else {
                                        // console.log('没有备选物流')
                                    }
                                }

                            }
                            if ($scope.ordersList[i].product[k].SKU.indexOf('CJJJJTJT01777') != -1) {
                                if ($scope.ordersList[i].order.LOGISTIC_NAME == 'CJ normal express') {
                                    // console.log('默认是CJ normal express')
                                    $scope.ordersList[i].order.LOGISTICINFO = [];
                                } else {
                                    if ($scope.ordersList[i].order.LOGISTICINFO) {
                                        for (var m = 0, mlen = $scope.ordersList[i].order.LOGISTICINFO.length; m < mlen; m++) {
                                            if ($scope.ordersList[i].order.LOGISTICINFO[m].logisticName == 'CJ normal express') {
                                                $scope.ordersList[i].order.LOGISTIC_NAME = null;
                                                var logInfoArr = [];
                                                logInfoArr.push($scope.ordersList[i].order.LOGISTICINFO[m])
                                                $scope.ordersList[i].order.LOGISTICINFO = logInfoArr;
                                                // console.log('备选有CJ normal express')
                                                break
                                            }
                                        }
                                    } else {
                                        // console.log('没有备选物流')
                                    }
                                }

                            }
                            if ($scope.userId == '180c6f9410dd4415b45fba5c2695beee' && $scope.ordersList[i].product[k].SKU.indexOf('CJJZGJYL00009') != -1) {
                                if ($scope.ordersList[i].order.LOGISTIC_NAME == 'Electric PostNL') {
                                    // console.log('默认是CJ normal express')
                                    $scope.ordersList[i].order.LOGISTICINFO = [];
                                } else {
                                    if ($scope.ordersList[i].order.LOGISTICINFO) {
                                        for (var m = 0, mlen = $scope.ordersList[i].order.LOGISTICINFO.length; m < mlen; m++) {
                                            if ($scope.ordersList[i].order.LOGISTICINFO[m].logisticName == 'Electric PostNL') {
                                                $scope.ordersList[i].order.LOGISTIC_NAME = null;
                                                var logInfoArr = [];
                                                logInfoArr.push($scope.ordersList[i].order.LOGISTICINFO[m])
                                                $scope.ordersList[i].order.LOGISTICINFO = logInfoArr;
                                                // console.log('备选有CJ normal express')
                                                break
                                            }
                                        }
                                    } else {
                                        // console.log('没有备选物流')
                                    }
                                }

                            }
                        }
                    }
                }
            }

            //显示大图
            $('.orders-table').on('mouseenter', '.sp-smallimg', function () {
                $(this).siblings('.hide-bigimg').show();
            })
            $('.orders-table').on('mouseenter', '.hide-bigimg', function () {
                $(this).show();
            })
            $('.orders-table').on('mouseleave', '.sp-smallimg', function () {
                $(this).siblings('.hide-bigimg').hide();
            })
            $('.orders-table').on('mouseleave', '.hide-bigimg', function () {
                $(this).hide();
            })

            //批量修改物流 获取国家列表
            dsp.postFun('app/order/getOrderCountry', null, function (data) {
                console.log(data)
                $scope.counList = data.data;
                console.log($scope.counList)
            }, function (data) {
                console.log(data)
            })
            //获取物流方式
            dsp.postFun('app/erplogistics/getLogisticType', null, function (data) {
                console.log(data)
                $scope.bulkWlList = data.data;
                console.log($scope.bulkWlList)
            }, function (data) {
                console.log(data)
            })
            $scope.couneryInfo = '';
            dsp.postFun('app/logistic/getcountry', null, function (data) {
                console.log(data)
                if (data.data.statusCode == 200) {
                    let countryObj = JSON.parse(data.data.result);
                    $scope.countryList = countryObj.countryList;
                    console.log($scope.countryList)
                }

            }, function (data) {
                console.log(data)
            })
            console.log($scope.couneryInfo)
            $scope.isChangeFlag = false;
            $scope.nologistCs = 'y'; //是否无物流 查询没有物流的订单
            //根据国家查询订单
            $scope.counChangeFun = function () {
                $scope.ordersList = [];
                dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                console.log($scope.countryName)
                if ($scope.countryName) { //选中国家
                    $scope.isChangeFlag = true;
                    var upwlData = {};
                    tjFun(upwlData);
                    upwlData.data.logisticName = $scope.nologistCs;
                    upwlData.data.country = $scope.countryName;
                    upwlData.data = JSON.stringify(upwlData.data);
                    dsp.postFun('app/order/queryOrders', JSON.stringify(upwlData), function (data) {
                        console.log(data)
                        var list1 = JSON.parse(data.data.result);
                        console.log(list1)
                        $scope.ordersList = list1.ordersList;
                        console.log($scope.ordersList)
                        $scope.pcountN = list1.countNumber; //获取总订单的条数
                        console.log($scope.pcountN)
                        if ($scope.pcountN > 0) {
                            dsp.removeNodataPic($('.orders-list'))
                            dsp.closeLoadPercent($('.orders-list'))
                        } else {
                            addNotSjFun()
                            dsp.closeLoadPercent($('.orders-list'))
                        }
                        logisRemark(list1);
                        importFun(); //分页函数
                    }, function (err) {
                        layer.closeAll("loading")
                        dsp.closeLoadPercent($('.orders-list'))
                        dsp.cjMesFun(1);
                    })
                } else { //所有国家
                    $scope.isChangeFlag = false;
                    var upwlData = {};
                    tjFun(upwlData);
                    upwlData.data.logisticName = '';
                    upwlData.data.country = '';
                    upwlData.data = JSON.stringify(upwlData.data);
                    dsp.postFun('app/order/queryOrders', JSON.stringify(upwlData), function (data) {
                        console.log(data)
                        var list1 = JSON.parse(data.data.result);
                        console.log(list1)
                        $scope.ordersList = list1.ordersList;
                        console.log($scope.ordersList)
                        $scope.pcountN = list1.countNumber; //获取总订单的条数
                        if ($scope.pcountN > 0) {
                            dsp.removeNodataPic($('.orders-list'))
                            dsp.closeLoadPercent($('.orders-list'))
                        } else {
                            addNotSjFun()
                            dsp.closeLoadPercent($('.orders-list'))
                        }
                        logisRemark(list1);
                        importFun(); //分页函数
                    }, function (err) {
                        layer.closeAll("loading")
                        dsp.closeLoadPercent($('.orders-list'))
                        dsp.cjMesFun(1);
                    })
                }
            }
            $scope.ischeckFlag = true;
            //是否选中
            $scope.ischekFun = function (ev) {
                $(ev.target).prop('checked', 'true');
                $scope.ischeckFlag = !$scope.ischeckFlag;
                console.log($scope.ischeckFlag)
                if ($scope.ischeckFlag) {
                    $scope.ischeckFlag = true;
                    $scope.nologistCs = 'y';
                    $scope.counChangeFun();
                } else {
                    $scope.ischeckFlag = false;
                    $scope.nologistCs = '';
                    $scope.counChangeFun();
                }
            }
            //修改物流
            $scope.bulkChangeWlFun = function () {
                if ($scope.logisName) {
                    $scope.ordersList = [];
                    dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                    var ids = '';
                    $('#z-dcl-ord .zcheckbox').each(function () {
                        ids += $(this).siblings('.dclord-sys-time').text() + ',';
                    })
                    console.log($scope.logisName)
                    console.log(ids);
                    var xgwlData = {};
                    xgwlData.logisic = $scope.logisName;
                    xgwlData.orderNums = ids;
                    console.log(JSON.stringify(xgwlData))
                    dsp.postFun('app/order/upOrderLogisics', JSON.stringify(xgwlData), function (data) {
                        console.log(data)
                        if (data.data.result == true) {
                            // alert(123)
                            $scope.logisName = ''; //把物流设置为请选择
                            var upwlData = {};
                            tjFun(upwlData);
                            upwlData.data.logisticName = $scope.nologistCs;
                            upwlData.data.country = $scope.countryName;
                            upwlData.data = JSON.stringify(upwlData.data);
                            dsp.postFun('app/order/queryOrders', JSON.stringify(upwlData), function (data) {
                                console.log(data)
                                var list1 = JSON.parse(data.data.result);
                                console.log(list1)
                                $scope.ordersList = list1.ordersList;
                                console.log($scope.ordersList)
                                $scope.pcountN = list1.countNumber; //获取总订单的条数
                                if ($scope.pcountN > 0) {
                                    dsp.removeNodataPic($('.orders-list'))
                                    dsp.closeLoadPercent($('.orders-list'))
                                } else {
                                    addNotSjFun()
                                    dsp.closeLoadPercent($('.orders-list'))
                                }
                                logisRemark(list1);
                                importFun(); //分页函数
                            }, function (err) {
                                layer.closeAll("loading")
                                dsp.closeLoadPercent($('.orders-list'))
                                dsp.cjMesFun(1);
                            })
                        } else {
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            layer.msg('Modify the logistics failure')
                        }
                    }, function (data) {
                        layer.closeAll("loading")
                        dsp.closeLoadPercent($('.orders-list'))
                        console.log(data)
                    })
                }
            }
            //高级搜索的物流查询
            $scope.gjChangeWlFun = function () {
                console.log($scope.gjlogisName)
                if ($scope.gjlogisName) {
                    $scope.nologistCs = $scope.gjlogisName;
                } else {
                    $scope.nologistCs = '';
                    console.log($scope.gjlogisName)
                }
                $scope.ordersList = [];
                dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                var upwlData = {};
                tjFun(upwlData);
                upwlData.data.logisticName = $scope.nologistCs;
                upwlData.data.country = $scope.countryName;
                upwlData.data = JSON.stringify(upwlData.data);
                console.log(upwlData)
                dsp.postFun('app/order/queryOrders', JSON.stringify(upwlData), function (data) {
                    console.log(data)
                    var list1 = JSON.parse(data.data.result);
                    console.log(list1)
                    $scope.ordersList = list1.ordersList;
                    console.log($scope.ordersList)
                    $scope.pcountN = list1.countNumber; //获取总订单的条数
                    console.log($scope.pcountN)
                    if ($scope.pcountN > 0) {
                        dsp.removeNodataPic($('.orders-list'))
                        dsp.closeLoadPercent($('.orders-list'))
                    } else {
                        addNotSjFun()
                        dsp.closeLoadPercent($('.orders-list'))
                    }
                    logisRemark(list1);
                    importFun(); //分页函数
                }, function (err) {
                    layer.closeAll("loading")
                    dsp.closeLoadPercent($('.orders-list'))
                    dsp.cjMesFun(1);
                })
            }

            function tjFun(tjcs) {
                var showList = $('#dcl-sel').val() - 0;
                var yStoresTime = $('#y-ord-sdate').val();
                var yStoreeTime = $('#y-ord-edate').val();
                var cjsTime = $('#cj-stime').val();
                var cjeTime = $('#cj-etime').val();
                var yStoreName = $.trim($('#y-pro-name').val());
                var cjStoreName = $.trim($('#cj-pro-name').val());
                var berName = $.trim($('.buyer-inp').val());
                var searchinpVal = $('.ord-search-inp').val();
                var seaWeight = $('.ord-sewei').val();
                var seaSku = $('.ord-sesku').val();
                var ordType = '';
                if ($('.type-sel').val() == 'All') {
                    ordType = '';
                } else if ($('.type-sel').val() == 'Shopify Imported') {
                    ordType = '2';
                } else if ($('.type-sel').val() == 'Excel Imported') {
                    ordType = '1';
                }

                tjcs.data = {};
                tjcs.data.status = '1'; //请求的订单状态
                tjcs.data.canhandler = 'y';
                tjcs.data.page = 1; //请求的第几页
                tjcs.data.limit = showList; //每页限制的订单条数
                tjcs.data.orderNumber = searchinpVal;
                tjcs.data.storeOrderDateBegin = yStoresTime;
                tjcs.data.cjOrderDateBegin = cjsTime;
                tjcs.data.storeOrderDateEnd = yStoreeTime;
                tjcs.data.cjOrderDateEnd = cjeTime;
                tjcs.data.storeProductName = yStoreName;
                tjcs.data.cjProductName = cjStoreName;
                tjcs.data.buyerName = berName;
                tjcs.data.orderType = ordType;
                tjcs.data.weight = seaWeight;
                tjcs.data.sku = seaSku;
                tjcs.data.storeNumber = $scope.storeName;
                tjcs.data.country = $scope.countryName;
                tjcs.data.logisticName = $scope.gjlogisName;
                if ($scope.userId == '738CB2BD-0D8C-4587-9779-8CFA9F788047' || $scope.userId == '{8DA0EC3E-E4A7-4D9B-8876-2A025515EBE0}') {
                    tjcs.data.storage = $scope.storage;
                }
            }


            $scope.filterWeight = ""
            $scope.isJustNumber = function(val){
                val = Number(val)
                if(isNaN(val*1) || val*1 <0){
                    $scope.filterWeight = ""
                    return;
                }
                if(val>9999){
                    $scope.filterWeight = Number(`${val}`.slice(0,-1))
                    return;
                }
                if(val.toString().split(".")[1] && val.toString().split(".")[1].length>2){
                    $scope.filterWeight = Number(Number(val).toFixed(3).slice(0,-1))
                    return;
                }
            }

            $('.inp-num-go2').keydown(function(){
                let curVal = $('.inp-num-go2').val();
                curVal = curVal.replace(/[^\d]/g, "");
                $('.inp-num-go2').val(curVal)
            })
            $('.inp-num-go2').blur(function(){
                let curVal = $('.inp-num-go2').val();
                curVal = curVal.replace(/[^\d]/g, "");
                $('.inp-num-go2').val(curVal)
            })
            //鼠标移入移除 显示商品
            $('.showsp-img').mouseenter(function () {
                if ($(this).attr('src') == 'static/image/public-img/up.png') {
                    $(this).attr('src', 'static/image/public-img/up-hover.png');
                } else if ($(this).attr('src') == 'static/image/public-img/down.png') {
                    $(this).attr('src', 'static/image/public-img/down-hover.png');
                }
            })
            $('.showsp-img').mouseleave(function () {
                if ($(this).attr('src') == 'static/image/public-img/up-hover.png') {
                    $(this).attr('src', 'static/image/public-img/up.png');
                } else if ($(this).attr('src') == 'static/image/public-img/down-hover.png') {
                    $(this).attr('src', 'static/image/public-img/down.png');
                }
            })

            $('.showsp-img').click(function () {
                if ($(this).attr('src') == 'static/image/public-img/up-hover.png') {
                    $(this).attr('src', 'static/image/public-img/down-hover.png');
                    $('.orders-table .d-toggle-tr').show();
                    $('.orders-table .order-detail').addClass('order-click-active');
                } else if ($(this).attr('src') == 'static/image/public-img/down-hover.png') {
                    $(this).attr('src', 'static/image/public-img/up-hover.png');
                    $('.orders-table .d-toggle-tr').hide();
                    $('.orders-table .order-detail').removeClass('order-click-active');
                }
            })
            //点击事件
            $('.orders-table').on('click', '.order-detail', function (event) {
                // console.log(event)
                if ($(event.target).hasClass('zcheckbox') || $(event.target).hasClass('dcl-ord-selwl')) {
                    return;
                }
                if ($(this).hasClass('order-click-active')) {
                    $(this).next().hide();
                    $(this).removeClass('order-click-active');
                } else {
                    $(this).next().show();
                    $(this).addClass('order-click-active');
                }
            })
            $('.orders-table').on('click', '.d-toggle-tr', function (event) {
                $(this).show();
                $(this).prev().addClass('order-click-active');
            })
            // 订单
            $('.orders-table').on('mouseenter', '.order-detail>td', function () {
                if ($(this).hasClass('order-time')) {
                    return
                }
                $(this).parent().next().show();
                $('.orders-table .order-detail').removeClass('order-detail-active');
                $(this).parent().addClass('order-detail-active');
            })
            $('.orders-table').on('mouseleave', '.order-detail', function () {
                if ($(this).hasClass('order-click-active')) {
                    $(this).next().show();
                } else {
                    $(this).next().hide();
                }
            })
            //商品
            $('.orders-table').on('mouseenter', '.d-toggle-tr', function () {
                $(this).show();
            })
            $('.orders-table').on('mouseleave', '.d-toggle-tr', function () {
                if ($(this).prev().hasClass('order-click-active')) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            })
            //table
            $('.orders-table').mouseleave(function () {
                $('.orders-table .order-detail').removeClass('order-detail-active');
            });

            $scope.navList = [
                {name: 'Process Required', href: "#/direct-orders", show: true},
                {name: 'Cart', href: "#/imp-cart"},
                {name: 'Incomplete Orders', href: "#/imp-incomp"},
                {name: 'Canceled', href: "#/imp-cancel"},
                {name: 'Search All', href: "#/search-all"},
                {name: 'Store Orders', href: "#/AuthorizeOrder"},
            ]
            $('.direct-leftbara').click(function () {
                $('.direct-leftbara').css('background-image', '');
                $(this).css('background-image', 'linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
            })
            // 左侧的导航添加滚动事件
            $(document).scroll(function () {
                if ($(document).scrollTop() >= 80) {
                    $('.left-nav').css({
                        position: 'fixed',
                        top: '80px'
                    });
                } else {
                    $('.left-list').css({
                        position: 'relative',
                        top: '0'
                    });
                }
            })
            //给被删除的订单添加弹框
            $scope.showdelFun = function (ev, index, item) {
                if (item.shopOrderStatus && item.shopOrderStatus != 'processing') {
                    $('.dcl-ord-tbody').eq(index).find('.hasdel-con').show();
                }
            }
            $scope.hidedelFun = function (ev, index) {
                $('.dcl-ord-tbody').eq(index).find('.hasdel-con').hide();
                // console.log(index)
            }

            $scope.HasdeleteSureFun = function (index, item) {
                $scope.isdelhasFlag = true;
                $scope.hasIndex = index;
                $scope.hasItemId = item.ID;
            }
            $scope.suredHasFun = function () {
                layer.load(2)
                $scope.isdelhasFlag = false;
                var deleteData = {};
                deleteData.orderNums = $scope.hasItemId;
                deleteData.type = 2;
                console.log(JSON.stringify(deleteData))
                dsp.postFun('app/order/deleteOrder', JSON.stringify(deleteData), function (data) {
                    console.log(data)
                    layer.closeAll("loading")
                    if (data.data.result == true) {
                        $scope.ordersList.splice($scope.hasIndex, 1)
                        layer.msg('Delete Success');
                    } else {
                        layer.closeAll("loading");
                        layer.msg('Delete Error');
                    }
                })
            }
            //恢复订单
            $scope.keepOrdFun = function (index, item) {
                $scope.iskeephasFlag = true;
                $scope.hasIndex = index;
                $scope.hasItemId = item.ID;
            }
            $scope.surekeepHasFun = function () {
                layer.load(2)
                $scope.iskeephasFlag = false;
                var deleteData = {};
                deleteData.id = $scope.hasItemId;
                dsp.postFun('app/order/continueOrder', JSON.stringify(deleteData), function (data) {
                    console.log(data)
                    layer.closeAll("loading")
                    if (data.data.result > 0) {
                        $scope.ordersList[$scope.hasIndex].order.shopOrderStatus = '';
                        layer.msg('Keep Success');
                    } else {
                        layer.closeAll("loading");
                        layer.msg('Keep Error');
                    }
                })
            }
            //恢复所有订单
            $scope.keepAllFun = function () {
                $scope.iskeepAllFlag = true;
            }
            $scope.surekeepAllFun = function () {
                $scope.iskeepAllFlag = false;
                layer.load(2)
                dsp.postFun('app/order/continueOrderAll', {}, function (data) {
                    console.log(data)
                    if (data.data.result > 0) {
                        layer.msg('Keep Success');
                        freshList();
                    } else {
                        layer.closeAll("loading");
                        layer.msg('Keep Error');
                    }
                })
            }
            //删除所有订单
            $scope.HasdeleteallFun = function (index, item) {
                console.log(item)
                $scope.shopStuType = item.shopOrderStatus;
                $scope.isdeleteAllFlag = true;
            }
            $scope.suredeleteAllFun = function () {
                $scope.isdeleteAllFlag = false;
                console.log($scope.shopStuType)
                layer.load(2)
                var deleteAll = {};
                deleteAll.type = $scope.shopStuType;
                dsp.postFun('app/order/deleteOrderAll', JSON.stringify(deleteAll), function (data) {
                    console.log(data)
                    if (data.data.result > 0) {
                        layer.msg('Delete Success');
                        freshList();
                    } else {
                        layer.closeAll("loading");
                        layer.msg('Delete Error');
                    }
                })
            }
            var heBingIds = '';
            $scope.heBingOrdFun = function () { //合并订单
                let hbAddressArr = [],
                    selCount = 0;
                heBingIds = ''
                $("#z-dcl-ord .zcheckbox").each(function () {
                    if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
                        let hbItemObj = {};
                        hbItemObj.SHIPPING_ADDRESS = $(this).parent().siblings('.shipping-info').children('.adress1').text();
                        hbItemObj.shippingAddress2 = $(this).parent().siblings('.shipping-info').children('.adress2').text();
                        hbItemObj.CITY = $(this).parent().siblings('.shipping-info').children('.buyer-adress').children('.imp-procus-city').text();
                        hbItemObj.PROVINCE = $(this).parent().siblings('.shipping-info').children('.buyer-adress').children('.imp-procus-province').text();
                        hbItemObj.COUNTRY_CODE = $(this).parent().siblings('.shipping-info').children('.buyer-adress').children('.imp-procus-country').text();
                        hbItemObj.ordId = $(this).parent().siblings('.ord-cai').children('.order-id').text();
                        heBingIds += $(this).parent().siblings('.ord-cai').children('.order-id').text() + ',';
                        hbItemObj.cusName = $(this).parent().siblings('.shipping-info').children('.buyer-name').children('.cus-name').text();
                        hbItemObj.phoneNum = $(this).parent().siblings('.shipping-info').children('.phone-num').text();
                        hbItemObj.zip = $(this).parent().siblings('.shipping-info').children('.buyer-adress').children('.post-code').text();
                        selCount++;
                        hbAddressArr.push(hbItemObj)
                    }
                })
                const splitSelIdsArr = hbAddressArr.map(item => item.ordId)
                console.log(splitSelIdsArr)
                console.log($scope.ordersList)
                // $scope.ordersList.some(item => {
                //   if(item.order.ORDERSOURCE_TYPE === '7' && splitSelIdsArr.includes(item.order.ID)) {
                //     console.log('123123')
                //   }
                // })
                if ($scope.ordersList.some(item => item.order.ORDERSOURCE_TYPE === '7' && splitSelIdsArr.includes(item.order.ID))) {
                    layer.msg('Orders cannot be combined.');
                    return;
                }
                console.log(hbAddressArr)
                // console.log(splitSelIds)
                if (selCount > 1) {
                    if (mesIsEqual(hbAddressArr)) { //国家 邮编 电话 姓名是否相同
                        $scope.heBingFlag = true;
                        $scope.hbAdrList = delAddRepFun(hbAddressArr);
                        $scope.hbAdrList[0]['flag'] = true;
                        $scope.addressOrdId = $scope.hbAdrList[0].ordId;
                        let checkedList = []
                        $scope.ordersList.forEach(item => {
                            if(splitSelIdsArr.includes(item.order.ID)) checkedList = [...checkedList, item.order]
                        })
                        //去除没有店铺的选中项
                        checkedList = checkedList.filter(item => item.STORE_NUMBER)
                        console.log(checkedList)
                        const uniqueArr = uniqueArrFn(checkedList, 'STORE_NUMBER')
                        $scope.mergeShopList = uniqueArr.map(item => ({
                           shopName: item.STORE_NAME,
                           shopId: item.STORE_NUMBER 
                        }))
                        $scope.selectMergeShop = $scope.mergeShopList.length === 1 ? $scope.mergeShopList[0].shopId : ''
                        $scope.selectErrText = ''
                        // console.log($scope.mergeShopList)
                    }
                } else {
                    layer.msg('Please select at least one order')
                    return;
                }
            }

            function uniqueArrFn(arr = [], field) {
                let json = {}
              
                return arr.filter(item => {
                  if (json[item[field]]) {
                    return false
                  } else {
                    json[item[field]] = 1
                    return true
                  }
                })
              }

            function mesIsEqual(arr) {
                for (let i = 1, len = arr.length; i < len; i++) {
                    if ($.trim(arr[0].COUNTRY_CODE).toUpperCase() != $.trim(arr[i].COUNTRY_CODE).toUpperCase()) {
                        layer.msg('Cannot be combined due to different country', {time: 4000})
                        return false;
                    }
                    if ($.trim(arr[0].cusName).toUpperCase() != $.trim(arr[i].cusName).toUpperCase()) {
                        layer.msg('Cannot be combined due to different receiver name', {time: 4000})
                        return false;
                    }
                    if ($.trim(arr[0].phoneNum) != $.trim(arr[i].phoneNum)) {
                        layer.msg('Cannot be combined due to different phone numbers', {time: 4000})
                        return false;
                    }
                    if ($.trim(arr[0].zip).toUpperCase() != $.trim(arr[i].zip).toUpperCase()) {
                        layer.msg('Cannot be combined due to different postal codes', {time: 4000})
                        return false;
                    }
                }
                return true;
            }

            function delAddRepFun(array) {
                var temp = [];
                var l = array.length;
                for (var i = 0; i < l; i++) {
                    for (var j = i + 1; j < l; j++) {
                        if (array[i].COUNTRY_CODE.toUpperCase() == array[j].COUNTRY_CODE.toUpperCase() && array[i].CITY.toUpperCase() == array[j].CITY.toUpperCase() && array[i].PROVINCE.toUpperCase() == array[j].PROVINCE.toUpperCase() && array[i].SHIPPING_ADDRESS.toUpperCase() == array[j].SHIPPING_ADDRESS.toUpperCase() && array[i].shippingAddress2.toUpperCase() == array[j].shippingAddress2.toUpperCase()) {
                            i++;
                            j = i;
                        }
                    }
                    temp.push(array[i]);
                }
                return temp;
            }

            $scope.sureHbFun = function () {
                if($scope.mergeShopList.length && !$scope.selectMergeShop) return $scope.selectErrText = 'Please select a store.'
                $scope.selectErrText = ''
                layer.load(2)
                const params = {
                    ids: heBingIds,
                    addressOrderId: $scope.addressOrdId,
                    selectedShopId: $scope.selectMergeShop
                }
                dsp.postFun('order/order/mergeOrder', params, function (data) {
                    console.log(data)
                    if (data.data.statusCode == 200) {
                        var hbResArr = JSON.parse(data.data.result);
                        var resSucCount = 0,
                            resErrorCount = 0,
                            errorMessage;
                        if (hbResArr && JSON.stringify(hbResArr) != '[]') {
                            $scope.heBingFlag = false;
                            for (var i = 0, len = hbResArr.length; i < len; i++) {
                                if (hbResArr[i].result) {
                                    resSucCount++;
                                } else {
                                    resErrorCount++;
                                    errorMessage = hbResArr[i].message[0];
                                }
                            }

                            if (resSucCount > 0 && resErrorCount < 1) {
                                layer.msg('Combine success')
                                resSucFreshFun()
                            } else {
                                if (resSucCount > 0) {
                                    resSucFreshFun()
                                    layer.msg(errorMessage, {time: 3000})
                                } else {
                                    errorMessage = hbResArr[0].message[0]
                                    layer.closeAll("loading")
                                    layer.msg(errorMessage, {time: 3000})
                                }
                            }
                        } else {
                            layer.closeAll("loading")
                            layer.msg('Combine error')
                        }
                    } else {
                        layer.closeAll("loading")
                        layer.msg(data.data.message)
                    }
                }, function (data) {
                    console.log(data)
                    layer.closeAll("loading")
                })
            }
            var hbRecoverOrdProCount;
            $scope.heBingRecover = function () {
                let selCount = 0;
                heBingIds = '';
                hbRecoverOrdProCount = 0;
                $("#z-dcl-ord .zcheckbox").each(function () {
                    if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
                        heBingIds += $(this).parent().siblings('.ord-cai').children('.order-id').text() + ',';
                        hbRecoverOrdProCount = $(this).parent().siblings('.pro-count').text();
                        selCount++;
                    }
                })
                console.log(heBingIds.substring(0, 2))
                if (selCount == 1 && heBingIds.substring(0, 2) == 'HB') {
                    $scope.heBingRecoverFlag = true;
                } else {
                    layer.msg('You can recover only one combined order per operation. Please select a combined order.', {time: 4000})
                    return;
                }
            }
            $scope.sureRecoverHbFun = function () {
                layer.load(2)
                dsp.postFun('order/order/recoverMergeOrder', {
                    'ids': heBingIds,
                    'quantity': hbRecoverOrdProCount
                }, function (data) {
                    console.log(data)
                    if (data.data.statusCode == 200) {
                        $scope.heBingRecoverFlag = false;
                        layer.msg('recover success')
                        resSucFreshFun()
                    } else {
                        layer.closeAll("loading")
                        layer.msg('Orders are possibly unqualified for recovery.', {time: 3000})
                    }
                }, function (data) {
                    layer.closeAll("loading")
                })
            }
            $scope.radioCheckFun = function (item) {
                for (let i = 0, len = $scope.hbAdrList.length; i < len; i++) {
                    $scope.hbAdrList[i]['flag'] = false;
                }
                item['flag'] = true;
                $scope.addressOrdId = item.ordId;
                console.log($scope.hbAdrList, $scope.addressOrdId)
            }
            //拆分订单
            var splitSelIds = '';

            $scope.selCountNum = 0;
            $scope.duoPinCount = 0;
            $scope.danPinCount = 0;
            $scope.caiFenProArr = []; //可以拆分的商品
            $scope.yiCaiFenArr = []; //已经拆分的商品
            $scope.productSplitFun = function () {
                var bool = false;
                $scope.selCountNum = 0;
                $scope.duoPinCount = 0;
                $scope.danPinCount = 0;
                $scope.caiFenProArr = []; //可以拆分的商品
                $scope.yiCaiFenArr = []; //已经拆分的商品
                $scope.ordSpGroup = [];
                var itemOrdId, $curObj, itemOrdSpNum, spItemNum;
                $("#z-dcl-ord .zcheckbox").each(function () {
                    if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
                        itemOrdId = $.trim($(this).parent().siblings('.ord-cai').children('.order-id').text());
                        $scope.selCountNum++;
                        $curObj = $(this).parent().parent().parent().find('.d-toggle-tab');
                        itemOrdSpNum = $(this).siblings('.ord-sp-num').text();
                        if (itemOrdSpNum > 1) {
                            $scope.duoPinCount++;
                            // console.log('多品')
                            for (var i = 0, len = $scope.ordersList.length; i < len; i++) {
                                if (itemOrdId == $scope.ordersList[i].order.ID) {
                                    if ($scope.ordersList[i].order.ORDERSOURCE_TYPE === '7') {
                                        layer.msg('Orders cannot be splited.')
                                        bool = true;
                                        return false;
                                    }
                                    for (var k = 0, kLen = $scope.ordersList[i].product.length; k < kLen; k++) {
                                        $scope.ordersList[i].product[k]['ORDER_NUMBER'] = $scope.ordersList[i].order.ORDER_NUMBER;
                                        if ($scope.ordersList[i].product[k].QUANTITY > 1) {
                                            for (var j = 0; j < $scope.ordersList[i].product[k].QUANTITY; j++) {
                                                $scope.caiFenProArr = $scope.caiFenProArr.concat(JSON.parse(JSON.stringify($scope.ordersList[i].product[k])))
                                                console.log($scope.caiFenProArr)
                                                // console.log('我有多个')
                                            }
                                        } else {
                                            $scope.caiFenProArr = $scope.caiFenProArr.concat($scope.ordersList[i].product[k])
                                            console.log($scope.caiFenProArr)
                                            // console.log('我有一个')
                                        }
                                    }
                                    // break
                                }
                            }
                            $scope.caiFenProArr = $scope.caiFenProArr.filter(o => o.product_type !== '3')
                            console.log($scope.caiFenProArr)

                        } else if (itemOrdSpNum == 1) {
                            $scope.danPinCount++;
                            console.log('单品')
                        } else {
                            console.log('没有商品')
                        }
                    }
                })
                // const splitSelIdsArr = splitSelIds.split(',').filter(i => i)
                // console.log(splitSelIds)
                // $scope.ordersList.some(item => {
                //   if(item.order.ORDERSOURCE_TYPE === '7' && splitSelIdsArr.includes(item.order.Id)) {
                //     console.log('123')
                // }} )
                // if($scope.ordersList.some(item => item.order.ORDERSOURCE_TYPE === '7' && splitSelIdsArr.includes(item.order.Id))) {
                //   layer.msg('Supplier-shipped goods cannot be split');
                //   return;
                // }
                if (!bool) {
                    if ($scope.selCountNum > 0) {
                        if ($scope.duoPinCount > 0) {
                            $scope.splitTkFlag = true;
                        } else {
                            layer.msg('Only orders with more than 1 product can be split.', {time: 3000})
                        }
                    } else {
                        layer.msg('Please select order(s) first!')
                    }
                }

            }
            var checkedArr = []; //选中的商品
            $scope.ordSpGroup = [];
            var groupNum = 0;
            $scope.splitBtnFun = function () { //是否可以拆分
                checkedArr = []
                for (var i = 0, len = $scope.caiFenProArr.length; i < len; i++) {
                    if ($scope.caiFenProArr[i].check) {
                        checkedArr.push($scope.caiFenProArr[i])
                    }
                }
                if (checkedArr.length > 0) {
                    if (isRepeatFun(checkedArr) === false) {
                        // console.log('你选中的不是同一个订单下的商品')
                        layer.msg('The products selected are not from the same order.')
                    } else {
                        //判断是否选中了所有该订单下的商品 如果选中所有不能拆分
                        var inSpCusOrdId = checkedArr[0].ORDER_NUMBER;
                        var caiFenArrNotFoundFlag = false;
                        for (var i = 0, iLen = $scope.caiFenProArr.length; i < iLen; i++) {
                            if ($scope.caiFenProArr[i].ORDER_NUMBER == inSpCusOrdId && !$scope.caiFenProArr[i].check) {
                                // $scope.caiFenFlag = true; //无需提示 直接移动拆分
                                splitClickFun()
                                break
                            }
                            if (i == $scope.caiFenProArr.length - 1) {
                                caiFenArrNotFoundFlag = true;
                            }
                        }
                        console.log(caiFenArrNotFoundFlag)
                        if (caiFenArrNotFoundFlag) {
                            if ($scope.yiCaiFenArr.length > 0) {
                                for (var j = 0, jLen = $scope.yiCaiFenArr.length; j < jLen; j++) {
                                    if ($scope.yiCaiFenArr[j].ORDER_NUMBER == inSpCusOrdId) {
                                        splitClickFun()
                                        break
                                    }
                                    if (j == $scope.yiCaiFenArr.length - 1) {
                                        layer.msg('Each group cannot include all products from the same order.', {time: 3000})
                                    }
                                }
                            } else {
                                layer.msg('Each group cannot include all products from the same order.', {time: 3000})
                            }
                        }
                    }
                } else {
                    // console.log('请选择商品')
                    layer.msg('Please select the products.')
                }
            }

            function splitClickFun() {
                var itemIdGoup = [];
                groupNum++;
                $scope.caiFenFlag = false;
                var spIds = '';
                var heBingArr = [],
                    heBingWeight = 0,
                    targetArr = [];
                heBingArr.push(JSON.parse(JSON.stringify(checkedArr[0])))
                for (var i = 0, len = checkedArr.length; i < len; i++) {
                    checkedArr[i]['groupNum'] = groupNum;
                    checkedArr[i].check = false;
                    spIds += checkedArr[i].ID + ',';
                    for (var k = $scope.caiFenProArr.length - 1; k >= 0; k--) {
                        if (checkedArr[i].ID == $scope.caiFenProArr[k].ID) {
                            heBingWeight += $scope.caiFenProArr[k].GRAMS;
                            targetArr.push(JSON.parse(JSON.stringify($scope.caiFenProArr[k])))
                            $scope.caiFenProArr.splice(k, 1);
                            break
                        }
                    }
                }
                heBingArr[0].weight = heBingWeight;
                heBingArr[0]['yuanSu'] = targetArr;
                spIds = spIds.substring(0, spIds.length - 1)
                var proIdStr = proIdStrFun(spIds)
                itemIdGoup.push({
                    productid: proIdStr,
                    groupNum: groupNum
                })
                $scope.yiCaiFenArr = $scope.yiCaiFenArr.concat(heBingArr);
                var obj = {};
                obj[checkedArr[0].CJOrderId] = itemIdGoup;
                if ($scope.ordSpGroup.length > 0) {
                    for (var k = 0, kLen = $scope.ordSpGroup.length; k < kLen; k++) {
                        if ($scope.ordSpGroup[k][checkedArr[0].CJOrderId]) {
                            $scope.ordSpGroup[k][checkedArr[0].CJOrderId].push(itemIdGoup[0])
                            break
                        }
                        if (k == kLen - 1) {
                            $scope.ordSpGroup.push(obj)
                        }
                    }
                } else {
                    $scope.ordSpGroup.push(obj)
                }
                console.log($scope.ordSpGroup)
            }

            $scope.recoverFun = function (proNum, spId, ordId, item) {
                $scope.itemGroupNum = proNum;
                $scope.itemSpId = spId;
                $scope.ordIdNum = ordId;
                $scope.targetArr = item.yuanSu;
                $scope.recoverFlag = true;
            }
            $scope.sureIsRecoverFun = function () {
                for (var g = $scope.ordSpGroup.length - 1; g >= 0; g--) {
                    if ($scope.ordSpGroup[g][$scope.ordIdNum] && $scope.ordSpGroup[g][$scope.ordIdNum][0].groupNum == $scope.itemGroupNum) {
                        $scope.ordSpGroup.splice(g, 1)
                        break
                    }
                }
                for (var i = $scope.yiCaiFenArr.length - 1; i >= 0; i--) {
                    if ($scope.yiCaiFenArr[i] && $scope.yiCaiFenArr[i].groupNum == $scope.itemGroupNum) {
                        for (var j = 0, jLen = $scope.yiCaiFenArr[i].yuanSu.length; j < jLen; j++) {
                            $scope.caiFenProArr.push(JSON.parse(JSON.stringify($scope.yiCaiFenArr[i].yuanSu[j])))
                        }
                        $scope.yiCaiFenArr.splice(i, 1)
                    }
                }
                $scope.recoverFlag = false;
            }
            $scope.closeSplitTkFun = function () {
                $scope.isCloseSplitFlag = true;
            }
            $scope.sureCloseSplitTkFun = function () {
                $scope.splitTkFlag = false;
                $scope.isCloseSplitFlag = false;
                $scope.yiCaiFenArr = [];
                $scope.caiFenProArr = [];
                $scope.ordSpGroup = [];
            }
            $scope.splitComFun = function () {
                //确定拆分
                if ($scope.yiCaiFenArr.length < 1) {
                    layer.msg('Please select at least one product.')
                    return
                }
                $scope.confirmEndFlag = true;
            }
            var initClickFlag = true;
            $scope.splitConfirmEndFun = function () {
                // console.log('触发几次')
                if (!initClickFlag) {
                    return
                }
                initClickFlag = false;
                $scope.confirmEndFlag = false;
                $scope.splitTkFlag = false;
                layer.load(2)
                var cjOrdId, spId;
                var jsonObj = {};
                if ($scope.caiFenProArr.length > 0) {
                    for (var i = 0, len = $scope.caiFenProArr.length; i < len; i++) {
                        cjOrdId = $scope.caiFenProArr[i].CJOrderId;
                        spId = $scope.caiFenProArr[i].ID;
                        if (jsonObj[cjOrdId]) {
                            jsonObj[cjOrdId] += ',' + spId;
                        } else {
                            jsonObj[cjOrdId] = spId;
                        }
                    }
                    console.log(jsonObj)
                    var proIdStr;
                    for (var key in jsonObj) {
                        proIdStr = proIdStrFun(jsonObj[key])
                        for (var x = 0, xLen = $scope.ordSpGroup.length; x < xLen; x++) {
                            if ($scope.ordSpGroup[x][key]) {
                                $scope.ordSpGroup[x][key].push({
                                    'productid': proIdStr
                                })
                                break
                            }
                            if (x == xLen - 1) {
                                var weiCaiArr = [];
                                var ordItemObj = {};
                                weiCaiArr.push({
                                    'productid': proIdStr
                                })
                                ordItemObj[key] = weiCaiArr;
                                $scope.ordSpGroup.push(ordItemObj)
                            }
                        }
                    }
                }

                console.log($scope.ordSpGroup)
                $scope.caiFenProArr = []; //拼完左边清空 防止再次拼接
                dsp.postFun('order/order/splitOrderByProduct', JSON.stringify($scope.ordSpGroup), function (data) {
                    console.log(data)
                    initClickFlag = true;
                    if (data.data.statusCode == 200) {

                        $scope.yiCaiFenArr = [];
                        $scope.ordSpGroup = [];
                        var splitResArr = JSON.parse(data.data.result);
                        var resSucCount = 0,
                            resErrorCount = 0,
                            errorMessage;
                        console.log(splitResArr)
                        if (splitResArr && JSON.stringify(splitResArr) != '[]') {
                            for (var i = 0, len = splitResArr.length; i < len; i++) {
                                if (splitResArr[i].result) {
                                    resSucCount++;
                                } else {
                                    resErrorCount++;
                                    errorMessage = splitResArr[i].message[0];
                                    // console.log(errorMessage)
                                }
                            }

                            if (resSucCount > 0 && resErrorCount < 1) {
                                layer.msg('split success')
                                resSucFreshFun()
                            } else {
                                if (resSucCount > 0) {
                                    resSucFreshFun()
                                    layer.msg(errorMessage, {time: 3000})
                                } else {
                                    errorMessage = splitResArr[0].message[0]
                                    layer.closeAll("loading")
                                    layer.msg(errorMessage, {time: 3000})
                                }
                            }
                        } else {
                            layer.msg(`Oops, split failed. sNotes: 1. The Item Quantity is supposed to be greater than 1; 2. Unknown reasons. Please try it again`)
                            layer.closeAll("loading")
                        }
                    } else {
                        layer.msg(`Oops, split failed. sNotes: 1. The Item Quantity is supposed to be greater than 1; 2. Unknown reasons. Please try it again`)
                        layer.closeAll("loading")
                    }
                }, function (data) {
                    console.log(data)
                    initClickFlag = true;
                    layer.closeAll("loading")
                })
            }

            function resSucFreshFun() {
                $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                var orData = {};
                tjFun(orData)
                orData.data = JSON.stringify(orData.data);
                dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                function dclsFun(data) {
                    console.log(data.data)
                    var list1 = data.data.result;
                    $scope.list = data.data.result;
                    $scope.list = JSON.parse(list1);
                    $scope.ordersList = $scope.list.ordersList;
                    console.log($scope.ordersList)
                    $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                    if ($scope.pcountN > 0) {
                        dsp.removeNodataPic($('.orders-list'))
                        dsp.closeLoadPercent($('.orders-list'))
                    } else {
                        addNotSjFun()
                        dsp.closeLoadPercent($('.orders-list'))
                    }
                    layer.closeAll("loading")
                    $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                    logisRemark($scope.list);
                    importFun(); //分页函数
                    numFun(); //调用给订单赋值的函数
                }

                function dcleFun() {
                    layer.closeAll("loading")
                    dsp.closeLoadPercent($('.orders-list'))
                    dsp.cjMesFun(1);
                }
            }

            function proIdStrFun(spIds) {
                var csProArr = spIds.split(',')
                var csHashObj = {}
                for (let j = 0, jLen = csProArr.length; j < jLen; j++) {
                    if (csHashObj[csProArr[j]]) {
                        csHashObj[csProArr[j]] = csHashObj[csProArr[j]] - 0 + 1
                    } else {
                        csHashObj[csProArr[j]] = 1
                    }
                }
                var proIdStr = JSON.stringify(csHashObj).replace('{', '').replace('}', '').replace(/\"/g, '');
                return proIdStr;
            }

            function isRepeatFun(arr) {
                var outCusId;
                for (var i = 0, len = arr.length; i < len; i++) {
                    outCusId = arr[i].ORDER_NUMBER;
                    for (var j = 0, jLen = arr.length; j < jLen; j++) {
                        if (outCusId != arr[j].ORDER_NUMBER) {
                            return false;
                        }
                    }
                }
            }

            //recover
            var recoverIds;
            $scope.recoverOrdBtn = function () {
                recoverIds = '';
                var selCount = 0;
                $("#z-dcl-ord .zcheckbox").each(function () {
                    if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
                        recoverIds += $(this).parent().siblings('.ord-cai').children('.order-id').text() + ',';
                        selCount++;
                    }
                })
                if (selCount > 0) {
                    $scope.isRecoverFlag = true;
                } else {
                    layer.msg('Please select order(s) first!')
                    return;
                }
            }
            $scope.sureRecoverFun = function () {
                dsp.load()
                var upJson = {};
                upJson.ids = recoverIds;
                dsp.postFun('order/order/recoverSplitOrder', JSON.stringify(upJson), function (data) {
                    dsp.closeLoad()
                    $scope.isRecoverFlag = false;
                    if (data.data.statusCode == 200) {
                        layer.msg('recover success')
                        $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                        var orData = {};
                        tjFun(orData)
                        orData.data = JSON.stringify(orData.data);
                        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                        function dclsFun(data) {
                            console.log(data.data)
                            var list1 = data.data.result;
                            $scope.list = data.data.result;
                            $scope.list = JSON.parse(list1);
                            $scope.ordersList = $scope.list.ordersList;
                            console.log($scope.ordersList)
                            $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                            if ($scope.pcountN > 0) {
                                dsp.removeNodataPic($('.orders-list'))
                                dsp.closeLoadPercent($('.orders-list'))
                            } else {
                                addNotSjFun()
                                dsp.closeLoadPercent($('.orders-list'))
                            }
                            $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                            logisRemark($scope.list);
                            importFun(); //分页函数
                            numFun(); //调用给订单赋值的函数
                        }

                        function dcleFun() {
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            dsp.cjMesFun(1);
                        }
                    } else {
                        layer.msg('Orders are possibly unqualified for recovery.', {time: 3000})
                    }
                }, function (data) {
                    console.log(data)
                    dsp.closeLoad()
                })
            }
            //重量拆分
            $scope.isSplitFun = function () {
                $scope.selCountNum = 0;
                $scope.duoPinCount = 0;
                $scope.danPinCount = 0;
                $scope.caiFenProArr = []; //可以拆分的商品
                $scope.yiCaiFenArr = []; //已经拆分的商品
                splitSelIds = '';
                var itemOrdId;
                var $curObj, itemOrdSpNum, spItemNum;
                $("#z-dcl-ord .zcheckbox").each(function () {
                    if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
                        itemOrdId = $.trim($(this).parent().siblings('.ord-cai').children('.order-id').text());
                        $scope.selCountNum++;
                        $curObj = $(this).parent().parent().parent().find('.d-toggle-tab');
                        itemOrdSpNum = $(this).siblings('.ord-sp-num').text();
                        if (itemOrdSpNum > 1) {
                            $scope.duoPinCount++;
                            splitSelIds += $(this).parent().siblings('.ord-cai').children('.order-id').text() + ',';

                        } else if (itemOrdSpNum == 1) {
                            $scope.danPinCount++;
                        } else {
                            console.log('没有商品')
                        }
                    }
                })
                const splitSelIdsArr = splitSelIds.split(',').filter(i => i)
                console.log(splitSelIdsArr)
                console.log($scope.ordersList)
                if ($scope.ordersList.some(item => item.order.ORDERSOURCE_TYPE === '7' && splitSelIdsArr.includes(item.order.ID))) {
                    layer.msg('Orders cannot be split.')
                    return;
                }
                if ($scope.selCountNum > 0) {
                    if ($scope.duoPinCount > 0) {
                        $scope.splitFlag = true;
                    } else {
                        layer.msg('Only orders with more than 1 product can be split.', {time: 3000})
                    }
                } else {
                    layer.msg('Please select order(s) first!')
                }
            }
            $scope.splitOrdFun = function () {
                if (!$scope.splitWeight) {
                    layer.msg('Please enter weight!')
                    return;
                }
                if ($scope.splitWeight > 2000 || $scope.splitWeight < 1) {
                    layer.msg('Please enter a correct weight');
                    return;
                }
                layer.load(2)
                $scope.splitFlag = false;
                var splData = {};
                splData.ids = splitSelIds;
                splData.weight = Math.floor($scope.splitWeight);
                dsp.postFun('order/order/splitOrderByWeight', JSON.stringify(splData), function (data) {
                    console.log(data)
                    if (data.data.statusCode == 200) {
                        var splitResArr = JSON.parse(data.data.result);
                        var resSucCount = 0,
                            resErrorCount = 0,
                            errorMessage;
                        console.log(splitResArr)
                        if (splitResArr && JSON.stringify(splitResArr) != '[]') {
                            for (var i = 0, len = splitResArr.length; i < len; i++) {
                                if (splitResArr[i].result) {
                                    resSucCount++;
                                } else {
                                    resErrorCount++;
                                    errorMessage = splitResArr[i].message[0];
                                }
                            }

                            if (resSucCount > 0 && resErrorCount < 1) {
                                layer.msg('split success')
                                resSucFreshFun()
                            } else {
                                if (resSucCount > 0) {
                                    resSucFreshFun()
                                    layer.msg(errorMessage, {time: 3000})
                                } else {
                                    errorMessage = splitResArr[0].message[0]
                                    dsp.closeLoad();
                                    layer.msg(errorMessage, {time: 3000})
                                }
                            }
                        } else {
                            layer.msg(`Oops, split failed.
              Notes: 1. The Item Quantity is supposed to be greater than 1; 2. Unknown reasons. Please try it again`)
                            dsp.closeLoad();
                        }
                    } else {
                        dsp.closeLoad();
                        layer.msg(`Oops, split failed.
            Notes: 1. The Item Quantity is supposed to be greater than 1; 2. Unknown reasons. Please try it again`)
                    }
                }, function (data) {
                    console.log(data)
                    dsp.closeLoad();
                })
            }
            $scope.properMesFun = function (pro, sku) {
                console.log(pro)
                console.log(sku)
                $scope.newCusDesignArr = [];
                if (Object.prototype.toString.call(pro) === "[object Array]") {
                    $scope.properMesType = 'arrayType'
                    $scope.propertiesFlag = true;
                } else if (Object.prototype.toString.call(pro) === '[object Object]') {
                    $scope.properMesType = 'objectType'
                    $scope.propertiesFlag = true;
                    if (pro.type == 3 || pro.type == 4) {
                        if (pro.customPodDesign) {
                            for (let i = 0, len = pro.customPodDesign.length; i < len; i++) {
                                pro.customPodDesign[i]['img'] = pro.customPodDesign[i].links[0];
                                $scope.newCusDesignArr.push(pro.customPodDesign[i])
                            }
                        } else if (pro.customDesign || pro.customeDesign) {
                            const customDesign = pro.customDesign || pro.customeDesign;
                            for (let i = 0, len = customDesign.length; i < len; i++) {
                                customDesign[i]['img'] = customDesign[i].links[0];
                                $scope.newCusDesignArr.push(customDesign[i])
                            }
                        }
                    }
                    console.log($scope.newCusDesignArr)
                } else {
                    $scope.properMesType = 'otherType'
                    layer.msg('No POD details available at present.')
                }
                $scope.propertiesMes = pro;
                $scope.propertiesMes.customMessgae = pro.customMessgae ||pro.customMessage;
                console.log($scope.propertiesMes)

            }
            $scope.tuCengFun = function (arr) {
                $scope.tuCengArr = arr;
                $scope.tuCengFlag = true;
            }
            $scope.copyDelFun = function (val) {
                //如果这里换为 input 则不支持换行
                val = JSON.stringify(val)
                let temp = document.createElement('textarea');
                temp.value = val;
                console.log(val, temp.value)
                document.body.appendChild(temp);
                temp.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                temp.style.display = 'none';
                layer.msg('Copied Successfully');
            }

            function isObjArr(value) {
                if (Object.prototype.toString.call(value) === "[object Array]") {
                    console.log('value是数组');
                } else if (Object.prototype.toString.call(value) === '[object Object]') {
                    console.log('value是对象');
                } else {
                    console.log('value不是数组也不是对象')
                }
            }

            $scope.exportOrder = function () {
                $scope.dcordFlag = true;
                console.log($scope.ordersList)
            }
            $scope.goActexportOrder = function () {
                let checkIds = '';
                for (let i = 0, len = $scope.ordersList.length; i < len; i++) {
                    if ($scope.ordersList[i].check) {
                        checkIds += $scope.ordersList[i].order.ID + ',';
                    }
                }
                var orData = {};
                tjFun(orData)
                orData.data.exportOrderIds = checkIds;
                orData.data = JSON.stringify(orData.data);
                layer.load(2);
                dsp.postFun('app/client_erp/exportOrders', JSON.stringify(orData), function (data) {
                    layer.closeAll('loading');
                    console.log(data);
                    if (data.data.statusCode == 200) {
                        $scope.dcordFlag = false;
                        $scope.dcordCallbackFlag = true;
                        $scope.excelHref = JSON.parse(data.data.result).href;
                    } else {
                        layer.msg('Export order error.')
                    }
                })
            }

            $scope.bjSkuFun = function (ev) {
                $(ev.target).hide(); //把自己隐藏掉
                $(ev.target).siblings('.bj-spsku').removeAttr('disabled');
                $(ev.target).siblings('.bjsame-btn').show();
            }
            $scope.bjSkuQxFun = function (ev, sku) {
                //隐藏保存 取消的按钮
                $(ev.target).parent().find('.bjsame-btn').hide();
                //显示编辑按钮
                $(ev.target).siblings('.xg-spskubtn').show();
                $(ev.target).siblings('.bj-spsku').val(sku)
                //给这条商品设置禁止输入
                $(ev.target).siblings('.bj-spsku').attr('disabled', 'true');
            }

            function updateSKUFail(item) {
                let sku = item.sku.split('-')[0];
                layer.confirm('<p style="padding:20px 0">SKU modified. Please connect the variant first.</p>', {
                    title: false,
                    closeBtn: 0,
                    btn: ['Connect', 'Cancel'] //按钮
                }, function (index) {
                    layer.close(index);
                    location.href = `#/products-connection/pending-connection///${base64.encode(sku)}`;
                });
            }

            $scope.bjSkuSureFun = function (ev, item, pindex, index, pItem) {
                var bjSkuInpVal = $.trim($(ev.target).siblings('.bj-spsku').val());
                if (bjSkuInpVal.includes('BZSP')) {
                    layer.msg('You cannot modify it to a packaging product SKU.');
                    return false;
                }
                layer.load(2)
                var upData = {
                    id: item.ID,
                    sku: bjSkuInpVal,
                    STORE_NAME: pItem.STORE_NAME,
                    isGroupSku: item.isGroupProduct == 1 ? '1' : '0'
                };
                dsp.postFun('app/order/cjUpdateSku', JSON.stringify(upData), function (data) {
                    console.log(data)
                    dsp.closeLoad();
                    if(data.data.code&&data.data.code != 200){
                        layer.msg(data.data.message);
                        return; 
                    }
          
                    if (data.data.result == 1) {
                        layer.msg('Modified Successfully')
                        console.log($scope.ordersList[pindex])
                        $scope.ordersList[pindex].product[index].SKU = bjSkuInpVal;
                        $scope.ordersList[pindex].product[index].PRICE = data.data.price;
                        var oneOrdCjAmount = 0;
                        $scope.ordersList[pindex].product.forEach((item, i) => {
                            if (item.SKU.indexOf('BZSP') == -1) oneOrdCjAmount += item.PRICE * item.QUANTITY;
                        })
                        $scope.ordersList[pindex].order.ORDER_AMOUNT = oneOrdCjAmount.toFixed(2) - 0;
                        //显示编辑按钮
                        $(ev.target).siblings('.xg-spskubtn').show();
                        //隐藏保存 取消的按钮
                        $(ev.target).parent().find('.bjsame-btn').hide();
                        //给这条商品设置禁止输入
                        $(ev.target).siblings('.bj-spsku').attr('disabled', 'true');
                        if (data.data.type == 'image') {
                            $scope.ordersList[pindex].product[index].image = data.data.img;
                        } else {
                            $scope.ordersList[pindex].product[index].cjImage = data.data.img;
                        }
                    } else {
                        dsp.closeLoad();
                        var itemModSku = $scope.ordersList[pindex].product[index].SKU;
                        var itemSpModSku = itemModSku.split('-');
                        if (data.data.code == '501') {
                            return updateSKUFail({sku: bjSkuInpVal});
                        }
                        if (itemSpModSku[0] == bjSkuInpVal.split('-')[0]) {
                            layer.msg('Modify Failed')
                        } else {
                            layer.msg('SKU not found')
                        }
                    }
                }, function (data) {
                    dsp.closeLoad();
                })
            }


            var dclordersid = ''; //待处理订单正常订单的id
            var splitordcs = ''; //存储拆分出来的参数
            var splitNormalId = ""; //存储被拆分订单的id
            var splitcjid = ''; //拆分出来订单的商品id
            var splitowlfs = ''; //拆分订单的物流方式
            var dclordwlstu = ''; //订单的物流方式
            var remarkFlag = false;
            var remarkCon = ''; //待处理订单被拆分过的订单
            var ordRemark = ''; //存储被拆分订单的属性
            var dclSecNum = 0; //存储待处理选中的订单数量
            //给待处理订单添加选中非选中状态

            $('#z-dcl-ord').on('click', '.zcheckbox', function (event) {
                event.stopPropagation();
                if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
                    // alert(1)
                    $(this).attr('src', 'static/image/direct-orders/multiple2.png');
                    dclSecNum++;
                    ordRemark = $(this).parent().parent().attr("remark");
                    var equalNum = $(this).parent().parent().attr("equal");
                    if (equalNum !== undefined) { //被拆分过
                        $('#z-dcl-ord .order-detail').each(function () { //循环所有的订单
                            if ($(this).attr('equal') == equalNum) {
                                $(this).children('.order-time').children('.zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
                            }
                        })
                    }
                    if (dclSecNum == $('#z-dcl-ord .zcheckbox').length) {
                        $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
                    }
                } else if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
                    $(this).attr('src', 'static/image/direct-orders/multiple1.png');
                    var equalNum1 = $(this).parent().parent().attr("equal");
                    if (equalNum1 !== undefined) { //被拆分过
                        $('#z-dcl-ord .order-detail').each(function () { //循环所有的订单
                            if ($(this).attr('equal') == equalNum1) {
                                $(this).children('.order-time').children('.zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
                            }
                        })
                    }
                    dclSecNum--;
                    if (dclSecNum != $('#z-dcl-ord .zcheckbox').length) {
                        $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                    }
                }
            })
            //给待处理订单添加全选事件
            $('#z-dcl-ord').on('click', '.zchecked-all', function () {
                var listNum = 0;
                if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
                    $(this).attr('src', 'static/image/direct-orders/multiple2.png');
                    $('#z-dcl-ord .zcheckbox').each(function () { //循环所有的订单
                        let questionOrdVal = $(this).siblings('.isdel-instore').text();
                        console.log(questionOrdVal)
                        if (!questionOrdVal || questionOrdVal == 'processing') {
                            $(this).attr('src', 'static/image/direct-orders/multiple2.png');
                            listNum++;
                        }
                    })
                    dclSecNum = listNum;
                } else {

                    $(this).attr('src', 'static/image/direct-orders/multiple1.png');
                    $('#z-dcl-ord .zcheckbox').each(function () { //循环所有的订单
                        let questionOrdVal = $(this).siblings('.isdel-instore').text();
                        if (!questionOrdVal || questionOrdVal == 'processing') {
                            $(this).attr('src', 'static/image/direct-orders/multiple1.png');
                        }
                    })
                    dclSecNum = 0;
                }
            })
            // 生成一个随机函数给拆分的订单赋值
            $scope.numFun1 = function () {
                var str = '';
                for (var i = 0; i < 5; i++) {
                    str += Math.floor(Math.random() * 10);
                }
                return str;
            }
            function transLogist(arr){
                layer.load(2)
                dsp.postFun("app/order/updateOrderLogisicsBatch", {
                    orderNums: arr.join(','),
                    logisic: 'USPS+'
                }, function (data) {
                    layer.closeAll("loading")
                    if (data.data.code == 200) {
                        closebulkWareFlag()
                        $scope.zchecked_all = false
                        freshList() //刷新列表
                        layer.msg("Successfully changed shipping area！")
                    } else {
                        layer.msg(data.data.message)
                    }
                })
            }
            $scope.usRefuse = ()=>{
                $scope.usInventoryFlag = false;
                discounteTransferFlag = false;
                checkStock();
            }
            $scope.sureFromUS = ()=> {
                let arr = $scope.usInventoryList.map(item => {
                    let newItem = {
                        orderId: item,
                        transferAreaId: '2'//同意默认转到美国仓
                    }
                    return newItem;
                })
                discounteTransferFlag = true;
                $scope.usInventoryFlag = false;
                transferAreaFun(arr).then(data=>{
                    if(data){
                        transLogist($scope.usInventoryList);
                    }
                })
            }
            function checkOrderDiscount() {
                let arr = [];
                $scope.ordersList.filter(item => {
                    if (item.check) {
                        arr.push(item.order.ID)
                    }
                })
                const ids = arr.join(',');
                if (arr.length > 0) {
                    layer.load(2)
                    dsp.postFun('order/order/checkOrderLogisticsDiscount', {ids}, function ({data}) {
                        let result = data.result;
                        layer.closeAll();
                        if (data.statusCode == '200' && result.length > 0) {
                            $scope.usInventoryFlag = true;
                            $scope.usInventoryList = result;
                        } else {
                            checkStock();
                        }
                    }, function (data) {
                        console.log(data)
                    })
                } else {
                    $scope.addCartFlag = true;
                }
            }

            //把待处理订单提交到待提交的按钮
            function checkStock() {
                const arr = []
                $scope.ordersList.forEach(item => {
                    if (item.check) {
                        // if(item.order.areaId !== '1') {
                        arr.push(item.order.ID)
                    }
                })
                const ids = arr.join(",")
                if (ids) {
                    dsp.postFun('order/order/checkInventory', {ids}, function (data) {
                        let resData = data.data;
                        if (resData.statusCode == 200) {
                            $scope.noInventoryArr = resData.result;
                            if ($scope.noInventoryArr.length > 0) {
                                $scope.notifi = true;
                                if ($scope.noInventoryArr.length <= 4) {
                                    $scope.ordersText = $scope.noInventoryArr.join(", ")
                                } else {
                                    $scope.ordersText = $scope.noInventoryArr.slice(0, 4).join(", ") + "..."
                                }
                            } else {
                                $scope.addCartFlag = true;
                            }
                        } else if (data.data.statusCode == 400) {
                            $scope.errorShowFlag = true;
                            const temp = JSON.parse(data.data.result)
                            $scope.logisticsReasonList = temp.map((item) => {
                                return {
                                    recordNum: item,
                                    message: data.data.message
                                }
                            })
                        }
                    }, function (data) {
                        console.log(data)
                    })
                } else {
                    $scope.addCartFlag = true;
                }
            }

            var jsonOrd = {}; //存储提交订单后 需要往后台发送的参数
            jsonOrd.data = {};
            $scope.noInventoryArr = [];
            $scope.addToCartFun = addToCartFun
            function addToCartFun() {
                var selectNum = 0; //存储被选中的条数
                var dhlNoPhoneNum = 0;
                var delOrdCount = 0; //多少条被shopify删除的订单
                var $targetDom; //当前订单行
                var thisOrdWlfs; //获取将要提交的物流方式
                var thisOrdPhoneNum; //当前行的手机号
                var thisCity; //获取订单城市地址
                var thisProvince; //获取订单省份地址
                var thisCountry; //获取订单国家简码
                var checkedTaxidText; //税号
                var cityEqualProvince = false; //发往美国订单是否有城市跟国家相同
                $scope.bxisTaxidFlag = 0;
                // 需要释放
                var idList = [];
                var idstr = '';
                //var kucunIds = '';
                $('#z-dcl-ord .order-detail').each(function () { //点击提交的时候去循环查找选中的订单
                    $targetDom = $(this).children('#cj-ord-num');
                    thisOrdWlfs = $targetDom.siblings('.dcl-ord-wltd').children('.dcl-ord-selwl').val();//获取物流方式
                    console.log('thisOrdWlfs:', thisOrdWlfs)
                    thisOrdPhoneNum = $targetDom.siblings('.shipping-info').children('.phone-num').text();
                    if ($(this).children('.order-time').children('.zcheckbox').attr('src') == 'static/image/direct-orders/multiple2.png') {
                        thisCity = $(this).children('.shipping-info').find('.imp-procus-city').text();
                        thisProvince = $(this).children('.shipping-info').find('.imp-procus-province').text();
                        thisCountry = $(this).children('.shipping-info').find('.imp-procus-country').text();
                        checkedTaxidText = $(this).children('.shipping-info').children('.taixd-text').text();
                        thisCity = thisCity.toUpperCase();
                        thisProvince = thisProvince.toUpperCase();
                        if (thisCountry == 'US') {
                            console.log('us')
                            if (thisCity != 'NEW YORK' && thisCity != 'NY' && thisProvince != 'NEW YORK' && thisProvince != 'NY') {
                                if (thisCity == thisProvince) {
                                    cityEqualProvince = true;
                                }
                            } else {
                                console.log('是纽约')
                            }
                        }
                        if (thisCountry == 'BR' && !checkedTaxidText) {
                            $scope.bxisTaxidFlag++;
                        }
                        if ($targetDom.children('.isdel-instore').text() && $targetDom.children('.isdel-instore').text() != 'processing') {
                            delOrdCount++;
                            selectNum++;
                        } else {
                            if ((thisOrdWlfs.indexOf('DHL') != -1 || thisOrdWlfs == "China EMS" || thisOrdWlfs == "S.F China Domestic" || thisOrdWlfs == "YTO China Domestic" || thisOrdWlfs == "South Africa Special Line" || thisOrdWlfs == "CJ Normal Express") && !thisOrdPhoneNum) {
                                console.log('该行必须要有手机号')
                                $scope.isDhlFlag = true;
                                selectNum++;
                                dhlNoPhoneNum++;
                            } else {
                                selectNum++;
                            }
                        }
                        var data = {
                            "id": $(this).attr('data-id'),
                            "adderss": $(this).attr('data-adress')
                        };
                        idList.push(data);
                    } else {
                        var ids = $(this).find('.dclord-sys-time').html();
                        idstr += ids + ',';
                    }
                })
                if (cityEqualProvince) {
                    layer.msg('Address incorrect, City and State should not be same!')
                    return;
                }
                if ($scope.bxisTaxidFlag > 0) {
                    $scope.isBxFlag = true;
                    return;
                }
                if (selectNum <= 0) {
                    layer.msg('Please select order(s) first!')
                    return;
                }
                $scope.shopifyRemoveNum = delOrdCount;
                $scope.nonePhoneNum = dhlNoPhoneNum;
                $scope.addCartOrdNum = selectNum;
                if (dhlNoPhoneNum == selectNum) {
                    let index = layer.msg("Please fill in the recipient's phone number for the selected orders.", {time: 4000})
                    layer.style(index, {
                        width: '500px'
                    });
                } else {
                    $scope.noInventoryArr = [];
                    // checkStock()
                    checkOrderDiscount();
                }
                //loading加载
                let lottieDom=null;
                function ceateLoading(id){
                    const element = document.getElementById(id);
                    element.parentElement.style.display='flex';
                    if(!element) return;
                    if(!lottieDom) {
                        lottieDom = lottie.loadAnimation({
                            container: element, 
                            renderer: 'svg',
                            loop: true,
                            autoplay: true,
                            path: '/egg/image/cj_lottie.json' 
                        });
                    }
                }
                function removeLoading(id){
                    const element = document.getElementById(id);
                    element.parentElement.style.display='none';
                    lottieDom.destroy();
                }
                //提交至购物车
                $scope.sureAddCartFun = function (){
                    var cjOrderNumber = $scope.addressOrderList.join(',')
                    console.log($scope.addressOrderList)
                    if($scope.addressOrderList.length){
                        var orderIdList = {
                            'type': 1,
                            'cjOrderNumber': cjOrderNumber
                        }
                        ceateLoading('addcardLoad');
                        $scope.addCartFlag = false
                        dsp.postFun('app/address/checkAddress', JSON.stringify(orderIdList),function (res){
                            removeLoading('addcardLoad');
                            console.log(res)
                            if (res.data.data.length){
                                $scope.checkAddressList = res.data.data
                            }
                            $scope.textFun = (data) => {
                                let list = []
                                data.forEach(i=>{
                                    list.push(i.msgEn)
                                })
                                list = list.join(',')
                                return list
                            }
                            if ($scope.checkAddressList && $scope.checkAddressList.length){
                                $scope.checkAddress = true
                                $scope.addCartFlag = false
                                return
                            }else{
                                $scope.opinionOrder()
                            }
                            
                            console.log('checkAddressList',$scope.checkAddressList)
                            console.log($scope.addressOrderList)
                            
                        })
                }
                //地址不完整弹窗
                $scope.checkAddress = false
                $scope.closeCheckAddress2 = () => {
                    $scope.checkAddress = false
                    $scope.checkAddressList = []
                }
                $scope.closeCheckAddress = () => {
                    if($scope.addressOrderList.length !== $scope.checkAddressList.length){
                        $scope.checkAddressList.forEach(item => {
                            if($scope.addressOrderList.includes(item.orderId)){
                                $scope.addressOrderList = $scope.addressOrderList.filter(i => i !== item.orderId)
                            }
                        })
                        console.log($scope.addressOrderList)
                        $scope.opinionOrder()
                    }
                    $scope.checkAddress = false
                }
                $scope.opinionOrder = function () {
                        var aa = 0;
                        var selFlagBol = false; //判断提交的订单中有没有没有物流方式的订单
                        dclordersid = ''; //再次点击确定提交按钮时 清空
                        // normaldclwl = ''; //再次点击确定提交按钮时 清空物流方式
                        splitordcs = ''; //再次点击确定提交按钮时 清空存储拆分出来的参数
                        var isDhlPhoneNum;
                        var isHaveTax = false; //判断提交的订单中有没有地区是BR的，但是没有税号的订单
                        $("#z-dcl-ord .zcheckbox").each(function (i) {
                            splitNormalId = ''; //再次点击确定提交按钮时 清空被拆分订单的id
                            splitowlfs = ''; //再次点击确定提交按钮时 清空物流方式
                            splitcjid = ''; //再次点击确定提交按钮时 清空拆分出来订单的商品id
                            var ordersid = '';
                            var itemWlName = $(this).parent().siblings('.dcl-ord-wltd').children('.dcl-ord-selwl').val();//获取物流方式
                            isDhlPhoneNum = $(this).parent().siblings('.shipping-info').children('.phone-num').text();
                            var taxNumber = $(this).parent().siblings('.shipping-info').children('.taixd-text').text(); //税号
                            var countryCode = $(this).parent().siblings('.shipping-info').find('.imp-procus-country').text(); //城市
                            if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
                                //判断城市是否是BR, 并且物流是否为CJPacket或DHL或ePacket
                                if ("BR" == countryCode && !taxNumber) {
                                    isHaveTax = true;
                                }
                                if (itemWlName && itemWlName != 'Please select') {//如果有物流方式
                                    ordersid = $(this).parent().siblings('.ord-cai').children('.order-id').text();
                                    console.log(ordersid)
                                    if($scope.addressOrderList.includes(ordersid)){
                                        //获取订单的物流方式
                                        dclordwlstu = $(this).parent().siblings('.dcl-ord-wltd').children('.dcl-ord-selwl').val();
                                        //获取商品是否匹配
                                        ordRemark = $(this).parent().parent().attr("remark");
                                        if ((itemWlName.indexOf('DHL') != -1 || itemWlName == "China EMS" || itemWlName == "S.F China Domestic" || itemWlName == "YTO China Domestic" || itemWlName == "South Africa Special Line" || itemWlName == "CJ Normal Express") && !isDhlPhoneNum) {
                                            console.log('该行订单缺少必要的手机号手机号')
                                        } else {
                                            let isNoInventoryIdFlag = true;
                                            if ($scope.noInventoryArr.length > 0) {
                                                for (let i = 0, len = $scope.noInventoryArr.length; i < len; i++) {
                                                    if (ordersid == $scope.noInventoryArr[i]) {
                                                        isNoInventoryIdFlag = false;
                                                        break
                                                    }
                                                }
                                            }
                                            if (isNoInventoryIdFlag) {//不是缺少库存的订单
                                                dclordersid += ordersid + "#" + dclordwlstu + ',';
                                            }
                                        }
                                    }
                                }
                            }
                        })
                        if (isHaveTax) {
                            layer.closeAll("loading")
                            layer.msg('The orders contains an order with a city of BR but no CPF/CNPJ')
                            return;
                        }

                        //按订单的状态提交
                        jsonOrd.data = {};
                        jsonOrd.data.normal = dclordersid;
                        jsonOrd.data.splitNormal = splitordcs;
                        jsonOrd.data = JSON.stringify(jsonOrd.data);
                        console.log(jsonOrd)
                        console.log(dclordersid)
                        if (!dclordersid) {
                            layer.closeAll("loading")
                            layer.msg('No available orders. Please select orders with shipping methods.')
                            return;
                        } else {
                            let orderNumber = $scope.ordersList
                            console.log(orderNumber)
                            let arr = []
                            if($scope.checkAddressList){
                                $scope.checkAddressList.forEach(item => {
                                    orderNumber.forEach(i => {
                                        if(i.order.ID === item.orderId){
                                            arr.push(i)
                                        }
                                    })
                                })
                                arr.forEach(item => {
                                    idList = idList.filter(i => i.id !== item.order.ORDER_NUMBER)
                                })
                            }
                            var data = {
                                "orderInfo": idList,
                                "orderId": idstr
                            };
                            console.log(data)
                            console.log(JSON.stringify(data))
                            dsp.postFun('app/order/repeatVerification', JSON.stringify(data), function (data) {
                                $scope.addCartFlag = false;
                                console.log(data);
                                if (data.data.flag == false) {
                                    var count = data.data.count;
                                    var idstr = data.data.ids;
                                    var carlist = {
                                        "list": idstr,
                                        "data": jsonOrd
                                    };
                                    $scope.carNumber = count;
                                    $('.carZZC').show().find('.carNumber').attr('data-number', JSON.stringify(carlist));

                                }else if (data.data.flag == true) {
                                    console.log(data.data.flag)
                                    addCart()
                                }
                            });
                        }
                    }
                }
            }
            $scope.ordersList = [];
            function addCart(){
                console.log(jsonOrd)
                dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                dsp.postFun('app/order/submitOrders', JSON.stringify(jsonOrd), function (data) {
                    // alert('chenggong')
                    if (data.data.statusCode == 200) {
                        $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                        var orData = {};
                        tjFun(orData)
                        orData.data = JSON.stringify(orData.data);
                        console.log(JSON.stringify(orData))
                        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                        function dclsFun(data) {
                            var list1 = data.data.result;
                            // console.log(list);
                            $scope.list = data.data.result;
                            $scope.list = JSON.parse(list1);
                            $scope.ordersList = $scope.list.ordersList;
                            console.log($scope.ordersList)
                            $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                            if ($scope.pcountN > 0) {
                                dsp.removeNodataPic($('.orders-list'))
                                dsp.closeLoadPercent($('.orders-list'))
                            } else {
                                addNotSjFun()
                                dsp.closeLoadPercent($('.orders-list'))
                            }

                            $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                            logisRemark($scope.list);
                            importFun(); //分页函数
                            numFun(); //调用给订单赋值的函数
                        }

                        function dcleFun() {
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            dsp.cjMesFun(1);
                        }
                    } 
                    else if (data.data.statusCode == 406 || data.data.statusCode == 500) {
                        if(data.data.statusCode == 406) {
                            layer.msg(data.data.message);
                        } else if(data.data.statusCode == 500) {
                            dsp.cjMesFun(1);
                        }
                        $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                        var orData = {};
                        tjFun(orData)
                        orData.data = JSON.stringify(orData.data);
                        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                        function dclsFun(data) {
                            var list1 = data.data.result;
                            // console.log(list);
                            $scope.list = data.data.result;
                            $scope.list = JSON.parse(list1);
                            $scope.ordersList = $scope.list.ordersList;

                            $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                            if ($scope.pcountN > 0) {
                                dsp.removeNodataPic($('.orders-list'))
                                dsp.closeLoadPercent($('.orders-list'))
                            } else {
                                addNotSjFun()
                                dsp.closeLoadPercent($('.orders-list'))
                            }

                            $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                            logisRemark($scope.list);
                            importFun(); //分页函数
                            numFun(); //调用给订单赋值的函数
                        }

                        function dcleFun() {
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            dsp.cjMesFun(1);
                        }
                    } else if (data.data.statusCode == 5000) {
                        $scope.addCartResonFlag = true;
                        $scope.addCartResonText = data.data.message;
                        resSucFreshFun()
                    } else if (data.data.statusCode == 400) {
                        $scope.errorShowFlag = true;
                        const temp = JSON.parse(data.data.result)
                        $scope.logisticsReasonList = temp.map((item) => {
                            return {
                                recordNum: item,
                                message: data.data.message
                            }
                        })
                    } else {
                        layer.closeAll("loading")
                        dsp.closeLoadPercent($('.orders-list'))
                        dsp.cjMesFun(1);
                        return;
                    }
                }, function () {
                    layer.closeAll("loading")
                    dsp.closeLoadPercent($('.orders-list'))
                    dsp.cjMesFun(1);
                })
            }

            $scope.cancelBx = function () {
                $scope.isBxFlag = false;
                $scope.bxisTaxidFlag = 0
            }

            $scope.confirmBx = function () {
                $('#z-dcl-ord .order-detail').each(function () { //点击提交的时候去循环查找选中的订单
                    var thisOrdWlfs; //获取将要提交的物流方式
                    var thisCountry; //获取订单国家简码
                    var checkedTaxidText;
                    if ($(this).children('.order-time').children('.zcheckbox').attr('src') == 'static/image/direct-orders/multiple2.png') {
                        thisCountry = $(this).children('.shipping-info').find('.imp-procus-country').text();
                        thisOrdWlfs = $(this).children('#cj-ord-num').siblings('.dcl-ord-wltd').children('.dcl-ord-selwl').val();
                        checkedTaxidText = $(this).children('.shipping-info').children('.taixd-text').text();
                        if (thisCountry == 'BR' && !checkedTaxidText) {
                            $(this).children('.order-time').children('.zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png')
                            let brOrder = $(this).children('.order-time')[0].innerText
                            $scope.addressOrderList = $scope.addressOrderList.filter(item => item !== brOrder)
                        }
                    }
                })
                $scope.bxisTaxidFlag = 0;
                $scope.isBxFlag = false;
            }


            $('.carNumber').click(function (e) {
                var data = JSON.parse($(this).attr('data-number'));
                var idList = data.list;
                console.log(idList);
                var a = base64.encode(idList);
                console.log(a);
                var newTab = window.open('about:blank');
                newTab.location.href = 'myCJ.html#/direct-orders/' + a;
                //$('.carZZC').hide();
            });
            $('.carWrapConfirmBtn').click(function () {
                $scope.addressOrderList = []
                $scope.checkAddressList = []
                $scope.addCartFlag = false;
                var data = JSON.parse($('.carNumber').attr('data-number'));
                console.log(data)
                var jsonOrd = data.data;
                var listId = data.list;
                console.log(listId);
                var newids = listId.split(',');
                var newList = [];
                var newStr = '';
                $.each(newids, function (i, v) {
                    console.log(v);
                    if (i == 0) {
                        newStr += v;
                    } else {
                        if (v != '') {
                            newStr += ',' + v;
                        }
                    }
                });

                var savData = {
                    "orderIds": newStr
                };
                console.log(savData);

                $scope.ordersList = [];
                dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                dsp.postFun('app/order/submitOrders', JSON.stringify(jsonOrd), function (data) {
                    // alert('chenggong')
                    console.log(data.data)
                    if (data.data.statusCode == 200) {
                        $('.carZZC').hide();
                        $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                        var orData = {};
                        tjFun(orData)
                        orData.data = JSON.stringify(orData.data);
                        console.log(JSON.stringify(orData))
                        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                        function dclsFun(data) {
                            console.log(data.data)
                            var list1 = data.data.result;
                            // console.log(list);
                            $scope.list = data.data.result;
                            $scope.list = JSON.parse(list1);
                            $scope.ordersList = $scope.list.ordersList;
                            console.log($scope.ordersList)
                            $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                            if ($scope.pcountN > 0) {
                                dsp.removeNodataPic($('.orders-list'))
                                dsp.closeLoadPercent($('.orders-list'))
                            } else {
                                addNotSjFun()
                                dsp.closeLoadPercent($('.orders-list'))
                            }

                            $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                            logisRemark($scope.list);
                            importFun(); //分页函数
                            numFun(); //调用给订单赋值的函数
                        }

                        function dcleFun() {
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            dsp.cjMesFun(1);
                        }
                    } else if (data.data.statusCode == 406 || data.data.statusCode == 500) {
                        if(data.data.statusCode == 406) {
                            layer.msg(data.data.message);
                        } else if(data.data.statusCode == 500) {
                            dsp.cjMesFun(1);
                        }
                        $('.carZZC').hide();
                        $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                        var orData = {};
                        tjFun(orData)
                        orData.data = JSON.stringify(orData.data);
                        console.log(JSON.stringify(orData))
                        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                        function dclsFun(data) {
                            console.log(data.data)
                            var list1 = data.data.result;
                            // console.log(list);
                            $scope.list = data.data.result;
                            $scope.list = JSON.parse(list1);
                            $scope.ordersList = $scope.list.ordersList;
                            console.log($scope.ordersList)

                            $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                            if ($scope.pcountN > 0) {
                                dsp.removeNodataPic($('.orders-list'))
                                dsp.closeLoadPercent($('.orders-list'))
                            } else {
                                addNotSjFun()
                                dsp.closeLoadPercent($('.orders-list'))
                            }

                            $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                            logisRemark($scope.list);
                            importFun(); //分页函数
                            numFun(); //调用给订单赋值的函数
                        }

                        function dcleFun() {
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            dsp.cjMesFun(1);
                        }
                    } else if (data.data.statusCode == 5000) {
                        $('.carZZC').hide();
                        $scope.addCartResonFlag = true;
                        $scope.addCartResonText = data.data.message;
                        resSucFreshFun()
                    } else if (data.data.statusCode == 400) {
                        $scope.errorShowFlag = true;
                        const temp = JSON.parse(data.data.result)
                        $scope.logisticsReasonList = temp.map((item) => {
                            return {
                                recordNum: item,
                                message: data.data.message
                            }
                        })
                    } else {
                        layer.closeAll("loading")
                        dsp.closeLoadPercent($('.orders-list'))
                        dsp.cjMesFun(1);
                        return;
                    }
                }, function () {
                    layer.closeAll("loading")
                    dsp.closeLoadPercent($('.orders-list'))
                    dsp.cjMesFun(1);
                });
                dsp.postFun('app/order/addRepeatOrderId', JSON.stringify(savData), function (data) {
                    console.log(data.data);
                });
            });
            $scope.closeCarWrap = function () {
                if($scope.checkAddressList){
                    $scope.checkAddressList.forEach(item => {
                        $scope.addressOrderList.push(item.orderId)
                    })
                }
                $scope.checkAddressList = []
                $('.carZZC').hide();
            };

            //给DHL输入手机号
            var listIndex; //第几条订单
            $scope.inpPhoneFun = function (index, ev) {
                ev.stopPropagation();
                $(ev.target).hide();
                $(ev.target).siblings('.dhlsameclass').show();
                listIndex = index;
            }
            $scope.surePhoneFun = function (index, ev, item) {
                ev.stopPropagation();
                var evInpVal = '';
                console.log(evInpVal)
                evInpVal = $.trim($(ev.target).siblings('.inp-phoneNum').val());
                console.log(listIndex)
                if (evInpVal) {
                    dsp.postFun('app/order/updatePhone', {
                        id: item.ID,
                        phone: evInpVal
                    }, function (data) {
                        console.log(data)
                        if (data.data.statusCode == "CODE_200") {
                            $scope.ordersList[listIndex].order.PHONE = evInpVal;
                        } else {
                            layer.msg('Change the phone number to fail.')
                        }
                    }, function (data) {
                        console.log(data)
                    })
                    $(ev.target).siblings('#lrPhoneBtn').show();
                    $(ev.target).parent().find('.dhlsameclass').hide();
                } else {
                    layer.msg('Please enter phone number')
                }
            }
            $scope.qxPhoneFun = function (ev) {
                ev.stopPropagation();
                $(ev.target).siblings('#lrPhoneBtn').show();
                $(ev.target).parent().find('.dhlsameclass').hide();
            }
            //批量为客户的dhl设置手机号
            $scope.openSetDhlFun = function (wlName) {
                $scope.dhlNoPhoneFlag = true;
                $scope.bulkEditWlName = wlName;
            }
            $scope.bulkSetDhlPhone = function () {
                if ($scope.dhlPhoneNum) {
                    console.log($scope.dhlPhoneNum)
                } else {
                    layer.msg('Please enter phone number')
                    return;
                }
                var updhlData = {};
                updhlData.phone = $scope.dhlPhoneNum;
                updhlData.logisticName = $scope.bulkEditWlName;
                dsp.postFun('app/order/upDHLPhone', JSON.stringify(updhlData), function (data) {
                    $scope.dhlNoPhoneFlag = false;
                    console.log(data)
                    if (data.data.result == true) {
                        layer.msg('Set up success')
                        $scope.dhlPhoneNum = '';
                        $scope.ordersList = [];
                        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                        var showList = $('#dcl-sel').val() - 0;
                        var orData = {};
                        tjFun(orData)
                        orData.data = JSON.stringify(orData.data)
                        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                        function dclsFun(data) {
                            $scope.copyFlag = false;
                            console.log(data.data)
                            var list1 = data.data.result;
                            $scope.list = JSON.parse(list1);

                            $scope.ordersList = $scope.list.ordersList;
                            console.log($scope.ordersList)
                            $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                            // layer.msg('Please check the failed ones on the Draft.')
                            if ($scope.pcountN > 0) {
                                dsp.removeNodataPic($('.orders-list'))
                                dsp.closeLoadPercent($('.orders-list'))
                            } else {
                                addNotSjFun()
                                dsp.closeLoadPercent($('.orders-list'))
                            }
                            $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                            logisRemark($scope.list);
                            importFun(); //分页函数
                            numFun(); //调用给订单赋值的函数
                        }

                        function dcleFun() {
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            dsp.closeLoadPercent($('.orders-list'))
                        }
                    } else {
                        layer.msg('Set up failed')
                    }
                }, function (data) {
                    console.log(data)
                })
            }
            $scope.isPhoneRegFun = function (ev) {
                $(ev.target).val($(ev.target).val().replace(/[^\d\-\+\()\s]/g, ''));
            }
            $('.input-dhlphone').on('keyup', function () {
                $(this).val($(this).val().replace(/[^\d\-\+\()\s]/g, ''));
            });
            $scope.importNewFun = (e) => {
                e.stopPropagation();
                $('.dcl-tc-wrap').show();
            }
            //选择上传 粘贴弹框的取消按钮
            $('.can-dtw-tc').click(function () {
                $('.dcl-tc-wrap').hide();
                // $('#svc-xl').hide();
            })
            //点击copy按钮 显示copy弹窗
            $('.dtwt-r').click(function () {
                $('.copy-row-ul li').remove(); //清空复制粘贴里面所有的数据
                $('.dcl-tc-wrap').hide();
                $('.copy-wrap').show();
                $('.copy-row-ul').eq(1).attr('isfir', '1');
            })

            //粘贴的取消按钮
            $('#copy-cancel-btn').click(function () {
                $('.copy-wrap').hide();
                $('.copy-row-ul li').remove();
                $('.add-text-btn').attr('src', 'static/image/public-img/add.png');
            })
            //粘贴的文本框
            $scope.isadd = false;
            var $currentObj = {};
            //增加文本的图片按钮
            $scope.addTextCon = function ($event) {
                var excelTit = $($event.currentTarget).parent().parent().siblings('.c-head-tit').text();
                // alert(excelTit);
                $('#excel-tit').text(excelTit)
                $currentObj = $($event.currentTarget).parent().parent();
                if ($currentObj.attr('isfir') == 1) {
                    $('#add-textarea').val(''); //清空文本框
                    $scope.isadd = true;
                    $('.add-text-btn').attr('src', 'static/image/public-img/add.png')
                    $($event.currentTarget).attr('src', 'static/image/public-img/add-active.png')
                    $currentObj = $($event.currentTarget).parent().parent();
                    // console.log($currentObj)
                    $currentObj.children('.hide-add-data').remove();
                    $currentObj.children('.copy-row-li').remove();
                } else if ($('.copy-row-ul').eq(1).children('.copy-row-li').length <= 0) {
                    layer.msg('Please enter order number first.')
                    return;
                } else if ($('.copy-row-ul').eq(1).children('.copy-row-li').length > 0) {
                    $('#add-textarea').val(''); //清空文本框
                    $scope.isadd = true;
                    $('.add-text-btn').attr('src', 'static/image/public-img/add.png')
                    $($event.currentTarget).attr('src', 'static/image/public-img/add-active.png')
                    $currentObj = $($event.currentTarget).parent().parent();
                    // console.log($currentObj)
                    $currentObj.children('.hide-add-data').remove();
                    $currentObj.children('.copy-row-li').remove();
                }
                // var textObj = $($event.currentTarget).
                // alert($($event.currentTarget).index())
            }
            // 文本框的取消按钮
            $scope.closeaddTextCon = function () {
                $scope.isadd = false;
            }
            //文本框的确定按钮
            var biaoji = 0;
            $scope.enteraddTextCon = function (index) {
                $scope.isadd = false; //关闭文本框
                var str = '';
                if ($('#add-textarea').val() == '') {
                    return;
                } else {
                    str = $('#add-textarea').val();
                }
                // var str = $('#add-textarea').val();
                console.log(str);
                // console.log(str.indexOf('OrderNumber'))
                var hideStr = '<p style="display:none;" class="hide-add-data">' + str + '</p>' // style="display:none;"
                // console.log(str);
                var strArr = str.split('\n');
                if (strArr && JSON.stringify(strArr) != '[]') {
                    if (!strArr[strArr.length - 1]) {
                        strArr.pop(); //去除最后一个元素
                    }
                }
                var listData = ''; //存储粘贴的数据
                var sortNum = ''; //存储订单的序号
                var index = 0;
                console.log(strArr)
                console.log(strArr.length)
                if ($currentObj.attr('isfir') == 1) {
                    biaoji = strArr.length;
                }
                console.log(biaoji)
                for (var i = 0; i < biaoji; i++) {
                    index++;
                    if ($currentObj.attr('isfir') == 1) {

                        if (strArr[i] == '') {
                            biaoji = i;
                            break;
                        } else {
                            $('#ctc-sort li').remove();
                            sortNum += '<li class="copy-row-li"><span>' + index + '</span></li>';
                            listData += '<li class="copy-row-li">' + strArr[i] + '</li>';
                        }
                    } else {
                        if (strArr[i] == undefined) {
                            break;
                            // listData += '<li class="copy-row-li"></li>';
                        } else {
                            listData += '<li class="copy-row-li">' + strArr[i] + '</li>';
                        }

                    }

                }
                // console.log(sortNum)

                $('#ctc-sort').append(sortNum);
                $currentObj.append(hideStr);
                $currentObj.append(listData);
            }
            //提交粘贴的内容
            $scope.copyFlag = false;
            $('#copy-con-btn').click(function () {
                layer.load(2);
                $('.hide-add-data').text();
                console.log($('.hide-add-data').text())
                var $dataObj = $('.hide-add-data');
                console.log($dataObj.length)
                // var queryData = '';//存储提交的数据
                var strLen = 13;
                if ($('#ctc-taxNumber .hide-add-data').text() == null || $('#ctc-taxNumber .hide-add-data').text().length == 0) {
                    //税号可以为空
                    strLen = 12;
                }
                if ($dataObj.length !== strLen) { //$dataObj.length!==12
                    layer.closeAll("loading")
                    layer.msg('Please fill the form completely.')
                    return;
                } else {
                    // var $rowObj = $('.copy-row-ul');
                    // console.log($rowObj)
                    var len1 = $dataObj.eq(0).text().split('\n').length;
                    // 判断所有的数组长度是否相等
                    console.log($dataObj.length)
                    var flag = false;
                    //判断粘贴的条数是否相等
                    for (var i = 1; i < $dataObj.length; i++) {
                        if (len1 == $dataObj.eq(i).text().split('\n').length) {
                            flag = true;
                            console.log(i)
                        } else {
                            flag = false;
                            console.log(i)
                            layer.closeAll("loading")
                            // $('.copy-row-ul').eq(i).css('background','pink')
                            layer.msg('The lines are not equal to each other.')
                            return;
                        }
                    }
                    var queryData = {}; //存储提交的数据
                    if (flag) { //flag
                        for (var i = 0; i < $dataObj.length; i++) {
                            // queryData += $dataObj.eq(i).text()+'#';
                            switch (i) {
                                case 0:
                                    // queryData += 'Order Number:'+$dataObj.eq(i).text()+'#';
                                    queryData.orderNumber = $dataObj.eq(0).text();
                                    break;
                                case 1:
                                    queryData.Sku = $dataObj.eq(1).text();
                                    break;
                                case 2:
                                    queryData.Quantity = $dataObj.eq(2).text();
                                    break;
                                case 3:
                                    queryData.productTitle = $dataObj.eq(3).text();
                                    break;
                                case 4:
                                    queryData.customerName = $dataObj.eq(4).text();
                                    break;
                                case 5:
                                    queryData.address1 = $dataObj.eq(5).text();
                                    break;
                                case 6:
                                    // queryData += 'Order Number:'+$dataObj.eq(i).text()+'#';
                                    queryData.address2 = $dataObj.eq(6).text();
                                    break;
                                case 7:
                                    queryData.city = $dataObj.eq(7).text();
                                    break;
                                case 8:
                                    queryData.province = $dataObj.eq(8).text();
                                    break;
                                case 9:
                                    queryData.zip = $dataObj.eq(9).text();
                                    break;
                                case 10:
                                    queryData.country = $dataObj.eq(10).text();
                                    break;
                                case 11:
                                    // queryData += 'Order Number:'+$dataObj.eq(i).text()+'#';
                                    queryData.phoneNumber = $dataObj.eq(11).text();
                                    break;
                                case 12:
                                    // queryData += 'Order Number:'+$dataObj.eq(i).text()+'#';
                                    queryData.taxNumber = $dataObj.eq(12).text();
                                    break;
                                default:
                                    break;
                            }
                        }
                        // console.log(queryData)
                        // console.log(JSON.stringify(queryData))app/order/analysisOrder
                        dsp.postFun("order/oldOrder/analysisOrder", JSON.stringify(queryData), function (data) {
                            // console.log(data)
                            console.log(data)
                            console.log(data.data.message)
                            // console.log(data.data.result);
                            if (data.data.statusCode == '300') {
                                layer.closeAll("loading");
                                layer.msg(data.data.message, {time: 3000});
                                return;
                            }
                            if (data.data.statusCode == '200') {
                                console.log(data.data.message)
                                var successObj = JSON.parse(data.data.message)
                                console.log(successObj)
                                // alert(successObj)
                                if (successObj.result == 'true') {
                                    layer.closeAll("loading");
                                    $('.copy-wrap').hide(); //隐藏粘贴框
                                    $scope.copyFlag = true;
                                    $scope.copyprototalNum = successObj.totalNumber - 0;
                                    $scope.copysuceNum = successObj.success - 0;
                                    $scope.copyfailNum = successObj.nothing - 0;
                                    $scope.copytotalNum = $scope.copysuceNum + $scope.copyfailNum;
                                    $scope.copycombinedNum = $scope.copyprototalNum - $scope.copytotalNum; //有多少订单合并
                                } else {
                                    layer.closeAll("loading");
                                    layer.msg(successObj.message, {time: 3000})
                                    return;
                                }

                            }
                        })
                        $('.add-text-btn').attr('src', 'static/image/public-img/add.png');
                    }

                }

            })

            //粘贴订单成功失败弹框的确定按钮
            $scope.copyConFun = function () {
                // $scope.copyFlag = false;
                if ($scope.copyfailNum > 0) {
                    if ($scope.copysuceNum > 0) {
                        $scope.ordersList = [];
                        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                        var showList = $('#dcl-sel').val() - 0;
                        var orData = {};
                        tjFun(orData)
                        orData.data = JSON.stringify(orData.data)
                        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                        function dclsFun(data) {
                            $scope.copyFlag = false;
                            console.log(data.data)
                            var list1 = data.data.result;
                            $scope.list = JSON.parse(list1);

                            $scope.ordersList = $scope.list.ordersList;
                            console.log($scope.ordersList)
                            $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                            // layer.msg('Please check the failed ones on the Draft.')
                            if ($scope.pcountN > 0) {
                                dsp.removeNodataPic($('.orders-list'))
                                dsp.closeLoadPercent($('.orders-list'))
                            } else {
                                addNotSjFun()
                                dsp.closeLoadPercent($('.orders-list'))
                            }
                            $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                            logisRemark($scope.list);
                            importFun(); //分页函数
                            numFun(); //调用给订单赋值的函数
                        }

                        function dcleFun() {
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            dsp.closeLoadPercent($('.orders-list'))
                        }

                        // $scope.draftFun();
                        openDFun()
                    } else {
                        // layer.msg('Please check the failed ones on the Draft.')
                        $scope.copyFlag = false;
                        // $scope.draftFun();
                        openDFun()
                    }
                } else {
                    $scope.copyFlag = false;
                    // statement
                    $scope.ordersList = [];
                    dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                    $scope.excelCanFlag = true;
                    $scope.copyFlag = false;
                    // $window.location.reload();
                    var showList = $('#dcl-sel').val() - 0;
                    var orData = {};
                    tjFun(orData)
                    orData.data = JSON.stringify(orData.data)
                    dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                    function dclsFun(data) {
                        console.log(data.data)
                        var list1 = data.data.result;
                        $scope.list = JSON.parse(list1);

                        $scope.ordersList = $scope.list.ordersList;
                        console.log($scope.ordersList)
                        $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                        // layer.msg('Please check the failed ones on the Draft.')
                        if ($scope.pcountN > 0) {
                            dsp.removeNodataPic($('.orders-list'))
                            dsp.closeLoadPercent($('.orders-list'))
                        } else {
                            addNotSjFun()
                            dsp.closeLoadPercent($('.orders-list'))
                        }
                        $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                        logisRemark($scope.list);
                        importFun(); //分页函数
                        numFun(); //调用给订单赋值的函数
                    }

                    function dcleFun() {
                        layer.closeAll("loading")
                        dsp.closeLoadPercent($('.orders-list'))
                        dsp.cjMesFun(1);
                    }
                }
            }

            //鼠标移入切换图片
            $('.dtwt-l').mouseenter(function (event) {
                $(this).children('img').attr('src', 'static/image/public-img/excel-aimg.png')
            });
            $('.dtwt-l').mouseleave(function (event) {
                $(this).children('img').attr('src', 'static/image/public-img/excel-img.png')
            });
            $('.dtwt-r').mouseenter(function (event) {
                $(this).children('img').attr('src', 'static/image/public-img/copy-aimg.png')
            });
            $('.dtwt-r').mouseleave(function (event) {
                $(this).children('img').attr('src', 'static/image/public-img/copy-img.png')
            });
            // 导入excel订单按钮
            $scope.uploadFlag = false; //上传成功的弹窗
            //取消按钮的显示隐藏
            $scope.excelCanFlag = false;
            $('.dtwt-l').click(function () {
                $('.dcl-tc-wrap').hide();
                layer.load(2);
                layer.open({
                    type: 1,
                    content: '<div class="excelalert-wrap" style="width:490px">'
                        +
                        '<div class="excel-mtop">' +
                        '<div class="excel-mtl">'
                        +
                        '<p class="excel-mtp2">Excel Orders Template:</p>' +
                        '<p class="excel-mtp2">Excel Orders File:</p>' +
                        '</div>' +
                        '<div class="excel-mtr">'
                        +
                        '<p class="excel-mblp">' +
                        '<a class="excel-download" href="https://cc-west-usa.oss-us-west-1.aliyuncs.com/2051/1629024423850.xlsx"  >Download</a>'
                        +
                        '</p>' +
                        '<form id="excel-upload" action="http://192.168.5.104:8086/dsp_server/order/oldOrder/addOrderByExcel" method="post" enctype="multipart/form-data">' +
                        '<p class="e-upl-p"><a class="upload-btn" href="javascript:void(0)">Upload</a><input id="uploadInp" name="file" class="ex-upload-inp" type="file"   />' +
                        '<span class="text-tit"></span>' +
                        '</p>'
                        +
                        '</form>' +
                        '</div>' +
                        '</div>'
                        +
                        '</div>',
                    area: ['554px', '300px'],
                    closeBtn: 0,
                    // shadeClose: true,
                    title: "Import Excel Orders",
                    skin: "excel-layer",
                    btn: ['Cancel', 'Confirm'],
                    yes: function (index, layero) {
                        layer.close(index);
                        layer.closeAll("loading")
                    },
                    btn2: function (index, layero) {
                        layer.close(index);
                        var file = $("#uploadInp").val();
                        var index = file.lastIndexOf(".");
                        console.log(file)
                        $('.text-tit').text(file)
                        var ext = file.substring(index + 1, file.length);
                        if (ext != "xlsx" && ext != "xls") {
                            layer.closeAll("loading")
                            layer.msg('File Format Error: You need to upload EXCEL format file, other type files will not be available to system.')
                            return;
                        }
                        var formData = new FormData($("#excel-upload")[0]);
                        var platformId = $(".excel-mts").text();
                        formData.append("platformId", platformId);
                        console.log(formData);
                        console.log(platformId);
                        dsp.upLoadImgPost('order/oldOrder/addOrderByExcel', formData, orsFun, dreFun)

                        function orsFun(data) {
                            console.log(data)
                            if (data.data.statusCode == '300') {
                                layer.closeAll("loading");
                                if (!data.data.message) {
                                    data.data.message = 'Upload error'
                                }
                                layer.msg(data.data.message, {time: 3000});
                                return;
                            }
                            if (data.data.statusCode == '200') {
                                var obj = JSON.parse(data.data.message)
                                console.log(obj)
                                console.log(obj.result)
                                console.log(data.data.message)
                                var successObj = JSON.parse(data.data.message)
                                console.log(successObj)
                                // alert(successObj)
                                if (successObj.result == 'true') {
                                    layer.closeAll("loading");
                                    $scope.uploadFlag = true;
                                    $scope.prototalNum = successObj.totalNumber - 0;
                                    $scope.suceNum = successObj.success - 0;
                                    $scope.failNum = successObj.nothing - 0;
                                    $scope.totalNum = $scope.suceNum + $scope.failNum;
                                    $scope.combinedNum = $scope.prototalNum - $scope.totalNum; //有多少订单合并
                                    // alert($scope.failNum)
                                    if ($scope.failNum > 0) {
                                        //取消按钮的显示隐藏
                                        $scope.excelCanFlag = false;
                                    } else {
                                        $scope.excelCanFlag = true;
                                        // alert($scope.excelCanFlag)
                                    }
                                } else {
                                    layer.closeAll("loading");
                                    layer.msg(successObj.message, {time: 3000})
                                    return;
                                }
                            }
                        }

                        function dreFun() {
                            console.log(" err ceshi")
                            layer.closeAll("loading")
                        }

                    }

                });
                $("#excel-upload").on('change', function () {
                    var fileTit = $("#uploadInp").val();
                    $('.text-tit').text(fileTit);
                });
            })

            //上传excel订单的确定按钮
            $scope.excelConFun = function () {
                if ($scope.failNum > 0) {
                    $scope.uploadFlag = false;

                    if ($scope.suceNum > 0) {
                        var showList = $('#dcl-sel').val() - 0;
                        $scope.ordersList = [];
                        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                        var orData = {};
                        tjFun(orData)
                        orData.data = JSON.stringify(orData.data)
                        console.log(JSON.stringify(orData))
                        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                        function dclsFun(data) {
                            console.log(data.data)
                            var list1 = data.data.result;
                            $scope.list = JSON.parse(list1);

                            $scope.ordersList = $scope.list.ordersList;
                            console.log($scope.ordersList)
                            $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                            // layer.msg('Please check the failed ones on the Draft.')
                            if ($scope.pcountN > 0) {
                                dsp.removeNodataPic($('.orders-list'))
                                dsp.closeLoadPercent($('.orders-list'))
                            } else {
                                addNotSjFun()
                                dsp.closeLoadPercent($('.orders-list'))
                            }
                            $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                            logisRemark($scope.list);
                            importFun(); //分页函数
                            numFun(); //调用给订单赋值的函数
                        }

                        function dcleFun() {
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                        }

                        localStorage.setItem('isOpenDraft', 1);
                        location.reload();
                    } else {
                        // layer.msg('Please check the failed ones on the Draft.')
                        localStorage.setItem('isOpenDraft', 1);
                        location.reload();
                    }
                    // $scope.draftFun();
                } else {
                    // statement
                    $scope.ordersList = [];
                    dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                    $scope.excelCanFlag = true;
                    $scope.uploadFlag = false;
                    // $window.location.reload();
                    var showList = $('#dcl-sel').val() - 0;
                    var orData = {};
                    tjFun(orData)
                    orData.data = JSON.stringify(orData.data)
                    dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                    function dclsFun(data) {
                        console.log(data.data)
                        var list1 = data.data.result;
                        $scope.list = JSON.parse(list1);

                        $scope.ordersList = $scope.list.ordersList;
                        console.log($scope.ordersList)
                        $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                        // layer.msg('Please check the failed ones on the Draft.')
                        if ($scope.pcountN > 0) {
                            dsp.removeNodataPic($('.orders-list'))
                            dsp.closeLoadPercent($('.orders-list'))
                        } else {
                            addNotSjFun()
                            dsp.closeLoadPercent($('.orders-list'))
                        }
                        $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                        logisRemark($scope.list);
                        importFun(); //分页函数
                        numFun(); //调用给订单赋值的函数
                    }

                    function dcleFun() {
                        layer.closeAll("loading")
                        dsp.closeLoadPercent($('.orders-list'))
                        dsp.cjMesFun(1);
                    }
                }
            }
            $scope.cancelFun = function () {
                $scope.uploadFlag = false;
            }

            $scope.addToCancelFun = function () {
                layer.load(2);
                var selectNum = 0; //存储被选中的条数
                $('#z-dcl-ord .order-detail').each(function () { //点击提交的时候去循环查找选中的订单
                    if ($(this).children('.order-time').children('.zcheckbox').attr('src') == 'static/image/direct-orders/multiple2.png') {
                        selectNum++;
                        if ($(this).attr("remark") !== undefined) { //如果是被拆分的订单
                            selectNum--;
                        }
                    }
                })
                if (selectNum <= 0) {
                    layer.closeAll("loading")
                    layer.msg('Please select order(s) first!')
                    return;
                }
                layer.open({
                    content: "<p>You are adding orders to Canceled.</p><p>Order Quantity:  <span id='awa-dcl-num'></span></p>",
                    area: ['480px', '260px'],
                    closeBtn: 0,
                    // shadeClose: true,
                    title: "Order Cancellation",
                    skin: "",
                    btn: ['Cancel', 'Confirm'],
                    success: function (layero, index) {
                        $(layero).find('#awa-dcl-num').html(selectNum);
                    },
                    yes: function (index, layero) {
                        layer.close(index);
                        layer.closeAll("loading")
                    },
                    btn2: function (index, layero) {
                        // 点击提交按钮重新发送请求
                        $scope.pcountN = 0; //存储待提交订单的总条数 process required
                        var cancelData = {};
                        var cancelId = '';
                        // var ordTypeObj = {};
                        $("#z-dcl-ord .zcheckbox").each(function (i) {
                            if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
                                cancelId += $(this).parent().siblings('.ord-cai').children('.order-id').text() + ',';
                            }
                        })
                        cancelData.orderNums = cancelId;
                        cancelData.type = 1;
                        console.log(JSON.stringify(cancelData))
                        dsp.postFun('app/order/deleteOrder', JSON.stringify(cancelData), function (data) {
                            layer.closeAll("loading")
                            console.log(data)
                            console.log(data.data)
                            if (data.data.result == true) {
                                $scope.ordersList = [];
                                dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                                $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                                var orData = {};
                                tjFun(orData)
                                orData.data = JSON.stringify(orData.data);
                                console.log(JSON.stringify(orData))
                                dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                                function dclsFun(data) {
                                    console.log(data.data)
                                    var list1 = data.data.result;
                                    // console.log(list);
                                    $scope.list = data.data.result;
                                    $scope.list = JSON.parse(list1); //json×Ö·û´®×ª¶ÔÏó
                                    $scope.ordersList = $scope.list.ordersList;
                                    console.log($scope.ordersList)
                                    // $scope.list.countNumber = $scope.list.countNumber;//获取总订单的条数
                                    $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                                    if ($scope.pcountN > 0) {
                                        dsp.removeNodataPic($('.orders-list'))
                                        dsp.closeLoadPercent($('.orders-list'))
                                    } else {
                                        addNotSjFun()
                                        dsp.closeLoadPercent($('.orders-list'))
                                    }
                                    $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                                    // alert(typeof($scope.pcountN))
                                    logisRemark($scope.list);
                                    importFun(); //分页函数
                                    numFun(); //调用给订单赋值的函数
                                }

                                function dcleFun() {
                                    // alert('dingdna')
                                    layer.closeAll("loading")
                                    dsp.closeLoadPercent($('.orders-list'))
                                    dsp.cjMesFun(1);
                                }
                            } else {
                                // alert('tijiaoshibai')
                                layer.closeAll("loading")
                                dsp.closeLoadPercent($('.orders-list'))
                                dsp.cjMesFun(1);
                                return;
                            }
                        }, function () {
                            // alert('cancel ')
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            dsp.cjMesFun(1);
                        })

                    }
                });
            }
            //重新拉取订单
            var timer1; //定时器
            var progressLineNum = 0;
            var progressLineNum2 = 33;
            var progressLineNum3 = 66;
            var progressStu = '1';
            var bianliangtime = 1;


            function testFun() {
                // console.log((new Date().getTime()-localStorage.getItem('bianliangtime'))/1000<5)
                if ((new Date().getTime() - localStorage.getItem('bianliangtime')) / 1000 < 5) {
                    setTimeout(function () {
                        testFun();
                    }, 5000);
                    return;
                }
                localStorage.setItem('bianliangtime', new Date().getTime());
                var queryData = localStorage.getItem('queryData')
                var link = location.href;
                console.log(link)
                dsp.postFun('app/order/getOperationOrderStatus', queryData, function (data) {
                    console.log(data)
                    progressLineNum = localStorage.getItem("progressLineNum") - 0;
                    progressLineNum++;
                    progressStu = data.data.result;
                    switch (progressStu) {
                        case '1':
                            localStorage.setItem("progressLineNum", progressLineNum);
                            if (progressLineNum > 32) {
                                $('.progress-bar').css('width', 33 + '%');
                                $('.progress-bar').text(33 + '%')
                            } else {

                                $('.progress-bar').css('width', progressLineNum + '%');
                                $('.progress-bar').text(progressLineNum + '%')
                            }
                            break;
                        case '2':
                            if (progressLineNum < 33) {
                                progressLineNum = 33;
                            }
                            localStorage.setItem("progressLineNum", progressLineNum);
                            if (progressLineNum > 66) {
                                $('.progress-bar').css('width', 66 + '%');
                                $('.progress-bar').text(66 + '%')
                            } else {

                                $('.progress-bar').css('width', progressLineNum + '%');
                                $('.progress-bar').text(progressLineNum + '%')
                            }
                            break;
                        case '3':
                            if (progressLineNum < 66) {
                                progressLineNum = 66;
                            }
                            localStorage.setItem("progressLineNum", progressLineNum);
                            if (progressLineNum > 99) {
                                $('.progress-bar').css('width', 99 + '%');
                                $('.progress-bar').text(99 + '%')
                            } else {
                                $('.progress-bar').css('width', progressLineNum + '%');
                                $('.progress-bar').text(progressLineNum + '%')
                            }
                            break;
                        case '0':

                            $scope.isupdateFlag = false;
                            localStorage.removeItem('updateTime')
                            if (localStorage.getItem("zhixing0") == undefined) {
                                localStorage.setItem('zhixing0', "0");
                            } else {
                                return;
                            }

                            $scope.ordersList = [];
                            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                            $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                            var orData = {};
                            orData.userId = bs.decode(localStorage.getItem('userId'));
                            // console.log(orData.userId)
                            orData.token = bs.decode(localStorage.getItem('token'));
                            tjFun(orData)
                            orData.data = JSON.stringify(orData.data);
                            console.log(JSON.stringify(orData))
                            dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                        function dclsFun(data) {
                            console.log(data.data)
                            var list1 = data.data.result;
                            // console.log(list);
                            $scope.list = data.data.result;
                            $scope.list = JSON.parse(list1);
                            $scope.ordersList = $scope.list.ordersList;
                            console.log($scope.ordersList)


                            // $scope.list.countNumber = $scope.list.countNumber;//获取总订单的条数
                            $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                            if ($scope.pcountN > 0) {
                                dsp.removeNodataPic($('.orders-list'))
                                dsp.closeLoadPercent($('.orders-list'))
                            } else {
                                addNotSjFun()
                                dsp.closeLoadPercent($('.orders-list'))
                            }
                            $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                            // alert(typeof($scope.pcountN))
                            logisRemark($scope.list);
                            importFun(); //分页函数
                            numFun(); //调用给订单赋值的函数
                        }

                        function dcleFun() {
                            // alert('dingdna')
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            dsp.cjMesFun(1);
                        }

                            break;
                    }
                    if (progressStu != "0") {
                        testFun();
                    }
                }, function (data) {
                    console.log(data)
                })
            }

            // if(localStorage.getItem('updateTime')){
            // 	$scope.isupdateFlag = true;
            // 	testFun ();
            // }
            $scope.cxlqordFun = function () {
                // if(codeInlocal != '200'){
                // 	layer.msg("System is syncing orders, you won't be able to update orders until sync finished.")
                // 	return;
                // }

                var selectNum = 0; //存储被选中的条数
                $('#z-dcl-ord .order-detail').each(function () { //点击提交的时候去循环查找选中的订单
                    if ($(this).children('.order-time').children('.zcheckbox').attr('src') == 'static/image/direct-orders/multiple2.png') {
                        selectNum++;
                        if ($(this).attr("remark") !== undefined) { //如果是被拆分的订单
                            selectNum--;
                        }
                    }
                })
                if (selectNum <= 0) {
                    layer.closeAll("loading")
                    layer.msg('Please select order(s) first!')
                    return;
                }
                layer.open({
                    content: "<p>Are you sure to Update Orders?</p><p>It will take around few miuntes to make this happen.</p><p>Order Quantity:  <span id='awa-dcl-num'></span></p>",
                    area: ['480px', '260px'],
                    closeBtn: 0,
                    // shadeClose: true,
                    title: "Update Orders",
                    skin: "",
                    btn: ['Cancel', 'Confirm'],
                    success: function (layero, index) {
                        $(layero).find('#awa-dcl-num').html(selectNum);
                    },
                    yes: function (index, layero) {
                        layer.close(index);
                        layer.closeAll("loading")
                    },
                    btn2: function (index, layero) {
                        // 点击提交按钮重新发送请求
                        var queryData = {};
                        var cancelId = '';
                        $("#z-dcl-ord .zcheckbox").each(function (i) {

                            if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
                                cancelId += $(this).parent().siblings('.ord-cai').children('.order-id').text() + ',';
                            }
                        })
                        var updateTime = new Date().getTime();

                        queryData.orderNums = cancelId;
                        queryData = JSON.stringify(queryData);
                        localStorage.setItem('queryData', queryData)
                        dsp.postFun('app/order/operationOrder', queryData, function (data) {
                            dsp.closeLoad();
                            console.log(data)
                            if (data.data.result == "200") {
                                localStorage.removeItem('zhixing0')
                                localStorage.setItem('progressLineNum', 0)
                                localStorage.setItem('bianliangtime', new Date().getTime());
                                $scope.isupdateFlag = true;
                                testFun2();
                                localStorage.setItem('updateTime', updateTime)
                            } else {
                                $scope.isupdateFlag = false;
                                layer.msg("System is syncing orders, you won't be able to update orders until sync finished.")
                            }

                        }, function (data) {
                            console.log(data)
                        })

                        function testFun2() {
                            if ((new Date().getTime() - localStorage.getItem('bianliangtime')) / 1000 < 5) {
                                setTimeout(function () {
                                    // console.log("等待我s")
                                    testFun2();
                                }, 5000);
                                return;
                            }
                            localStorage.setItem('bianliangtime', new Date().getTime());
                            dsp.postFun('app/order/getOperationOrderStatus', queryData, function (data) {
                                console.log(data)
                                progressLineNum = localStorage.getItem("progressLineNum") - 0;
                                progressLineNum++;
                                progressStu = data.data.result;
                                switch (progressStu) {
                                    case '1':
                                        localStorage.setItem("progressLineNum", progressLineNum);
                                        if (progressLineNum > 32) {
                                            $('.progress-bar').css('width', 33 + '%');
                                            $('.progress-bar').text(33 + '%')
                                        } else {
                                            $('.progress-bar').css('width', progressLineNum + '%');
                                            $('.progress-bar').text(progressLineNum + '%')
                                        }
                                        break;
                                    case '2':
                                        if (progressLineNum < 33) {
                                            progressLineNum = 33;
                                        }
                                        localStorage.setItem("progressLineNum", progressLineNum);
                                        if (progressLineNum > 66) {
                                            $('.progress-bar').css('width', 66 + '%');
                                            $('.progress-bar').text(66 + '%')
                                        } else {
                                            $('.progress-bar').css('width', progressLineNum + '%');
                                            $('.progress-bar').text(progressLineNum + '%')
                                        }
                                        break;
                                    case '3':
                                        if (progressLineNum < 66) {
                                            progressLineNum = 66;
                                        }
                                        localStorage.setItem("progressLineNum", progressLineNum);
                                        if (progressLineNum > 99) {
                                            $('.progress-bar').css('width', 99 + '%');
                                            $('.progress-bar').text(99 + '%')
                                        } else {
                                            $('.progress-bar').css('width', progressLineNum + '%');
                                            $('.progress-bar').text(progressLineNum + '%')
                                        }
                                        break;
                                    case '0':
                                        $scope.isupdateFlag = false;
                                        clearTimeout(timer1)
                                        localStorage.removeItem('updateTime')
                                        if (localStorage.getItem("zhixing0") == undefined) {
                                            localStorage.setItem('zhixing0', "0");
                                        } else {
                                            return;
                                        }
                                        $scope.ordersList = [];
                                        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                                        $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                                        var orData = {};
                                        orData.userId = bs.decode(localStorage.getItem('userId'));
                                        // console.log(orData.userId)
                                        orData.token = bs.decode(localStorage.getItem('token'));
                                        tjFun(orData)
                                        orData.data = JSON.stringify(orData.data);
                                        console.log(JSON.stringify(orData))
                                        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                                    function dclsFun(data) {
                                        console.log(data.data)
                                        var list1 = data.data.result; //ËùÓÐÊý¾Ý
                                        // console.log(list);
                                        $scope.list = data.data.result;
                                        $scope.list = JSON.parse(list1); //json×Ö·û´®×ª¶ÔÏó
                                        $scope.ordersList = $scope.list.ordersList;
                                        console.log($scope.ordersList)


                                        // $scope.list.countNumber = $scope.list.countNumber;//获取总订单的条数
                                        $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                                        if ($scope.pcountN > 0) {
                                            dsp.removeNodataPic($('.orders-list'))
                                            dsp.closeLoadPercent($('.orders-list'))
                                        } else {
                                            addNotSjFun()
                                            dsp.closeLoadPercent($('.orders-list'))
                                        }
                                        $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                                        // alert(typeof($scope.pcountN))
                                        logisRemark($scope.list);
                                        importFun(); //分页函数
                                        numFun(); //调用给订单赋值的函数
                                    }

                                    function dcleFun() {
                                        // alert('dingdna')
                                        layer.closeAll("loading")
                                        dsp.closeLoadPercent($('.orders-list'))
                                        dsp.cjMesFun(1);
                                    }

                                        break;
                                }
                                if (progressStu != "0") {
                                    testFun2();
                                }
                            }, function (data) {
                                console.log(data)
                            })
                        }
                    }
                });
            }
            // //取消订单的弹框
            function delShopFun(shopArr) {
                if (!shopArr) {
                    return
                }
                /**店铺列表名字展示改成 店铺名+店铺类型+国家、增加国家全写参数、增加国家缩写参数 start */
                shopArr.forEach(e => {
                    // 国家缩写转换全写。ThemeId是shopee的国家;MarketplaceUrl是lazada的国家
                    e.countryfullName = replaceCountry(e.type == 'shopee' ? e.ThemeId : e.type == 'Lazada' ? e.MarketplaceUrl : '').fullName;
                    // 店铺名+店铺类型+国家
                    if (e.type) {
                        e.rNAME = `${e.name} - ${e.type.replace(e.type[0], e.type[0].toUpperCase())} ${e.countryfullName ? '-' : ''} ${e.countryfullName}`;
                    } else {
                        e.rNAME = e.name;
                    }
                    // 国家缩写code(大写)-物流模块传递国家需要
                    let curLogisticCountry = (e.ThemeId || e.MarketplaceUrl) ? (e.type == 'shopee' ? e.ThemeId : e.type == 'Lazada' ? e.MarketplaceUrl : '') : '';
                    if (curLogisticCountry) {
                        e.logisticsCountry = curLogisticCountry.toUpperCase();
                    } else {
                        e.logisticsCountry = '';
                    }
                    // e.logisticsCountry = (e.ThemeId || e.MarketplaceUrl) ? (e.type == 'shopee' ? e.ThemeId : e.type == 'Lazada' ? e.MarketplaceUrl : '').toUpperCase() : '';
                    // 货币代码
                    e.currencyCode = replaceCountry(e.type == 'shopee' ? e.ThemeId : e.type == 'Lazada' ? e.MarketplaceUrl : '').currencyCode;
                });
                $scope.shops = shopArr;
            }

            function replaceCountry(params) {
                let fullName = '';
                let currencyCode = '';
                if (/sg/i.test(params)) {
                    fullName = 'Singapore', currencyCode = 'SGD'
                } else if (/my/i.test(params)) {
                    fullName = 'Malaysia', currencyCode = 'MYR'
                } else if (/id/i.test(params)) {
                    fullName = 'Indonesia', currencyCode = 'IDR'
                } else if (/th/i.test(params)) {
                    fullName = 'Thailand', currencyCode = 'THB'
                } else if (/ph/i.test(params)) {
                    fullName = 'Philippines', currencyCode = 'PHP'
                } else if (/vn/i.test(params)) {
                    fullName = 'Vietnam', currencyCode = 'VND'
                }
                return {fullName, currencyCode};
            }
            //分页
            function importFun() {
                if ($scope.pcountN == 0) {
                    layer.closeAll("loading")
                    dsp.closeLoadPercent($('.orders-list'))
                    return;
                }
                $(".pagination-demo1").jqPaginator({
                    totalCounts: $scope.pcountN, //设置分页的总条目数
                    pageSize: $('#dcl-sel').val() - 0, //设置每一页的条目数
                    visiblePages: 5,
                    currentPage: 1,
                    activeClass: 'active',
                    first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
                    prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
                    next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
                    last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
                    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                    onPageChange: function (n, type) {
                        console.log(n)
                        console.log(type)
                        if (type == 'init') {
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            return;
                        }
                        $scope.ordersList = [];
                        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                        //让待处理全选按钮置为非选中状态
                        $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                        var showList = $('#dcl-sel').val() - 0;
                        var yStoresTime = $('#y-ord-sdate').val();
                        var yStoreeTime = $('#y-ord-edate').val();
                        var cjsTime = $('#cj-stime').val();
                        var cjeTime = $('#cj-etime').val();
                        var yStoreName = $.trim($('#y-pro-name').val());
                        var cjStoreName = $.trim($('#cj-pro-name').val());
                        var berName = $.trim($('.buyer-inp').val());
                        var searchinpVal = $('.ord-search-inp').val();
                        var ordType = '';
                        if ($('.type-sel').val() == 'All') {
                            ordType = '';
                        } else if ($('.type-sel').val() == 'Shopify Imported') {
                            ordType = '2';
                        } else if ($('.type-sel').val() == 'Excel Imported') {
                            ordType = '1';
                        }
                        var orData = {};
                        tjFun(orData)
                        orData.data.page = n;
                        orData.data = JSON.stringify(orData.data)
                        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), function (data) {

                            // console.log(data.data)
                            console.log(data.data.result)
                            var list1 = data.data.result;
                            $scope.list = JSON.parse(list1);
                            console.log($scope.list)
                            $scope.ordersList = $scope.list.ordersList;
                            console.log($scope.ordersList)
                            $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                            if ($scope.pcountN > 0) {
                                dsp.removeNodataPic($('.orders-list'))
                                dsp.closeLoadPercent($('.orders-list'))
                            } else {
                                addNotSjFun()
                                dsp.closeLoadPercent($('.orders-list'))
                            }
                            logisRemark($scope.list);
                        }, function (err) {
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            dsp.cjMesFun(1);
                        })
                    }
                });
            }

            //分页选择框的查询事件
            $('#dcl-sel').change(function () {
                //让待处理全选按钮置为非选中状态
                $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                var showList = $(this).val() - 0;
                if ($scope.pcountN < 1) {
                    layer.closeAll("loading")
                    dsp.closeLoadPercent($('.orders-list'))
                    return;
                }
                $(".pagination-demo1").jqPaginator({
                    totalCounts: $scope.pcountN, //设置分页的总条目数
                    pageSize: showList, //设置每一页的条目数
                    visiblePages: 5, //显示多少页
                    currentPage: 1,
                    activeClass: 'active',
                    first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
                    prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
                    next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
                    last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
                    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                    onPageChange: function (n) {
                        $scope.ordersList = [];
                        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                        if ($('.type-sel').val() == 'All') {
                            ordType = '';
                        } else if ($('.type-sel').val() == 'Shopify Imported') {
                            ordType = '2';
                        } else if ($('.type-sel').val() == 'Excel Imported') {
                            ordType = '1';
                        }
                        var orData = {};
                        tjFun(orData)
                        orData.data.page = n;
                        orData.data.limit = showList;
                        orData.data = JSON.stringify(orData.data)
                        // console.log(orData.data)
                        console.log(JSON.stringify(orData))

                        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                        function dclsFun(data) {

                            console.log(data.data)
                            var list1 = data.data.result;
                            console.log(data.data.result)
                            // console.log(list);
                            $scope.list = data.data.result;
                            $scope.list = JSON.parse(list1);
                            $scope.ordersList = $scope.list.ordersList;
                            console.log($scope.ordersList)
                            //获取总订单的条数
                            $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                            if ($scope.pcountN > 0) {
                                dsp.removeNodataPic($('.orders-list'))
                                dsp.closeLoadPercent($('.orders-list'))
                            } else {
                                addNotSjFun()
                                dsp.closeLoadPercent($('.orders-list'))
                            }
                            logisRemark($scope.list);
                        }

                        function dcleFun() {
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            dsp.cjMesFun(1);
                        }
                    }
                });


            })
            //按店铺搜索订单
            $scope.storeChangeFun = function () {
                console.log($scope.storeName)
                $scope.ordersList = [];
                dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);

                var orData = {};
                tjFun(orData)
                if (!$scope.storeName) {
                    orData.data.storeNumber = '';
                } else {
                    orData.data.storeNumber = $scope.storeName;
                }
                orData.data.storage = $scope.storage;
                orData.data = JSON.stringify(orData.data)
                console.log(orData.data)
                console.log(JSON.stringify(orData))

                dsp.postFun('app/order/queryOrders', JSON.stringify(orData), function (data) {
                    //让待处理全选按钮置为非选中状态
                    $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                    console.log(data.data.result)
                    var list1 = data.data.result;
                    // console.log(list);
                    $scope.list = data.data.result;
                    $scope.list = JSON.parse(list1);
                    $scope.ordersList = $scope.list.ordersList;
                    console.log($scope.ordersList)

                    $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                    if ($scope.pcountN > 0) {
                        dsp.removeNodataPic($('.orders-list'))
                        dsp.closeLoadPercent($('.orders-list'))
                    } else {
                        addNotSjFun()
                        dsp.closeLoadPercent($('.orders-list'))
                    }
                    logisRemark($scope.list);
                    importFun(); //分页函数
                }, function (err) {
                    layer.closeAll("loading")
                    dsp.closeLoadPercent($('.orders-list'))
                    dsp.cjMesFun(1);
                })
            }
            //按条件分页 下
            $('.ip-jump-btn2').click(function () {
                var selectVal = 1; //复选框的值
                selectVal = $('.ip-select-num2').val() - 0;
                // alert(selectVal);
                // var inpVal = 0;//存储输入框的值
                var inpVal = $('.inp-num-go2').val() - 0; //输入框 需要跳到第几页
                // alert(inpVal)
                if (inpVal == '' || inpVal < 1) {
                    layer.closeAll("loading")
                    layer.msg('Page does not exist.');
                    return;
                }
                var countN = Math.ceil($scope.pcountN / selectVal);
                // alert(countN)
                if (inpVal > countN) {
                    layer.closeAll("loading")
                    layer.msg('Please input number less than page amount.');
                    return;
                }
                //让全选按钮置为非选中状态
                $('.zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                $(".pagination-demo1").jqPaginator({
                    totalCounts: $scope.pcountN, //设置分页的总条目数
                    pageSize: selectVal, //设置每一页的条目数
                    visiblePages: 5, //显示多少页
                    currentPage: inpVal,
                    activeClass: 'active',
                    first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
                    prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
                    next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
                    last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
                    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                    onPageChange: function (n) {
                        $scope.ordersList = [];
                        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);

                        var orData = {};
                        tjFun(orData)
                        orData.data.page = n;
                        orData.data = JSON.stringify(orData.data);

                        console.log(JSON.stringify(orData))
                        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), function (data) {
                            console.log(data.data)
                            var list1 = data.data.result;
                            $scope.list = data.data.result;
                            $scope.list = JSON.parse(list1);
                            $scope.ordersList = $scope.list.ordersList;
                            console.log($scope.ordersList)
                            $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                            if ($scope.pcountN > 0) {
                                dsp.removeNodataPic($('.orders-list'))
                                dsp.closeLoadPercent($('.orders-list'))
                            } else {
                                addNotSjFun()
                                dsp.closeLoadPercent($('.orders-list'))
                            }
                            logisRemark($scope.list);
                        }, function (err) {
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            dsp.cjMesFun(1);
                        })
                    }
                });
            })
            //用订单号搜索 orderNumber
            $scope.searchKeydown = (e) => {
                if (e.keyCode == 13) {
                    $scope.ordnumSearch();
                }
            }
            $scope.ordnumSearch = function () {
                $scope.addressOrderList = []
                console.log($scope.addressOrderList)
                $scope.ordersList = [];
                dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                var orData = {};
                tjFun(orData)
                orData.data = JSON.stringify(orData.data)
                console.log(orData.data)
                console.log(JSON.stringify(orData))
                // alert(inpVal)
                dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                function dclsFun(data) {
                    //让待处理全选按钮置为非选中状态
                    $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                    console.log(data.data.result)
                    var list1 = data.data.result;
                    $scope.list = data.data.result;
                    $scope.list = JSON.parse(list1);
                    $scope.ordersList = $scope.list.ordersList;
                    console.log($scope.ordersList)
                    $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                    if ($scope.pcountN > 0) {
                        dsp.removeNodataPic($('.orders-list'))
                        dsp.closeLoadPercent($('.orders-list'))
                    } else {
                        addNotSjFun()
                        dsp.closeLoadPercent($('.orders-list'))
                    }
                    logisRemark($scope.list);
                    importFun();
                    $scope.zchecked_all = false
                }

                function dcleFun() {
                    layer.closeAll("loading")
                    dsp.closeLoadPercent($('.orders-list'))
                    dsp.cjMesFun(1);
                }
            }

            // function pselwlFun() {
            //   $('.dcl-ord .order-detail').each(function () {
            //     if ($(this).children('.dcl-ord-wltd').children('.dcl-ord-selwl').val() == 'Please select') {
            //       $(this).children('.dcl-ord-wltd').children('.dcl-ord-selwl').css('border', '1px solid #f88f29');
            //     } else {
            //       $(this).children('.dcl-ord-wltd').children('.dcl-ord-selwl').css('border', '1px solid #ececec');
            //     }
            //   })
            // }

            //给左侧的导航添加滚动事件
            $(document).scroll(function () {
                if ($(document).scrollTop() >= 0) {
                    $('.left-nav').css({
                        position: 'fixed',
                        top: '80px'
                    });
                    if ($(document).scrollTop() >= 52) {
                        $('.back-wrap').css({
                            top: '80px'
                        })
                    } else {
                        $('.back-wrap').css({
                            top: '130px'
                        })
                    }
                } else {
                    $('.left-nav').css({
                        position: 'relative',
                        top: '80px'
                    });
                }
            })

            //高级搜索部分的查询
            $('#tj-search-btn').click(function () {
                $scope.ordersList = [];
                dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);

                var orData = {};
                tjFun(orData)
                orData.data = JSON.stringify(orData.data)
                console.log(orData.data)
                console.log(JSON.stringify(orData))
                dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                function dclsFun(data) {
                    //让待处理全选按钮置为非选中状态
                    $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                    console.log(data.data)
                    var list1 = data.data.result;
                    $scope.list = JSON.parse(list1);
                    $scope.ordersList = $scope.list.ordersList;
                    console.log(data.data.result)
                    $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                    // alert($scope.pcountN)
                    if ($scope.pcountN > 0) {
                        dsp.removeNodataPic($('.orders-list'))
                        dsp.closeLoadPercent($('.orders-list'))
                    } else {
                        addNotSjFun()
                        dsp.closeLoadPercent($('.orders-list'))
                    }
                    logisRemark($scope.list);
                    importFun(); //分页函数
                    $scope.zchecked_all = false

                }

                function dcleFun() {
                    layer.closeAll("loading")
                    dsp.closeLoadPercent($('.orders-list'))
                    dsp.cjMesFun(1);
                }
            })
            //高级搜索里面的按订单类型搜索
            $('.type-sel').change(function () {
                $scope.ordersList = [];
                dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);

                var orData = {};
                tjFun(orData)
                orData.data = JSON.stringify(orData.data)
                console.log(orData.data)
                console.log(JSON.stringify(orData))
                dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                function dclsFun(data) {
                    //让待处理全选按钮置为非选中状态
                    $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                    console.log(data.data)
                    var list1 = data.data.result;
                    console.log(data.data.result)
                    $scope.list = data.data.result;
                    $scope.list = JSON.parse(list1);
                    $scope.ordersList = $scope.list.ordersList;
                    console.log($scope.ordersList)
                    $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                    // alert($scope.pcountN)
                    if ($scope.pcountN > 0) {
                        dsp.removeNodataPic($('.orders-list'))
                        dsp.closeLoadPercent($('.orders-list'))
                    } else {
                        addNotSjFun()
                        dsp.closeLoadPercent($('.orders-list'))
                    }
                    logisRemark($scope.list);
                    importFun(); //分页函数
                }

                function dcleFun() {
                    layer.closeAll("loading")
                    dsp.closeLoadPercent($('.orders-list'))
                    dsp.cjMesFun(1);
                }
            })
            //cj商品名字跳转到cj详情页
            $scope.cjdetailhref = function (orditem, spitem) {
                var id = spitem.cjProductId;
                window.open('product-detail.html?id=' + id)
            }
            //商品名字跳转客户后台
            $scope.hrefFun = function (orditem, spitem) {
                console.log(orditem.STORE_NAME)
                var storeName = orditem.STORE_NAME;
                console.log(spitem.product_id)
                var productId = spitem.product_id;
                if (storeName == "Excel Imported") {
                    return;
                } else {
                    window.open('https://' + storeName + '.myshopify.com/admin/products/' + productId)
                }
            }

            function addNotSjFun() {
                dsp.addNodataPic($('.orders-list'), $(window).height() - 171, 47, 0, {width: '100%'},true)
                $('.deal-orders').css('min-height', $('.cj-nodata-pic').height() + 50)
            }

            //cj开始日期搜索
            $("#cj-stime").click(function () {
                var cjendtime = $("#cj-stime").val();
                var interval = setInterval(function () {
                    var endtime2 = $("#cj-stime").val();
                    if (endtime2 != cjendtime) {
                        $scope.ordersList = [];
                        dsp.loadPercent($('.orders-list'), $(window).height() - 210, 47, 0);
                        clearInterval(interval);

                        var orData = {};
                        tjFun(orData)
                        orData.data = JSON.stringify(orData.data)
                        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                        function dclsFun(data) {
                            //让待处理全选按钮置为非选中状态
                            $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                            console.log(data.data)
                            console.log(data.data.result)
                            var list1 = data.data.result;
                            $scope.list = data.data.result;
                            $scope.list = JSON.parse(list1);

                            $scope.ordersList = $scope.list.ordersList;
                            console.log($scope.ordersList)
                            $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                            if ($scope.pcountN > 0) {
                                dsp.removeNodataPic($('.orders-list'))
                                dsp.closeLoadPercent($('.orders-list'))
                            } else {
                                addNotSjFun()
                                dsp.closeLoadPercent($('.orders-list'))
                            }
                            logisRemark($scope.list);
                            importFun(); //分页函数
                        }

                        function dcleFun() {
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            dsp.cjMesFun(1);
                        }
                    }
                }, 100)
            })
            //cj结束日期搜索
            $("#cj-etime").click(function () {
                var cjendtime = $("#cj-etime").val();
                var interval = setInterval(function () {
                    var endtime2 = $("#cj-etime").val();
                    if (endtime2 != cjendtime) {
                        $scope.ordersList = [];
                        dsp.loadPercent($('.orders-list'), $(window).height() - 210, 47, 0);
                        clearInterval(interval);
                        var orData = {};
                        tjFun(orData)
                        orData.data = JSON.stringify(orData.data)
                        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                        function dclsFun(data) {
                            //让待处理全选按钮置为非选中状态
                            $('#z-dcl-ord .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                            console.log(data.data)
                            var list1 = data.data.result;
                            $scope.list = data.data.result;
                            $scope.list = JSON.parse(list1);
                            console.log($scope.list)
                            $scope.ordersList = $scope.list.ordersList;
                            console.log($scope.ordersList)
                            $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                            if ($scope.pcountN > 0) {
                                dsp.removeNodataPic($('.orders-list'))
                                dsp.closeLoadPercent($('.orders-list'))
                            } else {
                                addNotSjFun()
                                dsp.closeLoadPercent($('.orders-list'))
                            }
                            logisRemark($scope.list);
                            importFun(); //分页函数
                        }

                        function dcleFun() {
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            dsp.cjMesFun(1);
                        }
                    }
                }, 100)
            })


            $scope.cgxPageSize = '50';
            $scope.cgxPageNum = '1';
            if (localStorage.getItem('isOpenDraft')) {
                openDFun();
            }
            // 草稿箱 弹框
            $scope.errorArr = [];
            $scope.openDraftFun = function () {
                localStorage.setItem('isOpenDraft', 1);
                location.reload();
            }
            $scope.mesOrdIndex = 0;
            $scope.draftFun = function () {
                $('.draft-wrap').css({display: 'block'});
                $('.draft-wrap table thead tr th img').attr('src', 'static/image/direct-orders/multiple1.png');
                $('.draft-wrap table tbody tr td img').attr('src', 'static/image/direct-orders/multiple1.png');
                layer.load(2);
                dsp.postFun('app/order/getErrorAnalysisOrder', JSON.stringify(orData), con, err)

                function con(res) {
                    console.log(res.data);
                    layer.closeAll("loading");
                    $scope.listArr = res.data;
                    $scope.mesOrdIndex = 0;
                    for (var i = 0; i < $scope.listArr.length; i++) {
                        console.log($scope.listArr[i].message)
                        console.log(i)
                        $scope.listArr[i].message = JSON.parse($scope.listArr[i].message);
                        console.log($scope.listArr[i].message)
                        for (var j = 0; j < $scope.listArr[i].message.length; j++) {
                            $scope.mesOrdIndex++;
                            $scope.listArr[i].message[j].index = $scope.mesOrdIndex;
                        }
                    }
                    console.log($scope.listArr);
                    if ($scope.listArr.length == 0) {
                        $scope.noDataFound = true;
                    }

                    setTimeout(function () {
                        $('.draft-wrap table tbody tr td input').focus(function () {
                            $(this).css({backgroundColor: '#ccc'});

                        })
                        $('.draft-wrap table tbody tr td input').blur(function () {
                            $(this).css({backgroundColor: '#fff'});
                        });

                    }, 500);

                };

                function err(res) {
                    console.log(res);
                    $scope.noDataFound = true;
                    layer.closeAll("loading");

                }
            }
            //筛选
            $scope.showSkuFun = function () {
                $scope.skuFilterFlag = true;
                var sfLenth = $scope.listArr.length;
                $scope.skuList = [];
                for (var i = 0; i < sfLenth; i++) {
                    for (var j = 0; j < $scope.listArr[i].message.length; j++) {
                        if ($scope.skuList.length > 0) {
                            for (var k = 0; k < $scope.skuList.length; k++) {
                                if ($scope.listArr[i].message[j].sku == $scope.skuList[k]) {
                                    break;
                                }
                                if (k == $scope.skuList.length - 1) {
                                    $scope.skuList.push($scope.listArr[i].message[j].sku)
                                }
                            }
                        } else {
                            $scope.skuList.push($scope.listArr[i].message[j].sku)
                        }
                    }
                }
            }
            $scope.closeFSkuFun = function () {
                $scope.skuFilterFlag = false;
            }
            //选中后筛选
            $scope.sureFilSkuFun = function () {
                $scope.skuFilterFlag = false;
                var skuArr = [];
                $('.sku-div .zcheckbox').each(function () {
                    if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
                        skuArr.push($(this).siblings('.item-sku').text())
                    }
                })

                console.log(skuArr)
                console.log($scope.listArr)
                var sfLenth = $scope.listArr.length;
                var filterLen = skuArr.length;
                var arr = [];
                $scope.mesOrdIndex = 0;
                for (var i = 0; i < sfLenth; i++) {
                    // var te=[];
                    for (var j = 0; j < $scope.listArr[i].message.length; j++) {
                        for (var k = 0; k < filterLen; k++) {
                            if ($scope.listArr[i].message[j].sku == skuArr[k]) {
                                $scope.listArr[i].message[j].isShow = false;
                                $scope.mesOrdIndex++;
                                $scope.listArr[i].message[j].index = $scope.mesOrdIndex;
                                break;
                            } else {
                                $scope.listArr[i].message[j].isShow = true;
                            }
                        }

                    }
                }
                console.log($scope.listArr)
            }
            $('.sku-div').on('click', '.zcheckbox', function (event) {
                if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
                    $(this).attr('src', 'static/image/direct-orders/multiple2.png');
                } else if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
                    $(this).attr('src', 'static/image/direct-orders/multiple1.png');
                }
            })

            function openDFun() {
                $('.draft-wrap').css({display: 'block'});
                $('.draft-wrap table thead tr th img').attr('src', 'static/image/direct-orders/multiple1.png');
                $('.draft-wrap table tbody tr td img').attr('src', 'static/image/direct-orders/multiple1.png');
                layer.load(2);
                var cgxData = {};
                cgxData.pageSize = $scope.cgxPageSize;
                cgxData.pageNum = $scope.cgxPageNum;
                console.log(JSON.stringify(cgxData))
                dsp.postFun('app/order/getErrorAnalysisOrder', JSON.stringify(cgxData), con, err)

                function con(res) {
                    console.log(res.data);
                    $scope.cgxTotal = res.data.count;
                    console.log($scope.cgxTotal)
                    layer.closeAll("loading");
                    $scope.listArr = res.data.list;
                    var sfLenth = $scope.listArr.length;
                    $scope.skuList = [];
                    $scope.mesOrdIndex = 0;
                    for (var i = 0; i < sfLenth; i++) {
                        console.log(i)
                        $scope.listArr[i].message = $scope.listArr[i].message.replace(/[\r\n\t]/g, "");
                        $scope.listArr[i].message = JSON.parse($scope.listArr[i].message);
                        for (var j = 0; j < $scope.listArr[i].message.length; j++) {
                            $scope.listArr[i].message[j].isShow = false;
                            if ($scope.skuList.length > 0) {
                                for (var k = 0; k < $scope.skuList.length; k++) {
                                    if ($scope.listArr[i].message[j].sku == $scope.skuList[k]) {
                                        break;
                                    }
                                    if (k == $scope.skuList.length - 1) {
                                        $scope.skuList.push($scope.listArr[i].message[j].sku)
                                    }
                                }
                            } else {
                                $scope.skuList.push($scope.listArr[i].message[j].sku)
                            }
                            $scope.mesOrdIndex++;
                            $scope.listArr[i].message[j].index = $scope.mesOrdIndex;
                            console.log($scope.mesOrdIndex)
                        }
                    }
                    console.log($scope.listArr)
                    console.log($scope.skuList);
                    if ($scope.listArr.length == 0) {
                        $scope.noDataFound = true;
                    }
                    cgxFyFun()
                    setTimeout(function () {
                        $('.draft-wrap table tbody tr td input').focus(function () {
                            $(this).css({backgroundColor: '#ccc'});
                        })
                        $('.draft-wrap table tbody tr td input').blur(function () {
                            $(this).css({backgroundColor: '#fff'});
                        });
                    }, 500);
                };

                function err(res) {
                    console.log(res);
                    $scope.noDataFound = true;
                    layer.closeAll("loading");

                }
            }

            function cgxFyFun() {
                if ($scope.cgxTotal < 1) {
                    layer.closeAll("loading")
                    dsp.closeLoadPercent($('.orders-list'))
                    return;
                }
                $(".cgx-pag-dom").jqPaginator({
                    totalCounts: $scope.cgxTotal - 0, //设置分页的总条目数
                    pageSize: $scope.cgxPageSize - 0, //设置每一页的条目数
                    visiblePages: 5,
                    currentPage: $scope.cgxPageNum - 0,
                    activeClass: 'active',
                    first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
                    prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
                    next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
                    last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
                    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                    onPageChange: function (n, type) {
                        console.log(n)
                        console.log(type)
                        if (type == 'init') {
                            layer.closeAll("loading")
                            dsp.closeLoadPercent($('.orders-list'))
                            return;
                        }
                        $scope.cgxPageNum = n + '';
                        openDFun()
                    }
                });
            }

            $scope.cgxChangeFun = function () {
                $scope.cgxPageNum = '1';
                openDFun()
            }
            $scope.cgxGoFun = function () {
                var pageCount = Math.ceil($scope.cgxTotal / $scope.cgxPageNum)
                console.log(pageCount)
                if (pageCount < $scope.cgxPageNum) {
                    layer.msg('Please input number less than page amount.');
                    return;
                }
                openDFun()
            }
            var draftSelectNum = 0;
            // 选中一条
            $scope.selectItemFun = function ($event) {
                if ($($event.target).attr('src') == 'static/image/direct-orders/multiple1.png') {
                    $($event.target).attr('src', 'static/image/direct-orders/multiple2.png');
                    draftSelectNum++;
                    if (draftSelectNum == $('.draft-box .selectBtn .xuhao-sty').length) {
                        $('.draft-box .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
                    }

                } else if ($($event.target).attr('src') == 'static/image/direct-orders/multiple2.png') {
                    $($event.target).attr('src', 'static/image/direct-orders/multiple1.png');
                    draftSelectNum--;
                    if (draftSelectNum != $('.draft-box .selectBtn .xuhao-sty').length) {
                        $('.draft-box .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                    }
                }
                console.log(draftSelectNum);
            }

            // 全选
            $scope.selectAllFun = function ($event) {
                if ($($event.target).attr('src') == 'static/image/direct-orders/multiple1.png') {
                    $($event.target).attr('src', 'static/image/direct-orders/multiple2.png');
                    draftSelectNum = $('.draft-box .selectBtn .xuhao-sty').length;
                    $('.draft-box .selectBtn .xuhao-sty').children('img').attr('src', 'static/image/direct-orders/multiple2.png');
                } else {
                    $($event.target).attr('src', 'static/image/direct-orders/multiple1.png');
                    draftSelectNum = 0;
                    $('.draft-box .selectBtn .xuhao-sty').children('img').attr('src', 'static/image/direct-orders/multiple1.png');
                }

            }

            // Cancel 按钮
            $scope.draftCancelFun = function () {
                localStorage.removeItem('isOpenDraft');
                $('.draft-wrap').css({display: 'none'});
                $('.draft-wrap table thead tr th img').attr('src', 'static/image/direct-orders/multiple1.png');
                $('.draft-wrap table tbody tr td img').attr('src', 'static/image/direct-orders/multiple1.png');
                $scope.ordersList = [];
                dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                var showList = $('#dcl-sel').val() - 0;
                var orData = {};
                tjFun(orData)
                orData.data = JSON.stringify(orData.data)
                dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

                function dclsFun(data) {
                    console.log(data.data)
                    var list1 = data.data.result;
                    $scope.list = JSON.parse(list1);

                    $scope.ordersList = $scope.list.ordersList;
                    console.log($scope.ordersList)
                    $scope.pcountN = $scope.list.countNumber; //获取总订单的条数
                    // layer.msg('Please check the failed ones on the Draft.')
                    if ($scope.pcountN > 0) {
                        dsp.removeNodataPic($('.orders-list'))
                        dsp.closeLoadPercent($('.orders-list'))
                    } else {
                        addNotSjFun()
                        dsp.closeLoadPercent($('.orders-list'))
                    }
                    $scope.ordstatusNum = $scope.list.allOrderCount2; //各种状态订单的数量
                    logisRemark($scope.list);
                    importFun(); //分页函数
                    numFun(); //调用给订单赋值的函数
                }

                function dcleFun() {
                    layer.closeAll("loading")
                    dsp.closeLoadPercent($('.orders-list'))
                    dsp.cjMesFun(1);
                }
            }

            // submit 按钮
            $scope.submitList = [];
            $scope.draftSubmitFun = function () {
                if (draftSelectNum > 0) {
                    var submitDraft = {};
                    var trID = [];
                    var trMessage = [
                        ["ordernumber", "sku", "quantity", "producttitle", "customername", "address1", "address2", "city", "province", "zip", "country", "shippingphonenumber", "taxnumber", "shipstationid", "logisticsType", "datasource", "shippingMethodId", "productId", "salesorderrowid", "warehouse", "price", "currency"]
                    ];
                    $('.draft-box .zcheckbox').each(function () {
                        if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {

                            console.log($(this).parent().siblings('.draft-id').children('input').val());

                            var trid = $(this).parent().parent().siblings('.draft-id').children('input').val();
                            var OrderNumber = $(this).parent().parent().siblings('.draf-order-num').children('input').val();
                            var SKU = $(this).parent().parent().siblings('.draf-sku').children('input').val();
                            var Quantity = $(this).parent().parent().siblings('.draf-quantity').children('input').val();
                            var ProductTitle = $(this).parent().parent().siblings('.draf-product-title').children('input').val();
                            var CustomerName = $(this).parent().parent().siblings('.draf-customer-name').children('input').val();

                            var Address1 = $(this).parent().parent().siblings('.draft-address1').children('input').val();
                            var Address2 = $(this).parent().parent().siblings('.draft-address2').children('input').val();
                            var City = $(this).parent().parent().siblings('.draft-city').children('input').val();
                            var Province = $(this).parent().parent().siblings('.draft-province').children('input').val();
                            var ZIP = $(this).parent().parent().siblings('.draft-zip').children('input').val();
                            var Country = $(this).parent().parent().siblings('.draft-country').children('input').val();
                            var ShippPhoneNum = $(this).parent().parent().siblings('.draft-shop-phonenum').children('input').val();
                            var taxNumber = $(this).parent().parent().siblings('.draft-tax-number').children('input').val();
                            var Describe = $(this).parent().parent().siblings('.draft-describe').children('input').val();
                            var Shipstationid = $(this).parent().parent().siblings('.draft-shipstationid').children('input').val();
                            var draftLogistic = $(this).parent().parent().siblings('.draft-logistictype').children('input').val();
                            var datasource = $(this).parent().parent().siblings('.datasource-td').children('input').val();
                            var shippingMethodId = $(this).parent().parent().siblings('.shippingMethodId-td').children('input').val();
                            var productId = $(this).parent().parent().siblings('.productid-td').children('input').val();
                            var price = $(this).parent().parent().siblings('.price-td').children('input').val();
                            var currency = $(this).parent().parent().siblings('.currency-td').children('input').val();
                            var salesorderrowid = $(this).parent().parent().siblings('.selesid-td').children('input').val();
                            var warehouse = $(this).parent().parent().siblings('.warehouse-td').children('input').val();
                            console.log(Shipstationid)
                            console.log(productId)
                            var tr1message = [OrderNumber, SKU, Quantity, ProductTitle, CustomerName, Address1, Address2, City, Province, ZIP, Country, ShippPhoneNum, taxNumber, Shipstationid, draftLogistic, datasource, shippingMethodId, productId, salesorderrowid, warehouse, price, currency];
                            trID.push(trid);
                            trMessage.push(tr1message);
                            submitDraft.id = trID;
                            submitDraft.message = trMessage;
                            console.log(tr1message)
                        }
                    })
                    console.log(trID);
                    console.log(trMessage);
                    console.log(submitDraft);
                    $scope.submitTip = true;
                    $scope.deleteTip = false;
                    $('.btnsTip').css({display: 'block'});
                    $scope.yesFun = function () {
                        // alert('submit');
                        $('.btnsTip').css({display: 'none'});
                        dsp.postFun('order/oldOrder/reAnalysisOrder', JSON.stringify(submitDraft), draftcFun, drafteFun)

                        function draftcFun(res) {
                            console.log(res);
                            console.log(res.data);
                            var restr = JSON.parse(res.data.message);
                            console.log(restr);
                            layer.closeAll("loading");
                            if (res.data.statusCode == '200' && restr.result == 'true') {
                                openDFun()
                                $scope.ProductNum = restr.totalNumber - 0;
                                $scope.SuccessNum = restr.success - 0;
                                $scope.FailedNum = restr.nothing - 0;
                                $scope.TotalNum = $scope.SuccessNum + $scope.FailedNum;
                                $('.ordersTip').css({display: 'block'});
                                $scope.confirmFun = function () {
                                    $('.ordersTip').css({display: 'none'});
                                }
                            }
                            if (res.data.statusCode != '200') {
                                layer.msg("Submit Failed!");
                            }

                        };

                        function drafteFun(res) {
                            console.log(res);
                            layer.closeAll("loading");
                            layer.msg("Submit failed!")
                        }

                    }
                    $scope.noFun = function () {
                        // alert('submit');
                        $('.btnsTip').css({display: 'none'});
                    }

                } else {
                    layer.msg('Please select orders！');
                }

            }

            // Save 按钮

            $scope.draftSaveFun = function () {
                // alert(draftSelectNum);

                if (draftSelectNum > 0) {
                    var saveDraft = {};
                    var trID = [];
                    var UUID = [];
                    var trMessages = [];

                    $('.draft-box .zcheckbox').each(function () {
                        if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
                            var trmessage = {};
                            var trid = $(this).parent().parent().siblings('.draft-id').children('input').val();
                            var OrderNumber = $(this).parent().parent().siblings('.draf-order-num').children('input').val();
                            var SKU = $(this).parent().parent().siblings('.draf-sku').children('input').val();
                            var Quantity = $(this).parent().parent().siblings('.draf-quantity').children('input').val();
                            var ProductTitle = $(this).parent().parent().siblings('.draf-product-title').children('input').val();
                            var CustomerName = $(this).parent().parent().siblings('.draf-customer-name').children('input').val();
                            var uuid = $(this).parent().parent().siblings('.draft-uuid').children('input').val();
                            var Address1 = $(this).parent().parent().siblings('.draft-address1').children('input').val();
                            var Address2 = $(this).parent().parent().siblings('.draft-address2').children('input').val();
                            var City = $(this).parent().parent().siblings('.draft-city').children('input').val();
                            var Province = $(this).parent().parent().siblings('.draft-province').children('input').val();
                            var ZIP = $(this).parent().parent().siblings('.draft-zip').children('input').val();
                            var Country = $(this).parent().parent().siblings('.draft-country').children('input').val();
                            var ShippPhoneNum = $(this).parent().parent().siblings('.draft-shop-phonenum').children('input').val();
                            var taxNumber = $(this).parent().parent().siblings('.draft-tax-number').children('input').val();
                            var Describe = $(this).parent().parent().siblings('.draft-describe').children('input').val();
                            var YY = $(this).siblings('.yy').text();
                            var HH = $(this).siblings('.hh').text();
                            var Shipstationid = $(this).parent().parent().siblings('.draft-shipstationid').children('input').val();
                            var datasource = $(this).parent().parent().siblings('.datasource-td').children('input').val();
                            var shippingMethodId = $(this).parent().parent().siblings('.shippingMethodId-td').children('input').val();
                            var productId = $(this).parent().parent().siblings('.productid-td').children('input').val();
                            var price = $(this).parent().parent().siblings('.price-td').children('input').val();
                            var currency = $(this).parent().parent().siblings('.currency-td').children('input').val();
                            var salesorderrowid = $(this).parent().parent().siblings('.selesid-td').children('input').val();
                            var warehouse = $(this).parent().parent().siblings('.warehouse-td').children('input').val();
                            console.log(Shipstationid)
                            console.log($(this).parent().parent().siblings('.draft-shipstationid').children('input'))

                            trmessage.zip = ZIP;
                            trmessage.error = Describe;
                            trmessage.customername = CustomerName;
                            trmessage.address1 = Address1;
                            trmessage.address2 = Address2;
                            trmessage.city = City;
                            trmessage.province = Province;
                            trmessage.shippingphonenumber = ShippPhoneNum;
                            trmessage.ordernumber = OrderNumber;
                            trmessage.producttitle = ProductTitle;
                            trmessage.quantity = Quantity;
                            trmessage.sku = SKU;
                            trmessage.country = Country;
                            trmessage.yyhh = YY;
                            trmessage.hh = HH;
                            trmessage.shipstationid = Shipstationid;
                            trmessage.datasource = datasource;
                            trmessage.shippingMethodId = shippingMethodId;
                            trmessage.productId = productId;
                            trmessage.price = price;
                            trmessage.currency = currency;
                            trmessage.salesorderrowid = salesorderrowid;
                            trmessage.warehouse = warehouse;
                            trmessage.taxnumber = taxNumber;
                            console.log(trmessage);

                            UUID.push(uuid);
                            trID.push(trid);
                            trMessages.push(trmessage);
                            saveDraft.id = trID;
                            saveDraft.uuids = UUID;
                            saveDraft.messages = trMessages;

                        }
                    })

                    // console.log(trID);
                    console.log(trMessages);
                    console.log(saveDraft);
                    layer.load(2);
                    dsp.postFun('app/order/upAnalysisOrder', JSON.stringify(saveDraft), draftcFun, drafteFun)

                    function draftcFun(res) {
                        console.log(res);
                        layer.closeAll("loading");
                        layer.msg("Save successfully!");

                    };

                    function drafteFun(res) {
                        console.log(res);
                        layer.closeAll("loading");
                    }

                } else {
                    layer.msg('Please select orders！');
                }

            }

            // Delete 按钮
            $scope.draftDeleteFun = function () {
                // alert(draftSelectNum);
                if (draftSelectNum > 0) {
                    var errorIds = {};
                    var ids = [];
                    var uuids = [];
                    $('.draft-box .zcheckbox').each(function () {
                        if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
                            var trid = $(this).parent().parent().siblings('.draft-id').children('input').val();
                            var uuid = $(this).parent().parent().siblings('.draft-uuid').children('input').val();
                            ids.push(trid);
                            uuids.push(uuid);
                            // $(this).parent().parent().remove();
                            $(this).attr('src') == 'static/image/direct-orders/multiple1.png'
                            console.log($(this).parent().parent());

                        }
                    })

                    errorIds.ids = ids;
                    errorIds.uuids = uuids;
                    console.log(ids)
                    console.log(uuids)
                    console.log(errorIds);
                    $scope.submitTip = false;
                    $scope.deleteTip = true;
                    $('.btnsTip').css({display: 'block'});
                    $scope.yesFun = function () {
                        // alert('del');
                        $('.btnsTip').css({display: 'none'});
                        layer.load(2);
                        dsp.postFun('app/order/deleteErrorAnalysisOrder', JSON.stringify(errorIds), draftcFun, drafteFun)

                        function draftcFun(res) {
                            console.log(res);
                            layer.closeAll("loading");
                            layer.msg("Delete successfully!");
                            // $scope.draftFun();
                            openDFun()

                        };

                        function drafteFun(res) {
                            console.log(res);
                            layer.closeAll("loading");

                        }

                    }
                    $scope.noFun = function () {
                        // alert('del');
                        $('.btnsTip').css({display: 'none'});
                    }

                } else {
                    layer.msg('Please select orders！');
                }


            }


            //检查没有拉取到订单的原因
            $scope.noOrdResonFlag = false;
            $scope.resResonFlag = false; //展示后台返回的没有订单原因的弹框
            $scope.isSelTimeFlag = true;
            $scope.noOrdResonFun = (event) => {
                event.stopPropagation();
                $scope.noOrdResonFlag = true;
            }
            $scope.noOrdSureFun = function () {
                if ($scope.shopOrdNum == 'undefined' || $scope.shopOrdNum == '') {
                    layer.msg('Please enter the order number in your shop.')
                    return;
                }
                $scope.productYmBtn = false;
                layer.load(2);
                dsp.postFun('app/order/checkSyncOrder', {
                    customerOrderId: $scope.shopOrdNum
                }, function (data) {
                    console.log(data)
                    // layer.closeAll("loading")
                    $scope.noOrdResonFlag = false;
                    if (data.data.result != '') {
                        var cusOrdNum = $scope.shopOrdNum;
                        if (data.data.result == '1') {
                            if ($scope.shopOrdNum.indexOf('#') == -1) {
                                dsp.postFun('app/order/checkSyncOrder', {
                                    customerOrderId: '#' + cusOrdNum
                                }, function (data) {
                                    layer.closeAll("loading")
                                    $scope.resResonFlag = true; //打开订单未拉取的原因
                                    $('.no-ordres-reson').text(data.data.result)
                                    if (data.data.result == '1') {
                                        $scope.isSelTimeFlag = false;
                                        if (data.data.data == '1') {
                                            $scope.seaNowTime = "Sorry, we has not pulled this order from your store yet."
                                        } else {
                                            $scope.seaNowTime = data.data.date;
                                        }
                                    }
                                }, function (data) {
                                    layer.closeAll("loading")
                                    console.log(data)
                                })
                            } else {
                                cusOrdNum = cusOrdNum.replace('#', '')
                                console.log(cusOrdNum)
                                dsp.postFun('app/order/checkSyncOrder', {
                                    customerOrderId: cusOrdNum
                                }, function (data) {
                                    layer.closeAll("loading")
                                    $scope.resResonFlag = true; //打开订单未拉取的原因
                                    $('.no-ordres-reson').text(data.data.result)
                                    if (data.data.result == '1') {
                                        $scope.isSelTimeFlag = false;
                                        if (data.data.data == '1') {
                                            $scope.seaNowTime = "Sorry, we has not pulled this order from your store yet."
                                        } else {
                                            $scope.seaNowTime = data.data.date;
                                        }
                                    }
                                }, function (data) {
                                    layer.closeAll("loading")
                                    console.log(data)
                                })
                            }
                        } else {
                            layer.closeAll("loading")
                            $scope.resResonFlag = true; //打开订单未拉取的原因
                            $('.no-ordres-reson').text(data.data.result)
                            if (data.data.result.indexOf('It looks that you had modified your store products recently') != -1) {
                                $scope.productYmBtn = true;
                            }
                            console.log(data.data)
                        }

                    } else {
                        layer.closeAll("loading")
                        layer.msg('The query fails.')
                    }
                }, function (data) {
                    layer.closeAll("loading")
                    console.log(data)
                })
            }
            $scope.productLinkFun = function () {
                window.open('#/products-connection/connected')
            }
            $scope.noOrdQxFun = function () {
                $scope.noOrdResonFlag = false;
            }
            $scope.closeResReasonFun = function () {
                $scope.resResonFlag = false;
                $('.no-ordres-reson').text('');
            }
            //查看订单状态的下拉框
            $scope.syStuFlag = false;
            //更新订单
            var issyFlag = localStorage.getItem('issy')
            console.log(issyFlag)
            if (issyFlag) {
                $scope.syStuFlag = true;
                localStorage.setItem('issy', 1)
                $scope.syStu = 1;
                // app/order
                dsp.postFun('order/oldOrder/getNewestOrder', {
                    type: 'start'
                }, function (data) {
                    console.log(data)
                    if (data.data.result != 'error') {
                        $scope.resOrdStu = data.data.result - 0;
                    }
                    console.log($scope.resOrdStu)
                    if ($scope.resOrdStu != 5) {
                        var stuTimer = setInterval(function () {
                            getOrdSyFun()
                            // console.log('567')
                            if ($scope.resOrdStu == 5) {
                                localStorage.removeItem('issy')
                                $scope.syStu = 2;
                                $('.reordstu-dlist').animate({
                                    height: '360px'
                                }, 300);
                                clearInterval(stuTimer)
                            }
                        }, 5000)
                        console.log(stuTimer)
                    } else {
                        $scope.syStu = 0;
                        localStorage.removeItem('issy')
                    }
                }, function (data) {
                    console.log(data)
                })
            }
            $scope.changesyFun = function () {
                if ($scope.syStuFlag) {
                    $scope.syStuFlag = false;
                } else {
                    $scope.syStuFlag = true;
                }
            }
            $scope.syStu = 0;
            $scope.resOrdStu = 0;
            $scope.startSyFun = function () {

                localStorage.setItem('issy', 1)
                $scope.syStu = 1;
                console.log($scope.isSelTimeFlag)
                var syUpdata = {};
                syUpdata.type = 'start';
                if (!$scope.isSelTimeFlag) {
                    if (!$('#seaord-stime').val() || !$('#seaord-etime').val()) {
                        layer.msg('Please select time')
                        localStorage.removeItem('issy')
                        return;
                    }
                    syUpdata.startDate = $('#seaord-stime').val();
                    syUpdata.endDate = $('#seaord-etime').val();
                }
                dsp.postFun('order/oldOrder/getNewestOrder', JSON.stringify(syUpdata), function (data) {
                    console.log(data)
                    if (data.data.result == 'error') {
                        $scope.timeIsNValid = true;
                        layer.msg('Please enter the time as required')
                        return;
                    } else {
                        $scope.timeIsNValid = false;
                        $scope.resOrdStu = data.data.result - 0;
                    }
                    $scope.syStuFlag = true; //显示订单状态的面板
                    $scope.resResonFlag = false;
                    console.log($scope.resOrdStu)
                    if ($scope.resOrdStu != 5) {
                        var stuTimer = setInterval(function () {
                            getOrdSyFun()
                            console.log('567')
                            if ($scope.resOrdStu == 5) {
                                localStorage.removeItem('issy')
                                $scope.syStu = 2;
                                $('.reordstu-dlist').animate({
                                    height: '360px'
                                }, 300);
                                clearInterval(stuTimer)
                            }
                        }, 5000)
                        console.log(stuTimer)
                    } else {
                        $scope.syStu = 0;
                        localStorage.removeItem('issy')
                    }
                }, function (data) {
                    console.log(data)
                })
            }

            function getOrdSyFun() {
                var syUpdata = {};
                syUpdata.type = 'continue';
                dsp.postFun('order/oldOrder/getNewestOrder', JSON.stringify(syUpdata), function (data) {
                    if (data.data.result != 'error') {
                        $scope.resOrdStu = data.data.result - 0;
                    }
                }, function (data) {
                    console.log(data)
                })
            }

            //精确按时间查找订单
            $scope.detailSeaOrdFun = function () {
                console.log($('#seaord-stime').val())
                console.log($('#seaord-etime').val())
                console.log($('#seaord-stime').val().length)
                console.log($('#seaord-etime').val().length)
                console.log(!$('#seaord-etime').val())
                $scope.startSyFun();
            }

            //手动创建代发单
            $scope.searchFor = "sku"
            $scope.addProList = []
            $scope.addNameList = []
            $scope.searchForName = false
            $scope.cjdfdInfoFlag = false
            $scope.cjdfdResult = false
            $scope.totalPrice = 0
            $scope.totalCount = 0
            $scope.address = {
                countryCode: "",
                logistics: [],
                shipCost: 0,
                transferAreaId: ""
            }
            $scope.formVerify = {
                shippingAddress: true,
                countryCode: true,
                province: true,
                city: true,
                customerName: true,
                phone: true,
                zip: true,
                logisticsType: true,
                orderNumber: true,
                transferAreaId: true
            }
            console.log($scope)
            $scope.addProductList = function () {
                let key = $scope.searchFor
                if (!$scope.searchWord) {
                    layer.msg("Please enter keywords")
                    return
                }
                if ($scope.searchFor == "sku") {
                    layer.load(2)
                    dsp.postFun('order/manualAddCjorderController/getProductSku', {[key]: $scope.searchWord}, function (data) {
                        console.log(data)
                        layer.closeAll("loading")
                        if (data.data.statusCode == 200) {
                            const {SKU, variants} = data.data.result
                            const specs = []
                            variants.forEach(item => {
                                specs.push(item.VARIANTKEY)
                            })
                            data.data.result.specs = specs
                            data.data.result.itemCount = 1;
                            let osellPrice = data.data.result.nowPrice ? data.data.result.nowPrice : data.data.result.SELLPRICE;
                            data.data.result.subs = parseFloat(osellPrice * data.data.result.itemCount).toFixed(2);
                            let isAdd = true;
                            $scope.addProList.forEach(item => {
                                if (item.SKU == SKU) {
                                    item.itemCount += 1;
                                    let oprice = item.nowPrice ? item.nowPrice : item.SELLPRICE;
                                    item.subs = parseFloat(oprice * item.itemCount).toFixed(2)
                                    isAdd = false
                                }
                            })
                            if (isAdd) {
                                $scope.addProList.push(data.data.result)
                            }
                            checkPrice()
                        } else {
                            layer.msg("The SKU does not exist, please enter a new one.")
                            $scope.searchWord = ""
                        }
                    })
                } else {
                    searchForNameList(1, '5')
                }

            }

            function searchForNameList(pageNum, pageSize) {
                $scope.allProductFlag = false //默认全选
                let key = $scope.searchFor
                $scope.nameListPageSize = pageSize
                $scope.nameListPageNum = pageNum
                layer.load(2)
                dsp.postFun('order/manualAddCjorderController/getProductsName', {
                    [key]: $scope.searchWord,
                    pageNum,
                    pageSize
                }, function (data) {
                    layer.closeAll("loading")
                    if (data.data.statusCode == 200) {
                        const res = data.data.result
                        $scope.nameListPageCount = res.count
                        $scope.$broadcast('page-data', {
                            pageNum,
                            totalNum: Math.ceil(res.count / $scope.nameListPageSize),
                            totalCounts: res.count,
                            pageSize,
                            pagesizeList: ['5', '10', '20', '30']
                        })
                        const arr = res.list
                        $scope.searchForName = true
                        arr.forEach(item => {
                            item.itemCount = 1
                            item.subs = parseFloat(item.SELLPRICE * 1).toFixed(2)
                            const specs = []
                            item.variants.forEach(it => {
                                specs.push(it.VARIANTKEY)
                            })
                            item.specs = specs
                            //item.VARIANTKEY = item.ASVARIANTKEY
                        })
                        $scope.addNameList = arr
                    } else {
                        layer.msg("Sorry, the data is not found.")
                        $scope.searchWord = ""
                    }

                })
            }

            $scope.$on('pagedata-fa', function (d, data) {//分页切换数据监听
                console.log(data)
                const {pageNum, pageSize} = data
                let isTip = false
                $scope.addNameList.forEach(item => {
                    if (item.check) {
                        isTip = true
                    }
                })
                if (isTip) {
                    layer.msg("Please add the selected products to the order list.")
                }
                searchForNameList(pageNum, pageSize)
            })

            function checkPrice() {
                $scope.totalPrice = 0
                $scope.totalCount = 0
                $scope.addProList.forEach(item => {
                    $scope.totalPrice += Number(item.subs)
                    $scope.totalCount += Number(item.itemCount)
                })
            }

            $scope.changeSpec = function (key, idx) {
                console.log(key)
                console.log(idx)
                console.log($scope.addProList)
                $scope.addProList[idx].variants.forEach(item => {
                    if (item.VARIANTKEY == key) {
                        let osub = item.nowPrice ? item.nowPrice : item.SELLPRICE;
                        $scope.addProList[idx] = {
                            ID: item.ID,
                            IMG: item.IMG,
                            NAMEEN: item.NAMEEN,
                            PID: item.PID,
                            SELLPRICE: item.SELLPRICE,
                            nowPrice: item.nowPrice,
                            SKU: item.SKU,
                            itemCount: $scope.addProList[idx].itemCount,
                            VARIANTKEY: key,
                            specs: $scope.addProList[idx].specs,
                            variants: $scope.addProList[idx].variants,
                            subs: parseFloat(osub * $scope.addProList[idx].itemCount).toFixed(2)
                        }
                    }
                })
                $scope.addProList = uniq($scope.addProList, "SKU")
                checkPrice()
            }
            $scope.deleProList = function (pro) {
                console.log(pro)
                $scope.addProList.forEach((item, idx) => {
                    if (item.SKU == pro.SKU) {
                        $scope.addProList.splice(idx, 1)
                    }
                })
                checkPrice()
            }
            $scope.closeAddPro = closeAllCreateOrder

            function closeAllCreateOrder() {
                $scope.searchFor = "sku"
                $scope.searchWord = ""
                $scope.addProList = []
                $scope.searchForName = false
                $scope.creatAddProductFlag = false
                $scope.totalPrice = 0
                $scope.totalCount = 0
            }

            $scope.minusOne = function (count, idx) {
                if (count == 1) return
                $scope.addProList[idx].itemCount -= 1
                const {itemCount, SELLPRICE, nowPrice} = $scope.addProList[idx];
                let oprice = nowPrice ? nowPrice : SELLPRICE;
                $scope.addProList[idx].subs = parseFloat(oprice * itemCount).toFixed(2)
                checkPrice()
            }
            $scope.plusOne = function (count, idx) {
                $scope.addProList[idx].itemCount += 1
                const {itemCount, SELLPRICE, nowPrice} = $scope.addProList[idx];
                let oprice = nowPrice ? nowPrice : SELLPRICE;
                $scope.addProList[idx].subs = parseFloat(oprice * itemCount).toFixed(2)
                checkPrice()
            }
            $scope.changeCount = function (count, idx) {
                console.log(count)
                var reg = /^[1-9]\d*(\.\d+)?$/i
                if (reg.test(count)) {
                    $scope.addProList[idx].itemCount = parseInt(count);
                } else {
                    $scope.addProList[idx].itemCount = 1
                }
                const {itemCount, SELLPRICE, nowPrice} = $scope.addProList[idx];
                let oprice = nowPrice ? nowPrice : SELLPRICE;
                $scope.addProList[idx].subs = parseFloat(oprice * itemCount).toFixed(2);
                checkPrice();
            }

            function uniq(array, gWord) {
                const res = []
                array.map((item) => {
                    let flag = true;
                    res.map((it) => {
                        if (item[gWord] === it[gWord]) {
                            flag = false;
                            it.itemCount += item.itemCount
                            it.subs = parseFloat(it.SELLPRICE * it.itemCount).toFixed(2)
                        }
                        return false
                    })
                    if (flag) {
                        res.push(item);
                    }
                    return false
                })
                return res
            }

            $scope.selectAllPro = function (e) {
                $scope.allProductFlag = e.target.checked
                if ($scope.allProductFlag) {
                    $scope.addNameList.forEach(item => {
                        item.check = true
                    })
                } else {
                    $scope.addNameList.forEach(item => {
                        item.check = false
                    })
                }
            }
            $scope.itemSleletPro = function (e, pro) {
                pro.check = e.target.checked
                if (e.target.checked) {
                    var num = 0;
                    $scope.addNameList.forEach(item => {
                        if (item.check) {
                            num++
                        }
                    })
                    if (num == $scope.addNameList.length) {
                        $scope.allProductFlag = true
                    }
                } else {
                    console.log(99)
                    $scope.allProductFlag = false
                }
            }
            $scope.addNameSearchList = function () {
                const arr = []
                console.log($scope.addNameList)
                $scope.addNameList.forEach(item => {
                    if (item.check) {
                        var objString = JSON.stringify(item);
                        var obj2 = JSON.parse(objString);
                        arr.push(obj2)
                    }
                    item.check = false
                })
                if (arr.length == 0) {
                    layer.msg("Please select products.")
                } else {
                    arr.forEach(item => {
                        let isAdd = true
                        $scope.addProList.forEach(it => {
                            if (it.SKU == item.SKU) {
                                it.itemCount += 1
                                it.subs = parseFloat(it.SELLPRICE * it.itemCount).toFixed(2)
                                isAdd = false
                            }
                        })
                        if (isAdd) {
                            $scope.addProList.push(item)
                        }
                    })
                    $scope.allProductFlag = false
                    layer.msg("Added successfully！")
                }
                checkPrice()
            }

            $scope.closeNameSearch = closeNameSearch

            function closeNameSearch() {
                $scope.searchForName = false
                $scope.allProductFlag = false
            }

            $scope.checkoutOrderList = function () {
                if ($scope.addProList.length == 0) {
                    layer.msg("Please add the product information.")
                } else {
                    $scope.cjdfdInfoFlag = true
                    $scope.productOrPackage = null
                    getShipFrom()
                    getShipingMethod()
                }
            }

            function getShipFrom() {
                dsp.postFun("warehouseBuildWeb/management/getAreaInfoById", {
                    pageNum: 1,
                    pageSize: 10
                }, function (res) {
                    layer.closeAll("loading")
                    //console.log(res)
                    const {code, data} = res.data
                    if (code == 200) {
                        $scope.warehouseList = data
                    }
                })
            }

            $scope.getShipingMethod = getShipingMethod

            function getShipingMethod() {
                const list = []
                console.log($scope.address)
                $scope.addProList.forEach(item => {
                    const li = {
                        id: item.ID,
                        sku: item.SKU,
                        quantity: item.itemCount
                    }
                    list.push(li)
                })
                layer.load(2)
                dsp.postFun("order/manualAddCjorderController/insertOrder", {
                    countryCode: $scope.address.countryCode || "",
                    countLogistics: true,
                    variantsList: list,
                    merchantnNumber: $scope.userId,
                    zip: $scope.address.zip,
                    transferAreaId: $scope.address.transferAreaId || "",
                    phone: $scope.address.phone || ""
                }, function (data) {
                    layer.closeAll("loading")
                    const {statusCode, result} = data.data
                    if (statusCode == 200) {
                        $scope.address.logistics = result.logistics
                        $scope.address.logisticsType = result.logistics[0] ? result.logistics[0].logisticName : ""
                        $scope.address.shipCost = result.logistics[0] ? result.logistics[0].price : 0
                        $scope.packPrice = result.logistics[0] ? result.logistics[0].packPrice : 0
                        $scope.productOrPackage = $scope.productOrPackage ? $scope.productOrPackage : result.productList || []
                        checkTotalAmount()
                    }
                })
            }

            $scope.changeShipMethod = function (name) {
                $scope.address.logistics.forEach(item => {
                    if (item.logisticName == name) {
                        $scope.address.logisticsType = item.logisticName || ""
                        $scope.address.shipCost = item.price || 0
                        $scope.packPrice = item.packPrice || 0
                        checkTotalAmount()
                    }
                })
            }

            function checkTotalAmount() {
                if ($scope.address.shipCost) {
                    $scope.totalAmount = parseFloat($scope.address.shipCost + $scope.totalPrice).toFixed(2)
                } else {
                    $scope.totalAmount = $scope.totalPrice
                }

            }

            $scope.checkoutPhone = function () {
                if ($scope.address.phone) {
                    const phone = $scope.address.phone.replace(/[^\d\+\-\(\)]/g, "");
                    $scope.address.phone = phone
                    getShipingMethod()
                }
            }
            $scope.closeCjdfdInfoFlag = function () {
                $scope.cjdfdInfoFlag = false
                $scope.address = {
                    countryCode: "",
                    logistics: [],
                    shipCost: 0,
                    transferAreaId: ""
                }
                $scope.formVerify = {
                    shippingAddress: true,
                    countryCode: true,
                    province: true,
                    city: true,
                    customerName: true,
                    phone: true,
                    zip: true,
                    logisticsType: true,
                    orderNumber: true,
                    transferAreaId: true
                }
            }
            $scope.closeCjdfdResult = function () {
                $scope.cjdfdResult = false
                freshList() //刷新列表
                closeAllCreateOrder()
                $scope.address = {
                    countryCode: "",
                    logistics: [],
                    shipCost: 0,
                    transferAreaId: ""
                }
            }
            $scope.createOrder = function () {
                let verifyResult = $scope.formVerifyFun();
                //console.log("verifyResult",verifyResult)
                if (!verifyResult) {
                    layer.msg("Please complete the address information.")
                    return;
                }
                console.log($scope.address)
                const variantsList = []
                $scope.addProList.forEach(item => {
                    const li = {
                        id: item.ID,
                        sku: item.SKU,
                        quantity: item.itemCount
                    }
                    variantsList.push(li)
                })
                const params = {
                    ...$scope.address,
                    countLogistics: false,
                    variantsList,
                    merchantnNumber: $scope.userId,

                }
                console.log(params)
                layer.load(2)
                dsp.postFun("order/manualAddCjorderController/insertOrder", params, function (data) {
                    console.log(data)
                    layer.closeAll("loading")
                    if (data.data.statusCode == 200) {
                        $scope.cjdfdInfoFlag = false
                        $scope.creatAddProductFlag = false //关闭前面2个弹窗
                        $scope.cjdfdResult = true //打开结果弹窗
                    }
                })

            }
            // 表单验证
            $scope.formVerifyFun = function () {
                let verifyValue = true;
                for (var key in $scope.formVerify) {
                    if ($scope.address) {
                        $scope.formVerify[key] = $scope.address[key] === null || $scope.address[key] === undefined || $scope.address[key] === '' ? false : true;
                    } else {
                        $scope.formVerify[key] = false;
                    }
                    // console.log(key,'-',$scope.formVerify[key]);
                    if ($scope.formVerify[key] === false) {
                        verifyValue = false;
                    }
                }

                return verifyValue;
            }

            //批量更换发货地区
            $scope.bulkWareFlag = false
            $scope.notifi = false
            $scope.check_All = false
            $scope.zchecked_all = false
            $scope.$watch('ordersList', function () {
                if ($scope.ordersList && $scope.ordersList.length == 0) {
                    $scope.zchecked_all = false
                }
            })
            $scope.bulkWareList = []
            dsp.postFun("warehouseBuildWeb/management/getCountryByAreaId", {}, function (data) {
                console.log(data)
                if (data.data.code == 200) {
                    $scope.areaList = data.data.data
                }
                console.log($scope.areaList)

                // $scope.areaList.forEach(it =>{
                //     console.log(it.areaEn)
                // })

            })
            $scope.blukChangeWare = function () {
                const bulkWareList = []
                $scope.ordersList.forEach(item => {
                    if (item.check) {
                        //item.order.areaId = item.order.areaId || "1" //默认1为中国
                        bulkWareList.push(item)
                    }
                })
                console.log(bulkWareList)
                if (bulkWareList.length == 0) {
                    layer.msg("Please select order(s) first")
                } else {
                    $scope.bulkWareFlag = true
                    $scope.bulkWareList = bulkWareList
                }
            }
            $scope.addressOrderList = []
            $scope.findOrderList = function(value){
                $scope.addressOrderList.indexOf(value)
            }
            $scope.checkOneOrder = function (list) {
                console.log($scope.zchecked_all)
                if (list.check) {
                    list.check = false
                    $scope.addressOrderList = $scope.addressOrderList.filter(item => item !== list.order.ID)
                    $scope.zchecked_all = false;
                } else {
                    list.check = true
                    $scope.addressOrderList.push(list.order.ID)
                    let num = 0;
                    $scope.ordersList.forEach(ele => {
                        if (ele.check) {
                            num++;
                        }
                    });
                    if (num == $scope.ordersList.length) {
                        console.log(num)
                        $scope.zchecked_all = true;
                        $('.zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
                    }
                }
                console.log(list)
                console.log($scope.addressOrderList)
            }

            $scope.checkAllOrder = function () {
                $scope.zchecked_all = !$scope.zchecked_all
                console.log($scope.zchecked_all)
                $scope.ordersList.forEach(item => {
                    if ($scope.zchecked_all) {
                        item.check = true
                        if($scope.addressOrderList.indexOf(item.order.ID) >= 0){
                            $scope.addressOrderList.splice($scope.findOrderList(item.order.ID),1)
                        }
                        $scope.addressOrderList.push(item.order.ID)
                        console.log($scope.addressOrderList)
                    } else {
                        item.check = false
                        $scope.addressOrderList.splice($scope.findOrderList(item.order.ID),1)
                        console.log($scope.addressOrderList)
                    }
                })
                console.log($scope.ordersList)
            }
            // 全选
            $scope.checkAll = function () {
                if ($scope.check_All) {
                    $scope.bulkWareList.forEach(ele => {
                        ele.checkin = true;
                    });
                } else {
                    $scope.bulkWareList.forEach(ele => {
                        ele.checkin = false;
                    });
                }
            };
            // 单选
            $scope.checkOne = function (item) {
                console.log(item)
                if (item.checkin) {
                    let num = 0;
                    $scope.bulkWareList.forEach(ele => {
                        if (ele.checkin) {
                            num++;
                        }
                    });
                    if (num == $scope.bulkWareList.length) {
                        $scope.check_All = true;
                    }
                } else {
                    $scope.check_All = false;
                }
            }
            $scope.closebulkWareFlag = closebulkWareFlag

            function closebulkWareFlag() {
                $scope.bulkWareFlag = false
                $scope.check_All = false;
                $scope.bulkWareList = []
                $scope.notifi = false
            }

            $scope.bulkChangeArea = function () {
                const changeList = []
                $scope.bulkWareList.forEach(item => {
                    if (item.checkin) {
                        changeList.push(item)
                    }
                })
                console.log($scope.bulkWareList)
                if (changeList.length == 0) {
                    layer.msg("Please select order(s) you need to change")
                    return
                }
                if ($scope.shipFrom && $scope.shipTo) {
                    changeList.forEach(item => {
                        if (item.order.areaId == $scope.shipFrom) {
                            item.order.areaId = $scope.shipTo
                        }
                    })
                } else {
                    layer.msg("Please select the area you want to change")
                }
            }
            /* 批量转仓请求 */
            function transferAreaFun(arr){
                return new Promise(resolve => {
                    layer.load(2)
                    dsp.postFun("order/order/orderTransferArea", {
                        transferOrderDetailPMS: arr,
                        routeDiscounteTransfer: discounteTransferFlag
                    }, function (data) {
                        if (data.data.statusCode == 200) {
                            resolve(true);
                        }else{
                            resolve(false);
                        }
                    })
                })
            }
            function transArea(arr) {//批量转仓功能
                transferAreaFun(arr).then((data)=>{
                    discounteTransferFlag = false;
                    layer.closeAll("loading")
                    if(data){
                        closebulkWareFlag()
                        $scope.zchecked_all = false
                        freshList() //刷新列表
                        layer.msg("Successfully changed shipping area！")
                    }else{
                        layer.msg(data.data.message)
                    }
                })
                /* layer.load(2)
                dsp.postFun("order/order/orderTransferArea", {
                    transferOrderDetailPMS: arr,
                    routeDiscounteTransfer: discounteTransferFlag
                }, function (data) {
                    discounteTransferFlag = false;
                    layer.closeAll("loading")
                    if (data.data.statusCode == 200) {
                        closebulkWareFlag()
                        $scope.zchecked_all = false
                        freshList() //刷新列表
                        layer.msg("Successfully changed shipping area！")
                    } else {
                        layer.msg(data.data.message)
                    }
                }) */
            }

            $scope.changeWareConfirm = function () {
                $scope.addressOrderList = []
                const arr = []
                console.log($scope.bulkWareList)
                $scope.bulkWareList.forEach(item => {
                    const li = {
                        orderId: item.order.ID,
                        transferAreaId: item.order.areaId
                    }
                    arr.push(li)
                })
                if (arr.length > 0) {
                    transArea(arr);
                }
            }

            function clearBulk() {
                $scope.check_All = false
                $scope.shipFrom = ""
                $scope.shipTo = ""
            }

            $scope.modifyAreas = function () {
                $scope.notifi = false
                const list = []
                $scope.ordersList.forEach(item => {
                    $scope.noInventoryArr.forEach(it => {
                        if (item.order.ID == it) {
                            list.push(item)
                        }
                    })
                })
                $scope.bulkWareFlag = true
                $scope.bulkWareList = list
                clearBulk()
            }
            $scope.changeOneArea = function (order) {
                let arr = [{
                    orderId: order.ID,
                    transferAreaId: order.areaId
                }]
                transArea(arr);
            }
        }]);

    return app;
}
