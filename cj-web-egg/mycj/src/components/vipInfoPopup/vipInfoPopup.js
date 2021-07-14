import template from './vipInfoPopup.html';
import styles from './vipInfoPopup.less';

export function vipInfoPopup(module) {
  module.component('vipInfoPopup', {
    template,
    controller: ['$rootScope', '$scope', '$location', 'dsp', '$element', 'utils', function($rootScope, $scope, $location, dsp, $element, utils) {
      $element.addClass([styles.vipInfoPopupComponent, 'vip-info-popup']);
      this.$onChanges = function() {
        vipInfoPopupCtrl.call(this, $rootScope, $scope, dsp, utils);
      };
      
    }],
    transclude: true,
    bindings: {
      parmas: '<'
    }
  });
}

function vipInfoPopupCtrl($rootScope, $scope, dsp, utils) {
  const vip = $rootScope.userInfo.vip;
  $scope.level = vip === '1' ? 'vip' : this.parmas || 0;
  console.log($scope.level);
  const sourceClassArr = {
    0: 'iconicon-test7',
    1: 'iconicon-test18',
    2: 'iconicon-test19',
    3: 'iconicon-test20',
    4: 'iconicon-test21',
    5: 'iconicon-test7',
    'vip': 'iconicon-test7'
  };
  $scope.sourceClass = sourceClassArr[$scope.level];
}

