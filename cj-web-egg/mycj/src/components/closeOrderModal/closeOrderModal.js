import template from './closeOrderModal.html';
import styles from './closeOrderModal.less';

/**
 * 关闭所有老系统订单页面弹窗组件
 * @param pageUrl 自定义跳转路径
 */

export function closeOrderModalFactory(module) {
  module.component('closeOrderModal', {
    template,
    controller: ['$rootScope', '$scope', '$location', 'dsp', '$element', 'utils', '$sce', function($rootScope, $scope, $location, dsp, $element, utils, $sce) {
      $element.addClass([styles.closeModalComponent, 'close-order-modal-box']);
      this.$onChanges = function() {
        closeOrderModalCtrl.call(this, $scope, dsp, utils, $sce, $rootScope);
      };
    }],
    transclude: true,
    bindings: {
      pageUrl: '<',
    }
  });
}

function closeOrderModalCtrl($scope, dsp, utils, $sce, $rootScope) {
  
  const { vip } = $rootScope.userInfo;
  $scope.isVip = +vip || 0; // 获取用户是否是vip客户
  $scope.pageUrl = `https://cjdropshipping.com${this.pageUrl || '/newmycj/dropshipping/untreatedOrder'}` 

  // 点击跳转新订单
  $scope.goToNewPage = () => {
    console.log($scope.pageUrl)
    window.open($scope.pageUrl)
  }
}