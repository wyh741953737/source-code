// 动态路由 需要去掉动态参数 如：https://app.cjdropshipping.cn/blog/post/1369563915653971969
var dynamicPath = [
  '/blog/list',
  '/blog/post',
  '/productReport/list',
  '/productReport/detail',
  '/article-details'
]

function pressPathname () {
  var pathName = dynamicPath.find(function(item){
    return location.pathname.indexOf(item) !== -1 ? true :false;  
  })
  return pathName === undefined ? location.pathname : pathName;
}

// skyWalking 监控初始化
window.ClientMonitor.setPerformance({
  collector: (location.host === 'cjdropshipping.com' || location.host === 'app.cjdropshipping.com') ? 'https://skyoap.cjdropshipping.com' : location.protocol + '//' + location.host,
  // collector: 'https://skyoap.cjdropshipping.com',
  service: location.host,
  serviceVersion: '1.0.0',
  pagePath: pressPathname(),
  useFmp: true,
  enableSPA: location.pathname === '/myCJ.html' ? true : false
});