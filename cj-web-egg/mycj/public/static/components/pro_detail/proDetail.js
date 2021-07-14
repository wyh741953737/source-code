// import { isArray } from "util";

;
(function (angular) {
    angular.module('cjCompnentModule', ['utils', 'ngSanitize'])
        .component('proDetail', {
            templateUrl: 'static/components/pro_detail/proDetail.html',
            controller: proDetailCtrl,
            bindings: {
                productid: '=',
                onLog: '&',
                showWorkOrder: '&'
            }
        })
        .directive('onFinishRenderFilters', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    if (scope.$last === true) {
                        $timeout(function () {
                            scope.$emit('ngRepeatFinished2');
                        });
                    }
                }
            }
        })

    function proDetailCtrl($rootScope, $scope, $filter, $timeout, dsp, cjhome, utils) {
        $scope.detailId = this.productid;
        dsp.domainData().then((res) => {
            // 请求成功的结果
            $scope.iscj = res.iscj;
            if ($scope.iscj == '1') {
                //cj
                $scope.icon = '/favicon.ico';
            } else {
                //客户
                $scope.icon = res.logo1 || '/favicon.ico';
                $('link[rel$=icon]').replaceWith('');
                $('head').append($('<link rel="shortcut icon"/>').attr('href', $scope.icon));
            }
        })
        var bs = new Base64();
        $scope.videoPlayers = {}
        $scope.userId = utils.getLocalInfo('userId');
        $scope.loginName = utils.getLocalInfo('firstName');
        $scope.token = utils.getLocalInfo('token');
        $scope.hasLogin = dsp.isInLoginState();
        $scope.push_id = dsp.getQueryString('push_id');
        $scope.customerDesignPro = false;
        $scope.podProduct = false;
        $scope.showAddCart = false;
        $scope.disableAddToCart = false; // 添加购物车按钮是否禁用
        $scope.showAddToCartTips = false; // 添加购物车按钮禁用提示是否显示
        $scope.detailIdBase = bs.encode(window.location.href);
        $scope.inventoryType = '0' // 库存类型 0：所有库存 1：CJ库存 2：工厂库存

        $scope.hasAfficateToken = false;   //判断当前跳转商品详情时是否携带分销客token
        $scope.afficateLink = '';  //分销链接
        if( dsp.getCookie("invite-token")) {
            $scope.hasAfficateToken = true;
            $scope.afficateLink = window.location.href +"&token="+  dsp.getCookie("invite-token");
        }else if(dsp.getQueryString('token')){
            $scope.hasAfficateToken = true;
            $scope.afficateLink = window.location.href +"&token="+ dsp.getQueryString('token');
            dsp.setCookie("invite-token",dsp.getQueryString('token'))
        }else{
            $scope.hasAfficateToken = false;
            $scope.afficateLink = '';
        }
        var clipboard = new ClipboardJS('.share-fenxiao');
        clipboard.on('success',function(e){
            layer.msg('Copied')
        })

        // $scope.disableAddToCartMsg = 'Product from supplier is unable to Add to Cart.'; // 添加购物车按钮是否禁用提示语
        // 
        var videoEnd = function (e) {
            var target = $(e.target);
            var video = target.find('video');
            var src = video.attr('data-src');
            if (src != '') {
                video.attr('src', src);
                video.attr('data-src', '');
                video.trigger("play");
            }

        }

        // 小灯泡链接
        $scope.openPrompt = function() {
          window.open("https://cjdropshipping.com/article-details/19")
        }

        // ------------------------------------------ 19-06-15 币种
        $rootScope.$on('calc-exchange-rate', function (ev, rate) {
            utils.forceRefresh({
                $scope,
                $timeout,
                keys: [
                    'merchPrice',
                    'merchPriceDis',
                    'shipCost',
                    'shipCostDis',
                    'amountPrice',
                    'copyrightPrice',
                    'notCopyrightPrice',
                    'nowPrice',
                    'nowPriceTotal'
                ]
            });
        });
        // ------------------------------------------
        $scope.$on('ngRepeatFinished2', function (ngRepeatFinishedEvent) {
            // 如果有商品有视频，这默认显示第一条视频
            if($scope.videoList.length >0){
                $('.video_box').hide()
                $('#1_video_box').show();
                $scope.smallBoxType = 'video'
                $scope.currentVideo = $scope.videoList[0]
            }

			$scope.videoList.forEach((item, idx) => {
				const eleId = `J_prismPlayer${idx + 1}`
				let { videoId, watermarkViewUrl, isBuy, isFree } = item
				
				getNewVideoFn({
					eleId,
					videoId: videoId ? videoId : '',
					sourceUrl: videoId ? '' : `https://${watermarkViewUrl}`,
					hasWater: !(isFree === '1' || isBuy)
				})
            })

            // 如果是视频加载，默认第一个轮播视频选中
            $("#topNav .swiper-slide").eq(0).addClass('active');

			//获取视频 -- 新 2019-12-04
			function getNewVideoFn({ videoId, eleId, sourceUrl, hasWater }) {
				cjUtils.getVideoInfo({
					eleId,
					videoId,
					sourceUrl,
					configuration: {
					  width: '490px',     //视频宽度
					  height: '490px',     //视频高度
                    },
                    callback : (player) => {
                        $scope.videoPlayers[eleId] = player;
                    },
					hasWater
				})
			}
        });

        var isActList = dsp.getQueryString('list');
        $scope.tokenFromErp = dsp.getQueryString('token');
        $scope.fromCountry = dsp.getQueryString('from') || 'all';
        $scope.fromType = dsp.getQueryString('fromType') || 'all';
        // $scope.productType = dsp.getQueryString('productType') || '0'; //0-正常商品;1-服务商品;2-目前没有;3-包装商品；4：供应商代发货商品；5：供应商自发货
        // 
        $scope.merchFlag = 1;
        if (dsp.isPhone()) {
            var jsonArgs = dsp.href2json(window.location.href);

            jsonArgs.page = 'product-detail';
            dsp.skipToMobile(jsonArgs);

            return;
        }
        // ---------------------------------------------------------------------

        $('#canvas-show').hide();

        if ($scope.detailId == '') {
            $scope.hasMerchData = false;
            $scope.nodata = {};
            $scope.nodata.type = '0';
            return false;
        }
        $scope.$on('ship-from', function (ev, data) {
            if (data.flag == 'storage-default') { // 第一次进入商品详情
                // 从ship-from组件获取当前仓库及库存(第一次)
                $scope.seleWare = data.data.area;
                $scope.inventoryType = data.data.inventoryType
                $scope.wareListObj = data.data.wareListObj;
                
                if($scope.defaultInventory) { // 如果是供应商商品 
                    if($scope.productType === '4') { // 如果是供应商代发货商品
                        if($scope.defaultInventory[0].countryCode === 'CN') { // 如果默认仓是中国仓
                            $scope.merchInventory = data.data.num || (10000 * $scope.stanProducts.length); // 展示虚拟库存
                            $scope.inventoryList = data.data.list;
                            $scope.inventoryList.forEach(item => {
                                if(item.countryCode === 'CN') { 
                                    if($scope.productType === '5') {
                                        item.num = item.num || (10000 * $scope.stanProducts.length)
                                    } 
                                }
                            })
                        } else {
                            $scope.merchInventory = $scope.seleWare.num;
                        }
                        data.data.list.forEach(item => {
                            if(item.countryCode === 'CN') { 
                                if($scope.productType === '5') {
                                    item.num = item.num;
                                } else {
                                    item.num = item.num || (10000 * $scope.stanProducts.length)
                                }   
                                
                            }
                        })
                        $scope.inventoryList = data.data.list;
                    }
                    if($scope.productType === '5') { // 如果是供应商自发货商品
                        if($scope.defaultInventory[0].countryCode === 'CN') { // 如果默认仓是中国仓
                            $scope.merchInventory = data.data.num;
                            $scope.inventoryList = data.data.list;
                        } else {
                            $scope.merchInventory = $scope.seleWare.num;
                        }
                        $scope.inventoryList = data.data.list;
                    } 
                } else {
                    if (data.data.list.length === 1 && data.data.list[0].countryCode === 'CN' && data.data.list[0].num === 0) {
                        data.data.list[0].num = 10000 * $scope.stanProducts.length;
                    } else {
                        $scope.inventoryList = data.data.list;
                    }
                    $scope.merchInventory = data.data.num || (10000 * $scope.stanProducts.length); // 展示虚拟库存
                }

                toggleAddToCart();
                dataToShipMethod.areaObj = $scope.seleWare;
                dataToShipMethod.weight = $scope.curStanPackWeight;
                dataToShipMethod.character = $scope.propertyKey;
                dataToShipMethod.pid = $scope.detailId;
                dataToShipMethod.varientWeightArr = $scope.varientWeightArr;
                dataToShipMethod.stanProducts = $scope.stanProducts;
                dataToShipMethod.inventoryList = data.data.list;
                dataToShipMethod.productSku = $scope.merchSku;
                const supplierSelfDeliveryParams = {
                    supplierId: $scope.productdetail.supplier_id || undefined,
                    productType: $scope.productType,
                    sku: $scope.productdetail.SKU || undefined
                }
                dataToShipMethod = Object.assign(dataToShipMethod, supplierSelfDeliveryParams)
                $scope.$broadcast('to-ship-method', {
                    flag: 'get-default',
                    data: dataToShipMethod
                })

                if (isActList == 1 && $scope.hasLogin) {
                    $scope.goActList($scope.detailId); // 自动弹出刊登弹框
                }

            }
            if (data.flag == 'storage-var') { // 切换变体
                // 接收-ship-from组件-当前仓库当前变体的库存
                $scope.inventoryType = data.data.inventoryType
                if($scope.defaultInventory) {
                    $scope.merchInventory = data.data.num;
                    $scope.inventoryList = data.data.list;
                    $scope.inventoryType = '0';
                } else {
                    if (data.data.list.length == 1 && data.data.list[0].countryCode == 'CN' && data.data.list[0].num == 0) {
                        data.data.list[0].num = 10000;
                    }
                    $scope.inventoryList = data.data.list;

                    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ ycy add
                    if($scope.seleWare.countryCode === 'CN') {
                        if(data.data.inventoryType == '0') { // 0：所有库存 1：CJ库存 2：工厂库存(虚拟库存)
                            $scope.merchInventory = data.data.num || 10000;
                        } else if(data.data.inventoryType == '1')  {
                            $scope.merchInventory = data.data.realNum
                        } else if (data.data.inventoryType == '2') {
                            $scope.merchInventory = data.data.virtualNum; // 展示虚拟库存
                        }
                    } else {
                        $scope.merchInventory = data.data.num;
                    }
                    // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ ycy add
                }
                
            }
            if (data.flag == 'variant-invs') {
                // 接收-ship-from组件-当前仓库所有变体的库存
                $scope.$broadcast('pro-detail', {
                    flag: 'fresh-variant-invs',
                    data: data.data
                })
                // $scope.stanProducts.forEach(function (item) {
                //     item.inventory = data.data[item.ID];
                // })
                // 
            }
            if (data.flag == 'storage-pro') { // 第一次点商品变体
                // 接收-ship-from组件获取当前仓库商品的库存
                $scope.inventoryType = data.data.inventoryType
                if($scope.defaultInventory) {
                    $scope.inventoryType = '0';
                    $scope.merchInventory = data.data.num;
                    $scope.inventoryList = data.data.list;
                } else {
                    if (data.data.list.length == 1 && data.data.list[0].countryCode == 'CN' && data.data.list[0].num == 0) {
                        data.data.list[0].num = 10000;
                    }
                    $scope.inventoryList = data.data.list;
                    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ ycy add
                    if($scope.seleWare.countryCode === 'CN') {
                        if(data.data.inventoryType == '0') { // 0：所有库存 1：CJ库存 2：工厂库存(虚拟库存)
                            $scope.merchInventory = data.data.num || (10000 * $scope.stanProducts.length); // 展示虚拟库存
                        } else if(data.data.inventoryType == '1')  {
                            $scope.merchInventory = data.data.realNum
                        } else if (data.data.inventoryType == '2') {
                            $scope.merchInventory = data.data.virtualNum; // 展示虚拟库存
                        }
                    } else {
                        $scope.merchInventory = data.data.num || (10000 * $scope.stanProducts.length);
                    }
                    // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ ycy add 
                }
                
            }
            if (data.flag == 'chan-ware') { // 切换库存地
                // 接收-ship-from组件-当前仓库及库存
                $scope.seleWare = data.data.area;
                $scope.inventoryList = data.data.list;
                $scope.inventoryType = data.data.inventoryType
                // if($scope.defaultInventory) {
                //     if($scope.seleWare.countryCode === 'CN') {
                //         $scope.merchInventory = data.data.num;
                //     } else {
                //         $scope.merchInventory = data.data.num;
                //     }
                // } else {
                //     $scope.merchInventory = data.data.num;
                // }

                // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑上边的逻辑都做了同一件事

                // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ ycy add
                if($scope.seleWare.countryCode == 'CN') {
                    if(data.data.inventoryType == '0') { // 0：所有库存 1：CJ库存 2：工厂库存(虚拟库存)
                        $scope.merchInventory = data.data.num
                    } else if(data.data.inventoryType == '1')  {
                        $scope.merchInventory = data.data.realNum
                    } else if (data.data.inventoryType == '2') {
                        $scope.merchInventory = data.data.virtualNum; // 展示虚拟库存
                    }
                } else {
                    $scope.merchInventory = data.data.num;
                }
                // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ ycy add
                
                toggleAddToCart();
                $scope.$broadcast('to-ship-method', {
                    flag: 'chan-ware',
                    areaObj: data.data.area
                })
                $scope.$broadcast('pro-detail', {
                    flag: 'chan-ware',
                    areaObj: $scope.seleWare
                })
            }
        });
        var dataToShipMethod = {};
        $scope.$on('change-shippingFrom',function(d,data) {
            
            if(data.flag === 'change-from') {
                $scope.$broadcast('change-shippingDetail',{
                    flag: 'change-from',
                    areaObj: data.areaObj
                })
            }
        })

        let prevShipCostList = []
        $scope.$on('ship-method', function (ev, data) {
            // 接收ship-method数据
            if (data.flag == 'get-default-back') {
                $scope.shipCountryName = data.data.shipCountryName;
                $scope.shipCountryCode = data.data.shipCountryCode;
                $scope.merchShipMethod = data.data.merchShipMethod;
                // $scope.merchShipDays = data.data.merchShipDays;

                const nextShipCostList = data.data.shipInfo
                let currentShipCost = nextShipCostList[0]
                if(prevShipCostList.length >= 1 && nextShipCostList.length > 1) {
                    const hasLastShipWay = nextShipCostList.find(shipCostLi => shipCostLi.logisticName === prevShipCostList[0].logisticName)
                    if(hasLastShipWay) {
                        currentShipCost = hasLastShipWay
                    }
                }
                renderAfterGetShipCost([currentShipCost]);
                prevShipCostList = [currentShipCost]
            }
            if (data.flag == 'ship-cost') {
                var data = data.data;
                renderAfterGetShipCost(data);
            }
            if (data.flag == 'inner-platform') {
                $scope.platformItem = data.innerPlatform
                $scope.platformCountryList = data.innerPlatformCountryList
                $scope.platformCountryItem = data.innerPlatformCountryItem
                $scope.$broadcast('to-ship-from', {
                    flag: 'change-ship-from-select',
                    outerPlatform: $scope.platformItem,
                    outerplatformCountryItem: $scope.platformCountryItem,
                })
            }
        });
        function superPriceSet(val){//设置滞销价格
            if(val && ~$scope.merchPriceDis.indexOf('-')){//假设当前价格是区间价格,则是未选择变体
                $scope.nowPrice = dsp.cacuProduct(val, $scope.procount);
                $scope.nowPriceTotal = dsp.cacuAmount($scope.nowPrice, $scope.shipCostDis);
            }else{
                if(val && +val<+$scope.merchPriceDis){//有滞销价格并且滞销价格小于折扣价格
                    $scope.nowPrice = dsp.cacuProduct(val, $scope.procount);
                    $scope.nowPriceTotal = dsp.cacuAmount($scope.nowPrice, $scope.shipCostDis);
                }else{
                    $scope.nowPrice = '';
                    $scope.nowPriceTotal = '';
                }
            }
        }
        function renderAfterGetShipCost (data) {
            if (!data.length) {
                if ($scope.procount * 1 > 1) {
                    if($scope.productType !== '5')  {
                        $scope.overWeight = true;
                    }
                } else {
                    $scope.overWeight = false;
                    $scope.merchShipMethod = '';
                    // $scope.noShipMethodMes = 'The shipping method you are using is unavailable to this country.';
                }
                $scope.shipCost = 0;
                $scope.shipCostDis = 0;
                $scope.shipDiscount = 0;
                $scope.amountPrice1 = $scope.amountPrice = dsp.cacuAmount($scope.merchPriceDis, $scope.shipCostDis);
            } else {
                $scope.noShipMethodMes = '';
                $scope.overWeight = false;
                
                $scope.shipCost = data[0].discountPrice || data[0].price;
                $scope.merchShipDays = data[0].aging + ' days';
                $scope.shipCostDis = data[0].price;
                $scope.shipDiscount = data[0].discount || 0;
                $scope.amountPrice1 = $scope.amountPrice = dsp.cacuAmount($scope.merchPriceDis, $scope.shipCostDis);
            }
            $scope.shipCost = ($scope.shipCost + '').replace(' -- ', '-')
            $scope.shipCostDis = ($scope.shipCostDis + '').replace(' -- ', '-')
            $scope.amountPrice = ($scope.amountPrice + '').replace(' -- ', '-')

            if ($scope.seleVariant) {
                superPriceSet($scope.seleVariant.nowPrice)
            }else{
                superPriceSet(currentMerch.nowPrice)
            }
        }

        var litImgIndex;
        $scope.procount = '1';

        function renderVariant () {
            $scope.curVarientImg = $scope.seleVariant.IMG;
            litImgIndex = $.inArray($scope.curVarientImg, $scope.merchLitImgs);
            $('#merch-big-img').attr('src', utils.IMG_SIZE($scope.seleVariant.IMG, {
                w: 490,
                h: 490
            }));
            $('#bigBox-img').attr('src', utils.IMG_SIZE($scope.seleVariant.IMG, {
                w: 800,
                h: 800
            }));
            $('.mid-ls-row a').eq(litImgIndex).addClass('active').siblings().removeClass('active');
            $scope.merchPrice = ($scope.seleVariant.SELLPRICE * $scope.procount).toFixed(2);
            $scope.sellDiscount = $scope.seleVariant.sellDiscount;//当前变体折扣
            $scope.merchPriceDis = ($scope.merchPrice * $scope.sellDiscount / 100).toFixed(2);//折扣价格
            $scope.merchSku = $scope.seleVariant.SKU;
            superPriceSet($scope.seleVariant.nowPrice)//设置滞销价格

            $scope.curStanPackWeight = $scope.seleVariant.PACKWEIGHT * 1;
            $scope.curShowWeight = $scope.curStanPackWeight * $scope.procount;
            $scope.curVariantId = $scope.seleVariant.ID;
        }

        function renderProduct () {
            $scope.seleVariant = null;
            $scope.curVarientImg = currentMerch.BIGIMG;
            $('#merch-big-img').attr('src', utils.IMG_SIZE(currentMerch.BIGIMG, {
                w: 490,
                h: 490
            }));
            $('#bigBox-img').attr('src', utils.IMG_SIZE(currentMerch.BIGIMG, {
                w: 800,
                h: 800
            }));
            $('.mid-ls-row a').removeClass('active');
            $scope.merchPrice = dsp.cacuProduct(currentMerch.SELLPRICE, $scope.procount);
            $scope.sellDiscount = 100;
            $scope.merchPriceDis = $scope.merchPrice;
            $scope.merchSku = currentMerch.SKU;
            superPriceSet(currentMerch.nowPrice);//设置滞销价格

            // if ($scope.productType == '3') return; // 包装商品不计运费

            $scope.curStanPackWeight = currentMerch.PACKWEIGHT;
            $scope.curShowWeight = dsp.cacuProduct(currentMerch.PACKWEIGHT, $scope.procount);
        }

        function showCurVarientInfo() {
            $('#zoom-box').show();
            $('#canvas-show').hide();
            if ($scope.curVarientKey.indexOf('null') == -1) { // 变体
                $scope.seleVariant = $scope.variantObj[$scope.curVarientKey];

                renderVariant()

                // 去ship-from拿变体库存
                $scope.$broadcast('to-ship-from', {
                    flag: 'get-vid-storage',
                    data: {
                        vid: $scope.seleVariant.ID
                    }
                });

                if ($scope.productType == '3') return; // 包装商品不计运费

                takeWightToShipMethod()
            } else { // 商品
                renderProduct()

                // 去ship-from拿商品库存
                $scope.$broadcast('to-ship-from', {
                    flag: 'get-pid-storage',
                    data: {
                        pid: $scope.detailId
                    }
                });
                if ($scope.productType == '3') return; // 包装商品不计运费
                takeWightToShipMethod();
            }
        }
        let smallBox = document.getElementById("smallBox");
        let mask = document.getElementById("mask");
        let bigBox = document.getElementById("bigBox");
        let bigImg = bigBox.children[0];
        smallBox.onmouseover = () => {
            $('.mid-l-big .mask').css('display', 'block');
            $('.pd-mid-l .bigBox').css('display', 'block');
        };
        smallBox.onmouseout = () => {
            $('.mid-l-big .mask').css('display', 'none');
            $('.pd-mid-l .bigBox').css('display', 'none');
        };
        smallBox.onmousemove = (event) => {
            let e = event || window.event;
            let pageX = e.pageX || event.clientX + document.documentElement.scrollLeft;
            let pageY = e.pageY || event.clientY + document.documentElement.scrollTop;
            let boxX = pageX - $('.smallBox').offset().left;
            let boxY = pageY - $('.smallBox').offset().top;
            let maskX = boxX - mask.offsetWidth / 2;
            let maskY = boxY - mask.offsetHeight / 2;
            if (maskX < 0) {
                maskX = 0;
            }
            if (maskX > smallBox.offsetWidth - mask.offsetWidth) {
                maskX = smallBox.offsetWidth - mask.offsetWidth;
            }
            if (maskY < 0) {
                maskY = 0;
            }
            if (maskY > smallBox.offsetHeight - mask.offsetHeight) {
                maskY = smallBox.offsetHeight - mask.offsetHeight;
            }
            mask.style.left = maskX + "px";
            mask.style.top = maskY + "px";
            let bigToMove = bigImg.offsetWidth - bigBox.offsetWidth;
            let maskToMove = smallBox.offsetWidth - mask.offsetWidth;
            let rate = bigToMove / maskToMove;
            bigImg.style.left = -rate * maskX + "px";
            bigImg.style.top = -rate * maskY + "px";
        };
        $scope.firstFlag = true;
        // 试算运费
        function takeWightToShipMethod () {
            // if ($scope.merchShipMethod) {
                // 有可用物流
                
                let variantList = [...currentMerch.stanProducts];
                // 如果选中了变体，只需要传入变体的信息
                if($scope.seleVariant) {
                    variantList = [$scope.seleVariant];
                }
                $scope.$broadcast('to-ship-method', {
                    flag: 'chan-weight',
                    data: {
                        variantList: variantList.map(v => {
                            return {...v ,
                                long: v.long ? v.long : null,
                                width: v.width ? v.width : null,
                                height: v.height ? v.height : null,
                                PACKWEIGHT: v.PACKWEIGHT ? $scope.procount*v.PACKWEIGHT : null,
                                volume: dsp.getVolume(v.long, v.width, v.height, $scope.procount)
                            }
                        }),
                        weight: dsp.cacuProduct($scope.curStanPackWeight, $scope.procount)
                    }
                })
            // } else {
            //     // 无可用物流
            //     renderAfterGetShipCost({})
            // }
        }

        $scope.$on('quick-list', function (d, data) {
            if (data.flag == 'ready') { // quick-list准备好
                $scope.quickListReady = 1;
            }
            if (data.flag == 'show-list') {
                $scope.$broadcast('to-ship-method', {
                    flag: 'show-list',
                    frompage: 'quick-list'
                });
            }

        });

        // $scope.$watch('{quickListReady: quickListReady, hasMerchData: hasMerchData}', function (n,o) {
        //     if (n.quickListReady && n.hasMerchData) {
        //         // quick-list + 详情信息 准备好
        //         if (isActList == 1 && $scope.hasLogin) {
        //             $scope.goActList($scope.detailId); // 自动弹出刊登弹框
        //         }
        //     }
        // })

        function toggleAddToCart () {
            if ($scope.shopData.id) {//供应商商品不直发
                $scope.disableAddToCartMsg = 'Product from supplier is unable to Add to Cart.';
                $scope.disableAddToCart = true;
            } else {
                if ($scope.seleWare.allowZhifa == '0') {//非中国仓不直发
                    $scope.disableAddToCartMsg = 'Only products shipping from China Warehouse can be added to cart.';
                    $scope.disableAddToCart = true;
                }
                if ($scope.seleWare.allowZhifa == '1') {//中国仓可以直发
                    $scope.disableAddToCartMsg = '';
                    $scope.disableAddToCart = false;
                }
            }
        }

        // 计算包装商品总价（不计运费）
        $scope.p3Total = function () {
            return dsp.cacuProduct($scope.merchPriceDis, $scope.procount).replace(' -- ', '-');
        }
        // 改变数量
        function changeProNum () {
            if ($scope.productType == '3') return; // 包装商品不计运费
            // 展示总重量
            $scope.curShowWeight = dsp.cacuProduct($scope.curStanPackWeight, $scope.procount); 
            // 如果选中了变体 
            if ($scope.seleVariant) {
                $scope.merchPrice = ($scope.seleVariant.SELLPRICE * $scope.procount).toFixed(2);
                $scope.merchPriceDis = ($scope.merchPrice * $scope.sellDiscount / 100).toFixed(2);
                superPriceSet($scope.seleVariant.nowPrice);
            } else {
                // 商品价格
                $scope.merchPrice = dsp.cacuProduct(currentMerch.SELLPRICE, $scope.procount);
                $scope.merchPriceDis = $scope.merchPrice;
                superPriceSet(currentMerch.nowPrice);
            }
            takeWightToShipMethod();
        }
        /* 直接输入修改数量 */
        var temTimer;
        $scope.chanProNum = function () {
            let reg = /^[1-9]\d*$/;
            if (!reg.exec($scope.procount)) {
                $scope.procount = '1'
            }
            if(!$scope.procount || $scope.procount <= 0) {
                $scope.procount = '1'
            } else if($scope.procount && $scope.procount > 100000) {
                $scope.procount = '100000'
            }
            changeProNum();
        }
        $scope.handleNumBlur = () => {
            if(!$scope.procount) {
                $scope.procount = '1'
            }
            changeProNum();
        }
        /* 增加数量 */
        $scope.plusOne = function () {
            // if ($scope.curVarientKey.indexOf('Please select') != -1) return;
            if($scope.procount < 100000) {
                $scope.procount = $scope.procount * 1 + 1;
                changeProNum();
            } else {
                $scope.procount = $scope.procount * 1;
            }
            
        }
        /* 减少数量 */
        $scope.minusOne = function () {
            if ($scope.procount * 1 <= 1) return;
            $scope.procount = $scope.procount * 1 - 1;
            changeProNum();
        }
        //对变体进行处理
        function changeVarientArr(cueSele, curVarIndex) {
            if (cueSele == null) {
                for (var i = 0; i < $scope.varientArr.length; i++) {
                    if (i == curVarIndex) continue;
                    for (var j = 0; j < $scope.varientArr[i].key.length; j++) {
                        if ($scope.varientArr[i].keyObj[j].disable != true) {
                            $scope.varientArr[i].keyObj[j].disable = false;
                        }
                    }
                }
                return;
            }
            // ex: $scope.varientKeysInner = ["Gray-M", "Tibetan Youth-M", "Gray-XL", "Tibetan Youth-3XL", "Gray-3XL", "Tibetan Youth-L", "Gray-L", "Gray-2XL", "Tibetan Youth-XL", "Tibetan Youth-2XL"]
            // cueSele:当前选择的变量 blue
            // curVarIndex:当前选择的变量索引 0
            var filterKeysOne = []; // 第一个过滤数组
            for (var m = 0; m < $scope.varientKeysInner.length; m++) {
                // 对变体数组进行遍历，
                var curVarKey = $scope.varientKeysInner[m].split('-');
                if (curVarKey[curVarIndex] == cueSele) {
                    filterKeysOne.push(curVarKey);
                }
            }
            // [["blue", "M"], ["blue", "L"], ["blue", "XXL"], ["blue", "S"], ["blue", "XL"]]
            for (var i = 0; i < $scope.varientArr.length; i++) {
                if (i == curVarIndex) continue;
                // i=1
                var canbeTwo = [];
                // 
                // 
                for (var j = 0; j < filterKeysOne.length; j++) {
                    canbeTwo.push(filterKeysOne[j][i]);
                }
                // 
                // ["M", "L", "XXL", "S", "XL"]
                for (var j = 0; j < $scope.varientArr[i].key.length; j++) {
                    // 遍历["M", "S", "3XL", "L", "XL", "2XL", "XXL"]
                    if ($scope.varientArr[i].keyObj[j].disable != true && canbeTwo.indexOf($scope.varientArr[i].key[j]) != -1) {
                        $scope.varientArr[i].keyObj[j].disable = false;
                    } else {
                        $scope.varientArr[i].keyObj[j].disable = true;
                    }
                }
                var filterKeysTwo = [];
                var curValTwo = $scope.varientArr[i].currKey;
                // 
                // M
                for (var k = 0; k < filterKeysOne.length; k++) {
                    if (filterKeysOne[k][i] == curValTwo || !curValTwo) {
                        filterKeysTwo.push(filterKeysOne[k]);
                    }
                }
                filterKeysOne = filterKeysTwo;
                // 
                // 
            }
        }

        $scope.changeVariant = function (item, itemv, index) {
            
            
            
            // 如果点击的是图片
            $scope.smallBoxType = 'image'
            $('.video_box').hide()
            $('#canvas-show').hide();
            $('#zoom-box').show();showCurVarientInfo
            if (itemv.disable) return;
            if (itemv && itemv.name && item.currKey != itemv.name) {
                item.currKey = itemv.name;
            } else if (itemv && itemv.name && item.currKey == itemv.name) {
                item.currKey = null;
            }
            $scope.curVarientKey = '';
            for (var i = 0; i < $scope.varientArr.length; i++) {
                for (var j = 0; j < $scope.varientArr[i].key.length; j++) {
                    $scope.varientArr[i].keyObj[j].disable = false;
                }
            }
            
            for (var i = 0; i < $scope.varientArr.length; i++) {
                $scope.curVarientKey += ('-' + $scope.varientArr[i].currKey);
                changeVarientArr($scope.varientArr[i].currKey, i);
            }
            
            $scope.curVarientKey = $scope.curVarientKey.slice(1);
            
            showCurVarientInfo();
        }

        // 初始化轮播插件
        function initSwiper(){
            var mySwiper = new Swiper('#topNav', {
                freeMode: true,
                freeModeMomentumRatio: 0.3,
                slidesPerView: 'auto',
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                onInit:function(){
                    // 如果是视频加载，默认第一个轮播视频选中
                    $("#topNav .swiper-slide").eq(0).addClass('active');
                    if(($("#topNav .swiper-slide")).length <= 6){
                        // 如果小图轮播个数不足以显示整条，则隐藏左右切换按钮(一行最多显示 6 个)
                        $("#topNav .swiper-button-prev,#topNav .swiper-button-next").hide()
                    }else{
                        $("#topNav .swiper-button-prev,#topNav .swiper-button-next").show()
                    }
                },
                onClick: function (swiper) {
                    var swiperWidth = mySwiper.container[0].clientWidth
                    var slide = swiper.slides[swiper.clickedIndex]
                    if(!slide){
                        // 如果没选中任何东西，返回
                        return
                    }
                    var maxTranslate = mySwiper.maxTranslate();
                    var maxWidth = -maxTranslate + swiperWidth / 2
                    var slideLeft = slide.offsetLeft
                    var slideWidth = slide.clientWidth
                    var slideCenter = slideLeft + slideWidth / 2
                    mySwiper.setWrapperTransition(300)
                    if (slideCenter < swiperWidth / 2) {
                        mySwiper.setWrapperTranslate(0)
                    } else if (slideCenter > maxWidth) {
                        mySwiper.setWrapperTranslate(maxTranslate)
                    } else {
                        var nowTlanslate = slideCenter - swiperWidth / 2
                        mySwiper.setWrapperTranslate(-nowTlanslate)
                    }
                    $("#topNav .active").removeClass('active')
                    $("#topNav .swiper-slide").eq(swiper.clickedIndex).addClass('active');
                    // var img = $scope.merchLitImgs[swiper.clickedIndex];

                    var img = $scope.merchLitImgs[swiper.clickedIndex];
                    // 如果点击的是视频
                    // 如果有视频
                    if($scope.videoList.length > 0){
                        if(swiper.clickedIndex < $scope.videoList.length){
                             // 点击的是视频
                             $scope.smallBoxType = 'video';
                             $('.video_box').hide()
                             $('#'+(swiper.clickedIndex+1)+'_video_box').show();
                             $scope.currentVideo = $scope.videoList[swiper.clickedIndex]
                             $scope.$apply()
                             return
                        }else{
                            // 减去前几个视频的序号，取大图图片
                            img = $scope.merchLitImgs[swiper.clickedIndex - $scope.videoList.length];
                        }

                    }

                     // 如果点击的是图片
                     $scope.smallBoxType = 'image'
                     $('.video_box').hide()
                     $('#canvas-show').hide();
                     $('#zoom-box').show();
                     // 显示大图
                     $('#merch-big-img').attr('src', utils.IMG_SIZE(img, {
                         w: 490,
                         h: 490
                     }));
                     $('#bigBox-img').attr('src', utils.IMG_SIZE(img, {
                         w: 800,
                         h: 800
                     }));
                     $scope.$apply()
                }
            });
            $(".swiper-container").on('touchstart', function (e) {
                e.preventDefault()
            })
        }

        // 处理传过来的天数
        function handleBuyDays(days){
          const strArr = days?days.split("-"):[]
          if (strArr.length>=2) {
            return strArr[1]
          }
          return days
        }

        // $scope.getTotalCost = function () {
        //     $scope.totalCost = $scope.merchPrice * 1 + $scope.shipCost * 1;
        //     return $scope.totalCost;
        // }
        /**/
        $scope.isAdsSuggestion = false;
        $scope.isDescription = true;
        $scope.model = false;
        $scope.AdsSuggestion = function () {
            $scope.isAdsSuggestion = true;
            $scope.isDescription = false;
        }
        $scope.Description = function (txt, $event) {
            if (txt == 'Description') {
                $scope.isDescription = true;
                $scope.model = false;
            } else {
                $scope.isDescription = false;
                $scope.model = true;
            }
            $scope.isAdsSuggestion = false;
        }
        $scope.hasGotInfo = false;
        // {CEB76908-6B42-444A-8058-C5FB7CBD4769}
        // $scope.hasMerchData = true;
        // &token=625434f5-43e4-4bd9-b36d-5db343f08cc0
        var sendJson = {};
        sendJson.id = $scope.detailId;
        if ($scope.tokenFromErp) {
            sendJson.token = $scope.tokenFromErp;
        } else {
            sendJson.token = '';
        }
        // if ($scope.productType) {
        //     sendJson.productType = $scope.productType;
        // }
        $scope.proimglist = [];
        var currentMerch;
        const msgLoading = cjMessage.loading({ popupContainerDom: document.getElementById('pd-mid-id') })
        dsp.postFun('cj/locProduct/huoQuShangPinXiangQing', JSON.stringify(sendJson), function (data) {
            var data = data.data;
            msgLoading.hide();
            if (data.statusCode != 200) {
                $scope.hasMerchData = false;
                $scope.nodata = {};
                if (data.statusCode == 100 || data.statusCode == 101 || data.statusCode == 555 || data.statusCode == 530) {
                    if (data.statusCode == 100) { // 私有产品无权限访问
                        $scope.nodata.type = '2';
                    } else if (data.statusCode == 101) { // token已过期或已失效
                        $scope.nodata.type = '1';
                    } else if (data.statusCode == 555) { // token已过期或已失效
                        $scope.nodata.type = '0';
                    } else if (data.statusCode == 530) {
                        $scope.nodata.type = '3';
                    }
                }
                return false;
            }
            if (!data.result) {
                $scope.hasMerchData = false;
                $scope.nodata = {};
                $scope.nodata.type = '0';
                return false;
            }
            var result = data.result;

            if (result) {
                // $scope.disableAddToCart = result.shop_id === undefined || result.shop_id === null || result.shop_id === '' ? false : true; //供应商商品不能直接添加购物车
                // $scope.hasMerchData = true;
                $scope.isCjDetail = true;
                currentMerch = result; //存储一个商品的数据
                currentMerch.CATEGORY = currentMerch.CATEGORY.replace(new RegExp('>',"g"), '/');
                result.CATEGORY = result.CATEGORY.replace(new RegExp('>',"g"), '/');
                $scope.productdetail = currentMerch; // 存储商品详情数据
                $scope.updatePriceDate = currentMerch.updatePriceDate;
                $scope.productType = currentMerch.PRODUCTTYPE
                $scope.listsNum = result.listed;
                $scope.isAut = result.isAut;
                console.log('isAut', $scope.isAut)
                currentMerch.stanProducts.forEach(function (o, i) {
                    $scope.proimglist.push(o.IMG)
                    o.long = dsp.getStandard('long', o.STANDARD);
                    o.width = dsp.getStandard('width', o.STANDARD);
                    o.height = dsp.getStandard('height', o.STANDARD);
                    o.volume = dsp.getVolume(o.long, o.width, o.height, 1);
                })
                //2020-06-02 智能引导记录浏览记录
                setBrowsHistory(result)
                $('#merch-big-img').attr('src', utils.IMG_SIZE('https://' + currentMerch.BIGIMG.replace('https://', '').replace('http://', ''), {
                    w: 490,
                    h: 490
                }));
                $('#erch-big-img').attr('src', utils.IMG_SIZE('https://' + currentMerch.BIGIMG.replace('https://', '').replace('http://', ''), {
                    w: 800,
                    h: 400
                }));

                
                $scope.merchName = $scope.currentModuleItem?$scope.currentModuleItem.title:$filter("fWordUpcase")(currentMerch.NAMEEN);
                document.title = $scope.merchName;
                $scope.merchCategoryArr = [];
                $scope.merchCategory = currentMerch.CATEGORY.replace(/&amp;/g, '&').split('/');
                $scope.merchCategoryIds = currentMerch.CategoryIds.split(',');
                for (var i = 0; i < $scope.merchCategory.length; i++) {
                    $scope.merchCategoryArr.push({
                        name: $scope.merchCategory[i],
                        id: $scope.merchCategoryIds[i],
                        encodeName: bs.encode($scope.merchCategory[i])
                    });
                }
                //判断是哪个pod版本
                if (data.result.customMessage && Array.isArray(JSON.parse(data.result.customMessage))) {
                    $scope.podVersion = 2;
                } else if (data.result.customMessage && !Array.isArray(JSON.parse(data.result.customMessage))) {
                    $scope.podVersion = 1;
                }
                $scope.merchCategoryId = currentMerch.CATEGORYID;
                $scope.merchBuyTime = handleBuyDays(currentMerch.BUYTIME);
                $scope.merchanisCollect = currentMerch.isCollect;
                $scope.propertyKey = currentMerch.PROPERTYKEY;
                $scope.packWeight = currentMerch.PACKWEIGHT;

                // 非中国仓也不能加入购物车
                // if ($scope.disableAddToCart === false && !$scope.allowZhifa){
                //   $scope.disableAddToCartMsg = 'Only products shipping from China Warehouse can be added to cart.';
                //   $scope.disableAddToCart = true;
                // }

                if ($scope.packWeight.indexOf('--') != -1) {
                    $scope.maxPackWeight = $scope.packWeight.split(' -- ')[1]
                } else {
                    $scope.maxPackWeight = $scope.packWeight;
                }
                if (currentMerch.AUTHORITYSTATUS == '0') {
                    $scope.isPrivateMerch = true;
                }
                $scope.merchStr = '';
                var propertyArr = currentMerch.PROPERTYEN.split(',');
                if (propertyArr[0] == '') {
                    propertyArr.splice(0, 1);
                }
                // $scope.merchAttr = propertyArr;
                $scope.merchStr = propertyArr.join(', ');

                // $scope.materialArr = [];
                $scope.materialStr = '';
                const upperCaseArr = [];
                var materialArr = currentMerch.MATERIALEN.split(',');
                if (materialArr[0] == '') {
                    materialArr.splice(0, 1);
                }
                materialArr.forEach(item => {
                    const arr = item.split('');
                    arr[0] = arr[0].toUpperCase();
                    const str = arr.join('');
                    upperCaseArr.push(str);
                })
                $scope.materialStr = upperCaseArr.join(', ');
                // $scope.materialStr = materialArr.join(',');

                ;
                (function () {
                    var imgs = currentMerch.IMG.split(',');
                    var variantImgs = [];
                    var stanProducts = currentMerch.stanProducts;
                    for (var i = 0; i < stanProducts.length; i++) {
                        if ($.inArray(stanProducts[i].IMG, variantImgs) == -1) {
                            variantImgs.push(stanProducts[i].IMG);
                        }
                    }
                    var imgSum = imgs.concat(variantImgs);
                    imgSum = dsp.uniqueArray(imgSum);
                    for (var i = 0; i < imgSum.length; i++) {
                        imgSum[i] = 'https://' + imgSum[i].replace('https://', '').replace('http://', '');
                    }
                    $scope.merchLitImgs = imgSum;

                    // 获取视频列表
                   getvideoList().then(()=>{
                        if($scope.videoList.length > 0){
                            // 如果是有视频
                            $.each($scope.videoList, function (k, v) {
                                // 视频小图地址
                                cjUtils.getVideoScreen({videoId: v.videoId}).then(value => {
                                  let videoSwiperArr = `<a class='swiper-slide clearfix video-swiper' href='javascript:void(0)'><img src='${value}' alt='' srcset='' width='62' height='62'> <img class='play-icon' src='https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/img/bigplay.png' alt='' srcset='' width='20' height='20'> </a>`;


                                  // 需要再这里添加视频
                                  // 小图数组
                                  $('#video-swiper-wrapper').prepend(videoSwiperArr)

                                  $.each($scope.merchLitImgs, function (k, v) {
                                    var src = utils.IMG_SIZE($scope.merchLitImgs[k], {
                                        w: 62,
                                        h: 62
                                    }); //图片地址
                                    var t = "<a class='swiper-slide clearfix' href='javascript:void(0)'> <img src=" + src + "/></a>";
                                    // 小图数组
                                    $('#video-swiper-wrapper').append(t)
                                });

                                initSwiper()

                                })
                            });

                        }else{
                            // 没有视频时
                            $.each($scope.merchLitImgs, function (k, v) {
                                var src = utils.IMG_SIZE($scope.merchLitImgs[k], {
                                    w: 62,
                                    h: 62
                                }); //图片地址
                                var t = "<a class='swiper-slide clearfix' href='javascript:void(0)'> <img src=" + src + "></a>";
                                // 小图数组
                                $('.swiper-wrapper').append(t)
                                initSwiper()
                            });

                        }
                    })
                }());

                $('#lit-img-box').css('width', 80 * $scope.merchLitImgs.length + 'px');
                $scope.stanProducts = currentMerch.stanProducts; //存储变体的数据
                $scope.weightArr = [];
                for (var i = 0; i < $scope.stanProducts.length; i++) {
                    $scope.weightArr.push($scope.stanProducts[i].packWeight * 1);
                }
                // 变体的最大邮寄重量
                // $scope.maxWeight = Math.max.apply(null, $scope.weightArr);

                $scope.varientArr = [];
                $scope.varientKeys = [];
                // $scope.curVarientKey = 'null';
                // $scope.curVarientKey = $scope.stanProducts[0].VARIANTKEY;
                $scope.variantObj = {}
                if (currentMerch.VARIANTKEYEN != '') {
                    $scope.varientKeys = currentMerch.VARIANTKEYEN.split('-');
                    for (var i = 0; i < $scope.varientKeys.length; i++) {
                        $scope.varientArr.push({
                            name: $scope.varientKeys[i],
                            key: []
                        });
                    }
                    $scope.oriColorMap = {}
                    for (var i = 0; i < $scope.stanProducts.length; i++) {
                        if ($scope.stanProducts[i].VARIANTKEY != null) {
                            var curVarientVal = $scope.stanProducts[i].VARIANTKEY.split('-');
                            for (var j = 0; j < curVarientVal.length; j++) {
                                if ($scope.varientArr[j]) { // 19-09-05 屏蔽报错
                                    $scope.varientArr[j].key.push(curVarientVal[j]);
                                }
                                // 记录颜色map
                                $scope.oriColorMap[curVarientVal[j]] = $scope.stanProducts[i].IMG;
                            }
                        }

                    }
                    for (var i = 0; i < $scope.varientArr.length; i++) {
                        $scope.varientArr[i].key = dsp.uniqueArray($scope.varientArr[i].key);
                        $scope.varientArr[i].keyObj = [];
                        $scope.varientArr[i].currKey = null;
                        for (var j = 0; j < $scope.varientArr[i].key.length; j++) {
                            $scope.varientArr[i].keyObj.push({
                                name: $scope.varientArr[i].key[j],
                                disable: false,
                                img: $scope.oriColorMap[$scope.varientArr[i].key[j]]
                            });
                        }
                    }
                    $scope.curVarientKey = 'null';
                } else {
                    $scope.varientArr = [];
                    $scope.variantObj[$scope.stanProducts[0].VARIANTKEY] = $scope.stanProducts[0];
                    $scope.curVarientKey = $scope.stanProducts[0].VARIANTKEY;
                }
                // 
                // 

                if ($scope.varientArr.length == 1 && $scope.varientArr[0].key.length == 0) {
                    $scope.varientArr = [];
                }

                $scope.varientKeysInner = [];
                $scope.varientWeightArr = [];
                for (var i = 0; i < $scope.stanProducts.length; i++) {
                    // $scope.stanProducts[i].IMG = 'https://' + $scope.stanProducts[i].IMG.replace('https://', '').replace('http://', '');
                    $scope.stanProducts[i].IMG = utils.httpsPrefix($scope.stanProducts[i].IMG);
                    $scope.varientWeightArr.push($scope.stanProducts[i].PACKWEIGHT);
                    $scope.varientKeysInner.push($scope.stanProducts[i].VARIANTKEY);
                    if ($scope.stanProducts[i].sellDiscount != null && $scope.stanProducts[i].sellDiscount < 100) {
                        $scope.stanProducts[i].SELLPRICEDIS = ($scope.stanProducts[i].SELLPRICE * $scope.stanProducts[i].sellDiscount / 100).toFixed(2);
                    } else {
                        $scope.stanProducts[i].SELLPRICEDIS = $scope.stanProducts[i].SELLPRICE;
                    }
                    $scope.variantObj[$scope.stanProducts[i].VARIANTKEY] = $scope.stanProducts[i];
                }
                
                $scope.varientWeightArr = dsp.uniqueArray($scope.varientWeightArr);

                $scope.curVarientImg = $scope.stanProducts[0].IMG;
                $scope.hasGotInfo = true;

                // 只有包装产品 productType=='3' 才有阶梯价格
                // 标示是否有阶梯价格 1 有区间价格 ；不是 1 则没有区间价格

                
                $scope.discountStatusFlag = currentMerch.discountStatus

                if($scope.productType=='3' && $scope.discountStatusFlag === 1){
                    // 如果是有阶梯价格的，请求阶梯价格
                    getPackProductDiscountPriceAll($scope.detailId)
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

                // 如果有自定义模板信息 且 该商品不是用户自定义设计的
                if (currentMerch.customMessage && !currentMerch.customeDesign) {
                    $scope.podProduct = true;
                    currentMerch.customMessage = JSON.parse(currentMerch.customMessage);
                    $scope.customMessage = currentMerch.customMessage;
                    $scope.customVersion = Array.isArray($scope.customMessage);
                    if (!$scope.customVersion) {
                        $scope.podColor = currentMerch.customMessage.color;
                        $scope.podZone = currentMerch.customMessage.zone;
                        if ($scope.podColor) {
                            $scope.canvasBasicColor = $scope.podColor.basic;
                            $scope.canvasChanColor = $scope.podColor.colors[0].value;
                        }
                        if ($scope.podZone && $scope.podZone.front) {
                            $scope.canvasImgSrc = $scope.podZone.front.showimgurl;
                            if ($scope.podColor) {
                                renderCanvas();
                            }
                        } else {
                            // 没有定制信息，不认为是pod商品
                            $scope.podProduct = false;
                        }
                    }

                    $timeout(function () {
                        //$rootScope.isPodProduct= true;
                        $rootScope.isPrintonDemand = true;
                        $rootScope.CategoryList.forEach(function (o, i) {
                            o.Num = o.individuationTotle;
                            o.children.forEach(function (k, j) {
                                k.Num = k.individuationTotle;
                                k.children.forEach(function (a, b) {
                                    a.Num = a.individuationTotle;
                                })
                            })
                        })
                    }, 100)
                }

                if (currentMerch.customMessage && currentMerch.customeDesign) {
                    $scope.customerDesignPro = true;
                    $scope.isPrivateMerch = false;
                    $scope.isPrivateFoerver = true;
                }
                if (currentMerch.customeDesign && $scope.productType == 3) {
                    $scope.customerDesignPro = true;
                    $scope.isPrivateMerch = false;
                }

                // cjhome.getRelateList($scope.relatePageNum, $scope);
                $scope.shopData = {
                    name: result.shop_name,
                    logo: result.shop_logo,
                    id: result.shop_id,
                    supplierId: result.supplier_id
                }
                

                if ($scope.shopData.name) {
                    dsp.addSupplerChatWindow();
                    // 处理add to cart按钮
                    toggleAddToCart();
                } else {
                    // 如果不是erp过来的登录，加载聊天
                    if (!localStorage.getItem('loginfromerp')) {
                        dsp.addChatWindow();
                        dsp.addGuidWindow();
                    }
                }
                $scope.$emit('todetailpage', {
                    flag: 'catecategory',
                    category: $scope.merchCategoryArr,
                    shopData: $scope.shopData,
                    productType:$scope.productType
                });
                // 展示当前变体信息
                if ($scope.curVarientKey == 'default') {
                    // 无变量商品
                    $scope.seleVariant = $scope.variantObj[$scope.curVarientKey];
                    renderVariant();
                } else {
                    // 有变量商品
                    renderProduct();
                }

                // 缓存当前商品信息到localStorage
                if ($scope.productType == '0') {
                    cjhome.storeOneMerch(currentMerch, $scope.merchFlag);
                }
                if(result.supplier_id) {
                    dsp.postFun('supplierPlanInfo/selectPlanBySupplierId', {
                    "supplierId": result.supplier_id,
                    }, function (res) {
                        if(res.status === 200) {
                        $scope.defaultPlan = res.data.data.defaultPlan;
                        }
                    }, function() {} )
                    dsp.postFun('supplierPlanInfo/selectSupplierStorageArea', {
                        "supplierId": result.supplier_id,
                    }, function (res) {
                        if(res.data.code === 200) {
                            if(res.data.data && res.data.data.length !== 0) {
                                $scope.defaultInventory = res.data.data;
                                $scope.hasMerchData = true; // 表示取到商品数据
                            }
                            
                        }
                    }, function() {
                        $scope.hasMerchData = true; // 表示取到商品数据
                    } )
                } else {
                    $scope.hasMerchData = true; // 表示取到商品数据
                }

                
                $scope.$emit('todetailpage', {
                    flag: 'has-data'
                });
                $scope.parentscope = $scope;


                // 运费试算
                $scope.platformItem = 'Shopify'
                function getPlatform() {
                    dsp.postFun('freight/logistics/getFreightStepOne', '{}', function(data) {
                        if (data.data.code == '200') {
                            $scope.platFormList = data.data.data.platFormList
                        }
                    })
                }
                getPlatform()
                function getPlatformCountry (successCallback) {
                  dsp.postFun('freight/logistics/getPlatformCountry', {
                    platForm: $scope.platformItem
                  }, function (data) {
                      if (data.data.code == '200') {
                        successCallback(data.data.data);
                        $scope.$broadcast('to-ship-from', {
                            flag: 'change-ship-from-select',
                            outerPlatform: $scope.platformItem,
                            outerplatformCountryItem: $scope.platformCountryItem,
                        })
                      }
                    })
                }
                $scope.changePlatform = function() {
                    getPlatformCountry(function (data) {
                        $scope.platformCountryList = data || [];
                        if ($scope.platformItem === 'Shopee') {
                          $scope.platformCountryList.push({
                            code: "",
                            nameCn: "国际站",
                            nameEn: "International"
                          })
                        }
                        const params = {
                            flag: 'change-ship-method',
                            isOuter: true,
                            outerPlatform: $scope.platformItem,
                        }
                        if ($scope.platformCountryList && $scope.platformCountryList.length > 0) {
                          $scope.platformCountryItem = $scope.platformCountryList[0];
                          params.outerPlatformCountryList = $scope.platformCountryList
                        } else {
                          $scope.platformCountryItem = null;
                        }
                        $scope.$broadcast('to-ship-method', params);
                    })
                }
                $scope.changePlatformCountry = function() {
                    console.log($scope.platformCountryItem);
                }
            }

        },function() {
            msgLoading.hide()
        });
        //智能引导记录浏览量
        function setBrowsHistory(result) {
            const { SKU } = result
            const loginName = localStorage.getItem('loginName') ? bs.decode(localStorage.getItem('loginName')) : '';
            if (loginName) {
                const params = {
                    accLoginName: loginName,
                    productSku: SKU
                }
                try {
                  dsp.postFun('message/guide/insertGuideProductBrowse', params, res => {
                    
                  }, _ => {})
                } catch (error) {
                  
                  
                }
            }
        }

        function renderCanvas() {
            $('#canvas-show').show();
            $('#zoom-box').hide();
            $('.mid-ls-row a').removeClass('active');
            getPixels2($scope.canvasImgSrc, function () {
                if ($scope.podColor) {
                    changeColor(hexToRGB($scope.canvasBasicColor), hexToRGB($scope.canvasChanColor));
                } else {
                    contextResultFront.clearRect(0, 0, comWidth, comHeight);
                    contextResultFront.putImageData(imgDataResultFront, 0, 0);
                }
            });
        }

        $scope.parentctrl = 'productdetail';
        $scope.addToDesign = function (id) {
            if (!$scope.hasLogin) {
                const param = location.search;
                location.href = 'login.html?target=' + base64.encode('product-detail.html' + param)
                return false;
                // layer.msg('Please login first!');
                // return;
            }
            var cj_desingn_list = localStorage.getItem('cj_desingn_list');
            if (cj_desingn_list) {
                cj_desingn_list = JSON.parse(cj_desingn_list);
                if (dsp.findIndexByKey(cj_desingn_list, 'id', currentMerch.ID) != -1) {
                    $scope.$broadcast('showdesignframe', currentMerch.ID);
                    return;
                }
            } else {
                cj_desingn_list = []
            }
            cj_desingn_list.push({
                id: currentMerch.ID,
                img: currentMerch.BIGIMG,
                title: currentMerch.NAMEEN,
                price: currentMerch.SELLPRICE
            });
            localStorage.setItem('cj_desingn_list', JSON.stringify(cj_desingn_list));
            $scope.$broadcast('showdesignframe', currentMerch.ID);
        }

        $scope.$on('todesignlist', function (d, data) {
            if (data == 'deleteone') {
                var cj_desingn_list = localStorage.getItem('cj_desingn_list');
                if (cj_desingn_list) {
                    cj_desingn_list = JSON.parse(cj_desingn_list);
                    if (dsp.findIndexByKey(cj_desingn_list, 'id', currentMerch.ID) != -1) {
                        cj_desingn_list.splice(dsp.findIndexByKey(cj_desingn_list, 'id', currentMerch.ID), 1);
                        localStorage.setItem('cj_desingn_list', JSON.stringify(cj_desingn_list));
                    }
                } else {
                    cj_desingn_list = []
                }
            }
        });


        //处理是否收藏
        $scope.Merch = function (flag, id, $event,fromType) {
            if($scope.merchanisCollect == 1) {
                $scope.merchanisCollect == 0
            }else{
                $scope.merchanisCollect == 1
            }
            if ($scope.hasLogin) {
                $scope.CollectionPro(flag, id, $event, $('#wishlist-box'),fromType,$scope.push_id);
                $scope.collectType = $scope.collectType;//获取收藏 取消搜藏标记
            } else {
                layer.msg('Please login first!');
            }
        }
        function collectProPost(flag, selectData, scb) {
            dsp.postFun('cj/homePage/shouCangShnagPin', {productId: selectData.id}, function (data) {
                scb(data);
            });
        }
        $scope.CollectionPro = function (flag, id, $event, targetDom,fromType,push_id) {
            var $this = $($event.currentTarget).find('img');
            var selectData = {};
            selectData.id = id;
    
            if ($this.attr('src') == '/egg/image/favorites/love_product.png' || $this.attr('src') == '/egg/image/favorites/love_product_hover.png') {
                selectData.flag = '0';
                $scope.collectType = 0;//传给商品详情页面使用
                collectProPost(flag, selectData, function (data) {
                    $this.attr('src', '/egg/image/favorites/love_product_click.png');
                    //flag = '1'
                    var cart = targetDom;
                    var imgtodrag = $this;
                    // var imgtodrag = $this.parent().parent().siblings('.listing-show').find("img").eq(0);
                    if (imgtodrag) {
                        var imgclone = imgtodrag.clone()
                                .offset({
                                    top: imgtodrag.offset().top,
                                    left: imgtodrag.offset().left
                                })
                                .css({
                                    'opacity': '0.6',
                                    'position': 'absolute',
                                    'height': '100px',
                                    'width': '100px',
                                    'z-index': '100'
                                })
                                .appendTo($('body'))
                                .animate({
                                    'top': cart.offset().top + 10,
                                    'left': cart.offset().left + 10,
                                    'width': 75,
                                    'height': 75
                                }, 500);
    
                        imgclone.animate({
                            'width': 0,
                            'height': 0
                        }, function () {
                            $(this).detach()
                        });
                    }
                });
                if(fromType =='CommentList'){
                    dsp.postFun('cj/appPush/updatePushProductsCollect', {"productid":id,"collectionCount":1,"push_id":push_id}, function (res) {
                        console.log(res)
                 });
                }
            } else {
                selectData.flag = '1';
                $scope.collectType = 1;//传给商品详情页面使用
                collectProPost(flag, selectData, function (data) {
                    layer.msg('Remove Successfully');
                    $this.attr('src', '/egg/image/favorites/love_product.png');
                });
                if(fromType =='CommentList'){
                    dsp.postFun('cj/appPush/updatePushProductsCollect', {"productid":id,"collectionCount":1,"push_id":push_id}, function (res) {
                        console.log(res)
                 });
                }
            }
        }
        /*收藏hover*/
        $scope.MerchEnter = function (ev) {
            if ($(ev.currentTarget).attr('src') == 'static/image/CJ-home/icon_love@2x.png') {
                $(ev.currentTarget).attr('src', 'static/image/CJ-home/love_hover@2x.png')
            }
        }
        $scope.MerchLeave = function (ev) {
            if ($(ev.currentTarget).attr('src') != 'static/image/CJ-home/icon_wishlist_click@2x.png') {
                $(ev.currentTarget).attr('src', 'static/image/CJ-home/icon_love@2x.png')
            }
        }
        $scope.ProMerchEnter = function (ev) {
            if ($(ev.currentTarget).find('img').attr('src') == '/egg/image/favorites/love_product.png') {
                $(ev.currentTarget).find('img').attr('src', '/egg/image/favorites/love_product_hover.png')
            }
        }
        $scope.ProMerchLeave = function (ev) {
            if ($(ev.currentTarget).find('img').attr('src') != '/egg/image/favorites/love_product_click.png') {
                $(ev.currentTarget).find('img').attr('src', '/egg/image/favorites/love_product.png')
            }
        }

        $scope.goActList = function (id) {
            if (!$scope.hasLogin) {
                // layer.msg('Please login first!');
                location.href = 'login.html?target=' + base64.encode('product-detail.html?id=' + id + '&list=1')
                return false;
            }
            // $scope.$broadcast('showlistframe', 1);
            $scope.$broadcast('pro-detail', {
                flag: 'show-list'
            })
            $scope.$broadcast('pro-detail', {
                flag: 'storage-default',
                areaObj: $scope.seleWare,
                wareListObj: $scope.wareListObj
            })
            // cjhome.goActList($scope);
        }
        $scope.toDetailWithSource = function (id) {
            cjhome.toDetailWithSource(id)
        }
        $scope.toDetailWithList = function (id) {
            cjhome.toDetailWithList(id)
        }

        //物流选择的弹框
        // $scope.maxWeight
        // $scope.merchAttr
        $scope.choseShipMethod = function () {
            const params = {
                flag: 'show-list',
                frompage: 'pro-detail',
            }
            if ($scope.platformItem == 'Lazada' || $scope.platformItem == 'Shopee') {
                params.outerplatformCountryItem = $scope.platformCountryItem
            } 
            $scope.$broadcast('to-ship-method', params);
        }

        //	张文静新增部分
        $scope.zwjid = dsp.getQueryString('id');
        $scope.zwjtype = dsp.getQueryString('type');
        $scope.storepid = dsp.getQueryString('storepid');
        var storeProductName = dsp.getQueryString('storeProductName') ? bs.decode(dsp.getQueryString('storeProductName')) : '';
        $scope.toConnectPage = function () {
            if ($scope.zwjtype == '0') {
                var manualConnectInfo = {};
                manualConnectInfo.cjProSku = currentMerch.SKU;
                manualConnectInfo.storeProductName = storeProductName;
                manualConnectInfo = bs.encode(JSON.stringify(manualConnectInfo));
                window.open('myCJ.html#/products-connection/sourcing-connection//' + manualConnectInfo, '_blank', '');
            } else {
                window.open('myCJ.html#/products-connection/sourcing-connection/' + currentMerch.SKU, '_blank', '');
            }
        }
        //---------------------video----------------------------------------
        var base64 = new Base64();
        $scope.DownDialog = false;
        $scope.isPayDalog = false;
        $scope.videoList = [];
        $scope.videoURL = '';
        var videoId = dsp.getQueryString('videoId') || '';

        function getvideoList() {
            return new Promise((resolve,reject)=>{
                dsp.postFun('app/businessVideo/selectVideoListByLocProductId', {
                    LocProductId: $scope.detailId,
                    flag: 'cj',
                    businessVideoId: videoId
                }, function (data) {
                    if (data.data.code == 200) {
                        $scope.videoList = data.data.videoList;

                        $scope.videoList.forEach(function (o, i) {
                            if (o.flag == '1') {
                                $scope.isPayDalog = true;
                                $scope.videoURL = o.videoUrl;
                                if (o.videoId) {
                                    $scope.videoIdURL = o.videoId;
                                }
                                $scope.fileName = o.videoName;
                            }
                        })
                        // 如果是视频商品，或有视频，则轮播图第一个显示视频
                        if(data.data.videoList.length > 0){
                            $scope.smallBoxType = 'video'
                        }else{
                            // 没有视频，产品大图轮播默认显示第一个产品图
                            $scope.smallBoxType = 'image'
                        }

                        resolve()
                    } else {

                    }
                }, function (data) {
                    msgLoading.hide();
                    reject()
                })
            })


        }

        $scope.Download = function (item) {
            maidian('videoDownLoadLoc')
            if (item.isFree == '0') {
                if (item.isBuy) {
                    //付过款
                    if (item.videoId) {
                        cjUtils.downloadVideo({ videoId: item.videoId, videoName: item.videoName })
                    } else {
                        var url = item.videoUrl;
                        if (url.indexOf('.') == -1) {
                            cjUtils.downloadVideo({ videoId: url, videoName: item.videoName })
                        } else {
                            cjUtils.downloadVideo({ sourceUrl: url, videoName: item.videoName })
                        }
                    }
                } else {
                    $scope.DownDialog = true;
                    $scope.isact1 = true;
                    $scope.isact2 = false;
                    $scope.copyrightPrice = item.copyrightPrice;
                    $scope.notCopyrightPrice = item.notCopyrightPrice;
                    //$scope.PermanentId = item.videoPriceList[1].id;
                    //$scope.LimitedId = item.videoPriceList[0].id;
                    $scope.videoId = item.id;
                    //$scope.videoPriceId = $scope.PermanentId;
                    $scope.videoType = 2;
                    $scope.selPrice = item.copyrightPrice
                }
            } else if (item.isFree == '1') {
                if (!$scope.hasLogin) {
                    layer.msg('Please sign in first.');
                    return false;
				}
                if (item.videoId) {
                    cjUtils.downloadVideo({ videoId: item.videoId, videoName: item.videoName })
                } else {
                    var url = item.videoUrl;
                    if (url.indexOf('.') == -1) {
                        cjUtils.downloadVideo({ videoId: url, videoName: item.videoName })
                    } else {
						cjUtils.downloadVideo({ sourceUrl: url, videoName: item.videoName })
                    }
                }
            }
        }
        $scope.price1 = function (price) {
            $scope.isact1 = true;
            $scope.isact2 = false;
            $scope.selPrice = price;
            $scope.videoType = 2;
        }
        $scope.price2 = function (price) {
            $scope.isact1 = false;
            $scope.isact2 = true;
            $scope.selPrice = price;
            $scope.videoType = 1;
        }
        $scope.payClick = function () {
            // 是否验证邮件处理
            if (dsp.isVerifyEmail()) return
            var data = {
                businessVideoId: $scope.videoId,
                businessVideoPrice: $scope.selPrice,
                videoType: $scope.videoType
            }
            const msgLoading = cjMessage.loading({ isFixed: true })
            dsp.postFun('app/businessVideo/downloadVideo', data, function (data) {
                msgLoading.hide()
                dsp.closeLoad();
                if (data.data.code == 200) {
                    location.href = 'myCJ.html#/payment/' + base64.encode(data.data.videoDownloadRecordId) + '/' + base64.encode(data.data.practicalPrice + '') + '//VIDEODTA' + '/' + base64.encode($scope.detailId) + '/' + base64.encode($scope.videoId);
                } else {
                    layer.msg('Submit failed');
                }
            }, function() {
                msgLoading.hide();
            })
        }
        $scope.DownloadVideo = function () {

            maidian('videoDownloadSource')
            if ($scope.videoIdURL) {
                var url = $('<a id="downLoadBtn" href="https://tools.cjdropshipping.com/tool/downLoad/byVideoId?videoId=' + $scope.videoIdURL + '&fileName=' + $scope.fileName + '.mp4" download=""></a>');
                url.get(0).click();
            } else {
                if ($scope.videoURL.indexOf('.') != -1) {
                    var url = $scope.videoURL;
                    var arr = url.split('.');
                    var videoName = $scope.fileName + '.' + arr[arr.length - 1];
                    var src = 'http://' + url
                    var link = $('<a id="downLoadBtn" href="https://tools.cjdropshipping.com/tool/downLoad/file?urlStr=' + src + '&fileName=' + videoName + '" download=""></a>');
                    link.get(0).click();
                } else {
                    var url = $('<a id="downLoadBtn" href="https://tools.cjdropshipping.com/tool/downLoad/byVideoId?videoId=' + $scope.videoURL + '&fileName=' + $scope.fileName + '.mp4" download=""></a>');
                    url.get(0).click();
                }
            }


        }
        $scope.videosrc = function (url) {
            return $sce.trustAsResourceUrl('https://' + url);
        }
        $scope.goVideoDemand = function (id, name) {
            if (!$scope.hasLogin) {
                layer.msg('Please login first!');
                return false;
            }
            var data = {
                locProductId: id,
                locProductUrl: 'https://app.cjdropshipping.com/product-detail.html?id=' + id
                // erp订单-视频订单-视频需求-商品URL 用
            }
            cjhome.goVideoDm(data, 'list');
        }

        $scope.goAddToSkulist = function () {
            const msgLoading = cjMessage.loading({ isFixed: true })
            var assignData = {};
            assignData.data = JSON.stringify({
                productId: $scope.detailId,
                shopMethod: $scope.merchShipMethod,
                defaultArea: $scope.seleWare ? $scope.seleWare.areaId : '',
            });
            dsp.postFun('app/locProduct/assign', JSON.stringify(assignData), function (data) {
                msgLoading.hide();
                if (data.data.statusCode == 200) {
                    $scope.addToSkulistLayer = false;
                    layer.msg('Added Successfully');
                    var parms = {
                        type: '0',
                        pid: $scope.detailId,
                        userid: $scope.userId
                    }
                    dsp.postFun('erp/publish/Calculation', parms, function () { })
                } else {
                    layer.msg('Added failed');
                }
            }, function() {
                msgLoading.hide();
            })
        }


        // // 手动关联新弹窗
        // $scope.addSkuContent = 'Are you sure to add to SKU list?';
        // $scope.addSkuTitle = 'Add to SKU List';
        // // 获取弹窗组件关闭按钮
        // $scope.$on('closePopUps', (e, d) => {
        //     $scope.addToSkulistLayer = false;
        // })
        // // 获取弹窗组件确定按钮
        // $scope.$on('confirmPopUps', (e, d) => {
        //     $scope.goAddToSkulist();
        // })

        $scope.addTosku = function () {
            $scope.addToSkulistLayer = true;
        }

        $('.pd-midr-tul').on('change', '#pod-color-sele', function () {
            $scope.canvasChanColor = $(this).val();
            changeColor(hexToRGB($scope.canvasBasicColor), hexToRGB($scope.canvasChanColor));
        });

        // 结果canvas
        var canvasResultFront = document.querySelector('#canvas-show');
        if (canvasResultFront) {
            var contextResultFront = canvasResultFront.getContext('2d');
        }
        // 图片数据
        var imgData = null,
            imgDataResultFront = null,
            imgDataOri = null;

        function hexToRGB(hex) {
            var long = parseInt(hex.replace(/^#/, ""), 16);
            return {
                R: (long >>> 16) & 0xff,
                G: (long >>> 8) & 0xff,
                B: long & 0xff
            };
        }

        function changeColor(oricolor, newColor) {
            $('#canvas-show').show();
            $('#zoom-box').hide();
            $('.mid-ls-row a').removeClass('active');
            var rgba = [];
            for (var k in oricolor) {
                rgba.push(oricolor[k]);
            }
            // 像素点色值
            // var rgba = rgbaPicker;
            // 容差大小
            var tolerance = $scope.podColor.range * 1;

            var newColorArr = [];
            for (var k in newColor) {
                newColorArr.push(newColor[k]);
            }
            // 基于原始图片数据处理
            if ($scope.choseBackImg) {
                actBackChange = 1;
                for (var index = 0; index < imgDataOriBack.data.length; index += 4) {
                    var r = imgDataOriBack.data[index];
                    var g = imgDataOriBack.data[index + 1];
                    var b = imgDataOriBack.data[index + 2];

                    if (Math.sqrt(
                            (r - rgba[0]) * (r - rgba[0]) +
                            (g - rgba[1]) * (g - rgba[1]) +
                            (b - rgba[2]) * (b - rgba[2])) <= tolerance) {
                        imgDataResultBack.data[index] = (newColorArr[0] + r - rgba[0]);
                        imgDataResultBack.data[index + 1] = (newColorArr[1] + g - rgba[1]);
                        imgDataResultBack.data[index + 2] = (newColorArr[2] + b - rgba[2]);
                        imgDataResultBack.data[index + 3] = imgDataOriBack.data[index + 3];
                    } else {
                        imgDataResultBack.data[index] = r;
                        imgDataResultBack.data[index + 1] = g;
                        imgDataResultBack.data[index + 2] = b;
                        imgDataResultBack.data[index + 3] = imgDataOriBack.data[index + 3];
                    }
                }
                // put数据
                contextResultBack.putImageData(imgDataResultBack, 0, 0);

            } else {
                actFrontChange = 1;
                for (var index = 0; index < imgDataOri.data.length; index += 4) {
                    var r = imgDataOri.data[index];
                    var g = imgDataOri.data[index + 1];
                    var b = imgDataOri.data[index + 2];

                    if (Math.sqrt(
                            (r - rgba[0]) * (r - rgba[0]) +
                            (g - rgba[1]) * (g - rgba[1]) +
                            (b - rgba[2]) * (b - rgba[2])) <= tolerance) {
                        // imgDataResultFront.data[index] = 0;
                        // imgDataResultFront.data[index + 1] = 0;
                        // imgDataResultFront.data[index + 2] = 0;
                        // imgDataResultFront.data[index + 3] = 0;
                        imgDataResultFront.data[index] = (newColorArr[0] + r - rgba[0]);
                        imgDataResultFront.data[index + 1] = (newColorArr[1] + g - rgba[1]);
                        imgDataResultFront.data[index + 2] = (newColorArr[2] + b - rgba[2]);
                        imgDataResultFront.data[index + 3] = imgDataOri.data[index + 3];
                    } else {
                        imgDataResultFront.data[index] = r;
                        imgDataResultFront.data[index + 1] = g;
                        imgDataResultFront.data[index + 2] = b;
                        imgDataResultFront.data[index + 3] = imgDataOri.data[index + 3];
                    }
                }
                // put数据
                // contextResultFront.clearRect(0, 0,comWidth,comHeight);
                contextResultFront.putImageData(imgDataResultFront, 0, 0);
            }

        };

        var comWidth, comHeight;

        function getPixels2(imgsrc, callback) {
            $('#canvas-show').show();
            $('#zoom-box').hide();
            $('.mid-ls-row a').removeClass('active');
            downloadedImg = new Image;
            // downloadedImg.crossOrigin = "Anonymous";
            downloadedImg.setAttribute('crossorigin', 'anonymous');
            downloadedImg.addEventListener("load", imageReceived, false);
            downloadedImg.src = imgsrc + '?time=' + new Date().getTime();

            function imageReceived() {
                if (this.width / this.height > 1) {
                    comWidth = 440;
                    comHeight = Math.floor(this.height / this.width * comWidth);
                } else {
                    comHeight = 440;
                    comWidth = Math.floor(this.width / this.height * comHeight);
                }
                // quseContext.clearRect(0, 0,250,250);
                // quseContext.drawImage(this, 0, 0,250,250);
                contextResultFront.clearRect(0, 0, comWidth, comHeight);
                contextResultFront.drawImage(this, 0, 0, comWidth, comHeight);
                // 获取像素信息数据
                // imgData = quseContext.getImageData(0, 0,300,300);
                imgDataOri = contextResultFront.getImageData(0, 0, comWidth, comHeight);
                imgDataResultFront = contextResultFront.getImageData(0, 0, comWidth, comHeight);
                callback();
            }
        }

        $scope.posiArrFront = [];
        $scope.posiArrBack = [];
        $scope.showPodZone = function (flag1) {
            $('#canvas-show').show();
            $('#zoom-box').hide();
            $('.mid-ls-row a').removeClass('active');
            // flag 1-正面 0-背面
            var r, g, b, a, xMax, xMin, yMax, yMin;
            var imgsrc, temXs, temCtx, temPosiArr;
            if (flag1) {
                imgsrc = $scope.podZone.front.editimgurl;
                temPosiArr = $scope.posiArrFront;
            } else {
                imgsrc = $scope.podZone.back.editimgurl;
                temPosiArr = $scope.posiArrBack;
            }
            temCtx = contextResultFront;
            downloadedImg = new Image;
            downloadedImg.crossOrigin = "Anonymous";
            downloadedImg.addEventListener("load", imageReceived, false);
            downloadedImg.src = imgsrc + '?time=' + new Date().getTime();

            function imageReceived() {
                // var comWidth, comHeight;
                if (this.width / this.height > 1) {
                    comWidth = 440;
                    comHeight = Math.floor(this.height / this.width * comWidth);
                } else {
                    comHeight = 440;
                    comWidth = Math.floor(this.width / this.height * comHeight);
                }
                canvasResultFront.width = comWidth;
                canvasResultFront.height = comHeight;
                temCtx.clearRect(0, 0, comWidth, comHeight);
                temCtx.drawImage(this, 0, 0, comWidth, comHeight);
                // 获取像素信息数据
                temXs = temCtx.getImageData(0, 0, comWidth, comHeight);
                // emptyIndexArrFront = [];
                var xArr = [];
                var yArr = [];
                var realIndex;
                for (var index = 0; index < temXs.data.length; index += 4) {
                    r = temXs.data[index];
                    g = temXs.data[index + 1];
                    b = temXs.data[index + 2];
                    a = temXs.data[index + 3];
                    if (r == 0 && g == 0 && b == 0 && a == 0) {
                        realIndex = index / 4;
                        xArr.push(realIndex % comWidth)
                        yArr.push(Math.floor(realIndex / comWidth))
                    }
                    // posiArr.push([r,g,b,a]);
                }

                function sortNumber(a, b) {
                    return a - b
                }

                xArr.sort(sortNumber);
                yArr.sort(sortNumber);
                xMax = xArr[xArr.length - 1] + 2;
                xMin = xArr[0] - 1;
                yMax = yArr[yArr.length - 1] + 2;
                yMin = yArr[0] - 1;
                temPosiArr = [xMin, yMin, xMax - xMin, yMax - yMin];
                temCtx.fillStyle = "rgba(0,255,0,0.2)";
                temCtx.fillRect(xMin, yMin, xMax - xMin, yMax - yMin);
                // put数据
                // contextResultBack.putImageData(imgDataResultBack, 0, 0);
            }
        }
        // 分享 xiaoy 2019-7-20
        $scope.shareShow = false;
        $scope.shareInfo = function (network) { // url 第三方分享
            maidian('shareLoc');
            const shareApi = { //title  -->  document.title
                twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(window.document.title)}&url=${encodeURIComponent(window.location.href)}`,
                facebook: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}`
            }
            window.open(shareApi[network], '_blank', 'width=' + 400 + ',height=' + 400 + ',left=' + 200 + ',top=' + 100 + ',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
        }

        function maidian(type) {
            
            dsp.postFun('cj/homePage/shangPinMaiDian', {
                ID: currentMerch.ID,
                BIGIMG: currentMerch.BIGIMG,
                NAME: currentMerch.NAME,
                SKU: currentMerch.SKU,
                type: type
            }, function (data) {

            }, function (data) {})
        }
        //展示添加到购物车
        $scope.showAddToCart = function () {
            
            let i = 0,
                isAllcheck = true,
                olen = $scope.varientArr.length;
            while (i < olen) {
                if (!$scope.varientArr[i].currKey) {
                    layer.msg("Please select " + $scope.varientArr[i].name);
                    isAllcheck = false;
                    break;
                }
                i++;
            }
            if (isAllcheck) {
                $scope.showAddCart = true;
            }
        }
        //添加到购物车
        $scope.addToCart = function () {
            

            dsp.postFun('app/buyOrder/getShoppingCart', {}, function (data) {
                if (data.data.code == 200) {
                    if (data.data.shoppingCart) {
                        $scope.buylist = data.data.shoppingCart.productList || [];

                    }
                    
                    var opeIndex = dsp.findIndexByKey($scope.buylist, 'SKU', $scope.merchSku);
                    if (opeIndex == -1) {
                        getCartdata();
                        $scope.buylist.push({
                            BIGIMG: $scope.curVarientImg,
                            CollectID: $scope.detailId,
                            ID: $scope.arrCartObj.ID,
                            NAMEEN: $scope.merchName,
                            SELLPRICE: $scope.arrCartObj.SELLPRICE,
                            SKU: $scope.merchSku,
                            checked: true,
                            discountPrice: $scope.arrCartObj.discountPrice,
                            isCollect: $scope.merchanisCollect,
                            itemcount: $scope.procount - 0
                        })
                    } else {
                        $scope.buylist[opeIndex].itemcount = ($scope.buylist[opeIndex].itemcount * 1) + ($scope.procount * 1);
                        $scope.buylist[opeIndex].checked = true;
                    }
                    dataStorage();
                }
            }, function (data) {
                layer.msg(data.message);
            });

        }

        function dataStorage() {
            dsp.postFun('app/buyOrder/editShoppingCart', {
                productList: $scope.buylist
            }, function (data) {
                    location.href = 'myCJ.html#/cart';
            }, function (data) {

            });
        }

        function getCartdata() {
            let olen = $scope.stanProducts.length;
            for (let i = 0; i < olen; i++) {
                if ($scope.stanProducts[i].SKU == $scope.merchSku) {
                    $scope.arrCartObj = {
                        SELLPRICE: $scope.stanProducts[i].SELLPRICE,
                        discountPrice: ($scope.stanProducts[i].SELLPRICE * $scope.stanProducts[i].sellDiscount / 100).toFixed(2),
                        ID: $scope.stanProducts[i].ID
                    }
                }
            }
        }

        // 下载商品图片
        $scope.downloadImg = () => {
            downloadImg($scope.merchLitImgs.join(','), $scope.merchSku)
        }
        function downloadImg(imgs, sku) {
            const msgLoading = cjMessage.loading({ isFixed: true })
            dsp.getFun(`erp/downloadImg/filesdown?imgs=${imgs}&sku=${sku}`, res => {
                msgLoading.hide();
                const {
                    data
                } = res
                
                cjUtils.exportFile(data, `${sku}.zip`)
            }, err => {
                msgLoading.hide();
            }, {
                responseType: 'blob'
            })
        }
        $scope.conTactFun = function () {
            window.postMessage({
                flag: 'openChat',
                supplierId: $scope.shopData.supplierId,
                shopName: $scope.shopData.name
            }, '*')
        }



      // 媒体拍摄要求
      $scope.photographyType = null;
      $scope.handleMediaShootingRequest = function() {
        if (!$scope.hasLogin) {
          layer.msg('Please login first!');
          return false;
        }
        const msgLoading = cjMessage.loading({ isFixed: true })
        dsp.postFun('media/orderMedia/todayCount', {}, ({ data }) => {
        msgLoading.hide();
          if (data.code === 200) {
            $scope.totalCount = data.data.totalCount;
            $scope.remainingCount = data.data.remainingCount;
            $scope.isShowPhotography = true;
            $scope.photographyType = null;
            $scope.instructions = '';
          }
        }, err => {
          msgLoading.hide();
        });
      };

      // 选择类型
      $scope.handelSelectPhotographyType = val => {
        $scope.photographyType = val
        layer.msg(`You selected ${val} shooting service.`)
      }

      // 媒体拍摄请求确认
      $scope.handlePhotographyConfirm = () => {
        if ($scope.remainingCount === 0) {
          layer.msg('Please note that you can only send us 5 requests per day.');
          return;
        }
        if (!$scope.photographyType) {
          layer.msg('Please select the shooting type');
          return;
        }
        const parmas = {
          "locProductId": $scope.detailId,
          "locProductUrl": `https://app.cjdropshipping.com/product-detail.html?id=${$scope.detailId}`,
          "description": $scope.instructions,
          "mediaType": $scope.photographyType === 'photo' ? 1 : 0,
          "quantity": $scope.photographyType === 'photo' ? 6 : undefined
        }
        const msgLoading = cjMessage.loading({ isFixed: true })
        dsp.postFun('media/orderMedia/addLocMediaDemand', parmas, ({ data }) => {
            msgLoading.hide()
          if (data.code === 200) {
            $scope.isShowPhotography = false;
          }else {
            layer.msg(data.message)
          }
        }, err => {
          msgLoading.hide();
        });
      }

    // 多语言模板切换-更新商品title和页签title
    $scope.$on('module-onchange', function (d, data) { // module-select onchange
        if (!data) return
        if (data.id == '999') {
            $scope.merchName = $scope.productdetail.NAMEEN; 
        } else {
            $scope.merchName = data.title;
        }
        document.title = $scope.merchName;
    })


    }
})(angular);
