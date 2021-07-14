import { sourcingAddFactory } from '../../pages/mycj/sourcing/sourcing-add';
import template from './rate.html';
import styles from './rate.less';

export function rateFactory(module) {
  module.component('rate', {
    template,
    controller: ['$rootScope', '$scope', '$location', 'dsp', '$element', 'utils', function($rootScope, $scope, $location, dsp, $element, utils) {
      $element.addClass([styles.rateComponent, 'new-rate']);
      this.$onChanges = function() {
        rateCtrl.call(this, $rootScope, $scope, dsp, utils);
      };
    }],
    transclude: true,
    bindings: {
      rateNumber: '=',
      readOnly: '=',
      fontSize: '='
    }
  });
}

function rateCtrl($rootScope, $scope, dsp, utils) {
  // sourcing
  // 评分的分数
  $scope.rateStar = this.rateNumber ? this.rateNumber : null;
  $scope.readOnly = this.readOnly ? this.readOnly : false;
  $scope.hoverStar = null;
  if(this.fontSize) {
    document.getElementById('rateIcon1').style.fontSize = this.fontSize + 'px';
    document.getElementById('rateIcon2').style.fontSize = this.fontSize + 'px';
    document.getElementById('rateIcon3').style.fontSize = this.fontSize + 'px';
    document.getElementById('rateIcon4').style.fontSize = this.fontSize + 'px';
    document.getElementById('rateIcon5').style.fontSize = this.fontSize + 'px';
  }

  $scope.handleRate = (val) => {
    if($scope.readOnly) return false;
    $scope.rateStar = val;
    $scope.$emit('rateCtrl', $scope.rateStar)
  }
  $scope.handleRateHover = (val) => {
    if($scope.readOnly) return false;
      $scope.hoverStar = val;
  }
  $scope.handleRateLeave = () => {
    $scope.hoverStar = null;
  }
}