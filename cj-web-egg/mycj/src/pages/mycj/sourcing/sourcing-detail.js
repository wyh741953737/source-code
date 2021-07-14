export function sourcingDetailFactory(angular) {
  const module = angular.module('sourcing-detail.module', ['service', 'home-service']);

  module.controller('sourcing-detail.ctrl', ['$scope', '$stateParams', 'dsp', function ($scope, $stateParams, dsp) {
    $scope.soudeId = $stateParams.id;
    $scope.sourcetype = $stateParams.sourcetype;
    // 更新时间
    $scope.UpdateTime = ""
    // 搜品类型
    $scope.sourceStyle = "--"


    var base64 = new Base64();
    var userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
    var username = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('name'));
    $scope.username = username;
    $scope.userImg = username.slice(0, 1).toUpperCase();
    var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
    $scope.vip = vip;
    if (vip == '1') {//vipFlag
      $('.seachdetail-con').addClass('vipFlag');
    } else {
      $('.seachdetail-con').removeClass('vipFlag');
    }
    $('.header-nav > ul > li').eq(0).addClass('active');
    var cjsdetailData = {};
    cjsdetailData.data = {};
    cjsdetailData.data.id = $scope.soudeId;
    cjsdetailData.data.sourcetype = $scope.sourcetype;
    cjsdetailData.data = JSON.stringify(cjsdetailData.data)
    $scope.recommendList = []
    $scope.alreadyPublish = false
    $scope.alreadyConnect = false

    $scope.cusImgs = '';
    const msgLoading = cjMessage.loading({ isFixed: true })
    dsp.postFun('source/sourcing/Cjdetaill', JSON.stringify(cjsdetailData), function (data) {
      msgLoading.hide();
      $scope.sourceDetail = JSON.parse(data.data.result);
      $scope.sourcecontent = $scope.sourceDetail.accSource;
      $scope.productNameEn = $scope.sourceDetail.productNameEn;
      $scope.alreadyPublish = $scope.sourceDetail.alreadyPublish;
      $scope.alreadyConnect = $scope.sourceDetail.alreadyConnect;
      $scope.showReview = $scope.sourceDetail.getComment;
      $scope.bigimg = $scope.sourceDetail.bigimg || '/static/image/public-img/default.jpg';
      $scope.salestatus = $scope.sourceDetail.accSource.saleStatus
      try {
        $scope.sourcecontent.skuList = JSON.parse($scope.sourcecontent.xiangSiLianJie)
      } catch (error) {
        $scope.sourcecontent.skuList = {
          error: true
        }
      }

      // here  https://chat.cjdropshipping.com 改成标签
      const failExplain = $scope.sourcecontent.failExplain
      if (failExplain && typeof failExplain === 'string' && failExplain.indexOf('here: https://chat.cjdropshipping.com')) {
        $scope.sourcecontent.failExplain = failExplain.replace('here: https://chat.cjdropshipping.com', `<a href="https://chat.cjdropshipping.com" class="text-theme click-here">Contact Us</a>`)
      }

      $scope.sourcecontent.imageUrl = $scope.sourcecontent.imageUrl.split(',');
      for (var i = 0; i < $scope.sourcecontent.imageUrl.length; i++) {
        $scope.sourcecontent.imageUrl[i] = 'https://' + $scope.sourcecontent.imageUrl[i].replace('https://', '').replace('https://', '');

      }
      $scope.sourcecontent.imageUrl = $scope.sourcecontent.imageUrl.slice(0, 10);

      // 获取更新时间
      if ($scope.sourcecontent.createDate) {
        const {
          year,
          month,
          date,
          hours,
          minutes,
          seconds,
        } = $scope.sourcecontent.createDate
        $scope.UpdateTime = `${year + 1900}-${month + 1}-${date} ${hours}:${minutes}:${seconds}`
      }

      // 获取搜品来源、
      const { sourcetype } = $scope.sourcecontent
      $scope.sourceStyle = sourcetype == "0" ? "Store's" : sourcetype == "1" ? "Individual" : sourcetype == "2" ? "Google Extension" : "--"

      var list = $scope.sourceDetail.topTenProducts
      for (var i = 0; i < list.length; i++) {
        list[i].flag = '1';
        list[i].num = list[i].published;
        list[i].bigImg = 'https://' + list[i].bigimg.replace('https://', '').replace('http://', '')
      }
      $scope.recommendList = list
      $scope.likeList = list.slice(0,5);

      if($scope.sourcecontent.status=='3'||($scope.sourcecontent.sourcetype=='2' && $scope.sourcecontent.status=='2')) {
        getComment();
      }

    })
    $('.header-nav > ul > li').eq(0).addClass('active');

    // 猜你喜欢
    let coun = 0
    $scope.pageLike = function () {
      if (coun == 0) {
        $scope.likeList = $scope.recommendList.slice(5, 10)
        coun = 1
      } else {
        $scope.likeList = $scope.recommendList.slice(0, 5)
        coun = 0
      }
    }

    //查看商品方法
    $scope.succeed = function (item, isList) {
      let url = 'product-detail.html?id=' + item.CjproductId + "&type=" + item.sourcetype
      if (isList) {
        url = 'product-detail.html?id=' + item.CjproductId + "&type=" + item.sourcetype + "&list=" + 1;
      }

      const a = document.createElement('a')
      a.target = '_blank'
      a.href = url
      a.click()
      a.remove()
    }
    $scope.toConnectPage = function () {
      const manualConnectInfo = {
        cjProSku: $scope.sourcecontent.sku,
        storeProductName: $scope.sourcecontent.productName
      };
      sessionStorage.setItem('connection-scInfo',JSON.stringify(manualConnectInfo));
      window.open('myCJ.html#/products-connection/sourcing-connection', '_blank', '');

    }

    // 搜品评论
    $scope.selectReason = false;
    $scope.notSubmit = true;
    $scope.isReviewd = false;  // 刚评论完为true
    $scope.selectItem = {
      id: '',
      name: ''
    };
    $scope.rateStar = null;
    $scope.readOnly = false;
    $scope.reasonList = [
      {
        id: '1',
        name: 'Low-resolution images'
      },
      {
        id: '2',
        name: 'Product not as described'
      },
      {
        id: '3',
        name: 'Overpriced'
      },
      {
        id: '4',
        name: 'Long processing time'
      },
      {
        id: '5',
        name: 'Others'
      }
    ];
    $scope.handleShowOptionBox = (ev) => {
      $scope.selectReason = !$scope.selectReason;
      ev.stopPropagation();
    }
    $scope.handleSelectItem = (r) => {
      $scope.selectItem = r;
      $scope.selectReason = false;
      // if(r.id == '5') {
      //   $scope.notSubmit = true;
      // } else {
      //   $scope.notSubmit = false;
      // }
      formatSubmit();
    }
    $scope.commentText = '';
    $scope.textNumber = 0;
    $scope.handleCommentChange = (val) => {
      $scope.commentText = val && val.trim();
      $scope.textNumber = val && val.replace(/\s/g, '').length || 0;
      // if($scope.textNumber < 1 || $scope.textNumber > 500) {
      //   $scope.notSubmit = true;
      // } else {
      //   $scope.notSubmit = false;
      // }
      formatSubmit();
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
          padding = 0,
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
          style.height = height + extra + 'px';
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
    autoTextarea(text);// 调用

    $scope.$on('rateCtrl', (ele, data) => {
      $scope.rateStar = data;
      // if(data && data < 4 && ($scope.textNumber < 1 || $scope.textNumber > 500)) {
      //   $scope.notSubmit = true;
      // } else if (data > 3) {
      //   $scope.notSubmit = false;
      // }
      formatSubmit();
    })


    function formatSubmit () {
      if($scope.rateStar && $scope.rateStar > 3) {
        $scope.notSubmit = false;
      } else if($scope.rateStar && $scope.rateStar < 4 && $scope.selectItem.id == '5' && ($scope.textNumber > 0 && $scope.textNumber < 501) ) {
        $scope.notSubmit = false;
      } else if($scope.rateStar && $scope.rateStar < 4 && $scope.selectItem.id && $scope.selectItem.id != '5') {
        $scope.notSubmit = false;
      } else {
        $scope.notSubmit = true;
      }
    }

    // 提交评论
    $scope.handleSubmit = () => {
      // 必须选择星星，低于4星必须选择原因，选择其他必须输入文字
      if($scope.rateStar < 4 && (!$scope.selectItem.id || ($scope.selectItem.id == '5' && !$scope.commentText)) || !$scope.rateStar) {
        return layer.msg('Please leave your review here and we will improve it.');
      }
      if($scope.rateStar > 3) {
        $scope.commentText = 'Good review by default.';
      }
      if($scope.notSubmit) {
        return false;
      }
      const params = {
        sourceId: $scope.soudeId,
        comment: $scope.commentText,
        score: $scope.rateStar,
        commentType: $scope.selectItem.id || 0,
        productId: $scope.sourcecontent.CjproductId,
        sourceType: $scope.sourcetype
      };
      dsp.postFun('source/sourcing/addComment', JSON.stringify(params), (response) => {
        const {message, statusCode} = response.data;
        if(statusCode == '200') {
          layer.msg('Submitted Successfully.');
          getComment();
          $scope.isReviewd = true;
          $scope.edit = false;
        } else {
          layer.msg(message);
        }
      })
    }

    // 获取搜品评论
    function getComment() {
      const params = {
        sourceId: $scope.soudeId
      }
      dsp.postFun('source/sourcing/getComment', JSON.stringify(params), (response) => {
        const { message, data, statusCode} = response.data;
        if(statusCode == '200') {
          $scope.rateStar = data.score;
          if(data.score) {
            $scope.isReviewd = true;
          }
          const i = Number(data.commentType);
          $scope.review = {
            reason: i != 0 && i != 5 ? $scope.reasonList[i - 1].name : '',
            text: data.comment
          }
          if(i == 0 && !data.comment) {
            $scope.review.text = 'Good review by default.';
          }
        } else {
          layer.msg(message);
        }
      })
    }

  }])

  return module;
}
