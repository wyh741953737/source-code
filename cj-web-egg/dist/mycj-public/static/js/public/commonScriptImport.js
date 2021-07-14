/**
 * 所有页面共用引入的script
 */

// 微软bing搜索引擎广告
(function(w, d, t, r, u) {
  var f, n, i;
  (w[u] = w[u] || []),
    (f = function() {
      var o = { ti: "17533964" };
      (o.q = w[u]), (w[u] = new UET(o)), w[u].push("pageLoad");
    }),
    (n = d.createElement(t)),
    (n.src = r),
    (n.async = 1),
    (n.onload = n.onreadystatechange = function() {
      var s = this.readyState;
      (s && s !== "loaded" && s !== "complete") ||
        (f(), (n.onload = n.onreadystatechange = null));
    }),
    (i = d.getElementsByTagName(t)[0]),
    i.parentNode.insertBefore(n, i);
})(window, document, "script", "//bat.bing.com/bat.js", "uetq");

// 给图片统一加上报错时候使用默认路径，这个是兜底的图片错误处理，不代表可以不处理。
document.addEventListener("error", function(e){
    var elem = e.target;
    if(elem.tagName.toLowerCase() === "img"){
        elem.src = "/static/image/public-img/default.jpg";
    }
}, true);
