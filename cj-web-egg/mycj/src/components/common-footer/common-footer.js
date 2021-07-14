import template from './common-footer.html';
import styels from './common-footer.less';

export function commonFooterFactory(module) {
  module.component('commonFooter', {
    template,
    controller: ['$scope', '$element', CommonFooterCtrl],
    bindings: {
      vinfo: '=',
      onLog: '&',
      showWorkOrder: '&'
    }
  });

  function CommonFooterCtrl($scope, $element) {
    $element.addClass(['common-footer', styels.footer]);
    $scope.year = new Date().getFullYear();
  }
}
