import template from './not-data.html';
import styles from './not-data.less';
import notFoundImg from './not-data.png';

export function notDataFactory(module) {
  module.component('notData', {
    template,
    controller: ['$scope', '$element', function ($scope, dsp) {
      this.$onInit = function () {
        controllerFn.call(this, $scope, dsp);
      };
    }],
    bindings: {
      el: '=', // 目标元素
      nohtml:'='
    },
  });
}

function controllerFn($scope, $element) {
  console.log(this.nohtml)
  $scope.noHtml = this.nohtml || 'Sorry, we cannot find any data.';
  $element.addClass([styles.notData, 'component-not-data']);
  $scope.notFoundImg = notFoundImg;
}
