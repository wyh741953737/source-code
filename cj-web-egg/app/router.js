
module.exports = app => {
  const { router, controller, config } = app;
  const isDev = config.env === 'local';

  if (isDev) {
    // 重定向到首页
    // router.redirect('/', '/home.html', 302);
    router.get('/', controller.home.index);
  } else {
    router.get('/', controller.home.index);
  }

  // 测试服务是否启动成功
  router.get('/isok', controller.home.hello);
  // 首页
  router.get('/home.html', controller.home.index);
  router.get('/index.html', controller.home.index);

  router.get('/indext.html', controller.home.indexTest);

  // blog-列表
  router.get('/blog/list/:pageNum?/:pageSize?', controller.blog.list);

  // blog-post
  router.get('/blog/post/:id', controller.blog.detail);
  
  // contact
  router.get('/contactus', controller.footerPages.contact);
  // our-offer
  router.get('/ouroffers', controller.footerPages.ourOffers);
  // about-us
  router.get('/aboutus', controller.footerPages.about);
  // about-us
  router.get('/overview', controller.footerPages.overview);
  // Product Sourcing Requests
  router.get('/sourcing', controller.footerPages.sourcing);

  // halloween
  router.get('/halloween/activity-page', controller.halloween.index)

  // printonDemand-主页
  router.get('/printonDemand/home', controller.printonDemand.home)
  // printonDemand-帮助页
  router.get('/printonDemand/help', controller.printonDemand.help)

  // product-report list
  router.get('/productReport/list/:pageNum?/:pageSize?', controller.productReport.list);
  // product-report detail
  router.get('/productReport/detail/:id', controller.productReport.detail);
  // 全球仓
  router.get('/global-warehouses', controller.globalWarehouse.index);

  // 404
  // router.get('*', app.middleware.routerFilter(), controller.notFound.index);

  // api 一些记录日志用的内部api
  router.get('/api/addRequestErrLog', controller.api.addRequestErrLog);
  // api 手动调用定时任务
  router.get('/api/schedule', controller.api.manualSchedule)

  // partnership模块
  router.get('/partnership/home', controller.partnership.home);
  // 列表详情页
  router.get('/list-detail', controller.listDetailSeo.list)
  // 服务费
  router.get('/service-fee', controller.serviceFee.index);

  // 用户协议
  router.get('/user-agreement/:type?', controller.userAgreement.index);

  // 隐私协议
  router.get('/privacyPolicy', controller.privacyPolicy.index);
  
  router.get('/dispute-policy.html', controller.disputePolicy.index)
  // tutorial
  router.get('/help-center', controller.tutorial.home)
  // 文章详情
  router.get('/article-details/:id?', controller.tutorial.articleDetails)
  // 推荐活动view more页
  router.get('/recommendations', controller.recommendations.home)
};