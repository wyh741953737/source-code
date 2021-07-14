(function () {
  const app = angular.module('tutorialApp', ['service', 'home-service', 'utils', 'CommonHeaderCom', 'CommonFooterCom', 'commonRelatedLinks', 'custom-filter', 'cjCompnentModule']);
  app.controller('tutorialCtrl', ['$scope', 'dsp', '$sce', '$http', function ($scope, dsp, $sce, $http) {
    var base64 = new Base64();

    $scope.tabActive = 'video'; // tab选中
    $scope.faqActive = 'Product' //tab为faq时faq的默认标签
    $scope.dataList = []; // 视频数据
    $scope.searchTxt = '';

    const faqTab = {
      Product: '1',
      Orders: '2',
      Shipment: '3',
      Ass: '4',
      Others: '5',
      Solutions: '6'
    }
    console.log(dsp.getQueryString('faqTab'));
    const tab = dsp.getQueryString('faqTab')
    if (tab) {
      $scope.tabActive = 'faq';
      $scope.pageNum = '1';
      $scope.faqActive = tab;
      $scope.faqTab = faqTab[tab];
      getFaqData();
    }

    // 如果不是erp过来的登录，加载聊天
    if (!localStorage.getItem('loginfromerp')) {
      dsp.addChatWindow();
      dsp.addGuidWindow();
    }

    /* 头部菜单进入埋点 */
    function trackFun() {
      dsp.postFun('pojo/home/addStatisByType', {
        entryPage: +dsp.getQueryString('track')
      }, res => {
        console.log(res.data);
      });
    }

    if (+dsp.getQueryString('track') == 8) {
      trackFun();
    }

    // loading 加载动画
    function loadingShow(el, color) {
      $(el).busyLoad('show', {
        color,
        background: '#fff'
      });
    }

    function loadingHide(el) {
      $(el).busyLoad('hide');
    }

    // 搜索
    $scope.handleSearch = () => {
      $scope.pageNum = '1';
      if ($scope.tabActive === 'video') {
        getVideoData();
      } else if ($scope.tabActive === 'content') {
        getContentData();
      } else if ($scope.tabActive === 'faq') {
        getFaqData();
      } else if ($scope.tabActive === 'elites' ) {
        getElitesList()
      }
    };

    $scope.enterSearch = e => {
      if (e.keyCode === 13) $scope.handleSearch();
    };

    // tab切换
    $scope.handleTabClick = type => {
      $scope.tabActive = type;
      $scope.pageNum = '1';
      // $scope.searchTxt = '';
      if (type === 'video') {
        getVideoData();
      } else if (type === 'content') {
        getContentData();
      } else if (type === 'faq') {
        getFaqData();
      } else if (type === 'elites') {
        getElitesList()
      }
    };

     // tab切换
     $scope.contentClick = (item, index) => {
        dsp.postFun('pojo/promotionContent/addClickCount', {  'id': item.id }, ({ data }) => {
          
        }, err => console.log(err));
    };

    // 获取视频数据
    function getVideoData() {
      $scope.pageSize = '12';
      const params = {
        'inputStr': $scope.searchTxt,
        'pageNum': $scope.pageNum,
        'pageSize': $scope.pageSize
      };
      loadingShow('.content-box', '#FF7700');
      dsp.postFun('pojo/promotionVideo/cjVideos', params, ({ data }) => {
        loadingHide('.content-box');
        if (data.statusCode === '200') {
          $scope.dataList = JSON.parse(data.result).videos.map(o => ({
            ...o,
            videoUrl: $sce.trustAsResourceUrl(o.videoUrl)
          })) || [];
          $scope.totalCount = Number(JSON.parse(data.result).totle);
          pageFun(getVideoData);
        }
      }, err => console.log(err));
    }

    getVideoData();

    // 获取content数据
    function getContentData() {
      $scope.pageSize = '10';
      const params = {
        'title': $scope.searchTxt,
        'pageNum': $scope.pageNum,
        'pageSize': $scope.pageSize
      };
      loadingShow('.content-box', '#FF7700');
      dsp.postFun('pojo/promotionContent/cjContents', params, ({ data }) => {
        loadingHide('.content-box');
        if (data.statusCode === '200') {
          $scope.dataList = JSON.parse(data.result).videos || [];
          $scope.totalCount = Number(JSON.parse(data.result).totle);
          pageFun(getContentData);
        }
      }, err => console.log(err));
    }

    /**计算每一页的计算 */
    $scope.calcIndex = function (index) {
      const { pageNum = '1', pageSize = '10' } = $scope
      return pageSize * (pageNum - 1) + (index + 1)
    }

    // 获取faq数据
    function getFaqData() {
      loadingShow('.content-box', '#FF7700');
      $scope.pageSize = '10';
      dsp.postFun('app/message/getQuestionListByPage', {
        type: $scope.faqTab || '1',
        page: $scope.pageNum,
        limit: $scope.pageSize,
        status: '1',
        search: $scope.searchTxt
      }, ({ data }) => {
        loadingHide('.content-box');
        console.log(data);
        if (data.statusCode === 'CODE_200') {
          $scope.dataList = data.result.list;
          $scope.totalCount = Number(data.result.count);
          pageFun(getFaqData);
        }
      })
    }

    /** 2020-08-12 论坛 */
    const elitesApi = {
      list: 'app/article/selectArticleList',
      search: 'app/article/selectSearchArticleList'
    }
    function getElitesList() {
      loadingShow('.content-box', '#FF7700');
      $scope.pageSize = '10';
      let params = {
        pageNum: +$scope.pageNum,
        pageSize: 10
      }
      if ($scope.searchTxt) params = { ...params, title: $scope.searchTxt }
      dsp.postFun($scope.searchTxt ? elitesApi.search : elitesApi.list, params, ({ data }) => {
        loadingHide('.content-box');
        const { code, data: result = {} } = data
        if (+code !== 200 ) return;

        const { list = [], total } = result
        $scope.dataList = list.map(v => ({
          ...v,
          elitesContent: v.content.replace(/<[^>]*>|/g,"").trim()
        }))
        $scope.totalCount = +total
        console.log($scope.dataList)
        pageFun(getElitesList);
      }, () => { }, { isElites: true })
    }

    //跳转论坛
    $scope.lookElites = item => {
      console.log(item)
      const token = base64.decode(localStorage.getItem('token') == undefined ? "" : localStorage.getItem('token'));
      let otime = new Date().getTime();
      const { articleType, id } = item
      if (articleType === 1) {
        window.open(`https://elites.cjdropshipping.com/${token ? `cross?token=${token}&_t=${otime}&url=/` : ''}article-detail?id=${id}`)   //文章详情      
      } else if (articleType === 2) {
        window.open(`https://elites.cjdropshipping.com/${token ? `cross?token=${token}&_t=${otime}&url=/` : ''}question-detail?id=${id}`)           //问题
      }
    }
    //论坛 问题 切换
    $scope.toggleElites = item => {
      const { articleType } = item
      if (articleType !== 1) item.active = !item.active
    }
    $scope.textClick = item => {
      const { articleType } = item
      if (articleType === 1) $scope.lookElites(item)
    }

    // 根据faq的标签类型获取相应faq数据
    $scope.faqTabClick = tab => {
      $scope.faqActive = tab;
      $scope.pageNum = '1';
      // $scope.searchTxt = '';
      console.log(tab);
      $scope.faqTab = faqTab[tab];
      getFaqData()
    }
    // 分页
    function pageFun(fn) {
      $('#page-box').jqPaginator({
        totalCounts: Number($scope.totalCount) || 1,
        pageSize: Number($scope.pageSize),
        visiblePages: 5,
        currentPage: Number($scope.pageNum) || 1,
        activeClass: 'active',
        prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
        next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
        page: '<a href="javascript:void(0);">{{page}}<\/a>',
        first: '<a class="prev" href="javascript:void(0);">&lt&lt;<\/a>',
        last: '<a class="prev" href="javascript:void(0);">&gt&gt;<\/a>',
        onPageChange: function (n, type) {
          if (type == 'init') {
            return;
          }
          console.log(n);
          $scope.pageNum = n.toString();
          fn();
        }
      });
    }

  }]).filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }]);

})()
