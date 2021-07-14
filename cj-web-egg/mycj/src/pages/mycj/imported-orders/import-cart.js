export function importCartFactory(angular) {
    const app = angular.module('import-cart.module', ['service']);

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

    app.controller('import-cart.ctrl', ['$scope', 'dsp', function ($scope, dsp) {
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
        $scope.dataFound = true;
        // var $navLis = $('.header-nav li');
        // $navLis.eq(1).css('border-bottom','2px solid #f88f29');
        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0, {width: '100%'});
        var pageH = $(window).height() - 171;
        var docH = $(document).height();

        $('.directorders-wrap').css({
            'min-height': $(window).height() * 1 + 'px'
        });
        $('.direct-right').css({
            'min-height': $(window).height() * 1 + 'px'
        });
        function getCountry(){
            dsp.postFun('app/logistic/getcountry', null, function (data) {
                console.log(data)
                if (data.data.statusCode == 200) {
                    $scope.countryList = JSON.parse(data.data.result).countryList;
                }

            }, function (data) {
                console.log(data)
            })
        }
        function countryEnName(code) {
            console.log(code)
            let len = $scope.countryList.length;
            let enName
            if (len > 0) {
                $scope.countryList.find(_i=>{
                    if (code == _i.ID) {
                        return enName = _i.NAME_EN;
                    }
                })
            }
            return enName;
        }
        getCountry();
        const cartScroll = function() {
            setTimeout(() => {
                const body = document.body.clientHeight;
                const h = document.getElementById('dfk-orders').clientHeight;
                const w = document.getElementById('dtj-orders').clientWidth - 12 + 'px';
                const _height = body - 200;
                const newBottom = document.getElementById('new-bottom-function-bar').style;
                
                if(h > _height) {
                    newBottom.width = '100%';
                    newBottom.position = 'sticky';
                    newBottom.left = 0;
                    newBottom.right = 0;
                } else {
                    newBottom.width = '100%';
                    newBottom.position = 'relative';
                    newBottom.left = 0;
                    newBottom.right = 0;
                }
                const ele = dsp.getScroll();
                ele.onscroll = (e) => {
                    const scrolltop = e.target.scrollTop;
                    if((h - scrolltop < 800) || (h < _height)) {
                        newBottom.width = '100%';
                        newBottom.position = 'relative';
                        newBottom.left = 0;
                        newBottom.right = 0;
                    }
                    else {
                        newBottom.width = '100%';
                        newBottom.position = 'sticky';
                        newBottom.left = 0;
                        newBottom.right = 0;
                    }
                }
            }, 1000)
        }

        var codeInlocal = localStorage.getItem('code');
        if (codeInlocal) {
            var timer = setInterval(function () {
                var myDate = new Date();
                var tipHour = myDate.getHours();       //获取当前小时数(0-23)
                var tipMinute = myDate.getMinutes();     //获取当前分钟数(0-59)
                var tipSecond = myDate.getSeconds();     //获取当前秒数(0-59)
                $('#tiphour').text(tipHour + ':')
                $('#tipminute').text(tipMinute + ':')
                $('#tipsecond').text(tipSecond)
                codeInlocal = localStorage.getItem('code');
                $scope.tipsOrdStatues = localStorage.getItem('ordTips');
                if (codeInlocal == '200') {
                    $('.refresh-btn').show();
                    clearTimeout(timer)
                    console.log(myDate)
                    $scope.tipsOrdStatues = localStorage.getItem('ordTips');
                    $('.titOrdTips').text($scope.tipsOrdStatues)
                }
                console.log($scope.tipsOrdStatues)
                console.log(codeInlocal)
            }, 1000)
        }
        $scope.refershFun = function () {
            $('.refresh-btn').hide();
            $('#dcl-sel').val('100');
            $scope.ordersList = [];
            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
            var orData = {};
            tjFun(orData)
            orData.data = JSON.stringify(orData.data);
            dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun);

            function dclsFun(data) {
                console.log('data')
                console.log(data)
                var list1 = data.data.result;
                $scope.list = JSON.parse(list1);//json×Ö·û´®×ª¶ÔÏó
                console.log($scope.list)
                $scope.ordersList = $scope.list.ordersList;
                $scope.countNumber = $scope.list.countNumber;//总条数
                $scope.cartAmount = $scope.list.allAmount;//总金额
                console.log($scope.ordersList);
                console.log($scope.cartAmount);
                $scope.ordersList.forEach(item => $scope.addressOrderList.push(item.order.ID))
                console.log($scope.addressOrderList)
                $scope.ordstatusNum = $scope.list.allOrderCount2;//各种状态订单的数量
                numFun();//调用给订单赋值的函数
                if ($scope.countNumber > 0) {
                    dsp.removeNodataPic($('.orders-list'))
                    dsp.closeLoadPercent($('.orders-list'))
                } else {
                    dsp.addNodataPic($('.orders-list'), $(window).height() - 171, 47, 0, {width: '100%'},true)
                    dsp.closeLoadPercent($('.orders-list'))
                }
            }

            function dcleFun() {
                dsp.closeLoadPercent($('.orders-list'))
                dsp.cjMesFun(1);
            }
        }

        var bs = new Base64();

        //设置默认时间
        function GetDateStr(AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1;//获取当前月份的日期
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
        // $("#y-ord-sdate").val(aDate );   //关键语句
        // $("#y-ord-edate").val(enDate );   //关键语句
        $("#cj-stime").val(aDate);   //关键语句
        //$("#cj-etime").val(enDate );   //关键语句
        var awaitsIndex = 0;
        var orData = {};
        orData.data = {};
        orData.data.status = '2';//请求的订单状态
        orData.data.page = 1;//请求的第几页   10*1-10Ò³Âë
        orData.data.limit = 10000;//每页限制的订单条数
        //设置默认时间段
        var yStoresTime = $('#y-ord-sdate').val();
        var yStoreeTime = $('#y-ord-edate').val();
        var cjsTime = $('#cj-stime').val();
        var cjeTime = $('#cj-etime').val();
        orData.data.storeOrderDateBegin = yStoresTime;
        orData.data.cjOrderDateBegin = cjsTime;
        orData.data.storeOrderDateEnd = yStoreeTime;
        orData.data.cjOrderDateEnd = cjeTime;

        orData.data = JSON.stringify(orData.data);
        // console.log(orData.data)
        // var aaa = JSON.stringify(orData);
        $scope.countNumber = '';//Ò»¹²¶àÉÙÌõ¶©µ¥
        $scope.list = '';//¶©µ¥ºÍ²úÆ·
        $scope.orderList = '';//¶©µ¥µÄÁÐ±íÊý¾Ý
        $scope.productList = '';//²úÆ·µÄÁÐ±íÊý¾Ý
        $scope.storeAllMoney = '';//¶©µ¥µÄ×Ü½ð¶î
        $scope.flag = false;//ÅÐ¶Ï×´Ì¬

        var oneordmoney = 0;//一个订单的总金额

        $scope.addressOrderList = [];
        //给订单状态添加点击事件
        $scope.pcountN = 0;//存储待提交订单的总条数 process required
        dsp.postFun('app/order/queryOrders', JSON.stringify(orData), function (data) {
            var list1 = data.data.result;
            $scope.list = JSON.parse(list1);//json×Ö·û´®×ª¶ÔÏó
            console.log($scope.list)
            $scope.ordersList = $scope.list.ordersList;
            if($scope.ordersList){
                $scope.ordersList.forEach(item => {
                    $scope.addressOrderList.push(item.order.ID);
                });
            }
            console.log($scope.addressOrderList);
            $scope.countNumber = $scope.list.countNumber;//总条数
            awaitsIndex = $scope.countNumber;
            $scope.cartAmount = $scope.list.allAmount;//总金额
            console.log($scope.cartAmount);
            $scope.shops = $scope.list.shops;//店铺的数组
            delShopFun($scope.shops)
            cartScroll();
            var excelShop = {};
            excelShop.id = 'excel';
            excelShop.name = 'Excel';
            excelShop.rNAME = 'Excel';
            $scope.shops.push(excelShop)
            $scope.ordstatusNum = $scope.list.allOrderCount2;//各种状态订单的数量
            numFun();//调用给订单赋值的函数
            console.log($scope.shops);
            if ($scope.countNumber > 0) {
                dsp.removeNodataPic($('.orders-list'))
                dsp.closeLoadPercent($('.orders-list'))
            } else {
                dsp.addNodataPic($('.orders-list'), $(window).height() - 171, 47, 0, {width: '100%'},true)
                dsp.closeLoadPercent($('.orders-list'))
            }

        }, function (err) {
            dsp.closeLoadPercent($('.orders-list'))
            dsp.cjMesFun(1);
        })

        function delShopFun(shopArr) {
            /**店铺列表名字展示改成 店铺名+店铺类型+国家、增加国家全写参数、增加国家缩写参数 start */
            if (!shopArr) {
                return
            }
            shopArr.forEach(e => {
                // 国家缩写转换全写。ThemeId是shopee的国家;MarketplaceUrl是lazada的国家
                e.countryfullName = replaceCountry(e.type == 'shopee' ? e.ThemeId : e.type == 'Lazada' ? e.MarketplaceUrl : '').fullName;
                // 店铺名+店铺类型+国家
                // e.rNAME = `${e.name} - ${e.type.replace(e.type[0], e.type[0].toUpperCase())} ${e.countryfullName?'-':''} ${e.countryfullName}`;
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

        //给订单状态赋值的函数
        function numFun() {
            // $scope.importedNum = ($scope.processNum-0)+($scope.cartNum-0)+($scope.incompleteNum-0)+($scope.cancelNum-0)+($scope.refundNum-0);
            $scope.impprocessNum = $scope.ordstatusNum.yi;
            $scope.cartNum = $scope.ordstatusNum.er;
            $scope.incompleteNum = $scope.ordstatusNum.san;
            $scope.cancelNum = $scope.ordstatusNum.si;
            $scope.refundNum = $scope.ordstatusNum.wu;
            $scope.allProNum = $scope.ordstatusNum.jiu;
        }

        //按订单类型搜索
        $('.type-sel').change(function () {
            $scope.ordersList = [];
            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
            var orData = {};
            tjFun(orData)
            orData.data = JSON.stringify(orData.data);
            console.log(orData.data);
            console.log(JSON.stringify(orData))
            dsp.postFun('app/order/queryOrders', JSON.stringify(orData), function (data) {
                console.log(data.data)
                var list1 = data.data.result;
                // console.log(list);
                $scope.list = data.data.result;
                $scope.list = JSON.parse(list1);
                $scope.ordersList = $scope.list.ordersList;
                $scope.countNumber = $scope.list.countNumber;//总条数
                $scope.cartAmount = $scope.list.allAmount;//总金额
                if ($scope.countNumber > 0) {
                    dsp.removeNodataPic($('.orders-list'))
                    dsp.closeLoadPercent($('.orders-list'))
                } else {
                    dsp.addNodataPic($('.orders-list'), $(window).height() - 171, 47, 0, {width: '100%'},true)
                    dsp.closeLoadPercent($('.orders-list'))
                }
                cartScroll();

            }, function (err) {
                dsp.closeLoadPercent($('.orders-list'))
                dsp.cjMesFun(1);
            })
        })

        function tjFun(tjcs) {
            var yStoresTime = $('#y-ord-sdate').val();
            var yStoreeTime = $('#y-ord-edate').val();
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

            tjcs.data = {};
            tjcs.data.status = '2';//请求的订单状态
            tjcs.data.page = 1;//请求的第几页
            tjcs.data.limit = 10000;//每页限制的订单条数

            tjcs.data.orderNumber = searchinpVal;
            tjcs.data.storeOrderDateBegin = yStoresTime;//店铺开始时间
            tjcs.data.storeOrderDateEnd = yStoreeTime;//店铺结束时间
            tjcs.data.storeProductName = yStoreName;//店铺商品名称
            tjcs.data.cjProductName = cjStoreName;//cj商品名称
            tjcs.data.buyerName = berName;//名字
            tjcs.data.orderType = ordType;//订单类型
            tjcs.data.storeNumber = $scope.storeName;
            var cjsTime = $('#cj-stime').val();
            var cjeTime = $('#cj-etime').val();
            tjcs.data.cjOrderDateBegin = cjsTime;
            tjcs.data.cjOrderDateEnd = cjeTime;
        }

        //按店铺搜索
        $scope.storeChangeFun = function () {
            $scope.ordersList = [];
            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);

            var orData = {};
            tjFun(orData)
            orData.data = JSON.stringify(orData.data);
            console.log(orData.data);
            console.log(JSON.stringify(orData))

            dsp.postFun('app/order/queryOrders', JSON.stringify(orData), function (data) {
                var list1 = data.data.result;
                $scope.list = JSON.parse(list1);
                $scope.ordersList = $scope.list.ordersList;
                $scope.countNumber = $scope.list.countNumber;//总条数
                $scope.cartAmount = $scope.list.allAmount;//总金额
                if ($scope.countNumber > 0) {
                    dsp.removeNodataPic($('.orders-list'))
                    dsp.closeLoadPercent($('.orders-list'))
                } else {
                    dsp.addNodataPic($('.orders-list'), $(window).height() - 171, 47, 0, {width: '100%'},true)
                    dsp.closeLoadPercent($('.orders-list'))
                }
                cartScroll();
            }, function (err) {
                dsp.closeLoadPercent($('.orders-list'))
                dsp.cjMesFun(1);
            })
        }

        //给当前页多少条订单赋值
        // var dfkNum = 0;

        //列表是否循环完毕
        $scope.$on('repeatFinishCallback', function () {
            awaitsIndex = $scope.countNumber;
            // $('.page-selected-num').html(dfkNum);//选中多少条
        });


        //给Awaiting Submit下的订单添加选中非选中
        var awaitAllPay = 0;//存储等待提交订单的总金额
        var oneOrdMoney = 0;//点击时存储一个订单的金额
        // var aa = 0;
        //让cart待付款的全选按钮选中
        //$('#dtj-orders .zchecked-all').attr('src','static/image/direct-orders/multiple2.png');
        $('#dfk-orders').on('click', '.zcheckbox', function (res) {//选中
            let cjOrderNumber = $(this).parent('#cj-ord-num').children('.dclord-sys-time').text()
            console.log(cjOrderNumber)
            console.log($scope.addressOrderList.indexOf(cjOrderNumber))
            if ($scope.addressOrderList.indexOf(cjOrderNumber) >= 0){
                $scope.addressOrderList.splice($scope.addressOrderList.indexOf(cjOrderNumber),1)
            }else{
                $scope.addressOrderList.push(cjOrderNumber)
            }
            console.log($scope.addressOrderList)
            //一条订单的金额
            oneOrdMoney = $(this).parent().siblings('.dfk-cjord-td').children('.dfk-cjam').children('.dfk-cj-money').text() - 0
            // $(this).children('.dfk-cjord-td').children('.dfk-cjam').children('.dfk-cj-money').text()-0;
            awaitAllPay = $('.awaiting-amount-money').text().replace(/,/g, "") - 0;//现在选中的所有订单的金额
            console.log(awaitAllPay)
            if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
                $(this).attr('src', 'static/image/direct-orders/multiple2.png');
                awaitsIndex++;
                $('.awaiting-amount-money').text((awaitAllPay + oneOrdMoney).toFixed(2));
                // console.log(dfkNum - Math.abs(awaitsIndex)+'(((((')
                // $('.page-all-num').html(dfkNum - Math.abs(awaitsIndex));
                $('.page-selected-num').html(awaitsIndex);
                // $('.page-all-num').html(awaitsIndex);
                // $('.page-selected-num').html(awaitsIndex);
                console.log(awaitsIndex)
                if (awaitsIndex == $('#dfk-orders .zcheckbox').length) {
                    $('#dfk-orders .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
                }
                console.log($scope.addressOrderList)
            } else {//非选中
                $(this).attr('src', 'static/image/direct-orders/multiple1.png');
                awaitsIndex--;
                if (awaitsIndex < 0) {
                    awaitsIndex = 0;
                    return;
                }
                $('.awaiting-amount-money').text((awaitAllPay - oneOrdMoney).toFixed(2));
                console.log(awaitsIndex)
                // $('.page-all-num').html(dfkNum);
                $('.page-selected-num').html(awaitsIndex);
                // console.log(dfkNum - Math.abs(awaitsIndex)+')))))')
                if (awaitsIndex != $('#dfk-orders .zcheckbox').length) {
                    $('#dfk-orders .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
                }
            }
        })

        //全选
        $('#dfk-orders').on('click', '.zchecked-all', function () {
            console.log($scope.addressOrderList)
            console.log($(this).attr('src') == 'static/image/direct-orders/multiple2.png')
            if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png'){
                for(var item of $('#dfk-orders .dclord-sys-time')) {
                    const index = $scope.addressOrderList.indexOf(item.innerText)
                    if(index < 0) $scope.addressOrderList.push(item.innerText)
                }
            }else{
                $scope.addressOrderList = []
            }
            console.log($scope.addressOrderList)

                if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
                    console.log(1)
                    $(this).attr('src', 'static/image/direct-orders/multiple2.png');
                    awaitsIndex = $('#dfk-orders .zcheckbox').length;
                    $('.page-selected-num').html(awaitsIndex);//选中条数
                    $('.awaiting-amount-money').text($scope.cartAmount);//等待付款的金额
                    $('#dfk-orders .zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
                } else {
                    console.log(2)
                    $(this).attr('src', 'static/image/direct-orders/multiple1.png');
                    awaitsIndex = 0;
                    $('.page-selected-num').html(awaitsIndex);//选中条数为0
                    $('.awaiting-amount-money').text(0.00);//等待付款金额为0
                    $('#dfk-orders .zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
                }

        })
        //取消订单
        $scope.deleteFlag = false;
        $scope.deletFun = function ($index, listName, $event) {
            console.log($index);
            console.log(listName);
            console.log($event);
            $scope.deleteFlag = true;
            $scope.itemId = listName.order.ID;
            $scope.itemIndex = $index;
            $scope.itemMoney = listName.order.AMOUNT
            // dsp.load();
            var $curentObj = $($event.currentTarget).parent().siblings('.order-time').children('.zcheckbox');//获取该行
            // // alert($($event.currentTarget).parent().html())
            console.log($curentObj);
        }
        $scope.deleteSureFun = function () {
            layer.load(2);
            console.log($scope.itemIndex)
            var $curentObj = $('#dfk-orders').find('.zcheckbox').eq($scope.itemIndex);//获取该行
            // alert($($event.currentTarget).parent().html())
            var cusOrdId = $scope.ordersList[$scope.itemIndex].order.ORDER_NUMBER;
            var shopType1 = $scope.ordersList[$scope.itemIndex].order.STORE_NAME;
            // var ordTypeObj = {};
            // ordTypeObj[cusOrdId] = shopType1;
            // console.log(ordTypeObj)
            console.log($curentObj);
            var deleteData = {};
            // deleteData.orderType = ordTypeObj;
            deleteData.orderNums = $scope.itemId;
            deleteData.type = 2;
            console.log(JSON.stringify(deleteData))
            dsp.postFun('app/order/deleteOrder', JSON.stringify(deleteData), function (data) {
                console.log(data)
                console.log(data.data)
                console.log(data.data.result)

                layer.closeAll("loading")
                // alert(data.data.result)
                if (data.data.result == true) {
                    $scope.deleteFlag = false;
                    $scope.cartNum -= 1;//购物车里的订单数量减去1
                    $scope.cancelNum = $scope.cancelNum - 0 + 1;//取消里的订单数加上1
                    $scope.ordersList.splice($scope.itemIndex, 1);//删除该行的数据
                    $scope.countNumber -= 1;//总订单数减去1
                    $scope.cartAmount = ($scope.cartAmount - $scope.itemMoney).toFixed(2);//总金额减去该订单的金额  适配批量删除
                    var selOrdNum = 0;
                    setTimeout(function () {
                        $('#dfk-orders .zcheckbox').each(function () {
                            if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
                                selOrdNum++;
                            }
                        })
                        if (selOrdNum == $scope.countNumber) {
                            $('#dfk-orders .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
                        }
                    }, 300)
                    if ($curentObj.attr('src') == 'static/image/direct-orders/multiple2.png') {
                        var allAmount = ($('.awaiting-amount-money').text().replace(/,/g, "") - 0) - $scope.itemMoney;
                        $('.awaiting-amount-money').text(allAmount.toFixed(2));//给总金额赋值
                        awaitsIndex--;
                        console.log(awaitsIndex)
                        var selOrdNum = $('.page-selected-num').text() - 1;//选中的订单
                        $('.page-selected-num').text(selOrdNum);
                    } else {
                        return;
                    }

                } else {
                    layer.closeAll("loading");
                    layer.msg('Delete Error');
                }
            })
        }
        $scope.deleteQxFun = function () {
            $scope.deleteFlag = false;
        }
        //给确定付款的按钮添加鼠标点击提交订单到erp事件


        //地址不完整弹窗
        $scope.checkAddress = false
        $scope.closeCheckAddress = () => {
            $scope.checkAddressList = []
            $scope.checkAddress = false
            return;
        }

        
        $scope.saveOrder = () => {
            // $scope.addressOrderList = []
            $scope.checkAddress = false
            if (filterSuppilerOrder()) {
                $scope.isShowTips = true
                $scope.$apply()
                $scope.addressOrderList = []
            } else {
                suppilerOrderConfirm()
            }
        }
        //loading加载
        let lottieDom=null;
        function ceateLoading(id){
            $scope.element = document.getElementById(id);
            if($scope.element || $scope.element.parentElement.style.display === 'none'){
                $scope.element.parentElement.style.display='flex';
            }
            if(!$scope.element) return;
            if(!lottieDom) {
                lottieDom = lottie.loadAnimation({
                    container: $scope.element, 
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: '/egg/image/cj_lottie.json' 
                });
            }
        }
        function removeLoading(id){
            $scope.element = document.getElementById(id);
            if($scope.element){
                $scope.element.parentElement.style.display='none';
            }
            if(lottieDom) {
               lottieDom.destroy();
            }
            lottieDom=null
        }
        var cartAllOrdId = '';//cart里面所有要提交订单的id
        // var clickIndex = 0;
        $('.confirm-btn').click(function () {
            var cjOrderDate = {
                type:'2',
                cjOrderNumber: $scope.addressOrderList.join(',')
            }
            console.log($scope.addressOrderList.join(','))
            // 校验订单地址
            ceateLoading('addcardLoad');
            dsp.postFun('app/address/checkAddress',JSON.stringify(cjOrderDate),function(res){
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
                    removeLoading('addcardLoad');
                    return
                }else{
                    $scope.checkAddress = false
                }
                if (filterSuppilerOrder()) {
                    $scope.isShowTips = true
                    removeLoading('addcardLoad');
                    $scope.$apply()
                } else {
                    suppilerOrderConfirm()
                }
            },function(){
                removeLoading('addcardLoad');
            })
            removeLoading('addcardLoad');
            cartAllOrdId = ''
                $('#dtj-orders .order-detail').each(function () {
                    if ($(this).children('.order-time').children('.zcheckbox').attr('src') == "static/image/direct-orders/multiple2.png") {
                        //所有的要提交订单的id
                        cartAllOrdId = cartAllOrdId + $(this).children('.ord-cai').children('.order-id').text() + ',';
                    }
                });
            console.log('cartAllOrdId',cartAllOrdId)
        })

        // 原提交代码抽出来
        function suppilerOrderConfirm() {
            //过滤缺失信息订单
            let orderArrayList = []
            console.log($scope.checkAddressList)
            if($scope.checkAddressList){
                let carOrderList = cartAllOrdId.split(',')
                $scope.checkAddressList.forEach(x => {
                    if(carOrderList.includes(x.orderId)){
                        carOrderList = carOrderList.filter(item => item !== x.orderId)
                    }
                })
                if(carOrderList.length > 0){
                    cartAllOrdId = carOrderList.join(',')
                }
            }
            var awaitingJson = {};
            awaitingJson.userId = bs.decode(localStorage.getItem('userId'));
            awaitingJson.token = bs.decode(localStorage.getItem('token'));
            awaitingJson.data = {};
            //cartAllOrdId = '';
            // 含供应商订单做限制
            if (!cartAllOrdId) {
                layer.msg('Please select order(s) first!')
                layer.closeAll("loading")
                removeLoading('addcardLoad');
                return
            }
            const selectData = $scope.ordersList.filter(item => cartAllOrdId.split(',').includes(item.order.ID));
            const checkInvenList = $scope.ordersList.filter(item => cartAllOrdId.split(',').includes(item.order.ID));
            let checkInvenIds = '';
            for (let i = 0, len = checkInvenList.length; i < len; i++) {
                if (checkInvenList[i].order.ORDERSOURCE_TYPE != '7' && checkInvenList[i].order.areaId !== '1') {
                    checkInvenIds += checkInvenList[i].order.ID + ',';
                }
            }
            // if(checkInvenList.length){
            //   for(let i = 0,len = selectData.length;i<len;i++){
            //     if(){
            //       checkInvenIds += checkInvenList[i].order.ID + ',';
            //     }
            //   }
            // }
            console.log(checkInvenList)
            console.log(checkInvenIds)
            console.log(selectData);
            const amount = selectData.reduce((pre, cur) => Number(cur.order.AMOUNT) + pre, 0);
            console.log(amount);

            
            awaitingJson.data.amount = amount.toFixed(2);
                    awaitingJson.data.weight = '';
                    awaitingJson.data.count = selectData.length;
                    awaitingJson.data.orderNum = cartAllOrdId;


                    awaitingJson.data = JSON.stringify(awaitingJson.data);
                    console.log(awaitingJson);
                    if (checkInvenIds) {
                        dsp.postFun('order/order/checkInventory', {
                            ids: checkInvenIds
                        }, function (data) {
                            console.log(data)
                            let resData = data.data;
                            if (resData.statusCode == 200) {
                                $scope.isShowTips = false
                                $scope.noInventoryArr = resData.result;
                                console.log($scope.noInventoryArr)
                                if ($scope.noInventoryArr.length > 0) {
                                    layer.closeAll("loading")
                                    removeLoading('addcardLoad');
                                    let selectedCout = cartAllOrdId.split(',').length - 1;
                                    console.log(selectedCout)
                                    if ($scope.noInventoryArr.length == selectedCout) {//所有订单都没有库存的提示
                                        layer.msg('Insufficient inventory. Please select other orders to pay.')
                                    } else {//部分有库存
                                        $scope.noInventoryTkFlag = true;
                                    }
                                } else {//都有库存
                                    createShipment(awaitingJson)
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
                                layer.closeAll("loading")
                                removeLoading('addcardLoad');
                            } else {
                                layer.closeAll("loading")
                                removeLoading('addcardLoad');
                                dsp.cjMesFun(1);
                            }
                        })
                    } else {
                        createShipment(awaitingJson)
                    }
        }

        $scope.errorShowFlag = false;
        $scope.logisticsReasonList = []

        function createShipment(awaitingJson) {
            let obj= JSON.parse(awaitingJson.data)
            let orderNumbers = obj.orderNum.split(',').filter(value => value.length > 0)
            localStorage.setItem('orderNumbers', JSON.stringify(orderNumbers))
            // location.href = '/newmycj/dropshipping/orderConfirmation'
            dsp.postFun('order-center/proxyOrder/shoppingCart/orderAmountRefresh', {
                orderCodes: orderNumbers,
            },function(data) {
                const res = data.data
                if(res.success){
                    location.href = '/newmycj/dropshipping/orderConfirmation'
                } else {
                    layer.msg(res.message)
                }
            })
            // dsp.postFun('app/order/createShipmentsOrder', JSON.stringify(awaitingJson), function (data) {
            //     console.log(data.data)
            //     removeLoading('addcardLoad');
            //     if (data.data.statusCode == 200) {
            //         location.href = '#/dropshipping-orders';
            //     } else if (data.data.statusCode == 5001) {
            //         location.href = '#/dropshipping-orders';
            //         localStorage.setItem('ordZeroTips', data.data.message)
            //     } else if (data.data.statusCode == 5002) {
            //         $scope.addCartResonFlag = true;
            //         $scope.addCartResonText = data.data.message;
            //         $scope.refershFun()
            //     } else if (data.data.statusCode == 400) {
            //         $scope.errorShowFlag = true;
            //         const temp = JSON.parse(data.data.result)
            //         $scope.logisticsReasonList = temp.map((item) => {
            //             return {
            //                 recordNum: item,
            //                 message: data.data.message
            //             }
            //         })
            //     } else {
            //         layer.msg('Submit failed');
            //     }
            // })
        }

        $scope.sureDelNoInventoryOrd = function () {//删除泰国没有库存的订单
            var awaitingJson = {};
            awaitingJson.userId = bs.decode(localStorage.getItem('userId'));
            awaitingJson.token = bs.decode(localStorage.getItem('token'));
            awaitingJson.data = {};
            let delAmountMoney = 0;
            let shengYuCount = 0;//删除后的剩余数量
            let shengYuIds = '';
            $('#dtj-orders .order-detail').each(function () {
                if ($(this).children('.order-time').children('.zcheckbox').attr('src') == "static/image/direct-orders/multiple2.png") {
                    //所有的要提交订单的id
                    let itemLetId = $(this).children('.ord-cai').children('.order-id').text();
                    let isNoInventoryIdFlag = true;
                    if ($scope.noInventoryArr.length > 0) {
                        for (let i = 0, len = $scope.noInventoryArr.length; i < len; i++) {
                            if (itemLetId == $scope.noInventoryArr[i]) {
                                isNoInventoryIdFlag = false;
                                break
                            }
                        }
                    }
                    if (isNoInventoryIdFlag) {//不是缺少库存的订单
                        // console.log($(this).children('.order-time').children('.cj-amount-money').text())
                        shengYuIds = shengYuIds + $(this).children('.ord-cai').children('.order-id').text() + ',';
                        delAmountMoney += $(this).children('.order-time').children('.cj-amount-money').text() - 0
                        shengYuCount++;
                    }
                    // cartAllOrdId =cartAllOrdId+$(this).children('.ord-cai').children('.order-id').text()+',';
                }
            });
            console.log(delAmountMoney)
            delAmountMoney = (delAmountMoney - 0).toFixed(2)
            console.log(delAmountMoney)
            awaitingJson.data.amount = delAmountMoney + '';
            awaitingJson.data.weight = '';
            awaitingJson.data.count = shengYuCount;
            awaitingJson.data.orderNum = shengYuIds;
            awaitingJson.data = JSON.stringify(awaitingJson.data);
            createShipment(awaitingJson)
            // dsp.postFun('app/order/createShipmentsOrder', JSON.stringify(awaitingJson), function (data) {
            //     console.log(data.data)
            //     layer.closeAll("loading")
            //     removeLoading('addcardLoad');
            //     if (data.data.statusCode == 200) {
            //         location.href = '#/dropshipping-orders';
            //     } else if (data.data.statusCode == 5001) {
            //         location.href = '#/dropshipping-orders';
            //         localStorage.setItem('ordZeroTips', data.data.message)
            //     } else if (data.data.statusCode == 5002) {
            //         $scope.addCartResonFlag = true;
            //         $scope.addCartResonText = data.data.message;
            //         $scope.refershFun()
            //     } else if (data.data.statusCode == 400) {
            //         $scope.errorShowFlag = true;
            //         const temp = JSON.parse(data.data.result)
            //         $scope.logisticsReasonList = temp.map((item) => {
            //             return {
            //                 recordNum: item,
            //                 message: data.data.message
            //             }
            //         })
            //     } else {
            //         layer.msg('Submit failed');
            //     }
            // })
        }
        //给被删除的订单添加弹框
        $scope.showdelFun = function (ev, index, item) {
            if (item.shopOrderStatus) {
                $('.dcl-ord-tbody').eq(index).find('.hasdel-con').show();
            }
            // $('.dcl-ord-tbody').eq(index).find('.hasdel-con').show();
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
        $scope.navList = [
            {name: 'Process Required', href: "#/direct-orders"},
            {name: 'Cart', href: "#/imp-cart", show: true},
            {name: 'Incomplete Orders', href: "#/imp-incomp"},
            {name: 'Canceled', href: "#/imp-cancel"},
            {name: 'Search All', href: "#/search-all"},
            {name: 'Store Orders', href: "#/AuthorizeOrder"},
        ]
        //$('.direct-leftbara').eq(0).css('background-image','linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
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

        //全部展开隐藏
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
        //鼠标划过事件
        //点击事件
        $('.orders-table').on('click', '.order-detail', function (event) {
            if ($(event.target).hasClass('zcheckbox')) {
                return;
            }
            if ($(this).hasClass('order-click-active')) {
                $(this).next().hide();
                $(this).removeClass('order-click-active');
                //$('.orders-table .order-detail').removeClass('order-click-active');
            } else {
                // $('.orders-table .d-toggle-tr').hide();//隐藏所有的商品
                $(this).next().show();
                // $('.orders-table .order-detail').removeClass('order-click-active');
                $(this).addClass('order-click-active');
            }
        })
        $('.orders-table').on('click', '.d-toggle-tr', function (event) {
            $(this).show();
            $(this).prev().addClass('order-click-active');
            // if ($(this).prev().hasClass('order-click-active')) {
            // 	$(this).hide();
            // 	$(this).prev().removeClass('order-click-active');
            // } else {
            // 	$(this).show();
            // 	$(this).prev().addClass('order-click-active');
            // }
        })
        // 订单
        $('.orders-table').on('mouseenter', '.order-detail>td', function () {
            // if($(this).hasClass('order-time')){
            // 	return
            // }
            // $(this).parent().next().show();
            // $('.orders-table .order-detail').removeClass('order-detail-active');
            // $(this).addClass('order-detail-active');
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

        //给更多搜索添加点击显示隐藏的动画
        $('#ditect-searchmore').click(function () {
            $('#ditect-moresearch').stop().toggle(300);
            // debugger;
            $('#toggle-logo1').toggleClass('.glyphicon glyphicon-triangle-top');
            if ($scope.countNumber < 1) {
                $('#dtj-orders').css('min-height', $('.cj-nodata-pic').height() + 50)
                console.log($('#dtj-orders').height())
            }
        });

        //给左侧的导航添加滚动事件
        $(document).scroll(function () {
            if ($(document).scrollTop() >= 0) {
                $('.left-nav').css({
                    position: 'fixed',
                    top: '80px'
                });
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
                console.log(data.data)
                var list1 = data.data.result;
                // $scope.list = data.data.result;
                $scope.list = JSON.parse(list1);
                console.log($scope.list)
                // console.log($scope.list.productList);
                // // $scope.aaaa = $scope.list.productList;
                // // console.log($scope.aaaa);
                // $scope.orderList = $scope.list.orderList;//订单列表
                // $scope.productList = $scope.list.productList;//产品列表
                // console.log($scope.orderList)
                // console.log($scope.productList)
                // console.log($scope.productList);
                // $scope.list.countNumber = $scope.list.countNumber;//获取总订单的条数
                // $scope.pcountN = $scope.list.countNumber;//获取总订单的条数
                // alert($scope.pcountN)
                $scope.ordersList = $scope.list.ordersList;
                console.log($scope.ordersList);
                $scope.countNumber = $scope.list.countNumber;//总条数
                $scope.cartAmount = $scope.list.allAmount;//总金额
                if ($scope.countNumber > 0) {
                    dsp.removeNodataPic($('.orders-list'))
                    dsp.closeLoadPercent($('.orders-list'))
                } else {
                    dsp.addNodataPic($('.orders-list'), $(window).height() - 171, 47, 0, {width: '100%'},true)
                    dsp.closeLoadPercent($('.orders-list'))
                }
                cartScroll();

            }

            function dcleFun() {
                dsp.closeLoadPercent($('.orders-list'))
                dsp.cjMesFun(1);
            }
        })

        //用订单号搜索 orderNumber
        $('.ord-search-inp').keypress(function (Event) {
            if (Event.keyCode == 13) {
                $scope.ordnumSearch();
            }
        })
        $scope.ordnumSearch = function () {
            $scope.addressOrderList = []
            $scope.ordersList = [];
            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
            var searchinpVal = $('.ord-search-inp').val();
            var orData = {};
            tjFun(orData)
            orData.data = JSON.stringify(orData.data)
            console.log(orData.data)
            console.log(JSON.stringify(orData))
            // alert(inpVal)
            dsp.postFun('app/order/queryOrders', JSON.stringify(orData), dclsFun, dcleFun)

            function dclsFun(data) {
                var list1 = data.data.result;
                $scope.list = JSON.parse(list1);
                console.log($scope.list)
                $scope.ordersList = $scope.list.ordersList;
                $scope.ordersList.forEach(item => $scope.addressOrderList.push(item.order.ID))
                $scope.countNumber = $scope.list.countNumber;//总条数
                $scope.cartAmount = $scope.list.allAmount;//总金额
                if ($scope.countNumber > 0) {
                    dsp.removeNodataPic($('.orders-list'))
                    dsp.closeLoadPercent($('.orders-list'))
                } else {
                    dsp.addNodataPic($('.orders-list'), $(window).height() - 171, 47, 0, {width: '100%'},true)
                    dsp.closeLoadPercent($('.orders-list'))
                }
                cartScroll();
            }

            function dcleFun() {
                dsp.closeLoadPercent($('.orders-list'))
                layer.closeAll("loading")
                dsp.cjMesFun(1);
            }
        }
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
        //批量取消
        $scope.addToCancelFun = function () {
            layer.load(2);
            var selectNum = 0;//存储被选中的条数
            $('#dfk-orders .zcheckbox').each(function () {//点击提交的时候去循环查找选中的订单
                if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
                    selectNum++;
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
                    var cancelData = {};
                    var cancelId = '';
                    // var ordTypeObj = {};
                    $("#dfk-orders .zcheckbox").each(function (i) {
                        if ($(this).attr('src') == 'static/image/direct-orders/multiple2.png') {
                            cancelId += $(this).next().text() + ',';
                            // var cusOrdId = $(this).parent().siblings('.order-num-td').children('.cus-ordtext').text();
                            // var shopType1 = $(this).parent().siblings('.ord-cai').children('.store-name-p').text();
                            // ordTypeObj[cusOrdId] = shopType1;
                        }
                    })
                    // console.log(cancelId)
                    // cancelData.orderType = ordTypeObj;
                    cancelData.orderNums = cancelId;
                    cancelData.type = 1;
                    // console.log(orData.data)
                    // console.log(JSON.stringify(orData))
                    console.log(JSON.stringify(cancelData))
                    dsp.postFun('app/order/deleteOrder', JSON.stringify(cancelData), function (data) {
                        // alert('chenggong')
                        console.log(data)
                        console.log(data.data)
                        if (data.data.result == true) {
                            // alert('zou')
                            // $('#dfk-orders .zcheckbox').each(function (i) {//点击提交的时候去循环查找选中的订单
                            // 	if ($(this).attr('src')=='static/image/direct-orders/multiple2.png') {
                            // 		// $(this).parent().parent().parent().remove();
                            // 		console.log(i)
                            // 		console.log($scope.ordersList)
                            // 		$scope.ordersList.splice(i,1);//删除该行的数据
                            // 		console.log($scope.ordersList)
                            // 	}
                            // })
                            var listLength = $('#dfk-orders .zcheckbox').length;
                            for (var i = listLength - 1; i >= 0; i--) {
                                if ($('#dfk-orders .zcheckbox').eq(i).attr('src') == 'static/image/direct-orders/multiple2.png') {
                                    // console.log($scope.ordersList)
                                    $scope.ordersList.splice(i, 1);//删除该行的数据
                                }
                            }
                            //给批量删除后的总金额赋值
                            $scope.cartAmount = ($scope.cartAmount - ($('.awaiting-amount-money').text().replace(/,/g, "") - 0)).toFixed(2);
                            // alert(awaitAllPay +'==='+$scope.cartAmount)
                            $('.awaiting-amount-money').text(0);//批量删除给总金额赋值
                            awaitsIndex = 0;//给选中的变量赋值为0
                            // $scope.cartAmount -= awaitAllPay;

                            $('.page-selected-num').text(awaitsIndex);//批量删除后给选中赋值为0
                            // alert($scope.countNumber+'=='+'selectNum')
                            $scope.countNumber -= selectNum;//给总订单数量赋值
                            // alert($scope.countNumber)
                            $scope.cartNum -= selectNum;//购物车里的订单数量减去批量删除的个数
                            $scope.cancelNum = $scope.cancelNum - 0 + selectNum;//取消里的订单数加上批量删除的个数
                            layer.closeAll("loading")


                        } else {
                            // alert('tijiaoshibai')
                            layer.closeAll("loading")
                            layer.msg('Delete Error');
                            return;
                        }
                    })

                }
            });
        }


        //cj开始日期搜索
        $("#cj-stime").click(function () {
            var cjendtime = $("#cj-stime").val();
            var interval = setInterval(function () {
                var endtime2 = $("#cj-stime").val();
                if (endtime2 != cjendtime) {
                    $scope.ordersList = [];
                    dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                    ;
                    clearInterval(interval);

                    var orData = {};
                    tjFun(orData)
                    orData.data = JSON.stringify(orData.data);
                    console.log(orData.data);
                    console.log(JSON.stringify(orData))
                    dsp.postFun('app/order/queryOrders', JSON.stringify(orData), function (data) {
                        console.log(data.data)
                        var list1 = data.data.result;
                        // console.log(list);
                        $scope.list = data.data.result;
                        $scope.list = JSON.parse(list1);
                        $scope.ordersList = $scope.list.ordersList;
                        $scope.countNumber = $scope.list.countNumber;//总条数
                        $scope.cartAmount = $scope.list.allAmount;//总金额
                        if ($scope.countNumber > 0) {
                            dsp.removeNodataPic($('.orders-list'))
                            dsp.closeLoadPercent($('.orders-list'))
                        } else {
                            dsp.addNodataPic($('.orders-list'), $(window).height() - 171, 47, 0, {width: '100%'},true)
                            dsp.closeLoadPercent($('.orders-list'))
                        }
                        cartScroll();
                    }, function (err) {
                        dsp.closeLoadPercent($('.orders-list'))
                        layer.closeAll("loading")
                        dsp.cjMesFun(1);
                    })
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
                    dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
                    ;
                    clearInterval(interval);
                    var orData = {};
                    tjFun(orData)
                    orData.data = JSON.stringify(orData.data);
                    console.log(orData.data);
                    console.log(JSON.stringify(orData))
                    dsp.postFun('app/order/queryOrders', JSON.stringify(orData), function (data) {
                        console.log(data.data)
                        var list1 = data.data.result;
                        // console.log(list);
                        $scope.list = data.data.result;
                        $scope.list = JSON.parse(list1);
                        $scope.ordersList = $scope.list.ordersList;
                        $scope.countNumber = $scope.list.countNumber;//总条数
                        $scope.cartAmount = $scope.list.allAmount;//总金额
                        if ($scope.countNumber > 0) {
                            dsp.removeNodataPic($('.orders-list'))
                            dsp.closeLoadPercent($('.orders-list'))
                        } else {
                            dsp.addNodataPic($('.orders-list'), $(window).height() - 171, 47, 0, {width: '100%'},true)
                            dsp.closeLoadPercent($('.orders-list'))
                        }
                        cartScroll();
                    }, function (err) {
                        dsp.closeLoadPercent($('.orders-list'))
                        layer.closeAll("loading")
                        dsp.cjMesFun(1);
                    })
                }
            }, 100)
        })
        //修改地址
        $scope.modefyAddFun = function (item, index) {
            console.log(item)
            const {ID,SHIPPING_ADDRESS,shippingAddress2,CITY,PROVINCE,ZIP,PHONE,CUSTOMER_NAME,dutyNo,startCountryCode,LOGISTIC_NAME,areaId,COUNTRY_CODE} = item;
            $scope.addModefyFlag = true;
            $scope.addItemId = ID;
            $scope.addItemIndex = index;
            $scope.address1 = SHIPPING_ADDRESS;
            $scope.address2 = shippingAddress2;
            $scope.addCity = CITY;
            $scope.addProvince = PROVINCE;
            $scope.addZip = ZIP;
            $scope.addPhone = PHONE;
            $scope.addName = CUSTOMER_NAME;
            $scope.itemWlName = LOGISTIC_NAME;
            $scope.addTaxid = dutyNo//税号
            $scope.addAreaId = areaId; //发货地区Id
            $scope.updateId = item.areaId
            $scope.addCountryCode = COUNTRY_CODE; //目的国家
            $scope.addStartCountry = startCountryCode; //发货国家缩写
            $scope.countryEnName = countryEnName(COUNTRY_CODE)
            console.log($scope.countryEnName)
            $scope.opinion()
        }
        //校验判断
        $scope.opinion = function(){
            // 手机存在，失去焦点判断格式是否正确
            if(!$scope.address1){
                layer.msg('Please enter the address.')
                dsp.closeLoad()
                return false
            }
            else if(!$scope.addCity){
                layer.msg('Please enter the city.')
                dsp.closeLoad()
                return false
            }else if(!$scope.addName){
                layer.msg('Please enter name.')
                dsp.closeLoad()
                return false
            }else {
                return true
            }
        }
        //校验编辑信息
        $scope.editConfirm = () => {
            if ($scope.opinion() === true){
                return true
            }
        }
        //失去光标校验
        $scope.lost = function(){
            $scope.opinion()
        }
        //确认编辑
        $scope.sureModeFun = function () {
            console.log($scope.addItemIndex)
            console.log($scope.itemWlName);
            if ((($scope.itemWlName&&$scope.itemWlName.indexOf('DHL') != -1) || $scope.itemWlName == "China EMS" || $scope.itemWlName == "S.F China Domestic" || $scope.itemWlName == "YTO China Domestic" || $scope.itemWlName == "South Africa Special Line" || $scope.itemWlName == "CJ Normal Express") && !$scope.addPhone) {
                layer.msg('Phone number is required.')
                return
            }
            dsp.load()
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
            addUpdata.startCountryCode = $scope.addStartCountry;
            addUpdata.LOGISTIC_NAME = $scope.itemWlName;
            addUpdata.areaId = $scope.addAreaId;
            addUpdata.countryCode = $scope.addCountryCode;
            addUpdata.country = $scope.countryEnName
            addUpdata.type = '2'
            console.log(addUpdata);
            if($scope.editConfirm() === true){
                dsp.postFun('app/order/updateFiled', JSON.stringify(addUpdata), function ({data}) {
                    dsp.closeLoad();
                    if(data.msgCode === '505'){
                        $scope.phoneErr = data.ruleMsg.filter(item => item.type==='phone') || []
                        if(!$scope.phoneErr.length){
                            $scope.addModefyFlag = false;
                            layer.msg('Modify success')
                            $scope.refershFun()
                        }
                    }else if (data.result > 0) {
                        $scope.addModefyFlag = false;
                        $scope.addressOrderList = []
                        $scope.checkAddressList = []
                        $scope.checkAddress = false
                        layer.msg('Modify success')
                        $scope.refershFun()
                    } else {
                        layer.msg('Modify failed')
                    }
                }, function (data) {
                    dsp.closeLoad();
                    console.log(data)
                })
            }
        }
        //检查没有拉取到订单的原因
        $scope.noOrdResonFlag = false;
        $scope.resResonFlag = false;//展示后台返回的没有订单原因的弹框
        $scope.noOrdResonFun = function () {
            $scope.noOrdResonFlag = true;
        }
        $scope.noOrdSureFun = function () {
            if ($scope.shopOrdNum == 'undefined' || $scope.shopOrdNum == '') {
                layer.msg('Please enter the order number in your shop.')
                return;
            }
            layer.load(2);
            dsp.postFun('app/order/checkSyncOrder', {
                customerOrderId: $scope.shopOrdNum
            }, function (data) {
                console.log(data)
                layer.closeAll("loading")
                $scope.noOrdResonFlag = false;
                if (data.data.result != '') {
                    $scope.resResonFlag = true;
                    $('.no-ordres-reson').text(data.data.result)
                } else {
                    layer.msg('The query fails.')
                }
            }, function (data) {
                layer.closeAll("loading")
                console.log(data)
            })
        }
        $scope.noOrdQxFun = function () {
            $scope.noOrdResonFlag = false;
        }
        $scope.closeResReasonFun = function () {
            $scope.resResonFlag = false;
            $('.no-ordres-reson').text('');
        }

        // 含供应商订单提交做限制操作
        function filterSuppilerOrder() {
            const selectData = $scope.ordersList.filter(item => cartAllOrdId.split(',').includes(item.order.ID));
            const isSuppilerOrder = !!selectData.find(o => o.order.ODPRODUCTTYPE === '0'); // 是否含有供应商订单
            console.log(isSuppilerOrder)
            const isChildOrder = !!selectData.find(o => o.order.ODPRODUCTTYPE === '1'); // 是否含有子订单
            console.log(isChildOrder)
            const isMixedOrder = !!selectData.find(o => o.order.ODPRODUCTTYPE === '2'); // 是否含有混合订单
            console.log(selectData);
            if ((isMixedOrder && isChildOrder) || (isSuppilerOrder && isChildOrder)) {
                cartAllOrdId = selectData.filter(o => o.order.ODPRODUCTTYPE === '1').map(o => o.order.ID).join(',')
            }
            console.log('cartAllOrdId',cartAllOrdId);
            return ((isMixedOrder && isChildOrder) || (isSuppilerOrder && isChildOrder));
        }


        $scope.handleConfirm = () => {
            suppilerOrderConfirm()
        }

    }]);

    return app;
}
