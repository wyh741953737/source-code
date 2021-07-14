import template from './progressCircle.html';
import styles from './progressCircle.less';

export function progressCircleFactory(module) {
  module.component('progressCircle', {
    template,
    controller: ['$rootScope', '$scope', '$location', 'dsp', '$element', 'utils', '$interval', '$timeout', function ($rootScope, $scope, $location, dsp, $element, utils, $interval, $timeout) {
      $element.addClass([styles.progressCircleComponent, 'progressCircle']);
      progressCircleCtrl.call(this, $scope, dsp, utils, $interval, $timeout);
    }],
    controllerAs: 'vm',
    bindings: {
      shopid: '=',
      key: '=',
      percentage: '<',
      finished: '<'
    }
  });
}

function progressCircleCtrl($scope, dsp, utils, $interval, $timeout) {
  $scope.shopId = this.shopid;
  $scope.key = this.key;
  $scope.percent = this.percentage;
  $scope.circlePercent = true;
  let syncSuccess = false;

  let trans = 0;
  $scope.percent = 0;
  $scope.leftStyle = {
    "transform": 'rotate(0deg)'
  };
  $scope.rightStyle = {
    "transform": 'rotate(0deg)',
    "background": '#f5f5f5'
  };
  $scope.leftStyle = {
    "transform": 'rotate(0deg)',
    "background": '#f5f5f5'
  };

  function fluctuator(percent) {
    trans = Number(percent*3.6);
    if(trans > 0 && trans < 181) {
      $scope.rightStyle.transform = `rotate(${trans}deg)`;
    } else if( trans > 180 && trans < 360){
      $scope.rightStyle.transform = 'rotate(0deg)';
      $scope.rightStyle.background = '#52C41A';
      $scope.leftStyle.transform = `rotate(${trans - 180}deg)`;
    } else if(trans == 360) {
      $scope.leftStyle.transform = 'rotate(0deg)';
      $scope.rightStyle.transform = 'rotate(0deg)';
      $scope.leftStyle.background = '#52C41A';
      $scope.rightStyle.background = '#52C41A';
    }
  }

  this.$onInit = function() {
    fluctuator(this.percentage);
  }
  this.$onChanges = function(data) {
    if(data.percentage && data.percentage.currentValue) fluctuator(data.percentage.currentValue);
    if(data.finished && data.finished.currentValue) {
      this.percentage = 100;
      fluctuator(100);
      layer.msg('Synced Successfully');
    }
  }
}