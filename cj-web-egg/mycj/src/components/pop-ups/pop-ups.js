import template from './pop-ups.html';
import styles from './pop-ups.less';

export function popUpsFactory(module) {
  module.component('popUps', {
    template,
    controller: ['$rootScope', '$scope', '$location', 'dsp', '$element', 'utils', function($rootScope, $scope, $location, dsp, $element, utils) {
      $element.addClass([styles.popUpsComponent, 'pop_ups']);
      this.$onChanges = function() {
        popUpsCtrl.call(this, $rootScope, $scope, dsp, utils);
      };
    }],
    transclude: true,
    bindings: {
      content: '=',
      title: '=',
      level: '=',
      confirm: '='
    }
  });
}

function popUpsCtrl($rootScope, $scope, dsp, utils) {
  const userInfo = $rootScope.userInfo;
  $scope.content = this.content;
  $scope.title = this.title;
  // 区分是一级弹窗还是二级弹窗，遮罩层透明度不同
  $scope.level = this.level;
  $scope.vip = userInfo.vip;
  $scope.confirmText = this.confirm || 'Confirm';

  $scope.handleClose = () => {
    $scope.$emit('closePopUps', {showPopUps: false});
  }

  $scope.handleConfirm = () => {
    $scope.$emit('confirmPopUps', {showPopUps: false});
  }
}

