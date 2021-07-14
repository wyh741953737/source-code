(function () {

    var app = angular.module('repd-app', ['service', 'home-service', 'cjCompnentModule', 'CommonHeaderCom', 'commonRelatedLinks', 'CommonFooterCom', 'custom-filter','utils','cjDotModule']);
    // 创建组件模块
    angular.module('cjCompnentModule', []);
    app.controller('repd-controller', ['$rootScope', '$timeout', '$scope', '$http', '$window', 'dsp', 'cjhome', '$sce', '$filter', 'utils', function ($rootScope, $timeout, $scope, $http, $window, dsp, cjhome, $sce, $filter,utils) {
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
            // 如果不是erp过来的登录，加载聊天
            if (!localStorage.getItem('loginfromerp')) {
                dsp.addChatWindow();
                dsp.addGuidWindow();
            }
        })
        var base64 = new Base64();
        $scope.userId = localStorage.getItem('userId') == null ? '' : base64.decode(localStorage.getItem('userId'));
        $scope.loginName = localStorage.getItem('firstName') == null ? '' : base64.decode(localStorage.getItem('firstName'));
        $scope.token = localStorage.getItem('token') == null ? '' : base64.decode(localStorage.getItem('token'));
        $scope.isFromChina = true; // 类目列表用
        $scope.hasLogin = dsp.isInLoginState();
        var winHeight = $(window).height() * 1;
        var noDataHeight = winHeight - 256;
        $('.pd-con-wrap').css('min-height', ($(window).height() * 1 - 181) + 'px');
        $scope.detailId = dsp.getQueryString('id') || '';//存储商品详情的id
        $scope.isActSource = dsp.getQueryString('source');
        $scope.fromCountry = dsp.getQueryString('from') || 'all';
        $scope.fromType = dsp.getQueryString('fromType') || 'all';
        $scope.merchFlag = 0;
        if ($scope.detailId == '') {
            $scope.hasMerchData = false;
            return false;
        }

        if (dsp.isPhone()) {
            var jsonArgs = dsp.href2json(window.location.href);

            jsonArgs.page = 'reptail-detail';
            dsp.skipToMobile(jsonArgs);

            return;
        }
        // ---------------------------------------------------------------------
        /* if (dsp.isPhone()) {
            window.location.href = "phone/index.html#/detail2/" + $scope.detailId;
            return;
        } */
        // ---------------------------------------------------------------------

        $scope.pdList = '';//存储商品列表
        $scope.pdcustomerTags = '';//消费人群
        $scope.pdopeProduct = '';//商品操作
        $scope.pdstanProducts = '';//变体
        $scope.singleSP = '';//存储商品用于商品的一些公共属性
        $scope.kucun = '';//存储库存的
        var kucun = 0;//库存数量
        $scope.spimg = [];//存储商品详情的图片
        $scope.bigImgs = [];
        $scope.bigImgs1 = [];
        $scope.bigImgs2 = [];
        // {E7C00A33-7132-47A1-9E98-E0C0FC0DF495}

        // 相关商品
        $scope.relatePageNum = 1;
        $scope.noRelateMerch = true;
        $scope.lessThanOnePageRe = true;
        cjhome.getRelateList($scope.relatePageNum, $scope);
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
            console.log($scope.totalRelatePage)
            if ($scope.relatePageNum > $scope.totalRelatePage) {
                $scope.relatePageNum = 1;
            }
            cjhome.getRelateList($scope.relatePageNum, $scope);
        }

        // 浏览历史
        $scope.historyPageNum = 1;
        $scope.noHistory = true;
        $scope.lessThanOnePage = true;
        cjhome.getStoreMerchs($scope);
        if ($scope.totalHistoryPage == 1) {
            setTimeout(() => {
                console.log($('.pd-history-show .right-icon'))
                $('.pd-history-show .right-icon').stop().hide({
                    duration: 300,
                })
            })
        } else {
            $('.pd-history-show .right-icon').stop().show({
                duration: 300,
            })
        }
        $scope.showPrevHistory = function () {
            $scope.historyPageNum--;
            if ($scope.historyPageNum < 1) {
                $scope.historyPageNum = $scope.totalHistoryPage
            }
            var tempArr = JSON.parse(JSON.stringify($scope.viewHistory));
            $scope.historyList = cjhome.getHistoryList($scope.historyPageNum, 5, tempArr);
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
            console.log($scope.historyPageNum)
            console.log($scope.totalHistoryPage)
            console.log($scope.historyList)
        }
        /*类目*/
        $scope.cateClick = function (id, idx) {
            console.log(idx);
            var arr = [];
            arr = $scope.merchCategoryArr.slice(0, idx + 1);
            cjhome.toMerchList(id, JSON.stringify(arr), $scope.fromCountry, $scope.fromType);
        }


        // 缓存大图
        $scope.preLoadImg = function () {
            // console.log($scope.bigImgs);
            if ($scope.bigImgs.length > 0) {
                setTimeout(function () {
                    // preload image
                    for (var i = 0; i < $scope.bigImgs.length; i++) {
                        new Image().src = 'https://' + $scope.bigImgs[i];
                        // console.log($scope.bigImgs[i]);
                    }
                }, 1000);
            }
        }

        $scope.goSourcing = function() { 
            // let url = hasLogin ? '/myCJ.html#/add-sourcing////' : '/cus-sourcing.html'
            location.href = '/myCJ.html#/add-sourcing////'
        }

        $scope.hasMerchData = true;
        layer.load(2);
        dsp.getFun('app/locProduct/reptile?id=' + $scope.detailId, function (data) {
            layer.closeAll();
            var data = data.data;
            if (data.statusCode != 200) {
                layer.msg('The server is busy now, please try again later.');
                return false;
            }
            console.log(data)
            var result = JSON.parse(data.result);
            if (result.product.length <= 0) {
                $scope.hasMerchData = false;
                // dsp.addNodataPic($('.pd-con'), noDataHeight);
                $scope.noDataView = true
                return false;
            }

            var currentProduct = result.product[0];
            $scope.currentProduct = currentProduct;
            console.log(currentProduct);
            if(currentProduct.videoUrl){
                $scope.videoUrl = 'https://' + currentProduct.videoUrl.replace('https://', '').replace('http://', '');
            }
            var vid = document.getElementById('my-video');
            vid.getElementsByTagName('video')[0].setAttribute('src', $scope.videoUrl);
            vid.getElementsByTagName('video')[0].load();
            $scope.merchanTitle = $filter("fWordUpcase")(currentProduct.english);
            document.title = $scope.merchanTitle;
            $scope.merchanId = currentProduct.id;
            $scope.singleSP = currentProduct.stanProducts;//存储一个商品的数据
            $scope.merchanisCollect = currentProduct.isCollect;
            $scope.merchCategoryArr = [];
            $scope.merchCategory = currentProduct.categoryNameEn.replace(/&amp;/g, '&').split('/');
            $scope.merchCategoryIds = currentProduct.categoryIds.split(',');
            for (var i = 0; i < $scope.merchCategory.length; i++) {
                $scope.merchCategoryArr.push({
                    name: $scope.merchCategory[i],
                    id: $scope.merchCategoryIds[i],
                    encodeName: base64.encode($scope.merchCategory[i])
                });
            }
            // $scope.merchCategory = currentProduct.category;
            $scope.merchCategoryId = currentProduct.categoryId;

            $scope.littleImgs = [];
            $scope.stanImgs = [];
            // $scope.bigImg = 'https://'+ currentProduct.stanProducts[0].bigImg.replace('.400x400', '');
            console.log($scope.singleSP)
            for (var i = 0; i < $scope.singleSP.length; i++) {
                // $scope.bigImgs.push(currentProduct.stanProducts[i].bigImg.replace('.400x400', ''));
                // $scope.littleImgs.push('https://' + currentProduct.stanProducts[i].smallImg);
                // $scope.stanImgs.push('https://' + currentProduct.stanProducts[i].smallImg);
                if (currentProduct.stanProducts[i].smallImg.indexOf('.32x32') >= 0) {
                    $scope.stanImgs.push('https://' + currentProduct.stanProducts[i].smallImg);
                    $scope.bigImgs2.push(currentProduct.stanProducts[i].bigImg.replace('.400x400', ''));
                } else if (currentProduct.stanProducts[i].smallImg) {
                    $scope.bigImgs.push(currentProduct.stanProducts[i].bigImg.replace('.400x400', ''));
                    $scope.bigImgs1.push(currentProduct.stanProducts[i].bigImg.replace('.400x400', ''));
                    $scope.littleImgs.push('https://' + currentProduct.stanProducts[i].smallImg);
                }
            }
            if ($scope.stanImgs.length == 0) {
                $scope.stanImgs.push($scope.littleImgs[0]);
                $scope.bigImgs2.push($scope.bigImgs1[0]);
            }
            $scope.bigImg = 'https://' + $scope.bigImgs[0];

            $('#lit-img-box').css('width', 80 * $scope.littleImgs.length + 'px');

            $.each($scope.littleImgs, function (k, v) {
                var src = utils.IMG_SIZE($scope.littleImgs[k],{w:62,h:62}); //图片地址
                var t = "<a class='swiper-slide clearfix' href='javascript:void(0)'> <img src=" + src + "></a>";
                $('.swiper-wrapper').append(t)
            });
            $("#topNav .swiper-slide").eq(0).addClass('active');
            var mySwiper = new Swiper('#topNav', {
                freeMode: true,
                freeModeMomentumRatio: 0.3,
                slidesPerView: 'auto',
                onClick: function (swiper) {
                    var swiperWidth = mySwiper.container[0].clientWidth
                    var maxTranslate = mySwiper.maxTranslate();
                    var maxWidth = -maxTranslate + swiperWidth / 2
                    var slide = swiper.slides[swiper.clickedIndex]
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
                    var flag = 1;
                    var img = null;
                    if (flag == 1) {
                        img = 'https://' + $scope.bigImgs1[swiper.clickedIndex];
                    }
                    if (flag == 2) {
                        img = 'https://' + $scope.bigImgs2[swiper.clickedIndex];
                    }
                    //var img = $scope.littleImgs[swiper.clickedIndex];
                    $('#merch-big-img').attr('src', utils.IMG_SIZE(img,{h:440}));
                }
            });
            $(".swiper-container").on('touchstart', function (e) {
                e.preventDefault()
            })

            // ------------------------------------------ 19-12-06 币种
            $rootScope.$on('calc-exchange-rate', function (ev, rate) {
                utils.forceRefresh({
                    $scope,
                    $timeout,
                    keys: [
                        'currentProduct',
                    ]
                });
            });
            // ------------------------------------------

            // $('#price').html('$' + currentProduct.price);//价格
            $('#shipcost').html('Not Found')//物流费用
            $('#ship-method').html('Not Found')//物流方式
            $('#ship-from').html('Not Found')//物流from
            $('#pd-refee').html('Not Found')//挂号费
            $('#pd-tdp').html('Not Found')//总金额
            $('#kucun').html('Not Found')//库存
            $('#dhsj').html('Not Found')//到货事件
            $('#pd-bt-weight').html('Not Found');//重量
            $('#pd-bt-sku').html('Not Found');//sku
            $('#pd-attributes').html('Not Found');//商品属性//材料materialEn 属性perototyEn 包装 packingEn
            $('#pd-description').html('Not Found');//商品描述 在商品里面
            $('#pd-bt-type').html('Not Found');//商品类型
            $('#mul-type').text('Not Found');
            $('#mul-haspackage').text('Not Found');
            $('#mul-current').text('Not Found');
            $('#mul-function').text('Not Found');
            $('#mul-color').text('Not Found');
            $('#mul-length').text('Not Found');
            $('#mul-fun2').text('Not Found');
            $('#mul-maxcur').text('Not Found');
            $('#mul-certifi').text('Not Found');
            $scope.singleBT = '';//存储单个变体的数据

            $scope.preLoadImg();
            cjhome.getRelateList($scope.relatePageNum, $scope);
            if ($scope.isActSource == 1) {
                $scope.goActSource();
            }

            // 缓存当前商品信息到localStorage
            cjhome.storeOneMerch(currentProduct, $scope.merchFlag);
        });
        //下载视频
        $scope.Download = function (item) {
            console.log(item)
            if (!$scope.hasLogin) {
                layer.msg('Please login first!');
                return false;
            }
            dsp.postFun('cj/homePage/shangPinMaiDian', {
                ID:$scope.detailId,
                BIGIMG:$scope.bigImg,
                NAME:'',
                SKU:'',
                type:'videoDownloadSource'
            }, function (data) {
            
            }, function (data) {
            })
            if (item) {
                if (!$scope.hasLogin) {
                    layer.msg('Please login first!');
                    return false;
                }
                var ip = 'https://tools.cjdropshipping.com/';
                var url = item;
                var link = $('<a href="'+ip+'tool/downLoad/file?urlStr='+url+'&fileName=video.mp4"></a>');
                link.get(0).click();
            }
        }
        // 切换大图
        $scope.showCurBigImg = function ($index, $event, flag) {
            var $this = $($event.currentTarget);
            $this.addClass('active').siblings().removeClass('active');
            if (flag == 1) {
                $scope.bigImg = 'https://' + $scope.bigImgs1[$index];
            }
            if (flag == 2) {
                $scope.bigImg = 'https://' + $scope.bigImgs2[$index];
            }
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
                    console.log($scope.historyList);
                    cjhome.Collection(flag, id, $event, $('#wishlist-box'), $scope.historyList);
                } else {
                    cjhome.Collection(flag, id, $event, $('#wishlist-box'));
                }
            } else {
                layer.msg('Please login first!');
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
        $scope.goTodetail = function(item){
            dsp.postFun('cj/homePage/shangPinMaiDian', {
                ID:item.id,
                BIGIMG:item.bigImg,
                NAME:'',
                SKU:'',
                type:'clickSource'
            }, function (data) {
            
            }, function (data) {
            })
            if(item.flag == '1') {
                window.open('product-detail.html?id=' + item.id + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType + '&productType=' + (item.productType || 0));
            }else {
                window.open('reptail-detail.html?id=' + item.id);
            }
        };
        //listOrsource按钮
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
        $scope.toDetailPage = function (flag, id) {
            // location.href = 'reptail-detail.html?id=' + id;
            cjhome.toDetailPage(flag, id);
        }

        $scope.goActSource = function (id) {
            if (!$scope.hasLogin) {
                layer.msg('Please login first!');
                return false;
            }
            if (id == undefined) {
                id = $scope.merchanId;
            }
            cjhome.goActSource(id);
        }
        
        $scope.toDetailWithSource = function (id) {
            cjhome.toDetailWithSource(id)
        }

        $scope.toDetailWithList = function (id) {
            cjhome.toDetailWithList(id)
        }
  
        // 媒体拍摄要求
        $scope.photographyType = null;
        $scope.handleMediaShootingRequest = function() {
          if (!$scope.hasLogin) {
            layer.msg('Please login first!');
            return false;
          }
          layer.load(2);
          dsp.postFun('media/orderMedia/todayCount', {}, ({ data }) => {
            layer.closeAll('loading');
            if (data.code === 200) {
              $scope.totalCount = data.data.totalCount;
              $scope.remainingCount = data.data.remainingCount;
              $scope.isShowPhotography = true;
              $scope.photographyType = null;
              $scope.instructions = '';
            }
          }, err => {
            console.log(err);
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
            "pid": $scope.detailId,
            "description": $scope.instructions,
            "mediaType": $scope.photographyType === 'photo' ? 1 : 0,
            "quantity": $scope.photographyType === 'photo' ? 1 : undefined
          }
          layer.load(2);
          dsp.postFun('media/orderMedia/addDbSourceMediaDemand', parmas, ({ data }) => {
            layer.closeAll('loading');
            if (data.code === 200) {
              $scope.isShowPhotography = false;
            }else {
              layer.msg(data.message)
            }
          }, err => {
            console.log(err);
          });
        }
    }])
})()
