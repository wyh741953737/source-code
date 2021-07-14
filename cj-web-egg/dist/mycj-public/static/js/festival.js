/**
 * 公共 节日 模块 url 传递 /festival?id=id&pageSize=20
 */
(function () {
  var app = angular.module('ld-app', [
    'service',
    'home-service',
    'cjCompnentModule',
    'cjDirectiveModule',
    'CommonHeaderCom',
    'CommonFooterCom',
    'custom-filter',
    'cjDotModule'
  ]);
  // 创建组件模块
  angular.module('cjCompnentModule', []);
  app.controller('ld-controller', [
    '$scope',
    '$http',
    '$window',
    'dsp',
    'cjhome',
    '$sce',
    '$rootScope',
    function ($scope, $http, $window, dsp, cjhome, $sce, $rootScope) {
      
      //轮播图数据
      $scope.bannerList = [//轮播图数据 
        {
          img_url: 'static/image/list-detail/banner-1.jpg',
          link: '',
          skipType: '1'
        },
        {
          img_url: 'static/image/list-detail/banner-2.png',
          link: 'https://cjdropshipping.com/2019/10/09/cjdropshipping-is-helping-dropshippers-who-want-to-scale-up-selling-to-usa-in-q4/',
          skipType: '2'
        },
        {
          img_url: 'static/image/list-detail/banner-3.jpg',
          link: 'special/thai/index.html',
          skipType: '3'
        },
      ];
      //商品列表数据
      $scope.goodList = []//商品列表
      init()
      function init() {//页面初始化 获取数据 记录浏览次数
        let query = retUrlQuery() || {};
        const { id, pageSize = 20 } = query
        // console.log('retUrlQuery', query)
        if (!id) return;
        getList(id, pageSize)
        addView(id)
        getPageTitle(id)
      }
      function retUrlQuery() {//获取 url  query参数
        const url = window.location.search;//?id=1&pageSize=20 or ''
        const re = /[A-z]+\=[\d]+/g
        const query = {}
        const queryArr = url.match(re);//匹配不到 返回null
        if (queryArr === null) return query;
        queryArr.forEach(entriesString => {
          const entries = entriesString.split('=');
          query[entries[0]] = entries[1]
        })
        return query;
      }
      function getList(ids, pageSize = 20) {//获取数据 activityId 感恩节 主题 对应的数据
        if (!ids) return;
        dsp.postFun('cj/activity/getProductListByIds', { ids, pageSize }, function ({ data = {} }) {
          const { result, statusCode } = data;
          // console.log('data ---->>>> ', data)
          if (statusCode === '200') {
            $scope.goodList = result[ids] || [];//返回result 为数组  id为 '1,2,3' 则 数组中 有1,2,3 才是 商品列表  此处默认 url传参id  为 单一的id值
          }
        }, function () {
          $scope.goodList = []
        })
      }
      function addView(ids) {//记录浏览次数
        dsp.postFun('cj/activity/activityClickV2', { ids }, function ({ data = {} }) {
          const { statusCode } = data;
          if (statusCode === '200') {
            console.log('addView success')
          }
        }, function () {
          console.log('addView failed')
        })
      }
      function getPageTitle(id) {//获取 商品列表页 title 
        dsp.postFun('cj/activity/getActivityList', { id }, function ({ data = {} }) {
          const { statusCode } = data;
          // console.log('getPageTitle ----->>> ', data)
          if (statusCode === '200') {
            const { title } = data.result[0] || {};
            changeTitle(title)
            // console.log('getPageTitle success')
          }
        }, function () {
          console.log('getPageTitle failed')
        })
      }
      function changeTitle(str) {
        str && (document.title = str);
      }
      //商品点击 收藏
      $scope.$on('collectEvent', function (event, { id }) {
        collect(id)
      });

      function collect(id) {//数据 驱动试图 变化
        $scope.goodList = $scope.goodList.map(item => {
          if (item.id == id) item.isCollect = item.isCollect == '1' ? '0' : '1';
          return item;
        })
      }
    }
  ]);


})();


/**
 *    /cj/activity/getProductListByIds  商品列表
 *    params {ids: 'id1,id2,id3..' --->> string, pageSize: 20 --->> int}  ids  活动id，多个ID之间用英文逗号分隔
 *
 *    /cj/activity/activityClickV2 商品列表页埋点
 *      params { ids: 'id1,id2,id3..' --->> string }  ids  活动id，多个ID之间用英文逗号分隔
 *
 *    /cj/activity/getActivityList 获取 商品列表页 title
 *    params {id: }
 *
 *    /cj/activity/productClick  商品点击 埋点  商品卡片组件中
 *    params { activityId: 活动id --->> int, productId: '商品ID' }
 */

// 假数据
// const obj = {
//   bigimg: 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/15215040/843419784295.jpg',
//   bigImg: 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/20180915/1245667294451.png',
//   clickCount: 10799,
//   flag: '1',
//   id: '31BFC4E1-D355-4A44-90C5-4A18A1DCA320',
//   isCollect: '1',
//   isHaveVideo: 'HAVE_VIDEO',
//   isPersonalized: '0',
//   nameEn: '60 Secondes Salade Mix.',
//   num: 0,
//   published: 315,
//   salesCount: 0,
//   sellprice: '1.24 -- 1.63',
//   showClickCount: 10799,
//   timeFlag: '',
//   type: ''
// } 
// const DATA = [Object.assign({}, obj), Object.assign({}, obj, {isCollect: '0', id: '31BFC4E1-D355-4A44-90C5-4A18A1DCA321'})];
// for (let i = 0; i < 15; i++) {
//   DATA.push(Object.assign({}, obj, {isCollect: Math.random() - 0.5 > 0 ? '0' : '1'}))
// }