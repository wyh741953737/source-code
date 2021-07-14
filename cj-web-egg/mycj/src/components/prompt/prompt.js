import template from './prompt.html';
export function promptFactory(module) {
  module.component('promptLabel', {
    template,
    controller: ['$rootScope', '$scope', '$location', 'dsp', '$element', 'utils', function($rootScope, $scope, $location, dsp, $element, utils) {
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
  
}
