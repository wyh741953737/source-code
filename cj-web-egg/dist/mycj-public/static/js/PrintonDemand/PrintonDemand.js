(function () {

  var app = angular.module('PrintonDemand-app', ['service', 'home-service', 'cjCompnentModule', 'cjDirectiveModule', 'CommonHeaderCom', 'CommonFooterCom', 'custom-filter', 'cjDotModule']);
  angular.module('cjCompnentModule', []);
  app.controller('PrintonDemandCtr', ['$scope', '$http', '$window', 'dsp', 'cjhome', '$sce', '$rootScope', '$timeout', '$interval', function ($scope, $http, $window, dsp, cjhome, $sce, $rootScope, $timeout, $interval) {
    // window.addEventListener('scroll', () => {
    //   const scrollTop = window.pageYOffset;
    //   if (document.querySelector('.POD-top-Header')) {
    //     if(scrollTop<=40){
    //       document.querySelector('.POD-top-Header').classList.remove('head-fixed')
    //     }else{
    //       document.querySelector('.POD-top-Header').classList.add('head-fixed')
    //     }
    //   }
    // })


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
    var bs = new Base64();
    $scope.userId = localStorage.getItem('userId') == null ? '' : bs.decode(localStorage.getItem('userId'));
    $scope.loginName = localStorage.getItem('firstName') == null ? '' : bs.decode(localStorage.getItem('firstName'));
    $scope.token = bs.decode(localStorage.getItem('token') == null ? '' : localStorage.getItem('token'));
    $scope.hasLogin = dsp.isInLoginState();
    $scope.flag = '0';
    $scope.pageNum = '1';
    $scope.pageSize = '60';
    $scope.totalNum = 0;
    $scope.goodList = [];
    $scope.hasListData = false;
    $scope.CategoryData = [];
    $timeout(function () {
      $rootScope.isPrintonDemand = true;
    }, 100)
    // 设置最小高度
    var minHeight = $(window).height() * 1;
    $('.Product').css('min-height', minHeight - 180 + 'px')
    $scope.Search = dsp.getQueryString('Search') || '';
    $scope.category = dsp.getQueryString('category') ? JSON.parse(bs.decode(dsp.getQueryString('category'))) : '';
    $scope.categoryId = $scope.category.id || '';
    $scope.CateType = dsp.getQueryString('CateType') || '1';
    if ($scope.Search) {
      getCateProList();
    } else {
      getCategory();
    }

    /*获取类目*/
    function getCategory() {
      var data = {
        categoryID: $scope.categoryId
      };
      $(".Product").busyLoad("show", {
        color: '#FF7700',
        background: 'transparent'
      }).css('min-height', minHeight - 180 + 'px');
      dsp.postFun('cj/individuationProduct/getIndividuationCategoryInfo', data, function (data) {
        $rootScope.isPrintonDemand = true;
        if (data.data.statusCode == 200) {
          if (data.data.result.length == 0 || data.data.result == undefined) {
            dsp.addNodataPic($('.Product'), minHeight - 180);
            return;
          }
          data.data.result.forEach(function (o, i) {
            o.act = false;
          });
          $scope.CategoryData = data.data.result;
          $scope.CategoryData[0].act = true;
          $scope.categoryId = $scope.CategoryData[0].ID;
          getCateProList();
        } else {
          //layer.msg('Get the product list error');
        }
      }, function (err) {
        dsp.addNodataPic($('.Product'), minHeight - 180);
        dsp.cjMesFun(1);
      });
    }
    $scope.categoryClick = (id,name) =>{
      if(id){
        location.href = `PrintonDemand.html?category=${bs.encode(JSON.stringify({
          id: id,
          name: name
        }))}`
      }else {
        location.href = `PrintonDemand.html`
      }
    };
    $scope.tabClick = (item) => {
      $scope.CategoryData.forEach(function (o, i) {
        o.act = false;
      });
      item.act = true;
      $scope.categoryId = item.ID;
      $scope.CateType = '1';
      $scope.pageNum = '1';
      getCateProList();
    }
    $scope.renderFinish = () => {
      var s = Math.ceil($scope.CategoryData.length / 5);
      var n = 1;
      if (s > 1) {
        $('.new-prev').css({'opacity': '0'})
        $('.new-next').css({'opacity': '1'})

        $scope.prevBtn = function () {
          console.log(n)
          n--;
          $('.new-next').css({'opacity': '1'})
          console.log(n)
          var l = -1200 * (n - 1);
          if (n < 1) {
            n = 1;
            return
          }
          if (n == 1) {
            $('.new-prev').css({'opacity': '0'})
            $('.new-next').css({'opacity': '1'})
            l = 0;
          }
          $('#PrintTab').css({left: l + 'px'})
        }
        
        $scope.nextBtn = function () {
          n++;
          console.log(n)
          $('.new-prev').css({'opacity': '1'})
          if (n > s) {
            n = s;
            return;
          }
          if (n == s) {
            $('.new-prev').css({'opacity': '1'})
            $('.new-next').css({'opacity': '0'})
          }
          console.log(n)
          var l = -1200 * (n - 1);
          $('#PrintTab').css({left: l + 'px'})
        };
      } else {
        $('.new-prev').css({'opacity': '0', 'cursor': 'auto'})
        $('.new-next').css({'opacity': '0', 'cursor': 'auto'})
      }
    }

    /*根据搜索查询商品*/
    function getSearchProList() {
      $scope.goodList = [];
      var parms = {
        "pageNum": $scope.pageNum.toString(),
        "pageSize": $scope.pageSize,
        'productName': $scope.Search
      };
      $(".Product").busyLoad("show", {
        color: '#FF7700',
        background: 'transparent'
      }).css('min-height', minHeight - 180 + 'px');
      dsp.postFun('cj/individuationProduct/quaryIndividuationProductInfo', parms, function (data) {
        $rootScope.isPrintonDemand = true;
        $(".Product").busyLoad("hide");
        $(".Product").css('min-height', minHeight - 255 + 'px');
        if (data.data.statusCode == 200) {
          data.data.result.list.forEach(o => o.bigImg = 'https://' + o.bigImg.replace('https://', '').replace('http://', ''))
          $scope.goodList = data.data.result.list;
          $scope.totalNum = data.data.result.count;
          console.log($scope.totalNum)
          $scope.totalPageNum = Math.ceil($scope.totalNum / ($scope.pageSize * 1));
          if ($scope.totalNum == 0 || $scope.totalNum == undefined) {
            dsp.addNodataPic($('.PrintContent'), minHeight - 255);
            $scope.hasListData = false;
          } else {
            dsp.removeNodataPic($('.PrintContent'));
            $scope.hasListData = true;
            $(".Product").css('min-height', minHeight - 225 + 'px');
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

    /*根据类目获取商品*/
    function getCateProList() {
      $scope.goodList = [];
      var parms = {
        "pageNum": $scope.pageNum.toString(),
        "pageSize": $scope.pageSize,
        "categoryID": $scope.categoryId,
        'type': $scope.CateType,
        'productName':$scope.Search
      };
      $(".Product").busyLoad("show", {
        color: '#FF7700',
        background: 'transparent'
      });
      dsp.postFun('cj/individuationProduct/getIndividuationProductInfo', parms, function (data) {
        $(".Product").busyLoad("hide");
        if (data.data.statusCode == 200) {
          data.data.result.list.forEach(o => o.bigImg = 'https://' + o.bigImg.replace('https://', '').replace('http://', ''))
          $scope.goodList = data.data.result.list;
          $scope.totalNum = data.data.result.count;
          $scope.totalPageNum = Math.ceil($scope.totalNum / ($scope.pageSize * 1));
          if ($scope.totalNum == 0 || $scope.totalNum == undefined) {
            dsp.addNodataPic($('.PrintContent'), minHeight - 228);
            $scope.hasListData = false;
          } else {
            dsp.removeNodataPic($('.PrintContent'));
            $scope.hasListData = true;
            $(".Product").css('min-height', minHeight - 228 + 'px');
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
          if ($scope.Search) {
            getSearchProList();
          } else {
            getCateProList();
          }
        }
      });
    }

    $scope.changePageNum = function() {
      if ($scope.pageNum > $scope.totalPageNum) {
        $scope.pageNum = $scope.totalPageNum
      }
    }

    $scope.chanPageNum = function () {
      if (!isNaN($scope.pageNum * 1) && $scope.pageNum * 1 > 0 && $scope.pageNum * 1 <= $scope.totalPageNum) {
        if ($scope.Search) {
          getSearchProList();
        } else {
          getCateProList();
        }
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
