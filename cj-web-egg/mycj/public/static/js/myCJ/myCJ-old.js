(function (angular, Base64) {
  var app = angular.module('app', [
    'ngRoute',
    'cjCompnentModule',
    'cjDirectiveModule', // directive
    // 'workOrdersCom',// 工单
    'wui.date', // 日期插件（新）
    'authorizeApp',
    'searchgoods-app',
    'searchdoodsdetail-app',
    'aftersale-app',
    'problempackage-app',
    'myCJPurchase',
    'myCJWallet',
    'ShippingCalculation',
    'myCJFavorites',
    'myCJprofile',
    'myCJAssociatedStore',
    'payment-app',
    'addproduct-app',
    'myCJmyInventory',
    'orddetail-app',
    'productsConnected-app',
    'drop-home-app',
    'drop-homezi-app',
    'drop-proce-app',
    'drop-proceed-app',
    'drop-processedzi-app',
    'drop-procezi-app',
    'drop-dispat-app',
    'drop-comp-app',
    'drop-closed-app',
    'drop-completzi-app',
    'drop-closezi-app',
    'myCJSubmitForm',
    'imp-process-app',
    'imp-cart-app',
    'imp-cancel-app',
    'imp-refund-app',
    'imp-searchall-app',
    'imp-incomp-app',
    'allimp-app',
    'goods',
    'apikeyApp',
    'pod-app',
    'CommonFooterCom',
    'myCJFBA',
    'AuthorizeOrder-app',
    'custom-filter',
    'todolist',
    'regularPackaging',//自定义包装
    'ticket-list-app', //ticket页面
    'ticket-add-app', //ticket页面
    

    //'supplier-order-app'
    'points-app' // 积分商城
  ]);
  // 创建组件模块
  angular.module('cjCompnentModule', ['utils', 'ngSanitize']);
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      // .when('/myCJ-home', {// #/home_page
      //     // templateUrl:'./home.html'
      //     templateUrl: './static/html/myCJ/myCJ-home/myCJ-home.html',
      //     controller: 'myCJHomeCtrl'
      // })
      /** 已迁移 .when('/myCJ-purchase/:id?/:proData?/:orderType?', { // id 订单id, proData 自定义包装商品数据  type 自定义包装去结算页面参数 package 自定义包装 taobao  插件订单
        // templateUrl:'./home.html'
        templateUrl: './static/html/myCJ/myCJ-home/myCJ-purchase.html',
        controller: 'myCJPurchaseCtrl'
      }) */
      /** 已迁移 .when('/myCJ-FBApurchase', {
        // templateUrl:'./home.html'
        templateUrl: './static/html/myCJ/myCJ-home/myCJ-FBApurchase.html',
        controller: 'myCJFBAPurchaseCtrl'
      }) */
      /** 已迁移 .when('/myCJ-favorites/:pid?', {// 收藏
        // templateUrl:'./home.html'
        templateUrl: './static/html/myCJ/myCJ-home/myCJ-favorites.html',
        controller: 'myCJFavoritesCtrl'
      }) */
      /** 已迁移 .when('/myCJWallet', {// 钱包
        // templateUrl:'./home.html'
        templateUrl: './static/html/myCJ/myCJ-home/myCJ-Wallet.html?v=2019071312',
        controller: '1332'
      }) */
      /** .when('/myCJShippingCalculation', {// 运费试算
        // templateUrl:'./home.html'
        templateUrl: './static/html/myCJ/myCJ-home/myCJ-ShippingCalculation.html',
        controller: 'ShippingCalculationCtrl'
      }) */
      /** 已迁移 .when('/profile/:type?', {//个人中心
        // templateUrl:'./home.html'
        templateUrl: './static/html/demo/profile.html',
        controller: 'myCJprofileCtrl'
      }) */
      /** 已迁移 .when('/authorize/:type?', {
        templateUrl: './static/html/myCJ/authorize/authorize.html',
        controller: 'authorizeAppCtrl'
      }) */
      /** 已迁移 .when('/apikey', {
        templateUrl: './static/html/myCJ/authorize/apiKey.html',
        controller: 'apikeyAppCtrl'
      }) */
      // .when('/products-connection/:connectStatus?', {
      //     templateUrl: './static/html/myCJ/products-connection/products-connection.html',
      //     controller: 'productsConnectionCtrl'
      // })
      /** 已迁移 .when('/products-connection/pending-connection/:searchstr?/:mcInfo?', { //关联商品
        templateUrl: './static/html/myCJ/products-connection/products-pending-connection.html',
        controller: 'productsConnectionCtrl'
      }) */
      /** 已迁移 .when('/products-connection/sourcing-connection/:searchstr?/:scInfo?', { //搜品关联
        templateUrl: './static/html/myCJ/products-connection/products-sourcing-connection.html',
        controller: 'sourcingconnectionCtrl'
      }) */
      /** 已迁移 .when('/products-connection/service-connection/:searchstr?/:scInfo?', { //搜品关联
        templateUrl: './static/html/myCJ/products-connection/products-sourcing-connection.html',
        controller: 'sourcingconnectionCtrl'
      }) */
      /** 已迁移 .when('/products-connection/connected/:seachCs?', { //已经关联
        templateUrl: './static/html/myCJ/products-connection/products-connected.html',
        controller: 'productsConnectedCtrl'
      }) */
      /** 已迁移 .when('/relevant-packaging/:itemData/:type', { //关联包装
        templateUrl: './static/html/myCJ/products-connection/relevant-packaging.html',
        controller: 'relevant-packagingCtrl'
      }) */
      /** 已迁移 .when('/products-connection/SKUlist', { //SKUlist
        templateUrl: './static/html/myCJ/products-connection/products-SKUlist.html',
        controller: 'productsSkulistCtrl'
      }) */
      /** 已迁移 .when('/products-connection/service', { //SKUlist
        templateUrl: './static/html/myCJ/products-connection/products-service.html',
        controller: 'productsServiceCtrl'
      }) */
      /** 已迁移 .when('/products-connection/goods', { // 服务商品
        templateUrl: './static/html/myCJ/products-connection/products-goods.html',
        controller: 'productsServiceGoods'
      }) */
      /** 已迁移 .when('/products-connection/waybill', { // 运单
        templateUrl: './static/html/myCJ/products-connection/products-waybill.html',
        controller: 'productsServiceWaybill'
      }) */
      /** 已迁移 .when('/pod/buyer-design', { //定制商品-buyer design
        templateUrl: './static/html/myCJ/pod/pod-buyer-design.html',
        controller: 'productsBuyerDesignCtrl'
      }) */
      /** 已迁移 .when('/pod/design-myself/:opencart?', { //定制商品-design myself
        templateUrl: './static/html/myCJ/pod/pod-design-myself.html',
        controller: 'productsDesignMyselfCtrl as ctrl'
      }) */
      /** 已迁移 .when('/products-connection/history/:status?', { //历史记录
        templateUrl: './static/html/myCJ/products-connection/products-history.html',
        controller: 'historyCtrl'
      }) */
      // .when('/dropShippingCenter', {//自动订单
      //     templateUrl: './static/html/order-center/direct-orders.html',
      //     controller: 'direct-orders-ctrl'
      // })
      /** 已迁移 .when('/all-import', {//自动订单 所有未拉取的订单
        templateUrl: './static/html/order-center/all-impord.html',
        controller: 'allimp-ctrl'
      }) */
      /** ---- useless ----
      .when('/dropShippingCenter', {//自动订单 待处理订单
        templateUrl: './static/html/order-center/imp-process.html?v=20190705',
        controller: 'imp-process-ctrl'
      }) */
      /** 已迁移 .when('/imp-cart', {//自动订单 待提交订单
        templateUrl: './static/html/order-center/imp-cart.html',
        controller: 'imp-cart-ctrl'
      }) */
      /** 已迁移 .when('/imp-incomp', {//自动订单 商品不全的订单
        templateUrl: './static/html/order-center/imp-incomp.html',
        controller: 'imp-incomp-control'
      }) */
      /** 已迁移 .when('/imp-cancel', {//自动订单 被取消订单
        templateUrl: './static/html/order-center/imp-cancel.html',
        controller: 'imp-cancel-control'
      }) */
      /** ---- useless ----
      .when('/imp-refund', {//自动订单 已退款订单
        templateUrl: './static/html/order-center/imp-refund.html',
        controller: 'imp-refund-control'
      }) */
      /** 已迁移 .when('/search-all', {//自动订单 待处理订单
        templateUrl: './static/html/order-center/imp-searchall.html',
        controller: 'imp-searchall-ctrl'
      }) */
      /** 已迁移 .when('/order-detail/:id?/:istrackFlag?/:isafter?/:orderType?', {//订单详情
        templateUrl: './static/html/order-center/order-detail.html',
        controller: 'orddetail-ctrl'
      }) */
      //------goods----------
      /** 已迁移 .when('/goods/:type?/:show?', {
        // type-订单类型 type=1--fba订单   默认--直发订单
        // show-购物车是否打开 show=1--展开购物车  默认--不展开购物车
        templateUrl: './static/html/goods/goods.html',
        controller: 'goods-ctrl'
      }) */
      /** 已迁移 .when('/cart', {
        templateUrl: './static/html/goods/view_cart.html',
        controller: 'cart-ctrl'
      }) */
      /** 已迁移 .when('/sourcing/:type?', {//搜品
        templateUrl: './static/html/sourcing/search-goods.html',
        controller: 'seachgoods-ctrl'
      }) */
      /** ---- useless ----
      .when('/subsourcing', {//点击新增搜品的submit按钮 跳转搜品
        templateUrl: './static/html/sourcing/search-goods.html',
        controller: 'seachgoods-ctrl'
      }) */
      /** 已迁移 .when('/direct-orders', {//left-bar对应的自动订单
        templateUrl: './static/html/order-center/imp-process.html',
        controller: 'imp-process-ctrl'
      }) */
      // .when('/dropshipping-orders', {//left-bar对应的代发订单
      //     templateUrl: './static/html/order-center/dropshipping-orders.html',
      //     controller: 'dropshipping-ctrl'
      // })
      /** 已迁移 .when('/dropshipping-orders', {//left-bar对应的代发订单 订单的awaiting payment
        templateUrl: './static/html/order-center/drop-home.html',
        controller: 'drop-home-ctrl'
      }) */
      /** 已迁移 .when('/drop-home-zi/:muordid?/:ziid?', {//订单的awaiting payment 的子订单
        templateUrl: './static/html/order-center/drop-zi/drop-home-zi.html',
        controller: 'drop-homezi-ctrl'
      }) */
      /** 已迁移 .when('/drop-proce', {//left-bar对应的代发订单 订单的processing
        templateUrl: './static/html/order-center/drop-proce.html',
        controller: 'drop-proce-ctrl'
      }) */
      /** 已迁移 .when('/drop-processed', {//left-bar对应的代发订单 订单的processing
        templateUrl: './static/html/order-center/drop-processed.html',
        controller: 'drop-proceed-ctrl'
      }) */
      /** 已迁移 .when('/drop-proce-zi/:muordid?/:ziid?/:stu?/:sku?', {//订单processing的子订单
        templateUrl: './static/html/order-center/drop-zi/drop-proce-zi.html?v=20190717',
        controller: 'drop-procezi-ctrl'
      }) */
      /** 已迁移 .when('/drop-processed-zi/:muordid?/:ziid?/:type?/:sku?', {//订单processing的子订单
        templateUrl: './static/html/order-center/drop-zi/drop-proce-zi.html?v=20190705',
        controller: 'drop-procezi-ctrl'
      }) */
      /** 已迁移 .when('/drop-complet-zi/:muordid?/:ziid?/:type?', {//订单completed的子订单
        templateUrl: './static/html/order-center/drop-zi/drop-proce-zi.html?v=20190705',
        controller: 'drop-procezi-ctrl'
      }) */
      /** 已迁移 .when('/drop-close-zi/:muordid?/:ziid?/:type?', {//订单closed的子订单
        templateUrl: './static/html/order-center/drop-zi/drop-close-zi.html?v=20190705',
        controller: 'drop-closezi-ctrl'
      }) */
      /** ---- useless ----
      .when('/drop-dispat', {//left-bar对应的代发订单 订单的dispatched
        templateUrl: './static/html/order-center/drop-dispat.html',
        controller: 'drop-dispat-ctrl'
      }) */
      /** 已迁移 .when('/drop-complet', {//left-bar对应的代发订单 订单的completed
        templateUrl: './static/html/order-center/drop-comp.html',
        controller: 'drop-comp-ctrl'
      }) */
      /** 已迁移 .when('/drop-close', {//left-bar对应的代发订单 订单的closed
        templateUrl: './static/html/order-center/drop-closed.html',
        controller: 'drop-closed-ctrl'
      }) */
      /** 已迁移 .when('/after-sale/:afterStu?/:jfId?', {//left-bar对应的服务中心
        templateUrl: './static/html/after-sale/after-sale.html',
        controller: 'aftersale-ctrl'
      })
      /** 已迁移 .when('/problem-package/:problemStu?/:packagetype?', {//left-bar对应的服务中心
        templateUrl: './static/html/problem-package/problem-package.html',
        controller: 'problempackage-ctrl'
      }) */
      /** 已迁移 .when('/after-sale-return', {//after return
        templateUrl: './static/html/after-sale/after-sale-return.html',
        controller: 'aftersale-return-ctrl'
      }) */
      /** 已迁移 .when('/after-sale-returndetail/:returnId?', {//left-bar对应的服务中心
        templateUrl: './static/html/after-sale/after-sale-returndetail.html',
        controller: 'aftersale-returndetail-ctrl'
      }) */
      // .when('/after-sale-resend', {//after resend
      //     templateUrl: './static/html/after-sale/after-sale-resend.html',
      //     controller: 'aftersale-resend-ctrl'
      // })
      /** 已迁移 .when('/seachgoods-detail/:id/:sourcetype', {//搜品详情
        templateUrl: './static/html/sourcing/searchgoods-detail.html',
        controller: 'searchdetail-control'
      }) */
      /** 已迁移 .when('/add-sourcing/:spName?/:storeId?', {//新增搜品
        templateUrl: './static/html/sourcing/add-product.html',
        controller: 'addproduct-ctrl'
      }) */
      /** 已迁移 .when('/myCJAssociatedStore/:type?', {//myCJAssociatedStore
        templateUrl: './static/html/demo/myCJAssociatedStore.html',
        controller: 'myCJAssociatedStoreCtrl'
      }) */
      /** ---- useless ----
      .when('/myCJPay', {//myCJPay
        templateUrl: './static/html/demo/myCJPay.html',
        controller: 'seachgoods-ctrl'
      }) */
      /** 已迁移 .when('/payment/:ordn/:ordm/:ordq?/:ordType?/:pid?/:videoId?', {//cj付款页面 参数类型：订单号，订单金额，订单数量，订单类型
        templateUrl: 'static/html/demo/payment.html',
        controller: 'payment-controller'
      }) */
      // .when('/confirm-pay', {//自动订单的确定付款按钮
      //     templateUrl: './static/html/order-center/dropshipping-orders.html',
      //     controller: 'dropshipping-ctrl'
      // })
      /** 已迁移 .when('/purchase-history', {//myCJ-采购历史
        templateUrl: './static/html/myCJ/myCJ-home/myCJ-purchase-history.html',
        controller: 'purchaseHistoryCtrl'
      }) */
      /** 已迁移 .when('/purchase-Taobao/:type?', {//myCJ-采购- 1688/toabao
        templateUrl: './static/html/myCJ/myCJ-home/myCJ-purchase-Taobao.html',
        controller: 'purchaseTaobaoCtrl'
      }) */
      /** 已迁移 .when('/video-history', {//myCJ-视频订单
        templateUrl: './static/html/myCJ/myCJ-home/myCJ-video-history.html',
        controller: 'videoHistoryCtrl'
      }) */
      /** 已迁移 .when('/video-demand', {//myCJ-视频需求
        templateUrl: './static/html/myCJ/myCJ-home/myCJ-video-demand.html',
        controller: 'videoDemendCtrl'
      }) */
      /** 已迁移 .when('/add-video-demand/:spName?/:storeId?', {//add myCJ-视频需求
        templateUrl: './static/html/myCJ/myCJ-home/add-video-demand.html',
        controller: 'addvideoDemendCtrl'
      }) */
      /** 已迁移 .when('/video-demand-detail/:id/:sourcetype', {// myCJ-视频需求 detail
        templateUrl: './static/html/myCJ/myCJ-home/video-demand-detail.html',
        controller: 'videoDemendDetailCtrl'
      }) */
      /** ---- useless ----
      .when('/myCJ-submit-form/:id', {//myCJ-submitform
        templateUrl: './static/html/myCJ/myCJ-home/myCJ-submit-form.html',
        // templateUrl: './static/html/myCJ/myCJ-home/myCJ-submit-form.html',
        controller: 'myCJSubmitFormCtrl'
      }) */
      /** 已迁移 .when('/my-inventory', {//myCJ-我的库存
        templateUrl: './static/html/myCJ/myCJ-home/myCJ-my-inventory.html',
        controller: 'myInventoryCtrl'
      }) */
      /** ---- useless ----
      .when('/my-inventory-record/:vid', {//myCJ-我的库存-记录
        templateUrl: './static/html/myCJ/myCJ-home/myCJ-my-inventory-record.html',
        controller: 'myInventoryRecordCtrl'
      }) */
      /** 已迁移 .when('/package-inventory/:packVid?/:type?', {//myCJ-包装库存
        templateUrl: './static/html/myCJ/package-inventory/package-inventory.html',
        controller: 'packageInventoryCtrl'
      }) */
      /** 已迁移 .when('/related-goods/:id/:shopId?/:shopName?', {//myCJ-包装库存-关联商品
        templateUrl: './static/html/myCJ/package-inventory/related-goods.html',
        controller: 'relatedGoodsCtrl'
      }) */
      /** 已迁移 .when('/use-order/:path/:id/:shopId?', {//myCJ-包装库存-已使用/已订购
        templateUrl: './static/html/myCJ/package-inventory/use-order.html',
        controller: 'useOrderCtrl'
      }) */
      /** 已迁移 .when('/child-order/:type/:id/:packVid/:shopId?', {//myCJ-包装库存-已使用/已订购-子订单
        templateUrl: './static/html/myCJ/package-inventory/child-order.html',
        controller: 'childOrderCtrl'
      }) */
      /** 已迁移 .when('/regular-packaging/:type?', {//myCJ-普通包装
        templateUrl: './static/html/myCJ/custom-packaging/regular-packaging.html',
        controller: 'regularPackagingCtrl'
      }) */
      /** ---- useless ----
      .when('/custom-packaging', {//myCJ-自定义包装
        templateUrl: './static/html/myCJ/custom-packaging/custom-packaging.html',
        controller: 'customPackagingCtrl'
      }) */
      /** 已迁移 .when('/points-mall', {//myCJ-普通包装
        templateUrl: './static/html/myCJ/points-mall/points-mall.html',
        controller: 'pointsMallCtrl'
      }) */
      /** 已迁移 .when('/all-message', {//系统消息的所有消息
        templateUrl: './static/html/system-message/all-message.html',
        controller: 'allmessCtrl'
      }) */
      /** 已迁移 .when('/message-list/:mid', {//系统消息的所有消息
        templateUrl: './static/html/system-message/message-list.html',
        controller: 'messlistCtrl'
      }) */
      /** 已迁移 .when('/404', {//404
        templateUrl: './static/html/notfound/404.html',
        controller: 'notFoundCtrl'
      }) */
      /** 已迁移 .when('/myCJ-FBA', {// FBA D:\svn-project\svn-p2\webapp\static\html\myCJ\myCJ-home\myCJ-FBA.html
        templateUrl: './static/html/myCJ/myCJ-home/myCJ-FBA.html',
        controller: 'FBACtrl'
      }) */
      /** 已迁移 .when('/direct-orders/:idlist?', {//left-bar对应的自动订单
        templateUrl: './static/html/order-center/imp-process.html',
        controller: 'imp-process-ctrl'
      }) */
      /** ---- useless ----
      .when('/ShopifyAuthorize', {//shopify 店铺授权 D:\svn-project\svn-p2\webapp\static\html\myCJ\authorize\shopifyAuthorize.html
        templateUrl: './static/html/myCJ/authorize/shopifyAuthorize.html',
        controller: 'authorizeAppCtrl'
      }) */
      //.when('/supplier-order', {//供应商订单  D:\svn-project\svn-p2\webapp\static\html\order-center\supplier-order.html
      //    templateUrl: './static/html/order-center/supplier-order.html',
      //    controller: 'supplierOrderCtrl'
      //})
      //.when('/supplier-order/:type?', {//供应商订单  D:\svn-project\svn-p2\webapp\static\html\order-center\supplier-order.html
      //    templateUrl: './static/html/order-center/supplier-order.html',
      //    controller: 'supplierOrderCtrl'
      //})
      //.when('/supplier-Audit/:type?', {//供应商订单  D:\svn-project\svn-p2\webapp\static\html\order-center\supplier-order.html
      //    templateUrl: './static/html/order-center/supplier-podDetail.html',
      //    controller: 'supplierAuditCtrl'
      //})
      /** 已迁移 .when('/AuthorizeOrder', {// 授权后的订单  static\html\order-center\order-authorization.html
        templateUrl: './static/html/order-center/order-authorization.html',
        controller: 'AuthorizeOrderCtrl'
      }) */
      /** ---- useless ----
      .when('/todoList', {// 待办事项 static\html\demo\todolist.html
        templateUrl: './static/html/demo/todolist.html',
        controller: 'todoListCtrl'
      }) */
      /** 已迁移 .when('/todoList/:type?', {// 待办事项 static\html\demo\todolist.html
        templateUrl: './static/html/demo/todolist.html',
        controller: 'todoListCtrl'
      }) */
      /** 已迁移 .when('/order-pay', {// 订单支付抵扣
        templateUrl: './static/html/order-center/order-pay.html',
        controller: 'orderPayCtrl'
      }) */
      /** 已迁移 .when('/ticketList', {// Ticket页面
        templateUrl: './static/html/ticket-list/ticket-list.html',
        controller: 'ticketListCtrl'
      }) */
      /** 已迁移 .when('/addTicket', {// Ticket页面
        templateUrl: './static/html/add-ticket/add-ticket.html',
        controller: 'addTicketCtrl'
      }) */
      .otherwise({
        /* 都不匹配，定向到404 */
        redirectTo: '/404'
      });
  }]).run(['$rootScope', '$location', function ($rootScope, $location) {
    /* 监听路由的状态变化 */
    $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    });
    $rootScope.$on('$routeChangeSuccess', function (evt, current, previous) {
      //console.log('route have already changed ：' + $location.path());
      $rootScope.routePath = $location.path();
    });
  }]);
  app.controller('common-header', ['$rootScope', '$scope', '$window', '$location', '$interval', 'dsp', function ($rootScope, $scope, $window, $location, $interval, dsp) {
    $scope.ElitesUrl = dsp.getElitesUrl();
    $scope.logo = 'static/image/public-img/logo_app.png';
    $scope.websiteName = 'My CJ';
    document.title = 'My CJ';
    if (!localStorage.getItem('loginfromerp')) {
      dsp.addChatWindow();
      dsp.addGuidWindow();
    }
    var b = new Base64();
    // $scope.admin = localStorage.getItem('firstName') == null ? '' : b.decode(localStorage.getItem('firstName'));
    var firstName = localStorage.getItem('firstName') == undefined ? "" : b.decode(localStorage.getItem('firstName'));
    var lastName = localStorage.getItem('lastName') == undefined ? "" : b.decode(localStorage.getItem('lastName'));
    $scope.admin = firstName + ' ' + lastName;
    // $('.content').css('min-height',($(window).height() - 171 ) + 'px');
    $scope.logout = function () {
      console.log(555)
      var base64 = new Base64();
      var token = base64.decode(localStorage.getItem('token') == undefined ? "" : localStorage.getItem('token'));
      dsp.postFun('app/platform/quitLogin', { "token": token }, function (n) {
        // localStorage.clear();
        localStorage.removeItem('token');
        localStorage.removeItem('noEncodeToken');
        localStorage.removeItem('emailVerifyStatus');
        localStorage.removeItem('utmSource');
        dsp.delCookie('cjLoginName');
        dsp.delCookie('cjLoginToken');
        dsp.delAwcCookie('awc');
        location.href = "home.html";
        //window.location.assign("http://localhost:6635/svn/webapp/login.html")
      })
    };

    $scope.newUser = function () {
      var isFirstLogin = localStorage.getItem('isFirstLogin');
      var isEmpower = localStorage.getItem('isEmpower');
      if (isFirstLogin == '0') {
      } else if (isFirstLogin == '1' && isEmpower == '0') {
        //已登录未授权 第一步
        location.href = 'home.html';
        localStorage.setItem('isFirstLogin', '0');
      } else if (isFirstLogin == '1' && isEmpower == '2') {
        //已授权 第二步
        var path = $location.path();
        if (path == '/myCJAssociatedStore') {
          console.log('就在当前页');
          localStorage.setItem('closeFlag', '');
          localStorage.setItem('isEmpower', '1');
          var li = $('.header-nav>ul>li:nth-child(3)');
          var left = getElementLeft(li[0]) - 18;
          var top = getElementTop(li[0]) - 8;
          console.log(left, top);
          $('.online-wrap3').css({
            "top": top + 'px',
            "left": left + 'px'
          });
          $('.zzc3').show();
        } else {
          localStorage.setItem('closeFlag', '');
          location.href = 'myCJ.html#/myCJAssociatedStore';
          localStorage.setItem('isEmpower', '1');
        }

      }
    };

    function getElementLeft(element) {
      var actualLeft = element.offsetLeft;
      var current = element.offsetParent;

      while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }

      return actualLeft;
    }

    function getElementTop(element) {
      var actualTop = element.offsetTop;
      var current = element.offsetParent;

      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }

      return actualTop;
    }

    // 获取下架商品数
    (function () {
      var base64 = new Base64();
      var userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
      var d = {
        pageSize: 0,
        pageNum: 1,
        shopId: $scope.selectshopinfo ? $scope.selectshopinfo.ID : '',
        userId: userId,
        serachName: $scope.consearchinfo || ''
      }
      dsp.postFun('app/connection/conList', { "data": JSON.stringify(d) }, function (res) {
        // {message: "成功", result: "{"total":149,"outCount":2,"conList":[]}", statusCode: "200"}
        try {
          $rootScope.soldOutCount = JSON.parse(res.data['result'])['outCount']; // 下架商品数量
          console.log('下架商品数 ->', $rootScope.soldOutCount)
        } catch (e) {
          console.warn('解析下架商品数出错 ->', e);
        }
      });
    }());

    var $navLis = $('.header-nav li');
    var $nav = $('.header-nav');
    $navLis.click(function () {
      $navLis.removeClass('active');
      $(this).addClass('active');
    });
    //弹出框
    $('.hi-user').on('mouseenter', function () {
      $('.header-tip').stop().animate({
        height: 'show'
      })
    })
    $('.hi-user').mouseleave(function () {
      $('.header-tip').stop().animate({
        height: 'hide'
      })
    })
    // 下拉菜单

    $('.header-help').on('mouseenter', function () {
      $('.hnj-xialamenu').stop().animate({
        height: 'show'
      })
    })
    $('.hnj-xialamenu').on('mouseleave', function () {
      $('.hnj-xialamenu').stop().animate({
        height: 'hide'
      })
    })
    $('.header-help').mouseleave(function () {
      $('.hnj-xialamenu').stop().animate({
        height: 'hide'
      })
    })

    // 点击Ticket划出效果
    $scope.showSupportList = function () {
      cjhome.showDropList($('.hnj-xialamenu'));
    }
    $scope.hideSupportList = function () {
      cjhome.hideDropList($('.hnj-xialamenu'));
    }

    // Support Center 划出Ticket
    // $scope.ticket = function () {
    //   console.log('1111');
    //   $('.hnj-SupportCenterWrap-wrap').show();
    //   $('.hnj-SupportCenterWrap-wrap').stop().animate({
    //     left: '7%',
    //     marginLeft: 0
    //   }, 100)
    //   dsp.postFun('pojo/issue/cjIssueHint', {}, function (data) {
    //     console.log(data.data);
    //     var result = data.data.result;
    //     result = JSON.parse(result);
    //     var hintStatus = result.hintStatus;
    //     if (hintStatus == 0) {
    //       $('.ticketXS').show();
    //       // console.log($('.promptImg').parent());
    //       var top = getElementTop($('.hnj-SupportCenterWrap')[0]);
    //       var left = $('.hnj-SupportCenterWrap-wrap').position().left;
    //       console.log(top, left);
    //       $('.ticketOL').css({
    //         top: (top + 27) + 'px',
    //         left: '7%'
    //       });
    //       $('.notice-1').show();
    //     } else {
    //       $('.ticketXS').hide();
    //       $('.notice-1').hide();
    //     }

    //   }, function () {
    //   });
    // }
    $scope.ticket = () => {
      location.href = "/myCJ.html#/ticketList"
    }
    $scope.iKnown = function () {
      dsp.postFun('pojo/issue/updateCjIssueHint', {}, function (data) {
        console.log(data.data);
        if (data.data.statusCode == '200') {
          $('.ticketXS').hide();
          $('.notice-1').hide();
        }
      }, function () {
      });
    }

    // 点击聊天按钮
    $scope.wllChat = function () {
      var newTab = window.open('about:blank', '', 'height=700,width=470,top=100,left=600,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
      dsp.postFun('app/message/getChatUrl', '{"a": "1"}', function (data) {
        console.log(data);
        if (data.data.code == '200') {
          //newTab.location.href = "http://localhost:3000/?user=anan&token=123";
          //newTab.location.href = data.data.href.replace("47.254.18.170:8080","localhost:8082");
          newTab.location.href = data.data.href;
        } else {
          location.href = 'login.html';
        }
      });
    }
    // setRightMinHeight();
    $scope.loca = $location;
    $scope.$watch('loca.url()', function (now, old) {

      // -----------------------------------------------------------------
      /* if (dsp.isPhone()) {
        window.location.href="phone/index.html#/mycj";
        return;
      } */
      // -----------------------------------------------------------------
      if (!dsp.isInLoginState()) {
        layer.msg('Your login expired. Please re-login.', { time: 2000 }, function () {
          location.href = 'login.html?target=' + b.encode('myCJ.html#' + now);
        });
        return;
      }
      // console.log(now, old);
      var $navLis = $('.header-nav li');
      $navLis.removeClass('active');
      if (/^(\/products-connection)/.test(now)) {
        $nav.find("#tab_product").addClass('active');
      }
      // if (/^(\/payment)/.test(now)) {
      //     $nav.find('#tab_order').addClass('active');
      // }
      if (/^(\/drop-home-zi)/.test(now)) {
        $nav.find('#tab_order').addClass('active');
      }
      if (/^(\/drop-proce-zi)/.test(now)) {
        $nav.find('#tab_order').addClass('active');
      }
      if (/^(\/drop-processed-zi)/.test(now)) {
        $nav.find('#tab_order').addClass('active');
      }
      if (/^(\/drop-complet-zi)/.test(now)) {
        $nav.find('#tab_order').addClass('active');
      }
      if (/^(\/drop-close-zi)/.test(now)) {
        $nav.find('#tab_order').addClass('active');
      }
      if (/^(\/order-detail)/.test(now)) {
        $nav.find('#tab_order').addClass('active');
      }
      if (/^(\/all-import)/.test(now)) {
        $nav.find('#tab_order').addClass('active');
      }
      if (/^(\/purchase-order)/.test(now)) {
        $nav.find('#tab_mycj').addClass('active');
      }
      if (/^(\/after-sale)/.test(now)) {
        $nav.find('#tab_order').addClass('active');
      }
      if (/^(\/pod)/.test(now)) {
        $nav.find('#tab_pod').addClass('active');
      }
      if (/^(\/goods)/.test(now)) {
        $nav.find('#tab_mycj').addClass('active');
      }
      switch (now) {
        case '/myCJAssociatedStore':
          console.log('进去的地方')
          $nav.find('#tab_mycj').addClass('active');
          break;
        case '/sourcing':
          $nav.find('#tab_mycj').addClass('active');
          break;
        case '/myCJ-purchase':
          $nav.find('#tab_mycj').addClass('active');
          break;
        case '/purchase-history':
          $nav.find('#tab_mycj').addClass('active');
          break;
        case '/add-purchase':
          $nav.find('#tab_mycj').addClass('active');
          break;
        case '/myCJ-favorites':
          $nav.find('#tab_mycj').addClass('active');
          break;
        case '/cart':
          $nav.find('#tab_mycj').addClass('active');
          break;
        case '/authorize':
          console.log($nav.find('#tab_authorize'))
          $nav.find('#tab_authorize').addClass('active');
          break;
        case '/ShopifyAuthorize':
          $nav.find('#tab_authorize').addClass('active');
          break;
        case '/apikey':
          $nav.find('#tab_authorize').addClass('active');
          break;
        case '/products-connection':
          $nav.find("#tab_product").addClass('active');
          break;
      }
      switch (now) {
        case '/direct-orders':
          $nav.find('#tab_order').addClass('active');
          break;
        case '/imp-cart':
          $nav.find('#tab_order').addClass('active');
          break;
        case '/imp-incomp':
          $nav.find('#tab_order').addClass('active');
          break;
        case '/imp-cancel':
          $nav.find('#tab_order').addClass('active');
          break;
        case '/imp-refund':
          $nav.find('#tab_order').addClass('active');
          break;
        case '/search-all':
          $nav.find('#tab_order').addClass('active');
          break;
        case '/dropshipping-orders':
          $nav.find('#tab_order').addClass('active');
          break;
        // case '/order-detail':
        //     $nav.find('#tab_order').addClass('active');
        //     break;
        case '/drop-proce':
          $nav.find('#tab_order').addClass('active');
          break;
        case '/drop-processed':
          $nav.find('#tab_order').addClass('active');
          break;
        case '/drop-dispat':
          $nav.find('#tab_order').addClass('active');
          break;
        case '/drop-complet':
          $nav.find('#tab_order').addClass('active');
          break;
        case '/drop-close':
          $nav.find('#tab_order').addClass('active');
          break;
        case '/after-sale':
          $nav.find('#tab_order').addClass('active');
          break;
        case '/supplier-order':
          $nav.find('#tab_order').addClass('active');
          break;
        case '/supplier-Audit':
          $nav.find('#tab_order').addClass('active');
          break;

      }
    });

    //给系统消息添加显示隐藏
    $('.message-img-flag').mouseenter(function () {
      // alert(3121)
      $('.show-mes-detail').show();
      $('.mes-img-logo').attr('src', 'static/image/public-img/belldarkgrey.png');
    })
    $('.message-img-flag').mouseleave(function () {
      $('.show-mes-detail').hide();
      $('.mes-img-logo').attr('src', 'static/image/public-img/bellgrey.png');
    })
    $('.mes-d-ul a').click(function () {
      location.href = '#/message-list';
    })

    function err(err) {
      console.log(err);
    }

    function getMessage() {
      var getTopMesData = {
        pageSize: 5,
        start: 1,
        isread: 0,
        type: 1
      }
      dsp.postFun('app/notification/getCjnotification', JSON.stringify(getTopMesData), function (data) {
        // console.log(data);
        var data = data.data;
        var result = JSON.parse(data.result);
        //console.log(result,'通知');
        $rootScope.messageNum = result.count * 1;
        // $scope.messageNum = result.count * 1;
        $rootScope.messagePre = result.list;
        for (let i = 0; i < $rootScope.messagePre.length; i++) {
          let ind = $rootScope.messagePre[i].notificationType.indexOf('html:');
          if (ind > 0) {
            $rootScope.messagePre[i].url = $rootScope.messagePre[i].notificationType.slice(ind + 5);
            $rootScope.messagePre[i].notificationType = $rootScope.messagePre[i].notificationType.slice(0, ind)
          }
        }
      }, err);
    }

    getMessage();
    //$interval(function () {
    //    var myminute=new Date().getMinutes();
    //    // console.log(myminute);
    //    if (myminute % 5 == 0) {
    //        console.log('y');
    //        getMessage();
    //    }
    //},60000)

    $scope.toAllMessage = function () {
      if ($location.path() == '/all-message/1') {
        $window.location.reload();
      } else {
        $location.path('/all-message/1');
      }
    }
  }]);
  app.controller('allmessCtrl', ['$rootScope', '$scope', '$timeout', '$location', 'dsp', function ($rootScope, $scope, $timeout, $location, dsp) {
    // alert(123)
    // $rootScope.messageNum = 1
    // console.log('829',$rootScope.messageNum);
    $('.cj-am-wrap').css('min-height', ($(window).height() - 171) + 'px');
    //添加消息详情链接
    $('.cj-ul-p2').click(function () {
      location.href = '#/message-list';
    })
    $scope.pageSize = 10;
    $scope.pageNum = 1;
    // $scope.messageList = [];
    layer.load(2);
    // getMessageList();

    $scope.toDetailPage = function (item) {
      if (item.url) {
        dsp.postFun('cj/locProduct/updateIsread', JSON.stringify({ id: item.id }), function (data) {
          if (data.data.statusCode == '200') {
            getMessage();
          }
        })
        window.open(item.url + '&href');
      } else {
        $location.path('/message-list/' + item.id);
      }
    }

    $scope.deleteMes = function (item, index1, $event) {
      $event.stopPropagation();
      var deleteDate = {};
      deleteDate.id = item.id;
      dsp.postFun('app/notification/cjdelete', JSON.stringify(deleteDate), function (data) {
        var data = data.data;
        console.log(data);
        if (data.statusCode != 200) {
          layer.msg('Delete failed');
          return false;
        }
        layer.msg('Delete successfully', { time: 1000 });
        $timeout(function () {
          $scope.messageList.splice(index1, 1);
          $('.cj-list-ul li').eq(index1).remove();
        }, 1000);
        delgetMessage(dsp, $rootScope);
      }, err);
    }

    function getMessage() {
      var getTopMesData = {
        pageSize: $scope.pageSize,
        start: $scope.pageNum,
        isread: ''
      }
      dsp.postFun('app/notification/getCjnotification', JSON.stringify(getTopMesData), function (data) {
        layer.closeAll('loading');
        console.log(data);
        var data = data.data;
        var result = JSON.parse(data.result);
        console.log(result);
        if (result.count == 0) {
          $scope.messageList = [];
          return;
        }
        $scope.messageList = result.list;
        for (let i = 0; i < $scope.messageList.length; i++) {
          let ind = $scope.messageList[i].notificationType.indexOf('html:');
          if (ind > 0) {
            $scope.messageList[i].url = $scope.messageList[i].notificationType.slice(ind + 5);
            $scope.messageList[i].notificationType = $scope.messageList[i].notificationType.slice(0, ind)
          }
        }
        $("#ld-pages").jqPaginator({
          // totalPages: 20,//分页的总页数
          totalCounts: result.count,
          pageSize: $scope.pageSize,
          visiblePages: 5,//显示多少页
          currentPage: $scope.pageNum,//当钱第几页
          activeClass: 'active',
          prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
          next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
          page: '<a href="javascript:void(0);">{{page}}<\/a>',
          first: '<a class="prev" href="javascript:void(0);">&lt&lt;<\/a>',
          last: '<a class="prev" href="javascript:void(0);">&gt&gt;<\/a>',
          onPageChange: function (n, type) {
            if (type == 'init') return;
            $scope.pageNum = n;
            var getMesListData = {
              pageSize: $scope.pageSize,
              isread: '',
              start: $scope.pageNum
            }
            // dsp.postFun('app/notification/getallCjnotification',JSON.stringify(getMesListData), function (data){
            //     layer.closeAll('loading');
            //     var data = data.data;
            //     var result = JSON.parse(data.result);
            //     console.log(result);
            //     $scope.messageList = result.list;
            // },err)
            dsp.postFun('app/notification/getCjnotification', JSON.stringify(getMesListData), function (data) {
              layer.closeAll('loading');
              var data = data.data;
              var result = JSON.parse(data.result);
              console.log(result);
              $scope.messageList = result.list;
              console.log(data);
              var data = data.data;
              var result = JSON.parse(data.result);
              console.log(result);
              if (result.count == 0) {
                $scope.messageList = [];
                return;
              }
              $scope.messageList = result.list;
              for (let i = 0; i < $scope.messageList.length; i++) {
                let ind = $scope.messageList[i].notificationType.indexOf('html:');
                if (ind > 0) {
                  $scope.messageList[i].url = $scope.messageList[i].notificationType.slice(ind + 5);
                  $scope.messageList[i].notificationType = $scope.messageList[i].notificationType.slice(0, ind)
                }
              }
            }, err)
          }
        });
      }, err);
    }

    getMessage();

    // function getMessageList () {
    //     var getMesListData = {
    //         pageSize: $scope.pageSize,
    //         pageNum: $scope.pageNum
    //     }
    //     dsp.postFun('app/notification/getallCjnotification',JSON.stringify(getMesListData), function (data) {

    //     },err);
    // }
    function err(err) {
      layer.closeAll('loading');
      console.log(err);
    }
  }]);
  app.controller('messlistCtrl', ['$rootScope', '$scope', 'dsp', '$routeParams', '$timeout', '$location', function ($rootScope, $scope, dsp, $routeParams, $timeout, $location) {
    $('.cj-am-wrap').css('min-height', ($(window).height() - 171) + 'px');
    $('.cj-am-cen').css('min-height', ($(window).height() - 171 - 49) + 'px');

    function err(err) {
      layer.closeAll('loading');
      console.log(err);
    }

    console.log($routeParams.mid);
    var getDetailData = {};
    getDetailData.id = $routeParams.mid;
    layer.load(2);
    dsp.postFun('app/notification/modify', JSON.stringify(getDetailData), function (data) {
      layer.closeAll('loading');
      console.log(data);
      var data = data.data;
      var result = JSON.parse(data.result)['notification'];
      console.log(result);
      $scope.mestitle = result.notificationType;
      $scope.mestime = result.sendDate.time;
      $scope.mesdetail = result.html;
      $scope.mesInfo = result.info;
      getMessage();
    }, err);

    function getMessage() {
      var getTopMesData = {
        pageSize: 5,
        start: 1,
        isread: 0,
        type: 1
      }
      dsp.postFun('app/notification/getCjnotification', JSON.stringify(getTopMesData), function (data) {
        console.log(data);
        var data = data.data;
        var result = JSON.parse(data.result);
        console.log(result);
        $rootScope.messageNum = result.count * 1;
        $rootScope.messagePre = result.list;
      }, err);
    }

    $scope.deleteMes = function () {
      var deleteDate = {};
      deleteDate.id = $routeParams.mid;
      layer.load(2);
      dsp.postFun('app/notification/cjdelete', JSON.stringify(deleteDate), function (data) {
        layer.closeAll('loading');
        var data = data.data;
        console.log(data);
        if (data.statusCode != 200) {
          layer.msg('Delete failed');
          return false;
        }
        layer.msg('Delete successfully', { time: 1000 });
        $timeout(function () {
          $location.path('/all-message/1');
        }, 1000);
      }, err);
    }
  }]);
  function delgetMessage(dsp, $rootScope) {
    var getTopMesData = {
      pageSize: 5,
      start: 1,
      isread: 0,
      type: 1
    }
    dsp.postFun('app/notification/getCjnotification', JSON.stringify(getTopMesData), function (data) {
      var data = data.data;
      var result = JSON.parse(data.result);
      $rootScope.messageNum = result.count * 1;
      $rootScope.messagePre = result.list;
      for (let i = 0; i < $rootScope.messagePre.length; i++) {
        let ind = $rootScope.messagePre[i].notificationType.indexOf('html:');
        if (ind > 0) {
          $rootScope.messagePre[i].url = $rootScope.messagePre[i].notificationType.slice(ind + 5);
          $rootScope.messagePre[i].notificationType = $rootScope.messagePre[i].notificationType.slice(0, ind)
        }
      }
    });
  }
})(angular, Base64)
