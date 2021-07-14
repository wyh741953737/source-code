/**
 * 商品卡片处理
 */

// 点击收藏
window.clickCollect = function (el, productId) {
  if (CJ_isLogin) {
    CJ_.$axios.post('cj/homePage/shouCangShnagPin', { productId })
      .then(([err, data]) => {
        err || $(el).toggleClass('active');
      });
  } else {
    location.href = CJ_.authLoginUrl('home.html');
  }
};