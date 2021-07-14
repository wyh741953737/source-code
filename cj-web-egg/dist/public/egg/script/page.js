(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  /**
   * 分页组件 js
   */

  /**
   * 获取路由
   */
  function getRoute() {
    var currentPath = location.pathname;
    var pathArr = currentPath.split('/');
    var len = pathArr.length;
    var route = '';

    for (var i = 0; i < len; i++) {
      var item = pathArr[i];

      if (isNaN(item)) {
        route += '/' + item;
      }
    }

    var pageNum = pathArr[len - 2] || 1;
    var pageSize = pathArr[len - 1] || 10;
    var showSize = true;

    if (location.pathname.indexOf('/productReport/list') !== -1) {
      pageSize = 8;
      showSize = false;
    }

    return {
      route: route,
      pageNum: isNaN(+pageNum) ? 1 : pageNum,
      pageSize: isNaN(+pageSize) ? 10 : pageSize,
      showSize: showSize
    };
  }

  var _getRoute = getRoute(),
      route = _getRoute.route,
      pageNum = _getRoute.pageNum,
      pageSize = _getRoute.pageSize,
      showSize = _getRoute.showSize;

  new Vue({
    el: '#vue-page',
    data: {
      skipPage: pageNum + '',
      skipPageSize: pageSize + '',
      showPageSize: showSize
    },
    methods: {
      handleInputPage: function handleInputPage() {
        var goBtn = document.getElementById('goBtn');

        if (Number(this.skipPage) > Number(egg_totalPageNumber)) {
          goBtn.style.cursor = 'no-drop';
          goBtn.style.pointerEvents = 'none';
          goBtn.style.color = '#e5e1da';
        } else {
          goBtn.style.cursor = 'pointer';
          goBtn.style.pointerEvents = 'initial';
          goBtn.style.color = '#f99429';
        }
      },
      // 跳页
      changeFun: function changeFun() {
        var page = this.skipPage;
        if (!page) return;
        location.href = "".concat(route, "/").concat(page, "/").concat(pageSize).concat(location.search || '');
      },
      // 分页size调整
      changePageSize: function changePageSize() {
        var size = this.skipPageSize;
        location.href = "".concat(route, "/1/").concat(size).concat(location.search || '');
      }
    }
  });

})));

//# sourceMappingURL=maps/page.js.map
