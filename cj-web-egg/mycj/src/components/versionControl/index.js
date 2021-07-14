import template from './index.html'
import styles from './index.less'
const pathnameEnum = {
  '#/direct-orders': '/newmycj/dropshipping/untreatedOrder', //完整订单
  '#/search-all': '/newmycj/dropshipping/untreatedOrder', //完整订单
  '#/AuthorizeOrder': '/newmycj/dropshipping/untreatedOrder', //完整订单
  '#/imp-incomp': '/newmycj/dropshipping/untreatedOrder/Incomplete', //不完整订单
  '#/imp-cancel': '/newmycj/dropshipping/untreatedOrder/recycle', //回收站
  '#/imp-cart': '/newmycj/dropshipping/shoppingCart', //购物车
  '#/dropshipping-orders': '/newmycj/dropshipping/orderManage', //订单管理
  '#/drop-proce': '/newmycj/dropshipping/orderManage', //订单管理
  '#/drop-processed': '/newmycj/dropshipping/orderManage', //订单管理
  '#/drop-complet': '/newmycj/dropshipping/orderManage', //订单管理
  '#/drop-close': '/newmycj/dropshipping/orderManage', //订单管理
};
function versionCtrl($scope, dsp, utils, $sce) {
  $scope.vip = localStorage.getItem('vip') || "";
  const orderversion = localStorage.getItem('orderversion') ?? '2';
  $scope.orderversion = orderversion;
  /** 判读电脑系统 */
  function getPcSystem() {
    return /macintosh|mac os x/i.test(navigator.userAgent);
  }
  getPcSystem();
  /** 点击跳转页面 */
  $scope.jumpWeb = () => {
    // if (orderversion === '2') {
    //   dsp.setCookie('orderversion','1','',__root__domain);
    //   localStorage.setItem('orderversion', '1');
    //   return;
    // }
    const {origin, hash } = window.location;
    const href = pathnameEnum[hash];
    localStorage.setItem('orderversion', '2');
    dsp.setCookie('orderversion','2','',__root__domain);
    location.href = `${origin}${href}`;
  }
}
export const versionControlFactory = function (module) {
  module.component('versionControl', {
    template,
    controller: ['$rootScope', '$scope', '$location', 'dsp', '$element', 'utils', '$sce', function ($rootScope, $scope, $location, dsp, $element, utils, $sce) {
      $element.addClass([styles.new_old_version, 'version-component-box']);
      this.$onChanges = function () {
        versionCtrl.call(this, $scope, dsp, utils, $sce);
      };
    }],
    transclude: true,
    bindings: {
      content: '<',
      placement: '=',
      width: '<',
    }
  });
}

