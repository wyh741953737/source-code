var app = angular.module('home-service', ['service']);
app.service('cjhome', ['$window', '$http', '$compile', '$timeout', 'dsp', '$location', function ($window, $http, $compile, $timeout, dsp, $location) {
    var cjhome = this;
    var bs = new Base64();
    var salesmanid = bs.decode(localStorage.getItem('salesmanId') == undefined ? "" : localStorage.getItem('salesmanId'));
    var relateSalesman = bs.decode(localStorage.getItem('relateSalesman') == undefined ? "" : localStorage.getItem('relateSalesman'));
    this.showDropList = function (dropDom) {
        dropDom.stop().animate({
            height: 'show'
        });
    }
    this.hideDropList = function (dropDom) {
        dropDom.stop().animate({
            height: 'hide'
        });
    }
    this.logout2 = function ($scope) {
        dsp.postFun('app/platform/quitLogin', {"token": $scope.token}, function (n) {
            localStorage.removeItem('token');
            localStorage.removeItem('noEncodeToken');
            localStorage.removeItem('utmSource');
            console.log('退出在这儿, public/static/js/home/home-common.js');
            // 退出后，清除cookie中的email
            localStorage.removeItem('emailVerifyStatus');
            document.cookie = `emailVerifyStatus=0; domain=${__root__domain}`;
            localStorage.getItem('loginfromerp') && localStorage.removeItem('loginfromerp');
            dsp.delCookie('cjLoginName');
            dsp.delCookie('cjLoginToken');
            dsp.delAwcCookie('awc');
            $window.location.reload();
        }, function (n) {
            localStorage.removeItem('token');
            localStorage.removeItem('noEncodeToken');
            localStorage.removeItem('utmSource');
            localStorage.getItem('loginfromerp') && localStorage.removeItem('loginfromerp');
            dsp.delCookie('cjLoginName');
            dsp.delCookie('cjLoginToken');
            dsp.delAwcCookie('awc');
            $window.location.reload();
        });
    }
    function collectProPost(flag, selectData, scb) {
        dsp.postFun('cj/homePage/shouCangShnagPin', {productId: selectData.id}, function (data) {
            scb(data);
        });
    }
    this.goToCart = function ($event, targetDom) {
        var $this = $($event.currentTarget);
        var cart = targetDom;
        var imgtodrag = $this.parent().siblings('.proimg');
        var imgclone = imgtodrag.clone()
                .offset({
                    top: imgtodrag.offset().top,
                    left: imgtodrag.offset().left
                })
                .css({
                    'opacity': '1',
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
    this.collectMerch = function (flag, id, $event, targetDom) {
        var $this = $($event.currentTarget);
        var selectData = {};
        selectData.id = id;
        if ($this.attr('src') == 'static/image/home/collect-.png') {
            selectData.flag = '0';
            collectProPost(flag, selectData, function (data) {
                $this.attr('src', 'static/image/home/collect-red.png');
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
        } else {
            selectData.flag = '1';
            collectProPost(flag, selectData, function (data) {
                layer.msg('Remove Successfully');
                $this.attr('src', 'static/image/home/collect-.png');
            });
        }
    }
    /**/
    this.Collection = function (flag, id, $event, targetDom, fromType, push_id, History) {
        var $this = $($event.currentTarget);
        console.log(push_id)
        var selectData = {};
        selectData.id = id;
        if ($this.attr('src') == 'static/image/CJ-home/icon_love@2x.png' || $this.attr('src') == 'static/image/CJ-home/love_hover@2x.png') {
            selectData.flag = '0';
            collectProPost(flag, selectData, function (data) {
                console.log(data)
                $this.attr('src', 'static/image/CJ-home/icon_wishlist_click@2x.png');
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
            if (History) {
                History.forEach(function (o, i) {
                    if (o.id == id) {
                        o.isCollect = '1'
                    }
                });
                localStorage.setItem('viewHistory', JSON.stringify(History));
            }
        } else {
            selectData.flag = '1';
            collectProPost(flag, selectData, function (data) {
                layer.msg('Removed Successfully');
                $this.attr('src', 'static/image/CJ-home/icon_love@2x.png');
            });
            if(fromType =='CommentList'){
                dsp.postFun('cj/appPush/updatePushProductsCollect', {"productid":id,"collectionCount":1,"push_id":push_id}, function (res) {
                    console.log(res)
             });
            }
            if (History) {
                History.forEach(function (o, i) {
                    if (o.id == id) {
                        o.isCollect = '0'
                    }
                });
                localStorage.setItem('viewHistory', JSON.stringify(History));
            }
        }
    }
    /**/
    this.CollectionPro = function (flag, id, $event, targetDom,fromType,push_id) {
        var $this = $($event.currentTarget);
        var selectData = {};
        selectData.id = id;

        if ($this.attr('src') == '/egg/image/favorites/love_product.png' || $this.attr('src') == '/egg/image/favorites/love_product_hover.png') {
            selectData.flag = '0';
            this.collectType = 0;//传给商品详情页面使用
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
            this.collectType = 1;//传给商品详情页面使用
            collectProPost(flag, selectData, function (data) {
                layer.msg('Removed Successfully');
                $this.attr('src', '/egg/image/favorites/love_product.png');
            });
            if(fromType =='CommentList'){
                dsp.postFun('cj/appPush/updatePushProductsCollect', {"productid":id,"collectionCount":1,"push_id":push_id}, function (res) {
                    console.log(res)
             });
            }
        }
    }

    this.toDetailPage = function (flag, id, fromCountry) {
        if (flag == 1) {
            location.href = 'product-detail.html?id=' + id + '&from' + fromCountry;
        }
        if (flag == 0) {
            location.href = 'reptail-detail.html?id=' + id;
        }
    }

    this.toDetailWithSource = function (id) {
        location.href = 'reptail-detail.html?id=' + id + '&source=1';
    }
    this.toDetailWithList = function (id, fromCountry) {
        location.href = 'product-detail.html?id=' + id + '&from' + fromCountry + '&list=1';
    }

    this.searchByMerchName = function ($scope, fromCountry, fromType) {
        if ($scope.searchMerchName.trim()) {
            location.href = 'list-detail?search=' + $scope.searchMerchName + '&from=' + fromCountry + '&fromType=' + fromType;
            /*    if (type) {
                  location.href = 'list-detail.html?search=' + $scope.searchMerchName + '&from=' + type;
                } else {
                  location.href = 'list-detail.html?search=' + $scope.searchMerchName;
                }*/

        } else {
            layer.msg('Please enter keywords!')
        }
    }
    this.searchByMerchVal = function (serchStr, type) {
        if (serchStr.trim()) {
            if (type) {
                location.href = 'list-detail.html?search=' + serchStr + '&from=' + type;
            } else {
                location.href = 'list-detail.html?search=' + serchStr;
            }
        } else {
            layer.msg('Please enter keywords!')
        }
    }
    this.enterSearch = function (event, $scope) {
        if (event.keyCode == 13) {
            $scope.searchByMerchName();
        }
    }
    this.toMerchList = function (id, name, Country, fromType) {
        if (fromType || Country) {
            location.href = 'list-detail?id=' + id + '&name=' + bs.encode(name) + '&from=' + Country + '&fromType=' + fromType;
        } else {
            location.href = 'list-detail?id=' + id + '&name=' + bs.encode(name);
        }
    }

    //category 列表
    this.showCateList = function (dom1, dom2) {
        dom1.show();
        dom2.removeClass('glyphicon glyphicon-triangle-bottom');
        dom2.addClass('glyphicon glyphicon-triangle-top');
    }
    this.hideCateList = function (dom1, dom2) {
        dom1.hide();
        dom2.removeClass('glyphicon glyphicon-triangle-top');
        dom2.addClass('glyphicon glyphicon-triangle-bottom');
    }

    this.fixTopBar = function (dom) {
        $(document).scroll(function () {
            if ($(document).scrollTop() >= 70) {
                dom.css({
                    'position': 'fixed',
                    'top': 0
                });
            } else {
                dom.css({
                    'position': 'absolute',
                    'top': '70px'
                });
            }
        })
    }

    function err(err) {
        layer.closeAll('loading');
    }

    // source按钮
    this.goActSource = function (id, flag, cb) {
        layer.load(2);
        dsp.getFun('source/sourcing/daySourceCount', function (data) {
            layer.closeAll('loading');
            var data = data.data;
            if (data.count == 0) {
                layer.msg('Please note you can send us only ' + data.dayNum + ' daily. <br />Currently available ' + data.count + '. ');
                return;
            }
            if (flag == 'priv' && id > data.count) {
                layer.msg('Please note you can send us only ' + data.dayNum + ' daily. <br />Currently available ' + data.count + '. ');
                return;
            }
            layer.open({
                area: ['480px', '240px'],
                type:1,
                title: null,
                closeBtn: 0,
                btn: ['Cancel', 'Confirm'],
                // time:1000,
                shadeClose: true,
                skin: 'asj-home-layer',
                content: '<p style="margin-top:25px">Please note you can send us only ' + data.dayNum + ' daily. <br />' +
                'Currently available ' + data.count + '. <br /></p>',
                yes: function (index, layero) {
                    layer.close(index);
                },
                btn2: function (index, layero) {
                    // console.log(layero);
                    layero[0].children[2].lastElementChild.style['pointer-events'] = "none";
                    if (flag == 'priv') {
                        cb(index);
                        return false;
                    }
                    layer.load(2);
                    dsp.postFun('source/sourcing/sourceProduct', {'pid': id + '','searchSource':'cj-web'}, function (data) {
                        layer.closeAll('loading');
                        var data = data.data;
                        if (data.statusCode != 200) {
                            if (data.statusCode == 806) {
                                layer.msg('Please note you can send us only ' + data.dayNum + ' daily. ', {time: 2000}, function () {
                                    layer.close(index);
                                });
                            } else if (data.statusCode == 807) {
                                layer.msg('The sourcing request already existed. ', {time: 2000}, function () {
                                    layer.close(index);
                                });
                            }
                            return false;
                        }
                        layer.msg('Source success.', {time: 2000}, function () {
                            layer.close(index);
                        });
                        // location.href="home.html";
                    })
                    return false //
                },
            });
        }, err);
    }
    //视频发起请求按钮
    this.goVideoDm = function (data, flag, cb) {
        layer.load(2);
        data.salesManid = salesmanid;
        data.relateSalesman = relateSalesman;
        dsp.postFun('app/videoDemand/dayVideoShotingRequestCount', {}, function (res) {
            layer.closeAll('loading');
            var result = JSON.parse(res.data.result).count * 1;
            if (result == 0) {
                layer.msg('Please note that you can only send us 5 requests per day. <br />Currently available 0. ');
                return;
            }
            layer.open({
                area: ['480px', '300px'],
                title: null,
                type:1,
                closeBtn: 0,
                btn: ['Cancel', 'Confirm'],
                // time:1000,
                shadeClose: true,
                skin: 'asj-home-layer asj-source-layer',
                content: '<h6 class="asj-home-layer-tit">Video Shooting Request</h6><p class="asj-hom-conp">Did you initiate a video capture request to us? <br />Please note that you can only send us 5 requests per day. <br />Currently available ' + result + '. </p>',
                yes: function (index, layero) {
                    layer.close(index);
                },
                btn2: function (index, layero) {
                    layer.load(2);
                    if (flag == 'source') {
                        dsp.postFun('app/videoDemand/addVideoDemandOfProductDetailOfResource', data, function (data) {
                            layer.closeAll('loading');
                            var data = data.data;
                            if (data.statusCode != 200) {
                                if (data.statusCode == 666) {
                                    layer.msg('Please note that you can only send us 5 requests per day. ', {time: 1000}, function () {
                                        layer.close(index);
                                    });
                                } else if (data.statusCode == 888) {
                                    layer.msg('This video is under shoting, please check it later.', {time: 1000}, function () {
                                        layer.close(index);
                                    });
                                }
                                return false;
                            }
                            layer.msg('Source success.', {time: 1000}, function () {
                                layer.close(index);
                            });
                            // location.href="home.html";
                        })
                    } else if (flag == 'list') {
                        dsp.postFun('app/videoDemand/addVideoDemandOfProductDetailOfList', data, function (data) {
                            layer.closeAll('loading');
                            var data = data.data;
                            if (data.statusCode != 200) {
                                if (data.statusCode == 666) {
                                    layer.msg('Please note that you can only send us 5 requests per day. ', {time: 1000}, function () {
                                        layer.close(index);
                                    });
                                } else if (data.statusCode == 888) {
                                    layer.msg('This video is under shoting, please check it later.', {time: 1000}, function () {
                                        layer.close(index);
                                    });
                                }
                                return false;
                            }
                            layer.msg('Source success.', {time: 1000}, function () {
                                layer.close(index);
                            });
                            // location.href="home.html";
                        })
                    } else if (flag == 'store') {
                        dsp.postFun('app/videoDemand/addVideoDemand', {
                            "data": data
                        }, function (data) {
                            layer.closeAll("loading");
                            if (data.data.statusCode != 200) {
                                layer.msg('Added failure.');
                            } else {
                                layer.msg('Added Success.');
                                $location.path('video-demand');
                            }
                        }, function (err) {
                        });
                    } else if (flag == 'individual') {
                        dsp.postFun('app/videoDemand/addVideoDemand', {
                            "data": JSON.stringify(data),
                            //'type' : tp
                        }, function (data) {
                            layer.closeAll("loading");
                            if (data.data.statusCode != 200) {
                                layer.msg('Added failure.');
                            } else {
                                layer.msg('Added Success.');
                                $location.path('video-demand');
                            }
                        }, function (err) {
                        })
                    }
                },
            });
        }, err);
    }

    this.getRelateList = function (pageNum, $scope) {
        var data = {};
        data.userId = $scope.userId;
        data.token = $scope.token;
        data.flag = $scope.relatedFlag || '0';
        data.data = {};
        data.data.pageNum = pageNum;//第几页
        data.data.pageSize = '4';//一页多少条
        data.data.filter = {
            categoryId: $scope.merchCategoryId
        };
        data.data = JSON.stringify(data.data);
        data.data.filter = JSON.stringify(data.data.filter);
        $(".pd-commodity-show .ProWarp").busyLoad("show", {
            color: '#FF7700',
            background: 'transparent'
        })
        dsp.postFun('app/locProduct/cjList', JSON.stringify(data), function (data) {
            $(".pd-commodity-show .ProWarp").busyLoad("hide");
            var data = data.data;
            if (data.statusCode != 200) {
                layer.msg('The server is busy now, please try again later.');
                return false;
            }
            var result = JSON.parse(data.result);
            if (result.all == 0 || result.locationAll == 0) {
                $scope.noRelateMerch = true;
                return false;
            }
            if (result.locationAll > 0) {
                $scope.noRelateMerch = false;
                for (var i = 0; i < result.location.length; i++) {
                    result.location[i].flag = 1;
                    result.location[i].bigImg = result.location[i].bigImg.replace('https://', '')
                    result.location[i].bigImg = result.location[i].bigImg.replace('http://', '')
                }
                if (result.locationAll < 4) {
                    $scope.lessThanOnePageRe = true;
                } else {
                    $scope.lessThanOnePageRe = false;
                }
                $scope.relatedList = result.location;
                $scope.totalRelatePage = Math.ceil(result.locationAll / 4);
                return;
            }
            $scope.noRelateMerch = false;

            if (result.all < 4) {
                $scope.lessThanOnePageRe = true;
            } else {
                $scope.lessThanOnePageRe = false;
            }
            if (result.location[0] != null) {
                for (var i = 0; i < result.location.length; i++) {
                    result.location[i].flag = 1;
                }
            } else {
                result.location = [];
            }
            if (result.reptile[0] != null) {
                for (var i = 0; i < result.reptile.length; i++) {
                    result.reptile[i].flag = 0;
                }
            } else {
                result.reptile = [];
            }

            var merchSum = result.location.concat(result.reptile);
            for (var i = 0; i < merchSum.length; i++) {
                if (merchSum[i].bigImg != null) {
                    merchSum[i].bigImg = merchSum[i].bigImg.replace('https://', '')
                    merchSum[i].bigImg = merchSum[i].bigImg.replace('http://', '')
                }
            }
            $scope.relatedList = merchSum;
            $scope.totalRelatePage = Math.ceil(result.all / 4);
        });
    }

    this.addFlag0 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].flag = 0;
        }
    }
    this.addFlag1 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].flag = 1;
        }
    }
    this.removeImgHttp = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].bigImg = arr[i].bigImg.replace('https://', '');
            arr[i].bigImg = arr[i].bigImg.replace('http://', '');
        }
    }

    // 缓存当前商品信息到localStorage
    this.storeOneMerch = function (currentProduct, flag) {
        var saveToHistory = {}
        saveToHistory.bigImg = (currentProduct.bigImg || currentProduct.BIGIMG).replace('https://', '').replace('http://', '');
        saveToHistory.categoryId = currentProduct.categoryId || currentProduct.CATEGORYID;
        saveToHistory.english = currentProduct.english || currentProduct.NAMEEN;
        saveToHistory.id = currentProduct.id || currentProduct.ID;
        saveToHistory.isCollect = currentProduct.isCollect;
        saveToHistory.price = currentProduct.price || currentProduct.SELLPRICE;
        saveToHistory.nowPrice = currentProduct.nowPrice;
        saveToHistory.flag = flag;
        saveToHistory.num = currentProduct.listed;
        if (currentProduct.customMessage) {
            saveToHistory.isPersonalized = '1';
        } else {
            saveToHistory.isPersonalized = '0';
        }
        if (localStorage.getItem('viewHistory')) {
            var viewHistoryArr = JSON.parse(localStorage.getItem('viewHistory'));
            if (viewHistoryArr.length > 0) {
                if (viewHistoryArr.length >= 20) { // 限制缓存商品数量
                    viewHistoryArr.splice(viewHistoryArr.length - 1, 1);
                }
                var currProIndex = dsp.findIndexByKey(viewHistoryArr, 'id', saveToHistory.id);
                if (currProIndex != -1) {
                    viewHistoryArr.splice(currProIndex, 1);
                    viewHistoryArr.unshift(saveToHistory);
                } else {
                    viewHistoryArr.unshift(saveToHistory);
                }
            } else {
                viewHistoryArr.unshift(saveToHistory);
            }
            localStorage.setItem('viewHistory', JSON.stringify(viewHistoryArr));;
        }
        else {
            localStorage.setItem('viewHistory', '[' + JSON.stringify(saveToHistory) + ']');
        }
    }
    this.getHistoryList = function (pageNum, pageSize, viewHistoryArr) {
        var historyList = viewHistoryArr.splice(pageSize * (pageNum - 1), pageSize);
        return historyList;
    }
    this.getStoreMerchs = function ($scope) {
        if (localStorage.getItem('viewHistory')) {
            $scope.viewHistory = JSON.parse(localStorage.getItem('viewHistory'));
            $scope.totalHistoryPage = Math.ceil($scope.viewHistory.length / 4);
            if ($scope.viewHistory.length > 0) {
                $scope.noHistory = false;
            } else {
                $scope.noHistory = true;
            }
            if ($scope.viewHistory.length > 4) {
                $scope.lessThanOnePage = false;
            } else {
                $scope.lessThanOnePage = true;
            }
            var tempArr = JSON.parse(JSON.stringify($scope.viewHistory));
            $scope.historyList = this.getHistoryList(1, 4, tempArr);
        }
    }

}]);

