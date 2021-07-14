import template from './tooltip.html';
import styles from './tooltip.less';

/**
 * cj 公用小提示
 * width 提示宽度 默认 250px
 * content 内容 可传入 html 字符串
 * placement 提示位置 topLeft: 上左 topCenter: 上中 topRight: 上右 bottomLeft: 下左 bottomCenter: 下中 bottomRight: 下右
 * UI地址: https://lanhuapp.com/web/#/item/project/board/detail?pid=c626ce49-a076-461c-9d7f-96a6671227ee&project_id=c626ce49-a076-461c-9d7f-96a6671227ee&image_id=2442f311-d248-46c8-82e4-c53b5a72665a
 */

export function tooltipFactory(module) {
  module.component('tooltip', {
    template,
    controller: ['$rootScope', '$scope', '$location', 'dsp', '$element', 'utils', '$sce', function($rootScope, $scope, $location, dsp, $element, utils, $sce) {
      $element.addClass([styles.tipsComponent, 'tips-component-box']);
      this.$onChanges = function() {
        tipsCtrl.call(this, $scope, dsp, utils, $sce);
      };
    }],
    transclude: true,
    bindings: {
      content: '<',
      placement: '=',
      width: '<',
      maxwidth: '<',
      show: '='
    }
  });
}

function tipsCtrl($scope, dsp, utils, $sce) {
  $scope.content = this.content ? $sce.trustAsHtml(this.content) : '';
  $scope.show = this.show;
  const placementClass = {
    'topLeft': 'tips-info-top-left',
    'topCenter': 'tips-info-top-center',
    'topRight': 'tips-info-top-right',
    'bottomLeft': 'tips-info-bottom-left',
    'bottomCenter': 'tips-info-bottom-center',
    'bottomRight': 'tips-info-bottom-right'
  };
  console.log(this.maxwidth, this.width, 'this.maxWidth')
  $scope.addClass = placementClass[this.placement || 'bottomCenter'];
  $scope.tipsWidth = this.width || 250
  $scope.tipsMaxWidth = this.maxwidth || 250
}
