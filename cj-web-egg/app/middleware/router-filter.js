/**
 * 路由拦截
 */

function isPage404(_url) {
  const url = decodeURI(_url) || '';
  // angulat页面生成的未竟图片请求
  const isAngularImg = /{{/.test(url);
  const isStatic = /\.jpg|\.png|\.jpeg|\.gif|\.mp3|\.mp4|\.css|\.js|\.xml|\.asp|\.dat|\.txt|\.svg|\.aLink|\.href/.test(url);
  return !isAngularImg && !isStatic
}

module.exports = () => {
  return async function routerFilter(ctx, next) {
    console.log("status---", decodeURI(ctx.originalUrl))
    await next();
    console.log("status+2020", ctx.status)

    // 404处理
    if (ctx.status === 404 && isPage404(ctx.originalUrl)){
      ctx.getLogger('notFoundLogger').error(`404`)
      ctx.redirect('/404.html');
    }
  }
};

