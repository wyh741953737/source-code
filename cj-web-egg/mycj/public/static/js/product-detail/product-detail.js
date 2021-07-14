;
(function () {

    var app = angular.module('pd-app', ['service', 'home-service', 'cjCompnentModule', 'cjDirectiveModule', 'CommonHeaderCom', 'commonRelatedLinks', 'CommonFooterCom', 'custom-filter', 'utils', 'cjDotModule']);
    // 创建组件模块
    angular.module('cjCompnentModule', ['ngSanitize']);
    app.directive('onFinishRenderFilters', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }
    });
    app.controller('pd-controller', ['$scope', '$http', '$window', 'dsp', 'cjhome', '$location', '$timeout', '$sce', '$rootScope', '$filter', 'utils',
        function ($scope, $http, $window, dsp, cjhome, $location, $timeout, $sce, $rootScope, $filter, utils) {
            // -------------------------------- 19-06-22 汇率
            // setTimeout(() => handleAction(), 1000)
            window.onload = function() {
                handleAction()
            }
            function handleAction() {//用户分析跳转后 执行 对应的 运费计算  or
                const action = dsp.getQueryString('action')// string or null
                console.log('handleAction -->> action', action)
                if (action === 'calc') {
                    // const detailId = dsp.getQueryString('id')
                    setTimeout(() => {
                        document.getElementsByClassName('pd-midr-seclet')[0].click()
                    }, 1000)
                }
                if (action === 'list') {
                    // $scope.choseShipMethod()
                    setTimeout(() => {
                        document.getElementsByClassName('pd-listing')[0].click()
                    }, 1000)

                }
            }
            $rootScope.$on('calc-exchange-rate', function (ev, rate) {
                utils.forceRefresh({
                    $scope,
                    $timeout,
                    keys: ['historyList', 'likeList']
                });
            });
            $scope.productType = dsp.getQueryString('productType') || '0';
            dsp.domainData().then((res) => {
                // 请求成功的结果
                $scope.iscj = res.iscj;

                if ($scope.iscj == '1') {
                    //cj
                    $scope.icon = '/favicon.ico';
                    $scope.relatedFlag = '0'; //请求相关商品用
                    getLikeList()
                } else {
                    //客户
                    $scope.icon = res.logo1 || '/favicon.ico';
                    $('link[rel$=icon]').replaceWith('');
                    $('head').append($('<link rel="shortcut icon"/>').attr('href', $scope.icon));
                    $scope.affModel = res.affModel;
                    if ($scope.affModel == '1' || $scope.affModel == '4') {
                        $scope.relatedFlag = '0'; //请求相关商品用
                        getLikeList()
                    } else {
                        $scope.relatedFlag = '2'; //请求相关商品用
                    }
                }
                $scope.evalute =  [
                  {desc: 'Item as Described', number: 0},
                  {desc: 'Communication', number: 0},
                  {desc: 'Shipping Speed', number: 0},
                ]

                $scope.$on('todetailpage', function (d, data) {
                    if (data) {
                        if (data.flag == 'catecategory') {
                            $scope.hasMerchData = true;
                            if ($scope.productType == '3') return;
                            $scope.merchCategoryArr = data.category;
                            $scope.merchCategoryId = data.category[2].id;
                            if ($scope.affModel == '2' || $scope.affModel == '3') {
                                cjhome.getRelateList($scope.relatePageNum, $scope);
                            }
                            $scope.shopData = data.shopData;
                            if(data.shopData.supplierId) {
                                dsp.postFun('supplierPlanInfo/selectPlanBySupplierId', {
                                    "supplierId": data.shopData.supplierId,
                                    }, function (res) {
                                        if(res.status === 200) {
                                            $scope.defaultPlan = res.data.data.defaultPlan;
                                        }
                                    }, function() {},
                                );
                                dsp.postFun('cjEvaluation/getSupplierGrade' , {
                                supplierId: data.shopData.supplierId
                                }, function(res) {
                                    if(res.status === 200 && res.data.code === 200) {
                                        $scope.evalute =  [
                                            {desc: 'Item as Described', number: res.data.data.avgGoodMatch},
                                            {desc: 'Communication', number: res.data.data.avgAnswerSpeed},
                                            {desc: 'Shipping Speed', number: res.data.data.avgDeliverySpeed},
                                        ]
                                    }
                                })
                            }
                        }
                        if (data.flag == 'has-data') {
                            // $scope.nodata = true;
                            // $scope.nodataType = data.type;
                            $scope.hasMerchData = true;
                        }
                        if(data.productType) {
                            $scope.productType = data.productType;
                        }
                    }

                });
            })
            var base64 = new Base64();
            $scope.userId = localStorage.getItem('userId') == null ? '' : base64.decode(localStorage.getItem('userId'));
            $scope.loginName = localStorage.getItem('firstName') == null ? '' : base64.decode(localStorage.getItem('firstName'));
            $scope.token = localStorage.getItem('token') == null ? '' : base64.decode(localStorage.getItem('token'));
            $scope.isFromChina = true; // 类目列表用
            $scope.hasLogin = dsp.isInLoginState();
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
            var handleReady = function (e) {
                var target = $(e.target);
                var video = target.find('video');
                var src = video.attr('src');
                if (!video.attr('data-src')) {
                    video.attr('data-src', src);
                    video.attr('src', 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/15306336/338209605760.mp4');
                }
            }

            var winHeight = $(window).height() * 1;
            $('.pd-con-wrap').css('min-height', (winHeight - 181) + 'px');

            //获取头部传过来的id
            $scope.detailId = dsp.getQueryString('id') || '';
            $scope.detailIdBase = base64.encode('product-detail.html?id=' + $scope.detailId);
            $scope.productid = $scope.detailId;
            $scope.tokenFromErp = dsp.getQueryString('token');
            $scope.fromCountry = dsp.getQueryString('from') || 'all';
            $scope.fromType = dsp.getQueryString('fromType') || 'all';
            $scope.merchFlag = 1;

            if (dsp.isPhone()) {
                var jsonArgs = dsp.href2json(window.location.href);

                jsonArgs.page = 'product-detail';
                dsp.skipToMobile(jsonArgs);

                return;
            }

            $('#canvas-show').hide();


            // 相关商品
            $scope.relatePageNum = 1;
            $scope.noRelateMerch = true;
            $scope.lessThanOnePageRe = true;
            // cjhome.getRelateList($scope.relatePageNum, $scope);
            $scope.showPrevRelate = function () {
                $scope.relatePageNum--;
                if ($scope.relatePageNum < 1) {
                    $scope.relatePageNum = $scope.totalRelatePage;
                    // layer.msg('Sorry, No Data Found!');
                }
                cjhome.getRelateList($scope.relatePageNum, $scope);
            }
            $scope.showNextRelate = function () {
                $scope.relatePageNum++;
                if ($scope.relatePageNum > 1) {
                    $('.pd-commodity-show .left-icon').stop().show({
                        duration: 300,
                    })
                }
                if ($scope.relatePageNum > $scope.totalRelatePage) {
                    $scope.relatePageNum = 1;
                }
                cjhome.getRelateList($scope.relatePageNum, $scope);
            }

            // 猜你喜欢
            var likePageNum = '1';
            const { getInterfereProdVersion, isTempUserId } = window
            const getVersion = getInterfereProdVersion && getInterfereProdVersion()
            const likeListArr = {}
            function getLikeList() {
                if (likeListArr[likePageNum]) {
                    $scope.likeList = likeListArr[likePageNum];
                    return
                }
                const interfereProdVersion = getVersion && getVersion() || undefined
                const getTempUserIdFun = isTempUserId && isTempUserId() || (async () => {})
                getTempUserIdFun().then(tempUserId => {
                    const msgLoading = cjMessage.loading({ popupContainerDom: document.querySelector('.pd-commodity-show') })
                    dsp.postFun('elastic-api/recommend/search/productDetail/queryPage', {
                        page: likePageNum,
                        size: "8",
                        tempUserId: tempUserId, // 如果没有登录，使用临时id
                        versionNum: interfereProdVersion, // 版本号
                        productId: $scope.detailId,
                        requestSource: '0', // 请求来源  0 : web端 1 : M站/App
                    }, function (data) {
                        const d = data.data
                        // $(".pd-commodity-show .ProWarp").busyLoad("hide");
                        msgLoading.hide();
                        if (d.success && d.data.content) {
                            var list = d.data.content;
                            if (interfereProdVersion == undefined) {
                                // 没有版本号的时候，设置
                                getVersion && getVersion(list[0] && list[0].versionNum)
                            }
                            for (var i = 0; i < list.length; i++) {
                                list[i].flag = '1';
                                list[i].num = list[i].num;
                                list[i].bigImg = list[i].bigImg ? ('https://' + list[i].bigImg.replace('https://', '').replace('http://', '')) : ''
                            }
                            likeListArr[likePageNum] = list
                            $scope.likeList = list;
                            $scope.likeListPage = d.data.totalPages;
                        }
                    }, function() {
                        msgLoading.hide()
                    });
                })
            }

            $scope.pageLike = function (flag) {
                if (flag) {
                    likePageNum++;
                    if (likePageNum > $scope.likeListPage) {
                        likePageNum = 1;
                    }
                } else {
                    likePageNum--;
                    if (likePageNum == 0) {
                        likePageNum = $scope.likeListPage;
                    }
                }
                getLikeList();
            }

            // 浏览历史
            $scope.historyPageNum = 1;
            $scope.noHistory = true;
            $scope.lessThanOnePage = true;
            cjhome.getStoreMerchs($scope);
            if ($scope.viewHistory instanceof Array) {
                $scope.isShowHistoryBtn = ($scope.viewHistory.length / 4) > 1;
            }
            $scope.showPrevHistory = function () {
                $scope.historyPageNum--;
                if ($scope.historyPageNum < 1) {
                    $scope.historyPageNum = $scope.totalHistoryPage
                }
                var tempArr = JSON.parse(JSON.stringify($scope.viewHistory));
                $scope.historyList = cjhome.getHistoryList($scope.historyPageNum, 4, tempArr);
            }
            $scope.showNextHistory = function () {
                $scope.historyPageNum++;
                if ($scope.historyPageNum > 1) {
                    $('.pd-history-show .left-icon').stop().show({
                        duration: 300,
                    })
                }
                if ($scope.historyPageNum > $scope.totalHistoryPage) {
                    $scope.historyPageNum = 1;
                }
                var tempArr = JSON.parse(JSON.stringify($scope.viewHistory));
                $scope.historyList = cjhome.getHistoryList($scope.historyPageNum, 4, tempArr);
            }
            /*类目*/
            $scope.cateClick = function (id, idx) {
                var arr;
                arr = $scope.merchCategoryArr.slice(0, idx + 1);
                if ($rootScope.isPrintonDemand) {
                    location.href = 'PrintonDemand.html?firstId=' + arr[0].id + '&&CateId=' + id + '&&CateType=' + idx + 1;
                } else {
                    cjhome.toMerchList(id, JSON.stringify(arr), $scope.fromCountry, $scope.fromType);
                }
            }

            $scope.getTotalCost = function () {
                $scope.totalCost = $scope.merchPrice * 1 + $scope.shipCost * 1;
                return $scope.totalCost;
            }

            //处理是否收藏
            $scope.Merch = function (flag, id, $event) {
                if ($scope.hasLogin) {
                    cjhome.CollectionPro(flag, id, $event, $('#wishlist-box'));
                } else {
                    layer.msg('Please login first!');
                }
            }
            $scope.collectMerch = function (flag, id, $event, type) {
                $event.stopPropagation();
                if ($scope.hasLogin) {
                    if (type == 'History') {
                        cjhome.Collection(flag, id, $event, $('#wishlist-box'), $scope.historyList);
                    } else {
                        cjhome.Collection(flag, id, $event, $('#wishlist-box'));
                    }
                } else {
                    layer.msg('Please login first!');
                }
            }
            $scope.toDetailPage = function (flag, id) {
                cjhome.toDetailPage(flag, id);
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
                if ($(ev.currentTarget).attr('src') == 'static/image/CJ-home/love_product@2x.png') {
                    $(ev.currentTarget).attr('src', 'static/image/CJ-home/love_product_hover@2x.png')
                }
            }
            $scope.ProMerchLeave = function (ev) {
                if ($(ev.currentTarget).attr('src') != 'static/image/CJ-home/love_product_click@2x.png') {
                    $(ev.currentTarget).attr('src', 'static/image/CJ-home/love_product@2x.png')
                }
            }
            /*商品点击去详情*/
            $scope.goTodetail = function (item) {
                if (item.flag == '1') {
                    window.open('product-detail.html?id=' + item.id + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType + '&productType=' + (item.productType || 0));
                } else {
                    window.open('reptail-detail.html?id=' + item.id);
                }
            };
            //listOrsource按钮
            $scope.listOrsourceBtn = function (item, $event, type) {
                $event.stopPropagation();
                if ($scope.hasLogin) {
                    if (type == 'source') {
                        window.open('reptail-detail.html?id=' + item.id + '&source=1');
                    } else if (type == 'list') {
                        window.open('product-detail.html?id=' + item.id + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType + '&list=1');
                    }
                } else {
                    if (type == 'source') {
                        location.href = 'login.html?target=' + base64.encode('reptail-detail.html?id=' + item.id + '&source=1');
                    } else if (type == 'list') {
                        location.href = 'login.html?target=' + base64.encode('product-detail.html?id=' + item.id + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType + '&list=1');
                    }
                }
            };
            $scope.toDetailWithSource = function (id) {
                cjhome.toDetailWithSource(id)
            }
            $scope.toDetailWithList = function (id) {
                cjhome.toDetailWithList(id)
            }
            $scope.toMyStore = function () {
                location.href = `/list-detail.html?from=all&fromType=all&store=1&storeId=${$scope.shopData.id}&storeName=${$scope.shopData.name}`
            }
            $scope.conTactFun = function () {
                window.postMessage({
                    flag: 'openChat',
                    supplierId: $scope.shopData.supplierId,
                    shopName: $scope.shopData.name
                }, '*')
            }

            // 多语言模板切换
            var lang = localStorage.getItem('language') || 'en'
            if (lang != 'en') {
                lang = lang.split('|')[1]
            }

            $scope.currentModuleId = '999' // 999 为default 默认模板
            $scope.moduleList = []
            var getModuleList = function () { // 获取模板列表
                dsp.postFun('erp/loproductLanguage/getLocproductLanguage', {
                    "productId": $scope.productid
                }, function (res) {
                    if (res.data.statusCode == '200') {
                        let list = res.data.result
                        $scope.moduleList = list

                        if (lang == 'en') return
                        for (let i = 0; i < list.length; i++) {
                            if (lang.startsWith(list[i].language)) {
                                $scope.currentModuleId = String(list[i].id)
                                $scope.moduleOnchange()
                                break
                            }
                        }
                    }
                })
            }
            getModuleList()

            // module onchange
            $scope.moduleOnchange = function () {
                let moduleItem = {
                    'id': '999'
                }
                $scope.moduleList.forEach(item => {
                    if (item.id == $scope.currentModuleId) {
                        moduleItem = item
                    }
                })

                $scope.$broadcast('module-onchange', moduleItem)
            }

        }
    ]);

    document.addEventListener(
      "error",
      function (e) {
        var elem = e.target;
        if (elem.tagName.toLowerCase() === "img") {
          elem.src = "static/image/public-img/default.jpg";
        }
      },
      true /*指定事件处理函数在捕获阶段执行*/
    );
})();