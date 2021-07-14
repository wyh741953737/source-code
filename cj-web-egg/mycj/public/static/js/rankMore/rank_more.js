(function () {
  var app = angular.module('rankMore-app', ['service', 'home-service', 'cjCompnentModule', 'cjDirectiveModule', 'CommonHeaderCom', 'CommonFooterCom', 'custom-filter', 'cjDotModule']);
  angular.module('cjCompnentModule', []);
  app.controller('rankMoreCtr', ['$scope', '$http', '$window', 'dsp', 'cjhome', '$sce', '$rootScope', '$timeout', '$interval', function ($scope, $http, $window, dsp, cjhome, $sce, $rootScope, $timeout, $interval) {
    dsp.domainData().then((res) => {
      // 请求成功的结果
      $scope.iscj = res.iscj;
      if ($scope.iscj == '1') {
        //cj
        $scope.icon = '/favicon.ico';
        document.title = 'CJ Best Seller Rank';
      } else {
        //客户
        $scope.icon = res.logo1 || '/favicon.ico';
        $('link[rel$=icon]').replaceWith('');
        $('head').append($('<link rel="shortcut icon"/>').attr('href', $scope.icon));
        document.title = res.websiteName ? res.websiteName + 'Best Seller Rank' : 'CJ Best Seller Rank';
      }
      // 如果不是erp过来的登录，加载聊天
      if (!localStorage.getItem('loginfromerp')) {
        dsp.addChatWindow();
        dsp.addGuidWindow();
      }
    })
    var bs = new Base64();
    $scope.userId = localStorage.getItem('userId') == null ? '' : bs.decode(localStorage.getItem('userId'));
    $scope.loginName = localStorage.getItem('firstName') == null ? '' : bs.decode(localStorage.getItem('firstName'));
    $scope.token = bs.decode(localStorage.getItem('token') == null ? '' : localStorage.getItem('token'));
    $scope.hasLogin = dsp.isInLoginState();
    $scope.flag = '0';
    $scope.pageNum = '1';
    $scope.pageSize = '80';
    $scope.totalNum = 0;
    $scope.goodList = [];
    $scope.hasListData = false;
    $scope.dayFlag = 'three';

    // ------------------------------------------ 19-06-17 币种
    $rootScope.$on('calc-exchange-rate', function (ev, rate) {
      console.log('汇率 ->', rate);
      refreshPrice(rate);
    });
    function refreshPrice(rate) {
      if (Array.isArray($scope.goodList)) $scope.goodList = $scope.goodList.map(item => item);
    }
    // ------------------------------------------

    // 设置最小高度
    var minHeight = $(window).height() * 1;
    $('.Product').css('min-height', minHeight - 200 + 'px')
    $scope.Search = dsp.getQueryString('Search') || '';
    console.log($scope.Search)
    $scope.tabDay = function (n) {
      $scope.dayFlag = n;
      console.log($scope.dayFlag)
      $scope.pageNum = '1';
      getSearchProList()
    };
    $(window).scroll(function(){
      if ($(window).scrollTop() > $(window).height())
        $('.back_to_top').fadeIn();
      else
        $('.back_to_top').fadeOut();
      var scrollTop = $(this).scrollTop();
      var scrollHeight = $(document).height();
      var windowHeight = $(this).height();
      var x = scrollHeight - (scrollTop + windowHeight) ;
      if(x <= 60){
        $('.asj-page-box').css({bottom:'60px'});
      }else {
        $('.asj-page-box').css({bottom:'0px'});
      }
    });
    function pagelocal() {
      $timeout(function () {
        var wh = $(window).height() - 200;
        var h = $('.headerScroll').height();
        console.log(wh)
        console.log(h)
        if(h > wh){
          $('.asj-page-box').css({bottom:'0px'});
        }else {
          $('.asj-page-box').css({bottom:'60px'});
        }
      },0)
    }
    $(window).trigger('scroll');
    $scope.goTop = function () {
      $('html,body').animate({
        scrollTop: 0
      }, 300);
    }
    /*根据搜索查询商品*/
    function getSearchProList() {
      $scope.goodList = [];
      var parms = {
        "pageNum": $scope.pageNum.toString(),
        "pageSize": $scope.pageSize,
        "timeFlag":$scope.dayFlag,
        'inputStr': $scope.Search
      };
      $(".Product").busyLoad("show", {
        color: '#FF7700',
        background: 'transparent'
      }).css('min-height', minHeight - 200 + 'px');
      dsp.postFun('cj/homePage/getXiaoLiangPaiHangShangPin', parms, function (data) {
        //$rootScope.isPrintonDemand = true;
        $(".Product").busyLoad("hide");
        $(".Product").css('min-height', minHeight - 255 + 'px');
        if (data.data.statusCode == 200) {
          data.data.result.list.forEach(function (o, i) {
            o.bigImg = 'https://' + o.bigImg.replace('https://', '').replace('http://', '');
            o.idx = i + 1 +($scope.pageNum - 1) * $scope.pageSize;
          })
          $scope.goodList = data.data.result.list;
          $scope.totalNum = data.data.result.totalNum;
          console.log($scope.totalNum)
          pagelocal();
          $scope.totalPageNum = Math.ceil($scope.totalNum / ($scope.pageSize * 1));
          if ($scope.totalNum == 0 || $scope.totalNum == undefined) {
            dsp.addNodataPic($('.PrintContent'), minHeight - 255);
            $scope.hasListData = false;
          } else {
            dsp.removeNodataPic($('.PrintContent'));
            $scope.hasListData = true;
            $(".Product").css('min-height', minHeight - 255 + 'px');
          }
          pageFun()
        } else {
          $scope.hasListData = false;
          layer.msg('Get the product list error');
        }
      }, function (err) {
        $scope.hasListData = false;
        $(".Product").busyLoad("hide");
          dsp.cjMesFun(1);
      });
    }
    getSearchProList();
    //分页
    function pageFun() {
      $(".page-index").jqPaginator({
        totalCounts: $scope.totalNum || 1,
        pageSize: $scope.pageSize * 1,
        visiblePages: 5,
        currentPage: $scope.pageNum * 1,
        activeClass: 'current',
        prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
        next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
        page: '<a href="javascript:void(0);">{{page}}<\/a>',
        first: '<a class="prev" href="javascript:void(0);">&lt&lt;<\/a>',
        last: '<a class="prev" href="javascript:void(0);">&gt&gt;<\/a>',
        onPageChange: function (n, type) {
          if (type == 'init') {
            return;
          }
          $scope.pageNum = n.toString();
          getSearchProList()
        }
      });
    }
    $scope.chanPageNum = function () {
      if (!isNaN($scope.pageNum * 1) && $scope.pageNum * 1 > 0 && $scope.pageNum * 1 <= $scope.totalPageNum) {
        getSearchProList();
      } else {
        $scope.pageNum = '1';
      }
    }
  }])
  app.directive('repeatFinish', function () {
    return {
      link: function (scope, element, attr) {
        if (scope.$last == true) {
          console.log('ng-repeat执行完毕')
          scope.$eval(attr.repeatFinish)
        }
      }
    }
  });
})()