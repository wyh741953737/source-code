(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  new Vue({
    // 如果底部添加了related-links，必须引入这个js,用来Subscribe to our latest niches按钮逻辑，登录不出现
    el: '#vue-qr-code',
    data: {
      logined: CJ_isLogin
    },
    methods: {
      subscribe: function subscribe() {
        window.postMessage({
          flag: "openSubscribe"
        }, "*");
      }
    }
  });

})));

//# sourceMappingURL=maps/qr-code.js.map
