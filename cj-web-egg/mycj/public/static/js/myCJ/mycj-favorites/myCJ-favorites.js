(function () {

    var app = angular.module('myCJFavorites', ['service', 'home-service']);

    var winHeight = $(window).height() * 1;
    var rightBarHeight = winHeight - 191;
    var nodataHeight = winHeight - 331;

    app.controller('myCJFavoritesCtrl', ['$scope', '$http', '$window', 'dsp', 'cjhome', '$routeParams', function ($scope, $http, $window, dsp, cjhome, $routeParams) {
        var bs = new Base64();
        $scope.userId = localStorage.getItem('userId') == null ? '' : bs.decode(localStorage.getItem('userId'));
        $scope.loginName = localStorage.getItem('loginName') == null ? '' : bs.decode(localStorage.getItem('loginName'));
        $scope.token = localStorage.getItem('token') == null ? '' : bs.decode(localStorage.getItem('token'));
        dsp.setRightMinHeight();
        var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
        if (vip == '1') {//vipFlag
            $('.header-nav').addClass('vipFlag');
            $('.mycj-right-wrap').css('background', '#F0EDE7').addClass('vip');
        } else {
            $('.header-nav').removeClass('vipFlag');
            $('.mycj-right-wrap').css('background', '#f2f3f5').removeClass('vip');
        }
        $('.header-nav li').eq(0).addClass('active');
        // 根据shopify判断按钮
        var getShopData = {};
        getShopData.data = JSON.stringify({
            userId: $scope.userId
        });
        /*
        $scope.zwjtype = false;
        dsp.postFun('app/shop/getshop', JSON.stringify(getShopData), function (data) {
            var shoplist = JSON.parse(data.data.result).shoplist;
            for (var i = 0; i < shoplist.length; i++) {
                // 筛选出shopify店铺（目前只支持shopify店铺）
                if (shoplist[i].TYPE == 'shopify') {
                    $scope.zwjtype = true;
                }
            }
        })
        */
        //获取商品类目
        dsp.getCateList(function (data) {
            $scope.categoryListOne = data;
        })
        dsp.domainData().then((res) => {
            // 请求成功的结果
            console.log(res)
            $scope.iscj = res.iscj;
            $scope.affModel = res.affModel;
        })

        // {"pageNum":"1","pageSize":"5","filter":"{\"categoryId\":\"\",\"inputStr\":\"\"}","flag":"1"}
        // flag = 0 全部, flag = 1 爬虫, flag = 2 本地
        $scope.favoriteList = [];
        $scope.pageNum = '1';
        $scope.pageSize = '10';
        $scope.favFalg = '0';
        $scope.totalNum = 0;
        $scope.seletedCate = '';
        $scope.searchVal = '';
        $scope.noListData = false;
        // $scope.noData = true;
        $scope.getFavoriteList = function (pageNum, pageSize, categoryId, inputStr, flag, scb) {
            var getFavData = {};
            getFavData.pageNo = pageNum;
            getFavData.pageSize = pageSize;
            getFavData.flag = flag;
            getFavData.filter = JSON.stringify({
                categoryId: categoryId,
                inputStr: inputStr
            });
            $scope.favoriteList = [];
            dsp.loadPercent($('.favorite-cont'), nodataHeight);
            dsp.postFun('cj/homePage/huoQuShouCangLieBiao', JSON.stringify(getFavData), function (data) {
                dsp.closeLoadPercent($('.favorite-cont'));
                var data = data.data;
                if (data.statusCode != 200) {
                    layer.msg('Get the wish list error');
                    return false;
                }
                var result = data.result;
                $.each(result.list, function (i, v) {
                    //BIGIMG
                    v.BIGIMG = updateImg(v.BIGIMG);
                });
                console.log(result);
                scb(result);
            });
        }

        function updateImg(imgurl) {
            var url;
            if (imgurl && imgurl.indexOf('https') != -1) {
                url = imgurl.replace('https://', 'https://');
            } else if (imgurl && imgurl.indexOf('http://') != -1) {
                url = imgurl.replace('http://', 'https://');
            } else if (imgurl) {
                url = "https://" + imgurl;
            } else {
                url = '';
            }
            return url;
        }

        $scope.hasListData = true;
        $scope.firstRender = function () {
            $scope.getFavoriteList($scope.pageNum, $scope.pageSize, $scope.seletedCate, $scope.searchVal, $scope.favFalg, function (data) {
                console.log('list', data);
                $scope.totalNum = data.totalNum;
                $scope.totalPageNum = Math.ceil($scope.totalNum / $scope.pageSize);
                if ($scope.totalNum > 0) {
                    $scope.hasListData = true;
                    $scope.noListData = false;
                    $scope.noData = false;
                    dsp.removeNodataPic($('.favorite-cont'));
                    //settleData(data);
                    $scope.favoriteList = data.list;
                    removeImgHttp($scope.favoriteList)
                    setPagination($scope.totalNum);
                } else {
                    $scope.hasListData = false;
                    if (!$scope.seletedCate && !$scope.searchVal) {
                        $scope.noData = true; // 一点数据也没有，展示默认图
                        $scope.noListData = false;
                    } else {
                        $scope.noListData = true; // 没有搜索到数据，展示nodata图
                        $scope.noData = false;
                        dsp.addNodataPic($('.favorite-cont'), nodataHeight);
                    }
                }

            });
        }
        $scope.firstRender();

        $scope.searchFavList = function () {
            $scope.firstRender();
        }
        $scope.enterSearch = function (event) {
            if (event.keyCode == 13) {
                $scope.searchFavList();
            }
        }
        $scope.chanPageSize = function () {
            $scope.firstRender();
        }
        $scope.chanPageNum = function () {
            if (!isNaN($scope.pageNum * 1) && $scope.pageNum * 1 > 0 && $scope.pageNum * 1 <= $scope.totalPageNum) {
                $scope.firstRender();
            } else {
                $scope.pageNum = 1;
            }
        }
        // $(document).keyup(function(event){
        //   if(event.keyCode ==13){
        //    $scope.searchFavList();
        //   }
        // });

        $scope.chingeVarient = function (index) {
            alert(index);
        }

        $('.pay-wares-list').on('change', 'li .varient-sel', function () {
            var curVarIndex = $(this).attr('index') * 1;
            // console.log($(this).val());
            var filterKeysOne = [];
            var cid = $(this).parent().siblings('.id-span').html();
            var cIndex = dsp.findIndexByKey($scope.localList, 'id', cid);
            var varientKeysInner = $scope.localList[cIndex].varientKeysInner;
            var varientArr = $scope.localList[cIndex].varientArr;
            for (var i = 0; i < varientKeysInner.length; i++) {
                var curVarKey = varientKeysInner[i].split('-');
                if (curVarKey[curVarIndex] == $(this).val()) {
                    filterKeysOne.push(curVarKey);
                }
            }
            // console.log(filterKeysOne);
            for (var i = 0; i < varientArr.length; i++) {
                // console.log(i);
                if (i == curVarIndex) continue;
                var canbeTwo = [];
                // console.log(filterKeysOne);
                for (var j = 0; j < filterKeysOne.length; j++) {
                    canbeTwo.push(filterKeysOne[j][i]);
                }
                // console.log(canbeTwo);
                // var curVarTwoIndex = curVarIndex + 1;
                var OtherSel1 = $(this).parent().find('.varient-sel').eq(i).val();
                var isInTwo = $.inArray(OtherSel1, canbeTwo);
                if (isInTwo == -1) {
                    $(this).parent().find('.varient-sel').eq(i).val(canbeTwo[0]);
                }
                var filterKeysTwo = [];
                var curValTwo = $(this).parent().find('.varient-sel').eq(i).val();
                for (var k = 0; k < filterKeysOne.length; k++) {
                    if (filterKeysOne[k][i] == curValTwo) {
                        filterKeysTwo.push(filterKeysOne[k]);
                    }
                }
                filterKeysOne = filterKeysTwo;
            }
        });

        function addFlag0(arr) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].flag = 0;
            }
        }

        function addFlag1(arr) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].flag = 1;
            }
        }

        function removeImgHttp(arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].bigImg)
                    arr[i].bigImg = 'https://' + arr[i].bigImg.replace('https://', '').replace('http://', '');
            }
        }

        // 处理返回数据
        function settleData(data) {
            var locaList = (data[0].location[0] == null ? [] : data[0].location);
            var reptLust = data[0].reptile;
            removeImgHttp(locaList);
            addFlag1(locaList);
            addFlag0(reptLust);
            $scope.localList = locaList;
            $scope.favoriteList = locaList.concat(reptLust);
            // $scope.totalNum = data[0].all;
            var localIds = [];
            for (var i = 0; i < $scope.localList.length; i++) {
                localIds.push($scope.localList[i].id);
            }
            // console.log(localIds);
            if (localIds.length == 0) return;
            dsp.getFun('pojo/product/getByIds?ids=' + localIds.join(','), function (data) {
                var data = data.data;
                var result = JSON.parse(data.result);
                console.log('varient', result);
                var varientKeysInnerObj = {};
                for (var k in result) {
                    var varientKeysInner = [];
                    for (var i = 0; i < result[k].length; i++) {
                        varientKeysInner.push(result[k][i].variantKey);
                    }
                    if (varientKeysInner[0] == 'default') {
                        varientKeysInner = [];
                    }
                    varientKeysInnerObj[k] = varientKeysInner;
                }
                for (var i = 0; i < $scope.localList.length; i++) {
                    $scope.localList[i].stanProducts = result[$scope.localList[i].id];
                    $scope.localList[i].varientKeysInner = varientKeysInnerObj[$scope.localList[i].id];
                }
                for (var i = 0; i < $scope.localList.length; i++) {
                    // console.log(i);
                    var varientArr = [];
                    var varientKeys = [];
                    if ($scope.localList[i].variantKeyEn != '') {
                        varientKeys = $scope.localList[i].variantKeyEn.split('-');
                        for (var h = 0; h < varientKeys.length; h++) {
                            varientArr.push({
                                name: varientKeys[h],
                                key: []
                            });
                        }
                        for (var j = 0; j < $scope.localList[i].stanProducts.length; j++) {
                            if ($scope.localList[i].stanProducts[j].variantKey != null) {
                                var curVarientVal = $scope.localList[i].stanProducts[j].variantKey.split('-');
                                for (var k = 0; k < curVarientVal.length; k++) {
                                    varientArr[k].key.push(curVarientVal[k]);
                                }
                            }
                        }
                        for (var m = 0; m < varientArr.length; m++) {
                            varientArr[m].key = $.unique(varientArr[m].key);
                        }
                    } else {
                        varientArr = [];
                    }

                    if (varientArr.length == 1 && varientArr[0].key.length == 0) {
                        varientArr = [];
                    }

                    // console.log(varientArr);
                    $scope.localList[i].varientArr = varientArr;
                }
                // console.log($scope.localList);
                $scope.favoriteList = $scope.localList.concat(reptLust);
            });
        }

        //处理分页函数
        function setPagination(totalCounts) {
            $(".page-index").jqPaginator({
                // totalPages: 20,//分页的总页数
                totalCounts: totalCounts,
                pageSize: $scope.pageSize * 1,
                visiblePages: 5,//显示多少页
                currentPage: $scope.pageNum * 1,//当钱第几页
                activeClass: 'current',
                prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
                next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
                page: '<a href="javascript:void(0);">{{page}}<\/a>',
                first: '<a class="prev" href="javascript:void(0);">&lt&lt;<\/a>',
                last: '<a class="prev" href="javascript:void(0);">&gt&gt;<\/a>',
                onPageChange: function (n, type) {
                    if (type == 'init') return;
                    $scope.getFavoriteList(n + '', $scope.pageSize, '', '', $scope.favFalg, function (data) {
                        console.log('list', data);
                        $scope.favoriteList = data.list;
                        removeImgHttp($scope.favoriteList)
                        //settleData(data);
                    });
                }
            });
        }


        // source按钮
        $scope.goActSource = function (id) {
            cjhome.goActSource(id);
        }

        //刊登编辑按钮
        // this.parentctrl = 'myCJfavorited';
        $scope.addEditFrame = function (id) {
            console.log(id)
            if (id != undefined) {
                $scope.$broadcast('showeditframe', {
                    from: '1',
                    pid: id
                });
            }

        }



        $scope.cancelCollection = function (item, idx) {
            dsp.postFun("cj/homePage/shouCangShnagPin", { productId: item.ID }, function (data) {
                if (data.status == 200) {
                    layer.msg('Deleted Successfully');
                    //$(ev.target).parents("li").remove();
                    $scope.favoriteList.splice(idx, 1)
                    if ($scope.favoriteList == 0) {
                        $scope.firstRender();
                    }
                }
            })
        }

        // 获取购物车数据
        //加入购物车
        $scope.buylist = [];
        function getCartdata() {
            dsp.postFun('app/buyOrder/getShoppingCart', {}, function (data) {
                console.log(data);
                if (data.data.code == 200) {
                    if (data.data.shoppingCart && data.data.shoppingCart.productList) {
                        $scope.buylist = data.data.shoppingCart.productList;
                    } else {
                        $scope.buylist = [];
                    }
                    console.log($scope.buylist)
                    $scope.addEditFrame($routeParams.pid);
                }
            }, function (data) {

            });
        }
        getCartdata();
        $scope.addDia = function (id) {
            $scope.itemcount = 1;
            $scope.additem = '';
            $scope.addDialog = true;
            dsp.postFun('cj/locProduct/huoQuShangPinXiangQing', JSON.stringify({ id: id, token: '' }), function (data) {
                // console.log(data);
                if (data.data.statusCode != 200) return;
                if (!data.data.result) return;
                $scope.additem = data.data.result;
                console.log($scope.additem);
                console.log($scope.additem.CATEGORYID);
                //获取推荐商品
                /*        $scope.merchCategoryId = $scope.additem.CATEGORYID;
                        cjhome.getRelateList($scope.pageNum, $scope);*/
                $scope.stanProducts = $scope.additem.stanProducts;
                $scope.varientArr = [];
                $scope.varientKeys = [];
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
                        $scope.varientArr[i].key = $.unique($scope.varientArr[i].key);
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

            });
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

            console.log($scope.variantItem);
        }
        $scope.checkIsNum = function (val, index) {
            console.log(val)
            if (isNaN(val) || val == '0') {
                if (index >= 0) {
                    $scope.buylist[index].itemcount = '1';
                } else {
                    $scope.itemcount = '1';
                }
            }
            console.log($scope.itemcount)
            // localStorage.setItem('buylist', JSON.stringify($scope.buylist));
            allprice()
        }
        $scope.plusOne = function (val, index) {
            if (index >= 0) {
                $scope.buylist[index].itemcount = $scope.buylist[index].itemcount * 1 + 1 + '';
                // localStorage.setItem('buylist', JSON.stringify($scope.buylist));
                allprice()
            } else {
                $scope.itemcount = $scope.itemcount * 1 + 1 + '';
            }
        }
        $scope.minusOne = function (val, index) {
            if (val == '1') return;
            if (index >= 0) {
                if (val == '') {
                    $scope.buylist[index].itemcount = '1';
                } else {
                    $scope.buylist[index].itemcount = $scope.buylist[index].itemcount * 1 - 1 + '';
                }
                // localStorage.setItem('buylist', JSON.stringify($scope.buylist));
                allprice()
            } else {
                if (val == '') {
                    $scope.itemcount = '1';
                } else {
                    $scope.itemcount = $scope.itemcount * 1 - 1 + '';
                }
            }
        }

        //计算价钱
        function allprice() {
            $scope.total = 0;
            $scope.sum = 0;
            var arr = [];
            $scope.buylist.forEach(function (o, i) {
                if (o.checked) {
                    arr.push(o);
                }
            })
            if ($scope.buylist.length > 0) {
                if (arr.length == $scope.buylist.length) {
                    $scope.checked = true;
                } else {
                    $scope.checked = false;
                }
            }
            arr.forEach(function (o, i) {
                $scope.total += Number(o.SELLPRICE) * Number(o.itemcount);
                $scope.sum += Number(o.itemcount);
            })
        }

        //添加
        $scope.addbuy = function ($event) {
            console.log('数量', $scope.itemcount)
            if($scope.itemcount == ''){
                layer.msg('Please input Quantilty.')
                return;
            }
            var opeIndex = dsp.findIndexByKey($scope.buylist, 'SKU', $scope.variantItem.SKU);
            console.log(opeIndex)
            dsp.postFun('app/buyOrder/gouWuCheMaiDian', { productId: $scope.additem.ID }, function (data) {
            }, function (err) {
            });
            if (opeIndex == -1) {
                // console.log('添加的', $scope.variantItem, '总的', $scope.buylist)
                var addItem = {};
                addItem.NAMEEN = $scope.additem.NAMEEN;
                addItem.SKU = $scope.variantItem.SKU;
                // addItem.VARIANTKEY = $scope.variantItem.VARIANTKEY;
                addItem.SELLPRICE = $scope.variantItem.SELLPRICE;
                addItem.itemcount = $scope.itemcount;
                addItem.BIGIMG = $scope.additem.BIGIMG;
                addItem.ID = $scope.variantItem.ID;
                addItem.isCollect = $scope.additem.isCollect
                addItem.checked = true;
                $scope.buylist.push(addItem)
            } else {
                $scope.buylist[opeIndex].itemcount = ($scope.buylist[opeIndex].itemcount * 1) + ($scope.itemcount * 1);
                $scope.buylist[opeIndex].checked = true;
            }
            // localStorage.setItem('buylist', JSON.stringify($scope.buylist));
            // $scope.checkAllFlag = false;
            // localStorage.setItem('buylistCheckAllFlag', '0');
            console.log($scope.buylist);
            dataStorage();
            cjhome.goToCart($event, $('#goods'));
            // layer.msg('The goods have been successfully added to the shopping cart!')
        }
        //数据操作存储后台
        function dataStorage() {
            dsp.postFun('app/buyOrder/editShoppingCart', { productList: $scope.buylist }, function (data) {

            }, function (data) {

            });
        }
        //关闭弹窗
        $scope.close = function () {
            $scope.addDialog = false;
        }
    }])
})()