(function (angular) {
    angular.module('cjCompnentModule')
        .component('detailTab', {
            templateUrl: 'static/components/detailTab/detailTab.html',
            controller: detailTabCtrl,
            bindings: {
                productdetail: '=',
                onLog: '&',
                showWorkOrder: '&'
            }
        })

    function detailTabCtrl($scope, $timeout, dsp, cjhome, utils, $filter, $window, $location, $anchorScroll, $sce) {
        try{
        $scope.token = utils.getLocalInfo('token');
        $scope.hasLogin = dsp.isInLoginState();
        let productdetail = this.productdetail ? this.productdetail : {};

        $scope.merchDesc = $sce.trustAsHtml(productdetail.DESCRIPTION); // 商品描述初始值
        $scope.xiaoShouJianYi = $sce.trustAsHtml(productdetail.xiaoShouJianYi); // 商品销售建议
        $scope.detailId = productdetail.ID;
        $scope.commentCount = productdetail.commentCount;
        $scope.consultingCount = productdetail.consultingCount;
        /* tab框下面的页面显示 */
        $scope.isAdsSuggestion = false;
        $scope.isDescription = true;
        $scope.model = false;
        $scope.showReviews = false;

        // 详情页商品评论使用变量
        $scope.showEdit = false; // 评论文本域
        $scope.showReply = false; // 回复文本域
        $scope.commentText = '';
        $scope.replyText = '';
        $scope.textNumber = 0;
        $scope.replyTextNumber = 0;
        $scope.rateStar = null;
        $scope.hoverStar = null;
        $scope.replyItem = null;
        $scope.delShowTips = false;
        $scope.TipContent = '';
        $scope.notSubmit = true;

        $scope.iframeLoadedCallBack = function(){
            $timeout(() => setIframeHeight('salesIframe'), 0)
        }
        function setIframeHeight(id) {
            const iframe = document.getElementById(id);
            if(iframe) {
                const iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
                if(iframeWin.document.body) {
                    iframe.height = iframeWin.document.documentElement.scrollHeight;
                }
            }
        }

        // 详情-材质
        
        $scope.materialArr = [];
        var materialArr = productdetail.MATERIALEN.split(',');
        if (materialArr[0] == '') {
            materialArr.splice(0, 1);
        }
        materialArr.forEach(item => {
            const arr = item.split('');
            arr[0] = arr[0].toUpperCase();
            const str = arr.join('');
            $scope.materialArr.push(str);
        })
        // $scope.materialArr = materialArr;
        $scope.materialStr = $scope.materialArr.join(', ')

        // 详情-pageSize
        $scope.showMoreSize = false;
        const sizeList = productdetail.stanProducts || [];
        $scope.pageSizeListAll = [];
        $scope.pageSizeList = [];
        const newArr = [];
        sizeList.forEach(item => {
            const arr = item.STANDARD.split(',')
            const obj = {};
            let isPush = true;
            arr.forEach(ele => {
                ele = ele.split('=');
                if((ele[0] == 'long' || ele[0] == 'width' || ele[0] == 'height') && ele[1] && ele[1] !== '' && ele[1] !== '0') {
                    obj[ele[0]] = ele[1];
                } else {
                    isPush = false;
                }
            })
            if(obj.long == 1 && obj.width == 1 && obj.height == 1) {
                isPush = false;
            } 

            if(isPush) {
                newArr.push(obj);
            }
        })
        // 数组去重
        const removeDuplicates = function(arr) {
            for(let i = 0; i < arr.length; i++) {
                for(let j = i+1; j < arr.length; j++) {
                    if(JSON.stringify(arr[i]) == JSON.stringify(arr[j])) {
                        arr.splice(j, 1);
                        j--;
                    }
                }
            }
            return arr;
        }

        $scope.pageSizeListAll = removeDuplicates(newArr);
        if($scope.pageSizeListAll.length > 7) {
            $scope.pageSizeList = $scope.pageSizeListAll.slice(0,7);
        } else {
            $scope.pageSizeList = $scope.pageSizeListAll;
        }

        $scope.handleShowMore = (flag) => {
            if(flag) {
                $scope.showMoreSize = true;
                $scope.pageSizeList = $scope.pageSizeListAll;
            } else {
                $scope.showMoreSize = false;
                if($scope.pageSizeListAll.length > 7) {
                    $scope.pageSizeList = $scope.pageSizeListAll.slice(0,7);
                }
            }
        }
        /* 商品id */
        $scope.productId =  this.productdetail ? this.productdetail.ID : "";

        $scope.productType = dsp.getQueryString('productType') || '0';
        $scope.Description = function (txt) {
            initPageShow()
            if (txt == 'Description') {
                $scope.isDescription = true;
                getCommitsList()
            } else if (txt == 'model') {
                $scope.model = true;
                productFun();
            } else if(txt==="AdsSuggestion"){
                $scope.isAdsSuggestion = true;
                $scope.iframeLoadedCallBack();
            } else if(txt === "showReviews") {
                $scope.showReviews = true
            }
        }

        var checkAds = dsp.getQueryString('checkAds');
        if(checkAds == 1 && $scope.xiaoShouJianYi) {
            $scope.Description('AdsSuggestion')
        }

        function initPageShow() {
            $scope.isDescription = false;
            $scope.model = false;
            $scope.isAdsSuggestion = false;
            $scope.showReviews = false;
        }

        // 详情页商品评论
        $scope.$on('detailRateCtrl', (ele, data) => {
            $scope.rateStar = data;
            formatSubmit();
        })
        // 判断是否可以提交商品评论的方法
        function formatSubmit() {
            if($scope.rateStar && $scope.textNumber > 0 && $scope.textNumber < 501) {
                $scope.notSubmit = false;
            } else {
                $scope.notSubmit = true;
            }
        }
        // $scope.$on('textAreaCtrl', (ele, data) => {
        //     const { commentText, textNumber, rateStar } = data;
        //     $scope.commentText = commentText;
        //     $scope.textNumber = textNumber;
        //     $scope.rateStar = rateStar;
        // })
        $scope.handleFocusInput = (type) => {
            if(type == 'review') {
                $scope.commentText = '';
                $scope.textNumber = 0;
                $scope.rateStar = null;
                $scope.hoverStar = null;
                $scope.showEdit = true;
            } else if(type == 'reply') {
                $scope.replyText = '';
                $scope.replyTextNumber = 0;
                $scope.showReply = true;
            }
        }
        $scope.handleBlurInput = () => {
            if($scope.textNumber == 0) {
                $scope.showEdit = false;
                $scope.rateStar = null;
            }
        }
        $scope.handleCommentChange = (val, type) => {
            const text= val && val.trim();
            // const number = val && val.replace(/\s/g, '').length || 0;
            const number = val && val.length || 0;
            if(type == 'review') {
                $scope.commentText = text;
                $scope.textNumber = number;
                formatSubmit();
            } else if(type == 'reply') {
                $scope.replyText = text;
                $scope.replyTextNumber = number;
            }
        }
        // $scope.handleRate = (val) => {
        //     $scope.rateStar = val;
        // }
        // $scope.handleRateHover = (val) => {
        //     $scope.hoverStar = val;
        // }
        // $scope.handleRateLeave = () => {
        //     $scope.hoverStar = null;
        // }
        $scope.handleShowReply = (child) => {
            if($scope.replyItem != child) {
                $scope.replyItem = child;
            } else {
                $scope.replyText = '';
                $scope.replyTextNumber = 0;
                $scope.replyItem = null;
                $scope.showReply = false;
            }
        }
        // 查看所有评论
        $scope.handleViewAllReply = (item, i, $event) => {
            let len = item.reply.length;
            $scope.productList.list[i].replyList = item.reply.slice(0, len);
            $scope.productList.list[i].viewAll = false;
            const listDom = document.getElementById('review-list'+i); // 这条评论及回复的父盒子
            const winHeight = window.innerHeight; // 浏览器内部高度
            const collDom = document.getElementById('pack-up'+i); // 关闭按钮
            const bottomDom = document.getElementById('view-more'+i);
            window.addEventListener('scroll', () => {
                const collHeight = bottomDom.getBoundingClientRect().top; // 底部按钮距视窗顶部高度
                const listHeight = listDom.getBoundingClientRect().top;
                if((winHeight > collHeight && winHeight - collHeight > 30)) {
                    // 此时关闭按钮定位为absolute
                    collDom.style.position = 'absolute';
                    collDom.style.left = '50%';
                    collDom.style.background = 'unset';
                    collDom.style.boxShadow = 'unset';
                } else if(listHeight > winHeight) {
                    collDom.style.position = 'absolute';
                    collDom.style.left = '50%';
                    collDom.style.background = 'unset';
                    collDom.style.boxShadow = 'unset';
                } else if(winHeight > listHeight && winHeight - listHeight < 300) {
                    collDom.style.position = 'absolute';
                    collDom.style.left = '50%';
                    collDom.style.background = 'unset';
                    collDom.style.boxShadow = 'unset';
                } else {
                    // 否则关闭按钮定位为fixed
                    collDom.style.position = 'fixed';
                    collDom.style.left = 'calc(50% + 29px)';
                    collDom.style.background = '#ffffff';
                    collDom.style.boxShadow = '0px 1px 4px 0px rgba(0, 0, 0, 0.1)';
                }
            })
        }
        // 收起评论
        $scope.handleCloseAllReply = (item, i, $event) => {
            $scope.productList.list[i].replyList = item.reply.slice(0, 2);
            $scope.productList.list[i].viewAll = true;
        }

        // 提交评论
        $scope.handleSubmitComments = (txt, item) => {
            if(txt == 'problem' && $scope.notSubmit) {
                return false
            } 
            if(txt == 'revert' &&  ($scope.replyTextNumber > 500 || $scope.replyTextNumber < 1)) {
                return false
            }
            if (!$scope.token) {
                layer.msg('Please login first');
                return false;
            }
            layer.load(2);
            let data = {};
            if(txt == 'problem') {
                data = {
                    content: $scope.commentText,
                    state: 1,
                    productId: productdetail.ID,
                    type: 1,
                    sku: productdetail.SKU,
                    product_name: productdetail.NAME,
                    product_ename: productdetail.NAMEEN,
                    source: 1,
                    superiorid: 0,
                    score: $scope.rateStar,
                    question_type: 0
                }
            } else {
                data = {
                    content: $scope.replyText,
                    state: 1,
                    productId: productdetail.ID,
                    type: 2,
                    sku: productdetail.SKU,
                    product_name: productdetail.entryName,
                    product_ename: productdetail.NAMEEN,
                    source: 1,
                    consulting_id: item.consulting_id,
                    superiorid: $scope.replyItem.reply_id,
                    question_type: 0
                }
            }
            dsp.postFun('cj/locProduct/insertConsultingV23980', JSON.stringify(data), function (res) {
                layer.closeAll("loading")
                if (res.data.statusCode == '200') {
                    layer.msg('Submitted Successfully');
                    
                    if (txt == 'problem') {
                        $scope.commentText = '';
                        $scope.textNumber = 0;
                        $scope.rateStar = null;
                        $scope.showEdit = false;
                        productFun();
                    } else {
                        $scope.replyText = '';
                        $scope.replyTextNumber = 0;
                        $scope.showReply = false;
                        productFun(item.consulting_id);
                    }
                } else {
                    layer.msg(res.data.message)
                }
            });
        }
        // 删除评论
        $scope.handlePopClose = () => {
            $scope.delShowTips = false;
            $scope.TipContent = '';
            document.body.classList.remove('bodyScroll');
        }
        $scope.handlePopConfirm = () => {
            delHttp($scope.delItem, $scope.delTxt);
            $scope.handlePopClose();
        }

        // textarea高度自适应
        function autoTextarea(elem, extra, maxHeight) {
            extra = extra || 0;
            let isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
              isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
              addEvent = function (type, callback) {
                elem.addEventListener ?
                  elem.addEventListener(type, callback, false) :
                  elem.attachEvent('on' + type, callback);
              },
              getStyle = elem.currentStyle ? function (name) {
                let val = elem.currentStyle[name];
      
                if (name === 'height' && val.search(/px/i) !== 1) {
                  let rect = elem.getBoundingClientRect();
                  return rect.bottom - rect.top -
                    parseFloat(getStyle('paddingTop')) -
                    parseFloat(getStyle('paddingBottom')) + 'px';
                };
      
                return val;
              } : function (name) {
                return getComputedStyle(elem, null)[name];
              },
              minHeight = parseFloat(getStyle('height'));
      
            elem.style.resize = 'none';
      
            function change() {
              let scrollTop, height,
                // padding = 0,
                style = elem.style;
      
              if (elem._length === elem.value.length) return;
              elem._length = elem.value.length;
      
              if (!isFirefox && !isOpera) {
                padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
              };
              scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      
              elem.style.height = minHeight + 'px';
              if (elem.scrollHeight > minHeight) {
                if (maxHeight && elem.scrollHeight > maxHeight) {
                  height = maxHeight - padding;
                  style.overflowY = 'auto';
                } else {
                  height = elem.scrollHeight - padding;
                  style.overflowY = 'hidden';
                };
                style.height = height + extra + 6 +'px';
                scrollTop += parseInt(style.height) - elem.currHeight;
                // document.body.scrollTop = scrollTop;
                // document.documentElement.scrollTop = scrollTop;
                elem.currHeight = parseInt(style.height);
              };
            };
      
            addEvent('propertychange', change);
            addEvent('input', change);
            addEvent('focus', change);
            change();
        };
        const text = document.getElementById("new-comment-edit-text");
        if(text) {
            autoTextarea(text);// 调用
        }
        const reply = document.getElementById("new-comment-reply-text");
        if(reply) {
            autoTextarea(reply);// 调用
        }

        // 咨询列表数据
        $scope.productList = [];
        $scope.data = {
            problem: '',
            revert: ''
        };
        $scope.textareaWidth = 'revertWidth';
        $scope.pageNum = 1;
        $scope.pageSize = 10;
        $scope.totalPageNum = 0;
        $scope.totalNum = 0;
        $scope.consulting_id = ''; // 子回复id
        let base64 = new Base64();
        let getItemName = localStorage.getItem('name') ? base64.decode(localStorage.getItem('name')) : ''; // 当前用户
        if (!$scope.hasLogin) {
            $('#pd-xiaoShouJianYi').css('height', '50px');
            $scope.isViewAds = true;
        } else {
            $scope.isViewAds = false;
        }
        $scope.showMore = function () {
            layer.msg('Please login to view more!');
        }

        $scope.goTologin = function() {
            location.href= 'login.html?checkAds=1'
        }

        
        $scope.reviewNoData = false;
        function productFun(consulting_id, pageNum = 1, pageSize = "5") {
            let data = {
                pageNum: String(pageNum),
                pageSize: String(pageSize),
                productId: $scope.detailId
            }
            dsp.postFun('cj/locProduct/getConsultingListV23980', JSON.stringify(data), function (res) {
                if (res.data.statusCode == '200') {
                    // consulting_id 存在及 回复后不跟新 1级 数组，保持回复开启
                    if (!consulting_id) {
                        $scope.productList = res.data.result;
                        if(res.data.result.list.length > 0) {
                            $scope.reviewNoData = false;
                        } else {
                            $scope.reviewNoData = true;
                        }
                    }
                    $scope.getItemName = getItemName;
                    $scope.totalNum = $scope.productList.total;
                    $scope.consultingCount = $scope.productList.total;
                    for (let i = 0; i < res.data.result.list.length; i++) {
                        if($scope.productList.list[i].head == 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/ba627238-87d7-41a9-86f1-960b4cc07ebf.png') {
                            $scope.productList.list[i].head = '';
                        }
                        $scope.productList.list[i].imageName = $scope.productList.list[i].user_name.slice(0, 1).toUpperCase();
                        let reply = res.data.result.list[i].reply;
                        for (let j = 0; j < reply.length; j++) {
                            if(reply[j].head == 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/ba627238-87d7-41a9-86f1-960b4cc07ebf.png') {
                                reply[j].head = '';
                            }
                            reply[j].imageName = reply[j].user_name.slice(0, 1).toUpperCase();
                            reply[j].imageList = reply[j].image && reply[j].image.split(',') || [];
                        }
                        $scope.productList.list[i].show = true; // 2级回复显示/隐藏
                        $scope.productList.list[i].viewAll = true; // 是否已经查看全部评论
                        $scope.productList.list[i].replyList = res.data.result.list[i].reply.slice(0, 2); // 2级默认显示2条
                        $scope.productList.list[i].imageName = $scope.productList.list[i].user_name.slice(0, 1).toUpperCase();
                        // $scope.productList.list[i].replyList.map(_ele => _ele.imageList = _ele.image && _ele.image.split(','))
                        if (consulting_id) { // consulting_id 存在  保证回复后的 2级 数组及时更新
                            $scope.productList.list[i].reply = res.data.result.list[i].reply;
                        }
                        if (consulting_id && consulting_id == res.data.result.list[i].consulting_id) {
                            $scope.productList.list[i].formShow = true; // 2级回复框隐藏/显示
                        } else {
                            $scope.productList.list[i].formShow = false; // 2级回复框隐藏/显示
                        }
                    }
                    $scope.totalPageNum = Math.ceil($scope.totalNum / ($scope.pageSize * 1));
                    $scope.$broadcast('page-data', {
                        pageNum,
                        pageSize: pageSize + "",
                        totalNum: $scope.totalPageNum,
                        totalCounts: $scope.totalNum,
                        pagesizeList: ["5", "10", "15"]
                    });
                }
                if (window.location.href.indexOf('&href') != -1) {
                    $scope.isDescription = false;
                    $scope.isAdsSuggestion = false;
                    $scope.model = true;
                    setTimeout(() => {
                        document.getElementById("moreMerchant").scrollIntoView();
                    }, 100);
                }
            })
        };
        // 咨询问题点击
        $scope.problemClick = function (txt, $event) {
            if (txt == 'revert') {
                $event.stopPropagation();
            } else {
                $scope.textareaWidth = 'revert';
            }
        };
        // 提交咨询问题
        let flag = true;
        $scope.problemSubmit = function (txt, item) {
            if (!$scope.token) {
                layer.msg('Please login first');
            } else {
                let data = {}
                if (!flag) return
                if (txt == 'problem') {
                    if (!$scope.data.problem) {
                        layer.msg('You have’t leave any question here!');
                        return;
                    }
                    if (getByteLen($scope.data.problem) > 500) {
                        layer.msg('No more than 500 English letters or 250  Chinese characters for one consulting. If over limit, please submit in multiple times.')
                        return;
                    }
                    flag = false;
                    data = {
                        content: $scope.data.problem,
                        state: 1,
                        productId: productdetail.ID,
                        type: 1,
                        sku: productdetail.SKU,
                        product_name: productdetail.NAME,
                        product_ename: productdetail.NAMEEN,
                        source: 1,
                        superiorid: 0
                    }
                } else {
                    if (!$scope.data.revert) {
                        layer.msg('You have’t leave any question here!');
                        return;
                    }
                    if (getByteLen($scope.data.revert) > 500) {
                        layer.msg('No more than 500 English letters or 250  Chinese characters for one consulting. If over limit, please submit in multiple times.')
                        return;
                    }
                    flag = false;
                    data = {
                        content: $scope.data.revert,
                        state: 1,
                        productId: productdetail.ID,
                        type: 2,
                        sku: productdetail.SKU,
                        product_name: productdetail.entryName,
                        product_ename: productdetail.NAMEEN,
                        source: 1,
                        consulting_id: $scope.consulting_id,
                        superiorid: $scope.superiorid,
                        question_type: 0
                    }
                }
                const msgLoading = cjMessage.loading({ isFixed: true })
                dsp.postFun('cj/locProduct/insertConsultingV23980', JSON.stringify(data), function (res) {
                    msgLoading.hide();
                    if (res.data.statusCode == '200') {
                        $scope.textareaWidth = 'revertWidth';
                        $scope.data.problem = '';
                        $scope.data.revert = '';
                        flag = true;
                        layer.msg('consultation succeed');
                        if (txt == 'problem') {
                            productFun();
                        } else {
                            productFun(item.consulting_id);
                        }
                    }
                }, function() {
                    msgLoading.hide()
                });
            }
        };
        // 查看更多回复
        $scope.lookMore = function (item, $event) {
            let len = item.replyList.length;
            item.replyList = item.reply.slice(0, len + 4);
            if (len + 4 >= item.reply.length) {
                item.foldShow = false;
            }
            // $event.stopPropagation();
        };
        // 收起
        $scope.fold = function (item, $event) {
            // item.show = false;
            $scope.childNum = 1;
            item.replyList = item.reply.slice(0, 2);
            // $event.stopPropagation();
        };
        // 打开回复
        $scope.superiorid = ''; // 第几条子回复id
        $scope.replyName = '';
        $scope.reply = function (item, txt, childItem) {
            let list = $scope.productList.list;
            $scope.consulting_id = item.consulting_id;
            if (txt == 'params') {
                $scope.replyName = '';
                $scope.foldShow = true;
                // item.show = true;
                if ($scope.getItemName != item.user_name) {
                    layer.msg('you cannot reply the inquiries from others');
                    return;
                } else {
                    for (let i = 0; i < list.length; i++) {
                        list[i].formShow = false;
                    }
                    item.formShow = true;
                }
                if ($scope.childNum > item.reply.length) {
                    $scope.foldShow = false;
                }
                if (item.replycount > 0) {
                    $scope.superiorid = item.reply[0].reply_id;
                }
            } else {
                $scope.superiorid = childItem.reply_id;
                if ($scope.getItemName != item.user_name) {
                    layer.msg('you cannot reply the inquiries from others');
                    return;
                } else {
                    for (let i = 0; i < list.length; i++) {
                        list[i].formShow = false;
                    }
                    item.formShow = true;
                }
                if (childItem.user_name == 'CJ') {
                    $scope.replyName = item.user_name + 'reply :' + childItem.user_name;
                } else {
                    $scope.replyName = '';
                }
            }
        };
        // 取消
        $scope.cancel = function (item) {
            if (item == 'params') {
                $scope.textareaWidth = 'revertWidth';
                $scope.data.problem = '';
            } else {
                item.formShow = false;
            }
        }
        // 删除
        $scope.del = function (item, $event, txt) {
            // $event.stopPropagation();
            if ($scope.getItemName != item.user_name) {
                layer.msg('You cannot delete the inquiries from others.');
                return;
            }
            $scope.delItem = item;
            $scope.delTxt = txt;
            if (txt == 'params') {
                $scope.TipContent = 'Are you sure to delete the comment? All replies will be deleted too.';
            } else {
                $scope.TipContent = 'Are you sure to delete the reply?';
            }
            $scope.delShowTips = true;
            document.body.classList.add('bodyScroll');
        };
        // 删除请求
        function delHttp(item, txt) {
            let data = {
                superiorid: item.superiorid,
                state: item.state,
                source: item.source,
                type: 1,
                consulting_id: item.consulting_id
            }
            if (txt == 'params') {
                data.type = 1;
                data.consulting_id = item.consulting_id;
            } else {
                data.type = 2;
                data.consulting_id = item.reply_id;
            }
            dsp.postFun('cj/locProduct/delectConsultingV23980', JSON.stringify(data), function (res) {
                if (res.data.statusCode == '200') {
                    layer.msg('deletion completed');
                    productFun();
                } else {
                    layer.msg(res.data.message);
                }
            }, function (err) {
                layer.msg('deletion completed');
            });
        }
        // 输入文本长度
        function getByteLen(val) {
            var len = 0;
            for (var i = 0; i < val.length; i++) {
                var a = val.charAt(i);
                if (a.match(/[^\x00-\xff]/ig) != null) {
                    len += 2;
                } else {
                    len += 1;
                }
            }
            return len;
        };
        // 查看大图
        $scope.imgList = [];
        $scope.imgIndex = 0;
        $scope.replySlideshow = false;
        $scope.handleClickImg = (index, imgList) => {
            $scope.imgList = imgList;
            $scope.imgIndex = index;
            $scope.replySlideshow = true;
            document.body.classList.add('bodyScroll');
        }

        $scope.handleCloseReplySwiper = (e) => {
            e.stopPropagation();
            $scope.imgList = [];
            $scope.imgIndex = 0;
            $scope.replySlideshow = false;
            document.body.classList.remove('bodyScroll');
        }



        // 多语言模板切换-更新描述和描述评论
        $scope.$on('module-onchange', function (d, data) { // module-select onchange
            if (!data) return
            if (data.id == '999') {
                $scope.merchDesc =  $sce.trustAsHtml(productdetail.DESCRIPTION);
            } else {
                $scope.merchDesc =  $sce.trustAsHtml(data.description);
            }
            $scope.modelId = data.id
            getCommitsList(data.id) //切换模板，切换不同模板不同评论
        })


        //商品描述评分
        $scope.isAddCommit = false
        $scope.dbLocproductComment = null // 默认自己没有评论过
        $scope.desCount = 0 //默认评论数
        $scope.modelId = "999"
        $scope.descriConfirm = function () {
            if (!$("#commitText").val()) {
                layer.msg("Please enter a review")
                return
            }
            if ($("#commitText").val().length < 5) {
                layer.msg("Please enter a review at least 5 characters")
                return
            }
            if (!$(".getScor input:checked").val()) {
                layer.msg("Please select a rating")
                return
            }
            dsp.postFun('cj/locComment/addComment', {
                dbLocproductId: $scope.detailId,
                dbLocproductLanguageId: $scope.modelId,
                score: Number($(".getScor input:checked").val()),
                content: $("#commitText").val()
            }, function (data) {
                if (data.data.statusCode == 200) {
                    layer.msg("Commented successfully!")
                    $scope.isAddCommit = false
                    getCommitsList($scope.modelId)
                }
            })
        }
        getCommitsList()

        function getCommitsList(modelId = "999", pageNum = 1, pageSize = "5") {
            const msgLoading = cjMessage.loading({ popupContainerDom: document.getElementById('moreMerchant') })
            dsp.postFun('cj/locComment/listComment', {
                dbLocproductId: $scope.detailId,
                pageNum,
                pageSize,
                dbLocproductLanguageId: modelId || $scope.modelId,
            }, function (data) {
                console.log(data)
                msgLoading.hide();
                const {
                    statusCode,
                    result
                } = data.data
                if (statusCode == 200) {
                    $scope.desCount = Number(result.count)
                    $scope.hide = result.hide
                    $scope.commitsTotal = {
                        rated: result.scoreCount ? Math.round(result.scoreCount / result.count) : 0,
                    }
                    if (result.dbLocproductComment) {
                        $scope.dbLocproductComment = result.dbLocproductComment
                        if ($scope.dbLocproductComment.check == 2 && result.hide) {
                            $scope.desCount += 1
                        }
                        if ($scope.dbLocproductComment.check == 1 || $scope.dbLocproductComment.check == 0) {
                            $scope.desCount += 1
                        }
                        if (!result.dbLocproductComment.dspAccountImg) {
                            result.dbLocproductComment.imgName = result.dbLocproductComment.dspAccountName.slice(0, 1).toUpperCase();
                        }
                    } else {
                        $scope.isAddCommit = false
                        $scope.dbLocproductComment = null
                    }
                    result.list.forEach(item => {
                        if (!item.dspAccountImg) {
                            item.imgName = item.dspAccountName.slice(0, 1).toUpperCase();
                        }
                    })
                    $scope.commitsList = result.list
                    $scope.pageNum = pageNum;
                    $scope.pageSize = pageSize;
                    $scope.$broadcast('page-data', {
                        pageNum,
                        pageSize: pageSize + "",
                        totalNum: Math.ceil(result.count / pageSize),
                        totalCounts: result.count,
                        pagesizeList: ["5", "10", "15"]
                    });
                }
            },function() {
                msgLoading.hide()
            })
        }
        $scope.$on('pagedata-fa', function (d, data) {
            $scope.pageNum = data.pageNum;
            $scope.pageSize = data.pageSize;
            if ($scope.isDescription) {
                getCommitsList($scope.modelId, data.pageNum, data.pageSize)
            } else if($scope.model) {
                productFun(null, data.pageNum, data.pageSize)
            }
        });

        $scope.toTop = function () {
            //设置你要跳转的锚点
            $location.hash('commits');
            //调用$anchorScroll
            $anchorScroll();
        };
        $scope.addCommit = function () {
            if ($scope.hasLogin) {
                $scope.isAddCommit = true
            } else {
                layer.msg("Please login first")
            }
        }

        } catch(err) {
            console.log(err);
        }
    }
})(angular);